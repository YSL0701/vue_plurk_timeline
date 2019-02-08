<template>
  <transition name="content">
    <div
      class="content_card"
      @click="goBookmarkPage"
    >
      <div class="main_content">
        <div class="content">
          <div class="avatar">
            <img
              :src="avatar"
              alt="avatar"
            >
          </div>
          <div class="article">
            <div class="displayName">
              <a
                :href="accountLink"
                target="_blank"
                @click.stop=""
              >{{ displayName }}</a>
            </div>
            <div
              class="text_content"
              v-html="plurk.content"
            ></div>
          </div>
        </div>
        <div class="date">{{ postedDate }}</div>
        <div class="info">
          <div
            class="response_count"
            :title="responseTitle"
          >
            <i class="fas fa-comments"></i>
            <div class="count">
              {{ plurk.response_count }}
            </div>
          </div>
          <a
            :href="originLink"
            target="_blank"
            class="link"
            @click.stop=""
          >
            <i class="fas fa-external-link-alt"></i>
            <div class="text">連結</div>
          </a>
          <div
            class="addToBookmark"
            title="刪除書籤"
            @click.stop="removeBookmark"
          >
            <i class="fas fa-bookmark"></i>
            <div class="text">刪除書籤</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import responseCard from './responseCard.vue'
export default {
  props: {
    plurk: {
      type: Object,
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    account: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    goBookmarkPage() {
      var data = { plurk: this.plurk, displayName: this.displayName, account: this.account, avatar: this.avatar }
      this.$store.commit('setBookmarkPageData', data)
      localStorage.setItem('bookmark_plurk_id', this.plurk.plurk_id.toString(36))
      localStorage.setItem('bookmarkPageData', JSON.stringify(data))
      this.$router.push(`/bookmark/${this.plurk.plurk_id.toString(36)}`)
    },
    linkStopPropagation(e) {
      e.stopPropagation()
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
      return new Date(this.plurk.posted).toLocaleString()
    },
    originLink() {
      return `https://www.plurk.com/p/${this.plurk.plurk_id.toString(36)}`
    },
    responseTitle() {
      return `${this.plurk.response_count} 則回應`
    }
  },
  mounted() {
    // 阻止 v-html內的 <a> 冒泡
    var links = this.$el.querySelectorAll('.article > .text_content a')
    if (links.length > 0) {
      for (var link of links) {
        link.addEventListener('click', this.linkStopPropagation)
      }
    }
  },
  beforeDestroy() {
    // 移除 <a> 的 eventListener
    var links = this.$el.querySelectorAll('.article > .text_content a')
    if (links.length > 0) {
      for (var link of links) {
        link.removeEventListener('click', this.linkStopPropagation)
      }
    }
  },
  components: {
    responseCard
  }
}
</script>

<style lang="scss" scoped>
.content_card {
  width: 100%;
  margin-top: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: lighten(#f7ba97, 5%);
  border-radius: 7px;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #f7ba97;
  }
  > .timeTag {
    width: 100%;
    height: 20px;
    position: absolute;
    top: -25px;
    left: 0;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    @include flex(row, center, center);
  }
  > .main_content {
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
      > .addToBookmark {
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
}
.hasTimeTag {
  margin-top: 30px;
}
.content-enter,
.content-leave-to {
  opacity: 0;
}
.content-leave-to {
  transform: translateX(100px);
}
.content-enter-active,
.content-leave-active {
  transition: all 0.3s;
}
.content-enter-to,
.content-leave {
  opacity: 1;
}
</style>


