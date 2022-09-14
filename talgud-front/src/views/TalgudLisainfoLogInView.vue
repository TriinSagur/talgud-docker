<template>
  <div>
    <div id="projekt">

      {{ project.projectName }}
      <br>
      Asukoht: {{ project.projectAddress }}
      <br>
      Algus: {{ project.projectStartTime }}
      <br>
      Lõpp: {{ project.projectEndTime }}
    </div>

    <br>
    <div id="tabel">
      <div class="container-md">
        <div class="row justify-content-center">
          <div class="col-3">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Ülesanded</th>
                <th scope="col">Vastutaja</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="task in tasks">
                <td>{{ task.name }}</td>
                <td>{{ task.contactFirstName }} {{ task.contactLastName }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-3">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Vahendid</th>
                <th scope="col">Vastutaja</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="resource in resources">
                <td>{{ resource.name }}</td>
                <td>{{ resource.contactFirstName }} {{ resource.contactLastName }}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="col-4">
            <br>

            <div id="galerii">
              <img class="image" v-for="(picture, i) in pictures" :src="picture" :key="i"
                   @click="index = i" style="height: 120px">
              <vue-gallery-slideshow :images="pictures" :index="index" @close="index = null"></vue-gallery-slideshow>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>

    <div class="d-grid gap-2 mx-auto">
      <button v-on:click="manageButtonAction" class="btn btn-primary me-md-2">{{ manageButtonText }}</button>
    </div>

  </div>
</template>


<script>

export default {
  name: "TalgudLisainfoView",

  components: {VueGallerySlideshow},

  data: function () {
    return {
      tasks: {},
      resources: {},
      picturesTemp: {},
      project: JSON.parse(sessionStorage.getItem('project')),
      pictures: [],
      index: null,
      manageButtonText: ""
    }
  },

  methods: {
    getAllTasksForProject: function () {
      this.$http.get('/task', {
        params: {
          projectId: this.project.projectId
        }
      })
          .then(response => {
            this.tasks = response.data
          })
          .catch(error => console.log(error.response.data))
    },
    getAllResourcesForProject: function () {
      this.$http.get('/resource', {
        params: {
          projectId: this.project.projectId
        }
      })
          .then(response => {
            this.resources = response.data
          })
          .catch(error => console.log(error.response.data))
    },
    getAllPictures: function () {
      this.$http.get('/picture', {
        params: {
          projectId: this.project.projectId
        }
      })
          .then(response => {
            this.picturesTemp = response.data
            for (let i = 0; i < this.picturesTemp.length; i++) {
              this.pictures.push(this.picturesTemp[i].data)
            }
          })
          .catch(error => console.log(error.response.data))
    },
    manageButtonTextCheck: function () {
      if (this.project.isModerator) {
        this.manageButtonText = "Redigeeri"
      } else {
        this.manageButtonText = "Vali omale vastutusala"

      }
    },
    manageButtonAction: function () {
      if (this.project.isModerator) {
        this.$router.push({name: 'planningRoute'})
      } else {

        this.$router.push({name: 'userPlanningRoute'})
      }

    },

  },
  mounted() {
    this.getAllTasksForProject()
    this.getAllResourcesForProject()
    this.getAllPictures()
    this.manageButtonTextCheck()
  },

}

</script>
<style>


#tabel {
  font-size: 14px;
}
</style>

