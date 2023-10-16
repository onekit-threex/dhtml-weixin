export default class Page{
    static get current(){
        const pages = this.getCurrentPages()
        return pages[pages.length-1]
    }
    static getCurrentPages(){
        if(typeof requireMiniProgram =="undefined"){
            return getCurrentPages()
        }else{
            return requireMiniProgram().getCurrentPages()
        }
    }
    static getApp(){
        var app
        if(typeof requireMiniProgram =="undefined"){
            app = getApp()
        }else{
            app = requireMiniProgram().getApp()
        }
        if(app.globalData){
            return app.globalData
        }else{
            return app
        }
    }
    static get wx_request(){
        if(typeof requireMiniProgram =="undefined"){
            return wx.request
        }else{
            return requireMiniProgram().wx_request()
        }
    }
}