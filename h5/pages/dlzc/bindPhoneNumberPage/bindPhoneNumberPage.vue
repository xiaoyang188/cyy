<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex bindPhoneNumberPage_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center bindPhoneNumberPage_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  bindPhoneNumberPage_fd0_0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center bindPhoneNumberPage_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---登录头部flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
            <view   class='flex flex-wrap align-center justify-center bindPhoneNumberPage_fd1_0_babdd'      >
        <image class='bindPhoneNumberPage_fd1_0_c0_babdd'  mode="aspectFit"  :src='logoInfo.app_logo'></image>
</view>
</view>
        
<!---登录头部flex布局结束-->
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout bindPhoneNumberPage_flex_2_babdd"    >
            <view   class='flex flex-wrap align-center bindPhoneNumberPage_fd2_0_babdd'      >
        <text class='fu-iconfont2  bindPhoneNumberPage_fd2_0_c0_babdd'  >&#xe72b;</text>
<benben-input class='flex-sub bindPhoneNumberPage_fd2_0_c1_babdd'   type="number" :placeholder="$t('请输入手机号')" confirm-type="done" :maxlength="11" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="mobile" />
</view>
    <view   class='flex flex-wrap align-center bindPhoneNumberPage_fd2_1_babdd'      >
        <text class='fu-iconfont2  bindPhoneNumberPage_fd2_0_c0_babdd'  >&#xe838;</text>
<benben-input class='flex-sub bindPhoneNumberPage_fd2_0_c1_babdd'   type="number" :placeholder="$t('请输入验证码')" confirm-type="done" :maxlength="4" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="code" />
<benben-send-verification-code key='1686885616924' ref="vCode1686885616924" class=' bindPhoneNumberPage_fd2_1_c2_babdd'  :after-text="$t('后重新获取')" :before-text="$t('获取验证码')" type='5' :is-environment-verification='true'  :phone="mobile" :parameter = "typeMessage"></benben-send-verification-code>
</view>
    <view   class='flex flex-wrap align-center bindPhoneNumberPage_fd2_2_babdd'      >
        <text class='fu-iconfont2  bindPhoneNumberPage_fd2_0_c0_babdd'  >&#xe730;</text>
<benben-flex-password-diy v-model="password" class-text="flex flex align-center bindPhoneNumberPage_fd2_2_c1_babdd"  :placeholder="$t('请输入密码(6~12位字母+数字)')" :maxlength="12" :default-type='true' placeholder-style="color:var(--benbenFontColor2);font-size:28rpx" >
      <template #show>
        <text class='fu-iconfont2  bindPhoneNumberPage_fd2_2_c1_icon1_babdd'   data-type="show">&#xE837;</text>
      </template>
      <template #hide>
        <text class='fu-iconfont2  bindPhoneNumberPage_fd2_2_c1_icon2_babdd'   data-type="hide">&#xEBCC;</text>
      </template>
    </benben-flex-password-diy>
</view>
    <view   class='flex flex-wrap align-center bindPhoneNumberPage_fd2_1_babdd'      >
        <text class='fu-iconfont2  bindPhoneNumberPage_fd2_0_c0_babdd'  >&#xe63c;</text>
<benben-input class='flex-sub bindPhoneNumberPage_fd2_0_c1_babdd'   type="text" :placeholder="$t('请输入邀请码（选填）')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="invite_code" />
</view>
<button class='bindPhoneNumberPage_fd2_4_babdd'  @tap.stop="bangdmobileFunc()"  >{{$t('确定')}}</button>
</view>
        
<!---flex布局flex布局结束-->
<benben-popup v-model="popupShow1750671741738" :mask="true" :mask-close-able="true"  mode='center' :z-index='999' >
    <!---是否取消注销-绑定手机号flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
            <view   class='flex flex-direction flex-wrap align-center bindPhoneNumberPage_fd3_0_babdd'      >
        <text class='bindPhoneNumberPage_fd3_0_c0_babdd'  >{{$t('温馨提示')}}</text>
<text class='bindPhoneNumberPage_fd3_0_c1_babdd'  >{{$t('您已申请注销，是否取消申请？确认后可正常登录，取消将无法登录。')}}</text>
    <view   class='flex align-center bindPhoneNumberPage_fd3_0_c2_babdd'      >
        <button class='bindPhoneNumberPage_fd3_0_c2_c0_babdd'  @tap.stop="noCancelOutFunc()"  >{{$t('取消')}}</button>
<button class='bindPhoneNumberPage_fd3_0_c2_c1_babdd'  @tap.stop="cancelOutFunc()"  >{{$t('确认')}}</button>
</view>
</view>
</view>
        
<!---是否取消注销-绑定手机号flex布局结束-->
    
</benben-popup>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"popupShow1750671741738":false,/** logoInfo【lago信息】
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
*   tel【客服电话】 **/ "logoInfo":{"tel":"","time":"","web_site_address":"","web_site_bgimg":"","web_site_email":"","web_site_copyright":"","app_icp":"","license":"","shop_app_icp":"","web_site_title":"","app_logo":"","wechat_share_img":0,"wechat_share_title":""},"is_tk":false,"code":"","password":"",/** userinfo【用户信息】
*   is_cancel【是否注销】
*   phone【手机号，不带*号】
*   client_id【推送标识】
*   birthday【生日】
*   mobile【手机号，带*号】
*   gender【性别】
*   email【邮箱】
*   nickname【昵称】
*   real_name【真实姓名】
*   avatar【头像】
*   id【用户ID】
*   user_token【用户标识】 **/ "dataUserInfo":{"userinfo":{"user_token":"","id":0,"avatar":"","real_name":"","nickname":"","email":"","gender":"","mobile":"","birthday":"","client_id":"","phone":"","is_cancel":0}},"invite_code":"","mobile":"","typeMessage":{"type":"7"},"third_type":"wx_app","extend_info":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {third_type,extend_info}=options
if (third_type !== undefined) this.third_type = third_type
if (extend_info !== undefined) this.extend_info = extend_info
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
            
            
                            //不取消
                 noCancelOutFunc(){
                                    this.$store.commit('logout')
    this.popupShow1750671741738 = false;
                },
                //取消注销
                async cancelOutFunc(){
                        //请求方法
    //数据验证
    
    
  let data661a5adf8203b = await this.$api.post(global.apiUrls.post661a5adf8203b, {
    user_id:this.dataUserInfo.userinfo.id
  });
  
  if (data661a5adf8203b.data.code != 1) {
    this.$message.info(data661a5adf8203b.data.msg);
    return
  } 
  let info661a5adf8203b = data661a5adf8203b.data;
  
  
    this.popupShow1750671741738 = false;
                    uni.showToast({
                        title:this.$t('登录成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                this.$store.commit('saveToken', this.dataUserInfo.userinfo.user_token)
                this.$store.commit('updateUserInfo', this.dataUserInfo.userinfo)
                setTimeout(()=>{
            this.$urouter.navigateTo(`/pages/tabBar/home/home`);
      },500)
                },
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
                //绑定手机号
                async bangdmobileFunc(){
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
        let tempData = uni.getStorageSync('Wxinfo_tmp')
        let uinfo = tempData ? JSON.stringify(JSON.parse(tempData)) : '{}'
        //{"openid":"","unionid":"","gender":"","nickname":"","avatar":"","code":""}
        let datadataUserInfo = await this.$api.post(global.apiUrls.post5d7757d28d076, {
          account: this.mobile,
          code: this.code,
          code_type: '5',
          password: this.password,
          invite_code: this.invite_code,
          account_type: 'mobile',
          third_type: this.third_type,
          extend_info: uinfo
        });

        if (datadataUserInfo.data.code != 1) {
          this.$message.info(datadataUserInfo.data.msg);
          return
        }
        let infodataUserInfo = datadataUserInfo.data;
        this.dataUserInfo = infodataUserInfo.data
    if( this.dataUserInfo.userinfo.is_cancel==0){
                            uni.showToast({
                        title:this.$t('绑定成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                this.$store.commit('saveToken', this.dataUserInfo.userinfo.user_token)
                this.$store.commit('updateUserInfo', this.dataUserInfo.userinfo)
                setTimeout(()=>{
            this.$urouter.switchTab(`/pages/tabBar/loginPage/loginPage`);
      },500)
    }
    else{
            this.popupShow1750671741738 = true;
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
            .bindPhoneNumberPage_fd3_0_babdd{
        width:540rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;
        .bindPhoneNumberPage_fd3_0_c0_babdd{
        line-height:44rpx;font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:40rpx 0rpx 0rpx 0rpx;
    }    .bindPhoneNumberPage_fd3_0_c1_babdd{
        line-height:44rpx;font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);text-align:center;margin:32rpx 40rpx 0rpx 40rpx;
    }    .bindPhoneNumberPage_fd3_0_c2_babdd{
        border-top:1px solid var(--benbenbdColor0);margin:51rpx 0rpx 0rpx 0rpx;
        .bindPhoneNumberPage_fd3_0_c2_c0_babdd{
        font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor1);width:270rpx;height:101rpx;line-height:101rpx;font-weight:400;border-right:1px solid var(--benbenbdColor0);
    }    .bindPhoneNumberPage_fd3_0_c2_c1_babdd{
        font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor5);width:270rpx;height:101rpx;line-height:101rpx;font-weight:500;
    }}}
    .bindPhoneNumberPage_flex_2_babdd{
        padding:0rpx 56rpx 0rpx 56rpx;
        .bindPhoneNumberPage_fd2_0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;padding:0rpx 32rpx 0rpx 32rpx;margin:124rpx 0rpx 32rpx 0rpx;
    }    .bindPhoneNumberPage_fd2_2_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;margin:32rpx 0rpx 32rpx 0rpx;padding:0rpx 32rpx 0rpx 32rpx;
        .bindPhoneNumberPage_fd2_2_c1_icon1_babdd{
        width:88rpx;line-height:88rpx;text-align:center;font-size:40rpx;color:var(--benbeniconColor2);
    }    .bindPhoneNumberPage_fd2_2_c1_icon2_babdd{
        width:88rpx;line-height:88rpx;text-align:center;font-size:40rpx;
    }}    .bindPhoneNumberPage_fd2_4_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:638rpx;height:88rpx;line-height:88rpx;margin:78rpx 0rpx 32rpx 0rpx;
    }}
    .bindPhoneNumberPage_fd2_0_c0_babdd{
        color:var(--benbeniconColor2);font-size:36rpx;
    }
    .bindPhoneNumberPage_fd2_0_c1_babdd{
        height:88rpx;margin:0rpx 0rpx 0rpx 32rpx;color:var(--benbenFontColor0);font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .bindPhoneNumberPage_fd2_1_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;background:var(--benbenbgColor2);box-shadow:0rpx 3rpx 6rpx 1rpx #FFF2F4;padding:0rpx 32rpx 0rpx 32rpx;
        .bindPhoneNumberPage_fd2_1_c2_babdd{
        line-height:40rpx;font-size:28rpx;color:var(--benbenFontColor4);font-weight:400;
    }}
    .bindPhoneNumberPage_fd1_0_babdd{
        margin:140rpx 0rpx 0rpx 0rpx;
        .bindPhoneNumberPage_fd1_0_c0_babdd{
        width:148rpx;height:148rpx;border-radius:44rpx;
    }}
    .bindPhoneNumberPage_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;
    }
    .bindPhoneNumberPage_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .bindPhoneNumberPage_fd0_0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);margin:0rpx 0rpx 0rpx 32rpx;
    }}}
    ::v-deep .bindPhoneNumberPage_fd2_2_c1_babdd{
        height:88rpx;width:500rpx;font-size:32rpx;margin:0rpx 0rpx 0rpx 32rpx;color:var(--benbenFontColor0);
    }
</style>