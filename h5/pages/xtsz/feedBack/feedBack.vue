<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex feedBack_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between feedBack_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center feedBack_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  feedBack_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='feedBack_fd0_0_c1_c0_babdd'  >{{$t('我要反馈')}}</text>
</view>
    <view   class='flex align-center justify-end feedBack_fd0_0_c2_babdd'      >
        <text class='feedBack_fd0_0_c2_c0_babdd'    v-if= " appSystemIdentification!='Wechat'" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/feedBackDetail/feedBackDetail`" >{{$t('反馈记录')}}</text>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---意见反馈表单flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout"    >
            <view   class='flex flex-direction align-stretch feedBack_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center feedBack_fd1_0_c0_babdd'      >
        <text class='feedBack_fd1_0_c0_c0_babdd'  >{{$t('反馈类型')}}</text>
<text class='feedBack_fd1_0_c0_c1_babdd'    v-if= " appSystemIdentification=='Wechat'" @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/feedBackDetail/feedBackDetail`" >{{$t('反馈记录')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch feedBack_fd1_0_c1_babdd'      >
            <benben-select-diy ref="showSelectPopup1689675271268" class-text='flex-wrap align-center flex'   :items.sync="dataList" v-model="changeId"  default-type="aid" default-label="name" :allow-cancel='false' type="radio" :disabled='false'  >
    <benben-select-item v-for = '(item,key0) in dataList' :hand-value='item.aid' :key='key0'>
        <template #selected>    <view   class='flex align-center justify-center flex feedBack_fd1_0_c1_c0_c0_babdd'      >
        <text class='flex-sub feedBack_fd1_0_c1_c0_c0_c0_babdd'  >{{item.title}}</text>
</view>
</template><template #no-selected>    <view   class='flex align-center justify-center flex feedBack_fd1_0_c1_c0_c1_babdd'      >
        <text class='flex-sub feedBack_fd1_0_c1_c0_c1_c0_babdd'  >{{item.title}}</text>
</view>
</template></benben-select-item></benben-select-diy>
</view>
<text class='feedBack_fd1_0_c2_babdd'  >{{$t('问题描述')}}</text>
    <view   class='flex flex-direction flex-wrap align-stretch feedBack_fd1_0_c3_babdd'      >
        <view class='flex flex-wrap feedBack_fd1_0_c3_c0_babdd'>
<benben-textarea class='flex feedBack_input_fd1_0_c3_c0_babdd'  confirm-type="done" :placeholder="$t('问题描述的越详细，有助于我们更快的解决问题')" :maxlength="300" :show-num='true' placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"   v-model="body" />
<template>    <view   class='flex flex justify-end feedBack_numberfd1_0_c3_c0_c0_babdd'      >
        <text   >{{body.length}}</text>
<text   >/</text>
<text   >300</text>
</view>
</template>
</view>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch'      >
            <benben-images-upload  ref="benbenImagesUploadfd1_0_c4_c0"  :img-list.sync="img" :img-ids.sync="img_id" :is-show-tips='true' :maxlength="6" >
     <view class="flex flex-wrap align-start flex feedBack_fd1_0_c4_c0_babdd" >
            
    <view v-for="(image, index) in img" :key="index"  class='flex position-relative feedBack_fd1_0_c4_c00_babdd'      >
        <benben-clean-icon class='fu-iconfont2 position-absolute feedBack_fd1_0_c4_c000_babdd'   hand-name="benben-images-upload" hand-method="delImage" :hand-index="index">&#xE8E7;</benben-clean-icon><benben-image-item class='feedBack_fd1_0_c4_c001_babdd'  mode="aspectFit" hand-name="benben-images-upload" hand-method="previewImage" :hand-index="index"  :src='image'></benben-image-item>
    </view>
    

            <benben-image-item v-if="img.length<6" class='feedBack_fd1_0_c4_c01_babdd'  mode="aspectFit" hand-name="benben-images-upload" hand-method="manyChooseImage"  :src='STATIC_URL+"9.png"'></benben-image-item>
            <text class='image_upload_tips feedBack_fd1_0_c4_c02_babdd'  >{{$t('请上传应用截图，最多上传')}}6 {{$t('张')}}</text>
          </view>
    </benben-images-upload>
</view>
</view>
<button class='flex-sub feedBack_fd1_1_babdd'  @tap.stop="postfeedbackFunc()"  >{{$t('提交反馈')}}</button>
</view>
        
<!---意见反馈表单flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"changeId":"1","changeType":[{"name":"下载/加载问题","value":"1","image":""},{"name":"会员付费问题","value":"2","image":""},{"name":"章节/图片问题","value":"3","image":""},{"name":"APP体验问题","value":"4","image":""},{"name":"卡顿/不流畅","value":"5","image":""},{"name":"其他","value":"6","image":""}],"dataList":[],"body":"","img":[],"img_id":""};
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
            this.getTypeFunc()
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
            
            
                            //提交反馈
                async postfeedbackFunc(){
                                if(!validate(this.changeId,'require')){
                 this.$message.info(this.$t('请选择反馈类型'));
                 return false;
            }
            if(!validate(this.body,'require')){
                 this.$message.info(this.$t('请输入问题描述'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data6414724b96f3f = await this.$api.dbPost(global.apiUrls.post6414724b96f3f, {
    type_id:this.changeId,body:this.body,thumb:this.img_id
  });
  if(!data6414724b96f3f) return
  if (data6414724b96f3f.data.code != 1) {
    this.$message.info(data6414724b96f3f.data.msg);
    return
  } 
  let info6414724b96f3f = data6414724b96f3f.data;
  
  
                    uni.showToast({
                        title:this.$t('提交成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                setTimeout(()=>{
            this.$urouter.redirectTo(`/pages/xtsz/helpFeedback/helpFeedback`);
      },500)
                },
                //获取反馈类型
                async getTypeFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.post(global.apiUrls.post6414719bdc956, {
    user_type:'1'
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
    this.changeId = this.dataList[0].aid//默认类型id
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
            .feedBack_fd1_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 0rpx 48rpx 0rpx;margin:0rpx 0rpx 180rpx 0rpx;
        .feedBack_fd1_0_c0_babdd{
        padding:32rpx 0rpx 12rpx 0rpx;
        .feedBack_fd1_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);margin:0rpx 32rpx 0rpx 32rpx;
    }    .feedBack_fd1_0_c0_c1_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);margin:0rpx 0rpx 0rpx auto;padding:0rpx 32rpx 0rpx 32rpx;
    }}    .feedBack_fd1_0_c1_babdd{
        padding:0rpx 16rpx 16rpx 16rpx;border-bottom:10px solid var(--benbenbdColor0);
        .feedBack_fd1_0_c1_c0_c0_babdd{
        margin:16rpx 16rpx 16rpx 16rpx;height:64rpx;border-radius:8rpx 8rpx 8rpx 8rpx;background:var(--benbenbtnColor0);width:206rpx;padding:0rpx 10rpx 0rpx 10rpx;
        .feedBack_fd1_0_c1_c0_c0_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor3);line-height:62rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;text-align:center;
    }}    .feedBack_fd1_0_c1_c0_c1_babdd{
        margin:16rpx 16rpx 16rpx 16rpx;height:64rpx;border-radius:8rpx 8rpx 8rpx 8rpx;background:var(--benbenbtnColor3);width:206rpx;padding:0rpx 10rpx 0rpx 10rpx;
        .feedBack_fd1_0_c1_c0_c1_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);line-height:62rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;text-align:center;
    }}}    .feedBack_fd1_0_c2_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);line-height:109rpx;margin:0rpx 32rpx 0rpx 32rpx;
    }    .feedBack_fd1_0_c3_babdd{
        margin:0rpx 0rpx 32rpx 0rpx;
        .feedBack_fd1_0_c3_c0_babdd{
        width:686rpx;border-radius:10rpx 10rpx 10rpx 10rpx;margin:0rpx 0rpx 0rpx 32rpx;padding:10rpx 10rpx 24rpx 10rpx;background:var(--benbenbgColor2);background-size:100% auto;
        .feedBack_input_fd1_0_c3_c0_babdd{
        width:100%;height:166rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }    .feedBack_numberfd1_0_c3_c0_c0_babdd{
        width:100%;font-size:24rpx;color:rgba(153, 153, 153, 1);line-height:46rpx;font-weight:400;
    }}}    .feedBack_fd1_0_c4_c0_babdd{
        padding:24rpx 0rpx 0rpx 24rpx;
        .feedBack_fd1_0_c4_c00_babdd{
        margin:0rpx 24rpx 24rpx 0rpx;
        .feedBack_fd1_0_c4_c000_babdd{
        top:0rpx;right:0rpx;z-index:10;color:#ff5536;
    }    .feedBack_fd1_0_c4_c001_babdd{
        width:160rpx;height:160rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }}    .feedBack_fd1_0_c4_c01_babdd{
        width:160rpx;height:160rpx;margin:0rpx 24rpx 24rpx 0rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
    }    .feedBack_fd1_0_c4_c02_babdd{
        font-size:24rpx;color:var(--benbenFontColor2);font-weight:400;width:100%;
    }}}
    .feedBack_fd1_1_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);height:88rpx;line-height:88rpx;width:638rpx;position:fixed;left:53rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));
    }
    .feedBack_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .feedBack_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .feedBack_fd0_0_c0_babdd{
        width:200rpx;
        .feedBack_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .feedBack_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .feedBack_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:200rpx;
        .feedBack_fd0_0_c2_c0_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}}}
</style>