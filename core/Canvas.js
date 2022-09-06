import HTMLImageElement from "../HTMLImageElement"
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
}