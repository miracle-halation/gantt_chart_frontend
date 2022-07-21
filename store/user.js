import Cookies from "universal-cookie"
const cookies = new Cookies()

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
		state.isLoggedIn = !state.isLoggedIn
		state.user = user
		state.icon = icon
	},
	LogoutUser (state) {
		state.isLoggedIn = !state.isLoggedIn
		state.user = null
		state.icon = null
	}
}

export const actions = {
	async login({commit, dispatch}, {data}){
		await this.$axios.post('/v1/auth/sign_in', data)
		.then((response) => {
			const user_data = response.data.data
			const user_headers = response.headers
			commit('setUser', {user: user_data, icon: null})
			cookies.set('isLogin', true)
			cookies.set('id-u', user_data['uid'])
			cookies.set('tk-pass', user_headers['access-token'])
			cookies.set('cli-us', user_headers['client'])
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
			cookies.remove('id-u')
			cookies.remove('tk-pass')
			cookies.remove('cli-us')
		}).catch((err) => {
			console.log(err)
		})
	},
}
