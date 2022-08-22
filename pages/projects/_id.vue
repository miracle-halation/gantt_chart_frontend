<template>
  <v-row>
    <navbar></navbar>
		<v-container fluid>
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
      projects: null
    }
  },
  mounted(){
    this.fetchProjects()
  },
  methods:{
    async fetchProjects(){
			const project_id = this.$route.params['id']
      this.$axios.get('/v1/projects/'+project_id)
      .then((response) => {
        this.project = response.data
				console.log(this.project)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
