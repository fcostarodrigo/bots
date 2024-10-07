import cdk from "aws-cdk-lib";
import dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

import { makeApis } from "./makeApis.js";
import { makeCdn } from "./makeCdn.js";

export class BotsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const region = this.region;

    const {
      apiUrl,
      getBotsLambda,
      addBotLambda,
      updateBotLambda,
      addLogLambda,
      addWorkerLambda,
      getLogsLambda,
      getWorkersLambda,
      updateLogLambda,
      updateWorkerLambda,
    } = makeApis(this, region);

    const botsTable = new dynamodb.Table(this, "botsTable", {
      partitionKey: { name: "botId", type: dynamodb.AttributeType.STRING },
      tableName: "botsTable",
    });

    const workersTable = new dynamodb.Table(this, "workersTable", {
      partitionKey: { name: "workerId", type: dynamodb.AttributeType.STRING },
      tableName: "workersTable",
    });

    const logsTable = new dynamodb.Table(this, "logsTable", {
      partitionKey: { name: "logId", type: dynamodb.AttributeType.STRING },
      tableName: "logsTable",
    });

    botsTable.grantReadWriteData(getBotsLambda);
    botsTable.grantReadWriteData(addBotLambda);
    botsTable.grantReadWriteData(updateBotLambda);

    workersTable.grantReadWriteData(getWorkersLambda);
    workersTable.grantReadWriteData(addWorkerLambda);
    workersTable.grantReadWriteData(updateWorkerLambda);

    logsTable.grantReadWriteData(getLogsLambda);
    logsTable.grantReadWriteData(addLogLambda);
    logsTable.grantReadWriteData(updateLogLambda);

    makeCdn(this, apiUrl);
  }
}
