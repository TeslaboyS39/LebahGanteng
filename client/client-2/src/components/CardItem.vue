<script>
import { mapState, mapActions } from 'pinia';
import { useMoviesStore } from '../stores/movies.js';

export default {
  props: ['movie'], // ini tuh karena di vfor nya homepage pakai movie in movies
  computed: {
    ...mapState(useMoviesStore, ['isLogin']),
  },
  methods: {
    ...mapActions(useMoviesStore, ['postBookmark']),
    goToMovieDetail() {
      this.$router.push('/detail/' + this.movie.id)
    },
    addToBookmarks() {
      this.postBookmark(this.movie.id)
    }
  }
}
</script>

<template>
  <div class="col-12 col-md-3">
    <div class="row">
      <div class="col-4 mb-3">
        <div class="card bg-dark text-white" style="width: 17rem;">
          <img :src="movie.imageUrl" class="card-img-top" alt="img-broken." style="height: 25rem; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">⭐ {{ movie.rating }}/10
            </p>
            <a @click.prevent="goToMovieDetail" href="#" class="btn btn-primary" style="margin-right: 4vh;">Movie Detail</a>
            <button v-if="isLogin && $route.path === '/'" @click.prevent="addToBookmarks" class="btn btn-danger" id="button-bookmark">Bookmark</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>