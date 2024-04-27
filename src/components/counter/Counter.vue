<template>
    <div class="flex gap-1.5">
        <button @click="onDecrement" class="w-6 h-6 p-1 rounded-md">
            <Minus class="duration transition w-4 h-4" />
        </button>
        <input maxlength="2" size="1"
            class="w-full text-center max-w-8 text-sm outline-none rounded-md dark:bg-gray-600 bg-gray-300" type="text"
            inputmode="numeric" pattern="[0-9]*" :value="value" @input="onSet" />
        <button @click="onIncrement" class="w-6 h-6 p-1 rounded-md">
            <Plus class="duration transition w-4 h-4" />
        </button>
    </div>
</template>

<script setup>

import Minus from "../../assets/Minus.svg"
import Plus from "../../assets/Plus.svg"

const props = defineProps({
    value: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(["onchange"])

const onDecrement = () => {
    emit("onchange", props.value - 1)
}

// Debounce timer
let timeoutId = null

// Debounce handler
const onSet = e => {
    if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
    }

    timeoutId = setTimeout(() => {
        // If input is empty then set value to 0
        if (e.target.value.length === 0) {
            emit("onchange", 0)
            return
        }

        emit("onchange", +e.target.value)
    }, 1000)
}

const onIncrement = () => {
    emit("onchange", props.value + 1)
}

</script>