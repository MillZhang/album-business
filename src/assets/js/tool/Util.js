/**
 * === Javascript Module ======================
 * Copyright (c) 2016 Mill, All rights reserved.
 *
 * @version 1.0
 * @author Mill
 * @description
 * ---2017/3/6----------------------------------
 */
export default {
  getConstant() {
      return {
        DOMAIN: 'http://image.cache.timepack.cn/',
        TEMPLATE_DOMAIN: 'http://template.cache.timepack.cn/',
        THUMB600: '?imageMogr2/thumbnail/600x600',
        AUTHOR: location.origin + '/synergy/wxbridge/index?appid=',
        EditorWidth: window.innerWidth * 0.8
      }
    },
    getQueryByName(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      let r = window.location.search.substr(1).match(reg);
      if (null !== r) return unescape(r[2]);
      return null;
    },
    formateDate(date, fmt) {
      let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    },
    isTelephone(str) {
      if (/^1[3|4|5|7|8]\d{9}$/.test(str)) {
        return true;
      }
      return false;
    },
    isEmpty(str) {
      if ('' == str || undefined == str) {
        return true;
      }
      return false;
    },
    isAndroid() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return true;
      } else if (isiOS) {
        return false;
      }
    },
    updateDocTitle(title) {
      document.title = title;
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
    },
    Authorize() {
      let hash = location.hash;
      let query = hash.substr(hash.indexOf('?') + 1, hash.length - 1);
      let queryList = query.split('&');
      let hasTicket = false,
        ticket = '',
        appId = '';
      for (let i = 0; i < queryList.length; i++) {
        let item = queryList[i].split('=');
        if (item[0] == 'ticket') {
          hasTicket = true;
          ticket = item[1];
        } else if (item[0] == 'appid') {
          appId = item[1];
        }
      }
      if (hasTicket) {
        //首次进入,已授权
        App.config.ticket = ticket;
        //缓存
        App.cache.ticket().setter(ticket);
      } else {
        //1.检查是否有缓存
        let cacheTicket = App.cache.ticket().getter();
        if (null != cacheTicket && undefined != cacheTicket) {
          App.config.ticket = cacheTicket;
        } else {
          // //重新授权
          // if (hash.indexOf('#/modern') > -1) {
          //   location.href = this.getConstant().AUTHOR + appId + '&cfrom=Modern';
          // } else {
          //   location.href = this.getConstant().AUTHOR + appId;
          // }
        }
      }
    }
}
