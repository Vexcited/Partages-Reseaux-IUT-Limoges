import { type Component, For, Show } from "solid-js";
import { store } from "~/store";

import AuthenticatorContainer from "~/components/AuthenticatorContainer";
import Entry from "~/components/Entry";
import { handleEnterDirectory } from "~/client/directory";

const Page: Component = () => {
  return (
    <div class="min-h-screen h-full bg-surface text-onBackground px-4 py-6"
      classList={{ "flex justify-center items-center": store.files === null }}
    >
      <AuthenticatorContainer />

      <Show when={store.files}>
        {files => (
          <div class="border border-outline rounded-lg mt-6 overflow-hidden">
            <div class="pl-6 pr-4 py-2 bg-surfaceContainerHigh border-b border-outline">
              <div class="text-lg flex gap-2 flex-wrap">
                <p>{store.origin.slice(2)}</p>

                <For each={store.path.split("/")}>
                  {part => (
                    <>
                      <span>&gt;</span>
                      <button
                        onClick={() => {
                          const parts = store.path.split("/");
                          const pathSelected = parts
                            .slice(0, parts.indexOf(part) + 1)
                            .join("/");

                          const fullPathSelected = store.origin + "/" + pathSelected;
                          handleEnterDirectory(fullPathSelected);
                        }}
                        type="button"
                        class="text-onSurfaceVariant"
                      >
                        {part}
                      </button>
                    </>
                  )}
                </For>
              </div>

            </div>
            <div class="flex flex-col">
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
