import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import "~/styles/globals.css";

// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { type Component, Suspense, createEffect, on } from "solid-js";

import { pushThemeToCSS } from "~/utils/theme";
import { shouldUseDarkTheme } from "./store/theme";

const App: Component = () => {
  // Push the theme to the CSS variables.
  createEffect(on(shouldUseDarkTheme, (isDark) => pushThemeToCSS(isDark)));

  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      <FileRoutes />
    </Router>
  );
};

export default App;
