<template id="designer">
  <div class="container">
    <div class="designer">
      <p class="tip">往下一步自动保存</p>
      <div class="button-group" v-show="showButton">
        <a href="javascript:;" @click="changePhotoDegree">向右旋转</a>
        <a href="javascript:;" @click="changePhotoClickEvent">更换图片</a>
      </div>
      <div class="block">
        <div class="edit" href="javascript:;" :style="{height:editorHeight+'px'}">
          <div class="pageDiv">
            <div class="templateDiv" :style="templateStyle()"></div>
            <template v-for="(imageItem,imageIndex) in desinPhoto.list">
              <div class="photoDiv"
                   :style="photoItemStyle(imageIndex)">
                <img class="itemImage" :data-index="imageIndex"
                     :class="{insertBtn:imageItem.key == '',changeBtn:imageItem.key!=''}"
                     :src="photoItemImageSrc(imageIndex)" alt=""
                     :style="photoItemImageStyle(imageIndex)"
                     @touchstart="touchStartEvent"
                     @touchmove="touchMoveEvent"
                     @touchend="touchEndEvent">
              </div>
            </template>
          </div>
        </div>
        <a href="javascript:;" class="prev" :class="{hidden:page<=0}" @click="goPreviousEvent"></a>
        <a href="javascript:;" class="next" :class="{hidden:page>=(totalPage-1)}" @click="goNextEvent"></a>
      </div>
      <p class="pagination">
        <template v-if="page==0">封面/{{totalPage-4}}</template>
        <template v-if="page==1">封底/{{totalPage-4}}</template>
        <template v-if="page==2">扉页/{{totalPage-4}}</template>
        <template v-if="page==totalPage-1">扉底/{{totalPage-4}}</template>
        <template v-if="page>2&&page<(totalPage-1)">{{page-2}}/{{totalPage-4}}</template>
      </p>
      <div class="p-state">
        <p class="f12">说明:</p>
        <p class="f12">1.点击上传照片可以旋转或者更换图片</p>
        <p class="f12">2.上传的照片请<span style="color: #ff4545;">上下左右移动</span>调整好照片的位置,确认人脸在相框最合适的位置,不在相框里面的照片将被裁切;</p>
        <p class="f12">3.点击相框左右两边箭头,可以进行翻页编辑。</p>
      </div>
    </div>
    <template v-if="page==0">
      <div class="t-layout" v-show="coverTemp.length>0">
        <template v-for="(item,index) in coverTemp">
          <img class="templateImage" v-lazy="item.pngImg+'?imageMogr2/thumbnail/600x600'"
               @click="changeTemplateLayout($event,index)">
        </template>
      </div>
    </template>
    <template v-if="page==1">
      <div class="t-layout" v-show="backCoverTemp.length>0">
        <template v-for="(item,index) in backCoverTemp">
          <img class="templateImage" v-lazy="item.pngImg+'?imageMogr2/thumbnail/600x600'"
               @click="changeTemplateLayout($event,index)">
        </template>
      </div>
    </template>
    <template v-if="page==2">
      <div class="t-layout" v-show="fyTemp.length>0">
        <template v-for="(item,index) in fyTemp">
          <img class="templateImage" v-lazy="item.pngImg+'?imageMogr2/thumbnail/600x600'"
               @click="changeTemplateLayout($event,index)">
        </template>
      </div>
    </template>
    <template v-if="page>2&&page<(totalPage-1)">
      <div class="t-layout" v-show="contentTemp.length>0">
        <template v-for="(item,index) in contentTemp">
          <img class="templateImage" v-lazy="item.pngImg+'?imageMogr2/thumbnail/600x600'"
               @click="changeTemplateLayout($event,index)">
        </template>
      </div>
    </template>
    <template v-if="page==totalPage-1">
      <div class="t-layout" v-show="fdTemp.length>0">
        <template v-for="(item,index) in fdTemp">
          <img class="templateImage" v-lazy="item.pngImg+'?imageMogr2/thumbnail/600x600'"
               @click="changeTemplateLayout($event,index)">
        </template>
      </div>
    </template>
  </div>
</template>
<script type="text/javascript">
  import Cache from 'jsPath/tool/Cache'
  import canvas from 'jsPath/module/AlbumModel'
  import Service from 'service/service'
  import {
    Toast
  } from 'mint-ui';
  export default{
    name: "designer",
    data(){
      return {
        editorWidth: this.utils.getConstant().EditorWidth,
        editorHeight: this.utils.getConstant().EditorWidth * 600 / 500,
        page: 0,
        totalPage: Cache.photoList().getter().length,
        desinPhoto: {},
        selectedImageIndex: 0,
        showButton: false,
        contentTemp: [],
        coverTemp: [],
        backCoverTemp: [],
        fyTemp: [],
        fdTemp: []
      }
    },
    created(){
      this.page = Number(this.$router.currentRoute.query.page);
      this.desinPhoto = Cache.photoList().getter()[this.page];
      this.editorHeight = this.editorWidth / canvas.getImageRadio();
      if (null != Cache.templateLayout().getter()) {
        let tempLayout = Cache.templateLayout().getter();
        this.contentTemp = tempLayout.contentTemp;
        this.coverTemp = tempLayout.coverTemp;
        this.backCoverTemp = tempLayout.backCoverTemp;
        this.fyTemp = tempLayout.fyTemp;
        this.fdTemp = tempLayout.fdTemp;
      } else {
        this.fetchTemplateLayoutList();
      }
    },
    methods: {
      fetchTemplateLayoutList(){
        let that = this;
        Service.getTemplateLayoutList({
          tempId: Cache.template().getter(),
          ticket:this.config.ticket
        }, result => {
          if (result.success) {
            that.contentTemp = result.data.contentTemp;
            that.coverTemp = result.data.coverTemp;
            that.backCoverTemp = result.data.backCoverTemp;
            that.fyTemp = result.data.fyTemp;
            that.fdTemp = result.data.fdTemp;
            Cache.templateLayout().setter(result.data);
          }
        });
      },
      templateStyle(){
        return 'background:url(' + canvas.getTemplateImage(this.page) + ') center no-repeat;';
      },
      photoItemStyle(index){
        return canvas.setEitorPage(this.page, index, this.editorWidth, true);
      },
      photoItemImageSrc(index){
        return canvas.getPhotoItemImageUrl(this.page, index);
      },
      photoItemImageStyle(index){
        return canvas.setPhotoItemImageStyle(this.page, index);
      },
      goPreviousEvent(event){
        event.preventDefault();
        //先清当前页的缓存
        Cache.tempPhoto().remove();
        this.$router.replace('/editor/design?page=' + (this.page -= 1));
      },
      goNextEvent(event){
        event.preventDefault();
        Cache.tempPhoto().remove();
        this.$router.replace('/editor/design?page=' + (this.page += 1));
      },
      changePhotoDegree(event){
        event.preventDefault();
        this.desinPhoto = canvas.rotateImage(this.page, this.selectedImageIndex);
      },
      changePhotoClickEvent(event){
        event.preventDefault();
        this.$router.replace('/editor/upload?mode=change&page=' + this.page + '&index=' + this.selectedImageIndex);
      },
      changeTemplateLayout(e, index){
        e.preventDefault();
        let $target = $(e.target);
        $('.templateImage').removeClass('selected');
        $target.addClass('selected');
        let layout = Cache.layout().getter(),
          tempLayout = Cache.templateLayout().getter();
        if (this.page == 0) {
          layout[this.page] = tempLayout.coverTemp[index];
        } else if (this.page == 1) {
          layout[this.page] = tempLayout.backCoverTemp[index];
        } else if (this.page == 2) {
          layout[this.page] = tempLayout.fyTemp[index];
        } else if (this.page == (this.totalPage - 1)) {
          layout[this.page] = tempLayout.fdTemp[index];
        } else {
          layout[this.page] = tempLayout.contentTemp[index];
        }
        Cache.layout().setter(layout);
        this.desinPhoto = canvas.updatePhotoContainer(this.page);
      },
      touchStartEvent(e){
        e.preventDefault();
        let $target = $(e.target);
        if ($target.hasClass('insertBtn')) {
          this.$router.replace('/editor/upload?mode=single&page=' + this.page);
          return;
        } else {
          this.selectedImageIndex = $target.attr('data-index')
          this.showButton = true;
        }
        let list = Cache.photoList().getter()[this.page].list;
        if (undefined == list) return;
        this.position = list[this.selectedImageIndex].location.position;
        this.startPosition = canvas.touchStart(e);
      },
      touchMoveEvent(e){
        e.preventDefault();
        canvas.touchMove(e, this.startPosition, this.position);
      },
      touchEndEvent(e){
        e.preventDefault();
        canvas.touchEnd(e, this.page, this.selectedImageIndex, this.position, () => {
          Toast('图片未充满容器,建议更换容器或者图片')
        });
        return true;
      }
    },
    mounted(){
      this.$nextTick(function () {

      });
    },
    watch: {
      page: function () {//一旦page发生变化,实时的获取新的designPhoto
        this.desinPhoto = Cache.photoList().getter()[this.page];
        this.showButton = false;
      },
      desinPhoto: function () {
      }
    }
  }
</script>
<style scoped>
  .designer {
    width: 100%;
    overflow-y: auto;
    background: #efefef;
    margin-top: 0.2rem;
    height: 15rem;
    -webkit-overflow-scrolling: touch;
  }

  .designer .tip {
    text-align: center;
    position: absolute;
    width: 100%;
    top: 1%;
    display: none;
  }

  .designer .block {
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: 8%;
    box-shadow: 0 0 5px #ccc;
  }

  .designer .block .edit {
    width: 100%;
    display: block;
    position: relative;
    z-index: 999;
  }

  .designer .block .edit .pageDiv {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .designer .block .edit .pageDiv .templateDiv {
    width: 100%;
    height: 100%;
    /*position: relative;*/
    /*z-index: 1000;*/
  }

  .designer .block .prev {
    background: url('../../assets/images/icon/icon_pages.png') center no-repeat;
    position: absolute;
    top: 42%;
    left: -0.5rem;
    background-position: 0 100%;
    background-size: 200%;
    width: 1.6rem;
    height: 1.6rem;
    display: block;
    z-index: 1000;
  }

  .designer .block .next {
    background: url('../../assets/images/icon/icon_pages.png') center no-repeat;
    position: absolute;
    top: 42%;
    right: -0.5rem;
    background-position: 104% 100%;
    background-size: 200%;
    width: 1.6rem;
    height: 1.6rem;
    display: block;
    z-index: 1000;
  }

  .designer .block .next {

  }

  .templateDiv {
    background-size: cover !important;
  }

  .pagination {
    position: relative;
    top: 10%;
    text-align: right;
    width: 90%;
    margin: 0 auto;
    padding-right: 5%;
  }

  .button-group {
    display: flex;
    display: -webkit-flex;
    position: absolute;
    width: 100%;
    top: 1%;
    z-index: 1001;
  }

  .button-group > a {
    display: block;
    width: 40%;
    background: #fff;
    color: #bc223d;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 0.965rem;
    line-height: 0.965rem;
    text-align: center;
    margin: 0 5%;
  }

  .t-layout {
    width: 100%;
    height: 2.5rem;
    z-index: 1002;
    display: flex;
    display: -webkit-flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: hidden;
    overflow-x: auto;
    background: #E4E4E4;
  }

  .t-layout img {
    width: 2rem;
    height: 2rem;
    margin: 0.25rem;
    flex-shrink: 0;
    -webkit-flex-shrink: 0;
  }

  .t-layout img.selected {
    border: 2px solid #bc223d;
  }

  .photoDiv {
    -webkit-overflow-scrolling: touch;
  }

  .p-state {
    color: #a6a6a6;
    width: 90%;
    position: relative;
    top: 12%;
    margin: 0 auto;
    text-align: left;
  }
</style>
