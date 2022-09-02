/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import ArrayX from './core/ArrayX'
import Event from "./Event"
export default class EventTarget {
  constructor() {
    this._all_event_handlers = {}
  }

  addEventListener(type, handler) {
    if (!this._all_event_handlers[type]) {
      this._all_event_handlers[type] = []
    }
    this._all_event_handlers[type].push(handler)
  }

  removeEventListener(type, handler) {
    this._all_event_handlers[type] = ArrayX.remove(this._all_event_handlers[type], handler)
  }

  dispatchEvent(wx_e) {
    switch (wx_e.type) {
      case "touchstart":
        wx_e.type = 'pointerdown'
        break
      case "touchmove":
        wx_e.type = 'pointermove'
        break
      case "touchend":
        wx_e.type = 'pointerup'
        break
      case "touchcancel":
        wx_e.type = 'pointercancel'
        break
      default:
        break
    }
    const web_e = new Event(wx_e.type);
    web_e.fix(wx_e);
    //setTimeout(() => {
      const type = web_e.type
      const event_handlers = this._all_event_handlers[type] || []
      for (var event_handler of event_handlers) {
        event_handler.call(this, web_e)
      }
    //}, 1);
 
  }
}
