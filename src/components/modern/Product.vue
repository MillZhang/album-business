<template>
  <div id="productList">
    <section class="bar-header">
      <header class="header">
        <p>相册制作</p>
        <img class="icon"
             src="../../assets/images/icon/icon-mine.png" alt=""
             @click="goPersonalCenter">
      </header>
    </section>
    <section class="bar-content">
      <section class="main">
        <template v-for="(item,index) in list">
          <div class="item" @click="selectProductEvent($event,item.id)">
            <img :src="item.coverImg+'?imageMogr2/thumbnail/750x750'" alt="">
            <div class="bottom">
              <span class="name">{{item.productName}}</span>
              <span class="price">¥{{item.money.toFixed(2)}}</span>
              <span class="dead">¥{{item.originalPrice.toFixed(2)}}</span>
            </div>
          </div>
        </template>
      </section>
    </section>
  </div>
</template>
<script>
  import Service from 'service/service'
  export default{
    name: 'productList',
    data(){
      return {
        list: [],
        orderCount: 0,
        ticket: this.config.ticket,
        appId: this.$router.currentRoute.query.appid
      };
    },
    created(){
      this.fetchProductListData();
    },
    methods: {
      fetchProductListData(){
        let that = this;
        Service.getProductList({
          ticket: this.ticket
        }, result => {
          if (result.success) {
            that.list = result.data.productList;
            that.orderCount = result.data.count;
          }
        });
      },
      selectProductEvent(e, id){
        e.preventDefault();
        this.$router.push('/modern/detail?appid=' + this.appId + '&id=' + id);
      },
      goPersonalCenter(e){
        e.preventDefault();
        this.$router.push('/modern/worklib?appid=' + this.appId);
      }
    },
    mounted(){
    }
  }
</script>
<style scoped>
  .header {
    background: #fff;
    box-shadow: 0 0 2px #ccc;
    line-height: 1.2rem;
    text-align: center;
    border-bottom: 1px solid #a5a5a5;
  }

  .header .icon {
    position: absolute;
    top: 0.1rem;
    right: 0.4rem;
    width: 0.8rem;
    height: 0.8rem;
  }

  .header .count {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: #D35956;
    color: #ffffff;
    line-height: 0.5rem;
    text-align: center;
    position: absolute;
    right: 0.1rem;
    top: 0;
  }

  .header .tip {
    width: auto;
    position: absolute;
    top: 1rem;
    right: 0.3rem;
    height: 1rem;
  }

  .header .tip .triangle {
    width: 0;
    height: 0;
    border-width: 0 0.2rem 0.23rem;
    border-style: solid;
    border-color: transparent transparent #000;
    opacity: .3;
    position: absolute;
    right: 0.3rem;
    top: -0.23rem;
  }

  .header .tip .content {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .3;
    border-radius: 5px;
  }

  .header .tip .content p {
    position: relative;
    padding: 0 0.2rem;
    color: #fff;
  }

  .main {
    width: 9.64rem;
    margin: 0 auto;
  }

  .main .item {
    border: 1px solid #cccccc;
    margin-top: 0.2267rem;
    border-radius: 0.1rem;
  }

  .main img {
    width: 100%;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
  }

  .main .item .bottom {
    height: 0.96rem;
    line-height: 0.96rem;
    padding: 0 0.2rem;
    display: flex;
    display: -webkit-flex;
    background: #ffffff;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
  }

  .main .item .bottom .name {
    width: 67%;
  }

  .main .item .bottom .right{
    text-align: right;
    width: 33%;
  }

  .main .item .bottom .price {
    margin-right: 2%;
  }

  .main .item .bottom .dead {
    color: #cccccc;
    text-decoration: line-through;
  }
</style>
