<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex logOutReason_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between logOutReason_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center logOutReason_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  logOutReason_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='logOutReason_fd0_0_c1_c0_babdd'  >{{$t('注销账号')}}</text>
</view>
    <view   class='flex align-center justify-end logOutReason_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---注销账号原因-带图flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch logOutReason_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center logOutReason_fd1_0_babdd'      >
        <text class='fu-iconfont2  logOutReason_fd1_0_c0_babdd'  >&#xe6ff;</text>
<text class='logOutReason_fd1_0_c1_babdd'  >{{$t('账号注销')}}</text>
</view>
<text class='logOutReason_fd1_1_babdd'  >{{$t('永久注销且无法恢复，请谨慎操作')}}</text>
    <view   class='flex flex-wrap align-center logOutReason_fd1_2_babdd'      >
        <text class='logOutReason_fd1_0_c1_babdd'  >{{$t('请选择注销账号的原因：')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch'      >
            <benben-select-diy ref="showSelectPopup1686883023515" class-text='flex-direction align-stretch flex'   :items.sync="dataMessage" v-model="changeId"  default-type="aid" default-label="name" :allow-cancel='false' type="radio" :disabled='false'  >
    <benben-select-item v-for = '(item,key0) in dataMessage' :hand-value='item.aid' :key='key0'>
        <template #selected>    <view   class='flex align-center flex logOutReason_fd1_3_c0_c0_babdd'      >
        <text class='fu-iconfont2  logOutReason_fd1_3_c0_c0_c0_babdd'  >&#xe847;</text>
<text class='logOutReason_fd1_1_babdd'  >{{item.name}}</text>
</view>
</template><template #no-selected>    <view   class='flex align-center flex logOutReason_fd1_3_c0_c0_babdd'      >
        <text class='fu-iconfont2  logOutReason_fd1_3_c0_c1_c0_babdd'  >&#xe755;</text>
<text class='logOutReason_fd1_1_babdd'  >{{item.name}}</text>
</view>
</template></benben-select-item></benben-select-diy>
</view>
<text class='logOutReason_fd1_4_babdd'  >{{$t('请填写注销原因')}}</text>
<view class='flex flex-wrap logOutReason_fd1_5_babdd'>
<benben-textarea class='flex logOutReason_input_fd1_5_babdd'  confirm-type="done" :placeholder="$t('请输入')" :maxlength="240" placeholder-style="color:var(--benbenFontColor2);font-size:28rpx"   v-model="body" />

</view>
<button class='flex-sub logOutReason_fd1_6_babdd'  @tap.stop="goRichFunc()"  >{{$t('下一步')}}</button>
</view>
        
<!---注销账号原因-带图flex布局结束-->
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"changeType":[{"name":"多账号，释放手机号","value":"1","image":""},{"name":"不想使用了","value":"2","image":""},{"name":"其他","value":"3","image":""}],"changeId":"","dataMessage":[],"body":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            this.getReasonFunc()
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
            
            
                            //跳转风险
                 goRichFunc(){
                                if(!validate(this.changeId,'require')){
                 this.$message.info(this.$t('请选择注销原因'));
                 return false;
            }
            if(!validate(this.body,'require')){
                 this.$message.info(this.$t('请填写注销原因'));
                 return false;
            }
    this.$urouter.redirectTo(`/pages/xtsz/logOutRisk/logOutRisk?cancel_type=${this.changeId}&cancel_reason=${this.body}`);
                },
                //获取注销原因
                async getReasonFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post637c458b131e3, {
    
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
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
            .logOutReason_flex_1_babdd{
        font-size:32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;padding:0rpx 32rpx 180rpx 32rpx;
        .logOutReason_fd1_0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;
        .logOutReason_fd1_0_c0_babdd{
        margin:0rpx 24rpx 0rpx 0rpx;color:var(--benbeniconColor0);font-weight:600;font-size:32rpx;
    }}    .logOutReason_fd1_2_babdd{
        padding:32rpx 0rpx 12rpx 0rpx;border-top:1px solid var(--benbenbdColor0);margin:32rpx 0rpx 0rpx 0rpx;
    }    .logOutReason_fd1_4_babdd{
        line-height:0rpx;font-size:32rpx;font-weight:700;color:var(--benbenFontColor0);padding:58rpx 0rpx 24rpx 0rpx;margin:32rpx 0rpx 0rpx 0rpx;border-top:1px solid var(--benbenbdColor0);
    }    .logOutReason_fd1_5_babdd{
        width:686rpx;border-radius:10rpx 10rpx 10rpx 10rpx;padding:24rpx 24rpx 24rpx 24rpx;margin:24rpx 0rpx 0rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);background:var(--benbenbgColor0);background-size:100% auto;
        .logOutReason_input_fd1_5_babdd{
        width:100%;height:100rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }}    .logOutReason_fd1_6_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);margin:0rpx 32rpx 0rpx 32rpx;height:88rpx;line-height:88rpx;width:686rpx;position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));
    }}
    .logOutReason_fd1_0_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:700;color:var(--benbenFontColor0);
    }
    .logOutReason_fd1_1_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);
    }
    .logOutReason_fd1_3_c0_c0_babdd{
        padding:20rpx 0rpx 20rpx 0rpx;
        .logOutReason_fd1_3_c0_c0_c0_babdd{
        color:var(--benbeniconColor0);margin:0rpx 20rpx 0rpx 0rpx;
    }}
    .logOutReason_fd1_3_c0_c1_c0_babdd{
        color:var(--benbeniconColor3);margin:0rpx 20rpx 0rpx 0rpx;
    }
    .logOutReason_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .logOutReason_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .logOutReason_fd0_0_c0_babdd{
        width:100rpx;
        .logOutReason_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:var(--benbeniconColor1);
    }}    .logOutReason_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:50rpx;
    }    .logOutReason_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>