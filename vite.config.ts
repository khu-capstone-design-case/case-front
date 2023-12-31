import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [react({ tsDecorators: true }), svgr(), tsconfigPaths()],
  resolve: {
    alias: {
      react: path.resolve("./node_modules/react"),
    },
  },
});
