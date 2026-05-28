<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center aboutUs_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub aboutUs_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center aboutUs_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  aboutUs_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='aboutUs_fd0_0_c1_c0_babdd'  >{{$t('关于我们')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end aboutUs_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---版本flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center"    >
            <view   class='flex flex-wrap align-center aboutUs_fd1_0_babdd'      >
        </view>
<image class='aboutUs_fd1_1_babdd'  mode="aspectFit"  :src='aboutUsData.app_logo'></image>
    <view   class='flex flex-wrap align-center aboutUs_fd1_2_babdd'      >
        <text class='aboutUs_fd1_2_c0_babdd'  >{{aboutUsData.web_site_title}}</text>
<text class='aboutUs_fd1_2_c1_babdd'    v-if= " appSystemIdentification!='Wechat'"  >{{$t('当前版本')}}</text>
<text class='aboutUs_fd1_2_c1_babdd'    v-if= " appSystemIdentification!='Wechat'"  >{{appVersion}}</text>
</view>
    <view   class='flex align-center justify-between aboutUs_fd1_3_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/Licenseinformation/Licenseinformation`"   >
        <text class='aboutUs_fd1_3_c0_babdd'  >{{$t('证照信息')}}</text>
<text class='fu-iconfont2  aboutUs_fd1_3_c1_babdd'  >&#xe7f2;</text>
</view>
<text class='aboutUs_fd1_4_babdd'  >{{aboutUsData.web_site_copyright}}</text>
    <view   class='flex align-center aboutUs_fd1_5_babdd'      >
        <text class='self-center aboutUs_fd1_5_c0_babdd'  >{{$t('ICP备案号：')}}</text>
        <jyf-parser   :html="aboutUsData.app_icp | richTextFormat"  >
        </jyf-parser>
</view>
</view>
        
<!---版本flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"systemsInfo":"",/** shop_app_icp【商家端备案信息】
*   license【证照信息】
*   app_icp【app备案信息】
*   web_site_bgimg【联系我们背景图】
*   web_site_address【公司地址】
*   web_site_email【公司邮箱】
*   time【工作时间】
*   tel【客服电话】
*   app_logo【applogo】
*   web_site_copyright【版权信息】
*   web_site_title【应用名称】 **/ "aboutUsData":{"web_site_title":"","web_site_copyright":"","app_logo":"","tel":"","time":"","web_site_email":"","web_site_address":"","web_site_bgimg":"","app_icp":"","license":"","shop_app_icp":""}};
		},
		computed:{
                          appVersion() {
      // 获取版本号
      return this.$store.state.appVersion
    },
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
            this.getrj4cdb895b79baFunc()
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
                        this.$store.dispatch('getAppVersion') // 更新版本号
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
                async getrj4cdb895b79baFunc(){
                        //请求方法
    //数据验证
    
    
  let dataaboutUsData = await this.$api.get(global.apiUrls.post64cdb895b79ba, {
    
  });
  
  if (dataaboutUsData.data.code != 1) {
    this.$message.info(dataaboutUsData.data.msg);
    return
  } 
  let infoaboutUsData = dataaboutUsData.data;
  this.aboutUsData = infoaboutUsData.data
  
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
            .aboutUs_fd1_0_babdd{
        height:0rpx;
    }
    .aboutUs_fd1_1_babdd{
        width:180rpx;height:180rpx;border-radius:36rpx 36rpx 36rpx 36rpx;margin:88rpx 0rpx 0rpx 0rpx;
    }
    .aboutUs_fd1_2_babdd{
        margin:24rpx 0rpx 0rpx 0rpx;
        .aboutUs_fd1_2_c0_babdd{
        font-weight:400;color:var(--benbenFontColor0);font-size:28rpx;margin:0rpx 010rpx 0rpx 0rpx;
    }}
    .aboutUs_fd1_2_c1_babdd{
        font-weight:400;color:var(--benbenFontColor0);font-size:28rpx;margin:0rpx 0rpx 0rpx 0rpx;
    }
    .aboutUs_fd1_3_babdd{
        margin:150rpx 0rpx 0rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);padding:32rpx 032rpx 32rpx 32rpx;width:90%;
        .aboutUs_fd1_3_c0_babdd{
        font-size:32rpx;font-weight:600;color:var(--benbenFontColor0);
    }    .aboutUs_fd1_3_c1_babdd{
        font-size:30rpx;font-weight:400;color:var(--benbeniconColor1);
    }}
    .aboutUs_fd1_4_babdd{
        color:var(--benbenFontColor2);font-size:28rpx;font-weight:400;line-height:45rpx;position:fixed;bottom:calc(200rpx + var(--benben-window-bottom,0px));text-align:center;
    }
    .aboutUs_fd1_5_babdd{
        margin:24rpx 0rpx 0rpx 0rpx;position:fixed;bottom:calc(150rpx + var(--benben-window-bottom,0px));
        .aboutUs_fd1_5_c0_babdd{
        color:var(--benbenFontColor2);font-size:28rpx;font-weight:400;line-height:45rpx;text-align:center;
    }}
    .aboutUs_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .aboutUs_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .aboutUs_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);line-height:50rpx;
    }}}
    .aboutUs_fd0_0_c0_babdd{
        width:120rpx;
        .aboutUs_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}}
</style>