<template>
  <div class="paySuccess">
    <div class="title">
      <img src="../../assets/images/icon/icon-right.png" alt="">
      <p>恭喜你,支付成功啦!</p>
    </div>
    <a href="javascript:;" class="order" @click="goToOrder">查看订单</a>
  </div>
</template>
<script>
  export default{
    name: 'paySuccess',
    data(){
      return {
        ticket: this.config.ticket,
        appId: this.$router.currentRoute.query.appid
      }
    },
    methods: {
      goToOrder(e){
        e.preventDefault();
        this.$router.push('/paint/oList');
      }
    }
  }
</script>
<style scoped>
  .paySuccess {
    height: 100%;
    background: #E7E7E7;
    padding-top: 4rem;
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

  .order {
    display: block;
    width: 90%;
    color: #000000;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    background: #ffffff;
    margin: 1rem auto;
  }
</style>
