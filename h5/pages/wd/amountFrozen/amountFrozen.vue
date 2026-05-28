<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex amountFrozen_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center amountFrozen_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  amountFrozen_fd0_0_c0_babdd'  >&#xe794;</text>
</view>
<text class='amountFrozen_fd0_1_babdd'  >{{$t('未到账金额')}}</text>
    <view   class='flex flex-wrap align-center amountFrozen_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout amountFrozen_flex_1_babdd"    >
            <view   class='flex flex-direction flex-wrap align-stretch amountFrozen_fd1_0_babdd'      >
            <template v-for = '(item,key0) in dataMessage'>
    <view   class='flex flex-wrap align-center amountFrozen_fd1_0_c0_babdd'       :key='key0'>
            <view   class='flex flex-direction flex-wrap align-stretch flex-sub'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='amountFrozen_fd1_0_c0_c0_c0_c0_babdd'  >{{$t('状态：')}}</text>
<text class='amountFrozen_fd1_0_c0_c0_c0_c0_babdd'    v-if= "item.is_delete=='1'"  >{{$t('冻结中')}}</text><text class='amountFrozen_fd1_0_c0_c0_c0_c1_1_babdd'    v-if= "item.is_delete!='1'"  >{{$t('已解冻')}}</text>
</view>
<text class='amountFrozen_fd1_0_c0_c0_c1_babdd'  >{{item.create_time}}</text>
</view>
<text class='amountFrozen_fd1_0_c0_c1_babdd'  >+</text>
<text class='amountFrozen_fd1_0_c0_c1_babdd'  >{{item.change_money}}</text>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
</view>
        
<!---flex布局flex布局结束-->
    
    
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
			return {"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataMessage":[]};
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
            
            
                            //钱包-冻结金额
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post636e3e94b5605;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {}
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
            .amountFrozen_flex_1_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .amountFrozen_fd1_0_babdd{
        border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor1);padding:0rpx 32rpx 0rpx 32rpx;margin:24rpx 0rpx 0rpx 0rpx;
        .amountFrozen_fd1_0_c0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
        .amountFrozen_fd1_0_c0_c0_c0_c1_1_babdd{
        color:#333333;font-size:32rpx;font-weight:400;line-height:45rpx;
    }    .amountFrozen_fd1_0_c0_c0_c1_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:33rpx;margin:32rpx 0rpx 0rpx 0rpx;
    }}}}
    .amountFrozen_fd1_0_c0_c0_c0_c0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:400;line-height:45rpx;
    }
    .amountFrozen_fd1_0_c0_c1_babdd{
        color:var(--benbenFontColor5);font-size:32rpx;font-weight:700;line-height:39rpx;
    }
    .amountFrozen_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .amountFrozen_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:500;line-height:50rpx;
    }}
    .amountFrozen_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .amountFrozen_fd0_0_c0_babdd{
        margin:0rpx 0rpx 0rpx 32rpx;font-size:36rpx;color:var(--benbeniconColor1);
    }}}
</style>