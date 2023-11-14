import Event from "./Event"
export default class ProgressEvent extends Event{
  constructor(type, options,lengthComputable=false,loaded=0,total=0){
    super(type, options)
    this._lengthComputable = lengthComputable
    this._loaded = loaded
    this._total = total
  }
  get lengthComputable(){
    return this._lengthComputable
  }
  get loaded(){
    this._loaded
  }
  get total(){
    this._total
  }
}