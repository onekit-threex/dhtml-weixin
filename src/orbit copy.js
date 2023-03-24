import {
	document,
	window,
	requestAnimationFrame,
	cancelAnimationFrame,
	Event0,
	HTMLCanvasElement,
	core,
} from 'dhtml-weixin';

import {
	OrbitControls
} from '../jsm/controls/OrbitControls.js';
import {
	RGBELoader
} from '../jsm/loaders/RGBELoader.js';

import {
	GLTFLoader
} from '../jsm/loaders/GLTFLoader.js';

import {
	FBXLoader
} from '../jsm/loaders/FBXLoader.js';

import * as THREE from "../dhtml/Three"
var requestId
const FPS = 30; // 指的是 30帧每秒的情况
const singleFrameTime = (1.0 / FPS);
let timeStamp = 0;
const clock = new THREE.Clock();
Page({
	data: {
		selected: 0
	},
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)
		this.worker && this.worker.terminate()
		this.renderer.dispose()
		this.renderer.forceContextLoss()
		this.renderer.context = null
		this.renderer.domElement = null
		this.renderer = null
	},
	webgl_touch(e) {
		const web_e = Event0.fix(e)
		window.dispatchEvent(web_e)
		this.canvas && this.canvas.dispatchEvent(web_e)
	},
	onLoad({
		url,
		hdr,
		bg,
		titlesJSON,
		imagesJSON,
		urlsJSON,
		zoom,
		speed
	}) {
		this.zoom = zoom
		var that = this
		this.dict = {}
		///////////////////////////////////////
		if (speed) {
			this.speed = parseFloat(speed)
		}
		if (titlesJSON.length > 0) {
			this.titles = JSON.parse(decodeURIComponent(titlesJSON))
		}
		if (!url) {
			this.urls = JSON.parse(decodeURIComponent(urlsJSON))
		} else {
			this.urls = [decodeURIComponent(url)]
		}
		if (imagesJSON.length > 0) {
			var images = JSON.parse(decodeURIComponent(imagesJSON))
			var onekit_path = requireMiniProgram().getApp().onekit_path || ""
			this.setData({
				onekit_path,
				images
			})
		}
		if (bg) {
			this.setData({
				bg: decodeURIComponent(bg)
			})
		}
		///////////////////////////////////////
		let scene, camera;
		var renderer
		var canvas3d
		var query = wx.createSelectorQuery().in(this)
		query.select('#canvas_webgl')
			.fields({
				node: true
			})
			.exec((res) => {
				var canvas = res[0].node
				//console.error(canvas)
				canvas3d = this.canvas = new HTMLCanvasElement(canvas)
				core.Page.getApp().canvas = canvas3d
				init();
			})


		var init = () => {


			scene = this.scene = new THREE.Scene();
			const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
			scene.add(hemiLight);
			renderer = that.renderer = new THREE.WebGLRenderer({
				alpha: bg != "" ? true : false,
				canvas: canvas3d,
				antialias: true
			});
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.outputEncoding = THREE.sRGBEncoding;
			renderer.shadowMap.enabled = true;
			// camera
			camera = this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
			camera.position.set(10, 10, 10);
			const controls = new OrbitControls(camera, renderer.domElement);
			controls.enablePan = false;
			controls.enableZoom = false;
			controls.update();
			if (!hdr && !bg) {
				scene.background = new THREE.Color("#ffffff")
			}
			if (hdr) {
				var rgbeLoader = new RGBELoader()
				rgbeLoader.load(decodeURIComponent(hdr), res => {
					res.mapping = THREE.EquirectangularReflectionMapping;
					this.scene.environment = res
					this.loadFirst()
				}, undefined, function (e) {
					console.error(e);
				});
			} else {
				this.loadFirst()
			}
		}


	},
	loadFirst() {
		this.changeGlass(0)
	},
	animate() {
		requestId = requestAnimationFrame(() => {
			this.animate()
		}, this.canvas.wx_element);
		const delta = clock.getDelta();
		timeStamp += delta;
		if (timeStamp > singleFrameTime) {
			this.renderer.render(this.scene, this.camera);
			if (this.speed && this.mainModel) {
				this.mainModel.rotation.y += this.speed
			}
		}
	},
	image_tap(e) {
		var selected = e.currentTarget.dataset.index
		this.changeGlass(selected)
		this.setData({
			selected
		})
	},
	changeGlass(index) {
		if (index >= this.urls.length) {
			return
		}
		var url = this.urls[index]
		if (this.titles) {
			wx.setNavigationBarTitle({
				title: this.titles[index],
			})
		}
		if (this.mainModel) {
			this.mainModel.traverse((obj) => {
				if (obj.type === "Mesh") {
					obj.material.visible = false
				}
			})
		}

		this.mainModel = null
		this.loadGlass(url)
	},
	loadGlass_done(glass) {
		this.mainModel = glass
		glass.traverse(function (obj) {
			if (obj.type === 'Mesh') {
				obj.renderOrder = 1;
			}
		})
	},
	loadGlass(url) {
		const temp = this.dict[url]
		if (temp) {
			temp.traverse((obj) => {
				if (obj.type === "Mesh") {
					obj.material.visible = true
				}
			})
			this.loadGlass_done(temp);
			wx.hideLoading()
			return
		}
		////////////////
		const ext = url.substring(url.lastIndexOf(".")+1)
		var loader
		switch (ext) {
			case "glb":
			case "gltf":
				loader = new GLTFLoader();
				break;
				case "fbx":
					loader = new FBXLoader();
					break;
			default:
				wx.showModal({
					title: '格式错误',
					content: `未知格式${ext}。暂时只支持glb、gltf、fbx。`
				})
				return;
		}
		wx.showLoading({
			title: '加载中',
		})
		loader.load(url, (data) => {
			wx.hideLoading()
			var model = data.scene
			if(!model){
				model = data
			}
			model.scale.setScalar(this.zoom)
			this.dict[url] = model
			this.scene.add(model);
			this.loadGlass_done(model);
			this.animate()
		});
	}

})
