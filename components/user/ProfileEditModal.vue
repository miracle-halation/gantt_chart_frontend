<template>
	<v-row>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            v-bind="attrs"
            v-on="on"
						@click="setProfile(profile)"
          >プロフィール編集</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="success"
              dark
            >プロフィール編集</v-toolbar>
            <v-card-text>
              <ValidationObserver
								ref="observer"
								v-slot="{ invalid }"
							>
								<form @submit.prevent="submit">
									<ValidationProvider
										v-slot="{ errors }"
										name="name"
										rules="required"
									>
										<v-text-field
											v-model="name"
											:error-messages="errors"
											label="名前"
											required
										></v-text-field>
									</ValidationProvider>

									<ValidationProvider
										v-slot="{ errors }"
										name="Phone"
										:rules="{required: true, regex: /^\d{2,3}-\d{1,4}-\d{4}$/}"
									>
										<v-text-field
											v-model="phone"
											:error-messages="errors"
											label="電話番号"
											required
										></v-text-field>
									</ValidationProvider>

									<ValidationProvider
										v-slot="{ errors }"
										name="Group"
										rules="required"
									>
										<v-select
											v-model="group"
											:items="groups"
											:error-messages="errors"
											label="所属部署"
											item-text="name"
											item-value="id"
											required
										></v-select>
									</ValidationProvider>

								</form>
								<v-card-actions class="justify-end">
									<v-btn
										class="mr-4"
										type="submit"
										:disabled="invalid"
										@click="handleUpdate"
									>
										submit
									</v-btn>
									<v-btn
										text
										@click="dialog.value = false"
									>Close</v-btn>
								</v-card-actions>
							</ValidationObserver>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
	</v-row>
</template>

<script>
import {mapActions} from 'vuex'

export default {
	props:{
		profile: Array
	},
	data() {
		return {
			name: '',
			phone: '',
			group: '',
			groups: ['営業部', '制作部', 'システム部', '企画部', '総務部', '管理部'],
		}
	},
	methods:{
		setProfile(profile){
			this.name = profile.name
			this.phone = profile.phone
			this.group = profile.group
		},
		async submit(){
			this.$refs.observer.validate()
		},
		handleUpdate(){
			const ProfileData = {
				name: this.name,
				phone: this.phone,
				group: this.group
			};
			this.updateProfile({data: ProfileData})
		},
		...mapActions('user', ['updateProfile'])
	}
}
</script>