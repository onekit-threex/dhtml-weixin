/* eslint-disable handle-callback-err */
/* eslint-disable no-console */

import Base64 from './core/Base64'
import Page from './core/Page'
import Blob from "./Blob"
import TextDecoder from "./TextDecoder"

// 读取blob为文本。
function readBlobAsText(blob) {
  return readArrayBufferAsText(blob.array[0])
}
 
function readArrayBufferAsText(buffer) {
  return new TextDecoder().decode(buffer)
}


export default class Response {
	constructor(body, options = {}, request) {
		this.body = body
		this.request = request
		this.status = options.status
		this.statusText = options.statusText
		this._headers = options.headers
	}
	get headers() {
		return this._headers
	}

	_run(responseType, dataType = 'text') {
		const onekit_debug = Page.getApp().onekit_debug
		if (onekit_debug) {
			console[onekit_debug]('[fetch]', this.request.url, responseType, dataType)
		}
		var url = this.request.url
		if (url.endsWith('.js')) {
			return new Promise((resolve) => {
				resolve(url)
			})
		}
		if (url.startsWith('mini:')) {
			return new Promise((resolve, reject) => {
				try {
					if (dataType == 'text') {
						const MINI = 'mini:'
						const text = url.substring(MINI.length)
						resolve(text);
					} else {
						const BASE64 = 'base64,'
						const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
						resolve(Base64.base64ToArrayBuffer(base64))
					}
				} catch (ex) {
					console.error(ex)
					reject(ex)
				}
			})
		}
		if (url.startsWith('data:')) {
			return new Promise((resolve, reject) => {
				try {
					const BASE64 = 'base64,'
					const base64 = url.substring(url.indexOf(BASE64) + BASE64.length)
					resolve(Base64.base64ToArrayBuffer(base64))
				} catch (ex) {
					console.error(ex)
					reject(ex)
				}
			})
		}
		if (url.startsWith('blob:')) {
			return new Promise((resolve, reject) => {
				try {
					var global = Page.current
					if (!global) {
						global = Page.getApp()
					}
					const arrayBuffer = global.DataURL[url].array[0]
					resolve(arrayBuffer)
				} catch (ex) {
					console.error(ex);
					reject(ex)
				}
			})
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

		// /////////////////////////
		return new Promise((resolve, reject) => {
			this.body.xhr.onload = async (e) => {
				//console.error(this.body.xhr.response)
				var data = this.body.xhr.response
				switch (responseType) {
					case "blob":
						break
					case "arraybuffer":
						data = data.array[0]
            break
            case "text":
              data = await readBlobAsText(data)
              break
					default:
						throw new Error("?????????????????", responseType)
				}
				resolve(data)
			}
		})
	}

	arrayBuffer() {
		return this._run('arraybuffer', 'arraybuffer')
	}

	blob() {
		return new Promise((callback, reject) => {

			this._run('arraybuffer', 'blob').then(data => {
				callback(new Blob([data]));
			}).catch((e) => {
				console.error(e)
				reject(e.message)
			})

		})
	}

	text() {
		return this._run('text')
	}

	json() {
		return this._run('text', 'json')
	}
}
