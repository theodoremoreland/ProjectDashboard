import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import ProjectsContextProvider from "./contexts/ProjectsContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProjectsContextProvider>
        <App />
      </ProjectsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
