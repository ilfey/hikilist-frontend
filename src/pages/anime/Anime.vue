<template>
    <aside class="flex-1"></aside>

    <main class="p-4 max-w-5xl w-full">

        <h2 class="text-xl font-bold" v-show="loading">
            Loading...
        </h2>

        <h2 class="text-xl font-bold" v-show="notFound">
            Not found
        </h2>

        <section class="flex flex-col gap-4">
            <article class="flex gap-4 dark:bg-gray-800 bg-gray-100 p-4 rounded-xl duration transition">
                <div class="">
                    <img class="w-80" :src="anime.poster" alt="Постер аниме">
                </div>

                <div class="flex-1 space-y-4">
                    <h2 class="text-2xl font-bold">
                        {{ anime.title }}
                    </h2>

                    <div class="space-y-2">
                        <p v-if="genres" class="font-bold">Жанры:
                            <span class="font-normal">
                                {{ genres }}
                            </span>
                        </p>

                        <p v-if="announcement" class="font-bold">Дата анонса:
                            <span class="font-normal">{{ announcement }}</span>
                        </p>

                        <p v-if="started" class="font-bold">Дата начала показа:
                            <span class="font-normal">{{ started }}</span>
                        </p>

                        <p v-if="anime.episodes" class="font-bold">Количество серий:
                            <span class="font-normal">{{ anime.episodes }}</span>
                        </p>

                        <p v-if="anime.episodes_released" class="font-bold">Количество вышедших серий:
                            <span class="font-normal">{{ anime.episodes_released }}</span>
                        </p>

                        <p v-if="released" class="font-bold">Дата релиза:
                            <span class="font-normal">{{ released }}</span>
                        </p>

                        <p v-if="studios" class="font-bold">Студии:
                            <span class="font-normal">{{ studios }}</span>
                        </p>
                    </div>

                </div>
            </article>

            <article class="dark:bg-gray-800 bg-gray-100 p-4 rounded-xl duration transition">
                <h2 class="mb-4 text-xl font-bold">
                    Описание
                </h2>

                <p class="indent-4">
                    {{ anime.description }}
                </p>
            </article>

        </section>

    </main>

    <aside class="flex-1"></aside>

</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useStore } from "vuex"
import { useRoute } from "vue-router";

import { api } from "../../api"

const store = useStore()
const route = useRoute()

const loading = ref(true)
const notFound = ref(false)

const getData = id => {
    api.get("/animes/" + id + "/?format=json")
        .then(res => {
            anime.value = res.data
            loading.value = false
        })
        .catch(err => {
            if (err.response.status === 404) {
                loading.value = false
                notFound.value = true
                anime.value = null
                return null
            }

            setTimeout(getData, 3000, id)
        })
}

const getAnime = id => {
    // If store is not null
    if (store.state.animes) {
        // Find anime
        const anime = store.state.animes.find(item => item.id == id)

        // If found
        if (anime) {
            loading.value = false
            return anime
        }
    }

    // If store is null or storage don't contains anime
    return getData(id)
}

const anime = ref(getAnime(route.params.id))

const formatter = () => new Intl.DateTimeFormat("ru")

const genres = computed(() => anime.value.genres ? (new Intl.ListFormat("ru")).format(anime.value.genres.map(i => i.title)) : null)
const studios = computed(() => anime.value.studios ? (new Intl.ListFormat("ru")).format(anime.value.studios.map(i => i.title)) : null)
const announcement = computed(() => anime.value.announcement ? formatter().format(new Date(anime.value.announcement)) : null)
const started = computed(() => anime.value.started ? formatter().format(new Date(anime.value.started)) : null)
const released = computed(() => anime.value.released ? formatter().format(new Date(anime.value.released)) : null)
</script>