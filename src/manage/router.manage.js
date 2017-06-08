import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

//common components
const Index = r => require.ensure([], () => r(require('components/common/Index')), 'index')
const Previewer = r => require.ensure([], () => r(require('components/common/Previewer')), 'previewer')
const Pay = r => require.ensure([], () => r(require('components/common/Pay')), 'pay')
const _404 = r => require.ensure([], () => r(require('components/common/404')), '404')
  //team components
const Product = r => require.ensure([], () => r(require('components/team/Product')), 'product')
const ProductDetail = r => require.ensure([], () => r(require('components/team/ProductDetail')), 'detail')
const WorkLib = r => require.ensure([], () => r(require('components/team/WorkLib')), 'work')
const CreateOrder = r => require.ensure([], () => r(require('components/team/CreateOrder')), 'order')
const Address = r => require.ensure([], () => r(require('components/team/Address')), 'address')
const AddressAdd = r => require.ensure([], () => r(require('components/team/AddressAdd')), 'add')
const MailList = r => require.ensure([], () => r(require('components/team/Mail')), 'mail')
const Publish = r => require.ensure([], () => r(require('components/team/Publish')), 'publish')
const Share = r => require.ensure([], () => r(require('components/team/Share')), 'share')
const Help = r => require.ensure([], () => r(require('components/team/Help')), 'help')
const OrderDetail = r => require.ensure([], () => r(require('components/team/OrderDetail')), 'detail')
const PaySuccess = r => require.ensure([], () => r(require('components/team/PaySuccess')), 'paysuccess')

//basic components
const Base_Product = r => require.ensure([], () => r(require('components/base/Product')), 'product')
const Base_ProductDetail = r => require.ensure([], () => r(require('components/base/ProductDetail')), 'detail')
const Base_WorkLib = r => require.ensure([], () => r(require('components/base/WorkLib')), 'work')
const Base_CreateOrder = r => require.ensure([], () => r(require('components/base/CreateOrder')), 'order')
const Base_Address = r => require.ensure([], () => r(require('components/base/Address')), 'address')
const Base_AddressAdd = r => require.ensure([], () => r(require('components/base/AddressAdd')), 'add')
const Base_OrderDetail = r => require.ensure([], () => r(require('components/base/OrderDetail')), 'detail')
const Base_PaySuccess = r => require.ensure([], () => r(require('components/base/PaySuccess')), 'paysuccess')

//editor components
const Editor_Index = r => require.ensure([], () => r(require('components/editor/Index')), 'index')
const Editor_Template = r => require.ensure([], () => r(require('components/editor/Template')), 'template')
const Editor_Upload = r => require.ensure([], () => r(require('components/editor/Upload')), 'upload')
const Editor_SingleDesigner = r => require.ensure([], () => r(require('components/editor/Designer')), 'designer')
const Editor_Preview = r => require.ensure([], () => r(require('components/editor/Previewer')), 'preview')

//modern components
const Modern_Order = r => require.ensure([], () => r(require('components/modern/Order')), 'order')
const Modern_OrderSuccess = r => require.ensure([], () => r(require('components/modern/OrderSuccess')), 'ordersuccess')
const Modern_Product = r => require.ensure([], () => r(require('components/modern/Product')), 'product')
const Modern_ProductDetail = r => require.ensure([], () => r(require('components/modern/ProductDetail')), 'detail')
const Modern_WorkLib = r => require.ensure([], () => r(require('components/modern/WorkLib')), 'work')

//Paint components
const Paint_Uploader = r => require.ensure([], () => r(require('components/paint/Paint_Uploader')), 'pu')
const Paint_Editor = r => require.ensure([], () => r(require('components/paint/Paint_Editor')), 'pe')
const Paint_Detail = r => require.ensure([], () => r(require('components/paint/Paint_Detail')), 'pd')
const Paint_Preview = r => require.ensure([], () => r(require('components/paint/Paint_Preview')), 'pp')
const Paint_CreateOrder = r => require.ensure([], () => r(require('components/paint/Paint_CreateOrder')), 'pc')
const Paint_Address = r => require.ensure([], () => r(require('components/paint/Paint_Address')), 'pa')
const Paint_AddressAdd = r => require.ensure([], () => r(require('components/paint/Paint_AddressAdd')), 'paa')
const Paint_Pay = r => require.ensure([], () => r(require('components/paint/Paint_Pay')), 'ppy')
const Paint_PaySuccess = r => require.ensure([], () => r(require('components/paint/Paint_PaySuccess')), 'pps')
const Paint_Order = r => require.ensure([], () => r(require('components/paint/Paint_Order')), 'po')
const Paint_OrderDetail = r => require.ensure([], () => r(require('components/paint/Paint_OrderDetail')), 'pod')
const Paint_Eval = r => require.ensure([], () => r(require('components/paint/Paint_Eval')), 'pel')

//Show components -爱拍爱Show
const Show_Index = r => require.ensure([], () => r(require('components/show/show_index')), 'show-index');
const Show_Detail = r => require.ensure([], () => r(require('components/show/show_detail')), 'show-detail');
const Show_PayType = r => require.ensure([], () => r(require('components/show/show_paytype')), 'show-paytype');
const Show_Order = r => require.ensure([], () => r(require('components/show/show_order')), 'show-order');
const Show_Success = r => require.ensure([], () => r(require('components/show/show_success')), 'show-success');
const Show_OrderList = r => require.ensure([], () => r(require('components/show/show_orderList')), 'show-order-list');
const Show_OrderDetail = r => require.ensure([], () => r(require('components/show/show_orderDetail')), 'show-order-detail');

//test components
const Test = r => require.ensure([], () => r(require('components/test/test')), 'test')

//routes
const BasePath = '';
const routeArray = [
  //common
  {
    path: BasePath + '/',
    name: '',
    component: Index
  }, {
    path: BasePath + '/common/previewer',
    name: '预 览',
    component: Previewer
  }, {
    path: BasePath + '/pay',
    name: '支付中心',
    component: Pay
  },
  //base
  {
    path: BasePath + '/base/list',
    name: '产品列表',
    component: Base_Product
  }, {
    path: BasePath + '/base/detail',
    name: '产品详情',
    component: Base_ProductDetail
  }, {
    path: BasePath + '/base/worklib',
    name: '个人中心',
    component: Base_WorkLib
  }, {
    path: BasePath + '/base/order',
    name: '确认订单',
    component: Base_CreateOrder
  }, {
    path: BasePath + '/base/address',
    name: '地址列表',
    component: Base_Address
  }, {
    path: BasePath + '/base/add',
    name: '新增地址',
    component: Base_AddressAdd
  }, {
    path: BasePath + '/base/orderDetail',
    name: '订单详情',
    component: Base_OrderDetail
  }, {
    path: BasePath + '/base/paySuccess',
    name: '支付成功',
    component: Base_PaySuccess
  },
  //team
  {
    path: BasePath + '/team/list',
    name: '产品列表',
    component: Product
  }, {
    path: BasePath + '/team/detail',
    name: '产品详情',
    component: ProductDetail
  }, {
    path: BasePath + '/team/worklib',
    name: '个人中心',
    component: WorkLib
  }, {
    path: BasePath + '/team/order',
    name: '确认订单',
    component: CreateOrder
  }, {
    path: BasePath + '/team/mail',
    name: '通讯录',
    component: MailList
  }, {
    path: BasePath + '/team/address',
    name: '地址列表',
    component: Address
  }, {
    path: BasePath + '/team/add',
    name: '新增地址',
    component: AddressAdd
  }, {
    path: BasePath + '/team/publish',
    name: '发布',
    component: Publish
  }, {
    path: BasePath + '/team/share',
    name: '领相册',
    component: Share
  }, {
    path: BasePath + '/team/help',
    name: '帮助',
    component: Help
  }, {
    path: BasePath + '/team/orderDetail',
    name: '订单详情',
    component: OrderDetail
  }, {
    path: BasePath + '/team/paySuccess',
    name: '支付成功',
    component: PaySuccess
  },
  //编辑器
  {
    path: BasePath + '/editor/template',
    name: '选择模板',
    component: Editor_Template
  }, {
    path: BasePath + '/editor/global',
    name: '全局预览',
    component: Editor_Index
  }, {
    path: BasePath + '/editor/upload',
    name: '图片上传',
    component: Editor_Upload
  }, {
    path: BasePath + '/editor/design',
    name: '编辑',
    component: Editor_SingleDesigner
  }, {
    path: BasePath + '/editor/preview',
    name: '预览',
    component: Editor_Preview
  },
  //摩登印
  {
    path: BasePath + '/modern/list',
    name: '产品列表',
    component: Modern_Product
  }, {
    path: BasePath + '/modern/detail',
    name: '产品详情',
    component: Modern_ProductDetail
  }, {
    path: BasePath + '/modern/worklib',
    name: '作品库',
    component: Modern_WorkLib
  }, {
    path: BasePath + '/modern/order',
    name: '提交订单',
    component: Modern_Order
  }, {
    path: BasePath + '/modern/success',
    name: '下单成功',
    component: Modern_OrderSuccess
  },
  //油画Paint
  {
    path: BasePath + '/paint/upload',
    name: '上传图片',
    component: Paint_Uploader
  }, {
    path: BasePath + '/paint/edit',
    name: '编辑照片',
    component: Paint_Editor
  }, {
    path: BasePath + '/paint/detail',
    name: '产品详情',
    component: Paint_Detail
  }, {
    path: BasePath + '/paint/order',
    name: '创建订单',
    component: Paint_CreateOrder
  }, {
    path: BasePath + '/paint/address',
    name: '地址列表',
    component: Paint_Address
  }, {
    path: BasePath + '/paint/add',
    name: '添加地址',
    component: Paint_AddressAdd
  }, {
    path: BasePath + '/paint/preview',
    name: '预览',
    component: Paint_Preview
  }, {
    path: BasePath + '/paint/pay',
    name: '支付中心',
    component: Paint_Pay
  }, {
    path: BasePath + '/paint/success',
    name: '支付成功',
    component: Paint_PaySuccess
  }, {
    path: BasePath + '/paint/oList',
    name: '订单列表',
    component: Paint_Order
  }, {
    path: BasePath + '/paint/orderDetail',
    name: '订单详情',
    component: Paint_OrderDetail
  }, {
    path: BasePath + '/paint/eval',
    name: '用户评价',
    component: Paint_Eval
  }, {
    path: BasePath + '/test',
    name: '测试页面',
    component: Test
  },
  //爱拍爱秀
  {
    path: BasePath + '/show/index',
    name: '爱拍爱秀',
    component: Show_Index
  }, {
    path: BasePath + '/show/detail',
    name: '产品详情',
    component: Show_Detail
  }, {
    path: BasePath + '/show/paytype',
    name: '选择支付方式',
    component: Show_PayType
  }, {
    path: BasePath + '/show/order',
    name: '确认订单',
    component: Show_Order
  }, {
    path: BasePath + '/show/success',
    name: '上传成功',
    component: Show_Success
  }, {
    path: BasePath + '/show/orderList',
    name: '订单列表',
    component: Show_OrderList
  }, {
    path: BasePath + '/show/order/detail',
    name: '订单明细',
    component: Show_OrderDetail
  },
  //Error
  {
    path: '*',
    name: '404',
    component: _404
  }
];

const router = new VueRouter({
  hashbang: true,
  history: false,
  base: __dirname,
  routes: routeArray
});


router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
});

router.afterEach(transition => {
  if (transition.name) {
    document.title = transition.name;
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      let i = document.createElement('iframe');
      i.src = 'http://m.baidu.com/favicon.ico';
      i.style.display = 'none';
      i.onload = function() {
        setTimeout(function() {
          i.remove();
        }, 0);
      };
      document.body.appendChild(i);
    }
  }
  NProgress.done()
});

export default router
