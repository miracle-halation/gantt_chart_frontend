export const state = () => ({
	isLoggedIn: false,
	user: null,
	uid : null,
	access_token: null,
	client: null,
	icon: null
})

export const getters = {
	isLoggedIn: (state) => state.isLoggedIn,
	user: (state) => state.user,
	uid: (state) => state.uid,
	access_token: (state) => state.access_token,
	client: (state) => state.client,
	icon: (state) => state.icon
}

export const mutations = {
	setUser (state, {user, icon}) {
		state.isLoggedIn = !state.isLoggedIn
		state.user = user
		state.icon = icon
	},
	setToken(state, {uid, access_token, client}) {
		state.uid = uid
		state.access_token = access_token
		state.client = client
	},
	LogoutUser (state) {
		state.isLoggedIn = !state.isLoggedIn
		state.user = null
		state.icon = null
	},
	removeToken(state) {
		state.uid = null
		state.access_token = null
		state.client = null
	}
}

export const actions = {
	async login({commit, dispatch}, {data}){
		await this.$axios.post('/v1/auth/sign_in', data)
		.then((response) => {
			const user_data = response.data.data
			const user_headers = response.headers
			commit('setUser', {user: user_data, icon: null})
			commit('setToken', {uid: user_data['uid'], access_token: user_headers['access-token'], client: user_headers['client']})
			this.$router.push('/')
		}).catch((err) => {
			console.log(err)
		})
	},
}
