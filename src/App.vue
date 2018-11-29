<template>
  <div id="app">
    <div class="data">
      <div class="input_area">
        <div class="account">帳號 : <input
            type="text"
            v-model="account"
          ></div>
        <div class="date">日期 : <input
            type="date"
            v-model="date"
          ></div>
      </div>
      <div
        class="goTimeline"
        @click="getTimeline"
      >
        <span v-if="!isLoading">啟動時光機!</span>
        <img
          v-else
          src="/loading.gif"
          alt="loading"
        >
      </div>
    </div>
    <div
      class="error"
      v-if="error"
    >{{ error }}</div>
    <div class="plurkContentGroup">
      <plurkContent
        v-for="(content,index) in timeline"
        :plurk="content"
        :display-name="displayName"
        :key="index"
        :account="currentAccount"
        class="plurkContent"
      />
      <div
        class="more"
        v-if="this.timeline.length > 0"
        @click="getMoreTimeline"
      >
        <span v-if="!moreLoading">看更多</span>
        <img
          v-else
          src="/loading.gif"
          alt="loading"
        >
      </div>
    </div>
  </div>
</template>

<script>
import plurkContent from "./components/plurk_content.vue";

export default {
  name: "app",
  data() {
    return {
      account: "",
      date: "",
      timeline: [],
      isLoading: false,
      error: "",
      displayName: "",
      moreLoading: false,
      currentAccount: ""
    };
  },
  methods: {
    getTimeline() {
      this.timeline = [];
      this.error = "";
      if (this.account && !this.isLoading) {
        this.isLoading = true;
        this.$axios
          .post("https://plurk-timeline.herokuapp.com/getTimeline", {
            account: this.account,
            offset: this.isoDate
          })
          .then(res => {
            if (res.data.success === "success") {
              this.timeline = res.data.plurks;
              this.displayName = res.data.displayName;
              this.currentAccount = res.data.account;
            } else {
              this.error = res.data.message;
            }
            this.isLoading = false;
          });
      }
    },
    getMoreTimeline() {
      var newOffset = new Date(
        this.timeline[this.timeline.length - 1].posted
      ).toISOString();
      if (this.currentAccount && !this.moreLoading) {
        this.moreLoading = true;
        this.$axios
          .post("https://plurk-timeline.herokuapp.com/getTimeline", {
            account: this.currentAccount,
            offset: newOffset
          })
          .then(res => {
            if (res.data.success === "success") {
              this.timeline = [...this.timeline, ...res.data.plurks];
            } else {
              this.error = res.message;
            }
            this.moreLoading = false;
          })
          .catch(err => {
            console.log("錯誤:", err);
          });
      }
    },
    clearError() {
      this.error = "";
    }
  },
  computed: {
    isoDate() {
      if (this.date) {
        return new Date(`${this.date}T23:59:59`).toISOString();
      } else {
        return new Date().toISOString();
      }
    }
  },
  components: {
    plurkContent
  }
};
</script>

<style lang="scss">
@import "./assets/mixin/_mixin.scss";
$goTimeline_btn_color: #f7ba97;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-family: Microsoft JhengHei;
}
.data {
  margin-top: 30px;
  @include flex(row, center);
  > .input_area {
    @include flex(column, flex-start, flex-start);
    font-size: 24px;
    margin-right: 20px;
    > .account {
      @include flex();
    }
    > .date {
      margin-top: 10px;
      @include flex();
    }
    input {
      width: 300px;
      height: 30px;
      margin-left: 5px;
      padding-left: 10px;
    }
  }
  > .goTimeline {
    cursor: pointer;
    background-color: $goTimeline_btn_color;
    height: 100px;
    width: 150px;
    border-radius: 10px;
    font-size: 24px;
    @include flex(row, center, center);
    &:hover {
      background-color: darken($goTimeline_btn_color, 10%);
    }
    > img {
      height: 80px;
    }
  }
}
.error {
  width: 500px;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
  font-size: 24px;
  @include flex(row, center, center);
}
.plurkContentGroup {
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  margin-bottom: 10px;
  max-width: 600px;
  > .more {
    @include flex(row, center, center);
    height: 70px;
    margin-top: 10px;
    background-color: #ffd993;
    border-radius: 7px;
    &:hover {
      background-color: darken(#ffd993, 5%);
    }
    > span {
      width: 100%;
      height: 70px;
      font-size: 24px;
      font-weight: bold;
      cursor: pointer;
      @include flex(row, center, center);
    }
    > img {
      height: 60px;
    }
  }
}
</style>
