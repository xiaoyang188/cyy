<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch benben-position-layout flex contactService_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between contactService_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center contactService_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  contactService_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='contactService_fd0_0_c1_c0_babdd'  >{{$t('联系平台')}}</text>
</view>
    <view   class='flex align-center justify-end contactService_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
        <image class='contactService_fd1_0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1640.png"'></image>
    <view   class='flex flex-wrap align-center contactService_fd1_1_babdd'      >
        <image class='contactService_fd1_1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1641.png"'></image>
<text class='contactService_fd1_1_c1_babdd'  >{{dataMessage.tel}}</text>
</view>
    <view   class='flex flex-wrap align-center contactService_fd1_2_babdd'      >
        <text class='contactService_fd1_2_c0_babdd'  >{{$t('客服工作时间：')}}</text>
<text class='contactService_fd1_2_c0_babdd'  >{{dataMessage.time}}</text>
</view>
<button class='contactService_fd1_3_babdd'  @tap.stop="callMobile(dataMessage.tel)"  >{{$t('呼叫客服')}}</button>
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
			return {/** web_site_copyright【版权信息】
*   web_site_email【公司邮箱】
*   web_site_bgimg【联系我们背景图】
*   web_site_address【公司地址】
*   time【工作时间】
*   tel【客服电话】 **/ "dataMessage":{"tel":"","time":"","web_site_address":"","web_site_bgimg":"","web_site_email":"","web_site_copyright":""}};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.gethc4cdb895b79baFunc()
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
                async gethc4cdb895b79baFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post64cdb895b79ba, {
    
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
            background:var(--benbenbgColor1);background-size: 100% auto;
            .contactService_fd1_0_babdd{
        width:480rpx;height:326rpx;margin:120rpx 0rpx 56rpx 0rpx;
    }
    .contactService_fd1_1_babdd{
        margin:0rpx 0rpx 32rpx 0rpx;
        .contactService_fd1_1_c0_babdd{
        width:40rpx;height:40rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 13rpx 0rpx 0rpx;
    }    .contactService_fd1_1_c1_babdd{
        color:var(--benbenFontColor0);font-size:40rpx;font-weight:700;line-height:56rpx;
    }}
    .contactService_fd1_2_babdd{
        margin:0rpx 0rpx 80rpx 0rpx;color:var(--benbenFontColor1);
    }
    .contactService_fd1_2_c0_babdd{
        font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .contactService_fd1_3_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:510rpx;height:88rpx;line-height:88rpx;
    }
    .contactService_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .contactService_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;height:88rpx;
        .contactService_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .contactService_fd0_0_c0_babdd{
        width:100rpx;height:88rpx;
        .contactService_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);font-weight:500;
    }}}
</style>