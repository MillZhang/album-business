<template>
  <div class="paint-eval">
    <template v-for="(item,index) in data">
      <div class="e-item">
        <div class="e-header">
          <img :src="item.head" alt="">
          <!--<p>{{item.name}}</p>-->
        </div>
        <div class="e-content">
          <p>{{item.desc}}</p>
          <div class="e-list">
            <template v-for="n in item.list" v-if="item.list>0">
              <div @click="viewImages($event,index,n,item.list)">
                <img :src="getImageUrl(index,n)" alt="">
              </div>
            </template>
          </div>
          <p class="f12">{{item.time}} 颜色分类:{{item.color}} 组合形式:{{item.type}} 尺寸:{{item.size}}</p>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
  import WxUtils from 'jsPath/tool/WxUtils'
  export default{
    data(){
      return {
        data: [{
          head: 'http://image.cache.timepack.cn/headimg-1.jpg',
          name: '',
          desc: '送给一个和我同月同日生的人，最喜欢他这张照片，但是旁边有他姐姐，我只想画他，问了好多店家，其他店家都只能画两个人，不能单独，只有这家店可以帮我把他姐姐P掉，把胳膊那补齐，非常谢谢客服啦，有什么问题都秒回，办事效率高，图片改了好几次，都很有耐心，今天开始画了，有什么不懂的再来问',
          list: 4,
          time: '2017年04月12日 12:18',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-2.jpg',
          name: '',
          desc: '宝贝非常棒，主要就是花时间，但是作为礼物我觉得自己手画很有意思，这是为好朋友做的礼物。一开始以为颜色错了，但是画着颜色就出来了，东西很值得买。很有心意的东西',
          list: 4,
          time: '2017年04月12日 10:21',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-3.jpg',
          name: '',
          desc: '发货很快 隔天就到货了 买的简单基础的版 很容易上手 画板颜料超好用 画架也很好用 很超值的一次购物 以后有新技能了 想买的速速购买吧',
          list: 4,
          time: '2017年04月12日 10:18',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-4.jpg',
          name: '',
          desc: '秒变油画大师，给妈妈的生日礼物，画完很好看，妈妈很喜欢！三天就画完了，颜料足足的，不用担心画到一半没有了，喜欢的小伙伴快点拍吧！',
          list: 1,
          time: '2017年04月11日 11:22',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-5.jpg',
          name: '',
          desc: '挺好的，能感觉到还原度，好好磨磨性子，大画家要给朋友大婚献份厚礼！！?',
          list: 3,
          time: '2017年04月10日 22:35',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-6.jpg',
          name: '',
          desc: '还没画完，应该是图越大越好画，先练手，后面新房里的挂画1.5米*1.2米的想自己上手试试，画出来应该挺有成就感吧！',
          list: 2,
          time: '2017年04月10日 19:06',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-7.jpg',
          name: '',
          desc: '超级超级棒耶，画完了超有成就感，想画的话两三天就能画完，我分三次画的，就是很逼真，而且特别好，舍友看到都羡慕死了卖家服务态度超级好啊，会给你解答各种问题，而且都是秒回，反正服务态度给满分，良心卖家，真的超级棒的，中途有颜料干了，卖家还教我调色， 我也不多说了，你们自己看图把，一开始看着挺范愁的后来画画就觉得还可以，而且越画越兴奋，画完了，超开心的真的超好',
          list: 3,
          time: '2017年04月10日 15:33',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-8.jpg',
          name: '',
          desc: '已经是第三次买数学油画了，这家的服务质量最好，首先包装很厚实，画板也结实，还送了教程和客户关怀卡，其他卖家都没有这些服务，另外，参照图和实图是1:1的比例，比较大，画的时候不费眼睛。老板考虑到背景颜色会比较费颜料，特意多发了几盒，确实是考虑的比较周到，虽然还不知道画出的照片效果怎么样，但是已经可以点赞了，客服服务也很到位，帮助我挑选最合适的照片',
          list: 2,
          time: '2017年04月10日 12:18',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-9.jpg',
          name: '',
          desc: '我以为我不会的 结果发回来发现很简单，而且真的很漂亮，卖家很贴心的送了工具和无痕钉，大小也合适，很满意的一次购物，图一是成品，图二是没涂亮光剂 师傅很喜欢',
          list: 2,
          time: '2017年04月10日 11:21',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-10.jpg',
          name: '',
          desc: '成品画好了，浅色系的不好盖数字涂多了又太厚重，但是远观整体效果真的不错的，发货也挺速度的，喜欢画画又没有专业学过的真的可以多尝试尝试特别棒。脚受伤了，每天都坐在床头描着这幅画，哈哈哈。感觉有点成就感了。',
          list: 2,
          time: '2017年04月09日 07:54',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-11.jpg',
          name: '',
          desc: '还没画完，虽然有点儿色差，但很有成就感。准备再来一幅大的，效果应该会更加细腻。也很解压哦，已推荐给朋友了(o^^o)',
          list: 2,
          time: '2017年04月09日 03:46',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-12.jpg',
          name: '',
          desc: '卖家态度很好，很耐心帮我解决问题，东西挺好的，很满意！',
          list: 3,
          time: '2017年04月09日 12:18',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-13.jpg',
          name: '',
          desc: '挺好的，其实涂这个胆子要大点，不要怕涂出格，颜色浅的格子里可以先涂点深颜色，干了后再涂对应的颜色，涂厚点，相近的颜色尽量揉和，不喜欢的颜色可以自己调调，收到就迫不及待的涂了背景',
          list: 1,
          time: '2017年04月09日 02:51',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-14.jpg',
          name: '',
          desc: '（重复没有图）大致颜色，等整幅涂完再修改一下背景，我经常涂出来的别人看不出来是数字油画，涂完了追加个图',
          list: 0,
          time: '2017年04月08日 20:01',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-15.jpg',
          name: '',
          desc: '(有图)今天收到就画啦~画啦大半！开心！边画边有几个看不清数字的地方，客服很快就回复了~棒棒的！画笔不错~不像我之前买的太软…这个画细节特别棒~',
          list: 0,
          time: '2017年04月08日 18:43',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-16.jpg',
          name: '',
          desc: '收到之后包装很完整！迫不及待就开始画了，弄了1个晚上，差不多8个小时吧，一点点涂的，很费腰，但成果出来很有成就感！算是一份很特别的生日礼物，开心',
          list: 1,
          time: '2017年04月08日 16:20',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-17.jpg',
          name: '',
          desc: '很好，快完成了。',
          list: 5,
          time: '2017年04月08日 15:09',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-18.jpg',
          name: '',
          desc: '我和大女儿，珍惜不错',
          list: 0,
          time: '2017年04月08日 09:37',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-19.jpg',
          name: '',
          desc: '第三次买是送给小侄女的，希望她会喜欢?',
          list: 3,
          time: '2017年04月07日 15:27',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-20.jpg',
          name: '',
          desc: '好的卖家，谢谢喽。下次再来哦 ！ 店已经收藏了很久，不过是第一次下手。应该说还不错。 货比我想像中要好！！剛剛好是店裏的促銷！十分超值 货超值，呵，下次再来。帮你做个广告，朋友们：这家店的货值。 現在還在DIY過程中 會跟進評論的',
          list: 1,
          time: '2017年04月07日 10:34',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-21.jpg',
          name: '',
          desc: '哈哈哈一家人齐上阵',
          list: 0,
          time: '2017年04月03日 10:38',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-22.jpg',
          name: '',
          desc: '已经是第二次购买啦，送给朋友当礼物很有新意哦～客服特别耐心，有问题及时反馈。待画好晒图！希望闺蜜会喜欢！',
          list: 0,
          time: '2017年04月01日12:24',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-23.jpg',
          name: '',
          desc: '我第一次拿到的时候，我真的惊呆了，密密麻麻的线条我该怎么画？？？？后来一點一點的画，发现好像也不是特别难，图还没画完，等画完了我会上图的，给买家一个大拇指',
          list: 4,
          time: '2017年04月01日 06:59',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-24.jpg',
          name: '',
          desc: '连续画了两天才画完的，好奔溃看得眼都花了，第一张是自己画的，第二张是卖家的效果图，色差还是有的。',
          list: 0,
          time: '2017年04月01日 05:22',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-25.jpg',
          name: '',
          desc: '老板很爽快 都是按照我的想法发的货 下次还会光顾 好评',
          list: 1,
          time: '2017年04月12日 12:18',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-26.jpg',
          name: '',
          desc: '送给老师的礼物，三个人6个小时画完了，很棒，不错的体验。自己加的装饰花',
          list: 1,
          time: '2017年03月26日 21:46',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-27.jpg',
          name: '',
          desc: '油画棒棒哒！因为自己给客服的原图照片清晰度也不是很高，但是做出来的效果图比我想象中好很多，本以为整体色调会有的偏黑，但是收到了颜料之后画出来的颜色正好是我想要的！画完这幅打算再买个中等的继续画。客服的态度很好，非常耐心，有问题也解释的很清楚。总之就是非常满意',
          list: 3,
          time: '2017年03月26日20:31',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-28.jpg',
          name: '',
          desc: '店家非常好帮忙设计的非常合理设计后还给客户发设计图纸看是否满意 然后再发货非常满意很高兴收到货 价格也很合理 性价比很高的店家 祝店家生意兴隆',
          list: 1,
          time: '2017年03月26日 20:29',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-29.jpg',
          name: '',
          desc: '原谅我画完才来评价～挺好。颜料特别足。快递挺快的，就是在设计时候时间略长～',
          list: 1,
          time: '2017年03月26日 14:26',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }, {
          head: 'http://image.cache.timepack.cn/headimg-30.jpg',
          name: '',
          desc: '之前就有画过数字油画，特地DIY了一幅，说实话，当收到画的时候，一下子懵了，人物真的好难画，但是画着画着，其实也没有那么难，花了一下午加一晚上的时间，就完成了。很不错，送给哥哥的生日礼物，希望他会喜欢。准备过段时间，也给自己来一幅，价格真的很便宜，超级划算的，颜料很足，根本涂不完的。',
          list: 2,
          time: '2017年03月26日 14:23',
          color: '手绘油画',
          type: '经典36色',
          size: '45*60绷框(特价)'
        }]
      }
    },
    created(){

    },
    methods: {
      getImageUrl(index, n){
        return 'http://image.cache.timepack.cn/appraise-' + (index + 1) + '-' + (n) + '.jpg'
      },
      viewImages(e, index, n, length){
        e.preventDefault();
        let current = 'http://image.cache.timepack.cn/appraise-' + (index + 1) + '-' + (n) + '.jpg';
        let list = [];
        for (let i = 1; i <= length; i++) {
          list.push('http://image.cache.timepack.cn/appraise-' + (index + 1) + '-' + (i) + '.jpg');
        }
        console.log(list)
        wx.previewImage({
          current: current, // 当前显示图片的http链接
          urls: list // 需要预览的图片http链接列表
        });
      }
    }
  }
</script>
<style scoped>
  .paint-eval {
    background: #ffffff;
  }

  .e-item {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    box-sizing: border-box;
  }

  .e-item .e-header {
    width: 2rem;
    text-align: center;
    padding-top: 0.5rem;
  }

  .e-item .e-header img {
    width: 0.8rem;
    height: 0.853rem;
  }

  .e-item .e-content {
    padding: 0.433rem 0.2rem;
    width: 8rem;
    border-bottom: 1px dashed #ebebeb;
  }

  .e-item .e-content .e-list {
    display: flex;
    display: -webkit-flex;
  }

  .e-item .e-content .e-list > div {
    width: 2rem;
    height: 2rem;
    padding: 0.1rem;
    box-sizing: border-box;
    border: 1px solid #ececec;
    margin-right: 0.1rem;
  }

  .e-item .e-content .e-list > div img {
    width: 100%;
    height: 100%;
  }

  .e-item .e-content > p {
    margin-bottom: 0.133rem;
  }

  .e-item .e-content .f12 {
    color: #b0b0b0;
  }

</style>
