import { defineConfig } from "@solidjs/start/config";
import icons from "unplugin-icons/vite";

export default defineConfig({
  plugins: [icons({ compiler: "solid" })],
  start: { ssr: false }
});
