<template id="GlobalEditor">
  <!--编辑器 -->
  <div class="editor page">
    <section class="bar-footer">
      <div class="footer">
        <template v-if="restCount>0">
          <router-link :to="{path:'upload',query:{mode:'group',appid:appId }}" class="batch">批量导入</router-link>
        </template>
        <router-link :to="{path:'preview',query:{appid:appId}}" class="preview">预览</router-link>
      </div>
    </section>
    <section class="bar-content clearfix">
      <!--<div class="gap" :style="{height:gapHeight}"></div>-->
      <div class="tip f12">您选择的产品是{{productName}}<span class="f12">¥ {{productPrice}}</span></div>
      <div class="tip f12">亲爱的用户,请最好一次性编辑完成相册,如果做一半离开,防止浏览器开小差丢了您的相册;点击照片进入【编辑】可以调整照片哦!</div>
      <!--&lt;!&ndash; 封面/封底 &ndash;&gt;-->
      <!--<div class="floor-info">-->
        <!--封面/封底-->
      <!--</div>-->
      <!--<div class="block ml">-->
        <!--<a class="edit cover" href="javascript:;" :style="{height:editorHeight+'px'}">-->
          <!--<img v-lazy="coverImageUrl+'?imageMogr2/thumbnail/600x600'" alt="封面">-->
        <!--</a>-->
      <!--</div>-->
      <!--<div class="block">-->
        <!--<a class="edit cover" href="javascript:;" :style="{height:editorHeight+'px'}">-->
          <!--<img v-lazy="backCoverImageUrl+'?imageMogr2/thumbnail/600x600'" alt="封底">-->
        <!--</a>-->
      <!--</div>-->
      <!--主体内容 -->
      <template v-for="(item,n) in photoList">
        <template v-if="n%2==0">
          <div class="floor-info" :class="{mt0:n==0}">
            <template v-if="n==0">
              封面/封底
            </template>
            <template v-if="n==2">
              扉页/第1页
            </template>
            <template v-else>
              <template v-if="n == (photoList.length-2)">
                第{{n-2}}页/扉底
              </template>
              <template v-if="n>2&&n<(photoList.length-2)">
                第{{n-2}}页/第{{n-1}}页
              </template>
            </template>
          </div>
        </template>
        <div class="block" :class="{ml:n%2==0}" @click="goDesignerEvent(n)">
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
    <mt-actionsheet :closeOnClickModal="false"
                    :actions="[{name:'重置相册',method:resetAlbum}]"
                    v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script type="text/javascript">
  //引入移动端自适应库
  import Cache from 'jsPath/tool/Cache'
  import canvas from 'jsPath/module/AlbumModel'
  import Service from 'service/service'
  import {
    Toast,
    MessageBox
  } from 'mint-ui';
  export default {
    name: 'GlobalEditor',
    data() {
      return {
        editorWidth: window.innerWidth * .44,
        editorHeight: window.innerWidth * .44 * 1,
        mainHeight: window.innerHeight,
        gapHeight: '',
        backCoverImageUrl: '',
        coverImageUrl: '',
        productName: "",
        productPrice: 0,
        hasCached: false,
        photoList: [],
        pageSize: 0,//默认值
        restCount: 1,
        essentialData: {},
        sheetVisible: false,
        //活动id,不一定存在
        temporaryId: this.$router.currentRoute.query.temporaryId,
        tempId: Cache.template().getter(),
        appId: this.$router.currentRoute.query.appid
      }
    },
    created() {
      Cache.tempPhoto().remove();
      this.fetchCoverImage();
      this.fetchAlbumData()
      this.fetchEssentialData();
      this.fetchProductData();
    },
    methods: {
      addedFunction(){
        let that = this;
        $('.cover').on('doubleTap', function (e) {
          e.preventDefault();
          that.sheetVisible = true;
          return false;
        });
      },
      fetchAlbumData(){
        if (undefined == this.temporaryId) return;
        if (null != Cache.temporary().getter() && this.temporaryId == Cache.temporary().getter()) return;
        let that = this;
        Service.getAlbumJson({
          ticket: App.config.ticket,
          temporaryId: this.temporaryId
        }, result => {
          if (result.success) {
            Cache.remove();
            that.tempId = result.data.tempId;
            Cache.template().setter(that.tempId)
            canvas.dealWidthDifferentDevice(JSON.parse(result.data.albumJson))
            that.$nextTick(function () {
              that.photoList = Cache.photoList().getter();
              Cache.layout().setter(JSON.parse(result.data.layoutJson));
              that.editorHeight = that.editorWidth / canvas.getImageRadio();
              that.restCount = canvas.getRestEmptyCount();
              that.fetchCoverImage();
              Cache.temporary().setter(that.temporaryId);
            });
          }
        });
      },
      fetchEssentialData(){
        let that = this;
        if (Cache.photoList().getter() != null || undefined != this.temporaryId)return;
        Service.getLayout({
          tempId: this.tempId,
          ticket:this.config.ticket
        }, result => {
          if (result.success) {
            canvas.setCacheData(result.data);
            that.photoList = Cache.photoList().getter();
            that.restCount = canvas.getRestEmptyCount();
            that.editorHeight = that.editorWidth / canvas.getImageRadio();
          }
        });
      },
      fetchProductData(){
        let that = this;
        Service.getProduct({
          ticket: App.config.ticket
        }, result => {
          if (result.success) {
            that.productName = result.data.productName;
            that.productPrice = result.data.productPrice;
          }
        });
      },
      fetchCoverImage(){
        let that = this;
        if (null == this.tempId) return;
        Service.getCoverImageByTempId({
          tempId: this.tempId,
          ticket:this.config.ticket
        }, result => {
          if (result.success) {
            that.coverImageUrl = result.data.coverImageUrl;
            that.backCoverImageUrl = result.data.backCoverImageUrl;
          }
        });
      },
      fetchAlbumCacheData(){
        Service.getAlbumCacheData({
          ticket: App.config.ticket,
          random: new Date().getTime()
        }, result => {
          if (result.success && "" != result.data.albumJson) {
            Cache.photoList().setter(JSON.parse(result.data.albumJson));
            Cache.layout().setter(JSON.parse(result.data.layoutJson));
            Cache.template().setter(result.data.tempId);
          }

        });
      },
      goDesignerEvent(index){
//        if (index == 0 || index == this.photoList.length - 1)return;
        this.$router.push('/editor/design?page=' + index);
      },
      templateStyle(n){
        return 'background:url(' + canvas.getTemplateImage(n) + ') center no-repeat;background-size:cover';
      },
      photoItemStyle(index, imageIndex){
        return canvas.setEitorPage(index, imageIndex, this.editorWidth, false);
      },
      resetAlbum(){
        let temporaryId = Cache.temporary().getter();
        Cache.remove();
        this.photoList = [];
        if (undefined == temporaryId || null == temporaryId) {
          this.$router.replace('/editor/template/?appid=' + this.appId);
        } else {
          this.$router.replace('/editor/global/?appid=' + this.appId + '&temporaryId=' + this.temporaryId);
        }
      }
    },
    computed: {},
    mounted() {
      this.$nextTick(function () {
        this.photoList = Cache.photoList().getter();
        this.restCount = canvas.getRestEmptyCount();
        this.editorHeight = this.editorWidth / canvas.getImageRadio();
        this.addedFunction();
        this.gapHeight = $('.main').height() + this.editorHeight - 100 + 'px';
      });
    },
    watch: {
      photoList: function () {//一旦page发生变化,实时的获取新的designPhoto
        if (this.photoList.length == 0) {
          this.fetchAlbumData();
        }
      }
    }
  }
</script>
<style scoped>
  .editor {
    border-left: 1px solid #fff;
    background: #EDEDED;
    overflow: hidden;
  }

  .editor .main {

  }

  .editor .tip {
    padding: 0.02rem 0.2rem;
    color: #777777;
    width: 100%;
    box-sizing: border-box;
  }

  [data-dpr="2"] .editor .tip {
    font-size: 20px;
  }

  [data-dpr="3"] .editor .tip {
    font-size: 30px;
  }

  .editor .tip span {
    margin-left: 10px;
    color: #bc223d;
  }

  [data-dpr="2"] .editor .tip span {
    font-size: 20px;
  }

  [data-dpr="3"] .editor .tip span {
    font-size: 30px;
  }

  .editor .floor-info {
    position: relative;
    height: 0.6rem;
    line-height: 0.6rem;
    padding-left: 0.2rem;
    float: left;
    width: 80%;
    margin: 0.1rem 0.3rem;
    box-sizing: border-box;
  }

  .editor .floor-info::before {
    content: "";
    width: 0.14rem;
    height: 0.14rem;
    background: #969696;
    display: block;
    position: absolute;
    left: -0.2rem;
    top: 0.2rem;
    border-radius: 50%;
    z-index: 2;
  }

  .editor .floor-info::after {
    content: "";
    width: 1px;
    height: 5.4rem;
    background: #ffffff;
    position: absolute;
    left: -0.14rem;
    top: 0.4rem;
  }

  .editor .floor {
    border-radius: 4px;
    margin-left: 0.4rem;
    padding: 0.3rem 0;
    display: flex;
    display: -webkit-flex;
    width: 100%;
    box-sizing: border-box;
  }

  .editor .block {
    width: 44%;
    float: left;
    background: #f8f8f8;
    padding: 1%;
  }

  .editor .block.ml {
    margin-left: 4%;
    border-right: 2px solid #ffffff;
  }

  .editor .block:first-child {
    /*padding-left: 2px;*/
    /*padding-right: 2px;*/
  }

  .editor .block img {
    width: 100%;
  }

  .editor .block .edit {
    width: 100%;
    display: block;
    position: relative;
    z-index: 999;
  }

  .editor .block .edit .pageDiv {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .editor .block .edit .pageDiv .templateDiv {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1000;
  }

  .footer {
    bottom: 0;
    width: 100%;
    line-height: 1.2rem;
    background: #fff;
    z-index: 1000;
    display: flex;
    display: -webkit-flex;
    box-shadow: 0 0 5px #ccc;
  }

  .footer > a {
    text-align: center;
    flex: 1;
    -webkit-flex: 1;
    color: #fc6767;
  }

  .footer > a:first-child {
    border-right: 1px solid #cccccc;
  }
</style>
