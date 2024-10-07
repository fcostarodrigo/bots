import { faker } from "@faker-js/faker";
import { z } from "zod";
import { audit, getAuditMock } from "./audit.js";

export type LogForm = z.infer<typeof logFormSchema>;
export type Log = z.infer<typeof logSchema>;

const botLogSchema = z.object({
  message: z.string(),
  botId: z.string(),
});

const workerLogSchema = z.object({
  message: z.string(),
  workerId: z.string(),
});

export const logFormSchema = z.union([botLogSchema, workerLogSchema]);

export const logSchema = z.union([
  audit(botLogSchema.extend({ logId: z.string() })),
  audit(workerLogSchema.extend({ logId: z.string() })),
]);

export const logsSchema = z.array(logSchema);

export function getLogFormMock(botId?: string, workerId?: string): LogForm {
  const message = faker.internet.userName();

  if (botId) {
    return { message, botId };
  }

  if (workerId) {
    return { message, workerId };
  }

  return faker.helpers.arrayElement([
    { message, botId: faker.string.uuid() },
    { message, workerId: faker.string.uuid() },
  ]);
}

export function getLogMock(botId?: string, workerId?: string): Log {
  return {
    logId: faker.string.uuid(),
    ...getLogFormMock(botId, workerId),
    ...getAuditMock(),
  };
}
