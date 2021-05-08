// vite.config.ts
import path from "path";
import {defineConfig} from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import ViteIcons, {ViteIconsResolver} from "vite-plugin-icons";
import ViteComponents from "vite-plugin-components";
import Markdown from "vite-plugin-md";
import WindiCSS from "vite-plugin-windicss";
import {VitePWA} from "vite-plugin-pwa";
import VueI18n from "@intlify/vite-plugin-vue-i18n";
import Prism from "markdown-it-prism";
import styleImport from "vite-plugin-style-import";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve("/home/fighting/\u684C\u9762/vue/vue\u5B9E\u6218/chess-vue3", "src")}/`
    }
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),
    styleImport({
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`;
          }
        }
      ]
    }),
    Pages({
      extensions: ["vue", "md"]
    }),
    Layouts(),
    Markdown({
      wrapperClasses: "prose prose-sm m-auto text-left",
      headEnabled: true,
      markdownItSetup(md) {
        md.use(Prism);
      }
    }),
    ViteComponents({
      extensions: ["vue", "md"],
      customLoaderMatcher: (id) => id.endsWith(".md"),
      customComponentResolvers: [
        ViteIconsResolver({
          componentPrefix: "",
          enabledCollections: ["carbon"]
        })
      ]
    }),
    ViteIcons(),
    WindiCSS({
      safelist: "prose prose-sm m-auto text-left"
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "chess",
        short_name: "chess",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    }),
    VueI18n({
      include: [path.resolve("/home/fighting/\u684C\u9762/vue/vue\u5B9E\u6218/chess-vue3", "locales/**")]
    })
  ],
  ssgOptions: {
    script: "async",
    formatting: "minify"
  },
  optimizeDeps: {
    include: [
      "vue",
      "vue-router",
      "@vueuse/core",
      "ant-design-vue",
      "lodash-es"
    ],
    exclude: [
      "vue-demi"
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "primary-color": "#0D9488",
          "disabled-bg": "rgba(75, 85, 99, 0.5)",
          "disabled-color": "white"
        },
        javascriptEnabled: true
      }
    }
  },
  server: {
    force: true
  }
});
export {
  vite_config_default as default
};
