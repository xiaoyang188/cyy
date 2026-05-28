<template>
	<div style="width: 100%; height: 100vh;display: flex;flex-direction: column;align-items: center;">
		<div class="nav_row" style="width: 100%;">
			<view style="width: 150rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;"
				@click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">帮助</text>
			</view>
			<view class="myicon">
				<uni-icons type="gear" style="margin-right: 35rpx;" size="35" width="150rpx"
					color="rgba(0,0,0,0)"></uni-icons>
			</view>
		</div>
		<div style="width: 100%;height: 1200rpx;display: flex;align-items: center;justify-content: center;">
			<view class="imageborder"  >
				<cach-image :url="imageUrl" :fileMd5="imageUrl"
						width="600rpx" height="1120rpx" ></cach-image>
			</view>
			
		</div>
		<div style="width: 100%;height: 100rpx;display: flex;align-items: center;justify-content: center;">
			<div style="width: 70%;display: flex;flex-direction: row;justify-content: space-around;">
				<image @click="pre" :src="preimg" style="width: 110rpx;height: 132rpx;"></image>
				<image @click="next" :src="nextimg" style="width: 110rpx;height: 132rpx;"></image>
			</div>
		</div>
	</div>
</template>

<script>
	//:style="{ backgroundImage: 'url(' + imageUrl + ')' }"
	export default {
		data() {
			return {
				serial:'',
				staticurl:'https://api.chongyueyue.cn/static/help/',
				imageUrl:'',
				imgsNumber:1,
				imgIndex:1,
				preimg:'/static/xixin/prePage.png',
				nextimg:'/static/xixin/nextPage.png',
				screenheight:'',
			}
		},
		onLoad(data) {
			console.log('into help page onload',data)
			let para=JSON.parse(data.paramater)
			this.serial=para.index.toString()
			this.imageUrl=this.staticurl+this.serial+'/'+this.imgIndex.toString()+'.jpg'
			console.log('this.imageUrl',this.imageUrl)
			this.imgsNumber=para.imagesNumber
			console.log('this.imgsNumber',this.imgsNumber)
			this.screenheight = uni.getSystemInfoSync().screenHeight;
			this.changNextAndPre()
		},
		methods: {
			changNextAndPre()
			{
				this.preimg='/static/xixin/prePage.png'
				this.nextimg='/static/xixin/nextPage.png'
				if(this.imgIndex===1)
				{
					this.preimg='/static/xixin/prePageGray.png'
				}
				if(this.imgIndex===this.imgsNumber)
				{
					this.nextimg='/static/xixin/nextPageGray.png'
				}
			},
			pre()
			{
				console.log('intopre')
				if(this.imgIndex>1)
				{
					this.imgIndex--
					this.imageUrl=this.staticurl+this.serial+'/'+this.imgIndex.toString()+'.jpg'
				}
				this.changNextAndPre()
			},
			next()
			{
				console.log('into next')
				if(this.imgIndex<this.imgsNumber)
				{
					this.imgIndex++
					this.imageUrl=this.staticurl+this.serial+'/'+this.imgIndex.toString()+'.jpg'
				}
				this.changNextAndPre()
			},
			returnParent() {
				getApp().backParents();
			},
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
	.imageborder{
		width: 600rpx;
		height: 1120rpx;
		/* background-image: url('/static/xixin/1.jpg'); */
		background-size: cover;
		background-position: center;
		position: relative;
		border: 3px solid rgba(255, 176, 108, 1);
	}
</style>