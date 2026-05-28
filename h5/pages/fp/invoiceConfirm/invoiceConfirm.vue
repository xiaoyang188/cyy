<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex invoiceConfirm_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub invoiceConfirm_fd0_0_babdd'      >
            <view   class='flex align-center invoiceConfirm_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  invoiceConfirm_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='invoiceConfirm_fd0_0_c1_c0_babdd'  >{{$t('申请开票')}}</text>
</view>
    <view   class='flex align-center invoiceConfirm_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>

 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout invoiceConfirm_flex_1_babdd"   v-if= " info.type!=''" >
            <view   class='flex flex-direction align-stretch invoiceConfirm_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center justify-between invoiceConfirm_fd1_0_c0_babdd'      >
        <text class='invoiceConfirm_fd1_0_c0_c0_babdd'  >{{$t('发票类型')}}</text>
<text class='invoiceConfirm_fd1_0_c0_c1_babdd'  >{{$t('电子发票')}}</text>
</view>
    <view   class='flex flex-wrap align-center invoiceConfirm_fd1_0_c1_babdd'      >
        <text class='invoiceConfirm_fd1_0_c1_c0_babdd'  >{{$t('发票信息')}}</text>
</view>
    <view   class='flex flex-wrap align-center invoiceConfirm_fd1_0_c2_babdd'      >
        <text class='invoiceConfirm_fd1_0_c2_c0_babdd'  >{{$t('抬头类型')}}</text>
<text class='invoiceConfirm_fd1_0_c2_c1_babdd'    v-if= "info.type=='1'"  >{{$t('个人')}}</text><text class='invoiceConfirm_fd1_0_c2_c1_1_babdd'    v-if= "info.type!='1'"  >{{$t('公司')}}</text>
</view>
    <view   class='flex flex-wrap align-center invoiceConfirm_fd1_0_c3_babdd'      >
        <image class='invoiceConfirm_fd1_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='invoiceConfirm_fd1_0_c3_c1_babdd'  >{{$t('发票抬头')}}</text>
<benben-input class='flex-sub invoiceConfirm_fd1_0_c3_c2_babdd'   type="text" :placeholder="$t('发票抬头不能为空')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="info.username" />
</view>
    <view   class='flex flex-wrap align-center invoiceConfirm_fd1_0_c3_babdd'    v-if= "info.type!='1'"  >
        <image class='invoiceConfirm_fd1_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='invoiceConfirm_fd1_0_c3_c1_babdd'  >{{$t('公司税号')}}</text>
<benben-input class='flex-sub invoiceConfirm_fd1_0_c3_c2_babdd'   type="text" :placeholder="$t('企业单位税号不能为空')" confirm-type="done" :maxlength="20" placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="info.tax_number" />
</view>
    <view   class='flex flex-wrap align-center justify-between invoiceConfirm_fd1_0_c0_babdd'      >
        <text class='invoiceConfirm_fd1_0_c0_c0_babdd'  >{{$t('发票内容')}}</text>
<text class='invoiceConfirm_fd1_0_c0_c1_babdd'  >{{$t('商品明细')}}</text>
</view>
    <view   class='flex flex-wrap align-center invoiceConfirm_fd1_0_c6_babdd'      >
        </view>
    <view   class='flex flex-wrap align-center invoiceConfirm_fd1_0_c3_babdd'      >
        <image class='invoiceConfirm_fd1_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='invoiceConfirm_fd1_0_c3_c1_babdd'  >{{$t('联系方式')}}</text>
<text class='invoiceConfirm_fd1_0_c7_c2_babdd'  >{{info.mobile}}</text>
</view>
    <view   class='flex flex-wrap align-center invoiceConfirm_fd1_0_c3_babdd'      >
        <image class='invoiceConfirm_fd1_0_c3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"323.png"'></image>
<text class='invoiceConfirm_fd1_0_c3_c1_babdd'  >{{$t('电子邮箱')}}</text>
<benben-input class='flex-sub invoiceConfirm_fd1_0_c3_c2_babdd'   type="text" :placeholder="$t('电子邮箱不能为空')" confirm-type="done" :maxlength="-1" :disabled='true' placeholder-style="color:var(--benbenFontColor1);font-size:32rpx"  v-model="info.email" />
</view>
</view>
    <view   class='flex flex-wrap align-center justify-center invoiceConfirm_fd1_1_babdd'      >
        <button class='invoiceConfirm_fd1_1_c0_babdd'  @tap.stop="titleEditFunc()"  >{{$t('确认提交')}}</button>
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
			return {"text":"编辑添加后更新发票列表",/** create_time【提交时间】
*   status【开票状态】
*   is_default【是否默认】
*   type【类型】
*   email【邮箱】
*   mobile【手机号】
*   tax_number【税号】
*   username【公司抬头】
*   user_nickname【用户昵称】 **/ "info":uni.getStorageSync('invoice') || '',"aid":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {aid}=options
if (aid !== undefined) this.aid = aid
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
                                    this.info = uni.getStorageSync('invoice') || ''
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
            
            
                            //发票抬头-编辑发票抬头
                async titleEditFunc(){
                                if(!validate(this.info.username,'require')){
                 this.$message.info(this.$t('请输入发票抬头'));
                 return false;
            }
    if( this.info.type=='2'){
                    if(!validate(this.info.tax_number,'require')){
                 this.$message.info(this.$t('请输入企业单位税号'));
                 return false;
            }
    if (!/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(this.info
					        .tax_number)) {
					    return this.$message.info(global.i18n.t('请输入正确的公司税号'))
					}
    }
            if(!validate(this.info.email,'require')){
                 this.$message.info(this.$t('请输入邮箱'));
                 return false;
            }
    if( this.aid==''){
            //请求方法
    //数据验证
    
    
  let data641ec735afc0f = await this.$api.dbPost(global.apiUrls.post641ec735afc0f, {
    username:this.info.username,tax_number:this.info.tax_number,mobile:this.info.mobile,email:this.info.email,type:this.info.type,is_default:this.info.is_default
  });
  if(!data641ec735afc0f) return
  if (data641ec735afc0f.data.code != 1) {
    this.$message.info(data641ec735afc0f.data.msg);
    return
  } 
  let info641ec735afc0f = data641ec735afc0f.data;
  
  
                    this.$message.info('添加成功');
    }
    else{
            //请求方法
    //数据验证
    
    
  let data641ec88074922 = await this.$api.dbPost(global.apiUrls.post641ec88074922, {
    aid:this.aid,username:this.info.username,tax_number:this.info.tax_number,mobile:this.info.mobile,email:this.info.email,type:this.info.type,is_default:this.info.is_default
  });
  if(!data641ec88074922) return
  if (data641ec88074922.data.code != 1) {
    this.$message.info(data641ec88074922.data.msg);
    return
  } 
  let info641ec88074922 = data641ec88074922.data;
  
  
                    this.$message.info('编辑成功');
    }
                uni.$emit('upinvoice',this.text)
                setTimeout(()=>{
                    this.$urouter.navigateBack(2);
      },800)
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
            .invoiceConfirm_flex_1_babdd{
        margin:0rpx 0rpx 32rpx 0rpx;
        .invoiceConfirm_fd1_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;margin:0rpx 0rpx 150rpx 0rpx;
        .invoiceConfirm_fd1_0_c1_babdd{
        background:var(--benbenbgColor8);background-size:100% auto !important;padding:24rpx 52rpx 24rpx 52rpx;
        .invoiceConfirm_fd1_0_c1_c0_babdd{
        color:var(--benbenFontColor5);font-size:28rpx;font-weight:700;line-height:40rpx;
    }}    .invoiceConfirm_fd1_0_c2_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;padding:32rpx 0rpx 32rpx 20rpx;border-bottom:1px solid #eee;
        .invoiceConfirm_fd1_0_c2_c0_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);margin:0rpx auto 0rpx 0rpx;
    }    .invoiceConfirm_fd1_0_c2_c1_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:400;line-height:45rpx;
    }    .invoiceConfirm_fd1_0_c2_c1_1_babdd{
        color:#333333;font-size:32rpx;font-weight:400;line-height:45rpx;
    }}    .invoiceConfirm_fd1_0_c6_babdd{
        height:20rpx;background:rgba(248, 248, 248, 1);background-size:100% auto !important;
    }}    .invoiceConfirm_fd1_1_babdd{
        position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));width:750rpx;background:#F8F8F8;background-size:100% auto;
        .invoiceConfirm_fd1_1_c0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;font-weight:400;
    }}}
    .invoiceConfirm_fd1_0_c0_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;padding:32rpx 0rpx 32rpx 20rpx;
    }
    .invoiceConfirm_fd1_0_c0_c0_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);
    }
    .invoiceConfirm_fd1_0_c0_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .invoiceConfirm_fd1_0_c3_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid #eee;
    }
    .invoiceConfirm_fd1_0_c3_c0_babdd{
        width:12rpx;height:12rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 8rpx 0rpx 0rpx;
    }
    .invoiceConfirm_fd1_0_c3_c1_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:500;color:var(--benbenFontColor0);margin:0rpx 24rpx 0rpx 0rpx;
    }
    .invoiceConfirm_fd1_0_c3_c2_babdd{
        line-height:45rpx;font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);text-align:right;
    }
    .invoiceConfirm_fd1_0_c7_c2_babdd{
        margin:0rpx 0rpx 0rpx auto;color:var(--benbenFontColor0);font-size:32rpx;font-weight:400;line-height:45rpx;
    }
    .invoiceConfirm_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .invoiceConfirm_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .invoiceConfirm_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);
    }}}
    .invoiceConfirm_fd0_0_c0_babdd{
        width:180rpx;
        .invoiceConfirm_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>