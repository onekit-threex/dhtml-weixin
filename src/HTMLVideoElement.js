import HTMLElement from "./HTMLElement"
  export default class HTMLVideoElement extends HTMLElement {
    constructor(mini_element) {
      super(mini_element)
      this.mini_element = mini_element
    }
     play() {
      return this.mini_element.play()
    }
    requestVideoFrameCallback(callback){
      return this.mini_element.requestVideoFrameCallback(callback)
    }
    get frameData(){
      return this.mini_element.frameData
    }
    stop() {
      return this.mini_element.stop()
    }
  }