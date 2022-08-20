<template>
	<v-navigation-drawer
		v-model="drawer"
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
			<div>名前</div>
		</v-sheet>

		<v-divider></v-divider>

		<!-- ここにタスクやプロジェクトなどのユーザーに紐づく情報へのリンクを作成する -->
		<v-list>
			<v-list-item
				v-for="[icon, text, access] in links"
				:key="icon"
				link
				:to=access
			>
				<v-list-item-icon>
					<v-icon>{{ icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title>{{ text }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
export default {
	data: () => ({
		links:[
			['mdi-account', 'Profile', '/mypage/profile'],
		]
  }),
}
</script>