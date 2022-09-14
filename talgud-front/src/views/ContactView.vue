<template>
  <div>
    <br><br>
    <input type="text" v-model="firstname" placeholder="Eesnimi">
    <br><br>
    <input type="text" v-model="lastname" placeholder="Perekonnanimi">
    <br><br>
    <input type="text" v-model="telephone" placeholder="Telefoninumber">
    <br><br>
    <input type="text" v-model="email" placeholder="e-maili aadress">
    <br><br>
    <div class="align-items-center">
      <button v-on:click="contactRequest" class="btn btn-dark">Lisa kasutaja kontaktid</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactView",
  data: function () {
    return {
      firstname: "",
      lastname: "",
      telephone: "",
      email: "",
      userId: sessionStorage.getItem("userId"),
    }
  },
  methods: {
    contactRequest: function () {
      let user = {
        userId: this.userId,
        firstName: this.firstname,
        lastName: this.lastname,
        telephone: this.telephone,
        email: this.email,
        }
      this.$http.post('/authentication/contact', user)
          .then(
            this.$router.push({name: 'avalehtRoute'})
          )
          .catch(error => console.log(error.response.data))
    }
  }
}
</script>