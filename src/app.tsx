import "./styles/globals.css";

// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { Suspense, onMount } from "solid-js";
import { initializeTheme } from "./utils/theme";

export default function App() {
  onMount(() => initializeTheme());

  return (
    <Router root={(props) => <Suspense>{props.children}</Suspense>}>
      <FileRoutes />
    </Router>
  );
}
