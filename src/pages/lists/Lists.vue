<template>
    <aside class="flex-1"></aside>

    <main class="p-4 max-w-5xl w-full">

        <div class="mb-4 flex">
            <button v-for="list in lists" :key="list.id"
                :class="list.id === selectedList ? 'dark:bg-gray-700/75 bg-gray-100/50 text-white' : 'dark:bg-gray-700 bg-gray-50 text-gray-400'"
                @click="selectedList = list.id"
                class="w-full px-3 py-1.5 font-semibold text-sm  odd:border-r-0 first:rounded-l-lg last:rounded-r-lg border border-gray-300 dark:border-gray-600">
                {{ list.title }} {{ list.count }}
            </button>
        </div>

        <h2 class="text-xl font-bold" v-show="loading">
            Loading...
        </h2>

        <section class="flex flex-col gap-4">
            {{ lists }}
        </section>

    </main>

    <aside class="flex-1"></aside>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router";

import { api } from "../../api"

const store = useStore()
const route = useRoute()

const loading = ref(true)
const notFound = ref(false)


const lists = computed(() => store.state.userLists)

const selectedList = ref(null)

watch(lists, (next) => {
    if (!selectedList.value) {
        selectedList.value = next[0].id
    }
})


</script>