<template>
	<view class="b_con" :style="bStyle">
		<view class="b_ele" :style="{'border-color':this.borderColor}">
			<view :style="{'background-color':this.bColor, 'width':this.bElement}" class="b_ele_item"></view>
		</view>
		<view class="b_tou" :style="{'background-color':this.borderColor}"></view>
	</view>
</template>

<script>
	export default {
		name:"LiiyBattery",
		data() {
			return {
				bStyle:{width:this.width, height:this.height},
				bColor:'#000000',
				borderColor:'#000000',
				bElement:this.power+'%',
				bShan:false,
				Red:'#dd3a1a',
				Green:'#00ef00',
				Black:'#424242'
			};
		},
		methods:{
			//修改电量
			setPower(e){
				this.bElement = e
			},
			setColor(color){
				this.bColor = color;
			},
			setBoredrColor(color)
			{
				this.borderColor=color;
			},
			setShan(shan){
				this.bShan = shan;
			},
			change()
			{
				if(this.power<=10)
					{
						this.setColor(this.Red);
						this.setBoredrColor(this.Red);
					}
					else
					{	this.setBoredrColor(this.Black);
						console.log('battery model',this.mode)
						if(this.mode===true){
							this.setColor(this.Green);
						}
						else
						{
							this.setColor(this.Black);
						}
						
					}
			},
			testMethod(opt)
			{
				console.log('调用test',opt)
			}
		},
		props:{
			width:{
				 type: String,
				 required: false, 
				 default: '58rpx'
			},
			height:{
				 type: String,
				 required: false, 
				 default: '26rpx'
			},
			power:{
				type:Number,
				required: false, 
				default:0
			},
			mode:{
				type:Boolean,
				required: false, 
				default:false
			}
		},
		created() {
			this.change();
		},
		watch: {
			// 监听头像md5值的变化
			power(val) { 
				// 查找获取图片缓存
				this.bElement=this.power+'%';
				this.change();
			},
			mode(val){
				this.change();
			}
		},
		onShow() {
			this.change();
		}
	}
</script>

<style lang="scss" scoped>
	.b_shan{
		position: absolute;
		width: 100%;
		height:100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.b_ele_item{
		width: 20%;
		height: 100%;
		// border-right: 2rpx solid rgba(255, 255, 255, 1);
		box-sizing: border-box;
		// margin-right: 2rpx;
		border-radius: 4rpx;
	}
	.b_con{
		display: inline-flex;
		align-items: center;
	}
	.b_ele{
		border-radius: 4rpx;
		width:90%;
		height:90%;
		border:2rpx solid;
		box-sizing: border-box;
		padding:2rpx;
		// padding-top: 1rpx;
		display: flex;
		position: relative;
		flex-direction: row;
		// align-items: center;
	}
	.b_tou{
		width: 10%;
		height:10rpx;
		border-radius:0 8rpx 8rpx 0 ;
	}
</style>