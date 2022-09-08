/* eslint-disable class-methods-use-this */
import String from "./core/String";
export default class Style {
  constructor(element) {
    this.element = element;
    this.styles = {};
  }
  set cssText(cssText) {
    this._cssText = cssText;
  }

  get cssText() {
    return this._cssText;
  }

  setProperty() {}
  run() {
    function dict2string(dict) {
      var string = "";
      for (const key of Object.keys(dict)) {
        string += `${String.fromHump(key)}:${dict[key]};`;
      }
      return string;
    }
    const data = {};
    data[`${this.element.wx_key}_style`] = dict2string(this.styles);
    //
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    page.setData(data);
  }
  set display(value) {
    this.styles.display = value;
    this.run();
  }
  set pointerEvents(value) {
    this.styles.pointerEvents = value;
    this.run();
  }
  set width(value) {
    this.styles.width = value;
    this.run();
  }
  set height(value) {
    this.styles.height = value;
    this.run();
  }
  set left(value) {
    this.styles.left = value;
    this.run();
  }
  set right(value) {
    this.styles.right = value;
    this.run();
  }
  set top(value) {
    this.styles.top = value;
    this.run();
  }
  set bottom(value) {
    this.styles.bottom = value;
    this.run();
  }
  set opacity(value) {
    this.styles.opacity = value;
    this.run();
  }
  set transform(value) {
    this.styles.transform = value;
    this.run();
  }
}
