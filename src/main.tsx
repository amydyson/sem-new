// In main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import "./index.css";
import App from "./App.tsx";

Amplify.configure(outputs);

const getRedirectUri = () => {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return `${window.location.origin}`;
  }
  return import.meta.env.VITE_REDIRECT_URI;
};

const redirectUri = getRedirectUri();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
      // Add logout configuration
      onRedirectCallback={(appState) => {
        window.location.replace(appState?.returnTo || window.location.origin);
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
);
