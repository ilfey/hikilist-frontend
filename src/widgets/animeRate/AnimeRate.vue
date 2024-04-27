<template>
    <div class="">
        <div class="flex gap-4">
            <ListSelect class="grow" :text="listSelectText" :lists="lists" :selected="rate.listId"
                @onselect="onListSelected" />

            <!-- Delete button -->
            <button v-if="rate.id" @click="onDelete(rate.id)"
                class="shrink-0 bg-primary-600 text-white w-10 h-10 flex items-center justify-center rounded-lg">
                <XMark class="w-5 h-5" />
            </button>
        </div>

        <div v-if="rate.listId" class="">
            <div class="">
                <h3 class="my-2 text-md font-bold">Оценка:</h3>
                <StarRating :count="5" :rating="rate.rating" @onselect="r => rate.rating = r" />
            </div>
            <div class="">
                <h3 class="my-2 text-md font-bold">Просмотрено:</h3>
                <Counter :value="rate.completed" @onchange="r => rate.completed = r"></Counter>
            </div>
            <div class="">
                <h3 class="my-2 text-md font-bold">Пересмотрено:</h3>
                <Counter :value="rate.rewatched" @onchange="r => rate.rewatched = r"></Counter>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

import Counter from '../../components/counter/Counter.vue';
import ListSelect from '../../components/listSelect/ListSelect.vue';
import StarRating from '../../components/starRating/StarRating.vue';

import XMark from "@assets/XMark.svg";


const props = defineProps({
    animeId: Number,
})

const store = useStore()

const loading = computed(() => store.state.page.anime.loading.rate)

const listSelectText = ref("Добавить в список")

const rate = ref({
    id: null,
    animeId: null,
    listId: null,
    rating: null,
    rewatched: 0,
    completed: 0,
})

const lists = computed(() => store.state.lists)

// Get lists
if (!lists.value) {
    store.dispatch("getLists")
}

// Get rate
watch(() => props.animeId, val => {
    if (val) {
        store.dispatch("getRate", val)
            .then(res => {
                if (res.data) {
                    rate.value = {
                        ...rate.value,
                        id: res.data.id,
                        animeId: res.data.anime.id,
                        listId: res.data.list.id,
                        rating: res.data.rating,
                        rewatched: res.data.rewatched,
                        completed: res.data.completed,
                    }

                    onListSelected(res.data.list.id)
                }
            })
    }
})

// On list select change list_id
const onListSelected = (id) => {
    const list = lists.value?.find(list => list.id === id)

    listSelectText.value = list?.title ?? "Добавить в список"

    rate.value.listId = id
}

const onDelete = id => {
    store.dispatch("deleteRate", id)
        .then(() => {
            rate.value = {
                id: null,
                animeId: null,
                listId: null,
                rating: null,
                rewatched: 0,
                completed: 0,
            }

            listSelectText.value = "Добавить в список"
        })
}

watch(() => rate.value, (val, prev) => {
    // If id is not present, create a new rate
    if (!val?.id && val.listId) {
        store.dispatch("createRate", {
            ...val,
            animeId: props.animeId,
        }).then(res => {
            // If id is present, update the rate id
            if ("id" in res.data) {
                rate.value.id = res.data.id
            }
        })
    } else if (val?.id) {
        store.dispatch("updateRate", { ...val })
    }
}, {
    deep: true
})

</script>