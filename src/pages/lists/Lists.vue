<template>
    <aside class="flex-1"></aside>

    <main class="p-4 max-w-5xl w-full">

        <!-- Tablet tabs -->
        <div class="mb-4 hidden sm:flex">
            <button v-for="list in lists" :key="list.id"
                :class="list.id === selectedList ? 'dark:bg-gray-700/75 bg-gray-100/50 dark:text-white text-black' : 'dark:bg-gray-700 bg-gray-50 text-gray-400'"
                @click="selectedList = list.id"
                class="w-full px-3 py-2.5 font-semibold text-sm odd:border-r-0 first:rounded-l-lg last:rounded-r-lg border border-gray-300 dark:border-gray-600">
                {{ list.title }} {{ list.count }}
            </button>
        </div>

        <h2 class="text-xl font-bold" v-show="loading">
            Loading...
        </h2>

        <section class="relative h-full flex flex-col gap-4">

            <!-- Empty list message -->

            <h2 v-if="!loading && currentRates.length === 0"
                class="absolute text-xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Список пуст</h2>

            <!-- Anime cards -->

            <div v-if="currentRates" class="flex gap-4 flex-wrap justify-center">
                <AnimeCard v-for="rate in currentRates" :key="rate.anime.id" :anime="rate.anime" />
            </div>
        </section>

    </main>

    <aside class="flex-1"></aside>

    <!-- Fab open bottom sheet -->

    <button type='button' aria-label='Открыть меню списков' @click="mobileSheetOpen = !mobileSheetOpen"
        class='fixed bottom-5 right-5 flex sm:hidden items-center justify-center shrink-0 w-10 h-10 bg-primary-500 rounded-lg hover:bg-primary-700 transition duration'>
        <ListBullet class="h-6 w-6 text-white" />
    </button>

    <!-- Mobile bottom sheet -->

    <div v-if="mobileSheetOpen"
        class="fixed bottom-0 max-h-1/3 p-2 dark:bg-gray-900 bg-gray-200 outline outline-1 rounded-t-2xl outline-gray-400 dark:outline-gray-700 w-full">

        <!-- Drag header -->

        <div class="">
            <hr class="w-1/4 mx-auto my-1.5 border-2 rounded-full border-gray-500">
        </div>

        <!-- List -->

        <div class="flex flex-col overflow-auto">
            <button v-for="list in lists" :key="list.id" @click="onSelectListMobile(list.id)"
                class="block p-2 duration transition font-bold rounded-md active:bg-gray-100 dark:active:bg-gray-800 text-start"
                :class="list.id === selectedList ? 'text-primary-600' : 'text-white-400'">
                {{ list.title }}
            </button>
        </div>
    </div>

</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"

import AnimeCard from "../../components/animeCard/AnimeCard.vue";

import ListBullet from "@assets/ListBullet.svg"

const store = useStore()

const loading = ref(true)
const mobileSheetOpen = ref(false)

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
        .finally(() => {
            loading.value = false
        })
}

const onSelectListMobile = id => {
    selectedList.value = id

    mobileSheetOpen.value = false
}

</script>