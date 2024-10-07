import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { makeHandler } from "../handler.js";
import { ok } from "../responses.js";

export const getWorkersApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["GET" as const],
  name: "getWorkers",
  path: "/workers",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  handlerFun: async () => {
    const { Items: items = [] } = await db.scan({ TableName: "workersTable" });
    return ok(items);
  },
});
