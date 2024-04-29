<template>
  <div class="flex-1 flex flex-col gap-1 p-2 absolute left-0 bottom-0 max-w-64 w-full">
    <Toast v-for="toast in toasts" :key="toast.id" :toast="toast" />
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

import Toast from "../../components/toast/Toast.vue";

const store = useStore()

const toasts = computed(() => store.state.toasts)

</script>