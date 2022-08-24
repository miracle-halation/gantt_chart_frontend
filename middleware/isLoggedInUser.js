export default ({req, store, redirect}) => {
	if(store.$auth.loggedIn){
		return redirect('/')
	}
}