import Style from "./Style";
import Element from "./Element";
import ClassCollection from "./ClassCollection";
import Page from "./core/Page";
export default class HTMLElement extends Element {
  constructor(wx_element) {
    super();
    this.wx_element = wx_element;
    this.style = new Style();
    this.classList = new ClassCollection();
    this._children = [];
    this._childNodes = [];
    this.textContent = "";
  }

  get ownerDocument() {
    return {documentElement:new HTMLElement()};
  }

  get parentElement() {
    return new HTMLElement();
  }
  set id(id) {
    this._id = id;
    this.wx_key = id;
  }
  get id() {
    return this._id;
  }
  get children() {
    return this._children;
  }
  get childNodes() {
    return this._childNodes;
  }
  set innerHTML(innerHTML) {
    if (typeof innerHTML != "string") {
      return;
    }
    innerHTML = innerHTML.replaceAll("<br/>", "\n");
    innerHTML = innerHTML.replaceAll("<br>", "\n");
    innerHTML = innerHTML.replaceAll("&nbsp;", " ");
    const key = `${this.wx_key}_innerHTML`;
    const data = {};
    data[key] = innerHTML;
    Page.current.setData(data);
  }
  get innerHTML() {
    return this._innerHTML;
  }
  append() {}
  appendChild() {}
  removeChild() {}
  remove() {}

  insertBefore() {}

  setAttribute() {}

  toggleAttribute() {}

  click() {}
  get clientLeft() {
    return 0;
  }
  get clientTop() {
    return 0;
  }
  getBoundingClientRect() {
    if (this.wx_element) {
      const systemInfo = wx.getSystemInfoSync();
      return {
        left: 0,
        top: 0,
        width: this.wx_element.width / systemInfo.pixelRatio,
        height: this.wx_element.height / systemInfo.pixelRatio,
      };
    }
    return {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
  }
  play() {}
  setPointerCapture() {}
  releasePointerCapture() {}
  get clientWidth() {
    return this.wx_element ? this.wx_element.width : 0;
  }
  get clientHeight() {
    return this.wx_element ? this.wx_element.height : 0;
  }
}
