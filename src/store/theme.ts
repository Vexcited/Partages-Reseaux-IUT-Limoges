import { createPrefersDark } from "@solid-primitives/media";
import { createSignal, createMemo } from "solid-js";

const prefersDark = createPrefersDark();
export enum THEME_TYPE {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export const [selectedTheme, setSelectedTheme] = createSignal<THEME_TYPE>(THEME_TYPE.SYSTEM);
export const shouldUseDarkTheme = createMemo(() => {
  if (selectedTheme() === THEME_TYPE.SYSTEM) {
    return prefersDark();
  }

  return selectedTheme() === THEME_TYPE.DARK;
});
