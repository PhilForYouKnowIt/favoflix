import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ToastProvider } from "components/misc/ToastContext";

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
