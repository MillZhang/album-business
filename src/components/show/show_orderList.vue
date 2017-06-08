<template>
  <div class="work-lib" :class="{bg:tabIndex==2}">
    <template v-if="orderItem.id == undefined">
      <p class="empty-order">
        您的订单空空如也~
      </p>
    </template>
    <template v-else>
      <div class="order" v-show="tabIndex == 2">
        <div class="item">
          <div class="head">
            <span>订单号:{{orderItem.orderNo}}</span>
            <span class="fr" style="margin-right: 0.5rem;color:#3d598b;">{{orderStatus[orderItem.state]}}</span>
          </div>
          <router-link class="body flex" :to="{path:'/show/order/detail',query:{id:orderItem.id}}">
            <div class="coverImg">
              <img :src="orderItem.coverImg+'?imageMogr2/thumbnail/750x750'" alt="">
            </div>
            <div class="message">
              <p style="color: #434245;">{{orderItem.productName}}<span style="color:#3d598b;margin-left:0.2rem;">已集{{orderItem.laudNum}}个赞</span></p>
              <p style="color: #434245;margin-top: 0.8rem">¥{{orderItem.money|money}}*{{orderItem.number}}</p>
            </div>
          </router-link>
          <div class="buttons">
            <!--<span>xxx</span>-->
            <router-link :to="{path:'/show/order/detail',query:{id:orderItem.id}}" class="fr blue">订单详情</router-link>
            <template v-if="orderItem.state == 0">
              <a href="javascript:;" class="fr red" @click="payOrder($event,orderItem.id)">立即支付</a>
            </template>
            <a href="javascript:;" class="fr" @click="showTip=true">温馨提示</a>
          </div>
        </div>
      </div>
    </template>
    <section class="dialog" v-show="showTip">
      <p class="title">温馨提示</p>
      <ul>
        <li>订单支付完成后,照片不能更改和调整</li>
        <li>上传照片都是我们手机DIY照片,可能会出现像素低,颜色不统一,偏色,相册虚等问题属于正常现象,不做返件条件,敬请谅解</li>
        <li>相册开胶,物流</li>
      </ul>
      <a href="javascript:;" class="close" @click="showTip=false"></a>
    </section>
    <section class="layer" v-show="showTip"></section>
  </div>
  </div>
</template>
<script>
import WxUtils from 'jsPath/tool/WxUtils'
import ShowService from 'service/showService'
export default {
  name: 'workLib',
  data() {
    return {
      tabIndex: undefined == this.$router.currentRoute.query.tab ? 2 : this.$router.currentRoute.query.tab,
      appId: this.$router.currentRoute.query.appid,
      ticket: this.config.ticket,
      pageNum: 1,
      pageSize: 10,
      loading: true,
      loadingOver: false,
      workList: [],
      orderList: [],
      orderStatus: {
        "0": "待支付",
        "1": "已支付",
        "2": "待发货",
        "3": "已发货",
        "4": "已完成",
        "5": "处理中",
        "6": "集赞中"
      },
      orderItem: {},
      showTip: false
    }
  },
  created() {
    this.fetchOrderListData();
  },
  methods: {
    fetchOrderListData() {
      ShowService.getOrderList({
        ticket: this.config.ticket
      }, result => {
        if (result.success) {
          console.log(result)
          this.orderItem = result.data;
        }
      });
    },
    tabClickEvent(e, index) {
      e.preventDefault();
      this.tabIndex = index;
    },
    goToPreview(e, albumId) {
      e.preventDefault();
      this.$router.push('/common/previewer?appid=' + this.appId + '&albumId=' + albumId + '&cfrom=Team');
    },
    payOrder(e, orderId) {
      e.preventDefault();
      WxUtils.showWXPay({
        ticket: this.ticket,
        paySuccess: function() {
          location.href = location.origin + location.pathname + '#/show/orderList?appid=' + this.appId;
        }
      });
    }
  }
}
</script>
<style scoped>
.work-lib {
  width: 100%;
  /*height: 100%;*/
}

.work-lib.bg {
  background: #EFEDED;
}

.work-lib .content {}

.tab {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  height: 1.2rem;
  line-height: 1.2rem;
  background: #ffffff;
  color: #919191;
  text-align: center;
  position: fixed;
  top: 0;
}

.tab > a {
  width: 49.5%;
  display: block;
  position: relative;
}

.tab > a.active {
  color: #434245;
}

.tab .split:after {
  content: "";
  width: 0.04rem;
  height: 0.3467rem;
  background: #CFCFCF;
  display: block;
  position: absolute;
  right: 0;
  top: 0.45rem;
}

.work {
  width: 100%;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}

.work .gap {
  height: 0.2rem;
  width: 100%;
  background: rgb(239, 237, 237);
  margin-bottom: 0.2rem;
}

.work .item {
  width: 30%;
  margin: 0 0 0 2.5%;
  position: relative;
  z-index: 2;
}

.work .item img {
  width: 100%;
  height: 3rem;
  box-shadow: 0 0 10px #ebebeb;
}

.book-shelf {
  width: 100%;
  position: relative;
  height: 1.5rem;
  bottom: 0.4rem;
  z-index: 1;
}

.info {
  position: absolute;
  top: 40%;
  width: 100%;
  margin: 0 auto;
  background: #ffffff;
  text-align: center;
}

.info > p {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.order {
  width: 100%;
  height: 100%;
  /*margin-top: 0.2rem;*/
}

.order .item {
  margin-bottom: 0.3rem;
  background: #ffffff;
}

.order .item .head {
  height: 0.893rem;
  line-height: 0.893rem;
  padding-left: 0.3rem;
  border-bottom: 1px solid #ededed;
}

.order .item .body {
  padding: 0.3rem;
  border-bottom: 1px solid #ebebeb;
  position: relative;
}

.order .item .body:after {
  content: '';
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  border-top: 2px solid #C0C0C0;
  border-right: 2px solid #C0C0C0;
  position: absolute;
  right: 0.5rem;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  top: 0.8rem;
}

.order .item .body .coverImg {
  width: 1.93rem;
  height: 1.93rem;
  margin-right: 0.3rem;
  padding-left: 0.2rem;
}

.order .item .body .coverImg img {
  width: 100%;
  height: 100%;
}

.order .item .body .message > p {
  margin-bottom: 0.2rem;
}

.order .item .total {
  padding-right: 0.3rem;
}

.order .item .total,
.order .item .buttons {
  border-bottom: 1px solid #ebebeb;
  padding: 0.267rem 0 0.267rem 0.3rem;
}

.order .item .buttons:after {
  content: '';
  clear: both;
  display: block;
}

.order .item .buttons > a {
  color: #E44046;
  padding: 0.16rem 0.267rem;
  line-height: 0.733rem;
  text-align: center;
  border-radius: 0.067rem;
  margin-right: 0.2rem;
  border: 1px solid #999999;
  color: #999999;
  margin-top: 0.133rem
}

.order .item .buttons > a.blue {
  border: none;
  background: #71cce5;
  color: #fff;
}

.order .item .buttons > a.red {
  border: none;
  background: #bc223d;
  color: #fff;
}

.empty-workLib {
  width: 100%;
  text-align: center;
  color: #AFB0B8;
}

.empty-workLib img {
  width: 4rem;
  margin-top: 4rem;
}

.empty-workLib p {
  margin-top: 1rem;
}

.empty-workLib p:last-child {
  margin-top: 0.5rem;
}

.empty-order {
  text-align: center;
  margin-top: 4rem;
}

.bg {
  background: #ffffff;
}

.dialog {
  position: absolute;
  width: 8.4rem;
  left: 0.8rem;
  top: 2.0rem;
  z-index: 2001;
  background: #fff;
  padding: 0.667rem 0.267rem 0.667rem 0.8rem;
  color: #9b8269;
  box-sizing: border-box;
  text-align: center;
  border-radius: 0.133rem;
}

.dialog .title {
  margin-bottom: 0.187rem;
}

.dialog ul {
  list-style-type: decimal;
  text-align: left;
}

.dialog .close {
  content: "";
  width: 0.667rem;
  height: 0.667rem;
  background: url(../../assets/images/show/icon-close.png) center no-repeat;
  background-size: contain;
  position: absolute;
  right: 0.533rem;
  top: 0.533rem;
}

.layer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
}
</style>
