<template>
<!--
  仮トップページ
  ・全体のお知らせみたいなページにする
  ・投稿された日付ごとに表示する
  ・昔すぎるやつは○ヶ月前みたいにひとまとめにしちゃう
-->
  <v-row>
    <navbar></navbar>
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
</template>

<script>
import Navbar from '../components/share/Navbar.vue'

export default {
  name: 'IndexPage',
  components: {
    Navbar
  },
  middleware: ['auth'],
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
  }),
}
</script>
