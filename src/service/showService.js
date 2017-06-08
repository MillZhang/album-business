/**
 * === Javascript Module ======================
 * Copyright (c) 2016 Mill, All rights reserved.
 *
 * @version 1.0
 * @author Mill
 * @description 爱怕爱秀服务接口类
 * ---2017/5/24----------------------------------
 */
const Host = '';
export default {
  URL: {
    INDEX_MESSAGE: '/synergy/show/getSetting',
    RANK_LIST: '/synergy/show/getRanking',
    ZAN: '/synergy/show/laud',
    USER_STATUS: '/synergy/show/getState',
    PRODUCT_DETAIL: '/synergy/show/getIntroduction',
    BAO_MING: '/synergy/show/activity/apply',
    PAY: '/synergy/show/pay/weixin',
    COUPON_CODE: '/synergy/show/pay/getCouponMoneyByCode',
    PRODUCT_PRICE: '/synergy/show/getPrice',
    ORDER_INFO: '/synergy/show/order/getData',
    PICKUP_ADDRESS: '/synergy/show/order/getAddressList',
    CREATE_ORDER: '/synergy/show/order/neworder',
    ORDER_NO: '/synergy/show/order/orderSuccess',
    ORDER_LIST: '/synergy/show/order/getOrderList',
    ORDER_DETAIL: '/synergy/show/order/getOrderDetail'
  },
  getIndexMessage(data, callback) {
    this.Request_Get(this.URL.INDEX_MESSAGE, data, callback);
  },
  getRankList(data, callback) {
    this.Request_Get(this.URL.RANK_LIST, data, callback);
  },
  postZanData(data, callback) {
    this.Request_Get(this.URL.ZAN, data, callback);
  },
  getUserInfoStatus(data, callback) {
    this.Request_Get(this.URL.USER_STATUS, data, callback);
  },
  getProductDetail(data, callback) {
    this.Request_Get(this.URL.PRODUCT_DETAIL, data, callback);
  },
  postBMData(data, callback) {
    this.Request_Post(this.URL.BAO_MING, data, callback);
  },
  pay(data, callback) {
    this.Request_Post(this.URL.PAY, data, callback);
  },
  getCouponMoneyByCode(data, callback) {
    this.Request_Get(this.URL.COUPON_CODE, data, callback);
  },
  getProductPrice(data, callback) {
    this.Request_Get(this.URL.PRODUCT_PRICE, data, callback);
  },
  getOrderInfo(data, callback) {
    this.Request_Get(this.URL.ORDER_INFO, data, callback);
  },
  getPickUpAddressList(data, callback) {
    this.Request_Get(this.URL.PICKUP_ADDRESS, data, callback);
  },
  createOrder(data, callback) {
    this.Request_Post(this.URL.CREATE_ORDER, data, callback);
  },
  getOrderNo(data, callback) {
    this.Request_Get(this.URL.ORDER_NO, data, callback);
  },
  getOrderList(data, callback) {
    this.Request_Get(this.URL.ORDER_LIST, data, callback);
  },
  getOrderDetail(data, callback) {
    this.Request_Get(this.URL.ORDER_DETAIL, data, callback);
  },
  Request_Get(URL, PARAM, callback) {
    let param = [],
      data = '';
    if (typeof(PARAM) == 'object') {
      for (let key in PARAM) {
        param.push(key + '=' + PARAM[key]);
      }
      if (param.length > 0) {
        data = '?' + param.join('&');
      }
    } else {
      data = PARAM;
    }
    console.log(data);
    App.$http.get(URL + data).then(response => {
      let result = response.data;
      callback(result);
    });
  },
  Request_Post(URL, PARAM, callback) {
    App.$http.post(URL, PARAM).then(response => {
      let result = response.data;
      callback(result)
    });
  }
}
