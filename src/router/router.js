import { createWebHistory, createRouter } from "vue-router";
import Landing from "@/components/views/Landing.vue"; 
import HomeTimeline from "@/components/views/HomeTimeline.vue";
import UserView from "@/components/views/UserView.vue";
import PublicTimeline from "@/components/views/PublicTimeline.vue";
import PostView from "@/components/views/PostView.vue";
import OAuthCallback from "@/components/views/OAuthCallback.vue";
import CommunityTimeline from "@/components/views/CommunityTimeline.vue";
import BookmarkTimeline from "@/components/views/BookmarkTimeline.vue";

const routes = [
    { path: "/",  component: Landing },
    
    { path: "/timelines/home", component: HomeTimeline },
    { path: "/timelines/public", component: PublicTimeline },
    { path: "/timelines/community", component: CommunityTimeline },
    { path: "/timelines/bookmarks", component: BookmarkTimeline },
    
    { path: "/user/:id", component: UserView },
    { path: "/posts/:id", component: PostView },
    { path: "/auth_callback", component: OAuthCallback }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});