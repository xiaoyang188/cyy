<template>
	<view
		style=" height: 100vh;background: linear-gradient(180deg, rgba(253, 251, 251, 1) 0%, rgba(235, 237, 238, 1) 100%);">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 40rpx;">背景墙</text>
			</view>
			<view @click="submitNew" style="width: 150rpx;">
				<uni-icons type="checkmarkempty" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
		</div>
		<div class="col_start" style=" height: 80vh;">
			<qf-image-cropper v-if="showCropper" :zIndex='1000' ref="QfImageCropper" :width="750" :height="650"
				@crop="handleCrop"></qf-image-cropper>
			<cach-image :url="bgUrl" :fileMd5="bgUrl" width="600rpx" height="520rpx" radius="8%"
				style="margin-top: 120rpx;"></cach-image>
			<view @click="chooseImageFromGallery" class="topBar"
				style="border-radius: 40rpx;width: 300rpx;margin-top: 50rpx;"><text
					style="color:rgba(255, 255, 255, 1);">从手机相册选择</text></view>
			<!-- #ifndef APP-HARMONY -->
			<view @click="takePhoto" class="topBar" style="border-radius: 40rpx;width: 300rpx;margin-top: 50rpx;"><text
					style="color:rgba(255, 255, 255, 1);">拍一个</text></view>
			<!-- #endif -->
			<!-- #ifdef APP-HARMONY -->
			<view @click="savePhoto" class="topBar" style="border-radius: 40rpx;width: 300rpx;margin-top: 50rpx;"><text
					style="color:rgba(255, 255, 255, 1);">保存到相册</text></view>
				<!-- #endif -->

			<!-- <view v-if="presentPet[0].category === 1" @click="to3D" class="row_center"
				style="background-color:rgba(0, 0, 0, 0);border-radius: 40rpx;width: 300rpx;height: 50rpx; margin-top: 150rpx;">
				<image src="/static/imgs/home/3d.png" style="width: 40rpx;height: 40rpx;"></image>
				<text style="border-bottom: solid black 1px;font-size: 40rpx;margin-left: 12rpx;">3D宠物</text>
			</view> -->
		</div>
	</view>

</template>

<script>
	// #ifdef APP-HARMONY
	import {
		getStaticOh
	} from "@/utils/file"
	import {
		$uni
	} from "@/utils/main.js"
	// #endif
	import {
		upload
	} from '/api/api/system.js'
	import {
		savePetInfo
	} from '/api/api/pet.js'
	import util from "@/common/util"
	export default {
		data() {
			return {
				bgUrl: "/static/imgs/home/top-default.png",
				imagePath: '',
				presentPet: null,
				showCropper: false
			}
		},
		onShow() {
			this.presentPet = getApp().globalData.presentPet
		},
		onLoad(para) {
			this.bgUrl = para.para
		},
		methods: {
			// #ifdef APP-HARMONY
			savePhoto() {
				if (!this.bgUrl) {
					uni.showToast({
						title: '请先选择图片',
						icon: 'none'
					})
					return
				}

				// 判断是否为网络图片（http或https开头）
				const isNetworkImage = this.bgUrl.startsWith('http://') || this.bgUrl.startsWith('https://')
				let url = this.bgUrl.startsWith("/static") ? getStaticOh(this.bgUrl) : this.bgUrl


				try {

					// 调用保存图片到相册功能
					$uni.saveImageToAlbum({
						fileType: "image",
						imageUrl: isNetworkImage ? this.bgUrl : url,
						imageType: isNetworkImage ? 'network' : 'local',

						// 网络图片下载回调
						onDownloadStart: () => {
							console.log('开始下载图片...')
							uni.showLoading({
								title: isNetworkImage ? '正在下载并保存...' : '正在保存...',
								mask: true
							})
						},

						onDownloadProgress: (progress) => {
							if (progress.progress >= 0) {
								console.log(`下载进度: ${progress.progress}%`)
							} else {
								console.log(`已下载: ${progress.downloadedBytes} 字节`)
							}
						},

						onDownloadComplete: (filePath) => {
							console.log('图片下载完成，临时文件路径:', filePath)
							uni.hideLoading()
							uni.showToast({
								title: "下载完成开始保存"
							})
						},

						// 保存成功回调
						success: (result) => {
							uni.hideLoading()
							uni.showToast({
								title: '保存成功',
								icon: 'success'
							})
							console.log('图片保存成功:', result)
						},

						// 保存失败回调
						fail: (error) => {
							uni.hideLoading()
							uni.showToast({
								title: error.errMsg || '保存失败',
								icon: 'none',
								duration: 3000
							})
							console.error('保存图片失败:', error)
						},

						// 完成回调
						complete: () => {
							uni.hideLoading()
						}
					})
				} catch (err) {
					console.log("saveImageToAlbum", err)
				}
			},
			// #endif
			changeModel(opt) {
				getApp().globalData.petShowModel = opt
				uni.setStorage({
					key: 'petShowModel',
					data: getApp().globalData.petShowModel
				})
			},
			submitNew() {
				if (this.bgUrl != "/static/imgs/home/top-default.png") {
					uni.showLoading({
						title: '正在提交信息，请耐心等待',
						mask: true,
					})
					let uploadpara = {
						filePath: this.bgUrl,
						pathPrefix: 'static/pet/background/'
					}
					upload(uploadpara).then(recive => {
						const fileData = util.handleUploadResponse(recive);
						console.log('最终得到的文件数据:', fileData);
						let pet = this.presentPet[0]
						console.log('pet', pet)
						let para = {
							backgroudImg: fileData.fileKey,
							pid: pet.pid,
							category: pet.category,
							nickname: pet.nickname,
							breedId: pet.breedId,
							gender: pet.gender,
							weight: pet.weight,
							height: pet.height,
							birthDate: pet.birthDate
						}
						uni.hideLoading()
						console.log('para', para)
						savePetInfo(para).then(recivedata => {
							uni.showToast({
								title: '修改成功',
							})
							// 直接找到对应的宠物对象并修改
							let petIndex = getApp().globalData.allPets.findIndex(item => item.pid === this
								.presentPet[0].pid);
							if (petIndex !== -1) {
								// 直接修改原对象
								getApp().globalData.allPets[petIndex].backgroudImg = fileData.fileUrl;
							}

							console.log('修改后的allPets', getApp().globalData.allPets);
							util.requestPetList()
							uni.switchTab({
								url: '/pages/home/home'
							})
						})
					}).catch(err => {
						uni.hideLoading()
						console.log('upload err', err)
						uni.showToast({
							title: '上传失败，请再次尝试',
							icon: 'none'
						})
					})
					// uni.uploadFile({
					// 	url: petAdd, //仅为示例，非真实的接口地址
					// 	filePath: this.bgUrl,
					// 	name: 'backgroud_img',
					// 	formData: {
					// 		pid: pid
					// 	},
					// 	header: {
					// 		'Content-Type': 'multipart/form-data'
					// 	},
					// 	success: (uploadFileRes) => {
					// 		console.log('uploadFileRes', uploadFileRes.data);
					// 		let recivedata = JSON.parse(uploadFileRes.data)
					// 		uni.hideLoading();
					// 		if (recivedata.code === 200) {
					// 			uni.showToast({
					// 				title: "保存成功"
					// 			})
					// 			this.changeModel(0)
					// 			getApp().globalData.presentPet[0].backgroud_img = this.bgUrl
					// 			uni.switchTab({
					// 				url: '/pages/home/home'
					// 			})
					// 		} else {
					// 			uni.showModal({
					// 				content: recivedata.msg
					// 			})
					// 		}
					// 	},
					// 	fail: (err) => {
					// 		uni.hideLoading();
					// 		uni.showModal({
					// 			title: '失败',
					// 			content: '网络连接失败',
					// 			showCancel: false,
					// 		})
					// 	}
					// });

				} else {
					uni.showToast({
						title: "请选择照片"
					})
				}
			},
			submit() {
				if (this.bgUrl != "/static/imgs/home/top-default.png") {
					var petAdd = getApp().globalData.internet + getApp().globalData.uploadBackGroundImg;

					let pid = getApp().globalData.presentPet[0].pid
					console.log('url', this.bgUrl);
					uni.showLoading({
						title: '正在提交信息，请耐心等待',
						mask: true,
					})
					try {
						uni.uploadFile({
							url: petAdd, //仅为示例，非真实的接口地址
							filePath: this.bgUrl,
							name: 'backgroud_img',
							formData: {
								pid: pid
							},
							header: {
								'Content-Type': 'multipart/form-data'
							},
							success: (uploadFileRes) => {
								console.log('uploadFileRes', uploadFileRes.data);
								let recivedata = JSON.parse(uploadFileRes.data)
								uni.hideLoading();
								if (recivedata.code === 200) {
									uni.showToast({
										title: "保存成功"
									})
									this.changeModel(0)
									getApp().globalData.presentPet[0].backgroud_img = this.bgUrl
									uni.switchTab({
										url: '/pages/home/home'
									})
								} else {
									uni.showModal({
										content: recivedata.msg
									})
								}
							},
							fail: (err) => {
								uni.hideLoading();
								uni.showModal({
									title: '失败',
									content: '网络连接失败',
									showCancel: false,
								})
							}
						});
					} catch (e) {
						console.log('e', e)
					}
				} else {
					uni.showToast({
						title: "请选择照片"
					})
				}
			},
			returnParent() {
				getApp().backParents();
			},
			handleCrop(res) {
				this.imagePath = res.tempFilePath; // 保存选择的图片路径
				// this.uploadImage(res.tempFilePaths[0]); // 上传图片
				this.bgUrl = this.imagePath
				this.showCropper = false
				console.log("拿到图片路径", res)
			},
			// 从手机相册选择图片
			chooseImageFromGallery() {
				// uni.chooseImage({
				// 	count: 1, // 只允许选择一张图片
				// 	sizeType: ['compressed'], // 可以选择压缩的图片
				// 	sourceType: ['album'], // 从相册选择
				// 	crop: {
				// 		quality: 100, //图片质量,不填为80
				// 		width: 1024, //裁剪宽度
				// 		height: 888, //裁剪高度
				// 		resize: true
				// 	},
				// 	success: (res) => {
				// 		this.imagePath = res.tempFilePaths[0]; // 保存选择的图片路径
				// 		// this.uploadImage(res.tempFilePaths[0]); // 上传图片
				// 		this.bgUrl = this.imagePath
				// 		console.log("拿到图片路径", )
				// 	},
				// 	fail: (err) => {
				// 		console.error('选择图片失败:', err);
				// 	}
				// });
				this.showCropper = true
			},
			// 拍照
			takePhoto() {
				uni.chooseImage({
					count: 1, // 只允许选择一张图片
					sizeType: ['compressed'], // 可以选择压缩的图片
					sourceType: ['camera'], // 使用相机拍照
					crop: {
						quality: 100, //图片质量,不填为80
						width: 660, //裁剪宽度
						height: 572, //裁剪高度
						resize: true
					},
					success: (res) => {
						this.imagePath = res.tempFilePaths[0]; // 保存选择的图片路径
						// this.uploadImage(res.tempFilePaths[0]); // 上传图片
						this.bgUrl = this.imagePath
					},
					fail: (err) => {
						console.error('拍照失败:', err);
					}
				});
			},
			to3D() {
				let para = getApp().globalData.internet + '/' + getApp().globalData.presentPet[0].model3d_img
				if (getApp().globalData.presentPet[0].model3d_img === null)
					para = '/static/imgs/home/top-default.png'
				uni.navigateTo({
					url: '/pages/home/switch3dUrl/switch3dUrl?para=' + para
				})
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
</style>