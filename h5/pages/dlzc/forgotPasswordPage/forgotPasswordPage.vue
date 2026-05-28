<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex forgotPasswordPage_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center forgotPasswordPage_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  forgotPasswordPage_fd0_0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center forgotPasswordPage_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout forgotPasswordPage_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center justify-center forgotPasswordPage_fd1_0_babdd'      >
        <image class='forgotPasswordPage_fd1_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1602.png"'></image>
</view>
    <view   class='flex flex-wrap align-center forgotPasswordPage_fd1_1_babdd'      >
        <text class='fu-iconfont2  forgotPasswordPage_fd1_1_c0_babdd'  >&#xe72b;</text>
<benben-input class='flex-sub forgotPasswordPage_fd1_1_c1_babdd'   type="number" :placeholder="$t('请输入手机号')" confirm-type="done" :maxlength="11" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="mobile" />
</view>
    <view   class='flex flex-wrap align-center forgotPasswordPage_fd1_2_babdd'      >
        <text class='fu-iconfont2  forgotPasswordPage_fd1_1_c0_babdd'  >&#xe838;</text>
<benben-input class='flex-sub forgotPasswordPage_fd1_1_c1_babdd'   type="number" :placeholder="$t('请输入验证码')" confirm-type="done" :maxlength="4" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="code" />
<benben-send-verification-code key='1686886589657' ref="vCode1686886589657" class=' forgotPasswordPage_fd1_2_c2_babdd'  :after-text="$t('后重新获取')" :before-text="$t('获取验证码')" type='2' :is-environment-verification='true'  :phone="mobile" ></benben-send-verification-code>
</view>
    <view   class='flex flex-wrap align-center forgotPasswordPage_fd1_3_babdd'      >
        <text class='fu-iconfont2  forgotPasswordPage_fd1_1_c0_babdd'  >&#xe730;</text>
<benben-flex-password-diy v-model="password" class-text="flex flex align-center forgotPasswordPage_fd1_3_c1_babdd"  :placeholder="$t('请输入密码(6~12位字母+数字)')" :maxlength="12" :default-type='true' placeholder-style="color:var(--benbenFontColor2);font-size:28rpx" >
      <template #show>
        <text class='fu-iconfont2  forgotPasswordPage_fd1_3_c1_icon1_babdd'   data-type="show">&#xE837;</text>
      </template>
      <template #hide>
        <text class='fu-iconfont2  forgotPasswordPage_fd1_3_c1_icon2_babdd'   data-type="hide">&#xEBCC;</text>
      </template>
    </benben-flex-password-diy>
</view>
<button class='forgotPasswordPage_fd1_4_babdd'  @tap.stop="forgetpswdFunc()"  >{{$t('确定')}}</button>
</view>
        
<!---flex布局flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"is_tk":false,"password":"","code":"","mobile":""};
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
            
            
                            //忘记密码
                async forgetpswdFunc(){
                                if(!validate(this.mobile,'require')){
                 this.$message.info(this.$t('请输入手机号'));
                 return false;
            }
            if(!validate(this.mobile,'phone')){
                 this.$message.info(this.$t('请输入正确的手机号'));
                 return false;
            }
            if(!validate(this.code,'require')){
                 this.$message.info(this.$t('请输入验证码'));
                 return false;
            }
            if(!validate(this.code,'captcha')){
                 this.$message.info(this.$t('请输入正确的验证码'));
                 return false;
            }
            if(!validate(this.password,'require')){
                 this.$message.info(this.$t('请输入密码'));
                 return false;
            }
            if(!validate(this.password,'password')){
                 this.$message.info(this.$t('密码格式错误'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data5caeeba9866aa = await this.$api.post(global.apiUrls.post5caeeba9866aa, {
    password:this.password,account:this.mobile,code:this.code,account_type:'mobile'
  });
  
  if (data5caeeba9866aa.data.code != 1) {
    this.$message.info(data5caeeba9866aa.data.msg);
    return
  } 
  let info5caeeba9866aa = data5caeeba9866aa.data;
  
  
                    uni.showToast({
                        title:this.$t('重置成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                setTimeout(()=>{
            this.$urouter.redirectTo(`/pages/tabBar/home/home`);
      },500)
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:url(#{image-path('1.png')}) no-repeat;background-size: 100% auto;
            .forgotPasswordPage_flex_1_babdd{
        padding:0rpx 56rpx 0rpx 56rpx;
        .forgotPasswordPage_fd1_0_babdd{
        margin:58rpx 0rpx 0rpx 0rpx;
        .forgotPasswordPage_fd1_0_c0_babdd{
        width:148rpx;height:148rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}    .forgotPasswordPage_fd1_1_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;padding:0rpx 32rpx 0rpx 32rpx;margin:124rpx 0rpx 32rpx 0rpx;
    }    .forgotPasswordPage_fd1_2_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;padding:0rpx 32rpx 0rpx 32rpx;
        .forgotPasswordPage_fd1_2_c2_babdd{
        line-height:40rpx;font-size:28rpx;color:var(--benbenFontColor4);font-weight:400;
    }}    .forgotPasswordPage_fd1_3_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;margin:32rpx 0rpx 0rpx 0rpx;padding:0rpx 32rpx 0rpx 32rpx;
        .forgotPasswordPage_fd1_3_c1_icon1_babdd{
        width:88rpx;line-height:88rpx;text-align:center;font-size:40rpx;color:var(--benbeniconColor2);
    }    .forgotPasswordPage_fd1_3_c1_icon2_babdd{
        width:88rpx;line-height:88rpx;text-align:center;font-size:40rpx;
    }}    .forgotPasswordPage_fd1_4_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:638rpx;height:88rpx;line-height:88rpx;margin:198rpx 0rpx 32rpx 0rpx;
    }}
    .forgotPasswordPage_fd1_1_c0_babdd{
        color:var(--benbeniconColor2);font-size:32rpx;
    }
    .forgotPasswordPage_fd1_1_c1_babdd{
        height:88rpx;margin:0rpx 0rpx 0rpx 32rpx;color:var(--benbenFontColor0);font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .forgotPasswordPage_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;
    }
    .forgotPasswordPage_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .forgotPasswordPage_fd0_0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);font-weight:500;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
    ::v-deep .forgotPasswordPage_fd1_3_c1_babdd{
        height:88rpx;width:500rpx;font-size:32rpx;margin:0rpx 0rpx 0rpx 32rpx;color:var(--benbenFontColor0);
    }
</style>