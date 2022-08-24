<template>
  <v-app id="inspire">
		<navbar></navbar>
    <UserProfile :profile="profile"></UserProfile>

		<!-- ユーザーのガントチャートを表示。タスクカードを一覧で出す -->
    <v-main>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '~/components/share/Navbar.vue'
import UserProfile from '~/components/user/UserProfile.vue'

export default {
  name: 'MyPage',
  components: {
    Navbar,
    UserProfile
  },
  middleware: ['auth'],
  data(){
		return{
		  profile: []
    }
  },
  mounted(){
    this.fetchProfile()
  },
  methods:{
    fetchProfile(){
      this.$axios.get('/v1/profiles')
      .then((response) => {
        this.profile = response.data.data
        console.log(this.profile)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
