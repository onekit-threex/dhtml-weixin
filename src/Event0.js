export default class Event0 {

	static fix( mini_e ) {

		mini_e.preventDefault = () => {};

		mini_e.stopPropagation = () => {};

		///////////////////////
		mini_e.isTrusted = true;
		mini_e.altKey = false;
		mini_e.altitudeAngle = 1.5707963267948966;
		mini_e.azimuthAngle = 0;
		mini_e.bubbles = true;
		mini_e.button = [ 'touchstart', 'touchend' ].includes( mini_e.type ) ? 0 : - 1;
		mini_e.buttons = [ 'touchstart', 'touchend' ].includes( mini_e.type ) ? 0 : 1;
		mini_e.cancelBubble = false;
		mini_e.cancelable = true;
		mini_e.composed = true;
		mini_e.ctrlKey = false;
		mini_e.currentTarget = null;
		mini_e.defaultPrevented = false;
		mini_e.detail = 0;
		mini_e.eventPhase = 0;
		mini_e.fromElement = null;
		mini_e.width = 5; //30.66666603088379
		mini_e.height = 5; //30.66666603088379
		mini_e.isPrimary = true;
		mini_e.metaKey = false;
		mini_e.movementX = 0;
		mini_e.movementY = 1;
		//    mini_e.path = []canvas, body, html, document, Window]
		mini_e.pointerType = 'touch';
		mini_e.pressure = 1;
		mini_e.relatedTarget = null;
		mini_e.returnValue = true;
		mini_e.shiftKey = false;
		mini_e.sourceCapabilities = null;
		// mini_e.srcElement =canvas
		mini_e.tangentialPressure = 0;
		// mini_e.target =canvas
		mini_e.tiltX = 0;
		mini_e.tiltY = 0;
		mini_e.timeStamp = 39505;
		mini_e.toElement = null;
		mini_e.twist = 0;
		//mini_e.view = ?
		mini_e.which = 0;
		mini_e.code = '';
		if ( ! mini_e.touches || mini_e.touches.length <= 0 ) {

			return mini_e;

		}

		const touch = mini_e.touches[ 0 ];
		const pixelRatio = 1;
		mini_e.pointerId = touch.identifier != null ? touch.identifier : 2;
		mini_e.identifier = touch.identifier;
		mini_e.pageX = touch.pageX * pixelRatio;
		mini_e.pageY = touch.pageY * pixelRatio;
		mini_e.clientX = touch.clientX * pixelRatio;
		mini_e.clientY = touch.clientY * pixelRatio;
		mini_e.x = touch.x * pixelRatio;
		mini_e.y = touch.y * pixelRatio;
		mini_e.deltaX = touch.deltaX * pixelRatio;
		mini_e.deltaY = touch.deltaY * pixelRatio;
		//
		mini_e.layerX = mini_e.clientX;
		mini_e.layerY = mini_e.clientY;
		mini_e.deltaX = mini_e.offsetX;
		mini_e.deltaY = mini_e.offsetY;

		///////////////////////
		return mini_e;

	}

}
