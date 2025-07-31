import { createRouter, createWebHashHistory } from 'vue-router';
import Hud from './pages/Hud.vue';
import Phone from './pages/Phone.vue';

const routes = [
    { path: "/hud", component: Hud },
    { path: "/phone", component: Phone },
];

export default createRouter({
    history: createWebHashHistory(), // Hash режим = CEF
    routes
})