<template>
  <section class="show-success">
    <section class="bar-content">
      <div class="top">
        <img class="logo" src="../../assets/images/show/icon-success.png" alt="">
        <p class="f16" style="color: #21b100;margin-top:0.467rem;">恭喜,上传成功!</p>
        <p class="f16" style="margin-top:0.467rem;">您的订单号:{{orderInfo.orderNo}}</p>
      </div>
      <hr>
      <div class="middle">
        <div class="title">集赞步骤</div>
        <div class="step">
          <div class="item">
            <img src="../../assets/images/show/img_fengxiang@3x.png" alt="">
            <p>第一步</p>
            <p>点击分享按钮</p>
          </div>
          <div class="item">
            <img src="../../assets/images/show/img_fasong@3x.png" alt="">
            <p>第二步</p>
            <p>发至朋友圈</p>
          </div>
          <div class="item">
            <img src="../../assets/images/show/img_dianzan@3x.png" alt="">
            <p>第三步</p>
            <p>让朋友点赞</p>
          </div>
        </div>
      </div>
      <div class="info">
        分享至朋友圈后让朋友点击到页面,点击<img src="../../assets/images/show/button_lijizanwo@2x.png" alt="">按钮为您点赞,
        <span style="color:#71cce5;">"来集满10个赞"</span>,集满{{orderInfo.laudNum}}个赞以后,我们将尽快为您制作相册。
      </div>
      <a href="javascript:;" class="button" @click="handelShare">去分享</a>
    </section>
  </section>
</template>
<script>
import ShowService from 'service/showService'
export default {
  name: '',
  data() {
    return {
      appId: this.$router.currentRoute.query.appid,
      orderId: this.$router.currentRoute.query.orderId,
      orderInfo: {}
    }
  },
  created() {
    this.fetchOrderNo();
  },
  computed: {

  },
  methods: {
    handelShare(e) {
      e.preventDefault();
      this.$router.push('/show/index?appid=' + this.appId)
    },
    fetchOrderNo() {
      ShowService.getOrderNo({
        orderId: this.orderId
      }, result => {
        console.log(result)
        if (result.success) {
          this.orderInfo = result.data;
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.show-success {
  width: 100%;
  .bar-content {
    background: #fff;
  }
  * {
    box-sizing: border-box;
  }
  .top {
    text-align: center;
    padding: 0.827rem 0 0.64rem;
    .logo {
      width: 1.707rem;
    }
  }
  hr {
    width: 9.107rem;
    height: 0.027rem;
    margin: 0 auto;
  }
  .middle {
    border: 0.067rem solid #71cce5;
    border-bottom: none;
    width: 9.733rem;
    margin: 0.6rem auto 0;
    position: relative;
    .title {
      width: 3.813rem;
      height: 1rem;
      text-align: center;
      color: #fff;
      line-height: 1rem;
      background: url(../../assets/images/show/img_jizanbuzou@3x.png) center no-repeat;
      background-size: contain;
      position: absolute;
      top: -0.5rem;
      left: 2.96rem;
    }
    .step {
      display: flex;
      align-items: center;
      padding: 0.533rem 0 0.667rem;
      position: relative;
      .item {
        width: 33%;
        text-align: center;
        img {
          width: 1.507rem;
        }
      }
      &:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 0.267rem;
        bottom: -0.133rem;
        background: url(../../assets/images/show/img_dibuquanquan@3x.png) center no-repeat;
        background-size: cover;
      }
    }
  }
  .info {
    width: 9.24rem;
    color: #a0a0a0;
    margin: 0.333rem auto;
    line-height: 0.867rem;
    img {
      width: 0.867rem;
      vertical-align: middle;
    }
  }
  .button {
    background: #3d598b;
    width: 3.28rem;
    height: 0.827rem;
    text-align: center;
    line-height: 0.827rem;
    display: block;
    margin: 0.667rem auto;
    border-radius: 0.827rem;
    color: #fff;
  }
}
</style>
