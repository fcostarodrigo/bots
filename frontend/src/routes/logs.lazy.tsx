import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/logs")({
  component: Index,
});

function Index() {
  return <h1>Logs</h1>;
}
