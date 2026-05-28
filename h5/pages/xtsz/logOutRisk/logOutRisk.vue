<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center logOutRisk_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub logOutRisk_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center logOutRisk_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  logOutRisk_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='logOutRisk_fd0_0_c1_c0_babdd'  >{{$t('注销账号')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end logOutRisk_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---注销账号风险-提示flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch logOutRisk_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center'      >
        <text class='fu-iconfont2  logOutRisk_fd1_0_c0_babdd'  >&#xe6ba;</text>
<text class='logOutRisk_fd1_0_c1_babdd'  >{{$t('账号注销')}}</text>
</view>
<text class='logOutRisk_fd1_1_babdd'  >{{$t('永久注销且无法恢复，请谨慎操作')}}</text>
<text class='logOutRisk_fd1_2_babdd'  >{{$t('账号注销后将放弃以下权益：')}}</text>
        <jyf-parser class='logOutRisk_fd1_3_babdd'  :html="dataMessage.content | richTextFormat"  >
        </jyf-parser>
<text class='logOutRisk_fd1_4_babdd'  >{{$t('点击下方按钮，即表示你已阅读并了解以上风险')}}</text>
    <view   class='flex flex-direction align-center logOutRisk_fd1_5_babdd'      >
        <button class='logOutRisk_fd1_5_c0_babdd'  @tap.stop="popupShow1747730242928=true"  >{{$t('我已清楚风险，确定继续')}}</button>
<button class='logOutRisk_fd1_5_c1_babdd'  @tap.stop="handleJumpDiy" data-type="back" data-url="1"  >{{$t('返回')}}</button>
</view>
</view>
        
<!---注销账号风险-提示flex布局结束-->
<benben-popup v-model="popupShow1747730242928" :mask="true" :mask-close-able="false"  mode='center'  >
    <!---注销弹窗确认flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center logOutRisk_flex_2_babdd"    >
        <text class='logOutRisk_fd2_0_babdd'  >{{$t('请再次确认，你已了解注销风险，并要继续执行该操作')}}</text>
    <view   class='flex flex-wrap align-center logOutRisk_fd2_1_babdd'      >
        <button class='logOutRisk_fd2_1_c0_babdd'  @tap.stop="popupShow1747730242928=false"  >{{$t('取消')}}</button>
<button class='logOutRisk_fd2_1_c1_babdd'  @tap.stop="submitzxFunc()"  >{{$t('确定')}}</button>
</view>
</view>
        
<!---注销弹窗确认flex布局结束-->
    
</benben-popup>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"popupShow1747730242928":false,/** introduce【简介】
*   content【内容】
*   thumb_img【内容图片】
*   name【页面标题】 **/ "dataMessage":{"aid":"","name":"","thumb_img":"","content":"","introduce":""},"cancel_type":"1","cancel_reason":"不想使用了"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {cancel_type,cancel_reason}=options
if (cancel_type !== undefined) this.cancel_type = cancel_type
if (cancel_reason !== undefined) this.cancel_reason = cancel_reason
this.getMessageFunc()
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
            
            
                            //系统文章--获取系统单页内容
                async getMessageFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post641568f1b6f87, {
    column_id:'6'
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
                },
                //发送注销
                async submitzxFunc(){
                        //请求方法
    //数据验证
    
    
  let data637c4d70d3aa8 = await this.$api.post(global.apiUrls.post637c4d70d3aa8, {
    cancel_type:this.cancel_type,cancel_reason:this.cancel_reason
  });
  
  if (data637c4d70d3aa8.data.code != 1) {
    this.$message.info(data637c4d70d3aa8.data.msg);
    return
  } 
  let info637c4d70d3aa8 = data637c4d70d3aa8.data;
  
  
    this.popupShow1747730242928 = false;
                    uni.showToast({
                        title:this.$t('提交成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                setTimeout(()=>{
            this.$urouter.redirectTo(`/pages/xtsz/logOutSubmit/logOutSubmit?type=1`);
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
            .logOutRisk_flex_2_babdd{
        background:var(--benbenbgColor1);width:540rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
        .logOutRisk_fd2_0_babdd{
        line-height:52rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);text-align:center;margin:52rpx 60rpx 0rpx 60rpx;
    }    .logOutRisk_fd2_1_babdd{
        margin:33rpx 0rpx 0rpx 0rpx;
        .logOutRisk_fd2_1_c0_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 0rpx 16rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor1);padding:0rpx 103rpx 0rpx 103rpx;border-top:1px solid var(--benbenbdColor0);
    }    .logOutRisk_fd2_1_c1_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 16rpx 0rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor5);border-top:1px solid var(--benbenbdColor0);border-left:1px solid var(--benbenbdColor0);width:270rpx;
    }}}
    .logOutRisk_flex_1_babdd{
        font-size:32rpx;padding:32rpx 32rpx 32rpx 32rpx;margin:0rpx 0rpx 200rpx 0rpx;
        .logOutRisk_fd1_0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor0);margin:0rpx 16rpx 0rpx 0rpx;
    }    .logOutRisk_fd1_0_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .logOutRisk_fd1_1_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);margin:32rpx 0rpx 32rpx 0rpx;
    }    .logOutRisk_fd1_2_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);padding:32rpx 0rpx 32rpx 0rpx;border-top:1px solid var(--benbenbdColor0);
    }    .logOutRisk_fd1_4_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor0);margin:48rpx 0rpx 0rpx 0rpx;padding:32rpx 0rpx 0rpx 0rpx;border-top:1px solid var(--benbenbdColor0);
    }    .logOutRisk_fd1_5_babdd{
        position:fixed;left:32rpx;bottom:calc(64rpx + var(--benben-window-bottom,0px));
        .logOutRisk_fd1_5_c0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;font-weight:400;padding:0rpx 0rpx 0rpx 0rpx;
    }    .logOutRisk_fd1_5_c1_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor4);width:686rpx;height:88rpx;line-height:88rpx;font-weight:400;border:1px solid var(--benbenbdColor2);margin:32rpx 0rpx 0rpx 0rpx;
    }}}
    .logOutRisk_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:transparent;background-size:100% auto !important;
        .logOutRisk_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .logOutRisk_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);line-height:88rpx;
    }}}
    .logOutRisk_fd0_0_c0_babdd{
        width:120rpx;
        .logOutRisk_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}}
    ::v-deep .logOutRisk_fd1_3_babdd{
        width:100%;
    }
</style>