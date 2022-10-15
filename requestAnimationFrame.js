import Page from "./core/Page"
export default function requestAnimationFrame(callback,canvas) {
  if (!canvas && Page.current) {
    canvas = Page.current.canvas
  }
  if (!canvas && Page.getApp()) {
    canvas = Page.getApp().canvas
  }
  if (canvas && canvas.wx_element) {
    canvas = canvas.wx_element
  }
  const requestId = canvas.requestAnimationFrame(callback)
  return requestId
}
