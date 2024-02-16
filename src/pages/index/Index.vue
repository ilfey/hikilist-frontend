<template>
    <aside class="flex-1"></aside>

    <main class="p-4 max-w-5xl w-full">

        <div class="mb-4 flex gap-4">
            <Search :placeholder="placeholder" v-model="query" />

            <button @click="showSidebar = !showSidebar"
                class="px-3 py-1 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded-lg text-white transition duration">
                <AdjustmentsHorizontal class="w-6 h-6"/>
            </button>
        </div>

        <h2 class="text-xl font-bold" v-show="loading">
            Loading...
        </h2>

        <h2 class="text-xl font-bold" v-show="query && !loading && animes.length === 0">
            Not found
        </h2>

        <section class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimeCard v-for="anime in animes" :key="anime.id" :anime="anime" />
        </section>

    </main>

    <aside class="flex-1">

        <IndexSidebar v-show="showSidebar" />

    </aside>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"

import Search from "../../widgets/search/Search.vue";
import AnimeCard from "../../components/animeCard/AnimeCard.vue";
import IndexSidebar from "../../widgets/indexSidebar/IndexSidebar.vue";

import AdjustmentsHorizontal from "../../assets/AdjustmentsHorizontal.svg"

const showSidebar = ref(false)

const store = useStore()

const animes = computed(() => store.state.animes)
const loading = computed(() => store.state.animesLoading)

// Generate placegolder for search
const placeholder = ref(null)

if (animes.value) {
    placeholder.value = animes.value[Math.floor(Math.random() * animes.value.length)].title
}

watch(animes, (next, prev) => {
    if (prev === null && next !== null) {
        placeholder.value = next[Math.floor(Math.random() * next.length)].title // Random anime title
    }
})

// Handling query
const query = ref(store.state.query)


let timeoutId = null

watch(query, val => {
    if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
    }

    timeoutId = setTimeout(() => {
        store.dispatch("getAnimes", {
            query: val === "" ? null : val
        })
    }, 1000)
})

// Load animes if storage is null
if (!animes.value) {
    store.dispatch("getAnimes")
}

</script>