import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';

export class NuxtRailsSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

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

    const keyName = process.env.KEY_NAME;

    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      description: 'Allow HTTP ingress',
      allowAllOutbound: true,
    })

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow HTTP Access"
    )
    const role = new iam.Role(this, "ec2Role", {
      assumedBy: new iam.ServicePrincipal("ec2.amazonaws.com"),
    });
    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSSMManagedInstanceCore")
    );

    new ec2.Instance(this, 'RailsInstance', {
      vpc,
      instanceName: 'RailsInstance',
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }),
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      securityGroup: securityGroup,
      keyName: keyName,
      role: role,
      // init: ec2.CloudFormationInit.fromConfigSets({
      //   configSets: {
      //     default: ['yumPreinstall', 'config'],
      //   },
      //   configs: {
      //     yumPreinstall: new ec2.InitConfig([
      //       ec2.InitPackage.yum('git'),
      //       ec2.InitPackage.yum('nginx')
      //     ])
      //   }
      // })
    })
    // const handle = new ec2.InitServiceRestartHandle();
    // ec2.CloudFormationInit.fromElements(
    //   ec2.InitFile.fromString('/etc/nginx/nginx.conf', '', { serviceRestartHandles: [handle] })
    // )

  }
}
