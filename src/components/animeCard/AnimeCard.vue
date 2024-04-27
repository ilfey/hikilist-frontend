<template>
    <router-link tag="a" :to="'/animes/' + anime.id"
        class="flex flex-1 w-full min-w-32 max-w-48 md:min-w-56 md:max-w-64 flex-col rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
        <div class="flex-1">
            <div v-if="anime.poster" class="anime-card__poster w-full h-48 md:h-64 rounded"
                :style="{ 'background-image': `url(${anime.poster})` }">
            </div>
        </div>

        <h2 class="my-4 text-sm md:text-base font-bold">
            {{ anime.title }}
        </h2>

        <div class="flex flex-wrap gap-2">
            <span :class="status.class" class="text-xs font-semibold text-white py-0.5 px-1 sm:py-1 sm:px-2 rounded-md">
                {{ status.name }}
            </span>
            <span :class="status.class" class="text-xs font-semibold text-white py-0.5 px-1 sm:py-1 sm:px-2 rounded-md">
                {{ anime.format?.title }}
            </span>
            <span :class="status.class" class="text-xs font-semibold text-white py-0.5 px-1 sm:py-1 sm:px-2 rounded-md">
                {{ anime.episodes_released }}
            </span>
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

<style scoped>
.anime-card__poster {
    background-size: cover;
    background-position: center;
}
</style>