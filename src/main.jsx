import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Route";
import AuthProviders from "./Providers/AuthProviders";
import { ReactNotifications } from "react-notifications-component";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// create a query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProviders>
      <QueryClientProvider client={queryClient}>
        <ReactNotifications />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProviders>
  </React.StrictMode>
);
