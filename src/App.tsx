import React from "react";
import { ServiceWorkerToastContainer } from "@dxos/react-appkit";
import { ClientProvider } from "@dxos/react-client";
import { Welcome } from "./Welcome";
import { Config, Defaults } from "@dxos/config";
import { useRegisterSW } from "virtual:pwa-register/react";

const config = async () => new Config(Defaults());

export const App = () => {
  const serviceWorker = useRegisterSW();
  return (
    <ClientProvider config={config}>
      <Welcome name="clock-dashboard" />
      <ServiceWorkerToastContainer {...serviceWorker} />
    </ClientProvider>
  );
};
