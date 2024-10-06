import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { makeHandler } from "../handler.js";
import { ok } from "../responses.js";

export const getBotsApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["GET" as const],
  name: "getBots",
  path: "/bots",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  handlerFun: async () => {
    const { Items: items = [] } = await db.scan({ TableName: "botsTable" });
    return ok(items);
  },
});
