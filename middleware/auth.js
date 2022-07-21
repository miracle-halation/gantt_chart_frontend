import Cookies from "universal-cookie";

export default ({req, store, axios}) => {
	if(process.browser){
		return
	}
	const cookies = new Cookies(req.headers.cookie)
	const islogin = cookies.get('isLogin')
	if(islogin){
		store.commit('user/LoginStatus')
	}
}