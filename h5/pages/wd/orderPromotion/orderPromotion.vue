<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex orderPromotion_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub orderPromotion_fd0_0_babdd'      >
            <view   class='flex align-center orderPromotion_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  orderPromotion_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='orderPromotion_fd0_0_c1_c0_babdd'  >{{$t('订单明细')}}</text>
<image class='orderPromotion_fd0_0_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"192.png"' @tap.stop="popupShow1692095898551=true" v-if= " appSystemIdentification=='Wechat'"></image>
</view>
    <view   class='flex align-center justify-end orderPromotion_fd0_0_c0_babdd'      >
        <image class='orderPromotion_fd0_0_c2_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"192.png"' @tap.stop="popupShow1692095898551=true" v-if= " appSystemIdentification!='Wechat'"></image>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---推广订单-推广flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout"    >
        <view>
        <benben-flex-tabs class-text='orderPromotion_benbenTabsfd1_0_babdd'  v-model="tabs" ref="benben_tabsfd1_0" select-mark="benben_tabsfd1_0" key="benben_tabsfd1_0" :open-title-type='false' :open-sticky='true' :top='88' :is-show-content='false' :scrollspy='false'  :tabs-info.sync="tabsInfofd1_0" @change="queryMessageFunc()" >
            
                    <scroll-view :throttle='false'
          @scroll="tabsInfofd1_0.scrollX = $event.detail.scrollLeft"
          id="benben_tabsfd1_0"
          class="benben-tabs"
          style="width:750rpx"
          :scroll-x="true"
          :scroll-left="tabsInfofd1_0.moveX"
          scroll-with-animation="all .3s ease"
          :show-scrollbar='false'
          :enhanced="true"
        >
          <view class="benben-tabs-content" id="benben_tabsfd1_0-content">
            <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex flex align-center justify-around">
                        <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == 'all', 'flex flex-wrap align-center': true }"
                @tap="tabs = 'all'"
                :id="`benben_tabsfd1_0-title-item-${'all'}`"
                
                
              >
                
<text   >{{$t('全部')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == 'payed', 'flex flex-wrap align-center': true }"
                @tap="tabs = 'payed'"
                :id="`benben_tabsfd1_0-title-item-${'payed'}`"
                
                
              >
                
<text   >{{$t('已付款')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == 'completed', 'flex flex-wrap align-center': true }"
                @tap="tabs = 'completed'"
                :id="`benben_tabsfd1_0-title-item-${'completed'}`"
                
                
              >
                
<text   >{{$t('已完成')}}</text>

              </view>
            </view>
            <view :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth ,}" id="benben_tabsfd1_0-line" class="benben-tabs-line flex benben-flex-tabs-line orderPromotion_linefd1_0_babdd" :class="{'benben-tabs-line-active':tabsInfofd1_0.isInit}"></view>
          </view>
        </scroll-view>
            
        </benben-flex-tabs>
        
</view>
    <view   class='flex flex-direction flex-wrap align-stretch orderPromotion_fd1_1_babdd'      >
            <template v-for = '(item,key0) in dataMessage'>
    <view   class='flex flex-direction flex-wrap align-stretch orderPromotion_fd1_1_c0_babdd'       :key='key0'>
            <view   class='flex flex-wrap align-center'      >
        <image class='orderPromotion_fd1_1_c0_c0_c0_babdd'  mode="aspectFill"  :src='item.avatar'></image>
<text class='flex-sub orderPromotion_fd1_1_c0_c0_c1_babdd'  >{{item.nickname}}</text>
<text class='orderPromotion_fd1_1_c0_c0_c2_babdd'  >{{item.status_text}}</text>
</view>
    <view   class='flex flex-direction align-stretch orderPromotion_fd1_1_c0_c1_babdd'      >
            <view   class='flex align-stretch orderPromotion_fd1_1_c0_c1_c0_babdd'      >
        <image class='orderPromotion_fd1_1_c0_c1_c0_c0_babdd'  mode="aspectFill"  :src='item.goods_thumb'></image>
    <view   class='flex flex-direction align-stretch flex-sub orderPromotion_fd1_1_c0_c1_c0_c1_babdd'      >
        <text class='orderPromotion_fd1_1_c0_c1_c0_c1_c0_babdd'  >{{item.goods_name}}</text>
    <view   class='flex flex-wrap align-center orderPromotion_fd1_1_c0_c1_c0_c1_c1_babdd'      >
        <text class='orderPromotion_fd1_1_c0_c1_c0_c1_c1_c0_babdd'  >{{item.sku_name}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-between orderPromotion_fd1_1_c0_c1_c0_c1_c2_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='orderPromotion_fd1_1_c0_c1_c0_c1_c2_c0_c0_babdd'  >{{$t('￥')}}</text>
<text class=' orderPromotion_fd1_1_c0_c1_c0_c1_c2_c0_c1_babdd'   >
    <text class=' orderPromotion_price1_fd1_1_c0_c1_c0_c1_c2_c0_c1_babdd' >{{ item.goods_price | frontPrice }}</text><text class=' orderPromotion_price2_fd1_1_c0_c1_c0_c1_c2_c0_c1_babdd' >{{ item.goods_price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center orderPromotion_fd1_1_c0_c1_c0_c1_c2_c1_babdd'      >
        <text class='orderPromotion_fd1_1_c0_c1_c0_c1_c2_c1_c0_babdd'  >x</text>
<text class='orderPromotion_fd1_1_c0_c1_c0_c1_c2_c1_c0_babdd'  >{{item.goods_num}}</text>
</view>
</view>
</view>
</view>
</view>
    <view   class='flex flex-wrap align-center orderPromotion_fd1_1_c0_c2_babdd'      >
        <text   >{{$t('收益等级：')}}</text>
<text   >{{item.detail_level}}</text>
</view>
    <view   class='flex flex-wrap align-center orderPromotion_fd1_1_c0_c2_babdd'      >
        <text   >{{$t('订单编号：')}}</text>
<text   >{{item.order_sn}}</text>
</view>
    <view   class='flex flex-wrap align-center orderPromotion_fd1_1_c0_c4_babdd'      >
        <text   >{{$t('下单时间：')}}</text>
<text   >{{item.create_time}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-between orderPromotion_fd1_1_c0_c5_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='orderPromotion_fd1_1_c0_c5_c0_c0_babdd'  >{{$t('订单商品总额')}}</text>
<text class='orderPromotion_fd1_1_c0_c5_c0_c0_babdd'  >{{$t('￥')}}</text>
<text class='orderPromotion_fd1_1_c0_c5_c0_c0_babdd'  >{{item.order_total}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='orderPromotion_fd1_1_c0_c5_c1_c0_babdd'  >{{$t('预计收益')}}</text>
<text class='orderPromotion_fd1_1_c0_c5_c1_c1_babdd'  >{{$t('￥')}}</text>
<text class='orderPromotion_fd1_1_c0_c5_c1_c2_babdd'  >{{item.detail_bonus}}</text>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
</view>
        
<!---推广订单-推广flex布局结束-->
<benben-popup v-model="popupShow1692095898551" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---flex布局flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center"    >
        <benben-calendar-diy  mode='range' year-arrow-color='#666666' month-arrow-color='#666666' start-text=' ' end-text=' ' active-bg-color='rgba(41,121,255,1)' range-bg-color='rgba(41,121,255,0.13)' :future='false' :change-title='true' :change-year='true' :change-month='true' class='orderPromotion_fd2_0_babdd'  @change="queryMessageFunc()"  :start-time.sync="time_start" :end-time.sync="time_end"></benben-calendar-diy>
</view>
        
<!---flex布局flex布局结束-->
    
</benben-popup>
    
    
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
			return {"popupShow1692095898551":false,"tabsInfofd1_0":{ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0, isInit: false },"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"tabs":"all","dataMessage":[],"time_end":"","time_start":"","time":""};
		},
		computed:{
                  /**
     * @returns 
      * Android       安卓
      * IOS       苹果
      * Web       H5 或 pc
      * Wechat       微信小程序
      * Alipay       支付宝小程序
      * Baidu       百度小程序
      * ByteBounce       抖音小程序
      * 360       360小程序
      * FastApp       快应用
    */
    appSystemIdentification() {
      return this.$store.state.appSystemIdentification
    }
		},
		watch:{},
		onLoad(options){
            let {time}=options
if (time !== undefined) this.time = time
this.dateTransFunc()
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
            this.dateTransFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //计算每月的时间
                 dateTransFunc(){
                        if( this.time=='month'){
             let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = (month > 9) ? month : ("0" + month);
        day = (day < 10) ? ("0" + day) : day;
        this.time_end = year + "-" + month + "-" + day;
        this.time_start = year + "-" + month + "-01";
    }
                    this.queryMessageFunc()
                },
                //分销中心-获取推广订单
                 queryMessageFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post62fb8d520a146;
                this.pageingListApiMethod = 'aGet';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {start_time:this.time_start,end_time:this.time_end,status:this.tabs}
                this.listData = [];
                this.dataMessage = this.listData;
                this.pagingListToggle();
                
    this.popupShow1692095898551 = false;
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
            background:#F8F8F8;background-size: 100% auto;
            .orderPromotion_fd2_0_babdd{
        width:640rpx;background:#ffffff;border-radius:24rpx;padding:12rpx;--active-bg-color:var(--benbenbgColor7);--range-bg-color:var(--benbenbgColor3);
    }
    .checkTitlefd1_0_babdd{
        font-weight:700 !important;font-size:32 !important;color:var(--benbenFontColor4) !important;background-color:var(--benbenFontColor3) !important;
    }
    .orderPromotion_linefd1_0_babdd{
        width:40rpx;height:8rpx;top:80rpx;background:var(--benbenbgColor2);background-size:100% auto !important;border-radius:16rpx;
    }
    .orderPromotion_fd1_1_babdd{
        padding:24rpx 24rpx 0rpx 24rpx;
        .orderPromotion_fd1_1_c0_babdd{
        border-radius:16rpx 16rpx 16rpx 16rpx;background:#FFFFFF;padding:32rpx 19rpx 0rpx 24rpx;margin:0rpx 0rpx 24rpx 0rpx;
        .orderPromotion_fd1_1_c0_c0_c0_babdd{
        width:48rpx;height:48rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }    .orderPromotion_fd1_1_c0_c0_c1_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:400;line-height:40rpx;margin:0rpx 0rpx 0rpx 18rpx;
    }    .orderPromotion_fd1_1_c0_c0_c2_babdd{
        color:var(--benbenFontColor4);font-size:28rpx;font-weight:600;line-height:40rpx;
    }    .orderPromotion_fd1_1_c0_c1_babdd{
        background:#fff;background-size:100% auto !important;
        .orderPromotion_fd1_1_c0_c1_c0_babdd{
        margin:24rpx 0rpx 24rpx 0rpx;
        .orderPromotion_fd1_1_c0_c1_c0_c0_babdd{
        width:200rpx;height:200rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }    .orderPromotion_fd1_1_c0_c1_c0_c1_babdd{
        margin:0rpx 0rpx 0rpx 24rpx;
        .orderPromotion_fd1_1_c0_c1_c0_c1_c0_babdd{
        font-size:28rpx;font-weight:600;color:var(--benbenFontColor0);-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;line-height:42rpx;
    }    .orderPromotion_fd1_1_c0_c1_c0_c1_c1_babdd{
        margin:16rpx 0rpx 30rpx 0rpx;color:#999999;font-size:24rpx;line-height:33rpx;font-weight:400;
        .orderPromotion_fd1_1_c0_c1_c0_c1_c1_c0_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;line-height:33rpx;
    }}    .orderPromotion_fd1_1_c0_c1_c0_c1_c2_babdd{
        margin:auto 0rpx 0rpx 0rpx;
        .orderPromotion_fd1_1_c0_c1_c0_c1_c2_c0_c0_babdd{
        font-size:20rpx;font-weight:700;color:var(--benbenFontColor5);
    }    .orderPromotion_fd1_1_c0_c1_c0_c1_c2_c0_c1_babdd{
        color:var(--benbenFontColor5);font-weight:600;
        .orderPromotion_price1_fd1_1_c0_c1_c0_c1_c2_c0_c1_babdd{
        font-size:32rpx;
    }    .orderPromotion_price2_fd1_1_c0_c1_c0_c1_c2_c0_c1_babdd{
        font-size:22rpx;
    }}    .orderPromotion_fd1_1_c0_c1_c0_c1_c2_c1_babdd{
        font-size:24rpx;font-weight:400;color:#999999;line-height:33rpx;
    }}}}}    .orderPromotion_fd1_1_c0_c4_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;line-height:42rpx;font-weight:400;padding:0rpx 0rpx 24rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }    .orderPromotion_fd1_1_c0_c5_babdd{
        padding:24rpx 0rpx 32rpx 0rpx;
        .orderPromotion_fd1_1_c0_c5_c1_c0_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:42rpx;margin:0rpx 16rpx 0rpx 0rpx;
    }    .orderPromotion_fd1_1_c0_c5_c1_c1_babdd{
        color:var(--benbenFontColor5);font-size:24rpx;font-weight:700;line-height:42rpx;
    }    .orderPromotion_fd1_1_c0_c5_c1_c2_babdd{
        color:var(--benbenFontColor5);font-size:36rpx;font-weight:700;line-height:42rpx;
    }}}}
    .orderPromotion_fd1_1_c0_c1_c0_c1_c2_c1_c0_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:33rpx;
    }
    .orderPromotion_fd1_1_c0_c2_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;line-height:42rpx;font-weight:400;margin:0rpx 0rpx 24rpx 0rpx;
    }
    .orderPromotion_fd1_1_c0_c5_c0_c0_babdd{
        color:var(--benbenFontColor5);font-size:24rpx;font-weight:400;line-height:42rpx;
    }
    .orderPromotion_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .orderPromotion_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .orderPromotion_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:#333;
    }    .orderPromotion_fd0_0_c1_c1_babdd{
        width:36rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 24rpx;
    }}}
    .orderPromotion_fd0_0_c0_babdd{
        width:120rpx;
        .orderPromotion_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:#333;
    }}
    .orderPromotion_fd0_0_c2_c0_babdd{
        width:36rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}
    ::v-deep .orderPromotion_benbenTabsfd1_0_babdd{
        width:750rpx;height:90rpx;white-space:nowrap;background:var(--benbenbgColor1);text-align:center;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
</style>