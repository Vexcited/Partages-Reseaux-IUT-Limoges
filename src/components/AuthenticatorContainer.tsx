import type { SerializedFileEntry } from "~/utils/files";
import { type Component, Show, createSignal } from "solid-js";
import { setStore, store, storeCredentials, createCache } from "~/store";
import { SMB_IUT, SMB_USER } from "~/utils/constants";

import MdiCheck from '~icons/mdi/check'
import { initAuth, logoutAuth } from "~/client/auth";

const AuthenticatorContainer: Component = () => {
  const [shouldStoreCredentials, setStoreCredentials] = createSignal(localStorage.getItem("credentials") !== null);

  const handleAuthentication = async (event: SubmitEvent) => {
    event.preventDefault();
    await initAuth(shouldStoreCredentials());
  };

  const handleOriginChange = async (origin: string, path = "") => {
    if (store.credentials.vpn_token) {
      await logoutAuth(true);
      setStore({ origin, path });
      await initAuth(shouldStoreCredentials());
    }
    // Just change the origin and path if the user is not authenticated.
    else setStore({ origin, path });
  }

  return (
    <div class="bg-surfaceContainer max-w-[450px] w-full mx-auto rounded-lg flex flex-col border border-outline">
      <div class="flex flex-shrink-0 border-b border-outline divide-x divide-outline">
        <button
          type="button"
          class="outline-none px-3 py-4 rounded-l-lg w-full flex items-center justify-center gap-2"
          classList={{
            "text-onSecondaryContainer bg-secondaryContainer/40": store.origin.startsWith(SMB_USER),
            "text-onSurface bg-transparent": !store.origin.startsWith(SMB_USER),
          }}
          onClick={() => handleOriginChange(SMB_USER + "/" + store.credentials.username)}
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
          onClick={() => handleOriginChange(SMB_IUT, "pedagogie/pedago-iut")}
        >
          <Show when={store.origin === SMB_IUT}>
            <MdiCheck />
          </Show>
          Pédagogie
        </button>
      </div>

      <Show when={!store.credentials.vpn_token && !store.credentials.smb_token}
        fallback={(
          <div class="flex items-center justify-between p-4">
            <p class="text-sm">
              Connecté à <span class="text-primary font-medium">{store.credentials.username}</span>
            </p>
            <button
              type="button"
              class="px-4 py-1.5 text-sm rounded-lg border border-outline text-onSurface hover:bg-primary hover:text-onPrimary"
              onClick={() => logoutAuth()}
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
