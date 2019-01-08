<template>
  <div id="app">
    <myHeader />
    <router-view />
  </div>
</template>

<script>
import myHeader from '@/components/header.vue'
export default {
  components: {
    myHeader
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-family: Microsoft JhengHei;
}
body {
  background-image: url('https://images.unsplash.com/photo-1415025148099-17fe74102b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
