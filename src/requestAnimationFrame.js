import Page from "./core/Page"
export default function requestAnimationFrame(callback,canvas) {
  if (!canvas && Page.current) {
    canvas = Page.current.canvas
  }
  if (!canvas && Page.current&& Page.current.$vm) {
    canvas =  Page.current.$vm.canvas
  }
  if (!canvas && Page.getApp()) {
    canvas = Page.getApp().canvas
  }
  if (canvas && canvas.mini_element) {
    canvas = canvas.mini_element
  }
  if(!canvas){
    return 0
  }
  const requestId = canvas.requestAnimationFrame(callback)
  return requestId
}
