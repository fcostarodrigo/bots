import { HttpApi } from "aws-cdk-lib/aws-apigatewayv2";
import {
  addBotApi,
  addLogApi,
  addWorkerApi,
  getBotsApi,
  getLogsApi,
  getWorkersApi,
  updateBotApi,
  updateLogApi,
  updateWorkerApi,
} from "backend";
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
    getWorkersLambda: makeApi({ api, region, scope, ...getWorkersApi }),
    getLogsLambda: makeApi({ api, region, scope, ...getLogsApi }),

    addBotLambda: makeApi({ api, region, scope, ...addBotApi }),
    addWorkerLambda: makeApi({ api, region, scope, ...addWorkerApi }),
    addLogLambda: makeApi({ api, region, scope, ...addLogApi }),

    updateBotLambda: makeApi({ api, region, scope, ...updateBotApi }),
    updateWorkerLambda: makeApi({ api, region, scope, ...updateWorkerApi }),
    updateLogLambda: makeApi({ api, region, scope, ...updateLogApi }),
  };
}
