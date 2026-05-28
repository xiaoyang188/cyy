<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex againSetUpPayPwd_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between againSetUpPayPwd_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center againSetUpPayPwd_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  againSetUpPayPwd_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        </view>
    <view   class='flex align-center justify-end againSetUpPayPwd_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---改支付密码-第二步flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
            <view   class='flex flex-wrap align-center againSetUpPayPwd_fd1_0_babdd'      >
        <text class='againSetUpPayPwd_fd1_0_c0_babdd'  >1</text>
    <view   class='flex flex-wrap align-center againSetUpPayPwd_fd1_0_c1_babdd'      >
        </view>
<text class='againSetUpPayPwd_fd1_0_c0_babdd'  >2</text>
    <view   class='flex flex-wrap align-center againSetUpPayPwd_fd1_0_c3_babdd'      >
        </view>
<text class='againSetUpPayPwd_fd1_0_c4_babdd'  >3</text>
</view>
<text class='againSetUpPayPwd_fd1_1_babdd'  >{{$t('设置支付密码')}}</text>
<text class='againSetUpPayPwd_fd1_2_babdd'  >{{$t('请设置新支付密码')}}</text>
<benben-digital-password  :box-num='6' mode='password' class-text='flex flex align-center justify-center againSetUpPayPwd_fd1_3_babdd'  @confirm="checkCodeeyFunc()"  v-model="newPassword" :init-open.sync="xianshi">
<template #default="{ content, active, index }">
<view :key="index" v-if="active" class="flex align-center justify-center active-digital-password againSetUpPayPwd_flex_password_active_fd1_3_babdd" >
  {{ content }}
</view>
<view :key="index" v-else class="flex align-center justify-center againSetUpPayPwd_flex_password_active_fd1_3_babdd" >
  {{ content }}
</view>
</template>
</benben-digital-password>
<text class='againSetUpPayPwd_fd1_4_babdd'  >{{$t('支付密码为6位数字，用户提现、设置密保、添加银行卡等操作，可保障资金安全')}}</text>
</view>
        
<!---改支付密码-第二步flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** newPassword【新密码】 **/ "newPassword":"","xianshi":true,"type":"1","oldPayPwd":"123456a"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {type,oldPayPwd}=options
if (type !== undefined) this.type = type
if (oldPayPwd !== undefined) this.oldPayPwd = oldPayPwd
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
                 checkCodeeyFunc(){
                                if(this.oldPayPwd === this.newPassword){
                 this.$message.info(this.$t('旧密码与新密码不能一致'));
                 return false;
            }
    this.$urouter.navigateTo(`/pages/xtsz/confirmNewPayPwd/confirmNewPayPwd?type=${this.type}&newPwd=${this.newPassword}&oldPwd=${this.oldPayPwd}`);
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
            .againSetUpPayPwd_fd1_0_babdd{
        margin:143rpx 0rpx 0rpx 0rpx;
        .againSetUpPayPwd_fd1_0_c1_babdd{
        width:118rpx;height:4rpx;border-radius:0rpx 0rpx 0rpx 0rpx;background:var(--benbenbgColor3);
    }    .againSetUpPayPwd_fd1_0_c3_babdd{
        width:118rpx;height:4rpx;border-radius:0rpx 0rpx 0rpx 0rpx;background:var(--benbenbgColor2);
    }    .againSetUpPayPwd_fd1_0_c4_babdd{
        line-height:36rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor1);border-radius:50rpx 50rpx 50rpx 50rpx;background:var(--benbenbgColor2);background-size:100% auto !important;padding:8rpx 16rpx 8rpx 16rpx;
    }}
    .againSetUpPayPwd_fd1_0_c0_babdd{
        line-height:36rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor3);border-radius:50rpx 50rpx 50rpx 50rpx;background:var(--benbenbgColor3);background-size:100% auto !important;padding:8rpx 16rpx 8rpx 16rpx;
    }
    .againSetUpPayPwd_fd1_1_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:64rpx 0rpx 0rpx 0rpx;
    }
    .againSetUpPayPwd_fd1_2_babdd{
        line-height:36rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor0);margin:40rpx 0rpx 0rpx 0rpx;
    }
    .againSetUpPayPwd_flex_password_active_fd1_3_babdd{
        width:100rpx;height:100rpx;border:1px solid var(--benbenbdColor0);color:var(--benbenFontColor0);background:var(--benbenbgColor2);background-size:100% auto;
    }
    .againSetUpPayPwd_fd1_4_babdd{
        text-align:center;padding:0rpx 32rpx 0rpx 32rpx;font-size:24rpx;color:var(--benbenFontColor1);
    }
    .againSetUpPayPwd_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .againSetUpPayPwd_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .againSetUpPayPwd_fd0_0_c0_babdd{
        width:100rpx;
        .againSetUpPayPwd_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .againSetUpPayPwd_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
    ::v-deep .againSetUpPayPwd_fd1_3_babdd{
        width:750rpx;height:160rpx;
    }
</style>