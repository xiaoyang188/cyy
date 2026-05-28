<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex orderMessages_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub orderMessages_fd0_0_babdd'      >
            <view   class='flex align-center orderMessages_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  orderMessages_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='orderMessages_fd0_0_c1_c0_babdd'  >{{$t('订单消息')}}</text>
</view>
    <view   class='flex align-center orderMessages_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---订单消息flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout orderMessages_flex_1_babdd"    >
            <template v-for = '(item,key0) in dataMessage'>
    <view   class='flex flex-direction flex-wrap align-stretch orderMessages_fd1_0_babdd'       :key='key0'>
            <view   class='flex flex-wrap align-center justify-between orderMessages_fd1_0_c0_babdd'      >
        <text class='orderMessages_fd1_0_c0_c0_babdd'  >{{item.title}}</text>
<text class='orderMessages_fd1_0_c0_c1_babdd'  >{{item.create_time}}</text>
</view>
    <view   class='flex flex-wrap align-center orderMessages_fd1_0_c1_babdd'      >
        <image class='orderMessages_fd1_0_c1_c0_babdd'  mode="aspectFit"  :src='item.thumb'></image>
<text class='flex-sub orderMessages_fd1_0_c1_c1_babdd'  >{{item.content}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='flex-sub orderMessages_fd1_0_c2_c0_babdd'  >{{item.from}}</text>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
        
<!---订单消息flex布局结束-->
    
    
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
			return {"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataMessage":[],"id":""};
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
            this.getListFunc()
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
            
            
                            //系统消息-获取指定类型的消息列表
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post6424280846288;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {msg_type:'2'}
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
            background:var(--benbenbgColor0);background-size: 100% auto;
            .orderMessages_flex_1_babdd{
        padding:24rpx 24rpx 0rpx 24rpx;
        .orderMessages_fd1_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;padding:0rpx 24rpx 24rpx 24rpx;margin:0rpx 0rpx 24rpx 0rpx;
        .orderMessages_fd1_0_c0_babdd{
        margin:24rpx 0rpx 22rpx 0rpx;
        .orderMessages_fd1_0_c0_c0_babdd{
        font-size:34rpx;font-weight:500;color:var(--benbenFontColor0);line-height:48rpx;
    }    .orderMessages_fd1_0_c0_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor2);line-height:33rpx;
    }}    .orderMessages_fd1_0_c1_babdd{
        margin:0rpx 0rpx 24rpx 0rpx;background:var(--benbenbgColor0);background-size:100% auto !important;
        .orderMessages_fd1_0_c1_c0_babdd{
        width:140rpx;height:140rpx;margin:0rpx 16rpx 0rpx 0rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }    .orderMessages_fd1_0_c1_c1_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);-webkit-line-clamp:3;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;line-height:43rpx;
    }}    .orderMessages_fd1_0_c2_c0_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor2);line-height:33rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }}}
    .orderMessages_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .orderMessages_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .orderMessages_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:#333;
    }}}
    .orderMessages_fd0_0_c0_babdd{
        width:180rpx;
        .orderMessages_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>