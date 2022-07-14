<template>
	<ValidationObserver
		ref="observer"
		v-slot="{ invalid }"
	>
		<form @submit.prevent="submit">
			<ValidationProvider
				v-slot="{ errors }"
				name="email"
				rules="required|email"
			>
				<v-text-field
					v-model="email"
					:error-messages="errors"
					label="E-mail"
					required
				></v-text-field>
			</ValidationProvider>

			<ValidationProvider
				v-slot="{ errors }"
				name="Password"
				rules="required|max:20"
			>
				<v-text-field
					v-model="password"
					:counter="20"
					:error-messages="errors"
					label="Password"
					required
				></v-text-field>
			</ValidationProvider>
			<v-btn
				class="mr-4"
				type="submit"
				:disabled="invalid"
				:click="submit"
			>
				submit
			</v-btn>
		</form>
	</ValidationObserver>
</template>

<script>
import axios from 'axios'

export default {
	name:'login',
	data() {
		return {
			email: '',
			password: ''
		}
	},
	methods:{
		submit(){
			axios.get('http://localhost:8000/')
				.then((response) => (
					console.log(response)
				))
		}
	}
}
</script>

<style scoped>

</style>
