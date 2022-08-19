<template>
	<v-app-bar :clipped-left="clipped" fixed app>
		<v-toolbar-title v-text="title" />
		<v-spacer />
		<template v-if="this.$auth.loggedIn">
			<v-btn color="green" @click="handleLogout">ログアウト</v-btn>
		</template>
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