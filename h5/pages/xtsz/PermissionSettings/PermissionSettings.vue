<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex PermissionSettings_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub PermissionSettings_fd0_0_babdd'      >
            <view   class='flex align-center PermissionSettings_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  PermissionSettings_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='PermissionSettings_fd0_0_c1_c0_babdd'  >{{$t('权限设置')}}</text>
</view>
    <view   class='flex align-center PermissionSettings_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout PermissionSettings_flex_1_babdd"    >
        <text class='PermissionSettings_fd1_0_babdd'  >{{$t('为了向您提供更好的用户体验')}}</text>
<text class='PermissionSettings_fd1_1_babdd'  >{{$t('APP会在特定场景下向您申请一下手机系统权限')}}</text>
    <view   class='flex align-center PermissionSettings_fd1_2_babdd'   @tap.stop="openSetFunc()"   >
            <view   class='flex flex-direction align-stretch flex-sub PermissionSettings_fd1_2_c0_babdd'      >
        <text class='PermissionSettings_fd1_2_c0_c0_babdd'  >{{$t('位置信息')}}</text>
<text class='PermissionSettings_fd1_2_c0_c1_babdd'  >{{$t('根据您的位置为您推荐周边的服务')}}</text>
</view>
<!-- <text class='PermissionSettings_fd1_2_c1_babdd'  >{{$t('已开启')}}</text>
 --><text class='fu-iconfont2  PermissionSettings_fd1_2_c2_babdd'  >&#xe7f2;</text>
</view>
    <view   class='flex align-center PermissionSettings_fd1_2_babdd'   @tap.stop="openSetFunc()"   >
            <view   class='flex flex-direction align-stretch flex-sub PermissionSettings_fd1_2_c0_babdd'      >
        <text class='PermissionSettings_fd1_2_c0_c0_babdd'  >{{$t('相机权限')}}</text>
<text class='PermissionSettings_fd1_2_c0_c1_babdd'  >{{$t('实现拍照、录视频')}}</text>
</view>
<!-- <text class='PermissionSettings_fd1_2_c1_babdd'  >{{$t('已开启')}}</text>
 --><text class='fu-iconfont2  PermissionSettings_fd1_2_c2_babdd'  >&#xe7f2;</text>
</view>
    <view   class='flex align-center PermissionSettings_fd1_2_babdd'   @tap.stop="openSetFunc()"   >
            <view   class='flex flex-direction align-stretch flex-sub PermissionSettings_fd1_2_c0_babdd'      >
        <text class='PermissionSettings_fd1_2_c0_c0_babdd'  >{{$t('存储权限')}}</text>
<text class='PermissionSettings_fd1_2_c0_c1_babdd'  >{{$t('用于图片或视频的上传')}}</text>
</view>
<!-- <text class='PermissionSettings_fd1_4_c1_babdd'  >{{$t('已开启')}}</text>
 --><text class='fu-iconfont2  PermissionSettings_fd1_2_c2_babdd'  >&#xe7f2;</text>
</view>
</view>
        
<!---flex布局flex布局结束-->
    
    
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
            
            
                            //打开系统设置
                 openSetFunc(){
                        uni.openAppAuthorizeSetting()
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
            .PermissionSettings_flex_1_babdd{
        padding:32rpx 0rpx 0rpx 0rpx;
        .PermissionSettings_fd1_0_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);margin:0rpx 32rpx 0rpx 32rpx;
    }    .PermissionSettings_fd1_1_babdd{
        margin:0rpx 32rpx 24rpx 32rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);
    }}
    .PermissionSettings_fd1_2_babdd{
        padding:30rpx 24rpx 30rpx 24rpx;margin:0rpx 0rpx 16rpx 0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
    }
    .PermissionSettings_fd1_2_c0_babdd{
        margin:0rpx 24rpx 0rpx 0rpx;
    }
    .PermissionSettings_fd1_2_c0_c0_babdd{
        font-size:32rpx;font-weight:700;color:var(--benbenFontColor0);margin:0rpx 0rpx 16rpx 0rpx;line-height:40rpx;
    }
    .PermissionSettings_fd1_2_c0_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);line-height:30rpx;
    }
    .PermissionSettings_fd1_2_c1_babdd{
        margin:0rpx 4rpx 0rpx 0rpx;font-size:26rpx;font-weight:400;color:var(--benbenFontColor0);line-height:40rpx;
    }
    .PermissionSettings_fd1_2_c2_babdd{
        font-size:24rpx;color:var(--benbeniconColor2);
    }
    .PermissionSettings_fd1_4_c1_babdd{
        margin:0rpx 4rpx 0rpx 0rpx;font-size:26rpx;font-weight:400;color:var(--benbenFontColor1);line-height:40rpx;
    }
    .PermissionSettings_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .PermissionSettings_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .PermissionSettings_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .PermissionSettings_fd0_0_c0_babdd{
        width:180rpx;
        .PermissionSettings_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>