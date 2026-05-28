<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex system_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between system_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center system_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  system_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='system_fd0_0_c1_c0_babdd'  >{{$t('设置')}}</text>
</view>
    <view   class='flex align-center justify-end system_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---基本设置flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch system_flex_1_babdd"    >
            <view   class='flex flex-direction flex-wrap align-stretch system_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-between system_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/cardAndSafe/cardAndSafe`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('账号与安全')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
<!--     <view   class='flex flex-wrap align-center justify-between system_fd1_0_c1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/blackList/blackList`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('黑名单')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
 --></view>
    <view   class='flex flex-wrap align-center system_fd1_1_babdd'    v-if= " objType=='1'"  >
        </view>
    <view   class='flex flex-direction flex-wrap align-stretch system_fd1_0_babdd'    v-if= " objType=='1'"  >
            <view   class='flex flex-wrap align-center justify-between system_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/personalizedSettings/personalizedSettings`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('个性化推送设置')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between system_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/notificationSet/notificationSet`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('通知设置')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between system_fd1_0_c1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/PermissionSettings/PermissionSettings`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('权限管理')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
</view>
    <view   class='flex flex-wrap align-center system_fd1_1_babdd'      >
        </view>
    <view   class='flex flex-direction flex-wrap align-stretch system_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-between system_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/dlzc/agreements/agreements`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('用户协议')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between system_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/dlzc/privacyPolicy/privacyPolicy`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('隐私政策')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between system_fd1_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/helpFeedback/helpFeedback`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('帮助与反馈')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center justify-between system_fd1_0_c1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/xtsz/aboutUs/aboutUs`"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('关于我们')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
</view>
    <view   class='flex flex-wrap align-center system_fd1_1_babdd'      >
        </view>
    <view   class='flex flex-direction flex-wrap align-stretch system_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center system_fd1_0_c0_babdd'   @tap.stop="ClearCacheFunc()"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('清除缓存')}}</text>
<text class='system_fd1_6_c0_c1_babdd'  >{{appRubbishCacheSize}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
    <view   class='flex flex-wrap align-center system_fd1_0_c1_babdd'   @tap.stop="updataFunc()"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('检查更新')}}</text>
<text class='system_fd1_6_c0_c1_babdd'  >{{appVersion}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
</view>
    <view   class='flex flex-wrap align-center system_fd1_1_babdd'      >
        </view>
    <view   class='flex flex-direction flex-wrap align-stretch system_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-between system_fd1_0_c1_babdd'   @tap.stop="gozhuxiaoFunc()"   >
        <text class='system_fd1_0_c0_c0_babdd'  >{{$t('注销账号')}}</text>
<text class='fu-iconfont2  system_fd1_0_c0_c1_babdd'  >&#xE7F2;</text>
</view>
</view>
</view>
        
<!---基本设置flex布局结束-->

<benben-popup v-model="popupShow1656992350800" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---退出登录flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center system_flex_3_babdd"    @tap.stop="popupShow1650940432200=true">
        <text class='system_fd3_0_babdd'  >{{$t('提示')}}</text>
<text class='system_fd3_1_babdd'  >{{$t('确定退出当前账号？')}}</text>
    <view   class='flex align-center system_fd3_2_babdd'      >
        <button class='system_fd3_2_c0_babdd'  @tap.stop="popupShow1656992350800=false"  >{{$t('取消')}}</button>
<button class='system_fd3_2_c1_babdd'  @tap.stop="logOutFunc()"  >{{$t('确定')}}</button>
</view>
</view>
        
<!---退出登录flex布局结束-->
    
</benben-popup>
    <view class="flex flex-wrap align-center justify-center benben-position-layout flex system_flex_4_babdd"   @tap.stop="popupShow1656992350800=true" >
        <button class='system_fd4_0_babdd'   >{{$t('退出登录')}}</button>

        </view>
<view :style="{height: '140rpx'}"  ></view>
<benben-popup v-model="popupShow1679541357000" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---清除缓存flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center system_flex_5_babdd"    @tap.stop="popupShow1650940432200=true">
        <text class='system_fd5_0_babdd'  >{{$t('提示')}}</text>
<text class='system_fd5_1_babdd'  >{{$t('确定要清除本地缓存？')}}</text>
    <view   class='flex align-center system_fd5_2_babdd'      >
        <button class='system_fd5_2_c0_babdd'  @tap.stop="popupShow1679541357000=false"  >{{$t('取消')}}</button>
<button class='system_fd5_2_c1_babdd'  @tap.stop="querenCleanFunc()"  >{{$t('确定')}}</button>
</view>
</view>
        
<!---清除缓存flex布局结束-->
    
</benben-popup>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"popupShow1679541357000":false,"popupShow1656992350800":false,/** cancel_type_text【注销原因（选择）】
*   cancel_reason【注销原因（手动填写）】
*   status【状态1 待审核 2 已注销 3 被驳回】
*   create_time【创建时间】
*   cancel_type【注销原因选择】
*   user_mobile【手机号】
*   user_avatar【头像】
*   user_nickname【用户昵称】
*   aid【ID】 **/ "dataMessage":{"aid":"","user_nickname":"","user_avatar":"","user_mobile":"","cancel_type":"","create_time":"","status":"","cancel_reason":"","cancel_type_text":""},/** objType【1APP2小程序】 **/ "objType":"1"};
		},
		computed:{
                          appVersion() {
      // 获取版本号
      return this.$store.state.appVersion
    },
              appRubbishCacheSize() {// 获取缓存大小
      return this.$store.state.appRubbishCacheSize
    }
		},
		watch:{},
		onLoad(options){
            this.setObjTypeFunc()
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
                        this.$store.dispatch('getAppVersion') // 更新版本号
            this.$store.dispatch('getAppCache')// 更新缓存大小
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
            
            
                            //获取注销状态1提交 3驳回
                async gozhuxiaoFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post637c4deb97aa9, {
    
  });
  
  let infodataMessage = datadataMessage.data;
                      if(infodataMessage.code == 1){
                                this.dataMessage =  infodataMessage.data
                        this.$urouter.navigateTo(`/pages/xtsz/logOutSubmit/logOutSubmit`);                    } else {
                        this.$urouter.navigateTo(`/pages/xtsz/CancelAccount/CancelAccount`);}
                },
                //退出登录
                async logOutFunc(){
                        this.$store.commit('setBadge')
    //请求方法
    //数据验证
    
    
  let data65e546aa76647 = await this.$api.get(global.apiUrls.post65e546aa76647, {
    
  });
  
  if (data65e546aa76647.data.code != 1) {
    this.$message.info(data65e546aa76647.data.msg);
    return
  } 
  let info65e546aa76647 = data65e546aa76647.data;
  
  
                this.$store.commit('logout')
                this.toLoginDiy();
                },
                //清除缓存
                 ClearCacheFunc(){
                        if( this.appRubbishCacheSize!='0B'){
            this.popupShow1679541357000 = true;
    }
    else{
                            uni.showToast({
                        title:this.$t('没有缓存需要清空'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
    }
                },
                //确认清除缓存
                 querenCleanFunc(){
                        let that = this
let os = plus.os.name
          if (os == 'Android') {
            let main = plus.android.runtimeMainActivity()
            let sdRoot = main.getCacheDir()
            let files = plus.android.invoke(sdRoot, 'listFiles')
            let len = files.length
            if (len == 0) {
              that.$message.info(global.i18n.t('缓存清理完成!'))
              that.$store.commit('setAppcCache', '0B')
              that.popupShow1679541357000 = false
            }
            for (let i = 0; i < len; i++) {
              let filePath = '' + files[i] // 没有找到合适的方法获取路径，这样写可以转成文件路径
              plus.io.resolveLocalFileSystemURL(
                filePath,
                function(entry) {
                  if (entry.isDirectory) {
                    entry.removeRecursively(
                      function(entry) {
                        //递归删除其下的所有文件及子目录
                        that.$message.info(global.i18n.t('缓存清理完成!'))
                        that.$store.dispatch('getAppCache') // 重新计算缓存
                        that.popupShow1679541357000 = false
                      },
                      function(e) {
                        console.log(e.message)
                      }
                    )
                  } else {
                    entry.remove()
                    that.popupShow1679541357000 = false
                  }
                },
                function(e) {
                  console.log('文件路径读取失败')
                }
              )
            }
          }
                },
                //App更新
                 updataFunc(){
                        // #ifdef MP-WEIXIN
const updateManager = uni.getUpdateManager();

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate);
});

updateManager.onUpdateReady(function (res) {
  uni.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    }
  });

});

updateManager.onUpdateFailed(function (res) {
  // 新的版本下载失败
});
return
// #endif
                this.$store.dispatch('appUpdate', true)
                },
                //设置项目类型
                 setObjTypeFunc(){
                        // #ifdef APP
this.objType = 1
// #endif
// #ifdef MP-WEIXIN
this.objType = 2
// #endif

                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor0);background-size: 100% auto;
            .system_flex_5_babdd{
        background:var(--benbenbgColor1);width:540rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
        .system_fd5_0_babdd{
        font-size:36rpx;font-weight:800;line-height:44rpx;color:var(--benbenFontColor0);margin:40rpx 0rpx 40rpx 0rpx;
    }    .system_fd5_1_babdd{
        line-height:44rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .system_fd5_2_babdd{
        margin:37rpx 0rpx 0rpx 0rpx;
        .system_fd5_2_c0_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 0rpx 16rpx;font-size:32rpx;background:#fff;color:var(--benbenFontColor2);padding:0rpx 103rpx 0rpx 103rpx;border-top:1px solid var(--benbenbdColor0);
    }    .system_fd5_2_c1_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 16rpx 0rpx;font-size:32rpx;background:#fff;color:var(--benbenFontColor4);border-top:1px solid var(--benbenbdColor0);border-left:1px solid var(--benbenbdColor0);width:268rpx;
    }}}
    .system_flex_4_babdd{
        width:750rpx;height:140rpx;overflow:hidden;z-index:10;bottom:calc(0rpx + var(--benben-window-bottom,0px) + var(--benbenbottomSafeArea,0px));background:var(--benbenbgColor1);background-size:100% auto !important;
        .system_fd4_0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor4);width:638rpx;height:88rpx;border:2px solid var(--benbenbdColor2);line-height:88rpx;margin:0rpx 24rpx 0rpx 24rpx;
    }}
    .system_flex_3_babdd{
        background:var(--benbenbgColor1);width:540rpx;border-radius:16rpx 16rpx 16rpx 16rpx;
        .system_fd3_0_babdd{
        font-size:36rpx;font-weight:800;line-height:44rpx;color:var(--benbenFontColor0);margin:40rpx 0rpx 40rpx 0rpx;
    }    .system_fd3_1_babdd{
        line-height:44rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .system_fd3_2_babdd{
        margin:37rpx 0rpx 0rpx 0rpx;background:var(--benbenbgColor1);background-size:100% auto;
        .system_fd3_2_c0_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 0rpx 16rpx;font-size:32rpx;color:var(--benbenFontColor2);padding:0rpx 103rpx 0rpx 103rpx;border-top:1px solid var(--benbenbdColor0);background:var(--benbenbgColor1);background-size:100% auto;
    }    .system_fd3_2_c1_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 16rpx 0rpx;font-size:32rpx;color:var(--benbenFontColor4);border-top:1px solid var(--benbenbdColor0);border-left:1px solid var(--benbenbdColor0);width:268rpx;background:var(--benbenbtnColor1);background-size:100% auto;
    }}}
    .system_flex_1_babdd{
        font-size:32rpx;padding:0rpx 0rpx 64rpx 0rpx;
    }
    .system_fd1_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
    }
    .system_fd1_0_c0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }
    .system_fd1_0_c0_c0_babdd{
        font-size:32rpx;color:var(--benbenFontColor0);
    }
    .system_fd1_0_c0_c1_babdd{
        font-size:26rpx;color:var(--benbeniconColor3);
    }
    .system_fd1_0_c1_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;
    }
    .system_fd1_1_babdd{
        height:20rpx;background:var(--benbenbgColor0);background-size:100% auto !important;
    }
    .system_fd1_6_c0_c1_babdd{
        font-size:28rpx;color:var(--benbenFontColor1);margin:0rpx 24rpx 0rpx auto;
    }
    .system_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid var(--benbenbdColor0);
        .system_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .system_fd0_0_c0_babdd{
        width:100rpx;
        .system_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:400;color:#333;
    }}    .system_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }    .system_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:100rpx;
    }}}}
</style>