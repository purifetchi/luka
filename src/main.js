import './assets/main.css'
import '../node_modules/flowbite-vue/dist/index.css'

import { createApp } from 'vue'

import { router } from "@/router/router.js";
import App from './App.vue'

import i18next from "i18next";
import I18NextVue from "i18next-vue";
import Translations from "@/intl/i18n.js";

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
    RiMenuLine,
    RiLockUnlockLine,
    RiLockLine,
    RiSearchLine,
    RiUpload2Line
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
    RiMenuLine,
    RiLockUnlockLine,
    RiLockLine,
    RiSearchLine,
    RiUpload2Line
);

i18next.init({
    resources: Translations,
    fallbackLng: "en",
});

createApp(App)
    .component("v-icon", OhVueIcon)
    .use(router)
    .use(I18NextVue, { i18next })
    .mount('#app')
