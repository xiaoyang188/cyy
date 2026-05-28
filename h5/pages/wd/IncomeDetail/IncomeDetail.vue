<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex IncomeDetail_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub IncomeDetail_fd0_0_babdd'      >
            <view   class='flex align-center IncomeDetail_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  IncomeDetail_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='IncomeDetail_fd0_0_c1_c0_babdd'  >{{$t('收益明细')}}</text>
</view>
    <view   class='flex align-center justify-end IncomeDetail_fd0_0_c0_babdd'      >
        <image class='IncomeDetail_fd0_0_c2_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"192.png"' @tap.stop="popupShow1691659233892=true" v-if= " appSystemIdentification!='Wechat'"></image>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---收益明细-收益flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout"    >
        <view>
        <benben-flex-tabs class-text='IncomeDetail_benbenTabsfd1_0_babdd'  v-model="tabs" ref="benben_tabsfd1_0" select-mark="benben_tabsfd1_0" key="benben_tabsfd1_0" :open-title-type='false' :open-sticky='true' :top='88' :is-show-content='false' :scrollspy='false'  :tabs-info.sync="tabsInfofd1_0" @change="queryListFunc()" >
            
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
                :class="{ 'checkTitlefd1_0_babdd': tabs == 'unsettle', 'flex flex-wrap align-center': true }"
                @tap="tabs = 'unsettle'"
                :id="`benben_tabsfd1_0-title-item-${'unsettle'}`"
                
                
              >
                
<text   >{{$t('待结算')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == 'settled', 'flex flex-wrap align-center': true }"
                @tap="tabs = 'settled'"
                :id="`benben_tabsfd1_0-title-item-${'settled'}`"
                
                
              >
                
<text   >{{$t('已结算')}}</text>

              </view>
            </view>
            <view :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth ,}" id="benben_tabsfd1_0-line" class="benben-tabs-line flex benben-flex-tabs-line IncomeDetail_linefd1_0_babdd" :class="{'benben-tabs-line-active':tabsInfofd1_0.isInit}"></view>
          </view>
        </scroll-view>
            
        </benben-flex-tabs>
        
</view>
    <view   class='flex flex-wrap align-center IncomeDetail_fd1_1_babdd'    v-if= " appSystemIdentification=='Wechat'"  >
            <view   class='flex flex-wrap align-center IncomeDetail_fd1_1_c0_babdd'   @tap.stop="popupShow1691659233892=true"   >
        <text class='flex-sub IncomeDetail_fd1_1_c0_c0_babdd'    v-if= " start_time==''"  >{{$t('选择时间')}}</text>
    <view   class='flex flex-wrap align-center IncomeDetail_fd1_1_c0_c1_babdd'    v-if= " start_time!=''"  >
        <text class='IncomeDetail_fd1_1_c0_c1_c0_babdd'      >{{start_time}}</text>
<text class='IncomeDetail_fd1_1_c0_c1_c0_babdd'      >~</text><text class='IncomeDetail_fd1_1_c0_c1_c1_1_babdd'    v-if= "start_time==''"  >{{$t('开始时间')}}</text>
<text class='IncomeDetail_fd1_1_c0_c1_c0_babdd'      >{{end_time}}</text>
</view>
<image class='IncomeDetail_fd1_1_c0_c2_babdd'  mode="aspectFit"  :src='STATIC_URL+"358.png"'  v-if= " start_time==''"></image>
<image class='IncomeDetail_fd1_1_c0_c2_babdd'  mode="aspectFit"  :src='STATIC_URL+"85.png"' @tap.stop="dltDateFunc()" v-if= " start_time!=''"></image>
</view>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch IncomeDetail_fd1_2_babdd'      >
            <template v-for = '(child,key1) in dataList'>
    <view   class='flex flex-direction flex-wrap align-stretch IncomeDetail_fd1_2_c0_babdd'       :key='key1'>
        <text class='IncomeDetail_fd1_2_c0_c0_babdd'  >{{child.create_time}}</text>
    <view   class='flex flex-wrap align-center IncomeDetail_fd1_2_c0_c1_babdd'      >
        <text class='IncomeDetail_fd1_2_c0_c1_c0_babdd'  >{{$t('收益金额：')}}</text>
<text class='IncomeDetail_fd1_2_c0_c1_c0_babdd'  >{{$t('￥')}}</text>
<text class='flex-sub IncomeDetail_fd1_2_c0_c1_c0_babdd'      >{{child.detail_bonus}}</text>
<text class='IncomeDetail_fd1_2_c0_c1_c3_babdd'    v-if= "child.is_settle=='0'"  >{{child.settle_status}}</text><text class='IncomeDetail_fd1_2_c0_c1_c3_1_babdd'    v-if= "child.is_settle=='1'"  >{{child.settle_status}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='IncomeDetail_fd1_2_c0_c2_c0_babdd'  >{{$t('订单编号：')}}</text>
<text class='IncomeDetail_fd1_2_c0_c2_c0_babdd'  >{{child.order_sn}}</text>
</view>
    <view   class='flex flex-wrap align-center IncomeDetail_fd1_2_c0_c3_babdd'      >
        <text class='IncomeDetail_fd1_2_c0_c2_c0_babdd'  >{{$t('订单金额：')}}</text>
<text class='IncomeDetail_fd1_2_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class='IncomeDetail_fd1_2_c0_c2_c0_babdd'  >{{child.order_total}}</text>
</view>
    <view   class='flex flex-wrap align-center IncomeDetail_fd1_2_c0_c4_babdd'      >
            <view   class='IncomeDetail_fd1_2_c0_c4_c0_babdd'      >
        <text class='IncomeDetail_fd1_2_c0_c4_c0_c0_babdd'  >{{$t('购买')}}</text>
<text class='IncomeDetail_fd1_2_c0_c4_c0_c0_babdd'  >{{child.goods_name}}</text>
<text class='IncomeDetail_fd1_2_c0_c4_c0_c0_babdd'    v-if= " child.is_settle==0"  >,</text><text class='IncomeDetail_fd1_2_c0_c4_c0_c2_1_babdd'    v-if= " child.is_settle!=0"  >{{$t('，获得返佣')}}</text>
<text class='IncomeDetail_fd1_2_c0_c4_c0_c3_babdd'    v-if= " child.is_settle==0"  >{{$t('预计获得返佣')}}</text><text class='IncomeDetail_fd1_2_c0_c4_c0_c2_1_babdd'    v-if= " child.is_settle!=0"  >{{$t('获得返佣')}}</text>
<text class='IncomeDetail_fd1_2_c0_c4_c0_c0_babdd'  >{{child.detail_bonus}}</text>
<text class='IncomeDetail_fd1_2_c0_c4_c0_c0_babdd'  >{{$t('元')}}</text>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
</view>
        
<!---收益明细-收益flex布局结束-->
<benben-popup v-model="popupShow1691659233892" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---flex布局flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center"    >
        <benben-calendar-diy  mode='range' year-arrow-color='var(--benbenFontColor2)' month-arrow-color='var(--benbenFontColor2)' start-text=' ' end-text=' ' active-bg-color='rgba(41,121,255,1)' range-bg-color='rgba(41,121,255,0.13)' :future='false' :change-title='true' :change-year='true' :change-month='true' class='IncomeDetail_fd2_0_babdd'  @change="queryListFunc()"  :start-time.sync="start_time" :end-time.sync="end_time"></benben-calendar-diy>
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
			return {"popupShow1691659233892":false,"tabsInfofd1_0":{ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0, isInit: false },"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"tabs":"all",/** start_time【开始时间】 **/ "start_time":"",/** end_time【结束时间】 **/ "end_time":"","dataList":[],"time":""};
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
            
            
                            //获取本月时间
                 dateTransFunc(){
                        if( this.time!=''){
            let date = new Date()
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = (month > 9) ? month : ("0" + month);
        day = (day < 10) ? ("0" + day) : day;
        this.end_time = year + "-" + month + "-" + day;
        if(this.time == 'day'){
          this.start_time = this.end_time
        } else {
          this.start_time = year + "-" + month + "-01";
        }
    }
                    this.queryListFunc()
                },
                //分销列表
                 queryListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post62fb89d7689da;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {start_time:this.start_time,end_time:this.end_time,is_settle:this.tabs}
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
                
    this.popupShow1691659233892 = false;
                },
                //清除时间
                 dltDateFunc(){
                       this.start_time = '';
   this.end_time = '';
                    this.queryListFunc()
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
            .IncomeDetail_fd2_0_babdd{
        width:622rpx;background:var(--benbenbgColor1);border-radius:24rpx;padding:12rpx 012rpx 012rpx 012rpx;--active-bg-color:var(--benbenbgColor3);--range-bg-color:var(--benbenbtnColor2);
    }
    .checkTitlefd1_0_babdd{
        font-weight:700 !important;font-size:32rpx !important;color:var(--benbenFontColor4) !important;background-color:var(--benbenbgColor0) !important;
    }
    .IncomeDetail_linefd1_0_babdd{
        width:40rpx;height:8rpx;top:80rpx;background:var(--benbenbgColor2);background-size:100% auto !important;border-radius:16rpx;
    }
    .IncomeDetail_fd1_1_babdd{
        padding:32rpx 0rpx 24rpx 24rpx;
        .IncomeDetail_fd1_1_c0_babdd{
        border-radius:8rpx 8rpx 8rpx 8rpx;border:1px solid #BFBFBF;background:var(--benbenbgColor0);padding:11rpx 20rpx 11rpx 20rpx;width:400rpx;
        .IncomeDetail_fd1_1_c0_c0_babdd{
        text-align:center;color:var(--benbenFontColor0);
    }    .IncomeDetail_fd1_1_c0_c1_babdd{
        color:#333333;margin:0rpx 31rpx 0rpx 0rpx;
        .IncomeDetail_fd1_1_c0_c1_c1_1_babdd{
        color:#333333;font-size:24rpx;font-weight:400;line-height:40rpx;
    }}}}
    .IncomeDetail_fd1_1_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:24rpx;font-weight:400;line-height:40rpx;
    }
    .IncomeDetail_fd1_1_c0_c2_babdd{
        width:30rpx;height:30rpx;margin:0rpx 0rpx 0rpx auto;
    }
    .IncomeDetail_fd1_2_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .IncomeDetail_fd1_2_c0_babdd{
        border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor1);padding:32rpx 24rpx 0rpx 24rpx;margin:0rpx 0rpx 20rpx 0rpx;
        .IncomeDetail_fd1_2_c0_c0_babdd{
        color:var(--benbenFontColor0);font-size:24rpx;font-weight:700;line-height:33rpx;
    }    .IncomeDetail_fd1_2_c0_c1_babdd{
        margin:16rpx 0rpx 16rpx 0rpx;
        .IncomeDetail_fd1_2_c0_c1_c3_babdd{
        color:var(--benbenFontColor4);font-size:28rpx;font-weight:400;line-height:30rpx;
    }    .IncomeDetail_fd1_2_c0_c1_c3_1_babdd{
        color:rgba(240, 35, 37, 1);font-size:28rpx;font-weight:400;line-height:30rpx;
    }}    .IncomeDetail_fd1_2_c0_c3_babdd{
        margin:16rpx 0rpx 0rpx 0rpx;padding:0rpx 0rpx 24rpx 0rpx;border-bottom:1px solid rgba(238, 238, 238, 1);
    }    .IncomeDetail_fd1_2_c0_c4_babdd{
        margin:32rpx 0rpx 32rpx 0rpx;
        .IncomeDetail_fd1_2_c0_c4_c0_babdd{
        color:var(--benbenFontColor0);
        .IncomeDetail_fd1_2_c0_c4_c0_c3_babdd{
        font-size:24rpx;font-weight:400;line-height:30rpx;color:var(--benbenFontColor5);
    }}}}}
    .IncomeDetail_fd1_2_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:600;line-height:30rpx;
    }
    .IncomeDetail_fd1_2_c0_c2_c0_babdd{
        color:var(--benbenFontColor1);font-size:22rpx;font-weight:400;line-height:30rpx;
    }
    .IncomeDetail_fd1_2_c0_c4_c0_c0_babdd{
        font-size:24rpx;font-weight:400;line-height:30rpx;
    }
    .IncomeDetail_fd1_2_c0_c4_c0_c2_1_babdd{
        color:var(--benbenFontColor5);font-size:24rpx;font-weight:400;line-height:30rpx;margin:24rpx 0rpx 32rpx 0rpx;
    }
    .IncomeDetail_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .IncomeDetail_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .IncomeDetail_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);
    }}}
    .IncomeDetail_fd0_0_c0_babdd{
        width:120rpx;
        .IncomeDetail_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}
    .IncomeDetail_fd0_0_c2_c0_babdd{
        width:36rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}
    ::v-deep .IncomeDetail_benbenTabsfd1_0_babdd{
        width:750rpx;height:90rpx;white-space:nowrap;background:var(--benbenbtnColor1);text-align:center;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
</style>