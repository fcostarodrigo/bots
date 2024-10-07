import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { logFormSchema } from "share";
import { makeHandler } from "../handler.js";
import { created } from "../responses.js";

export const addLogApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["POST" as const],
  name: "addLog",
  path: "/logs",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  bodySchema: logFormSchema,
  handlerFun: async ({ body: logForm }) => {
    const log = {
      ...logForm,
      logId: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await db.put({ Item: log, TableName: "logsTable" });

    return created(log);
  },
});
