<template>
  <div class="header">
    <div class="nav">
      <div
        class="back"
        @click="$router.back()"
      >
        <i class="fas fa-chevron-left"></i>
      </div>
      <router-link
        to="/"
        class="home link"
      >噗浪時光機</router-link>
      <router-link
        to="/bookmark"
        class="bookmark link"
      >書籤</router-link>
      <router-link
        to="/information"
        class="information link"
      >說明</router-link>
      <router-link
        to="/about"
        class="about link"
      >關於</router-link>
      <div
        class="goTop link"
        @click="goTop"
      >回頂部</div>
      <div
        class="ham-btn"
        @click="openSideMenu"
      >
        <div class="box">
          <div
            class="line"
            :class="{line1:sideMenuOpen}"
          ></div>
          <div
            class="line"
            :class="{line2:sideMenuOpen}"
          ></div>
          <div
            class="line"
            :class="{line3:sideMenuOpen}"
          ></div>
        </div>
      </div>
    </div>
    <sideMenu />
  </div>
</template>

<script>
import sideMenu from './sideMenu.vue'
export default {
  data() {
    return {}
  },
  methods: {
    openSideMenu() {
      if (this.sideMenuOpen) {
        this.$store.commit('changeSideMenuState', false)
      } else {
        this.$store.commit('changeSideMenuState', true)
      }
    },
    goTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  computed: {
    sideMenuOpen() {
      return this.$store.state.sideMenu.sideMenuOpen
    }
  },
  components: {
    sideMenu
  }
}
</script>


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
    @include media($tablet) {
      @include flex(row, space-between, center);
    }
    > .link {
      height: 50px;
      padding-left: 15px;
      padding-right: 15px;
      line-height: 50px;
      text-decoration: none;
      font-size: 24px;
      color: #61433c;
      &:hover {
        color: #ffffff;
      }
    }
    > .home {
      margin-left: 50px;
      @include media($tablet) {
        margin-left: 0;
      }
    }
    > .bookmark {
      margin-left: auto;
      margin-right: 10px;
      @include media($tablet) {
        display: none;
      }
    }
    > .information,
    > .about {
      margin-right: 10px;
      @include media($tablet) {
        display: none;
      }
    }
    > .goTop {
      margin-right: 35px;
      cursor: pointer;
      @include media($tablet) {
        display: none;
      }
    }
    > .ham-btn {
      height: 50px;
      width: 50px;
      display: none;
      cursor: pointer;
      @include media($tablet) {
        @include flex(column, center, center);
      }
      > .box {
        width: 28px;
        height: 20px;
        @include flex(column, space-between, center);
        > .line {
          width: 28px;
          height: 3px;
          background-color: #61433c;
          transition: all 0.3s;
        }
        > .line1 {
          transform: rotate(45deg) translate(6px, 6px);
        }
        > .line2 {
          transform: translateX(100px);
        }
        > .line3 {
          transform: rotate(-45deg) translate(6px, -6px);
        }
      }
    }
    > .back {
      height: 50px;
      width: 50px;
      color: #61433c;
      font-size: 26px;
      display: none;
      cursor: pointer;
      @include media($tablet) {
        @include flex(row, center, center);
      }
    }
  }
}
</style>
