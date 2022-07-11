<template>
  <div id="app">
    <the-header></the-header>
    <div class="container mt-3">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/ui/TheHeader.vue'
export default {
  components: {
    TheHeader
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>