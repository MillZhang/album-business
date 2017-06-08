<template>
  <div id="app">
    <transition name="slide-fade">
      <router-view keep-alive></router-view>
    </transition>
  </div>
</template>
<script>
import WxUtils from 'jsPath/tool/WxUtils'
export default {
  name: 'app',
  methods: {
    author() {
      this.utils.Authorize();
      WxUtils.init();
      wx.ready(function() {
        wx.hideOptionMenu();
      });
      wx.error(function(res) {
        //          WxUtils.init();
      });
    }
  },
  created() {},
  mounted() {},
  watch: {
    // 如果路由有变化，会再次执行该方法
    "$route": "author"
  }
}
</script>
<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

#app.scrollable {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
