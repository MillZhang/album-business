<template>
  <div class="publish">
    <section class="bar-footer">
      <div class="footer">
        <a href="javascript:;" @click="completeAndPublish">完成信息并发布</a>
      </div>
    </section>
    <section class="bar-content">
      <section class="p-top">
        <p>距离活动结束还有
          <span style="color:#F04744;padding:0 .2rem">{{publishData.dayNum}}</span>天
        </p>
      </section>
      <section class="p-center">
        <div class="p-line">
          <div class="icon">
            <img src="../../assets/images/publish/icon-publisher.png" alt="">
          </div>
          <div class="label">
            发起人姓名
          </div>
          <div class="content input">
            <input type="text" placeholder="请输入发起人姓名" v-model="formData.sponsor">
          </div>
        </div>

        <div class="p-line">
          <div class="icon">
            <img src="../../assets/images/publish/icon-timer.png" alt="">
          </div>
          <div class="label long">
            <p>选择结束时间</p>
            <p class="small f10">活动结束以后,统一制作,请耐心等待哦!</p>
          </div>
          <div class="content go short" @click="selectEndtTime">
            {{publishData.endTime}}
          </div>
        </div>

        <div class="p-line">
          <div class="icon">
            <img src="../../assets/images/publish/icon-photo.png" alt="">
          </div>
          <div class="label">
            <p>相册名称</p>
          </div>
          <div class="content">
            {{publishData.albumName}}
          </div>
        </div>

        <div class="p-line">
          <div class="icon">
            <img src="../../assets/images/publish/icon-template.png" alt="">
          </div>
          <div class="label">
            <p>选用模板</p>
          </div>
          <div class="content">
            {{publishData.tempName}}
          </div>
        </div>
        <div class="p-line">
          <div class="icon">
            <img src="../../assets/images/publish/icon-price.png" alt="">
          </div>
          <div class="label">
            <p>价格</p>
          </div>
          <div class="content">
            {{publishData.price}}元
          </div>
        </div>
      </section>
      <section class="p-mail">
        <div class="title">统一收货与通讯录(可以多选)</div>
        <div class="block address">
          <div class="check">
            <mt-checklist
              v-model="addrSetting"
              :options="optionsA">
            </mt-checklist>
          </div>
          <div class="content">
            <p class="title">统一默认地址</p>
            <div class="line">
              <label>姓名</label>
              <input type="text" placeholder="请输入收货人姓名" v-model="formData.name">
            </div>
            <div class="line">
              <label>手机号码</label>
              <input type="text" placeholder="请输入收货人手机号码" v-model="formData.telephone" maxlength="11">
            </div>
            <div class="line">
              <label>详细地址</label>
              <input type="text" placeholder="请输入详细地址" v-model="formData.address">
            </div>
          </div>
        </div>
        <div class="block mail">
          <div class="check">
            <mt-checklist
              v-model="contactsSetting"
              :options="optionsB">
            </mt-checklist>
          </div>
          <div class="content">
            <p class="title">通讯录</p>
            <p class="tips">
              收集大家基本信息,显示在相册最后
            </p>
          </div>
        </div>
      </section>
      <section class="p-introduce">
        <div class="title">活动介绍</div>
        <textarea placeholder="写点关于本次活动的介绍......"
                  id="" cols="30" rows="10"
                  maxlength="100"
                  v-model="formData.remark"
                  class="f14"></textarea>
        <p>限100字</p>
      </section>
    </section>
    <mt-popup
      v-model="popupVisible"
      position="bottom"
      popup-transition="popup-fade">
      <div class="pop-button">
        <a href="javascript:;" @click="popupVisible=false">取消</a>
        <a href="javascript:;" @click="ensureSelectEndTime">确定</a>
      </div>
      <mt-picker :slots="slots"
                 @change="onValuesChange"
                 :visibleItemCount="7"
                 :itemHeight="itemHeight"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import  Service from 'service/service'
  import {Toast, MessageBox} from 'mint-ui';
  import Util from 'jsPath/tool/Util'
  export default{
    name: 'publish',
    data(){
      return {
        addrSetting: [],
        contactsSetting: [],
        optionsA: ['A'],
        optionsB: ['B'],
        popupVisible: false,
        startTime: '',
        itemHeight: 0,
        appId: this.$router.currentRoute.query.appid,
        tempTime: '',
        publishData: {
          albumName: '',
          dayNum: 0,
          endTime: '',
          price: '',
          tempName: ''
        },
        formData: {
          ticket: this.config.ticket,
          temporaryId: this.$router.currentRoute.query.temporaryId,
          sponsor: '',
          remark: '',
          addrSetting: false,
          name: '',
          telephone: '',
          address: '',
          endTime: '',
          contactsSetting: false
        },
        slots: [{
          flex: 1,
          defaultIndex: 0,
          values: []
        }]
      }
    },
    created(){
      this.fetchPublishData();
      let fontSize = Number(document.documentElement.style.fontSize.replace('px', ''));
      this.itemHeight = Number(fontSize);
    },
    methods: {
      fetchPublishData(){
        let that = this;
        Service.getPublish({
          ticket: this.formData.ticket,
          temporaryId: this.formData.temporaryId
        }, result => {
          if (result.success) {
            let endTime = result.data.endTime,
              startDate = new Date(endTime);
            this.startTime = endTime;
            result.data.endTime = Util.formateDate(startDate, 'MM-dd');
            for (let i = 0; i <= 7; i++) {//默认可选日期范围7-14
              let d = new Date(startDate);
              d.setDate(d.getDate() + i);
              that.slots[0].values.push(Util.formateDate(d, 'MM-dd'));
            }
            that.publishData = result.data;
          }
        });
      },
      onValuesChange(picker, values) {
        this.tempTime = values[0];
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },
      selectEndtTime(e){
        e.preventDefault();
        this.popupVisible = true;
      },
      ensureSelectEndTime(e){
        e.preventDefault();
        this.publishData.endTime = this.tempTime;
        this.publishData.dayNum = 7 + Number(this.slots[0].values.indexOf(this.tempTime));
        this.popupVisible = false;
      },
      completeAndPublish(e){
        e.preventDefault();
        let that = this;
        if (undefined != this.addrSetting[0]) {
          this.formData.addrSetting = true;
        } else {
          this.formData.addrSetting = false;
        }
        if (undefined != this.contactsSetting[0]) {
          this.formData.contactsSetting = true;
        } else {
          this.formData.contactsSetting = false;
        }
        if (this.validateData()) {
          let days = Number(this.publishData.dayNum - 7),
            startDate = new Date(this.startTime);
          let endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + days);
          this.formData.endTime = Util.formateDate(endDate, 'yyyy-MM-dd');
          MessageBox({
            title: '',
            message: '完成活动发布后,将不能再修改<br>活动模板,确认要继续吗?',
            showCancelButton: true
          }).then(action => {
            if (action == 'confirm') {
              Service.savePublish(that.formData, result => {
                if (result.success) {
                  that.$router.push('/team/share?temporaryId=' + result.data.temporaryId + '&appid=' + that.appId);
                } else {
                  Toast(result.message);
                  that.$router.push('/team/share?temporaryId=' + result.data.temporaryId + '&appid=' + that.appId);
                }
              });
            }
          });
        }
      },
      validateData(){
        let sponsor = this.formData.sponsor;
        if ("" == sponsor) {
          Toast('请输入发起人姓名');
          return false;
        }

        if (this.formData.addrSetting) {
          if ('' == this.formData.name) {
            Toast('请输入收货人姓名');
            return false;
          }
          if ('' == this.formData.telephone) {
            Toast('请输入收货人联系方式');
            return false;
          }

          if (!/^1[3|4|5|7|8]\d{9}$/.test(this.formData.telephone)) {
            Toast('手机号码格式不正确');
            return false;
          }
          if ('' == this.formData.address) {
            Toast('请输入详细地址');
            return false;
          }
        }
        return true
      }
    }
  }
</script>
<style scoped>
  .publish {
    background: #ededed;
  }

  .p-top {
    background: url("../../assets/images/publish/p-bg.png") center no-repeat;
    background-size: cover;
    width: 10rem;
    height: 2rem;
    color: #ffffff;
    text-align: center;
    line-height: 1.5rem;
    font-size: 16px;
    background-color: #fff;
  }

  .p-center {
    padding-top: 0.5rem;
    background: #ffffff;
  }

  [data-dpr="2"] .p-top {
    font-size: 32px;
  }

  [data-dpr="3"] .p-top {
    font-size: 48px;
  }

  .p-line {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    height: 1.067rem;
    border-bottom: 1px solid #e7e7e7;
    margin-left: 1rem;
    width: 9rem;
    position: relative;
  }

  .p-line .icon {
    position: absolute;
    width: 0.5rem;
    left: -0.7rem;
    top: 0.3rem;
  }

  .p-line .icon img {
    width: 100%;
  }

  .p-line .label {
    width: 5rem;
  }

  .p-line .label.long {
    width: 8rem;
  }

  .p-line .label .small {
    color: #ccc;
    margin-top: 0.2rem;
  }

  .p-line > .content {
    width: 4rem;
    text-align: right;
    padding-right: 0.5rem;
    height: 100%;
    line-height: 1.067rem;
    position: relative;
    color: #b4b4b4;
  }

  .p-line > .content.short {
    width: 2rem;
  }

  .p-line > .content.go {
    padding-right: 0.8rem;
  }

  .p-line > .content.go:after {
    content: '';
    position: absolute;
    right: 0.3rem;
    width: 0.3rem;
    height: 0.3rem;
    border-top: 2px solid #cccccc;
    border-right: 2px solid #cccccc;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    top: 0.4rem;
  }

  .p-line .content.input {
    width: 4rem;
  }

  .p-line .content input {
    border: none;
    width: 100%;
    text-align: right;
    color: #b4b4b4;
  }

  .p-mail {
    margin-top: 0.3067rem;
  }

  .p-mail > .title {
    background: #f8f8f8;
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.56rem;
  }

  .p-mail .block {
    display: flex;
    display: -webkit-flex;
    padding-left: 0.56rem;
    background: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 0.2rem;
  }

  .p-mail .block .check {
    margin-top: 0.2rem;
    width: 1.5rem;
  }

  .p-mail .block .content {
    margin-top: 0.2rem;
  }

  .p-mail .block .content .tips {
    color: #cacaca;
    margin-top: 0.2rem;
  }

  .p-mail .block .line {
    display: flex;
    display: -webkit-flex;
    margin-top: 0.4rem;
  }

  .p-mail .block .line label {
    width: 2rem;
  }

  .p-introduce {
    margin-top: 0.33rem;
    margin-bottom: 1rem;
  }

  .p-introduce .title {
    background: #f8f8f8;
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.56rem;
  }

  .p-introduce > p {
    text-align: right;
    padding-right: 0.5rem;
    background: #ffffff;
    height: 0.7333rem;
    line-height: 0.7333rem;
    margin-top: -0.1rem;
  }

  .p-introduce textarea {
    width: 100%;
    box-sizing: border-box;
    height: 2rem;
  }

  .footer {
    height: 1.2rem;
    background: #ffffff;
  }

  .footer > a {
    display: block;
    width: 100%;
    line-height: 1.2rem;
    text-align: center;
    color: #fc6767;
  }

  .pop-button {
    height: 0.965rem;
    line-height: 0.965rem;
    display: flex;
    display: -webkit-flex;
    border-bottom: 1px solid #cccccc;
  }

  .pop-button > a {
    display: block;
    flex: 1;
    -webkit-flex: 1;
    text-align: center;
    color: #fc6767;
  }

  .pop-button > a:first-child {
    border-right: 1px solid #cccccc;
  }
</style>
