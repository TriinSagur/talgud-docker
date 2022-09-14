<template xmlns:object-fit="http://www.w3.org/1999/xhtml">
  <div class="home">
    <section class="hero is-dark">

      <div class="hero-body">

        <div class="imagecontainer"></div>

        <div class="container">
          <h1 class="title">Talgud on nagu laulupidu, see on alateadlik vajadus tunda end kuhugi kuuluvana.<br><br> Oled oodatud talgutele!</h1>

        </div>
      </div>

    </section>
  </div>
</template>



<script>
export default {
  name: "AvalehtView",
  comments: {},
}

</script>

<style>

.imagecontainer {
  height: 250px;
  background-image: url("https://www.redwall.ee/images/refs/talgud/talgud-header.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}


.hero-body .title {
  text: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 35px;
}


</style>
