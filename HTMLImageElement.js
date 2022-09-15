/* eslint-disable prefer-spread */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
import EventTarget from "./EventTarget";
import Base64 from "./core/Base64";

export default class HTMLImageElement extends EventTarget {
  constructor(canvas2d) {
    super();
    const canvas = canvas2d || getApp().canvas;
    this.wx_element = canvas.createImage();
    this.wx_element.onload = () => {
      if (this.onload) {
        this.onload.call(this);
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach((handler) => {
          handler.call(this);
        });
      }
    };
    this.wx_element.onerror = (e) => {
      if (this.onerror) {
        this.onerror.call(this, e);
      }
      if (this._all_event_handlers.error) {
        this._all_event_handlers.error.forEach((handler) => {
          handler.call(this, e);
        });
      }
    };
    this.onekit_image = this;
  }
  get width() {
    return this.wx_element.width;
  }
  get height() {
    return this.wx_element.height;
  }
  get data() {
    return this.wx_element.data;
  }
  get complete() {
    return this.wx_element.complete;
  }
  set crossOrigin(crossOrigin) {
    this._crossOrigin = crossOrigin;
  }

  get crossOrigin() {
    return this._crossOrigin;
  }

  set src(src) {
    if (getApp().onekit_debug) {
      console[getApp().onekit_debug]("[image]", src);
    }
    this._src = src;

    if (src.startsWith("blob:")) {
      /*
      const blob = getApp().ObjectURL[src];
      const type =
        blob.options && blob.options.type ? blob.options.type : "image/png";
      const array = getApp().ObjectURL[src].array[0];
      this.wx_element.src =
        `data:${type};base64,` + Base64.arrayBufferToBase64(array);*/
      try {
        const filePath = wx.getStorageSync(src);
        const fs = wx.getFileSystemManager();
        const base64 = fs.readFileSync(filePath, "base64", 0);
        /*  if (fs.accessSync(filePath)) {
        fs.removeSavedFile({
          filePath,
        });
      }*/
        this.wx_element.src = "data:image/png;base64," + base64;
      } catch (ex) {
        console.error(ex);
      }
    } else {
      this.wx_element.src = src;
    }
  }

  get src() {
    return this._src;
  }
}
