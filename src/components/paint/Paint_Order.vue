<template>
  <div class="work-lib">
    <section class="bar-content">
      <section class="content">
        <div class="order">
          <template v-for="(item,index) in orderList">
            <div class="item">
              <div class="head">
                <span>订单号:{{item.orderNo}}</span>
                <span class="fr" style="margin-right: 0.5rem;color:#E22A32;">{{orderStatus[item.state]}}</span>
              </div>
              <router-link class="body flex" :to="{path:'orderDetail',query:{id:item.id}}">
                <div class="coverImg">
                  <img :src="item.coverImg+'?imageMogr2/thumbnail/750x750'" alt="">
                </div>
                <div class="message">
                  <p style="color: #434245;">{{item.productName}}</p>
                  <p style="color: #878787;">规格:{{item.productSize}} 颜色:{{item.color}}</p>
                  <p style="color: #434245;">¥{{item.price}}*{{item.number}}</p>
                </div>
              </router-link>
              <div class="total">
                <p class="fr">共{{item.number}}件商品 合计:
                  <span style="color: #E5464C;">¥{{(item.totalMoney)}}</span>
                  <span style="color: #A7A7A7;">(含运费¥{{item.logisticsFee}})</span>
                </p>
              </div>
              <div class="buttons">
                <!--<span>xxx</span>-->
                <router-link :to="{path:'orderDetail',query:{id:item.id}}" class="fr">订单详情</router-link>
                <template v-if="item.state == 0">
                  <a href="javascript:;" class="fr" @click="payOrder($event,item.id)">立即支付</a>
                </template>
              </div>
            </div>
          </template>
          <template v-if="orderList.length==0">
            <p class="empty-order">
              暂无订单
            </p>
          </template>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
  import Service from 'service/service'
  export default{
    name: 'workLib',
    data(){
      return {
        appId: this.$router.currentRoute.query.appid,
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
          "5": "处理中"
        }
      }
    },
    created(){
      this.fetchOrderListData();
    },
    methods: {
      fetchOrderListData(){
        let that = this;
        console.log(this.config.ticket)
        Service.getPaintOrderList({
          ticket: this.config.ticket
        }, result => {
          if (result.success) {
            console.log(result)
            that.orderList = result.data;
          }
        });
      },
      payOrder(e, orderId){
        e.preventDefault();
        this.$router.push('/paint/pay?orderId=' + orderId);
      }
    }
  }
</script>
<style scoped>

  .work-lib {
    width: 100%;
    height: 100%;
  }

  .work-lib.bg {
    background: #EFEDED;
  }

  .work-lib .content {

  }

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
    margin-top: 0.2rem;
  }

  .order .item {
    margin-bottom: 0.3rem;
    background: #ffffff;
  }

  .order .item .head {
    height: 0.893rem;
    line-height: 0.893rem;
    padding-left: 0.3rem;
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

  .order .item .total, .order .item .buttons {
    height: 1rem;
    line-height: 1rem;
    border-bottom: 1px solid #ebebeb;
    padding-left: 0.3rem;
  }

  .order .item .buttons > a {
    color: #E44046;
    border: 1px solid #E44046;
    border-radius: 5px;
    margin-right: 0.2rem;
    height: 0.667rem;
    line-height: 0.667rem;
    padding: 0 0.3rem;
    margin-top: 0.1665rem;
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
</style>
