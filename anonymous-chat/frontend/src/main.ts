import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import io from "socket.io-client";

const socket = io("http://localhost:3065", { transports: ["websocket"] });
const app = createApp(App);
app.use(store).use(router).mount("#app");
app.config.globalProperties.$socket = socket;
