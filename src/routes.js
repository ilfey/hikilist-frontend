import Animes from "./pages/animes/Animes.vue"
import Anime from "./pages/anime/Anime.vue"
import Login from "./pages/login/Login.vue"
import Register from "./pages/register/Register.vue"
import Lists from "./pages/lists/Lists.vue"

export const routes = [
    {
        name: "Animes",
        path: "/",
        component: Animes,
    },
    {
        name: "Anime",
        path: "/animes/:id",
        component: Anime,
    },
    {
        name: "Login",
        path: "/login",
        component: Login,
    },
    
    {
        name: "Register",
        path: "/register",
        component: Register,
    },
    {
        name: "Lists",
        path: "/lists",
        component: Lists,
    },
];