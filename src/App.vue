<template>
  <Header />

  <div class="flex-1 flex">
    <router-view></router-view>
  </div>

  <footer class="p-4 max-w-5xl w-full mx-auto">
    <p class="text-center text-xs font-bold text-gray-500">&copy; Created by ilfey 2024</p>
  </footer>
</template>

<script setup>
import { useStore } from "vuex"

import Header from "./components/header/Header.vue";

const store = useStore()

store.dispatch("checkAuthentification")

</script>