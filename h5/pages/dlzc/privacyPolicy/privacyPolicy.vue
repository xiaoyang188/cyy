<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex privacyPolicy_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub privacyPolicy_fd0_0_babdd'      >
            <view   class='flex align-center privacyPolicy_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  privacyPolicy_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        </view>
    <view   class='flex align-center privacyPolicy_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout privacyPolicy_flex_1_babdd"    >
        <text class='privacyPolicy_fd1_0_babdd'  >{{dataMessage.name}}</text>
        <jyf-parser class='privacyPolicy_fd1_1_babdd'  :html="dataMessage.content | richTextFormat"  >
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
			return {/** introduce【简介】
*   content【内容】
*   thumb_img【内容图片】
*   name【页面标题】 **/ "dataMessage":{"aid":"","name":"","thumb_img":"","content":"","introduce":""}};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.queryEssayFunc()
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
            
            
                            //系统文章--获取系统单页内容
                async queryEssayFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post641568f1b6f87, {
    column_id:'2'
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
            .privacyPolicy_flex_1_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .privacyPolicy_fd1_0_babdd{
        font-size:40rpx;font-weight:700;color:var(--benbenFontColor0);margin:0rpx 0rpx 0rpx 0rpx;font-style:normal;
    }}
    .privacyPolicy_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .privacyPolicy_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
    }}
    .privacyPolicy_fd0_0_c0_babdd{
        width:180rpx;
        .privacyPolicy_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
    ::v-deep .privacyPolicy_fd1_1_babdd{
        width:100%;margin:16rpx 0rpx 0rpx 0rpx;
    }
</style>