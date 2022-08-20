<template>
  <v-app id="inspire">
		<navbar></navbar>

    <nav-drower :profile="profile"></nav-drower>

		<!-- ユーザーのガントチャートを表示。タスクカードを一覧で出す -->
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item

                    :key="n"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '~/components/share/Navbar.vue'
import NavDrower from '~/components/mypage/NavDrower.vue'

export default {
  name: 'MyPage',
  components: {
    Navbar,
    NavDrower
  },
  middleware: ['auth'],
  data: () => ({
		profile: null
  }),
  mounted(){
    this.fetchProfile()
  },
  methods:{
    async fetchProfile(){
      this.$axios.get('/v1/profiles')
      .then((response) => {
        this.profile = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
