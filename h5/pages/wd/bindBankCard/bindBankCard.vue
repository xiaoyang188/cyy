<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex bindBankCard_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub bindBankCard_fd0_0_babdd'      >
            <view   class='flex align-center bindBankCard_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  bindBankCard_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='bindBankCard_fd0_0_c1_c0_babdd'  >{{$t('绑定银行卡')}}</text>
</view>
    <view   class='flex align-center bindBankCard_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout bindBankCard_flex_1_babdd"    >
            <view   class='flex flex-direction align-stretch bindBankCard_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center bindBankCard_fd1_0_c0_babdd'      >
        <text class='bindBankCard_fd1_0_c0_c0_babdd'  >{{$t('持卡人姓名')}}</text>
<benben-input class='flex-sub bindBankCard_fd1_0_c0_c1_babdd'   type="text" :placeholder="$t('请输入真实姓名')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="dataBangding.real_name" />
</view>
    <view   class='flex flex-wrap align-center bindBankCard_fd1_0_c0_babdd'      >
        <text class='bindBankCard_fd1_0_c0_c0_babdd'  >{{$t('银行名称')}}</text>
<benben-input class='flex-sub bindBankCard_fd1_0_c0_c1_babdd'   type="text" :placeholder="$t('请输入银行名称')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="dataBangding.bank_name" />
</view>
    <view   class='flex flex-wrap align-center bindBankCard_fd1_0_c0_babdd'      >
        <text class='bindBankCard_fd1_0_c0_c0_babdd'  >{{$t('银行卡号')}}</text>
<benben-input class='flex-sub bindBankCard_fd1_0_c0_c1_babdd'   type="text" :placeholder="$t('请输入银行卡号')" confirm-type="done" :maxlength="19" placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="dataBangding.account" />
</view>
    <view   class='flex flex-wrap align-center bindBankCard_fd1_0_c3_babdd'      >
        <text class='bindBankCard_fd1_0_c0_c0_babdd'  >{{$t('开户行')}}</text>
<benben-input class='flex-sub bindBankCard_fd1_0_c0_c1_babdd'   type="text" :placeholder="$t('请输入开户行')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="dataBangding.bank_address" />
</view>
</view>
    <view   class='flex flex-wrap align-center justify-center bindBankCard_fd1_1_babdd'      >
        <button class='bindBankCard_fd1_1_c0_babdd'  @tap.stop="postBankFunc()"  >{{$t('提交')}}</button>
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
			return {/** remark【备注】
*   bank_address【开户行】
*   bank_name【银行名称】
*   qrcode_url【收款二维码图片】
*   account【提现账户】
*   real_name【真实姓名】
*   status【状态】
*   update_time【更新时间】
*   create_time【创建时间】
*   is_default【设为默认】
*   aid【ID】 **/ "dataBangding":{"aid":"","is_default":"","create_time":"","update_time":"","status":"","real_name":"","account":"","qrcode_url":"","bank_name":"","bank_address":"","remark":""},"type":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {type}=options
if (type !== undefined) this.type = type
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
            
            
                            //绑定银行卡
                async postBankFunc(){
                                if(!validate(this.dataBangding.real_name,'require')){
                 this.$message.info(this.$t('请输入真实姓名'));
                 return false;
            }
            if(!validate(this.dataBangding.bank_name,'require')){
                 this.$message.info(this.$t('请输入银行名称'));
                 return false;
            }
            if(!validate(this.dataBangding.account,'require')){
                 this.$message.info(this.$t('请输入银行卡号'));
                 return false;
            }
            if(!validate(this.dataBangding.account,'card')){
                 this.$message.info(this.$t('请输入正确的银行卡号'));
                 return false;
            }
            if(!validate(this.dataBangding.bank_address,'require')){
                 this.$message.info(this.$t('请输入开户行'));
                 return false;
            }
            if(!validate(this.dataBangding.bank_address,'regular',/^(?![0-9]+$)[\u4e00-\u9fa5a-zA-Z0-9]+$/)){
                 this.$message.info(this.$t('请输入正确的开户行'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data636cc0cc8d6cc = await this.$api.post(global.apiUrls.post636cc0cc8d6cc, {
    real_name:this.dataBangding.real_name,account_type:'bank',account:this.dataBangding.account,qrcode_url:this.dataBangding.qrcode_url,bank_name:this.dataBangding.bank_name,bank_address:this.dataBangding.bank_address,remark:this.dataBangding.remark
  });
  
  if (data636cc0cc8d6cc.data.code != 1) {
    this.$message.info(data636cc0cc8d6cc.data.msg);
    return
  } 
  let info636cc0cc8d6cc = data636cc0cc8d6cc.data;
  
  
                    this.$message.info('银行卡绑定成功');
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
    account_type:'bank'
  });
  
  if (datadataBangding.data.code != 1) {
    this.$message.info(datadataBangding.data.msg);
    return
  } 
  let infodataBangding = datadataBangding.data;
  this.dataBangding = infodataBangding.data
  
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
            background:var(--benbenbgColor0);background-size: 100% auto;
            .bindBankCard_flex_1_babdd{
        padding:0rpx 0rpx 150rpx 0rpx;
        .bindBankCard_fd1_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .bindBankCard_fd1_0_c3_babdd{
        height:109rpx;
    }}    .bindBankCard_fd1_1_babdd{
        width:750rpx;position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));
        .bindBankCard_fd1_1_c0_babdd{
        border-radius:40rpx 40rpx 40rpx 40rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:80rpx;line-height:80rpx;font-weight:700;
    }}}
    .bindBankCard_fd1_0_c0_babdd{
        height:109rpx;border-bottom:1px solid var(--benbenbdColor0);
    }
    .bindBankCard_fd1_0_c0_c0_babdd{
        width:210rpx;line-height:43rpx;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .bindBankCard_fd1_0_c0_c1_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .bindBankCard_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .bindBankCard_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .bindBankCard_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .bindBankCard_fd0_0_c0_babdd{
        width:180rpx;
        .bindBankCard_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>