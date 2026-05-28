<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex refundLogisticsCheck_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center refundLogisticsCheck_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='refundLogisticsCheck_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='refundLogisticsCheck_fd0_1_babdd'  >{{$t('查看物流')}}</text>
    <view   class='flex flex-wrap align-center refundLogisticsCheck_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---查看物流-物流详情flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout refundLogisticsCheck_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center refundLogisticsCheck_fd1_0_babdd'      >
        <image class='refundLogisticsCheck_fd1_0_c0_babdd'  mode="aspectFill"  :src='dataMessage.logo'></image>
    <view   class='flex flex-direction align-stretch flex-sub'      >
            <view   class='flex align-center refundLogisticsCheck_fd1_0_c1_c0_babdd'      >
        <text   >{{$t('订单编号：')}}</text>
<text class='flex-sub'  >{{dataMessage.OrderCode}}</text>
</view>
    <view   class='flex align-center refundLogisticsCheck_fd1_0_c1_c1_babdd'      >
        <text   >{{$t('物流公司：')}}</text>
<text   >{{dataMessage.ShipperCode}}</text>
</view>
    <view   class='flex align-center refundLogisticsCheck_fd1_0_c1_c2_babdd'      >
        <text   >{{$t('物流单号：')}}</text>
<text   >{{dataMessage.express_no}}</text>
</view>
</view>
</view>
    <view   class='flex align-center refundLogisticsCheck_fd1_1_babdd'      >
            <view   class='flex flex-wrap align-center refundLogisticsCheck_fd1_1_c0_babdd'      >
        </view>
<text class='refundLogisticsCheck_fd1_1_c1_babdd'  >{{$t('物流详情')}}</text>
</view>
    <template v-for = '(item,key0) in dataMessage.data'>
    <view   class='flex flex-direction align-stretch'       :key='key0'>
            <view   class='flex flex-direction align-stretch refundLogisticsCheck_fd1_2_c0_babdd'    v-if= " key0<messageLenth"  >
            <view   class='flex flex-wrap align-start'      >
        <image class='refundLogisticsCheck_fd1_2_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"183.png"'></image>
</view>
    <view   class='flex flex-direction align-stretch refundLogisticsCheck_fd1_2_c0_c1_babdd'      >
        <text class='flex-sub refundLogisticsCheck_fd1_2_c0_c1_c0_babdd'  >{{item.context}}</text>
<text class='refundLogisticsCheck_fd1_2_c0_c1_c1_babdd'  >{{item.time}}</text>
</view>
</view>
    <view   class='flex flex-direction align-stretch refundLogisticsCheck_fd1_2_c0_babdd'    v-if= " key0==messageLenth"  >
            <view   class='flex flex-wrap align-start'      >
        <image class='refundLogisticsCheck_fd1_2_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"183.png"'></image>
</view>
    <view   class='flex flex-direction align-stretch refundLogisticsCheck_fd1_2_c1_c1_babdd'      >
        <text class='flex-sub refundLogisticsCheck_fd1_2_c0_c1_c0_babdd'  >{{item.context}}</text>
<text class='refundLogisticsCheck_fd1_2_c0_c1_c1_babdd'  >{{item.time}}</text>
</view>
</view>
</view>
    </template>
    
<benben-empty :list-data="dataMessage.data">
<view>
<view class='flex flex-direction flex-wrap align-center refundLogisticsCheck_fd1_3_babdd' >
<image class='refundLogisticsCheck_fd1_3_c0_babdd'  mode="widthFix"  :src='STATIC_URL+"423.png"'></image>

</view>
</view>
</benben-empty>
</view>
        
<!---查看物流-物流详情flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** dataList【包裹列表】 **/ "dataList":[],/** OrderCode【订单编号】
*   goods_list【商品列表】
*   status【状态】
*   data【物流信息】
*   com【快递公司编码】
*   nu【快递单号】
*   logo【快递公司logo】
*   ShipperCode【快递公司名称】
*   express_no【物流单号】
*   Reason【空值】 **/ "dataMessage":{"Reason":"","express_no":"","ShipperCode":"","logo":"","nu":0,"com":"","data":[],"status":0,"goods_list":[],"OrderCode":""},"messageLenth":0,"order_id":"1264","order_goods_express_id":"","id":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {order_id,order_goods_express_id,id}=options
if (order_id !== undefined) this.order_id = order_id
if (order_goods_express_id !== undefined) this.order_goods_express_id = order_goods_express_id
if (id !== undefined) this.id = id
this.queryDetailsFunc()
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
            
            
                            //订单-查看包裹详情
                async queryDetailsFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post6447c1b701129, {
    id:this.order_id
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
    if(this.dataMessage){
  this.messageLenth = this.dataMessage.data.length-1
}
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor1);background-size: 100% auto;
            .refundLogisticsCheck_flex_1_babdd{
        background:var(--benbenbgColor1);padding:0rpx 0rpx 32rpx 0rpx;
        .refundLogisticsCheck_fd1_0_babdd{
        padding:24rpx;
        .refundLogisticsCheck_fd1_0_c0_babdd{
        width:180rpx;height:180rpx;margin:0rpx 24rpx 0rpx 0rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }    .refundLogisticsCheck_fd1_0_c1_c0_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .refundLogisticsCheck_fd1_0_c1_c1_babdd{
        margin:24rpx 0rpx 16rpx 0rpx;line-height:33rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);
    }    .refundLogisticsCheck_fd1_0_c1_c2_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);line-height:33rpx;
    }}    .refundLogisticsCheck_fd1_1_babdd{
        height:109rpx;border-bottom:1px solid #eee;margin:0rpx 24rpx 32rpx 24rpx;
        .refundLogisticsCheck_fd1_1_c0_babdd{
        width:6rpx;height:30rpx;border-radius:4rpx 4rpx 4rpx 4rpx;background:var(--benbenbgColor7);background-size:100% auto !important;
    }    .refundLogisticsCheck_fd1_1_c1_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);margin:0rpx 0rpx 0rpx 24rpx;line-height:45rpx;
    }}    .refundLogisticsCheck_fd1_3_babdd{
        width:100%;padding:50rpx 0rpx 50rpx 0rpx;
        .refundLogisticsCheck_fd1_3_c0_babdd{
        width:400rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}}
    .refundLogisticsCheck_fd1_2_c0_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .refundLogisticsCheck_fd1_2_c0_c1_babdd{
        border-left:1px dashed rgba(221, 221, 221, 1);margin:0rpx 0rpx 0rpx 12rpx;padding:0rpx 0rpx 0rpx 37rpx;
    }}
    .refundLogisticsCheck_fd1_2_c0_c0_c0_babdd{
        width:26rpx;height:26rpx;margin:0rpx 24rpx 0rpx 0rpx;
    }
    .refundLogisticsCheck_fd1_2_c0_c1_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);line-height:40rpx;margin:-33rpx 0rpx 0rpx 0rpx;
    }
    .refundLogisticsCheck_fd1_2_c0_c1_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor0);line-height:33rpx;margin:16rpx 0rpx 80rpx 0rpx;
    }
    .refundLogisticsCheck_fd1_2_c1_c1_babdd{
        margin:0rpx 0rpx 0rpx 12rpx;padding:0rpx 0rpx 0rpx 37rpx;
    }
    .refundLogisticsCheck_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;border-bottom:1px solid rgba(230, 230, 230, 1);
        .refundLogisticsCheck_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:600;line-height:50rpx;
    }}
    .refundLogisticsCheck_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .refundLogisticsCheck_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
</style>