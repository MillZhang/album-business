<template>
  <div class="orderDetail">
    <div class="header">
      <p class="orderNo">订单号:{{detail.orderNo}}</p>
      <p class="state" style="color: #f39800;">{{orderStatus[detail.state]}}</p>
    </div>
    <div class="body">
      <div class="image">
        <img :src="detail.coverImg+'?imageMogr2/thumbnail/750x750'" alt="">
      </div>
      <div class="message">
        <p style="color: #434245;">{{detail.productName}}</p>
        <p style="color: #878787;">{{detail.albumName}} P数:{{detail.pageSize}}</p>
        <p style="color: #434245;">¥ {{detail.money|money}} x {{detail.number}}</p>
      </div>
    </div>
    <div class="total">
      <p>共1件商品 合计: <span style="color: #EC5050;">¥{{(Number(detail.money) * detail.number)|money}}</span>(含运费¥{{detail.logisticsFee}})</p>
      <p>下单时间 {{detail.orderTime}}</p>
    </div>
    <template v-if="detail.logisticsNo != ''&& null != detail.logisticsNo">
      <div class="wl" @click="lookForLogistics">
        <p>配送信息</p>
        <p>{{detail.logisticsInfo}}</p>
        <p>{{detail.logisticsNo}}</p>
      </div>
    </template>
    <div class="sh-message">
      <div class="title">收货信息</div>
      <div class="line">
        <label>姓&nbsp;&nbsp;名:</label>
        <p>{{detail.name}}</p>
      </div>
      <div class="line">
        <label>手机号码:</label>
        <p>{{detail.telephone}}</p>
      </div>
      <div class="line">
        <label>详细地址:</label>
        <p>{{detail.address}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import ShowService from 'service/showService'
const WL = {
  "韵达快递": "yunda",
  "中通快递": "zhongtong",
  "顺丰快递": "shunfeng",
  "申通快递": "shentong",
  "圆通快递": "yuantong"
}
export default {
  name: 'orderDetail',
  data() {
    return {
      orderId: this.$route.query.id,
      detail: {},
      orderStatus: {
        "0": "待支付",
        "1": "已支付",
        "2": "待发货",
        "3": "已发货",
        "4": "已完成",
        "5": "处理中",
        "6": "集赞中"
      }
    }
  },
  created() {
    this.fetchOrderDetailData();
  },
  methods: {
    fetchOrderDetailData() {
      let that = this;
      ShowService.getOrderDetail({
        orderId: this.orderId
      }, result => {
        if (result.success) {
          that.detail = result.data;
        }
      });
    },
    lookForLogistics(e) {
      e.preventDefault();
      let info = this.detail.logisticsInfo;
      location.href = 'http://m.kuaidi100.com/index_all.html?type=' + WL[info] + '&postid=' + this.detail.logisticsNo;
    }
  }
}
</script>
<style scoped>
.orderDetail {
  width: 100%;
  height: 100%;
  background: #EFEDEE;
}

.orderDetail .header {
  display: flex;
  display: -webkit-flex;
  padding: 0 0.5rem;
  background: #ffffff;
  height: 0.893rem;
  line-height: 0.893rem;
}

.orderDetail .header .orderNo {
  width: 80%;
}

.orderDetail .header .state {
  width: 20%;
  text-align: right;
}

.orderDetail .body {
  background: #ffffff;
  display: flex;
  display: -webkit-flex;
  border-top: 1px solid #d9d9d9;
  padding: 0.2rem 0.5rem;
}

.orderDetail .body .image {
  width: 1.933rem;
  height: 1.933rem;
  margin-right: 0.5rem;
}

.orderDetail .body .image img {
  width: 100%;
  height: 100%;
  border-radius: 0.05rem;
}

.orderDetail .body .message > p {
  margin-bottom: 0.2rem;
}

.orderDetail .total {
  background: #ffffff;
  border-top: 1px solid #EBEBEB;
  padding: 0.2rem 0.5rem;
  text-align: right;
}

.orderDetail .total > p {
  margin-bottom: 0.2rem;
}

.orderDetail .wl {
  background: #ffffff;
  display: flex;
  display: -webkit-flex;
  border-top: 1px solid #EBEBEB;
  height: 1.4rem;
  line-height: 1.4rem;
  padding: 0 0.5rem;
}

.orderDetail .wl {
  position: relative;
}

.orderDetail .wl:after {
  content: '';
  width: 0.3rem;
  height: 0.3rem;
  border-top: 1px solid #aaa;
  border-right: 1px solid #aaa;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.orderDetail .wl > p {
  width: 33%;
}

.orderDetail .sh-message {
  background: #ffffff;
  margin-top: 0.5rem;
}

.orderDetail .sh-message .title {
  height: 0.9333rem;
  line-height: 0.9333rem;
  border-bottom: 1px solid #EBEBEB;
  padding: 0 0.5rem;
}

.orderDetail .sh-message .line {
  display: flex;
  display: -webkit-flex;
  height: 0.76rem;
  line-height: 0.76rem;
  padding: 0 0.5rem;
  color: #C1C1C1;
}

.orderDetail .sh-message .line > label {
  width: 2rem;
  color: #333333;
}
</style>
