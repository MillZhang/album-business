<template id="preview">
  <div class="preivew">
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
    <section class="bar-footer" v-show="flag == 'share'">
      <a class="makeAlbumButton" @click="makeBtnClick">我也要制作</a>
    </section>
  </div>
</template>
<script>
  import canvas from 'jsPath/module/TeamModel'
  import Service from 'service/service'
  import WxUtils from 'jsPath/tool/WxUtils'
  export default{
    name: 'album-preview',
    data(){
      return {
        editorWidth: window.innerWidth * .8,
        editorHeight: window.innerWidth * .8 * 1,
        albumId: this.$router.currentRoute.query.albumId,
        cfrom: this.$router.currentRoute.query.cfrom,
        appId: this.$router.currentRoute.query.appid,
        flag: this.$router.currentRoute.query.flag,
        photoList: [],
        backCoverImg: '',
        coverImg: ''
      }
    },
    created(){
      this.fetchAlbumJson();
//      this.fetchShareSlogan();
      WxUtils.wxShowMenu();
      WxUtils.wxShare({
        title: '2017个性定制精美照片书火热上线',
        desc: '新款照片书编辑器上线啦！模板丰富、操作简单、自由编辑、价格优惠、赶紧点击做一本吧！',
        link: location.origin + '/synergy/album/share?albumId=' + this.albumId + '&appid=' + this.appId + '&cfrom=' + this.cfrom,
        image: 'http://template.cache.timepack.cn/album_share_logo.png'
      });
    },
    mouted(){
      WxUtils.wxShowMenu();
    },
    methods: {
      fetchAlbumJson(){
        let that = this;
        Service.getAlbumJsonByAlbumId({
          albumId: this.albumId
        }, result => {
          if (result.success) {
            App.config.photoList = JSON.parse(result.data.albumJson);
            App.config.layoutList = JSON.parse(result.data.layoutJson);
            that.photoList = App.config.photoList;
            let layout = App.config.layoutList[0],
              radio = layout.tw / layout.th;
            that.editorHeight = that.editorWidth / radio;
          }
        });
      },
      fetchAlbumCover(){
        let that = this;
        Service.getAlbumCoverImage({
          albumId: this.albumId
        }, result => {
          if (result.success) {
            that.backCoverImg = result.data.backCoverImg;
            that.coverImg = result.data.coverImg;
          }
        });
      },
      fetchShareSlogan(){
        let that = this;
        Service.getShareSlogan({
          appid: this.appId
        }, result => {
          if (result.success) {

          }
        });
      },
      templateStyle(n){
        return 'background:url(' + canvas.getTemplateImage(n) + ') center no-repeat;background-size:cover';
      },
      photoItemStyle(index, imageIndex){
        return canvas.setEitorPage(index, imageIndex, this.editorWidth, false);
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
      makeBtnClick(e){
        e.preventDefault();
        this.$router.push('/' + this.cfrom.toLowerCase() + '/list?appid=' + this.appId);
      }
    }
  }
</script>
<style scoped>
  @import "../../assets/css/Previewer.css";
</style>
