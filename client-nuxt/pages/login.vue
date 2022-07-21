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
      label="Email"
      validation="required|email"
    />
    <FormulateInput
      name="password"
      label="Password"
      validation="required|min:6"
    />
    <FormulateErrors />

      <div class="flex flex-col d-flex mt-4">
          <button :disabled="!form.email || !form.password" type="submit" class="btn btn-secondary">
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
    }
  },

  methods: {
    loginHandler() {
      console.log(this.form.email, this.form.password)
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
  border-radius: .5em;
  max-width: 500px;
  box-sizing: border-box;
    outline: none !important;

}

.formulate-input-element {
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  padding: .5em;
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
