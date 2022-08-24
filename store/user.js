export const state = () => ({
	profile: null
})

export const getters = {
	profile: (state) => state.profile
}

export const mutations = {
	setProfile (state, {profile}) {
		state.profile = profile
	},
}

export const actions = {
	async createProfile({commit}, {data, header}){
		await this.$axios.post('/v1/profiles', data, header)
			.then((response) => {
				commit('setProfile', {profile: response.data})
			}).catch((err) => {
				console.log(err)
			})
	},
}
