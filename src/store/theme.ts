import { createPrefersDark } from "@solid-primitives/media";
import { createSignal, createMemo, createRoot } from "solid-js";

export enum THEME_TYPE {
  SYSTEM = "system",
  LIGHT = "light",
  DARK = "dark",
}

export const { selectedTheme, setSelectedTheme, shouldUseDarkTheme} = createRoot(() => {
  const prefersDark = createPrefersDark();
  const [selectedTheme, setSelectedTheme] = createSignal<THEME_TYPE>(THEME_TYPE.SYSTEM);
  const shouldUseDarkTheme = createMemo(() => {
    if (selectedTheme() === THEME_TYPE.SYSTEM) {
      return prefersDark();
    }
  
    return selectedTheme() === THEME_TYPE.DARK;
  });

  return {
    selectedTheme,
    setSelectedTheme,
    shouldUseDarkTheme,
  };
});
