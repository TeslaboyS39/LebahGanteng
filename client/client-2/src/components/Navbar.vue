<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMoviesStore } from '../stores/movies.js';

export default {
  computed: {
    ...mapState(useMoviesStore, ['selectedGenre', 'genres', 'isLogin']),
    ...mapWritableState(useMoviesStore, ['pagination'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['goToLogOut', 'goToGenrePage', 'fetchDataMovies'])
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" style="margin-left:2vh"><img
        src="https://asset-2.tstatic.net/medan/foto/bank/images/lebah-ganteng_20180504_091841.jpg"
        class="d-inline-block align-top"></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About Us</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Genre
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-for="genre in genres" :key="genre.id">
                <a @click.prevent="goToGenrePage(genre.id)" class="dropdown-item">{{ genre.name }}</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link v-if="isLogin" to="/bookmarks" class="nav-link">Bookmarks</router-link>
          </li>        
          <form class="d-flex" style="margin-left:17vh" @submit.prevent="fetchDataMovies">
            <input v-model="pagination.search" class="form-control me-2" type="search" placeholder="Search Movie..." aria-label="Search" style="width: 55vh;">
            <button class="btn btn-warning" type="submit">Search</button>
          </form>
          <li class="nav-item d-flex align-items-center" style="margin-left:47vh">
            <router-link v-if="isLogin" @click.prevent="goToLogOut" to="/" class="nav-link logout-link">👤Logout</router-link>
            <router-link v-if="!isLogin" to="/login" class="nav-link logout-link">👤Login</router-link>
          </li>
      </ul>
    </div>
  </nav>
</template>

<style>
.d-inline-block {
  height: 7vh; 
  margin-right: 0.5vh; 
  border-radius: 3px;
}

</style>