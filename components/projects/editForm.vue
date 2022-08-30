<template>
	<v-row>
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
					<v-list-item-action
						v-bind="attrs"
						v-on="on"
						@click="setProject(project)"
					>編集</v-list-item-action>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="success"
              dark
            >プロジェクト編集</v-toolbar>
            <v-card-text>
              <ValidationObserver
								ref="observer"
								v-slot="{ invalid }"
							>
								<form @submit.prevent="submit">
									<ValidationProvider
										v-slot="{ errors }"
										name="title"
										rules="required"
									>
										<v-text-field
											v-model="title"
											:error-messages="errors"
											label="title"
											required
										></v-text-field>
									</ValidationProvider>

								<ValidationProvider
									v-slot="{ errors }"
									name="Category"
									rules="required"
								>
									<v-select
										v-model="category"
										:items="categories"
										:error-messages="errors"
										label="category"
										item-text="name"
										item-value="id"
										required
									></v-select>
								</ValidationProvider>

									<ValidationProvider
										v-slot="{ errors }"
										name="url"
										rules="required"
									>
										<v-text-field
											v-model="url"
											:error-messages="errors"
											label="URL"
											required
										></v-text-field>
									</ValidationProvider>

									<v-row>
										<v-col
											cols="12"
											md="4"
										>
											<ValidationProvider
												v-slot="{ errors }"
												name="year"
												rules="required|max:4"
											>
											<v-select
												v-model="year"
												:items="years"
												:error-messages="errors"
												label="year"
												required
											></v-select>
											</ValidationProvider>
										</v-col>

										<v-col
											cols="12"
											md="4"
										>
											<ValidationProvider
												v-slot="{ errors }"
												name="month"
												rules="required|max:4"
											>
											<v-select
												v-model="month"
												:items="months"
												:error-messages="errors"
												label="month"
												required
											></v-select>
											</ValidationProvider>
										</v-col>

										<v-col
											cols="12"
											md="4"
										>
											<ValidationProvider
												v-slot="{ errors }"
												name="day"
												rules="required|max:4"
											>
											<v-select
												v-model="day"
												:items="days"
												:error-messages="errors"
												label="day"
												required
											></v-select>
											</ValidationProvider>
										</v-col>
									</v-row>
								</form>
								<v-card-actions class="justify-end">
									<v-btn
										class="mr-4"
										type="submit"
										:disabled="invalid"
										@click="handleUpdate(project.id)"
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

export default {
	props:{
		project: Array
	},
	data() {
		return {
			title: null,
      category: null,
      url: null,
      categories: ['システム開発', '営業', 'デザイン制作', 'コンサルティング', '保守', 'サーバー構築'],
      year: null,
      month: null,
      day: null,
      id: null
		}
	},
	computed:{
    years() {
      const years = []
      for (let year = new Date().getFullYear(); year <= new Date().getFullYear() + 10; year++) {
        years.push(year)
      }
      return years
    },
    months() {
      const months = [...Array(12)].map((ele, i) => i + 1)
      return months
    },
    days() {
      let days = []
      if ((this.month === 2 && this.year % 4 === 0 && this.year % 100 !== 0) || (this.month === 2 && this.year % 400 === 0)) {
        days = [...Array(29)].map((ele, i) => i + 1)
      } else if (this.month === 2) {
        days = [...Array(28)].map((ele, i) => i + 1)
      } else if (this.month === 4 || this.month === 6 || this.month === 9 || this.month === 11) {
        days = [...Array(30)].map((ele, i) => i + 1)
      } else {
        days = [...Array(31)].map((ele, i) => i + 1)
      }
      return days
    },
  },
	methods:{
		setProject(project){
			const deadline = new Date(project.deadline)
			this.title = project.title
			this.category = project.category
			this.url = project.url
			this.id = project.id
			this.year = deadline.getFullYear()
			this.month = deadline.getMonth() + 1
			this.day = deadline.getDate()
		},
		async submit(){
			this.$refs.observer.validate()
		},
		handleUpdate(id){
			const ProjectData = {
				title: this.title,
				category: this.category,
				url: this.url,
				deadline: this.year + '-' + this.month + '-' + this.day,
			};
			this.$axios.put('/v1/projects/'+id, ProjectData)
      .then((response) => {
        const project = response.data.data
        this.$router.push("/projects/"+project.id)
      }).catch((error) => {
        console.log(error)
      })
		},
	}
}
</script>