#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ServelssWithCdkStack } from '../lib/servelss-with-cdk-stack';

const app = new cdk.App();
new ServelssWithCdkStack(app, 'ServelssWithCdkStack', {
    env:{
        region: "us-east-1",
        
    }
});
