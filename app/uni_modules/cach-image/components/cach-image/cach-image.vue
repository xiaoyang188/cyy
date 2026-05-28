<template>
	<view class="wrap">
		<image :src="src" :style="{width: width,height:height,borderRadius:radius}"></image>
    </view> 
</template>

<script>
	export default {
		name:"cach-image",
		props: {
			url: {
				type: String,
				default(){
					return ''
				}
			},
			fileMd5: {
				type: String,
				default(){
					return ''
				}
			},
			width: {
				type: String,
				default(){
					return '';
				}
			},
			height: {
				type: String,
				default(){
					return '';
				}
			},
			radius: {
				type: String,
				default(){
					return '';
				}
			}
		},
		data() {
			return {
					src: '' // 图片地址
			}
		},
		onShow() {
			console.log('cach onshow');
		},
		watch: {
			// 监听头像md5值的变化
			async fileMd5(val) { 
				// 查找获取图片缓存
				await this.getImageCache()
			}
		},
		async created() {
			// 查找获取图片缓存
			await this.getImageCache()
		},
		methods: {
			// 查找获取图片缓存
			async getImageCache() { 
				// #ifdef APP-PLUS || APP-HARMONY
				// console.log('getImageCache')
				try{
					console.log("this.fileMd5",this.fileMd5);
					console.log("this.url",this.url);
					if(this.fileMd5!=null&&this.fileMd5!='')
					{
						var result = await getApp().getImageCache(this.url, this.fileMd5)
						console.log("this.fileMd5 result",result)
						if (result) {
							this.src = result
						} else {
							this.src = this.url
						}
					}else
					{
						this.src ='/static/new/default_avatar.png';
					}
				}catch(err){
					console.log("getImageCache",err)
				}
				 // console.log('get url=',this.src);
				// #endif
				// #ifndef APP-PLUS || APP-HARMONY
				this.src = this.url
				// #endif
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
	}
</style>

