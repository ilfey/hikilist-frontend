import { createApp } from "vue";
import { router } from "./router";
import { store } from "./store"

import "./styles/global.css";

import App from "./App.vue";

const app = createApp(App);

app.use(store)
app.use(router);

app.mount("#app");