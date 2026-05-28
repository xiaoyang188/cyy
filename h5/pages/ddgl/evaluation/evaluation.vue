<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex evaluation_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center evaluation_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='evaluation_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='evaluation_fd0_1_babdd'  >{{$t('评价')}}</text>
    <view   class='flex flex-wrap align-center evaluation_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
        <benben-goods-evaluate  class='evaluation_flex_evaluate_1_babdd' :goods-list.sync='dataDetails.order_goods_list' v-model='goods_comment'  >
        </benben-goods-evaluate>
    <view class="flex flex-direction flex-wrap align-center justify-end benben-position-layout flex evaluation_flex_2_babdd"    >
        <button class='evaluation_fd2_0_babdd'  @tap.stop="handleSubmitFunc()"  >{{$t('提交')}}</button>

        </view>
<view :style="{height: '150rpx'}"  ></view>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** bargain_price【砍掉的价格】
*   final_status【0未支付尾款 1支付尾款】
*   deposit【定金金额】
*   balance_money【预售尾款金额】
*   final_order_sn【预售订单支付尾款订单编号】
*   pay_status【支付状态】
*   goods_total【商品总额】
*   receive_surplus_time【订单待收货剩余时间】
*   balance_payment_etime【尾款支付时间2】
*   balance_payment_stime【尾款支付时间1】
*   cancel_surplus_second【订单待付款剩余时间：】
*   real_money【实付金额】
*   group_user【拼团人员列表】
*   group_info【拼团活动信息】
*   status_txt【状态说明】
*   join_number【拼团总人数【可参加】】
*   group_members_nums【还差几人拼成】
*   activity_status【活动状态: 0 待成团 1 拼团成功 2 拼团失败】
*   join_timeout【拼团结束倒计时(秒)】
*   discount_str【折扣说明】
*   is_multiple_package【是否多包裹，如果多包裹查看物流需要先调用包裹列表接口】
*   btn_list【按钮状态】
*   pay_balance【支付尾款】
*   delete_order【删除订单】
*   evaluate【评价】
*   confirm_receive【确认收货】
*   view_logistics【查看物流】
*   apply_refund【申请售后】
*   view_invoice【查看发票】
*   apply_invoice【申请发票】
*   remind_already【已提醒】
*   remind_send【提醒发货】
*   go_pay【去付款】
*   cancel_order【取消订单】
*   shop_info【店铺信息】
*   store_logo_id【商家logo图片ID】
*   store_logo【商家Logo】
*   store_name【商家名称】
*   aid【商家ID】
*   order_goods_list【订单商品】
*   order_info【订单信息】
*   pickup_img【核销码图片】
*   pickup_code【核销码】
*   express_price【运费】
*   label_name【收货地址标签】
*   sex【收货人性别】
*   district【收货区】
*   city【收货市】
*   province【收货省】
*   remark【订单备注】
*   receiver_name【收货人】
*   receiver_address【收货地址】
*   receiver_mobile【收货电话】
*   pay_type_str【支付方式说明】
*   status【状态;-1:取消;0:待付款;1:已付款;2:已发货;3:已完成;4:已评价 5:售后中  6:已结束(订单所有商品已售后完成)   7:预售待付尾款   预售尾款超时(订单取消)】
*   pay_type【支付方式】
*   create_time【下单时间】
*   discount_money【会员优惠金额】
*   pay_time【支付时间】
*   receive_time【收货时间】
*   send_time【发货时间】
*   coupon_money【平台优惠券金额】
*   coupon_id【平台优惠券ID】
*   payable_money【应付金额】
*   order_money【订单金额】
*   order_sn【订单编号】
*   aid【订单ID】 **/ "dataDetails":{"aid":"","order_sn":"","order_money":"","payable_money":"","coupon_id":"","coupon_money":"","send_time":"","receive_time":"","pay_time":"","discount_money":"","create_time":"","pay_type":"","status":"","pay_type_str":"","order_info":{"receiver_mobile":"","receiver_address":"","receiver_name":"","remark":"","province":"","city":"","district":"","sex":"","label_name":"","express_price":"","pickup_code":"","pickup_img":""},"order_goods_list":[],"shop_info":{"aid":0,"store_name":"","store_logo":"","store_logo_id":0},"btn_list":{"cancel_order":"","go_pay":"","remind_send":"","remind_already":"","apply_invoice":"","view_invoice":"","apply_refund":"","view_logistics":"","confirm_receive":"","evaluate":"","delete_order":"","pay_balance":""},"is_multiple_package":0,"order_type":"","advance_sn":"","usermerchant_id":"","discount_str":"","surplus_receive_time":"","group_info":{"join_timeout":"","activity_status":0,"group_members_nums":0,"join_number":0,"status_txt":""},"group_user":[],"real_money":"","cancel_surplus_second":0,"balance_payment_stime":"","balance_payment_etime":"","receive_surplus_time":"","goods_total":"","pay_status":"","final_order_sn":"","balance_money":0,"deposit":0,"final_status":0,"bargain_price":false},"goods_comment":"","text":"1","id":"1018"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {id}=options
if (id !== undefined) this.id = id
this.queryDetailsFunc()
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
            
            
                            //订单-订单详情
                async queryDetailsFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataDetails = await this.$api.post(global.apiUrls.post62c92b9d5ada3, {
    order_id:this.id,is_comment:'1'
  });
  
  if (datadataDetails.data.code != 1) {
    this.$message.info(datadataDetails.data.msg);
    return
  } 
  let infodataDetails = datadataDetails.data;
  this.dataDetails = infodataDetails.data
  
                },
                //发布评论
                async handleSubmitFunc(){
                        var flag=true
				var objData =JSON.parse(this.goods_comment)
				 objData.forEach(it=>{
					 it.content = it.content.trim();
					 if(it.content==''){
						 flag=false
						 return
					 }
				 })
				 if(flag==false){
					 this.$message.info(global.i18n.t('请输入您的评价'))
					 flag=true
					 return
				 }
    //请求方法
    //数据验证
    
    
  let data64218d79d9401 = await this.$api.dbPost(global.apiUrls.post64218d79d9401, {
    order_id:this.id,goods_comment:this.goods_comment
  });
  if(!data64218d79d9401) return
  if (data64218d79d9401.data.code != 1) {
    this.$message.info(data64218d79d9401.data.msg);
    return
  } 
  let info64218d79d9401 = data64218d79d9401.data;
  
  
                    uni.showToast({
                        title:this.$t('评论成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                uni.$emit('shenqingchengg',this.text)
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
            .evaluation_flex_2_babdd{
        width:750rpx;height:150rpx;overflow:hidden;z-index:11;bottom:calc(0rpx + var(--benben-window-bottom,0px));background:#F8F8F8;background-size:100% auto;
        .evaluation_fd2_0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;margin:0rpx 0rpx 32rpx 0rpx;
    }}
    .evaluation_flex_evaluate_1_babdd{
        --star-color:var(--benbenFontColor1);--active-star-color:var(--benbenFontColor4);--star-size:20px;--checked-activer-color:var(--benbenFontColor4);--checked-size:16px;
    }
    .evaluation_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:11;top:0rpx;background:#fff;background-size:100% auto !important;
        .evaluation_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:600;line-height:50rpx;
    }}
    .evaluation_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .evaluation_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
</style>