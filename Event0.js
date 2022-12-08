var systemInfo = wx.getSystemInfoSync()
var platform = systemInfo.platform
var pixelRatio = systemInfo.pixelRatio
export default class Event {
	static fix(mini_e) {
		mini_e.preventDefault = () => {}
		mini_e.stopPropagation = () => {}
		return mini_e

	}
}
