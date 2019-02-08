<template>
  <transition name="sideMenu">
    <div
      class="container"
      v-show="sideMenuOpen"
    >
      <div class="sideMenu">
        <div
          @click="routerPush('/')"
          class="home link"
        >回首頁</div>
        <div
          @click="routerPush('/bookmark')"
          class="bookmark link"
        >書籤</div>
        <div
          @click="routerPush('/information')"
          class="information link"
        >說明</div>
        <div
          @click="routerPush('/about')"
          class="about link"
        >關於</div>
        <div
          class="goTop link"
          @click="goTop"
        >回頂部</div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    routerPush(path) {
      this.$router.push(path)
      this.$store.commit('changeSideMenuState', false)
    },
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.$store.commit('changeSideMenuState', false)
    }
  },
  computed: {
    sideMenuOpen() {
      return this.$store.state.sideMenu.sideMenuOpen
    }
  }
}
</script>


<style lang="scss" scoped>
.container {
  width: 250px;
  height: 100vh;
  position: absolute;
  top: 50px;
  right: 0;
  display: none;
  @include media($tablet) {
    @include flex(row, flex-end);
  }
  > .sideMenu {
    height: 100%;
    width: 250px;
    background-color: rgba(255, 255, 255, 0.9);
    @include flex(column);
    > .link {
      width: 100%;
      height: 40px;
      font-size: 20px;
      font-weight: bolder;
      color: #61433c;
      text-decoration: none;
      cursor: pointer;
      padding-left: 20px;
      @include flex(row, flex-start, center);
    }
  }
}

.sideMenu-enter,
.sideMenu-leave-to {
  right: -250px;
}
.sideMenu-enter-active,
.sideMenu-leave-active {
  transition: all 0.3s;
}
</style>
