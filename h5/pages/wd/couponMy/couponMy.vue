<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex couponMy_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center couponMy_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='couponMy_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='couponMy_fd0_1_babdd'  >{{$t('我的优惠券')}}</text>
    <view   class='flex flex-wrap align-center couponMy_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
    <view class="flex benben-position-layout flex flex-wrap align-center couponMy_flex_1_babdd"    :style="{top:(88+StatusBarRpx)+'rpx', }">
        <view>
        <benben-flex-tabs class-text='couponMy_benbenTabsfd1_0_babdd'  v-model="tabs" ref="benben_tabsfd1_0" select-mark="benben_tabsfd1_0" key="benben_tabsfd1_0" :open-title-type='false' :open-sticky='true' :top='0' :is-show-content='false' :scrollspy='false'  :tabs-info.sync="tabsInfofd1_0" @change="getListFunc()" >
            
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
                :class="{ 'checkTitlefd1_0_babdd': tabs == '1', 'flex flex-wrap align-center': true }"
                @tap="tabs = '1'"
                :id="`benben_tabsfd1_0-title-item-${'1'}`"
                
                
              >
                
<text   >{{$t('全部')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '2', 'flex flex-wrap align-center': true }"
                @tap="tabs = '2'"
                :id="`benben_tabsfd1_0-title-item-${'2'}`"
                
                
              >
                
<text   >{{$t('未使用')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '3', 'flex flex-wrap align-center': true }"
                @tap="tabs = '3'"
                :id="`benben_tabsfd1_0-title-item-${'3'}`"
                
                
              >
                
<text   >{{$t('已使用')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '4', 'flex flex-wrap align-center': true }"
                @tap="tabs = '4'"
                :id="`benben_tabsfd1_0-title-item-${'4'}`"
                
                
              >
                
<text   >{{$t('已过期')}}</text>

              </view>
            </view>
            <view :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth ,}" id="benben_tabsfd1_0-line" class="benben-tabs-line flex benben-flex-tabs-line couponMy_linefd1_0_babdd" :class="{'benben-tabs-line-active':tabsInfofd1_0.isInit}"></view>
          </view>
        </scroll-view>
            
        </benben-flex-tabs>
        
</view>

        </view>
<view :style="{height: '90rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout couponMy_flex_2_babdd"    >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction align-stretch couponMy_fd2_0_babdd'       :key='key0'>
            <view   class='flex flex-direction flex-wrap align-stretch couponMy_fd2_0_c0_babdd'    v-if= "item.status=='1'"  >
            <view   class='flex flex-wrap align-center couponMy_fd2_0_c0_c0_babdd'      >
        <image class='couponMy_fd2_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"421.png"'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub couponMy_fd2_0_c0_c0_c1_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='couponMy_fd2_0_c0_c0_c1_c0_c0_babdd'  >{{item.coupon_name}}</text>
</view>
<text class='couponMy_fd2_0_c0_c0_c1_c1_babdd'  >{{item.content}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='couponMy_fd2_0_c0_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' couponMy_fd2_0_c0_c0_c2_c1_babdd'   >
    <text class=' couponMy_price1_fd2_0_c0_c0_c2_c1_babdd' >{{ item.money | frontPrice }}</text><text class=' couponMy_price2_fd2_0_c0_c0_c2_c1_babdd' >{{ item.money | laterPrice }}</text>
</text>
</view>
</view>
    <view   class='flex flex-wrap align-center justify-between couponMy_fd2_0_c0_c1_babdd'      >
            <view   class='flex align-center couponMy_fd2_0_c0_c1_c0_babdd'      >
        <text class='couponMy_fd2_0_c0_c1_c0_c0_babdd'  >{{$t('有效期至：')}}</text>
<text class='flex-sub couponMy_fd2_0_c0_c1_c0_c1_babdd'  >{{item.end_time}}</text>
</view>
<button class='couponMy_fd2_0_c0_c1_c1_babdd'  @tap.stop="guUserFunc(item.goods_id,item.cid)"  >{{$t('去使用')}}</button>
</view>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch couponMy_fd2_0_c1_babdd'    v-if= "item.status=='3'"  >
            <view   class='flex flex-wrap align-center couponMy_fd2_0_c1_c0_babdd'      >
        <image class='couponMy_fd2_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"90.png"'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub couponMy_fd2_0_c0_c0_c1_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='couponMy_fd2_0_c1_c0_c1_c0_c0_babdd'  >{{item.coupon_name}}</text>
</view>
<text class='couponMy_fd2_0_c0_c0_c1_c1_babdd'  >{{item.content}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='couponMy_fd2_0_c1_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' couponMy_fd2_0_c1_c0_c2_c1_babdd'   >
    <text class=' couponMy_price1_fd2_0_c0_c0_c2_c1_babdd' >{{ item.money | frontPrice }}</text><text class=' couponMy_price2_fd2_0_c0_c0_c2_c1_babdd' >{{ item.money | laterPrice }}</text>
</text>
</view>
</view>
    <view   class='flex flex-wrap align-center justify-between couponMy_fd2_0_c0_c1_babdd'      >
            <view   class='flex align-center'      >
        <text class='couponMy_fd2_0_c1_c1_c0_c0_babdd'  >{{$t('有效期至：')}}</text>
<text class='flex-sub couponMy_fd2_0_c1_c1_c0_c1_babdd'  >{{item.end_time}}</text>
</view>
<button class='couponMy_fd2_0_c1_c1_c1_babdd'   >{{$t('已使用')}}</button>
</view>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch couponMy_fd2_0_c2_babdd'    v-if= "item.status=='4'"  >
            <view   class='flex flex-wrap align-center couponMy_fd2_0_c1_c0_babdd'      >
        <image class='couponMy_fd2_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"90.png"'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub couponMy_fd2_0_c0_c0_c1_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='couponMy_fd2_0_c1_c0_c1_c0_c0_babdd'  >{{item.coupon_name}}</text>
</view>
<text class='couponMy_fd2_0_c0_c0_c1_c1_babdd'  >{{item.content}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='couponMy_fd2_0_c1_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' couponMy_fd2_0_c1_c0_c2_c1_babdd'   >
    <text class=' couponMy_price1_fd2_0_c0_c0_c2_c1_babdd' >{{ item.money | frontPrice }}</text><text class=' couponMy_price2_fd2_0_c0_c0_c2_c1_babdd' >{{ item.money | laterPrice }}</text>
</text>
</view>
</view>
    <view   class='flex flex-wrap align-center justify-between couponMy_fd2_0_c0_c1_babdd'      >
            <view   class='flex align-center'      >
        <text class='couponMy_fd2_0_c2_c1_c0_c0_babdd'  >{{$t('有效期至：')}}</text>
<text class='flex-sub couponMy_fd2_0_c2_c1_c0_c1_babdd'  >{{item.end_time}}</text>
</view>
<button class='couponMy_fd2_0_c1_c1_c1_babdd'   >{{$t('已过期')}}</button>
</view>
</view>
</view>
    </template>
    
    <view   class='flex flex-wrap align-center'      >
        <benben-empty :list-data="dataList">
<view>
<view class='flex flex-direction flex-wrap align-center couponMy_fd2_1_c0_babdd' >
<image class='couponMy_fd2_1_c0_c0_babdd'  mode="widthFix"  :src='STATIC_URL+"423.png"'></image>

</view>
</view>
</benben-empty>
</view>
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
			return {"tabsInfofd1_0":{ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0, isInit: false },"tabs":"1","dataList":[]};
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
            this.getListFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //优惠券-我的优惠券列表
                async getListFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.aPost(global.apiUrls.post64198610a95ca, {
    type:this.tabs
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
                },
                //去使用
                 guUserFunc(id,cid){
                        if(id&&id != 0){
            this.$urouter.navigateTo(`/pages/fl/shopDetail/shopDetail?id=${id}`);
    }
    else{
            this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList?cid=${cid}`);
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
            background:#F8F8F8;background-size: 100% auto;
            .couponMy_flex_2_babdd{
        padding:0rpx 0rpx 32rpx 0rpx;
        .couponMy_fd2_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .couponMy_fd2_0_c0_babdd{
        background:url(#{image-path('420.png')}) no-repeat ,transparent;background-size:100% 100% !important;padding:30rpx 31rpx 30rpx 34rpx;margin:24rpx 0rpx 0rpx 0rpx;
        .couponMy_fd2_0_c0_c0_babdd{
        padding:0rpx 0rpx 14rpx 0rpx;
        .couponMy_fd2_0_c0_c0_c2_c0_babdd{
        color:var(--benbenFontColor4);font-size:32rpx;font-weight:700;line-height:32rpx;
    }    .couponMy_fd2_0_c0_c0_c2_c1_babdd{
        color:var(--benbenFontColor4);font-weight:600;
    }}}    .couponMy_fd2_0_c1_babdd{
        background:url(#{image-path('89.png')}) no-repeat ,transparent;background-size:100% 100% !important;padding:30rpx 31rpx 30rpx 34rpx;margin:24rpx 0rpx 0rpx 0rpx;
    }    .couponMy_fd2_0_c2_babdd{
        background:url(#{image-path('89.png')}) no-repeat ,transparent;background-size:100% auto !important;padding:30rpx 31rpx 30rpx 34rpx;margin:24rpx 0rpx 0rpx 0rpx;
    }}    .couponMy_fd2_1_c0_babdd{
        width:100%;padding:50rpx 0rpx 50rpx 0rpx;
        .couponMy_fd2_1_c0_c0_babdd{
        width:400rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}}
    .couponMy_fd2_0_c0_c0_c0_babdd{
        width:122rpx;height:100rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .couponMy_fd2_0_c0_c0_c1_babdd{
        margin:0rpx 0rpx 0rpx 16rpx;
        .couponMy_fd2_0_c0_c0_c1_c0_c0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:500;line-height:45rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;max-width:318rpx;
    }}
    .couponMy_fd2_0_c0_c0_c1_c1_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:33rpx;margin:8rpx 0rpx 0rpx 0rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }
    .couponMy_price1_fd2_0_c0_c0_c2_c1_babdd{
        font-size:38rpx;
    }
    .couponMy_price2_fd2_0_c0_c0_c2_c1_babdd{
        font-size:28rpx;
    }
    .couponMy_fd2_0_c0_c1_babdd{
        margin:20rpx 0rpx 0rpx 0rpx;
        .couponMy_fd2_0_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);
        .couponMy_fd2_0_c0_c1_c0_c0_babdd{
        font-size:24rpx;font-weight:400;line-height:33rpx;
    }    .couponMy_fd2_0_c0_c1_c0_c1_babdd{
        font-size:24rpx;font-weight:400;line-height:33rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;max-width:238rpx;
    }}    .couponMy_fd2_0_c0_c1_c1_babdd{
        border-radius:24rpx 24rpx 24rpx 24rpx;font-size:24rpx;background:var(--benbenbtnColor0);color:#fff;width:120rpx;height:48rpx;line-height:48rpx;
    }}
    .couponMy_fd2_0_c1_c0_babdd{
        padding:0rpx 0rpx 14rpx 0rpx;border-bottom:1px dashed rgba(221, 221, 221, 1);
    }
    .couponMy_fd2_0_c1_c0_c1_c0_c0_babdd{
        color:var(--benbenFontColor1);font-size:32rpx;font-weight:500;line-height:45rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;max-width:318rpx;
    }
    .couponMy_fd2_0_c1_c0_c2_c0_babdd{
        color:var(--benbenFontColor1);font-size:32rpx;font-weight:700;line-height:32rpx;
    }
    .couponMy_fd2_0_c1_c0_c2_c1_babdd{
        color:var(--benbenFontColor1);font-weight:600;
    }
    .couponMy_fd2_0_c1_c1_c0_c0_babdd{
        color:rgba(171, 177, 196, 1);font-size:24rpx;font-weight:400;line-height:33rpx;
    }
    .couponMy_fd2_0_c1_c1_c0_c1_babdd{
        color:rgba(171, 177, 196, 1);font-size:24rpx;font-weight:400;line-height:33rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;max-width:238rpx;
    }
    .couponMy_fd2_0_c1_c1_c1_babdd{
        border-radius:24rpx 24rpx 24rpx 24rpx;font-size:24rpx;background:var(--benbenbtnColor3);color:var(--benbenFontColor1);width:120rpx;height:48rpx;line-height:48rpx;
    }
    .couponMy_fd2_0_c2_c1_c0_c0_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:33rpx;
    }
    .couponMy_fd2_0_c2_c1_c0_c1_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:33rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;max-width:238rpx;
    }
    .couponMy_flex_1_babdd{
        width:750rpx;height:90rpx;overflow:hidden;z-index:10;top:88rpx;
        .checkTitlefd1_0_babdd{
        font-weight:700 !important;font-size:32rpx !important;color:var(--benbenFontColor4) !important;background-color:var(--benbenFontColor3) !important;
    }    .couponMy_linefd1_0_babdd{
        width:40rpx;height:6rpx;top:80rpx;background:var(--benbenbgColor2);background-size:100% auto !important;border-radius:16rpx;
    }}
    .couponMy_bodyfd1_0_c3_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
    }
    .couponMy_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .couponMy_fd0_1_babdd{
        color:#333333;font-size:36rpx;font-weight:600;line-height:50rpx;
    }}
    .couponMy_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .couponMy_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
    ::v-deep .couponMy_benbenTabsfd1_0_babdd{
        width:750rpx;height:90rpx;white-space:nowrap;background:var(--benbenbgColor1);text-align:center;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
</style>