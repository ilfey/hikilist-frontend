<template>
    <div class="p-4">
        <div class="flex items-center justify-between">

            <!-- Logo -->

            <router-link class="flex items-center justify-center gap-2" to="/">
                <Logo class="w-8 h-8 duration transition dark:text-white text-black" />
                <span class="text-2xl duration transition font-semibold italic hover:text-primary-700">
                    Hiki list
                </span>
            </router-link>

            <!-- Mobile close menu button -->

            <button type='button' aria-label='Закрыть меню' class='flex items-center justify-center w-8 h-8'
                @click="$emit('onClose')">
                <XMark class="h-6 w-6 transition-colors" />
            </button>

        </div>
    </div>
</template>

<script setup>
import Logo from "@/assets/Logo.svg"
import XMark from "@/assets/XMark.svg"
</script>