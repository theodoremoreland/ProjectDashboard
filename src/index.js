// React
import React from "react";
import { createRoot } from "react-dom/client";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Custom contexts
import ProjectsContextProvider from "./contexts/ProjectsContext";

// Custom components
import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProjectsContextProvider>
        <App />
      </ProjectsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
