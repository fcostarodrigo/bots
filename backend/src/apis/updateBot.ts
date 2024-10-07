import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fileURLToPath } from "node:url";

import { Bot, botSchema } from "share";
import { makeHandler } from "../handler.js";
import { created } from "../responses.js";

export const updateBotApi = {
  filePath: fileURLToPath(import.meta.url),
  methods: ["PUT" as const],
  name: "updateBot",
  path: "/bots/{botId}",
};

const db = DynamoDBDocument.from(new DynamoDB());

export const handler = makeHandler({
  bodySchema: botSchema,
  handlerFun: async ({ body: bot }) => {
    const keys = Object.keys(bot).filter((key) => key !== "botId") as (keyof Bot)[];

    bot.updatedAt = Date.now();

    await db.update({
      TableName: "botsTable",
      Key: { botId: bot.botId },
      UpdateExpression: `set ${keys.map((key) => `#${key} = :${key}`).join(", ")}`,
      ExpressionAttributeNames: Object.fromEntries(keys.map((key) => [`#${key}`, key])),
      ExpressionAttributeValues: Object.fromEntries(keys.map((key) => [`:${key}`, bot[key]])),
    });

    await db.put({ Item: bot, TableName: "botsTable" });
    return created(bot);
  },
});
