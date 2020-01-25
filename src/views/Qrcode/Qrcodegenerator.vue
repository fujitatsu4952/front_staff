<template>
  <div class="whole">
    <div class="appqr">
      <Qrcodegenerator />
    </div>
  </div>
</template>

<script>
import Qrcodegenerator from "./qrcode.vue";

export default {
  name: "app",
  components: {
    Qrcodegenerator
  },
  data() {
    return {
      url: ""
    };
  }
};
</script>

<style scoped>
.whole {
  margin: 0px;
  background-image: url(../../assets/kyotoqr.png);
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
}

.appqr {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #f4f5f7;
  padding-top: 150px;
  padding-bottom: 500px;
}
</style>
