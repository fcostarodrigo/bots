import { z } from "zod";
import { audit } from "./audit.js";

export type BotForm = z.infer<typeof botFormSchema>;
export type Bot = z.infer<typeof botSchema>;

export const botFormSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const botSchema = audit(botFormSchema.extend({ botId: z.string() }));
