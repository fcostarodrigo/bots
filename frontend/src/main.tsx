import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { setupWorker } from "msw/browser";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { handlers } from "./mockServer/handlers";
import { routeTree } from "./routeTree.gen";

if (process.env.NODE_ENV === "development") {
  const worker = setupWorker(...handlers);
  await worker.start({ onUnhandledRequest: "bypass" });
}

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = document.querySelector("#root");

const queryClient = new QueryClient();

if (root) {
  createRoot(root).render(
    <StrictMode>
      <CssBaseline enableColorScheme />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
