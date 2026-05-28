<template>
	<div class="main-container">
		<div class="nav_row" style="background-color: rgb(255, 255, 255);">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">意见反馈</text>
			</view>
			<view style="width: 150rpx;">

			</view>
		</div>
		<scroll-view class="scroll-content" scroll-y="true">
			<uni-section title="联系方式" type="line" padding>
				<uni-easyinput type="text" v-model="feedbackform.contactInformation" focus
					placeholder="选填"></uni-easyinput>
			</uni-section>
			<uni-section title="软件版本" type="line" padding>
				<uni-easyinput type="text" v-model="feedbackform.appVersion" focus placeholder="选填"></uni-easyinput>
			</uni-section>
			<uni-section title="固件版本" type="line" padding>
				<uni-easyinput type="text" v-model="feedbackform.firewareVersion" focus
					placeholder="选填"></uni-easyinput>
			</uni-section>
			<uni-section title="反馈描述" type="line" padding>
				<uni-easyinput type="textarea" @input="handleInput" autoHeight v-model="feedbackform.describe"
					:placeholder="placeholder" :inputBorder="false">
				</uni-easyinput>
				<text style="font-size: 12px; color: #999;">{{ currentCount }}/200</text>
			</uni-section>
			<uni-section title="图片补充(选填)" type="line" padding>
				<view class="image-grid-container"
					:style="{ width: containerWidth + 'rpx', height: containerHeight + 'rpx' }">
					<view v-for="(image, index) in displayedImagesWithPlaceholder" :key="index" class="image-item"
						@click="image === placeholderImage ? chooseImages() : ''">
						<image v-if="image !== placeholderImage" :src="image" class="image-content" />
						<view v-else class="placeholder-image">
							<view><uni-icons type="camera" size="45"></uni-icons></view>
							<view><text>添加图片</text></view>
						</view>
						<view v-show="image !== placeholderImage" class="delete-icon" @click="removeImage(index)">
							<uni-icons type="closeempty"
								style="border-radius: 50%;background-color: rgba(100,100,100,0.8);" size="15"
								width="150rpx" color="rgb(255, 255, 255)"></uni-icons>
						</view>
					</view>
				</view>
			</uni-section>
		</scroll-view>
		<view
			style="width: 100%;display: flex;align-items: center;justify-content: center;height: 150rpx;background-color: rgb(255, 255, 255);">
			<view class="submit-button" @click="submit">
				<text>提交反馈</text>
			</view>
		</view>
	</div>
</template>

<script>
	import logger from '../../../common/logger.js'
	export default {
		data() {
			return {
				placeholderImage: '/static/xixin/addpet.png',
				imageList: [], // 存储选择的图片列表  
				displayedImages: [], // 存储展示在九宫格内的图片列表  
				containerWidth: 0, // 容器宽度  
				containerHeight: 0, // 容器高度 
				currentCount: 0,
				feedbackform: {
					contactInformation: '',
					appVersion: '',
					firewareVersion: '',
					describe: '',
					iconArray: '',
				}
			}
		},
		computed: {
			placeholder: function() {
				return `描述一下你的问题内容,尽量详细哦~（剩余${200 - this.currentCount}字）`;
			},

			displayedImagesWithPlaceholder: function() {
				const images = [...this.displayedImages];
				if (images.length < 9) {
					images.push(this.placeholderImage);
				}
				return images;
			}
		},
		mounted() {
			this.updateDisplayedImages(); // 初始化时更新显示图片和容器尺寸  
		},
		methods: {
			submit() {
				let that = this
				if (this.feedbackform.describe != '') {
					let imgs = this.imageList.map((value, index) => {
						return {
							name: 'iconArray' + index,
							uri: value
						};
					});
					let request_url = getApp().globalData.internet + getApp().globalData.feedbackContact;

					if (imgs.length > 0) {
						uni.uploadFile({
							url: request_url, // 替换为你的服务器URL 
							files: imgs,
							method: 'POST',
							formData: {
								contactInformation: that.feedbackform.contactInformation,
								appVersion: that.feedbackform.appVersion,
								firewareVersion: that.feedbackform.firewareVersion,
								describe: that.feedbackform.describe,
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
							},
							success: (res) => {
								try {
									let data = JSON.parse(res.data)
									if (data.code === 200) {
										// logger.removeFile(1) //
										that.clearData()
										uni.showToast({
											icon: 'success',
											title: '反馈成功',
											duration: 3000
										})
										setTimeout(() => {
											that.returnParent()
										}, 2000)
									} else {
										uni.showModal({
											title: '错误',
											content: data.msg
										})
									}
									// 处理上传成功后的逻辑 
								} catch (e) {
									uni.showModal({
										title: '错误',
										content: e
									})
								}
							},
							fail: (err) => {
								// 处理上传失败后的逻辑 
								uni.showModal({
									title: '提交失败',
									content: err
								})
							}
						});
					} else {
						uni.request({
							url: request_url, // 替换为你的服务器URL 
							method: 'POST',
							data: {
								contactInformation: that.feedbackform.contactInformation,
								appVersion: that.feedbackform.appVersion,
								firewareVersion: that.feedbackform.firewareVersion,
								describe: that.feedbackform.describe,
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
							},
							success: (res) => {
								console.log('Upload success', res);
								if (res.data.code === 200) {
									// logger.removeFile(1)
									that.clearData()
									uni.showToast({
										icon: 'success',
										title: '反馈成功',
										duration: 3000
									})
									setTimeout(() => {
										that.returnParent()
									}, 2000)

								} else {
									uni.showModal({
										title: '错误',
										content: res.data.msg || '提交失败'
									})
								}
								// 处理上传成功后的逻辑  
							},
							fail: (err) => {
								// 处理上传失败后的逻辑 
								uni.showModal({
									title: '提交失败',
									content: err
								})
							}
						});
					}
				} else {
					uni.showToast({
						icon: 'error',
						title: '描述不能为空'
					})
				}

			},
			returnParent() {
				getApp().backParents();
			},
			clearData() {
				let data = {
					contactInformation: '',
					appVersion: '',
					firewareVersion: '',
					describe: '',
					iconArray: '',
				}
				this.feedbackform = data
				this.imageList = new Array()
				this.currentCount = 0
				this.updateDisplayedImages();
			},
			handleInput(event) {
				// console.log('event', event)
				this.currentCount = event.length;
				// 限制字数不超过200  
				if (this.currentCount > 200) {
					this.shareform.describe = this.shareform.describe.slice(0, 200);
					this.currentCount = 200;
					uni.showToast({
						title: '字数不能超过200',
						icon: 'none'
					});
				}
			},
			test(a, b) {
				console.log('aa', a)
				console.log('bb', b)
			},
			chooseImages() {
				uni.chooseImage({
					count: 9 - this.displayedImages.length, // 选择剩余可添加的图片数量  
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						this.updateDisplayedImages();
					}
				});
			},
			updateDisplayedImages() {
				// 更新展示的图片列表，并计算容器尺寸  
				this.displayedImages = this.imageList.slice(0, 9);
				this.calculateContainerSize();
			},
			calculateContainerSize() {
				// 根据图片数量计算容器尺寸  
				const itemWidth = 150; // 单个图片宽度  
				const itemHeight = 150; // 单个图片高度  
				const padding = 5; // 图片间距  
				const itemsPerRow = 3; // 每行图片数量  

				// 计算容器宽度和高度  
				this.containerWidth = itemWidth * itemsPerRow + (itemsPerRow - 1) * padding;
				this.containerHeight = itemHeight * Math.ceil(this.displayedImagesWithPlaceholder.length / itemsPerRow) + (
					Math.ceil(this.displayedImagesWithPlaceholder.length / itemsPerRow) - 1) * padding;
			},
			removeImage(index) {
				// 从 displayedImagesWithPlaceholder 数组中移除对应索引的图片  
				// this.displayedImagesWithPlaceholder.splice(index, 1);
				setTimeout(() => {
					this.imageList.splice(index, 1);
					this.updateDisplayedImages()
					console.log('into removeImage', this.displayedImagesWithPlaceholder)
				}, 300)

			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.main-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: rgb(255, 255, 255);
	}

	.scroll-content {
		min-height: 0;
		overflow: hidden;
		flex: 1;
		background-color: rgb(255, 255, 255);
	}

	.submit-button {
		width: 70%;
		border-radius: 40rpx;
		background-color: rgb(255, 255, 255);
		border: 1px solid rgba(211, 211, 211, 1.0);
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.row-feedback {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		margin-top: 50rpx;
		width: 100%;
		margin: 0%;
		padding: 0%;
		border-bottom: 4px solid rgba(243, 243, 249, 1.0);
	}

	.image-grid-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		/* 图片水平左对齐 */
		align-items: flex-start;
		/* 图片垂直顶部对齐 */
	}

	.image-item {
		width: 150rpx;
		/* 图片宽度固定 */
		height: 150rpx;
		/* 图片高度固定 */
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		/* 为了让占位符图片可以覆盖在背景色上 */
	}

	/* 移除最后一个图片的右边距，以保证容器宽度正确 */
	.image-item:nth-child(3n) {
		margin-right: 0;
	}

	.image-content {
		width: 140rpx;
		/* 图片宽度占满容器 */
		height: 140rpx;
		/* 图片高度占满容器 */
		border-radius: 8px;
	}

	.placeholder-image {
		width: 100%;
		/* 图片宽度占满容器 */
		height: 100%;
		/* 图片高度占满容器 */
		object-fit: cover;
		width: 140rpx;
		height: 140rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: 1px solid #8d8d8d;
		border-radius: 8px;
	}

	.image-item-with-delete {
		/* 这里添加你想要改变的样式，例如添加一个边框或者不同的背景色 */
		border: 1px solid #ccc;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		/* 以便定位删除图标 */
	}

	.delete-icon {
		position: absolute;
		top: 0rpx;
		/* 调整图标的位置 */
		right: 0rpx;
		z-index: 99;
		/* 调整图标的位置 */
	}
</style>