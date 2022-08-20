<template>
	<v-app id="inspire">
		<navbar></navbar>

    <nav-drower></nav-drower>

		<!-- ユーザーのガントチャートを表示。タスクカードを一覧で出す -->
    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row justify="center">
          <v-col
            cols="12"
            sm="8"
          >
            <v-card>
              <v-card-title class="cyan darken-1">
                <span class="text-h5 white--text">名前</span>

                <v-spacer></v-spacer>

                <v-btn
                  dark
                  icon
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-card-title>

              <v-list>
                <v-list-item>
                  <v-list-item-action>
                    <v-icon>mdi-phone</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>電話番号</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon>mdi-message-text</v-icon>
                  </v-list-item-action>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-action>
                    <v-icon>mdi-email</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>メールアドレス</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-action>
                    <v-icon>mdi-map-marker</v-icon>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>所属部署</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
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
  name: 'Profile',
  components: {
    Navbar,
    NavDrower
  },
  middleware: ['auth'],
  data: () => ({
		
  }),
}
</script>
