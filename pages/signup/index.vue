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

			<ValidationProvider
				v-slot="{ errors }"
				name="Group"
				rules="required"
			>
				<v-select
					v-model="group_id"
					:items="groups"
					:error-messages="errors"
					label="所属部署"
					item-text="name"
  				item-value="id"
					required
				></v-select>
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
			group_id: '',
			groups: [],
		}
	},
	mounted(){
		this.getGroups()
	},
	methods:{
		async getGroups(){
			this.$axios.get('v1/groups')
			.then(res => {
                this.groups = res.data
            })
            .catch(err => {
                console.log(err.statusText)
            });
		},
		async submit(){
			this.$refs.observer.validate()
		},
		async handleSingup(){
			const formData = new FormData();
			formData.append('name', this.name)
			formData.append('email', this.email)
			formData.append('password', this.password)
			formData.append('group_id', this.group_id)
			await this.signup({data: formData})
		},
		...mapActions('user', ['signup'])
	}
}
</script>

<style scoped>

</style>
