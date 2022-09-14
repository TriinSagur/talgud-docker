<template>
  <div>
    <div class="container-md">
      <div class="row justify-content-center">
        <div class="col-6">


          <br>
          <div id="tabel">
            <table class="table">
              <thead>
              <tr>
                <th scope="col">Kuupäev</th>
                <th scope="col">Nimi</th>
                <th scope="col">Asukoht</th>
                <th scope="col"></th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="project in projects">
                <th scope="row">{{ project.startTime }}</th>
                <td>{{ project.name }}</td>
                <td>{{ project.address }}</td>
                <td>
                  <button type="button" class="btn btn-secondary btn-sm" v-on:click="navigateToTalgudLisainfo(project)">
                    Lisainfo
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col">
          <br>
          <DrawGoogleMap :locations="locations"/>
        </div>
      </div>
    </div>
  </div>


</template>

<script>


import DrawGoogleMap from "@/components/DrawGoogleMap";

export default {
  name: "ToimunudTalgudView",
  components: {
    DrawGoogleMap
  },
  data: function () {
    return {
      projects: {},
      locations: []
    }
  },
  methods: {
    getAllOldProjects: async function () {
      await this.$http.get('/project-old')
          .then(response => {
            this.projects = response.data
            for (let i = 0; i < this.projects.length; i++) {
              const location = {
                lat: this.projects[i].latitude,
                lng: this.projects[i].longitude,
                label: this.projects[i].name
              }
              this.locations.push(location)
            }
            console.log(response.data)
          })
          .catch(error => console.log(error))

    },
    navigateToTalgudLisainfo: function (project) {

      sessionStorage.setItem('project', JSON.stringify(project))
      sessionStorage.setItem('lastRoute', 'toimunudRoute')
      this.$router.push({name: 'lisainfoRoute'})
    },
  },
  mounted() {
    this.getAllOldProjects()
  }

}
</script>

<style >
#tabel {
  font-size: 14px;
}

</style>