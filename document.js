import HTMLImageElement from "./HTMLImageElement";
import HTMLCanvasElement from "./HTMLCanvasElement"
import Window from "./window";
import Location from "./Location";
import HTMLElement from "./HTMLElement"
const window = new Window()

class Head extends HTMLElement {}

class Body extends HTMLElement {}

export default class Document extends HTMLElement {
  constructor() {
    super();
    this.window = window;
  }

  get body() {
    return new Body();
  }

  get head() {
    return new Head();
  }

  async createElementAsync(nodeName, canvasType = "2d", THIS) {
    switch (nodeName) {
      case "canvas":
        return new Promise((resolve) => {
          var query = wx.createSelectorQuery();
          if (THIS) {
            query = query.in(THIS);
          }
          query
            .select(`#canvas_${canvasType}`)
            .fields({ node: true })
            .exec((res) => {
              const canvas = res[0].node;
              //if (canvasType === "2d") {
                //const context = canvas.getContext("2d");
                //context.clearRect(0, 0, 10000, 10000);
              //}
              resolve(new HTMLCanvasElement(canvas));
            });
        });
      default:
        console.error("createElementAsync", nodeName);
        throw new Error(nodeName);
    }
  }

  async getElementByIdAsync(id) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(`#${id}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(new HTMLCanvasElement(res[0].node));
        });
    });
  }

  async getElementsByTagNameAsync(tagName) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(tagName)
        .fields({ node: true })
        .exec((res) => {
          resolve(new HTMLCanvasElement(res[0].node));
        });
    });
  }

  async getElementsByClassNameAsync(className) {
    return new Promise((resolve) => {
      const query = wx.createSelectorQuery();
      query
        .select(`.${className}`)
        .fields({ node: true })
        .exec((res) => {
          resolve(new HTMLCanvasElement(res[0].node));
        });
    });
  }

  createElement(nodeName, canvasType = "2d",canvas) {
    switch (nodeName) {
      case "canvas":
         return new HTMLCanvasElement(wx.createOffscreenCanvas({ type: canvasType }));
      case "img":
        return new HTMLImageElement(canvas);
      default:
        return new HTMLElement();
    }
  }

  createElementNS(namesspace, nodeName, canvasType) {
    return this.createElement(nodeName, canvasType);
  }

  get documentElement() {
    return new HTMLElement();
  }

  getElementById() {
    return new HTMLElement();
  }

  getElementsByTagName() {
    return [];
  }

  getElementsByClassName() {
    return [];
  }

  querySelector() {
    return new HTMLElement();
  }

  get location() {
    return new Location();
  }

  querySelectorAll() {
    return [];
  }
}
