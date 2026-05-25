import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { waitForBackendReady } from "./utils/api";
import "./envProbe";

function Root() {

  const [backendReady, setBackendReady] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    (async () => {
      const ok = await waitForBackendReady({ timeoutMs: 15000, intervalMs: 500 });
      if (!cancelled) setBackendReady(ok);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Never block rendering the app UI.
  // Backend readiness only controls optional app behaviors.
  return <App />;
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </React.StrictMode>
);

