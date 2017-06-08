<template>
  <div class="work-lib" style="background: #ffffff;">
    <section class="content">
      <div class="work flex"
           v-infinite-scroll="loadMore"
           :infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <template v-for="(item,index) in workList">
          <div class="item" @click="goToPreview($event,item.albumId)">
            <img :src="item.albumImg+'?imageMogr2/thumbnail/750x750'" alt="">
            <div class="info f12">
              <p>{{item.albumName}}</p>
              <p style="color: #4B9B9E">{{item.createtime}}</p>
            </div>
          </div>
          <template v-if="index%3 ==2 || index==workList.length-1">
            <img src="../../assets/images/icon/icon-shelf.png" alt="" class="book-shelf">
          </template>
        </template>
        <template v-if="workList.length ==0">
          <div class="empty-workLib">
            <img src="../../assets/images/icon/icon-empty.png" alt="">
            <p>作品库空空如也</p>
            <p>去做几本相簿吧!</p>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>
<script>
  import Service from 'service/service'
  export default{
    name: 'workLib',
    data(){
      return {
        ticket: this.config.ticket,
        appId: this.$router.currentRoute.query.appid,
        tabIndex: undefined == this.$router.currentRoute.query.tab ? 1 : this.$router.currentRoute.query.tab,
        pageNum: 1,
        pageSize: 10,
        loading: true,
        loadingOver: false,
        workList: [],
        orderList: []
      }
    },
    created(){
    },
    methods: {
      loadMore(){
        this.loading = true;
        if (this.loadingOver)return;
        let that = this;
        Service.getWorkLibList({
          ticket: this.ticket,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }, result => {
          if (result.success) {
            if (result.data.length == 0) {
              that.loadingOver = true;
              return;
            }
            for (let i = 0; i < result.data.length; i++) {
              that.workList.push(result.data[i]);
            }
            that.pageNum++;
          }
        });
      },
      goToPreview(e, albumId){
        e.preventDefault();
        this.$router.push('/common/previewer?appid=' + this.appId + '&albumId=' + albumId + '&cfrom=Modern');
      }
    },
    mounted(){
      this.$nextTick(function () {
//        this.loadMore();
      });
    }
  }
</script>
<style scoped>
  .work-lib {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 0.5rem;
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
    border-bottom: 1px solid #cccccc;
    text-align: center;
    position: fixed;
    top: 0;
  }

  .tab > a {
    width: 49.5%;
    display: block;
    color: #929292;
    flex: 1;
    -webkit-flex: 1;
  }

  .tab > a.active {
    color: #000000;
    font-weight: bold;
  }

  .tab > a:first-child {
    /*border-right: 1px solid #929292;*/
  }

  .work {
    width: 100%;
    flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    /*padding-top: 0.5rem;*/
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
  }

  .order .item {
    margin-bottom: 0.5rem;
    background: #ffffff;
  }

  .order .item .head {
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.3rem;
  }

  .order .item .body {
    padding: 0.3rem;
    border-bottom: 1px solid #ebebeb;
  }

  .order .item .body .coverImg {
    width: 40%;
    margin-right: 0.3rem;
  }

  .order .item .body .coverImg img {
    width: 100%;
  }

  .order .item .body .message > p {
    margin-bottom: 0.3rem;
  }

  .order .item .total {
    padding-right: 0.3rem;
  }

  .order .item .total, .order .item .buttons {
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #ebebeb;
    padding-left: 0.3rem;
  }

  .order .item .buttons > a {
    color: #E44046;
    border: 1px solid #E44046;
    border-radius: 5px;
    margin-right: 0.4rem;
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    margin-top: 0.2rem;
  }

  .empty-workLib {
    width: 100%;
    text-align: center;
    color: #AFB0B8;
  }

  .empty-workLib img {
    width: 4rem;
    margin-top: 3.5rem;
  }

  .empty-workLib p {
    margin-top: 1rem;
  }

  .empty-workLib p:last-child {
    margin-top: 0.5rem;
  }
</style>
