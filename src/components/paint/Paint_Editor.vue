<template>
  <div class="paint-editor">
    <div class="pe-buttons">
      <router-link :to="{path:'/paint/upload'}">替换照片</router-link>
      <a href="javascript:;" @click="rotateImage">照片旋转</a>
    </div>
    <div class="pe-container">
      <div>
        <img :src="imageUrl" alt="" @click="adjustImage">
      </div>
    </div>
    <div class="pe-tip f12">点击照片可对照片编辑</div>
    <div class="pe-bottom" @click="generatePainting">生成油画</div>
  </div>
</template>
<script>
  import Service from 'service/service'
  import {
    Toast,
    MessageBox
  } from 'mint-ui';
  export default{
    data(){
      return {
        showEditButton: false,
        imageKey: this.$router.currentRoute.query.key,
        imageUrl: '',
        degree: 0
      }
    },
    created(){
      let that = this;
      Service.getImageInfo(this.imageKey, data => {
        let width = data.width, height = data.height;
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
        that.degree = data.degree;
        that.imageUrl = that.utils.getConstant().DOMAIN + that.imageKey + '?imageMogr2/thumbnail/750x750/rotate/' + data.degree;
      });
    },
    mounted(){
    },
    methods: {
      generatePainting(e){
        e.preventDefault();
        let that = this;
        Service.generatePaint({
          ticket: this.config.ticket,
          imgUrl: this.imageKey,
          degree: this.degree
        }, result => {
          if (result.success) {
            that.$router.push('/paint/preview');
          } else {
            MessageBox({
              title: '友情提示',
              message: result.message,
              showCancelButton: false
            });
          }
        });
      },
      adjustImage(e){
        e.preventDefault();
        this.showEditButton = true;
      },
      rotateImage(e){
        e.preventDefault();
        this.degree = (Number(this.degree) + 90) % 360;
        this.imageUrl = this.utils.getConstant().DOMAIN + this.imageKey + '?imageMogr2/thumbnail/750x750/rotate/' + this.degree;
      }
    }
  }
</script>
<style scoped>
  .paint-editor {
    height: 100%;
    padding-top: 0.76rem;
    box-sizing: border-box;
    overflow-y: auto;
  }

  .pe-buttons {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    padding: 0 0.8rem;
    margin-bottom: 0.76rem;
    box-sizing: border-box;
  }

  .pe-buttons > a {
    flex: 1;
    -webkit-flex: 1;
    width: 3.973rem;
    height: 1.067rem;
    text-align: center;
    line-height: 1.067rem;
    color: #7aa4a9;
    background: #ffffff;
    border-radius: 1.067rem;
    position: relative;
    padding-left: 0.5rem;
  }

  .pe-buttons > a:first-child {
    margin-right: 0.24rem;
  }

  .pe-buttons > a:after {
    content: '';
    width: 0.48rem;
    height: 0.56rem;
    display: block;
    position: absolute;
    top: 0.2535rem;
    left: 0.8rem;
    z-index: 100;
    background: url("../../assets/images/paint/2-1.png") center no-repeat;
    background-size: contain;
  }

  .pe-buttons > a:first-child:after {
    background: url("../../assets/images/paint/2-1.png") center no-repeat;
    background-size: contain;
  }

  .pe-buttons > a:first-child:after {
    background: url("../../assets/images/paint/2-1.png") center no-repeat;
    background-size: contain;
  }

  .pe-buttons > a:last-child {
    margin-left: 0.24rem;
  }

  .pe-container {
    width: 7.5rem;
    height: 9.72rem;
    padding: 0.133rem;
    left: 1.25rem;
    /*height: 9.30rem;*/
    margin: 0 auto;
    background: #ffffff;
    position: absolute;
    top: 2.587rem;
    box-sizing: border-box;
  }

  .pe-container > div {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .pe-container img {
    width: 100%;
  }

  .pe-tip {
    color: #969696;
    width: 100%;
    text-align: center;
    position: absolute;
    top: 12.5rem;
  }

  .pe-bottom {
    background: #ffffff;
    color: #7aa4a9;
    position: fixed;
    bottom: -1px;
    width: 100%;
    height: 1.16rem;
    line-height: 1.16rem;
    text-align: center;
  }
</style>
