import Cookies from "universal-cookie";

export default ({req, store, redirect}) => {
	if(!store.$auth.loggedIn) {
		redirect('/login');
	}
}