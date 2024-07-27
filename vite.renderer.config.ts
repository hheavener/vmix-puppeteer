import type { ConfigEnv, UserConfig } from "vite"
import { defineConfig } from "vite"
import { pluginExposeRenderer } from "./vite.base.config"
import { fileURLToPath, URL } from "node:url"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueDevTools from "vite-plugin-vue-devtools"

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"renderer">
  const { root, mode, forgeConfigSelf } = forgeEnv
  const name = forgeConfigSelf.name ?? ""

  return {
    root,
    mode,
    base: "./",
    build: {
      outDir: `.vite/renderer/${name}`
    },
    plugins: [vue(), vueJsx(), vueDevTools(), pluginExposeRenderer(name)],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      },
      preserveSymlinks: true
    },
    clearScreen: false
  } as UserConfig
})
