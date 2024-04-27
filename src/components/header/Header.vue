<template>
    <header class="p-4 max-w-5xl w-full mx-auto">
        <nav class="flex items-center justify-between">
            <!-- Left -->

            <router-link class="flex items-center justify-center gap-2" to="/">
                <Logo class="w-8 h-8 duration transition dark:text-white text-black" />
                <span class="text-2xl duration transition font-semibold italic hover:text-primary-700">Hiki list</span>
            </router-link>

            <!-- Center -->

            <div class="hidden lg:block space-x-2">
                <router-link class="duration transition font-bold hover:text-primary-700" v-for="item in navFiltered"
                    :key="item.name" :to="item.href">
                    {{ item.name }}
                </router-link>
            </div>

            <!-- Right -->

            <div class="hidden lg:flex items-center gap-2">

                <router-link class="duration transition font-bold hover:text-primary-700"
                    v-for="item in rightNavFiltered" :key="item.name" :to="item.href">
                    {{ item.name }}
                </router-link>

                <button v-if="store.getters.isAuthenticated" type="button"
                    class="duration transition font-bold hover:text-primary-700" @click="store.dispatch('logout')">
                    Выйти
                </button>

                <button @click="toggleTheme">
                    <Sun v-if="isDark" class="w-5 h-5 duration transition hover:text-primary-700" />
                    <Moon v-else class="w-5 h-5 duration transition hover:text-primary-700" />
                </button>

            </div>

            <!-- Mobile menu open -->
            <button type="button" aria-label="Открыть меню" class='flex items-center justify-center w-8 h-8 lg:hidden'
                @click="mobileMenuOpen = true">
                <Bars3 class="h-6 w-6" />
            </button>

        </nav>

        <!-- Mobile -->

        <div v-show="mobileMenuOpen" :class="{ 'grid': mobileMenuOpen }"
            class="grid-cols-1 grid-rows-[auto,1fr] fixed z-50 right-0 top-0 bg-gray-200 dark:bg-gray-900 h-screen w-screen sm:max-w-xs ring-1 ring-gray-500">

            <!-- Header copy -->

            <MobileHeader @onClose="mobileMenuOpen = false" />

            <!-- Nav -->

            <div class="px-4 overflow-auto">
                <nav class="space-y-2 text-lg">

                    <router-link @click="mobileMenuOpen = false"
                        class="block p-2 duration transition font-bold rounded-md active:bg-gray-100 dark:active:bg-gray-800"
                        v-for="item in navFiltered" :key="item.name" :to="item.href">
                        {{ item.name }}
                    </router-link>

                    <!-- Delimiter -->

                    <hr className='mx-2 my-2 border-gray-500' />

                    <router-link @click="mobileMenuOpen = false"
                        class="block p-2 duration transition font-bold rounded-md active:bg-gray-100 dark:active:bg-gray-800"
                        v-for="item in rightNavFiltered" :key="item.name" :to="item.href">
                        {{ item.name }}
                    </router-link>

                    <button v-if="store.getters.isAuthenticated" type="button"
                        class="block p-2 duration transition w-full font-bold rounded-md text-left active:bg-gray-100 dark:active:bg-gray-800"
                        @click="store.dispatch('logout')">
                        Выйти
                    </button>

                    <div @click="toggleTheme"
                        class="flex justify-between p-2 px-2 transition-colors rounded-md active:bg-gray-100 dark:active:bg-gray-800">
                        <span className='font-bold cursor-pointer'>Темная тема</span>
                        <button type="button" :class="{ 'bg-primary-600': isDark }"
                            class="h-6 transition-colors border-2 border-primary-600 rounded-full w-11">
                            <div :class="{ 'left-5': isDark }"
                                class="relative z-10 bg-white w-5 h-5 rounded-full transition-[left] duration-200 left-0 text-primary-600 flex items-center justify-center">

                                <Moon v-if="isDark" class="w-4 h-4 duration transition " />
                                <Sun v-else class="w-4 h-4 duration transition " />

                            </div>
                        </button>
                    </div>
                </nav>
            </div>
        </div>

    </header>
</template>

<script setup>
import { computed, ref } from "vue"
import { useStore } from "vuex"

import Logo from "@assets/Logo.svg"
import Sun from "@assets/Sun.svg"
import Moon from "@assets/Moon.svg"
import Bars3 from "@assets/Bars3.svg"
import XMark from "@assets/XMark.svg"

import MobileHeader from "@components/mobileHeader/MobileHeader.vue"

import { nav, rightNav } from "./lib/nav"

const store = useStore()

const theme = computed(() => store.state.theme)
const isDark = computed(() => store.state.theme === "dark")
const navFiltered = computed(() => nav.filter(item => (item.isAuthenticated == null || item.isAuthenticated) && store.getters.isAuthenticated))
const rightNavFiltered = computed(() => rightNav.filter(item => item.isAuthenticated === store.getters.isAuthenticated))

const mobileMenuOpen = ref(false)

const toggleTheme = () => store.dispatch("toggleTheme", theme.value === "dark" ? "light" : "dark")
</script>