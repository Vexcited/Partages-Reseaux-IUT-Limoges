import type { FileEntry } from "fortigate-web-sslvpn";
import { createStore } from "solid-js/store";

export const clearStoredCredentials = () => {
  localStorage.removeItem("credentials");
};

export const storeCredentials = () => {
  const encoded = btoa(`${store.credentials.username}:${store.credentials.password}`);
  localStorage.setItem("credentials", encoded);
};

const readInitialCredentials = () => {
  const credentials = { username: "", password: "" };
  if (typeof window === "undefined") return credentials;

  const encoded = localStorage.getItem("credentials");
  if (encoded) {
    const [username, password] = atob(encoded).split(":");
    credentials.username = username;
    credentials.password = password;
  }

  return credentials
};

// Read the credentials stored on initial load.
const initialCredentials = readInitialCredentials();

export const [store, setStore] = createStore({
  credentials: {
    username: initialCredentials.username,
    password: initialCredentials.password,
    vpn_token: null as (null | string),
    smb_token: null as (null | string)
  },

  origin: "",
  path: "",
  files: null as (null | FileEntry[]),
  error: null as (null | string),
  loading: true
});
