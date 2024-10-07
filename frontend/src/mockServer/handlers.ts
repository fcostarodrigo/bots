import { faker } from "@faker-js/faker";
import { delay, http, HttpResponse } from "msw";
import {
  botFormSchema,
  botSchema,
  getBotMock,
  getLogMock,
  getWorkerMock,
  logFormSchema,
  logSchema,
  workerFormSchema,
  workerSchema,
} from "share";

const defaultDelay = 3000;

let bots = faker.helpers.multiple(getBotMock, { count: 3 });

let workers = bots.flatMap((bot) => faker.helpers.multiple(() => getWorkerMock(bot.botId), { count: 2 }));

let logs = [
  ...bots.flatMap((bot) => faker.helpers.multiple(() => getLogMock(bot.botId), { count: 2 })),
  ...workers.flatMap((worker) => faker.helpers.multiple(() => getLogMock(undefined, worker.workerId), { count: 2 })),
];

export const handlers = [
  http.get("/api/bots", async () => {
    await delay(defaultDelay);
    return HttpResponse.json(bots);
  }),

  http.get("/api/workers", async () => {
    await delay(defaultDelay);
    return HttpResponse.json(workers);
  }),

  http.get("/api/logs", async () => {
    await delay(defaultDelay);
    return HttpResponse.json(logs);
  }),

  http.post("/api/bots", async ({ request }) => {
    const botForm = botFormSchema.parse(await request.json());
    const bot = { ...getBotMock(), ...botForm, status: "DISABLED" as const };

    bots.push(bot);

    await delay(defaultDelay);
    return HttpResponse.json(bot);
  }),

  http.post("/api/workers", async ({ request }) => {
    const workerForm = workerFormSchema.parse(await request.json());
    const worker = { ...getWorkerMock(), ...workerForm };

    workers.push(worker);

    await delay(defaultDelay);
    return HttpResponse.json(worker);
  }),

  http.post("/api/logs", async ({ request }) => {
    const logForm = logFormSchema.parse(await request.json());
    const log = { ...getLogMock(), ...logForm };

    logs.push(log);

    await delay(defaultDelay);
    return HttpResponse.json(log);
  }),

  http.put("/api/bots/:botId", async ({ request }) => {
    const updateBot = botSchema.parse(await request.json());

    updateBot.updatedAt = Date.now();
    bots = bots.map((bot) => (bot.botId === updateBot.botId ? updateBot : bot));

    await delay(defaultDelay);
    return HttpResponse.json(updateBot);
  }),

  http.put("/api/workers/:workerId", async ({ request }) => {
    const updateWorker = workerSchema.parse(await request.json());

    updateWorker.updatedAt = Date.now();
    workers = workers.map((worker) => (worker.workerId === updateWorker.workerId ? updateWorker : worker));

    await delay(defaultDelay);
    return HttpResponse.json(updateWorker);
  }),

  http.put("/api/logs/:logId", async ({ request }) => {
    const updateLog = logSchema.parse(await request.json());

    updateLog.updatedAt = Date.now();
    logs = logs.map((log) => (log.logId === updateLog.logId ? updateLog : log));

    await delay(defaultDelay);
    return HttpResponse.json(updateLog);
  }),
];
