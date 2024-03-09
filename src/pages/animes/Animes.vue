<template>
    <aside class="flex-1"></aside>

    <main class="p-4 max-w-5xl w-full">

        <div class="mb-4 flex gap-4">
            <Search :placeholder="placeholder || ''" v-model="query" />

            <button @click="showSidebar = !showSidebar"
                class="px-3 py-1 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded-lg text-white transition duration">
                <AdjustmentsHorizontal class="w-6 h-6" />
            </button>
        </div>

        <h2 class="text-xl font-bold" v-show="loading">
            Loading...
        </h2>

        <h2 class="text-xl font-bold" v-show="query && !loading && animes.length === 0">
            Not found
        </h2>

        <section class="flex flex-wrap justify-center gap-4">
            <AnimeCard class="w-56" v-for="anime in animes" :key="anime.id" :anime="anime" />
        </section>

        <div v-if="store.state.previous || store.state.next" class="mt-4 pr-2 flex items-center justify-center gap-4">
            <button :disabled="!store.state.previous" @click="changePage(store.state.previous)"
                class="block px-3 py-1.5 font-semibold text-sm bg-primary-500 disabled:dark:bg-gray-800 disabled:bg-gray-100 disabled:text-black disabled:dark:text-white hover:bg-primary-700 rounded text-white">
                Предыдущая страница
            </button>

            <span class="">
                {{ params.page || 1 }} / {{ pages }}
            </span>

            <button :disabled="!store.state.next" @click="changePage(store.state.next)"
                class="block px-3 py-1.5 font-semibold text-sm bg-primary-500 disabled:dark:bg-gray-800 disabled:bg-gray-100 disabled:text-black disabled:dark:text-white hover:bg-primary-700 rounded text-white">
                Следующая страница
            </button>
        </div>

    </main>

    <aside class="flex-1">

        <AnimesSidebar v-show="showSidebar" />

    </aside>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import { useRoute, useRouter } from "vue-router";

import { generatePlaceholder } from "./lib"

import Search from "../../widgets/search/Search.vue";
import AnimeCard from "../../components/animeCard/AnimeCard.vue";
import AnimesSidebar from "../../widgets/animesSidebar/AnimesSidebar.vue";

import AdjustmentsHorizontal from "../../assets/AdjustmentsHorizontal.svg"


const store = useStore()
const router = useRouter()
const route = useRoute()

const showSidebar = ref(false)
const placeholder = ref(null) // Will be generated

const params = computed(() => store.state.page.animes.params)
const animes = computed(() => store.state.animes)
const pages = computed(() => Math.ceil(store.state.count / 50))
const loading = computed(() => store.state.page.animes.loading)


store.commit("setAnimesParamsFromRoute", route)


// If animes is exists
if (animes.value) {
    placeholder.value = generatePlaceholder(animes.value)
} else {
    // When animes will loaded
    const stopAnimesWatch = watch(animes, val => {
        if (val !== null) {
            placeholder.value = generatePlaceholder(animes.value)

            stopAnimesWatch()
        }
    })
}

// Handling query
const query = ref(route.query.search)

watch(() => store.getters.animesQueryParams, val => {
    router.push({
        query: val,
    })
}, { deep: true })

// Debounce timer
let timeoutId = null

// Debounce handler
watch(query, val => {
    if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
    }

    timeoutId = setTimeout(() => {
        let search = val.trim()

        store.commit("setAnimesQuerySearch", search.length !== 0 ? search : null)

        store.dispatch("getAnimes")
    }, 1000)
})


const changePage = (link) => {
    const url = new URL(link)

    store.commit("setAnimesQueryPage", url.searchParams.get("page") || 1)

    store.dispatch('getAnimes', { url: link })
}



// Load animes if animes not exists
if (!animes.value) {
    store.dispatch("getAnimes")
}

</script>