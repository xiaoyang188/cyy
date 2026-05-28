<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-center benben-position-layout flex inteGral_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub inteGral_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center flex-sub'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  inteGral_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='inteGral_fd0_0_c1_c0_babdd'  >{{$t('积分商城')}}</text>
</view>
    <view   class='flex align-center justify-end flex-sub'      >
        <text class='inteGral_fd0_0_c2_c0_babdd'     @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/jf/rulesExchange/rulesExchange`" >{{$t('兑换规则')}}</text>
</view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---积分分类flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout inteGral_flex_1_babdd"    >
            <view   class='flex flex-direction flex-wrap align-center inteGral_fd1_0_babdd'      >
        <text class='inteGral_fd1_0_c0_babdd'  >{{dataDetails.score}}</text>
<text class='inteGral_fd1_0_c1_babdd'  >{{$t('账户积分')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-between inteGral_fd1_1_babdd'      >
            <view   class='flex flex-direction flex-wrap align-center'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/jf/exChange/exChange`"   >
        <image class='inteGral_fd1_1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"360.png"'></image>
<text class='inteGral_fd1_1_c0_c1_babdd'  >{{$t('兑换记录')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-center'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/jf/inteDetails/inteDetails`"   >
        <image class='inteGral_fd1_1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"361.png"'></image>
<text class='inteGral_fd1_1_c0_c1_babdd'  >{{$t('积分明细')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-center'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/wd/signinPage/signinPage`"   >
        <image class='inteGral_fd1_1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"208.png"'></image>
<text class='inteGral_fd1_1_c0_c1_babdd'  >{{$t('去签到')}}</text>
</view>
    <view   class='flex flex-direction flex-wrap align-center'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/jf/rulesExchange/rulesExchange`" v-if= " appSystemIdentification=='Wechat'"  >
        <image class='inteGral_fd1_1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"1517.png"'></image>
<text class='inteGral_fd1_1_c0_c1_babdd'  >{{$t('兑换规则')}}</text>
</view>
</view>
<view style="position: relative" v-if= " dataMessage.length>0">
    <swiper ref="benbenSwiperfd1_2" :current='index' @change="bannerIndexfd1_2 = $event.detail.current"  class='flex position-relative inteGral_fd1_2_babdd'  previous-margin="0rpx" next-margin="0rpx" :display-multiple-items="1" :vertical='true' :interval="5000" :duration="500" :autoplay='true' :circular='true' >
        
    <template v-for = '(item,key0) in dataMessage'>
        <swiper-item class='flex  inteGral_fd1_2_babdd'        :key='key0'>
            <view   class='flex align-center inteGral_fd1_2_c1_c0_babdd'      >
        <image class='inteGral_fd1_2_c1_c0_c0_babdd'  mode="aspectFill"  :src='item.head_img'></image>
    <view   class='flex-sub inteGral_fd1_2_c1_c0_c1_babdd'      >
        <text class='inteGral_fd1_2_c1_c0_c1_c0_babdd'  >{{item.user_nickname}}</text>
<text   >{{$t('刚刚兑换了')}}</text>
<text class='inteGral_fd1_2_c1_c0_c1_c2_babdd'     @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/jf/commoDity/commoDity?commodity_id=${item.goods_id}`" >{{item.goods_name}}</text>
<text   >{{item.goods_integral}}</text>
<text   >{{$t('积分')}}</text>
</view>
</view>
</swiper-item>
    </template>

    </swiper>
</view>
    <view   class='flex flex-wrap align-center inteGral_fd1_3_babdd'      >
        <image class='inteGral_fd1_3_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"209.png"'></image>
<text class='inteGral_fd1_3_c1_babdd'  >{{$t('积分兑换')}}</text>
<text class='inteGral_fd1_3_c2_babdd'  >{{$t('小积分换大奖')}}</text>
</view>
<view class='flex-sub'>
        <benben-waterfalls ref="waterfalls1706926246123" :waterfall-data.sync="waterfallsfd1_4" v-model="dataList"  id-key="aid" add-time="200" column-count="2" left-gap="0" right-gap="0" column-gap="10"   >
        <benben-waterfalls-item :sort-index="sortIndex" :key="sortIndex" v-for="(waterfall, sortIndex) in waterfallsfd1_4">
    <template v-for="waterfallIndex in waterfall">
        <template v-if="dataList[waterfallIndex]">
            <view   class='flex flex-direction align-stretch inteGral_fd1_4_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/jf/commoDity/commoDity?commodity_id=${dataList[waterfallIndex].aid}`"   :key='waterfallIndex'>
        <image class='inteGral_fd1_4_c0_c0_babdd'  mode="widthFix"  :src='dataList[waterfallIndex].thumb'></image>
<text class='flex-sub inteGral_fd1_4_c0_c1_babdd'  >{{dataList[waterfallIndex].name}}</text>
    <view   class='flex flex-wrap align-center inteGral_fd1_4_c0_c2_babdd'      >
        <text class='inteGral_fd1_4_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class='flex-wrap align-center inteGral_fd1_4_c0_c2_c0_babdd'   >
    <text >{{ dataList[waterfallIndex].market_price | frontPrice }}</text><text >{{ dataList[waterfallIndex].market_price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center inteGral_fd1_4_c0_c3_babdd'      >
        <text class='inteGral_fd1_4_c0_c3_c0_babdd'  >{{dataList[waterfallIndex].integral}}</text>
<text class='inteGral_fd1_4_c0_c3_c1_babdd'    v-if= "dataList[waterfallIndex].shop_price!='0.00'"  >{{$t('积分+')}}</text><text class='inteGral_fd1_4_c0_c3_c1_1_babdd'    v-if= "dataList[waterfallIndex].shop_price=='0.00'"  >{{$t('积分')}}</text>
<text class='inteGral_fd1_4_c0_c3_c0_babdd'    v-if= "dataList[waterfallIndex].shop_price!='0.00'"  >{{dataList[waterfallIndex].shop_price}}</text>
<text class='inteGral_fd1_4_c0_c3_c1_babdd'    v-if= "dataList[waterfallIndex].shop_price!='0.00'"  >{{$t('元')}}</text>
</view>
</view>

        </template>
    </template>
</benben-waterfalls-item></benben-waterfalls>
</view>
<fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
<!--     <view   class='flex flex-wrap align-center justify-between'      >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction flex-wrap align-stretch inteGral_fd1_5_c0_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/jf/commoDity/commoDity?commodity_id=${item.aid}`"    :key='key0'>
        <image class='inteGral_fd1_5_c0_c0_babdd'  mode="aspectFill"  :src='item.thumb'  v-if= "commoditype=='1'"></image><image class='inteGral_fd1_5_c0_c0_babdd'  mode="aspectFill"  :src='item.thumb'  v-if= "commoditype=='2'"></image>
<text class='flex-sub inteGral_fd1_5_c0_c1_babdd'  >{{item.name}}</text>
    <view   class='flex flex-wrap align-center inteGral_fd1_4_c0_c2_babdd'      >
        <text class='inteGral_fd1_5_c0_c2_c0_babdd'  >{{$t('￥')}}</text>
<text class='flex-wrap align-center inteGral_fd1_5_c0_c2_c0_babdd'   >
    <text >{{ item.market_price | frontPrice }}</text><text >{{ item.market_price | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center inteGral_fd1_4_c0_c3_babdd'      >
        <text class='inteGral_fd1_5_c0_c3_c0_babdd'  >{{item.integral}}</text>
<text class='inteGral_fd1_4_c0_c3_c1_1_babdd'    v-if= "item.shop_price!='0.00'"  >{{$t('积分+')}}</text><text class='inteGral_fd1_4_c0_c3_c1_1_babdd'    v-if= "item.shop_price=='0.00'"  >{{$t('积分')}}</text>
<text class='inteGral_fd1_5_c0_c3_c0_babdd'    v-if= "item.shop_price!='0.00'"  >{{item.shop_price}}</text>
<text class='inteGral_fd1_4_c0_c3_c1_1_babdd'    v-if= "item.shop_price!='0.00'"  >{{$t('元')}}</text>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
 --></view>
        
<!---积分分类flex布局结束-->
<benben-popup v-model="popupShow1653901123045" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---兑换规则flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center justify-center"    >
            <view   class='flex flex-direction flex-wrap align-stretch inteGral_fd2_0_babdd'      >
        <text class='inteGral_fd2_0_c0_babdd'  >{{$t('兑换规则')}}</text>
    
    <scroll-view  class='inteGral_fd2_0_c1_babdd'  :scroll-x='false' :scroll-y='true' :show-scrollbar='false'      :enhanced="true">
        <view class='flex flex-direction align-stretch benben-scroll flex' >
                    <jyf-parser class='inteGral_fd2_0_c1_c0_babdd'  :html="dataEssay.content | richTextFormat"  >
        </jyf-parser>
</view>
    </scroll-view>
    
</view>
<image class='inteGral_fd2_1_babdd'  mode="aspectFit"  :src='STATIC_URL+"206.png"' @tap.stop="popupShow1653901123045=false" ></image>
</view>
        
<!---兑换规则flex布局结束-->
    
</benben-popup>
    
    
        </view>
    </page-body>
</template>
<script>
    import pagingList from '@/common/mixin/paging_list.js';
import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        mixins: [pagingList],
        
        data(){
			return {"popupShow1653901123045":false,"waterfallsfd1_4":[],"bannerIndexfd1_2":0,"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"newslist":[{"name":"小油菜","value":"","image":"https://zhongben-crm.oss-cn-zhangjiakou.aliyuncs.com/uploads/images/20220526/10daa2765308794f99b8f2fcaa185ddc.png"},{"name":"酱香猪蹄","value":"","image":"https://zhongben-crm.oss-cn-zhangjiakou.aliyuncs.com/uploads/images/20220528/d2b2b7287ff3282502a8b9789a3948c4.png"},{"name":"菊花","value":"","image":"https://zhongben-crm.oss-cn-zhangjiakou.aliyuncs.com/uploads/images/20220528/d15cbfa4d75281385ef73f7dd01a8acc.png"}],"commoditype":"1","dataList":[],"dataMessage":[],"index":0,/** follow_count【关注的店铺数量】
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
*   invite_code【邀请码】 **/ "dataDetails":{"invite_code":"","address":"","address_code":"","hobby":"","tags":"","id":0,"userlevel_id":0,"mobile":"","real_name":"","avatar":"","account":"","email":"","birthday":"","gender":"","create_time":"","user_money":"","freeze_money":"","total_consumption_money":"","score":"","_mobile":"","coupon":0,"collection_count":0,"browse_count":0,"total_money":0,"certified":0,"nickname":"","is_pay_password":0,"follow_count":0},/** content【内容】 **/ "dataEssay":{"content":""}};
		},
		computed:{
                         isLogin() {
      return this.$store.state.token == '' ? false : true;
    },
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
            this.getListFunc()
this.getTypeFunc()
this.getRuleFunc()
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
            this.getUserinfoFunc()
		},
		onHide(){
            
            
		},
		onResize(){
            
		},
		onPullDownRefresh(){
            this.getListFunc()
this.getUserinfoFunc()
this.getTypeFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //获取个人信息
                async getUserinfoFunc(){
                        if( this.isLogin===true){
            //请求方法
    //数据验证
    
    
  let datadataDetails = await this.$api.get(global.apiUrls.post5c78c4772da97, {
    
  });
  
  if (datadataDetails.data.code != 1) {
    this.$message.info(datadataDetails.data.msg);
    return
  } 
  let infodataDetails = datadataDetails.data;
  this.dataDetails = infodataDetails.data
  
    }
                },
                //积分商城-积分商品列表
                 getListFunc(){
                                    this.$refs.waterfalls1706926246123?.refresh();
                this.minixPagingListsApi = global.apiUrls.post641457e74fa3e;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {}
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
                
                },
                //积分商城-兑换规则
                async getRuleFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataEssay = await this.$api.post(global.apiUrls.post64156a0fd7451, {
    
  });
  
  if (datadataEssay.data.code != 1) {
    this.$message.info(datadataEssay.data.msg);
    return
  } 
  let infodataEssay = datadataEssay.data;
  this.dataEssay = infodataEssay.data
  
                },
                //积分商城-滚动兑换人员信息
                async getTypeFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataMessage = await this.$api.post(global.apiUrls.post64156140edd5a, {
    
  });
  
  if (datadataMessage.data.code != 1) {
    this.$message.info(datadataMessage.data.msg);
    return
  } 
  let infodataMessage = datadataMessage.data;
  this.dataMessage = infodataMessage.data
  
                },
                pagingListPostData(){
                    return this.pagingListPostDataContent
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor0);background-size: 100% 440rpx;
            .inteGral_fd2_0_babdd{
        border-radius:25rpx 25rpx 25rpx 25rpx;background:#fff;padding:40rpx 32rpx 44rpx 32rpx;width:540rpx;
        .inteGral_fd2_0_c0_babdd{
        font-size:36rpx;font-weight:800;color:rgba(51, 51, 51, 1);text-align:center;margin:0rpx 0rpx 32rpx 0rpx;
    }    .inteGral_fd2_0_c1_babdd{
        touch-action:none;width:470rpx;height:300rpx;
    }}
    .inteGral_fd2_1_babdd{
        border-radius:28rpx 28rpx 28rpx 28rpx;width:56rpx;height:56rpx;margin:48rpx 0rpx 0rpx 0rpx;
    }
    .inteGral_flex_1_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
        .inteGral_fd1_0_babdd{
        padding:48rpx 24rpx 43rpx 24rpx;background:var(--benbenbgColor3);background-size:100% auto;border-radius:16rpx;margin:24rpx 0rpx 0rpx 0rpx;
        .inteGral_fd1_0_c0_babdd{
        font-size:60rpx;font-weight:700;color:#fff;margin:0rpx 0rpx 12rpx 0rpx;
    }    .inteGral_fd1_0_c1_babdd{
        font-size:28rpx;font-weight:400;color:#fff;
    }}    .inteGral_fd1_1_babdd{
        background:var(--benbenbgColor1);background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;padding:24rpx 80rpx 24rpx 68rpx;margin:20rpx 0rpx 32rpx 0rpx;
    }    .inteGral_fd1_3_babdd{
        padding:48rpx 0rpx 32rpx 0rpx;
        .inteGral_fd1_3_c0_babdd{
        width:34rpx;height:34rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 14rpx 0rpx 0rpx;
    }    .inteGral_fd1_3_c1_babdd{
        margin:0rpx 24rpx 0rpx 0rpx;font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);
    }    .inteGral_fd1_3_c2_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }}    .inteGral_fd1_4_c0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto;margin:0rpx 0rpx 20rpx 0rpx;border-radius:16rpx;padding:0rpx 0rpx 15rpx 0rpx;
        .inteGral_fd1_4_c0_c0_babdd{
        width:100%;border-radius:16rpx;margin:0rpx 0rpx 15rpx 0rpx;
    }    .inteGral_fd1_4_c0_c1_babdd{
        font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);margin:0rpx 20rpx 0rpx 20rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }}    .inteGral_fd1_5_c0_babdd{
        background:#fff;background-size:100% auto !important;border-radius:16rpx 16rpx 16rpx 16rpx;padding:0rpx 0rpx 22rpx 0rpx;margin:0rpx 0rpx 8rpx 0rpx;width:346rpx;
        .inteGral_fd1_5_c0_c1_babdd{
        font-size:28rpx;font-weight:500;color:rgba(51, 51, 51, 1);margin:0rpx 20rpx 0rpx 20rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }}}
    .inteGral_fd1_1_c0_c0_babdd{
        width:64rpx;height:64rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 12rpx 0rpx;
    }
    .inteGral_fd1_1_c0_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .inteGral_fd1_2_babdd{
        width:702rpx;height:80rpx;
    }
    .inteGral_fd1_2_c1_c0_babdd{
        width:702rpx;height:80rpx;border-radius:10rpx 10rpx 10rpx 10rpx;background:#FCF2F2;padding:0rpx 24rpx 0rpx 24rpx;overflow:hidden;
        .inteGral_fd1_2_c1_c0_c0_babdd{
        width:48rpx;height:48rpx;border-radius:24rpx 24rpx 24rpx 24rpx;margin:0rpx 24rpx 0rpx 0rpx;
    }    .inteGral_fd1_2_c1_c0_c1_babdd{
        width:570rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
        .inteGral_fd1_2_c1_c0_c1_c0_babdd{
        font-size:28rpx;font-weight:400;color:rgba(51, 51, 51, 1);margin:0rpx 8rpx 0rpx 0rpx;
    }    .inteGral_fd1_2_c1_c0_c1_c2_babdd{
        margin:0rpx 8rpx 0rpx 8rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor7);
    }}}
    .inteGral_numberfd1_2_c0_babdd{
        position:absolute;bottom:20rpx;right:30rpx;width:80rpx;height:40rpx;background-color:#525050;border-radius:6rpx 6rpx 6rpx 6rpx;
        .inteGral_numberfd1_2_c0_c0_babdd{
        font-size:32rpx;color:#FFFFFF;line-height:46rpx;font-weight:400;
    }}
    .inteGral_numberfd1_2_c0_c1_babdd{
        font-size:24rpx;color:#FFFFFF;line-height:46rpx;font-weight:400;
    }
    .inteGral_fd1_4_c0_c2_babdd{
        margin:16rpx 20rpx 17rpx 20rpx;
    }
    .inteGral_fd1_4_c0_c2_c0_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor2);text-decoration:line-through;
    }
    .inteGral_fd1_4_c0_c3_babdd{
        margin:0rpx 20rpx 0rpx 20rpx;
    }
    .inteGral_fd1_4_c0_c3_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);margin:0rpx 8rpx 0rpx 0rpx;
    }
    .inteGral_fd1_4_c0_c3_c1_babdd{
        font-size:22rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .inteGral_fd1_4_c0_c3_c1_1_babdd{
        font-size:22rpx;font-weight:400;color:rgba(51, 51, 51, 1);
    }
    .inteGral_fd1_5_c0_c0_babdd{
        width:346rpx;height:346rpx;border-radius:16rpx 16rpx 16rpx 16rpx;margin:0rpx 0rpx 24rpx 0rpx;
    }
    .inteGral_fd1_5_c0_c2_c0_babdd{
        font-size:24rpx;font-weight:400;color:rgba(102, 102, 102, 1);text-decoration:line-through;
    }
    .inteGral_fd1_5_c0_c3_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor7);margin:0rpx 8rpx 0rpx 0rpx;
    }
    .inteGral_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .inteGral_fd0_0_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .inteGral_fd0_0_c0_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbeniconColor1);
    }    .inteGral_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);line-height:88rpx;
    }    .inteGral_fd0_0_c2_c0_babdd{
        font-size:32rpx;font-weight:600;color:var(--benbenFontColor0);
    }}}}
    ::v-deep .inteGral_fd2_0_c1_c0_babdd{
        width:100%;
    }
    ::v-deep .inteGral_swiperDotfd1_2_babdd{
        position:absolute;
    }
    ::v-deep .inteGral_swiperDotSelectedfd1_2_babdd{
        width:16rpx;height:16rpx;border-radius:100rpx 100rpx 100rpx 100rpx;border:1px solid #00A7FF;margin:0rpx 6rpx 0rpx 0rpx;font-size:24rpx;color:#fff;
    }
    ::v-deep .inteGral_swiperDotUnselectedfd1_2_babdd{
        width:16rpx;height:16rpx;border-radius:100rpx 100rpx 100rpx 100rpx;border:1px solid rgba(0, 0, 0, 0.3);margin:0rpx 6rpx 0rpx 0rpx;font-size:24rpx;color:#fff;
    }
</style>