<template>
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
				>{{project.title}}を削除しますか</v-toolbar>
				<v-card-text>
					<div class="pa-12">削除したデータは復元できません。本当によろしいですか？</div>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn
						class="mr-4"
						@click="handleDestroy(project.id)"
					>
						削除する
					</v-btn>
					<v-btn
						text
						@click="dialog.value = false"
					>Close</v-btn>
				</v-card-actions>
			</v-card>
		</template>
	</v-dialog>
</template>

<script>
export default {
	props:{
		project: Array
	},
	methods:{
		async handleDestroy(id){
			this.$axios.delete('/v1/projects/'+id)
      .then((response) => {
        this.$router.go("/projects")
      }).catch((error) => {
        console.log(error)
      })
		}
	}
}
</script>