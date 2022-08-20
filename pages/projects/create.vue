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
  name: 'ProjectsCreate',
  components: {
    Navbar
  },
  middleware: ['auth'],
  data () {
    return {
    }
  },
  methods:{
  }
}
</script>
