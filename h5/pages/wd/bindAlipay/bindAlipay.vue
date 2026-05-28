<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex bindAlipay_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub bindAlipay_fd0_0_babdd'      >
            <view   class='flex align-center bindAlipay_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  bindAlipay_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='bindAlipay_fd0_0_c1_c0_babdd'  >{{$t('绑定支付宝')}}</text>
</view>
    <view   class='flex align-center bindAlipay_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---绑定支付宝flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout bindAlipay_flex_1_babdd"    >
            <view   class='flex flex-direction align-stretch bindAlipay_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center bindAlipay_fd1_0_c0_babdd'      >
        <text class='bindAlipay_fd1_0_c0_c0_babdd'  >{{$t('第一步：先获取手机验证码')}}</text>
</view>
    <view   class='flex flex-wrap align-center bindAlipay_fd1_0_c1_babdd'      >
        <text class='bindAlipay_fd1_0_c1_c0_babdd'  >{{$t('绑定的用户手机')}}</text>
<text class='bindAlipay_fd1_0_c1_c0_babdd'  >{{dataMessage.mobile}}</text>
</view>
    <view   class='flex align-baseline bindAlipay_fd1_0_c2_babdd'      >
        <text class='bindAlipay_fd1_0_c2_c0_babdd'  >{{$t('验证码')}}</text>
<benben-input class='flex-sub bindAlipay_fd1_0_c2_c1_babdd'   type="number" :placeholder="$t('请输入验证码')" confirm-type="done" :maxlength="4" placeholder-style="color:#BFBFBF;font-size:28rpx"  v-model="code" />
<benben-send-verification-code key='1689818850301' ref="vCode1689818850301" class=' bindAlipay_fd1_0_c2_c2_babdd'  :after-text="$t('后重新获取')" :before-text="$t('获取验证码')" type='3' :is-environment-verification='true'  :phone="dataMessage._mobile" ></benben-send-verification-code>
</view>
    <view   class='flex flex-wrap align-center bindAlipay_fd1_0_c3_babdd'      >
        <text class='bindAlipay_fd1_0_c0_c0_babdd'  >{{$t('第二步：上传支付宝收款二维码')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-start bindAlipay_fd1_0_c4_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <benben-image-upload :path.sync="dataBangding.qrcode_url" :img-id.sync="dataBangding.qrcode_url" :is-cropping="false" :is-show-clean="true"  class="upload position-relative bindAlipay_fd1_0_c4_c0_c0_babdd">
    <benben-clean-icon v-if="dataBangding.qrcode_url" class='fu-iconfont2 position-absolute bindAlipay_fd1_0_c4_c0_c0_icon_babdd'   hand-name="benben-image-upload" hand-method="delImage">&#xE8E7;</benben-clean-icon>
     <image class=" bindAlipay_fd1_0_c4_c0_c0_babdd" mode="aspectFit"  :src="dataBangding.qrcode_url ? dataBangding.qrcode_url : STATIC_URL+'351.png'"></image>
</benben-image-upload>
</view>
<text class='bindAlipay_fd1_0_c4_c1_babdd'  >{{$t('上传二维码')}}</text>
</view>
    <view   class='flex flex-wrap align-center bindAlipay_fd1_0_c1_babdd'      >
        <text class='bindAlipay_fd1_0_c0_c0_babdd'  >{{$t('第三步：填写支付宝真实姓名')}}</text>
</view>
    <view   class='flex align-baseline bindAlipay_fd1_0_c6_babdd'      >
        <text class='bindAlipay_fd1_0_c6_c0_babdd'  >{{$t('真实姓名')}}</text>
<benben-input class='flex-sub bindAlipay_fd1_0_c2_c1_babdd'   type="text" :placeholder="$t('请输入真实姓名')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"  v-model="dataBangding.real_name" />
</view>
</view>
    <view   class='flex flex-wrap align-center justify-center bindAlipay_fd1_1_babdd'      >
        <button class='bindAlipay_fd1_1_c0_babdd'  @tap.stop="queryListFunc()"  >{{$t('提交')}}</button>
</view>
</view>
        
<!---绑定支付宝flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** follow_count【关注的店铺数量】
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
*   invite_code【邀请码】 **/ "dataMessage":{"invite_code":"","address":"","address_code":"","hobby":"","tags":"","id":0,"userlevel_id":0,"mobile":"","real_name":"","avatar":"","account":"","email":"","birthday":"","gender":"","create_time":"","user_money":"","freeze_money":"","total_consumption_money":"","score":"","_mobile":"","coupon":0,"collection_count":0,"browse_count":0,"total_money":0,"certified":0,"nickname":"","is_pay_password":0,"follow_count":0},/** remark【备注】
*   bank_address【开户行】
*   bank_name【银行名称】
*   qrcode_url【收款二维码图片】
*   account【提现账户】
*   real_name【真实姓名】
*   status【状态】
*   update_time【更新时间】
*   create_time【创建时间】
*   is_default【设为默认】
*   aid【ID】 **/ "dataBangding":{"aid":"","is_default":"","create_time":"","update_time":"","status":"","real_name":"","account":"","qrcode_url":"","bank_name":"","bank_address":"","remark":""},"code":"","type":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {type}=options
if (type !== undefined) this.type = type
this.getUserinfoFunc()
this.getbangdingFunc()
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
            
            
                            //钱包-设置提现账户
                async queryListFunc(){
                                if(!validate(this.code,'require')){
                 this.$message.info(this.$t('请输入验证码'));
                 return false;
            }
            if(!validate(this.code,'captcha')){
                 this.$message.info(this.$t('请输入正确的验证码'));
                 return false;
            }
            if(!validate(this.dataBangding.qrcode_url,'require')){
                 this.$message.info(this.$t('请上传二维码'));
                 return false;
            }
            if(!validate(this.dataBangding.real_name,'require')){
                 this.$message.info(this.$t('请输入真实姓名'));
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
  
  
    //请求方法
    //数据验证
    
    
  let data636cc0cc8d6cc = await this.$api.post(global.apiUrls.post636cc0cc8d6cc, {
    real_name:this.dataBangding.real_name,account_type:'alipay',qrcode_url:this.dataBangding.qrcode_url
  });
  
  if (data636cc0cc8d6cc.data.code != 1) {
    this.$message.info(data636cc0cc8d6cc.data.msg);
    return
  } 
  let info636cc0cc8d6cc = data636cc0cc8d6cc.data;
  
  
                    this.$message.info('支付宝绑定成功');
                setTimeout(()=>{
                    this.$urouter.navigateBack(1);
      },500)
                },
                //获取绑定信息
                async getbangdingFunc(){
                        if( this.type=='1'){
            //请求方法
    //数据验证
    
    
  let datadataBangding = await this.$api.get(global.apiUrls.post636cbb376d5d8, {
    account_type:'alipay'
  });
  
  if (datadataBangding.data.code != 1) {
    this.$message.info(datadataBangding.data.msg);
    return
  } 
  let infodataBangding = datadataBangding.data;
  this.dataBangding = infodataBangding.data
  
    }
                },
                //获取会员详细信息
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
            .bindAlipay_flex_1_babdd{
        padding:0rpx 0rpx 150rpx 0rpx;
        .bindAlipay_fd1_0_babdd{
        padding:0rpx 32rpx 32rpx 32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .bindAlipay_fd1_0_c0_babdd{
        padding:40rpx 0rpx 32rpx 0rpx;
    }    .bindAlipay_fd1_0_c2_babdd{
        padding:0rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
        .bindAlipay_fd1_0_c2_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);margin:0rpx 24rpx 0rpx 0rpx;
    }    .bindAlipay_fd1_0_c2_c2_babdd{
        text-align:center;font-size:28rpx;color:var(--benbenFontColor4);font-weight:400;
    }}    .bindAlipay_fd1_0_c3_babdd{
        margin:40rpx 0rpx 32rpx 0rpx;
    }    .bindAlipay_fd1_0_c4_babdd{
        padding:0rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);margin:0rpx 0rpx 40rpx 0rpx;
        .bindAlipay_fd1_0_c4_c1_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor2);margin:24rpx 0rpx 0rpx 0rpx;
    }}    .bindAlipay_fd1_0_c6_babdd{
        padding:0rpx 0rpx 32rpx 0rpx;line-height:48rpx;
        .bindAlipay_fd1_0_c6_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);margin:0rpx 32rpx 0rpx 0rpx;
    }}}    .bindAlipay_fd1_1_babdd{
        width:750rpx;position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));
        .bindAlipay_fd1_1_c0_babdd{
        border-radius:40rpx 40rpx 40rpx 40rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:80rpx;line-height:80rpx;font-weight:700;
    }}}
    .bindAlipay_fd1_0_c0_c0_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);
    }
    .bindAlipay_fd1_0_c1_babdd{
        margin:0rpx 0rpx 32rpx 0rpx;
    }
    .bindAlipay_fd1_0_c1_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);
    }
    .bindAlipay_fd1_0_c2_c1_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .bindAlipay_fd1_0_c4_c0_c0_babdd{
        width:160rpx;height:160rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
        .bindAlipay_fd1_0_c4_c0_c0_icon_babdd{
        top:0rpx;right:0rpx;z-index:10;color:#ff5536;
    }}
    .bindAlipay_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .bindAlipay_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .bindAlipay_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .bindAlipay_fd0_0_c0_babdd{
        width:180rpx;
        .bindAlipay_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>