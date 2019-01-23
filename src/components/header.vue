<template>
  <div class="header">
    <div class="nav">
      <router-link
        to="/"
        class="home link"
      >噗浪時光機</router-link>
      <router-link
        to="/information"
        class="information link"
      >說明</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  z-index: 10;
  top: 0;
  background-color: #fac487;
  opacity: 0.9;
  > .nav {
    height: 100%;
    @include flex(row, flex-start, center);
    > .link {
      text-decoration: none;
      font-size: 24px;
      color: #61433c;
    }
    > .home {
      margin-left: 50px;
    }
    > .information {
      margin-left: auto;
      margin-right: 50px;
    }
  }
}
</style>
