import axios from 'axios';
import { store } from '../../client/store/index';
<template>
  <div class="flex items-center content-center justify-center w-full">

  <FormulateForm
    name="login"
    @submit="loginHandler"
    v-model="form"
    class="login-form"
  >
    <h2 class="form-title">Login</h2>
    <FormulateInput
      name="email"
      placeholder="Put your email"
      label="Email"
      validation="required|email"
    />
    <FormulateInput
      name="password"
      label="Password"
      placeholder="Put your password"
      validation="required|min:6"
    />
    <FormulateErrors />

      <div class="flex flex-col d-flex mt-4">
          <button :disabled="!form.email || !form.password" type="submit" :class="[ isLoading ? 'loading' : 'something' ,'btn btn-secondary']">
            Login
          </button>

        </div>

         <div class="mt-4">
          <nuxt-link class="text-primary mt-2" to="/signup">Don't have an account?</nuxt-link>
        </div>
  </FormulateForm>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      isLoading: false,
    }
  },

  methods: {
    async loginHandler() {
      try {
        this.isLoading = true
        const { data } = await this.$axios.post('/api/v1/auth/login', this.form)
        // console.log(data)
        this.$toast.success('Redirecting...');
        this.isLoading = false
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        const errors = err.response.data.errors
        this.$toast.error(errors[0].message)
        this.isLoading = false
      }
    },
  },
}
</script>

<style>
.actions {
  display: flex;
  margin-bottom: 1em;
  margin-top: 1em;
}
.actions .formulate-input {
  margin-right: 1em;
  margin-bottom: 0;
}

.login-form {
  margin-top: 20px;
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: 0.5em;
  max-width: 500px;
  box-sizing: border-box;
  outline: none !important;
}

.formulate-input-element {
  border: 1px solid #a8a8a8;
  border-radius: 0.5em;
  padding: 0.5em;
}

.formulate-input-element input {
  outline: none;
}
.formulate-input-error {
  color: red;
}

.form-title {
  margin-bottom: 20px;
  font-size: 25px;
  text-align: center;
  font-weight: bolder;
}
</style>
