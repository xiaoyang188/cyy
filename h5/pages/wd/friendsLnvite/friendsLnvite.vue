<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex friendsLnvite_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center friendsLnvite_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='friendsLnvite_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"166.png"'></image>
</view>
<text class='friendsLnvite_fd0_1_babdd'  >{{$t('邀请好友')}}</text>
    <view   class='flex flex-wrap align-center friendsLnvite_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout friendsLnvite_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center friendsLnvite_fd1_0_babdd'      >
        <image class='friendsLnvite_fd1_0_c0_babdd'  mode="aspectFill"  :src='dataMessage.avatar'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub friendsLnvite_fd1_0_c1_babdd'      >
        <text class='friendsLnvite_fd1_0_c1_c0_babdd'  >{{dataMessage.nickname}}</text>
    <view   class='flex flex-wrap align-center friendsLnvite_fd1_0_c1_c1_babdd'      >
        <text class='friendsLnvite_fd1_0_c1_c1_c0_babdd'  >{{$t('邀请码：')}}</text>
<text class='friendsLnvite_fd1_0_c1_c1_c0_babdd'  >{{dataMessage.invite_code}}</text>
</view>
</view>
</view>
    <view   class='flex flex-wrap align-center justify-center friendsLnvite_fd1_1_babdd'      >
        <image class='friendsLnvite_fd1_1_c0_babdd'  mode="aspectFill"  :src='dataDetails.qrcode_url'  v-if= " appSystemIdentification!='Wechat'"></image>
<image class='friendsLnvite_fd1_1_c0_babdd'  mode="aspectFill"  :src='wxShareImg.base64'  v-if= " appSystemIdentification=='Wechat'"></image>
</view>
    <view   class='flex flex-wrap align-center justify-between friendsLnvite_fd1_2_babdd'      >
        <button class='friendsLnvite_fd1_2_c0_babdd'  @tap.stop="SavePictureFunc()"  >{{$t('保存图片到相册')}}</button>
<button class='friendsLnvite_fd1_2_c1_babdd'  @tap.stop="popupShow1679975430753=true" v-if= " appSystemIdentification!='Wechat'" >{{$t('一键分享')}}</button><button class='friendsLnvite_fd1_2_c1_babdd'  @tap.stop="MysharedFunc()" v-if= " appSystemIdentification=='Wechat'" >{{$t('一键分享')}}</button>
</view>
</view>
        
<!---flex布局flex布局结束-->
<benben-popup v-model="popupShow1679975430753" :mask="true" :mask-close-able="true"  mode='bottom'  >
    <!---分享flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center friendsLnvite_flex_2_babdd"    >
            <view   class='flex flex-direction flex-wrap align-stretch friendsLnvite_fd2_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-between friendsLnvite_fd2_0_c0_babdd'      >
            <view   class='flex flex-wrap align-center friendsLnvite_fd2_0_c0_c0_babdd'      >
        </view>
    <view   class='flex flex-wrap align-center'      >
        <image class='friendsLnvite_fd2_0_c0_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"61.png"'></image>
<text class='friendsLnvite_fd2_0_c0_c1_c1_babdd'  >{{$t('分享到')}}</text>
<image class='friendsLnvite_fd2_0_c0_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"62.png"'></image>
</view>
<image class='friendsLnvite_fd2_0_c0_c2_babdd'  mode="aspectFit"  :src='STATIC_URL+"355.png"' @tap.stop="popupShow1679975430753=false" ></image>
</view>
    <view   class='flex flex-wrap align-center justify-center friendsLnvite_fd2_0_c1_babdd'      >
            <view   class='flex align-center justify-between'      >
            <view   class='flex flex-direction flex-wrap align-center friendsLnvite_fd2_0_c1_c0_c0_babdd'   @tap="MysharedFunc(1)"   >
        <button class='friendsLnvite_fd2_0_c1_c0_c0_c0_babdd'   v-if= " appSystemIdentification=='Wechat'" open-type="share" ></button>
<image class='friendsLnvite_fd2_0_c1_c0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"312.png"'></image>
<text class='friendsLnvite_fd2_0_c1_c0_c0_c2_babdd'  >{{$t('微信好友')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-center friendsLnvite_fd2_0_c1_c0_c1_babdd'   @tap="MysharedFunc(2)"   >
        <image class='friendsLnvite_fd2_0_c1_c0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"313.png"'></image>
<text class='friendsLnvite_fd2_0_c1_c0_c0_c2_babdd'  >{{$t('朋友圈')}}</text>
</view>
</view>
</view>
</view>
</view>
        
<!---分享flex布局结束-->
    
</benben-popup>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"popupShow1679975430753":false,/** follow_count【关注的店铺数量】
*   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
*   nickname【昵称】
*   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
*   total_money【会员总金额】
*   browse_count【足迹数量】
*   collection_count【收藏数量】
*   _mobile【手机号不带*号】
*   score【积分余额】
*   total_consumption_money【总消费金额】
*   freeze_money【会员冻结金额】
*   user_money【会员余额】
*   gender【性别 1 男 2 女】
*   birthday【生日】
*   email【邮箱】
*   account【登录账号】
*   avatar【头像】
*   real_name【真实姓名】
*   mobile【手机号带*号】
*   userlevel_id【会员级别】
*   id【会员ID】
*   tags【标签】
*   hobby【爱好】
*   address_code【地址编码】
*   address【地址】
*   invite_code【邀请码】 **/ "dataMessage":{"invite_code":"","address":"","address_code":"","hobby":"","tags":"","id":0,"userlevel_id":0,"mobile":"","real_name":"","avatar":"","account":"","email":"","birthday":"","gender":"","create_time":"","user_money":"","freeze_money":"","total_consumption_money":"","score":"","_mobile":"","coupon":0,"collection_count":0,"browse_count":0,"total_money":0,"certified":0,"nickname":"","is_pay_password":0,"follow_count":0},/** url【分享链接地址】
*   qrcode_url【二维码图片地址】 **/ "dataDetails":{"qrcode_url":"","url":""},/** tempFilePath【文件临时路径路径】 **/ "downloadImg":{"tempFilePath":""},"str":"",/** base64【二维码】 **/ "wxShareImg":{"base64":""},/** tempFilePath【文件临时路径路径】 **/ "wxDoImg":{"tempFilePath":""}};
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
            this.getUserinfoFunc()
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
            
            
                            //保存图片
                async SavePictureFunc(){
                        if( this.appSystemIdentification!='Wechat'){
                        this.downloadImg = await this.syncUniApi('downloadFile',{'url': this.dataDetails.qrcode_url})
                await this.syncUniApi('saveImageToPhotosAlbum',{'filePath': this.downloadImg.tempFilePath})
                    uni.showToast({
                        title:this.$t('保存成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
    }
    else{
                        this.wxDoImg = await this.syncUniApi('downloadFile',{'url': this.wxShareImg.base64})
                await this.syncUniApi('saveImageToPhotosAlbum',{'filePath': this.wxDoImg.tempFilePath})
                    uni.showToast({
                        title:this.$t('保存成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
    }
                },
                //获取会员详细信息
                async getUserinfoFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post5c78c4772da97, {
    
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
    this.str='invite_code='+this.dataMessage.invite_code
                    this.gethaibaoFunc()
                },
                //分销中心-邀请好友推广海报
                async gethaibaoFunc(){
                        if( this.appSystemIdentification!='Wechat'){
            //请求方法
    //数据验证
    
    
  let datadataDetails = await this.$api.get(global.apiUrls.post641ee42b715ef, {
    
  });
  
  if (datadataDetails.data.code != 1) {
    this.$message.info(datadataDetails.data.msg);
    return
  } 
  let infodataDetails = datadataDetails.data;
  this.dataDetails = infodataDetails.data
  
    }
    else{
            let datawxShareImg = await this.$api.post(global.apiUrls.post6462057de42ce, {
						scene: `invite_code=${this.dataMessage.invite_code}`,
						check_path: false,
                        page:'pages/tabBar/home/home'
					});

					if (datawxShareImg.data.code != 1) {
						this.$message.info(datawxShareImg.data.msg);
						return
					}
					let infowxShareImg = datawxShareImg.data;
					this.wxShareImg = infowxShareImg.data
    }
                },
                //分享
                async MysharedFunc(type){
                        if( this.appSystemIdentification=='Wechat'){
            uni.downloadFile({
    url: this.wxShareImg.base64,
    success: (res) => {
        if (res.statusCode === 200) {
            wx.showShareImageMenu({
                path: res.tempFilePath,
                success: (res) => {
                    console.log("分享成功：", res);
                },
                fail: (err) => {
                    console.log("分享取消：", err);
                },

            })
        }
    },
    fail: error => {
        this.$message.info("保存失败");
    }
});
    }
    else{
            if( type=='1'){
                        await this.syncUniApi('share',{'provider': 'weixin','scene': 'WXSceneSession','type': '0','title': `${this.dataMessage.nickname}邀请您下载${global.SYSTEM_CONFIG.appName}`,'href': this.dataDetails.url,'summary': '邀请好友','imageUrl': this.dataDetails.qrcode_url})
    }
    else if( type=='2'){
                        await this.syncUniApi('share',{'provider': 'weixin','scene': 'WXSceneTimeline','type': '0','title': `${this.dataMessage.nickname}邀请您下载${global.SYSTEM_CONFIG.appName}`,'href': this.dataDetails.url,'summary': '邀请好友','imageUrl': this.dataDetails.qrcode_url})
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
            background:url(#{image-path('201.png')}) no-repeat ,rgba(251, 76, 80, 1);background-size: 100% auto;
            .friendsLnvite_flex_2_babdd{
        position:relative;z-index:9999;
        .friendsLnvite_fd2_0_babdd{
        background:rgba(255, 255, 255, 1);background-size:100% auto !important;width:750rpx;border-radius:24rpx 24rpx 0rpx 0rpx;
        .friendsLnvite_fd2_0_c0_babdd{
        margin:40rpx 40rpx 0rpx 40rpx;
        .friendsLnvite_fd2_0_c0_c0_babdd{
        height:40rpx;width:40rpx;
    }    .friendsLnvite_fd2_0_c0_c1_c1_babdd{
        color:#333;font-size:32rpx;font-weight:700;margin:0rpx 24rpx 0rpx 24rpx;
    }    .friendsLnvite_fd2_0_c0_c2_babdd{
        width:40rpx;height:40rpx;border-radius:40rpx 40rpx 40rpx 40rpx;
    }}    .friendsLnvite_fd2_0_c1_babdd{
        margin:48rpx 0rpx 58rpx 0rpx;
        .friendsLnvite_fd2_0_c1_c0_c0_babdd{
        position:relative;margin:0rpx 64rpx 0rpx 0rpx;
        .friendsLnvite_fd2_0_c1_c0_c0_c0_babdd{
        border-radius:0rpx;font-size:24rpx;color:#fff;background:transparent;background-size:100% auto;width:110rpx;height:130rpx;position:absolute;z-index:3;
    }}    .friendsLnvite_fd2_0_c1_c0_c1_babdd{
        margin:0rpx 0rpx 0rpx 64rpx;
    }}}}
    .friendsLnvite_fd2_0_c0_c1_c0_babdd{
        width:32rpx;height:10rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .friendsLnvite_fd2_0_c1_c0_c0_c1_babdd{
        width:80rpx;height:80rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .friendsLnvite_fd2_0_c1_c0_c0_c2_babdd{
        color:#333;font-size:24rpx;font-weight:400;margin:16rpx 0rpx 0rpx 0rpx;
    }
    .friendsLnvite_flex_1_babdd{
        padding:0rpx 103rpx 0rpx 103rpx;
        .friendsLnvite_fd1_0_babdd{
        margin:346rpx auto 0rpx auto;
        .friendsLnvite_fd1_0_c0_babdd{
        width:96rpx;height:96rpx;border-radius:48rpx 48rpx 48rpx 48rpx;
    }    .friendsLnvite_fd1_0_c1_babdd{
        margin:0rpx 0rpx 0rpx 24rpx;
        .friendsLnvite_fd1_0_c1_c0_babdd{
        color:#333333;font-size:28rpx;font-weight:500;line-height:33rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .friendsLnvite_fd1_0_c1_c1_babdd{
        margin:8rpx 0rpx 0rpx 0rpx;
    }}}    .friendsLnvite_fd1_1_babdd{
        margin:24rpx 0rpx 0rpx 0rpx;
    }    .friendsLnvite_fd1_2_babdd{
        margin:48rpx 0rpx 0rpx 0rpx;
        .friendsLnvite_fd1_2_c0_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;font-size:32rpx;background:var(--benbenbgColor1);color:var(--benbenFontColor7);width:260rpx;height:88rpx;line-height:88rpx;
    }}}
    .friendsLnvite_fd1_0_c1_c1_c0_babdd{
        color:#333333;font-size:28rpx;font-weight:500;line-height:40rpx;
    }
    .friendsLnvite_fd1_1_c0_babdd{
        width:320rpx;height:320rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .friendsLnvite_fd1_2_c1_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;font-size:32rpx;background:linear-gradient(359deg, #FFC20E 0%, #FEEBB6 94%, #FEEBB6 100%);color:var(--benbenFontColor9);width:260rpx;height:88rpx;box-shadow:0rpx 3rpx 6rpx 1rpx rgba(244,10,7,0.77);line-height:88rpx;
    }
    .friendsLnvite_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:url(#{image-path('201.png')}) no-repeat ,transparent;background-size:100% auto !important;
        .friendsLnvite_fd0_1_babdd{
        color:#fff;font-size:36rpx;font-weight:500;line-height:50rpx;
    }}
    .friendsLnvite_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .friendsLnvite_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
</style>