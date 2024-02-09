import { type Component, For, Show, createMemo } from "solid-js";
import { store } from "~/store";

import AuthenticatorContainer from "~/components/AuthenticatorContainer";
import Entry from "~/components/Entry";
import { handleEnterDirectory } from "~/client/directory";
import MdiSlashForward from '~icons/mdi/slash-forward'
const Page: Component = () => {
  const pathParts = createMemo(() => store.path.split("/"));

  return (
    <div class="min-h-screen h-full bg-surface text-onBackground px-4 py-6"
      classList={{ "flex justify-center items-center": store.files === null }}
    >
      <AuthenticatorContainer />

      <Show when={store.files}>
        {files => (
          <div class="border border-outline rounded-lg mt-6 overflow-hidden max-w-[868px] w-full mx-auto relative">
            <Show when={store.loading}>
              <div class="absolute inset-0 bg-surfaceContainer flex items-center justify-center">
                <div class="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary"></div>
              </div>
            </Show>

            <div class="p-2 bg-surfaceContainerHigh border-b border-outline">
              <div class="text-lg flex gap-1 flex-wrap items-center">
                <button
                  class="text-sm hover:bg-primary hover:text-onPrimary px-1.5 rounded-lg transition-colors"
                  onClick={() => handleEnterDirectory(store.origin, `${store.origin}/${store.path}`)}
                >
                  {store.origin.slice(2).replace("/", "@")}
                </button>

                <For each={pathParts().filter(Boolean)}>
                  {(part, index) => (
                    <>
                      <MdiSlashForward class="font-normal text-sm text-primary/60" />

                      <button
                        onClick={() => {
                          const pathSelected = pathParts()
                            .slice(0, pathParts().indexOf(part) + 1)
                            .join("/");

                          const fullPathSelected = store.origin + "/" + pathSelected;
                          handleEnterDirectory(fullPathSelected, `${store.origin}/${store.path}`);
                        }}
                        type="button"
                        class="text-sm hover:bg-primary hover:text-onPrimary px-1.5 rounded-lg transition-colors"
                        classList={{
                          "font-semibold": index() === pathParts().length - 1
                        }}
                      >
                        {part}
                      </button>
                    </>
                  )}
                </For>
              </div>

            </div>
            <div class="flex flex-col divide-y divide-outline/40">
              <For each={files()}>
                {file => <Entry {...file} /> }
              </For>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
};

export default Page;
