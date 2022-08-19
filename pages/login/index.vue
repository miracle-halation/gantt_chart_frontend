<template>
	<v-card>
		<v-img
      src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
      height="300px"
    ></v-img>
		<v-card-title>
			ログイン
		</v-card-title>
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
						label="メールアドレス"
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
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
						label="パスワード"
						required
						@click:append="showPassword = !showPassword"
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
		<v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
			<nuxt-link to='/signup'>新規登録</nuxt-link>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	name:'login',
	data() {
		return {
			email: '',
			password: '',
			showPassword: false,
		}
	},
	methods:{
		async submit(){
			this.$refs.observer.validate()
		},
		async handleLogin(){
			await this.$auth.loginWith('local', {data: {email: this.email, password: this.password}})
			this.$router.go('/')
		},
	}
}

</script>

<style scoped>
	form{
		padding: 0 1rem 1rem 1rem
	}
</style>
