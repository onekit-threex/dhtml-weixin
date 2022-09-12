import GUID from "./core/GUID";

export default class URL {
	static createObjectURL(blob) {
		const guid = GUID();
		const url = `blob:http://localhost/${guid}`;
		if(! getApp().ObjectURL){
			getApp().ObjectURL = {}
		}
		getApp().ObjectURL[url] = blob
		/*
		const path = `${wx.env.USER_DATA_PATH}/${guid}.png`;
		const fs = wx.getFileSystemManager()
		fs.writeFileSync(path, blob.array[0],'base64')
		wx.setStorageSync(url, path);
*/
		return url;
	}

	static revokeObjectURL(url) {
        //console.error("[revokeObjectURL]",url)
		/*
		const filePath = wx.getStorageSync(url);
		const fs = wx.getFileSystemManager()
		if(fs.accessSync(filePath)){
		fs.removeSavedFile({
			filePath
		})
	}
        wx.removeStorageSync(url);*/
        getApp().ObjectURL[url] = null
		delete getApp().ObjectURL[url]

	}
}
