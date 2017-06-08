import insertSrc from 'assets/images/icon/icon-inert.png'
import Util from 'jsPath/tool/Util'
export default new class MCanvas {
  constructor() {
    this.currentDeviceDpr = document.documentElement.getAttribute('data-dpr');
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
    const layout = App.config.layoutList[pageIndex],
      area = layout.area[imageIndex],
      scale = layout.scale;
    //长宽比
    const wl_radio = layout.tw / layout.th;
    //容器长宽比
    const ar_radio = area.aw / area.ah;
    //缩放比
    const zoom_radio = layout.tw * scale / editorWidth;
    const widthContrastRadio = editorWidth / Util.getConstant().EditorWidth;
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
      let photoObject = App.config.photoList[pageIndex];
      if (null == photoObject.dpr || undefined == photoObject.dpr) {
        photoObject.dpr = 1;
      }
      let dprRadio = this.currentDeviceDpr / photoObject.dpr;
      let currentPhoto = App.config.photoList[pageIndex].list;
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

          style.backgroundPosition = (photo.location.position.left) * widthContrastRadio * dprRadio.toFixed(2) + 'px ' + (photo.location.position.top) * widthContrastRadio * dprRadio.toFixed(2) + 'px';
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
    let _m = App.config.layoutList[index];
    // if(index ==0 || index == App.config.layoutList.length-1) return FeiYe;
    if (undefined == _m) return '';
    return _m.pngImg + Util.getConstant().THUMB600;
  }

  /**
   * 获取图片缩放比
   * @returns {number}
   */
  getImageRadio() {
    if (null == App.config.layoutList) return 1;
    let layout = App.config.layoutList[0];
    return layout.tw / layout.th;
  }
}
