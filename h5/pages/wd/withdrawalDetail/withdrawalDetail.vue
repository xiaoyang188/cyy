<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center withdrawalDetail_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub withdrawalDetail_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-center withdrawalDetail_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  withdrawalDetail_fd0_0_c0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1" >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='withdrawalDetail_fd0_0_c1_c0_babdd'  >{{$t('提现明细')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-center withdrawalDetail_fd0_0_c0_babdd'   @tap.stop="popupShow1772605739359=true"   >
        <text class='fu-iconfont2  withdrawalDetail_fd0_0_c2_c0_babdd'  >&#xe6e5;</text>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>

 <view class="flex benben-flex-layout flex-wrap align-center"    >
            <view   class='flex flex-direction flex-wrap align-stretch flex-sub withdrawalDetail_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-between withdrawalDetail_fd1_0_c0_babdd'    v-if= "start_time!='' && end_time!=''"  >
            <view   class='flex flex-wrap align-center withdrawalDetail_fd1_0_c0_c0_babdd'      >
        <text   >{{$t('筛选区间：')}}</text>
<text   >{{start_time}}</text>
<text   >{{$t('至')}}</text>
<text   >{{end_time}}</text>
</view>
<image class='withdrawalDetail_fd1_0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"1646.png"' @tap.stop="clearTimeFunc()" ></image>
</view>
    <template v-for = '(item,key0) in withdrawalDetails'>
    <view   class='flex flex-direction flex-wrap align-stretch withdrawalDetail_fd1_0_c1_babdd'       :key='key0'>
            <view   class='flex flex-wrap align-center justify-between withdrawalDetail_fd1_0_c1_c0_babdd'      >
        <text class='withdrawalDetail_fd1_0_c1_c0_c0_babdd'  >{{item.remark}}</text>
    <view   class='flex flex-wrap align-center'      >
        <text class='withdrawalDetail_fd1_0_c1_c0_c1_c0_babdd'      >{{item.change_money}}</text>
</view>
</view>
    <view   class='flex align-stretch flex-wrap withdrawalDetail_fd1_0_c1_c1_babdd'    v-if= " item.check_status=='3'"  >
        <text   >{{$t('驳回原因:')}}</text>
<text   >{{item.check_reason}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-between'      >
        <text class='withdrawalDetail_fd1_0_c1_c2_c0_babdd'  >{{item.create_time}}</text>
    <view   class='flex flex-wrap align-center'      >
        <text class='withdrawalDetail_fd1_0_c1_c2_c1_c0_babdd'    v-if= "item.check_status=='1'"  >{{$t('待审核')}}</text>
<text class='withdrawalDetail_fd1_0_c1_c2_c1_c1_babdd'    v-if= "item.check_status=='3'"  >{{$t('审核驳回')}}</text>
<text class='withdrawalDetail_fd1_0_c1_c2_c1_c0_babdd'    v-if= " item.check_status=='2' && item.cash_status=='1'"  >{{$t('待打款')}}</text><text class='withdrawalDetail_fd1_0_c1_c2_c1_c0_babdd'    v-if= " item.check_status=='2' && item.cash_status=='2'"  >{{$t('已打款')}}</text><text class='withdrawalDetail_fd1_0_c1_c2_c1_c0_babdd'    v-if= " item.check_status=='2' && item.cash_status=='3'"  >{{$t('打款异常')}}</text>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
</view>
        

<benben-popup v-model="popupShow1772605739359" :mask="true" :mask-close-able="true"  mode='center' :z-index='999' >
    <!---日历弹窗flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap flex-direction align-stretch"    >
            <view   class='flex flex-wrap align-center withdrawalDetail_fd2_0_babdd'      >
        <benben-calendar-diy  mode='range' year-arrow-color='#666666' month-arrow-color='#666666' start-text='开始' end-text='结束' :future='false' :extend-month='false' :no-past='false' :no-current='false' :change-title='true' :change-year='true' :change-month='true' class='withdrawalDetail_fd2_0_c0_babdd'  @change="getuj36f481b67084Func()"  :start-time.sync="start_time" :end-time.sync="end_time"></benben-calendar-diy>
</view>
</view>
        
<!---日历弹窗flex布局结束-->
    
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
			return {"popupShow1772605739359":false,"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"withdrawalDetails":[],/** end_time【结束时间】 **/ "end_time":"",/** start_time【开始时间】 **/ "start_time":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.getuj36f481b67084Func()
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
            
            
                            //清除时间
                 clearTimeFunc(){
                       this.start_time = '';
   this.end_time = '';
                    this.getuj36f481b67084Func()
                },
                //钱包-提现明细
                 getuj36f481b67084Func(){
                                    this.minixPagingListsApi = global.apiUrls.post636f481b67084;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {start_time:this.start_time,end_time:this.end_time}
                this.listData = [];
                this.withdrawalDetails = this.listData;
                this.pagingListToggle();
                
    this.popupShow1772605739359 = false;
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
            .withdrawalDetail_fd2_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto;padding:16rpx;border-radius:16rpx;
        .withdrawalDetail_fd2_0_c0_babdd{
        width:650rpx;background:#ffffff;--range-bg-color:var(--benbenbgColor2);--active-bg-color:var(--benbenbgColor3);
    }}
    .withdrawalDetail_fd1_0_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .withdrawalDetail_fd1_0_c0_babdd{
        background:var(--benbenbgColor0);background-size:100% auto !important;padding:16rpx 0rpx 0rpx 0rpx;
        .withdrawalDetail_fd1_0_c0_c0_babdd{
        line-height:33rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor5);
    }    .withdrawalDetail_fd1_0_c0_c1_babdd{
        width:32rpx;height:32rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}    .withdrawalDetail_fd1_0_c1_babdd{
        padding:32rpx 24rpx 32rpx 24rpx;border-bottom:1px solid var(--benbenbdColor0);background:var(--benbenbgColor1);background-size:100% auto;border-radius:16rpx;margin:24rpx 0rpx 0rpx 0rpx;
        .withdrawalDetail_fd1_0_c1_c0_babdd{
        margin:0rpx 0rpx 20rpx 0rpx;
        .withdrawalDetail_fd1_0_c1_c0_c0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;line-height:53rpx;
    }    .withdrawalDetail_fd1_0_c1_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;
    }}    .withdrawalDetail_fd1_0_c1_c1_babdd{
        margin:0rpx 0rpx 20rpx 0rpx;color:var(--benbenFontColor4);
    }    .withdrawalDetail_fd1_0_c1_c2_c0_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:53rpx;margin:0rpx 0rpx 2rpx 0rpx;
    }    .withdrawalDetail_fd1_0_c1_c2_c1_c1_babdd{
        color:var(--benbenFontColor5);font-size:24rpx;font-weight:500;line-height:53rpx;
    }}}
    .withdrawalDetail_fd1_0_c1_c2_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:24rpx;font-weight:500;line-height:53rpx;
    }
    .withdrawalDetail_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .withdrawalDetail_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .withdrawalDetail_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);line-height:88rpx;
    }}}
    .withdrawalDetail_fd0_0_c0_babdd{
        width:50rpx;height:50rpx;
        .withdrawalDetail_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}
    .withdrawalDetail_fd0_0_c2_c0_babdd{
        color:var(--benbeniconColor2);
    }}
</style>