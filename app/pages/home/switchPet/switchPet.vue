<template>
	<view class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx"
					color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">宠物信息</text>
			</view>
			<view @click="addpet"  style="width: 150rpx;">
				<uni-icons type="plusempty" style="" size="20" width="100rpx"
					color="rgb(18, 18, 18)"></uni-icons>
			</view>
		</div>
		<view style="position: fixed; width: 0; height: 0; overflow: hidden;">
			<canvas canvas-id="myCanvas" :style="{ width: powerW * 98 + 'px', height: powerW * 110+ 'px' }"></canvas>
			<canvas canvas-id="canvasBell" :style="{ width: powerW * 94 + 'px', height: powerW * 136+ 'px' }"></canvas>
			<canvas canvas-id="canvasLight" :style="{ width: powerW * 94 + 'px', height: powerW * 136+ 'px' }"></canvas>
			<canvas canvas-id="canvasBellLight"
				:style="{ width: powerW * 94 + 'px', height: powerW * 136+ 'px' }"></canvas>
		</view>
		<div class="content-box">
			<scroll-view :scroll-top="scrollTop" scroll-y="true" style="height: 100%;">
				<view style="" v-for="(item, index) in petlist">
					<div class="row_center" style="position: relative;  width: 100%;height: 200rpx;margin-bottom: 50rpx;">
						<view style="position: absolute;top:0px;left:75rpx;border-radius: 50%;">
							<cach-image :url="item.smallAvatarUrl" :fileMd5="item.avatarUrl" width="200rpx" height="200rpx"
								radius="50%"></cach-image>
						</view>
						<view class="row_center" style="width: 80%;height: 85%;">
							<div style="width: 20%;height: 100%;"></div>
							<div class="col_center" style="width: 80%;height: 100%;background-color: rgb(0, 170, 255);border-radius: 40rpx;" :style="item.gender===1?petFemaleColor:petMaleColor">
								<div class="row_start" style="height: 50%;width: 100%;margin-left: 180rpx; ">
									<text style="font-size: 24px;font-weight: 500;color: #ffffff;display: block;max-width: 300rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.nickname}}</text>
								</div>
								<div class="row_start" style="height: 50%;width: 100%;margin-left: 180rpx; ">
									<view @click="browsePet(item)" class="row_center" >
										<text style="color: #ffffff;font-size: 28rpx;">查看宠物信息</text>
										<uni-icons type="right" style="" size="20" width="100rpx"
											color="rgb(255, 255, 255)"></uni-icons>
									</view>
									<view class="row_center" style="margin-left: 10rpx;">
										<button v-if="presentPet && presentPet[0] && presentPet[0].pid===item.pid"  style="height: 70rpx;width: 150rpx; color: rgb(0, 170, 255);backgroundColor:#ffffff;borderRadius:80rpx;font-size: 30rpx;">
											<text :style="item.gender===1?textColorFemale:textColorMale"> 已使用</text> </button>
										<button @click="switchPet(item)" v-if="!presentPet || !presentPet[0] || presentPet[0].pid!=item.pid"  style="height: 70rpx;width: 150rpx; color: rgb(0, 170, 255);backgroundColor:#ffffff;borderRadius:80rpx;font-size: 30rpx;">
											<text :style="item.gender===1?textColorFemale:textColorMale"> 切换</text> </button>
									</view>
									
								</div>
							</div>
							
						</view>
					</div>
					<!-- <div class="row_center" @click="removePet(item)"
						style="justify-content: space-between;margin-left: 0%;border-bottom: antiquewhite 1px ;align-items: center;">
						<view style="margin-left:40rpx ;">
							<cach-image :url="imgUrlPre+item.small_avatar_url" :fileMd5="item.avatar_url" width="100rpx" height="100rpx"
								radius="50%"></cach-image>
						</view>

						<view>
							<text >{{item.nickname}}</text>
							<uni-icons type="right" style="margin-right: 40rpx;" size="20" width="100rpx"
								color="rgb(18, 18, 18)"><text></text></uni-icons>
						</view>

					</div> -->
				</view>
				<view style="height: 50rpx;">
					
				</view>
			</scroll-view>
		</div>
	</view>

</template>

<script>
	// #ifdef APP-HARMONY
	import {
		mkdirDir,
		directoryFileList,
		isExist,
		getStaticOh
	} from "@/utils/file.js"
	import {
		saveToFilesDir,
		mergeWithCanvas,
		getStaticPath
	} from "@/uni_modules/jiannor-oh-tools"
	// #endif
	export default {
		data() {
			return {
				powerW: 1,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				petlist:new Array(),
				phoneNumber: '',
				imgUrlPre:'',
				presentPet:'',
				petMaleColor:'background: rgba(42, 130, 228, 1)',
				petFemaleColor:'background: rgba(227, 60, 100, 1)',
				textColorMale:'color: rgba(42, 130, 228, 1)',
				textColorFemale:'color: rgba(227, 60, 100, 1)',
			}
		},
		onShow() {
			this.presentPet=getApp().globalData.presentPet
			this.getPetList();
		},
		onLoad() {
			//查询登录，获取宠物列表
			// this.imgUrlPre=getApp().globalData.internetDownload+'/';
			this.imgUrlPre=''
		},
		mounted() {
			// 创建画布 初始化canvas上下文
			this.powerW = uni.getSystemInfoSync().windowWidth / 375;
			this.ctx = uni.createCanvasContext('myCanvas');
			this.ctxBell = uni.createCanvasContext('canvasBell');
			this.ctxLight = uni.createCanvasContext('canvasLight');
			this.ctxBellLight = uni.createCanvasContext('canvasBellLight');
			
		},
		methods: {
			async mergeImages() {
				try {
					let that = this
					let avatarPath = await that.getAvatarInfo()
					console.log('getAvatarInfo', avatarPath)
					that.canvasToFile(that, avatarPath)
					that.canvasToFileWithStatus(that, 'petIconBackGroundBell.png', "bell", avatarPath)
					that.canvasToFileWithStatus(that, 'petIconBackGroundLight.png', 'light', avatarPath)
					that.canvasToFileWithStatus(that, 'petIconBackGroundBellLight.png', 'belllight', avatarPath)
				} catch (error) {
					console.log('合并图片出错', error);
				}
			},
			canvasToFile(that, avatarPath) {
			   // 1. 缓存优先逻辑（优化版）
			   const key = that.presentPet[0].pid + 'peticon'; // 只定义一次key，避免冗余
			   const iconUrl = uni.getStorageSync(key);
			   // 严格校验缓存有效性：非空、非undefined、非空字符串
			   if (iconUrl && typeof iconUrl === 'string' && iconUrl.trim() !== '') {
			       console.log('取了缓存头像，路径：', iconUrl);
			       that.sendPetIcon();
			       return; // 有缓存直接返回，不执行后续绘制
			   }
			   try{
			   	const powerW = that.powerW;
			   	const bgWidth = 88 * powerW;
			   	const bgHeight = 100 * powerW;
			   	const canvasWidth = 98 * powerW;
			   	const canvasHeight = 110 * powerW;
			   	let images = [{
			   		url: getStaticPath('/static/new/petIconBackGround.png'),
			   		x: 0,
			   		y: 0,
			   		width: bgWidth,
			   		height: bgHeight
			   	}];
			   	if (avatarPath) {
			   		const avatarSize = 78 * powerW - 3;
			   		const radius = avatarSize / 2;
			   		const centerX = 44 * powerW;
			   		const centerY = 44 * powerW;
			   		const avatarLeft = centerX - radius;
			   		const avatarTop = centerY - radius - 2;
			   		images.push({
			   			url: avatarPath,
			   			x: avatarLeft,
			   			y: avatarTop,
			   			width: avatarSize,
			   			height: avatarSize,
			   			shape: 'circle'
			   		});
			   	}
			   	mergeWithCanvas({
			   		width: canvasWidth,
			   		height: canvasHeight,
			   		images: images,
			   		success: (res) => {
			   			console.log('鸿蒙端合成成功：', res.tempFilePath);
			   	
			   			// #ifndef APP-HARMONY
			   			uni.saveFile({
			   				tempFilePath: res.tempFilePath,
			   				success: (res2) => {
			   					console.log('图片保存成功，路径：', res2.savedFilePath);
			   					that.sendPetIcon();
			   					// 缓存新路径
								getApp().globalData.lacatePageData.petIcon=res2.savedFilePath
			   					uni.setStorageSync(key, res2.savedFilePath);
								
			   				},
			   				fail: (res2) => {
			   					console.error('保存图片失败：', res2);
			   				}
			   			});
			   			// #endif
			   			//#ifdef APP-HARMONY
			   			saveToFilesDir({
			   				tempFilePath: res.tempFilePath,
			   				fileName: `${that.devicelist.serialCode}.png`,
			   				success(savedFilePath) {
			   					console.log('canvasToFile success', savedFilePath)
			   					that.sendPetIcon();
			   					uni.setStorageSync(key, savedFilePath);
								getApp().globalData.lacatePageData.petIcon=savedFilePath
			   				},
			   				fail(err) {
			   					console.log('canvasToFile fail', err)
			   				}
			   			})
			   			//#endif
			   		},
			   		fail: (err) => {
			   			console.error('鸿蒙端合成失败', err);
			   		}
			   	});
			   }catch(err){
			   	console.log('mergeWithCanvas',err)
			   }
			   return;
			},
			canvasToFileWithStatus(that, bgImageName, type, avatarPath) {
			   // 1. 第一步：参数校验 + 缓存优先逻辑
			   // 定义缓存key（区分不同类型）
			   const key = that.presentPet[0].pid + type;
			   
			   // 读取缓存并严格校验有效性
			   const cachedIconUrl = uni.getStorageSync(key);
			   if (cachedIconUrl && typeof cachedIconUrl === 'string' && cachedIconUrl.trim() !== '') {
			   	// 根据type赋值对应变量
			   	if (type === 'bell') {
			   		that.petBellIcon = cachedIconUrl;
			   	} else if (type === 'light') {
			   		that.petLightIcon = cachedIconUrl;
			   	} else if (type === 'belllight') {
			   		that.petBLIcon = cachedIconUrl;
			   	}
			   	console.log(`取了${type}类型的缓存头像(头像未变)：`, cachedIconUrl);
			   	return; // 有缓存直接返回，不执行绘制
			   }
			   
			   
			   const powerW = that.powerW;
			   const bgWidth = 88 * powerW;
			   const bgHeight = 130 * powerW;
			   const canvasWidth = 98 * powerW;
			   const canvasHeight = 136 * powerW;
			   
			   let images = [{
			   	url: getStaticPath('/static/new/' + bgImageName),
			   	x: 0,
			   	y: 0,
			   	width: bgWidth,
			   	height: bgHeight
			   }];
			   
			   if (avatarPath) {
			   	const avatarSize = 78 * that.powerW - 3;
			   	const radius = avatarSize / 2;
			   	const centerX = 45 * that.powerW;
			   	const centerY = 77 * that.powerW;
			   	const avatarLeft = centerX - radius - 2;
			   	const avatarTop = centerY - radius - 4;
			   
			   	images.push({
			   		url: avatarPath,
			   		x: avatarLeft,
			   		y: avatarTop,
			   		width: avatarSize,
			   		height: avatarSize,
			   		shape: 'circle'
			   	});
			   }
			   
			   mergeWithCanvas({
			   	width: canvasWidth,
			   	height: canvasHeight,
			   	images: images,
			   	success: (res) => {
			   		console.log(`${type}类型鸿蒙端合成成功：`, res.tempFilePath);
			   		//#ifndef APP-HARMONY
			   		uni.saveFile({
			   			tempFilePath: res.tempFilePath,
			   			success: (res2) => {
			   				console.log(`${type}类型图片保存成功：`, res2
			   					.savedFilePath);
			   				// 根据type赋值对应变量
			   				if (type === 'bell') {
								getApp().globalData.lacatePageData.petBellIcon=res2.savedFilePath
			   				} else if (type === 'light') {
			   					getApp().globalData.lacatePageData.petLightIcon=res2.savedFilePath
			   				} else if (type === 'belllight') {
			   					getApp().globalData.lacatePageData.petBLIcon=res2.savedFilePath
			   				}
			   				uni.setStorageSync(key, res2.savedFilePath);
							
			   			},
			   			fail: (res2) => {
			   				console.error(`${type}类型保存图片失败：`, res2);
			   			}
			   		});
			   		// #endif
			   		//#ifdef APP-HARMONY
			   		saveToFilesDir({
			   			tempFilePath: res.tempFilePath,
			   			fileName: `${that.devicelist.serialCode}-${type}.png`,
			   			success: (savedFilePath) => {
			   				console.log('canvasToFileWithStatus success', savedFilePath);
			   			if (type === 'bell') {
			   				getApp().globalData.lacatePageData.petBellIcon=savedFilePath
			   			} else if (type === 'light') {
			   				getApp().globalData.lacatePageData.petLightIcon=savedFilePath
			   			} else if (type === 'belllight') {
			   				getApp().globalData.lacatePageData.petBLIcon=savedFilePath
			   			}
			   				uni.setStorageSync(key, savedFilePath);
			   			},
			   			fail: (err) => {
			   				console.error('canvasToFileWithStatus fail', err);
			   			}
			   		});
			   		//#endif
			   	},
			   	fail: (err) => {
			   		console.error(`${type}类型鸿蒙端合成失败：`, err);
			   	}
			   });
			   return;
			},
			async getAvatarInfo() {
				return new Promise((resolve, reject) => {
					let that = this;
					let avatar_url = that.presentPet[0].avatarUrl
					console.log('avatar_url', avatar_url)
					if (avatar_url != null) {
						if (avatar_url.substring(0, 6) === "static")
							avatar_url = getApp().globalData.internetDownload + '/' + avatar_url
					} else {
						avatar_url = "/static/new/default_avatar.png"
					}
					uni.getImageInfo({
						src: avatar_url,
						success: (res) => {
							resolve(res.path)
						},
						fail: (err) => {
							console.log('头像加载失败', err);
							resolve(null)
						}
					});
				})
			},
			addpet() {
				uni.navigateTo({
					url: "/pages/add-pet/add-pet?item="
				})
			},
			browsePet(item) {
				console.log('removepet', item);
				//删除宠物的话需要更新当前宠物全局变量和设备
				uni.navigateTo({
					url: '/pages/add-pet/add-pet?item=' + JSON.stringify(item)
				})
			},
			switchPet(clickItem)
			{
				uni.showLoading({
					mask:true,
					title:"加载中"
				})
				//实现轮动切换，并且缓存数据也做对应修改
				const index = this.petlist.findIndex(item => {
					// console.log('item',item)
					return item.pid === clickItem.pid
				})
				
				this.presentPet = this.petlist.slice(index, index+1);
				console.log('this.presentPet',this.presentPet)
				getApp().globalData.presentPet = this.petlist.slice(index, index+1);
				//缓存当前pet
				try {
					if(this.presentPet[0].deviceInfo)
					{
						let devicelist =this.presentPet[0].deviceInfo
						getApp().globalData.showDeviceList = this.presentPet[0].deviceInfo
						getApp().globalData.presentDevice = devicelist.serialCode;
						this.mergeImages();
					}
								
				} catch (error) {
					console.log('merge error',error)
				}
				uni.$emit("switchPet",this.presentPet[0].pid)
				var storage = JSON.stringify(this.presentPet);
				uni.setStorage({
					key: 'presentPet',
					data: storage,
					success: function() {
						 console.log('present数据缓存成功', storage);
						 uni.hideLoading()
					}
				});
				
				
			},
			returnParent() {
				getApp().backParents();
			},
			getPetList() {
				this.petlist = null;
				if (getApp().globalData.allPets.length > 0) {
					this.petlist = getApp().globalData.allPets;
				} else {
					this.petlist = new Array();
				}
				console.log('this.petlist',this.petlist);
				console.log('this.presentpet',this.presentPet);
				if(this.presentPet===''|| !this.presentPet||this.presentPet.length<=0)
				{
					console.log('删除了当前宠物')
					this.switchPet(this.petlist[0])
				}
			}

		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
	.main-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}
	.content-box {
		flex: 1;
		margin-top: 30rpx;
		overflow: hidden;
	}
	.petdevice {
		background-size: contain;
		background-repeat: no-repeat;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-left: 3%;
	}
</style>