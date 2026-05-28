<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePayPwdMessageCode_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between changePayPwdMessageCode_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center changePayPwdMessageCode_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  changePayPwdMessageCode_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='changePayPwdMessageCode_fd0_0_c1_c0_babdd'  >{{$t('修改支付密码')}}</text>
</view>
    <view   class='flex align-center justify-end changePayPwdMessageCode_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---修改支付密码-短信验证flex布局开始-->
 <view class="flex flex-direction align-center benben-flex-layout changePayPwdMessageCode_flex_1_babdd"    >
        <text class='changePayPwdMessageCode_fd1_0_babdd'  >{{$t('我们要对您绑定的手机号进行验证：')}}</text>
<text class='changePayPwdMessageCode_fd1_1_babdd'  >{{dataMessage.mobile}}</text>
<benben-digital-password  :box-num='4' mode='number' class-text='flex flex align-center justify-center changePayPwdMessageCode_fd1_2_babdd'    v-model="code" :init-open.sync="xianshi">
<template #default="{ content, active, index }">
<view :key="index" v-if="active" class="flex align-center justify-center active-digital-password changePayPwdMessageCode_flex_password_active_fd1_2_babdd" >
  {{ content }}
</view>
<view :key="index" v-else class="flex align-center justify-center changePayPwdMessageCode_flex_password_active_fd1_2_babdd" >
  {{ content }}
</view>
</template>
</benben-digital-password>
    <view   class='flex flex-wrap align-center justify-center'      >
        <benben-send-verification-code key='1750496656325' ref="vCode1750496656325" class=' changePayPwdMessageCode_fd1_3_c0_babdd'  :after-text="$t('后重新获取')" :before-text="$t('获取验证码')" type='3' :is-environment-verification='true'  :phone="dataMessage._mobile" ></benben-send-verification-code>
</view>
<button class='changePayPwdMessageCode_fd1_4_babdd'  @tap.stop="checkCodeFunc()"  >{{$t('下一步')}}</button>
</view>
        
<!---修改支付密码-短信验证flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"code":"","mobile":"13569653325",/** follow_count【关注的店铺数量】
*   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
*   nickname【昵称】
*   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
*   total_money【会员总金额】
*   browse_count【足迹数量】
*   collection_count【收藏数量】
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
*   invite_code【邀请码】 **/ "dataMessage":{"invite_code":"","address":"","address_code":"","hobby":"","tags":"","id":0,"userlevel_id":0,"mobile":"","real_name":"","avatar":"","account":"","email":"","birthday":"","gender":"","create_time":"","user_money":"","freeze_money":"","total_consumption_money":"","score":"","_mobile":"","coupon":0,"collection_count":0,"browse_count":0,"total_money":0,"certified":0,"nickname":"","is_pay_password":0,"follow_count":0},"xianshi":true};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.getUserinfoFunc()
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
            
            
                            //个人中心-获取会员详细信息
                async getUserinfoFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post5c78c4772da97, {
    
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
                },
                //校验验证码
                async checkCodeFunc(){
                                if(!validate(this.code,'require')){
                 this.$message.info(this.$t('请输入验证码'));
                 return false;
            }
            if(!validate(this.code,'captcha')){
                 this.$message.info(this.$t('请输入正确的验证码'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data5f6db4db8abcf = await this.$api.post(global.apiUrls.post5f6db4db8abcf, {
    mobile:this.dataMessage._mobile,code:this.code,type:'3'
  });
  
  if (data5f6db4db8abcf.data.code != 1) {
    this.$message.info(data5f6db4db8abcf.data.msg);
    return
  } 
  let info5f6db4db8abcf = data5f6db4db8abcf.data;
  
  
    this.$urouter.redirectTo(`/pages/xtsz/againSetUpPayPwd/againSetUpPayPwd?type=2`);
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
            .changePayPwdMessageCode_flex_1_babdd{
        padding:103rpx 0rpx 0rpx 0rpx;
        .changePayPwdMessageCode_fd1_0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }    .changePayPwdMessageCode_fd1_1_babdd{
        margin:51rpx 0rpx 40rpx 0rpx;line-height:37rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .changePayPwdMessageCode_fd1_3_c0_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor4);text-align:center;
    }    .changePayPwdMessageCode_fd1_4_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);margin:80rpx 56rpx 0rpx 56rpx;height:88rpx;line-height:88rpx;width:638rpx;
    }}
    .changePayPwdMessageCode_flex_password_active_fd1_2_babdd{
        width:100rpx;height:100rpx;border:1px solid var(--benbenbdColor0);color:var(--benbenFontColor0);background:var(--benbenbgColor2);background-size:100% auto;
    }
    .changePayPwdMessageCode_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .changePayPwdMessageCode_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .changePayPwdMessageCode_fd0_0_c0_babdd{
        width:100rpx;
        .changePayPwdMessageCode_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .changePayPwdMessageCode_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .changePayPwdMessageCode_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
    ::v-deep .changePayPwdMessageCode_fd1_2_babdd{
        width:750rpx;height:160rpx;
    }
</style>