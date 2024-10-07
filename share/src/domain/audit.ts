import { faker } from "@faker-js/faker";
import moment from "moment";
import { z } from "zod";

export function audit<T extends z.ZodRawShape>(schema: z.ZodObject<T>) {
  return schema.extend({
    createdAt: z.number(),
    updatedAt: z.number(),
  });
}

export function getAuditMock() {
  return {
    createdAt: faker.number.int({
      min: moment().startOf("day").unix() * 1000,
      max: moment().endOf("day").unix() * 1000,
    }),
    updatedAt: faker.number.int({
      min: moment().startOf("day").unix() * 1000,
      max: moment().endOf("day").unix() * 1000,
    }),
  };
}
