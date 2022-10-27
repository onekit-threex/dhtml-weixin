export default class Event {
    
    static fix(wx_e){
        //console.error(wx_e)
        const web_e = new Event(wx_e.type)
        ///////////////////////////////////
        web_e.isTrusted = true
        web_e.altKey =false
        web_e.altitudeAngle =1.5707963267948966
        web_e.azimuthAngle =0
        web_e.bubbles =true
        web_e.button = ["touchstart","touchend"].includes(wx_e.type)? 0:-1
        web_e.buttons =["touchstart","touchend"].includes(wx_e.type)? 0:1
        web_e.cancelBubble =false
        web_e.cancelable =true
        web_e.composed =true
        web_e.ctrlKey =false
        web_e.currentTarget =null
        web_e.defaultPrevented =false
        web_e.detail =0
        web_e.eventPhase =0
        web_e.fromElement =null
        web_e.height =30.66666603088379
        web_e.isPrimary =true
        web_e.metaKey =false
        web_e.movementX =0
        web_e.movementY =1
    //    web_e.path = []canvas, body, html, document, Window]
        web_e.pointerType ="touch"
        web_e.pressure =1
        web_e.relatedTarget =null
        web_e.returnValue =true
        web_e.shiftKey =false
        web_e.sourceCapabilities =null
       // web_e.srcElement =canvas
        web_e.tangentialPressure =0
       // web_e.target =canvas
        web_e.tiltX =0
        web_e.tiltY =0
        web_e.timeStamp =39505
        web_e.toElement =null
        web_e.twist =0
        //web_e.view = ?
        web_e.which =0
        web_e.width =30.66666603088379
        ///////////////////////////////////
        web_e.code = "";
        //
        if(wx_e.changedTouches.length>0){
            const touch = wx_e.changedTouches[0]
            web_e.pointerId = touch.identifier || 2;
            web_e.pageX = touch.x;
            web_e.pageY = touch.y;
            web_e.clientX = touch.x-wx_e.currentTarget.offsetLeft;
            web_e.clientY = touch.y-wx_e.currentTarget.offsetTop;
            //
            web_e.layerX = web_e.clientX;
            web_e.layerY = web_e.clientY;
            web_e.x = web_e.clientX;
            web_e.y = web_e.clientY;
            web_e.offsetX = web_e.clientX;
            web_e.offsetY = web_e.clientY;
            web_e.deltaX = web_e.offsetX;
            web_e.deltaY = web_e.offsetY;
        }
        return web_e
    }
    
    //////////////////////////////////////////////////////////////

    constructor(type, options) {
        this.type = type
        this.options = options
    }
    preventDefault() {

    }
}
