<script>
import { mapActions, mapState } from 'pinia'
import { useMoviesStore } from '../stores/movies.js'

export default {
  computed: {
    ...mapState(useMoviesStore, ['registerData'])
  },
  methods: {
    ...mapActions(useMoviesStore, ['doRegister', 'goToLoginPage'])
  },
}
</script>
<template>
  <div id="register-section">
    <div class="register-container">
      <h2 class="mb-4">Register</h2>
      <hr>
      <form @submit.prevent="doRegister">
        <div class="mb-3">
          <input v-model="registerData.username" type="text" class="form-control" placeholder="Username" required />
        </div>
        <div class="mb-3">
          <input v-model="registerData.email" type="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input v-model="registerData.password" type="password" class="form-control" placeholder="Password" required />
        </div>
        <div class="mb-3">
          <input v-model="registerData.phoneNumber" type="tel" class="form-control" placeholder="Phone Number" required />
        </div>
        <div class="mb-3">
          <input v-model="registerData.address" type="text" class="form-control" placeholder="Address" required />
        </div>
        <button type="submit" class="btn btn-primary mb-2">Register</button>
        <button type="button" class="btn btn-warning" @click="goToLoginPage">Already have an account ?</button>
      </form>
    </div>
  </div>
</template>

<style>
.register-container {
  background-color: #e6dddd;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 14.7px auto;
  max-width: 400px;
  text-align: center;
}

.register-container h2 {
  margin-bottom: 20px;
}

.register-container form {
  display: flex;
  flex-direction: column;
}

.register-container input,
.register-container select {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.register-container button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#register-section {
  padding-bottom: 0.003vh;
}
</style>