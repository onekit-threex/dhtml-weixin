export default function requestAnimationFrame(callback,canvas) {
  return (canvas || getApp().canvas).requestAnimationFrame(callback)
}
