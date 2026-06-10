<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex serviceApply_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center serviceApply_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='serviceApply_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='serviceApply_fd0_1_babdd'  >{{$t('申请售后')}}</text>
    <view   class='flex flex-wrap align-center serviceApply_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---申请售后-售后flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout serviceApply_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center serviceApply_fd1_0_babdd'      >
        <image class='serviceApply_fd1_0_c0_babdd'  mode="aspectFill"  :src='dataShopInfo.goods_thumb'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub'      >
        <text class='serviceApply_fd1_0_c1_c0_babdd'  >{{dataShopInfo.goods_name}}</text>
<text class='serviceApply_fd1_0_c1_c1_babdd'  >{{dataShopInfo.sku_name}}</text>
    <view   class='flex flex-wrap align-center'      >
        <text class='serviceApply_fd1_0_c1_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class=' serviceApply_fd1_0_c1_c2_c1_babdd'   >
    <text >{{ dataShopInfo.shop_price | frontPrice }}</text><text class=' serviceApply_price2_fd1_0_c1_c2_c1_babdd' >{{ dataShopInfo.shop_price | laterPrice }}</text>
</text>
<text class='serviceApply_fd1_0_c1_c2_c2_babdd'  >x</text>
<text class='serviceApply_fd1_0_c1_c2_c3_babdd'  >{{dataShopInfo.num}}</text>
</view>
</view>
</view>
</view>
        
<!---申请售后-售后flex布局结束-->
<!---flex布局flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center serviceApply_flex_2_babdd"    >
        </view>
        
<!---flex布局flex布局结束-->
<!---申请售后-售后原因flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout serviceApply_flex_3_babdd"    >
            <view   class='flex flex-wrap align-center serviceApply_fd3_0_babdd'   @tap.stop="pickerDiy1679907974294=true"   >
        <text class='serviceApply_fd3_0_c0_babdd'  >{{$t('售后选择')}}</text>
<benben-input class='serviceApply_fd3_0_c1_babdd'   type="text" :placeholder="$t('请选择售后类型')" confirm-type="done" :maxlength="-1" :disabled='true' placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="afterSaleLable" />
<image class='serviceApply_fd3_0_c2_babdd'  mode="aspectFit"  :src='STATIC_URL+"343.png"'></image>
</view>
    <view   class='flex flex-wrap align-center serviceApply_fd3_0_babdd'   @tap.stop="pickerDiy1679907850983=true"   >
        <text class='serviceApply_fd3_0_c0_babdd'  >{{$t('退款原因')}}</text>
<benben-input class='flex-sub serviceApply_fd3_1_c1_babdd'   type="text" :placeholder="$t('请选择退款原因')" confirm-type="done" :maxlength="-1" :disabled='true' placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="reason_name" />
<image class='serviceApply_fd3_0_c2_babdd'  mode="aspectFit"  :src='STATIC_URL+"343.png"'></image>
</view>
    <view   class='flex flex-wrap align-center serviceApply_fd3_2_babdd'      >
        <text class='serviceApply_fd3_2_c0_babdd'  >{{$t('退款数量')}}</text>
            
            <benben-flex-number-box class-text='flex align-center self-center justify-center flex' input-class='serviceApply_numberBoxInputfd3_2_c1_babdd'   v-model="num" :max="dataShopInfo.can_refund_num" :min="1" :disabled='true' :step="1" :opacity="0.3"   v-if= " dataShopInfo.can_change_num==0"  >
            <template #minus>
<image class='serviceApply_fd3_2_c1_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+"372.png"'></image>
</template>
<template #plus>
<image class='serviceApply_fd3_2_c1_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+"373.png"'></image>
</template>

            </benben-flex-number-box>
            
            
            <benben-flex-number-box class-text='flex align-center self-center justify-center flex' input-class='serviceApply_numberBoxInputfd3_2_c1_babdd'   v-model="num" :max="dataShopInfo.can_refund_num" :min="1" :step="1" :opacity="0.3"  @change="getMoneyFunc()" v-if= " dataShopInfo.can_change_num=='1'"  >
            <template #minus>
<image class='serviceApply_fd3_2_c1_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+"372.png"'></image>
</template>
<template #plus>
<image class='serviceApply_fd3_2_c1_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+"373.png"'></image>
</template>

            </benben-flex-number-box>
            
</view>
    <view   class='flex flex-wrap align-center serviceApply_fd3_3_babdd'      >
        <text class='serviceApply_fd3_3_c0_babdd'  >{{$t('退款金额：')}}</text>
<text class='serviceApply_fd3_3_c1_babdd'  >{{$t('￥')}}</text>
<text class=' serviceApply_fd3_3_c2_babdd'   >
    <text class=' serviceApply_price1_fd3_3_c2_babdd' >{{ Number(dataMoney.refund_money)+Number(dataMoney.express_price) | frontPrice }}</text><text class=' serviceApply_price2_fd3_3_c2_babdd' >{{ Number(dataMoney.refund_money)+Number(dataMoney.express_price) | laterPrice }}</text>
</text>
</view>
<text class='serviceApply_fd3_4_babdd'    v-if= " dataMoney.express_price<=0"  >{{$t('不包含运费')}}</text>
    <view   class='flex flex-wrap align-center serviceApply_fd3_5_babdd'    v-if= " dataMoney.express_price>0"  >
        <text class='serviceApply_fd3_5_c0_babdd'      >{{$t('含发货运费')}}</text>
<text class='serviceApply_fd3_5_c0_babdd'      >{{dataMoney.express_price}}</text>
<text class='serviceApply_fd3_5_c0_babdd'      >{{$t('元')}}</text>
<text class='serviceApply_fd3_5_c0_babdd'      >{{$t('，不可修改')}}</text>
</view>
    <view   class='flex flex-wrap align-center serviceApply_fd3_6_babdd'      >
        <text class='serviceApply_fd3_0_c0_babdd'  >{{$t('退款说明')}}</text>
</view>
<view class='flex-direction flex-wrap align-stretch flex serviceApply_fd3_7_babdd'>
<benben-textarea class='flex-sub serviceApply_input_fd3_7_babdd'  confirm-type="done" :placeholder="$t('请在此描述申请售后服务的原因')" :maxlength="256" :show-num='true' placeholder-style="color:var(--benbenFontColor1);font-size:28rpx"   v-model="content" />
<template>    <view   class='flex flex justify-end serviceApply_numberfd3_7_c0_babdd'      >
        <text class='serviceApply_numberfd3_7_c0_c0_babdd'  >{{content.length}}</text>
<text class='serviceApply_numberfd3_7_c0_c0_babdd'  >/</text>
<text class='serviceApply_numberfd3_7_c0_c0_babdd'  >256</text>
</view>
</template>
</view>
    <view   class='flex flex-wrap align-center'      >
            <benben-images-upload  ref="benbenImagesUploadfd3_8_c0"  :img-list.sync="url" :img-ids.sync="image" :maxlength="9" >
     <view class="flex flex-wrap align-start flex" >
            
    <view v-for="(image, index) in url" :key="index"  class='flex position-relative serviceApply_fd3_8_c00_babdd'      >
        <benben-clean-icon class='fu-iconfont2 position-absolute serviceApply_fd3_8_c000_babdd'   hand-name="benben-images-upload" hand-method="delImage" :hand-index="index">&#xE8E7;</benben-clean-icon><benben-image-item class='serviceApply_fd3_8_c001_babdd'  hand-name="benben-images-upload" hand-method="previewImage" :hand-index="index"  :src='image'></benben-image-item>
    </view>
    

            <benben-image-item v-if="url.length<9" class='serviceApply_fd3_8_c01_babdd'  mode="aspectFit" hand-name="benben-images-upload" hand-method="manyChooseImage"  :src='STATIC_URL+"344.png"'></benben-image-item>
            
          </view>
    </benben-images-upload>
</view>
    <view   class='flex flex-wrap align-center justify-center serviceApply_fd3_9_babdd'      >
        <button class='serviceApply_fd3_9_c0_babdd'  @tap.stop="submitRefundFunc()"  >{{$t('提交')}}</button>
        <benben-safe-area     >
        </benben-safe-area>
</view>
</view>
        
<!---申请售后-售后原因flex布局结束-->
<!--售后原因选择器开始 -->
        <benben-picker class="" ref="benbenWritePickerCodepicker4" :visible.sync="pickerDiy1679907850983" :label.sync='reason_name' :value.sync='reason_id' :options='refundReason'  mode='selector' :mask-show='true' :timeout='true' :picker-height='88' default-type='aid' :default-props='{"label":"reason","value":"aid"}'  >
            <template #picker-header>
        <view   class='flex flex-wrap align-center justify-between serviceApply_picker4_0_babdd'      >
        <text class='serviceApply_picker4_0_c0_babdd'  @tap="$refs.benbenWritePickerCodepicker4.cancel()" >{{$t('取消')}}</text>
<text class='serviceApply_picker4_0_c1_babdd'  >{{$t('退款原因')}}</text>
<text class='serviceApply_picker4_0_c2_babdd'  @tap="$refs.benbenWritePickerCodepicker4.pickerConfirm()" >{{$t('确定')}}</text>
</view>
</template>
        </benben-picker>
<!--售后原因选择器结束 -->
<!--售后类型选择器开始 -->
        <benben-picker class="" ref="benbenWritePickerCodepicker5" :visible.sync="pickerDiy1679907974294" :label.sync='afterSaleLable' :value.sync='afterSaleID' :options='afterSale'  mode='selector' :mask-show='true' :timeout='true' :picker-height='88' default-type='value' :default-props='{"label":"name","value":"value"}'  >
            <template #picker-header>
        <view   class='flex flex-wrap align-center justify-between serviceApply_picker5_0_babdd'      >
        <text class='serviceApply_picker5_0_c0_babdd'  @tap="$refs.benbenWritePickerCodepicker5.cancel()" >{{$t('取消')}}</text>
<text class='serviceApply_picker5_0_c1_babdd'  >{{$t('售后类型')}}</text>
<text class='serviceApply_picker5_0_c2_babdd'  @tap="$refs.benbenWritePickerCodepicker5.pickerConfirm()" >{{$t('确定')}}</text>
</view>
</template>
        </benben-picker>
<!--售后类型选择器结束 -->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"pickerDiy1679907974294":false,"pickerDiy1679907850983":false,/** can_change_num【能够改变退款数量 0否 1是】
*   can_refund_type【可售后的方式  0：没有  1：可退款  2：可退款、可退款退款】
*   can_refund_num【可售后的数量】
*   sku_name【规格名称】
*   goods_name【商品名称】
*   sku_id【规格ID】
*   goods_id【商品ID】
*   order_id【订单ID】
*   goods_money【商品金额】
*   usermerchant_id【商家ID】
*   goods_thumb【图片】
*   shop_price【价格】
*   aid【order_goods_list中的id】
*   num【购买数量】 **/ "dataShopInfo":{"num":"","aid":"","shop_price":"","order_status":"","goods_thumb":"","usermerchant_id":"","goods_money":"","discount_money":"","coupon_money":"","shop_coupon_money":"","order_id":"","goods_id":"","sku_id":"","goods_name":"","sku_name":"","can_refund_num":"","can_refund_type":"","can_change_num":0},"num":1,/** express_price【运费金额】
*   refund_money【退款金额】 **/ "dataMoney":{"refund_money":"","express_price":0},"afterSale":[{"name":"退款（无需退货）","value":"1","image":""},{"name":"退货退款","value":"2","image":""}],/** afterSaleLable【退款类型名称】 **/ "afterSaleLable":"",/** afterSaleID【退款类型id】 **/ "afterSaleID":"1",/** refundReason【售后原因】 **/ "refundReason":[],/** reason_name【原因名称】 **/ "reason_name":"","reason_id":"",/** content【退款说明】 **/ "content":"","url":[],"image":"","text":"0",/** number【退款运费】 **/ "number":0,"aid":"3651"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {aid}=options
if (aid !== undefined) this.aid = aid
this.getInfoFunc()
this.getRefundReasonFunc()
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
            
            
                            //获取商品信息
                async getInfoFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataShopInfo = await this.$api.post(global.apiUrls.post64258181598c7, {
    order_goods_id:this.aid
  });
  
  if (datadataShopInfo.data.code != 1) {
    this.$message.info(datadataShopInfo.data.msg);
    return
  } 
  let infodataShopInfo = datadataShopInfo.data;
  this.dataShopInfo = infodataShopInfo.data
  
    this.num = this.dataShopInfo.can_refund_num

                    this.getMoneyFunc()
    if (this.dataShopInfo.can_refund_type == 1) {
					this.afterSale = [{
						name: global.i18n.t('退款（无需退货）'),
						value: '1',
						image: ''
					}]
				}
				if (this.dataShopInfo.can_refund_type == 2) {
					this.afterSale = [{
						name: global.i18n.t('退款（无需退货）'),
						value: '1',
						image: ''
					}, {
						name: global.i18n.t('退货退款'),
						value: '2',
						image: ''
					}]
				}
                    this.getRefundReasonFunc()
                },
                //获取退款金额
                async getMoneyFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMoney = await this.$api.post(global.apiUrls.post64257c480b1a1, {
    order_goods_id:this.aid,num:this.num
  });
  
  if (datadataMoney.data.code != 1) {
    this.$message.info(datadataMoney.data.msg);
    return
  } 
  let infodataMoney = datadataMoney.data;
  this.dataMoney = infodataMoney.data
  
                },
                //获取退款原因
                async getRefundReasonFunc(){
                        //请求方法
    //数据验证
    
    
  let datarefundReason = await this.$api.get(global.apiUrls.post641ae6544d2d5, {
    type:'1',list_rows:'999',goods_type:this.dataShopInfo.can_refund_type
  });
  
  if (datarefundReason.data.code != 1) {
    this.$message.info(datarefundReason.data.msg);
    return
  } 
  let inforefundReason = datarefundReason.data;
  this.refundReason = inforefundReason.data
  
                },
                //提交申请售后
                async submitRefundFunc(){
                                if(!validate(this.afterSaleLable,'require')){
                 this.$message.info(this.$t('请选择售后类型'));
                 return false;
            }
            if(!validate(this.reason_name,'require')){
                 this.$message.info(this.$t('请选择退款原因'));
                 return false;
            }
            if(!validate(this.content,'require')){
                 this.$message.info(this.$t('请填写退款说明'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data64219b8235a5e = await this.$api.dbPost(global.apiUrls.post64219b8235a5e, {
    order_id:this.dataShopInfo.order_id,goods_id:this.dataShopInfo.goods_id,sku_id:this.dataShopInfo.sku_id,num:this.num,refund_type:this.afterSaleID,refund_reason:this.reason_name,refund_picture:this.image,refund_content:this.content,refund_reason_id:this.reason_id,express_price:this.dataMoney.express_price
  });
  if(!data64219b8235a5e) return
  if (data64219b8235a5e.data.code != 1) {
    this.$message.info(data64219b8235a5e.data.msg);
    return
  } 
  let info64219b8235a5e = data64219b8235a5e.data;
  
  
                uni.$emit('shenqingchengg',this.text)
                    uni.showToast({
                        title:this.$t('提交成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                setTimeout(()=>{
                    this.$urouter.navigateBack(2);
      },300)
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:#fff;background-size: 100% auto;
            .serviceApply_picker5_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:100rpx;border-radius:25rpx 25rpx 0rpx 0rpx;border-bottom:1px solid #eee;background:#fff;background-size:100% auto !important;height:100rpx;font-size:32rpx;
        .serviceApply_picker5_0_c0_babdd{
        color:var(--benbenFontColor2);
    }    .serviceApply_picker5_0_c1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:500;line-height:50rpx;
    }    .serviceApply_picker5_0_c2_babdd{
        color:var(--benbenFontColor0);
    }}
    .serviceApply_picker4_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:100rpx;border-radius:25rpx 25rpx 0rpx 0rpx;border-bottom:1px solid #eee;background:#fff;background-size:100% auto !important;font-size:32rpx;height:100rpx;
        .serviceApply_picker4_0_c0_babdd{
        color:var(--benbenFontColor2);
    }    .serviceApply_picker4_0_c1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:500;line-height:50rpx;
    }    .serviceApply_picker4_0_c2_babdd{
        color:var(--benbenFontColor0);
    }}
    .serviceApply_flex_3_babdd{
        padding:32rpx 24rpx 140rpx 24rpx;
        .serviceApply_fd3_2_babdd{
        margin:0rpx 0rpx 24rpx 0rpx;
        .serviceApply_fd3_2_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);margin:0rpx auto 0rpx 0rpx;
    }}    .serviceApply_fd3_3_babdd{
        margin:0rpx 0rpx 8rpx 0rpx;
        .serviceApply_fd3_3_c0_babdd{
        font-size:32rpx;font-weight:400;color:rgba(17, 17, 17, 1);
    }    .serviceApply_fd3_3_c1_babdd{
        font-size:20rpx;font-weight:700;color:var(--benbenFontColor0);margin:0rpx 0rpx 0rpx auto;
    }    .serviceApply_fd3_3_c2_babdd{
        color:var(--benbenFontColor0);font-weight:600;
        .serviceApply_price1_fd3_3_c2_babdd{
        font-size:32rpx;font-weight:700;color:var(--benbenFontColor0);
    }    .serviceApply_price2_fd3_3_c2_babdd{
        font-size:22rpx;font-weight:700;color:var(--benbenFontColor0);
    }}}    .serviceApply_fd3_4_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);padding:0rpx 0rpx 20rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }    .serviceApply_fd3_5_babdd{
        width:100%;border-bottom:1px solid #eee;
    }    .serviceApply_fd3_6_babdd{
        padding:32rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 20rpx 0rpx;
    }    .serviceApply_fd3_7_babdd{
        border-radius:16rpx 16rpx 16rpx 16rpx;background:#F8F8F8;padding:24rpx 24rpx 0rpx 24rpx;height:272rpx;margin:0rpx 0rpx 24rpx 0rpx;
        .serviceApply_input_fd3_7_babdd{
        width:100%;height:140rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }    .serviceApply_numberfd3_7_c0_babdd{
        width:100%;font-size:24rpx;color:#FFFFFF;line-height:42rpx;font-weight:400;margin:0rpx 0rpx 24rpx 0rpx;
    }}    .serviceApply_fd3_8_c00_babdd{
        margin:0rpx 24rpx 24rpx 0rpx;
        .serviceApply_fd3_8_c000_babdd{
        top:0rpx;right:0rpx;z-index:9;color:#ff5536;
    }    .serviceApply_fd3_8_c001_babdd{
        width:160rpx;height:160rpx;border-radius:20rpx 20rpx 20rpx 20rpx;
    }}    .serviceApply_fd3_8_c01_babdd{
        width:160rpx;height:160rpx;margin:0rpx 24rpx 24rpx 0rpx;border-radius:20rpx 20rpx 20rpx 20rpx;
    }    .serviceApply_fd3_9_babdd{
        position:fixed;bottom:calc(0rpx + var(--benben-window-bottom,0px));left:0rpx;width:750rpx;min-height:150rpx;background:var(--benbenbgColor1);background-size:100% auto !important;z-index:11;
        .serviceApply_fd3_9_c0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;
    }}}
    .serviceApply_fd3_0_babdd{
        margin:0rpx 0rpx 32rpx 0rpx;
        .serviceApply_fd3_0_c1_babdd{
        margin:0rpx 20rpx 0rpx auto;text-align:right;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }}
    .serviceApply_fd3_0_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .serviceApply_fd3_0_c2_babdd{
        width:16rpx;height:28rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .serviceApply_fd3_1_c1_babdd{
        margin:0rpx 20rpx 0rpx 20rpx;text-align:right;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .serviceApply_fd3_2_c1_c0_babdd{
        height:50rpx;margin:0rpx 4rpx 0rpx 4rpx;width:50rpx;
    }
    .serviceApply_fd3_5_c0_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);padding:0rpx 0rpx 20rpx 0rpx;
    }
    .serviceApply_numberfd3_7_c0_c0_babdd{
        font-size:24rpx;font-weight:400;color:rgba(191, 191, 191, 1);
    }
    .serviceApply_flex_2_babdd{
        width:750rpx;height:20rpx;border-radius:0rpx 0rpx 0rpx 0rpx;background:rgba(248, 248, 248, 1);
    }
    .serviceApply_flex_1_babdd{
        padding:24rpx 24rpx 0rpx 24rpx;
        .serviceApply_fd1_0_babdd{
        margin:0rpx 0rpx 34rpx 0rpx;
        .serviceApply_fd1_0_c0_babdd{
        width:200rpx;height:200rpx;margin:0rpx 24rpx 0rpx 0rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }    .serviceApply_fd1_0_c1_c0_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);line-height:42rpx;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .serviceApply_fd1_0_c1_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);margin:8rpx 0rpx 36rpx 0rpx;
    }    .serviceApply_fd1_0_c1_c2_c0_babdd{
        font-size:22rpx;font-weight:700;color:var(--benbenFontColor0);line-height:40rpx;
    }    .serviceApply_fd1_0_c1_c2_c1_babdd{
        color:var(--benbenFontColor0);font-weight:700;line-height:40rpx;font-size:32rpx;
        .serviceApply_price2_fd1_0_c1_c2_c1_babdd{
        font-size:22rpx;
    }}    .serviceApply_fd1_0_c1_c2_c2_babdd{
        margin:0rpx 0rpx 0rpx auto;font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);
    }    .serviceApply_fd1_0_c1_c2_c3_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);
    }}}
    .serviceApply_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .serviceApply_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:600;line-height:50rpx;
    }}
    .serviceApply_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .serviceApply_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
    ::v-deep .serviceApply_numberBoxInputfd3_2_c1_babdd{
        width:80rpx;height:45rpx;text-align:center;background:#f2f3f5;color:#323232;font-size:28rpx;margin:-5rpx 0rpx 0rpx 0rpx;
    }
</style>