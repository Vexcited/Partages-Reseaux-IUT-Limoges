/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        onPrimary: "var(--onPrimary)",
        primaryContainer: "var(--primaryContainer)",
        onPrimaryContainer: "var(--onPrimaryContainer)",
        secondary: "var(--secondary)",
        onSecondary: "var(--onSecondary)",
        secondaryContainer: "var(--secondaryContainer)",
        onSecondaryContainer: "var(--onSecondaryContainer)",
        tertiary: "var(--tertiary)",
        onTertiary: "var(--onTertiary)",
        tertiaryContainer: "var(--tertiaryContainer)",
        onTertiaryContainer: "var(--onTertiaryContainer)",
        error: "var(--error)",
        onError: "var(--onError)",
        errorContainer: "var(--errorContainer)",
        onErrorContainer: "var(--onErrorContainer)",
        background: "var(--background)",
        onBackground: "var(--onBackground)",
        surface: "var(--surface)",
        onSurface: "var(--onSurface)",
        surfaceVariant: "var(--surfaceVariant)",
        onSurfaceVariant: "var(--onSurfaceVariant)",
        outline: "var(--outline)",
        outlineVariant: "var(--outlineVariant)",
        shadow: "var(--shadow)",
        scrim: "var(--scrim)",
        inverseSurface: "var(--inverseSurface)",
        inverseOnSurface: "var(--inverseOnSurface)",
        inversePrimary: "var(--inversePrimary)",
        surfaceDim: "var(--surfaceDim)",
        surfaceBright: "var(--surfaceBright)",
        surfaceContainerLowest: "var(--surfaceContainerLowest)",
        surfaceContainerLow: "var(--surfaceContainerLow)",
        surfaceContainer: "var(--surfaceContainer)",
        surfaceContainerHigh: "var(--surfaceContainerHigh)",
        surfaceContainerHighest: "var(--surfaceContainerHighest)"
      },
    }
  },
  plugins: [
    require('@corvu/tailwind')
  ],
};
