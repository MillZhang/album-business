(function() {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
}());
(function($) {
  $.fn.myScroll = function(options) {
    //默认配置
    var defaults = {
      speed: 40
    };
    var opts = $.extend({}, defaults, options),
      intId = [];

    let $this = $(this),
      step = $this.find('li')[0].offsetHeight,
      size = $this.find('li').length,
      speed = opts['speed'];

    function marquee() {
      let $ul = $this.find('ul'),
        s = Math.abs(parseInt($ul.css("margin-top")));
      let top = parseInt($ul.css("margin-top"));
      $ul.css('margin-top', (top -= 1) + 'px');
      if (s >= step) {
        $ul.find("li").slice(0, 1).appendTo($ul);
        $ul.css("margin-top", 0);

      }
    }

    function render() {
      if (size * step <= $this.height()) {
        return;
      } else {
        marquee();
      }
      requestAnimationFrame(render);
    }

    render();

  }

})(jQuery);
