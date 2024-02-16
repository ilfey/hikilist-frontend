<template>
    <router-link tag="a" :to="'/animes/' + anime.id" class="flex flex-col rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
        <img class="max-h-72 h-full" :src="anime.poster" alt="">

        <h2 class="flex-1 my-4 text-base font-bold">
            {{ anime.title }}
        </h2>

        <div class="flex flex-wrap gap-2">
            <span :class="status.class" class="text-xs font-semibold text-white py-1 px-2 rounded-md">{{ status.name }}</span>
            <span :class="status.class" class="text-xs font-semibold text-white py-1 px-2 rounded-md">{{ anime.format.title }}</span>
            <span :class="status.class" class="text-xs font-semibold text-white py-1 px-2 rounded-md">{{ anime.episodes_released }}</span>
        </div>
    </router-link>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
    anime: {
        required: true,
    }
})

const status = computed(() => {
    if (props.anime.episodes_released === 0) {
        return { name: "Анонсировано", class: "bg-yellow-700" }
    } else if (props.anime.episodes_released === props.anime.episodes) {
        return { name: "Вышло", class: "bg-green-700" }
    } else if (props.anime.episodes_released !== props.anime.episodes) {
        return { name: "Выходит", class: "bg-orange-700" }
    }
})

</script>