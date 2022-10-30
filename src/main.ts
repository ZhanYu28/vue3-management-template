import store from "@/store/store"
import { createApp } from 'vue'
import App from './App.vue'
import './assets/iconfont/iconfont.css'
import router from '@/router/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/mock/mockserve'
import { useThemeStore } from "./store/theme"
import changeTheme from "./utils/changeTheme"

createApp(App)
.use(store)
.use(router)
.use(ElementPlus)
.mount('#app')

const themeEl = document.querySelector('#theme')
const ThemeStore = useThemeStore()
changeTheme(ThemeStore.getActiveName)


