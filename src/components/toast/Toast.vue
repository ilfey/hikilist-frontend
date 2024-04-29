<template>
  <div class="flex gap-2 items-center p-2 border rounded-xl bg-gray-800"
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
            return "border-green-700";
        case types.WARN:
            return "border-orange-700";
        case types.ERROR:
            return "border-pink-700";
        default:
            return "border-gray-700";
    }
})

const onClose = id => {
    store.commit("deleteToast", id)
}

</script>