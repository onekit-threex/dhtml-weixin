import GUID from "./core/GUID";

export default class URL {
  static createObjectURL(blob) {
    const guid = GUID();
    const url = `blob:http://localhost/${guid}`;
    /*
		if(! getApp().ObjectURL){
			getApp().ObjectURL = {}
		}
		getApp().ObjectURL[url] = blob
		*/
    try {
      const path = `${wx.env.USER_DATA_PATH}/${guid}`;
      const fs = wx.getFileSystemManager();
      fs.writeFileSync(path, blob.array[0], "base64");
      wx.setStorageSync(url, path);
    } catch (ex) {
      console.error(ex);
    }
    return url;
  }

  static revokeObjectURL(url) {
    try {
      const filePath = wx.getStorageSync(url);
      const fs = wx.getFileSystemManager();
      if (fs.accessSync(filePath)) {
        fs.removeSavedFile({
          filePath,
        });
      }
      wx.removeStorageSync(url);
    } catch (ex) {
      console.error(ex);
    }
    /*
    getApp().ObjectURL[url] = null;
    delete getApp().ObjectURL[url];*/
  }
}
