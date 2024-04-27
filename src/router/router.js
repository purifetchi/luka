import { createMemoryHistory, createRouter } from "vue-router";
import Index from "@/components/Index.vue"; 
import InstanceInformation from "@/components/InstanceInformation.vue";

const routes = [
    { path: "/",  component: Index },
    { path: "/info", component: InstanceInformation }
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes
});