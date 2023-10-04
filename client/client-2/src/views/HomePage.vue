<script>
import Card from '../components/CardItem.vue'
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useMoviesStore } from '../stores/movies';

export default {
  data() {
    return {
      limit: "",
    }
  },
  components: { 
    Card 
  },
  computed: {
    ...mapState(useMoviesStore, ['movies']),
    ...mapWritableState(useMoviesStore, ['pagination']),
    filteredMovies() {
      const selectedGenre = this.$route.query.genre;
      if (!selectedGenre) {
        return this.movies;
      }
      const genreId = parseInt(selectedGenre);
      return this.movies.filter(movie => movie.Genre.id === genreId);
    }
  },
  methods: {
    ...mapActions(useMoviesStore, ['fetchDataMovies']),
    filterSearch() {
      if(this.movies.length !== this.limit){
        this.pagination.page = 1
      }
      this.fetchDataMovies()
    },
    resetLimit(){
      this.limit = ""
      this.pagination.limit = 8
    },
    changePaginationAdd(value) {
      console.log(this.movies.length, this.pagination.limit);
      if(this.movies.length === this.pagination.limit){
        this.pagination.page = this.pagination.page + value
        this.fetchDataMovies()
      }
    },
    changePaginationMin(value) {
      console.log(this.movies.length, this.pagination.limit);
      if(this.pagination.page > 1) {
        this.pagination.page = this.pagination.page - value
        this.fetchDataMovies()    
      }
    }
  },
  watch: {
    limit(newValue, oldValue){
      this.pagination.limit = newValue
      if(newValue <= 0 && this.limit !== ""){
        this.pagination.limit = oldValue
      } 

      if(this.limit === ""){
        this.pagination.limit = 8
      }
    },
  },
  beforeUnmount() {
    this.pagination.limit = 8
  },
  created() {
    this.fetchDataMovies()
  }    
}
</script>

<template>
    <div class="container">
        <div>
            <h1 class="header-text" style="text-align: center; margin-top: 5vh; margin-bottom: 5vh;">---------- Our Movies ----------</h1>
            <hr>
        </div>
        <div class="row justify-content-start" style="margin-top: 5vh;">
            <Card v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />                                             
        </div>

        <nav aria-label="PageNav" class="page">
          <ul class="pagination">
            <li class="page-item">
              <a @click.prevent="changePaginationMin(1)" class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">{{ pagination.page }} <span class="sr-only"></span></a>
            </li>
            <li class="page-item">
              <a @click.prevent="changePaginationAdd(1)" class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
    </div>
</template>

<style>
.header-text {
  font-family: 'Roboto';
  font-size: 3rem;
  color: #151310; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
}
</style>