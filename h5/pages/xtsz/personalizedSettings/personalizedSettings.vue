<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex personalizedSettings_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between personalizedSettings_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center personalizedSettings_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  personalizedSettings_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='personalizedSettings_fd0_0_c1_c0_babdd'  >{{$t('个性化推荐设置')}}</text>
</view>
    <view   class='flex align-center justify-end personalizedSettings_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center personalizedSettings_flex_1_babdd"    >
            <view   class='flex flex-direction flex-wrap align-stretch flex-sub'      >
        <text class='personalizedSettings_fd1_0_c0_babdd'  >{{$t('个性化内容推荐')}}</text>
<text class='personalizedSettings_fd1_0_c1_babdd'  >{{$t('关闭后无法收到个性化内容推荐')}}</text>
</view>
        <benben-switch   v-model="kaiguan" default-color='var(--benbenFontColor1)' color='var(--benbenFontColor4)' onloading-color='#ffffff' offloading-color='#eeeeee' :disabled='false' :auto='true' size='72'  @change="personalizationFunc()"    >
        </benben-switch>
</view>
        
<!---flex布局flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    
    
    export default {
        components:{},
        
        
        data(){
			return {"kaiguan":false,"personalizationType":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
            this.getPersonalizationFunc()
		},
		onHide(){
            
            
		},
		onResize(){
            
		},
		onPullDownRefresh(){
            
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //获取个性化
                 getPersonalizationFunc(){
                        this.personalizationType = uni.getStorageSync('personalization') || ''
console.log(this.personalizationType,"ddddddddddddddddddd");
    if( this.personalizationType==0){
           this.kaiguan = false;
    }
    else{
           this.kaiguan = true;
    }
                },
                //个性化设置
                 personalizationFunc(){
                        if( this.kaiguan===false){
           this.personalizationType = '0';
    uni.setStorageSync('personalization',this.personalizationType);
    }
    else{
           this.personalizationType = '1';
    uni.setStorageSync('personalization',this.personalizationType);
    }
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor0);background-size: 100% auto;
            .personalizedSettings_flex_1_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;padding:32rpx 32rpx 32rpx 32rpx;margin:16rpx 0rpx 0rpx 0rpx;
        .personalizedSettings_fd1_0_c0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;line-height:42rpx;margin:0rpx 0rpx 16rpx 0rpx;
    }    .personalizedSettings_fd1_0_c1_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:30rpx;
    }}
    .personalizedSettings_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .personalizedSettings_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .personalizedSettings_fd0_0_c0_babdd{
        width:100rpx;
        .personalizedSettings_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .personalizedSettings_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .personalizedSettings_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>