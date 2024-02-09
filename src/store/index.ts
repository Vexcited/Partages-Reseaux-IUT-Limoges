import type { SerializedFileEntry } from "~/utils/files";
import { createStore, unwrap } from "solid-js/store";
import { SMB_IUT } from "~/utils/constants";

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

  return credentials;
};

// Read the credentials stored on initial load.
const initialCredentials = readInitialCredentials();

export interface CacheContainer {
  time: number;
  username: string;
  path: string;
  origin: string;
  vpn_token: string;
  smb_token: string;
  files: SerializedFileEntry[];
}

export const createCache = () => {
  const files = unwrap(store.files);
  if (!files) return;

  const container: CacheContainer = {
    time: Date.now(),
    username: store.credentials.username,
    smb_token: store.credentials.smb_token!,
    vpn_token: store.credentials.vpn_token!,
    origin: store.origin,
    path: store.path,
    files
  };

  localStorage.setItem("smb-session:cache", JSON.stringify(container));
};

const readCurrentCache = (): CacheContainer | null => {
  const container = localStorage.getItem("smb-session:cache");
  if (!container) return null;

  const parsed = JSON.parse(container) as CacheContainer;
  // if time is less than 5 minutes, we keep the files.
  if (Date.now() - parsed.time < 300000) {
    return parsed;
  }

  localStorage.removeItem("smb-session:cache");
  return null;
};

// Read the files stored on initial load.
const initialCache = readCurrentCache();

export const [store, setStore] = createStore({
  credentials: {
    username: initialCache?.username ?? initialCredentials.username,
    password: initialCredentials.password,
    vpn_token: initialCache?.vpn_token ?? null,
    smb_token: initialCache?.smb_token ?? null
  },

  origin: initialCache?.origin ?? SMB_IUT,
  path: initialCache?.path ?? "pedagogie/pedago-iut",
  files: initialCache?.files ?? null,
  error: null as (null | string),
  loading: false
});
