import Cookies from "universal-cookie";

export default ({req, store, redirect}) => {
	const isLoggedin = store.getters['user/isLoggedIn']
	if(isLoggedin){
		store.dispatch('user/certLogin')
	}else{
		return redirect('/login')
	}
}