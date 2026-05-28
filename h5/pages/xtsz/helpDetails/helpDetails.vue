<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex helpDetails_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between helpDetails_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center helpDetails_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  helpDetails_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='helpDetails_fd0_0_c1_c0_babdd'  >{{$t('问题详情')}}</text>
</view>
    <view   class='flex align-center justify-end helpDetails_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout helpDetails_flex_1_babdd"    >
        <text class='helpDetails_fd1_0_babdd'  >{{dataDetails.title}}</text>
        <jyf-parser class='helpDetails_fd1_1_babdd'  :html="dataDetails.content | richTextFormat"  >
        </jyf-parser>
<button class='helpDetails_fd1_2_babdd'  @tap="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/feedBack/feedBack`"  >{{$t('意见反馈')}}</button>
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
			return {/** category_name【文类名称】
*   thumb【缩略图】
*   content【文章内容】
*   create_time【创建时间】
*   title【文章标题】
*   aid【文章ID】 **/ "dataDetails":{"aid":"","title":"","create_time":"","content":"","thumb":"","category_name":""},"id":"2"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {id}=options
if (id !== undefined) this.id = id
this.getDetailFunc()
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
            
            
                            //文章列表-获取文章详情
                async getDetailFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataDetails = await this.$api.get(global.apiUrls.post64219c5dc8d0d, {
    article_id:this.id
  });
  
  if (datadataDetails.data.code != 1) {
    this.$message.info(datadataDetails.data.msg);
    return
  } 
  let infodataDetails = datadataDetails.data;
  this.dataDetails = infodataDetails.data
  
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
            .helpDetails_flex_1_babdd{
        padding:0rpx 32rpx 32rpx 32rpx;margin:0rpx 0rpx 64rpx 0rpx;
        .helpDetails_fd1_0_babdd{
        margin:32rpx 0rpx 27rpx 0rpx;color:var(--benbenFontColor0);font-size:32rpx;font-weight:400;line-height:45rpx;
    }    .helpDetails_fd1_2_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor4);width:638rpx;height:88rpx;border:2px solid var(--benbenbdColor2);line-height:88rpx;position:fixed;bottom:calc(32rpx + var(--benben-window-bottom,0px));left:53rpx;
    }}
    .helpDetails_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .helpDetails_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .helpDetails_fd0_0_c0_babdd{
        width:100rpx;
        .helpDetails_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .helpDetails_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .helpDetails_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
    ::v-deep .helpDetails_fd1_1_babdd{
        width:100%;margin:0rpx 0rpx 180rpx 0rpx;
    }
</style>