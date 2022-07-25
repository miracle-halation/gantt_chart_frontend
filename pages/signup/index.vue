<template>
	<ValidationObserver
		ref="observer"
		v-slot="{ invalid }"
	>
		<form @submit.prevent="submit">
			<ValidationProvider
				v-slot="{ errors }"
				name="name"
				rules="required"
			>
				<v-text-field
					v-model="name"
					:error-messages="errors"
					label="Name"
					required
				></v-text-field>
			</ValidationProvider>

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
				rules="required|max:20|confirmed:PasswordConfirm"
			>
				<v-text-field
					v-model="password"
					:counter="20"
					:error-messages="errors"
					label="Password"
					required
				></v-text-field>
			</ValidationProvider>

			<ValidationProvider
				v-slot="{ errors }"
				name="PasswordConfirm"
				rules="required|max:20"
			>
				<v-text-field
					v-model="password_confirm"
					:counter="20"
					:error-messages="errors"
					label="PasswordConfirm"
					required
				></v-text-field>
			</ValidationProvider>

			<v-btn
				class="mr-4"
				type="submit"
				:disabled="invalid"
				@click="handleSingup"
			>
				submit
			</v-btn>
		</form>
	</ValidationObserver>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	name:'signup',
	data() {
		return {
			name: '',
			email: '',
			password: '',
			password_confirm: '',
		}
	},
	methods:{
		async submit(){
			this.$refs.observer.validate()
		},
		async handleSingup(){
			const formData = new FormData();
			formData.append('name', this.name)
			formData.append('email', this.email)
			formData.append('password', this.password)
			await this.signup({data: formData})
		},
		...mapActions('user', ['signup'])
	}
}
</script>

<style scoped>

</style>
