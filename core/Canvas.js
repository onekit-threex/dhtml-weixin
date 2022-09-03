export default class Canvas{
    
    static canvas2image(canvas3d, canvas2d) {
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
}