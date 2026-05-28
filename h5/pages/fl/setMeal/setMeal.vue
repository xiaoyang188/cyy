<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex setMeal_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center setMeal_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  setMeal_fd0_0_c0_babdd'  >&#xE794;</text>
</view>
<text class='setMeal_fd0_1_babdd'  >{{$t('套餐列表')}}</text>
    <view   class='flex flex-wrap align-center setMeal_fd0_2_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout setMeal_flex_1_babdd"   v-if= "dataList.length>'0'" >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-wrap align-stretch setMeal_fd1_0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/suitInfo/suitInfo?name=${item.package_name}&package_id=${item.package_id}`"    :key='key0'>
        <image class='setMeal_fd1_0_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+"718.png"'></image>
    <view   class='flex flex-direction align-stretch justify-between flex-sub setMeal_fd1_0_c1_babdd'      >
        <text class='setMeal_fd1_0_c1_c0_babdd'  >{{$t('科罗娜（Corona）国产啤酒330ml*12瓶整箱')}}</text>
    <view   class='flex flex-wrap align-center setMeal_fd1_0_c1_c1_babdd'      >
        <text class='setMeal_fd1_0_c1_c1_c0_babdd'  >{{$t('件已售')}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='setMeal_fd1_0_c1_c2_c0_babdd'  >{{$t('固定套餐')}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
            <view   class='flex flex-direction flex-wrap align-stretch flex-sub'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='setMeal_fd1_0_c1_c3_c0_c0_c0_babdd'  >{{$t('￥')}}</text>
<text class=' setMeal_fd1_0_c1_c3_c0_c0_c1_babdd'   >
    <text class=' setMeal_price1_fd1_0_c1_c3_c0_c0_c1_babdd' >{{ 100 | frontPrice }}</text><text class=' setMeal_price2_fd1_0_c1_c3_c0_c0_c1_babdd' >{{ 100 | laterPrice }}</text>
</text>
</view>
</view>
<button class='setMeal_fd1_0_c1_c3_c1_babdd'   >{{$t('抢购')}}</button>
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
			return {"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataList":[],"bgcImg":[]};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.specialOfferFunc()
this.getBgcImgFunc()
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
            this.specialOfferFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //套餐专区
                 specialOfferFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post667fa6f5bf519;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {}
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
                
                },
                //获取背景图
                async getBgcImgFunc(){
                        let datanavCentral = await this.$api.get(global.apiUrls.post641e624160dd0, {
          type: '23'
        });

        if (datanavCentral.data.code != 1) {
          this.$message.info(datanavCentral.data.msg);
          return
        }
        let infonavCentral = datanavCentral.data;
        this.bgcImg = infonavCentral.data[0].thumb
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
            background-size: 100% auto !important;
            .setMeal_flex_1_babdd{
        padding:12rpx 32rpx 0rpx 32rpx;
        .setMeal_fd1_0_babdd{
        border-radius:16rpx 16rpx 16rpx 16rpx;background:#FFFFFF;padding:32rpx 24rpx 32rpx 24rpx;margin:12rpx 0rpx 12rpx 0rpx;
        .setMeal_fd1_0_c0_babdd{
        width:200rpx;height:200rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }    .setMeal_fd1_0_c1_babdd{
        margin:0rpx 0rpx 0rpx 24rpx;
        .setMeal_fd1_0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:600;line-height:40rpx;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .setMeal_fd1_0_c1_c1_babdd{
        margin:0rpx 0rpx 0rpx 0rpx;
        .setMeal_fd1_0_c1_c1_c0_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:33rpx;max-width:400rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }}    .setMeal_fd1_0_c1_c2_c0_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:33rpx;text-decoration:none;
    }    .setMeal_fd1_0_c1_c3_c0_c0_c0_babdd{
        color:var(--benbenFontColor5);font-size:24rpx;font-weight:700;line-height:30rpx;margin:6rpx 0rpx 0rpx 0rpx;
    }    .setMeal_fd1_0_c1_c3_c0_c0_c1_babdd{
        color:var(--benbenFontColor5);font-weight:600;
        .setMeal_price1_fd1_0_c1_c3_c0_c0_c1_babdd{
        font-size:40rpx;
    }    .setMeal_price2_fd1_0_c1_c3_c0_c0_c1_babdd{
        font-size:24rpx;
    }}    .setMeal_fd1_0_c1_c3_c1_babdd{
        border-radius:28rpx 28rpx 28rpx 28rpx;font-size:24rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:130rpx;height:56rpx;line-height:56rpx;
    }}}}
    .setMeal_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .setMeal_fd0_0_babdd{
        width:100rpx;height:88rpx;margin:0rpx 0rpx 0rpx 32rpx;
        .setMeal_fd0_0_c0_babdd{
        font-size:36rpx;color:#333;
    }}    .setMeal_fd0_1_babdd{
        font-weight:700;font-size:32rpx;
    }    .setMeal_fd0_2_babdd{
        width:100rpx;height:88rpx;margin:0rpx 32rpx 0rpx 0rpx;
    }}}
</style>