<template>
  <div class="createOrder">
    <template v-if="orderInfo.addrSetting">
      <router-link class="order-address" :to="{path:'address',query:{appid:appId,temporaryId:temporaryId }}">
        <img src="../../assets/images/icon/icon-address-line.png" alt="">
        <div class="address-line">
          <p class="name">收货人:{{address.name}}</p>
          <p class="tel">联系电话:{{address.telephone}}</p>
          <p class="address">收货地址:{{address.address}}</p>
        </div>
        <div class="go"></div>
      </router-link>
    </template>
    <template v-else>
      <router-link class="order-address" :to="{path:'address',query:{appid:appId,temporaryId:temporaryId }}">
        <img src="../../assets/images/icon/icon-address-line.png" alt="">
        <template v-if="address.id">
          <div class="address-line">
            <p class="name">收货人:{{address.name}}</p>
            <p class="tel">联系电话:{{address.telephone}}</p>
            <p class="address">收货地址:{{address.address}}</p>
          </div>
          <div class="go"></div>
        </template>
        <template v-else>
          <p>点击添加收货地址</p>
        </template>
      </router-link>
    </template>
    <!-- 订单内容 -->
    <div class="order-content">
      <!-- 订单信息 -->
      <div class="line order-info">
        <div class="image">
          <img :src="orderInfo.albumImg+'?imageMogr2/thumbnail/600x600'" alt="">
        </div>
        <div class="info">
          <p>{{orderInfo.productName}}</p>
          <p style="color: #727272;">{{orderInfo.albumName}} P数:{{orderInfo.pageSize}}</p>
          <p>¥{{(orderInfo.price)}}x{{orderNum}}</p>
        </div>
      </div>
      <!--数量-->
      <div class="line order-count">
        <label>数量</label>
        <a href="javascript:;" class="minus" @touchstart="updateAmount($event,'m')">-</a>
        <input type="text" readonly :value="orderNum">
        <a href="javascript:;" class="plus" @touchstart="updateAmount($event,'p')">+</a>
      </div>
      <!-- 物流 -->
      <div class="line order-ps">
        <label>配送方式</label>
        <span>快递</span>
      </div>
      <!-- 备注 -->
      <div class="line order-remark">
        <label>买家留言:</label>
        <textarea v-model="remark" cols="30" rows="10" placeholder="您可以留言,100字以内" maxlength="100">
        </textarea>
      </div>
      <div class="line order-total">
        <p>共{{orderNum}}件商品&nbsp;合计:<span style="color: #df242b;"> ¥{{(orderInfo.price*orderNum).toFixed(2)}}</span></p>
      </div>
    </div>

    <!--发货时间 -->
    <div class="order-sendTime">
      <div class="title">发货时间</div>
      <div class="info">
        <img src="../../assets/images/icon/icon-send.png" alt="">
        <div style="margin-left: 0.3rem">
          <p>统一发货</p>
          <p class="statement">统一制作,尽快发货请耐心等待哦!</p>
        </div>
      </div>
    </div>
    <!--确认按钮 -->
    <div class="order-button">
      <p>总计:<span style="color: #df242b;">¥{{(orderInfo.price*orderNum).toFixed(2)}}</span></p>
      <a href="javascript:;" @click="createOrder">确认</a>
    </div>
  </div>
</template>
<script>
  import Service from 'service/service'
  import {Toast, MessageBox} from 'mint-ui'
  export default{
    name: 'createOrder',
    data(){
      return {
        address: {id: this.$router.currentRoute.query.addressId},
        orderInfo: {},
        ticket: this.config.ticket,
        temporaryId: this.$router.currentRoute.query.temporaryId,
        appId: this.$router.currentRoute.query.appid,
        orderNum: 1,
        remark: ''
      }
    },
    created(){
      this.fetchOrderInfo();
      this.fetchAddress();
    },
    methods: {
      fetchOrderInfo(){
        let that = this;
        Service.getOrderInfo({
          ticket: this.ticket,
          temporaryId: this.temporaryId
        }, result => {
          if (result.success) {
            that.orderInfo = result.data;
            if ('' != that.address.id && undefined != that.address.id)return;
            if (that.orderInfo.addrSetting) {
              that.address.id = that.orderInfo.addrId;
              that.address.address = that.orderInfo.address;
              that.address.name = that.orderInfo.name;
              that.address.telephone = that.orderInfo.telephone;
            }
          }
        });
      },
      fetchAddress(){
        let that = this;
        if (undefined == this.address.id)return;
        Service.getAddressById({
          id: this.address.id
        }, result => {
          if (result.success) {
            that.address = result.data;
          }
        });
      },
      updateAmount(e, type){
        e.preventDefault();
        if (type == 'm') {
          this.orderNum > 1 ? this.orderNum -= 1 : 1;
        } else if (type == 'p') {
          this.orderNum < 99 ? this.orderNum += 1 : 99;
        }
      },
      createOrder(e){
        e.preventDefault();
        if (undefined == this.address.id || null == this.address.id) {
          Toast('请选择收货地址');
          return;
        }
        let that = this;
        Service.saveOrder({
          ticket: this.ticket,
          temporaryId: this.temporaryId,
          addrId: this.address.id,
          remark: this.remark,
          number: this.orderNum
        }, result => {
          if (result.success) {
            that.$router.push('/pay?appid=' + that.appId + '&orderId=' + result.data+'&from=base');
          } else {
            MessageBox({
              title: '',
              message: '订单已创建,不可修改.点击确认去支付',
            }).then(action => {
              that.$router.push('/pay?appid=' + that.appId + '&orderId=' + result.data+'&from=base');
            });
          }
        })
      }
    }
  }
</script>
<style scoped>
  .createOrder {
    background: #ebebf1;
    height: 100%;
    padding-top: 0.2rem;
  }

  .order-address {
    width: 100%;
    background: #ffffff;
    min-height: 2rem;
    position: relative;
    display: block;
  }

  .order-address img {
    width: 100%;
    position: absolute;
    top: 0;
  }

  .order-address .go {
    position: absolute;
    top: 1.2rem;
    right: 0.5rem;
    width: 0.333rem;
    height: 0.333rem;
    border-top: 2px solid #d7d7d7;
    border-right: 2px solid #d7d7d7;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .order-address > p {
    line-height: 2rem;
    text-align: center;
  }

  .order-address .line {
    display: flex;
    display: -webkit-flex;
    padding: 0 0.2533rem;
  }

  .order-address .line .name {
    width: 6.5rem;
  }

  .order-content {
    margin-top: 0.2533rem;
  }

  .order-content .line {
    min-height: 1.1067rem;
    background: #ffffff;
    border-bottom: 1px solid #e4e4e4;
    display: flex;
    display: -webkit-flex;
    padding: 0 0.2533rem;
  }

  .order-content .order-info {
    width: 100%;
    padding: 0.1867rem 0.2533rem;
  }

  .order-content .order-info .image {
    width: 2rem;
  }

  .order-content .order-info .info {
    margin-left: 0.2533rem;
  }

  .order-content .order-info .info > p {
    margin-bottom: 0.2rem;
  }

  .order-content .order-info .info > p:last-child {
    margin-bottom: 0;
  }

  .order-content .order-info .image img {
    width: 100%;
  }

  .order-content .order-count,
  .order-content .order-ps,
  .order-content .order-total {
    align-items: center;
    -webkit-align-items: center;
  }

  .order-content .order-total {
    flex-direction: row-reverse;
    -webkit-flex-direction: row-reverse;
  }

  .order-content .order-count > label {
    width: 6.733rem;
  }

  .order-content .order-count > a {
    width: 0.6rem;
    height: 0.6rem;
    line-height: 0.6rem;
    color: #ffffff;
    text-align: center;
    border-radius: 0.1rem;
    background: #cacaca;
    font-weight: bold;
  }

  .order-content .order-count > input {
    width: 1.145rem;
    height: 0.6rem;
    border: 1px solid #c4c4c4;
    margin: 0 0.1rem;
    text-align: center;
    border-radius: 0.1rem;
  }

  .order-content .order-ps > label {
    width: 8.5rem;
  }

  .order-content .order-remark > label {
    padding-top: 0.3rem;
  }

  .order-content .order-remark textarea {
    padding: 0.3rem 0.2rem;
  }

  .order-button {
    position: absolute;
    bottom: 0;
    background: #ffffff;
    height: 1.16rem;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
  }

  .order-button > p {
    width: 7.56rem;
    text-align: right;
    padding-right: 0.5rem;
  }

  .order-button > a {
    width: 2.44rem;
    height: 100%;
    line-height: 1.16rem;
    background: #6f6f6f;
    text-align: center;
    color: #ffffff;
  }

  .order-sendTime {
    background: #ffffff;
    margin-top: 0.2533rem;
  }

  .order-sendTime .title {
    height: 0.867rem;
    line-height: 0.867rem;
    padding-left: 0.2533rem;
    color: #cccccc;
    border-bottom: 1px solid #f0f0f0;
  }

  .order-sendTime .info {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    padding: 0.44rem 0.2533rem;
  }

  .order-sendTime .info img {
    width: 0.6533rem;
    height: 0.677rem;
  }

  .order-sendTime .info .statement {
    margin-top: 0.1rem;
    color: #cccccc;
  }

  .address-line {
    padding: 0.2533rem;
  }

  .address-line > p {
    height: 0.7rem;
    line-height: 0.7rem;
  }

</style>
