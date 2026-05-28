import getfile from './getfile.js'
import * as THREE from 'three';
//导入控制器
import {
	OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
//导入模型库
import {
	GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
	RGBELoader
} from 'three/examples/jsm/loaders/RGBELoader.js';
import {
	DRACOLoader
} from 'three/examples/jsm/loaders/DRACOLoader.js';
import {
	OutlineEffect
} from 'three/addons/effects/OutlineEffect.js';
import {
	CSS2DRenderer,
	CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {
	CSS3DRenderer,
	CSS3DObject
} from 'three/addons/renderers/CSS3DRenderer.js';
// 引入OutlinePass通道
import {
	EffectComposer
} from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import {
	RenderPass
} from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import {
	OutlinePass
} from 'three/addons/postprocessing/OutlinePass.js';


let camera, scene = null,
	composer, renderPass, outlinePass, renderer, effect, controls, clock, mixer, animations, isReloadModel = false,
	model, ambientLight;
let actions = [],
	settings;
let singleStepMode = false;
let particleLight, css2DRenderer, mylabel, css3DRenderer, mycss3label, raycaster, mouse, labelElement,
	petbox, cutedogBox,cartBox, originSkin, cartoonSkin, dirLight, dirLight2, dirLight3, dirLight4, amlight, transparentCube;
const dataArray = [{
		src: '/static/model/stand2.glb',
		decoderPath: 'https://cloud.vuedata.wang/draco/',
		useDracoCompression: true
	},
	{
		src: '/static/model/ball.glb',
		decoderPath: 'https://cloud.vuedata.wang/draco/',
		useDracoCompression: true
	},
	{
		src: '/static/model/bone.glb',
		decoderPath: 'https://cloud.vuedata.wang/draco/',
		useDracoCompression: true
	},
	{
		src: '/static/model/cuteDog.glb',
		decoderPath: 'https://cloud.vuedata.wang/draco/',
		useDracoCompression: true
	},
	{
		src: '/static/model/duck.glb',
		decoderPath: 'https://cloud.vuedata.wang/draco/',
		useDracoCompression: true
	},
	// {
	// 	src: '/static/model/cart.glb',
	// 	decoderPath: 'https://cloud.vuedata.wang/draco/',
	// 	useDracoCompression: true
	// }
];
const graph = {
	'idle': ['sit', 'stretch', 'walk'],
	'sit': ['idle'],
	'stretch': ['idle'],
	'walk': ['idle']
};
export default {
	data() {
		return {
			pdata: {},
			theta: 0,
			toonSkin: true,
			currentAction: 'idle',
			endAction: 'idle',
			destnation: 'idle',
			lastAction: 'idle',
			finishloop: false,
			speed: {
				'walk': 0.0055,
				'sit': 0,
				'stretch': 0,
				'idle': 0
			},
			petShowString: ['主人，今天去哪玩啊？', '让我伸个懒腰', '快，跟上我的速度'],
			isFirst: true,
			petShowStringRandom: ['主人，出去玩，出去玩', '今天吃什么好吃的呢？', '主人，抱抱，抱抱', '快看我的毛色是不是更亮了', '能多陪我玩一会吗？',
				'无论什么时候，我都会陪在你身边的', '点击右边小精灵可以换肤哦'
			]
		}
	},
	methods: {
		center(group) {
			/**
			 * 包围盒全自动计算：模型整体居中
			 */
			let box3 = new THREE.Box3()
			// 计算层级模型group的包围盒
			// 模型group是加载一个三维模型返回的对象，包含多个网格模型
			box3.expandByObject(group)
			// 计算一个层级模型对应包围盒的几何体中心在世界坐标中的位置
			let center = new THREE.Vector3()
			box3.getCenter(center)
		},
		// 深度优先搜索函数
		dfs(start, target, path = [], visited = new Set()) {
			// 将当前节点加入路径
			path.push(start);
			visited.add(start);

			// 如果当前节点是目标节点，返回路径
			if (start === target) {
				return path; // 直接返回整个路径
			}

			// 遍历当前节点的所有邻居
			for (const neighbor of graph[start]) {
				if (!visited.has(neighbor)) {
					// 递归搜索邻居节点
					const result = this.dfs(neighbor, target, path, visited);
					if (result !== null) {
						// 如果找到了路径，返回它
						return result;
					}
				}
			}

			// 回溯，移除当前节点
			path.pop();

			// 如果没有找到路径，返回null
			return null;
		},
		async init(val, oldValue, vm) {
			let data;
			if (val) {
				data = val
				isReloadModel = this.pdata.src != data.src
				this.pdata = data
			} else {
				data = this.pdata
			}
			if (!this.isFirst) {
				console.log('初始化时销毁场景')
				this.callPlayer({
					name: 'dispose'
				})
			}

			dataArray[0].src = data.src
			if (!scene) {
				scene = new THREE.Scene();
				setTimeout(() => { //让步主线程
					const container = document.getElementById(data.myCanvasId)
					// this.container = container
					// 创建一个射线投射器
					raycaster = new THREE.Raycaster();
					mouse = new THREE.Vector2();

					camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight,
						0.1, 5);
					camera.position.set(0, 0.33, 0.5);
					// camera.rotation.y = 3.14;
					// camera.position.set(0.0, 400, 400 * 3.5);
					renderer = new THREE.WebGLRenderer({
						alpha: true,
						antialias: true, // 抗锯齿
						precision: 'highp',
						logarithmicDepthBuffer: false, //深度缓冲
					});
					renderer.setPixelRatio(window.devicePixelRatio);
					renderer.setSize(container.offsetWidth, container.offsetHeight);
					renderer.toneMapping = THREE.ACESFilmicToneMapping;
					renderer.domElement.style.position = 'absolute';
					renderer.shadowMap.enabled = true;
					renderer.toneMappingExposure = 1;
					// renderer.outputEncoding = THREE.sRGBEncoding;
					//画布？
					container.appendChild(renderer.domElement);

					// 	composer = new EffectComposer(renderer);
					// 	renderPass = new RenderPass(scene, camera);
					// 	composer.addPass(renderPass);
					// 	outlinePass = new OutlinePass(new THREE.Vector2(container.offsetWidth, container.offsetHeight), scene, camera);

					// 	outlinePass.visibleEdgeColor.set(0x000000);
					// 	outlinePass.hiddenEdgeColor.set(0xffffff);
					// 	outlinePass.edgeStrength = 5;
					// 	outlinePass.edgeThickness = 1;

					// 使用 CSS2DRenderer 创建二维标签
					css2DRenderer = new CSS2DRenderer();
					css2DRenderer.setSize(container.offsetWidth, container.offsetHeight);
					css2DRenderer.domElement.style.position = 'absolute';
					// css2DRenderer.domElement.style.top = '200px';
					css2DRenderer.domElement.style.pointerEvents = 'none';
					container.appendChild(css2DRenderer.domElement);

					// 创建二维标签的 HTML 元素
					labelElement = document.createElement('div');
					labelElement.style.color = 'rgb(255, 255, 255)';
					labelElement.style.maxWidth = '100px'
					labelElement.style.fontSize = '10px';
					labelElement.style.fontFamily = 'Arial';
					labelElement.style.padding = '6px';
					labelElement.style.borderRadius = '20px';
					labelElement.style.border = '1px solid #ffffff';
					labelElement.style.backgroundColor = 'rgba(47, 166, 160, 0.6)';
					labelElement.style.wordWrap = 'break-word'; // 或者使用 'overflow-wrap: break-word;'
					labelElement.style.wordBreak = 'break-all';
					labelElement.style.textAlign = 'center';
					labelElement.textContent = this.petShowString[6];
					mylabel = new CSS2DObject(labelElement);
					mylabel.visible = false;
					// 将标签添加到场景中，并设置其位置以匹配立方体的前面
					mylabel.position.set(0, 1.2, 0.5); // +0.5 是为了垂直居中，+1 是为了将标签放在立方体前面
					scene.add(mylabel);

					window.addEventListener('click', this.onClick, false);
					window.addEventListener('mousemove', this.onMouseMove, false);
					controls = new OrbitControls(camera, renderer.domElement);
					controls.minPolarAngle = 0.1; //默认值0
					controls.maxPolarAngle = Math.PI / 2.4; //默认值Math.PI
					controls.enableDamping = true;
					controls.dampingFactor = 0.05
					//禁止缩放
					controls.minDistance = 3.2;
					controls.maxDistance = 3.2;
					//禁止拖拽
					controls.enablePan = false;
					controls.autoRotate = data.autoRotate; //场景自动旋转
					controls.target.set(0, 0.5, 0);
					controls.update();
					this.onWindowResize()
					this.light()
				}, 20);
			} else {
				this.onWindowResize()
			}
			clock = new THREE.Clock();
			// this.loadModel()
			// this.animate();
			this.loadMultipleModels(dataArray)
				.then(() => {
					// composer.addPass(outlinePass);
					this.animate();

				})
				.catch((error) => {
					console.error('加载模型时出错', error);
				});
		},
		calculateDistanceBetween3DPoints(point1, point2) {
			// 确保point1和point2都是具有x, y, z属性的对象
			// 例如：{x: 1, y: 2, z: 3}

			// 计算每个坐标轴上的差
			var dx = point1.x - point2.x;
			var dy = point1.y - point2.y;
			var dz = point1.z - point2.z;

			// 使用欧几里得距离公式计算距离
			// 距离 = sqrt(dx^2 + dy^2 + dz^2)
			var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

			// 返回距离
			return distance;
		},
		rayIntersectsBox3(rayOrigin, rayDirection, box3) {
			// 初始化tMin为正无穷大，tMax为负无穷大
		    let tMin = -Infinity;
		    let tMax = Infinity;

			// 边界框的最小和最大值
			const min = box3.min;
			const max = box3.max;
			 // console.log('最大最小点',JSON.stringify(max) ,JSON.stringify(min))
			// 遍历三个维度（x, y, z）
			for (let i of ['x', 'y', 'z']) {
				if (Math.abs(rayDirection[i]) < 1e-6) continue; // 忽略这个维度

				// 计算射线与边界框在该维度上的交点参数
				let invD = 1.0 / rayDirection[i];
				let t1 = (min[i] - rayOrigin[i]) * invD;
				let t2 = (max[i] - rayOrigin[i]) * invD;
				if (t1 > t2) {
					let temp = t1;
					t1 = t2;
					t2 = temp;
				}
				if (t1 > tMin) tMin = t1;
				if (t2 < tMax && t2 > 0) tMax = t2;
			}

			if (tMax < tMin || tMax < 0) return false;
			// 射线与边界框相交
			return true;
		},
		onClick(event) {
			// 更新射线投射器的射线方向
			raycaster.setFromCamera(mouse, camera);
			// 计算射线与场景中所有物体的交点
			// 创建一个方向向量（ray direction）
			const ray = new THREE.Vector3();
			ray.set(mouse.x, mouse.y, 0.5).unproject(camera); // 将屏幕坐标转换为3D空间中的点
			ray.sub(camera.position).normalize(); // 计算从相机到屏幕点的方向并归一化

			// // 创建一个起点向量（ray origin），即相机的位置
			const origin = new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld);

			// // 创建一个表示射线的线段几何体
			// const geometry = new THREE.BufferGeometry().setFromPoints([origin, new THREE.Vector3().addVectors(origin,
			// 	ray.multiplyScalar(100))]); // 假设射线长度为100个单位


			// 创建一个线段的材质，这里我们使用红色并稍微加粗
			// const material = new THREE.LineBasicMaterial({
			// 	color: 0xff0000,
			// 	linewidth: 2
			// });

			// // 创建一个线段对象作为射线辅助器
			// const rayHelper = new THREE.LineSegments(geometry, material);
			console.log('scene.children',scene.children.length)
			// // 将射线辅助器添加到场景中
			// scene.add(rayHelper);
			const intersects = raycaster.intersectObjects(scene.children, true);
			// 遍历交点数组
			let that = this
			let detectclick = false
			// console.log('点击pet',this.rayIntersectsBox3(origin,ray,petbox))
			// console.log('点击精灵',this.rayIntersectsBox3(origin,ray,cutedogBox))
			if (this.rayIntersectsBox3(origin, ray, petbox)) {
				console.log('点击了宠物')
				let keys = Object.keys(actions)
				let num = Math.floor(Math.random() * keys.length);
				let num2 = Math.floor(Math.random() * that.petShowStringRandom.length);
				labelElement.textContent = that.petShowStringRandom[num]
				console.log('随机状态', num, keys)
				let opt = {
					statue: keys[num],
					duration: 7
				}
				that.setModel3dStatus(opt);
				mylabel.visible = false;
				mylabel.visible = true;
				setTimeout(() => {
					mylabel.visible = false;
				}, 3000)
			}
			intersects.forEach(function(intersect) {
				// 获取最近的交点
				// 如果你想获得交点的世界坐标（而不是局部坐标），你可以直接使用intersect.point
				// const worldPoint = intersect.point.clone(); // 这一步实际上是不必要的，因为intersect.point已经是世界坐标
				// 创建一个球体几何体和材质
				// const geometry = new THREE.SphereGeometry(0.05, 32, 32); // 半径为0.05，细分32x32
				// const material = new THREE.MeshBasicMaterial({
				// 	color: 0x00ff00
				// }); // 材质颜色为绿色

				// // // 创建一个球体网格
				// const sphere = new THREE.Mesh(geometry, material);

				// // 将球体的位置设置为交点的世界坐标
				// sphere.position.copy(intersect.point);
				// 如果球体还没有被添加到场景中，则添加它
				// if (!scene.children.includes(sphere)) {
				// 	scene.add(sphere);
				// 	// console.log('交点的世界坐标为',JSON.stringify(intersect.point) )
				// }
				// if (cartBox.containsPoint(intersect.point) && !detectclick) {
				// 	detectclick = true
				// 	console.log('检测到点击cart')
				// 	that.openTaobao("https://shop192283791.taobao.com/?spm=pc_detail.29232929/evo365560b447259.shop_block.dshopinfo.22167dd6hQBEvu?q=uni-app");
				// }
				if (cutedogBox.containsPoint(intersect.point) && !detectclick) {
					detectclick = true
					console.log('检测到点击小精灵')
					that.toonSkin=!that.toonSkin
						model[0].traverse(function(object) {
							// console.log('object', JSON.stringify(object.name))
							
							if (object.isMesh && object.name === 'body_node') {
								if (that.toonSkin) {
									dirLight.intensity = 6
									dirLight2.intensity = 0
									dirLight3.intensity = 0
									dirLight4.intensity = 6
					
									object.material = cartoonSkin
								} else {
									dirLight.intensity = 4
									dirLight2.intensity = 3
									dirLight3.intensity = 3
									dirLight4.intensity = 4
					
									object.material = originSkin
								}
					
							}
						})
				}
			})
		},
		onMouseMove(event) {
			// 将浏览器坐标转换为标准化设备坐标 (-1 到 +1)
			const container = document.getElementById(this.pdata.myCanvasId)
			var rect = container.getBoundingClientRect();

			// 获取触摸点的坐标（只处理第一个触摸点）
			var touchX = event.clientX - rect.left;
			var touchY = event.clientY - rect.top;

			// 将触摸坐标转换为 NDC
			// var mouse = new THREE.Vector2();
			mouse.x = (touchX / rect.width) * 2 - 1;
			mouse.y = -(touchY / rect.height) * 2 + 1;
			// mouse.x = (event.clientX / container.offsetWidth) * 2 - 1;
			// mouse.y = -(event.clientY / container.offsetHeight) * 2 + 1;
		},
		deleteObject(group) {
			// 递归遍历组对象group释放所有后代网格模型绑定几何体占用内存
			group.traverse(function(obj) {
				if (obj.type === 'Mesh') {
					obj.geometry.dispose();
					obj.material.dispose();
				}
			})
			// 删除场景对象scene的子对象group
			scene.remove(group);
		},
		light() {
			//可以添加点光源到物体上，然后控制物体移动，就可以制造太阳
			//环境光没有方向均匀的照在物体上
			amlight = new THREE.AmbientLight(0xffffff, 1)
			scene.add(amlight);
			dirLight = new THREE.DirectionalLight(0xffffff, 6);
			dirLight.position.set(5, 15, 15);
			dirLight.castShadow = true;
			dirLight.shadow.camera.top = 2;
			dirLight.shadow.camera.bottom = -2;
			dirLight.shadow.camera.left = -2;
			dirLight.shadow.camera.right = 2;
			dirLight.shadow.camera.near = 0.1;
			dirLight.shadow.camera.far = 40;
			scene.add(dirLight);

			dirLight2 = new THREE.DirectionalLight(0xffffff, 0);
			dirLight2.position.set(-5, 15, -15);
			dirLight2.castShadow = false;
			dirLight2.shadow.camera.top = 2;
			dirLight2.shadow.camera.bottom = -2;
			dirLight2.shadow.camera.left = -2;
			dirLight2.shadow.camera.right = 2;
			dirLight2.shadow.camera.near = 0.1;
			dirLight2.shadow.camera.far = 40;
			scene.add(dirLight2);

			dirLight3 = new THREE.DirectionalLight(0xffffff, 0);
			dirLight3.position.set(5, 15, -15);
			dirLight3.castShadow = false;
			dirLight3.shadow.camera.top = 2;
			dirLight3.shadow.camera.bottom = -2;
			dirLight3.shadow.camera.left = -2;
			dirLight3.shadow.camera.right = 2;
			dirLight3.shadow.camera.near = 0.1;
			dirLight3.shadow.camera.far = 40;
			scene.add(dirLight3);

			dirLight4 = new THREE.DirectionalLight(0xffffff, 6);
			dirLight4.position.set(-5, 15, 15);
			dirLight4.castShadow = false;
			dirLight4.shadow.camera.top = 2;
			dirLight4.shadow.camera.bottom = -2;
			dirLight4.shadow.camera.left = -2;
			dirLight4.shadow.camera.right = 2;
			dirLight4.shadow.camera.near = 0.1;
			dirLight4.shadow.camera.far = 40;
			scene.add(dirLight4);




		},
		async loadEnvironment() {
			let data = this.pdata
			if (data.environmentSrc) {
				new RGBELoader().load(await getfile(data.environmentSrc), async (texture) => {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					// scene.background = texture;
					// scene.environment = texture;
					// scene.background = new THREE.Color(0xffffff);
				});
			}
		},
		rgbToHex(r, g, b) {
			// 确保RGB值在0-1之间
			r = Math.max(0, Math.min(r, 1));
			g = Math.max(0, Math.min(g, 1));
			b = Math.max(0, Math.min(b, 1));

			// 缩放到0-255
			r = Math.round(r * 255);
			g = Math.round(g * 255);
			b = Math.round(b * 255);
			console.log('rgb...', r, g, b)
			// 转换为16进制字符串
			let hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
			return hex;
		},
		async loadMultipleModels(dataArray) {
			this.createPanel()
			let that = this
			const loader = new GLTFLoader();
			if (dataArray.some(data => data.useDracoCompression)) {
				// 假设您有一个字段来确定是否使用Draco压缩
				loader.setDRACOLoader(new DRACOLoader().setDecoderPath(dataArray[0].decoderPath));
			}
			model = [];
			const promises = dataArray.map(async (data, index) => {
				const file = await getfile(data.src);
				return new Promise((resolve, reject) => {
					loader.load(file, (gltf) => {
							model[index] = gltf.scene
							if (index === 0) {
								model[index].scale.set(...this.pdata.modelScale)
								model[index].rotateX(this.pdata.modelRotate[0])
								model[index].rotateY(this.pdata.modelRotate[1])
								model[index].rotateZ(this.pdata.modelRotate[2])
								// model.translateX(0.5)
								this.pdata.isCenter ? this.center(model[
									index]) : model[
									index].position.set(...this.pdata
									.modelPosition)
								// // 计算模型的边界盒并找到最低点的y坐标
								let box1 = new THREE.Box3().setFromObject(model[
									index]);
								let zMidPoint = (box1.min.z + box1.max.z) / 2;
								let minY = box1.min.y;
								console.log('查找最底部y', minY)
								// 调整模型位置，使其最底部位于y=0的平面上
								model[index].position.y = 0.1;
								model[index].position.z = -zMidPoint;
								const geometry = new THREE.BoxGeometry(0.5, 1.3,
									1.5); // 宽0.5, 长1, 高1

								// 3. 创建材质并设置透明度
								const material = new THREE.MeshBasicMaterial({
									color: 0x00ff00,
									transparent: true,
									opacity: 0.0
								}); // 绿色，透明度为0.5

								// 4. 使用几何体和材质创建网格
								const cube = new THREE.Mesh(geometry, material);
								cube.position.y = 0.7
								cube.position.z = 0.15
								// 5. 将网格添加到场景中
								// scene.add(cube);
								petbox = new THREE.Box3().setFromObject(cube);
								// const box3Helper = new THREE.Box3Helper(petbox, 0x000000);
								// scene.add(box3Helper);
								// box3Helper.visible = false;
								animations = gltf.animations;
								mixer = new THREE.AnimationMixer(model[index]);
								console.log('animations.length', animations
									.length)
								actions = [];
								for (let i = 0; i < animations.length; i++) {
									const clipName = animations[i].name.toString();
									console.log('一个动作切片', clipName)
									if (clipName != 'sit down' && clipName != 'sit up')
										actions[clipName] = mixer.clipAction(animations[i]);

								}

								effect = new OutlineEffect(renderer, {
									defaultThickness: 0.01,
									defaultColor: [0.0, 0.0, 0],
									defaultAlpha: 0.9,
								});
								const mesh = new THREE.Mesh(new THREE
									.PlaneGeometry(10, 10),
									new THREE
									.ShadowMaterial({
										color: 0xb4b4b4,
										opacity: 0.3
									}));
								mesh.rotation.x = -Math.PI / 2;
								mesh.receiveShadow = true;
								scene.add(mesh);
								const colors = new Uint8Array(2);
								for (let c = 0; c < colors.length; c++) {
									colors[c] = (c / colors.length) * 256;
								}
								const gradientMap = new THREE.DataTexture(
									colors, colors
									.length, 1,
									THREE.RedFormat);
								gradientMap.needsUpdate = true;
								model[index].traverse(function(object) {
									if (object.isMesh && object.name ===
										'body_node') {
										var geometry = object.geometry;
										let cartoonColor = '#ff0c69'
										if (geometry.attributes.color) {
											// 顶点颜色数据存储在 attributes.color 中
											var colorAttribute = geometry.attributes
												.color;
											// colorAttribute 是一个 BufferAttribute，包含顶点颜色的 Float32Array
											// 每个颜色通常由三个或四个浮点数表示（RGB 或 RGBA）
											var colorsArray = new Float32Array(
												colorAttribute.array);

											let numColors = colorsArray.length /
												3; // 颜色的数量
											let sumR = 0,
												sumG = 0,
												sumB = 0; // 初始化RGB分量的和

											for (let i = 0; i < colorsArray
												.length; i += 3) {
												sumR += colorsArray[i]; // 累加红色分量
												sumG += colorsArray[i +
													1]; // 累加绿色分量
												sumB += colorsArray[i +
													2]; // 累加蓝色分量
											}

											// 计算平均值
											let avgR = sumR / numColors;
											let avgG = sumG / numColors;
											let avgB = sumB / numColors;
											console.log('平均颜色', avgR, avgG, avgB,
												sumR, sumG, sumB, numColors)
											cartoonColor = '#' + that.rgbToHex(avgR,
												avgG, avgB);
											console.log('cartoonColor',
												cartoonColor)

										}
										originSkin = object.material.clone()
										console.log('body_node object.material',
											JSON.stringify(object.material))

										cartoonSkin = new THREE.MeshToonMaterial({
											color: new THREE.Color(
												cartoonColor),
											gradientMap: gradientMap,
										});
										object.castShadow = true;
										object.material = cartoonSkin
									}
									
									if (object.isMesh && object.name ===
										'tongue_node') {
										
										let whiteMaterial = new THREE
											.MeshToonMaterial({
												color: 0xff0c69,
												gradientMap: gradientMap,
											});
										object.castShadow = true;
										object.material = whiteMaterial;
									}
								});
								// outlinePass.selectedObjects =[model[index]];
							}
							if (index === 1) {
								model[index].scale.set(0.1, 0.1, 0.1)
								let box = new THREE.Box3().setFromObject(model[
									index]);
								let minY = box.min.y;
								model[index].position.y = -minY + 0.02;
								model[index].position.x = 1;
								model[index].position.z = 1.5;
								model[index].traverse(function(object) {
									//console.log('object', JSON.stringify(object.name))
									if (object.isMesh) {
										object.castShadow = true;
									}
									if (object.name ===
										'pCube1_Paint_Matte_Yellow_0') {
										let whiteMaterial = new THREE
											.MeshBasicMaterial({
												color: 0x00e100
											});
										object.material = whiteMaterial;
									}
								});

							}
							if (index === 2) {
								model[index].scale.set(0.02, 0.02, 0.02)
								let box = new THREE.Box3().setFromObject(model[
									index]);
								let minY = box.min.y;
								model[index].position.y = -minY + 0.01;
								model[index].position.x = -1;
								model[index].rotation.set(0, 0, 0)
								model[index].traverse(function(object) {
									// console.log('object', JSON.stringify(object.name))
									if (object.isMesh) {
										object.castShadow = true;
									}
									if (object.name ===
										'Sphere012_Material_#219_0') {
										let whiteMaterial = new THREE
											.MeshBasicMaterial({
												color: 0xfff1a9
											});
										object.material = whiteMaterial;
									}
								});
							}
							if (index === 3) {
								model[index].scale.set(0.002, 0.002, 0.002)
								model[index].position.y = 1.1;
								model[index].position.x = 0.7;
								model[index].position.z = 0.5;
								model[index].rotation.set(Math.PI / 2, 0, 0)

								cutedogBox = new THREE.Box3().setFromObject(
									model[index]);
								// const box3Helper2 = new THREE.Box3Helper(cutedogBox,0x000000);
								// scene.add(box3Helper2);
								// 计算立方体的尺寸

								model[index].traverse(function(object) {
									// console.log('object', JSON.stringify(object.name))
									if (object.isMesh) {
										object.castShadow = true;
									}
									if (object.isMesh && object.name ===
										'back_02_-_Default_0') {
										object.visible = false;
									}
								});
							}
							if (index === 4) {
								model[index].scale.set(1.2, 1.2, 1.2)
								let box = new THREE.Box3().setFromObject(model[
									index]);
								let minY = box.min.y;
								model[index].position.y = -minY + 0.01;
								model[index].position.x = 0.5;
								model[index].position.z = 4;
								model[index].rotation.set(0, Math.PI / 3, 0)

								model[index].traverse(function(object) {
									// console.log('object', JSON.stringify(object.name))
									if (object.isMesh) {
										object.castShadow = true;
									}
								});
							}
							// if (index === 5) {
							// 	model[index].scale.set(1, 1, 1)
							// 	model[index].position.y = 0.14;
							// 	model[index].position.x = -0.8;
							// 	model[index].position.z = -0.5;
							// 	cartBox = new THREE.Box3().setFromObject(model[
							// 		index]);					
							// 	model[index].traverse(function(object) {
							// 		// console.log('object', JSON.stringify(object.name))
							// 		if (object.isMesh) {
							// 			object.castShadow = true;
							// 		}
							// 	});
							// 	let labelElement = document.createElement('div');
							// 	labelElement.style.color = 'rgb(255, 255, 255)';
							// 	labelElement.style.maxWidth = '100px'
							// 	labelElement.style.fontSize = '10px';
							// 	labelElement.style.fontFamily = 'Arial';
							// 	labelElement.style.padding = '6px';
							// 	labelElement.style.borderRadius = '5px';
							// 	labelElement.style.border = '1px solid #ffffff';
							// 	labelElement.style.backgroundColor = 'rgba(47, 166, 160, 0.6)';
							// 	labelElement.style.wordWrap = 'break-word'; // 或者使用 'overflow-wrap: break-word;'
							// 	labelElement.style.wordBreak = 'break-all';
							// 	labelElement.style.textAlign = 'center';
							// 	labelElement.textContent = '商城';
							// 	let mylabel = new CSS2DObject(labelElement);
							// 	mylabel.visible = true;
							// 	// 将标签添加到场景中，并设置其位置以匹配立方体的前面
							// 	mylabel.position.set(0, 0.7, 0); 
							// 	model[index].add(mylabel)
							// }
							scene.add(model[index]);
							if (index === 0)
								this.activateAllActions();
							resolve(model[index])
						},
						(xhr) => {
							// let process = xhr.loaded / xhr.total * 100
							// this.$ownerInstance.callMethod('receiveRenderData', {
							// 	name: 'loaded'
							// })
							// console.log('模型加载进度',xhr,process)
							this.$ownerInstance.callMethod(
								'receiveRenderData', {
									name: 'loaded'
								})
						},
						(error) => {
							console.error('An error happened', error);
							reject(error); // 拒绝Promise，以处理加载错误
						}
					);
				})

			});
			// 等待所有模型加载完成
			await Promise.all(promises);
			// 所有模型加载完成后可以执行的代码
		},
		createPanel() {
			settings = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		},
		setModel3dStatus(opt) {
			let that = this
			console.log('into setModel3dStatus', opt)
			let statue = opt.statue
			let duration = opt.duration

			if (this.isFirst === false) {
				console.log('into setModel3dStatus', actions.length)
				// actions.forEach(function(action, index) {
				// 	console.log(action.getClip().name, action.getEffectiveWeight())
				// });
				console.log('this.currentAction', this.currentAction )
				if (actions[that.currentAction]&&statue != this.currentAction && actions[that.currentAction].getEffectiveWeight() ===
					1) {
					let path = this.dfs(this.currentAction, statue)
					console.log('计算路径', path)
					//更新一下current和目标
					if (path != null) {
						this.endAction = path[1]
						this.destnation = path[path.length - 1]
						this.executeCrossFade(this.currentAction, this.endAction, this.destnation,
							duration);
					}

				} else {
					console.log('不执行')
				}
			}

			this.isFirst = false;

		},
		playAnimation(i = 0) {
			this.call('play', i)
		},
		stopAnimation(i = 0) {
			this.call('stop', i)
		},
		executeCrossFade(startAction, endAction, destnation, duration) {
			console.log('into executeCrossFade')
			this.finishloop = false;
			this.unPauseAllActions()
			this.lastAction = this.currentAction
			this.setWeight(actions[endAction], 1);
			actions[endAction].time = 0; //动作从0开始播
			let dura = 1.6

			if (startAction === 'idle' && endAction === 'stretch')
				dura = 0
			if (startAction === 'stretch' && endAction === 'idle')
				dura = 5.8

			actions[startAction].crossFadeTo(actions[endAction], dura, true);
			this.currentAction = endAction
			mixer.addEventListener('loop', onLoopFinished);
			let that = this

			function onLoopFinished(event) {
				if (event.action === actions[endAction]) {
					mixer.removeEventListener('loop', onLoopFinished);
					that.finishloop = true
					console.log('监听到完成一次endAction循环', actions[endAction].getClip().name)
				}
			}

		},
		onPauseAllActions() {
			let keys = Object.keys(actions)
			keys.forEach(function(action) {
				actions[action].paused = true;
			});
		},
		unPauseAllActions() {
			let keys = Object.keys(actions)
			keys.forEach(function(action) {
				actions[action].paused = false;
			});
		},
		activateAllActions() {
			let keys = Object.keys(actions)
			for (let i = 0; i < keys.length; i++) {
				actions[keys[i]].setEffectiveTimeScale(1);
				this.setWeight(actions[keys[i]], settings[i])
			}
			keys.forEach(function(action) {
				actions[action].play();
			});

		},
		getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		setWeight(action, weight) {
			action.enabled = true;
			action.setEffectiveTimeScale(1);
			action.setEffectiveWeight(weight);
		},
		openTaobao(url) {
			plus.runtime.openURL(url, function(res) {
				 if (res.success) {
				        console.log("成功打开淘宝网店");
				    } else {
				       uni.showModal({
				       	content: "本机未检测到淘宝客户端，是否打开浏览器访问淘宝？",
				       	success: function(res) {
				       		if (res.confirm) {
				       			plus.runtime.openURL(url)
				       		}
				       	}
				       })
				    }
				
			});
		},
		onWindowResize() {
			const container = document.getElementById(this.pdata.myCanvasId)
			camera.aspect = container.offsetWidth / container.offsetHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(container.offsetWidth, container.offsetHeight);
		},
		animate() {
			this.animationID = requestAnimationFrame(this.animate);
			let speed = actions[this.lastAction].getEffectiveWeight() * this.speed[this.lastAction] +
				actions[this
					.currentAction].getEffectiveWeight() * this.speed[this.currentAction];
			if (actions[this.currentAction].getEffectiveWeight() === 1 && this.finishloop) {
				let opt = {
					statue: this.destnation,
					duration: 7
				}
				if (this.endAction === this.destnation) {
					//判断状态是否是可以多次执行
					if (this.endAction !== 'idle' && this.endAction !== 'sit' && this.endAction !== 'walk') {
						let childen = graph[this.endAction]
						let num = childen.length
						let random = Math.floor(Math.random() * num);
						opt.statue = childen[random]
						console.log('opt', opt)
						this.setModel3dStatus(opt)
					}
				} else {
					console.log('还没到终点')
					this.setModel3dStatus(opt)
				}
			}
			model[1].position.z -= speed;
			if (model[1].position.z < -4) {
				let pos = this.getRandomInt(5, 10)
				model[1].position.z = pos
			}

			model[2].position.z -= speed;
			if (model[2].position.z < -4) {
				let pos = this.getRandomInt(5, 10)
				model[2].position.z = pos
			}
			model[4].position.z -= speed;
			if (model[4].position.z < -2) {
				let pos = this.getRandomInt(5, 10)
				model[4].position.z = pos
				let pos2 = this.getRandomInt(1, 10)
				model[4].rotation.set(0, Math.PI / pos2, 0)
			}
			// model[5].position.z -= speed;
			// model[5].rotation.y+=0.01
			// if (model[5].position.z < -2) {
			// 	model[5].position.z = 2
			// }
			// cartBox=new THREE.Box3().setFromObject(model[5]);
			if (mixer)
				mixer.update(clock.getDelta());
			controls.update(); // required if damping enabled
			if (this.toonSkin) {
				effect.render(scene, camera);
			} else {
				this.render();
			}
			// composer.render()
			css2DRenderer.render(scene, camera);
		},
		render() {
			renderer.render(scene, camera);
		},
		async callPlayer(val) {
			if (!val.name) return;
			let {
				name,
				args
			} = val
			console.info('into callPlayer', args, name)
			if (name == 'play' || name == 'stop') {
				const length = animations.length
				if (length == 0) {
					console.error('模型文件中无剪辑动画');
				} else if (args > length) {
					console.error('模型文件中无该剪辑动画，动画组数：', length);
				} else {
					mixer.clipAction(animations[args])[name]()
				}
			}
			if (name == 'dispose') {
				console.log('场景销毁');
				this.currentAction = 'idle'
				this.toonSkin = true
				scene?.clear();
				renderer.dispose();
				renderer.forceContextLoss();
				renderer.content = null;
				window.removeEventListener('click', this.onClick, false);
				window.removeEventListener('mousemove', this.onMouseMove, false);
				cancelAnimationFrame(this.animationID) // 去除animationFrame
				let gl = renderer.domElement.getContext("webgl");
				gl && gl.getExtension("WEBGL_lose_context").loseContext();
				scene = null
			}
			// console.log(name, args);
			// if(Array.isArray(args)){
			// 	this.player[name](...args)
			// }else{
			// 	this.player[name](args)
			// }
		}
	},
	async mounted() {
		// await this.init();
	},
	unmounted() {
		this.callPlayer({
			name: 'dispose'
		})
	}
}