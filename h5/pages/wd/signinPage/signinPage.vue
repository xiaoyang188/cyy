<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex signinPage_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub signinPage_fd0_0_babdd'      >
            <view   class='flex align-center signinPage_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  signinPage_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='signinPage_fd0_0_c1_c0_babdd'  >{{$t('我的签到')}}</text>
</view>
    <view   class='flex align-center justify-end signinPage_fd0_0_c0_babdd'      >
        <text class='signinPage_fd0_0_c2_c0_babdd'    v-if= " appSystemIdentification!='Wechat'" @tap.stop="popupShow1673862116532=true" >{{$t('签到规则')}}</text>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<benben-popup v-model="popupShow1673862116532" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---富文本弹窗flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
            <view   class='flex flex-direction flex-wrap align-center signinPage_fd1_0_babdd'      >
        <text class='signinPage_fd1_0_c0_babdd'  >{{$t('签到规则')}}</text>
    
    <scroll-view  class='signinPage_fd1_0_c1_babdd'  :scroll-x='false' :scroll-y='true' :show-scrollbar='false'      :enhanced="true">
        <view class='flex benben-scroll flex align-center' >
                    <jyf-parser class='signinPage_fd1_0_c1_c0_babdd'  :html="dataMessage.content | richTextFormat"  >
        </jyf-parser>
</view>
    </scroll-view>
    
</view>
<image class='signinPage_fd1_1_babdd'  mode="aspectFit"  :src='STATIC_URL+"197.png"' @tap.stop="popupShow1673862116532=false" ></image>
</view>
        
<!---富文本弹窗flex布局结束-->
    
</benben-popup>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-center benben-flex-layout signinPage_flex_2_babdd"    >
            <view   class='flex flex-wrap align-center signinPage_fd2_0_babdd'      >
        <text   >{{$t('已累计签到')}}</text>
<text   >{{calendar.sign_total}}</text>
<text   >{{$t('天')}}</text>
</view>
<text class='signinPage_fd2_1_babdd'    v-if= " appSystemIdentification=='Wechat'" @tap.stop="popupShow1673862116532=true" >{{$t('签到规则')}}</text>
    <view   class='flex flex-wrap align-center signinPage_fd2_2_babdd'      >
        <text   >{{$t('共获得')}}</text>
<text   >{{calendar.score}}</text>
<text   >{{$t('积分')}}</text>
</view>
    
        <benben-sign-card ref="benbenSignCardfd2_3" class='signinPage_fd2_3_babdd'  :sign-data="calendar.data" :current-month.sync="month" key-name="create_time"  @change="getcalendarFunc()"    >
        <template #head="{currentDate}">    <view   class='flex flex-wrap align-center self-center justify-center signinPage_fd2_3_c0_babdd'      >
        <text class='fu-iconfont2  signinPage_fd2_3_c0_c0_babdd'   @tap.stop="$refs.benbenSignCardfd2_3.onSwitchPrevMonth()">&#xe8ef;</text>
<text class='signinPage_fd2_3_c0_c1_babdd'  >{{currentDate}}</text>
<text class='fu-iconfont2  signinPage_fd2_3_c0_c0_babdd'   @tap.stop="$refs.benbenSignCardfd2_3.onSwitchNextMonth()">&#xe8f0;</text>
</view>
</template></benben-sign-card>
    
<button class='signinPage_fd2_4_babdd'  @tap.stop="signImmediatelyFunc()" v-if= " calendar.today!='1'" >{{$t('立即签到')}}</button>
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
			return {"popupShow1673862116532":false,/** introduce【简介】
*   content【内容】
*   thumb_img【内容图片】
*   name【页面标题】 **/ "dataMessage":{"aid":"","name":"","thumb_img":"","content":"","introduce":""},/** data【签到日期数据】
*   week_sign_info【周签到数据】
*   sign_total【总签到数】
*   score【签到获得总积分】
*   today【today【今日是否签到过。类型：tinyint(1) unsigned】】
*   days【	days【连续签到的天数。类型：tinyint(2) unsigned】】 **/ "calendar":{"user_id":"","days":"","create_time":"","today":"","score":"","sign_total":"","week_sign_info":[],"total":"","per_page":"","current_page":"","last_page":"","data":[]},"month":""};
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
            this.getMessageFunc()
this.getcalendarFunc()
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
            
            
                            //获取签到规则
                async getMessageFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post641568f1b6f87, {
    column_id:'13'
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
                },
                //获取签到数据
                async getcalendarFunc(){
                        //请求方法
    //数据验证
    
    
  let datacalendar = await this.$api.post(global.apiUrls.post64192099543cf, {
    start_time:this.month
  });
  
  if (datacalendar.data.code != 1) {
    this.$message.info(datacalendar.data.msg);
    return
  } 
  let infocalendar = datacalendar.data;
  this.calendar = infocalendar.data
  
                },
                //立即签到
                async signImmediatelyFunc(){
                        //请求方法
    //数据验证
    
    
  let data6419244390830 = await this.$api.post(global.apiUrls.post6419244390830, {
    type:'2'
  });
  
  if (data6419244390830.data.code != 1) {
    this.$message.info(data6419244390830.data.msg);
    return
  } 
  let info6419244390830 = data6419244390830.data;
  
  
                    uni.showToast({
                        title:this.$t('签到成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                    this.getcalendarFunc()
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:url(#{image-path('490.png')}) no-repeat;background-size: 100% auto;
            .signinPage_flex_2_babdd{
        padding:50rpx 0rpx 0rpx 0rpx;
        .signinPage_fd2_0_babdd{
        font-size:40rpx;font-weight:700;color:var(--benbenFontColor3);line-height:60rpx;
    }    .signinPage_fd2_1_babdd{
        color:var(--benbenFontColor3);margin:24rpx 0rpx 24rpx 0rpx;font-size:32rpx;
    }    .signinPage_fd2_2_babdd{
        margin:0rpx 0rpx 300rpx 0rpx;font-size:32rpx;font-weight:700;color:var(--benbenFontColor3);line-height:50rpx;
    }    .signinPage_fd2_3_babdd{
        background:var(--benbenbgColor1);border-radius:24rpx 24rpx 24rpx 24rpx;margin:0rpx 32rpx 0rpx 32rpx;padding:32rpx 0rpx 0rpx 0rpx;
        .signinPage_fd2_3_c0_babdd{
        height:80rpx;background:var(--benbenbgColor7);background-size:100% auto !important;width:400rpx;margin:0rpx auto 32rpx auto;border-radius:44rpx;color:var(--benbenFontColor3);
        .signinPage_fd2_3_c0_c1_babdd{
        color:var(--benbenFontColor4);
    }}}    .signinPage_fd2_4_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;width:588rpx;line-height:88rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);margin:50rpx 0rpx 40rpx 0rpx;
    }}
    .signinPage_fd2_3_c0_c0_babdd{
        padding:0rpx 15rpx 0rpx 15rpx;color:var(--benbeniconColor0);
    }
    .signinPage_fd1_0_babdd{
        width:560rpx;background:url(#{image-path('491.png')}) no-repeat ,#fff;background-size:100% auto !important;border-radius:24rpx 24rpx 24rpx 24rpx;padding:28rpx 32rpx 45rpx 32rpx;margin:0rpx 0rpx 40rpx 0rpx;
        .signinPage_fd1_0_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:200rpx 0rpx 32rpx 0rpx;
    }    .signinPage_fd1_0_c1_babdd{
        touch-action:none;height:330rpx;width:480rpx;
    }}
    .signinPage_fd1_1_babdd{
        width:56rpx;height:56rpx;border-radius:28rpx 28rpx 28rpx 28rpx;
    }
    .signinPage_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:url(#{image-path('490.png')}) no-repeat ,transparent;background-size:100% auto !important;
        .signinPage_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .signinPage_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor3);
    }}}
    .signinPage_fd0_0_c0_babdd{
        width:180rpx;
        .signinPage_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbenFontColor3);
    }}
    .signinPage_fd0_0_c2_c0_babdd{
        color:var(--benbenFontColor3);
    }}
    ::v-deep .signinPage_fd1_0_c1_c0_babdd{
        width:480rpx;
    }
</style>