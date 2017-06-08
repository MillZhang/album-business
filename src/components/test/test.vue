<template>
<section class="test">
  <div class="flipbook-viewport">
    <div class="container">
      <div class="flipbook">
        <div>
          <img src="http://image.cache.timepack.cn/o_1bgpe6m5m1nrtaahbhesnanv910.jpg?imageView2/1/w/375/h/375/q/100" alt="">
        </div>
        <div>
          <img src="http://image.cache.timepack.cn/o_1bgpe6m5m1jor1a9j1rcb11vh1rint.jpg?imageView2/1/w/375/h/375/q/100" alt="">
        </div>
        <div>
          <img src="http://image.cache.timepack.cn/o_1bgpe6m5m14jbs3i14pb9mp1jf0v.jpg?imageView2/1/w/375/h/375/q/100" alt="">
        </div>
        <div>
          <img src="http://image.cache.timepack.cn/o_1bgpe6m5m1ig615i6tlogal1nivu.jpg?imageView2/1/w/375/h/375/q/100" alt="">
        </div>
        <div>
          <img src="http://image.cache.timepack.cn/o_1bgpe6m5m186l1oco5keone1q8bs.jpg?imageView2/1/w/375/h/375/q/100" alt="">
        </div>
        <div>
          <img src="http://image.cache.timepack.cn/o_1bgpe6m5m12vlu5v6b116aj1d5nr.jpg?imageView2/1/w/375/h/375/q/100" alt="">
        </div>
        <div>
          <img src="http://image.cache.timepack.cn/o_1bgpe6m5mjg1b8j1keoqg3125mq.jpg?imageView2/1/w/375/h/375/q/100" alt="">
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import $ from 'jquery'
require('jsPath/lib/turn.min.js')
export default {
  mounted() {
    let width = window.innerWidth,
      height = width / 2;
    this.$nextTick(() => {
      $('.flipbook').turn({
        width: width,
        height: height,
        elevation: 50,
        gradients: true,
        autoCenter: true
      });
    });
  }
}
</script>

<style lang="scss">
.test {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.flipbook-viewport {
    overflow: hidden;
    width: 100%;
    height: 100%;
}

.flipbook-viewport .container {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: auto;
}

.flipbook-viewport .flipbook {
    width: 750px;
    height: 375px;
    left: -175px;
}

.flipbook-viewport .page {
    width: 461px;
    height: 600px;
    background-color: white;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.flipbook .page {
    -webkit-box-shadow: 0 0 20px rgba(0,0,0,0.2);
    -moz-box-shadow: 0 0 20px rgba(0,0,0,0.2);
    -ms-box-shadow: 0 0 20px rgba(0,0,0,0.2);
    -o-box-shadow: 0 0 20px rgba(0,0,0,0.2);
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
}

.flipbook-viewport .page img {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin: 0;
}

.flipbook-viewport .shadow {
    -webkit-transition: -webkit-box-shadow 0.5s;
    -moz-transition: -moz-box-shadow 0.5s;
    -o-transition: -webkit-box-shadow 0.5s;
    -ms-transition: -ms-box-shadow 0.5s;
    -webkit-box-shadow: 0 0 20px #ccc;
    -moz-box-shadow: 0 0 20px #ccc;
    -o-box-shadow: 0 0 20px #ccc;
    -ms-box-shadow: 0 0 20px #ccc;
    box-shadow: 0 0 20px #ccc;
}
</style>
