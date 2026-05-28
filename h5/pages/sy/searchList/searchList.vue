<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex searchList_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center searchList_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='searchList_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='searchList_fd0_1_babdd'  >{{$t('热搜榜单')}}</text>
    <view   class='flex flex-wrap align-center searchList_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout searchList_flex_1_babdd"    >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction flex-wrap align-stretch searchList_fd1_0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"    :key='key0'>
            <view   class='flex flex-wrap align-stretch'      >
            <view   class='flex flex-wrap align-stretch searchList_fd1_0_c0_c0_babdd'      >
        <image class='searchList_fd1_0_c0_c0_c0_babdd'  mode="aspectFill"  :src='item.thumb'></image>
<image class='searchList_fd1_0_c0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"238.png"'  v-if= "key0=='0'"></image><image class='searchList_fd1_0_c0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"393.png"'  v-if= "key0=='1'"></image><image class='searchList_fd1_0_c0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"395.png"'  v-if= "key0=='2'"></image>
<text class='searchList_fd1_0_c0_c0_c2_babdd'    v-if= " key0>'2'"  >{{key0+1}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub searchList_fd1_0_c0_c1_babdd'      >
        <text class='searchList_fd1_0_c0_c1_c0_babdd'  >{{item.name}}</text>
    <view   class='flex flex-wrap align-center searchList_fd1_0_c0_c1_c1_babdd'      >
        <text class='searchList_fd1_0_c0_c1_c1_c0_babdd'    v-if= "item.is_shipping=='1'"  >{{$t('包邮')}}</text><text class='searchList_fd1_0_c0_c1_c1_c0_1_babdd'    v-if= "item.is_shipping=='0'"  >{{$t('不包邮')}}</text>
</view>
    <view   class='flex flex-wrap align-center searchList_fd1_0_c0_c1_c2_babdd'      >
            <view   class='flex flex-direction flex-wrap align-stretch flex-sub searchList_fd1_0_c0_c1_c1_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='searchList_fd1_0_c0_c1_c1_c0_babdd'  >{{item.sales_sum}}</text>
<text class='searchList_fd1_0_c0_c1_c1_c0_babdd'  >{{$t('人已购买')}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='searchList_fd1_0_c0_c1_c2_c0_c1_c0_babdd'  >{{$t('￥')}}</text>
<text class=' searchList_fd1_0_c0_c1_c2_c0_c1_c1_babdd'   >
    <text class=' searchList_price1_fd1_0_c0_c1_c2_c0_c1_c1_babdd' >{{ item.shop_price | frontPrice }}</text><text class=' searchList_price2_fd1_0_c0_c1_c2_c0_c1_c1_babdd' >{{ item.shop_price | laterPrice }}</text>
</text>
</view>
</view>
<button class='searchList_fd1_0_c0_c1_c2_c1_babdd'    >{{$t('抢购')}}</button>
</view>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
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
			return {"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataList":[]};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.ProductListFunc()
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
            this.ProductListFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //商品列表
                 ProductListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post64184ac1cafc3;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {is_hot_search:'1'}
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
            background:rgba(255, 40, 32, 1);background-size: 100% auto;
            .searchList_flex_1_babdd{
        background:url(#{image-path('419.png')}) no-repeat ,transparent;background-size:100% auto !important;padding:287rpx 32rpx 0rpx 32rpx;
        .searchList_fd1_0_babdd{
        border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor1);padding:32rpx 24rpx 32rpx 24rpx;margin:0rpx 0rpx 24rpx 0rpx;
        .searchList_fd1_0_c0_c0_babdd{
        position:relative;
        .searchList_fd1_0_c0_c0_c0_babdd{
        width:200rpx;height:200rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }    .searchList_fd1_0_c0_c0_c2_babdd{
        position:absolute;top:-10rpx;left:0rpx;background:rgba(156, 159, 168, 1);background-size:100% auto;line-height:44rpx;text-align:center;color:var(--benbenFontColor3);border-radius:8rpx;padding:0rpx 17rpx 0rpx 17rpx;
    }}    .searchList_fd1_0_c0_c1_babdd{
        margin:0rpx 0rpx 0rpx 24rpx;
        .searchList_fd1_0_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:600;line-height:40rpx;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .searchList_fd1_0_c0_c1_c2_babdd{
        margin:auto 0rpx 0rpx 0rpx;
        .searchList_fd1_0_c0_c1_c2_c1_babdd{
        border-radius:28rpx 28rpx 28rpx 28rpx;font-size:24rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:130rpx;height:56rpx;line-height:56rpx;
    }}}}}
    .searchList_fd1_0_c0_c0_c1_babdd{
        width:44rpx;height:44rpx;border-radius:0rpx 0rpx 0rpx 0rpx;position:absolute;top:-12rpx;left:0rpx;
    }
    .searchList_fd1_0_c0_c1_c1_babdd{
        margin:4rpx 0rpx 0rpx 0rpx;
        .searchList_fd1_0_c0_c1_c1_c0_1_babdd{
        color:#999999;font-size:20rpx;font-weight:400;line-height:28rpx;
    }}
    .searchList_fd1_0_c0_c1_c1_c0_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:28rpx;
    }
    .searchList_fd1_0_c0_c1_c2_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:24rpx;font-weight:700;line-height:30rpx;margin:4rpx 0rpx 0rpx 0rpx;
    }
    .searchList_fd1_0_c0_c1_c2_c0_c1_c1_babdd{
        color:var(--benbenFontColor0);font-weight:600;
        .searchList_price1_fd1_0_c0_c1_c2_c0_c1_c1_babdd{
        font-size:32rpx;
    }    .searchList_price2_fd1_0_c0_c1_c2_c0_c1_c1_babdd{
        font-size:24rpx;
    }}
    .searchList_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .searchList_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:500;line-height:50rpx;
    }}
    .searchList_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .searchList_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
</style>