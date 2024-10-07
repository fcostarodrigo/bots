import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { Worker, workerSchema } from "share";
import { makeHandler } from "../handler.js";
import { created } from "../responses.js";

export const updateWorkerApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["PUT" as const],
  name: "updateWorker",
  path: "/workers/{workerId}",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  bodySchema: workerSchema,
  handlerFun: async ({ body: worker }) => {
    const keys = Object.keys(worker).filter((key) => key !== "workerId") as (keyof Worker)[];

    worker.updatedAt = Date.now();

    await db.update({
      TableName: "workersTable",
      Key: { workerId: worker.workerId },
      UpdateExpression: `set ${keys.map((key) => `#${key} = :${key}`).join(", ")}`,
      ExpressionAttributeNames: Object.fromEntries(keys.map((key) => [`#${key}`, key])),
      ExpressionAttributeValues: Object.fromEntries(keys.map((key) => [`:${key}`, worker[key]])),
    });

    await db.put({ Item: worker, TableName: "workersTable" });
    return created(worker);
  },
});
