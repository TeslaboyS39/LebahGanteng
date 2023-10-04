<script>
import { mapActions, mapState } from 'pinia';
import { useMoviesStore } from '../stores/movies.js';

export default {
    computed: {
        ...mapState(useMoviesStore, ['movieDetail'])
    },
    methods: {
        ...mapActions(useMoviesStore, ['fetchMovieById', 'generateRandomRating'])
    },
    created() {
        this.fetchMovieById(this.$route.params.id)
    }
}
</script>
<template>
    <div class="section about-section gray-bg" id="about">
        <div class="container">
            <div class="row align-items-center flex-row-reverse">
                <div class="col-lg-6">
                    <div class="about-text go-to">
                        <h3 class="dark-color" v-if="movieDetail.movie">{{ movieDetail.movie.title }}</h3>
                        <hr>
                        <p v-if="movieDetail.movie">{{ movieDetail.movie.synopsis }}</p>
                        <div class="row about-list">
                            <div class="col-md-6">
                                <div class="media">
                                    <label>Trailer</label>
                                    <p>
                                        <a :href="movieDetail.trailerUrl">Watch Trailer</a>
                                    </p>
                                </div>
                                <div class="media">
                                    <label>Genre</label>
                                    <p v-if="movieDetail.movie">{{ movieDetail.movie.Genre.name }}</p>
                                </div>
                                <div class="media">
                                    <label>LG-R(Lebah Ganteng - Rating)</label>
                                    <p v-if="movieDetail.movie">⭐ {{ movieDetail.movie.rating }}/10</p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="media">
                                    <!-- nanti naro svg disini -->
                                    <div v-html="movieDetail.data"></div>                                        
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="about-avatar">
                        <img v-if="movieDetail.movie" :src="movieDetail.movie.imageUrl" id="detail-image">
                    </div>
                </div>
            </div>
            <div class="counter">
                <hr>
                <div class="row">
                    <div class="col-6 col-lg-3">
                        <div class="count-data text-center">
                            <h6 class="count h2" data-to="500" data-speed="500">{{ generateRandomRating() }}/10</h6>
                            <p class="m-0px font-w-700">Rotten Tomatoes</p>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3">
                        <div class="count-data text-center">
                            <h6 class="count h2" data-to="150" data-speed="150">{{ generateRandomRating() }}/10</h6>
                            <p class="m-0px font-w-700">IMDb</p>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3">
                        <div class="count-data text-center">
                            <h6 class="count h2" data-to="850" data-speed="850">{{ generateRandomRating() }}/10</h6>
                            <p class="m-0px font-w-700">Film Festivals</p>
                        </div>
                    </div>
                    <div class="col-6 col-lg-3">
                        <div class="count-data text-center">
                            <h6 class="count h2" data-to="190" data-speed="190">{{ generateRandomRating() }}/10</h6>
                            <p class="m-0px font-w-700">Metacritics</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    margin-top: 0.1vh;
    padding-bottom: 3.5vh;
}

#detail-image {
    width: 55%;
}

.col-lg-6 {
    padding-top: 5vh;
    padding-bottom: 3vh;
}

label {
    font-weight: 700;
}

#qr-img {
    max-width: 75%;
}

img {
    vertical-align: middle;
    border-style: none;
}

.about-avatar {
    padding-left: 15%;
    margin-left: 10%;
}

.about-text {
    padding-right: 5%;
    margin-right: 10%;
}

.counter {
    padding-left: 3%;
}

.gray-bg {
    background-color: #f1efef;
}

.about-text h3 {
  font-size: 39px;
  font-weight: 700;
  padding-top: 5vh;
}
</style>