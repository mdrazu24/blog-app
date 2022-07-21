<template>
  <div class="flex items-center content-center justify-center w-full">

  <FormulateForm
    name="signup"
    @submit="signupHandler"
    v-model="form"
    class="signup-form"
  >
    <h2 class="form-title">Signup</h2>
     <FormulateInput
      name="fullName"
      label="Full Name"
      validation="required|min:6"
    />
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
          <button :disabled="!form.email || !form.password || !form.fullName" type="submit" class="btn btn-secondary">
            Login
          </button>

        </div>

        <div class="mt-4">
          <nuxt-link class="text-primary" to="/login">Already have an account?</nuxt-link>
        </div>
  </FormulateForm>

  </div>
</template>

<script>
export default {
 name: 'SignupPage',

  data() {
    return {
      form: {
        fullName : "",
        email: '',
        password: '',
      },
    }
  },

  methods: {
    signupHandler() {
      console.log(this.form.fullName,this.form.email, this.form.password)
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

.signup-form {
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
