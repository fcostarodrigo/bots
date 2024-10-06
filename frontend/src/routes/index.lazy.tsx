import { createLazyFileRoute } from "@tanstack/react-router";
import Bots from "../bots/bots";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <Bots />;
}
