<template>
  <div class="detail">
    <section class="bar-footer">
      <footer>
        <a href="javascript:;" class="makeBtn" @click="makeEvent">马上制作</a>
      </footer>
    </section>
    <section class="bar-content" style="bottom: 0;">
      <section class="main">
        <template v-for="item in imgList">
          <img :src="item" alt="">
        </template>
      </section>
    </section>
  </div>
</template>
<script>
  import Service from 'service/service'
  export  default{
    name: 'productDetail',
    data(){
      return {
        productId: this.$router.currentRoute.query.id,
        appId: this.$router.currentRoute.query.appid,
        imgList: []
      }
    },
    created(){
      this.fetchDetailData();
    },
    methods: {
      fetchDetailData(){
        let that = this;
        Service.getProductDetail({
          id: this.productId
        }, result => {
          if (result.success) {
            that.imgList = result.data;
          }
        });
      },
      makeEvent(e){
        e.preventDefault();
        //开始注册相簿编辑器
        let that = this;
        Service.registerAlbumSDK({
          ticket: this.config.ticket,
          platProductId: this.productId,
          shareImg: false,
          publish: false,
          backUrl: '/base/order'
        }, result => {
          if (result.success) {//注册成功,跳转
            that.$router.push('/editor/template?appid=' + that.appId)
          }
        });
      }
    }
  }
</script>
<style scoped>
  .main {
    width: 100%;
    max-height: 100%;
  }

  .detail img {
    width: 100%;
  }

  footer {
    width: 100%;
    line-height: 1.2rem;
    background: rgba(225, 225, 225, 0.5);
    text-align: center;
  }

  .makeBtn {
    width: 60%;
    margin: 0.1rem auto 0;
    height: 1rem;
    border: 1px solid #000000;
    display: block;
    border-radius: 1rem;
  }
</style>
