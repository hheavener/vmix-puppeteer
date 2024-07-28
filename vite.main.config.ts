import type { ConfigEnv, UserConfig } from "vite"
import { defineConfig, mergeConfig } from "vite"
import {
  getBuildConfig,
  getBuildDefine,
  external,
  pluginHotRestart,
  aliases
} from "./vite.base.config"
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
    define,
    plugins: [vue(), vueJsx(), vueDevTools(), pluginHotRestart("restart")],
    resolve: { alias: aliases, mainFields: ["module", "jsnext:main", "jsnext"] }
  }

  return mergeConfig(getBuildConfig(forgeEnv), config)
})
