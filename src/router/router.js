import { createWebHistory, createRouter } from "vue-router";
import Landing from "@/components/views/Landing.vue"; 
import HomeTimeline from "@/components/views/HomeTimeline.vue";
import UserView from "@/components/views/UserView.vue";
import PublicTimeline from "@/components/views/PublicTimeline.vue";

const routes = [
    { path: "/",  component: Landing },
    { path: "/timelines/home", component: HomeTimeline },
    { path: "/timelines/public", component: PublicTimeline },
    { path: "/user/:id", component: UserView }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});