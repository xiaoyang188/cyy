<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex registerPage_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center registerPage_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  registerPage_fd0_0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center registerPage_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---登录头部flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
            <view   class='flex flex-wrap align-center justify-center registerPage_fd1_0_babdd'      >
        <image class='registerPage_fd1_0_c0_babdd'  mode="aspectFit"  :src='logoInfo.app_logo'></image>
</view>
</view>
        
<!---登录头部flex布局结束-->
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout registerPage_flex_2_babdd"    >
            <view   class='flex flex-wrap align-center registerPage_fd2_0_babdd'      >
        <text class='fu-iconfont2  registerPage_fd2_0_c0_babdd'  >&#xe72b;</text>
<benben-input class='flex-sub registerPage_fd2_0_c1_babdd'   type="number" :placeholder="$t('请输入手机号')" confirm-type="done" :maxlength="11" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="mobile" />
</view>
    <view   class='flex flex-wrap align-center registerPage_fd2_1_babdd'      >
        <text class='fu-iconfont2  registerPage_fd2_0_c0_babdd'  >&#xe838;</text>
<benben-input class='flex-sub registerPage_fd2_0_c1_babdd'   type="number" :placeholder="$t('请输入验证码')" confirm-type="done" :maxlength="4" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="code" />
<benben-send-verification-code key='1750660719553' ref="vCode1750660719553" class='registerPage_fd2_1_c2_babdd'  :after-text="$t('后重新获取')" :before-text="$t('获取验证码')" :emptye-text="$t('请输入账号')" :validate-text="$t('请输入正确账号')" account-type='phone' :auto='false' :is-environment-verification='true' type='1'  :phone="mobile"  @handle="sendCodeFunc()" ></benben-send-verification-code>
</view>
    <view   class='flex flex-wrap align-center registerPage_fd2_2_babdd'      >
        <text class='fu-iconfont2  registerPage_fd2_0_c0_babdd'  >&#xe730;</text>
<benben-flex-password-diy v-model="password" class-text="flex flex align-center registerPage_fd2_2_c1_babdd"  :placeholder="$t('请输入密码(6~12位字母+数字)')" :maxlength="12" :default-type='true' placeholder-style="color:var(--benbenFontColor2);font-size:28rpx" >
      <template #show>
        <text class='fu-iconfont2  registerPage_fd2_2_c1_icon1_babdd'   data-type="show">&#xE837;</text>
      </template>
      <template #hide>
        <text class='fu-iconfont2  registerPage_fd2_2_c1_icon2_babdd'   data-type="hide">&#xEBCC;</text>
      </template>
    </benben-flex-password-diy>
</view>
    <view   class='flex flex-wrap align-center registerPage_fd2_1_babdd'      >
        <text class='fu-iconfont2  registerPage_fd2_0_c0_babdd'  >&#xe63c;</text>
<benben-input class='flex-sub registerPage_fd2_0_c1_babdd'   type="text" :placeholder="$t('请输入邀请码（选填）')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="invite_code" />
</view>
<button class='registerPage_fd2_4_babdd'  @tap.stop="registerFunc()"  >{{$t('注册')}}</button>
    <view   class='flex flex-wrap align-center justify-center'      >
        <text class='registerPage_fd2_5_c0_babdd'  >{{$t('已有账号，前去')}}</text>
<text class='registerPage_fd2_5_c1_babdd'     @tap.stop="handleJumpDiy" data-type="back" data-url="1" >{{$t('登录')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-center registerPage_fd2_6_babdd'      >
                <benben-flex-switch-new class-text='flex flex'  v-model="is_tk" :disabled='false'   >
            <template v-slot:checked>
            
    <view   class='flex flex position-relative align-center'      >
        <text class='fu-iconfont2  registerPage_checkfd2_6_c0_c0_c0_babdd'  >&#xe847;</text>
</view>

            </template>
            <template v-slot:unchecked>
            
    <view   class='flex flex position-relative justify-end align-center'      >
        <text class='fu-iconfont2  registerPage_noCheckfd2_6_c0_c1_c0_babdd'  >&#xe755;</text>
</view>

            </template>
        </benben-flex-switch-new>
<text class='registerPage_fd2_6_c1_babdd'  >{{$t('已阅读并同意')}}</text>
<text class='registerPage_fd2_6_c2_babdd'     @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/dlzc/agreements/agreements`" >{{$t('《用户注册协议》')}}</text>
<text class='registerPage_fd2_6_c3_babdd'  >{{$t('与')}}</text>
<text class='registerPage_fd2_6_c2_babdd'     @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/dlzc/privacyPolicy/privacyPolicy`" >{{$t('《隐私政策》')}}</text>
</view>
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
			return {/** logoInfo【lago信息】
*   wechat_share_title【微信分享标题】
*   wechat_share_img【微信分享默认图片】
*   app_logo【applogo】
*   web_site_title【应用名称】
*   shop_app_icp【商家端备案信息】
*   license【证照信息】
*   app_icp【app备案信息】
*   web_site_copyright【版权信息】
*   web_site_email【公司邮箱】
*   web_site_bgimg【联系我们背景图】
*   web_site_address【公司地址】
*   time【工作时间】
*   tel【客服电话】 **/ "logoInfo":{"tel":"","time":"","web_site_address":"","web_site_bgimg":"","web_site_email":"","web_site_copyright":"","app_icp":"","license":"","shop_app_icp":"","web_site_title":"","app_logo":"","wechat_share_img":0,"wechat_share_title":""},"is_tk":false,"mobile":"","code":"","password":"",/** birthday【生日】
*   mobile【手机号】
*   gender【性别】
*   email【邮箱】
*   nickname【昵称】
*   real_name【真实姓名】
*   avatar【头像】
*   id【用户ID】
*   user_token【会员登录标识】 **/ "dataList":{"userinfo":{"user_token":"","id":0,"avatar":"","real_name":"","nickname":"","email":"","gender":"","mobile":"","birthday":""}},"invite_code":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.getvi4cdb895b79baFunc()
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
            
            
                            //系统配置-联系我们
                async getvi4cdb895b79baFunc(){
                        //请求方法
    //数据验证
    
    
  let datalogoInfo = await this.$api.get(global.apiUrls.post64cdb895b79ba, {
    
  });
  
  if (datalogoInfo.data.code != 1) {
    this.$message.info(datalogoInfo.data.msg);
    return
  } 
  let infologoInfo = datalogoInfo.data;
  this.logoInfo = infologoInfo.data
  
                },
                //注册
                async registerFunc(){
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
            if(this.is_tk===false){
                 this.$message.info(this.$t('请勾选协议'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.post(global.apiUrls.post5cad9f63e4f94, {
    mobile:this.mobile,code:this.code,type:'1',password:this.password,invite_code:this.invite_code
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
                this.$store.commit('saveToken', this.dataList.userinfo.user_token)
                this.$store.commit('updateUserInfo', this.dataList.userinfo)
                    uni.showToast({
                        title:this.$t('注册成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                setTimeout(()=>{
            this.$urouter.switchTab(`/pages/tabBar/home/home`);
      },500)
                },
                //发送验证码校验勾选协议
                 sendCodeFunc(){
                        if( this.is_tk===false){
                            uni.showToast({
                        title:this.$t('请勾选协议'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                return
    }
    else{
                        this.$refs.vCode1750660719553.sendVerificationCode()
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
            background:url(#{image-path('1.png')}) no-repeat;background-size: 100% auto;
            .registerPage_flex_2_babdd{
        padding:0rpx 56rpx 0rpx 56rpx;
        .registerPage_fd2_0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;padding:0rpx 32rpx 0rpx 32rpx;margin:124rpx 0rpx 32rpx 0rpx;
    }    .registerPage_fd2_2_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;margin:32rpx 0rpx 32rpx 0rpx;padding:0rpx 32rpx 0rpx 32rpx;
        .registerPage_fd2_2_c1_icon1_babdd{
        width:88rpx;line-height:88rpx;text-align:center;font-size:40rpx;color:var(--benbeniconColor2);
    }    .registerPage_fd2_2_c1_icon2_babdd{
        width:88rpx;line-height:88rpx;text-align:center;font-size:40rpx;
    }}    .registerPage_fd2_4_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:638rpx;height:88rpx;line-height:88rpx;margin:78rpx 0rpx 32rpx 0rpx;
    }    .registerPage_fd2_5_c0_babdd{
        color:var(--benbenFontColor2);font-size:28rpx;font-weight:400;line-height:40rpx;
    }    .registerPage_fd2_5_c1_babdd{
        color:var(--benbenFontColor4);font-size:28rpx;font-weight:400;line-height:40rpx;
    }    .registerPage_fd2_6_babdd{
        width:750rpx;position:fixed;bottom:calc(48rpx + var(--benben-window-bottom,0px));left:0rpx;
        .registerPage_checkfd2_6_c0_c0_c0_babdd{
        color:var(--benbeniconColor0);font-size:32rpx;
    }    .registerPage_noCheckfd2_6_c0_c1_c0_babdd{
        color:var(--benbeniconColor3);font-size:32rpx;
    }    .registerPage_fd2_6_c1_babdd{
        color:var(--benbenFontColor2);font-size:28rpx;font-weight:400;line-height:33rpx;margin:0rpx 0rpx 0rpx 16rpx;
    }    .registerPage_fd2_6_c3_babdd{
        color:var(--benbenFontColor2);font-size:28rpx;font-weight:400;line-height:33rpx;
    }}}
    .registerPage_fd2_0_c0_babdd{
        color:var(--benbeniconColor2);font-size:32rpx;
    }
    .registerPage_fd2_0_c1_babdd{
        height:88rpx;margin:0rpx 0rpx 0rpx 32rpx;color:var(--benbenFontColor0);font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .registerPage_fd2_1_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;padding:0rpx 32rpx 0rpx 32rpx;
        .registerPage_fd2_1_c2_babdd{
        line-height:40rpx;font-size:28rpx;color:var(--benbenFontColor4);font-weight:400;
    }}
    .registerPage_fd2_6_c2_babdd{
        color:var(--benbenFontColor4);font-size:28rpx;font-weight:400;line-height:33rpx;
    }
    .registerPage_fd1_0_babdd{
        margin:88rpx 0rpx 40rpx 0rpx;
        .registerPage_fd1_0_c0_babdd{
        width:148rpx;height:148rpx;border-radius:44rpx;
    }}
    .registerPage_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;
    }
    .registerPage_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .registerPage_fd0_0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);margin:0rpx 0rpx 0rpx 032rpx;font-weight:500;
    }}}
    ::v-deep .registerPage_fd2_2_c1_babdd{
        height:88rpx;width:500rpx;font-size:32rpx;margin:0rpx 0rpx 0rpx 32rpx;color:var(--benbenFontColor0);
    }
</style>