/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: "Lexend, Arial, sans-serif"
    },

    extend: {
      colors: {
        primaryPaletteKeyColor: "rgba(var(--primaryPaletteKeyColor), <alpha-value>)",
        secondaryPaletteKeyColor: "rgba(var(--secondaryPaletteKeyColor), <alpha-value>)",
        tertiaryPaletteKeyColor: "rgba(var(--tertiaryPaletteKeyColor), <alpha-value>)",
        neutralPaletteKeyColor: "rgba(var(--neutralPaletteKeyColor), <alpha-value>)",
        neutralVariantPaletteKeyColor: "rgba(var(--neutralVariantPaletteKeyColor), <alpha-value>)",
        background: "rgba(var(--background), <alpha-value>)",
        onBackground: "rgba(var(--onBackground), <alpha-value>)",
        surface: "rgba(var(--surface), <alpha-value>)",
        surfaceDim: "rgba(var(--surfaceDim), <alpha-value>)",
        surfaceBright: "rgba(var(--surfaceBright), <alpha-value>)",
        surfaceContainerLowest: "rgba(var(--surfaceContainerLowest), <alpha-value>)",
        surfaceContainerLow: "rgba(var(--surfaceContainerLow), <alpha-value>)",
        surfaceContainer: "rgba(var(--surfaceContainer), <alpha-value>)",
        surfaceContainerHigh: "rgba(var(--surfaceContainerHigh), <alpha-value>)",
        surfaceContainerHighest: "rgba(var(--surfaceContainerHighest), <alpha-value>)",
        onSurface: "rgba(var(--onSurface), <alpha-value>)",
        surfaceVariant: "rgba(var(--surfaceVariant), <alpha-value>)",
        onSurfaceVariant: "rgba(var(--onSurfaceVariant), <alpha-value>)",
        inverseSurface: "rgba(var(--inverseSurface), <alpha-value>)",
        inverseOnSurface: "rgba(var(--inverseOnSurface), <alpha-value>)",
        outline: "rgba(var(--outline), <alpha-value>)",
        outlineVariant: "rgba(var(--outlineVariant), <alpha-value>)",
        shadow: "rgba(var(--shadow), <alpha-value>)",
        scrim: "rgba(var(--scrim), <alpha-value>)",
        surfaceTint: "rgba(var(--surfaceTint), <alpha-value>)",
        primary: "rgba(var(--primary), <alpha-value>)",
        onPrimary: "rgba(var(--onPrimary), <alpha-value>)",
        primaryContainer: "rgba(var(--primaryContainer), <alpha-value>)",
        onPrimaryContainer: "rgba(var(--onPrimaryContainer), <alpha-value>)",
        inversePrimary: "rgba(var(--inversePrimary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        onSecondary: "rgba(var(--onSecondary), <alpha-value>)",
        secondaryContainer: "rgba(var(--secondaryContainer), <alpha-value>)",
        onSecondaryContainer: "rgba(var(--onSecondaryContainer), <alpha-value>)",
        tertiary: "rgba(var(--tertiary), <alpha-value>)",
        onTertiary: "rgba(var(--onTertiary), <alpha-value>)",
        tertiaryContainer: "rgba(var(--tertiaryContainer), <alpha-value>)",
        onTertiaryContainer: "rgba(var(--onTertiaryContainer), <alpha-value>)",
        error: "rgba(var(--error), <alpha-value>)",
        onError: "rgba(var(--onError), <alpha-value>)",
        errorContainer: "rgba(var(--errorContainer), <alpha-value>)",
        onErrorContainer: "rgba(var(--onErrorContainer), <alpha-value>)",
        primaryFixed: "rgba(var(--primaryFixed), <alpha-value>)",
        primaryFixedDim: "rgba(var(--primaryFixedDim), <alpha-value>)",
        onPrimaryFixed: "rgba(var(--onPrimaryFixed), <alpha-value>)",
        onPrimaryFixedVariant: "rgba(var(--onPrimaryFixedVariant), <alpha-value>)",
        secondaryFixed: "rgba(var(--secondaryFixed), <alpha-value>)",
        secondaryFixedDim: "rgba(var(--secondaryFixedDim), <alpha-value>)",
        onSecondaryFixed: "rgba(var(--onSecondaryFixed), <alpha-value>)",
        onSecondaryFixedVariant: "rgba(var(--onSecondaryFixedVariant), <alpha-value>)",
        tertiaryFixed: "rgba(var(--tertiaryFixed), <alpha-value>)",
        tertiaryFixedDim: "rgba(var(--tertiaryFixedDim), <alpha-value>)",
        onTertiaryFixed: "rgba(var(--onTertiaryFixed), <alpha-value>)",
        onTertiaryFixedVariant: "rgba(var(--onTertiaryFixedVariant), <alpha-value>)"
      }
    }
  },
  plugins: [
    require("@corvu/tailwind")
  ]
};
