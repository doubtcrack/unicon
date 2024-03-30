import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Provider store={Store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
