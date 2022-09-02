export default function cancelAnimationFrame(requestId,canvas) {
  (canvas || getApp().canvas).cancelAnimationFrame(requestId)
}
