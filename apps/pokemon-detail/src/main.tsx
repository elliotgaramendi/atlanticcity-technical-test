import React from "react";
import ReactDOM from "react-dom/client";

import { DetailProviders } from "./components/DetailProviders";
import { StandaloneDetailPage } from "./components/StandaloneDetailPage";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DetailProviders>
      <StandaloneDetailPage />
    </DetailProviders>
  </React.StrictMode>
);
