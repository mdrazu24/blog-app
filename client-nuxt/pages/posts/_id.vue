<template>
 <div class="card-body">
    <h2 class="card-title">{{post.title}}</h2>
    <p>{{post.content}}</p>

    <h6>{{post.author.fullName}}</h6>

  </div>
</template>

<script lang="ts">

export default {
  name: 'PostDetails',
  middleware : 'auth',

  data() {
    return {
      post: {},
    }
  },

  async asyncData({ $axios, params }) {
    try {
      const { data } = await $axios.get(`http://okay.blogs.com/api/v1/posts/${params.id}`)
      //  console.log(data)
      return {
        post: data.post,
      }

    } catch (err) {
      console.log(err)
      // console.log(err)
    }

  },

}

</script>

