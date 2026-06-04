import React from "react";
import ReactDOM from "react-dom/client";

import { StandaloneHistoryPage } from "./components/StandaloneHistoryPage";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StandaloneHistoryPage />
  </React.StrictMode>
);
