import cdk from "aws-cdk-lib";
import dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

import { makeApis } from "./makeApis.js";
import { makeCdn } from "./makeCdn.js";

export class BotsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const region = this.region;

    const { apiUrl, getBotsLambda } = makeApis(this, region);

    const botsTable = new dynamodb.Table(this, "botsTable", {
      partitionKey: {
        name: "botId",
        type: dynamodb.AttributeType.STRING,
      },
      tableName: "botsTable",
    });

    botsTable.grantReadWriteData(getBotsLambda);

    makeCdn(this, apiUrl);
  }
}
