import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { makeHandler } from "../handler.js";
import { ok } from "../responses.js";

export const getLogsApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["GET" as const],
  name: "getLogs",
  path: "/logs",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  handlerFun: async () => {
    const { Items: items = [] } = await db.scan({ TableName: "logsTable" });
    return ok(items);
  },
});
