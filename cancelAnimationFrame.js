export default function cancelAnimationFrame(requestId,canvas) {
	try {
		if(!canvas){
			return
		  }
		if (!requestId) {
			return
		}
		if (canvas && canvas.wx_element) {
			canvas = canvas.wx_element
		}
		canvas.cancelAnimationFrame(requestId)
	} catch (ex) {
		console.error(ex)
	}
}
