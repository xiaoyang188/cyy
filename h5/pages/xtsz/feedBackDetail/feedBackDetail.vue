<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex feedBackDetail_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between feedBackDetail_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center feedBackDetail_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="2"   >
        <text class='fu-iconfont2  feedBackDetail_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='feedBackDetail_fd0_0_c1_c0_babdd'  >{{$t('历史反馈')}}</text>
</view>
    <view   class='flex align-center justify-end feedBackDetail_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---反馈记录带联系人flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout feedBackDetail_flex_1_babdd"    >
            <template v-for = '(item,key0) in dataMessage'>
    <view   class='flex flex-wrap align-start feedBackDetail_fd1_0_babdd'       :key='key0'>
        <image class='feedBackDetail_fd1_0_c0_babdd'  mode="aspectFit"  :src='item.avatar'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub feedBackDetail_fd1_0_c1_babdd'      >
            <view   class='flex flex-direction flex-wrap align-stretch feedBackDetail_fd1_0_c1_c0_babdd'      >
            <view   class='flex-sub feedBackDetail_fd1_0_c1_c0_c0_babdd'      >
        <text class='feedBackDetail_fd1_0_c1_c0_c0_c0_babdd'  >{{item.body}}</text>
</view>
</view>
    <view   class='flex flex-wrap align-center'      >
            <template v-for = '(child,key1) in item.thumb'>
    <view   class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c1_c0_babdd'       :key='key1'>
        <image class='feedBackDetail_fd1_0_c1_c1_c0_c0_babdd'  mode="aspectFill"  :src='child' @tap.stop="multiImagePreview(child,item.thumb,'')" ></image>
</view>
    </template>
    
</view>
    <view   class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c2_babdd'      >
        <text class='feedBackDetail_fd1_0_c1_c2_c0_babdd'  >{{$t('反馈类型：')}}</text>
<text class='feedBackDetail_fd1_0_c1_c2_c0_babdd'  >{{item.type}}</text>
</view>
    <view   class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c3_babdd'      >
        <text class='feedBackDetail_fd1_0_c1_c2_c0_babdd'  >{{$t('反馈时间：')}}</text>
<text class='feedBackDetail_fd1_0_c1_c2_c0_babdd'  >{{item.create_time}}</text>
</view>
    <view   class='flex flex-wrap align-center feedBackDetail_fd1_0_c1_c4_babdd'    v-if= "item.is_replay=='2'"  >
        <text class='feedBackDetail_fd1_0_c1_c4_c0_babdd'  >{{$t('平台回复：')}}</text>
<text class='feedBackDetail_fd1_0_c1_c4_c1_babdd'  >{{item.replay}}</text>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
        
<!---反馈记录带联系人flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import pagingList from '@/common/mixin/paging_list.js';
import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        mixins: [pagingList],
        
        data(){
			return {"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"aa_id":"1","dataMessage":[]};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.getListFunc()
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
            
            
                            //用户管理-意见反馈记录
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post641472eb35317;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {user_type:'1'}
                this.listData = [];
                this.dataMessage = this.listData;
                this.pagingListToggle();
                
                },
                pagingListPostData(){
                    return this.pagingListPostDataContent
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
            .feedBackDetail_flex_1_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .feedBackDetail_fd1_0_babdd{
        padding:24rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
        .feedBackDetail_fd1_0_c0_babdd{
        width:72rpx;height:72rpx;border-radius:50rpx 50rpx 50rpx 50rpx;
    }    .feedBackDetail_fd1_0_c1_babdd{
        margin:0rpx 0rpx 0rpx 0rpx;
        .feedBackDetail_fd1_0_c1_c0_babdd{
        position:relative;padding:0rpx 0rpx 0rpx 16rpx;
        .feedBackDetail_fd1_0_c1_c0_c0_babdd{
        color:var(--benbenFontColor0);
        .feedBackDetail_fd1_0_c1_c0_c0_c0_babdd{
        line-height:46rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);padding:0rpx 30rpx 0rpx 0rpx;
    }}}    .feedBackDetail_fd1_0_c1_c1_c0_babdd{
        margin:12rpx 5rpx 12rpx 5rpx;
        .feedBackDetail_fd1_0_c1_c1_c0_c0_babdd{
        width:180rpx;height:180rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }}    .feedBackDetail_fd1_0_c1_c2_babdd{
        margin:32rpx 0rpx 16rpx 16rpx;
    }    .feedBackDetail_fd1_0_c1_c3_babdd{
        margin:0rpx 0rpx 0rpx 16rpx;
    }    .feedBackDetail_fd1_0_c1_c4_babdd{
        padding:24rpx 16rpx 24rpx 16rpx;margin:16rpx 0rpx 0rpx 16rpx;border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor2);background-size:100% auto !important;
        .feedBackDetail_fd1_0_c1_c4_c0_babdd{
        line-height:46rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor4);
    }    .feedBackDetail_fd1_0_c1_c4_c1_babdd{
        line-height:46rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }}}}}
    .feedBackDetail_fd1_0_c1_c2_c0_babdd{
        line-height:33rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor2);
    }
    .feedBackDetail_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .feedBackDetail_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .feedBackDetail_fd0_0_c0_babdd{
        width:100rpx;
        .feedBackDetail_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .feedBackDetail_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .feedBackDetail_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>