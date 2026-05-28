<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center refundList_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub refundList_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center refundList_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  refundList_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='refundList_fd0_0_c1_c0_babdd'  >{{$t('退款/售后')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end refundList_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout"    >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction align-stretch refundList_fd1_0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/detailsRefund/detailsRefund?id=${item.aid}`"    :key='key0'>
            <view   class='flex align-center justify-between'      >
            <view   class='flex align-center justify-center'      >
        <text class='flex-sub refundList_fd1_0_c0_c0_c0_babdd'  >{{`订单号：${item.order_sn}`}}</text>
</view>
    <view   class='flex align-center'      >
        <text class='refundList_fd1_0_c0_c1_c0_babdd'    v-if= " item.refund_type=='1'"  >{{$t('退款')}}</text>
<text class='refundList_fd1_0_c0_c1_c0_babdd'    v-if= " item.refund_type=='2'"  >{{$t('退货退款')}}</text>
<text class='refundList_fd1_0_c0_c1_c0_babdd'    v-if= " item.refund_type=='3'"  >{{$t('换货')}}</text>
    <view   class='flex flex-wrap align-center refundList_fd1_0_c0_c1_c3_babdd'    v-if= " item.refund_type=='1' || item.refund_type=='2'"  >
        <text class='refundList_fd1_0_c0_c1_c3_c0_babdd'    v-if= " item.status==0"  >{{$t('待审核')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='1' && item.express_no==''"  >{{$t('待寄回')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='2'"  >{{$t('待退款')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='3'"  >{{$t('商家已收货')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='4'"  >{{$t('售后已完成')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status<0"  >{{$t('售后关闭')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='1' && item.express_no!=''"  >{{$t('待退款')}}</text>
</view>
    <view   class='flex flex-wrap align-center refundList_fd1_0_c0_c1_c3_babdd'    v-if= " item.refund_type=='3'"  >
        <text class='refundList_fd1_0_c0_c1_c3_c0_babdd'    v-if= " item.status==0"  >{{$t('待审核')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='1' && item.express_no==''"  >{{$t('待寄回')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='1' && item.express_no!='待收货'"  >{{$t('待审核')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='2'"  >{{$t('待发货')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='4'"  >{{$t('已发货')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status=='5'"  >{{$t('售后完成')}}</text><text class='refundList_fd1_0_c0_c1_c3_c0_1_babdd'    v-if= " item.status<0"  >{{$t('售后关闭')}}</text>
</view>
</view>
</view>
    <view   class='flex align-stretch refundList_fd1_0_c1_babdd'      >
        <image class='refundList_fd1_0_c1_c0_babdd'  mode="aspectFill"  :src='item.goods_thumb'></image>
    <view   class='flex flex-direction align-stretch flex-sub refundList_fd1_0_c1_c1_babdd'      >
        <text class='refundList_fd1_0_c1_c1_c0_babdd'  >{{item.goods_name}}</text>
<text class='refundList_fd1_0_c1_c1_c1_babdd'  >{{item.sku_name}}</text>
    <view   class='flex align-stretch'      >
        <text class='refundList_fd1_0_c1_c1_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' refundList_fd1_0_c1_c1_c2_c1_babdd'   >
    <text class=' refundList_price1_fd1_0_c1_c1_c2_c1_babdd' >{{ item.shop_price | frontPrice }}</text><text class=' refundList_price2_fd1_0_c1_c1_c2_c1_babdd' >{{ item.shop_price | laterPrice }}</text>
</text>
<text class='refundList_fd1_0_c1_c1_c2_c2_babdd'  >x</text>
<text class='refundList_fd1_0_c1_c1_c2_c3_babdd'  >{{item.num}}</text>
</view>
</view>
</view>
    <view   class='flex flex-wrap align-center justify-end'      >
        <button class='refundList_fd1_0_c2_c0_babdd'   v-if= " item.status=='2'" >{{$t('查看详情')}}</button><button class='refundList_fd1_0_c2_c0_1_babdd'  @tap.stop="getRefundDeleteIDFunc(item.aid)" v-if= " item.status=='4' || item.status=='5'" >{{$t('删除订单')}}</button><button class='refundList_fd1_0_c2_c0_1_babdd'  @tap.stop="getRefundDeleteIDFunc(item.aid)" v-if= " item.status<0" >{{$t('删除订单')}}</button><button class='refundList_fd1_0_c2_c0_1_babdd'   v-if= " item.status!='2'" >{{$t('查看详情')}}</button><button class='refundList_fd1_0_c2_c0_1_babdd'  @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/refundLogisticsCheck/refundLogisticsCheck?order_id=${item.aid}`" v-if= " item.status=='2'" >{{$t('查看物流')}}</button>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
        
<!---flex布局flex布局结束-->
<benben-popup v-model="popupShow1701398527969" :mask="true" :mask-close-able="true"  mode='center' :z-index='999' >
    <!---删除订单flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center"    >
            <view   class='flex flex-direction flex-wrap align-center refundList_fd2_0_babdd'      >
        <text class='refundList_fd2_0_c0_babdd'  >{{$t('提示')}}</text>
<text class='refundList_fd2_0_c1_babdd'  >{{$t('确定删除订单？')}}</text>
    <view   class='flex align-center refundList_fd2_0_c2_babdd'      >
        <button class='refundList_fd2_0_c2_c0_babdd'  @tap.stop="popupShow1701398527969=false"  >{{$t('取消')}}</button>
<button class='refundList_fd2_0_c2_c1_babdd'  @tap.stop="AfterSalesDeleteFunc()"  >{{$t('确定')}}</button>
</view>
</view>
</view>
        
<!---删除订单flex布局结束-->
    
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
			return {"popupShow1701398527969":false,"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataList":[],"RefundDeleteID":"","order_goods_id":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {order_goods_id}=options
if (order_goods_id !== undefined) this.order_goods_id = order_goods_id
this.diyPageListen()
		},
        onUnload() {
            this.diyOffPageListen()    
        },
		onReady(){
            
		},
		onShow(){
            this.getAfterListFunc()
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
            
            
                            //获取售后列表
                 getAfterListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post6427d125edfc5;
                this.pageingListApiMethod = 'post';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {order_goods_id:this.order_goods_id}
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
                
                },
                //获取售后订单id
                 getRefundDeleteIDFunc(id){
                       this.RefundDeleteID = id;
    this.popupShow1701398527969 = true;
                },
                //售后删除
                async AfterSalesDeleteFunc(){
                        //请求方法
    //数据验证
    
    
  let data6427dbbacba58 = await this.$api.post(global.apiUrls.post6427dbbacba58, {
    id:this.RefundDeleteID
  });
  
  if (data6427dbbacba58.data.code != 1) {
    this.$message.info(data6427dbbacba58.data.msg);
    return
  } 
  let info6427dbbacba58 = data6427dbbacba58.data;
  
  
    this.popupShow1701398527969 = false;
                setTimeout(()=>{
                            uni.showToast({
                        title:this.$t('删除成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
      },300)
                    this.getAfterListFunc()
                },
                pagingListPostData(){
                    return this.pagingListPostDataContent
                },
    //页面监听
    diyPageListen() {
                  uni.$on('shenqingchenggss',(data) => {
                                   this.getAfterListFunc()
          });
          uni.$on('shenqingchengg',(data) => {
                                   this.getAfterListFunc()
          });
    }                     ,
    //注销页面监听
    diyOffPageListen() {
                     uni.$off('shenqingchenggss');
             uni.$off('shenqingchengg');
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
            .refundList_fd2_0_babdd{
        width:540rpx;background:#fff;background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;
        .refundList_fd2_0_c0_babdd{
        line-height:44rpx;font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:40rpx 0rpx 0rpx 0rpx;
    }    .refundList_fd2_0_c1_babdd{
        line-height:44rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);text-align:center;margin:32rpx 40rpx 0rpx 40rpx;
    }    .refundList_fd2_0_c2_babdd{
        border-top:1px solid #eee;margin:51rpx 0rpx 0rpx 0rpx;
        .refundList_fd2_0_c2_c0_babdd{
        font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor1);width:270rpx;height:101rpx;line-height:101rpx;font-weight:400;border-right:1px solid var(--benbenbdColor0);
    }    .refundList_fd2_0_c2_c1_babdd{
        font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor0);width:270rpx;height:101rpx;line-height:101rpx;font-weight:500;
    }}}
    .refundList_fd1_0_babdd{
        margin:24rpx 24rpx 0rpx 24rpx;border-radius:16rpx;background:var(--benbenbgColor1);background-size:100% auto;padding:38rpx 24rpx 32rpx 24rpx;
        .refundList_fd1_0_c0_c0_c0_babdd{
        margin:0rpx 12rpx 0rpx 8rpx;font-size:28rpx;line-height:28rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;max-width:300rpx;color:var(--benbenFontColor0);
    }    .refundList_fd1_0_c1_babdd{
        margin:24rpx 0rpx 0rpx 0rpx;padding:0rpx 0rpx 32rpx 0rpx;border-bottom:1px solid #eee;
        .refundList_fd1_0_c1_c0_babdd{
        width:200rpx;height:200rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }    .refundList_fd1_0_c1_c1_babdd{
        margin:0rpx 0rpx 0rpx 24rpx;
        .refundList_fd1_0_c1_c1_c0_babdd{
        -webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;color:var(--benbenFontColor0);font-size:28rpx;font-weight:600;
    }    .refundList_fd1_0_c1_c1_c1_babdd{
        margin:16rpx 0rpx 30rpx 0rpx;color:var(--benbenFontColor1);font-size:24rpx;
    }    .refundList_fd1_0_c1_c1_c2_c0_babdd{
        color:var(--benbenFontColor0);font-size:24rpx;
    }    .refundList_fd1_0_c1_c1_c2_c1_babdd{
        color:var(--benbenFontColor0);font-weight:700;font-size:32rpx;
        .refundList_price1_fd1_0_c1_c1_c2_c1_babdd{
        font-size:32rpx;
    }    .refundList_price2_fd1_0_c1_c1_c2_c1_babdd{
        font-size:28rpx;
    }}    .refundList_fd1_0_c1_c1_c2_c2_babdd{
        margin:0rpx 0rpx 0rpx auto;color:var(--benbenFontColor2);font-size:24rpx;
    }    .refundList_fd1_0_c1_c1_c2_c3_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;
    }}}    .refundList_fd1_0_c2_c0_babdd{
        border-radius:33rpx 33rpx 33rpx 33rpx;width:144rpx;line-height:56rpx;font-size:24rpx;background:var(--benbenbtnColor3);color:var(--benbenFontColor0);margin:24rpx 0rpx 0rpx 24rpx;
    }}
    .refundList_fd1_0_c0_c1_c0_babdd{
        color:var(--benbenFontColor4);font-size:24rpx;padding:0rpx 10rpx 0rpx 11rpx;background:var(--benbenbtnColor2);background-size:100% auto;border:1px solid var(--benbenbdColor2);border-radius:40rpx 40rpx 0rpx 40rpx;
    }
    .refundList_fd1_0_c0_c1_c3_babdd{
        margin:0rpx 0rpx 0rpx 12rpx;
    }
    .refundList_fd1_0_c0_c1_c3_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:700;
    }
    .refundList_fd1_0_c0_c1_c3_c0_1_babdd{
        color:var(--benbenFontColor5);font-size:28rpx;font-weight:700;
    }
    .refundList_fd1_0_c2_c0_1_babdd{
        border-radius:33rpx 33rpx 33rpx 33rpx;width:144rpx;line-height:56rpx;font-size:24rpx;background:var(--benbenbgColor5);color:var(--benbenFontColor0);margin:24rpx 0rpx 0rpx 24rpx;
    }
    .refundList_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .refundList_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .refundList_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);line-height:88rpx;
    }}}
    .refundList_fd0_0_c0_babdd{
        width:120rpx;
        .refundList_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}}
</style>