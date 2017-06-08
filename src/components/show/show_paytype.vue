<template>
  <section class="show-paytype">
    <section class="bar-footer">
      <footer>
        <div class="total">
          <p class="hj">优惠¥{{discount}}&nbsp;&nbsp;&nbsp;&nbsp;合计:<span class="f18" style="color: #e33a41;">¥{{total.toFixed(2)}}</span></p>
        </div>
        <a href="javascript:;" class="button" @click="startPay">确认</a>
      </footer>
    </section>
    <section class="bar-content">
      <p class="title">选择支付方式</p>
      <div class="list">
        <div class="item" @click="selectPayType(1)">
          <img src="../../assets/images/show/icon_weixin@3x.png" alt="">
          <div class="info">
            <p class="title f16">微信支付,分享拿红包</p>
            <p class="small f10">支付完成后,分享到朋友圈,朋友制作立享6.8元红包</p>
          </div>
          <span class="button" :class="{'active':payType==1}"></span>
        </div>
        <div class="item" @click="selectPayType(0)">
          <img src="../../assets/images/show/icon_tiyanzhifu@3x.png" alt="">
          <div class="info">
            <p class="title f16">先体验再支付</p>
            <p class="small f10">在确认订单时进行支付</p>
          </div>
          <span class="button" :class="{'active':payType==0}"></span>
        </div>
        <div class="item" @click="selectPayType(2)">
          <img src="../../assets/images/show/icon_youhuima@3x.png" alt="">
          <div class="info">
            <p class="title f16">使用优惠码进行支付</p>
          </div>
          <span class="button" :class="{'active':payType==2}"></span>
        </div>
      </div>
      <div class="coupon-code" v-show="payType == 2">
        <input type="text" placeholder="请输入优惠码" v-model="code">
        <a href="javascript:;" class="button" @click="checkCouponCode">确定</a>
      </div>
      <div class="coupon-code-tip error" v-show="payType== 2 && codeStatus == -1">
        <img src="../../assets/images/show/icon_cha@3x.png" alt="">
        <p>优惠码不正确,请重新输入</p>
      </div>
      <div class="coupon-code-tip success" v-show="payType== 2 && codeStatus == 1">
        <img src="../../assets/images/show/icon_gou@3x.png" alt="">
        <p>优惠码正确,优惠{{discount.toFixed(2)}}元</p>
      </div>
    </section>
  </section>
</template>
<script>
import WxUtils from 'jsPath/tool/WxUtils'
import Service from 'service/service'
import ShowService from 'service/showService'
export default {
  name: '',
  data() {
    return {
      payType: 1, //1.微信支付,0.体验支付,2.优惠码
      code: '',
      ticket: this.config.ticket,
      total: 0,
      appId: this.$router.currentRoute.query.appid,
      discount: 0,
      codeStatus: 0 //0:初始状态,-1:输入错误,1:输入正确
    }
  },
  created() {
    this.fetchProductPrice();
  },
  computed: {

  },
  mouted() {
    // this.$nextTick(function() { // WxUtils.init(); // });

  },
  methods: {
    fetchProductPrice() {
      ShowService.getProductPrice({
        ticket: this.ticket
      }, result => {
        if (result.success) {
          this.total = result.data.price + result.data.freight;
        }
      })
    },
    selectPayType(type) {
      this.code = '';
      this.codeStatus = 0;
      //恢复初始价格
      this.total = this.total + this.discount;
      this.discount = 0;
      this.payType = type;
    },
    checkCouponCode() {
      if (this.utils.isEmpty(this.code)) {
        this.codeStatus = -1;
        return;
      }

      ShowService.getCouponMoneyByCode({
        ticket: this.ticket,
        couponCode: this.code
      }, result => {
        if (result.success) {
          this.codeStatus = 1;
          this.discount = result.data;
          this.total = (this.total - this.discount) > 0 ? (this.total - this.discount) : 0;
        } else {
          this.codeStatus = -1;
        }
      })
    },
    startPay(e) {
      e.preventDefault();
      if (this.payType == 2 && this.utils.isEmpty(this.code)) {
        this.codeStatus = -1;
        return;
      }

      if (this.payType == 0) {
        this.registerEditor();
        return;
      } else if (this.total == 0) {
        ShowService.pay(data, result => {
          //总金额为0,跳过支付
          if (result.status == 2) {
            this.registerEditor();
          }
        });
      } else {
        this.callWXPay();
      }
    },
    registerEditor() {
      Service.registerAlbumSDK({
        ticket: this.ticket,
        backUrl: '/show/order',
        shareImg: false,
        publish: false
      }, result => {
        if (result.success) { //注册成功,跳转
          location.href = location.origin + location.pathname + '#/editor/template?appid=' + this.appId;
        }
      });
    },
    callWXPay() {
      let that = this;
      WxUtils.showWXPay({
        ticket: this.ticket,
        couponCode: this.code,
        payment: this.payType,
        paySuccess: function() {
          that.registerEditor();
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.show-paytype {
  width: 100%;
  .bar-content {
    background: #ecf0f1;
    &>.title {
      height: 1.333rem;
      line-height: 1.333rem;
      padding-left: 0.533rem;
    }
  }
  .list {
    width: 9.52rem;
    margin: 0 auto;
    background: #fff;
    border-radius: 0.187rem;
    border: 1px solid #dddddd;
    .item {
      width: 100%;
      padding: 0 0.44rem;
      height: 1.6rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dbdbdb;
      &:last-child {
        border-bottom: none;
      }
      img {
        width: 0.72rem;
      }
      .info {
        margin-left: 0.187rem;
        .title {
          color: #333333;
        }
        .small {
          color: #999999;
        }
      }
      .button {
        display: block;
        width: 0.6rem;
        height: 0.6rem;
        border: 1px solid #dbdbdb;
        border-radius: 50%;
        margin-left: auto;
        &.active {
          border: none;
          background: url(../../assets/images/show/icon-selected.png) center no-repeat;
          background-size: contain;
        }
      }
    }
  }
  .coupon-code {
    width: 9.52rem;
    height: 1.093rem;
    border: 1px solid #dddddd;
    margin: 0.467rem auto;
    display: flex;
    align-items: center;
    border-radius: 0.187rem;
    background: #fff;
    input {
      padding-left: 0.533rem;
      width: 70%;
    }
    .button {
      width: 1.493rem;
      height: 0.707rem;
      line-height: 0.707rem;
      border-radius: 0.707rem;
      background: #71cce5;
      text-align: center;
      color: #fff;
      margin-left: auto;
      margin-right: 0.267rem;
    }
  }
  .coupon-code-tip {
    display: flex;
    width: 100%;
    align-items: center;
    padding-left: 0.533rem;
    box-sizing: border-box;
    &.error {
      color: #ff3300;
    }
    &.success {
      color: #21b100;
    }
    img {
      width: 0.333rem;
      margin-right: 0.133rem;
    }
  }
  .bar-footer {
    footer {
      width: 100%;
      height: 1.173rem;
      display: flex;
      align-items: center;
      background: #fff;
      .total {
        width: 7.573rem;
        text-align: right;
        display: flex;
        .yh {
          color: #666666;
          margin-left: auto;
          margin-right: 0.133rem;
        }
        .hj {
          margin-left: auto;
          margin-right: 0.267rem;
        }
      }
      .button {
        display: block;
        width: 2.427rem;
        height: 1.173rem;
        line-height: 1.173rem;
        text-align: center;
        background: #3d598b;
        color: #fff;
        margin-left: auto;
      }
    }
  }
}
</style>
