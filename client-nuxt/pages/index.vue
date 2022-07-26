<template>
<div class="flex w-full gap-3 p-6 flex-wrap">
<div @click="postDetails(post.id)" v-for="post in posts" :key="post.id" class="card border border-secondary cursor-pointer p-2 w-96 bg-base-100 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">{{post.title}}</h2>
    <p>{{post.content}}</p>

    <h6>{{post.author.fullName}}</h6>

    <button @click.stop="deletePost(post.id)" class="btn btn-primary" >Delete</button>
  </div>
</div>
</div>
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

  methods: {

    postDetails(id) {
      this.$router.push('/posts/' + id)
    },

    async deletePost (id) {
      try {
        await this.$axios.delete(`/api/v1/posts/delete/${id}`)
        //  console.log(data)
        this.posts = this.posts.filter(post => post.id !== id)


      } catch (err) {
        console.log(err)
        // console.log(err)
      }


    }


  },


  async asyncData({ $axios }) {
      try {
        const { data } = await $axios.get('http://okay.blogs.com/api/v1/posts/all')

        return {
          posts: data.posts,
        }

      } catch (err) {
        console.log(err)
        // console.log(err)
      }

    // if (process.server) {

  },


}
</script>

