import { createCache, setStore, store } from "~/store";
import type { SerializedFileEntry } from "~/utils/files";

export const handleEnterDirectory = async (fullPath: string): Promise<void> => {
  setStore("loading", true);
  
  const response = await fetch("/api/read-smb", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      vpn_token: store.credentials.vpn_token,
      smb_token: store.credentials.smb_token,
      path: fullPath
    })
  });

  if (response.status !== 200) {
    setStore({
      loading: false,
      error: await response.text(),
      files: null
    });

    return;
  }

  const json = await response.json() as SerializedFileEntry[];
  setStore({
    loading: false,
    error: null,
    files: json,
    // Append +1 to remove the slash at the beginning.
    path: fullPath.slice(store.origin.length + 1)
  });
  
  createCache();
}