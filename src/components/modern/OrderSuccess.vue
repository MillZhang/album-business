<template>
  <div class="orderSuccess">
    <img src="../../assets/images/icon/icon-right.png" alt="">
    <p style="color: #f87873;margin-top: 0.5rem;">手机号码:{{orderDetail.telephone}}</p>
    <p style="color: #f87873;">订单编号:{{orderDetail.orderno}}</p>
    <p class="bold f18">恭喜你,提交成功!</p>
    <p style="color: #f87873;">*保存此截图方便售后查询*</p>
    <p class="tip">我们将尽快制作安排发货,请您保持手机通讯畅通,以便快递哥哥能第一时间联系您</p>
  </div>
</template>
<script>
import Service from 'service/service';
export default {
  name: 'orderSuccess',
  data() {
    return {
      orderDetail: {}
    }
  },
  created() {
    this.fetchTaoBaoAceessDetail();
  },
  methods: {
    fetchTaoBaoAceessDetail() {
      Service.getTaoBaoAccessDetail({
        orderId: this.$router.currentRoute.query.orderId
      }, result => {
        if (result.success) {
          this.orderDetail = result.data;
        }
      });
    }
  }
}
</script>
<style scoped>
.orderSuccess {
  width: 100%;
  text-align: center;
}

.orderSuccess img {
  width: 2rem;
  margin-top: 1rem;
}

.orderSuccess .bold {
  font-weight: bold;
  margin: 0.6rem 0 0.2rem;
}

.orderSuccess .tip {
  color: #aaa;
  border-top: 1px solid #cccccc;
  text-align: center;
  padding: 0.5rem;
  margin-top: 0.8rem;
}
</style>
