/* eslint-disable prefer-spread */
/* eslint-disable no-console */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
import EventTarget from './EventTarget'
import Base64  from "./core/Base64"

export default class Image extends EventTarget {
  constructor() {
    super()
    const canvas = getApp().canvas
    this.wx_image = canvas.createImage()
    this.wx_image.onload = () => {
      if (this.onload) {
        this.onload.call(this.wx_image, this.wx_image)
      }
      if (this._all_event_handlers.load) {
        this._all_event_handlers.load.forEach(handler => {
          handler.call(this.wx_image, this.wx_image)
        })
      }
    }
    this.wx_image.onerror = (e) => {
      if (this.onerror) {
        this.onerror.call(this.wx_image, e)
      }
      if (this._all_event_handlers.error) {
        this._all_event_handlers.error.forEach(handler => {
          handler.call(this.wx_image, e)
        })
      }
    }
    this.onekit_image = this
  }

  set crossOrigin(crossOrigin) {
    this._crossOrigin = crossOrigin
  }

  get crossOrigin() {
    return this._crossOrigin
  }

  set src(src) {
    if(getApp().onekit_debug){
      console[getApp().onekit_debug]('[Image]', src)
    }
    this._src = src

     if (src.startsWith('blob:')) {
      const array = getApp().ObjectURL[src].array[0]
      this.wx_image.src = 'data:image/png;base64,' + Base64.arrayBuffer2Base64(array)
     /* const filePath = wx.getStorageSync(src);
      const fs = wx.getFileSystemManager()
      const base64 = fs.readFileSync(filePath, 'base64', 0)
      console.error(filePath)
      this.wx_image.src = 'data:image/png;base64,' +base64*/
    } else {
      this.wx_image.src = src
    }
  }

  get src() {
    return this._src
  }
}
