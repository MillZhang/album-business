<template>
  <div class="pay">
    <div class="title">
      <img src="../../assets/images/icon/icon-right.png" alt="">
      <p>恭喜你,订单已生成!</p>
    </div>
    <p class="price">订单总额: <span class="red">¥{{orderPrice}}</span></p>
    <div class="pay-type">
      <label>支付方式</label>
      <span class="red">微信支付</span>
    </div>
    <a href="javascript:;" class="payBtn" @click="payEvent">确认支付</a>
  </div>
</template>
<script>
  import WxUtils from 'jsPath/tool/WxUtils'
  import Service from 'service/service'
  export default{
    name: 'pay',
    data(){
      return {
        orderId: this.$router.currentRoute.query.orderId,
        ticket: this.config.ticket,
        appId: this.$router.currentRoute.query.appid,
        from: this.$router.currentRoute.query.from,
        orderPrice: 0
      }
    },
    created(){
      this.fetchOrderInfo();
    },
    methods: {
      payEvent(e){
        e.preventDefault();
        let that = this;
        if (Number(this.orderPrice) == 0) {
          Service.nonPayment({
            id: this.orderId
          }, result => {
            if (result.success) {
              that.$router.push('/paint/success');
            }
          });
        } else {
          WxUtils.paintWXPay({
            orderId: Number(this.orderId)
          }, location.origin + location.pathname + '#/paint/success');
        }

      },
      fetchOrderInfo(){
        let that = this;
        Service.getPaintOrderDetail({
          orderId: this.orderId
        }, result => {
          if (result.success) {
            that.orderPrice = result.data.totalMoney;
          }
        });
      }
    }
  }
</script>
<style scoped>
  .pay {
    height: 100%;
    background: #E7E7E7;
    padding-top: 3rem;
    box-sizing: border-box;
  }

  .title {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    text-align: center;
    width: 50%;
    margin: 0 auto;
  }

  .title img {
    width: 0.6rem;
    margin-right: 0.2rem;
  }

  .price {
    text-align: center;
    margin-top: 0.5rem;
  }

  .pay-type {
    display: flex;
    display: -webkit-flex;
    background: #ffffff;
    height: 1.2rem;
    line-height: 1.2rem;
    padding: 0 0.1rem;
    margin-top: 1rem;
  }

  .pay-type > label {
    flex: 1;
    -webkit-flex: 1;
  }

  .pay-type > span {
    flex: 1;
    -webkit-flex: 1;
    text-align: right;
  }

  .payBtn {
    display: block;
    background: #04BE02;
    width: 90%;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    color: #ffffff;
    margin: 2rem auto 0;
    border-radius: 0.1rem;
  }

  .red {
    color: #bc223d;
  }
</style>
