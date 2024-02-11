<template>
    <main class="flex-1 p-4 w-full">
        <div class="mb-4 flex gap-4">
            <button @click="showSidebar = !showSidebar"
                class="px-3 py-1 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded-lg text-white transition duration">
                Advanced
            </button>

            <Search :placeholder="placeholder" v-model="query" />
        </div>

        <h2 class="text-xl font-bold" v-show="loading">
            Loading...
        </h2>

        <h2 class="text-xl font-bold" v-show="query && !loading && animes.length === 0">
            Not found
        </h2>

        <section class="grid grid-cols-4 gap-4">
            <AnimeCard v-for="anime in animes" :key="anime.id" :anime="anime" />
        </section>

        {{ animes }}
    </main>

    <IndexSidebar v-show="showSidebar" />
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"

import Search from "../../widgets/search/Search.vue";
import AnimeCard from "../../components/animeCard/AnimeCard.vue";
import IndexSidebar from "../../widgets/indexSidebar/IndexSidebar.vue";

const showSidebar = ref(false)

const store = useStore()

const animes = computed(() => store.state.animes)
const loading = computed(() => store.state.animesLoading)

// Generate placegolder for search
const placeholder = ref(null)

watch(animes, (next, prev) => {
    if (prev === null && next !== null) {
        placeholder.value = next[Math.floor(Math.random() * next.length)].title // Random anime title
    }
})

// Handling query
const query = ref(null)

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