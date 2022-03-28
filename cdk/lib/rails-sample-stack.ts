import { Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { InstanceTarget } from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import * as rds from 'aws-cdk-lib/aws-rds';

export class RailsSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // create VPC
    const vpc = new ec2.Vpc(this, 'RailsVPC', {
      cidr: '10.0.0.0/21',
      subnetConfiguration: [{
        subnetType: ec2.SubnetType.PUBLIC,
        name: 'Ingress',
        cidrMask: 24
      },
      {
        cidrMask: 24,
        name: 'Database',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }],
    });

    const securityGroupforEC2 = new ec2.SecurityGroup(this, 'SecurityGroupforEC2', {
      vpc,
      description: 'Allow HTTP ingress',
      allowAllOutbound: true,
    })

    securityGroupforEC2.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow HTTP Access"
    )

    // IAM role for SSM Agent
    const role = new iam.Role(this, "ec2Role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });
    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore")
    );

    // create EC2 Instance
    const keyName = process.env.KEY_NAME;
    const instance = new ec2.Instance(this, 'RailsInstance', {
      vpc,
      instanceName: 'RailsInstance',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: securityGroupforEC2,
      keyName: keyName,
      role: role,
    })

    // create ALB
    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
      vpc,
      internetFacing: true,
      securityGroup: securityGroupforEC2
    })

    const listener = lb.addListener('Listener', {
      port: 80,
      open: true
    })

    listener.addTargets('ApplicationFleet', {
      port: 80,
      targets: [new InstanceTarget(instance, 80)]
    })

    // RDS
    const securityGroupforRDS = new ec2.SecurityGroup(this, 'SecurityGroupforRDS', {
      vpc,
      description: 'Allow MySQL ingress',
      allowAllOutbound: true,
    })

    securityGroupforRDS.addIngressRule(
      ec2.Peer.securityGroupId(securityGroupforEC2.securityGroupId),
      ec2.Port.tcp(3306),
      "Allow MySQL Access"
    )
    const engine = rds.DatabaseInstanceEngine.mysql({ version: rds.MysqlEngineVersion.VER_5_7_34 })
    const db = new rds.DatabaseInstance(this, 'RailsRDS', {
      engine,
      vpc,
      databaseName: 'api_production',
      instanceIdentifier: 'railsrds',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromPassword('api', SecretValue.ssmSecure('RailsApiRDS', '1')),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      },
      securityGroups: [securityGroupforRDS]
    })
  }
}
