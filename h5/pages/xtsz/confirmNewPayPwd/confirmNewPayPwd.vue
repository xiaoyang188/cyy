<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex confirmNewPayPwd_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between confirmNewPayPwd_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center confirmNewPayPwd_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  confirmNewPayPwd_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        </view>
    <view   class='flex align-center justify-end confirmNewPayPwd_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---改支付密码-第三步flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center benben-flex-layout"    >
            <view   class='flex flex-wrap align-center confirmNewPayPwd_fd1_0_babdd'      >
        <text class='confirmNewPayPwd_fd1_0_c0_babdd'  >1</text>
    <view   class='flex flex-wrap align-center confirmNewPayPwd_fd1_0_c1_babdd'      >
        </view>
<text class='confirmNewPayPwd_fd1_0_c0_babdd'  >2</text>
    <view   class='flex flex-wrap align-center confirmNewPayPwd_fd1_0_c1_babdd'      >
        </view>
<text class='confirmNewPayPwd_fd1_0_c0_babdd'  >3</text>
</view>
<text class='confirmNewPayPwd_fd1_1_babdd'  >{{$t('设置支付密码')}}</text>
<text class='confirmNewPayPwd_fd1_2_babdd'  >{{$t('请再次输入新支付密码')}}</text>
<benben-digital-password  :box-num='6' mode='password' class-text='flex flex align-center justify-center confirmNewPayPwd_fd1_3_babdd'  @confirm="checkPasswordFunc()"  v-model="pwd" :init-open.sync="xianshi">
<template #default="{ content, active, index }">
<view :key="index" v-if="active" class="flex align-center justify-center active-digital-password confirmNewPayPwd_flex_password_active_fd1_3_babdd" >
  {{ content }}
</view>
<view :key="index" v-else class="flex align-center justify-center confirmNewPayPwd_flex_password_noActive_fd1_3_babdd" >
  {{ content }}
</view>
</template>
</benben-digital-password>
    <view   class='flex flex-wrap align-center confirmNewPayPwd_fd1_4_babdd'      >
        <text class='confirmNewPayPwd_fd1_4_c0_babdd'  >{{$t('支付密码为6位数字，用户提现、设置密保、添加银行卡等操作，可保障资金安全')}}</text>
</view>
</view>
        
<!---改支付密码-第三步flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"pwdCode":"",/** pwd【支付密码】 **/ "pwd":"","xianshi":true,"type":"1","newPwd":"111111a","oldPwd":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {type,newPwd,oldPwd}=options
if (type !== undefined) this.type = type
if (newPwd !== undefined) this.newPwd = newPwd
if (oldPwd !== undefined) this.oldPwd = oldPwd
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
            
            
                            //校验支付密码
                async checkPasswordFunc(){
                                if(this.pwd !== this.newPwd){
                 this.$message.info(this.$t('新密码两次输入不一致'));
                 return false;
            }
    //请求方法
    //数据验证
    
    
  let data5f69dfd20a8c5 = await this.$api.post(global.apiUrls.post5f69dfd20a8c5, {
    pay_password:this.oldPwd,new_pay_password:this.newPwd,type:this.type
  });
  
  if (data5f69dfd20a8c5.data.code != 1) {
    this.$message.info(data5f69dfd20a8c5.data.msg);
    return
  } 
  let info5f69dfd20a8c5 = data5f69dfd20a8c5.data;
  
  
                setTimeout(()=>{
                    this.$urouter.navigateBack(3);
      },800)
                    this.$message.info('修改成功');
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
            .confirmNewPayPwd_fd1_0_babdd{
        margin:143rpx 0rpx 0rpx 0rpx;
    }
    .confirmNewPayPwd_fd1_0_c0_babdd{
        line-height:36rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor3);border-radius:50rpx 50rpx 50rpx 50rpx;background:var(--benbenbgColor3);background-size:100% auto !important;padding:8rpx 16rpx 8rpx 16rpx;
    }
    .confirmNewPayPwd_fd1_0_c1_babdd{
        width:118rpx;height:4rpx;border-radius:0rpx 0rpx 0rpx 0rpx;background:var(--benbenbgColor3);
    }
    .confirmNewPayPwd_fd1_1_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:64rpx 0rpx 0rpx 0rpx;
    }
    .confirmNewPayPwd_fd1_2_babdd{
        line-height:36rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor0);margin:40rpx 0rpx 0rpx 0rpx;
    }
    .confirmNewPayPwd_flex_password_active_fd1_3_babdd{
        width:100rpx;height:100rpx;border:1px solid var(--benbenbdColor2);color:var(--benbenFontColor0);background:var(--benbenbgColor2);background-size:100% auto;
    }
    .confirmNewPayPwd_flex_password_noActive_fd1_3_babdd{
        width:100rpx;height:100rpx;border:1px solid var(--benbenbdColor0);color:var(--benbenFontColor0);background:var(--benbenbgColor2);background-size:100% auto;
    }
    .confirmNewPayPwd_fd1_4_babdd{
        margin:10rpx 0rpx 0rpx 0rpx;
        .confirmNewPayPwd_fd1_4_c0_babdd{
        text-align:center;padding:0rpx 32rpx 0rpx 32rpx;font-size:24rpx;color:var(--benbenFontColor1);
    }}
    .confirmNewPayPwd_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .confirmNewPayPwd_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .confirmNewPayPwd_fd0_0_c0_babdd{
        width:100rpx;
        .confirmNewPayPwd_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .confirmNewPayPwd_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
    ::v-deep .confirmNewPayPwd_fd1_3_babdd{
        width:750rpx;height:160rpx;
    }
</style>