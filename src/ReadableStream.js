import ReadableStreamDefaultReader from "./ReadableStreamDefaultReader"
import ReadableStreamDefaultController from "./ReadableStreamDefaultController"
export default class ReadableStream {
	constructor({start}) {
    start(new ReadableStreamDefaultController(this))
	}
	getReader() {
		return new ReadableStreamDefaultReader(this)
  }
  get buffer(){
    return new ArrayBuffer()
  }
}
