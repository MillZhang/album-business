<template>
  <div class="mail-list">
    <section :style="{height:maxHeight+'px'}" class="body">
      <div class="top"></div>
      <div class="example">
        <p class="title">示例:</p>
        <div class="e-content">
          <img src="../../assets/images/icon/icon-mail-head.png" alt="">
          <div class="information">
            <p>姓名:嘟嘟女</p>
            <p>电话:188****5544</p>
            <p>邮箱:100**@qq.com</p>
            <p>爱好:骑马、弹琴</p>
          </div>
        </div>
      </div>
      <div class="content">
        <label id="uploaderButton" for="userfile">
          <img src="../../assets/images/icon/icon-header-uploader.png" alt="">
        </label>
        <template v-if="''!=formData.headImgUrl">
          <div class="headerImg">
            <img :src="formData.headImgUrl+'?imageView2/1/w/500/h/500/q/100'" alt="">
          </div>
        </template>
        <div class="input">
          <div>
            <input type="text" placeholder="请输入姓名" v-model="formData.cname" maxlength="10">
          </div>
          <div>
            <input type="text" placeholder="请输入(如电话)" v-model="formData.ctelephone" maxlength="11">
          </div>
          <div>
            <input type="text" placeholder="请输入(如邮箱)" v-model="formData.cemail" maxlength="30">
          </div>
          <div>
            <input type="text" placeholder="请输入(如爱好)" v-model="formData.cinterest" maxlength="30">
          </div>

        </div>
      </div>
    </section>
    <section class="button">
      <a href="javascript:;" @click="complete">完成下一步</a>
    </section>
    <section class="u-upload" v-show="isUploading">
      {{progressMessage}}
    </section>
    <div class="u-layer" v-show="isUploading"></div>
    <!-- Document：https://developer.qiniu.com/kodo/manual/form-upload -->
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
  import {Toast} from 'mint-ui'
  export default{
    name: 'mailList',
    data(){
      return {
        maxHeight: window.innerHeight,
        token: '',
        key: '',
        isUploading: false,
        progressMessage: '',
        thumbnail: null,
        progress: 0,
        appId: this.$router.currentRoute.query.appid,
        formData: {
          ticket: this.config.ticket,
          temporaryId: this.$router.currentRoute.query.temporaryId,
          cname: '',
          ctelephone: '',
          cemail: '',
          cinterest: '',
          headImgUrl: ''
        }
      }
    },
    methods: {
      complete(e){
        e.preventDefault();
        if ('' == this.formData.headImgUrl) {
          Toast('请上传头像');
          return;
        }
        if ('' == this.formData.cname) {
          Toast('请输入姓名');
          return;
        }

        if ('' != this.formData.ctelephone) {
          if (!/^1[3|4|5|7|8]\d{9}$/.test(this.formData.ctelephone)) {
            Toast('请输入正确的手机号码');
            return;
          }
        }
        let that = this;
        Service.saveMail(this.formData, result => {
          if (result.success) {
            that.$router.push('/team/order?appid=' + that.appId + '&temporaryId=' + that.formData.temporaryId);
          }
        });
      },
      upload(e){
        let data = new FormData(document.getElementById("testform"));
        let that = this;
        this.isUploading = true;
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
            that.formData.headImgUrl = that.utils.getConstant().DOMAIN + result.key;
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

  .body {
    position: absolute;
    width: 100%;
    bottom: 1px;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }

  .body .top {
    background: #f87571;
    height: 1.8133rem;
    width: 100%;
  }

  .example {
    position: absolute;
    top: 0.267rem;
    background: #ffffff;
    width: 9.12rem;
    height: 3.63rem;
    border-radius: 0.3rem;
    left: 0.44rem;
    box-shadow: 0 0 15px #f87571;
  }

  .example .title {
    height: 0.8533rem;
    line-height: 0.8533rem;
    padding-left: 0.4rem;
  }

  .example .e-content {
    display: flex;
    display: -webkit-flex;
  }

  .example .e-content img {
    width: 1.667rem;
    height: 1.667rem;
    margin-left: 1.2rem;
    margin-right: 0.9067rem;
  }

  #uploaderButton {
    display: block;
    margin-top: 2.9467rem;
    width: 100%;
    text-align: center;
  }

  #uploaderButton img{
    width: 1.733rem;
    height: 1.733rem;
  }

  .content{
    position: relative;
  }

  .content .input {
    text-align: center;
    margin-top: 0.267rem;
  }

  .content .input>div{
    width: 9.16rem;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #a2a2a2;
    margin: 0.3rem auto 0;
  }

  .content .input input {
    color: #8c8c8c;
    width: 100%;
    padding-left: 0.267rem;
    background: transparent;
    border-right: none;
    border-radius: none;
  }

  .content .headerImg{
    position: absolute;
    width: 1.733rem;
    height: 1.733rem;
    border-radius: 50%;
    top: 0;
    left: 4.1335rem;
  }

  .content .headerImg img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .button{
    width: 100%;
    height:1.2rem;
    line-height: 1.2rem;
    background: #ffffff;
    color: #e33e45;
    text-align: center;
    margin: 1.57rem auto 0;
    border-top: 1px solid #a2a2a2;
    position: absolute;
    bottom: 0;
  }

  .button>a{
    display: block;
    width: 100%;
    height: 100%;
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
