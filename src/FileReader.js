import core from "./core/index"
const {Base64} = core
export default class FileReader{
  readAsArrayBuffer(blob){
    this.result = blob.arrayBuffer()
    this.onload(this)
  }
  readAsText(blob){
    this.result = Base64.arrayBufferToBase64(blob.arrayBuffer())
    this.onload(this)
  }
}