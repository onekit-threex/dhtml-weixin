/* eslint-disable no-unused-vars */
export default function createImageBitmap(src, options,canvas) {
  return new Promise((resolve) => {
    const image = (canvas || getApp().canvas).createImage()
    image.onload = function() {
      resolve(image)
    }
    image.src = src
  })
}
