<template>
    <aside class="flex-1"></aside>

    <main class="p-4 max-w-5xl w-full">

        <div class="mb-4 flex">
            <button v-for="list in lists" :key="list.id"
                :class="list.id === selectedList ? 'dark:bg-gray-700/75 bg-gray-100/50 text-white' : 'dark:bg-gray-700 bg-gray-50 text-gray-400'"
                @click="selectedList = list.id"
                class="w-full px-3 py-2.5 font-semibold text-sm odd:border-r-0 first:rounded-l-lg last:rounded-r-lg border border-gray-300 dark:border-gray-600">
                {{ list.title }} {{ list.count }}
            </button>
        </div>

        <h2 class="text-xl font-bold" v-show="loading">
            Loading...
        </h2>

        <section class="flex flex-col gap-4">
            <h2 v-if="!loading && currentRates.length === 0" class="text-xl font-bold">Список пуст</h2>
            <div v-if="currentRates" class="flex gap-4">
                <AnimeCard v-for="rate in currentRates" :key="rate.anime.id" :anime="rate.anime" />
            </div>
        </section>

    </main>

    <aside class="flex-1"></aside>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router";

import { api } from "../../api"
import AnimeCard from "../../components/animeCard/AnimeCard.vue";

const store = useStore()
const route = useRoute()

const loading = ref(true)

const selectedList = computed({
    get: () => store.state.page.lists.listId,
    set: id => store.state.page.lists.listId = id,
})
const rates = ref(null)

const lists = computed(() => store.state.lists)
const currentRates = computed(() => {
    if (!rates.value) {
        return []
    }

    return rates.value.filter(rate => rate.list.id === selectedList.value)
})

// Get lists
if (!lists.value) {
    store.dispatch("getLists")
}

watch(lists, (next) => {
    if (!selectedList.value) {
        selectedList.value = next[0].id
    }
})

if (!rates.value) {
    loading.value = true
    store.dispatch("getAccountRates")
        .then(res => {
            rates.value = res.data
        })
        .catch(err => {

        })
        .finally(() => {
            loading.value = false
        })
}

</script>