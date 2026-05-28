<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex articleDetails_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub articleDetails_fd0_0_babdd'      >
            <view   class='flex align-center articleDetails_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  articleDetails_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='articleDetails_fd0_0_c1_c0_babdd'  >{{$t('消息详情')}}</text>
</view>
    <view   class='flex align-center articleDetails_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>

 <view class="flex flex-direction align-stretch articleDetails_flex_1_babdd"    >
        <text class='articleDetails_fd1_0_babdd'  >{{dataMessage.title}}</text>
<text class='articleDetails_fd1_1_babdd'  >{{dataMessage.create_time}}</text>
        <jyf-parser class='articleDetails_fd1_2_babdd'  :html="dataMessage.content | richTextFormat"  >
        </jyf-parser>
</view>
        

    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** category_name【分类名称】
*   thumb【文章图片】
*   content【文章内容】
*   create_time【创建时间】
*   title【文章标题】
*   aid【文章ID】 **/ "dataMessage":{"aid":"","title":"","create_time":"","content":"","thumb":"","category_name":""},"id":"9"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {id}=options
if (id !== undefined) this.id = id
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
            
            
                            //获取文章详情
                async getMessageFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post641576c24de11, {
    article_id:this.id
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
            background:#fff;background-size: 100% auto;
            .articleDetails_flex_1_babdd{
        padding:25rpx 32rpx 16rpx 32rpx;
        .articleDetails_fd1_0_babdd{
        font-size:32rpx;line-height:54rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .articleDetails_fd1_1_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;line-height:33rpx;font-weight:400;margin:24rpx 0rpx 0rpx 0rpx;
    }}
    .articleDetails_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .articleDetails_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .articleDetails_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .articleDetails_fd0_0_c0_babdd{
        width:180rpx;
        .articleDetails_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
    ::v-deep .articleDetails_fd1_2_babdd{
        width:100%;padding:32rpx 0rpx 32rpx 0rpx;
    }
</style>