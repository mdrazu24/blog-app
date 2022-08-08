<template>
  <div class="flex items-center justify-center">
    <FormulateForm
      name="login"
      @submit="addPost"
      v-model="form"
      class="login-form"
    >
      <FormulateInput
        name="title"
        placeholder="Place your title here..."
        label="Title"
        validation="required|min:6"
      />
      <FormulateInput
        name="content"
        label="Content"
        type="textarea"
        placeholder="Describe your post..."
        validation="required|min:6"
      />
      <FormulateErrors />

      <div class="flex flex-col d-flex mt-4">
        <button
          :disabled="!form.title || !form.content"
          type="submit"
          :class="[isLoading ? 'loading' : 'something', 'btn btn-secondary']"
        >
          Submit
        </button>
      </div>
    </FormulateForm>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AddPostPage',
  middleware: 'auth',

  data() {
    return {
      form: {
        title: '',
        content: '',
      },
      isLoading: false,
      user: this.$store.state.user,
    }
  },

  methods: {
    async addPost() {
      try {
        this.isLoading = true
        await this.$axios.post('/api/v1/posts/create', {...this.form, author : {userId : this.user.id , ...this.user}})
        // console.log(data)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.isLoading = false
        // console.log(err)
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
  width: 500px;
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
