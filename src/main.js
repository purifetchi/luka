import './assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'

import { createApp } from 'vue'

import { router } from "@/router/router.js";
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiHeart3Line, RiRepeatLine, RiReplyLine } from "oh-vue-icons/icons";

addIcons(RiHeart3Line, RiRepeatLine, RiReplyLine);

createApp(App)
    .component("v-icon", OhVueIcon)
    .use(router)
    .mount('#app')
