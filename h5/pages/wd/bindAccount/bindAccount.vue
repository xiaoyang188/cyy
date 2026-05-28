<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex bindAccount_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub bindAccount_fd0_0_babdd'      >
            <view   class='flex align-center bindAccount_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  bindAccount_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='bindAccount_fd0_0_c1_c0_babdd'  >{{$t('账号绑定')}}</text>
</view>
    <view   class='flex align-center bindAccount_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---绑定支付宝-微信flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout bindAccount_flex_1_babdd"    >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-wrap align-center bindAccount_fd1_0_babdd'   @tap.stop="gobangdingFunc(item.is_bind,item.method_code)"    :key='key0'>
        <image class='bindAccount_fd1_0_c0_babdd'  mode="aspectFit"  :src='item.thumb'></image>
<text class='bindAccount_fd1_0_c1_babdd'  >{{item.method_name}}</text>
<text class='bindAccount_fd1_0_c2_babdd'    v-if= "item.is_bind=='1'"  >{{$t('已绑定')}}</text><text class='bindAccount_fd1_0_c2_1_babdd'    v-if= "item.is_bind!='1'"  >{{$t('未绑定')}}</text>
<text class='fu-iconfont2  bindAccount_fd1_0_c3_babdd'  >&#xe792;</text>
</view>
    </template>
    
</view>
        
<!---绑定支付宝-微信flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"dataList":[]};
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
            this.searchAccountFunc()
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
            
            
                            //获取绑定状态
                async searchAccountFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.get(global.apiUrls.post62fc4f70a9d44, {
    scene:'money'
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
                },
                //跳转绑定
                 gobangdingFunc(is_bind,method_code){
                        if( method_code=='wx'){
            this.$urouter.navigateTo(`/pages/wd/bindWechat/bindWechat?type=${is_bind}`);
    }
    else if( method_code=='alipay'){
            this.$urouter.navigateTo(`/pages/wd/bindAlipay/bindAlipay?type=${is_bind}`);
    }
    else{
            this.$urouter.navigateTo(`/pages/wd/bindBankCard/bindBankCard?type=${is_bind}`);
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
            .bindAccount_flex_1_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 32rpx 0rpx 32rpx;
        .bindAccount_fd1_0_babdd{
        padding:36rpx 0rpx 36rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
        .bindAccount_fd1_0_c0_babdd{
        width:52rpx;height:52rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 16rpx 0rpx 0rpx;
    }    .bindAccount_fd1_0_c1_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }    .bindAccount_fd1_0_c2_babdd{
        margin:0rpx 0rpx 0rpx auto;color:var(--benbenFontColor4);font-size:32rpx;font-weight:500;
    }    .bindAccount_fd1_0_c2_1_babdd{
        margin:0rpx 0rpx 0rpx auto;color:var(--benbenFontColor0);font-size:32rpx;font-weight:500;
    }    .bindAccount_fd1_0_c3_babdd{
        font-size:22rpx;margin:0rpx 0rpx 0rpx 24rpx;color:var(--benbeniconColor2);
    }}}
    .bindAccount_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .bindAccount_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .bindAccount_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .bindAccount_fd0_0_c0_babdd{
        width:180rpx;
        .bindAccount_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>