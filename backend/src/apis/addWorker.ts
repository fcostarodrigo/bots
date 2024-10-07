import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { workerFormSchema } from "share";
import { makeHandler } from "../handler.js";
import { created } from "../responses.js";

export const addWorkerApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["POST" as const],
  name: "addWorker",
  path: "/workers",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  bodySchema: workerFormSchema,
  handlerFun: async ({ body: workerForm }) => {
    const worker = {
      ...workerForm,
      workerId: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await db.put({ Item: worker, TableName: "workersTable" });

    return created(worker);
  },
});
