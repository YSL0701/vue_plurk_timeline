<template>
  <transition name="page">
    <div class="content_card">
      <div class="main_content">
        <div class="content">
          <div class="avatar">
            <img
              :src="avatar"
              alt="avatar"
            >
          </div>
          <div class="article">
            <div class="displayName"><a
                :href="accountLink"
                target="_blank"
              >{{ displayName }}</a></div>
            <div
              class="text_content"
              v-html="plurk.content"
            ></div>
          </div>
        </div>
        <div class="date">{{ postedDate }}</div>
        <div class="info">
          <div class="response_count">
            <i class="fas fa-comments"></i>
            <div class="count">
              {{ plurk.response_count }}
            </div>
          </div>
          <a
            :href="originLink"
            target="_blank"
            class="link"
          >
            <i class="fas fa-external-link-alt"></i>
            <div class="text">連結</div>
          </a>
          <div
            class="addToBookmark"
            title="將這則噗文加入書籤"
            v-if="!isInBookmark"
            @click.stop="addToBookmark"
          >
            <i class="far fa-bookmark"></i>
            <div class="text">加入書籤</div>
          </div>
          <div
            class="removeBookmark"
            title="刪除書籤"
            v-else
            @click.stop="removeBookmark"
          >
            <i class="fas fa-bookmark"></i>
            <div class="text">刪除書籤</div>
          </div>
        </div>
      </div>
      <div
        class="response_group"
        v-show="responseOpen"
      >
        <transition-group name="responseCard">
          <responseCard
            v-show="!responseLoading"
            v-for="responseData in responses"
            :response-data="responseData"
            :key="responseData.posted"
            :ownerAccount="account"
          />
        </transition-group>
        <div
          class="loading"
          v-if="responseLoading"
        >
          <img src="/ball-loading.gif">
        </div>
      </div>
      <div
        class="noResponses"
        v-if="!responseLoading && plurk.response_count === 0"
      >目前沒有回應喔</div>
    </div>
  </transition>
</template>

<script>
import responseCard from '@/components/responseCard.vue'
export default {
  data() {
    return {
      responseLoading: false,
      responseOpen: false,
      responses: []
    }
  },
  methods: {
    getResponse() {
      if (!this.responses.length > 0 && this.plurk.response_count > 0) {
        this.responseOpen = true
        this.responseLoading = true
        this.$axios
          .post('https://plurk-timeline.herokuapp.com/response', {
            plurk_id: this.plurk.plurk_id
          })
          .then(res => {
            this.responses = res.data.response
            this.responseLoading = false
          })
      } else if (this.responses.length > 0 && this.plurk.response_count > 0) {
        this.responseOpen = !this.responseOpen
      }
    },
    addToBookmark() {
      var bookmark = JSON.parse(localStorage.getItem('bookmark'))
      if (bookmark) {
        if (bookmark.some(item => item.plurk_id === this.plurk.plurk_id)) {
          return
        }
        bookmark.push({ plurk_id: this.plurk.plurk_id, addTime: Date.now() })
        localStorage.setItem('bookmark', JSON.stringify(bookmark))
      } else {
        localStorage.setItem('bookmark', JSON.stringify([{ plurk_id: this.plurk.plurk_id, addTime: Date.now() }]))
      }
      this.$store.commit('addToBookmarkList', { plurk: this.plurk, displayName: this.displayName, account: this.account, avatar: this.avatar })
    },
    removeBookmark() {
      var bookmark = JSON.parse(localStorage.getItem('bookmark'))
      bookmark.splice(bookmark.findIndex(item => item.plurk_id === this.plurk.plurk_id), 1)
      localStorage.setItem('bookmark', JSON.stringify(bookmark))
      this.$store.commit('removeBookmark', this.plurk.plurk_id)
    }
  },
  computed: {
    accountLink() {
      return `https://www.plurk.com/${this.account}`
    },
    postedDate() {
      if (this.plurk.posted) {
        return new Date(this.plurk.posted).toLocaleString()
      }
    },
    originLink() {
      if (this.plurk.plurk_id) {
        return `https://www.plurk.com/p/${this.plurk.plurk_id.toString(36)}`
      }
    },
    plurk() {
      return this.$store.state.bookmark.pageData.plurk
    },
    displayName() {
      return this.$store.state.bookmark.pageData.displayName
    },
    account() {
      return this.$store.state.bookmark.pageData.account
    },
    avatar() {
      return this.$store.state.bookmark.pageData.avatar
    },
    isInBookmark() {
      return this.$store.state.bookmark.bookmarkList.some(bookmark => bookmark.plurk.plurk_id === this.plurk.plurk_id)
    }
  },
  components: {
    responseCard
  },
  mounted() {
    if (this.plurk.plurk_id) {
      this.getResponse()
    } else {
      if (this.$route.params.plurk_id === localStorage.getItem('plurk_id')) {
        this.$store.commit('setBookmarkPageData', JSON.parse(localStorage.getItem('ownerData')))
        this.getResponse()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content_card {
  width: 100%;
  max-width: 600px;
  margin-top: 50px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: lighten(#f7ba97, 5%);
  border-radius: 7px;
  @include media($mobile) {
    max-width: 100%;
  }
  .main_content {
    > .content {
      @include flex();
      > .avatar {
        width: 60px;
        height: 60px;
        font-size: 0;
        > img {
          width: 60px;
          height: 60px;
        }
      }
      > .article {
        margin-left: 10px;
        margin-top: -3px;
        > .displayName {
          margin-right: 10px;
          font-size: 16px;
          font-weight: bold;
          > a {
            text-decoration: none;
          }
        }
        > .text_content {
          font-size: 16px;
          margin-top: 5px;
        }
      }
    }
    > .date {
      font-size: 13px;
      color: #616161;
      text-align: right;
      margin-top: 30px;
      margin-right: 10px;
    }
    .info {
      width: 100%;
      margin-top: 10px;
      @include flex();
      > .response_count,
      > .addToBookmark,
      > .removeBookmark,
      > .link {
        width: 80px;
        height: 30px;
        font-size: 16px;
        border-radius: 5px;
        background-color: #ffeebf;
        cursor: pointer;
        &:hover {
          background-color: darken(#ffeebf, 5%);
        }
      }
      > .addToBookmark,
      > .removeBookmark {
        margin-left: 20px;
        width: 100px;
        @include flex(row, center, center);
        > .text {
          margin-left: 5px;
        }
        > i {
          color: #5c413e;
        }
      }
      > .response_count {
        @include flex(row, space-around, center);
        > i {
          color: #5c413e;
        }
      }
      > .link {
        margin-left: 20px;
        text-decoration: none;
        @include flex(row, center, center);
        > .text {
          margin-left: 5px;
        }
        > i {
          color: #5c413e;
        }
      }
    }
  }
  .response_group {
    margin-top: 10px;
    // cursor: default;
    // max-height: 500px;
    // overflow-y: auto;
    .loading {
      min-height: 70px;
      padding-top: 5px;
      padding-bottom: 5px;
      padding-right: 10px;
      padding-left: 10px;
      margin-top: 5px;
      border-radius: 7px;
      background-color: lighten(#ffeebf, 7%);
      @include flex(row, center, center);
      > img {
        height: 50px;
      }
    }
  }
  > .noResponses {
    height: 70px;
    margin-top: 10px;
    font-size: 20px;
    border-radius: 7px;
    background-color: lighten(#ffeebf, 7%);
    @include flex(row, center, center);
  }
}

// transition
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translate(0, 20px);
}
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}
.page-enter-to,
.page-leave {
  opacity: 1;
}

.responseCard-enter,
.responseCard-leave-to {
  opacity: 0;
  // transform: translate(0, 20px);
}
.responseCard-enter-active,
.responseCard-leave-active {
  transition: all 0.3s;
}
.responseCard-enter-to,
.responseCard-leave {
  opacity: 1;
}
</style>