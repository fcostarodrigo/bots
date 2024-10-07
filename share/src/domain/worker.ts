import { faker } from "@faker-js/faker";
import { z } from "zod";
import { audit, getAuditMock } from "./audit.js";

export type WorkerForm = z.infer<typeof workerFormSchema>;
export type Worker = z.infer<typeof workerSchema>;

export const workerFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  botId: z.string(),
});

export const workerSchema = audit(
  workerFormSchema.extend({
    workerId: z.string(),
  }),
);

export const workersSchema = z.array(workerSchema);

export function getWorkerFormMock(botId?: string): WorkerForm {
  return {
    name: faker.internet.userName(),
    description: faker.lorem.sentence(),
    botId: botId ?? faker.string.uuid(),
  };
}

export function getWorkerMock(botId?: string): Worker {
  return {
    workerId: faker.string.uuid(),
    ...getWorkerFormMock(botId),
    ...getAuditMock(),
  };
}
