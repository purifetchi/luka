import './assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'

import { createApp } from 'vue'

import { router } from "@/router/router.js";
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { 
    RiHeart3Line, 
    RiRepeatLine, 
    RiReplyLine, 
    RiReplyFill, 
    RiRepeatFill, 
    RiHeart3Fill, 
    RiEyeLine, 
    RiEyeOffLine, 
    RiHome4Line, 
    RiGlobalLine, 
    RiCommunityLine, 
    RiBookmarkLine,
    RiBookmarkFill,
    RiMenuLine
} from "oh-vue-icons/icons";

addIcons(
    RiHeart3Line, 
    RiRepeatLine, 
    RiReplyLine, 
    RiReplyFill, 
    RiRepeatFill, 
    RiHeart3Fill, 
    RiEyeLine, 
    RiEyeOffLine, 
    RiHome4Line, 
    RiGlobalLine, 
    RiCommunityLine, 
    RiBookmarkLine, 
    RiBookmarkFill,
    RiMenuLine
);

createApp(App)
    .component("v-icon", OhVueIcon)
    .use(router)
    .mount('#app')
