<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePayPwd_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between changePayPwd_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center changePayPwd_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  changePayPwd_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='changePayPwd_fd0_0_c1_c0_babdd'  >{{$t('修改支付密码')}}</text>
</view>
    <view   class='flex align-center justify-end changePayPwd_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---修改支付密码flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch changePayPwd_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center justify-between changePayPwd_fd1_0_babdd'   @tap.stop="oldpswdFunc()"   >
        <text class='changePayPwd_fd1_0_c0_babdd'  >{{$t('旧支付密码验证修改')}}</text>
<text class='fu-iconfont2  changePayPwd_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between changePayPwd_fd1_1_babdd'   @tap.stop="codepswdFunc()"   >
        <text class='changePayPwd_fd1_0_c0_babdd'  >{{$t('手机号验证修改')}}</text>
<text class='fu-iconfont2  changePayPwd_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
</view>
        
<!---修改支付密码flex布局结束-->
<benben-popup v-model="popupShow1750467615590" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---基础弹窗flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center changePayPwd_flex_2_babdd"    >
        <text class='changePayPwd_fd2_0_babdd'  >{{$t('尚未设置支付密码？是否前往设置')}}</text>
    <view   class='flex align-center'      >
        <button class='changePayPwd_fd2_1_c0_babdd'  @tap.stop="popupShow1750467615590=false"  >{{$t('取消')}}</button>
<button class='changePayPwd_fd2_1_c1_babdd'  @tap.stop="getShouchiFunc()"  >{{$t('确定')}}</button>
</view>
</view>
        
<!---基础弹窗flex布局结束-->
    
</benben-popup>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"popupShow1750467615590":false,/** falg【是否已设置支付密码0 未设置 1 已设置】 **/ "dataMessage":{"falg":0}};
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
            this.getMessageFunc()
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
            
            
                            //旧密码修改支付密码
                 oldpswdFunc(){
                        if( this.dataMessage.falg=='1'){
            this.$urouter.navigateTo(`/pages/xtsz/changePayPwdOldCode/changePayPwdOldCode?type=1`);
    }
    else{
            this.popupShow1750467615590 = true;
    }
                },
                //验证码修改支付密码
                 codepswdFunc(){
                        if( this.dataMessage.falg=='1'){
            this.$urouter.navigateTo(`/pages/xtsz/changePayPwdMessageCode/changePayPwdMessageCode`);
    }
    else{
            this.popupShow1750467615590 = true;
    }
                },
                //订单支付-检测支付密码
                async getMessageFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.post(global.apiUrls.post5f64a4d364b44, {
    
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
                },
                //跳转首次设置支付密码
                 getShouchiFunc(){
                        this.popupShow1750467615590 = false;
    this.$urouter.navigateTo(`/pages/xtsz/payment/payment`);
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
            .changePayPwd_flex_2_babdd{
        background:var(--benbenbgColor1);width:540rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
        .changePayPwd_fd2_0_babdd{
        line-height:44rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);margin:91rpx 0rpx 88rpx 0rpx;width:350rpx;text-align:center;
    }    .changePayPwd_fd2_1_c0_babdd{
        line-height:94rpx;border-radius:0rpx 0rpx 0rpx 16rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor1);padding:0rpx 102rpx 0rpx 103rpx;border-top:1px solid var(--benbenbdColor0);font-weight:400;
    }    .changePayPwd_fd2_1_c1_babdd{
        line-height:94rpx;border-radius:0rpx 0rpx 16rpx 0rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor5);border-top:1px solid var(--benbenbdColor0);border-left:1px solid var(--benbenbdColor0);padding:0rpx 103rpx 0rpx 101rpx;font-weight:500;
    }}
    .changePayPwd_flex_1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 32rpx 0rpx 32rpx;
        .changePayPwd_fd1_0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }    .changePayPwd_fd1_1_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;
    }}
    .changePayPwd_fd1_0_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .changePayPwd_fd1_0_c1_babdd{
        font-size:26rpx;color:var(--benbeniconColor2);font-weight:400;
    }
    .changePayPwd_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .changePayPwd_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .changePayPwd_fd0_0_c0_babdd{
        width:100rpx;
        .changePayPwd_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .changePayPwd_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .changePayPwd_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>