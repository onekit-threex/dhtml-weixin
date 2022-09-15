/* eslint-disable no-unused-vars */
import HTMLImageElement from "./HTMLImageElement"
export default function createImageBitmap(canvas,src, options) {
  return new Promise((resolve) => {
    const img = new HTMLImageElement(canvas)
    img.onload = function() {
      resolve(img)
    }
    img.src = src
  })
}
