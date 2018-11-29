<template>
  <div class="content_card">
    <div class="main_content">
      <div class="content">
        <div class="displayName"><a
            :href="accountLink"
            target="_blank"
          >{{ displayName }}</a></div>
        <div
          class="text_content"
          v-html="plurk.content"
        ></div>
      </div>

      <div class="info">
        <div
          class="response_count"
          @click="getReply"
          :title="replyOpenTitle"
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
        >
          <i class="fas fa-external-link-alt"></i>
          <div class="text">連結</div>
        </a>
        <div class="date">{{ postedDate }}</div>
      </div>
    </div>
    <div
      class="reply_group"
      v-show="replyOpen"
    >
      <replyCard
        v-show="!replyLoading"
        v-for="replyData in reply"
        :reply-data="replyData"
        :key="replyData.posted"
      />
      <div
        class="loading"
        v-if="replyLoading"
      >
        <img
          src="/ball-loading.gif"
          alt="loading"
        >
      </div>
    </div>
    <div
      class="close"
      v-show="replyOpen && !replyLoading"
      @click="openCloseReply(false)"
    >收起回覆</div>
  </div>
</template>

<script>
import replyCard from "./replyCard.vue";
export default {
  props: ["plurk", "displayName", "account"],
  data() {
    return {
      replyLoading: false,
      replyOpen: false,
      reply: []
    };
  },
  methods: {
    getReply() {
      if (!this.reply.length > 0 && this.plurk.response_count > 0) {
        this.replyOpen = true;
        this.replyLoading = true;
        this.$axios
          .post("https://plurk-timeline.herokuapp.com/reply", {
            plurk_id: this.plurk.plurk_id
          })
          .then(res => {
            this.reply = res.data.reply;
            this.replyLoading = false;
          });
      } else if (this.reply.length > 0 && this.plurk.response_count > 0) {
        this.replyOpen = !this.replyOpen;
      }
    },
    openCloseReply(val) {
      this.replyOpen = val;
    }
  },
  computed: {
    accountLink() {
      return `https://www.plurk.com/${this.account}`;
    },
    postedDate() {
      return new Date(this.plurk.posted).toLocaleString();
    },
    originLink() {
      return `https://www.plurk.com/p/${this.plurk.plurk_id.toString(36)}`;
    },
    replyOpenTitle() {
      if (this.replyOpen) {
        return "收起回覆";
      } else {
        return "展開回覆";
      }
    }
  },
  components: {
    replyCard
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/mixin/_mixin.scss";
.content_card {
  width: 100%;
  margin-top: 10px;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 15px;
  background-color: lighten(#f7ba97, 5%);
  border-radius: 7px;
  &:hover {
    background-color: #f7ba97;
  }
  .main_content {
    min-height: 70px;
    padding-right: 10px;
    padding-left: 10px;
    @include flex(column, space-between);
    .content {
      @include flex();
      .displayName {
        margin-right: 10px;
        text-decoration: none;
        white-space: nowrap;
      }
      .text_content {
        font-size: 16px;
        img {
          vertical-align: top;
        }
      }
    }
    .info {
      width: 100%;
      margin-top: 30px;
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
      > .date {
        font-size: 13px;
        color: #616161;
        align-self: flex-end;
        margin-left: auto;
      }
    }
  }
  .reply_group {
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
      background-color: #ffeebf;
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
    margin-bottom: -5px;
    @include flex(row, center, center);
    &:hover {
      background-color: darken(#bfe9af, 5%);
    }
  }
}
</style>

<style lang="scss">
.text_content {
  line-height: 18px;
  img {
    vertical-align: top;
  }
}
</style>

