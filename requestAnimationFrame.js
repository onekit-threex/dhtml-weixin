export default function requestAnimationFrame(callback,canvas) {
  if(canvas && canvas.wx_element){
    canvas = canvas.wx_element
  }
  const requestId = (canvas || getApp().canvas).requestAnimationFrame(callback)
  getApp().onekit_requestId = requestId
  return requestId
}
