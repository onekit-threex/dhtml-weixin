export default function cancelAnimationFrame(requestId,canvas) {
  if(canvas && canvas.wx_element){
    canvas = canvas.wx_element
  }
  (canvas || (getApp().canvas)).cancelAnimationFrame(requestId)
}
