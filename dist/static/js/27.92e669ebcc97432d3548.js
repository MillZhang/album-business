webpackJsonp([27,43],{173:function(t,e,a){a(399);var i=a(30)(a(464),a(346),null,null);t.exports=i.exports},197:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var i=a(32),r=a.n(i);!function(t){function e(t,e,a){if(a[0]&&"object"!=r()(a[0])){if(e[a[0]])return e[a[0]].apply(t,Array.prototype.slice.call(a,1));throw u(a[0]+" is not a method or property")}return e.init.apply(t,a)}function a(t,e,a,i){return{css:{position:"absolute",top:t,left:e,overflow:i||"hidden",zIndex:a||"auto"}}}function i(t,e,a,i,r){var s=1-r,o=s*s*s,h=r*r*r;return n(Math.round(o*t.x+3*r*s*s*e.x+3*r*r*s*a.x+h*i.x),Math.round(o*t.y+3*r*s*s*e.y+3*r*r*s*a.y+h*i.y))}function s(t){return t/_*180}function n(t,e){return{x:t,y:e}}function o(){var t;if(t=/AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)){return parseFloat(t[1])>534.3}return!0}function h(t,e,a){return m&&a?" translate3d("+t+"px,"+e+"px, 0px) ":" translate("+t+"px, "+e+"px) "}function p(t){return" rotate("+t+"deg) "}function d(t,e){return Object.prototype.hasOwnProperty.call(e,t)}function l(){for(var t=["Moz","Webkit","Khtml","O","ms"],e=t.length,a="";e--;)t[e]+"Transform"in document.body.style&&(a="-"+t[e].toLowerCase()+"-");return a}function g(){var t,e=document.createElement("fakeelement"),a={transition:"transitionend",OTransition:"oTransitionEnd",MSTransition:"transitionend",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in a)if(void 0!==e.style[t])return a[t]}function c(t,e,a,i,r){var s,o=[];if("-webkit-"==x){for(s=0;s<r;s++)o.push("color-stop("+i[s][0]+", "+i[s][1]+")");t.css({"background-image":"-webkit-gradient(linear, "+e.x+"% "+e.y+"%,"+a.x+"% "+a.y+"%, "+o.join(",")+" )"})}else{e={x:e.x/100*t.width(),y:e.y/100*t.height()},a={x:a.x/100*t.width(),y:a.y/100*t.height()};var h=a.x-e.x,p=a.y-e.y,d=Math.atan2(p,h),l=d-Math.PI/2,g=Math.abs(t.width()*Math.sin(l))+Math.abs(t.height()*Math.cos(l)),c=Math.sqrt(p*p+h*h),f=n(a.x<e.x?t.width():0,a.y<e.y?t.height():0),u=Math.tan(d),v=-1/u,w=(v*f.x-f.y-u*e.x+e.y)/(v-u),m={x:w,y:v*w-v*f.x+f.y},b=Math.sqrt(Math.pow(m.x-e.x,2)+Math.pow(m.y-e.y,2));for(s=0;s<r;s++)o.push(" "+i[s][1]+" "+100*(b+c*i[s][0])/g+"%");t.css({"background-image":x+"linear-gradient("+-d+"rad,"+o.join(",")+")"})}}function f(e,a,i){var r=t.Event(e);return a.trigger(r,i),r.isDefaultPrevented()?"prevented":r.isPropagationStopped()?"stopped":""}function u(t){function e(t){this.name="TurnJsError",this.message=t}return e.prototype=new Error,e.prototype.constructor=e,new e(t)}function v(t){var e={top:0,left:0};do{e.left+=t.offsetLeft,e.top+=t.offsetTop}while(t=t.offsetParent);return e}function w(){return navigator.userAgent.indexOf("MSIE 9.0")==-1}var m,b,x="",y="4.1.0",_=Math.PI,P=_/2,M="ontouchstart"in window,k=M?{down:"touchstart",move:"touchmove",up:"touchend",over:"touchstart",out:"touchend"}:{down:"mousedown",move:"mousemove",up:"mouseup",over:"mouseover",out:"mouseout"},z={backward:["bl","tl"],forward:["br","tr"],all:["tl","bl","tr","br","l","r"]},j=["single","double"],O=["ltr","rtl"],T={acceleration:!0,display:"double",duration:600,page:1,gradients:!0,turnCorners:"bl,br",when:null},W={cornerSize:100},A=6,F={init:function(e){m="WebKitCSSMatrix"in window||"MozPerspective"in document.body.style,b=o(),x=l();var a,i=0,r=this.data(),s=this.children();if(e=t.extend({width:this.width(),height:this.height(),direction:this.attr("dir")||this.css("direction")||"ltr"},T,e),r.opts=e,r.pageObjs={},r.pages={},r.pageWrap={},r.pageZoom={},r.pagePlace={},r.pageMv=[],r.zoom=1,r.totalPages=e.pages||0,r.eventHandlers={touchStart:t.proxy(F._touchStart,this),touchMove:t.proxy(F._touchMove,this),touchEnd:t.proxy(F._touchEnd,this),start:t.proxy(F._eventStart,this)},e.when)for(a in e.when)d(a,e.when)&&this.bind(a,e.when[a]);for(this.css({position:"relative",width:e.width,height:e.height}),this.turn("display",e.display),""!==e.direction&&this.turn("direction",e.direction),m&&!M&&e.acceleration&&this.transform(h(0,0,!0)),a=0;a<s.length;a++)"1"!=t(s[a]).attr("ignore")&&this.turn("addPage",s[a],++i);return t(this).bind(k.down,r.eventHandlers.touchStart).bind("end",F._eventEnd).bind("pressed",F._eventPressed).bind("released",F._eventReleased).bind("flip",F._flip),t(this).parent().bind("start",r.eventHandlers.start),t(document).bind(k.move,r.eventHandlers.touchMove).bind(k.up,r.eventHandlers.touchEnd),this.turn("page",e.page),r.done=!0,this},addPage:function(e,a){var i,r,s=!1,n=this.data(),o=n.totalPages+1;if(n.destroying)return!1;if((i=/\bp([0-9]+)\b/.exec(t(e).attr("class")))&&(a=parseInt(i[1],10)),a){if(a==o)s=!0;else if(a>o)throw u('Page "'+a+'" cannot be inserted')}else a=o,s=!0;return a>=1&&a<=o&&(r="double"==n.display?a%2?" odd":" even":"",n.done&&this.turn("stop"),a in n.pageObjs&&F._movePages.call(this,a,1),s&&(n.totalPages=o),n.pageObjs[a]=t(e).css({float:"left"}).addClass("page p"+a+r),!w()&&n.pageObjs[a].hasClass("hard")&&n.pageObjs[a].removeClass("hard"),F._addPage.call(this,a),F._removeFromDOM.call(this)),this},_addPage:function(e){var a=this.data(),i=a.pageObjs[e];if(i)if(F._necessPage.call(this,e)){if(!a.pageWrap[e]){a.pageWrap[e]=t("<div/>",{class:"page-wrapper",page:e,css:{position:"absolute",overflow:"hidden"}}),this.append(a.pageWrap[e]),a.pagePlace[e]||(a.pagePlace[e]=e,a.pageObjs[e].appendTo(a.pageWrap[e]));var r=F._pageSize.call(this,e,!0);i.css({width:r.width,height:r.height}),a.pageWrap[e].css(r)}a.pagePlace[e]==e&&F._makeFlip.call(this,e)}else a.pagePlace[e]=0,a.pageObjs[e]&&a.pageObjs[e].remove()},hasPage:function(t){return d(t,this.data().pageObjs)},center:function(e){var a=this.data(),i=t(this).turn("size"),r=0;if(!a.noCenter){if("double"==a.display){var s=this.turn("view",e||a.tpage||a.page);"ltr"==a.direction?s[0]?s[1]||(r+=i.width/4):r-=i.width/4:s[0]?s[1]||(r-=i.width/4):r+=i.width/4}t(this).css({marginLeft:r})}return this},destroy:function(){var e=this,a=this.data(),i=["end","first","flip","last","pressed","released","start","turning","turned","zooming","missing"];if("prevented"!=f("destroying",this)){for(a.destroying=!0,t.each(i,function(t,a){e.unbind(a)}),this.parent().unbind("start",a.eventHandlers.start),t(document).unbind(k.move,a.eventHandlers.touchMove).unbind(k.up,a.eventHandlers.touchEnd);0!==a.totalPages;)this.turn("removePage",a.totalPages);return a.fparent&&a.fparent.remove(),a.shadow&&a.shadow.remove(),this.removeData(),a=null,this}},is:function(){return"object"==r()(this.data().pages)},zoom:function(e){var a=this.data();if("number"==typeof e){if(e<.001||e>100)throw u(e+" is not a value for zoom");if("prevented"==f("zooming",this,[e,a.zoom]))return this;var i=this.turn("size"),r=this.turn("view"),s=1/a.zoom,n=Math.round(i.width*s*e),o=Math.round(i.height*s*e);a.zoom=e,t(this).turn("stop").turn("size",n,o),a.opts.autoCenter&&this.turn("center"),F._updateShadow.call(this);for(var h=0;h<r.length;h++)r[h]&&a.pageZoom[r[h]]!=a.zoom&&(this.trigger("zoomed",[r[h],r,a.pageZoom[r[h]],a.zoom]),a.pageZoom[r[h]]=a.zoom);return this}return a.zoom},_pageSize:function(t,e){var a=this.data(),i={};if("single"==a.display)i.width=this.width(),i.height=this.height(),e&&(i.top=0,i.left=0,i.right="auto");else{var r=this.width()/2,s=this.height();if(a.pageObjs[t].hasClass("own-size")?(i.width=a.pageObjs[t].width(),i.height=a.pageObjs[t].height()):(i.width=r,i.height=s),e){var n=t%2;i.top=(s-i.height)/2,"ltr"==a.direction?(i[n?"right":"left"]=r-i.width,i[n?"left":"right"]="auto"):(i[n?"left":"right"]=r-i.width,i[n?"right":"left"]="auto")}}return i},_makeFlip:function(t){var e=this.data();if(!e.pages[t]&&e.pagePlace[t]==t){var a="single"==e.display,i=t%2;e.pages[t]=e.pageObjs[t].css(F._pageSize.call(this,t)).flip({page:t,next:i||a?t+1:t-1,turn:this}).flip("disable",e.disabled),F._setPageLoc.call(this,t),e.pageZoom[t]=e.zoom}return e.pages[t]},_makeRange:function(){var t,e;if(!(this.data().totalPages<1))for(e=this.turn("range"),t=e[0];t<=e[1];t++)F._addPage.call(this,t)},range:function(t){var e,a,i,r,s=this.data();if(t=t||s.tpage||s.page||1,r=F._view.call(this,t),t<1||t>s.totalPages)throw u('"'+t+'" is not a valid page');return r[1]=r[1]||r[0],r[0]>=1&&r[1]<=s.totalPages?(e=Math.floor((A-2)/2),s.totalPages-r[1]>r[0]?(a=Math.min(r[0]-1,e),i=2*e-a):(i=Math.min(s.totalPages-r[1],e),a=2*e-i)):(a=A-1,i=A-1),[Math.max(1,r[0]-a),Math.min(s.totalPages,r[1]+i)]},_necessPage:function(t){if(0===t)return!0;var e=this.turn("range");return this.data().pageObjs[t].hasClass("fixed")||t>=e[0]&&t<=e[1]},_removeFromDOM:function(){var t,e=this.data();for(t in e.pageWrap)d(t,e.pageWrap)&&!F._necessPage.call(this,t)&&F._removePageFromDOM.call(this,t)},_removePageFromDOM:function(t){var e=this.data();if(e.pages[t]){var a=e.pages[t].data();C._moveFoldingPage.call(e.pages[t],!1),a.f&&a.f.fwrapper&&a.f.fwrapper.remove(),e.pages[t].removeData(),e.pages[t].remove(),delete e.pages[t]}e.pageObjs[t]&&e.pageObjs[t].remove(),e.pageWrap[t]&&(e.pageWrap[t].remove(),delete e.pageWrap[t]),F._removeMv.call(this,t),delete e.pagePlace[t],delete e.pageZoom[t]},removePage:function(t){var e=this.data();if("*"==t)for(;0!==e.totalPages;)this.turn("removePage",e.totalPages);else{if(t<1||t>e.totalPages)throw u("The page "+t+" doesn't exist");e.pageObjs[t]&&(this.turn("stop"),F._removePageFromDOM.call(this,t),delete e.pageObjs[t]),F._movePages.call(this,t,-1),e.totalPages=e.totalPages-1,e.page>e.totalPages?(e.page=null,F._fitPage.call(this,e.totalPages)):(F._makeRange.call(this),this.turn("update"))}return this},_movePages:function(t,e){var a,i=this,r=this.data(),s="single"==r.display,n=function(t){var a=t+e,n=a%2,o=n?" odd ":" even ";r.pageObjs[t]&&(r.pageObjs[a]=r.pageObjs[t].removeClass("p"+t+" odd even").addClass("p"+a+o)),r.pagePlace[t]&&r.pageWrap[t]&&(r.pagePlace[a]=a,r.pageObjs[a].hasClass("fixed")?r.pageWrap[a]=r.pageWrap[t].attr("page",a):r.pageWrap[a]=r.pageWrap[t].css(F._pageSize.call(i,a,!0)).attr("page",a),r.pages[t]&&(r.pages[a]=r.pages[t].flip("options",{page:a,next:s||n?a+1:a-1})),e&&(delete r.pages[t],delete r.pagePlace[t],delete r.pageZoom[t],delete r.pageObjs[t],delete r.pageWrap[t]))};if(e>0)for(a=r.totalPages;a>=t;a--)n(a);else for(a=t;a<=r.totalPages;a++)n(a)},display:function(e){var a=this.data(),i=a.display;if(void 0===e)return i;if(t.inArray(e,j)==-1)throw u('"'+e+'" is not a value for display');switch(e){case"single":a.pageObjs[0]||(this.turn("stop").css({overflow:"hidden"}),a.pageObjs[0]=t("<div />",{class:"page p-temporal"}).css({width:this.width(),height:this.height()}).appendTo(this)),this.addClass("shadow");break;case"double":a.pageObjs[0]&&(this.turn("stop").css({overflow:""}),a.pageObjs[0].remove(),delete a.pageObjs[0]),this.removeClass("shadow")}if(a.display=e,i){var r=this.turn("size");F._movePages.call(this,1,0),this.turn("size",r.width,r.height).turn("update")}return this},direction:function(e){var a=this.data();if(void 0===e)return a.direction;if(e=e.toLowerCase(),t.inArray(e,O)==-1)throw u('"'+e+'" is not a value for direction');return"rtl"==e&&t(this).attr("dir","ltr").css({direction:"ltr"}),a.direction=e,a.done&&this.turn("size",t(this).width(),t(this).height()),this},animating:function(){return this.data().pageMv.length>0},corner:function t(){var t,e,a=this.data();for(e in a.pages)if(d(e,a.pages)&&(t=a.pages[e].flip("corner")))return t;return!1},data:function(){return this.data()},disable:function(e){var a,i=this.data(),r=this.turn("view");i.disabled=void 0===e||e===!0;for(a in i.pages)d(a,i.pages)&&i.pages[a].flip("disable",!!i.disabled||t.inArray(parseInt(a,10),r)==-1);return this},disabled:function(t){return void 0===t?this.data().disabled===!0:this.turn("disable",t)},size:function(t,e){if(void 0===t||void 0===e)return{width:this.width(),height:this.height()};this.turn("stop");var a,i,r=this.data(),s="double"==r.display?t/2:t;this.css({width:t,height:e}),r.pageObjs[0]&&r.pageObjs[0].css({width:s,height:e});for(a in r.pageWrap)d(a,r.pageWrap)&&(i=F._pageSize.call(this,a,!0),r.pageObjs[a].css({width:i.width,height:i.height}),r.pageWrap[a].css(i),r.pages[a]&&r.pages[a].css({width:i.width,height:i.height}));return this.turn("resize"),this},resize:function(){var t,e=this.data();for(e.pages[0]&&(e.pageWrap[0].css({left:-this.width()}),e.pages[0].flip("resize",!0)),t=1;t<=e.totalPages;t++)e.pages[t]&&e.pages[t].flip("resize",!0);F._updateShadow.call(this),e.opts.autoCenter&&this.turn("center")},_removeMv:function(t){var e,a=this.data();for(e=0;e<a.pageMv.length;e++)if(a.pageMv[e]==t)return a.pageMv.splice(e,1),!0;return!1},_addMv:function(t){var e=this.data();F._removeMv.call(this,t),e.pageMv.push(t)},_view:function(t){var e=this.data();return t=t||e.page,"double"==e.display?t%2?[t-1,t]:[t,t+1]:[t]},view:function t(e){var a=this.data(),t=F._view.call(this,e);return"double"==a.display?[t[0]>0?t[0]:0,t[1]<=a.totalPages?t[1]:0]:[t[0]>0&&t[0]<=a.totalPages?t[0]:0]},stop:function(t,e){if(this.turn("animating")){var a,i,r,s=this.data();for(s.tpage&&(s.page=s.tpage,delete s.tpage),a=0;a<s.pageMv.length;a++)s.pageMv[a]&&s.pageMv[a]!==t&&(r=s.pages[s.pageMv[a]],i=r.data().f.opts,r.flip("hideFoldedPage",e),e||C._moveFoldingPage.call(r,!1),i.force&&(i.next=i.page%2==0?i.page-1:i.page+1,delete i.force))}return this.turn("update"),this},pages:function(t){var e=this.data();if(t){if(t<e.totalPages)for(var a=e.totalPages;a>t;a--)this.turn("removePage",a);return e.totalPages=t,F._fitPage.call(this,e.page),this}return e.totalPages},_missing:function(t){var e=this.data();if(!(e.totalPages<1)){var a,i=this.turn("range",t),r=[];for(a=i[0];a<=i[1];a++)e.pageObjs[a]||r.push(a);r.length>0&&this.trigger("missing",[r])}},_fitPage:function(t){var e=this.data(),a=this.turn("view",t);if(F._missing.call(this,t),e.pageObjs[t]){e.page=t,this.turn("stop");for(var i=0;i<a.length;i++)a[i]&&e.pageZoom[a[i]]!=e.zoom&&(this.trigger("zoomed",[a[i],a,e.pageZoom[a[i]],e.zoom]),e.pageZoom[a[i]]=e.zoom);F._removeFromDOM.call(this),F._makeRange.call(this),F._updateShadow.call(this),this.trigger("turned",[t,a]),this.turn("update"),e.opts.autoCenter&&this.turn("center")}},_turnPage:function(e){var a,i,r=this.data(),s=r.pagePlace[e],n=this.turn("view"),o=this.turn("view",e);if(r.page!=e){var h=r.page;if("prevented"==f("turning",this,[e,o]))return void(h==r.page&&t.inArray(s,r.pageMv)!=-1&&r.pages[s].flip("hideFoldedPage",!0));t.inArray(1,o)!=-1&&this.trigger("first"),t.inArray(r.totalPages,o)!=-1&&this.trigger("last")}"single"==r.display?(a=n[0],i=o[0]):n[1]&&e>n[1]?(a=n[1],i=o[0]):n[0]&&e<n[0]&&(a=n[0],i=o[1]);var p=r.opts.turnCorners.split(","),d=r.pages[a].data().f,l=d.opts,g=d.point;F._missing.call(this,e),r.pageObjs[e]&&(this.turn("stop"),r.page=e,F._makeRange.call(this),r.tpage=i,l.next!=i&&(l.next=i,l.force=!0),this.turn("update"),d.point=g,"hard"==d.effect?"ltr"==r.direction?r.pages[a].flip("turnPage",e>a?"r":"l"):r.pages[a].flip("turnPage",e>a?"l":"r"):"ltr"==r.direction?r.pages[a].flip("turnPage",p[e>a?1:0]):r.pages[a].flip("turnPage",p[e>a?0:1]))},page:function(e){var a=this.data();if(void 0===e)return a.page;if(!a.disabled&&!a.destroying){if((e=parseInt(e,10))>0&&e<=a.totalPages)return e!=a.page&&(a.done&&t.inArray(e,this.turn("view"))==-1?F._turnPage.call(this,e):F._fitPage.call(this,e)),this;throw u("The page "+e+" does not exist")}},next:function(){return this.turn("page",Math.min(this.data().totalPages,F._view.call(this,this.data().page).pop()+1))},previous:function(){return this.turn("page",Math.max(1,F._view.call(this,this.data().page).shift()-1))},peel:function(t,e){var a=this.data(),i=this.turn("view");if(e=void 0===e||e===!0,t===!1)this.turn("stop",null,e);else if("single"==a.display)a.pages[a.page].flip("peel",t,e);else{var r;r="ltr"==a.direction?t.indexOf("l")!=-1?i[0]:i[1]:t.indexOf("l")!=-1?i[1]:i[0],a.pages[r]&&a.pages[r].flip("peel",t,e)}return this},_addMotionPage:function(){var e=t(this).data().f.opts,a=e.turn;a.data();F._addMv.call(a,e.page)},_eventStart:function(t,e,a){var i=e.turn.data(),r=i.pageZoom[e.page];if(t.isDefaultPrevented())return void F._updateShadow.call(e.turn);r&&r!=i.zoom&&(e.turn.trigger("zoomed",[e.page,e.turn.turn("view",e.page),r,i.zoom]),i.pageZoom[e.page]=i.zoom),"single"==i.display&&a&&("l"==a.charAt(1)&&"ltr"==i.direction||"r"==a.charAt(1)&&"rtl"==i.direction?(e.next=e.next<e.page?e.next:e.page-1,e.force=!0):e.next=e.next>e.page?e.next:e.page+1),F._addMotionPage.call(t.target),F._updateShadow.call(e.turn)},_eventEnd:function(e,a,i){var r=t(e.target),s=(r.data().f,a.turn),n=s.data();if(i){var o=n.tpage||n.page;o!=a.next&&o!=a.page||(delete n.tpage,F._fitPage.call(s,o||a.next,!0))}else F._removeMv.call(s,a.page),F._updateShadow.call(s),s.turn("update")},_eventPressed:function(e){var a=t(e.target).data().f,i=a.opts.turn,r=i.data();r.pages;return r.mouseAction=!0,i.turn("update"),a.time=(new Date).getTime()},_eventReleased:function(e,a){var i,r=t(e.target),s=r.data().f,n=s.opts.turn,o=n.data();i="single"==o.display?"br"==a.corner||"tr"==a.corner?a.x<r.width()/2:a.x>r.width()/2:a.x<0||a.x>r.width(),((new Date).getTime()-s.time<200||i)&&(e.preventDefault(),F._turnPage.call(n,s.opts.next)),o.mouseAction=!1},_flip:function(e){e.stopPropagation();var a=t(e.target).data().f.opts;a.turn.trigger("turn",[a.next]),a.turn.data().opts.autoCenter&&a.turn.turn("center",a.next)},_touchStart:function(){var t=this.data();for(var e in t.pages)if(d(e,t.pages)&&C._eventStart.apply(t.pages[e],arguments)===!1)return!1},_touchMove:function(){var t=this.data();for(var e in t.pages)d(e,t.pages)&&C._eventMove.apply(t.pages[e],arguments)},_touchEnd:function(){var t=this.data();for(var e in t.pages)d(e,t.pages)&&C._eventEnd.apply(t.pages[e],arguments)},calculateZ:function(t){var e,a,i,r,s,n=this,o=this.data(),h=this.turn("view"),p=h[0]||h[1],d=t.length-1,l={pageZ:{},partZ:{},pageV:{}},g=function(t){var e=n.turn("view",t);e[0]&&(l.pageV[e[0]]=!0),e[1]&&(l.pageV[e[1]]=!0)};for(e=0;e<=d;e++)a=t[e],i=o.pages[a].data().f.opts.next,r=o.pagePlace[a],g(a),g(i),s=o.pagePlace[i]==i?i:a,l.pageZ[s]=o.totalPages-Math.abs(p-s),l.partZ[r]=2*o.totalPages-d+e;return l},update:function(){var e,a=this.data();if(this.turn("animating")&&0!==a.pageMv[0]){var i,r,s=this.turn("calculateZ",a.pageMv),n=this.turn("corner"),o=this.turn("view"),h=this.turn("view",a.tpage);for(e in a.pageWrap)d(e,a.pageWrap)&&(r=a.pageObjs[e].hasClass("fixed"),a.pageWrap[e].css({display:s.pageV[e]||r?"":"none",zIndex:(a.pageObjs[e].hasClass("hard")?s.partZ[e]:s.pageZ[e])||(r?-1:0)}),(i=a.pages[e])&&(i.flip("z",s.partZ[e]||null),s.pageV[e]&&i.flip("resize"),a.tpage?i.flip("hover",!1).flip("disable",t.inArray(parseInt(e,10),a.pageMv)==-1&&e!=h[0]&&e!=h[1]):i.flip("hover",n===!1).flip("disable",e!=o[0]&&e!=o[1])))}else for(e in a.pageWrap)if(d(e,a.pageWrap)){var p=F._setPageLoc.call(this,e);a.pages[e]&&a.pages[e].flip("disable",a.disabled||1!=p).flip("hover",!0).flip("z",null)}return this},_updateShadow:function(){var e,i,r=this.data(),s=this.width(),n=this.height(),o="single"==r.display?s:s/2;e=this.turn("view"),r.shadow||(r.shadow=t("<div />",{class:"shadow",css:a(0,0,0).css}).appendTo(this));for(var h=0;h<r.pageMv.length&&(e[0]&&e[1]);h++)e=this.turn("view",r.pages[r.pageMv[h]].data().f.opts.next),i=this.turn("view",r.pageMv[h]),e[0]=e[0]&&i[0],e[1]=e[1]&&i[1];switch(e[0]?e[1]?3:"ltr"==r.direction?2:1:"ltr"==r.direction?1:2){case 1:r.shadow.css({width:o,height:n,top:0,left:o});break;case 2:r.shadow.css({width:o,height:n,top:0,left:0});break;case 3:r.shadow.css({width:s,height:n,top:0,left:0})}},_setPageLoc:function(t){var e=this.data(),a=this.turn("view"),i=0;if(t==a[0]||t==a[1]?i=1:("single"==e.display&&t==a[0]+1||"double"==e.display&&t==a[0]-2||t==a[1]+2)&&(i=2),!this.turn("animating"))switch(i){case 1:e.pageWrap[t].css({zIndex:e.totalPages,display:""});break;case 2:e.pageWrap[t].css({zIndex:e.totalPages-1,display:""});break;case 0:e.pageWrap[t].css({zIndex:0,display:e.pageObjs[t].hasClass("fixed")?"":"none"})}return i},options:function(e){if(void 0===e)return this.data().opts;var a=this.data();if(t.extend(a.opts,e),e.pages&&this.turn("pages",e.pages),e.page&&this.turn("page",e.page),e.display&&this.turn("display",e.display),e.direction&&this.turn("direction",e.direction),e.width&&e.height&&this.turn("size",e.width,e.height),e.when)for(var i in e.when)d(i,e.when)&&this.unbind(i).bind(i,e.when[i]);return this},version:function(){return y}},C={init:function(t){return this.data({f:{disabled:!1,hover:!1,effect:this.hasClass("hard")?"hard":"sheet"}}),this.flip("options",t),C._addPageWrapper.call(this),this},setData:function(e){var a=this.data();return a.f=t.extend(a.f,e),this},options:function(e){var a=this.data().f;return e?(C.setData.call(this,{opts:t.extend({},a.opts||W,e)}),this):a.opts},z:function(t){var e=this.data().f;return e.opts["z-index"]=t,e.fwrapper&&e.fwrapper.css({zIndex:t||parseInt(e.parent.css("z-index"),10)||0}),this},_cAllowed:function(){var t=this.data().f,e=t.opts.page,a=t.opts.turn.data(),i=e%2;return"hard"==t.effect?"ltr"==a.direction?[i?"r":"l"]:[i?"l":"r"]:"single"==a.display?1==e?"ltr"==a.direction?z.forward:z.backward:e==a.totalPages?"ltr"==a.direction?z.backward:z.forward:z.all:"ltr"==a.direction?z[i?"forward":"backward"]:z[i?"backward":"forward"]},_cornerActivated:function(e){var a=this.data().f,i=this.width(),r=this.height(),s={x:e.x,y:e.y,corner:""},n=a.opts.cornerSize;if(s.x<=0||s.y<=0||s.x>=i||s.y>=r)return!1;var o=C._cAllowed.call(this);switch(a.effect){case"hard":if(s.x>i-n)s.corner="r";else{if(!(s.x<n))return!1;s.corner="l"}break;case"sheet":if(s.y<n)s.corner+="t";else{if(!(s.y>=r-n))return!1;s.corner+="b"}if(s.x<=n)s.corner+="l";else{if(!(s.x>=i-n))return!1;s.corner+="r"}}return!(!s.corner||t.inArray(s.corner,o)==-1)&&s},_isIArea:function(t){var e=this.data().f.parent.offset();return t=M&&t.originalEvent?t.originalEvent.touches[0]:t,C._cornerActivated.call(this,{x:t.pageX-e.left,y:t.pageY-e.top})},_c:function(t,e){switch(e=e||0,t){case"tl":return n(e,e);case"tr":return n(this.width()-e,e);case"bl":return n(e,this.height()-e);case"br":return n(this.width()-e,this.height()-e);case"l":return n(e,0);case"r":return n(this.width()-e,0)}},_c2:function(t){switch(t){case"tl":return n(2*this.width(),0);case"tr":return n(-this.width(),0);case"bl":return n(2*this.width(),this.height());case"br":return n(-this.width(),this.height());case"l":return n(2*this.width(),0);case"r":return n(-this.width(),0)}},_foldingPage:function(){var t=this.data().f;if(t){var e=t.opts;return e.turn?(t=e.turn.data(),"single"==t.display?e.next>1||e.page>1?t.pageObjs[0]:null:t.pageObjs[e.next]):void 0}},_backGradient:function(){var e=this.data().f,i=e.opts.turn.data(),r=i.opts.gradients&&("single"==i.display||2!=e.opts.page&&e.opts.page!=i.totalPages-1);return r&&!e.bshadow&&(e.bshadow=t("<div/>",a(0,0,1)).css({position:"",width:this.width(),height:this.height()}).appendTo(e.parent)),r},type:function(){return this.data().f.effect},resize:function(t){var e=this.data().f,a=e.opts.turn.data(),i=this.width(),r=this.height();switch(e.effect){case"hard":t&&(e.wrapper.css({width:i,height:r}),e.fpage.css({width:i,height:r}),a.opts.gradients&&(e.ashadow.css({width:i,height:r}),e.bshadow.css({width:i,height:r})));break;case"sheet":if(t){var s=Math.round(Math.sqrt(Math.pow(i,2)+Math.pow(r,2)));e.wrapper.css({width:s,height:s}),e.fwrapper.css({width:s,height:s}).children(":first-child").css({width:i,height:r}),e.fpage.css({width:i,height:r}),a.opts.gradients&&e.ashadow.css({width:i,height:r}),C._backGradient.call(this)&&e.bshadow.css({width:i,height:r})}if(e.parent.is(":visible")){var n=v(e.parent[0]);e.fwrapper.css({top:n.top,left:n.left}),n=v(e.opts.turn[0]),e.fparent.css({top:-n.top,left:-n.left})}this.flip("z",e.opts["z-index"])}},_addPageWrapper:function(){var e=this.data().f,i=e.opts.turn.data(),r=this.parent();if(e.parent=r,!e.wrapper)switch(e.effect){case"hard":var s={};s[x+"transform-style"]="preserve-3d",s[x+"backface-visibility"]="hidden",e.wrapper=t("<div/>",a(0,0,2)).css(s).appendTo(r).prepend(this),e.fpage=t("<div/>",a(0,0,1)).css(s).appendTo(r),i.opts.gradients&&(e.ashadow=t("<div/>",a(0,0,0)).hide().appendTo(r),e.bshadow=t("<div/>",a(0,0,0)));break;case"sheet":var n=this.width(),o=this.height();Math.round(Math.sqrt(Math.pow(n,2)+Math.pow(o,2)));if(e.fparent=e.opts.turn.data().fparent,!e.fparent){var h=t("<div/>",{css:{"pointer-events":"none"}}).hide();h.data().flips=0,h.css(a(0,0,"auto","visible").css).appendTo(e.opts.turn),e.opts.turn.data().fparent=h,e.fparent=h}this.css({position:"absolute",top:0,left:0,bottom:"auto",right:"auto"}),e.wrapper=t("<div/>",a(0,0,this.css("z-index"))).appendTo(r).prepend(this),e.fwrapper=t("<div/>",a(r.offset().top,r.offset().left)).hide().appendTo(e.fparent),e.fpage=t("<div/>",a(0,0,0,"visible")).css({cursor:"default"}).appendTo(e.fwrapper),i.opts.gradients&&(e.ashadow=t("<div/>",a(0,0,1)).appendTo(e.fpage)),C.setData.call(this,e)}C.resize.call(this,!0)},_fold:function(t){var e=this.data().f,a=e.opts.turn.data(),i=C._c.call(this,t.corner),r=this.width(),o=this.height();switch(e.effect){case"hard":"l"==t.corner?t.x=Math.min(Math.max(t.x,0),2*r):t.x=Math.max(Math.min(t.x,r),-r);var d,l,g,f,u,v=a.totalPages,w=e.opts["z-index"]||v,m={overflow:"visible"},y=i.x?(i.x-t.x)/r:t.x/r,M=90*y,k=M<90;switch(t.corner){case"l":f="0% 50%",u="100% 50%",k?(d=0,l=e.opts.next-1>0,g=1):(d="100%",l=e.opts.page+1<v,g=0);break;case"r":f="100% 50%",u="0% 50%",M=-M,r=-r,k?(d=0,l=e.opts.next+1<v,g=0):(d="-100%",l=1!=e.opts.page,g=1)}m[x+"perspective-origin"]=u,e.wrapper.transform("rotateY("+M+"deg)translate3d(0px, 0px, "+(this.attr("depth")||0)+"px)",u),e.fpage.transform("translateX("+r+"px) rotateY("+(180+M)+"deg)",f),e.parent.css(m),k?(y=1-y,e.wrapper.css({zIndex:w+1}),e.fpage.css({zIndex:w})):(y-=1,e.wrapper.css({zIndex:w}),e.fpage.css({zIndex:w+1})),a.opts.gradients&&(l?e.ashadow.css({display:"",left:d,backgroundColor:"rgba(0,0,0,"+.5*y+")"}).transform("rotateY(0deg)"):e.ashadow.hide(),e.bshadow.css({opacity:1-y}),k?e.bshadow.parent()[0]!=e.wrapper[0]&&e.bshadow.appendTo(e.wrapper):e.bshadow.parent()[0]!=e.fpage[0]&&e.bshadow.appendTo(e.fpage),c(e.bshadow,n(100*g,0),n(100*(1-g),0),[[0,"rgba(0,0,0,0.3)"],[1,"rgba(0,0,0,0)"]],2));break;case"sheet":var z,j,O,T,W,A,F,S=this,q=0,E=0,I=n(0,0),Z=n(0,0),D=n(0,0),V=C._foldingPage.call(this),R=(Math.tan(E),a.opts.acceleration),H=e.wrapper.height(),L="t"==t.corner.substr(0,1),Y="l"==t.corner.substr(1,1),G=function e(){var h=n(0,0),p=n(0,0);h.x=i.x?i.x-t.x:t.x,h.y=b?i.y?i.y-t.y:t.y:0,p.x=Y?r-h.x/2:t.x+h.x/2,p.y=h.y/2;var d=P-Math.atan2(h.y,h.x),l=d-Math.atan2(p.y,p.x),g=Math.max(0,Math.sin(l)*Math.sqrt(Math.pow(p.x,2)+Math.pow(p.y,2)));if(q=s(d),D=n(g*Math.sin(d),g*Math.cos(d)),d>P&&(D.x=D.x+Math.abs(D.y*h.y/h.x),D.y=0,Math.round(D.x*Math.tan(_-d))<o))return t.y=Math.sqrt(Math.pow(o,2)+2*p.x*h.x),L&&(t.y=o-t.y),e();if(d>P){var c=_-d,f=H-o/Math.sin(c);I=n(Math.round(f*Math.cos(c)),Math.round(f*Math.sin(c))),Y&&(I.x=-I.x),L&&(I.y=-I.y)}z=Math.round(D.y/Math.tan(d)+D.x);var u=r-z,v=u*Math.cos(2*d),w=u*Math.sin(2*d);if(Z=n(Math.round(Y?u-v:z+v),Math.round(L?w:o-w)),a.opts.gradients){W=u*Math.sin(d);var m=C._c2.call(S,t.corner),x=Math.sqrt(Math.pow(m.x-t.x,2)+Math.pow(m.y-t.y,2))/r;F=Math.sin(P*(x>1?2-x:x)),A=Math.min(x,1),T=W>100?(W-100)/W:0,j=n(W*Math.sin(d)/r*100,W*Math.cos(d)/o*100),C._backGradient.call(S)&&(O=n(1.2*W*Math.sin(d)/r*100,1.2*W*Math.cos(d)/o*100),Y||(O.x=100-O.x),L||(O.y=100-O.y))}return D.x=Math.round(D.x),D.y=Math.round(D.y),!0},X=function(t,i,s,d){var l=["0","auto"],g=(r-H)*s[0]/100,f=(o-H)*s[1]/100,u={left:l[i[0]],top:l[i[1]],right:l[i[2]],bottom:l[i[3]]},v={},w=90!=d&&d!=-90?Y?-1:1:0,m=s[0]+"% "+s[1]+"%";S.css(u).transform(p(d)+h(t.x+w,t.y,R),m),e.fpage.css(u).transform(p(d)+h(t.x+Z.x-I.x-r*s[0]/100,t.y+Z.y-I.y-o*s[1]/100,R)+p((180/d-2)*d),m),e.wrapper.transform(h(-t.x+g-w,-t.y+f,R)+p(-d),m),e.fwrapper.transform(h(-t.x+I.x+g,-t.y+I.y+f,R)+p(-d),m),a.opts.gradients&&(s[0]&&(j.x=100-j.x),s[1]&&(j.y=100-j.y),v["box-shadow"]="0 0 20px rgba(0,0,0,"+.5*F+")",V.css(v),c(e.ashadow,n(Y?100:0,L?0:100),n(j.x,j.y),[[T,"rgba(0,0,0,0)"],[.8*(1-T)+T,"rgba(0,0,0,"+.2*A+")"],[1,"rgba(255,255,255,"+.2*A+")"]],3,E),C._backGradient.call(S)&&c(e.bshadow,n(Y?0:100,L?0:100),n(O.x,O.y),[[.6,"rgba(0,0,0,0)"],[.8,"rgba(0,0,0,"+.3*A+")"],[1,"rgba(0,0,0,0)"]],3))};switch(t.corner){case"l":break;case"r":break;case"tl":t.x=Math.max(t.x,1),G(),X(D,[1,0,0,1],[100,0],q);break;case"tr":t.x=Math.min(t.x,r-1),G(),X(n(-D.x,D.y),[0,0,0,1],[0,0],-q);break;case"bl":t.x=Math.max(t.x,1),G(),X(n(D.x,-D.y),[1,1,0,0],[100,100],-q);break;case"br":t.x=Math.min(t.x,r-1),G(),X(n(-D.x,-D.y),[0,1,1,0],[0,100],q)}}e.point=t},_moveFoldingPage:function(t){var e=this.data().f;if(e){var a=e.opts.turn,i=a.data(),r=i.pagePlace;if(t){var s=e.opts.next;if(r[s]!=e.opts.page){e.folding&&C._moveFoldingPage.call(this,!1);C._foldingPage.call(this).appendTo(e.fpage),r[s]=e.opts.page,e.folding=s}a.turn("update")}else if(e.folding){if(i.pages[e.folding]){var n=i.pages[e.folding].data().f;i.pageObjs[e.folding].appendTo(n.wrapper)}else i.pageWrap[e.folding]&&i.pageObjs[e.folding].appendTo(i.pageWrap[e.folding]);e.folding in r&&(r[e.folding]=e.folding),delete e.folding}}},_showFoldedPage:function(t,e){var a=C._foldingPage.call(this),i=this.data(),r=i.f,s=r.visible;if(a){if(!s||!r.point||r.point.corner!=t.corner){var n="hover"==r.status||"peel"==r.status||r.opts.turn.data().mouseAction?t.corner:null;if(s=!1,"prevented"==f("start",this,[r.opts,n]))return!1}if(e){var o=this,h=r.point&&r.point.corner==t.corner?r.point:C._c.call(this,t.corner,1);this.animatef({from:[h.x,h.y],to:[t.x,t.y],duration:500,frame:function(e){t.x=Math.round(e[0]),t.y=Math.round(e[1]),C._fold.call(o,t)}})}else C._fold.call(this,t),i.effect&&!i.effect.turning&&this.animatef(!1);if(!s)switch(r.effect){case"hard":r.visible=!0,C._moveFoldingPage.call(this,!0),r.fpage.show(),r.opts.shadows&&r.bshadow.show();break;case"sheet":r.visible=!0,r.fparent.show().data().flips++,C._moveFoldingPage.call(this,!0),r.fwrapper.show(),r.bshadow&&r.bshadow.show()}return!0}return!1},hide:function(){var t=this.data().f,e=t.opts.turn.data(),a=C._foldingPage.call(this);switch(t.effect){case"hard":e.opts.gradients&&(t.bshadowLoc=0,t.bshadow.remove(),t.ashadow.hide()),t.wrapper.transform(""),t.fpage.hide();break;case"sheet":0==--t.fparent.data().flips&&t.fparent.hide(),this.css({left:0,top:0,right:"auto",bottom:"auto"}).transform(""),t.wrapper.transform(""),t.fwrapper.hide(),t.bshadow&&t.bshadow.hide(),a.transform("")}return t.visible=!1,this},hideFoldedPage:function(t){var e=this.data().f;if(e.point){var a=this,r=e.point,s=function(){e.point=null,e.status="",a.flip("hide"),a.trigger("end",[e.opts,!1])};if(t){var o=C._c.call(this,r.corner),h="t"==r.corner.substr(0,1),p=h?Math.min(0,r.y-o.y)/2:Math.max(0,r.y-o.y)/2,d=n(r.x,r.y+p),l=n(o.x,o.y-p);this.animatef({from:0,to:1,frame:function(t){var e=i(r,d,l,o,t);r.x=e.x,r.y=e.y,C._fold.call(a,r)},complete:s,duration:800,hiding:!0})}else this.animatef(!1),s()}},turnPage:function(t){var e=this,a=this.data().f,r=a.opts.turn.data();t={corner:a.corner?a.corner.corner:t||C._cAllowed.call(this)[0]};var s=a.point||C._c.call(this,t.corner,a.opts.turn?r.opts.elevation:0),n=C._c2.call(this,t.corner);this.trigger("flip").animatef({from:0,to:1,frame:function(a){var r=i(s,s,n,n,a);t.x=r.x,t.y=r.y,C._showFoldedPage.call(e,t)},complete:function(){e.trigger("end",[a.opts,!0])},duration:r.opts.duration,turning:!0}),a.corner=null},moving:function(){return"effect"in this.data()},isTurning:function(){return this.flip("moving")&&this.data().effect.turning},corner:function(){return this.data().f.corner},_eventStart:function(t){var e=this.data().f,a=e.opts.turn;if(!e.corner&&!e.disabled&&!this.flip("isTurning")&&e.opts.page==a.data().pagePlace[e.opts.page]){if(e.corner=C._isIArea.call(this,t),e.corner&&C._foldingPage.call(this))return this.trigger("pressed",[e.point]),C._showFoldedPage.call(this,e.corner),!1;e.corner=null}},_eventMove:function(t){var e=this.data().f;if(!e.disabled)if(t=M?t.originalEvent.touches:[t],e.corner){var a=e.parent.offset();e.corner.x=t[0].pageX-a.left,e.corner.y=t[0].pageY-a.top,C._showFoldedPage.call(this,e.corner)}else if(e.hover&&!this.data().effect&&this.is(":visible")){var i=C._isIArea.call(this,t[0]);if(i){if("sheet"==e.effect&&2==i.corner.length||"hard"==e.effect){e.status="hover";var r=C._c.call(this,i.corner,e.opts.cornerSize/2);i.x=r.x,i.y=r.y,C._showFoldedPage.call(this,i,!0)}}else"hover"==e.status&&(e.status="",C.hideFoldedPage.call(this,!0))}},_eventEnd:function(){var t=this.data().f,e=t.corner;!t.disabled&&e&&"prevented"!=f("released",this,[t.point||e])&&C.hideFoldedPage.call(this,!0),t.corner=null},disable:function(t){return C.setData.call(this,{disabled:t}),this},hover:function(t){return C.setData.call(this,{hover:t}),this},peel:function(e,a){var i=this.data().f;if(e){if(t.inArray(e,z.all)==-1)throw u("Corner "+e+" is not permitted");if(t.inArray(e,C._cAllowed.call(this))!=-1){var r=C._c.call(this,e,i.opts.cornerSize/2);i.status="peel",C._showFoldedPage.call(this,{corner:e,x:r.x,y:r.y},a)}}else i.status="",C.hideFoldedPage.call(this,a);return this}};window.requestAnim=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}(),t.extend(t.fn,{flip:function(){return e(t(this[0]),C,arguments)},turn:function(){return e(t(this[0]),F,arguments)},transform:function(t,e){var a={};return e&&(a[x+"transform-origin"]=e),a[x+"transform"]=t,this.css(a)},animatef:function(e){var a=this.data();if(a.effect&&a.effect.stop(),e){e.to.length||(e.to=[e.to]),e.from.length||(e.from=[e.from]);for(var i=[],r=e.to.length,s=!0,n=this,o=(new Date).getTime(),h=function t(){if(a.effect&&s){for(var h=[],p=Math.min(e.duration,(new Date).getTime()-o),d=0;d<r;d++)h.push(a.effect.easing(1,p,e.from[d],i[d],e.duration));e.frame(1==r?h[0]:h),p==e.duration?(delete a.effect,n.data(a),e.complete&&e.complete()):window.requestAnim(t)}},p=0;p<r;p++)i.push(e.to[p]-e.from[p]);a.effect=t.extend({stop:function(){s=!1},easing:function(t,e,a,i,r){return i*Math.sqrt(1-(e=e/r-1)*e)+a}},e),this.data(a),h()}else delete a.effect}}),t.isTouch=M,t.mouseEvents=k,t.cssPrefix=l,t.cssTransitionEnd=g,t.findPos=v}(t)}).call(e,a(36))},241:function(t,e,a){e=t.exports=a(118)(),e.push([t.i,".test{position:absolute;top:0;left:0}.flipbook-viewport,.test{width:100%;height:100%;overflow:hidden}.flipbook-viewport .container{position:absolute;top:50%;left:50%;margin:auto}.flipbook-viewport .flipbook{width:750px;height:375px;left:-175px}.flipbook-viewport .page{width:461px;height:600px;background-color:#fff;background-repeat:no-repeat;background-size:100% 100%}.flipbook .page{-ms-box-shadow:0 0 20px rgba(0,0,0,.2);-o-box-shadow:0 0 20px rgba(0,0,0,.2);box-shadow:0 0 20px rgba(0,0,0,.2)}.flipbook-viewport .page img{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin:0}.flipbook-viewport .shadow{-webkit-transition:-webkit-box-shadow .5s;-moz-transition:-moz-box-shadow .5s;-o-transition:-webkit-box-shadow .5s;-ms-transition:-ms-box-shadow .5s;-o-box-shadow:0 0 20px #ccc;-ms-box-shadow:0 0 20px #ccc;box-shadow:0 0 20px #ccc}",""])},346:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",{staticClass:"test"},[a("div",{staticClass:"flipbook-viewport"},[a("div",{staticClass:"container"},[a("div",{staticClass:"flipbook"},[a("div",[a("img",{attrs:{src:"http://image.cache.timepack.cn/o_1bgpe6m5m1nrtaahbhesnanv910.jpg?imageView2/1/w/375/h/375/q/100",alt:""}})]),t._v(" "),a("div",[a("img",{attrs:{src:"http://image.cache.timepack.cn/o_1bgpe6m5m1jor1a9j1rcb11vh1rint.jpg?imageView2/1/w/375/h/375/q/100",alt:""}})]),t._v(" "),a("div",[a("img",{attrs:{src:"http://image.cache.timepack.cn/o_1bgpe6m5m14jbs3i14pb9mp1jf0v.jpg?imageView2/1/w/375/h/375/q/100",alt:""}})]),t._v(" "),a("div",[a("img",{attrs:{src:"http://image.cache.timepack.cn/o_1bgpe6m5m1ig615i6tlogal1nivu.jpg?imageView2/1/w/375/h/375/q/100",alt:""}})]),t._v(" "),a("div",[a("img",{attrs:{src:"http://image.cache.timepack.cn/o_1bgpe6m5m186l1oco5keone1q8bs.jpg?imageView2/1/w/375/h/375/q/100",alt:""}})]),t._v(" "),a("div",[a("img",{attrs:{src:"http://image.cache.timepack.cn/o_1bgpe6m5m12vlu5v6b116aj1d5nr.jpg?imageView2/1/w/375/h/375/q/100",alt:""}})]),t._v(" "),a("div",[a("img",{attrs:{src:"http://image.cache.timepack.cn/o_1bgpe6m5mjg1b8j1keoqg3125mq.jpg?imageView2/1/w/375/h/375/q/100",alt:""}})])])])])])}]}},399:function(t,e,a){var i=a(241);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a(119)("e4f5b704",i,!0)},464:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(36),r=a.n(i);a(197),e.default={mounted:function(){var t=window.innerWidth,e=t/2;this.$nextTick(function(){r()(".flipbook").turn({width:t,height:e,elevation:50,gradients:!0,autoCenter:!0})})}}}});