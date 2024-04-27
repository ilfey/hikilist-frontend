<template>
	<aside class="flex-1"></aside>

	<main class="p-4 max-w-5xl w-full flex flex-col items-center justify-center">

		<h2 v-show="loading" class="text-xl font-bold">
			Loading...
		</h2>


		<form class="max-w-xs w-full space-y-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg" @submit.prevent="onSubmit">
			<div class="space-y-2">
				<div class="space-y-2">
					<label className='block transition duration ml-3 text-sm font-bold text-gray-900 dark:text-white'>
						Логин
					</label>
					<input type="text" placeholder="Jonn" v-model="login" required
						class='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none' />
				</div>

				<div class="space-y-2">
					<label className='block transition duration ml-3 text-sm font-bold text-gray-900 dark:text-white'>
						Пароль
					</label>
					<input type="password" placeholder="VerySecret" v-model="password" required
						class='transition-colors duration-200 bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none' />
				</div>

				<div v-if="!!error" class="">
					<p class="ml-3 text-xs text-red-500">{{ error }}</p>
				</div>
			</div>

			<button type="submit"
				class="w-full px-3 py-1.5 font-semibold text-sm bg-primary-500 hover:bg-primary-700 rounded text-white">
				Login
			</button>
		</form>

	</main>

	<aside class="flex-1"></aside>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router";
import { useStore } from "vuex";


const store = useStore()
const router = useRouter()

const loading = computed(() => store.state.page.login.loading)
const error = ref(null)

const login = ref(null)
const password = ref(null)

const onSubmit = () => {
	store.dispatch("login", {
		username: login.value,
		password: password.value,
	})
		.then(res => {
			if (res.status === 200) {
				router.replace({ path: '/' })
			}
		})
		.catch(err => {
			if (err?.response) {
				const res = err.response
				
				if (res.status === 400 || res.status === 401) {
					error.value = "Не правильный логин или пароль"
				}
			}
		})
}

</script>