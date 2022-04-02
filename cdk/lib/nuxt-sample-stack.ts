import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';

export class NuxtSampleStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // S3
        const bucket = new s3.Bucket(this, 'NuxtS3Bucket', {
            bucketName: 'nuxt.s3bucket'
        })

        new cloudfront.Distribution(this, 'NuxtDistribution', {
            defaultBehavior: {
                origin: new origins.S3Origin(bucket)
            },
            defaultRootObject: 'index.html'
        })
    }
}