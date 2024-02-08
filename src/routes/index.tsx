import type { FileEntry } from "fortigate-web-sslvpn";
import { onMount, type Component, createSignal, For, Show } from "solid-js";
import { clearStoredCredentials, setStore, store, storeCredentials } from "~/store";
import { SMB_IUT, SMB_USER } from "~/utils/constants";
import { materialDynamicColors, type IMaterialDynamicColorsTheme } from "../utils/material";

const Page: Component = () => {
  const [shouldStoreCredentials, setStoreCredentials] = createSignal(false);

  const handleAuthentication = async (event: SubmitEvent) => {
    event.preventDefault();
    setStore("loading", true);

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
      const error = await response.text();
      // If it's stored, we prevent to keep the actual credentials.
      clearStoredCredentials();

      setStore({
        loading: false,

        error,
        files: null
      });

      return;
    }

    const json = await response.json() as {
      vpn_token: string,
      smb_token: string,
      files: FileEntry[]
    };

    // Since connection is successful, we can store the credentials.
    if (shouldStoreCredentials()) storeCredentials();
    
    setStore({
      loading: false,

      error: null,
      files: json.files,

      credentials: {
        ...store.credentials,
        vpn_token: json.vpn_token,
        smb_token: json.smb_token
      }
    });
  };

  onMount(async () => {
    const { dark } = await materialDynamicColors("#f87171");
    const root = document.querySelector(':root') as HTMLElement;

    root.style.setProperty("--primary", dark.primary);
    root.style.setProperty("--onPrimary", dark.onPrimary);
    root.style.setProperty("--primaryContainer", dark.primaryContainer);
    root.style.setProperty("--onPrimaryContainer", dark.onPrimaryContainer);
    root.style.setProperty("--secondary", dark.secondary);
    root.style.setProperty("--onSecondary", dark.onSecondary);
    root.style.setProperty("--secondaryContainer", dark.secondaryContainer);
    root.style.setProperty("--onSecondaryContainer", dark.onSecondaryContainer);
    root.style.setProperty("--tertiary", dark.tertiary);
    root.style.setProperty("--onTertiary", dark.onTertiary);
    root.style.setProperty("--tertiaryContainer", dark.tertiaryContainer);
    root.style.setProperty("--onTertiaryContainer", dark.onTertiaryContainer);
    root.style.setProperty("--error", dark.error);
    root.style.setProperty("--onError", dark.onError);
    root.style.setProperty("--errorContainer", dark.errorContainer);
    root.style.setProperty("--onErrorContainer", dark.onErrorContainer);
    root.style.setProperty("--background", dark.background);
    root.style.setProperty("--onBackground", dark.onBackground);
    root.style.setProperty("--surface", dark.surface);
    root.style.setProperty("--onSurface", dark.onSurface);
    root.style.setProperty("--surfaceVariant", dark.surfaceVariant);
    root.style.setProperty("--onSurfaceVariant", dark.onSurfaceVariant);
    root.style.setProperty("--outline", dark.outline);
    root.style.setProperty("--outlineVariant", dark.outlineVariant);
    root.style.setProperty("--shadow", dark.shadow);
    root.style.setProperty("--scrim", dark.scrim);
    root.style.setProperty("--inverseSurface", dark.inverseSurface);
    root.style.setProperty("--inverseOnSurface", dark.inverseOnSurface);
    root.style.setProperty("--inversePrimary", dark.inversePrimary);
    root.style.setProperty("--surfaceDim", dark.surfaceDim);
    root.style.setProperty("--surfaceBright", dark.surfaceBright);
    root.style.setProperty("--surfaceContainerLowest", dark.surfaceContainerLowest);
    root.style.setProperty("--surfaceContainerLow", dark.surfaceContainerLow);
    root.style.setProperty("--surfaceContainer", dark.surfaceContainer);
    root.style.setProperty("--surfaceContainerHigh", dark.surfaceContainerHigh);
    root.style.setProperty("--surfaceContainerHighest", dark.surfaceContainerHighest);
  })

  return (
    <div class="min-h-screen h-full bg-surface text-onBackground px-4 py-8">
      <div class="bg-surfaceContainer max-w-[450px] w-full mx-auto rounded-lg flex flex-col border border-outline">
        <div class="flex flex-shrink-0 border-b border-outline">
          <button
            type="button"
            class="outline-none px-3 py-4 rounded-l-lg w-full border-r border-outline"
            classList={{
              "text-onSecondaryContainer bg-secondaryContainer/40": store.origin.startsWith(SMB_USER),
              "text-onSurface bg-transparent": !store.origin.startsWith(SMB_USER),
            }}
            onClick={() => {
              setStore({
                origin: SMB_USER + "/" + store.credentials.username,
                path: ""
              });
            }}
          >
            Personnel
          </button>
          <button
            type="button"
            class="outline-none px-3 py-4 rounded-r-lg w-full"
            classList={{
              "text-onSecondaryContainer bg-secondaryContainer/40": store.origin === SMB_IUT,
              "text-onSurface bg-transparent": store.origin !== SMB_IUT,
            }}
            onClick={() => {
              setStore({
                origin: SMB_IUT,
                path: "pedagogie/pedago-iut"
              });
            }}
          >
            Pédagogie
          </button>
        </div>

        <Show when={!store.credentials.vpn_token && !store.credentials.vpn_token}
          fallback={(
            <div class="flex items-center justify-between p-4">
              <p class="text-sm">
                Connecté à <span class="text-primary font-medium">{store.credentials.username}</span>
              </p>
              <button
                type="button"
                class="px-4 py-1.5 text-sm rounded-lg border border-outline text-onPrimaryContainer hover:bg-primary hover:text-onPrimary"
                onClick={() => {
                  clearStoredCredentials();
                  setStore({
                    credentials: {
                      username: "",
                      password: "",
                      vpn_token: null,
                      smb_token: null
                    }
                  });
                }}
              >
                Déconnecter
              </button>
            </div>
          )}
        >
          <form
            class="flex flex-col gap-3 p-4"
            onSubmit={handleAuthentication}
          >
            <input
              class="bg-transparent border px-3 py-3 rounded-md focus:outline text-onSurface border-outline outline-outline focus:bg-secondaryContainer/20"
              type="text"
              value={store.credentials.username}
              onInput={(e) => {
                if (store.origin.startsWith(SMB_USER)) {
                  setStore("origin", SMB_USER + "/" + e.currentTarget.value);
                }
                
                setStore("credentials", "username", e.currentTarget.value)
              }}
            />

            <input
              class="bg-transparent border px-3 py-3 rounded-md focus:outline text-onSurface border-outline outline-outline focus:bg-secondaryContainer/20"
              type="password"
              value={store.credentials.password}
              onInput={(e) => setStore("credentials", "password", e.currentTarget.value)}
            />

            <label
              class="flex items-center gap-2 py-3 text-onSurface"
            >
              <input
                class="w-4 h-4"
                type="checkbox"
                checked={shouldStoreCredentials()}
                onChange={(e) => setStoreCredentials(e.currentTarget.checked)}
              />
              Se souvenir de ces identifiants
            </label>

            <button
              disabled={store.loading}
              type="submit"
              class="px-4 py-2.5 rounded-lg bg-primary text-onPrimary"
            >
              {store.loading ? "Chargement" : "Initialiser une session"}
            </button>
          </form>
        </Show>
      </div>
      
      <Show when={store.files}>
        {files => (
          <div class="border border-outline rounded-lg mt-6 overflow-hidden">
            <div class="pl-6 pr-4 py-2 bg-surfaceContainerHigh border-b border-outline">
              <p class="text-lg">
                {store.origin} {store.path.split("/").map((part) => ` > ${part}`)}
              </p>

            </div>
            <div class="flex flex-col">
              <For each={files()}>
                {file => (
                  <a
                    onClick={async () => {

                    }}
                    class="py-3 px-6 cursor-pointer text-onSurfaceVariant hover:text-onSurfaceVariant hover:bg-surfaceContainer"
                  >
                    <span>{file.name}</span>
                  </a>
                )}
              </For>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
};

export default Page;
