#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { RailsSampleStack } from '../lib/rails-sample-stack';
import { NuxtSampleStack } from '../lib/nuxt-sample-stack';

const app = new cdk.App();
new RailsSampleStack(app, 'RailsSampleStack', {});
new NuxtSampleStack(app, 'NuxtSampleStack', {})