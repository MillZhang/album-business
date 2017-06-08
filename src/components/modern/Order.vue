<template>
  <div class="order">
    <div class="logo">
      <img :src="setting.logoOrder" alt="">
    </div>
    <div class="line">
      <div class="icon">
        <img src="../../assets/images/icon/icon-order.png" alt="">
      </div>
      <input type="text" placeholder="请粘贴购买的订单号在此" v-model="formData.name" class="upcase" maxlength="40">
    </div>
    <div class="line">
      <div class="icon">
        <img src="../../assets/images/icon/icon-tel.png" alt="">
      </div>
      <input type="text" placeholder="请输入联系人号码" maxlength="11" v-model="formData.telephone">
    </div>
    <div class="bottom">
      <a href="javascript:;" class="completeBtn" @click="submitEvent">提交印制</a>
    </div>
    <div class="support">
      <p>{{setting.support}}</p>
    </div>
  </div>
</template>
<script>
import Service from 'service/service'
import {
  Toast,
  MessageBox
} from 'mint-ui'
export default {
  name: 'order',
  data() {
    return {
      ticket: this.config.ticket,
      appId: this.$router.currentRoute.query.appid,
      temporaryId: this.$router.currentRoute.query.temporaryId,
      formData: {
        name: '',
        telephone: ''
      },
      setting: {}
    }
  },
  created() {
    this.fetchTaoBaoAccessSetting();
  },
  methods: {
    fetchTaoBaoAccessSetting() {
      Service.getTaoBaoAccessSetting({
        ticket: this.ticket
      }, result => {
        if (result.success) {
          this.setting = result.data;
        }
      })
    },
    submitEvent(e) {
      e.preventDefault();
      let that = this;
      if ('' == this.formData.name) {
        Toast('请输入订单号');
        return;
      }

      if ('' == this.formData.telephone) {
        Toast('请输入手机号');
        return;
      }
      if (!eval('/' + this.setting.ordernoRegexp + '/').test(this.formData.name.toUpperCase())) {
        Toast('请输入正确的订单号');
        return;
      }

      if (!/^1[3|4|5|7|8]\d{9}$/.test(this.formData.telephone)) {
        Toast('请输入正确的手机号');
        return;
      }
      Service.saveOrder({
        ticket: this.ticket,
        temporaryId: this.temporaryId,
        orderNo: this.formData.name,
        telephone: this.formData.telephone
      }, result => {
        if (result.success) {
          that.$router.push('/modern/success?orderId=' + result.data);
        } else {
          MessageBox({
            title: '',
            message: result.message
          })
        }
      });
    }
  }
}
</script>
<style scoped>
.order {
  padding-top: 1rem;
}

.line {
  display: flex;
  display: -webkit-flex;
  margin-top: 1.5rem;
  padding: 0 0.267rem;
}

.logo {
  width: 5rem;
  text-align: center;
  margin: 0 auto;
}

.logo img {
  width: 100%;
}

.line .icon {
  height: 1.5rem;
  width: 2.22rem;
}

.line .icon img {
  height: 100%;
  width: 100%;
}

.line input {
  width: 7.24rem;
  height: 1.4rem;
  border: 2px solid #cbcbcb;
  border-left: none;
  padding-left: 0.5rem;
  background: #f0eff5;
}

.bottom {
  height: 1.267rem;
  border-top: 2px solid #cccbd0;
  margin-top: 2.387rem;
}

.completeBtn {
  display: block;
  background: #f87873;
  color: #fff;
  text-align: center;
  height: 1.2rem;
  line-height: 1.2rem;
  width: 9.33rem;
  border-radius: 1.2rem;
  margin: 0.5rem auto 0;
}

.upcase {
  text-transform: uppercase;
}

.support {
  width: 100%;
  color: #F87873;
  text-align: center;
  margin-top: 1rem;
}

.support p {
  margin-right: .2rem;
}
</style>
