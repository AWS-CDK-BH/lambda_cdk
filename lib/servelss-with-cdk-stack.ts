import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';


export class ServelssWithCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    //  dynamodb

    const table= new dynamodb.Table( this, "people", {
      partitionKey: { name: 'name',type:dynamodb.AttributeType.STRING},
      tableName :"StreamUsersTable"
    })
    //   lambda function 
    const lmb= new lambda.Function(this, "HelloHandler", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code : lambda.Code.fromAsset("lambda"),  //  folder name
      handler : "hello.handler"

    });

    //  Api Gate Way 
    const api= new apigw.RestApi( this, "StreamAPIGateway") ; 
    //   lambda  integration 

    const apIntegration= new apigw.LambdaIntegration(lmb);
    const apiHello= api.root.addResource('hello'); // this for the  /hello  following the api Url
    apiHello.addMethod("GET", apIntegration);

  }
}
