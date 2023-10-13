class Navigator {
  constructor() {
    const systemInfo = wx.getSystemInfoSync()
    //this.userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
    this.userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1`
    this.platform = systemInfo.platform;
    this.mediaDevices = {
      getUserMedia() {
        return new Promise((resolve) => {
          resolve();
        });
      },
    };
  }
}

export default new Navigator();
