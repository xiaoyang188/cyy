<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch benben-position-layout flex returnInformation_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between returnInformation_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center returnInformation_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  returnInformation_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='returnInformation_fd0_0_c1_c0_babdd'  >{{$t('填写寄回信息')}}</text>
</view>
    <view   class='flex align-center justify-end returnInformation_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---售后订单flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout returnInformation_flex_1_babdd"    >
            <view   class='flex flex-wrap align-stretch returnInformation_fd1_0_babdd'      >
        <image class='returnInformation_fd1_0_c0_babdd'  mode="aspectFill"  :src='thumb'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub returnInformation_fd1_0_c1_babdd'      >
        <text class='returnInformation_fd1_0_c1_c0_babdd'  >{{name}}</text>
<text class='returnInformation_fd1_0_c1_c1_babdd'  >{{sku_name}}</text>
    <view   class='flex flex-wrap align-center justify-between'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='returnInformation_fd1_0_c1_c2_c0_c0_babdd'  >{{$t('￥')}}</text>
<text class=' returnInformation_fd1_0_c1_c2_c0_c1_babdd'   >
    <text class=' returnInformation_price1_fd1_0_c1_c2_c0_c1_babdd' >{{ price | frontPrice }}</text><text class=' returnInformation_price2_fd1_0_c1_c2_c0_c1_babdd' >{{ price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center returnInformation_fd1_0_c1_c2_c1_babdd'      >
        <text   >x</text>
<text   >{{num}}</text>
</view>
</view>
</view>
</view>
</view>
        
<!---售后订单flex布局结束-->
<!---填写寄回信息flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout returnInformation_flex_2_babdd"    >
        <text class='returnInformation_fd2_0_babdd'  >{{$t('为了给您更优的退换货时效和体验，我公司建议优先选择协作快递韵达。')}}</text>
    <view   class='flex flex-wrap align-center returnInformation_fd2_1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/ddgl/chooseLogisticsCompany/chooseLogisticsCompany?logistics_id=${logistics.logistics_id}`"   >
        <text class='returnInformation_fd2_1_c0_babdd'  >{{$t('物流公司')}}</text>
<benben-input class='flex-sub returnInformation_fd2_1_c1_babdd'   type="text" :placeholder="$t('请选择')" confirm-type="done" :maxlength="-1" :disabled='true' placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="logistics.logistics_name" />
<text class='fu-iconfont2  returnInformation_fd2_1_c2_babdd'  >&#xe7f2;</text>
</view>
    <view   class='flex flex-wrap align-center returnInformation_fd2_1_babdd'      >
        <text class='returnInformation_fd2_1_c0_babdd'  >{{$t('物流单号')}}</text>
<benben-input class='flex-sub returnInformation_fd2_1_c1_babdd'   type="text" :placeholder="$t('请填写物流单号')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="express_no" />
</view>
    <view   class='flex flex-wrap align-center returnInformation_fd2_1_babdd'      >
        <text class='returnInformation_fd2_1_c0_babdd'  >{{$t('联系电话')}}</text>
<benben-input class='flex-sub returnInformation_fd2_3_c1_babdd'   type="number" :placeholder="$t('请输入联系电话')" confirm-type="done" :maxlength="11" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="mobile" />
</view>
    <view   class='flex flex-wrap align-center returnInformation_fd2_4_babdd'      >
        <text class='returnInformation_fd2_1_c0_babdd'  >{{$t('退换说明')}}</text>
<benben-input class='flex-sub returnInformation_fd2_1_c1_babdd'   type="text" :placeholder="$t('请输入(选填)')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="content" />
</view>
    <benben-images-upload  ref="benbenImagesUploadfd2_5"  :img-list.sync="url" :img-ids.sync="images" :maxlength="9" >
     <view class="flex flex-wrap align-start flex returnInformation_fd2_5_babdd" >
            
    <view v-for="(image, index) in url" :key="index"  class='flex position-relative returnInformation_fd2_50_babdd'      >
        <benben-clean-icon class='fu-iconfont2 position-absolute returnInformation_fd2_500_babdd'   hand-name="benben-images-upload" hand-method="delImage" :hand-index="index">&#xE8E7;</benben-clean-icon><benben-image-item class='returnInformation_fd2_501_babdd'  hand-name="benben-images-upload" hand-method="previewImage" :hand-index="index"  :src='image'></benben-image-item>
    </view>
    

            <benben-image-item v-if="url.length<9" class='returnInformation_fd2_51_babdd'  mode="aspectFit" hand-name="benben-images-upload" hand-method="manyChooseImage"  :src='STATIC_URL+"342.jpg"'></benben-image-item>
            
          </view>
    </benben-images-upload>
    <view   class='flex align-stretch justify-center returnInformation_fd2_6_babdd'      >
        <button class='returnInformation_fd2_6_c0_babdd'  @tap.stop="submitMessageFunc()"  >{{$t('提交')}}</button>
</view>
</view>
        
<!---填写寄回信息flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"express_no":"","mobile":"","content":"","images":"","url":[],"logistics":{"logistics_id":"","logistics_name":""},"goodsInfo":{},"remark":"","text":"2","aid":null,"thumb":"https://oss.tiantianhuoke.com/images/1684395313612122.png","name":"印尼进口山竹 3A级中果 2.5kg装 单果约40-70g 新鲜水果","sku_name":"","price":"89","num":"1"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {aid,thumb,name,sku_name,price,num}=options
if (aid !== undefined) this.aid = aid
if (thumb !== undefined) this.thumb = thumb
if (name !== undefined) this.name = name
if (sku_name !== undefined) this.sku_name = sku_name
if (price !== undefined) this.price = price
if (num !== undefined) this.num = num
this.diyPageListen()
		},
        onUnload() {
            this.diyOffPageListen()    
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
            
            
                            //提交寄回信息
                async submitMessageFunc(){
                                if(!validate(this.logistics.logistics_id,'require')){
                 this.$message.info(this.$t('请选择物流公司'));
                 return false;
            }
            if(!validate(this.express_no,'require')){
                 this.$message.info(this.$t('请填写物流单号'));
                 return false;
            }
            if(!validate(this.mobile,'require')){
                 this.$message.info(this.$t('请填写联系电话'));
                 return false;
            }
            if(!validate(this.mobile,'phone')){
                 this.$message.info(this.$t('请输入正确的联系电话'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data6427dab6182fa = await this.$api.dbPost(global.apiUrls.post6427dab6182fa, {
    id:this.aid,express_company_id:this.logistics.logistics_id,express_no:this.express_no,remark:this.content,img:this.images
  });
  if(!data6427dab6182fa) return
  if (data6427dab6182fa.data.code != 1) {
    this.$message.info(data6427dab6182fa.data.msg);
    return
  } 
  let info6427dab6182fa = data6427dab6182fa.data;
  
  
                    uni.showToast({
                        title:this.$t('提交成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                uni.$emit('shenqingchengg',this.text)
                setTimeout(()=>{
                    this.$urouter.navigateBack(1);
      },500)
                },
    //页面监听
    diyPageListen() {
                  uni.$on('logistics',(data) => {
                  this.logistics = data;
          });
    }                     ,
    //注销页面监听
    diyOffPageListen() {
                     uni.$off('logistics');
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
            .returnInformation_flex_2_babdd{
        padding:15rpx 24rpx 150rpx 24rpx;
        .returnInformation_fd2_0_babdd{
        color:var(--benbenFontColor4);font-size:28rpx;font-weight:500;line-height:41rpx;
    }    .returnInformation_fd2_4_babdd{
        font-weight:400;font-size:32rpx;color:#333;border-bottom:1px solid #eee;
    }    .returnInformation_fd2_5_babdd{
        width:100%;padding:24rpx 0rpx 0rpx 24rpx;
        .returnInformation_fd2_50_babdd{
        margin:0rpx 24rpx 24rpx 0rpx;
        .returnInformation_fd2_500_babdd{
        top:0rpx;right:0rpx;z-index:9;color:#ff5536;
    }    .returnInformation_fd2_501_babdd{
        width:160rpx;height:160rpx;border-radius:20rpx 20rpx 20rpx 20rpx;
    }}    .returnInformation_fd2_51_babdd{
        width:160rpx;height:160rpx;margin:0rpx 24rpx 24rpx 0rpx;border-radius:20rpx 20rpx 20rpx 20rpx;
    }}    .returnInformation_fd2_6_babdd{
        position:fixed;bottom:calc(0rpx + var(--benben-window-bottom,0px));left:0rpx;width:750rpx;height:150rpx;z-index:10;background:var(--benbenbgColor1);background-size:100% auto;
        .returnInformation_fd2_6_c0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;font-weight:500;margin:12rpx 0rpx 0rpx 0rpx;
    }}}
    .returnInformation_fd2_1_babdd{
        border-bottom:1px solid #eee;
        .returnInformation_fd2_1_c2_babdd{
        font-size:16rpx;font-weight:400;color:var(--benbeniconColor2);margin:0rpx 0rpx 0rpx 20rpx;
    }}
    .returnInformation_fd2_1_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .returnInformation_fd2_1_c1_babdd{
        height:109rpx;font-size:32rpx;color:var(--benbenFontColor0);text-align:right;
    }
    .returnInformation_fd2_3_c1_babdd{
        font-size:32rpx;color:var(--benbenFontColor0);text-align:right;height:109rpx;
    }
    .returnInformation_flex_1_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .returnInformation_fd1_0_babdd{
        margin:24rpx 0rpx 0rpx 0rpx;
        .returnInformation_fd1_0_c0_babdd{
        width:200rpx;height:200rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }    .returnInformation_fd1_0_c1_babdd{
        margin:0rpx 0rpx 0rpx 34rpx;
        .returnInformation_fd1_0_c1_c0_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .returnInformation_fd1_0_c1_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);margin:10rpx 0rpx 36rpx 0rpx;
    }    .returnInformation_fd1_0_c1_c2_c0_c0_babdd{
        font-size:20rpx;font-weight:700;color:var(--benbenFontColor0);
    }    .returnInformation_fd1_0_c1_c2_c0_c1_babdd{
        color:var(--benbenFontColor0);font-weight:600;
        .returnInformation_price1_fd1_0_c1_c2_c0_c1_babdd{
        font-size:32rpx;
    }    .returnInformation_price2_fd1_0_c1_c2_c0_c1_babdd{
        font-size:22rpx;
    }}    .returnInformation_fd1_0_c1_c2_c1_babdd{
        font-size:24rpx;font-weight:400;color:#999999;
    }}}}
    .returnInformation_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .returnInformation_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .returnInformation_fd0_0_c0_babdd{
        width:200rpx;
        .returnInformation_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);font-weight:500;
    }}    .returnInformation_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);
    }    .returnInformation_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:200rpx;
    }}}}
</style>