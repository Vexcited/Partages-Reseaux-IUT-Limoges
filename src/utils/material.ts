// Re-export from <https://github.com/leonardorafael/material-dynamic-colors>.

export interface IMaterialDynamicColorsThemeColor {
  primary: string,
  onPrimary: string,
  primaryContainer: string,
  onPrimaryContainer: string,
  secondary: string,
  onSecondary: string,
  secondaryContainer: string,
  onSecondaryContainer: string,
  tertiary: string,
  onTertiary: string,
  tertiaryContainer: string,
  onTertiaryContainer: string,
  error: string,
  onError: string,
  errorContainer: string,
  onErrorContainer: string,
  background: string,
  onBackground: string,
  surface: string,
  onSurface: string,
  surfaceVariant: string,
  onSurfaceVariant: string,
  outline: string,
  outlineVariant: string,
  shadow: string,
  scrim: string,
  inverseSurface: string,
  inverseOnSurface: string,
  inversePrimary: string,
  surfaceDim: string,
  surfaceBright: string,
  surfaceContainerLowest: string,
  surfaceContainerLow: string,
  surfaceContainer: string,
  surfaceContainerHigh: string,
  surfaceContainerHighest: string
}

export interface IMaterialDynamicColorsTheme {
  light: IMaterialDynamicColorsThemeColor,
  dark: IMaterialDynamicColorsThemeColor
}

import { themeFromSourceColor, themeFromImage, argbFromHex, rgbaFromArgb, Theme } from "@material/material-color-utilities";

function themeToJson({ palettes, schemes }: Theme) {
  let json = JSON.parse(JSON.stringify(schemes));
  const rgb = (argb: number) => {
    const { r, g, b } = rgbaFromArgb(argb);
    return `${r}, ${g}, ${b}`;
  };

  for(let i in json)
    for (let j in json[i])
      json[i][j] = rgb(json[i][j]);

  json.dark.surfaceDim = rgb(palettes.neutral.tone(6));
  json.dark.surface = rgb(palettes.neutral.tone(6));
  json.dark.surfaceBright = rgb(palettes.neutral.tone(24));
  json.dark.surfaceContainerLowest = rgb(palettes.neutral.tone(4));
  json.dark.surfaceContainerLow = rgb(palettes.neutral.tone(10));
  json.dark.surfaceContainer = rgb(palettes.neutral.tone(12));
  json.dark.surfaceContainerHigh = rgb(palettes.neutral.tone(17));
  json.dark.surfaceContainerHighest = rgb(palettes.neutral.tone(22));
  json.dark.onSurface = rgb(palettes.neutral.tone(90));
  json.dark.onSurfaceVariant = rgb(palettes.neutralVariant.tone(80));
  json.dark.outline = rgb(palettes.neutralVariant.tone(60));
  json.dark.outlineVariant = rgb(palettes.neutralVariant.tone(30));

  json.light.surfaceDim = rgb(palettes.neutral.tone(87));
  json.light.surface = rgb(palettes.neutral.tone(98));
  json.light.surfaceBright = rgb(palettes.neutral.tone(98));
  json.light.surfaceContainerLowest = rgb(palettes.neutral.tone(100));
  json.light.surfaceContainerLow = rgb(palettes.neutral.tone(96));
  json.light.surfaceContainer = rgb(palettes.neutral.tone(94));
  json.light.surfaceContainerHigh = rgb(palettes.neutral.tone(92));
  json.light.surfaceContainerHighest = rgb(palettes.neutral.tone(90));
  json.light.onSurface = rgb(palettes.neutral.tone(10));
  json.light.onSurfaceVariant = rgb(palettes.neutralVariant.tone(30));
  json.light.outline = rgb(palettes.neutralVariant.tone(50));
  json.light.outlineVariant = rgb(palettes.neutralVariant.tone(80));

  return json;
}

export async function materialDynamicColors (from: string | File | Blob | Event | HTMLImageElement): Promise<IMaterialDynamicColorsTheme> {
  const to:any = from;
  const emptyTheme = {
    light: {},
    dark: {}
  } as IMaterialDynamicColorsTheme;

  try {
    if (typeof to === "string" && /^\#[0-9a-f]+$/i.test(to)) {
      let theme = themeFromSourceColor(argbFromHex(to));
      return themeToJson(theme);
    }
  
    if (to.src) {
      let theme = await themeFromImage(to);
      return themeToJson(theme);
    }

    let blob = new Blob();
    if (typeof to === "string") blob = await fetch(to).then(response => response.blob());
    if (to.size) blob = to;
    if (to.files && to.files[0]) blob = to.files[0];
    if (to.target && to.target.files && to.target.files[0]) blob = to.target.files[0];
    if (!blob.size) return emptyTheme;
  
    let image = new Image(64);
    image.src = URL.createObjectURL(blob);
    
    let theme = await themeFromImage(image);
    return themeToJson(theme);
  } catch(error) {
    return emptyTheme;
  }
}
