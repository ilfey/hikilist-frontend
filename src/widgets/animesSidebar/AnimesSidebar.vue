<template>
    <div
        class="fixed top-0 right-0 w-screen h-screen sm:max-w-xs lg:sticky sm:border-l border-gray-500 bg-gray-200 dark:bg-gray-900">

        <MobileHeader class="md:hidden" @onClose="$emit('onClose')" />

        <div class="p-4 bg-gray-200 dark:bg-gray-900">
            <h2 class="mb-2 text-md font-bold">
                Сортировка:
            </h2>

            <ul class="ml-3 space-y-2">
                <li v-for="item in ordering" :key="item.key" @click="checkOrdering(item)"
                    :class="{ 'text-primary-500 font-semibold': item.state !== null }"
                    class="p-2 active:bg-gray-100 active:dark:bg-gray-800 lg:hover:bg-gray-100 lg:hover:dark:bg-gray-800 rounded-md flex gap-2 items-center cursor-pointer select-none duration transition">

                    <span class="font-bold md:font-normal">
                        {{ item.name }}
                    </span>

                    <ChevronUp class="w-5 h-5" v-if="item.state === 'ASC'" />
                    <ChevronDown class="w-5 h-5" v-else-if="item.state === 'DESC'" />
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex"

import ChevronDown from "@/assets/ChevronDown.svg"
import ChevronUp from "@/assets/ChevronUp.svg"

import MobileHeader from "@/components/mobileHeader/MobileHeader.vue"

import { ordering } from "./lib/ordering"

const store = useStore()

// Handle order checked
const checkOrdering = item => {
    let nextState = null

    if (item.state === null) {
        nextState = "ASC"
    } else if (item.state === "ASC") {
        nextState = "DESC"
    }

    // Set all states eq null for all order items
    ordering.forEach(i => i.state = null)

    item.state = nextState

    store.commit("setAnimesQueryOrdering", {
        key: item.key,
        state: item.state,
    })

    // Update animes
    store.dispatch("getAnimes")
}

</script>