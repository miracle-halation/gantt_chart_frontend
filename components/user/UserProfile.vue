<template>
	<v-navigation-drawer
		app
		clipped
	>
		<v-sheet
			color="grey lighten-4"
			class="pa-4"
		>
			<v-avatar
				class="mb-4"
				color="grey darken-1"
				size="64"
			></v-avatar>
			<div>{{profile.name}}</div>
		</v-sheet>

		<v-divider></v-divider>

		<!-- ここにタスクやプロジェクトなどのユーザーに紐づく情報へのリンクを作成する -->
		<v-list>
			<v-list-item>
				<v-list-item-action>
					<v-icon>mdi-phone</v-icon>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>{{profile.phone}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>

			<v-divider inset></v-divider>

			<v-list-item>
				<v-list-item-action>
					<v-icon>mdi-map-marker</v-icon>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title>{{profile.group}}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	props:{
		profile: Array
	}
}
</script>