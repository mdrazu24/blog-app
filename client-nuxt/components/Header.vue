<template>
  <div class="navbar border">
    <div class="flex-1">
      <nuxt-link to="/">
        <a class="normal-case font-bold text-xl">Micro-BLOG</a>
      </nuxt-link>
    </div>
    <div class="flex-none">
      <div class="menu menu-horizontal gap-2 mr-4">
        <template v-if="!this.isLoggedIn">
          <nuxt-link to="/signup">
            <a class="btn btn-md btn-ghost">Signup</a>
          </nuxt-link>
          <nuxt-link to="/login">
            <a class="btn btn-md btn-primary">Login</a>
          </nuxt-link>
        </template>
        <template v-else>
        <a @click="logOutHandler" class="btn btn-md btn-secondary">Logout</a>
        </template>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: this.$store.state.isLoggedIn,
    }
  },
  watch: {
    $route : function () {
      this.isLoggedIn = this.$store.state.isLoggedIn
    },
  },

  methods: {
    async logOutHandler() {
      try {
        await this.$axios({
          method: 'get',
          url: '/api/v1/auth/logout',
        })
        localStorage.removeItem('user')
        this.$router.push('/login')
      } catch (err) {
        console.log(err)
      }

      this.$store.commit('logout')
    },
  },

  // mounted() {
  //  console.log(this.isLoggedIn)

  // },
}
</script>
