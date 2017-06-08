/**
 * === Javascript Module ======================
 * Copyright (c) 2016 Mill, All rights reserved.
 *
 * @version 1.0
 * @author Mill
 * @description 服务接口类
 * ---2017/2/24----------------------------------
 */
const Host = '';
let { Album, AlbumPageinfoItem, AlbumPageDetailsItem } = require('jsPath/module/AlbumData');
export default {
  URL: {
    //配置编辑器
    Register_Url: Host + '/synergy/register',
    //获取微信token
    WeixinTokenUrl: Host + '/synergy/xc/photo/getConfig',
    //获取七牛token
    QiniuTokenUrl: Host + '/synergy/xc/common/getQNToken?space=photos',
    //产品列表
    ProductList_Url: Host + '/synergy/product/getList',
    //产品详情
    ProductDetail_Url: Host + '/synergy/product/getIntroductions',
    //作品库列表
    WorkLibList_Url: Host + '/synergy/album/getMyLibrary',
    //根据相簿id获取相簿
    AlbumJsonById_Url: Host + '/synergy/album/getAlbumJsonByAlbumId',
    //订单列表
    OrderList_Url: Host + '/synergy/order/getOrderList',
    //发布相簿
    Publish_Url: Host + '/synergy/release/getData',
    //保存发布
    SavePublish_Url: Host + '/synergy/release/createActivity',
    //获取发布数据
    ShareData_Url: Host + '/synergy/join/getData',
    //订单详情
    OrderDetail_Url: Host + '/synergy/order/getOrderDetails',
    //订单明细
    OrderInfo_Url: Host + '/synergy/order/getOrderInfo',
    //相簿json
    AlbumJsonData_Url: Host + '/synergy/album/getAlbumJson',
    //根据地址id获取地址数据
    AddressItem_Url: Host + '/synergy/address/getById',
    //领取相册
    ReceiveAlbum_Url: Host + '/synergy/join',
    //活动相簿
    ActivityAlbum_Url: Host + '/synergy/album/activity/getAlbumJson',
    //获取地址列表
    AddressList_Url: Host + '/synergy/address/list',
    //保存地址
    AddressSave_Url: Host + '/synergy/address/saveAddress',
    //保存订单
    OrderSave_Url: Host + '/synergy/order/saveOrder',
    //微信支付接口
    WeiXinPay_Url: Host + '/synergy/pay/weixin',
    //免支付
    NonPayment: Host + '/synergy/order/modifyState',
    //保存通讯录
    MailSave_Url: Host + '/synergy/album/createContacts',
    //根据相簿id获取相簿封面图
    AlbumCoverImage_Url: Host + '/synergy/album/getAlbumCoverImg',
    //作品库获取分享标语
    WorkLibShareSlogan_Url: Host + '',
    //淘宝介入获取配置信息
    TaoBaoAccesss_Url: Host + '/synergy/order/activity/getSettings',
    //淘宝接入订单详情
    TaoBaoAccesssDetail_Url: Host + '/synergy/order/tb/getSuccess'
  },
  EditorUrl: {
    TemplateUrl: Host + '/synergy/xc/photo/getTemplateList',
    QiniuTokenUrl: Host + '/synergy/xc/common/getQNToken?space=photos',
    WeixinTokenUrl: Host + '/synergy/xc/photo/getConfig',
    UploadImageUrl: Host + '/synergy/xc/photo/uploadImage',
    SaveImageUrl: Host + '/synergy/xc/photo/saveImage',
    ImageListUrl: Host + '/synergy/xc/photo/getPhotoList',
    LayoutUrl: Host + '/synergy/xc/photo/getLayoutInfo',
    ProductUrl: Host + '/synergy/xc/photo/getProductById',
    TicketCheckUrl: Host + '/synergy/xc/common/checkTicket',
    SaveAlbumUrl: Host + '/synergy/xc/photo/saveAlbum',
    SaveAlbumJsonUrl: Host + '/synergy/xc/photo/saveAlbumJson',
    TemplateLaoutListUrl: Host + '/synergy/xc/photo/getTempLayoutList',
    AlbumCacheDataUrl: Host + '/synergy/xc/photo/getJsonByTicket',
    DeletePhotoImageUrl: Host + '/synergy/xc/photo/deleteNativeImg',
    OrderHasCreatedUrl: Host + '/synergy/order/checkIsExist',
    TemplateCoverImageUrl: Host + '/synergy/xc/photo/getTempCoverImg',
    AlbumJsonUrl: Host + '/synergy/album/getAlbumJson'
  },
  PaintUrl: {
    GeneratePaintUrl: Host + '/synergy/painting/handle',
    CreateOrderUrl: Host + '/synergy/painting/order/save',
    PaintDataUrl: Host + '/synergy/painting/order/getData',
    OrderDetailUrl: Host + '/synergy/painting/order/getOrderDetails',
    OrderListUrl: Host + '/synergy/painting/order/getOrderList',
    OrderInfoUrl: Host + '/synergy/painting/order/getOrderDetails',
    WeiXinPayUrl: Host + '/synergy/painting/pay/weixin'
  },
  wxConfig(data, callback) {
    this.Request_Post(this.URL.WeixinTokenUrl, data, callback)
  },
  getQiniuToken(callback) {
    this.Request_Get(this.URL.QiniuTokenUrl, '', callback);
  },
  registerAlbumSDK(data, callback) {
    this.Request_Post(this.URL.Register_Url, data, callback)
  },
  getProductList(data, callback) {
    this.Request_Get(this.URL.ProductList_Url, data, callback)
  },
  getProductDetail(data, callback) {
    this.Request_Get(this.URL.ProductDetail_Url, data, callback)
  },
  getWorkLibList(data, callback) {
    this.Request_Get(this.URL.WorkLibList_Url, data, callback)
  },
  getOrderList(data, callback) {
    this.Request_Get(this.URL.OrderList_Url, data, callback)
  },
  getOrderInfo(data, callback) {
    this.Request_Get(this.URL.OrderInfo_Url, data, callback)
  },
  getPublish(data, callback) {
    this.Request_Get(this.URL.Publish_Url, data, callback)
  },
  savePublish(data, callback) {
    this.Request_Post(this.URL.SavePublish_Url, data, callback);
  },
  getShareData(data, callback) {
    this.Request_Get(this.URL.ShareData_Url, data, callback)
  },
  getShareSlogan(data, callback) {
    this.Request_Get(this.URL.WorkLibShareSlogan_Url, data, callback);
  },
  getOrderDetailData(data, callback) {
    this.Request_Get(this.URL.OrderDetail_Url, data, callback)
  },
  getAlbumJson(data, callback) {
    this.Request_Get(this.URL.ActivityAlbum_Url, data, callback)
  },
  getAlbumJsonByAlbumId(data, callback) {
    this.Request_Get(this.URL.AlbumJsonById_Url, data, callback)
  },
  receiveAlbum(data, callback) {
    this.Request_Post(this.URL.ReceiveAlbum_Url, data, callback);
  },
  getActivityAlbum(data, callback) {
    this.Request_Get(this.URL.ActivityAlbum_Url, data, callback)
  },
  getAddressById(data, callback) {
    this.Request_Get(this.URL.AddressItem_Url, data, callback)
  },
  getAddressList(data, callback) {
    this.Request_Get(this.URL.AddressList_Url, data, callback)
  },
  saveAddress(data, callback) {
    this.Request_Post(this.URL.AddressSave_Url, data, callback);
  },
  saveOrder(data, callback) {
    this.Request_Post(this.URL.OrderSave_Url, data, callback);
  },
  wxPay(data, callback) {
    this.Request_Post(this.URL.WeiXinPay_Url, data, callback);
  },
  saveMail(data, callback) {
    this.Request_Post(this.URL.MailSave_Url, data, callback);
  },
  getAlbumCoverImage(data, callback) {
    this.Request_Get(this.URL.AlbumCoverImage_Url, data, callback)
  },
  //editor service
  checkTicket(data, callback) {
    this.Request_Get(this.EditorUrl.TicketCheckUrl, data, callback);
  },
  getLayout(data, callback) {
    this.Request_Get(this.EditorUrl.LayoutUrl, data, callback);
  },
  getTemplateLayoutList(data, callback) {
    this.Request_Get(this.EditorUrl.TemplateLaoutListUrl, data, callback);
  },
  getCoverImageByTempId(data, callback) {
    this.Request_Get(this.EditorUrl.TemplateCoverImageUrl, data, callback);
  },
  getProduct(data, callback) {
    this.Request_Get(this.EditorUrl.ProductUrl, data, callback);
  },
  getImageInfo(key, callback) {
    const host = App.utils.getConstant().DOMAIN;
    $.get(host + key + '?imageInfo', data => {
      callback(data);
    });
  },
  getImageList(data, callback) {
    this.Request_Get(this.EditorUrl.ImageListUrl, data, callback);
  },
  getTemplateList(data, callback) {
    this.Request_Get(this.EditorUrl.TemplateUrl, data, callback);
  },
  uploadImage(data, callback) {
    this.Request_Post(this.EditorUrl.UploadImageUrl, data, callback);
  },
  saveImage(data, callback) {
    this.Request_Post(this.EditorUrl.SaveImageUrl, data, callback);
  },
  saveAlbumJson(data, callback) {
    this.Request_Post(this.EditorUrl.SaveAlbumJsonUrl, data, callback);
  },
  saveAlbum(data, jsonId, scale, callback) {
    App.$http.post(this.EditorUrl.SaveAlbumUrl,
      this.getSaveAlbumData(data, jsonId, scale)
    ).then(response => {
      let result = response.data;
      callback(result);
    });
  },
  getAlbumCacheData(data, callback) {
    this.Request_Get(this.EditorUrl.AlbumCacheDataUrl, data, callback);
  },
  getAlbumJson(data, callback) {
    this.Request_Get(this.EditorUrl.AlbumJsonUrl, data, callback);
  },
  deletePhotoImage(data, callback) {
    this.Request_Post(this.EditorUrl.DeletePhotoImageUrl, data, callback);
  },
  clearCache(data, callback) {
    this.Request_Get(this.EditorUrl.OrderHasCreatedUrl, data, callback);
  },
  nonPayment(data, callback) {
    this.Request_Get(this.URL.NonPayment, data, callback);
  },
  generatePaint(data, callback) {
    this.Request_Post(this.PaintUrl.GeneratePaintUrl, data, callback);
  },
  getPaintData(data, callback) {
    this.Request_Get(this.PaintUrl.PaintDataUrl, data, callback);
  },
  generatePaintOrder(data, callback) {
    this.Request_Post(this.PaintUrl.CreateOrderUrl, data, callback);
  },
  getPaintOrderDetail(data, callback) {
    this.Request_Get(this.PaintUrl.OrderDetailUrl, data, callback);
  },
  getPaintOrderList(data, callback) {
    this.Request_Get(this.PaintUrl.OrderListUrl, data, callback);
  },
  getPaintOrderInfo(data, callback) {
    this.Request_Get(this.PaintUrl.OrderInfoUrl, data, callback);
  },
  paintPay(data, callback) {
    this.Request_Post(this.PaintUrl.WeiXinPayUrl, data, callback);
  },
  getTaoBaoAccessSetting(data, callback) {
    this.Request_Get(this.URL.TaoBaoAccesss_Url, data, callback);
  },
  getTaoBaoAccessDetail(data, callback) {
    this.Request_Get(this.URL.TaoBaoAccesssDetail_Url, data, callback);
  },
  getSaveAlbumData(data, jsonId, scale) {
    let album = new Album();
    album.ticket = App.config.ticket;
    album.albumJsonId = jsonId;
    album.cfrom = App.utils.isAndroid() ? 0 : 1;
    for (let i = 0; i < data.length; i++) {
      let pageItem = data[i],
        pagePhotoList = pageItem.list;
      let albumPageinfoItem = new AlbumPageinfoItem();
      albumPageinfoItem.pageindex = i - 2;
      albumPageinfoItem.layoutStyle = {
        main: pageItem.main,
        sub: pageItem.sub
      };

      albumPageinfoItem.ext2 = pageItem.temp;
      for (let j = 0; j < pagePhotoList.length; j++) {
        let pagePhotoItem = pagePhotoList[j],
          left = 0,
          top = 0;
        if (null != pagePhotoItem.location.position) {
          left = pagePhotoItem.location.position.left;
          top = pagePhotoItem.location.position.top;
        }
        let albumPageDetailsItem = new AlbumPageDetailsItem();
        albumPageDetailsItem.offsetx = Math.abs(left).toFixed(0);
        albumPageDetailsItem.offsety = Math.abs(top).toFixed(0);
        albumPageDetailsItem.scale = scale;
        albumPageDetailsItem.srcw = pagePhotoItem.width;
        albumPageDetailsItem.srch = pagePhotoItem.height;
        albumPageDetailsItem.layoutIndex = pagePhotoItem.location.layoutIndex;
        albumPageDetailsItem.imageid = pagePhotoItem.key;
        albumPageDetailsItem.degree = Number(pagePhotoItem.degree);
        albumPageinfoItem.albumPageDetailslist.push(albumPageDetailsItem);
      }
      album.albumPageinfo.push(albumPageinfoItem);
    }
    console.log(album)
    return album;
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
