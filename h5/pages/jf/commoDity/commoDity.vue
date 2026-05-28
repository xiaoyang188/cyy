<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center commoDity_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub commoDity_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  commoDity_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='commoDity_fd0_0_c1_c0_babdd'  >{{$t('商品详情')}}</text>
</view>
    <view   class='flex flex-wrap align-center commoDity_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---轮播flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout commoDity_flex_1_babdd"    >
        <view style="position: relative" >
    <swiper ref="benbenSwiperfd1_0" :current='index' @change="bannerIndexfd1_0 = $event.detail.current"  class='flex position-relative commoDity_fd1_0_babdd'  previous-margin="0rpx" next-margin="0rpx" :display-multiple-items="1" :interval="5000" :duration="500" :autoplay='true' :circular='true' >
        
    <template v-for = '(item,key0) in dataDetails.images'>
        <swiper-item class='flex  commoDity_fd1_0_babdd'        :key='key0'>
        <image class='commoDity_fd1_0_c1_c0_babdd'  mode="aspectFill"  :src='item' @tap.stop="multiImagePreview(item,dataDetails.images,'')" ></image>
</swiper-item>
    </template>

    </swiper>
    <view style="position: absolute" class="flex dot flex align-center justify-center commoDity_swiperDotfd1_0_babdd"  >
            <view   class='flex flex align-center justify-center commoDity_numberfd1_0_c0_babdd'      >
        <text class='commoDity_numberfd1_0_c0_c0_babdd'  >{{bannerIndexfd1_0+1}}</text>
<text class='commoDity_numberfd1_0_c0_c0_babdd'  >/</text>
<text class='commoDity_numberfd1_0_c0_c2_babdd'  >{{(dataDetails.images.length)}}</text>
</view>

    </view>
</view>
    <view   class='flex flex-wrap align-center commoDity_fd1_1_babdd'      >
        <text class='commoDity_fd1_1_c0_babdd'  >{{dataDetails.integral}}</text>
<text class='commoDity_fd1_1_c1_babdd'    v-if= "dataDetails.shop_price!='0.00'"  >{{$t('积分+')}}</text><text class='commoDity_fd1_1_c1_1_babdd'    v-if= "dataDetails.shop_price=='0.00'"  >{{$t('积分')}}</text>
<text class='commoDity_fd1_1_c0_babdd'    v-if= "dataDetails.shop_price!='0.00'"  >{{dataDetails.shop_price}}</text>
<text class='commoDity_fd1_1_c1_babdd'    v-if= "dataDetails.shop_price!='0.00'"  >{{$t('元')}}</text>
<text class='commoDity_fd1_1_c4_babdd'  >{{$t('￥')}}</text>
<text class=' commoDity_fd1_1_c5_babdd'   >
    <text class=' commoDity_price1_fd1_1_c5_babdd' >{{ dataDetails.market_price | frontPrice }}</text><text class=' commoDity_price2_fd1_1_c5_babdd' >{{ dataDetails.market_price | laterPrice }}</text>
</text>
</view>
<text class='commoDity_fd1_2_babdd'  >{{dataDetails.name}}</text>
    <view   class='flex flex-wrap align-center commoDity_fd1_3_babdd'      >
        </view>
    <view   class='flex flex-wrap align-center commoDity_fd1_4_babdd'      >
        <text class='commoDity_fd1_4_c0_babdd'  >{{$t('运费')}}</text>
<text class='commoDity_fd1_4_c1_babdd'  >{{$t('包邮')}}</text>
</view>
    <view   class='flex flex-wrap align-center commoDity_fd1_3_babdd'      >
        </view>
    <view   class='flex flex-direction flex-wrap align-stretch commoDity_fd1_6_babdd'      >
        <text class='commoDity_fd1_6_c0_babdd'  >{{$t('商品详情')}}</text>
</view>
        <jyf-parser class='commoDity_fd1_7_babdd'  :html="dataDetails.body | richTextFormat"  >
        </jyf-parser>
    <view   class='flex flex-wrap align-center justify-center commoDity_fd1_8_babdd'      >
        <button class='commoDity_fd1_8_c0_babdd'  @tap.stop="goPayFunc()" v-if= " dataDetails.is_use_score=='1' && dataDetails.stock>0 && dataDetails.status=='1'" >{{$t('立即兑换')}}</button><button class='commoDity_fd1_8_c0_1_babdd'   v-if= " dataDetails.is_use_score==0 || dataDetails.status==0 || dataDetails.stock==0" >{{$t('立即兑换')}}</button>
        <benben-safe-area     >
        </benben-safe-area>
</view>
</view>
        
<!---轮播flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"bannerIndexfd1_0":0,"coupon":"0","integral":"500","sorts":[{"name":"精粹液","value":"1","image":""},{"name":"面霜","value":"2","image":""}],"sor":"1","milliliter":[{"name":"100ml","value":"1","image":""},{"name":"150ml","value":"2","image":""},{"name":"200ml","value":"3","image":""},{"name":"300ml","value":"4","image":""}],"ml":"1",/** is_use_score【积分是否足够 1 是 0 否】
*   integralcategory_id【积分商品分类ID】
*   sort【排序】
*   status【状态】
*   body【商品详情】
*   description【商品简介】
*   stock【总库存】
*   integral【需要积分】
*   shop_price【售卖价】
*   market_price【市场价】
*   images【商品相册】
*   integralcategory_name【分类名称】
*   thumb【商品主图】
*   name【商品名称】 **/ "dataDetails":{"name":"","thumb":"","integralcategory_name":"","images":[],"market_price":"","shop_price":"","integral":"","stock":"","description":"","body":"","status":"","sort":"","integralcategory_id":"","status_name":"","is_use_score":""},"index":0,"address_id":"","dataAddress":[],"commodity_id":"8"};
		},
		computed:{
                         isLogin() {
      return this.$store.state.token == '' ? false : true;
    },
              userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set(value) {
        this.$store.commit('updateUserInfo', value)
      },
    }
		},
		watch:{},
		onLoad(options){
            let {commodity_id}=options
if (commodity_id !== undefined) this.commodity_id = commodity_id
this.getDetailFunc()
this.getAddressFunc()
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
            
            
                            //跳转支付
                 goPayFunc(){
                        if( this.isLogin===true){
            if( this.dataDetails.is_use_score=='1'){
            this.$urouter.navigateTo(`/pages/jf/orderSure/orderSure?goods_id=${this.commodity_id}&address_id=${this.address_id}`);
    }
    }
    else{
                            uni.showToast({
                        title:this.$t('请先登录'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                this.toLoginDiy();
    }
                },
                //积分商城-积分商品详情
                async getDetailFunc(){
                        uni.showLoading({
	title: '加载中'
});
    //请求方法
    //数据验证
    
    
  let datadataDetails = await this.$api.get(global.apiUrls.post6414599749e7f, {
    aid:this.commodity_id,user_id:this.userInfo.id
  });
  
  if (datadataDetails.data.code != 1) {
    this.$message.info(datadataDetails.data.msg);
    return
  } 
  let infodataDetails = datadataDetails.data;
  this.dataDetails = infodataDetails.data
  
    uni.hideLoading();
                },
                //获取默认地址
                async getAddressFunc(){
                        if( this.isLogin===true){
            //请求方法
    //数据验证
    
    
  let datadataAddress = await this.$api.get(global.apiUrls.post636f7683cf195, {
    
  });
  
  if (datadataAddress.data.code != 1) {
    this.$message.info(datadataAddress.data.msg);
    return
  } 
  let infodataAddress = datadataAddress.data.data;
  this.dataAddress = infodataAddress.data
  
    if(this.dataAddress){
						this.address_id =  this.dataAddress[0].aid
					}
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
            .commoDity_flex_1_babdd{
        padding:0rpx 0rpx 32rpx 0rpx;
        .commoDity_fd1_1_babdd{
        margin:22rpx 32rpx 20rpx 32rpx;
        .commoDity_fd1_1_c1_1_babdd{
        font-size:22rpx;font-weight:400;color:rgba(51, 51, 51, 1);line-height:28rpx;
    }    .commoDity_fd1_1_c4_babdd{
        font-size:20rpx;font-weight:500;color:var(--benbenFontColor1);margin:0rpx 0rpx 0rpx auto;
    }    .commoDity_fd1_1_c5_babdd{
        color:var(--benbenFontColor1);font-weight:600;
        .commoDity_price1_fd1_1_c5_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbenFontColor1);
    }    .commoDity_price2_fd1_1_c5_babdd{
        font-size:22rpx;font-weight:500;color:rgba(153, 153, 153, 1);
    }}}    .commoDity_fd1_2_babdd{
        margin:0rpx 32rpx 32rpx 32rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .commoDity_fd1_4_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;margin:0rpx 32rpx 0rpx 32rpx;
        .commoDity_fd1_4_c0_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .commoDity_fd1_4_c1_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);margin:0rpx 0rpx 0rpx auto;
    }}    .commoDity_fd1_6_babdd{
        margin:0rpx 32rpx 15rpx 32rpx;
        .commoDity_fd1_6_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:32rpx 0rpx 24rpx 0rpx;
    }}    .commoDity_fd1_8_babdd{
        position:fixed;left:0rpx;bottom:calc(0rpx + var(--benben-window-bottom,0px));
        .commoDity_fd1_8_c0_babdd{
        border-radius:0rpx 0rpx 0rpx 0rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:750rpx;height:100rpx;line-height:100rpx;font-weight:500;
    }    .commoDity_fd1_8_c0_1_babdd{
        border-radius:0rpx 0rpx 0rpx 0rpx;font-size:32rpx;background:rgba(153, 153, 153, 1);color:#fff;width:750rpx;height:100rpx;line-height:100rpx;font-weight:500;
    }}}
    .commoDity_fd1_0_babdd{
        width:750rpx;height:750rpx;
    }
    .commoDity_fd1_0_c1_c0_babdd{
        width:750rpx;height:750rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .commoDity_numberfd1_0_c0_babdd{
        position:absolute;bottom:24rpx;right:32rpx;background:rgba(0, 0, 0, 1);border-radius:32rpx 32rpx 32rpx 32rpx;opacity:0.5;padding:5rpx 20rpx 5rpx 20rpx;
        .commoDity_numberfd1_0_c0_c2_babdd{
        font-size:32rpx;color:rgba(255, 255, 255, 1);line-height:46rpx;font-weight:400;
    }}
    .commoDity_numberfd1_0_c0_c0_babdd{
        font-size:32rpx;color:#FFFFFF;line-height:46rpx;font-weight:400;
    }
    .commoDity_fd1_1_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor5);margin:0rpx 8rpx 0rpx 0rpx;
    }
    .commoDity_fd1_1_c1_babdd{
        font-size:22rpx;font-weight:400;color:var(--benbenFontColor0);line-height:28rpx;
    }
    .commoDity_fd1_3_babdd{
        background:var(--benbenbgColor5);background-size:100% auto !important;height:10rpx;
    }
    .commoDity_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .commoDity_fd0_0_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .commoDity_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbeniconColor1);
    }    .commoDity_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);
    }    .commoDity_fd0_0_c2_babdd{
        width:36rpx;
    }}}}
    ::v-deep .commoDity_swiperDotfd1_0_babdd{
        position:absolute;bottom:20rpx;left:0rpx;right:0rpx;
    }
    ::v-deep .commoDity_swiperDotSelectedfd1_0_babdd{
        width:16rpx;height:16rpx;border-radius:100rpx 100rpx 100rpx 100rpx;background:#00A7FF;border:1px solid #00A7FF;margin:0rpx 6rpx 0rpx 0rpx;font-size:24rpx;color:#fff;
    }
    ::v-deep .commoDity_swiperDotUnselectedfd1_0_babdd{
        width:16rpx;height:16rpx;border-radius:100rpx 100rpx 100rpx 100rpx;background:rgba(0, 0, 0, 0.3);border:1px solid rgba(0, 0, 0, 0.3);margin:0rpx 6rpx 0rpx 0rpx;font-size:24rpx;color:#fff;
    }
    ::v-deep .commoDity_fd1_7_babdd{
        width:686rpx;margin:0rpx 32rpx 120rpx 32rpx;
    }
</style>