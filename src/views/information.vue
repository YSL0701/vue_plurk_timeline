<template>
  <transition name="info">
    <div class="info">
      <div class="container">
        <div class="title">使用說明</div>
        <div class="article">
          <p class="main">噗浪時光機 : 輸入帳號，設定時間後按下啟動或是 enter 鍵就能取得設定時間之前的噗文。</p>
          <p>帳號列表 : 帳號輸入欄位右邊的 + 可以將輸入的帳號加入帳號列表，點擊帳號列表後，如果列表內有帳號在，將會顯示所有加入的帳號，點擊帳號能直接輸入進帳號欄位。列表中帳號的最右邊的 - 可將對應的帳號從列表中刪除。</p>
          <p>查看文章回應 : 點擊時光機或書籤的文章區塊進入瀏覽回應的頁面。</p>
          <p><img src="/responsesCount.png"> 文章回應數量</p>
          <p><img src="/link.png"> 原文連結</p>
          <p><img src="/addToBookmark.png"> / <img src="/removeBookmark.png"> 編輯書籤</p>
          <p>已加入書籤的文章可以到 <router-link
              to="/bookmark"
              class="link"
            >書籤頁</router-link> 查看</p>
          <p>如果不知道要用哪些帳號，可以先用 <span>台灣噗浪官方帳號(plurktaiwan)</span>、<span>噗浪辦公室(plurkoffice)</span>、<span>噗浪技術部(plurkwork)</span>、<span>噗浪美術部(plurkart)</span> 來體驗。</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.info {
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
        > img {
          border-radius: 5px;
          vertical-align: middle;
          height: 30px;
        }
        > .link {
          color: #ffffff;
          &:hover {
            color: #f9caaf;
          }
        }
        > span {
          color: #f9caaf;
        }
      }
      > .main {
        margin-top: 0;
      }
    }
  }
}

.info-enter,
.info-leave-to {
  opacity: 0;
}
.info-enter-active,
.info-leave-active {
  transition: all 0.3s;
}
.info-enter-to,
.info-leave {
  opacity: 1;
}
</style>
