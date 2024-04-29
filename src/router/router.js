import { createWebHistory, createRouter } from "vue-router";
import Landing from "@/components/views/Landing.vue"; 
import InstanceInformation from "@/components/InstanceInformation.vue";
import HomeTimeline from "@/components/HomeTimeline.vue";
import UserView from "@/components/views/UserView.vue";

const routes = [
    { path: "/",  component: Landing },
    { path: "/info", component: InstanceInformation },
    { path: "/home", component: HomeTimeline },
    { path: "/user/:id", component: UserView }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});