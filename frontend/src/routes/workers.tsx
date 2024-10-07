import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { WorkersPage } from "../workers/WorkersPage";

const searchSchema = z.object({
  botId: z.string().optional(),
});

export const Route = createFileRoute("/workers")({
  component: Index,
  validateSearch: (search) => searchSchema.parse(search),
});

function Index() {
  return <WorkersPage />;
}
