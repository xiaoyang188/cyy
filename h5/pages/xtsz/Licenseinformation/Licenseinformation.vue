<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center Licenseinformation_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub Licenseinformation_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center Licenseinformation_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  Licenseinformation_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='Licenseinformation_fd0_0_c1_c0_babdd'  >{{$t('证照信息')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end Licenseinformation_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center Licenseinformation_flex_1_babdd"    >
                <jyf-parser class='Licenseinformation_fd1_0_babdd'  :html="dataMessage.license | richTextFormat"  >
        </jyf-parser>
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
			return {/** wechat_share_title【微信分享标题】
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
*   tel【客服电话】 **/ "dataMessage":{"tel":"","time":"","web_site_address":"","web_site_bgimg":"","web_site_email":"","web_site_copyright":"","app_icp":"","license":"","shop_app_icp":"","web_site_title":"","app_logo":"","wechat_share_img":0,"wechat_share_title":""}};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.getcw4cdb895b79baFunc()
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
                async getcw4cdb895b79baFunc(){
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
            .Licenseinformation_flex_1_babdd{
        padding:32rpx;
    }
    .Licenseinformation_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .Licenseinformation_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .Licenseinformation_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);line-height:50rpx;
    }}}
    .Licenseinformation_fd0_0_c0_babdd{
        width:120rpx;
        .Licenseinformation_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}}
    ::v-deep .Licenseinformation_fd1_0_babdd{
        width:100%;
    }
</style>