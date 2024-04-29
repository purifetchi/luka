import './assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'

import { createApp } from 'vue'

import { router } from "@/router/router.js";
import App from './App.vue'

createApp(App)
    .use(router)
    .mount('#app')
