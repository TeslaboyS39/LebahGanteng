<script>
import Card from '../components/CardItem.vue'
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies.js'

export default {
  components: { 
    Card 
  },
  computed: {
    ...mapState(useMoviesStore, ['bookmarks'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['fetchBookmarks'])
  },
  async created() {
    await this.fetchBookmarks()
    console.log(this.bookmarks, '<<<<');
  }
}
</script>

<template>
    <div class="container">
        <div>
            <h1 class="header-text" style="text-align: center; margin-top: 5vh; margin-bottom: 5vh;">---------- My Bookmarks ----------</h1>
            <hr>
        </div>
        <div class="row justify-content-start" style="margin-top: 5vh;">
            <Card v-for="bookmark in bookmarks" :key="bookmark.id" :movie="bookmark.Movie" />                                                              
        </div>
    </div>
</template>

<style>
.header-text {
  font-family: 'Roboto';
  font-size: 3rem;
  color: #151310; 
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); 
}

.container {
    padding-bottom: 65vh;
}
</style>