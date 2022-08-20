<template>
  <v-row>
    <navbar></navbar>
		<v-container fluid>
			<v-card>
				<v-card-title>
					プロジェクト一覧
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
				></v-data-table>
			</v-card>
		</v-container>
  </v-row>
</template>

<script>
import Navbar from '~/components/share/Navbar.vue'

export default {
  name: 'Projects',
  components: {
    Navbar
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
        { text: '納期', value: 'deadline' }
      ],
      projects: null
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
        console.log(this.projects)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
