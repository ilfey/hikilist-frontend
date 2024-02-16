<template>
    <header class="p-4 max-w-5xl w-full mx-auto">
        <nav class="flex items-center justify-between">
            <router-link class="flex items-center justify-center gap-2" to="/">
                <Logo class="w-8 h-8 duration transition dark:text-white text-black"/>
                <span class="text-2xl duration transition font-semibold italic hover:text-primary-700">Hiki list</span>
            </router-link>

            <div class="flex items-center gap-2">
                <router-link class="duration transition font-bold hover:text-primary-700" v-for="item in nav" :to="item.href">
                    {{ item.name }}
                </router-link>
            </div>

            
            <div class="flex items-center gap-2">
                
                <button @click="toggleTheme">
                    <Sun v-if="theme === 'dark'" class="w-5 h-5 duration transition hover:text-primary-700"/>
                    <Moon v-else class="w-5 h-5 duration transition hover:text-primary-700"/>
                </button>
                
            </div>
        </nav>
    </header>
</template>

<script setup>
import { computed } from "vue"
import { useStore } from "vuex"

import Logo from "@assets/Logo.svg"
import Sun from "@assets/Sun.svg"
import Moon from "@assets/Moon.svg"

import {nav} from "./lib/nav"

const store = useStore()

const theme = computed(() => store.state.theme)

const toggleTheme = () => store.dispatch("toggleTheme", theme.value === "dark" ? "light" : "dark")
</script>