import { createApp} from 'vue'
import { createRouter ,createWebHistory} from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'layouts-generated'
import App from './App.vue'
import 'virtual:windi.css'
import 'virtual:windi-devtools'
import './styles/main.css'
import { createHead } from '@vueuse/head'

const head = createHead()
const routes = setupLayouts(generatedRoutes)
const router = createRouter({routes,history:createWebHistory()})
const app = createApp(App)

Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({app}))

app.use(router)
app.use(head)

app.mount('#app')

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