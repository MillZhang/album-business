<template>
  <section class="show-index">
    <section class="bar-footer">
      <footer class="footer">
        <img src="../../assets/images/show/button_lijibaoming@2x.png" alt="">
        <a href="javascript:;" @click="signUp" class="button">
          <template v-if="!status.isAttend">立即报名</template>
          <template v-else>
            <template v-if="status.isMaken">查看订单</template>
            <template v-if="!status.isMaken">立即制作</template>
          </template>
        </a>
      </footer>
    </section>
    <section class="bar-content">
      <!--banner图位置 -->
      <div class="banner">
        <img :src="bannerUrl" alt="">
      </div>
      <section class="show-block1">
        <!--翻页预览 -->
        <div class="part preview">
          <div class="title">记录生活每一天</div>
          <div class="flipbook-viewport">
            <div class="container">
              <div class="flipbook">
                <!-- Next button -->
                <div ignore="1" class="next-button"></div>
                <!-- Previous button -->
                <div ignore="1" class="previous-button"></div>
                <template v-for="(item,n) in photoList">
                  <div class="block animated" :data-index="n" v-if="n>1">
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
              </div>
            </div>
          </div>
        </div>
        <!--点赞位 -->
        <div class="part zan">
          <p>共<span style="color:#71cce5;margin: 0 0.133rem;">{{status.laudNum}}</span>位好友点赞</p>
          <p style="margin-top: 0.333rem;">还需要<span style="color:#71cce5;">{{(10-status.laudNum)>0?(10-status.laudNum):0}}</span>位好友点赞</p>
          <a href="javascript:;" class="button" @click="handleZan">
            <template v-if="status.isMyself">
              <img src="../../assets/images/show/button_fengxiang@2x.png" alt="">
            </template>
            <template v-else>
              <template v-if="!status.isLaud">
                <img src="../../assets/images/show/button_lijizanwo@2x.png" alt="">
              </template>
              <template v-else>
                <img src="../../assets/images/show/button_yizan@2x.png" alt="">
              </template>
            </template>
          </a>
        </div>
      </section>
      <section class="show-block2">
        <!-- 流程-->
        <div class="part" style="border-top: none;padding-bottom: 1.333rem;">
          <div class="title">DIY相册领取流程</div>
          <div class="lc-content">
            <div class="item">
              <img src="../../assets/images/show/img_step1@2x.png" alt="">
              <p>第一步</p>
              <p>报名填写资料</p>
            </div>
            <div class="item">
              <img src="../../assets/images/show/img_step2@2x.png" alt="">
              <p>第二步</p>
              <p>上传照片</p>
            </div>
            <div class="item">
              <img src="../../assets/images/show/img_step3@2x.png" alt="">
              <p>第三步</p>
              <p>分享朋友圈集赞</p>
            </div>
          </div>
        </div>
        <div class="part">
          <div class="title">分享返利</div>
          <div class="info-content">
            <p>报名成功后、分享此链接至朋友圈</p>
            <p>邀请好友一起DIY相册</p>
            <p class="bold">好友成功报名后,即可得到现金奖励</p>
            <p class="bold f16" style="margin-top:0.507rem;">微信钱包直接到账</p>
            <img src="../../assets/images/show/img_money@2x.png" alt="">
          </div>
        </div>
        <!--排行榜-->
        <div class="part rank" style="border-top: none;padding-bottom: 0.267rem;">
          <div class="title">分享返现排行榜</div>
          <section class="body">
            <ul class="inner">
              <template v-for="(item,index) in rankList">
                <li>
                  <span>第{{index+1}}名:</span>
                  <img class="photo" :src="item.photo" alt="">
                  <span class="name">{{item.name}}</span>
                  <img class="jb" src="../../assets/images/show/icon_jinbi@3x.png" alt="">
                  <span>{{item.money}}元</span>
                </li>
              </template>
            </ul>
          </section>
        </div>
        <div class="flow">
          <template v-for="item in adList">
            <img :src="item" alt="">
          </template>
        </div>
      </section>
    </section>
  </section>
</template>
<script>
import $ from 'jquery'
import WxUtils from 'jsPath/tool/WxUtils'
import Service from 'service/service'
import canvas from 'jsPath/module/TeamModel'
import ShowService from 'service/showService'
import 'jsPath/tool/scrollText'
require('jsPath/lib/turn.min.js')
export default {
  data() {
      return {
        ticket: this.config.ticket,
        appId: this.$router.currentRoute.query.appid,
        photoList: [],
        shareData: {
          name: '',
          desc: '',
          title: '',
          logo: ''
        },
        status: {},
        bannerUrl: '',
        adList: [],
        rankList: [],
        editorWidth: window.innerWidth * .4,
        editorHeight: window.innerWidth * .4 * 1,
      }
    },
    created() {
      WxUtils.wxShowMenu();
      this.fetchSystemData();
      this.fetchRankData();
      this.fetchUserStatus();

    },
    mounted() {
      console.log($('.next-button'))
      $('.next-button').off('touchend').on('touchend', function(e) {
        e.preventDefault();
        $('.flipbook').turn('next');
      });

      $('.previous-button').off('touchend').on('touchend', function(e) {
        e.preventDefault();
        console.log('2222')
        $('.flipbook').turn('previous');
      });
    },
    methods: {
      fetchSystemData() {
        let that = this;
        ShowService.getIndexMessage({
          ticket: this.ticket
        }, result => {
          if (result.success) {
            App.config.photoList = JSON.parse(result.data.jsondata);
            App.config.layoutList = JSON.parse(result.data.layoutJson);
            that.shareData.title = result.data.shareTitle;
            that.shareData.name = result.data.name;
            that.shareData.desc = result.data.shareDesc;
            that.shareData.logo = result.data.shareLogo;
            that.shareData.aid = result.data.aid;
            that.bannerUrl = result.data.bannerUrls;
            that.adList = result.data.list;
            that.photoList = App.config.photoList;
            that.editorHeight = that.editorWidth / canvas.getImageRadio();
            that.initWXConfig();
            that.initMaganize();
          }
        });
      },
      fetchRankData() {
        ShowService.getRankList({
          ticket: this.ticket
        }, result => {
          if (result.success) {
            this.rankList = result.data;
            this.$nextTick(() => {
              $('.rank .body').myScroll();
            });
          }
        });
      },
      fetchUserStatus() {
        let that = this;
        ShowService.getUserInfoStatus({
          ticket: this.ticket
        }, result => {
          if (result.success) {
            that.status = result.data;
          }
        });
      },
      templateStyle(n) {
        return 'background:url(' + canvas.getTemplateImage(n) + ') center no-repeat;background-size:cover';
      },
      photoItemStyle(index, imageIndex) {
        return canvas.setEitorPage(index, imageIndex, this.editorWidth, false);
      },
      signUp(e) {
        e.preventDefault();
        if (this.isMaken) {

        } else {
          this.$router.push('/show/detail?appid=' + this.appId)
        }
      },
      handleZan() {
        let that = this;
        if (!this.status.isLaud) {
          ShowService.postZanData({
            ticket: this.ticket
          }, result => {
            if (result.success) {
              that.status.isLaud = true;
              that.status.laudNum += 1;
            }
          });
        }
      },
      initWXConfig() {
        //初始微信
        console.log('start init wx config')
          // WxUtils.wxShowMenu();
        if (undefined == this.appId || null == this.appId || '' == this.appId) return;
        WxUtils.wxShare({
          title: this.shareData.title,
          desc: this.shareData.desc,
          link: location.origin + '/synergy/wxbridge/index?appid=' + this.appId + '&cfrom=Show&aid=' + this.shareData.aid,
          image: this.shareData.logo
        });
      },
      initMaganize() {
        this.$nextTick(() => {
          $('.flipbook').turn({
            width: this.editorWidth * 2,
            height: this.editorHeight,
            gradients: true,
            autoCenter: false,
            elevation: 50,
            when: {
              turning: function(e, page, view) {
                var book = $(this),
                  currentPage = book.turn('page'),
                  pages = book.turn('pages');
              },
              start: function(e, pageObj) {
                console.log('start')
              }
            }
          });
        });
      }
    }
}
</script>
<style scoped lang="scss">
.show-index {
  .bar-content {
    /*background: #e4eff7;*/
  }
  .banner {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .part {
    width: 100%;
    border-top: 1px dashed #3d598b;
    padding-top: 0.67rem;
    text-align: center;
    .title {
      padding: 0.067rem 0.267rem;
      display: inline-block;
      height: 0.613rem;
      text-align: center;
      line-height: 0.613rem;
      margin: 0 auto;
      background: #71cce5;
      color: #fff;
      position: relative;
      &:before {
        content: "";
        width: 1.52rem;
        height: 1px;
        background: #3d598b;
        position: absolute;
        top: -.11rem;
        left: -.3rem;
      }
      &:after {
        content: "";
        width: 1px;
        height: 0.88rem;
        background: #3d598b;
        position: absolute;
        top: -.3rem;
        left: -.11rem;
      }
    }
  }
  .flipbook-viewport {
    margin-top: 1rem;
    background: url('../../assets/images/show/beijing.png') center no-repeat;
    background-size: contain;
    height: 5rem;
    .flipbook {
      top: 0.42rem;
      left: 1rem;
      .next-button {
        width: 50%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 100;
      }
      .previous-button {
        width: 50%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
      }
    }
    .pageDiv {
      width: 100%;
      height: 100%;
    }
    .templateDiv {
      width: 100%;
      height: 100%;
    }
  }
  .zan {
    width: 5.2rem;
    height: 3.16rem;
    margin: 1.333rem auto 0;
    border: 0.067rem solid #71cce5;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    .button {
      width: 2.467rem;
      height: 2.467rem;
      display: block;
      border-radius: 50%;
      position: absolute;
      left: 25%;
      top: 2.16rem;
      img {
        width: 100%;
      }
    }
  }
  .rank {
    width: 100%;
    margin-top: 0.933rem;
    padding-top: 0;
    .body {
      width: 8.83rem;
      height: 8.65rem;
      margin: 1.07rem auto 0;
      border: 0.267rem solid #3d598b;
      border-radius: 0.1rem;
      overflow: hidden;
      .inner {
        width: 8.83rem;
        height: auto;
        margin: 0 auto;
        background: #71cce5;
        border-radius: 0.1rem;
        list-style: none;
        overflow: hidden;
        webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
        li {
          display: flex;
          align-items: center;
          height: 1.49rem;
          padding-left: 0.47rem;
          color: #fff;
          border-bottom: 1px solid #92ddf1;
          .photo {
            width: 1.067rem;
            height: 1.067rem;
            border-radius: 50%;
            margin: 0 0.333rem;
          }
          .jb {
            width: 1.013rem;
            margin: 0 0.133rem;
          }
          .name {
            margin: 0 0.067rem;
            max-width: 1.333rem;
          }
        }
      }
    }
  }
  .info-content {
    background: #3d598b;
    width: 8.78rem;
    height: 3.13rem;
    margin: 1.2rem auto 0;
    padding: 0.33rem 0.3rem;
    /*box-sizing: border-box;*/
    color: #fff;
    position: relative;
    z-index: 2;
    text-align: left;
    img {
      width: 2.473rem;
      height: 2.053rem;
      position: absolute;
      right: 0.267rem;
      top: 0.667rem;
      z-index: 1;
    }
    .bold {
      font-weight: bold;
    }
  }
  .lc-content {
    display: flex;
    margin-top: 1.2rem;
    .item {
      width: 33%;
      text-align: center;
      img {
        width: 1.533rem;
        height: 2.84rem;
      }
    }
  }
  .flow {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .bar-footer {
    height: 1.23rem;
    .footer {
      width: 100%;
      height: 1.23rem;
      z-index: 1000;
      transform: translate3d(0, 0, 0);
      img {
        width: 100%;
      }
      .button {
        width: 30%;
        height: 100%;
        line-height: 1.23rem;
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
        text-align: center;
      }
    }
  }
  .show-block1 {
    background: url(../../assets/images/show/bg_1.jpg) center no-repeat;
    background-size: cover;
    padding-bottom: 2.235rem;
  }
  .show-block2 {
    background: url(../../assets/images/show/bg_2.jpg) center repeat-y;
    background-size: contain;
  }
}
</style>
