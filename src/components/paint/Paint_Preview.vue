<template>
  <div class="paint-preview">
    <div class="p-tab">
      <a href="javascript:;" @click="activeTab=1" :class="{active:activeTab==1}">油画</a>
      <a href="javascript:;" @click="activeTab=2" :class="{active:activeTab==2}">线稿</a>
    </div>
    <div class="p-content">
      <div class="p-yh" v-show="activeTab==1">
        <div class="p-box">
          <img :src="formData.paintingImg" alt="">
        </div>
      </div>
      <div class="p-xg" v-show="activeTab==2">
        <div class="p-box">
          <img :src="formData.lineImg" alt="">
        </div>
      </div>
    </div>
    <div class="p-color">
      <template v-for="(n,index) in formData.colors">
        <div class="item" :style="generateColor(n)">
          <div class="inner">{{index+1}}</div>
        </div>
      </template>
    </div>
    <div class="p-bottom">
      <div class="left">
        <p>{{formData.productName}}/{{formData.productSize}}cm</p>
        <p>原价:<span style="text-decoration:line-through;">¥228.00</span>&nbsp;现价: <span style="color: #ff4a00;">¥{{(formData.price).toFixed(2)}}</span></p>
      </div>
      <div class="right">
        <a href="javascript:;" @click="goBuy">购买</a>
      </div>
    </div>
  </div>
</template>
<script>
  import Service from 'service/service'
  export default{
    data(){
      return {
        activeTab: 1,
        imageKey: this.$router.currentRoute.query.key,
        formData: {
          price: 0
        }
      }
    },
    created(){
      this.fetchPaintData();
    },
    methods: {
      fetchPaintData(){
        let that = this;
        Service.getPaintData({
          ticket: this.config.ticket
        }, result => {
          if (result.success) {
            that.formData = result.data;
          }
        });
      },
      goBuy(e){
        e.preventDefault();
        this.$router.push('/paint/order')
      },
      generateColor(n){
        return {
          background: '#' + n
        }
      }
    }
  }
</script>
<style scoped>
  .paint-preview {
    background: #ffffff;
    height: 100%;
    padding-top: 0.5rem;
    box-sizing: border-box;
  }

  .p-tab {
    display: flex;
    display: -webkit-flex;
    border: 2px solid #333333;
    width: 2.96rem;
    margin-left: 3.52rem;
    border-radius: 0.033rem;
  }

  .p-tab > a {
    width: 1.48rem;
    height: 0.72rem;
    text-align: center;
    line-height: 0.72rem;
    background: #ffffff;
    color: #333333;
  }

  .p-tab > a.active {
    background: #333333;
    color: #ffffff;
  }

  .p-yh, .p-xg {
    width: 7.5rem;
    height: 9.72rem;
    background: url("../../assets/images/paint/4-1.png") center no-repeat;
    background-size: contain;
    margin: 0.5rem auto 0;
    overflow: hidden;
    padding: 0.55rem 0.78rem 0 0.60rem;
    box-sizing: border-box;
    position: relative;
  }

  .p-box {
    position: absolute;
    top: 0.55rem;
    width: 6.1rem;
    height: 8.3rem;
    overflow: hidden;
  }

  .p-box img {
    width: 100%;
  }

  .p-content {

  }

  .p-bottom {
    height: 1.867rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0.43rem 0.47rem;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #eaeaea;
    display: flex;
    display: -webkit-flex;
  }

  .p-bottom .left {
    width: 70%;
  }

  .p-bottom .right {
    text-align: right;
  }

  .p-bottom .right > a {
    display: block;
    width: 2.63rem;
    height: 0.867rem;
    text-align: center;
    line-height: 0.867rem;
    border-radius: 0.13rem;
    background: #ff4a00;
    color: #ffffff;
    margin-left: auto;
  }

  .p-color {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    height: 1.8rem;
    align-items: center;
    -webkit-align-items: center;
    display: flex;
    display: -webkit-flex;
    text-align: center;
    margin-top: 0.37rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }

  .p-color .item {
    width: 1.34rem;
    height: 1.34rem;
    border-radius: 50%;
    position: relative;
    flex-shrink: 0;
    -webkit-flex-shrink: 0;
    margin: 0 0.05rem;
  }

  .p-color .item .inner {
    width: 0.67rem;
    height: 0.67rem;
    text-align: center;
    line-height: 0.67rem;
    background: #ffffff;
    color: #333333;
    border-radius: 50%;
    position: absolute;
    left: 0.335rem;
    top: 0.335rem;
  }
</style>
