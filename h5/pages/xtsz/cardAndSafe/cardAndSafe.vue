<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex cardAndSafe_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between cardAndSafe_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center cardAndSafe_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  cardAndSafe_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='cardAndSafe_fd0_0_c1_c0_babdd'  >{{$t('账号与安全')}}</text>
</view>
    <view   class='flex align-center justify-end cardAndSafe_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>

 <view class="flex flex-direction flex-wrap align-stretch cardAndSafe_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center justify-between cardAndSafe_fd1_0_babdd'   @tap.stop="gophoneFunc()" v-if= " appSystemIdentification!='Wechat'"  >
        <text class='cardAndSafe_fd1_0_c0_babdd'    v-if= " dataBack.falg=='1'"  >{{$t('修改密码')}}</text><text class='cardAndSafe_fd1_0_c0_babdd'    v-if= " dataBack.falg!='1'"  >{{$t('设置密码')}}</text>
<text class='fu-iconfont2  cardAndSafe_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between cardAndSafe_fd1_1_babdd'   @tap.stop="goPaymentPasswordFunc()"   >
        <text class='cardAndSafe_fd1_0_c0_babdd'    v-if= " is_paymentPassword.falg=='1'"  >{{$t('修改支付密码')}}</text><text class='cardAndSafe_fd1_0_c0_babdd'    v-if= " is_paymentPassword.falg!='1'"  >{{$t('设置支付密码')}}</text>
<text class='fu-iconfont2  cardAndSafe_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between cardAndSafe_fd1_2_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/changeBingDingPhone/changeBingDingPhone`"   >
        <text class='cardAndSafe_fd1_0_c0_babdd'  >{{$t('修改绑定手机号')}}</text>
<text class='fu-iconfont2  cardAndSafe_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between cardAndSafe_fd1_2_babdd'    v-if= " dataDetails.email!=''"  >
        <text class='cardAndSafe_fd1_0_c0_babdd'  >{{$t('修改绑定邮箱号')}}</text>
<text class='fu-iconfont2  cardAndSafe_fd1_0_c1_babdd'  >&#xE7F2;</text>
</view>
</view>
        

    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** falg【是否设置密码 0未设置 1已设置】 **/ "dataBack":{"falg":0},/** falg【是否已设置支付密码0 未设置 1 已设置】 **/ "is_paymentPassword":{"falg":0},/** seller_code【聊天客服商户code】
*   seller_member_id【客服企业ID】
*   autograph【简介】
*   background【背景图】
*   is_cancel【是否需要弹窗提醒确认注销】
*   login_url【后台登录地址】
*   is_close【是否开启签到】
*   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
*   nickname【昵称】
*   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
*   total_money【会员总金额】
*   _mobile【手机号不带*号】
*   score【积分余额】
*   total_consumption_money【总消费金额】
*   freeze_money【会员冻结金额】
*   user_money【会员余额】
*   gender【性别 1 男 2 女】
*   birthday【生日】
*   email【邮箱】
*   account【登录账号】
*   avatar【头像】
*   real_name【真实姓名】
*   mobile【手机号带*号】
*   userlevel_id【会员级别】
*   id【会员ID】
*   tags【标签】
*   hobby【爱好】
*   address_code【地址编码】
*   address【地址】
*   invite_code【邀请码】 **/ "dataDetails":{"invite_code":"","address":"","address_code":"","hobby":"","tags":"","id":0,"userlevel_id":0,"mobile":"","real_name":"","avatar":"","account":"","email":"","birthday":"","gender":"","create_time":"","user_money":"","freeze_money":"","total_consumption_money":"","score":"","_mobile":"","coupon":0,"total_money":0,"certified":0,"nickname":"","is_pay_password":0,"is_close":0,"login_url":"","is_cancel":0,"background":"","autograph":"","seller_member_id":"","seller_code":""}};
		},
		computed:{
                  /**
     * @returns 
      * Android       安卓
      * IOS       苹果
      * Web       H5 或 pc
      * Wechat       微信小程序
      * Alipay       支付宝小程序
      * Baidu       百度小程序
      * ByteBounce       抖音小程序
      * 360       360小程序
      * FastApp       快应用
    */
    appSystemIdentification() {
      return this.$store.state.appSystemIdentification
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
            this.getnp51fc90e80fd4Func()
this.getllf64a4d364b44Func()
this.getwec78c4772da97Func()
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
            
            
                            //登录注册-检验是否设置支付密码
                async getnp51fc90e80fd4Func(){
                        //请求方法
    //数据验证
    
    
  let datadataBack = await this.$api.get(global.apiUrls.post651fc90e80fd4, {
    
  });
  
  if (datadataBack.data.code != 1) {
    this.$message.info(datadataBack.data.msg);
    return
  } 
  let infodataBack = datadataBack.data;
  this.dataBack = infodataBack.data
  
                },
                //登录密码跳转
                 gophoneFunc(){
                        if( this.dataBack.falg=='1'){
            this.$urouter.navigateTo(`/pages/xtsz/changePwd/changePwd`);
    }
    else{
            this.$urouter.navigateTo(`/pages/xtsz/changePwdPhoneCode/changePwdPhoneCode?name=设置密码`);
    }
                },
                //订单支付-检测支付密码
                async getllf64a4d364b44Func(){
                        //请求方法
    //数据验证
    
    
  let datais_paymentPassword = await this.$api.post(global.apiUrls.post5f64a4d364b44, {
    
  });
  
  if (datais_paymentPassword.data.code != 1) {
    this.$message.info(datais_paymentPassword.data.msg);
    return
  } 
  let infois_paymentPassword = datais_paymentPassword.data;
  this.is_paymentPassword = infois_paymentPassword.data
  
                },
                //支付密码跳转
                 goPaymentPasswordFunc(){
                        if( this.is_paymentPassword.falg=='1'){
            this.$urouter.navigateTo(`/pages/xtsz/changePayPwd/changePayPwd`);
    }
    else{
            this.$urouter.navigateTo(`/pages/xtsz/payment/payment`);
    }
                },
                //个人中心-获取会员详细信息
                async getwec78c4772da97Func(){
                        //请求方法
    //数据验证
    
    
  let datadataDetails = await this.$api.get(global.apiUrls.post5c78c4772da97, {
    
  });
  
  if (datadataDetails.data.code != 1) {
    this.$message.info(datadataDetails.data.msg);
    return
  } 
  let infodataDetails = datadataDetails.data;
  this.dataDetails = infodataDetails.data
  
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
            .cardAndSafe_flex_1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 32rpx 0rpx 32rpx;
        .cardAndSafe_fd1_0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }    .cardAndSafe_fd1_1_babdd{
        border-bottom:1px solid var(--benbenbdColor0);padding:32rpx 0rpx 32rpx 0rpx;
    }}
    .cardAndSafe_fd1_0_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .cardAndSafe_fd1_0_c1_babdd{
        font-size:26rpx;color:var(--benbeniconColor2);font-weight:400;
    }
    .cardAndSafe_fd1_2_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid #eee;
    }
    .cardAndSafe_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .cardAndSafe_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .cardAndSafe_fd0_0_c0_babdd{
        width:100rpx;
        .cardAndSafe_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .cardAndSafe_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .cardAndSafe_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>