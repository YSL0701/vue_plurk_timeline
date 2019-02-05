<template>
  <transition name="list">
    <div class="list">
      <div
        class="accountText"
        v-for="(account,index) in accountList"
        @click="useAccount(account)"
        :key="account"
      >{{ account }}
        <div
          class="removeAccount"
          @click.stop="removeAccount(index)"
        >
          <div class="remove"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    currentAccount: {
      type: String
    }
  },
  methods: {
    useAccount(account) {
      this.$emit('update:currentAccount', account)
    },
    removeAccount(index) {
      this.$store.commit('removeAccount', index)
      if (this.accountList.length === 0) {
        this.$emit('closeAccountList')
      }
    }
  },
  computed: {
    accountList() {
      return this.$store.state.accountList.accountList
    }
  },
  created() {
    if (localStorage.getItem('accountList')) {
      this.$store.commit('setAccountList', JSON.parse(localStorage.getItem('accountList')))
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  max-height: 210px;
  overflow-y: auto;
  background-color: #f7eee7;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  > .accountText {
    height: 30px;
    font-size: 18px;
    color: #61433c;
    line-height: 30px;
    padding-left: 10px;
    @include flex(row, flex-start, center);
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
      border-bottom-right-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    &:hover {
      background-color: darken(#f7eee7, 10%);
    }
    &:hover > .removeAccount {
      opacity: 1;
    }
    > .removeAccount {
      margin-left: auto;
      height: 30px;
      width: 40px;
      @include media($desktop) {
        opacity: 0;
      }
      @include flex(row, center, center);
      &:hover {
        background-color: darken(#f7eee7, 20%);
      }
      > .remove {
        width: 16px;
        height: 4px;
        background-color: #61433c;
      }
    }
  }
}
.list-enter,
.list-leave-to {
  opacity: 0;
  max-height: 0;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
  overflow-y: hidden;
}
.list-enter-to,
.list-leave {
  opacity: 1;
}
</style>

