import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { botFormSchema } from "share";
import { makeHandler } from "../handler.js";
import { created } from "../responses.js";

export const addBotApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["POST" as const],
  name: "addBot",
  path: "/bots",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  bodySchema: botFormSchema,
  handlerFun: async ({ body: botForm }) => {
    const bot = {
      ...botForm,
      botId: crypto.randomUUID(),
      status: "DISABLED",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await db.put({ Item: bot, TableName: "botsTable" });

    return created(bot);
  },
});
