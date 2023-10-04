import { defineStore } from 'pinia'
import axios from 'axios'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    // baseUrl: 'https://client-project-01.fatahillah.shop',
    movies: [],
    movieDetail: {},
    registerData: {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    },
    inputLogin: {
      email: '',
      password: ''
    },
    selectedGenre: null,
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'Drama' },
      { id: 4, name: 'Comedy' },
      { id: 5, name: 'Fantasy' }
    ],
    isLogin: false,
    bookmarks: [],
    pagination: {
      search: '',
      page: 1,
      limit: 8
    }
  }),
  getters: {},
  actions: {
    async fetchDataMovies() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/pub/movies',
          params: this.pagination
        })

        console.log(data)
        this.movies = data
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async fetchMovieById(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/pub/movies/' + id
        })

        console.log('Fetched movie detail:', data)
        this.movieDetail = data
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    generateRandomRating() {
      return Math.floor(Math.random() * 9) + 1
    },
    async doRegister() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/pub/register',
          method: 'POST',
          data: this.registerData
        })

        console.log(data)
        this.router.push({ name: 'Login' })
      } catch (error) {
        console.log(error)
      }
    },
    goToLoginPage() {
      this.router.push({ name: 'Login' })
      this.isLogin = true
    },
    async doLogin() {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/pub/login',
          method: 'POST',
          data: this.inputLogin
        })

        console.log(data)
        localStorage.access_token = data.access_token
        this.isLogin = true
        this.router.push({ name: 'Home' })
      } catch (error) {
        console.log(error)
      }
    },
    goToLogOut() {
      localStorage.clear()
      this.isLogin = false
      this.router.push('/login')
    },
    goToGenrePage(genreId) {
      this.router.push({ path: '/', query: { genre: genreId } })
    },
    goToRegisterPage() {
      this.router.push('/register')
    },
    async fetchBookmarks() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: this.baseUrl + '/pub/bookmarks',
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log('Fetched bookmarks:', data)
        this.bookmarks = data
      } catch (error) {
        console.log(error.response.data.message)
      }
    },
    async postBookmark(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: this.baseUrl + '/pub/bookmarks',
          data: {
            MovieId: id
          },
          headers: {
            access_token: localStorage.access_token
          }
        })

        console.log(data)
        Swal.fire(
          'Bookmark movie success!',
          'Thank you for add a movie to your bookmark',
          'success'
        )
        this.fetchBookmarks()
        this.router.push('/bookmarks')
      } catch (error) {
        console.log(error)
      }
    },
    async doGoogleLogin(response) {
      try {
        const { data } = await axios({
          url: this.baseUrl + '/pub/google-login',
          method: 'POST',
          headers: {
            credential: response.credential
          }
        })

        console.log(data)
        localStorage.access_token = data.access_token
        this.isLogin = true
        this.router.push({ name: 'Home' })
      } catch (error) {
        console.log(error.response.data.message)
      }
    }
  }
})
