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
				@click="handleLogin"
			>
				submit
			</v-btn>
		</form>
	</ValidationObserver>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	name:'login',
	data() {
		return {
			email: '',
			password: ''
		}
	},
	methods:{
		async submit(){
			this.$refs.observer.validate()
		},
		async handleLogin(){
			const formData = new FormData();
			formData.append('email', this.email)
			formData.append('password', this.password)
			await this.login({data: formData})
		},
		...mapActions('user', ['login'])
	}
}
</script>

<style scoped>

</style>
