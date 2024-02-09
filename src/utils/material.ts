import { rgbaFromArgb, argbFromHex, SchemeFidelity, MaterialDynamicColors, Hct } from "@material/material-color-utilities";

/** All available color tokens. */
export const tokens = [
  "primaryPaletteKeyColor",
  "secondaryPaletteKeyColor",
  "tertiaryPaletteKeyColor",
  "neutralPaletteKeyColor",
  "neutralVariantPaletteKeyColor",
  "background",
  "onBackground",
  "surface",
  "surfaceDim",
  "surfaceBright",
  "surfaceContainerLowest",
  "surfaceContainerLow",
  "surfaceContainer",
  "surfaceContainerHigh",
  "surfaceContainerHighest",
  "onSurface",
  "surfaceVariant",
  "onSurfaceVariant",
  "inverseSurface",
  "inverseOnSurface",
  "outline",
  "outlineVariant",
  "shadow",
  "scrim",
  "surfaceTint",
  "primary",
  "onPrimary",
  "primaryContainer",
  "onPrimaryContainer",
  "inversePrimary",
  "secondary",
  "onSecondary",
  "secondaryContainer",
  "onSecondaryContainer",
  "tertiary",
  "onTertiary",
  "tertiaryContainer",
  "onTertiaryContainer",
  "error",
  "onError",
  "errorContainer",
  "onErrorContainer",
  "primaryFixed",
  "primaryFixedDim",
  "onPrimaryFixed",
  "onPrimaryFixedVariant",
  "secondaryFixed",
  "secondaryFixedDim",
  "onSecondaryFixed",
  "onSecondaryFixedVariant",
  "tertiaryFixed",
  "tertiaryFixedDim",
  "onTertiaryFixed",
  "onTertiaryFixedVariant"
] as const;

const toTailwindRGB = (argb: number): string => {
  const { r, g, b } = rgbaFromArgb(argb);
  return `${r}, ${g}, ${b}`;
};

function themeToJson (schemes: ReturnType<typeof schemesFromSourceColor>) {
  const theme = {} as { [K in typeof tokens[number]]: string };

  for (const property of tokens) {
    theme[property] = toTailwindRGB(schemes[property]);
  }

  return theme;
}

export function createMaterialDynamicColors (hex: string, isDark = false) {
  const source = argbFromHex(hex);
  const theme = schemesFromSourceColor(source, isDark);

  return themeToJson(theme);
}

function schemesFromSourceColor (source: number, isDark = false, contrastLevel = 0) {
  const hct = Hct.fromInt(source);
  const scheme = new SchemeFidelity(hct, isDark, contrastLevel);

  return Object.fromEntries(
    tokens.map((token) => [token, MaterialDynamicColors[token].getArgb(scheme)])
  ) as { [K in typeof tokens[number]]: number };
}
