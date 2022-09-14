<template>
  <div>
    <br>
    <input type="text" v-model="username" placeholder="Kasutajanimi">
    <br><br>
    <input type="password" v-model="password" placeholder="Parool">
    <br><br>
    <div class="align-items-center">
      <button v-on:click="loginRequest" class="btn btn-dark">Logi sisse</button>
    </div>
    <br>
    <a>
      <router-link to="/registration">Registreeri uus kasutaja</router-link>
    </a>
  </div>

</template>

<script>
export default {
  name: "LoginView",
  data: function () {
    return {
      username: "",
      password: "",
      userId: null,
      lastRoute: ""
    }

  },
  methods: {
    loginRequest: function () {
      let user = {
        username: this.username,
        password: this.password
      }
      this.$http.post('/authentication/exists', user)
          .then(response => {
            this.userId = response.data
            sessionStorage.setItem('userId', this.userId)
            this.lastRoute = sessionStorage.getItem('lastRoute')
            if (this.lastRoute === null) {
              this.$router.push({name: 'avalehtRoute'})
            } else {
              this.$router.push({name: this.lastRoute})
            }

            window.location.reload()
          })
          .catch(error => console.log(error.response.data))

    }
  }
}
</script>

<style scoped>

</style>
