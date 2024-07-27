import type { ConfigEnv, UserConfig } from "vite"
import { defineConfig, mergeConfig } from "vite"
import { getBuildConfig, getBuildDefine, external, pluginHotRestart } from "./vite.base.config"
import { fileURLToPath, URL } from "node:url"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueDevTools from "vite-plugin-vue-devtools"

// https://vitejs.dev/config
export default defineConfig((env) => {
  const forgeEnv = env as ConfigEnv<"build">
  const { forgeConfigSelf } = forgeEnv
  const define = getBuildDefine(forgeEnv)
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf.entry!,
        fileName: () => "[name].js",
        formats: ["cjs"]
      },
      rollupOptions: {
        external
      }
    },
    plugins: [vue(), vueJsx(), vueDevTools(), pluginHotRestart("restart")],
    define,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      },
      mainFields: ["module", "jsnext:main", "jsnext"]
    }
  }

  return mergeConfig(getBuildConfig(forgeEnv), config)
})
