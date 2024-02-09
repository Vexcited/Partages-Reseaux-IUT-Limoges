import { createMaterialDynamicColors, tokens } from "./material";

export const pushThemeToCSS = (isDark: boolean) => {
  const theme = createMaterialDynamicColors("#f87171", isDark);

  const root = document.querySelector(":root") as HTMLElement;
  for (const property of tokens) {
    root.style.setProperty(`--${property}`, theme[property]);
  }
};
