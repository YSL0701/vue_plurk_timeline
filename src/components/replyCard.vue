<template>
  <div class="reply_content">
    <div class="content">
      <div class="displayName"><a
          :href="accountLink"
          target="_blank"
        >{{ replyData.displayName }}</a></div>
      <div
        class="text_content"
        v-html="replyData.content"
      ></div>
    </div>
    <div class="date">{{ postedDate }}</div>
  </div>
</template>

<script>
export default {
  props: ["replyData"],
  computed: {
    accountLink() {
      return `https://www.plurk.com/${this.replyData.account}`;
    },
    postedDate() {
      return new Date(this.replyData.posted).toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/mixin/_mixin.scss";
.reply_content {
  min-height: 70px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 5px;
  cursor: default;
  border-radius: 7px;
  background-color: #ffeebf;
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
  .date {
    font-size: 13px;
    color: #616161;
    align-self: flex-end;
    margin-top: 5px;
  }
}
</style>

