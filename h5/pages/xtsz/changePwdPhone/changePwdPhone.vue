<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex changePwdPhone_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between changePwdPhone_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center changePwdPhone_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  changePwdPhone_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='changePwdPhone_fd0_0_c1_c0_babdd'  >{{type}}</text>
</view>
    <view   class='flex align-center justify-end changePwdPhone_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---确认修改密码flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch changePwdPhone_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center changePwdPhone_fd1_0_babdd'      >
        <text class='changePwdPhone_fd1_0_c0_babdd'  >{{$t('新密码')}}</text>
<benben-input class='flex-sub changePwdPhone_fd1_0_c1_babdd'   type="text" :focus='true' :placeholder="$t('请输入新密码')" confirm-type="done" :maxlength="12" :password='true' placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="newPwd" />
</view>
    <view   class='flex flex-wrap align-center changePwdPhone_fd1_0_babdd'      >
        <text class='changePwdPhone_fd1_1_c0_babdd'  >{{$t('确认新密码')}}</text>
<benben-input class='flex-sub changePwdPhone_fd1_0_c1_babdd'   type="text" :placeholder="$t('请再次输入新密码')" confirm-type="done" :maxlength="12" :password='true' placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="qrPwd" />
</view>
<button class='changePwdPhone_fd1_2_babdd'  @tap.stop="checkPwdFunc()"  >{{$t('完成')}}</button>
</view>
        
<!---确认修改密码flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"newPwd":"","qrPwd":"","mobile":"15533333333","code":"1234","type":"修改密码"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {mobile,code,type}=options
if (mobile !== undefined) this.mobile = mobile
if (code !== undefined) this.code = code
if (type !== undefined) this.type = type
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
                 this.$message.info(this.$t('请输入确认密码（6~12位字母+数字'));
                 return false;
            }
            if(this.newPwd !== this.qrPwd){
                 this.$message.info(this.$t('两次输入密码不一致'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data5caeeba9866aa = await this.$api.post(global.apiUrls.post5caeeba9866aa, {
    password:this.qrPwd,account:this.mobile,code:this.code,account_type:'mobile'
  });
  
  if (data5caeeba9866aa.data.code != 1) {
    this.$message.info(data5caeeba9866aa.data.msg);
    return
  } 
  let info5caeeba9866aa = data5caeeba9866aa.data;
  
  
    if( this.type=='修改密码'){
                            uni.showToast({
                        title:this.$t('修改成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
    }
    else{
                            uni.showToast({
                        title:this.$t('设置成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
    }
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
            .changePwdPhone_flex_1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 32rpx 0rpx 32rpx;
        .changePwdPhone_fd1_2_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;font-weight:500;margin:600rpx 0rpx 0rpx 0rpx;
    }}
    .changePwdPhone_fd1_0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
        .changePwdPhone_fd1_0_c0_babdd{
        font-size:32rpx;font-weight:400;font-style:normal;color:var(--benbenFontColor0);margin:0rpx 48rpx 0rpx 0rpx;
    }}
    .changePwdPhone_fd1_0_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .changePwdPhone_fd1_1_c0_babdd{
        font-size:32rpx;font-weight:400;font-style:normal;color:var(--benbenFontColor0);width:182rpx;
    }
    .changePwdPhone_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .changePwdPhone_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .changePwdPhone_fd0_0_c0_babdd{
        width:100rpx;
        .changePwdPhone_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .changePwdPhone_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .changePwdPhone_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>