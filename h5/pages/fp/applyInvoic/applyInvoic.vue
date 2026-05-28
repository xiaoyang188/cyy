<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex applyInvoic_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub applyInvoic_fd0_0_babdd'      >
            <view   class='flex align-center applyInvoic_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  applyInvoic_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='applyInvoic_fd0_0_c1_c0_babdd'    v-if= " is_edit!='1'"  >{{$t('申请开票')}}</text><text class='applyInvoic_fd0_0_c1_c0_1_babdd'    v-if= " is_edit=='1'"  >{{$t('编辑发票')}}</text>
</view>
    <view   class='flex align-center justify-end applyInvoic_fd0_0_c0_babdd'      >
        <text class='applyInvoic_fd0_0_c2_c0_babdd'    v-if= " is_edit=='1' && appSystemIdentification!='Wechat'" @tap.stop="popupShow1717570759185=true" >{{$t('删除')}}</text>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<benben-popup v-model="popupShow1717570759185" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---清除本地缓存flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center"    >
            <view   class='flex flex-direction flex-wrap align-center applyInvoic_fd1_0_babdd'      >
        <text class='applyInvoic_fd1_0_c0_babdd'  >{{$t('提示')}}</text>
<text class='applyInvoic_fd1_0_c1_babdd'  >{{$t('确定删除该发票吗？')}}</text>
    <view   class='flex align-center applyInvoic_fd1_0_c2_babdd'      >
        <button class='applyInvoic_fd1_0_c2_c0_babdd'  @tap.stop="popupShow1717570759185=false"  >{{$t('取消')}}</button>
<button class='applyInvoic_fd1_0_c2_c1_babdd'  @tap.stop="getdo41ec9d300c00Func()"  >{{$t('确定')}}</button>
</view>
</view>
</view>
        
<!---清除本地缓存flex布局结束-->
    
</benben-popup>
<!---flex布局flex布局开始-->
 <view class="flex align-center justify-end benben-flex-layout applyInvoic_flex_2_babdd"   v-if= " is_edit=='1' && appSystemIdentification=='Wechat'" >
        <text class='applyInvoic_fd2_0_babdd'     @tap.stop="popupShow1717570759185=true" >{{$t('删除')}}</text>
</view>
        
<!---flex布局flex布局结束-->

 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout applyInvoic_flex_3_babdd"    >
            <view   class='flex flex-direction align-stretch applyInvoic_fd3_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-between applyInvoic_fd3_0_c0_babdd'      >
        <text class='applyInvoic_fd3_0_c0_c0_babdd'  >{{$t('发票类型')}}</text>
<text class='applyInvoic_fd3_0_c0_c1_babdd'  >{{$t('电子发票')}}</text>
</view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c1_babdd'      >
        <text class='applyInvoic_fd3_0_c1_c0_babdd'  >{{$t('发票信息')}}</text>
</view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c2_babdd'      >
        <text class='applyInvoic_fd3_0_c2_c0_babdd'  >{{$t('抬头类型')}}</text>
    <benben-select-diy ref="showSelectPopup1689756647721" class-text='align-center flex'   :items.sync="type" v-model="dataMessage.type" :label.sync="type_la"  default-type="value" default-label="name" :allow-cancel='false' type="radio" :disabled='false'  >
    <benben-select-item v-for = '(item,key0) in type' :hand-value='item.value' :key='key0'>
        <template #selected>    <view   class='flex align-center flex applyInvoic_fd3_0_c2_c1_c0_babdd'      >
        <image class='applyInvoic_fd3_0_c2_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"448.png"'></image>
<text class='applyInvoic_fd3_0_c0_c1_babdd'  >{{item.name}}</text>
</view>
</template><template #no-selected>    <view   class='flex align-center flex applyInvoic_fd3_0_c2_c1_c0_babdd'      >
        <image class='applyInvoic_fd3_0_c2_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"128.png"'></image>
<text class='applyInvoic_fd3_0_c0_c1_babdd'  >{{item.name}}</text>
</view>
</template></benben-select-item></benben-select-diy>
</view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c3_babdd'      >
        <image class='applyInvoic_fd3_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='applyInvoic_fd3_0_c3_c1_babdd'  >{{$t('发票抬头')}}</text>
<benben-input class='flex-sub applyInvoic_fd3_0_c3_c2_babdd'   type="text" :placeholder="$t('发票抬头不能为空')" confirm-type="done" :maxlength="18" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="dataMessage.username" />
</view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c3_babdd'    v-if= "dataMessage.type=='2'"  >
        <image class='applyInvoic_fd3_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='applyInvoic_fd3_0_c3_c1_babdd'  >{{$t('公司税号')}}</text>
<benben-input class='flex-sub applyInvoic_fd3_0_c3_c2_babdd'   type="text" :placeholder="$t('企业单位税号不能为空')" confirm-type="done" :maxlength="20" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="dataMessage.tax_number" />
</view>
    <view   class='flex flex-wrap align-center justify-between applyInvoic_fd3_0_c0_babdd'      >
        <text class='applyInvoic_fd3_0_c0_c0_babdd'  >{{$t('设置为默认抬头')}}</text>
        <benben-flex-switch-new class-text='flex flex'  v-model="is_tk" :disabled='false'   >
            <template v-slot:checked>
            
    <view   class='flex flex position-relative align-center'      >
        <image class='applyInvoic_checkfd3_0_c5_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"448.png"'></image>
</view>

            </template>
            <template v-slot:unchecked>
            
    <view   class='flex flex position-relative justify-end align-center'      >
        <image class='applyInvoic_noCheckfd3_0_c5_c1_c1_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"277.png"'></image>
</view>

            </template>
        </benben-flex-switch-new>
</view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c6_babdd'      >
        </view>
    <view   class='flex flex-wrap align-center justify-between applyInvoic_fd3_0_c0_babdd'      >
        <text class='applyInvoic_fd3_0_c0_c0_babdd'  >{{$t('发票内容')}}</text>
<text class='applyInvoic_fd3_0_c0_c1_babdd'  >{{$t('商品明细')}}</text>
</view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c6_babdd'      >
        </view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c3_babdd'      >
        <image class='applyInvoic_fd3_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='applyInvoic_fd3_0_c3_c1_babdd'  >{{$t('联系方式')}}</text>
<benben-input class='flex-sub applyInvoic_fd3_0_c3_c2_babdd'   type="number" :placeholder="$t('联系方式不能为空')" confirm-type="done" :maxlength="11" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="dataMessage.mobile" />
</view>
    <view   class='flex flex-wrap align-center applyInvoic_fd3_0_c3_babdd'      >
        <image class='applyInvoic_fd3_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='applyInvoic_fd3_0_c3_c1_babdd'  >{{$t('电子邮箱')}}</text>
<benben-input class='flex-sub applyInvoic_fd3_0_c3_c2_babdd'   type="text" :placeholder="$t('电子邮箱不能为空')" confirm-type="done" :maxlength="32" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="dataMessage.email" />
</view>
</view>
    <view   class='flex flex-wrap align-center justify-center applyInvoic_fd3_1_babdd'      >
        <button class='applyInvoic_fd3_1_c0_babdd'  @tap.stop="editAddFunc()"  >{{$t('提交')}}</button>
</view>
</view>
        

    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"popupShow1717570759185":false,"type":[],"is_tk":false,/** follow_count【关注的店铺数量】
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
*   invite_code【邀请码】 **/ "dataDetails":{"invite_code":"","address":"","address_code":"","hobby":"","tags":"","id":0,"userlevel_id":0,"mobile":"","real_name":"","avatar":"","account":"","email":"","birthday":"","gender":"","create_time":"","user_money":"","freeze_money":"","total_consumption_money":"","score":"","_mobile":"","coupon":0,"collection_count":0,"browse_count":0,"total_money":0,"certified":0,"nickname":"","is_pay_password":0,"follow_count":0},"type_la":"",/** create_time【提交时间】
*   status【开票状态】
*   is_default【是否默认】
*   type【类型】
*   email【邮箱】
*   mobile【手机号】
*   tax_number【税号】
*   username【公司抬头】
*   user_nickname【用户昵称】 **/ "dataMessage":{"user_nickname":"","username":"","tax_number":"","mobile":"","email":"","type":"","is_default":"","status":"","create_time":"","type_name":""},"id":"","is_edit":""};
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
            let {id,is_edit}=options
if (id !== undefined) this.id = id
if (is_edit !== undefined) this.is_edit = is_edit
this.getMessageFunc()
this.setTypeFunc()
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
            
            
                            //获取单个发票信息
                async getMessageFunc(){
                       this.dataMessage.type = '1';
    if( this.id!=''){
            //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.get(global.apiUrls.post6442399c6fca9, {
    aid:this.id
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
    if( this.dataMessage.is_default=='1'){
           this.is_tk = true;
    }
    else{
           this.is_tk = false;
    }
    }
                },
                //添加或编辑
                 editAddFunc(){
                        if (!this.dataMessage.username) {
					this.$message.info(global.i18n.t('请输入发票抬头'));
					return;
				}
				if (this.dataMessage.type == 2) {
					if (!this.dataMessage.tax_number) return this.$message.info(global.i18n.t('请输入公司税号'));
					if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(this.dataMessage
						.tax_number)) {
						return this.$message.info(global.i18n.t('请输入正确的公司税号'))
					}
					
				}
				if (!this.dataMessage.mobile) {
					this.$message.info(global.i18n.t('请输入联系方式'));
					return;
				}
				if (!validate(this.dataMessage.mobile, 'phone')) {
					this.$message.info(global.i18n.t('请输入正确的联系方式'));
					return false;
				}
				if (!this.dataMessage.email) {
					this.$message.info(global.i18n.t('请输入电子邮箱'));
					return;
				}
				if (!validate(this.dataMessage.email, 'email')) {
					this.$message.info(global.i18n.t('请输入正确的邮箱'));
					return false;
				}
				
				this.dataMessage.is_default = this.is_tk ? 1 : 0;
				this.dataMessage.aid = this.id;
				uni.setStorageSync('invoice', this.dataMessage);
				this.$urouter.navigateTo(`/pages/fp/invoiceConfirm/invoiceConfirm?aid=${this.id}`);
			
                },
                //设置type可用于多语言
                 setTypeFunc(){
                        this.type = [{
    "name": global.i18n.t("个人"),
    "value": "1",
    "image": ""
}, {
    "name": global.i18n.t("企业"),
    "value": "2",
    "image": ""
}]
                },
                //发票抬头-删除发票抬头
                async getdo41ec9d300c00Func(){
                        //请求方法
    //数据验证
    
    
  let data641ec9d300c00 = await this.$api.dbPost(global.apiUrls.post641ec9d300c00, {
    aid:this.id
  });
  if(!data641ec9d300c00) return
  if (data641ec9d300c00.data.code != 1) {
    this.$message.info(data641ec9d300c00.data.msg);
    return
  } 
  let info641ec9d300c00 = data641ec9d300c00.data;
  
  
    this.popupShow1717570759185 = false;
                    uni.showToast({
                        title:this.$t('删除成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                setTimeout(()=>{
                    this.$urouter.navigateBack(1);
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
            background:#F8F8F8;background-size: 100% auto;
            .applyInvoic_flex_3_babdd{
        margin:0rpx 0rpx 32rpx 0rpx;
        .applyInvoic_fd3_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;margin:0rpx 0rpx 150rpx 0rpx;
        .applyInvoic_fd3_0_c1_babdd{
        background:var(--benbenbgColor8);background-size:100% auto !important;padding:24rpx 52rpx 24rpx 52rpx;
        .applyInvoic_fd3_0_c1_c0_babdd{
        color:var(--benbenFontColor5);font-size:28rpx;font-weight:700;line-height:40rpx;
    }}    .applyInvoic_fd3_0_c2_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;padding:32rpx 0rpx 32rpx 20rpx;border-bottom:1px solid #eee;
        .applyInvoic_fd3_0_c2_c0_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);margin:0rpx auto 0rpx 0rpx;
    }}}    .applyInvoic_fd3_1_babdd{
        position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));width:750rpx;background:#F8F8F8;background-size:100% auto;
        .applyInvoic_fd3_1_c0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;font-weight:400;
    }}}
    .applyInvoic_fd3_0_c0_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;padding:32rpx 0rpx 32rpx 20rpx;
    }
    .applyInvoic_fd3_0_c0_c0_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }
    .applyInvoic_fd3_0_c0_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .applyInvoic_fd3_0_c2_c1_c0_babdd{
        margin:0rpx 0rpx 0rpx 48rpx;
    }
    .applyInvoic_fd3_0_c2_c1_c0_c0_babdd{
        width:36rpx;height:36rpx;border-radius:18rpx 18rpx 18rpx 18rpx;margin:0rpx 24rpx 0rpx 0rpx;
    }
    .applyInvoic_fd3_0_c3_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid #eee;
    }
    .applyInvoic_fd3_0_c3_c0_babdd{
        width:12rpx;height:12rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 8rpx 0rpx 0rpx;
    }
    .applyInvoic_fd3_0_c3_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);margin:0rpx 24rpx 0rpx 0rpx;
    }
    .applyInvoic_fd3_0_c3_c2_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);text-align:right;
    }
    .applyInvoic_checkfd3_0_c5_c1_c0_c0_babdd{
        width:36rpx;height:36rpx;border-radius:24rpx 24rpx 24rpx 24rpx;
    }
    .applyInvoic_noCheckfd3_0_c5_c1_c1_c0_babdd{
        border-radius:24rpx 24rpx 24rpx 24rpx;width:36rpx;height:36rpx;
    }
    .applyInvoic_fd3_0_c6_babdd{
        height:20rpx;background:rgba(248, 248, 248, 1);background-size:100% auto !important;
    }
    .applyInvoic_flex_2_babdd{
        background:var(--benbenbgColor1);background-size:100% auto;height:80rpx;padding:0rpx 32rpx 0rpx 32rpx;
        .applyInvoic_fd2_0_babdd{
        color:var(--benbenFontColor0);
    }}
    .applyInvoic_fd1_0_babdd{
        width:540rpx;background:#fff;background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;
        .applyInvoic_fd1_0_c0_babdd{
        line-height:44rpx;font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:40rpx 0rpx 0rpx 0rpx;
    }    .applyInvoic_fd1_0_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:700;color:var(--benbenFontColor0);text-align:center;margin:32rpx 40rpx 0rpx 40rpx;
    }    .applyInvoic_fd1_0_c2_babdd{
        border-top:1px solid #eee;margin:51rpx 0rpx 0rpx 0rpx;
        .applyInvoic_fd1_0_c2_c0_babdd{
        font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor1);width:270rpx;height:101rpx;line-height:101rpx;font-weight:400;border-right:1px solid var(--benbenbdColor0);
    }    .applyInvoic_fd1_0_c2_c1_babdd{
        font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor0);width:270rpx;height:101rpx;line-height:101rpx;font-weight:500;
    }}}
    .applyInvoic_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .applyInvoic_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .applyInvoic_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);
    }    .applyInvoic_fd0_0_c1_c0_1_babdd{
        font-size:36rpx;font-weight:600;color:#333;
    }}}
    .applyInvoic_fd0_0_c0_babdd{
        width:180rpx;
        .applyInvoic_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}
    .applyInvoic_fd0_0_c2_c0_babdd{
        color:var(--benbenFontColor0);
    }}
</style>