import Index from "./pages/index/Index.vue"
import Anime from "./pages/anime/Anime.vue"

export const routes = [
    {
        name: "Index",
        path: "/",
        component: Index,
    },
    {
        name: "Anime",
        path: "/animes/:id",
        component: Anime,
    },
];