<template>
  <div class="response_content">
    <div class="content">
      <div class="avatar">
        <img
          :src="responseData.avatar"
          alt="avatar"
        >
      </div>
      <div class="article">
        <div class="displayName"><a
            :class="{ owner:responseData.account === ownerAccount }"
            :style="nameColor"
            :href="accountLink"
            target="_blank"
          >{{ responseData.displayName }}</a></div>
        <div
          class="text_content"
          v-html="responseData.content"
        ></div>
      </div>
    </div>
    <div class="date">{{ postedDate }}</div>
  </div>
</template>

<script>
export default {
  props: ['responseData', 'ownerAccount'],
  computed: {
    accountLink() {
      return `https://www.plurk.com/${this.responseData.account}`
    },
    postedDate() {
      return new Date(this.responseData.posted).toLocaleString()
    },
    nameColor() {
      if (this.responseData.nameColor) {
        return {
          color: `#${this.responseData.nameColor}`
        }
      } else {
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.response_content {
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
    > .avatar {
      width: 36px;
      height: 36px;
      font-size: 0;
      > img {
        width: 36px;
        height: 36px;
      }
    }
    > .article {
      margin-left: 10px;
      margin-top: -2px;
      > .displayName {
        margin-right: 10px;
        font-size: 16px;
        font-weight: bold;
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

