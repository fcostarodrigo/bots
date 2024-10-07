import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { Log, logSchema } from "share";
import { makeHandler } from "../handler.js";
import { created } from "../responses.js";

export const updateLogApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["PUT" as const],
  name: "updateLog",
  path: "/logs/{logId}",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  bodySchema: logSchema,
  handlerFun: async ({ body: log }) => {
    const keys = Object.keys(log).filter((key) => key !== "logId") as (keyof Log)[];

    log.updatedAt = Date.now();

    await db.update({
      TableName: "logsTable",
      Key: { logId: log.logId },
      UpdateExpression: `set ${keys.map((key) => `#${key} = :${key}`).join(", ")}`,
      ExpressionAttributeNames: Object.fromEntries(keys.map((key) => [`#${key}`, key])),
      ExpressionAttributeValues: Object.fromEntries(keys.map((key) => [`:${key}`, log[key]])),
    });

    await db.put({ Item: log, TableName: "logsTable" });
    return created(log);
  },
});
