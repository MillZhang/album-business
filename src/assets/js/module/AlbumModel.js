import Util from 'jsPath/tool/Util'
import Cache from 'jsPath/tool/Cache'
import insertSrc from 'assets/images/icon/icon-inert.png';
export default new class MCanvas {
  /**
   * 初始化photoList
   */
  initPhotoList() {
    let photoList = [];
    let layout = Cache.layout().getter();
    for (let i = 0, len = layout.length; i < len; i++) {
      let item = layout[i],
        page = {};
      page.list = [];
      page.size = item.area.length;
      page.main = item.layoutStyle.main;
      page.sub = item.layoutStyle.sub;
      page.temp = item.id;
      page.wait = 0; //初始化待插入的位置为0
      page.bw = Util.getConstant().EditorWidth;
      page.dpr = document.documentElement.getAttribute('data-dpr');
      for (let j = 0; j < page.size; j++) {
        let pageItem = {};
        pageItem.width = 0;
        pageItem.height = 0;
        pageItem.key = '';
        pageItem.degree = 0;
        pageItem.location = {
          position: {
            left: 0,
            top: 0
          },
          layoutIndex: j + 1
        }
        page.list.push(pageItem);
      }
      photoList.push(page);
    }
    Cache.photoList().setter(photoList);
  }

  /**
   * 更新照片礼列表
   * @param index
   */
  updatePhotoContainer(index) {
    let photoList = Cache.photoList().getter();
    //缓存当前的图片模板-保证只缓存一个当前页
    if (null == Cache.tempPhoto().getter()) {
      Cache.tempPhoto().setter(photoList[index]);
    }
    let currentLayout = Cache.layout().getter()[index];
    let page = {};
    page.list = [];
    page.size = currentLayout.area.length;
    page.temp = currentLayout.id;
    page.bw = Util.getConstant().EditorWidth;
    page.dpr = document.documentElement.getAttribute('data-dpr');
    page.main = currentLayout.layoutStyle.main;
    page.sub = currentLayout.layoutStyle.sub;
    page.wait = 0; //初始化待插入的位置为0
    for (let j = 0; j < page.size; j++) {
      let pageItem = {};
      pageItem.width = 0;
      pageItem.height = 0;
      pageItem.key = '';
      pageItem.degree = 0;
      pageItem.location = {
        position: {
          left: 0,
          top: 0
        },
        layoutIndex: j + 1
      }
      page.list.push(pageItem);
    }
    photoList[index] = this.updatePhotoContent(index, page)
    Cache.photoList().setter(photoList);
    return page;
  }

  updatePhotoContent(pageIndex, photoObj) {
    if (undefined == photoObj.list) return;
    let cachePhoto = Cache.tempPhoto().getter();
    let list = cachePhoto.list;
    for (let i = 0; i < list.length; i++) {
      let item = list[i],
        pageItem = photoObj.list[i];
      if (item.key != "" && undefined != pageItem) {
        photoObj.list[i] = {
          width: item.width,
          height: item.height,
          key: item.key,
          degree: item.degree,
          location: {
            position: this.centeringImage(pageIndex, i, item.width, item.height),
            layoutIndex: i + 1
          }
        };
        photoObj.wait += 1;
      }
    }
    return photoObj;
  }

  /**
   * 缓存初始的容器数据
   * @param data
   */
  setCacheData(data) {
    Cache.layout().setter(data.layout);
    this.initPhotoList();
  }

  /**
   * 设置编辑器
   * @param pageIndex
   * @param imageIndex
   * @param editorWidth
   * @param editable
   * @returns {{position: string, width: string, height: string, left: string, top: string, overflow: string, zIndex: *, backgroundRepeat: string}}
   */
  setEitorPage(pageIndex, imageIndex, editorWidth, editable) {
    if (null == Cache.layout().getter()) return '';
    const layout = Cache.layout().getter()[pageIndex],
      area = layout.area[imageIndex],
      scale = layout.scale;
    //长宽比
    const wl_radio = layout.tw / layout.th;
    //容器长宽比
    const ar_radio = area.aw / area.ah;
    //缩放比
    const zoom_radio = layout.tw * scale / editorWidth;
    //设置容器的样式
    let style = {
      position: 'absolute',
      width: (area.aw * scale / zoom_radio) + 'px',
      height: (area.ah * scale / zoom_radio) + 'px',
      left: (area.ax * scale / zoom_radio) + 'px',
      top: (area.ay * scale / zoom_radio) + 'px',
      overflow: 'hidden',
      zIndex: 100 + pageIndex,
      backgroundRepeat: 'no-repeat'
    };
    //判断是否有图片,有则进行插入操作,无则跳过
    if (!editable) {
      let currentPhotoObject = Cache.photoList().getter()[pageIndex],
        currentPhoto = Cache.photoList().getter()[pageIndex].list;
      const widthContrastRadio = editorWidth / Util.getConstant().EditorWidth;
      if (undefined != currentPhoto) {
        let photo = currentPhoto[imageIndex];
        if ("" == photo.key || photo.width == 0) { //暂无图片,显示默认图片
          style.background = 'url(' + insertSrc + ') center no-repeat';
          style.backgroundPosition = "100% 100%";
          style.backgroundSize = "100% 100%";
        } else { //有图片
          let url = encodeURI(Util.getConstant().DOMAIN + photo.key + Util.getConstant().THUMB600 + '/rotate/' + photo.degree),
            imageScaleWidth, imageScaleHight;
          style.backgroundImage = 'url(' + url + ')';
          //此处left,top需要计算相对比

          style.backgroundPosition = (photo.location.position.left) * widthContrastRadio.toFixed(2) + 'px ' + (photo.location.position.top) * widthContrastRadio.toFixed(2) + 'px';
          const im_radio = photo.width / photo.height; //图片的长宽比
          if (ar_radio >= im_radio) { //容器长宽比大于图片的长宽比
            imageScaleWidth = "100%";
            imageScaleHight = "auto";
          } else {
            imageScaleWidth = "auto";
            imageScaleHight = "100%";
          }
          style.backgroundSize = imageScaleWidth + ' ' + imageScaleHight;
        }
      }
    }
    return style;
  }

  /**
   * 根据下标获取模板图片
   * @param index
   * @returns {*}
   */
  getTemplateImage(index) {
    if (null == Cache.layout().getter()) return '';
    let _m = Cache.layout().getter()[index];
    if (undefined == _m) return '';
    return _m.pngImg + Util.getConstant().THUMB600;
  }

  /**
   * 获取照片
   * @param pageIndex
   * @param imageIndex
   * @returns {string}
   */
  getPhotoItemImageUrl(pageIndex, imageIndex) {
    let currentPhoto = Cache.photoList().getter()[pageIndex].list;
    if (undefined != currentPhoto) {
      let photo = currentPhoto[imageIndex];
      if ("" == photo.key || photo.width == 0) {
        return insertSrc;
      } else {
        return encodeURI(Util.getConstant().DOMAIN + photo.key + Util.getConstant().THUMB600 + '/rotate/' + photo.degree);
      }
    }
  }

  /**
   * 设置图片的样式
   * @param pageIndex
   * @param imageIndex
   * @returns {{position: string, left: string, top: string}}
   */
  setPhotoItemImageStyle(pageIndex, imageIndex) {
    const layout = Cache.layout().getter()[pageIndex],
      area = layout.area[imageIndex];
    //长宽比
    const wl_radio = layout.tw / layout.th;
    //容器长宽比
    const ar_radio = area.aw / area.ah;
    //缩放比
    const zoom_radio = layout.tw / Util.getConstant().EditorWidth;
    let currentPhoto = Cache.photoList().getter()[pageIndex].list;
    if (undefined != currentPhoto) {
      let photo = currentPhoto[imageIndex],
        imageScaleWidth, imageScaleHight;
      let style = {
        position: 'absolute',
        left: photo.location.position.left.toFixed(2) + 'px',
        top: photo.location.position.top.toFixed(2) + 'px'
      };
      if ("" == photo.key || photo.width == 0) {
        style.width = '100%';
        style.height = '100%';
      } else {
        const im_radio = photo.width / photo.height; //图片的长宽比
        if (ar_radio >= im_radio) {
          imageScaleWidth = "100%";
          imageScaleHight = "auto";
        } else {
          imageScaleWidth = "auto";
          imageScaleHight = "100%";
        }
        style.width = imageScaleWidth;
        style.height = imageScaleHight;
      }
      return style;
    }
  }

  /**
   * 批量填充图片
   * @param $list
   */
  fillImageByGroup($list) {
    let photoList = Cache.photoList().getter(),
      index = 0; //index不得大于$list.length
    for (let i = 0; i < photoList.length; i++) {
      let item = photoList[i],
        m_list = item.list;
      if (undefined != m_list) { //过滤扉页
        while (item.size > item.wait) {
          if (index == $list.length) { //无图片可插入,直接退出
            break;
          }
          let $image = $($list[index]).find('img');
          m_list[item.wait] = this.replaceImageBySequence(i, item.wait, $image);
          item.wait += 1;
          index++;
        }
      }
    }
    Cache.photoList().setter(photoList);
  }

  /**
   * 单页填充图片
   * @param $list
   * @param page
   */
  fillImageByPage($list, page) {
    let photoList = Cache.photoList().getter(),
      index = 0; //index不得大于$list.length
    let item = photoList[page],
      p_list = item.list;
    if (undefined != p_list) {
      while (item.size > item.wait) {
        if (index == $list.length) { //无图片可插入,直接退出
          break;
        }
        let $image = $($list[index]).find('img');
        p_list[item.wait] = this.replaceImageBySequence(Number(page), item.wait, $image);
        item.wait += 1;
        index++;
      }
    }
    Cache.photoList().setter(photoList);
    Cache.tempPhoto().setter(Cache.photoList().getter()[page]);
  }

  /**
   * 单页内根据下标填充图片
   * @param list
   * @param page
   * @param index
   */
  fillImageByIndex(list, page, index) { //只有一张图片
    let $image = $(list[0]).find('img');
    let photoList = Cache.photoList().getter();
    let item = photoList[page],
      p_list = item.list;
    p_list[index] = this.replaceImageBySequence(Number(page), Number(index), $image);
    Cache.photoList().setter(photoList);
    Cache.tempPhoto().setter(Cache.photoList().getter()[page]);
  }

  rotateImage(pageIndex, imageIndex) {
    let photoList = Cache.photoList().getter();
    let currentPhoto = photoList[pageIndex];
    if (undefined != currentPhoto.list) {
      let item = currentPhoto.list[imageIndex],
        width = item.width,
        height = item.height,
        degree = item.degree;
      item.degree = (Number(degree) + 90) % 360;
      item.width = height;
      item.height = width;
      item.location.position = this.centeringImage(pageIndex, imageIndex, item.width, item.height);
    }
    Cache.photoList().setter(photoList);
    return currentPhoto;
  }

  /**
   * 按序替换图片
   * @param page
   * @param imageIndex
   * @param $image
   * @returns {{width: (*|{immediate, handler}), height: (*|{immediate, handler}), key: (*|{immediate, handler}), degree: (*|{immediate, handler}), location: {position: *, layoutIndex: *}}}
   */
  replaceImageBySequence(page, imageIndex, $image) {
    let width = $image.attr('data-width'),
      height = $image.attr('data-height'),
      degree = $image.attr('data-degree'),
      key = $image.attr('data-key');
    return {
      width: width,
      height: height,
      key: key,
      degree: degree,
      location: {
        position: this.centeringImage(page, imageIndex, width, height),
        layoutIndex: Number(imageIndex) + 1
      }
    }
  }

  /**
   *
   * @param page
   * @param index
   * @param iw
   * @param ih
   * @returns {{}}
   */
  centeringImage(page, index, iw, ih) {
    let layout = Cache.layout().getter()[page];
    let area = layout.area[index];
    let position = {};
    if (undefined != area) {
      const ar_radio = area.aw / area.ah;
      const zoom_radio = layout.tw / Util.getConstant().EditorWidth;
      const im_radio = iw / ih; //图片的长宽比
      if (ar_radio >= im_radio) {
        let scaleWidthRadio = (area.aw / zoom_radio) / iw;
        position = {
          maxTop: 0,
          minTop: -(ih * scaleWidthRadio - area.ah / zoom_radio).toFixed(2),
          left: 0,
          top: -((ih * scaleWidthRadio - area.ah / zoom_radio) / 2).toFixed(2)
        }
      } else {
        let scaleHeightRadio = (area.ah / zoom_radio) / ih;
        position = {
          maxLeft: 0,
          minLeft: -(iw * scaleHeightRadio - area.aw / zoom_radio).toFixed(2),
          left: -((iw * scaleHeightRadio - area.aw / zoom_radio) / 2).toFixed(2),
          top: 0
        }
      }
      return position;
    }
  }

  /**
   * 获取剩余容器数量
   * @returns {number}
   */
  getRestEmptyCount() {
    let photoList = Cache.photoList().getter(),
      count = 0;
    if (null == photoList) return count;
    for (let i = 0; i < photoList.length; i++) {
      let item = photoList[i];
      if (undefined != item.list) { //过滤扉页
        count += (item.size - item.wait);
      }
    }
    return count;
  }

  getImageRadio() {
    let layout = Cache.layout().getter()[0];
    return layout.tw / layout.th;
  }

  /**
   * 根据页数获取剩余的图片数量
   * @param page
   * @returns {number}
   */
  getRestEmptyCountByPage(page) {
    let photoList = Cache.photoList().getter();
    let item = photoList[page];
    return item.size - item.wait;
  }

  /**
   * 手指触碰
   * @param e
   * @returns {{x: number, y: number, ix: (*|number), iy: (Number|number)}}
   */
  touchStart(e) {
    if (e.targetTouches.length === 1) {
      let $edit = $('.edit')[0];
      let touch = e.targetTouches[0],
        image = e.target;
      return {
        x: touch.pageX - $edit.offsetLeft,
        y: touch.pageY - $edit.offsetTop,
        ix: image.offsetLeft,
        iy: image.offsetTop
      };
    }
  }

  /**
   * 拖拽移动事件
   * @param e
   * @param startPosition
   * @param position
   */
  touchMove(e, startPosition, position) {
    if (e.targetTouches.length == 1) {
      let touch = e.targetTouches[0],
        image = e.target,
        $edit = $('.edit')[0];
      let evx = touch.pageX - $edit.offsetLeft,
        evy = touch.pageY - $edit.offsetLeft;
      let spanX = evx - startPosition.x,
        spanY = evy - startPosition.y;
      let currentLeft = $(image).position().left,
        currentTop = $(image).position().top;
      if (image.style.height == 'auto') {
        if (currentTop >= position.minTop - 10 && currentTop <= position.maxTop + 10) {
          $(image).css({
            top: startPosition.iy + spanY
          })
        }
      } else if (image.style.width == 'auto') {
        if (currentLeft >= position.minLeft - 10 && currentLeft <= position.maxLeft + 10) {
          $(image).css({
            left: startPosition.ix + spanX
          })
        }
      }
    }
  }

  /**
   *
   * @param e
   * @param page
   * @param index
   * @param position
   * @param callback
   */
  touchEnd(e, page, index, position, callback) {
    let image = e.target;
    if (image.style.height == 'auto') {
      if (position.maxTop >= position.minTop) {
        if ($(image).position().top >= position.maxTop) {
          $(image).css({
            top: position.maxTop
          });
        } else if ($(image).position().top <= position.minTop) {
          $(image).css({
            top: position.minTop
          });
        }
      } else {
        callback();
      }

    } else if (image.style.width == 'auto') {
      if (position.maxLeft >= position.minLeft) {
        if ($(image).position().left >= position.maxLeft) {
          $(image).css({
            left: position.maxLeft
          });
        } else if ($(image).position().left <= position.minLeft) {
          $(image).css({
            left: position.minLeft
          });
        }
      } else {
        callback();
      }

    }
    this.cachePhotoAfterMoving($(image), page, index);
    return true;
  }

  /**
   * 即时缓存拖拽数据
   * @param $image
   * @param page
   * @param index
   */
  cachePhotoAfterMoving($image, page, index) {
    let photoList = Cache.photoList().getter();
    let list = photoList[page].list;
    let position = $image.position();
    list[index].location.position.left = position.left;
    list[index].location.position.top = position.top;
    Cache.photoList().setter(photoList);
  }

  /**
   * 跨设备数据共享处理
   */
  dealWidthDifferentDevice(photoList) {
    if (null == photoList) return;
    for (let i = 0, len = photoList.length; i < len; i++) {
      let item = photoList[i];
      if (undefined != item.list) {
        let bw = item.bw,
          deviceWidthRadio = Util.getConstant().EditorWidth / bw;
        item.bw = Util.getConstant().EditorWidth;
        for (let j = 0; j < item.list.length; j++) {
          let listItem = item.list[j];
          for (let key in listItem.location.position) {
            let value = listItem.location.position[key];
            listItem.location.position[key] = Number((value * deviceWidthRadio).toFixed(2));
          }
        }
      }
    }
    Cache.photoList().setter(photoList)
  }
}
