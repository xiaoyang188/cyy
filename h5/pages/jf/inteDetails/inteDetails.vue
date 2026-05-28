<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center inteDetails_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub inteDetails_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center inteDetails_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  inteDetails_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='inteDetails_fd0_0_c1_c0_babdd'  >{{$t('积分明细')}}</text>
<!-- <image class='inteDetails_fd0_0_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"192.png"' @tap.stop="popupShow1691659122562=true" v-if= " appSystemIdentification=='Wechat'"></image>
 --></view>
    <view   class='flex flex-wrap align-center'      >
        <image class='inteDetails_fd0_0_c2_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"192.png"' @tap.stop="popupShow1691659122562=true" v-if= " appSystemIdentification!='Wechat'"></image>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---tabs导航flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout"    >
        <view>
        <benben-flex-tabs class-text='inteDetails_benbenTabsfd1_0_babdd'  v-model="tabs" ref="benben_tabsfd1_0" select-mark="benben_tabsfd1_0" key="benben_tabsfd1_0" :open-title-type='false' :open-sticky='false' :top='0' :is-show-content='false' :scrollspy='false'  :tabs-info.sync="tabsInfofd1_0" @change="getListFunc()" >
            
    <view   class='flex flex-wrap align-center inteDetails_leftfd1_0_c0_babdd'      >
        </view>

                    <scroll-view :throttle='false'
          @scroll="tabsInfofd1_0.scrollX = $event.detail.scrollLeft"
          id="benben_tabsfd1_0"
          class="benben-tabs"
          style="width:686rpx"
          :scroll-x="true"
          :scroll-left="tabsInfofd1_0.moveX"
          scroll-with-animation="all .3s ease"
          :show-scrollbar='false'
          :enhanced="true"
        >
          <view class="benben-tabs-content" id="benben_tabsfd1_0-content">
            <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex align-center justify-between flex ">
                        <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '0', 'flex flex-wrap align-center self-center justify-center inteDetails_titlefd1_0_c3_babdd': true }"
                @tap="tabs = '0'"
                :id="`benben_tabsfd1_0-title-item-${'0'}`"
                
                
              >
                
<text   >{{$t('全部')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '1', 'flex flex-wrap align-center justify-center inteDetails_titlefd1_0_c3_babdd': true }"
                @tap="tabs = '1'"
                :id="`benben_tabsfd1_0-title-item-${'1'}`"
                
                
              >
                
<text   >{{$t('收入记录')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '2', 'flex flex-wrap align-center justify-center inteDetails_titlefd1_0_c3_babdd': true }"
                @tap="tabs = '2'"
                :id="`benben_tabsfd1_0-title-item-${'2'}`"
                
                
              >
                
<text   >{{$t('支出记录')}}</text>

              </view>
            </view>
            <view :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth ,}" id="benben_tabsfd1_0-line" class="benben-tabs-line flex benben-flex-tabs-line inteDetails_linefd1_0_babdd" :class="{'benben-tabs-line-active':tabsInfofd1_0.isInit}"></view>
          </view>
        </scroll-view>
            
    <view   class='flex flex-wrap align-center inteDetails_leftfd1_0_c0_babdd'      >
        </view>

        </benben-flex-tabs>
        
</view>
    <template v-for = '(item,key0) in dataMessage'>
    <view   class='flex flex-wrap align-stretch flex-direction inteDetails_fd1_1_babdd'       :key='key0'>
            <view   class='flex flex-wrap align-center inteDetails_fd1_1_c0_babdd' :style="{'border-bottom':`${key0 != dataMessage.length-1?'1px solid rgba(238, 238, 238, 1)':''}`}"     >
            <view   class='flex flex-direction flex-wrap align-start flex-sub'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='inteDetails_fd1_1_c0_c0_c0_c0_babdd'      >{{$t('积分：')}}</text>
<text class='inteDetails_fd1_1_c0_c0_c0_c1_babdd'    v-if= "item.money_type=='1'"  >+</text>
<text class='inteDetails_fd1_1_c0_c0_c0_c2_babdd'    v-if= "item.money_type=='1'"  >{{item.change_score}}</text><text class='inteDetails_fd1_1_c0_c0_c0_c2_1_babdd'    v-if= "item.money_type=='2'"  >{{item.change_score}}</text>
</view>
<text class='inteDetails_fd1_1_c0_c0_c1_babdd'  >{{item.remark}}</text>
</view>
<text class='inteDetails_fd1_1_c0_c1_babdd'  >{{item.create_time_text}}</text>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
        
<!---tabs导航flex布局结束-->
<benben-popup v-model="popupShow1691659122562" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---flex布局flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center"    >
        <benben-calendar-diy  mode='range' year-arrow-color='#666666' month-arrow-color='#666666' start-text=' ' end-text=' ' active-bg-color='#F47040' range-bg-color='#FBF0EC' :future='false' :change-title='true' :change-year='true' :change-month='true' class='inteDetails_fd2_0_babdd'  @change="getListFunc()"  :start-time.sync="starttime" :end-time.sync="endtime"></benben-calendar-diy>
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
			return {"popupShow1691659122562":false,"tabsInfofd1_0":{ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0, isInit: false },"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"all":"1","starttime":"","endtime":"","tabs":"0","dataMessage":[]};
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
            
            
                            //积分商城-查询积分明细
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post64145f67a43bf;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {type:this.tabs,start_time:this.starttime,end_time:this.endtime}
                this.listData = [];
                this.dataMessage = this.listData;
                this.pagingListToggle();
                
    this.popupShow1691659122562 = false;
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
            .inteDetails_fd2_0_babdd{
        width:622rpx;background:#ffffff;border-radius:24rpx;padding:12rpx 012rpx 012rpx 012rpx;
    }
    .checkTitlefd1_0_babdd{
        font-weight:500 !important;font-size:32rpx !important;color:var(--benbenFontColor4) !important;background-color:var(--benbenbgColor1) !important;
    }
    .inteDetails_leftfd1_0_c0_babdd{
        width:32rpx;height:100%;
    }
    .inteDetails_linefd1_0_babdd{
        width:30rpx;height:6rpx;top:80rpx;background:var(--benbenbtnColor0);background-size:100% auto !important;border-radius:10rpx 10rpx 10rpx 10rpx;
    }
    .inteDetails_titlefd1_0_c3_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);width:200rpx;
    }
    .inteDetails_bodyfd1_0_c3_babdd{
        padding:24rpx 0rpx 0rpx 0rpx;
    }
    .inteDetails_fd1_1_babdd{
        margin:12rpx 0rpx 0rpx 0rpx;
        .inteDetails_fd1_1_c0_babdd{
        padding:28rpx 28rpx 28rpx 28rpx;border-bottom:1px solid #eee;background:var(--benbenbgColor1);background-size:100% auto;border-radius:16rpx;margin:12rpx 32rpx 12rpx 32rpx;
        .inteDetails_fd1_1_c0_c0_c0_c0_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .inteDetails_fd1_1_c0_c0_c0_c1_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor5);margin:0rpx 9rpx 0rpx 8rpx;
    }    .inteDetails_fd1_1_c0_c0_c0_c2_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor5);
    }    .inteDetails_fd1_1_c0_c0_c0_c2_1_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }    .inteDetails_fd1_1_c0_c0_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);margin:14rpx 0rpx 0rpx 0rpx;
    }    .inteDetails_fd1_1_c0_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor2);
    }}}
    .inteDetails_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .inteDetails_fd0_0_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .inteDetails_fd0_0_c0_babdd{
        width:40rpx;
        .inteDetails_fd0_0_c0_c0_babdd{
        font-size:35rpx;font-weight:500;color:var(--benbeniconColor1);
    }}    .inteDetails_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);
    }    .inteDetails_fd0_0_c1_c1_babdd{
        width:36rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 24rpx;
    }    .inteDetails_fd0_0_c2_c0_babdd{
        width:36rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}}}
    ::v-deep .inteDetails_benbenTabsfd1_0_babdd{
        width:750rpx;height:94rpx;white-space:nowrap;background:var(--benbenbgColor1);text-align:center;
    }
</style>