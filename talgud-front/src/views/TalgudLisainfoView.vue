<template>
  <div>
    <div id="projekt">
      {{ project.name }}
      <br>
      Asukoht: {{ project.address }}
      <br>
      Algus: {{ project.startTime }}
      <br>
      Lõpp: {{ project.endTime }}
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
            <br>
          </div>
        </div>
      </div>
    </div>
    <br>
    <div v-if="showOsalenButton" class="d-grid gap-2 mx-auto">
      <button v-on:click="osalenButtonAction" class="btn btn-primary me-md-2">LIITUN</button>
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
      picturesTemp: {},
      project: JSON.parse(sessionStorage.getItem('project')),
      pictures: [],
      index: null,
      showOsalenButton: true,
      userProjects: [],
      isProjectUser: false,
      userId: sessionStorage.getItem('userId')
    }
  },

  methods: {
    getAllTasksForProject: function () {
      this.$http.get('/task', {
        params: {
          projectId: this.project.id
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
          projectId: this.project.id
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
          projectId: this.project.id
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

    osalenButtonAction: function () {
      if (sessionStorage.getItem('userId') > 0) {
        this.$http.post('/project-user', null, {
          params: {
            projectId: this.project.id,
            userId: sessionStorage.getItem('userId'),
          }
        })
        this.$router.push({name: 'minuRoute'})
      } else {
        this.$router.push({name: 'loginRoute'})
      }
    },
    getAllUserProjects: async function () {
      await this.$http.get('/project-user', {
        params: {
          userId: this.userId
        }
      })
          .then(response => {
            this.userProjects = response.data
            console.log(this.userProjects)
            console.log(this.userProjects.length)
            for (let i = 0; i < this.userProjects.length; i++) {
              if (this.project.id === this.userProjects[i].projectId ) {
                this.showOsalenButton= false
                }
              console.log(this.showOsalenButton)
            }
          })
          .catch(error => console.log(error.response.data))
    }
  },
  mounted() {
    this.getAllTasksForProject()
    this.getAllResourcesForProject()
    this.getAllPictures()
    this.getAllUserProjects()
  },
}

</script>
<style>
.image {margin-left: 5px; margin-top: 5px;}
#projekt{
  font-family: "Trebuchet MS",sans-serif;
}
</style>


