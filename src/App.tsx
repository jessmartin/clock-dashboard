import React from "react";
import {
  GenericFallback,
  ServiceWorkerToastContainer,
} from "@dxos/react-appkit";
import {
  ClientProvider,
  Config,
  Dynamics,
  Local,
  Defaults,
} from "@dxos/react-client";
import { useRegisterSW } from "virtual:pwa-register/react";

import { Welcome } from "./Welcome";

// Dynamics allows configuration to be supplied by the hosting KUBE.
const config = async () => new Config(await Dynamics(), Local(), Defaults());

export const App = () => {
  const serviceWorker = useRegisterSW();
  return (
    <ClientProvider
      config={config}
      fallback={GenericFallback}
      onInitialized={async (client) => {
        !client.halo.identity.get() && (await client.halo.createIdentity());
      }}
    >
      <Welcome name="clock-dashboard" />
      <ServiceWorkerToastContainer {...serviceWorker} />
    </ClientProvider>
  );
};
