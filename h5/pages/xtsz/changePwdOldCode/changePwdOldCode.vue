<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePwdOldCode_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between changePwdOldCode_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center changePwdOldCode_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  changePwdOldCode_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='changePwdOldCode_fd0_0_c1_c0_babdd'  >{{$t('修改密码')}}</text>
</view>
    <view   class='flex align-center justify-end changePwdOldCode_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---旧密码验证-设置新密码flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch changePwdOldCode_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center changePwdOldCode_fd1_0_babdd'      >
        <text class='changePwdOldCode_fd1_0_c0_babdd'  >{{$t('旧密码')}}</text>
<benben-input class='flex-sub changePwdOldCode_fd1_0_c1_babdd'   type="text" :focus='true' :placeholder="$t('请输入旧密码')" confirm-type="done" :maxlength="12" :password='true' placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="oldPwd" />
</view>
    <view   class='flex flex-wrap align-center changePwdOldCode_fd1_0_babdd'      >
        <text class='changePwdOldCode_fd1_0_c0_babdd'  >{{$t('新密码')}}</text>
<benben-input class='flex-sub changePwdOldCode_fd1_0_c1_babdd'   type="text" :placeholder="$t('请输入新密码')" confirm-type="done" :maxlength="12" :password='true' placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="newPwd" />
</view>
    <view   class='flex flex-wrap align-center changePwdOldCode_fd1_0_babdd'      >
        <text class='changePwdOldCode_fd1_2_c0_babdd'  >{{$t('确认新密码')}}</text>
<benben-input class='flex-sub changePwdOldCode_fd1_0_c1_babdd'   type="text" :placeholder="$t('请再次输入新密码')" confirm-type="done" :maxlength="12" :password='true' placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="qrPwd" />
</view>
<button class='changePwdOldCode_fd1_3_babdd'  @tap.stop="checkPwdFunc()"  >{{$t('完成')}}</button>
</view>
        
<!---旧密码验证-设置新密码flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"oldPwd":"","newPwd":"","qrPwd":""};
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
            
            
                            //校验密码
                async checkPwdFunc(){
                                if(!validate(this.oldPwd,'require')){
                 this.$message.info(this.$t('请输入旧密码'));
                 return false;
            }
            if(!validate(this.oldPwd,'password')){
                 this.$message.info(this.$t('请输入密码（6~12位字母+数字）'));
                 return false;
            }
            if(!validate(this.newPwd,'require')){
                 this.$message.info(this.$t('请输入新密码'));
                 return false;
            }
            if(!validate(this.newPwd,'password')){
                 this.$message.info(this.$t('请输入新密码（6~12位字母+数字）'));
                 return false;
            }
            if(!validate(this.qrPwd,'require')){
                 this.$message.info(this.$t('请输入确认密码'));
                 return false;
            }
            if(!validate(this.qrPwd,'password')){
                 this.$message.info(this.$t('请输入确认密码（6~12位字母+数字）'));
                 return false;
            }
            if(this.newPwd !== this.qrPwd){
                 this.$message.info(this.$t('两次输入密码不一致'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data5da9ab4c4c7af = await this.$api.post(global.apiUrls.post5da9ab4c4c7af, {
    security_code:this.oldPwd,password:this.newPwd,password_code:this.qrPwd
  });
  
  if (data5da9ab4c4c7af.data.code != 1) {
    this.$message.info(data5da9ab4c4c7af.data.msg);
    return
  } 
  let info5da9ab4c4c7af = data5da9ab4c4c7af.data;
  
  
                    uni.showToast({
                        title:this.$t('修改成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                this.$store.commit('logout')
                setTimeout(()=>{
            this.$urouter.reLaunch(`/pages/tabBar/loginPage/loginPage`);
      },500)
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
            .changePwdOldCode_flex_1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 32rpx 0rpx 32rpx;
        .changePwdOldCode_fd1_3_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;font-weight:500;margin:300rpx 0rpx 0rpx 0rpx;
    }}
    .changePwdOldCode_fd1_0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }
    .changePwdOldCode_fd1_0_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);margin:0rpx 48rpx 0rpx 0rpx;
    }
    .changePwdOldCode_fd1_0_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .changePwdOldCode_fd1_2_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);width:182rpx;
    }
    .changePwdOldCode_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .changePwdOldCode_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .changePwdOldCode_fd0_0_c0_babdd{
        width:100rpx;
        .changePwdOldCode_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .changePwdOldCode_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .changePwdOldCode_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>