<template lang="html">
  <section class="show-detail">
    <section class="bar-footer">
      <footer>
        <a :href="'tel:'+kfTelephone"><img src="../../assets/images/show/icon-tel.png" alt="">客服热线</a>
        <a href="javascript:;" @click="jumpMyOrder"><img src="../../assets/images/show/icon-record.png" alt="">我的订单</a>
      </footer>
    </section>
    <section class="bar-content">
      <template v-for="item in imgList">
        <img :src="item" alt="" class="detail-img">
      </template>
      <a href="javascript:;" class="makenBtn" v-if="!status.isMaken" @click="handleEntrance">
        <template v-if="!status.isAttend">报名制作</template>
        <template v-else>
          <template v-if="status.showPayment">选择支付</template>
          <template v-else>继续制作</template>
        </template>
      </a>
      <!-- 底部按钮 -->
    </section>
    <section class="dialog" v-show="showDialog">
      <img src="../../assets/images/show/bg-tanchuang@2x.png" alt="" class="title-bg">
      <p class="title f18">填信息领红包</p>
      <a href="javascript:;" class="close" @click="showDialog=false">
        <img src="../../assets/images/show/icon_guanbi@3x.png" alt="">
      </a>
      <div>
        <input type="text" placeholder="请输入姓名" v-model="name" maxlength="20">
      </div>
      <div>
        <input type="text" placeholder="请输入手机号" v-model="telephone" maxlength="11">
      </div>
      <a href="javascript:;" class="button" @click="baoming">确定</a>
    </section>
    <div class="layer" v-show="showDialog"></div>
  </section>
</template>
<script>
import ShowService from 'service/showService'
import Service from 'service/service'
export default {
  data() {
      return {
        showDialog: false,
        name: '',
        appId: this.$router.currentRoute.query.appid,
        telephone: '',
        imgList: [],
        status: {
          isMaken: true
        },
        kfTelephone: ''
      }
    },
    created() {
      this.fetchProductDetail();
      this.fetchUserStatus();
    },
    methods: {
      fetchProductDetail() {
        ShowService.getProductDetail({
          ticket: this.config.ticket
        }, result => {
          if (result.success) {
            this.imgList = result.data.list;
            this.kfTelephone = result.data.kfTelephone;
          }
        });
      },
      fetchUserStatus() {
        let that = this;
        ShowService.getUserInfoStatus({
          ticket: this.config.ticket
        }, result => {
          if (result.success) {
            that.status = result.data;
          }
        });
      },
      handleEntrance(e) {
        e.preventDefault();
        if (this.status.isAttend) {
          if (this.status.showPayment) {
            //选择支付
            this.$router.push('/show/paytype?appid=' + this.appId);
          } else {
            //继续制作-注册编辑器
            this.registerEditor();
          }
        } else {
          //未报名
          this.showDialog = true;
        }
      },
      baoming(e) {
        e.preventDefault();
        if ('' == this.name) {
          this.$toast('请输入姓名');
          return;
        }
        if ('' == this.telephone) {
          this.$toast('请输入手机号码')
          return;
        }

        if (!this.utils.isTelephone(this.telephone)) {
          this.$toast('请输入正确的手机号码');
          return;
        }
        ShowService.postBMData({
          ticket: this.config.ticket,
          telephone: this.telephone,
          name: this.name
        }, result => {
          console.log(result);
          if (result.success) {
            this.$router.push('/show/paytype?appid=' + this.appId);
          }
        });

      },
      registerEditor() {
        Service.registerAlbumSDK({
          ticket: this.config.ticket,
          backUrl: '/show/order',
          shareImg: false,
          publish: false
        }, result => {
          console.log(result);
          if (result.success) { //注册成功,跳转
            location.href = location.origin + location.pathname + '#/editor/template?appid=' + this.appId;
          }
        });
      },
      jumpMyOrder(e) {
        e.preventDefault();
        this.$router.push('/show/orderList?appid=' + this.appId);
      }
    }
}
</script>
<style lang="scss">
.show-detail {
  width: 100%;
  .detail-img {
    width: 100%;
  }
  .makenBtn {
    width: 2.92rem;
    height: 1.133rem;
    line-height: 1.133rem;
    background: #ffac2a;
    color: #fff;
    text-align: center;
    border-radius: 1.133rem;
    position: fixed;
    bottom: 3rem;
    right: -0.467rem;
    overflow: hidden;
  }
  .bar-footer {
    height: 1.453rem;
    footer {
      width: 100%;
      height: 1.453rem;
      background: #fff;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      &>a {
        width: 49%;
        height: 100%;
        line-height: 1.453rem;
        text-align: center;
        color: #22aceb;
        img {
          width: 0.507rem;
          position: relative;
          top: 0.133rem;
          right: 0.133rem;
        }
        &:first-child {
          border-right: 1px solid #ebebeb;
        }
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
