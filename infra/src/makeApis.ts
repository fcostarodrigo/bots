import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import { addBotApi, getBotsApi, updateBotApi } from "backend";
import { Construct } from "constructs";

import { makeApi } from "./makeApi.js";

export function makeApis(scope: Construct, region: string) {
  const api = new HttpApi(scope, "botsApi");

  api.addStage("api", {
    autoDeploy: true,
    stageName: "api",
  });

  return {
    api,
    apiUrl: `${api.apiId}.execute-api.${region}.amazonaws.com`,
    getBotsLambda: makeApi({ api, region, scope, ...getBotsApi }),
    addBotLambda: makeApi({ api, region, scope, ...addBotApi }),
    updateBotLambda: makeApi({ api, region, scope, ...updateBotApi }),
  };
}
