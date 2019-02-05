<template>
  <transition name="page">
    <div class="main">
      <div class="data">
        <div class="input_area">
          <div class="account">
            <input
              type="text"
              placeholder="帳號"
              v-model.trim="account"
              @keyup.enter="getTimeline"
            >
            <div
              class="addToAccountList"
              title="加入常用帳號列表"
              @click="addToAccountList"
            >+</div>
          </div>
          <div class="accountList">
            <div
              class="openList"
              :class="{isOpen:accountListOpen && accountList.length>0}"
              @click="openAccountList"
            >
              <div class="text">帳號列表</div>
              <div
                class="arrow"
                :class="{arrowDown:accountListOpen}"
              ></div>
            </div>
            <accountList
              v-show="accountListOpen"
              :current-account.sync="account"
              @closeAccountList="accountListOpen = false"
            />
          </div>
          <div class="date">
            <input
              type="date"
              v-model="date"
            >
          </div>
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
          :prev-plurk="timeline[index - 1]"
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
  </transition>
</template>

<script>
import plurkContent from '@/components/plurk_content.vue'
import accountList from '@/components/accountList.vue'
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
      canGetMore: true,
      accountListOpen: false
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
    },
    addToAccountList() {
      if (this.accountList.length > 0) {
        if (this.accountList.some(item => item === this.account)) {
          return
        }
        this.$store.commit('addToAccountList', this.account)
      } else {
        this.$store.commit('addToAccountList', this.account)
      }
      localStorage.setItem('accountList', JSON.stringify(this.accountList))
    },
    openAccountList() {
      if (this.accountList.length > 0) {
        this.accountListOpen = !this.accountListOpen
      }
    }
  },
  computed: {
    isoDate() {
      if (this.date) {
        return new Date(`${this.date}T23:59:59`).toISOString()
      } else {
        return new Date().toISOString()
      }
    },
    accountList() {
      return this.$store.state.accountList.accountList
    }
  },
  components: {
    plurkContent,
    accountList
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
$goTimeline_btn_color: #f7ba97;
.main {
  padding-top: 70px;
  > .data {
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
        position: relative;
        @include flex(row, flex-start, center);
        > .addToAccountList {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 100%;
          font-size: 24px;
          font-weight: bold;
          color: #61433c;
          line-height: 1;
          cursor: pointer;
          border-bottom-right-radius: 5px;
          border-top-right-radius: 5px;
          @include flex(row, center, center);
          &:hover {
            background-color: darken(#f7eee7, 20%);
          }
        }
      }
      > .date {
        margin-top: 10px;
        width: 100%;
        color: #ffffff;
        @include flex(row, flex-start, center);
      }
      input {
        width: 100%;
        height: 35px;
        padding-left: 10px;
        background-color: #f7eee7;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        color: #61433c;
      }
      > .accountList {
        width: 100%;
        margin-left: auto;
        margin-top: 10px;
        > .openList {
          height: 30px;
          background-color: #f7ba97;
          font-size: 20px;
          border-radius: 5px;
          cursor: pointer;
          transition: border-bottom-right-radius, border-bottom-left-radius 0.5s;
          @include flex(row, center, center);
          > .arrow {
            width: 0;
            height: 0;
            border-top: 12px solid #111;
            border-right: 7px solid #f7ba97;
            border-left: 7px solid #f7ba97;
            margin-top: 2px;
            margin-left: 5px;
            transition: transform 0.5s;
          }
          > .arrowDown {
            transform: rotate(180deg);
          }
        }
        > .isOpen {
          border-bottom-right-radius: 0;
          border-bottom-left-radius: 0;
        }
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
        height: 60px;
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
.page-enter {
  opacity: 0;
}
.page-enter-active {
  transition: all 0.3s;
}
.page-enter-to {
  opacity: 1;
}
</style>


