<template>
  <div class="main">
    <div class="data">
      <div class="input_area">
        <div class="account">
          <span>帳號 : </span>
          <input
            type="text"
            v-model="account"
            @keyup.enter="getTimeline"
          ></div>
        <div class="date">
          <span>日期 : </span>
          <input
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
        >
      </div>
    </div>
    <div
      class="plurkContentGroup"
      v-if="timeline.length > 0"
    >
      <plurkContent
        v-for="(content,index) in timeline"
        :plurk="content"
        :display-name="displayName"
        :key="index"
        :account="currentAccount"
        :avatar="targetAvatar"
        class="plurkContent"
      />
      <div
        class="more"
        v-if="this.timeline.length > 0 && canGetMore"
        @click="getMoreTimeline"
      >
        <span v-if="!moreLoading">看更多</span>
        <img
          v-else
          src="/loading.gif"
        >
      </div>
    </div>
    <div
      class="error"
      v-if="error"
    >{{ error }}</div>
  </div>
</template>

<script>
import plurkContent from '@/components/plurk_content.vue'
export default {
  data() {
    return {
      account: '',
      date: '',
      timeline: [],
      isLoading: false,
      error: '',
      displayName: '',
      moreLoading: false,
      currentAccount: '',
      targetAvatar: '',
      canGetMore: true
    }
  },
  methods: {
    getTimeline() {
      this.timeline = []
      this.error = ''
      this.canGetMore = true
      if (this.account && !this.isLoading) {
        this.isLoading = true
        this.$axios
          .post('https://plurk-timeline.herokuapp.com/getTimeline', {
            account: this.account,
            offset: this.isoDate
          })
          .then(res => {
            if (res.data.success === 'success') {
              this.timeline = res.data.plurks
              this.displayName = res.data.displayName
              this.currentAccount = res.data.account
              this.targetAvatar = res.data.avatar
              if (this.timeline.length < 1) {
                this.error = '在這時間之前沒有噗文喔'
              }
            } else {
              this.error = res.data.message
            }
            this.isLoading = false
          })
      }
    },
    getMoreTimeline() {
      var newOffset = new Date(this.timeline[this.timeline.length - 1].posted).toISOString()
      if (this.currentAccount && !this.moreLoading) {
        this.moreLoading = true
        this.$axios
          .post('https://plurk-timeline.herokuapp.com/getTimeline', {
            account: this.currentAccount,
            offset: newOffset
          })
          .then(res => {
            if (res.data.success === 'success') {
              this.timeline = [...this.timeline, ...res.data.plurks]
              if (res.data.plurks.length === 0) {
                this.canGetMore = false
                this.error = '已經沒有更多的噗文囉'
              }
            } else {
              this.error = res.message
            }
            this.moreLoading = false
          })
          .catch(err => {
            console.log('錯誤:', err)
          })
      }
    },
    clearError() {
      this.error = ''
    }
  },
  computed: {
    isoDate() {
      if (this.date) {
        return new Date(`${this.date}T23:59:59`).toISOString()
      } else {
        return new Date().toISOString()
      }
    }
  },
  components: {
    plurkContent
  },
  created() {
    this.date = new Date()
      .toLocaleDateString()
      .split('/')
      .map(str => {
        if (str * 1 < 10) {
          str = '0' + str
        }
        return str
      })
      .join('-')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/mixin/_mixin.scss';
$goTimeline_btn_color: #f7ba97;
.main {
  margin-top: 70px;
  > .data {
    margin-top: 30px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 10px;
    padding-right: 10px;
    // @include flex(column, flex-start, center);
    > .input_area {
      @include flex(column, flex-start, flex-start);
      font-size: 24px;
      > .account {
        width: 100%;
        color: #ffffff;
        @include flex(row, flex-start, center);
      }
      > .date {
        margin-top: 10px;
        width: 100%;
        color: #ffffff;
        @include flex(row, flex-start, center);
      }
      input {
        width: calc(100% - 70px);
        height: 30px;
        padding-left: 10px;
        background-color: #f7eee7;
        border: none;
        border-radius: 5px;
        font-size: 16px;
      }
      span {
        width: 70px;
      }
    }
    > .goTimeline {
      cursor: pointer;
      background-color: $goTimeline_btn_color;
      height: 70px;
      width: 100%;
      margin-top: 20px;
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
    max-width: 500px;
    height: 70px;
    margin-left: auto;
    margin-right: auto;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    @include flex(row, center, center);
  }
  .plurkContentGroup {
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-left: 10px;
    padding-right: 10px;
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
}
</style>


