<template>
	<v-app-bar :clipped-left="clipped" fixed app>
    <nuxt-link to='/' tag="div"><v-toolbar-title v-text="title" /></nuxt-link>
    <v-btn text><nuxt-link to='/mypage' tag="div">マイページ</nuxt-link></v-btn>
    <v-btn text><nuxt-link to='/projects' tag="div">プロジェクト一覧</nuxt-link></v-btn>
		<v-spacer />
		<v-btn color="green" @click="handleLogout">ログアウト</v-btn>
	</v-app-bar>
</template>

<script>

export default {
	data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'TopPage',
          to: '/',
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ガントチャート',
    }
  },
  methods:{
    handleLogout(){
      this.$auth.logout();
    },
  }
}
</script>