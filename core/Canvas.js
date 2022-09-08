import HTMLImageElement from "../HTMLImageElement"
import Base64 from "./Base64"
import Blob from "../Blob"
export default class Canvas{
    
    static canvas2image(canvas3d, canvas2d=getApp().canvas2d) {
        if(canvas3d.wx_element){
            canvas3d = canvas3d.wx_element
        }
        return new Promise((callback) => {
            var image = canvas2d.createImage()
            image.onload = function () {
                callback(image)
            }
            image.src = canvas3d.toDataURL()
        })
    }
    static canvas2img(canvas3d, canvas2d=getApp().canvas2d) {
        if(canvas3d.wx_element){
            canvas3d = canvas3d.wx_element
        }
        return new Promise((callback) => {
            var img = new HTMLImageElement(canvas2d)
            img.onload = function () {
                callback(img)
            }
            img.src = canvas3d.toDataURL()
        })
    }
    static toBlob(canvas, callback, type, quality) {
        const base64 = canvas.toDataURL(type,quality)
        const prev = `data:${type};base64,`
        const buffer = Base64.base64ToArrayBuffer(base64.substring(prev.length))
        const blob = new Blob([buffer])
        callback(blob)
	}
}