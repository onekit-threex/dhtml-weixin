export default class String {
  static fromHump(s) {
    return s.replace(/([A-Z])/g, "-$1").toLowerCase();
  }
  static toHump(name,flag) {
    var str = name.replace(/\-(\w)/g, function (all, letter) {
      console.log(all); //"_T"
      console.log(letter); //"T"
      return letter.toUpperCase();
    });
    if(flag){
      str = str.substr(0,1).toUpperCase()+str.substr(1)
    }
    return str
  }
}
