<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex helpFeedback_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between helpFeedback_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center helpFeedback_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  helpFeedback_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='helpFeedback_fd0_0_c1_c0_babdd'  >{{$t('帮助与反馈')}}</text>
</view>
    <view   class='flex align-center justify-end helpFeedback_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch helpFeedback_flex_1_babdd"    >
            <view   class='flex flex-direction align-stretch helpFeedback_fd1_0_babdd'      >
            <template v-for = '(item,key0) in dataMessage'>
    <view   class='flex flex-wrap align-center justify-between helpFeedback_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/helpDetails/helpDetails?id=${item.aid}`"    :key='key0'>
        <text class='helpFeedback_fd1_0_c0_c0_babdd'  >{{item.title}}</text>
<text class='fu-iconfont2  helpFeedback_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
    </template>
    
</view>
<button class='helpFeedback_fd1_1_babdd'  @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/feedBack/feedBack`"  >{{$t('意见反馈')}}</button>
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
			return {"dataMessage":[]};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.getts4219a95b6200Func()
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
            
            
                            //文章列表-获取帮助中心列表
                async getts4219a95b6200Func(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post64219a95b6200, {
    category_id:'2'
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data.data;
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
            .helpFeedback_flex_1_babdd{
        font-size:32rpx;
        .helpFeedback_fd1_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;
        .helpFeedback_fd1_0_c0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);margin:0rpx 32rpx 0rpx 32rpx;
        .helpFeedback_fd1_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbenFontColor0);font-weight:400;line-height:50rpx;
    }    .helpFeedback_fd1_0_c0_c1_babdd{
        font-size:26rpx;color:var(--benbenFontColor2);
    }}}    .helpFeedback_fd1_1_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor4);width:638rpx;height:88rpx;border:2px solid var(--benbenbdColor2);line-height:88rpx;position:fixed;left:53rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));
    }}
    .helpFeedback_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .helpFeedback_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .helpFeedback_fd0_0_c0_babdd{
        width:100rpx;
        .helpFeedback_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbenFontColor0);
    }}    .helpFeedback_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .helpFeedback_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>