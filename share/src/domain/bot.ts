import { faker } from "@faker-js/faker";
import { z } from "zod";
import { audit, getAuditMock } from "./audit.js";

export type BotForm = z.infer<typeof botFormSchema>;
export type Bot = z.infer<typeof botSchema>;
export type BotStatus = z.infer<typeof botStatusSchema>;

export const botStatuses = ["DISABLED", "ENABLED", "PAUSED"] as const;

export const botStatusSchema = z.enum(botStatuses);

export const botFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const botSchema = audit(
  botFormSchema.extend({
    botId: z.string(),
    status: botStatusSchema,
  }),
);

export const botsSchema = z.array(botSchema);

export function getBotFormMock(): BotForm {
  return {
    name: faker.internet.userName(),
    description: faker.lorem.sentence(),
  };
}

export function getBotMock(): Bot {
  return {
    botId: faker.string.uuid(),
    status: faker.helpers.arrayElement(botStatuses),
    ...getBotFormMock(),
    ...getAuditMock(),
  };
}
