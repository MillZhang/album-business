<template>
  <div class="address-list" style="background: #ffffff;height: 100%">
    <template v-if="addressList.length>0">
      <template v-for="(item,index) in addressList">
        <div class="address-item" :class="{default:item.isDefault}" @click="selectAddress($event,item.id)">
          <p>{{item.address}}</p>
          <p class="info">{{item.name}} {{item.telephone}}</p>
        </div>
      </template>
    </template>
    <template v-else>

    </template>
    <router-link class="address-add" :to="{path:'add',query:{appid:appId,temporaryId:temporaryId}}">添加地址</router-link>
  </div>
</template>
<script>
  import Service from 'service/service'
  export default{
    name: 'addressList',
    data(){
      return {
        addressList: [],
        ticket: this.config.ticket,
        temporaryId: this.$router.currentRoute.query.temporaryId,
        appId: this.$router.currentRoute.query.appid
      }
    },
    created(){
      this.fetchAddressList();
    },
    methods: {
      fetchAddressList(){
        let that = this;
        Service.getAddressList({
          ticket: this.ticket
        }, result => {
          if (result.success) {
            that.addressList = result.data;
          }
        })
      },
      selectAddress(e, id){
        e.preventDefault();
        this.$router.push('/base/order?appid=' + this.appId + '&temporaryId=' + this.temporaryId + '&addressId=' + id);
      }
    }
  }
</script>
<style scoped>
  .address-list {
    width: 100%;
    height: 16.68rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .address-item {
    padding: 0.67rem 0.3732rem;
    border-bottom: 1px solid #e0dfe2;
    position: relative;
    padding-left: 0.467rem;
  }

  .address-item.default:after {
    content: '';
    position: absolute;
    width: 1rem;
    height: 1rem;
    right: 0rem;
    top: 0.1rem;
    background: url("../../assets/images/icon/icon-address-default.png") center no-repeat;
    background-size: contain;
  }

  .address-item .info {
    margin-top: 0.3rem;
  }

  .address-add {
    display: block;
    width: 6.04rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    border: 1px solid #000000;
    border-radius: 1rem;
    margin: 6rem auto 0;
  }
</style>
