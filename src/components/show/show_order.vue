<template>
  <section class="show-order">
    <section class="bar-footer">
      <template v-if="!orderInfo.showPayment">
        <footer class="nopay">
          <a href="javascript:;" class="button" @click="startPay">确定</a>
        </footer>
      </template>
      <template v-else>
        <footer>
          <div class="total">
            <p class="hj">优惠¥{{discount}}&nbsp;&nbsp;&nbsp;&nbsp;合计:<span class="f18" style="color: #e33a41;">¥{{total.toFixed(2)}}</span></p>
          </div>
          <a href="javascript:;" class="button" @click="startPay">确认</a>
        </footer>
      </template>
    </section>
    <section class="bar-content">
      <section class="product">
        <img :src="orderInfo.coverImg+'?imageMogr2/thumbnail/600x600'" alt="">
        <div>
          <p>{{orderInfo.productName}}</p>
          <p style="color: #aaaaaa;">{{orderInfo.productName}} P数:{{orderInfo.pageSize}}</p>
          <p>¥{{orderInfo.money}}</p>
        </div>
      </section>
      <div class="amount">
        <span style="color: #aaaaaa;">数量</span>
        <span style="margin-left: auto;">x1</span>
      </div>
      <template v-if="orderInfo.pickupWay == 2">
        <div class="block-title">收货地址</div>
        <section class="address">
          <div class="item">
            <span class="required">*</span>
            <mt-field label="姓名" placeholder="请输入您的姓名" :attr="{maxlength: 10}" v-model="form.name">
            </mt-field>
          </div>
          <div class="item">
            <span class="required">*</span>
            <mt-field label="手机号码" placeholder="请输入联系手机号码" :attr="{maxlength: 11}" type="tel" v-model="form.telephone">
            </mt-field>
          </div>
          <div class="item">
            <span class="required">*</span>
            <mt-field label="省市地区" id="city-picker" placeholder="请选择" v-model="form.city">
            </mt-field>
          </div>
          <div class="item">
            <span class="required">*</span>
            <mt-field label="详细地址" placeholder="请输入街道小区信息" :attr="{ maxlength: 50}" v-model="form.address">
            </mt-field>
          </div>
        </section>
      </template>
      <template v-if="orderInfo.pickupWay == 1">
        <div class="block-title">领取信息</div>
        <div class="lq-block">
          <div class="item go" @click="showUserDialog=true">
            <span class="label">领取人:</span>
            <span>{{orderInfo.name}}</span>
            <span style="margin-left: auto;margin-right:0.867rem;">{{orderInfo.telephone}}</span>
          </div>
        </div>
        <div class="block-title">领取地址</div>
        <div class="lq-block">
          <div class="item go" @click="showAddressDialog=true">
            <span class="label">领取地址:</span>
            <input type="text" readonly="" v-model="pickUpAddress">
          </div>
          <div class="item">
            <span class="label">门店电话:</span>
            <span>{{orderInfo.kfTelephone}}</span>
          </div>
        </div>
      </template>
      <template v-if="orderInfo.showPayment">
        <div class="block-title">支付方式</div>
        <section class="list">
          <div class="item" @click="selectPayType(1)">
            <img src="../../assets/images/show/icon_weixin@3x.png" alt="">
            <div class="info">
              <p class="title f16">微信支付,分享拿红包</p>
              <p class="small f10">支付完成后,分享到朋友圈,朋友制作立享6.8元红包</p>
            </div>
            <span class="button" :class="{'active':payType==1}"></span>
          </div>
          <div class="item" @click="selectPayType(2)">
            <img src="../../assets/images/show/icon_youhuima@3x.png" alt="">
            <div class="info">
              <p class="title f16">使用优惠码进行支付</p>
            </div>
            <span class="button" :class="{'active':payType==2}"></span>
          </div>
        </section>
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
      </template>
    </section>
    <!-- 修改领取人对话框 -->
    <section class="dialog" v-show="showUserDialog">
      <img src="../../assets/images/show/bg-tanchuang@2x.png" alt="" class="title-bg">
      <p class="title f18">领取信息修改</p>
      <a href="javascript:;" class="close" @click="showUserDialog=false">
        <img src="../../assets/images/show/icon_guanbi@3x.png" alt="">
      </a>
      <div>
        <input type="text" placeholder="请输入姓名" v-model="orderInfo.name" maxlength="20">
      </div>
      <div>
        <input type="text" placeholder="请输入手机号" v-model="orderInfo.telephone" maxlength="11">
      </div>
      <a href="javascript:;" class="button" @click="showUserDialog=false">确定</a>
    </section>
    <section class="dialog" v-show="showAddressDialog">
      <img src="../../assets/images/show/bg-tanchuang@2x.png" alt="" class="title-bg">
      <p class="title f18">领取地址选择</p>
      <a href="javascript:;" class="close" @click="showAddressDialog=false">
        <img src="../../assets/images/show/icon_guanbi@3x.png" alt="">
      </a>
      <div class="addr-list">
        <template v-for="item in pickUpAddressList">
          <div class="addr-item" :class="{'active':item.address== pickUpAddress}" @click="changePickUpAddress(item)">
            <span class="content">{{item.address}}</span>
            <span class="flag"></span>
          </div>
        </template>
      </div>
      <a href="javascript:;" class="button" @click="showAddressDialog=false">确定</a>
    </section>
    <div class="layer" v-show="showUserDialog || showAddressDialog"></div>
  </section>
</template>
<script>
import WxUtils from 'jsPath/tool/WxUtils'
import 'jsPath/lib/sm'
import 'jsPath/lib/sm-city'
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
      codeStatus: 0, //0:初始状态,-1:输入错误,1:输入正确
      orderInfo: {},
      form: {
        name: '',
        telephone: '',
        city: '',
        address: ''
      },
      pickUpAddressList: [],
      showUserDialog: false,
      showAddressDialog: false,
      pickUpAddress: null
    }
  },
  created() {
    // WxUtils.init();
    this.fetchOrderInfo();
    this.fetchPickUpList();
  },
  mouted() {},
  methods: {
    fetchOrderInfo() {
      ShowService.getOrderInfo({
        ticket: this.ticket
      }, result => {
        if (result.success) {
          this.orderInfo = result.data;
          this.total = Number(this.orderInfo.money);
          if (this.orderInfo.pickupWay == 2) {
            this.$nextTick(() => {
              this.initCityControl();
            });
          }
        }
      })
    },
    fetchPickUpList() {
      ShowService.getPickUpAddressList({
        ticket: this.ticket
      }, result => {
        if (result.success) {
          this.pickUpAddressList = result.data;
          this.pickUpAddress = result.data[0].address;
        }
      });
    },
    changePickUpAddress(obj) {
      this.pickUpAddress = obj.address;
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
          this.total = (this.total - this.discount) < 0 ? 0 : (this.total - this.discount);
        } else {
          this.codeStatus = -1;
        }
      })
    },
    startPay() {
      this.form.city = $("#city-picker").find('input').val();
      if (this.orderInfo.pickupWay == 1) {
        this.form.name = this.orderInfo.name;
        this.form.telephone = this.orderInfo.telephone;
        this.form.city = '';
        this.form.address = this.pickUpAddress;
      } else if (this.orderInfo.pickupWay == 2) {
        if (this.utils.isEmpty(this.form.name)) {
          this.$toast('请输入姓名');
          return;
        }

        if (this.utils.isEmpty(this.form.telephone)) {
          this.$toast('请输入手机号码');
          return;
        }

        if (!this.utils.isTelephone(this.form.telephone)) {
          this.$toast('请输入正确的手机号码');
          return;
        }

        if (this.utils.isEmpty(this.form.city)) {
          this.$toast('请选择地区');
          return;
        }

        if (this.utils.isEmpty(this.form.address)) {
          this.$toast('请输入详情街道地址');
          return;
        }
      }
      console.log(this.form)
      ShowService.createOrder({
        ticket: this.config.ticket,
        name: this.form.name,
        telephone: this.form.telephone,
        city: this.form.city,
        address: this.form.address,
        couponCode: this.code
      }, result => {
        if (result.success) {
          let orderId = result.data;
          if (this.orderInfo.showPayment && this.total > 0) {
            WxUtils.showWXPay({
              ticket: this.ticket,
              couponCode: this.code,
              payment: this.payType,
              paySuccess: function() {
                location.href = location.origin + location.pathname + '#/show/success?appid=' + this.appId + '&orderId=' + orderId;
              }
            });
          } else {
            //无需支付
            this.$router.push('/show/success?appid=' + this.appId + '&orderId=' + orderId);
          }
        }
      });
    },
    initCityControl() {
      $("#city-picker").find('input').cityPicker({
        toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择收货地址</h1>\
    </header>'
      });
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/css/sm.css";
.mint-field .mint-cell-title {
  width: 2.0rem;
}

.show-order {
  width: 100%;
  .bar-content {
    /*min-height: 16.6rem;*/
    background: #efeded;
  }
  * {
    box-sizing: border-box;
  }
  .product {
    border-bottom: 1px solid #ececec;
    background: #ffffff;
    padding: 0.133rem 0.4rem;
    display: flex;
    align-items: center;
    &>div {
      &>p {
        margin: 0.16rem 0;
      }
    }
    img {
      width: 1.893rem;
      height: 1.893rem;
      margin-right: 0.333rem;
    }
  }
  .amount {
    height: 1.0rem;
    display: flex;
    background: #fff;
    width: 100%;
    align-items: center;
    padding: 0 0.4rem;
  }
  .block-title {
    width: 100%;
    background: #f8f8f8;
    padding-left: 0.4rem;
    height: 0.933rem;
    line-height: 0.933rem;
    margin-top: 0.333rem;
    border-bottom: 1px solid #ebebeb;
    color: #a2a2a2;
  }
  .address {
    background: #fff;
    width: 100%;
    padding: 0 0.4rem;
    .item {
      display: flex;
      align-items: center;
      .required {
        color: #bc223d;
      }
      .mint-cell {
        flex-grow: 2;
        border-bottom: 1px solid #dbdbdb;
      }
    }
  }
  .list {
    width: 100%;
    background: #fff;
    .item {
      width: 100%;
      padding: 0 0.44rem;
      height: 1.6rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #dbdbdb;
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
    width: 100%;
    height: 1.093rem;
    margin: 0 auto;
    display: flex;
    align-items: center;
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
    padding-left: 0.4rem;
    box-sizing: border-box;
    margin-top: 0.267rem;
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
  .lq-block {
    background: #fff;
    width: 100%;
    .item {
      height: 1.067rem;
      display: flex;
      align-items: center;
      padding: 0 0.4rem;
      background: #fff;
      border-bottom: 1px solid #ebebeb;
      position: relative;
      &.go:after {
        content: '';
        background: url(../../assets/images/show/icon-right.png) center no-repeat;
        background-size: contain;
        width: 0.4rem;
        height: 0.467rem;
        position: absolute;
        right: 0.267rem;
        top: 0.3rem;
      }
      input {
        flex-grow: 1;
        padding-right: 0.267rem;
      }
      .label {
        color: #a2a2a2;
        margin-right: 0.133rem;
      }
    }
  }
  .bar-footer {
    height: 1.173rem;
    footer {
      width: 100%;
      height: 1.173rem;
      display: flex;
      align-items: center;
      background: #fff;
      &.nopay {
        .button {
          width: 100%;
        }
      }
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
  .layer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 2000;
  }
  .dialog {
    position: absolute;
    width: 6.747rem;
    left: 1.63rem;
    top: 4.0rem;
    border-radius: 0.187rem;
    background: #fff;
    z-index: 2001;
    padding: 0.533rem 0;
    .title-bg {
      position: absolute;
      width: 7.507rem;
      top: -3.2rem;
      left: -0.31rem;
    }
    .title {
      width: 100%;
      color: #fff;
      font-weight: bold;
      position: absolute;
      top: -0.95rem;
      text-align: center;
    }
    .close {
      position: absolute;
      width: 0.36rem;
      right: 0.267rem;
      top: -0.8rem;
      img {
        width: 100%;
      }
    }
    .addr-list {
      padding: 0.267rem;
      max-height: 6.667rem;
      overflow-y: auto;
      .addr-item {
        border-bottom: 1px solid #dbdbdb;
        text-align: left;
        padding: 0.267rem;
        display: flex;
        align-items: center;
        &.active {
          .flag {
            background: url(../../assets/images/show/icon-selected.png) center no-repeat;
            background-size: contain;
          }
        }
        .content {
          width: 80%;
        }
        .flag {
          width: 0.667rem;
          height: 0.667rem;
          display: block;
          margin-left: auto;
          border: 1px solid #dbdbdb;
          border-radius: 50%;
        }
      }
    }
    &>div {
      margin-top: 0.24rem;
      width: 100%;
      text-align: center;
      input {
        width: 5.44rem;
        height: 0.813rem;
        margin: 0 auto;
        border: 1px solid #71cce5;
        border-radius: 0.133rem;
        padding-left: 0.16rem;
      }
    }
    .button {
      width: 5.44rem;
      height: 1.2rem;
      line-height: 1rem;
      display: block;
      text-align: center;
      margin: 0.533rem auto 0;
      color: #71cce5;
      background: url(../../assets/images/show/button_2@2x.png) center no-repeat;
      background-size: cover;
    }
  }
}
</style>
