import { createWebHistory, createRouter } from "vue-router";
import Index from "@/components/Index.vue"; 
import InstanceInformation from "@/components/InstanceInformation.vue";
import HomeTimeline from "@/components/HomeTimeline.vue";
import UserView from "@/components/views/UserView.vue";

const routes = [
    { path: "/",  component: Index },
    { path: "/info", component: InstanceInformation },
    { path: "/home", component: HomeTimeline },
    { path: "/user/:id", component: UserView }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});