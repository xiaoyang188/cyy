<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex myCollections_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub myCollections_fd0_0_babdd'      >
            <view   class='flex align-center myCollections_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  myCollections_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='myCollections_fd0_0_c1_c0_babdd'  >{{$t('我的收藏')}}</text>
</view>
    <view   class='flex align-center justify-end myCollections_fd0_0_c0_babdd'      >
        <text class='myCollections_fd0_0_c2_c0_babdd'    v-if= " dataList.length>0 && appSystemIdentification!='Wechat' && status=='1'" @tap.stop="switchTypeFunc()" >{{$t('编辑')}}</text><text class='myCollections_fd0_0_c2_c0_babdd'    v-if= " dataList.length>0 && appSystemIdentification!='Wechat' && status=='2'" @tap.stop="switchTypeFunc()" >{{$t('完成')}}</text>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction-row-reverse align-end justify-between benben-flex-layout myCollections_flex_1_babdd"   v-if= " appSystemIdentification=='Wechat'" >
        <text class='myCollections_fd1_0_babdd'    v-if= " status=='1' && dataList.length>0" @tap.stop="switchTypeFunc()" >{{$t('编辑')}}</text><text class='myCollections_fd1_0_babdd'    v-if= " status=='2' && dataList.length>0" @tap.stop="switchTypeFunc()" >{{$t('完成')}}</text>
</view>
        
<!---flex布局flex布局结束-->
<benben-popup v-model="popupShow1720427298503" :mask="true" :mask-close-able="true"  mode='center' :z-index='999' >
    <!---清除本地缓存flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center"    >
            <view   class='flex flex-direction flex-wrap align-center myCollections_fd2_0_babdd'      >
        <text class='myCollections_fd2_0_c0_babdd'  >{{$t('提示')}}</text>
<text class='myCollections_fd2_0_c1_babdd'  >{{$t('是否确认删除？')}}</text>
    <view   class='flex align-center myCollections_fd2_0_c2_babdd'      >
        <button class='myCollections_fd2_0_c2_c0_babdd'  @tap.stop="popupShow1720427298503=false"  >{{$t('取消')}}</button>
<button class='myCollections_fd2_0_c2_c1_babdd'  @tap.stop="deletecollectFunc()"  >{{$t('确认')}}</button>
</view>
</view>
</view>
        
<!---清除本地缓存flex布局结束-->
    
</benben-popup>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout"   v-if= " dataList.length>0" >
            <view   class='flex flex-wrap align-center justify-between myCollections_fd3_0_babdd'    v-if= " status=='1'"  >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction flex-wrap align-stretch myCollections_fd3_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.goods_aid}`"    :key='key0'>
        <image class='myCollections_fd3_0_c0_c0_babdd'  mode="aspectFill"  :src='item.goods_thumb'></image>
<text class='myCollections_fd3_0_c0_c1_babdd'  >{{item.goods_name}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c2_babdd'      >
        <text class='myCollections_fd3_0_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' myCollections_fd3_0_c0_c2_c1_babdd'   >
    <text >{{ item.goods_shop_price | frontPrice }}</text><text class=' myCollections_price2_fd3_0_c0_c2_c1_babdd' >{{ item.goods_shop_price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c3_babdd'      >
        <text class='myCollections_fd3_0_c0_c3_c0_babdd'  >{{$t('销量')}}</text>
<text class='myCollections_fd3_0_c0_c3_c1_babdd'  >{{item.goods_sales}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c3_c2_babdd'      >
        <text   >{{$t('￥')}}</text>
<text   >{{item.market_price}}</text>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
    <view   class='flex flex-direction align-stretch myCollections_fd3_0_babdd'    v-if= " status=='2'"  >
            <benben-select-diy ref="showSelectPopup1689761476686" class-text='flex-wrap align-center justify-between flex'   :items.sync="dataList" v-model="collect_id" :select-all.sync="collectAll"  default-type="goods_aid" default-label="goods_name" :allow-cancel='true' type="checkbox" :disabled='false'  >
    <benben-select-item v-for = '(item,key0) in dataList' :hand-value='item.goods_aid' :key='key0'>
        <template #selected>    <view   class='flex align-center flex'      >
            <view   class='flex flex-direction flex-wrap align-stretch myCollections_fd3_1_c0_c0_c0_babdd'      >
        <image class='myCollections_fd3_0_c0_c0_babdd'  mode="aspectFill"  :src='item.goods_thumb'></image>
<text class='myCollections_fd3_0_c0_c1_babdd'  >{{item.goods_name}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c2_babdd'      >
        <text class='myCollections_fd3_0_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' myCollections_fd3_0_c0_c2_c1_babdd'   >
    <text >{{ item.goods_shop_price | frontPrice }}</text><text class=' myCollections_price2_fd3_0_c0_c2_c1_babdd' >{{ item.goods_shop_price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c3_babdd'      >
        <text class='myCollections_fd3_0_c0_c3_c0_babdd'  >{{$t('销量')}}</text>
<text class='myCollections_fd3_0_c0_c3_c1_babdd'  >{{item.goods_sales}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c3_c2_babdd'      >
        <text   >{{$t('￥')}}</text>
<text   >{{item.market_price}}</text>
</view>
</view>
<image class='myCollections_fd3_1_c0_c0_c0_c4_babdd'  mode="aspectFit"  :src='STATIC_URL+"448.png"'></image>
</view>
</view>
</template><template #no-selected>    <view   class='flex align-center flex'      >
            <view   class='flex flex-direction flex-wrap align-stretch myCollections_fd3_1_c0_c0_c0_babdd'      >
        <image class='myCollections_fd3_0_c0_c0_babdd'  mode="aspectFill"  :src='item.goods_thumb'></image>
<text class='myCollections_fd3_0_c0_c1_babdd'  >{{item.goods_name}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c2_babdd'      >
        <text class='myCollections_fd3_0_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' myCollections_fd3_0_c0_c2_c1_babdd'   >
    <text >{{ item.goods_shop_price | frontPrice }}</text><text class=' myCollections_price2_fd3_0_c0_c2_c1_babdd' >{{ item.goods_shop_price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c3_babdd'      >
        <text class='myCollections_fd3_0_c0_c3_c0_babdd'  >{{$t('销量')}}</text>
<text class='myCollections_fd3_0_c0_c3_c1_babdd'  >{{item.goods_sales}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd3_0_c0_c3_c2_babdd'      >
        <text   >{{$t('￥')}}</text>
<text   >{{item.market_price}}</text>
</view>
</view>
<image class='myCollections_fd3_1_c0_c1_c0_c4_babdd'  mode="aspectFit"  :src='STATIC_URL+"333.png"'></image>
</view>
</view>
</template></benben-select-item><fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty></benben-select-diy>
</view>
</view>
        
<!---flex布局flex布局结束-->
<!---flex布局flex布局开始-->
 <view class="flex flex-wrap align-center justify-center benben-flex-layout myCollections_flex_4_babdd"   v-if= " goodsList.length>0" >
        <image class='myCollections_fd4_0_babdd'  mode="widthFix"  :src='STATIC_URL+"423.png"'></image>
</view>
        
<!---flex布局flex布局结束-->
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout myCollections_flex_5_babdd"   v-if= " dataList.length<=0 && goodsList.length>0" >
            <view   class='flex flex-wrap align-center justify-center myCollections_fd5_0_babdd'      >
        <image class='myCollections_fd5_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"748.png"'></image>
<text class='myCollections_fd5_0_c1_babdd'  >{{$t('猜你喜欢')}}</text>
<image class='myCollections_fd5_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"749.png"'></image>
</view>
    <view   class='flex flex-wrap align-center justify-between'      >
            <template v-for = '(item,key0) in goodsList'>
    <view   class='flex flex-direction flex-wrap align-stretch myCollections_fd5_1_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/shopDetail/shopDetail?id=${item.aid}`"    :key='key0'>
        <image class='myCollections_fd5_1_c0_c0_babdd'  mode="aspectFill"  :src='item.thumb'></image>
<text class='myCollections_fd5_1_c0_c1_babdd'  >{{item.name}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd5_1_c0_c2_babdd'      >
        <text class='myCollections_fd5_1_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' myCollections_fd5_1_c0_c2_c1_babdd'   >
    <text >{{ item.shop_price | frontPrice }}</text><text class=' myCollections_price2_fd5_1_c0_c2_c1_babdd' >{{ item.shop_price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center myCollections_fd5_1_c0_c3_babdd'      >
        <text class='myCollections_fd5_1_c0_c3_c0_babdd'  >{{$t('销量')}}</text>
<text class='myCollections_fd5_1_c0_c3_c1_babdd'  >{{item.sales_sum}}</text>
    <view   class='flex flex-wrap align-center myCollections_fd5_1_c0_c3_c2_babdd'      >
        <text   >{{$t('￥')}}</text>
<text   >{{item.market_price}}</text>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
</view>
        
<!---flex布局flex布局结束-->
    <view class="flex flex-direction align-stretch benben-position-layout flex myCollections_flex_6_babdd"  v-if= " status=='2' && dataList.length!=0"  >
            <view   class='flex align-center myCollections_fd6_0_babdd'      >
                <benben-flex-switch-new class-text='flex flex'  v-model="collectAll" :disabled='false'  @change="allFunc()" >
            <template v-slot:checked>
            
    <view   class='flex flex position-relative align-center'      >
        <image class='myCollections_checkfd6_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"448.png"'></image>
<text class='myCollections_checkfd6_0_c0_c0_c1_babdd'  >{{$t('全选')}}</text>
</view>

            </template>
            <template v-slot:unchecked>
            
    <view   class='flex flex position-relative justify-end align-center'      >
        <image class='myCollections_noCheckfd6_0_c0_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"277.png"'></image>
<text class='myCollections_checkfd6_0_c0_c0_c1_babdd'  >{{$t('全选')}}</text>
</view>

            </template>
        </benben-flex-switch-new>
<button class='myCollections_fd6_0_c1_babdd'  @tap.stop="showdeleteFunc()"  >{{$t('删除')}}</button>
</view>

        </view>
<view :style="{height: '100rpx'}" v-if= " status=='2' && dataList.length!=0" ></view>
    
    
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
			return {"popupShow1720427298503":false,"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"status":"1","dataList":[],"collectAll":false,"collect_id":"","goodsList":[],/** follow_count【关注的店铺数量】
*   browse_count【足迹数量】
*   collection_count【收藏数量】 **/ "dataUserInfo":{"collection_count":"","browse_count":"","follow_count":""}};
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
            this.iscollectFunc()
		},
		onHide(){
            
            
		},
		onResize(){
            
		},
		onPullDownRefresh(){
            this.iscollectFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //获取收藏列表
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post636cabd662b22;
                this.pageingListApiMethod = 'post';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {type:'goods'}
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
                
                },
                //删除收藏
                async deletecollectFunc(){
                        //请求方法
    //数据验证
    
    
  let data636caf10164ce = await this.$api.post(global.apiUrls.post636caf10164ce, {
    goods_id:this.collect_id
  });
  
  if (data636caf10164ce.data.code != 1) {
    this.$message.info(data636caf10164ce.data.msg);
    return
  } 
  let info636caf10164ce = data636caf10164ce.data;
  
  
                    uni.showToast({
                        title:this.$t('删除成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                    this.switchTypeFunc()
                    this.iscollectFunc()
   this.collect_id = '';
    this.popupShow1720427298503 = false;
                },
                //切换编辑状态
                 switchTypeFunc(){
                        if( this.status=='1'){
           this.status = '2';
    }
    else{
           this.status = '1';
    }
   this.collectAll = false;
   this.collect_id = '';
                },
                //获取为你推荐列表
                 getGoodsListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post64184ac1cafc3;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {goods_type:'2'}
                this.listData = [];
                this.goodsList = this.listData;
                this.pagingListToggle();
                
                },
                //是否有收藏
                async iscollectFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataUserInfo = await this.$api.post(global.apiUrls.post657c0f93428d9, {
    
  });
  
  if (datadataUserInfo.data.code != 1) {
    this.$message.info(datadataUserInfo.data.msg);
    return
  } 
  let infodataUserInfo = datadataUserInfo.data;
  this.dataUserInfo = infodataUserInfo.data
  
    if( this.dataUserInfo.collection_count>0){
            this.goodsList = []
                    this.getListFunc()
    }
    else{
            this.dataList='';
                    this.getGoodsListFunc()
    }
                },
                //显示删除弹窗
                 showdeleteFunc(){
                                if(!validate(this.collect_id,'require')){
                 this.$message.info(this.$t('请选择商品'));
                 return false;
            }
    this.popupShow1720427298503 = true;
                },
                //全选多选框
                 allFunc(){
                                    this.$refs.showSelectPopup1689761476686.checkAll();
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
            .myCollections_flex_6_babdd{
        width:750rpx;height:100rpx;overflow:hidden;z-index:10;bottom:calc(0rpx + var(--benben-window-bottom,0px) + var(--benbenbottomSafeArea,0px));background:var(--benbenbgColor1);background-size:100% auto;
        .myCollections_fd6_0_babdd{
        height:100rpx;padding:0rpx 24rpx 0rpx 24rpx;
        .myCollections_checkfd6_0_c0_c0_c0_babdd{
        width:32rpx;height:32rpx;border-radius:24rpx 24rpx 24rpx 24rpx;
    }    .myCollections_noCheckfd6_0_c0_c1_c0_babdd{
        border-radius:24rpx 24rpx 24rpx 24rpx;width:32rpx;height:32rpx;
    }    .myCollections_fd6_0_c1_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;font-size:28rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);margin:0rpx 0rpx 0rpx auto;width:200rpx;height:72rpx;line-height:72rpx;font-weight:400;
    }}}
    .myCollections_checkfd6_0_c0_c0_c1_babdd{
        margin:0rpx 0rpx 0rpx 16rpx;font-size:28rpx;font-weight:400;color:#333;
    }
    .myCollections_flex_5_babdd{
        padding:25rpx 24rpx 0rpx 24rpx;
        .myCollections_fd5_0_babdd{
        margin:32rpx 0rpx 32rpx 0rpx;
        .myCollections_fd5_0_c1_babdd{
        margin:0rpx 24rpx 0rpx 24rpx;font-size:40rpx;font-weight:600;color:#333;
    }}    .myCollections_fd5_1_c0_babdd{
        width:346rpx;background:#fff;background-size:100% auto !important;margin:0rpx 0rpx 16rpx 0rpx;border-radius:24rpx 24rpx 16rpx 16rpx;padding:0rpx 0rpx 18rpx 0rpx;
        .myCollections_fd5_1_c0_c0_babdd{
        width:340rpx;height:340rpx;border-radius:16rpx 16rpx 0rpx 0rpx;margin:0rpx 0rpx 20rpx 0rpx;
    }    .myCollections_fd5_1_c0_c1_babdd{
        line-height:41rpx;font-size:28rpx;font-weight:600;color:#333333;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;margin:0rpx 24rpx 20rpx 24rpx;height:82rpx;
    }    .myCollections_fd5_1_c0_c2_babdd{
        margin:0rpx 24rpx 16rpx 24rpx;
        .myCollections_fd5_1_c0_c2_c0_babdd{
        line-height:39rpx;font-size:32rpx;font-weight:700;color:var(--benbenFontColor7);
    }    .myCollections_fd5_1_c0_c2_c1_babdd{
        color:var(--benbenFontColor7);font-weight:700;line-height:45rpx;font-size:32rpx;
        .myCollections_price2_fd5_1_c0_c2_c1_babdd{
        font-size:24rpx;
    }}}    .myCollections_fd5_1_c0_c3_babdd{
        margin:0rpx 24rpx 24rpx 24rpx;
        .myCollections_fd5_1_c0_c3_c0_babdd{
        line-height:33rpx;font-size:24rpx;font-weight:400;color:#999999;margin:0rpx 5rpx 0rpx 0rpx;
    }    .myCollections_fd5_1_c0_c3_c1_babdd{
        line-height:33rpx;font-size:24rpx;font-weight:400;color:#999999;
    }    .myCollections_fd5_1_c0_c3_c2_babdd{
        color:var(--benbenFontColor2);text-decoration:line-through;font-size:24rpx;margin:0rpx 0rpx 0rpx auto;
    }}}}
    .myCollections_fd5_0_c0_babdd{
        width:138rpx;height:28rpx;
    }
    .myCollections_flex_4_babdd{
        padding:50rpx 0rpx 50rpx 0rpx;
        .myCollections_fd4_0_babdd{
        width:400rpx;
    }}
    .myCollections_fd3_0_babdd{
        padding:24rpx 13rpx 0rpx 13rpx;
        .myCollections_fd3_0_c0_babdd{
        width:340rpx;background:#fff;background-size:100% auto !important;margin:0rpx 11rpx 16rpx 11rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }}
    .myCollections_fd3_0_c0_c0_babdd{
        width:340rpx;height:340rpx;border-radius:16rpx 16rpx 0rpx 0rpx;margin:0rpx 0rpx 20rpx 0rpx;
    }
    .myCollections_fd3_0_c0_c1_babdd{
        line-height:41rpx;font-size:28rpx;font-weight:600;color:#333333;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;margin:0rpx 24rpx 20rpx 24rpx;height:82rpx;
    }
    .myCollections_fd3_0_c0_c2_babdd{
        margin:0rpx 24rpx 16rpx 24rpx;
    }
    .myCollections_fd3_0_c0_c2_c0_babdd{
        line-height:39rpx;font-size:32rpx;font-weight:700;color:var(--benbenFontColor7);
    }
    .myCollections_fd3_0_c0_c2_c1_babdd{
        color:var(--benbenFontColor7);font-weight:700;line-height:45rpx;font-size:32rpx;
    }
    .myCollections_price2_fd3_0_c0_c2_c1_babdd{
        font-size:24rpx;
    }
    .myCollections_fd3_0_c0_c3_babdd{
        margin:0rpx 24rpx 24rpx 24rpx;
    }
    .myCollections_fd3_0_c0_c3_c0_babdd{
        line-height:33rpx;font-size:24rpx;font-weight:400;color:#999999;margin:0rpx 5rpx 0rpx 0rpx;
    }
    .myCollections_fd3_0_c0_c3_c1_babdd{
        line-height:33rpx;font-size:24rpx;font-weight:400;color:#999999;
    }
    .myCollections_fd3_0_c0_c3_c2_babdd{
        color:var(--benbenFontColor2);text-decoration:line-through;font-size:24rpx;margin:0rpx 0rpx 0rpx auto;
    }
    .myCollections_fd3_1_c0_c0_c0_babdd{
        width:340rpx;background:#fff;background-size:100% auto !important;margin:0rpx 11rpx 16rpx 11rpx;border-radius:16rpx 16rpx 16rpx 16rpx;position:relative;
        .myCollections_fd3_1_c0_c0_c0_c4_babdd{
        width:36rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;position:absolute;top:16rpx;right:16rpx;
    }}
    .myCollections_fd3_1_c0_c1_c0_c4_babdd{
        width:32rpx;height:32rpx;border-radius:0rpx 0rpx 0rpx 0rpx;position:absolute;top:16rpx;right:16rpx;
    }
    .myCollections_fd2_0_babdd{
        width:540rpx;background:#fff;background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;
        .myCollections_fd2_0_c0_babdd{
        line-height:44rpx;font-size:36rpx;font-weight:700;color:#333333;margin:40rpx 0rpx 0rpx 0rpx;
    }    .myCollections_fd2_0_c1_babdd{
        line-height:44rpx;font-size:28rpx;font-weight:500;color:#333333;text-align:center;margin:32rpx 40rpx 0rpx 40rpx;
    }    .myCollections_fd2_0_c2_babdd{
        border-top:1px solid #eee;margin:51rpx 0rpx 0rpx 0rpx;
        .myCollections_fd2_0_c2_c0_babdd{
        font-size:32rpx;background:#fff;color:rgba(153, 153, 153, 1);width:270rpx;height:101rpx;line-height:101rpx;font-weight:400;border-right:1px solid #eee;
    }    .myCollections_fd2_0_c2_c1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);color:var(--benbenFontColor5);width:270rpx;height:101rpx;line-height:101rpx;font-weight:500;
    }}}
    .myCollections_flex_1_babdd{
        padding:32rpx;background:var(--benbenbgColor1);background-size:100% auto;border-top:1px solid #eee;
    }
    .myCollections_fd1_0_babdd{
        font-size:32rpx;font-weight:400;color:#333;
    }
    .myCollections_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .myCollections_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;height:88rpx;
        .myCollections_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:#333;
    }}}
    .myCollections_fd0_0_c0_babdd{
        width:120rpx;height:88rpx;
        .myCollections_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:#333;
    }}
    .myCollections_fd0_0_c2_c0_babdd{
        font-size:32rpx;font-weight:400;color:#333;
    }}
</style>