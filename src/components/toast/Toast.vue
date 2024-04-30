<template>
  <div class="flex gap-2 items-center p-2 border rounded-xl bg-gray-100 dark:bg-gray-800"
    :class="toastBorderColor">
    <span class="flex-1 text-base">
        {{ toast.detail }}
    </span>
    <button type='button' aria-label='Закрыть уведомление' class='flex items-center justify-center shrink-0 w-8 h-8 bg-primary-500 rounded-lg hover:bg-primary-700 transition duration'
        @click="onClose(toast.id)">
        <XMark class="h-6 w-6 text-white" />
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

import { toastTypes as types } from "./lib"

import XMark from "@assets/XMark.svg"

const store = useStore()

const props = defineProps({
    toast: Object,
})

const toastBorderColor = computed(() => {
    switch (props.toast.type) {
        case types.SUCCESS:
            return "dark:border-green-700 border-green-400";
        case types.WARNING:
            return "dark:border-yellow-700 border-orange-400";
        case types.ERROR:
            return "dark:border-red-700 border-pink-400";
        default:
            return "dark:border-gray-700 border-gray-400";
    }
})

const onClose = id => {
    store.commit("deleteToast", id)
}

</script>