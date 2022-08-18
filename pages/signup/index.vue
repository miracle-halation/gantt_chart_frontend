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
					label="名前"
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
					label="メールアドレス"
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
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
					:type="showPassword ? 'text' : 'password'"
					label="パスワード"
					required
					@click:append="showPassword = !showPassword"
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
					:append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
					:type="showPasswordConfirm ? 'text' : 'password'"
					label="パスワード確認"
					required
					@click:append="showPasswordConfirm = !showPasswordConfirm"
				></v-text-field>
			</ValidationProvider>

			<ValidationProvider
				v-slot="{ errors }"
				name="Phone"
				:rules="{required: true, regex: /^\d{2,3}-\d{1,4}-\d{4}$/}"
			>
				<v-text-field
					v-model="phone"
					:error-messages="errors"
					label="電話番号"
					required
				></v-text-field>
			</ValidationProvider>

			<ValidationProvider
				v-slot="{ errors }"
				name="Group"
				rules="required"
			>
				<v-select
					v-model="group"
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
				@click="handleSignup"
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
			phone: '',
			group: '',
			groups: ['営業部', '制作部', 'システム部', '企画部', '総務部', '管理部'],
			showPassword: false,
      showPasswordConfirm: false,
		}
	},
	methods:{
		async submit(){
			this.$refs.observer.validate()
		},
		async handleSignup(){
			const AuthData = new FormData();
			AuthData.append('email', this.email)
			AuthData.append('password', this.password)
			await this.$axios.post('/v1/auth', AuthData)
			.then((response) => {
				const user_data = response.data.data
			}).catch((err) => {
				console.log(err)
			})
			await this.$auth.loginWith('local', {data: {email: this.email, password: this.password}})
			.then((response) => {
				const headers = {
					uid: response.headers['uid'],
					access_token: response.headers['access-token'],
					client: response.headers['client']
				}
				const ProfileData = {
					name: this.name,
					phone: this.phone,
					group: this.group
				};
				this.createProfile({data: ProfileData, headers: headers})
			})
		},
		...mapActions('user', ['createProfile'])
	}
}
</script>

<style scoped>

</style>
