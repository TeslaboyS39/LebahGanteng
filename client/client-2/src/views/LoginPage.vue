<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies.js'

export default {
  computed: {
    ...mapState(useMoviesStore, ['inputLogin'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['doLogin', 'goToRegisterPage', 'doGoogleLogin']),
    doGoogleLoginHandler(response) {
      this.doGoogleLogin(response)
    }
  },
}
</script>
<template>
  <div id="login-section">
    <div class="login-container">
        <h2>Login</h2>
        <hr>
        <form @submit.prevent="doLogin">
            <input v-model="inputLogin.email" type="email" placeholder="Email" required>
            <input v-model="inputLogin.password" type="password" placeholder="Password" required class="mb-4">
            <button class="btn btn-primary mb-2" type="submit" >Login</button>
            <button type="button" class="btn btn-warning mb-3" @click.prevent="goToRegisterPage">Don't have an account?</button>
        </form>
        <GoogleLogin :callback="doGoogleLoginHandler"/>
    </div>  
  </div>
</template>

<style>
.login-container {
  background-color: #e6dddd;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 14.7px auto;
  max-width: 400px;
  text-align: center;
}

.login-container {
  margin-top: 25vh;
}

.login-container h2 {
  margin-bottom: 20px;
}

.login-container form {
  display: flex;
  flex-direction: column;
}

.login-container input {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.login-container button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#login-section {
  padding-bottom: 11vh;
}
</style>