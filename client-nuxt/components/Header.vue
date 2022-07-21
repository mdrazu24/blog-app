<template>
  <div class="navbar  border">
    <div class="flex-1">
      <nuxt-link to="/">
        <a class="btn btn-ghost normal-case text-xl">Micro-Blog</a>
      </nuxt-link>
    </div>
    <div class="flex-none">
      <div class="menu menu-horizontal gap-2 mr-4">
        <nuxt-link to="/login">
          <a class="btn btn-md btn-primary">Login</a>
        </nuxt-link>
        <nuxt-link to="/signup">
          <a class="btn btn-md btn-ghost">Signup</a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
}
</script>
