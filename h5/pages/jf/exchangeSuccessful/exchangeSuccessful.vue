<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex exchangeSuccessful_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center exchangeSuccessful_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        </view>
<text class='exchangeSuccessful_fd0_1_babdd'  >{{$t('兑换成功')}}</text>
    <view   class='flex flex-wrap align-center exchangeSuccessful_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
        <image class='exchangeSuccessful_fd1_0_babdd'  mode="aspectFit"  :src='STATIC_URL+"211.png"'></image>
<text class='exchangeSuccessful_fd1_1_babdd'  >{{$t('兑换成功')}}</text>
<button class='exchangeSuccessful_fd1_2_babdd'  @tap.stop="handleJumpDiy" data-type="back" data-url="2"  >{{$t('返回积分商城')}}</button>
<button class='exchangeSuccessful_fd1_3_babdd'  @tap.stop="handleJumpDiy" data-type="redirectTo" :data-url="`/pages/jf/exChange/exChange`"  >{{$t('查看订单')}}</button>
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
            
            
            
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor1);background-size: 100% auto;
            .exchangeSuccessful_fd1_0_babdd{
        width:250rpx;height:180rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:88rpx 0rpx 40rpx 0rpx;
    }
    .exchangeSuccessful_fd1_1_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:500;line-height:45rpx;
    }
    .exchangeSuccessful_fd1_2_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:28rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:280rpx;height:72rpx;line-height:72rpx;margin:213rpx 0rpx 33rpx 0rpx;
    }
    .exchangeSuccessful_fd1_3_babdd{
        border-radius:36rpx 36rpx 36rpx 36rpx;font-size:28rpx;color:var(--benbenFontColor4);width:280rpx;height:72rpx;border:1px solid var(--benbenbdColor2);line-height:72rpx;background:var(--benbenbtnColor1);background-size:100% auto;
    }
    .exchangeSuccessful_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .exchangeSuccessful_fd0_1_babdd{
        color:#333333;font-size:36rpx;font-weight:500;line-height:50rpx;
    }}
    .exchangeSuccessful_fd0_0_babdd{
        width:100rpx;height:88rpx;
    }}
</style>