<style scoped>
.container {
  width: 100%;
}

.container .header {
  width: 100%;
  line-height: 1.2rem;
  background: #ffffff;
  text-align: center;
  box-shadow: 0 0 0.2rem #cccccc;
}

.warn {
  background: #FFDFDF;
  width: 100%;
  height: 0.833rem;
  line-height: 0.833rem;
  padding-left: 0.5rem;
  box-sizing: border-box;
}

.warn img {
  vertical-align: middle;
  width: 0.5rem;
  margin: 0 0.04rem 0.1rem;
}

.banner {
  background: #EDEDED;
  width: 94%;
  margin: 0.3rem auto;
  height: 1rem;
  line-height: 1rem;
  padding-left: 0.4rem;
}

.banner > a {
  background: #fff;
  color: #FDA720;
  padding: 0.1rem 0.2rem;
  margin-left: 0.5rem;
  border-radius: 4px;
}

.banner > a.disable {
  background: #DADADA;
}

.banner > a.delete {
  float: right;
  margin-right: 0.5rem;
  line-height: normal;
  margin-top: 0.2rem;
}

.infiniteList {}

.uploader {
  display: flex;
  display: -webkit-flex;
  margin: 0.2rem 0 0;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #efefef;
}

.uploader .timeline {
  width: 20%;
  color: #767676;
  padding-left: 0.1rem;
}

.uploader .imageList {
  width: 78%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}

.uploader .imageList .imageItem {
  width: 32%;
  margin-top: 0.05rem;
  margin-right: 0.05rem;
  position: relative;
  font-size: 0;
}

.container .main.ios .uploader .imageList .imageItem:last-child {
  margin-bottom: 2rem;
}

.uploader .imageList .imageItem img {
  width: 100%;
}

.imageItem[data-selected='Y']:after {
  content: '';
  display: block;
  position: absolute;
  ;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background: url("../../assets/images/icon/icon-checked.png") center no-repeat;
  background-size: contain;
}

.imageItem.selected:before {
  content: '';
  display: block;
  position: absolute;
  ;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  opacity: 0.2;
}

.imageItem.selected:after {
  content: "";
  position: absolute;
  top: 0.05rem;
  right: 0.05rem;
  background: url(../../assets/images/icon/icon-selected.png) center no-repeat;
  width: 0.75rem;
  height: 0.75rem;
  background-size: cover;
}

.imageItem.del:before {
  content: '';
  display: block;
  position: absolute;
  ;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #000;
  opacity: 0.5;
}

.imageItem.del:after {
  content: "";
  position: absolute;
  top: 0.05rem;
  right: 0.05rem;
  background: url(../../assets/images/icon/icon-del.png) center no-repeat;
  width: 0.75rem;
  height: 0.75rem;
  background-size: cover;
}

.mint-msgbox-message {
  padding: 0.5rem;
}

.u-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.u-upload {
  position: absolute;
  width: 80%;
  left: 10%;
  top: 45%;
  padding: 0.6rem;
  background: #ffffff;
  z-index: 1002;
  border-radius: 0.1rem;
  box-sizing: border-box;
  text-align: center;
}

.u-buttons {
  display: flex;
  display: -webkit-flex;
  border-top: 1px solid #c8c7cc;
  background: #ffffff;
}

.u-buttons > a {
  flex: 1;
  -webkit-flex: 1;
  text-align: center;
  line-height: 1.2rem;
  color: #e33e45;
  position: relative;
}

.selectAll:after {
  content: '';
  position: absolute;
  width: 1px;
  height: 0.6rem;
  background: #c8c7cc;
  top: 0.28rem;
  right: 0;
}

.groupSelect {
  width: 0.667rem;
  height: 0.667rem;
  border: 1px solid #cccccc;
  border-radius: 50%;
  display: block;
  margin-top: 0.4rem;
  margin-left: 0.4rem;
  position: relative;
}

.groupSelect.checked {
  border: none;
}

.groupSelect.checked:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  background: url(../../assets/images/icon/icon-selected.png) center no-repeat;
  width: 100%;
  height: 100%;
  background-size: contain;
}
</style>
<template id="upload">
  <div class="container page">
    <section class="bar-header">
      <header class="header">已选{{selectCount}}张,可选{{restCount}}张</header>
    </section>
    <section class="bar-footer">
      <div class="u-buttons">
        <a href="javascript:;" class="selectAll" :class="{disable:deleteStatus}" @click="selectAllEvent">
          <template v-if="selectAllStatus">取消全选</template>
          <template v-else>全选</template>
        </a>
        <a href="javascript:;" class="ensure" :class="{disable:deleteStatus}" @click="ensureClickEvent">确定</a>
      </div>
    </section>
    <section class="bar-content" style="background: #ffffff;bottom: 1.2rem;" v-infinite-scroll="loadMore" :infinite-scroll-distance="60">
      <p class="warn">带有 <img src="../../assets/images/icon/icon-warn.png" alt="">的图片像素太低,请慎重选择!</p>
      <div class="banner">
        <span>照片库</span>
        <a href="javascript:;" class="delete" @click="deleteStatus?deleteStatus=false:deleteStatus=true;selectAllStatus=false">
          <template v-if="deleteStatus">取消</template>
          <template v-else>删除</template>
        </a>
      </div>
      <div class="uploader" style="border-bottom: none;">
        <div class="timeline">
          添加图片
        </div>
        <div class="imageList">
          <img src="../../assets/images/icon/icon-uploader.png" alt="" :style="{height:thumbWidth+'px',width:thumbWidth+'px'}" id="uploaderButton" @click="chooseImage">
        </div>
      </div>
      <div class="infiniteList">
        <template v-for="(item,index) in photoList" v-if="item.items.length>0">
          <div class="uploader">
            <div class="timeline">
              <p>{{item.group}}</p>
              <p>{{item.detail}}</p>
              <label class="groupSelect" @click="groupSelectAll"></label>
            </div>
            <div class="imageList">
              <template v-for="(image,pos) in item.items">
                <div class="imageItem" :class="{mr0:pos%3==2,del:deleteStatus}" :data-selected="hasSelected(image.key)" @click="selectOrDelImageEvent($event,image.id,index,pos)">
                  <img class="image" v-lazy="setImageUrl(image.key)" alt="" :data-width="image.width" :data-height="image.height" :data-key="image.key" :data-degree="image.degree">
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </section>
    <section class="u-upload" v-show="isUploading">
      {{progressMessage}}
    </section>
    <div class="u-layer" v-show="isUploading"></div>
  </div>
</template>
<script type="text/javascript">
//引入移动端自适应库
import flexible from 'jsPath/lib/flexible'
import QiniuUploader from 'jsPath/module/QiniuUploader'
import WxUtils from 'jsPath/tool/WxUtils'
import Service from 'service/service'
import canvas from 'jsPath/module/AlbumModel'
import Cache from 'jsPath/tool/Cache'
import {
  Toast,
  MessageBox
} from 'mint-ui';
export default {
  name: 'uploader',
  data() {
    return {
      buttonId: '',
      thumbWidth: (window.innerWidth * 0.78 * 0.32).toFixed(0),
      photoList: [], //待加载的图片列表
      Files: [], //待上传图片组
      currentList: {}, //当天图片列表
      selectAllStatus: false,
      selectCount: 0,
      restCount: canvas.getRestEmptyCount(),
      mode: 'group',
      loading: false,
      loadingOver: false,
      pageNum: 1,
      pageSize: 20,
      containerHeight: window.innerHeight,
      isAndroid: this.utils.isAndroid(),
      progressMessage: '',
      isUploading: false,
      deleteStatus: false,
      appId: this.$router.currentRoute.query.appid,
      selectedImageList: [],
      wxUtil: null
    }
  },
  created() {
    this.syncDocTitle();
    this.syncSelectedImageList();
    let flag = this.$router.currentRoute.query.mode,
      page = this.$router.currentRoute.query.page;
    this.mode = flag;
    if (flag == 'single') {
      this.restCount = canvas.getRestEmptyCountByPage(page);
    } else if (flag == 'change') {
      this.restCount = 1;
    }
  },
  methods: {
    syncDocTitle() {
      this.selectCount = $('.selected').length;
    },
    syncSelectedImageList() {
      let photoList = Cache.photoList().getter();
      for (let i = 0; i < photoList.length; i++) {
        let item = photoList[i],
          list = item.list;
        if (undefined == list) continue;
        for (let j = 0; j < list.length; j++) {
          if ('' != list[j].key) {
            this.selectedImageList.push(list[j].key);
          }
        }
      }
    },
    initQiNiu(uptoken) {
      let that = this;
      const QN = new QiniuUploader('uploaderButton', uptoken, {
        added: (up, files) => {
          if (up.files.length > 50) { //最多选择50张
            up.splice(50, 999);
          }
          that.Files = files;
          this.isUploading = true;
        },
        progress: (up, file) => {
          let index = 0;
          for (let i = 0; i < that.Files.length; i++) {
            if (file === that.Files[i]) {
              index = (i + 1);
              break;
            }
          }
          that.progressMessage = '正在上传第' + index + '张图片' + file.percent + '%';
        },
        uploaded: (key) => {
          let that = this;
          Service.getImageInfo(key, data => {
            let width = data.width,
              height = data.height;
            if (null === data.orientation) {
              data.degree = 0;
            } else if (data.orientation == "Right-top") {
              data.degree = 90;
              data.width = height;
              data.height = width;
            } else if (data.orientation == "Bottom-right") {
              data.degree = 180;
            } else if (data.orientation == "Left-bottom") {
              data.degree = 270;
              data.width = height;
              data.height = width;
            } else {
              data.degree = 0;
            }
            data.key = key;
            that.saveImage(data);
          });
        },
        complete() {
          that.isUploading = false;
          that.progressMessage = '';
        },
        error: (up, err, errTip) => {
          that.isUploading = false;
          that.progressMessage = '';
          let errorText = '';
          if (err.code == '-601') {
            errorText = '请上传图片类型!'
          }
          MessageBox({
            title: '',
            message: errorText == '' ? errTip : errorText
          })
        }
      });
      QN.init();
    },
    setImageUrl(key) {
      return this.utils.getConstant().DOMAIN + key + '?imageView2/1/w/300/h/300/q/100';
    },
    hasSelected(key) {
      return this.selectedImageList.indexOf(key) > -1 ? 'Y' : 'N';
    },
    chooseImage() {
      let that = this;
      WxUtils.wxChooseImage(requestData => {
        that.uploadImage(requestData);
      });
    },
    uploadImage(data) {
      let that = this;
      Service.uploadImage({
        ticket: App.config.ticket,
        localId: data.localId,
        mediaId: data.mediaId
      }, result => {
        if (result.success) {
          //显示上传的图片
          let imageItem = result.data;
          imageItem.url = that.utils.getConstant().DOMAIN + imageItem.key + '?imageView2/1/w/300/h/300/q/100';
          that.currentList.items.unshift(imageItem);
        }
      });
    },
    saveImage(data) {
      let that = this;
      Service.saveImage({
        ticket: App.config.ticket,
        width: data.width,
        height: data.height,
        url: data.key,
        degree: data.degree
      }, result => {
        if (result.success) {
          //请求成功后显示图片
          let imageItem = result.data;
          imageItem.url = that.utils.getConstant().DOMAIN + imageItem.key + '?imageView2/1/w/300/h/300/q/100';
          that.currentList.items.unshift(imageItem);
        }
      });
    },
    loadMore() {
      if (this.loading) return;
      if (this.loadingOver) return;
      let that = this;
      that.loading = true;
      Service.getImageList({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ticket: App.config.ticket
      }, result => {
        if (result.success) { //请求成功
          let data = result.data;
          that.setPhotoListData(result.currentPage, data);
        }
      });
    },
    setPhotoListData(pageNum, data) {
      if (data.length == 0) {
        this.loadingOver = true;
        return;
      }
      let group, lastIndex = this.photoList.length - 1;
      if (this.photoList.length > 0) {
        group = this.photoList[lastIndex].group;
      }
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        //最后一项尚未加载完成
        if (undefined != group && item.group == group) {
          for (let j = 0; j < item.items.length; j++) {
            this.photoList[lastIndex].items.push(item.items[j]);
          }
        } else {
          this.photoList.push(item);
        }
      }
      if (this.pageNum == 1) {
        //第一页初始化当天的图片列表
        this.currentList = this.photoList[0];
      }
      this.pageNum = Number(pageNum) + 1;
      this.loading = false;
    },
    /**
     * 添加事件监听
     */
    selectOrDelImageEvent(event, imageId, groupIndex, imageIndex) {
      let target = event.target,
        status,
        that = this;
      if (!this.deleteStatus) {
        if (target.tagName == 'IMG') {
          status = $(target).parent().attr('data-selected');
          if (status == 'N')
            $(target).parent().toggleClass('selected');
        } else {
          status = $(target).attr('data-selected');
          if (status == 'N')
            $(target).toggleClass('selected');
        }
        if ($('.selected').length > this.restCount) {
          Toast('不能再选啦!');
          $(target).removeClass('selected');
          $(target).parent().removeClass('selected');
          return;
        }
        this.syncDocTitle();
      } else {
        Service.deletePhotoImage({
          ticket: App.config.ticket,
          ids: [imageId]
        }, result => {
          if (result.success) {
            Toast('删除成功!');
            that.photoList[groupIndex].items.splice(imageIndex, 1)
          }
        });
      }
    },
    selectAllEvent(event) {
      event.preventDefault();
      if (this.deleteStatus) return;
      const restCount = this.restCount;
      if (this.selectAllStatus) {
        $('.selected').removeClass('selected');
        this.selectAllStatus = false;
      } else {
        $('.imageItem[data-selected="N"]').each(function(index) {
          if (index <= restCount - 1) {
            $(this).addClass('selected');
          }
        });
        this.selectAllStatus = true;
      }
      this.syncDocTitle();
    },
    groupSelectAll(e) {
      e.preventDefault();
      let $target = $(e.target);
      $target.toggleClass('checked');
      let $parent = $target.parents('.uploader');
      if (!$target.hasClass('checked')) {
        $parent.find('.selected').removeClass('selected');
        this.syncDocTitle();
        return;
      }
      let hasSelectedLength = this.selectCount;
      const restCount = this.restCount;
      $parent.find('.imageItem[data-selected="N"]').each(function(index) {
        let total = hasSelectedLength + index + 1;
        if (total <= restCount) {
          $(this).addClass('selected')
        }
      });
      this.syncDocTitle();
    },
    ensureClickEvent(event) {
      event.preventDefault();
      if (this.deleteStatus) return;
      let selectedImageLength = $('.selected').length;
      if (selectedImageLength == 0) {
        Toast('请至少选择一张图片');
      } else if (selectedImageLength > this.restCount) {
        Toast('选多啦');
      } else {
        //依次填充
        let $list = $('.selected');
        let page = Number(this.$router.currentRoute.query.page),
          index = Number(this.$router.currentRoute.query.index);
        if (this.mode == 'group') {
          canvas.fillImageByGroup($list);
          this.$router.replace('/editor/global?appid=' + this.appId);
          return;
        } else if (this.mode == 'single') {
          canvas.fillImageByPage($list, page);
        } else if (this.mode == 'change') {
          canvas.fillImageByIndex($list, page, index);
        }
        this.$router.replace('/editor/design?page=' + page);
      }
    }
  },
  mounted() {
    let that = this;
    if (!this.isAndroid) { //非安卓初始化七牛控件
      Service.getQiniuToken(result => {
        if (result.success) {
          that.initQiNiu(result.data)
        } else {
          Toast('当前排队人数过多,请稍后再试')
        }
      });
    }
    this.$nextTick(function() {
      //        $('.imageItem .image').on('doubleTap', function (e) {
      //          e.preventDefault();
      //          console.log('2')
      //          let key = $(this).attr('data-key');
      //          WxUtils.wxPreviewImage(that.getConstant().DOMAIN + key);
      //        });
    })
  },
  watch: {}

}
</script>
