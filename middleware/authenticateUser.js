import Cookies from "universal-cookie";

export default ({req, store, redirect}) => {
	const current_user = store.getters['user/user']
	if(current_user === null){
		store.dispatch('user/certLogin')
	}
}