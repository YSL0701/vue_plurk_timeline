<template>
  <div class="reply_content">
    <div class="content">
      <div class="avatar">
        <img
          :src="replyData.avatar"
          alt="avatar"
        >
      </div>
      <div class="article">
        <div class="displayName"><a
            :class="{ owner:replyData.account === ownerAccount }"
            :style="nameColor"
            :href="accountLink"
            target="_blank"
          >{{ replyData.displayName }}</a></div>
        <div
          class="text_content"
          v-html="replyData.content"
        ></div>
      </div>
    </div>
    <div class="date">{{ postedDate }}</div>
  </div>
</template>

<script>
export default {
  props: ['replyData', 'ownerAccount'],
  computed: {
    accountLink() {
      return `https://www.plurk.com/${this.replyData.account}`
    },
    postedDate() {
      return new Date(this.replyData.posted).toLocaleString()
    },
    nameColor() {
      if (this.replyData.nameColor) {
        return {
          color: `#${this.replyData.nameColor}`
        }
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/mixin/_mixin.scss';
.reply_content {
  min-height: 70px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 5px;
  cursor: default;
  border-radius: 7px;
  background-color: lighten(#ffeebf, 7%);
  @include flex(column, space-between);
  .content {
    @include flex();
    > .avatae {
      font-size: 0;
    }
    > .article {
      margin-left: 10px;
      > .displayName {
        margin-right: 10px;
        > a {
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
        > .owner {
          text-decoration: underline;
        }
      }
      > .text_content {
        font-size: 16px;
        margin-top: 5px;
        img {
          vertical-align: top;
        }
      }
    }
  }
  .date {
    font-size: 13px;
    color: #616161;
    align-self: flex-end;
    margin-top: 5px;
  }
}
</style>

