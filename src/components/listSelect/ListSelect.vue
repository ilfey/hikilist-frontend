<template>
    <div class="space-y-2 relative">
        <button @click="isOpen = !isOpen"
            class="bg-primary-600 text-white gap-2 p-2 rounded-lg w-full flex items-center justify-center">
            <span>{{text}}</span>
            <ChevronDown class="w-5 h-5" />
        </button>
        <div v-show="isOpen" class="absolute w-full dark:bg-gray-900 bg-gray-200 rounded-xl p-2">
            <ul class="flex flex-col gap-2">
                <li v-for="list in props.lists" :key="list.id" @click="onSelect(list.id)"
                    :class="list.id === selected?.id ? 'text-primary-600 font-bold' : ''"
                    class="py-1.5 px-2 active:bg-gray-100 active:dark:bg-gray-800 lg:hover:bg-gray-100 lg:hover:dark:bg-gray-800 rounded-md duration transition cursor-pointer">
                    <span class="text-sm">{{ list.title }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

import ChevronDown from "@assets/ChevronDown.svg";

const props = defineProps({
    text: {
        type: String,
    },
    lists: {
        type: Array,
    },
    selected: {
        type: Number,
    },
})

const emit = defineEmits(["onselect"])

const isOpen = ref(false)

const onSelect = (id) => {
    isOpen.value = false
    emit("onselect", id)
}

</script>