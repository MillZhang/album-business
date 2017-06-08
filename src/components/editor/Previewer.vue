<template id="preview">
  <div class="preivew">
    <section class="bar-footer">
      <div class="p-button">
        <router-link :to="{path:'global',query:{appid:appId}}" class="back">返回编辑</router-link>
        <a class="save" @click="saveAlbumEvent">完成</a>
      </div>
    </section>
    <section class="bar-content">
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
      <div class="p-tip-container" :style="{top:tipHeight+'px'}">
        <p class="p-tips">点击左右翻动预览</p>
        <div class="p-state">
          <p class="f12">说明:</p>
          <p class="f12">1.请左右点击相册进行翻页预览,确认上传的每一张照片是在相框最合适的位置;</p>
          <p class="f12">2.如果照片在相框的位置不满意,请点击"返回"到【全局预览】,然后点击照片到【编辑】调整照片;</p>
          <p class="f12">3.点击"完成"按钮以后,相册<span class="f12" style="color: #ff4545;">将无法修改</span></p>
        </div>
        <div class="click-tip" v-show="showTip">
          <img src="../../assets/images/click.gif" alt="">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import Cache from 'jsPath/tool/Cache'
  import canvas from 'jsPath/module/AlbumModel'
  import Service from 'service/service'
  import {
    Toast,
    MessageBox
  } from 'mint-ui';
  export default{
    name: 'album-preview',
    data(){
      return {
        editorWidth: window.innerWidth * .8,
        editorHeight: window.innerWidth * .8 / canvas.getImageRadio(),
        photoList: Cache.photoList().getter(),
        tipHeight: '',
        appId: this.$router.currentRoute.query.appid,
        backCoverImg: '',
        coverImg: '',
        showTip: true
      }
    },
    created(){
      this.fetchAlbumCoverImage();
      this.tipHeight = window.innerHeight * 0.08 + this.editorHeight + 10;
    },
    methods: {
      templateStyle(n){
        return 'background:url(' + canvas.getTemplateImage(n) + ') center no-repeat;background-size:cover';
      },
      photoItemStyle(index, imageIndex){
        return canvas.setEitorPage(index, imageIndex, this.editorWidth, false);
      },
      fetchAlbumCoverImage(){
        let that = this;
        Service.getCoverImageByTempId({
          tempId: Cache.template().getter()
        }, result => {
          if (result.success) {
            that.coverImg = result.data.coverImageUrl;
            that.backCoverImg = result.data.backCoverImageUrl;
          }
        });
      },
      saveAlbumEvent(e){
        e.preventDefault();
        let that = this;
        let photoList = Cache.photoList().getter();
        Service.saveAlbumJson({
          albumJson: JSON.stringify(photoList),
          layoutJson: JSON.stringify(Cache.layout().getter()),
          tempId: Cache.template().getter(),
          ticket: App.config.ticket
        }, result => {
          if (result.success) {
//            Toast('保存成功')
            //saveAlbum为true时,必须做完才能保存
            if (result.data.publish) {
              that.$router.push(result.data.backUrl + '?temporaryId=' + result.data.temporaryId + '&appid=' + that.appId);
            } else {
              that.saveAlbum(result.data.albumJsonId, result.data.temporaryId);
            }
          }
        });
      },
      saveAlbum(jsonId, temporaryId){
        let photoList = Cache.photoList().getter();
        let unInsertedCount = canvas.getRestEmptyCount();
        let that = this;
        if (unInsertedCount == 0) {//保存相簿
          MessageBox({
            title: '友情提示',
            message: '相簿创建后就不可以修改哦<br>是否确认创建相簿?',
            showCancelButton: true
          }).then(action => {
            let layout = Cache.layout().getter()[0];
            let rate = layout.tw / that.utils.getConstant().EditorWidth;
            if (action == 'confirm') {//确认保存
              Service.saveAlbum(photoList, jsonId, rate.toFixed(5), result => {
                if (result.success) {
                  that.$router.push(result.backUrl + '?temporaryId=' + temporaryId + '&appid=' + that.appId);
                }
              });
            }
          });
        } else {
          Toast('您尚未完成编辑,请返回继续编辑')
        }
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
      }
    },
    computed: {}
  }
</script>
<style scoped>
  .preivew {
    width: 100%;
    height: 100%;
    background: url("../../assets/images/bg-4.jpg") center no-repeat;
    background-size: cover;
  }

  .preivew .block {
    width: 80%;
    margin: 0 auto;
    position: absolute;
    top: 8%;
    left: 10%;
  }

  .preivew .block img {
    width: 100%;
  }

  .preivew .block .edit .pageDiv {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .preivew .block .edit .pageDiv .templateDiv {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1000;
  }

  .preivew .block .edit {
    width: 100%;
    display: block;
    position: relative;
    z-index: 999;
  }

  .flipbook {
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -ms-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform-origin: 0 50%;
    -moz-transform-origin: 0 50%;
    -ms-transform-origin: 0 50%;
    -o-transform-origin: 0 50%;
    transform-origin: 0 50%;
    -webkit-transform: rotateY(0deg);
    -ms-transform: rotateY(0deg);
    -o-transform: rotateY(0deg);
    transform: rotateY(0deg);
  }

  .turnLeftAnimation {
    -webkit-animation-name: turnLeft;
    animation-name: turnLeft
  }

  .turnRightAnimation {
    -webkit-animation-name: trunRight;
    animation-name: trunRight
  }

  @keyframes turnLeft {
    0% {
      -webkit-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      -o-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
    50% {
      -webkit-transform: rotateY(-160deg);
      -ms-transform: rotateY(-160deg);
      -o-transform: rotateY(-160deg);
      transform: rotateY(-160deg);
    }
    100% {
      -webkit-transform: rotateY(-180deg);
      -ms-transform: rotateY(-180deg);
      -o-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
      opacity: 0;
    }
  }

  @-webkit-keyframes turnLeft {
    0% {
      -webkit-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      -o-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }
    50% {
      -webkit-transform: rotateY(-160deg);
      -ms-transform: rotateY(-160deg);
      -o-transform: rotateY(-160deg);
      transform: rotateY(-160deg);
    }
    100% {
      -webkit-transform: rotateY(-180deg);
      -ms-transform: rotateY(-180deg);
      -o-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
      opacity: 0;
    }
  }

  @keyframes trunRight {
    0% {
      -webkit-transform: rotateY(-180deg);
      -ms-transform: rotateY(-180deg);
      -o-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      -o-transform: rotateY(0deg);
      transform: rotateY(0deg);
      opacity: 1;
    }
  }

  @-webkit-keyframes trunRight {
    0% {
      -webkit-transform: rotateY(-180deg);
      -ms-transform: rotateY(-180deg);
      -o-transform: rotateY(-180deg);
      transform: rotateY(-180deg);
      opacity: 0.5;
    }
    100% {
      -webkit-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      -o-transform: rotateY(0deg);
      transform: rotateY(0deg);
      opacity: 1;
    }
  }

  .p-button {
    display: flex;
    display: -webkit-flex;
    background: #ffffff;
  }

  .p-button > a {
    text-align: center;
    line-height: 1.2rem;
    color: #fc6767;
    flex: 1;
    -webkit-flex: 1;
  }

  .p-button > a:first-child {
    border-right: 1px solid #cccccc;
  }

  .p-tip-container {
    position: absolute;
    width: 100%;
    text-align: center;
  }

  .p-tip-container .p-state {
    width: 90%;
    margin: 0.4rem auto 0;
    color: #644020;
    text-align: left;
  }

  .click-tip {
    position: absolute;
    width: 0.8rem;
    top: -1rem;
    right: 10%;
    z-index: 2000;
  }

  .p-tips {
    color: #644020;
  }

  .click-tip img {
    width: 100%;
  }

</style>
