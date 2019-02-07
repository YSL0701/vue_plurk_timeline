<template>
  <div id="app">
    <myHeader />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <div
      class="sideMenuMask"
      v-show="sideMenuOpen"
      @click="closeSideMenu"
    ></div>
  </div>
</template>

<script>
import myHeader from '@/components/header.vue'
export default {
  methods: {
    closeSideMenu() {
      this.$store.commit('changeSideMenuState', false)
    }
  },
  computed: {
    sideMenuOpen() {
      return this.$store.state.sideMenu.sideMenuOpen
    }
  },
  components: {
    myHeader
  },
  mounted() {
    var plurk_id_list = JSON.parse(localStorage.getItem('bookmark'))
    if (plurk_id_list && plurk_id_list.length > 0) {
      this.$store.commit('bookmarkLoading', true)
      this.$axios.post('https://plurk-timeline.herokuapp.com/plurkPage', { plurk_id_list }).then(res => {
        this.$store.commit('bookmarkLoading', false)
        this.$store.commit('setBookmarkList', res.data)
      })
    }
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
  word-break: break-all;
  img {
    vertical-align: top;
  }
}
</style>

<style lang="scss" scoped>
.sideMenuMask {
  display: none;
  @include media($tablet) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>

