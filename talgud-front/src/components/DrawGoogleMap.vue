<template>
  <div>

    <gmap-map
        :center="center"
        :zoom="7"
        style="width:97%;  height: 450px;">
      <gmap-marker
          :key="index"
          v-for="(gmp, index) in locations"
          :position="gmp"
          @click="center=gmp"
      ></gmap-marker>
    </gmap-map>

  </div>
</template>

<script>
export default {
  name: "DrawGoogleMap",
  props: {
    locations: []
  },
  data() {
    return {
      center: {
        lat: 58.887858,
        lng: 25.541171
      },
      currentLocation: null,

    };
  },

  mounted() {
    this.setLocationLatLng();

  },

  methods: {
    setPlace(loc) {
      this.currentLocation = loc;
    },
    setLocationLatLng: function () {
      lat:58.887858
      lng: 25.541171

    }


  },

};
</script>