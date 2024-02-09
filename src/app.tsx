import "@fontsource/lexend/400.css";
import "@fontsource/lexend/500.css";
import "@fontsource/lexend/600.css";
import "~/styles/globals.css";

// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { type Component, Suspense, onMount } from "solid-js";

import { initializeTheme } from "~/utils/theme";

const App: Component = () => {
  onMount(() => initializeTheme());

  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      <FileRoutes />
    </Router>
  );
};

export default App;
