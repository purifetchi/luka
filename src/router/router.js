import { createWebHistory, createRouter } from "vue-router";
import Index from "@/components/Index.vue"; 
import InstanceInformation from "@/components/InstanceInformation.vue";
import HomeTimeline from "@/components/HomeTimeline.vue";

const routes = [
    { path: "/",  component: Index },
    { path: "/info", component: InstanceInformation },
    { path: "/home", component: HomeTimeline }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});