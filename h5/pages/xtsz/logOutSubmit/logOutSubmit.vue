<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex logOutSubmit_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between logOutSubmit_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center logOutSubmit_fd0_0_c0_babdd'   @tap.stop="logOutFunc()"   >
        <text class='fu-iconfont2  logOutSubmit_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='logOutSubmit_fd0_0_c1_c0_babdd'  >{{$t('注销账号')}}</text>
</view>
    <view   class='flex align-center justify-end logOutSubmit_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---账号提交成功flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout logOutSubmit_flex_1_babdd"    >
            <view   class='flex flex-direction align-center'      >
        <image class='logOutSubmit_fd1_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"275.png"'></image>
<text class='logOutSubmit_fd1_0_c1_babdd'  >{{$t('注销申请提交成功！')}}</text>
<text class='logOutSubmit_fd1_0_c2_babdd'  >{{$t('我们工作人员将会对您的账号进行审核，审核通过后，账号将会被注销，请知悉')}}</text>
<button class='logOutSubmit_fd1_0_c3_babdd'  @tap.stop="logOutFunc()"  >{{$t('退出登录')}}</button>
</view>
</view>
        
<!---账号提交成功flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    
    let mixin ={
onBackPress() {
			// 拦截返回按钮，直接跳转到登录页面
			this.logOut();
			return true; // 阻止默认返回行为
		},
}
    export default {
        components:{},
        
        mixins: [mixin],
        data(){
			return {"type":""};
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
            let {type}=options
if (type !== undefined) this.type = type
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
            
		},
		onHide(){
            
            this.miniBackFunc()
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
            
            
                            //退出登录
                 logOutFunc(){
                        if( this.type=='1'){
                        this.$store.commit('logout')
                this.toLoginDiy();
    }
    else{
                    this.$urouter.navigateBack(1);
    }
                },
                //小程序右滑返回触发
                 miniBackFunc(){
                        if( this.appSystemIdentification=='Wechat'){
                            this.logOutFunc()
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
            .logOutSubmit_flex_1_babdd{
        padding:88rpx 95rpx 0rpx 95rpx;
        .logOutSubmit_fd1_0_c0_babdd{
        width:250rpx;height:180rpx;margin:0rpx 0rpx 10rpx 0rpx;
    }    .logOutSubmit_fd1_0_c1_babdd{
        font-size:32rpx;font-weight:700;color:var(--benbenFontColor0);margin:32rpx 0rpx 24rpx 0rpx;
    }    .logOutSubmit_fd1_0_c2_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);text-align:center;
    }    .logOutSubmit_fd1_0_c3_babdd{
        border-radius:36rpx 36rpx 36rpx 36rpx;font-size:28rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:320rpx;height:72rpx;line-height:72rpx;margin:104rpx 0rpx 0rpx 0rpx;
    }}
    .logOutSubmit_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .logOutSubmit_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .logOutSubmit_fd0_0_c0_babdd{
        width:100rpx;
        .logOutSubmit_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbenFontColor0);
    }}    .logOutSubmit_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .logOutSubmit_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>