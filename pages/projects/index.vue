<template>
  <v-row>
    <navbar></navbar>
		<v-container fluid>
			<v-card>
				<v-card-title>
					プロジェクト一覧
          <nuxt-link to="/projects/create" tag='div'><v-btn class="success" text>プロジェクトを作成する</v-btn></nuxt-link>
					<v-spacer></v-spacer>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details
					></v-text-field>
				</v-card-title>
				<v-data-table
					:headers="headers"
					:items="projects"
					:search="search"
				>
          <template #item.action="{ item }">
            <div class="text-center">
              <v-menu offset-x>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Dropdown
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item>
                    <nuxt-link :to="`/projects/${item.id}`"><v-list-item-action>詳細</v-list-item-action></nuxt-link>
                  </v-list-item>
                  <v-list-item>
                    <EditForm :project="item"></EditForm>
                  </v-list-item>
                  <v-list-item>
                    <v-dialog
                      transition="dialog-bottom-transition"
                      max-width="600"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-list-item-action
                          v-bind="attrs"
                          v-on="on"
                        >削除</v-list-item-action>
                      </template>
                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar
                            color="primary"
                            dark
                          >Opening from the bottom</v-toolbar>
                          <v-card-text>
                            <div class="text-h2 pa-12">Hello world!</div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              text
                              @click="dialog.value = false"
                            >Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-data-table>
			</v-card>
		</v-container>
  </v-row>
</template>

<script>
import Navbar from '~/components/share/Navbar.vue'
import EditForm from '~/components/projects/editForm.vue'

export default {
  name: 'Projects',
  components: {
    Navbar,
    EditForm
  },
  middleware: ['auth'],
  data () {
    return {
      search: '',
      headers: [
        {
          text: '案件名',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: '開発ジャンル', value: 'category' },
        { text: 'ドメイン', value: 'url' },
        { text: '納期', value: 'deadline' },
        { text: '操作', value: 'action'}
      ],
      projects: []
    }
  },
  mounted(){
    this.fetchProjects()
  },
  methods:{
    async fetchProjects(){
      this.$axios.get('/v1/projects')
      .then((response) => {
        this.projects = response.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
