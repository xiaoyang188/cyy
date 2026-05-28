<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center Adolescentmode_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub Adolescentmode_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center Adolescentmode_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  Adolescentmode_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='Adolescentmode_fd0_0_c1_c0_babdd'  >{{$t('青少年模式')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end Adolescentmode_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<benben-popup v-model="popupShow1700475779092" :mask="true" :mask-close-able="true"  mode='center' :z-index='999' >
    <!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout Adolescentmode_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center justify-between Adolescentmode_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center Adolescentmode_fd1_0_c0_babdd'      >
        </view>
<text class='Adolescentmode_fd1_0_c1_babdd'  >{{$t('设置密码')}}</text>
<text class='fu-iconfont2  Adolescentmode_fd1_0_c2_babdd'   @tap.stop="popupShow1700475779092=false" >&#xe8e7;</text>
</view>
<text class='Adolescentmode_fd1_1_babdd'  >{{$t('请输入四位数字密码')}}</text>
    <view   class='flex flex-wrap align-center justify-center'      >
        <benben-digital-password  :box-num='4' mode='password' class-text='flex flex align-center justify-center Adolescentmode_fd1_2_c0_babdd'  @confirm="xianshizaiciFunc()"  v-model="pwd" :init-open.sync="xianshi">
<template #default="{ content, active, index }">
<view :key="index" v-if="active" class="flex align-center justify-center active-digital-password Adolescentmode_flex_password_active_fd1_2_c0_babdd" >
  {{ content }}
</view>
<view :key="index" v-else class="flex align-center justify-center Adolescentmode_flex_password_active_fd1_2_c0_babdd" >
  {{ content }}
</view>
</template>
</benben-digital-password>
</view>
</view>
        
<!---flex布局flex布局结束-->
    
</benben-popup>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout"    >
            <view   class='flex align-center justify-center Adolescentmode_fd2_0_babdd'      >
        <image class='Adolescentmode_fd2_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1609.png"'></image>
</view>
<text class='Adolescentmode_fd2_1_babdd'  >{{$t('为呵护未成年人健康成长，每聊推出青少年模式。该模式开启后需输入监护人密码方可使用平台功能。请监护人主动选择，并设置监护密码。')}}</text>
<text class='Adolescentmode_fd2_2_babdd'      >{{$t('《青少年使用须知》')}}</text>
    <view   class='flex align-center justify-center Adolescentmode_fd2_3_babdd'    v-if= " isOpenTeenagerMode===false"  >
        <button class='Adolescentmode_fd2_3_c0_babdd'  @tap.stop="popupShow1700475779092=true"  >{{$t('开启青少年模式')}}</button>
</view>
    <view   class='flex align-center justify-center Adolescentmode_fd2_3_babdd'    v-if= " isOpenTeenagerMode===true"  >
        <button class='Adolescentmode_fd2_3_c0_babdd'  @tap.stop="popupShow1700475900135=true"  >{{$t('关闭青少年模式')}}</button>
</view>
</view>
        
<!---flex布局flex布局结束-->
<benben-popup v-model="popupShow1700476177574" :mask="true" :mask-close-able="true"  mode='center' :z-index='999' >
    <!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout Adolescentmode_flex_3_babdd"    >
            <view   class='flex flex-wrap align-center justify-between Adolescentmode_fd3_0_babdd'      >
            <view   class='flex flex-wrap align-center Adolescentmode_fd3_0_c0_babdd'      >
        </view>
<text class='Adolescentmode_fd3_0_c1_babdd'  >{{$t('再次确认密码')}}</text>
<text class='fu-iconfont2  Adolescentmode_fd3_0_c2_babdd'   @tap.stop="popupShow1700476177574=false" >&#xe8e7;</text>
</view>
<text class='Adolescentmode_fd3_1_babdd'  >{{$t('请输入四位数字密码')}}</text>
    <view   class='flex flex-wrap align-center justify-center'      >
        <benben-digital-password  :box-num='4' mode='password' class-text='flex flex align-center justify-center Adolescentmode_fd3_2_c0_babdd'  @confirm="pswdsuccessFunc()"  v-model="confirmPwd" :init-open.sync="zaici">
<template #default="{ content, active, index }">
<view :key="index" v-if="active" class="flex align-center justify-center active-digital-password Adolescentmode_flex_password_active_fd3_2_c0_babdd" >
  {{ content }}
</view>
<view :key="index" v-else class="flex align-center justify-center Adolescentmode_flex_password_active_fd3_2_c0_babdd" >
  {{ content }}
</view>
</template>
</benben-digital-password>
</view>
</view>
        
<!---flex布局flex布局结束-->
    
</benben-popup>
<benben-popup v-model="popupShow1700475900135" :mask="true" :mask-close-able="true"  mode='center' :z-index='999' >
    <!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout Adolescentmode_flex_4_babdd"    >
            <view   class='flex flex-wrap align-center justify-between Adolescentmode_fd4_0_babdd'      >
            <view   class='flex flex-wrap align-center Adolescentmode_fd4_0_c0_babdd'      >
        </view>
<text class='Adolescentmode_fd4_0_c1_babdd'  >{{$t('验证密码')}}</text>
<text class='fu-iconfont2  Adolescentmode_fd4_0_c2_babdd'   @tap.stop="popupShow1700475900135=false" >&#xe8e7;</text>
</view>
<text class='Adolescentmode_fd4_1_babdd'  >{{$t('请输入四位数字密码')}}</text>
    <view   class='flex flex-wrap align-center justify-center'      >
        <benben-digital-password  :box-num='4' mode='password' class-text='flex flex align-center justify-center Adolescentmode_fd4_2_c0_babdd'  @confirm="pswdcodeFunc()"  v-model="verificationPwd" :init-open.sync="pswdCode">
<template #default="{ content, active, index }">
<view :key="index" v-if="active" class="flex align-center justify-center active-digital-password Adolescentmode_flex_password_active_fd4_2_c0_babdd" >
  {{ content }}
</view>
<view :key="index" v-else class="flex align-center justify-center Adolescentmode_flex_password_active_fd4_2_c0_babdd" >
  {{ content }}
</view>
</template>
</benben-digital-password>
</view>
    <view   class='flex align-center justify-center Adolescentmode_fd4_3_babdd'      >
        <text class='Adolescentmode_fd4_3_c0_babdd'  >{{$t('忘记了？')}}</text>
<text class='Adolescentmode_fd4_3_c1_babdd'  >{{$t('人工申诉')}}</text>
</view>
</view>
        
<!---flex布局flex布局结束-->
    
</benben-popup>
    
    
        </view>
    </page-body>
</template>
<script>
    
    
    export default {
        components:{},
        
        
        data(){
			return {"popupShow1700475900135":false,"popupShow1700476177574":false,"popupShow1700475779092":false,"xianshi":true,"zaici":true,"pswdCode":true,"isOpenTeenagerMode":false,"pwd":"","verificationPwd":"","confirmPwd":""};
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
            
            
                            //显示再次输入弹窗
                 xianshizaiciFunc(){
                        this.popupShow1700475779092 = false;
    this.popupShow1700476177574 = true;
                },
                //密码设置完成
                 pswdsuccessFunc(){
                        this.popupShow1700476177574 = false;
                },
                //密码校验完成
                 pswdcodeFunc(){
                        this.popupShow1700475900135 = false;
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
            .Adolescentmode_flex_4_babdd{
        width:600rpx;border-radius:24rpx 24rpx 24rpx 24rpx;background:var(--benbenbgColor1);padding:40rpx 24rpx 48rpx 24rpx;
        .Adolescentmode_fd4_0_babdd{
        margin:0rpx 0rpx 16rpx 0rpx;
        .Adolescentmode_fd4_0_c0_babdd{
        width:40rpx;height:40rpx;
    }    .Adolescentmode_fd4_0_c1_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;line-height:45rpx;
    }    .Adolescentmode_fd4_0_c2_babdd{
        font-size:40rpx;color:var(--benbeniconColor3);
    }}    .Adolescentmode_fd4_1_babdd{
        text-align:center;color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:33rpx;margin:0rpx 0rpx 48rpx 0rpx;
    }    .Adolescentmode_fd4_3_babdd{
        color:#4EA7FF;font-size:28rpx;line-height:40rpx;font-weight:400;
        .Adolescentmode_fd4_3_c0_babdd{
        color:var(--benbenFontColor1);
    }    .Adolescentmode_fd4_3_c1_babdd{
        color:var(--benbenFontColor4);
    }}}
    .Adolescentmode_flex_password_active_fd4_2_c0_babdd{
        width:68rpx;height:68rpx;margin:0rpx 16rpx 0rpx 16rpx;border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor2);color:var(--benbenFontColor0);
    }
    .Adolescentmode_flex_3_babdd{
        width:600rpx;border-radius:24rpx 24rpx 24rpx 24rpx;background:var(--benbenbgColor1);padding:40rpx 24rpx 48rpx 24rpx;
        .Adolescentmode_fd3_0_babdd{
        margin:0rpx 0rpx 16rpx 0rpx;
        .Adolescentmode_fd3_0_c0_babdd{
        width:40rpx;height:40rpx;
    }    .Adolescentmode_fd3_0_c1_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;line-height:45rpx;
    }    .Adolescentmode_fd3_0_c2_babdd{
        font-size:40rpx;color:var(--benbeniconColor3);
    }}    .Adolescentmode_fd3_1_babdd{
        text-align:center;color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:33rpx;margin:0rpx 0rpx 48rpx 0rpx;
    }}
    .Adolescentmode_flex_password_active_fd3_2_c0_babdd{
        width:68rpx;height:68rpx;margin:0rpx 16rpx 0rpx 16rpx;border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor2);color:var(--benbenFontColor0);
    }
    .Adolescentmode_fd2_0_babdd{
        padding:117rpx 0rpx 0rpx 0rpx;
        .Adolescentmode_fd2_0_c0_babdd{
        width:280rpx;height:280rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 56rpx 0rpx;
    }}
    .Adolescentmode_fd2_1_babdd{
        text-align:center;color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:45rpx;margin:0rpx 105rpx 48rpx 105rpx;
    }
    .Adolescentmode_fd2_2_babdd{
        text-align:center;color:var(--benbenFontColor5);font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .Adolescentmode_fd2_3_babdd{
        margin:63rpx 0rpx 0rpx 0rpx;
    }
    .Adolescentmode_fd2_3_c0_babdd{
        border-radius:50rpx 50rpx 50rpx 50rpx;width:638rpx;line-height:88rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);height:88rpx;
    }
    .Adolescentmode_flex_1_babdd{
        width:600rpx;border-radius:24rpx 24rpx 24rpx 24rpx;background:var(--benbenbgColor1);padding:40rpx 24rpx 48rpx 24rpx;
        .Adolescentmode_fd1_0_babdd{
        margin:0rpx 0rpx 16rpx 0rpx;
        .Adolescentmode_fd1_0_c0_babdd{
        width:40rpx;height:40rpx;
    }    .Adolescentmode_fd1_0_c1_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;line-height:45rpx;
    }    .Adolescentmode_fd1_0_c2_babdd{
        font-size:40rpx;color:var(--benbeniconColor3);
    }}    .Adolescentmode_fd1_1_babdd{
        text-align:center;color:var(--benbenFontColor1);font-size:24rpx;font-weight:400;line-height:33rpx;margin:0rpx 0rpx 48rpx 0rpx;
    }}
    .Adolescentmode_flex_password_active_fd1_2_c0_babdd{
        width:68rpx;height:68rpx;margin:0rpx 16rpx 0rpx 16rpx;border-radius:16rpx 16rpx 16rpx 16rpx;background:var(--benbenbgColor2);color:var(--benbenFontColor0);
    }
    .Adolescentmode_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .Adolescentmode_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .Adolescentmode_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);line-height:88rpx;
    }}}
    .Adolescentmode_fd0_0_c0_babdd{
        width:120rpx;
        .Adolescentmode_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);
    }}}
    ::v-deep .Adolescentmode_fd4_2_c0_babdd{
        width:100%;height:160rpx;
    }
    ::v-deep .Adolescentmode_fd3_2_c0_babdd{
        width:750rpx;height:160rpx;
    }
    ::v-deep .Adolescentmode_fd1_2_c0_babdd{
        width:750rpx;height:160rpx;
    }
</style>