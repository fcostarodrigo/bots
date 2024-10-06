import { z } from "zod";

export function audit<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.extend({
    createdAt: z.string(),
    updatedAt: z.string(),
  });
}
