<template>
  <div>
    <div class="container-md">
      <div class="row justify-content-center">
        <div class="col-6">
          <br>
          <br>
          <input type="text" v-model="name" placeholder="Lisa talgutele nimi">
          <br>

          <div class="d-grid gap-2 mx-auto">
            <br>
            <label>
              <gmap-autocomplete @place_changed="initMarker"></gmap-autocomplete>
              <button class="btn btn-primary me-md-2" @click="addLocationMarker">Kinnita aadress</button>
            </label>
          </div>

          <br>
          <date-picker v-model="startTime" type="datetime" placeholder="Talgute algus"></date-picker>

          <br>
          <br>
          <date-picker v-model="endTime" type="datetime" placeholder="Talgute lõpp"></date-picker>

          <br>
          <br>
          <br>
          <br>

          <div class="d-grid gap-2 mx-auto">
            <button v-on:click="addNewProjectUser" class="btn btn-primary me-md-2">Loo uued talgud</button>
          </div>
        </div>
        <div class="col">
          <br>

          <gmap-map
              :zoom="10"
              :center="center"
              style="width:97%;  height: 450px;"
          >
            <gmap-marker
                :key="index"
                v-for="(m, index) in locationMarkers"
                :position="m.position"
                @click="center=m.position"
            ></gmap-marker>
          </gmap-map>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";

export default {
  name: "AddGoogleMap",
  components: {
    DatePicker,

  },
  data() {
    return {
      center: {
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      name: "",
      address: "",
      startTime: "",
      endTime: "",
      longitude: "",
      latitude: "",
      time1: null,
      time2: null,
    };
  },

  mounted() {
    this.locateGeoLocation();
    this.clearProject()
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
      sessionStorage.setItem('formattedAddress', loc.formatted_address)
      this.address = loc.formatted_address
      console.log("OLEME SIIN")
      console.log(loc)
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.latitude = this.existingPlace.geometry.location.lat();
        this.longitude = this.existingPlace.geometry.location.lng();
        this.locationMarkers.push({position: marker});
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function () {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    },
    clearProject: function () {
      sessionStorage.removeItem('project')
    },

    addNewProjectUser: function () {
      let project = {
        name: this.name,
        address: this.address,
        startTime: this.startTime,
        endTime: this.endTime,
        longitude: this.longitude,
        latitude: this.latitude
      }
      this.$http.post('/project', project, {
        params: {
          userId: sessionStorage.getItem("userId")
        }
      })
          .then(response => {
            this.project = response.data
            sessionStorage.setItem('project', JSON.stringify(response.data))
            this.$router.push({name: 'planningRoute'})
          })
          .catch(error => console.log(error.response.data))
    }
  }
};
</script>