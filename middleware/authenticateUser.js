export default ({req, store, redirect}) => {
	if(store.$auth.loggedIn){
		store.dispatch('user/getProfile')
	}
}