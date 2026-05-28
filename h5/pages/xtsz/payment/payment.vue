<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex payment_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between payment_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center payment_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  payment_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='payment_fd0_0_c1_c0_babdd'  >{{$t('设置支付密码')}}</text>
</view>
    <view   class='flex align-center justify-end payment_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---修改支付密码第一步flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
        <text class='payment_fd1_0_babdd'  >{{$t('请输入支付密码')}}</text>
<benben-digital-password  :box-num='6' mode='password' class-text='flex flex align-center justify-center payment_fd1_1_babdd'    v-model="oldPayPwd" :init-open.sync="xianshi">
<template #default="{ content, active, index }">
<view :key="index" v-if="active" class="flex align-center justify-center active-digital-password payment_flex_password_active_fd1_1_babdd" >
  {{ content }}
</view>
<view :key="index" v-else class="flex align-center justify-center payment_flex_password_active_fd1_1_babdd" >
  {{ content }}
</view>
</template>
</benben-digital-password>
<button class='payment_fd1_2_babdd'  @tap.stop="checkCodeFunc()"  >{{$t('下一步')}}</button>
</view>
        
<!---修改支付密码第一步flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"oldPayPwd":"","xianshi":true};
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
            
            
                            //校验验证码
                 checkCodeFunc(){
                                if(!validate(this.oldPayPwd,'require')){
                 this.$message.info(this.$t('请输入支付密码'));
                 return false;
            }
            if(!validate(this.oldPayPwd,'length','6')){
                 this.$message.info(this.$t('请输入6位数的密码'));
                 return false;
            }
    this.$urouter.navigateTo(`/pages/xtsz/paymentPassword/paymentPassword?pwd=${this.oldPayPwd}`);
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
            .payment_fd1_0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:208rpx 0rpx 20rpx 0rpx;line-height:50rpx;
    }
    .payment_flex_password_active_fd1_1_babdd{
        width:100rpx;height:100rpx;border:1px solid var(--benbenbdColor0);color:var(--benbenFontColor0);font-size:28rpx;background:var(--benbenbgColor2);background-size:100% auto;
    }
    .payment_fd1_2_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:610rpx;height:88rpx;line-height:88rpx;margin:88rpx 0rpx 0rpx 0rpx;
    }
    .payment_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .payment_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .payment_fd0_0_c0_babdd{
        width:100rpx;
        .payment_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .payment_fd0_0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:600;line-height:50rpx;
    }    .payment_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
    ::v-deep .payment_fd1_1_babdd{
        width:750rpx;height:160rpx;margin:24rpx 0rpx 24rpx 0rpx;
    }
</style>