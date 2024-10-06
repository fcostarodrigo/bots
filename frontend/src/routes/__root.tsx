import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Home from "../home/home";

export const Route = createRootRoute({
  component: () => (
    <>
      <Home />
      <TanStackRouterDevtools />
    </>
  ),
});
