<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex multiplePackages_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center multiplePackages_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='multiplePackages_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='multiplePackages_fd0_1_babdd'  >{{$t('多包裹')}}</text>
    <view   class='flex flex-wrap align-center multiplePackages_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout multiplePackages_flex_1_babdd"    >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction align-stretch multiplePackages_fd1_0_babdd'       :key='key0'>
            <view   class='flex flex-wrap align-center justify-between'      >
            <view   class='flex flex-wrap align-center'      >
        <image class='multiplePackages_fd1_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"811.png"'></image>
<text class='multiplePackages_fd1_0_c0_c0_c1_babdd'  >{{$t('包裹')}}</text>
<text class='multiplePackages_fd1_0_c0_c0_c2_babdd'  >{{key0+1}}</text>
</view>
    <view   class='flex flex-wrap align-center multiplePackages_fd1_0_c0_c1_babdd'      >
        <text class='multiplePackages_fd1_0_c0_c1_c0_babdd'  >{{$t('共')}}</text>
<text class='multiplePackages_fd1_0_c0_c1_c0_babdd'  >{{item.goods_num}}</text>
<text class='multiplePackages_fd1_0_c0_c1_c0_babdd'  >{{$t('件')}}</text>
</view>
</view>
    <view   class='flex flex-wrap align-center multiplePackages_fd1_0_c1_babdd'      >
            
    <scroll-view  class='multiplePackages_fd1_0_c1_c0_babdd'  :scroll-x='true' :scroll-y='true' :show-scrollbar='true'      :enhanced="true">
        <view class='flex benben-scroll flex align-center' >
                <template v-for = '(child,key1) in item.goods_list'>
    <view   class='flex flex-wrap align-center multiplePackages_fd1_0_c1_c0_c0_babdd'       :key='key1'>
        <image class='multiplePackages_fd1_0_c1_c0_c0_c0_babdd'  mode="aspectFill"  :src='child.goods_thumb'></image>
    <view   class='flex flex-wrap align-center justify-center multiplePackages_fd1_0_c1_c0_c0_c1_babdd'      >
        <text class='multiplePackages_fd1_0_c1_c0_c0_c1_c0_babdd'  >X</text>
<text class='multiplePackages_fd1_0_c1_c0_c0_c1_c0_babdd'  >{{child.num}}</text>
</view>
</view>
    </template>
    
</view>
    </scroll-view>
    
</view>
    <view   class='flex flex-wrap align-center justify-end'      >
        <button class='multiplePackages_fd1_0_c2_c0_babdd'  @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/logisticsCheck/logisticsCheck?order_id=${order_id}&order_goods_express_id=${item.aid}`"  >{{$t('查看物流')}}</button>
</view>
</view>
    </template>
    
</view>
        
<!---flex布局flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** dataList【包裹列表】 **/ "dataList":[],"order_id":"1346","order_goods_express_id":"","id":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {order_id,order_goods_express_id,id}=options
if (order_id !== undefined) this.order_id = order_id
if (order_goods_express_id !== undefined) this.order_goods_express_id = order_goods_express_id
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
            
            
                            //获取包裹列表
                async getListFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.post(global.apiUrls.post642181a3e9b7b, {
    order_id:this.order_id
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
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
            .multiplePackages_flex_1_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .multiplePackages_fd1_0_babdd{
        margin:24rpx 0rpx 0rpx 0rpx;border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor1);padding:32rpx 24rpx 32rpx 24rpx;
        .multiplePackages_fd1_0_c0_c0_c0_babdd{
        width:30rpx;height:31rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 17rpx 0rpx 0rpx;
    }    .multiplePackages_fd1_0_c0_c0_c1_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:700;
    }    .multiplePackages_fd1_0_c0_c0_c2_babdd{
        color:#333;font-size:28rpx;font-weight:700;
    }    .multiplePackages_fd1_0_c0_c1_babdd{
        color:#666666;font-size:28rpx;line-height:40rpx;font-weight:500;
    }    .multiplePackages_fd1_0_c1_babdd{
        margin:32rpx 0rpx 32rpx 0rpx;
        .multiplePackages_fd1_0_c1_c0_babdd{
        touch-action:none;width:650rpx;
        .multiplePackages_fd1_0_c1_c0_c0_babdd{
        margin:0rpx 10rpx 0rpx 0rpx;position:relative;
        .multiplePackages_fd1_0_c1_c0_c0_c0_babdd{
        width:156rpx;height:156rpx;border-radius:16rpx;
    }    .multiplePackages_fd1_0_c1_c0_c0_c1_babdd{
        padding:0rpx 14rpx 0rpx 9rpx;height:48rpx;background:linear-gradient( 180deg, rgba(103,103,103,0) 0%, rgba(62,62,62,0.8) 100%);background-size:100% auto !important;border-radius:0rpx 0rpx 16rpx 16rpx;position:absolute;bottom:0rpx;width:156rpx;justify-content:end;
    }}}}    .multiplePackages_fd1_0_c2_c0_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;width:144rpx;line-height:56rpx;font-size:24rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);height:56rpx;
    }}}
    .multiplePackages_fd1_0_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);
    }
    .multiplePackages_fd1_0_c1_c0_c0_c1_c0_babdd{
        color:var(--benbenFontColor3);font-size:28rpx;font-weight:400;line-height:24rpx;
    }
    .multiplePackages_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor0);background-size:100% auto !important;border-bottom:1px solid rgba(230, 230, 230, 1);
        .multiplePackages_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:500;line-height:50rpx;
    }}
    .multiplePackages_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .multiplePackages_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
</style>