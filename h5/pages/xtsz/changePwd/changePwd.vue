<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePwd_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between changePwd_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center changePwd_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  changePwd_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='changePwd_fd0_0_c1_c0_babdd'  >{{$t('修改密码')}}</text>
</view>
    <view   class='flex align-center justify-end changePwd_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---修改密码flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch changePwd_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center justify-between changePwd_fd1_0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/changePwdOldCode/changePwdOldCode`"   >
        <text class='changePwd_fd1_0_c0_babdd'  >{{$t('旧密码验证修改')}}</text>
<text class='fu-iconfont2  changePwd_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between changePwd_fd1_1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/changePwdPhoneCode/changePwdPhoneCode?name=修改密码`"   >
        <text class='changePwd_fd1_0_c0_babdd'  >{{$t('手机号验证修改')}}</text>
<text class='fu-iconfont2  changePwd_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
</view>
        
<!---修改密码flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    
    
    export default {
        components:{},
        
        
        data(){
			return {};
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
            
            
            
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor0);background-size: 100% auto;
            .changePwd_flex_1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 32rpx 0rpx 32rpx;
        .changePwd_fd1_0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }    .changePwd_fd1_1_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;
    }}
    .changePwd_fd1_0_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .changePwd_fd1_0_c1_babdd{
        font-size:26rpx;color:var(--benbeniconColor2);font-weight:400;
    }
    .changePwd_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .changePwd_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .changePwd_fd0_0_c0_babdd{
        width:100rpx;
        .changePwd_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .changePwd_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .changePwd_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>