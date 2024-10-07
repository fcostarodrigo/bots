// src/mocks/handlers.js
import { faker } from "@faker-js/faker";
import { delay, http, HttpResponse } from "msw";
import { botFormSchema, botSchema, getBotMock } from "share";

const defaultDelay = 3000;

let bots = faker.helpers.multiple(getBotMock, { count: 3 });

export const handlers = [
  http.get("/api/bots", async () => {
    await delay(defaultDelay);
    return HttpResponse.json(bots);
  }),
  http.post("/api/bots", async ({ request }) => {
    const formBot = botFormSchema.parse(await request.json());
    const bot = { ...getBotMock(), ...formBot, status: "DISABLED" as const };

    bots.push(bot);

    await delay(defaultDelay);
    return HttpResponse.json(bot);
  }),
  http.put("/api/bots/:botId", async ({ request }) => {
    const updateBot = botSchema.parse(await request.json());

    updateBot.updatedAt = Date.now();
    bots = bots.map((bot) => (bot.botId === updateBot.botId ? updateBot : bot));

    await delay(defaultDelay);
    return HttpResponse.json(updateBot);
  }),
];
