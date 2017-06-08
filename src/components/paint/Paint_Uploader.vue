<template>
  <div class="paint-upload">
    <div class="title f16">导入</div>
    <div class="tip">从照片库中上传高清照片或使用相机拍摄</div>
    <div class="image">
      <img src="../../assets/images/paint/1-1.png" alt="">
    </div>
    <div class="button">
      <label id="uploaderButton" for="userfile">
        上传照片
      </label>
    </div>
    <section class="u-upload" v-show="isUploading">
      {{progressMessage}}
    </section>
    <div class="u-layer" v-show="isUploading"></div>
    <form id="testform" method="post" enctype="multipart/form-data">
      <input name="key" id="key" type="hidden" :value="key">
      <input name="token" type="hidden" :value="token">
      <input id="userfile" name="file" type="file" @change="upload" accept="image/*"/>
      <input name="accept" type="hidden"/>
    </form>
  </div>
</template>
<script>
  import Service from 'service/service'
  import md5 from 'md5'
  export default{
    data(){
      return {
        token: '',
        key: '',
        isUploading: false,
        imageKey: '',
        progressMessage: ''
      }
    },
    methods: {
      upload(e){
        let data = new FormData(document.getElementById("testform"));
        let that = this;
        this.$http.post('http://up.qiniu.com', data, {
          progress(event) {
            //传递给父组件的progress方法
            let progressNumber = parseFloat(event.loaded / event.total * 100).toFixed(0) + '%';
            that.progressMessage = '正在上传图片,已完成' + progressNumber;
          }
        }).then(response => {
          const result = response.body;
          that.isUploading = false;
          if (result.hash && result.key) {
            that.imageKey = result.key;
            that.$router.push('/paint/edit?key=' + that.imageKey);
          }
        }, error => {
          console.log(error)
        })
      }
    },
    mounted() {
      let that = this;
      Service.getQiniuToken(result => {
        if (result.success) {
          let randNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
          let key = Date.parse(new Date()) / 1000 + randNum;
          that.token = result.data;
          that.key = md5(key);
        } else {
          Toast('当前排队人数过多,请稍后再试')
        }
      });
    }
  }
</script>
<style scoped>
  #testform {
    display: none;
  }

  .paint-upload {
    height: 100%;
    background: #ffffff;
    text-align: center;
    padding-top: 2.133rem;
  }

  .paint-upload .tip {
    color: #969696;
    margin-top: 0.75rem;
  }

  .paint-upload .image {
    margin-top: 1.1rem;
  }

  .paint-upload .image img {
    width: 5.133rem;
  }

  #uploaderButton {
    display: block;
    margin-top: 1.23rem;
    width: 100%;
    width: 5.28rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border-radius: 1rem;
    margin: 1.23rem auto 0;
    background: #e47f30;
    color: #ffffff;
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
</style>
