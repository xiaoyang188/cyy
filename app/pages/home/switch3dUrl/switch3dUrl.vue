<template>
	<view
		style=" height: 100vh;background: linear-gradient(180deg, rgba(253, 251, 251, 1) 0%, rgba(235, 237, 238, 1) 100%);">
		<div class="nav_row">
			<view class="nav_icon_view"
				@click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 40rpx;">3D形象</text>
			</view>
			<view @click="submit" style="width: 150rpx;">
				<uni-icons type="checkmarkempty" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
		</div>
		<div class="col_start" style=" height: 80vh;">
			<cach-image :url="bgUrl" :fileMd5="bgUrl" width="640rpx" height="600rpx" radius="8%" style="margin-top: 120rpx;"></cach-image>
			<view @click="chooseImageFromGallery" class="topBar"
				style="border-radius: 40rpx;width: 300rpx;margin-top: 50rpx;"><text
					style="color:rgba(255, 255, 255, 1);">从手机相册选择</text></view>
			<view @click="takePhoto" class="topBar" style="border-radius: 40rpx;width: 300rpx;margin-top: 50rpx;"><text
					style="color:rgba(255, 255, 255, 1);">拍一个</text></view>
			<view @click="toBackground" class="row_center"
				style="background-color:rgba(0, 0, 0, 0);border-radius: 40rpx;width: 300rpx;height: 50rpx; margin-top: 100rpx;">
				<image src="/static/imgs/home/img.svg" style="width: 40rpx;height: 40rpx;"></image>
				<text style="border-bottom: solid black 1px;font-size: 40rpx;margin-left: 12rpx;">背景墙</text>
			</view>
		</div>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				bgUrl: "/static/imgs/home/top-default.png",
				imagePath: ''
			}
		},
		onShow() {},
		onLoad(para) {
			console.log('para',para)
			this.bgUrl=para.para
		},
		methods: {
			submit(){
				if(this.bgUrl!="/static/imgs/home/top-default.png")
				{
					let pid=getApp().globalData.presentPet[0].pid
					let url = getApp().globalData.internet + '/pet/gen_model'
					uni.uploadFile({
						url: url, //仅为示例，非真实的接口地址
						filePath: this.bgUrl,
						name: 'img',
						formData: {
							pid: pid
						},
						header: {
							'Content-Type': 'multipart/form-data'
						},
						success: (uploadFileRes) => {
							console.log('提交3d模型制做图片成功', uploadFileRes
								.data);
							//提交成功后需要把本地的宠物model3d_img 修改为uploadFileRes.data.data.img
							//uploadFileRes.data.data.pid 对应宠物
							let data=JSON.parse(uploadFileRes.data)
							this.changeModel(1)
							getApp().globalData.presentPet[0].model3d_img=data.data.img
							uni.switchTab({
								url:'/pages/home/home'
							})
						},
						fail: (err) => {
							console.log('提交3d模型制做图片失败', err)
						}
					});
				}
				else{
					uni.showToast({
						title:"请选择照片"
					})
				}
			},
			changeModel(opt)
			{
				getApp().globalData.petShowModel=opt
				uni.setStorage({
					key:'petShowModel',
					data:getApp().globalData.petShowModel
				})
			},
			returnParent() {
				getApp().backParents();
			},
			// 从手机相册选择图片
			chooseImageFromGallery() {
				uni.chooseImage({
					count: 1, // 只允许选择一张图片
					sizeType: ['compressed'], // 可以选择压缩的图片
					sourceType: ['album'], // 从相册选择
					crop: {
						quality: 100, //图片质量,不填为80
						width: 1024, //裁剪宽度
						height: 888, //裁剪高度
						resize:true
					},
					success: (res) => {
						this.imagePath = res.tempFilePaths[0]; // 保存选择的图片路径
						// this.uploadImage(res.tempFilePaths[0]); // 上传图片
						this.bgUrl = this.imagePath
						console.log("拿到图片路径",)
					},
					fail: (err) => {
						console.error('选择图片失败:', err);
					}
				});
			},
			// 拍照
			takePhoto() {
				uni.chooseImage({
					count: 1, // 只允许选择一张图片
					sizeType: ['compressed'], // 可以选择压缩的图片
					sourceType: ['camera'], // 使用相机拍照
					crop: {
						quality: 100, //图片质量,不填为80
						width: 1024, //裁剪宽度
						height: 1024, //裁剪高度
						resize:true
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
			toBackground()
			{
				let para=getApp().globalData.internet + '/'+getApp().globalData.presentPet[0].backgroud_img
				if(getApp().globalData.presentPet[0].backgroud_img===null)
					para='/static/imgs/home/top-default.png'
				uni.navigateTo({
					url: '/pages/home/switchBackground/switchBackground?para='+para
				})
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
</style>