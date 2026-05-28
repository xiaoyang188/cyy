<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center member_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub member_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center member_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  member_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='member_fd0_0_c1_c0_babdd'  >{{$t('会员权益')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end member_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---购买前flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch justify-center benben-flex-layout"    >
            <view   class='flex flex-direction flex-wrap align-stretch member_fd1_0_babdd'    v-if= " isVIp===false"  >
            <view   class='flex flex-wrap align-center member_fd1_0_c0_babdd'      >
        <image class='member_fd1_0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1675.png"'></image>
    <view   class='flex flex-direction flex-wrap align-start'      >
        <text class='member_fd1_0_c0_c1_c0_babdd'  >{{$t('蜡笔小新')}}</text>
    <view   class='flex flex-wrap align-center'      >
        <image class='member_fd1_0_c0_c1_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1676.png"'></image>
<text class='member_fd1_0_c0_c1_c1_c1_babdd'  >Lv.0</text>
<text class='member_fd1_0_c0_c1_c1_c2_babdd'  >。</text>
</view>
</view>
</view>
    <view   class='flex flex-wrap align-center member_fd1_0_c1_babdd'      >
        <text class='member_fd1_0_c1_c0_babdd'  >{{$t('终身专属身份标识，购买会员可享折扣优惠')}}</text>
</view>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch member_fd1_1_babdd'    v-if= " isVIp===true"  >
            <view   class='flex flex-wrap align-center member_fd1_0_c0_babdd'      >
        <image class='member_fd1_0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1675.png"'></image>
    <view   class='flex flex-direction flex-wrap align-start'      >
        <text class='member_fd1_0_c0_c1_c0_babdd'  >{{$t('蜡笔小新')}}</text>
    <view   class='flex flex-wrap align-center'      >
        <image class='member_fd1_0_c0_c1_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1678.png"'></image>
<text class='member_fd1_0_c0_c1_c1_c1_babdd'  >Lv.1</text>
<text class='member_fd1_0_c0_c1_c1_c2_babdd'  >。</text>
</view>
</view>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch member_fd1_1_c1_babdd'      >
            <view   class='flex flex-wrap align-center justify-between member_fd1_1_c1_c0_babdd'      >
        <image class='member_fd1_1_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1679.png"'></image>
<image class='member_fd1_1_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1680.png"'></image>
</view>
    <view   class='flex flex-wrap align-center'      >
        <image class='member_fd1_1_c1_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1681.png"'></image>
<view class='flex benben-progress-bar member_fd1_1_c1_c1_c1_babdd'  >
    <view  class='benben-progress-bar-center member_progress1_fd1_1_c1_c1_c1_babdd' :style="{width: progress+'%'}"></view>
    <image  class='benben-progress-bar-image member_progress2_fd1_1_c1_c1_c1_babdd' mode='aspectFit'   :style="{left: progress+'%'}"></image>
</view>
<image class='member_fd1_1_c1_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1682.png"'></image>
</view>
    <view   class='flex flex-wrap align-center justify-between member_fd1_1_c1_c2_babdd'      >
        <text class='member_fd1_1_c1_c2_c0_babdd'  >{{$t('0成长值')}}</text>
<text class='member_fd1_1_c1_c2_c0_babdd'  >{{$t('VIP2需12,000成长值')}}</text>
</view>
</view>
</view>
    <view   class='flex flex-wrap align-center member_fd1_2_babdd'      >
        <text class='member_fd1_2_c0_babdd'  >{{$t('会员等级')}}</text>
</view>
<view style="position: relative" >
    <swiper ref="benbenSwiperfd1_3"  @change="bannerIndexfd1_3 = $event.detail.current"  class='flex position-relative member_fd1_3_babdd'  previous-margin="10rpx" next-margin="10rpx" :display-multiple-items="1" :interval="5000" :duration="500" :autoplay='true' :circular='true' >
        
    
        <swiper-item class='flex  member_fd1_3_c1_babdd'       >
            <view   class='flex flex-direction align-stretch member_fd1_3_c1_c0_babdd'      >
        <image class='member_fd1_3_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1684.png"'></image>
</view>
</swiper-item>
    
    
        <swiper-item class='flex'       >
            <view   class='flex flex-direction align-stretch member_fd1_3_c2_c0_babdd'      >
        <image class='member_fd1_3_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1686.png"'></image>
</view>
</swiper-item>
    
    
        <swiper-item class='flex'       >
            <view   class='flex flex-direction align-stretch member_fd1_3_c3_c0_babdd'      >
        <image class='member_fd1_3_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1688.png"'></image>
</view>
</swiper-item>
    

    </swiper>
</view>
    <view   class='flex flex-direction align-stretch member_fd1_4_babdd'      >
        <text class='member_fd1_4_c0_babdd'  >{{$t('特权说明')}}</text>
<text class='member_fd1_4_c1_babdd'      >{{$t('后台规则设置')}}</text><text class='member_fd1_4_c1_babdd'    v-if= " isVIp===true"  >{{$t('1、专属身份标识2、购买全场商品9折优惠，特价商品除外')}}</text>
</view>
</view>
        
<!---购买前flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"bannerIndexfd1_3":0,"type":[{"name":"日排行","value":"1","image":""},{"name":"月排行","value":"2","image":""}],"id":1,"name":"日排行",/** start_time【开始时间】 **/ "start_time":"",/** end_time【结束时间】 **/ "end_time":"",/** NumList【邀请列表】 **/ "NumList":[],/** progress【进度条】 **/ "progress":"20",/** isVIp【是否是vip】 **/ "isVIp":false};
		},
		computed:{
                         isLogin() {
      return this.$store.state.token == '' ? false : true;
    }
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
            
            
                            //切换
                 toggleFunc(){
                        this.isVIp = true;
                    this.$message.info('已购买');
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:url(#{image-path('1673.png')}) no-repeat #F8F8F8;background-size: 100% auto;
            .member_fd1_0_babdd{
        background:url(#{image-path('1674.png')}) no-repeat;background-size:100% auto !important;margin:40rpx 32rpx 0rpx 32rpx;height:360rpx;width:686rpx;
        .member_fd1_0_c1_babdd{
        margin:96rpx 40rpx 0rpx 40rpx;
        .member_fd1_0_c1_c0_babdd{
        font-size:20rpx;font-weight:400;color:#95661F;line-height:28rpx;
    }}}
    .member_fd1_0_c0_babdd{
        margin:40rpx 40rpx 0rpx 40rpx;
    }
    .member_fd1_0_c0_c0_babdd{
        width:100rpx;height:100rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 24rpx 0rpx 0rpx;
    }
    .member_fd1_0_c0_c1_c0_babdd{
        font-size:32rpx;font-weight:700;color:#95661F;padding:0rpx 0rpx 8rpx 0rpx;line-height:45rpx;
    }
    .member_fd1_0_c0_c1_c1_c0_babdd{
        width:38rpx;height:32rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .member_fd1_0_c0_c1_c1_c1_babdd{
        font-weight:400;font-size:22rpx;color:#95661F;line-height:25rpx;margin:0rpx 0rpx 0rpx 8rpx;
    }
    .member_fd1_0_c0_c1_c1_c2_babdd{
        font-size:24rpx;font-weight:400;color:#fff;
    }
    .member_fd1_1_babdd{
        background:url(#{image-path('1677.png')}) no-repeat;background-size:100% auto !important;margin:40rpx 32rpx 0rpx 32rpx;height:360rpx;width:686rpx;
        .member_fd1_1_c1_babdd{
        margin:89rpx 32rpx 0rpx 32rpx;
        .member_fd1_1_c1_c0_babdd{
        margin:0rpx 0rpx 8rpx 0rpx;
    }    .member_fd1_1_c1_c1_c1_babdd{
        width:558rpx;height:6rpx;border-radius:16rpx 16rpx 16rpx 16rpx;background:#C48E70;background-size:100% auto;
        .member_progress1_fd1_1_c1_c1_c1_babdd{
        background:#fff;border-radius:10rpx 10rpx 10rpx 10rpx;
    }    .member_progress2_fd1_1_c1_c1_c1_babdd{
        width:32rpx;height:32rpx;
    }}    .member_fd1_1_c1_c2_babdd{
        margin:16rpx 0rpx 0rpx 0rpx;
    }}}
    .member_fd1_1_c1_c0_c0_babdd{
        width:31rpx;height:20rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .member_fd1_1_c1_c1_c0_babdd{
        width:27rpx;height:27rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .member_fd1_1_c1_c2_c0_babdd{
        color:#A16544;font-size:20rpx;font-weight:500;line-height:28rpx;
    }
    .member_fd1_2_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;padding:40rpx 0rpx 32rpx 0rpx;
        .member_fd1_2_c0_babdd{
        color:#333333;font-size:32rpx;font-weight:500;line-height:42rpx;
    }}
    .member_fd1_3_babdd{
        width:686rpx;height:360rpx;margin:32rpx 32rpx 0rpx 32rpx;
        .member_fd1_3_c1_babdd{
        width:686rpx;height:360rpx;
        .member_fd1_3_c1_c0_babdd{
        background:url(#{image-path('1683.png')}) no-repeat;background-size:100% auto !important;width:686rpx;height:360rpx;
    }}    .member_fd1_3_c2_c0_babdd{
        background:url(#{image-path('1685.png')}) no-repeat;background-size:100% auto !important;width:686rpx;height:360rpx;
    }    .member_fd1_3_c3_c0_babdd{
        background:url(#{image-path('1687.png')}) no-repeat;background-size:100% auto !important;width:686rpx;height:360rpx;
    }}
    .member_fd1_3_c1_c0_c0_babdd{
        width:85rpx;height:60rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:52rpx 0rpx 0rpx 40rpx;
    }
    .member_numberfd1_3_c0_babdd{
        position:absolute;bottom:20rpx;right:30rpx;width:80rpx;height:40rpx;background:#525050;border-radius:6rpx 6rpx 6rpx 6rpx;font-size:24rpx;color:#FFFFFF;line-height:46rpx;font-weight:400;
    }
    .member_fd1_4_babdd{
        padding:32rpx 72rpx 40rpx 72rpx;background:#f8f8f8;background-size:100% auto !important;
        .member_fd1_4_c0_babdd{
        color:#333333;font-size:28rpx;font-weight:400;line-height:40rpx;margin:0rpx 0rpx 24rpx 0rpx;
    }}
    .member_fd1_4_c1_babdd{
        color:#333333;font-size:24rpx;font-weight:400;line-height:40rpx;
    }
    .member_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:url(#{image-path('1673.png')}) no-repeat;background-size:100% auto !important;
        .member_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .member_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:#FFFFFF;line-height:50rpx;
    }}}
    .member_fd0_0_c0_babdd{
        width:120rpx;
        .member_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbenFontColor3);
    }}}
    ::v-deep .member_swiperDotfd1_3_babdd{
        position:absolute;bottom:20rpx;left:0rpx;right:0rpx;
    }
    ::v-deep .member_swiperDotSelectedfd1_3_babdd{
        width:16rpx;height:16rpx;border-radius:100rpx 100rpx 100rpx 100rpx;background:#00A7FF;border:1px solid #00A7FF;margin:0rpx 6rpx 0rpx 0rpx;font-size:24rpx;color:#fff;
    }
    ::v-deep .member_swiperDotUnselectedfd1_3_babdd{
        width:16rpx;height:16rpx;border-radius:100rpx 100rpx 100rpx 100rpx;background:rgba(0, 0, 0, 0.3);border:1px solid rgba(0, 0, 0, 0.3);margin:0rpx 6rpx 0rpx 0rpx;font-size:24rpx;color:#fff;
    }
</style>