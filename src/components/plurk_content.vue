<template>
  <div
    class="content_card"
    @click="goResponsePage"
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
        <div
          class="response_count"
          @click.stop="getResponse"
          :title="responseOpenTitle"
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
      </div>
    </div>
    <div
      class="response_group"
      v-show="responseOpen"
    >
      <responseCard
        v-show="!responseLoading"
        v-for="responseData in responses"
        :response-data="responseData"
        :key="responseData.posted"
        :ownerAccount="account"
      />
      <div
        class="loading"
        v-if="responseLoading"
      >
        <img src="/ball-loading.gif">
      </div>
    </div>
    <div
      class="close"
      v-show="responseOpen && !responseLoading"
      @click="openCloseResponse(false)"
    >收起回覆</div>
  </div>
</template>

<script>
import responseCard from './responseCard.vue'
export default {
  props: ['plurk', 'displayName', 'account', 'avatar'],
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
    openCloseResponse(val) {
      this.responseOpen = val
    },
    goResponsePage() {
      this.$store.commit('setPlurkPageData', { plurk: this.plurk, displayName: this.displayName, account: this.account, avatar: this.avatar })
      this.$router.push('/response')
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
    responseOpenTitle() {
      if (this.responseOpen) {
        return '收起回覆'
      } else {
        return '展開回覆'
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
  &:hover {
    background-color: #f7ba97;
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
      > .link {
        width: 80px;
        height: 30px;
        font-size: 16px;
        border-radius: 5px;
        background-color: #ffeebf;
        cursor: pointer;
      }
      > .response_count {
        @include flex(row, space-around, center);
      }
      > .link {
        margin-left: 20px;
        text-decoration: none;
        @include flex(row, center, center);
        > .text {
          margin-left: 5px;
        }
      }
    }
  }
  .response_group {
    margin-top: 10px;
    cursor: default;
    max-height: 500px;
    overflow-y: auto;
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
  .close {
    font-size: 24px;
    border-radius: 7px;
    background-color: #bfe9af;
    cursor: pointer;
    height: 50px;
    margin-top: 10px;
    // margin-bottom: -5px;
    @include flex(row, center, center);
    &:hover {
      background-color: darken(#bfe9af, 5%);
    }
  }
}
</style>

<style lang="scss">
.text_content {
  line-height: 1.5;
  img {
    vertical-align: top;
  }
}
</style>

