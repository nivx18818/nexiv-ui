import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { ConversationProvider } from "./contexts/conversation-context.tsx";
import AppRoutes from "./components/app-routes/index.tsx";
import "./globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConversationProvider>
        <AppRoutes />
      </ConversationProvider>
    </BrowserRouter>
  </StrictMode>,
);
