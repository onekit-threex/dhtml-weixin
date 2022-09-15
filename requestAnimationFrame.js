export default function requestAnimationFrame(callback,canvas) {
  if(!canvas){
    return
  }
  if(canvas && canvas.wx_element){
    canvas = canvas.wx_element
  }
  const requestId = canvas.requestAnimationFrame(callback)
  return requestId
}
