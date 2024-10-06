import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/workers")({
  component: Index,
});

function Index() {
  return <h1>Workers</h1>;
}
