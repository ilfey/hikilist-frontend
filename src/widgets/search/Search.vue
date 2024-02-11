<template>
    <div
        class="flex items-center w-full rounded-lg transition-colors duration-200 bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600">
        <div class="p-2.5">
            <MagnifyingGlass class="text-primary-500 w-5 h-5" />
        </div>
        <input type="text" :placeholder="placeholder" v-model="model" :class="{ 'pr-2.5': !model?.length }"
            class='flex-1 text-sm block leading-3 bg-transparent dark:placeholder-gray-400 py-2.5 outline-none' />

        <button v-show="model?.length" class="p-2.5" @click="model = ''">
            <XMark class="text-primary-500 w-5 h-5" />
        </button>
    </div>
</template>

<script setup>
import { defineModel } from "vue"

import MagnifyingGlass from "../../assets/MagnifyingGlass.svg"
import XMark from "../../assets/XMark.svg"

const model = defineModel()

const props = defineProps({
    placeholder: {
        required: true,
        type: String,
    }
})

</script>