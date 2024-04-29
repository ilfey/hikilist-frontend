import { createApp } from "vue";
import { router } from "./router";
import { store } from "./store"
import { setupInterceptors } from "./api";

import "./styles/global.css";

import App from "./App.vue";

setupInterceptors()

const app = createApp(App);

app.use(store)
app.use(router);

app.mount("#app");