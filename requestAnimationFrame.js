export default function requestAnimationFrame(callback,canvas) {
  if(canvas && canvas.wx_element){
    canvas = canvas.wx_element
  }
  return (canvas || getApp().canvas).requestAnimationFrame(callback)
}
