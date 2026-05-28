<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center inputNewPhone_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub inputNewPhone_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center inputNewPhone_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  inputNewPhone_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='inputNewPhone_fd0_0_c1_c0_babdd'  >{{$t('绑定新手机')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end inputNewPhone_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---输入新的手机号-表单flex布局开始-->
 <view class="flex flex-direction align-center inputNewPhone_flex_1_babdd"    >
            <view   class='flex flex-direction align-stretch inputNewPhone_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center inputNewPhone_fd1_0_c0_babdd'      >
        <text class='inputNewPhone_fd1_0_c0_c0_babdd'  >{{$t('新手机号码')}}</text>
<benben-input class='flex-sub inputNewPhone_fd1_0_c0_c1_babdd'   type="number" :focus='true' :placeholder="$t('请输入新的手机号')" confirm-type="done" :maxlength="11" placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="mobile" />
</view>
    <view   class='flex flex-wrap align-center inputNewPhone_fd1_0_c0_babdd'      >
        <text class='inputNewPhone_fd1_0_c0_c0_babdd'  >{{$t('短信验证')}}</text>
<benben-input class='flex-sub inputNewPhone_fd1_0_c1_c1_babdd'   type="number" :placeholder="$t('请输入验证码')" confirm-type="done" :maxlength="6" placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="code" />
<benben-send-verification-code key='1747727833989' ref="vCode1747727833989" class=' inputNewPhone_fd1_0_c1_c2_babdd'  :after-text="$t('后重新获取')" :before-text="$t('获取短信验证')" type='5' :is-environment-verification='true'  :phone="mobile" ></benben-send-verification-code>
</view>
</view>
<button class='flex-sub inputNewPhone_fd1_1_babdd'  @tap.stop="checkCodeFunc()"  >{{$t('完成')}}</button>
</view>
        
<!---输入新的手机号-表单flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"mobile":"","code":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            
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
            
            
                            //校验
                async checkCodeFunc(){
                                if(!validate(this.mobile,'require')){
                 this.$message.info(this.$t('请输入手机号'));
                 return false;
            }
            if(!validate(this.mobile,'phone')){
                 this.$message.info(this.$t('请输入正确的手机号'));
                 return false;
            }
            if(!validate(this.code,'require')){
                 this.$message.info(this.$t('请输入验证码'));
                 return false;
            }
            if(!validate(this.code,'captcha')){
                 this.$message.info(this.$t('请输入正确的验证码'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data5f6c915d69d1f = await this.$api.post(global.apiUrls.post5f6c915d69d1f, {
    mobile:this.mobile,code:this.code,type:'5'
  });
  
  if (data5f6c915d69d1f.data.code != 1) {
    this.$message.info(data5f6c915d69d1f.data.msg);
    return
  } 
  let info5f6c915d69d1f = data5f6c915d69d1f.data;
  
  
                    uni.showToast({
                        title:this.$t('修改成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                setTimeout(()=>{
                    this.$urouter.navigateBack(2);
      },1000)
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
            .inputNewPhone_flex_1_babdd{
        font-size:32rpx;margin:32rpx 24rpx 0rpx 24rpx;
        .inputNewPhone_fd1_0_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;border-radius:16rpx;background:var(--benbenbgColor1);background-size:100% auto;
    }    .inputNewPhone_fd1_1_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);margin:341rpx 0rpx 0rpx 0rpx;height:88rpx;line-height:88rpx;width:686rpx;
    }}
    .inputNewPhone_fd1_0_c0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
        .inputNewPhone_fd1_0_c0_c1_babdd{
        line-height:45rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }}
    .inputNewPhone_fd1_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;font-style:normal;color:var(--benbenFontColor0);width:210rpx;
    }
    .inputNewPhone_fd1_0_c1_c1_babdd{
        line-height:45rpx;color:var(--benbenFontColor0);font-size:32rpx;font-weight:400;
    }
    .inputNewPhone_fd1_0_c1_c2_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor4);
    }
    .inputNewPhone_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:transparent;background-size:100% auto !important;
        .inputNewPhone_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .inputNewPhone_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:88rpx;
    }}}
    .inputNewPhone_fd0_0_c0_babdd{
        width:120rpx;
        .inputNewPhone_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}}
</style>