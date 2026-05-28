<template>
    <page-body   :is-tabbar="true" page-path="/pages/tabBar/classification/classification" >
        <view class="page" >

    <view class="flex flex-direction align-stretch justify-center benben-position-layout flex classification_flex_1_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center'      >
            <view   class='flex align-center flex-sub classification_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/sy/search/search`"   >
        <image class='classification_fd1_0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"23.png"'></image>
<text class='classification_fd1_0_c0_c1_babdd'  >{{$t('搜索你想要的商品')}}</text>
</view>
    <view   class='flex flex-wrap align-center classification_fd1_0_c1_babdd'    v-if= " appSystemIdentification=='Wechat'"  >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
        <benben-goods-classify class='flex  classification_flex_classify_2_babdd' :top='88' :is-three-level='false' :is-swiper='true' classify-radius='16'  :handle-id.sync='click_aid' :swiper-id.sync='img_id' :lists='dataList' :ad-list='dataThumb' @refresh="queryListFunc()" @handle-item="jumpFunc(click_aid)" @handle-swiper="goPageFunc($event)"  >
        </benben-goods-classify>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"dataList":[],"click_aid":"","keyword":"","dataThumb":[],"img_id":""};
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
            
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
            this.queryListFunc()
this.getThumbFunc()
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
            
            
                            //商品管理-获取推荐商品分类
                async queryListFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.get(global.apiUrls.post63e369d925758, {
    
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
                },
                //跳转
                 jumpFunc(id){
                        this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList?keyword=${this.keyword}&cid=${this.click_aid}`);
                },
                //搜索
                 keywordFunc(id){
                        this.$urouter.navigateTo(`/pages/fl/commodityList/commodityList`);
                },
                //动态跳转
                 goPageFunc(e){
                        console.log(e)
    this.dynamicJump(e.href);
                },
                //获取轮播图
                async getThumbFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataThumb = await this.$api.get(global.apiUrls.post641e624160dd0, {
    type:'13'
  });
  
  if (datadataThumb.data.code != 1) {
    this.$message.info(datadataThumb.data.msg);
    return
  } 
  let infodataThumb = datadataThumb.data;
  this.dataThumb = infodataThumb.data
  
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor2);background-size: 100% auto;
            .classification_flex_1_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid rgba(238, 238, 238, 1);
        .classification_fd1_0_c0_babdd{
        border-radius:34rpx 34rpx 34rpx 34rpx;background:var(--benbenbgColor2);margin:4rpx 32rpx 0rpx 32rpx;padding:0rpx 24rpx 0rpx 24rpx;height:64rpx;
        .classification_fd1_0_c0_c0_babdd{
        width:24rpx;height:24rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }    .classification_fd1_0_c0_c1_babdd{
        font-weight:400;font-size:28rpx;color:var(--benbenFontColor2);margin:0rpx 0rpx 0rpx 24rpx;
    }}    .classification_fd1_0_c1_babdd{
        width:30%;
    }}}
    ::v-deep .classification_flex_classify_2_babdd{
        --active-tag-color:var(--benbenbgColor3);
    }
</style>