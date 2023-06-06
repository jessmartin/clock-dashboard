import React from "react";
import {
  ResetDialog,
  GenericFallback,
  ServiceWorkerToastContainer,
  ThemeProvider,
  appkitTranslations,
} from "@dxos/react-appkit";
import { ClientProvider } from "@dxos/react-client";
import { Welcome } from "./Welcome";
import { Config, Dynamics, Defaults } from "@dxos/config";
import { useRegisterSW } from "virtual:pwa-register/react";
import { ErrorBoundary } from "./ErrorBoundary";

import "./index.css";

// Dynamics allows configuration to be supplied by the hosting KUBE.
const config = async () => new Config(await Dynamics(), Defaults());

export const App = () => {
  const serviceWorker = useRegisterSW();
  return (
    <ThemeProvider
      appNs="clock-dashboard"
      resourceExtensions={[appkitTranslations]}
      fallback={<GenericFallback />}
    >
      <ErrorBoundary
        fallback={({ error }) => <ResetDialog error={error} config={config} />}
      >
        <ClientProvider config={config} fallback={GenericFallback}>
          <Welcome name="clock-dashboard" />
          <ServiceWorkerToastContainer {...serviceWorker} />
        </ClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
