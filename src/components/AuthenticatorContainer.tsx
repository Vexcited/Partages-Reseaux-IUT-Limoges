import type { SerializedFileEntry } from "~/utils/files";
import { type Component, Show, createSignal } from "solid-js";
import { setStore, store, storeCredentials, createCache } from "~/store";
import { SMB_IUT, SMB_USER } from "~/utils/constants";

import MdiCheck from '~icons/mdi/check'

const AuthenticatorContainer: Component = () => {
  const [shouldStoreCredentials, setStoreCredentials] = createSignal(false);

  const handleAuthentication = async (event: SubmitEvent) => {
    event.preventDefault();
    setStore("loading", true);

    // Since connection is successful, we can store the credentials.
    if (shouldStoreCredentials()) {
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
      const error = await response.text();
      localStorage.clear();

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
      files: SerializedFileEntry[]
    };

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

    createCache();
  };

  return (
    <div class="bg-surfaceContainer max-w-[450px] w-full mx-auto rounded-lg flex flex-col border border-outline">
      <div class="flex flex-shrink-0 border-b border-outline">
        <button
          type="button"
          class="outline-none px-3 py-4 rounded-l-lg w-full border-r border-outline flex items-center justify-center gap-2"
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
          <Show when={store.origin.startsWith(SMB_USER)}>
            <MdiCheck />
          </Show>
          Personnel
        </button>
        <button
          type="button"
          class="outline-none px-3 py-4 rounded-r-lg w-full flex items-center justify-center gap-2"
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
          <Show when={store.origin === SMB_IUT}>
            <MdiCheck />
          </Show>
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
                localStorage.removeItem("smb-session:cache");

                setStore({
                  path: store.origin === SMB_IUT ? "pedagogie/pedago-iut" : "",
                  files: null,
                  error: null,
                  loading: false,

                  credentials: {
                    ...store.credentials,
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
            placeholder="Nom d'utilisateur"
            class="bg-transparent border px-3 py-3 rounded-md focus:outline text-onSurface border-outline outline-outline focus:bg-secondaryContainer/20 placeholder:text-onSurface/30"
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
            placeholder="Mot de passe"
            class="bg-transparent border px-3 py-3 rounded-md focus:outline text-onSurface border-outline outline-outline focus:bg-secondaryContainer/20 placeholder:text-onSurface/30"
            type="password"
            value={store.credentials.password}
            onInput={(e) => setStore("credentials", "password", e.currentTarget.value)}
          />

          <label
            class="flex items-center gap-2 py-3 text-onSurface justify-center"
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
  )
};

export default AuthenticatorContainer;
