<template>
  <h1>{{JSON.stringify(posts)}}</h1>
</template>

<script lang="ts">

export default {
  name: 'IndexPage',
  middleware: 'auth',

  data() {
    return {
      posts: [],
    }
  },


  async asyncData({ $axios, req, redirect }) {

    // if (process.server) {
      try {
        const { data } = await $axios.get('/api/v1/posts/all')
        return {
          posts: data.posts,
        }
      } catch (err) {
        console.log(err)
      }

  },


}
</script>

