
import Blob from "./Blob"
import FileReader from "./FileReader"
import FormData from "./FormData"
import Response from "./Response"

//import {Blob,FileReader,FormData,Response} from "dhtml-weixin"
import XMLHttpRequest from "./XMLHttpRequest"
const self = {
	Blob,
	FileReader,
	FormData,
	ArrayBuffer
}
var support = {
	searchParams: 'URLSearchParams' in self, //queryString处理函数
	iterable: 'Symbol' in self && 'iterator' in Symbol,
	blob: 'FileReader' in self &&
		'Blob' in self &&
		(function () {
			try {
				new Blob()
				return true
			} catch (e) {
				return false
			}
		})(),
	formData: 'FormData' in self,
	arrayBuffer: 'ArrayBuffer' in self, //二进制存储
}

// 支持的 ArrayBuffer类型

if (support.arrayBuffer) {
	var viewClasses = [
		'[object Int8Array]',
		'[object Uint8Array]',
		'[object Uint8ClampedArray]',
		'[object Int16Array]',
		'[object Uint16Array]',
		'[object Int32Array]',
		'[object Uint32Array]',
		'[object Float32Array]',
		'[object Float64Array]'
	]
	// 检查是不是DataView，DataView是来读写ArrayBuffer的。
	var isArrayBufferView =
		ArrayBuffer.isView ||
		function (obj) {
			return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
		}
}
// 检查header name，并转为小写。
function normalizeName(name) {
	// 不是字符串，转为字符串
	if (typeof name !== 'string') {
		name = String(name)
	}
	// 不是以a-z 0-9 等开头的抛出错误。
	if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name) || name === '') {
		throw new TypeError('Invalid character in header field name')
	}
	// 转为小写。
	return name.toLowerCase()
}
// 转换header的值。
function normalizeValue(value) {
	if (typeof value !== 'string') {
		value = String(value)
	}
	return value
}

// Build a destructive iterator for the value list
// 枚举器
function iteratorFor(items) {
	var iterator = {
		next: function () {
			var value = items.shift()
			return {
				done: value === undefined,
				value: value
			}
		}
	}

	if (support.iterable) {
		iterator[Symbol.iterator] = function () {
			return iterator
		}
	}

	return iterator
}
// 封装的Headers。
export function Headers(headers) {
	// headers最终存储的地方。
	this.map = {}

	if (headers instanceof Headers) {
		// 如果已经是Headers的实例，复制键值。
		headers.forEach(function (value, name) {
			this.append(name, value)
		}, this)
	} else if (Array.isArray(headers)) {
		headers.forEach(function (header) {
			this.append(header[0], header[1])
		}, this) // this修改forEach执行函数上下文为当前上下文，就可以直接调用append方法了。
	} else if (headers) {
		Object.getOwnPropertyNames(headers).forEach(function (name) {
			this.append(name, headers[name])
		}, this)
	}
}
// 添加或追加Header。
Headers.prototype.append = function (name, value) {
	name = normalizeName(name)
	value = normalizeValue(value)
	var oldValue = this.map[name]
	this.map[name] = oldValue ? oldValue + ', ' + value : value
}
// 删除名为name的Header。
Headers.prototype['delete'] = function (name) {
	delete this.map[normalizeName(name)]
}
// 获得名为Name的Header。
Headers.prototype.get = function (name) {
	name = normalizeName(name)
	return this.has(name) ? this.map[name] : null
}
// 查询有名为name的Header。
Headers.prototype.has = function (name) {
	return this.map.hasOwnProperty(normalizeName(name))
}
// 设置或者覆盖名为name，值为value的Header。
Headers.prototype.set = function (name, value) {
	this.map[normalizeName(name)] = normalizeValue(value)
}
// 遍历Headers.
Headers.prototype.forEach = function (callback, thisArg) {
	for (var name in this.map) {
		if (this.map.hasOwnProperty(name)) {
			callback.call(thisArg, this.map[name], name, this)
		}
	}
}

Headers.prototype.keys = function () {
	var items = []
	this.forEach(function (value, name) {
		items.push(name)
	})
	return iteratorFor(items)
}

Headers.prototype.values = function () {
	var items = []
	this.forEach(function (value) {
		items.push(value)
	})
	return iteratorFor(items)
}

Headers.prototype.entries = function () {
	var items = []
	this.forEach(function (value, name) {
		items.push([name, value])
	})
	return iteratorFor(items)
}

if (support.iterable) {
	Headers.prototype[Symbol.iterator] = Headers.prototype.entries
}

// HTTP methods whose capitalization should be normalized
var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

function normalizeMethod(method) {
	var upcased = method.toUpperCase()
	return methods.indexOf(upcased) > -1 ? upcased : method
}

export function Request(input, options) {
	options = options || {}
	var body = options.body

	if (typeof input !="string") {
		if (input.bodyUsed) {
			throw new TypeError('Already read')
		}
		this.url = input.url
		this.credentials = input.credentials
		if (!options.headers) {
			this.headers = new Headers(input.headers)
		}
		this.method = input.method
		this.mode = input.mode
		this.signal = input.signal
		if (!body && input._bodyInit != null) {
			body = input._bodyInit
			input.bodyUsed = true
		}
	} else {
		this.url = String(input)
	}

	this.credentials = options.credentials || this.credentials || 'same-origin'
	if (options.headers || !this.headers) {
		this.headers = new Headers(options.headers)
	}
	this.method = normalizeMethod(options.method || this.method || 'GET')
	this.mode = options.mode || this.mode || null
	this.signal = options.signal || this.signal
	this.referrer = null

	if ((this.method === 'GET' || this.method === 'HEAD') && body) {
		throw new TypeError('Body not allowed for GET or HEAD requests')
	}
	this._initBody(body)
}
Request.prototype.clone = function () {
	return new Request(this, {
		body: this._bodyInit
	})
}

function decode(body) {
	var form = new FormData()
	body
		.trim()
		.split('&')
		.forEach(function (bytes) {
			if (bytes) {
				var split = bytes.split('=')
				var name = split.shift().replace(/\+/g, ' ')
				var value = split.join('=').replace(/\+/g, ' ')
				form.append(decodeURIComponent(name), decodeURIComponent(value))
			}
		})
	return form
}

function Body() {
	this.bodyUsed = false

	this._initBody = function (body) {
		this._bodyInit = body
		if (!body) {
			this._bodyText = ''
		} else if (typeof body === 'string') {
			this._bodyText = body
		} else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
			this._bodyBlob = body
		} else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
			this._bodyFormData = body
		} else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
			this._bodyText = body.toString()
		} else if (support.arrayBuffer && support.blob && isDataView(body)) {
			this._bodyArrayBuffer = bufferClone(body.buffer)
			// IE 10-11 can't handle a DataView body.
			this._bodyInit = new Blob([this._bodyArrayBuffer])
		} else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
			this._bodyArrayBuffer = bufferClone(body)
		} else {
			this._bodyText = body = Object.prototype.toString.call(body)
		}

		if (!this.headers.get('content-type')) {
			if (typeof body === 'string') {
				this.headers.set('content-type', 'text/plain;charset=UTF-8')
			} else if (this._bodyBlob && this._bodyBlob.type) {
				this.headers.set('content-type', this._bodyBlob.type)
			} else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
				this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
			}
		}
	}

	if (support.blob) {
		this.blob = function () {
			var rejected = consumed(this)
			if (rejected) {
				return rejected
			}

			if (this._bodyBlob) {
				return Promise.resolve(this._bodyBlob)
			} else if (this._bodyArrayBuffer) {
				return Promise.resolve(new Blob([this._bodyArrayBuffer]))
			} else if (this._bodyFormData) {
				throw new Error('could not read FormData body as blob')
			} else {
				return Promise.resolve(new Blob([this._bodyText]))
			}
		}

		this.arrayBuffer = function () {
			if (this._bodyArrayBuffer) {
				return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
			} else {
				return this.blob().then(readBlobAsArrayBuffer)
			}
		}
	}

	this.text = function () {
		var rejected = consumed(this)
		if (rejected) {
			return rejected
		}

		if (this._bodyBlob) {
			return readBlobAsText(this._bodyBlob)
		} else if (this._bodyArrayBuffer) {
			return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
		} else if (this._bodyFormData) {
			throw new Error('could not read FormData body as text')
		} else {
			return Promise.resolve(this._bodyText)
		}
	}

	if (support.formData) {
		this.formData = function () {
			return this.text().then(decode)
		}
	}

	this.json = function () {
		return this.text().then(JSON.parse)
	}

	return this
}

function parseHeaders(rawHeaders) {
	var headers = new Headers()
	// Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
	// https://tools.ietf.org/html/rfc7230#section-3.2
	var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
	preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
		var parts = line.split(':')
		var key = parts.shift().trim()
		if (key) {
			var value = parts.join(':').trim()
			headers.append(key, value)
		}
	})
	return headers
}

Body.call(Request.prototype)


export var DOMException = self.DOMException
try {
	new DOMException()
} catch (err) {
	DOMException = function (message, name) {
		this.message = message
		this.name = name
		var error = Error(message)
		this.stack = error.stack
	}
	DOMException.prototype = Object.create(Error.prototype)
	DOMException.prototype.constructor = DOMException
}

export function fetch(input, init) {
	return new Promise(function (resolve, reject) {
		var request = new Request(input, init)

		if (request.signal && request.signal.aborted) {
			return reject(new DOMException('Aborted', 'AbortError'))
		}

		var xhr = new XMLHttpRequest()

		function abortXhr() {
			xhr.abort()
		}
		class ResponseBodyReader {
			constructor(responseBody) {
				this.responseBody = responseBody
			}
			read() {
				return new Promise(resolve => {

					this.responseBody.xhr.onprogress = (e) => {
						// console.error("onprogress", e)
						const done = e._loaded == e._total
						const value = new ArrayBuffer(e._loaded)
						resolve({
							done,
							value
						})
					}
				})
			}
		}
		class ResponseBody {
			constructor(xhr) {
				this.xhr = xhr
				this.reader = new ResponseBodyReader(this)
			}
			getReader() {
				return this.reader
			}
		}
		var response
		xhr.onloadstart = function () {
			var options = {
				status: xhr.status,
				statusText: xhr.statusText,
				headers: parseHeaders(xhr.getAllResponseHeaders() || '')
			}
			options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')

			response = new Response(new ResponseBody(xhr), options, request)
			resolve(response)
		}
		xhr.onerror = function (e) {
			reject(new TypeError('Network request failed'))
		}

		xhr.ontimeout = function () {
			reject(new TypeError('Network request failed'))
		}

		xhr.onabort = function () {
			reject(new DOMException('Aborted', 'AbortError'))
		}
		xhr.open(request.method, request.url, true)

		if (request.credentials === 'include') {
			xhr.withCredentials = true
		} else if (request.credentials === 'omit') {
			xhr.withCredentials = false
		}

		if (!xhr.responseType  && support.blob) {
      //console.error("??????????????????")
			xhr.responseType = 'blob'
		}

		request.headers.forEach(function (value, name) {
			xhr.setRequestHeader(name, value)
		})

		if (request.signal) {
			request.signal.addEventListener('abort', abortXhr)

			xhr.onreadystatechange = function () {
				// DONE (success or failure)
				if (xhr.readyState === 4) {
					request.signal.removeEventListener('abort', abortXhr)
				}
			}
		}

		xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	})
}

fetch.polyfill = true

// self 可理解为 window 对象
self.fetch = fetch
self.Headers = Headers
self.Request = Request
self.Response = Response

export default fetch
