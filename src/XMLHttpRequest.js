/* eslint-disable camelcase */
//import {EventTarget,core,Blob,ProgressEvent} from "dhtml-weixin"

import EventTarget from "./EventTarget"
import core from "./core/index"
import Blob from "./Blob"
import ProgressEvent from "./ProgressEvent"
const {
	Page,
	Base64 
} = core

function readArrayBuffer(size,filePath, resolve) {
	const fs = wx.getFileSystemManager()
			const data = new ArrayBuffer(size)
			fs.open({
				filePath,
				success(res) {
					fs.read({
						fd: res.fd,
						arrayBuffer: data,
						length: size,
						success() {
							fs.close()
							resolve(data)
						}
					})
				},
				fail: console.error
			})
}

function run(cb, mini_object) {
	return new Promise((resolve, reject) => {
		mini_object.success = resolve;
		mini_object.fail = (e) => {
			console.error("[XMLHttpRequest]", e)
			reject(e)
		};
		cb(Page.wx_request(mini_object));
	});
}
export default class XMLHttpRequest extends EventTarget {
	constructor() {
		super();
    //this._responseType = "text";
    this._responseHeaders = {}
	}

	open(method, url, async = true, user, password) {
		this._method = method;
		this._url = url;
		this._async = async;
		this._user = user;
		this._password = password;
	}

	async send(body) {
		const callback = (res) => {
			this._responseHeaders = res.header
			this._response = res.data;
			//console.error(res.data)
			if (this._responseType === "text") {
				this._responseText = this._response;
			} else if (this._responseType == "blob") {
				this._response = new Blob([this._response])
      }
			if (this.onload) {
				this.onload.apply(this);
			}
			if (this._all_event_handlers.load) {
				this._all_event_handlers.load.forEach((handler) => {
					handler.apply(this);
				});
			}
		};
		var url = this._url
		if (url.startsWith('mini:')) {
      this._status = 200
      const loadStartEvent = {}
      this.dispatchEvent(loadStartEvent)
      if (this.onloadstart) {
        this.onloadstart(loadStartEvent)
      }
			try {
				var data
				if (this._responseType == 'text') {
					const MINI = 'mini:'
					const text = url.substring(MINI.length)
					data = text;
				} else {
					const BASE64 = 'base64,'
					const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
					data = Base64.base64ToArrayBuffer(base64)
				}
				callback.call(this, {
					data
				});
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith('data:')) {
      this._status = 200
      const loadStartEvent = {}
      this.dispatchEvent(loadStartEvent)
      if (this.onloadstart) {
        this.onloadstart(loadStartEvent)
      }
			try {
				const BASE64 = 'base64,'
        url = url.substring(url.indexOf(BASE64) + BASE64.length)

        const data = Base64.base64ToArrayBuffer(url)

        callback.call(this, {
          header:{},
          data
        });
			} catch (ex) {
				console.error(ex);
			}
			return
    }

		if (url.startsWith('blob:')) {
      this._status = 200
      const loadStartEvent = {}
      this.dispatchEvent(loadStartEvent)
      if (this.onloadstart) {
        this.onloadstart(loadStartEvent)
      }
			try {
				var global = Page.current
				if (!global) {
					global = Page.getApp()
				}
        const data = global.DataURL[url].array[0]
   
				callback.call(this, {
					data
				});
			} catch (ex) {
				console.error(ex);
			}
			return
		}
		if (url.startsWith("./")) {
			url = url.substring(2)
		}
		if (!url.startsWith("blob:") &&
			!url.startsWith("data:") &&
			!url.startsWith("mini:") &&
			!url.startsWith("http://") &&
			!url.startsWith("https://")) {
			url = (Page.getApp().onekit_path || "") + url
		}
		this.responseURL = url
		const mini_object = {
			url,
			method: this._method
		};
		if (this._async) {
			mini_object.success = (res) => {
				//console.error("wx.downloadFile.succes",res)
				const {
					tempFilePath
				} = res
				readArrayBuffer(  this._responseHeaders["Content-Length"],tempFilePath, (data) => {

					callback.call(this, {
						header: res.header,
						data
					});
				})
			};
			mini_object.fail = console.error
			this._task = Page.wx_downloadFile(mini_object);
			this._task.onHeadersReceived(({
				header
			}) => {
				//console.error("wx.downloadFile.onHeadersReceived", header)
			//	console.error(header)
        this._responseHeaders = header
        this._status = 200
        //
        const loadStartEvent = {}
				this.dispatchEvent(loadStartEvent)
				if (this.onloadstart) {
					this.onloadstart(loadStartEvent)
				}
			})
			this._task.onProgressUpdate((res) => {
				// console.error("wx.downloadFile.onProgressUpdate",res)
				const length = res.totalBytesWritten
				const progressEvent = new ProgressEvent("progress", this, true, length, res.totalBytesExpectedToWrite)
				this.dispatchEvent(progressEvent)
				if (this.onprogress) {
					this.onprogress(progressEvent)
				}
			});
		} else {
			try {
				const res = await run((task) => {
					this._task = task;
				}, mini_object);
				callback.call(this, res);
			} catch (ex) {
				console.error(ex);
			}
		}
	}
	getAllResponseHeaders() {
		var result = "";
		Object.keys(this._responseHeaders).forEach(key => {
			result += `${key}: ${this._responseHeaders[key]}\r\n`
		})
		return result
	}
	set responseType(responseType) {
		this._responseType = responseType;
	}

	get responseType() {
		return this._responseType;
	}

	get status() {
		return this._status;
	}

	get response() {
		return this._response;
	}

	get responseText() {
		return this._responseText;
	}

	set onload(onload) {
		this._onload = onload;
	}

	get onload() {
		return this._onload;
	}

	set onloadstart(onloadstart) {
		this._onloadstart = onloadstart;
	}
	get onloadstart() {
		return this._onloadstart
	}

  set onprogress(onprogress) {
		this._onprogress = onprogress;
	}
	get onprogress() {
		return this._onprogress
  }
  
	set onerror(onerror) {
		this._onerror = onerror;
	}

	get onerror() {
		return this._onerror;
	}
}
