<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex rulesExchange_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center rulesExchange_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='rulesExchange_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='rulesExchange_fd0_1_babdd'  >{{$t('兑换规则')}}</text>
    <view   class='flex flex-wrap align-center rulesExchange_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout rulesExchange_flex_1_babdd"    >
                <jyf-parser class='rulesExchange_fd1_0_babdd'  :html="dataMessage.content | richTextFormat"  >
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
			return {/** content【内容】 **/ "dataMessage":{"content":""}};
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
            
            
                            //获取兑换规则
                async getMessageFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.post(global.apiUrls.post64156a0fd7451, {
    
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
            .rulesExchange_flex_1_babdd{
        padding:24rpx;
    }
    .rulesExchange_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .rulesExchange_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:600;line-height:50rpx;
    }}
    .rulesExchange_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .rulesExchange_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
    ::v-deep .rulesExchange_fd1_0_babdd{
        width:100%;
    }
</style>