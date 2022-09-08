export default function cancelAnimationFrame(requestId = getApp().requestId, canvas) {
	try {
		if (!requestId) {
			return
		}
		if (canvas && canvas.wx_element) {
			canvas = canvas.wx_element
		}
		(canvas || getApp().canvas).cancelAnimationFrame(requestId)
		getApp().onekit_requestId = null
	} catch (ex) {
		console.error(ex)
	}
}
