import GUID from "./core/GUID";

export default class URL {
  static createObjectURL(blob) {
    const guid = GUID();
    const url = `blob:http://localhost/${guid}`;
    try {
const path = wx.createBufferURL(blob.array[0])
      wx.setStorageSync(url, path);
    } catch (ex) {
      console.error(ex);
    }
    return url;
  }

  static revokeObjectURL(url) {
    try {
      const filePath = wx.getStorageSync(url);
      wx.revokeBufferURL(filePath)
      wx.removeStorageSync(url);
    } catch (ex) {
      console.error(ex);
    }
  }
}
