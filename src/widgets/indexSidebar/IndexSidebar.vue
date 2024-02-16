<template>
    <div class="sticky top-20 border-l border-gray-500 p-4 bg-gray-200 dark:bg-gray-900">
        <h2 class="text-md font-bold">
            Сортировка:
        </h2>

        <ul class="ml-3">
            <li v-for="item in ordering" :key="item.key" @click="checkOrdering(item)"
                :class="{ 'text-primary-500 font-semibold': item.state !== null }"
                class="flex gap-2 items-center cursor-pointer select-none duration transition">
                {{ item.name }}

                <ChevronUp class="w-5 h-5" v-if="item.state === true" />
                <ChevronDown class="w-5 h-5" v-else-if="item.state === false" />
            </li>
        </ul>

    </div>
</template>

<script setup>
import { useStore } from "vuex"

import ChevronDown from "../../assets/ChevronDown.svg"
import ChevronUp from "../../assets/ChevronUp.svg"

import { ordering } from "./lib/ordering"

const store = useStore()

// Handle order checked
const checkOrdering = item => {
    let nextState = null

    if (item.state === null) {
        nextState = true
    } else if (item.state === true) {
        nextState = false
    }

    // Set all states eq null for all order items
    ordering.forEach(i => i.state = null)

    item.state = nextState

    // Update animes
    store.dispatch("getAnimes", {
        ordering: {
            isActiveState: item.state,
            key: item.key,
        }
    })
}

</script>