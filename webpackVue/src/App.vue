<template>
  <div id="app">
    <div class="nav">
      <router-link to="/home">home</router-link>
      <router-link to="/about">about</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        title: "你好"
      }
    }
  }
</script>