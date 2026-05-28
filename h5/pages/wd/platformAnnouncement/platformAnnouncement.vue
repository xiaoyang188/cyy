<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex platformAnnouncement_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub platformAnnouncement_fd0_0_babdd'      >
            <view   class='flex align-center platformAnnouncement_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  platformAnnouncement_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='platformAnnouncement_fd0_0_c1_c0_babdd'  >{{$t('平台消息')}}</text>
</view>
    <view   class='flex align-center platformAnnouncement_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---平台消息flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch justify-center benben-flex-layout"    >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction flex-wrap align-stretch platformAnnouncement_fd1_0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/wd/newDetail/newDetail?id=${item.aid}`"    :key='key0'>
        <text class='platformAnnouncement_fd1_0_c0_babdd'  >{{item.title}}</text>
<text class='platformAnnouncement_fd1_0_c1_babdd'  >{{item.content}}</text>
<image class='platformAnnouncement_fd1_0_c2_babdd'  mode="aspectFit"  :src='item.thumb'  v-if= "item.thumb!=''"></image>
    <view   class='flex flex-wrap align-center platformAnnouncement_fd1_0_c3_babdd'      >
        <text class='platformAnnouncement_fd1_0_c3_c0_babdd'  >{{item.create_time}}</text>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
        
<!---平台消息flex布局结束-->
    
    
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
			return {"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataList":[]};
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
            this.getListFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //系统文章-获取平台公告列表
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post6415752f56d0f;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {}
                this.listData = [];
                this.dataList = this.listData;
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
            background:var(--benbenbgColor0);background-size: 100% auto;
            .platformAnnouncement_fd1_0_babdd{
        margin:24rpx 32rpx 0rpx 32rpx;padding:24rpx 24rpx 24rpx 24rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;
        .platformAnnouncement_fd1_0_c0_babdd{
        line-height:36rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .platformAnnouncement_fd1_0_c1_babdd{
        margin:24rpx 0rpx 0rpx 0rpx;line-height:46rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);-webkit-line-clamp:3;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .platformAnnouncement_fd1_0_c2_babdd{
        width:638rpx;height:298rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:24rpx 0rpx 0rpx 0rpx;
    }    .platformAnnouncement_fd1_0_c3_babdd{
        padding:24rpx 0rpx 0rpx 0rpx;margin:24rpx 0rpx 0rpx 0rpx;border-top:1px solid var(--benbenbdColor0);
        .platformAnnouncement_fd1_0_c3_c0_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:33rpx;
    }}}
    .platformAnnouncement_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .platformAnnouncement_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .platformAnnouncement_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .platformAnnouncement_fd0_0_c0_babdd{
        width:180rpx;
        .platformAnnouncement_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>