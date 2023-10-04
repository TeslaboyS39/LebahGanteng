<script>
import { mapWritableState } from 'pinia';
import { useMoviesStore } from './stores/movies.js';
import Navbar from './components/Navbar.vue'
export default {
  components: {
    Navbar
  },
  computed: {
    ...mapWritableState(useMoviesStore, ['isLogin'])
  },
  created() {
    if(localStorage.access_token) {
      this.isLogin = true;
    }
  }
}
</script>

<template>
  <div class="main-container">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<style>
.main-container {
  background-image: url('https://wallpaperaccess.com/full/3110750.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
</style>
