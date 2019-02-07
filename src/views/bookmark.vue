<template>
  <transition name="page">
    <div>
      <div class="bookmarkTitle">書籤</div>
      <transition name="bookmarkGroup">
        <div
          class="bookmarkGroup"
          v-if="bookmarkList.length>0"
        >
          <bookmarkCard
            v-for="bookmark in bookmarkList"
            :plurk="bookmark.plurk"
            :display-name="bookmark.displayName"
            :account="bookmark.account"
            :avatar="bookmark.avatar"
            :key="bookmark.plurk.plurk_id"
          />
        </div>
      </transition>
      <transition name="hasNoBookmark">
        <div
          class="hasNoBookmark"
          v-if="bookmarkList.length === 0 && !isLoading"
        >目前沒有書籤</div>
      </transition>
      <div
        class="loading"
        v-if="isLoading"
      ><img src="/Dual Ring-1s-200px.gif"></div>
    </div>
  </transition>
</template>

<script>
import bookmarkCard from '@/components/bookmarkCard.vue'
export default {
  data() {
    return {}
  },
  computed: {
    bookmarkList() {
      return this.$store.state.bookmark.bookmarkList.slice().reverse()
    },
    isLoading() {
      return this.$store.state.bookmark.isLoading
    }
  },
  components: {
    bookmarkCard
  }
}
</script>

<style lang="scss" scoped>
.bookmarkTitle {
  width: 100%;
  height: 60px;
  font-size: 30px;
  color: #ffffff;
  margin-top: 70px;
  @include flex(row, center, center);
}
.bookmarkGroup {
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 30px;
  padding-left: 10px;
  padding-right: 10px;
  max-width: 600px;
}
.hasNoBookmark {
  width: 100%;
  height: 30px;
  font-size: 24px;
  color: #ffffff;
  margin-top: 20px;
  @include flex(row, center, center);
}
.loading {
  width: 100px;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 80px;
  > img {
    width: 100px;
    height: 100px;
  }
}

.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: all 0.3s;
}
.page-enter-to {
  opacity: 1;
}

.bookmarkGroup-leave {
  opacity: 1;
}
.bookmarkGroup-leave-active {
  transition: all 0.3s;
}
.bookmarkGroup-leave-to {
  opacity: 0;
  max-height: 0;
}

.hasNoBookmark-enter {
  opacity: 0;
  transform: translateY(30px);
}
.hasNoBookmark-enter-active {
  transition: all 0.3s;
}
.hasNoBookmark-enter-to {
  opacity: 1;
}
</style>
