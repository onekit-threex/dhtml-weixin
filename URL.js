import GUID from './core/GUID'

export default class URL {
  static createObjectURL(blob) {
    const url = `blob:http://localhost/${GUID()}`
    if (!getApp().ObjectURL) {
      getApp().ObjectURL = {}
    }
    if(getApp().onekit_debug){
      console[getApp().onekit_debug]("[createObjectURL]"+url)
    }
    getApp().ObjectURL[url] = blob
    return url
  }

  static revokeObjectURL(url) {
    delete getApp().ObjectURL[url]
  }
}
