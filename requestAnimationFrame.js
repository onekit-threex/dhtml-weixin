export default function requestAnimationFrame(canvas,callback) {
  if(!canvas){
    return
  }
  if(canvas && canvas.wx_element){
    canvas = canvas.wx_element
  }
  const requestId = canvas.requestAnimationFrame(callback)
  return requestId
}
