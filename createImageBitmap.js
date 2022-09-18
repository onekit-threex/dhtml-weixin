/* eslint-disable no-unused-vars */
import HTMLImageElement from "./HTMLImageElement"
import Page from "./core/Page"
import Base64 from "./core/Base64"
import Blob from "./Blob"

export default function createImageBitmap(src, options) {
  return new Promise((resolve) => {
    const canvas = Page.current.canvas
    const img = new HTMLImageElement(canvas)
    img.onload = function() {
      resolve(img)
    }
    if(src instanceof Blob){
        src = "data:image/png;base64,"+Base64.arrayBufferToBase64(src.array[0])
    }
    img.src = src
  })
}
