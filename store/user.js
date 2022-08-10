import Cookies from "universal-cookie"
const cookies = new Cookies()

const OPTIONS = {
	path: '/',
	maxAge: 60 * 60 * 24 * 7
}

const config = {
	'Content-Type': 'application/json'
}

export const state = () => ({
	isLoggedIn: false,
	user: null,
	icon: null
})

export const getters = {
	isLoggedIn: (state) => state.isLoggedIn,
	user: (state) => state.user,
	icon: (state) => state.icon
}

export const mutations = {
	setUser (state, {user, icon}) {
		state.user = user
		state.icon = icon
	},
	LogoutUser (state) {
		state.isLoggedIn = !state.isLoggedIn
		state.user = null
		state.icon = null
	},
	LoginStatus (state) {
		state.isLoggedIn = !state.isLoggedIn
	}
}

export const actions = {
	async signup({commit, dispatch}, {data}){
		await this.$axios.post('/v1/auth', data, config)
		.then((response) => {
			const user_data = response.data.data
			const user_headers = response.headers
			commit('setUser', {user: user_data, icon: null})
			commit('LoginStatus')
			cookies.set('isLogin', true, OPTIONS)
			cookies.set('id-u', user_data['uid'], OPTIONS)
			cookies.set('tk-pass', user_headers['access-token'], OPTIONS)
			cookies.set('cli-us', user_headers['client'], OPTIONS)
			this.$router.push('/')
		}).catch((err) => {
			console.log(err)
		})
	},
	async login({commit, dispatch}, {data}){
		await this.$axios.post('/v1/auth/sign_in', data)
		.then((response) => {
			const user_data = response.data.data
			const user_headers = response.headers
			commit('setUser', {user: user_data, icon: null})
			commit('LoginStatus')
			cookies.set('isLogin', true, OPTIONS)
			cookies.set('id-u', user_data['uid'], OPTIONS)
			cookies.set('tk-pass', user_headers['access-token'], OPTIONS)
			cookies.set('cli-us', user_headers['client'], OPTIONS)
			this.$router.push('/')
		}).catch((err) => {
			console.log(err)
		})
	},
	async logout({commit, getters}){
		const headers = {
			uid: cookies.get('id-u'),
			access_token: cookies.get('tk-pass'),
			client: cookies.get('cli-us')
		}
		await this.$axios.delete('/v1/auth/sign_out', {headers: headers})
		.then((response) => {
			commit('LogoutUser')
			cookies.remove('isLogin')
			cookies.remove('id-u')
			cookies.remove('tk-pass')
			cookies.remove('cli-us')
			this.$router.push('/login')
		}).catch((err) => {
			console.log(err)
		})
	},
	async certLogin({commit, dispatch}){
		const headers = {
			uid: cookies.get('id-u'),
			access_token: cookies.get('tk-pass'),
			client: cookies.get('cli-us')
		}
		await this.$axios.get('/v1/auth/validate_token', {headers: headers})
		.then((response) => {
			console.log(response)
			const user_data = response.data.data
			commit('setUser', {user: user_data, icon: null})
		}).catch((err) => {
			console.log(err)
		})
	},
}
