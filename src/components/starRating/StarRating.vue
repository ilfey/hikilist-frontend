<template>
    <div class="flex">
        <svg v-for="i in props.count" @click="onSelect(i)"
            :class="i <= props.rating ? 'dark:text-yellow-300 text-yellow-400' : 'dark:text-gray-600 text-gray-300'" :key="i"
            stroke-width="1.5" stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" class="w-7 h-7 transition duration"
            >
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z">
            </path>
        </svg>
    </div>
</template>

<script setup>

const props = defineProps({
    rating: {
        type: Number,
    },
    count: {
        type: Number,
    },
})

const emit = defineEmits(["onselect"])

const onSelect = (i) => {
    emit("onselect", i)
}

</script>