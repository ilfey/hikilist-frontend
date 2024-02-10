import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { store } from "./store"

import "./styles/global.css";

import App from "./App.vue";

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

app.use(store)
app.use(router);

app.mount("#app");