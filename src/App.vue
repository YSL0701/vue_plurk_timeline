<template>
  <div id="app">
    <myHeader />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
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
  min-height: 100%;
}
body {
  background-image: url('https://images.unsplash.com/photo-1415025148099-17fe74102b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80');
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.text_content {
  line-height: 1.5;
  img {
    vertical-align: top;
  }
}
</style>
