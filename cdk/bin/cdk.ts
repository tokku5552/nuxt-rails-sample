#!/usr/bin/env node
import * as dotenv from 'dotenv';
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RailsSampleStack } from '../lib/rails-sample-stack';
import { NuxtSampleStack } from '../lib/nuxt-sample-stack';

dotenv.config()

export interface RailsProps extends cdk.StackProps {
    certificateArn: string,
    hostedZoneId: string,
    zoneName: string
}

const app = new cdk.App();
const railsProps: RailsProps = {
    certificateArn: process.env.CERTIFICATE_ARN || 'null',
    hostedZoneId: process.env.HOSTED_ZONE_ID || 'null',
    zoneName: process.env.ZONE_NAME || 'null'
}
new RailsSampleStack(app, 'RailsSampleStack', railsProps);
new NuxtSampleStack(app, 'NuxtSampleStack', {})