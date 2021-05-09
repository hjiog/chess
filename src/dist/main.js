"use strict";
exports.__esModule = true;
var vue_1 = require("vue");
var head_1 = require("@vueuse/head");
var vue_router_1 = require("vue-router");
var virtual_generated_pages_1 = require("virtual:generated-pages");
var layouts_generated_1 = require("layouts-generated");
var App_vue_1 = require("./App.vue");
require("virtual:windi.css");
require("virtual:windi-devtools");
require("./styles/main.css");
var head = head_1.createHead();
var routes = layouts_generated_1.setupLayouts(virtual_generated_pages_1["default"]);
var router = vue_router_1.createRouter({ routes: routes, history: vue_router_1.createWebHistory('/chess/') });
var app = vue_1.createApp(App_vue_1["default"]);
Object.values(import.meta.globEager('./modules/*.ts')).map(function (i) { var _a; return (_a = i.install) === null || _a === void 0 ? void 0 : _a.call(i, { app: app }); });
app.use(router);
app.use(head);
app.mount('#app');
// vite-ssg在build时无法和antd配合,会报错 Must use import to load ES Module ...
// import { ViteSSG } from 'vite-ssg'
// https://github.com/antfu/vite-ssg
// `export const createApp` is required
// export const createApp = ViteSSG(
//   // the root component
//   App,
//   // vue-router options
//   { routes },
//   // function to have custom setups
//   // ctx ==> { app, router, isClient }
//   (ctx) => {
//     // install plugins etc.
//     // install all modules under `modules/`
//     Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.(ctx))
//   },
// )
