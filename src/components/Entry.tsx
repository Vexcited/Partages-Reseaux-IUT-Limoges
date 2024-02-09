import { type Component } from "solid-js";
import { createCache, setStore, store } from "~/store";
import { SerializedFileEntry } from "~/utils/files";

import MdiFolder from "~icons/mdi/folder";
import MdiFile from "~icons/mdi/file";
import { handleEnterDirectory } from "~/client/directory";

const Entry: Component<SerializedFileEntry> = (entry) => {
  return (
    <a
      onClick={() => handleEnterDirectory(entry.fullPath, `${store.origin}/${store.path}`)}
      class="py-3 flex gap-2 items-center px-6 cursor-pointer text-onSurfaceVariant hover:text-onSurfaceVariant hover:bg-surfaceContainer"
    >
      {entry.isDirectory ? <MdiFolder /> : <MdiFile />}
      <span>{entry.name}</span>
    </a>
  );
};

export default Entry;
