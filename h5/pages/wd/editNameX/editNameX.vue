<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center editNameX_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub editNameX_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center editNameX_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  editNameX_fd0_0_c0_c0_babdd'    >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='editNameX_fd0_0_c1_c0_babdd'  >{{$t('修改昵称')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end editNameX_fd0_0_c0_babdd'      >
        <button class='editNameX_fd0_0_c2_c0_babdd'  @tap.stop="editUserNiknameFunc()" v-if= " appSystemIdentification!='Wechat'" >{{$t('保存')}}</button>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout editNameX_flex_1_babdd"    >
            <view   class='flex flex-wrap align-center editNameX_fd1_0_babdd'      >
        <benben-input class='flex-sub editNameX_fd1_0_c0_babdd'   type="text" :placeholder="$t('请输入昵称')" confirm-type="done" :maxlength="7" placeholder-style="color:var(--benbenFontColor2);font-size:36rpx"  @input="valueInspectFunc($event)" v-model="userInfo.nickname"  />
</view>
    <view   class='flex flex-wrap align-center editNameX_fd1_1_babdd'      >
        <text class='editNameX_fd1_1_c0_babdd'  >{{$t('请设置2-7个字符，不包含@《/等无效字符哦')}}</text>
</view>
    <view   class='flex align-center justify-center editNameX_fd1_2_babdd'      >
        <button class='editNameX_fd1_2_c0_babdd'  @tap.stop="editUserNiknameFunc()" v-if= " appSystemIdentification=='Wechat'" >{{$t('保存')}}</button>
</view>
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
			return {/** userInfo【用户信息】
*   follow_count【关注的店铺数量】
*   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
*   nickname【昵称】
*   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
*   total_money【会员总金额】
*   browse_count【足迹数量】
*   collection_count【收藏数量】
*   _mobile【手机号不带*号】
*   score【积分余额】
*   total_consumption_money【总消费金额】
*   freeze_money【会员冻结金额】
*   user_money【会员余额】
*   gender【性别 1 男 2 女】
*   birthday【生日】
*   email【邮箱】
*   account【登录账号】
*   avatar【头像】
*   real_name【真实姓名】
*   mobile【手机号带*号】
*   userlevel_id【会员级别】
*   id【会员ID】
*   tags【标签】
*   hobby【爱好】
*   address_code【地址编码】
*   address【地址】
*   invite_code【邀请码】 **/ "userInfo":{"invite_code":"","address":"","address_code":"","hobby":"","tags":"","id":0,"userlevel_id":0,"mobile":"","real_name":"","avatar":"","account":"","email":"","birthday":"","gender":"","create_time":"","user_money":"","freeze_money":"","total_consumption_money":"","score":"","_mobile":"","coupon":0,"collection_count":0,"browse_count":0,"total_money":0,"certified":0,"nickname":"","is_pay_password":0,"follow_count":0},/** newUserInfo【新的用户信息】
*   phone【手机号（不带*号）】
*   client_id【推送标识】
*   birthday【生日】
*   mobile【手机号（带*号）】
*   gender【性别】
*   email【邮箱】
*   nickname【昵称】
*   real_name【真实姓名】
*   avatar【头像】
*   id【用户ID】 **/ "newUserInfo":{"userinfo":{"id":0,"avatar":"","real_name":"","nickname":"","email":"","gender":"","mobile":"","birthday":"","client_id":"","phone":""}},/** editname【抛储时间变量】 **/ "editname":"editname"};
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
            this.getUserInfoFunc()
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
            
            
                            //获取用户信息
                async getUserInfoFunc(){
                        //请求方法
    //数据验证
    
    
  let datauserInfo = await this.$api.get(global.apiUrls.post5c78c4772da97, {
    
  });
  
  if (datauserInfo.data.code != 1) {
    this.$message.info(datauserInfo.data.msg);
    return
  } 
  let infouserInfo = datauserInfo.data;
  this.userInfo = infouserInfo.data
  
                },
                //修改用户信息
                async editUserNiknameFunc(){
                                if(!validate(this.userInfo.nickname,'require')){
                 this.$message.info(this.$t('请输入新昵称'));
                 return false;
            }
            if(this.userInfo.nickname.length>7){
                 this.$message.info(this.$t('昵称不得超过七个字符'));
                 return false;
            }
    if(this.userInfo.nickname.split('').length<2){
this.$message.info('最少2个字符');
return
}
    //请求方法
    //数据验证
    
    
  let datanewUserInfo = await this.$api.dbPost(global.apiUrls.post5cb54af125f1c, {
    avatar:this.userInfo.avatar,nickname:this.userInfo.nickname,gender:this.userInfo.gender,birthday:this.userInfo.birthday,autograph:this.userInfo.hobby
  });
  if(!datanewUserInfo) return
  if (datanewUserInfo.data.code != 1) {
    this.$message.info(datanewUserInfo.data.msg);
    return
  } 
  let infonewUserInfo = datanewUserInfo.data;
  this.newUserInfo = infonewUserInfo.data
  
                    uni.showToast({
                        title:this.$t('修改成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                uni.$emit('chengeName',this.editname)
                setTimeout(()=>{
                    this.$urouter.navigateBack(1);
      },500)
                },
                //监听输入框输入事件
                 valueInspectFunc(e){
                        var str = e
var newZz = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/gi;
if (newZz.test(str)) {
    this.$nextTick(() => {
        this.userInfo.nickname = str.replace(newZz, '')

    })
    this.$message.info(global.i18n.t('昵称不能包含特殊字符'));
    return;
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
            background:#F8F8F8;background-size: 100% auto;
            .editNameX_flex_1_babdd{
        padding:24rpx 32rpx 24rpx 32rpx;
        .editNameX_fd1_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;border-radius:16rpx;padding:32rpx;
        .editNameX_fd1_0_c0_babdd{
        height:50rpx;color:var(--benbenFontColor0);font-size:36rpx;font-weight:700;
    }}    .editNameX_fd1_1_babdd{
        margin:32rpx 0rpx 0rpx 0rpx;
        .editNameX_fd1_1_c0_babdd{
        color:var(--benbenFontColor1);font-size:24rpx;
    }}    .editNameX_fd1_2_babdd{
        margin:150rpx 0rpx 0rpx 0rpx;
        .editNameX_fd1_2_c0_babdd{
        border-radius:100rpx;width:654rpx;line-height:80rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);height:80rpx;
    }}}
    .editNameX_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .editNameX_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .editNameX_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:700;color:#333;line-height:88rpx;
    }}}
    .editNameX_fd0_0_c0_babdd{
        width:120rpx;
        .editNameX_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:#333;
    }}
    .editNameX_fd0_0_c2_c0_babdd{
        border-radius:33rpx 33rpx 33rpx 33rpx;width:208rpx;line-height:50rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);height:48rpx;
    }}
</style>