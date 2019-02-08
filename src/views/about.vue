<template>
  <transition name="about">
    <div class="about">
      <div class="container">
        <div class="title">關於噗浪時光機</div>
        <div class="article">
          <p class="main">原始碼 : <a
              href="https://github.com/YSL0701/vue_plurk_timeline"
              class="link"
            >Client (Github)</a>、<a
              href="https://github.com/YSL0701/Node.js_Plurk_timeline"
              class="link"
            >Server (Github)</a></p>
          <p>我的 Github : <a
              href="https://github.com/YSL0701"
              class="link"
            >https://github.com/YSL0701</a></p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.about {
  padding-left: 10px;
  padding-right: 10px;
  .container {
    margin-top: 90px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 90px;
    color: #ffffff;
    font-weight: bold;
    max-width: 620px;
    > .title {
      font-size: 24px;
      text-align: center;
    }
    > .article {
      margin-top: 40px;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 5px;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
      padding-right: 20px;
      > p {
        margin-top: 20px;
        > .link {
          color: #ffffff;
          &:hover {
            color: #f9caaf;
          }
        }
      }
      > .main {
        margin-top: 0;
      }
    }
  }
}

.about-enter,
.about-leave-to {
  opacity: 0;
}
.about-enter-active,
.about-leave-active {
  transition: all 0.3s;
}
.about-enter-to,
.about-leave {
  opacity: 1;
}
</style>
