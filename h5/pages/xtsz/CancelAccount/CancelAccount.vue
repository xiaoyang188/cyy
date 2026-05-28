<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex CancelAccount_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between CancelAccount_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center CancelAccount_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  CancelAccount_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='CancelAccount_fd0_0_c1_c0_babdd'  >{{$t('注销账号')}}</text>
</view>
    <view   class='flex align-center justify-end CancelAccount_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---注销账号协议flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch CancelAccount_flex_1_babdd"    >
                <jyf-parser class='CancelAccount_fd1_0_babdd'  :html="dataMessage.content | richTextFormat"  >
        </jyf-parser>
<button class='flex-sub CancelAccount_fd1_1_babdd'  @tap.stop="handleJumpDiy" data-type="redirectTo" :data-url="`/pages/xtsz/logOutReason/logOutReason`"  >{{$t('填写注销申请')}}</button>
</view>
        
<!---注销账号协议flex布局结束-->
    
    
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
            this.getMessageFunc()
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
                async getMessageFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post641568f1b6f87, {
    column_id:'5'
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
            .CancelAccount_flex_1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;padding:32rpx 32rpx 32rpx 32rpx;margin:0rpx 0rpx 032rpx 0rpx;
        .CancelAccount_fd1_1_babdd{
        font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);height:88rpx;line-height:88rpx;font-weight:500;border-radius:44rpx 44rpx 44rpx 44rpx;margin:0rpx 32rpx 0rpx 32rpx;position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));width:686rpx;
    }}
    .CancelAccount_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .CancelAccount_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .CancelAccount_fd0_0_c0_babdd{
        width:100rpx;
        .CancelAccount_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbenFontColor0);
    }}    .CancelAccount_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .CancelAccount_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
    ::v-deep .CancelAccount_fd1_0_babdd{
        width:100%;margin:0rpx 0rpx 150rpx 0rpx;
    }
</style>