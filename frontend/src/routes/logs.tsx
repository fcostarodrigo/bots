import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { LogsPage } from "../logs/LogsPage";

const searchSchema = z.object({
  botId: z.string().optional(),
  workerId: z.string().optional(),
});

export const Route = createFileRoute("/logs")({
  component: Index,
  validateSearch: (search) => searchSchema.parse(search),
});

function Index() {
  return <LogsPage />;
}
