<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center newDetail_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub newDetail_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  newDetail_fd0_0_c0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1" >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center flex-sub'      >
        <text class='newDetail_fd0_0_c1_c0_babdd'  >{{$t('消息详情')}}</text>
</view>
    <view   class='flex flex-wrap align-center newDetail_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
    <view class="ben_fu-jyf-parser_1" >
        <jyf-parser :html="parser1 | richTextFormat"></jyf-parser>
    </view>
    
    
        </view>
    </page-body>
</template>
<script>
    
    
    export default {
        components:{},
        
        
        data(){
			return {"parser1":"这是富文本","id":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {id}=options
if (id !== undefined) this.id = id
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
            
            
            
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor0);background-size: 100% auto;
            .newDetail_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .newDetail_fd0_0_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;
        .newDetail_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);line-height:88rpx;
    }    .newDetail_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:88rpx;
    }    .newDetail_fd0_0_c2_babdd{
        width:32rpx;height:32rpx;
    }}}}
 
</style>