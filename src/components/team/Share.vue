<template>
  <div class="sharePage">
    <section class="bar-footer">
      <div class="bottom">
        <template v-if="shareData.state==1">
          <a href="javascript:;" @click="publishEvent">立即分享</a>
          <a href="javascript:;" @click="makeEvent">立即领取</a>
        </template>
        <template v-if="shareData.state==2">
          <a href="javascript:;" @click="makeEvent">我要制作</a>
        </template>
        <template v-if="shareData.state==3">
          <a href="javascript:;" @click="goOrderList">查看订单</a>
          <a href="javascript:;" @click="goProductList">我也要发布</a>
        </template>
        <template v-if="shareData.state==4">
          <a href="javascript:;" class="outdate">活动已过期,您也可以</a>
          <a href="javascript:;" @click="goProductList">我也要发布</a>
        </template>
      </div>
    </section>
    <section class="bar-content">
      <section class="preview" :style="{height:editorHeight*1.5+'px'}">
        <router-link :to="{path:'help',query:{appid:appId,temporaryId:temporaryId}}" class="help">
          <img src="../../assets/images/icon/icon-help.png" alt="">
        </router-link>
        <p class="s-tip f12">点击左右翻页预览</p>
        <template v-for="(item,n) in photoList">
          <div class="block animated flipbook"
               :style="{'z-index':getImageIndex(n)}"
               :data-index="n"
               :class="{last:n==(photoList.length-1),first:n==0}"
               @touchstart="turnPage">
            <div class="edit" href="javascript:;" :data-page="n" :style="{height:editorHeight+'px'}">
              <div class="pageDiv">
                <div class="templateDiv" :style="templateStyle(n)"></div>
                <template v-for="(imageItem,imageIndex) in item.list">
                  <div class="photoDiv" :style="photoItemStyle(n,imageIndex)"></div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </section>
      <section class="s-block">
        <div class="title">
          活动信息
        </div>
        <div class="line">
          <label>活动发起人</label>
          <p>{{shareData.sponsor}}</p>
        </div>
        <div class="line">
          <label>结束时间</label>
          <p>{{shareData.endTime}}</p>
        </div>
        <div class="line">
          <label>相册名称</label>
          <p>{{shareData.productName}}</p>
        </div>
        <div class="line">
          <label>选用模板</label>
          <p>{{shareData.templateName}}</p>
        </div>
        <div class="line">
          <label>价格</label>
          <p>{{shareData.price}}元</p>
        </div>
      </section>
      <section class="s-block">
        <div class="title">活动介绍</div>
        <p class="content">{{shareData.remark}}</p>
      </section>
      <section class="s-block" style="margin-bottom: 0.5rem">
        <div class="title">参与者</div>
        <p class="content">
          <template v-if="shareData.userList.length==0">
            还没有小伙伴参加哦~
          </template>
          <template v-else>
            {{shareListStr}}
          </template>
        </p>
      </section>
      <!--<p class="center" style="color: #717171;margin: 0.2rem;">这是一本未完成相册,领取后您可以继续编辑哦!</p>-->
    </section>
    <div class="layer" v-show="shareTip||showInput"></div>
    <div class="shareTip" v-show="shareTip">
      <img src="../../assets/images/share-tip.png" alt="">
    </div>
    <a href="javascript:;"
       v-show="shareTip"
       @click="shareTip=!shareTip"
       class="knowButton">我知道了</a>
    <div class="s-input-edit" v-show="showInput">
      <div class="header">
        <img src="../../assets/images/p-header.png" alt="" class="p-header-image">
      </div>
      <div class="content">
        <input type="text" placeholder="请输入您的姓名" maxlength="10" v-model="name">
        <p class="tip">为了方便大家看您上传的照片哦!</p>
        <a href="javascript:;" class="saveName" @click="receiveAlbum">保存</a>
      </div>
    </div>
    <div class="close" @click="showInput=false" v-show="showInput">
      <img src="../../assets/images/icon/icon-cha.png" alt="">
    </div>
  </div>
</template>
<script>
  import WxUtils from 'jsPath/tool/WxUtils'
  import Service from 'service/service'
  import canvas from 'jsPath/module/TeamModel'
  import {Toast} from 'mint-ui'
  export default{
    name: 'sharePage',
    data(){
      return {
        temporaryId: this.$router.currentRoute.query.temporaryId,
        ticket: this.config.ticket,
        appId: this.$router.currentRoute.query.appid,
        shareData: {
          userList: []
        },
        shareListStr: '',
        photoList: [],
        editorWidth: window.innerWidth * .5,
        editorHeight: window.innerWidth * .5 * 1,
        shareTip: false,
        showInput: false,
        name: ''
      }
    },
    created(){
      WxUtils.wxShowMenu();
      WxUtils.wxShare({
        title: '青春物语毕业纪念册',
        desc: '时光能缓  我们不散.让我们一起共同编辑一本毕业纪念册。',
        link: location.origin + '/synergy/join/share?temporaryId=' + this.temporaryId,
        image: 'http://template.cache.timepack.cn/sharelogo.png'
      });
      this.fetchSharaData();
      this.fetchJsonData();
    },
    mounted(){
      WxUtils.init();
      WxUtils.wxShare({
        title: '青春物语毕业纪念册',
        desc: '时光能缓  我们不散.让我们一起共同编辑一本毕业纪念册。',
        link: location.origin + '/synergy/join/share?temporaryId=' + this.temporaryId,
        image: 'http://template.cache.timepack.cn/sharelogo.png'
      });
    },
    methods: {
      fetchSharaData(){
        let that = this;
        Service.getShareData({
          temporaryId: this.temporaryId,
          ticket: this.ticket
        }, result => {
          if (result.success) {
            that.shareData = result.data;
            that.shareListStr = result.data.userList.join(',');
          }
        })
      },
      fetchJsonData(){
        let that = this;
        Service.getActivityAlbum({
          temporaryId: this.temporaryId
        }, result => {
          if (result.success) {
            App.config.photoList = JSON.parse(result.data.albumJson);
            App.config.layoutList = JSON.parse(result.data.layoutJson);
            that.photoList = App.config.photoList;
            that.editorHeight = that.editorWidth / canvas.getImageRadio();
          }
        });
      },
      turnPage(e){
        e.preventDefault();
        this.showTip = false;
        if (e.targetTouches.length === 1) {
          let touch = e.targetTouches[0];
          let $container = $(e.target).parents('.block'),
            index = $container.attr('data-index');
          if (touch.clientX < (window.innerWidth / 2)) {//回翻
            if (index == 1) {
              $container.parent().find('.last')
                .removeClass('turnLeftAnimation').addClass('turnRightAnimation');
            } else if (index == 2) {
              $container.parent().find('.first')
                .removeClass('turnLeftAnimation').addClass('turnRightAnimation');
            } else {
              $container.prev().removeClass('turnLeftAnimation').addClass('turnRightAnimation');
            }
          } else {//前翻
            if (index <= (this.photoList.length - 1) && index != 1) {
              $container.removeClass('turnRightAnimation').addClass('turnLeftAnimation');
            }
          }
        }
      },
      getImageIndex(n){
        if (n == 0) {
          //封面
          return 1000;
        } else if (n == 1) {
          //封底
          return 1000 - this.photoList.length;
        } else {
          return 1000 - n;
        }
      },
      publishEvent(e){
        e.preventDefault();
        this.shareTip = true;
      },
      makeEvent(e){
        e.preventDefault();
        if (this.shareData.state == 1) {
          this.showInput = true;
        } else {
          this.setAlbumEditor();
        }
      },
      receiveAlbum(e){
        e.preventDefault();
        let that = this;
        if (this.name.trim() == '') {
          Toast('必需要输入姓名哦');
          return;
        }
        Service.receiveAlbum({
          temporaryId: this.temporaryId,
          ticket: this.ticket,
          name: this.name
        }, result => {
          that.setAlbumEditor();
        });
      },
      goOrderList(e){
        e.preventDefault();
        this.$router.push('/team/worklib?appid=' + this.appId + '&tab=2');
      },
      goProductList(e){
        e.preventDefault();
        this.$router.push('/team/list?appid=' + this.appId);
      },
      setAlbumEditor(){
        let that = this;
        let backUrl = '';
        if (this.shareData.contactsSetting) {
          backUrl = '/team/mail';
        } else {
          backUrl = '/team/order';
        }
        Service.registerAlbumSDK({
          ticket: this.ticket,
          temporaryId: this.temporaryId,
          shareImg: true,
          publish: false,
          backUrl: backUrl
        }, result => {
          if (result.success) {//注册成功,跳转
            that.$router.push('/editor/global?temporaryId=' + this.temporaryId + '&appid=' + this.appId);
          }
        });
      },
      templateStyle(n){
        return 'background:url(' + canvas.getTemplateImage(n) + ') center no-repeat;background-size:cover';
      },
      photoItemStyle(index, imageIndex){
        return canvas.setEitorPage(index, imageIndex, this.editorWidth, false);
      }
    }
  }
</script>
<style scoped>

  .preview {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: relative;
    perspective: 1000px;
  }

  .preview .help {
    width: 0.6rem;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    z-index: 100;
  }

  .preview .help img {
    width: 100%;
  }

  .preview .block {
    width: 50%;
    margin: 0 auto;
    position: absolute;
    top: 15%;
    left: 25%;
  }

  .preview .block img {
    width: 100%;
  }

  .preview .block .edit .pageDiv {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .preview .block .edit .pageDiv .templateDiv {
    width: 100%;
    height: 100%;
  }

  .preview .block .edit {
    width: 100%;
    display: block;
    position: relative;
    z-index: 999;
  }

  .sharePage {
    background: #ededed;
    height: 100%;
  }

  .preview {
    height: 6.933rem;
    width: 100%;
    background: url("../../assets/images/pagebg.jpg") center no-repeat;
    background-size: cover;
  }

  .s-block {
    background: #ffffff;
    width: 100%;
    margin-top: 0.3333rem;
    box-sizing: border-box;
  }

  .s-block .title {
    height: 0.867rem;
    line-height: 0.867rem;
    border-bottom: 1px solid #dbdbdb;
    padding: 0 0.6rem;
    position: relative;
    color: #191A1A;
  }

  .s-block .title:before {
    content: '';
    display: block;
    width: 0.12rem;
    height: 0.3rem;
    background: #F87873;
    position: absolute;
    top: 0.28rem;
    left: 0.22rem;
  }

  .s-block .line {
    height: 1rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 0 0.6rem;
  }

  .s-block .line > label {
    width: 50%;
    text-align: left;
    color: #8E8E8E;
  }

  .s-block .line > p {
    width: 50%;
    text-align: right;
  }

  .s-block .content {
    padding: 0.3rem 0.6rem;
    color: #8E8E8E;
  }

  .bottom {
    display: flex;
    display: -webkit-flex;
    width: 100%;
  }

  .bottom > a {
    flex: 1;
    -webkit-flex: 1;
    display: block;
    height: 1.12rem;
    line-height: 1.12rem;
    color: #E33E45;
    background: #ffffff;
    border-top: 1px solid #CCCBD0;
    border-right: 1px solid #CCCBD0;
    text-align: center;
  }

  .bottom .outdate {
    flex: 2;
    -webkit-flex: 2;
    background: #C1C1C1;
    color: #ffffff;
  }

  .layer {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 99999;
    background: rgba(0, 0, 0, 0.5);
  }

  .shareTip {
    position: absolute;
    z-index: 100000;
    top: 0;
    right: 0.5rem;
  }

  .shareTip img {
    width: 8rem;
  }

  .knowButton {
    position: absolute;
    z-index: 100000;
    display: block;
    width: 5rem;
    margin-left: 2.5rem;
    height: 1.2rem;
    line-height: 1.2rem;
    border-radius: 1.2rem;
    background: rgba(255, 255, 255, .6);
    color: #5a5a5a;
    text-align: center;
    bottom: 3rem;
  }

  .s-input-edit {
    width: 8.48rem;
    height: 6.04rem;
    left: 0.667rem;
    top: 2.2533rem;
    border-radius: 0.1rem;
    position: absolute;
    z-index: 100000;
    box-sizing: border-box;
    color: #000000;
    overflow: hidden;
    text-align: center;
  }

  .s-input-edit .header {
    background: transparent;
    font-size: 0;
  }

  .s-input-edit .content {
    background: #ffffff;
    padding-bottom: 0.4rem;
  }

  .s-input-edit input {
    width: 7.08rem;
    height: 1.1333rem;
    background: #ececec;
    color: #bbbbbb;
    margin: 0.467rem auto 0;
    padding-left: 0.667rem;
  }

  .s-input-edit .tip {
    text-align: left;
    width: 7.08rem;
    margin: 0 auto;
    color: #8f8f8f;
    margin-top: 0.333rem;
  }

  .s-input-edit .saveName {
    width: 3.88rem;
    height: 0.8267rem;
    line-height: 0.8267rem;
    border-radius: 0.8267rem;
    text-align: center;
    display: block;
    background: #f97f7b;
    color: #ffffff;
    margin: 0.4rem auto 0;
  }

  .s-input-edit .p-header-image {
    width: 100%;
    height: 2.133rem;
  }

  .close {
    content: '';
    width: 0.6533rem;
    height: 0.6533rem;
    position: absolute;
    z-index: 100000;
    top: 10rem;
    left: 4.45rem;
  }

  .close img {
    width: 100%;
  }

  .s-tip {
    width: 100%;
    color: #644020;
    position: absolute;
    top: 5%;
    text-align: center;
  }
</style>
