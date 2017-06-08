<template>
  <div class="address-add" style="background: #ffffff;">
    <div class="page-group">
      <div class="page page-current">
        <section class="form">
          <mt-field label="收货人"
                    placeholder="请输入您的姓名"
                    :attr="{maxlength: 10}"
                    v-model="formData.name.value"
                    :state="formData.name.state">
          </mt-field>
          <mt-field label="手机号码"
                    placeholder="请输入联系手机号码"
                    :attr="{maxlength: 11}"
                    type="tel"
                    v-model="formData.telephone.value"
                    :state="formData.telephone.state">
          </mt-field>
          <mt-field label="省市区" id="city-picker"
                    placeholder="省/市/区"
                    v-model="formData.province.value"
                    :state="formData.province.state">
          </mt-field>
          <mt-field label="详细地址"
                    placeholder="请输入街道小区信息"
                    :attr="{ maxlength: 50}"
                    v-model="formData.detail.value"
                    :state="formData.detail.state">
          </mt-field>
          <div class="line">
            <mt-checklist
              title=""
              v-model="defaultAddress"
              :options="['A']">
            </mt-checklist>
            <span>设置为默认地址</span>
          </div>
        </section>
        <section class="footer">
          <a href="javascript:;" @click="submitForm">确定</a>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  require('jsPath/lib/sm')
  require('jsPath/lib/sm-city')
  import {Toast} from 'mint-ui'
  import Service from 'service/service'
  export default{
    name: 'addressAdd',
    data(){
      return {
        ticket: this.config.ticket,
        temporaryId: this.$router.currentRoute.query.temporaryId,
        appId: this.$router.currentRoute.query.appid,
        defaultAddress: [],
        isDefault: false,
        formData: {
          name: {
            value: '',
            state: ''
          },
          telephone: {
            value: '',
            state: ''
          },
          province: {
            value: '',
            state: ''
          },
          detail: {
            value: '',
            state: ''
          }
        }
      }
    },
    created(){

    },
    methods: {
      submitForm(e){
        e.preventDefault();
        this.isDefault = Boolean(this.defaultAddress[0]);
        this.formData.province.value = $("#city-picker").find('input').val();
        if (this.formData.name.value == '') {
          this.formData.name.state = 'error';
          Toast('请输入收货人姓名');
          return;
        } else {
          this.formData.name.state = 'success';
        }

        if (this.formData.telephone.value == '') {
          this.formData.telephone.state = 'error';
          Toast('请输入联系电话');
          return;
        } else if (!/^1[3|4|5|7|8]\d{9}$/.test(this.formData.telephone.value)) {
          this.formData.telephone.state = 'error';
          Toast('请输入正确的手机号码');
          return;
        } else {
          this.formData.telephone.state = 'success';
        }
        if (this.formData.province.value == '') {
          this.formData.province.state = 'error';
          Toast('请选择省市区');
          return;
        } else {
          this.formData.province.state = 'success';
        }

        if (this.formData.detail.value == '') {
          this.formData.detail.state = 'error';
          Toast('请输入详细地址');
          return;
        } else {
          this.formData.detail.state = 'success';
        }
        this.isDefault = Boolean(this.defaultAddress[0]);
        let that = this;
        Service.saveAddress({
          ticket: this.ticket,
          name: this.formData.name.value,
          telephone: this.formData.telephone.value,
          city: this.formData.province.value,
          address: this.formData.detail.value,
          isDefault: this.isDefault
        }, result => {
          if (result.success) {
            that.$router.push('/team/order?appid=' + that.appId + '&temporaryId=' + that.temporaryId+'&addressId=' + result.data);
          }
        });
      }
    },
    mounted(){
      $("#city-picker").find('input').cityPicker({
        toolbarTemplate: '<header class="bar bar-nav">\
    <button class="button button-link pull-right close-picker">确定</button>\
    <h1 class="title">选择收货地址</h1>\
    </header>'
      });
    }
  }
</script>
<style scoped>
  @import "../../assets/css/sm.css";

  .address-add {
    width: 100%;
    height: 100%;
  }

  .footer > a {
    display: block;
    width: 6.04rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border: 1px solid #000000;
    border-radius: 1rem;
    position: absolute;
    bottom: 0.1rem;
    left: 2rem;
  }

  .line {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }
</style>
