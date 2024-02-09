import type { SerializedFileEntry } from "~/utils/files";
import { createCache, setStore, store, storeCredentials } from "~/store";
import { SMB_IUT } from "~/utils/constants";

export const initAuth = async (shouldStoreCredentials: boolean) => {
  setStore({ loading: true, error: null });

  if (shouldStoreCredentials) {
    storeCredentials();
  } else localStorage.clear();

  const response = await fetch("/api/init-smb", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: store.credentials.username,
      password: store.credentials.password,
      path: store.origin + "/" + store.path
    })
  });

  if (response.status !== 200) {
    setStore({
      files: null,
      loading: false,
      error: await response.text(),

      credentials: {
        ...store.credentials,
        vpn_token: null,
        smb_token: null
      }
    });

    localStorage.removeItem("smb-session:cache");
    return;
  }

  const json = await response.json() as {
    vpn_token: string,
    smb_token: string,
    files: SerializedFileEntry[]
  };

  setStore({
    loading: false,
    files: json.files,

    credentials: {
      ...store.credentials,
      vpn_token: json.vpn_token,
      smb_token: json.smb_token
    }
  });

  createCache();
};

export const logoutAuth = async (willLogAgain = false) => {
  setStore({ loading: true, error: null });
  localStorage.removeItem("smb-session:cache");

  const response = await fetch("/api/logout-vpn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vpn_token: store.credentials.vpn_token
    })
  });

  if (response.status !== 200) {
    setStore({
      files: null,
      loading: false,
      error: await response.text(),

      credentials: {
        ...store.credentials,
        vpn_token: null,
        smb_token: null
      }
    });

    return;
  }

  setStore({
    path: store.origin === SMB_IUT ? "pedagogie/pedago-iut" : "",
    loading: false,
    files: willLogAgain ? store.files : null,

    credentials: willLogAgain ? store.credentials : {
      ...store.credentials,
      vpn_token: null,
      smb_token: null
    }
  });
}