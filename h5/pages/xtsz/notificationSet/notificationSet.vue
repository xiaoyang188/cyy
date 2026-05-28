<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center notificationSet_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub notificationSet_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center notificationSet_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  notificationSet_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='notificationSet_fd0_0_c1_c0_babdd'  >{{$t('通知设置')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end notificationSet_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout"    >
            <view   class='flex flex-wrap align-center notificationSet_fd1_0_babdd'      >
        <text class='notificationSet_fd1_0_c0_babdd'  >{{$t('APP打开时')}}</text>
</view>
    <view   class='flex flex-direction align-stretch notificationSet_fd1_1_babdd'      >
            <view   class='flex align-baseline justify-between flex-sub'      >
        <text class='notificationSet_fd1_1_c0_c0_babdd'  >{{$t('新消息系统通知')}}</text>
        <benben-switch   v-model="kaiguan" default-color='#dcdfe6' color='var(--benbenFontColor4)' :disabled='false' :auto='true' size='64'  @change="noticeFunc()"    >
        </benben-switch>
</view>
<text class='notificationSet_fd1_1_c1_babdd'  >{{$t('开启后，可收到消息通知')}}</text>
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
			return {"kaiguan":false,"noticeType":""};
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
            this.getHuanFunc()
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
            
            
                            //通知设置
                 noticeFunc(){
                        if( this.kaiguan===true){
           this.noticeType = '1';
    uni.setStorageSync('notice',this.noticeType);
    }
    else{
           this.noticeType = '0';
    uni.setStorageSync('notice',this.noticeType);
    }
                },
                //获取缓存
                 getHuanFunc(){
                        this.noticeType = uni.getStorageSync('notice') || ''
console.log(this.noticeType,"ddddddddddddddddddd");
    if( this.noticeType=='1'){
           this.kaiguan = true;
    }
    else{
           this.kaiguan = false;
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
            background:var(--benbenbgColor1);background-size: 100% auto;
            .notificationSet_fd1_0_babdd{
        padding:32rpx 40rpx 32rpx 40rpx;
        .notificationSet_fd1_0_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:400;
    }}
    .notificationSet_fd1_1_babdd{
        padding:40rpx 24rpx 40rpx 24rpx;background:var(--benbenbgColor1);background-size:100% auto !important;margin:0rpx 32rpx 0rpx 32rpx;border-radius:16rpx;
        .notificationSet_fd1_1_c0_c0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;margin:0rpx 0rpx 16rpx 0rpx;
    }    .notificationSet_fd1_1_c1_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;
    }}
    .notificationSet_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:transparent;background-size:100% auto !important;
        .notificationSet_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .notificationSet_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:88rpx;
    }}}
    .notificationSet_fd0_0_c0_babdd{
        width:120rpx;
        .notificationSet_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}}
</style>