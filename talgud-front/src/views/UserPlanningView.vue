<template>
  <div>
    {{ project.projectName }}
    <br>
    {{ project.projectAddress }}
    <br>
    {{ project.projectStartTime }}
    <br>
    <br>

    <div class="container-md">
      <div class="row justify-content-center">
        <div class="col-4">

        </div>
        <div class="col-4">
          <div class="input-group mb-3">
            <button v-on:click="addResource" class="btn btn-primary me-md-2" type="button" id="button-addon">Lisa
            </button>
            <input type="text" v-model="newResource.name" class="form-control" placeholder="Lisa uus vahend"
                   aria-label="Example text with button addon" aria-describedby="button-addon1">
          </div>
        </div>
        <div class="col-3">
          <div class="input-group mb-3">
            <button v-on:click="addNewPicture" class="btn btn-primary me-md-2" type="button"
                    id="inputGroupFileAddon03">
              Lisa pilt
            </button>
            <input type="file" @change="handleImage" accept="image/x-png,image/jpeg" class="form-control"
                   id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload">
          </div>
        </div>
      </div>
    </div>

    <div id="tabel">
      <div class="container-md">
        <div class="row justify-content-center">
          <div class="col-4">
            <table class="table">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Ülesanded</th>
                <th scope="col">Vastutaja</th>
                <th scope="col"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="task in tasks">
                <td>
                </td>
                <td>{{ task.name }}</td>
                <td>{{ task.contactFirstName }} {{ task.contactLastName }}</td>
                <td>
                  <div v-if="task.userId == null">
                  <button v-on:click="updateTask(task.id, userId)" type="button" class="btn btn-secondary btn-sm">Määra ennast</button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="col-4">
            <table class="table">
              <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Vahendid</th>
                <th scope="col">Vastutaja</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="resource in resources">
                <td>
                </td>
                <td>{{ resource.name }}</td>
                <td>{{ resource.contactFirstName }} {{ resource.contactLastName }}</td>
                <td>
                  <div v-if="resource.userId == null">
                    <button v-on:click="updateResource(resource.id, userId)" type="button" class="btn btn-secondary btn-sm">Määra ennast</button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>


          <div class="col-3">
            <div id="galerii">
              <img class="image" v-for="(picture, i) in pictures" :src="picture" :key="i"
                   @click="index = i" style="height: 200px">
              <vue-gallery-slideshow :images="pictures" :index="index" @close="index = null"></vue-gallery-slideshow>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-grid gap-2 mx-auto">
      <button v-on:click="backToLisainfo" class="btn btn-primary me-md-2">Tagasi</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "PlanningView",

  components: {VueGallerySlideshow},

  data: function () {
    return {
      project: JSON.parse(sessionStorage.getItem('project')),
      newTask: {
        projectId: JSON.parse(sessionStorage.getItem('project')).projectId,
        name: ''
      },
      newResource: {
        projectId: JSON.parse(sessionStorage.getItem('project')).projectId,
        name: ''
      },
      tasks: {},
      resources: {},
      picturesTemp: {},
      pictures: [],
      pictureExport: {},
      index: null,
      contacts: {},
      userId: sessionStorage.getItem("userId")
    }
  },

  methods: {
    handleImage(event) {
      const selectedImage = event.target.files[0];
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pictureExport.data = reader.result;
        console.log(this.pictureExport.data)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    },

    addNewPicture: function () {
      let pictureRequest = {
        projectId: this.project.projectId,
        data: this.pictureExport.data
      }
      this.$http.post("/picture", pictureRequest
      ).then(response => {
        this.getAllPictures()
      }).catch(error => {
        console.log(error)
      })
    },
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

    updateTask: function (taskId, taskUserId) {
      this.$http.put("/task", {
            id: taskId,
            userId: taskUserId
          }
      ).then(response => {
        console.log(response.data)
        this.getAllTasksForProject()

      }).catch(error => {
        console.log(error)
      })
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
    addResource: function () {
      this.$http.post("/resource", this.newResource
      ).then(response => {
        console.log(response.data)
        this.getAllResourcesForProject()
        this.$router.push({name: 'userPlanningRoute'})
      }).catch(error => {
        console.log(error)
      })
    },
    updateResource: function (resourceId, resourceUserId) {
      this.$http.put("/resource", {
            id: resourceId,
            userId: resourceUserId
          }
      ).then(response => {
        console.log(response.data)
        this.getAllResourcesForProject()

      }).catch(error => {
        console.log(error)
      })
    },

    getAllPictures: function () {
      this.$http.get('/picture', {
        params: {
          projectId: this.project.projectId
        }
      })
          .then(response => {
            this.picturesTemp = response.data
            this.pictures = []
            for (let i = 0; i < this.picturesTemp.length; i++) {
              this.pictures.push(this.picturesTemp[i].data)
            }
          })
          .catch(error => console.log(error.response.data))
    },
    backToLisainfo: function () {
      this.$router.push({name: 'lisainfoLogInRoute'})
    },
    getAllProjectContacts: function () {
      this.$http.get('/user-project', {
        params: {
          projectId: this.project.projectId
        }
      })
          .then(response => {
            console.log(this.contacts)
            this.contacts = response.data
          })
          .catch(error => console.log(error.response.data))
    }
  },
  mounted() {
    this.getAllTasksForProject()
    this.getAllResourcesForProject()
    this.getAllPictures()
    this.getAllProjectContacts()
  },
}
</script>

<style>
#tabel {
  font-size: 14px;
}

</style>