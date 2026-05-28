<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex address_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub address_fd0_0_babdd'      >
            <view   class='flex align-center address_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  address_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='address_fd0_0_c1_c0_babdd'  >{{$t('地址管理')}}</text>
</view>
    <view   class='flex align-center address_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>

 <view class="flex flex-direction align-stretch benben-flex-layout address_flex_1_babdd"    >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction align-stretch address_fd1_0_babdd'   @tap.stop="handleClickFunc(item.aid)"    :key='key0'>
            <view   class='flex flex-direction align-stretch'      >
            <view   class='flex flex-wrap align-center address_fd1_0_c0_c0_babdd'      >
            <view   class='flex flex-wrap align-center address_fd1_0_c0_c0_c0_babdd'      >
        <text class='address_fd1_0_c0_c0_c0_c0_babdd'  >{{item.label_name}}</text>
</view>
<text class='address_fd1_0_c0_c0_c1_babdd'  >{{item.real_name}}</text>
<text class='address_fd1_0_c0_c0_c2_babdd'  >(</text>
<text class='address_fd1_0_c0_c0_c2_babdd'    v-if= "item.sex=='1'"  >{{$t('先生')}}</text><text class='address_fd1_0_c0_c0_c2_babdd'    v-if= "item.sex!='1'"  >{{$t('女士')}}</text>
<text class='address_fd1_0_c0_c0_c2_babdd'  >)</text>
<text class='flex-sub address_fd1_0_c0_c0_c5_babdd'  >{{item.mobile}}</text>
</view>
    <view        >
        <text class='address_fd1_0_c0_c1_c0_babdd'  >{{item.province}}</text>
<text class='address_fd1_0_c0_c1_c0_babdd'  >{{item.city}}</text>
<text class='address_fd1_0_c0_c1_c0_babdd'  >{{item.district}}</text>
<text class='address_fd1_0_c0_c1_c0_babdd'  >{{item.detail}}</text>
</view>
    <view   class='flex align-center justify-between address_fd1_0_c0_c2_babdd'      >
            <view   class='flex flex-wrap align-center'   @tap.stop="SelectDefaultFunc(item.aid,item.is_default)"   >
        <text class='fu-iconfont2  address_fd1_0_c0_c2_c0_c0_babdd'    v-if= " item.is_default=='1'">&#xe847;</text><text class='fu-iconfont2 address_fd1_0_c0_c2_c0_c0_1_babdd'    v-if= " item.is_default==0">&#xe764;</text>
<text class='address_fd1_0_c0_c2_c0_c1_babdd'  >{{$t('默认地址')}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
            <view   class='flex flex-wrap align-center'   @tap.stop="getAddressIdFunc(item.aid)"   >
        <text class='fu-iconfont2  address_fd1_0_c0_c2_c1_c0_c0_babdd'  >&#xe6eb;</text>
<text class='address_fd1_0_c0_c2_c1_c0_c1_babdd'      >{{$t('删除')}}</text>
</view>
    <view   class='flex flex-wrap align-center address_fd1_0_c0_c2_c1_c1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/wd/editAddress/editAddress?id=${item.aid}`"   >
        <text class='fu-iconfont2  address_fd1_0_c0_c2_c1_c0_c0_babdd'  >&#xe608;</text>
<text class='address_fd1_0_c0_c2_c1_c0_c1_babdd'      >{{$t('编辑')}}</text>
</view>
</view>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
    <view   class='flex flex-wrap align-center justify-center address_fd1_1_babdd'      >
        <button class='address_fd1_1_c0_babdd'  @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/wd/editAddress/editAddress`"  >{{$t('添加地址')}}</button>
</view>
</view>
        

<benben-popup v-model="popupShow1661425659576" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---删除地址弹窗flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center address_flex_2_babdd"    >
        <text class='address_fd2_0_babdd'  >{{$t('提示')}}</text>
<text class='address_fd2_1_babdd'  >{{$t('确定删除该地址？')}}</text>
    <view   class='flex align-center'      >
        <button class='address_fd2_2_c0_babdd'  @tap.stop="popupShow1661425659576=false"  >{{$t('取消')}}</button>
<button class='address_fd2_2_c1_babdd'  @tap.stop="deleteAddressFunc()"  >{{$t('确定')}}</button>
</view>
</view>
        
<!---删除地址弹窗flex布局结束-->
    
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
			return {"popupShow1661425659576":false,"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataList":[],"sex_name":"","address_ids":"",/** switch_id【抛出id】 **/ "switch_id":"","is_change":""};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {is_change}=options
if (is_change !== undefined) this.is_change = is_change
		},
        onUnload() {
                
        },
		onReady(){
            
		},
		onShow(){
            this.getListFunc()
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
            
            
                            //抛出选择的地址
                 handleClickFunc(aid){
                        if( this.is_change=='1'){
           this.switch_id = aid;
                uni.$emit('isokaddid',this.switch_id)
                setTimeout(()=>{
                    this.$urouter.navigateBack(1);
      },500)
    }
                },
                //地址管理-地址列表
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post636f7683cf195;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {}
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
                
                },
                //获取地址id
                 getAddressIdFunc(id){
                       this.address_ids = id;
    this.popupShow1661425659576 = true;
                },
                //删除地址
                async deleteAddressFunc(){
                        //请求方法
    //数据验证
    
    
  let data636f773e8d763 = await this.$api.post(global.apiUrls.post636f773e8d763, {
    address_id:this.address_ids
  });
  
  if (data636f773e8d763.data.code != 1) {
    this.$message.info(data636f773e8d763.data.msg);
    return
  } 
  let info636f773e8d763 = data636f773e8d763.data;
  
  
    this.popupShow1661425659576 = false;
                    this.getListFunc()
                },
                //选择默认
                async SelectDefaultFunc(defaulitID,defaulitid){
                        if( defaulitid==0){
            this.dataList.forEach(item=>{
						item.is_default = 0
					})
    //请求方法
    //数据验证
    
    
  let data6389ad65f28d9 = await this.$api.post(global.apiUrls.post6389ad65f28d9, {
    address_id:defaulitID
  });
  
  if (data6389ad65f28d9.data.code != 1) {
    this.$message.info(data6389ad65f28d9.data.msg);
    return
  } 
  let info6389ad65f28d9 = data6389ad65f28d9.data;
  
  
    this.dataList.forEach(item=>{
						if(item.aid == defaulitID){
							item.is_default = 1
						}
					})
                    this.$message.info('设置成功');
                    this.getListFunc()
    }
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
            background:var(--benbenbgColor0);background-size: 100% auto;
            .address_flex_2_babdd{
        margin:0rpx 105rpx 0rpx 105rpx;background:var(--benbenbgColor1);background-size:#eee;border-radius:25rpx 25rpx 25rpx 25rpx;padding:40rpx 0rpx 0rpx 0rpx;
        .address_fd2_0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:500;line-height:45rpx;
    }    .address_fd2_1_babdd{
        font-size:32rpx;font-weight:400;line-height:52rpx;color:var(--benbenFontColor0);margin:40rpx 0rpx 39rpx 0rpx;
    }    .address_fd2_2_c0_babdd{
        border-radius:0rpx 0rpx 0rpx 16rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor2);border-top:1px solid var(--benbenbdColor0);height:110rpx;line-height:110rpx;width:270rpx;
    }    .address_fd2_2_c1_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 16rpx 0rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor4);width:270rpx;height:110rpx;border-top:1px solid var(--benbenbdColor0);border-left:1px solid var(--benbenbdColor0);
    }}
    .address_flex_1_babdd{
        margin:0rpx 0rpx 20rpx 0rpx;border-top:1px solid var(--benbenbdColor0);padding:12rpx 0rpx 150rpx 0rpx;
        .address_fd1_0_babdd{
        padding:30rpx 32rpx 20rpx 32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;margin:12rpx 24rpx 12rpx 24rpx;border-radius:16rpx;
        .address_fd1_0_c0_c0_babdd{
        padding:0rpx 0rpx 20rpx 0rpx;
        .address_fd1_0_c0_c0_c0_babdd{
        border-radius:4rpx 4rpx 4rpx 4rpx;background:var(--benbenbgColor3);padding:4rpx 10rpx 2rpx 10rpx;margin:0rpx 14rpx 0rpx 0rpx;
        .address_fd1_0_c0_c0_c0_c0_babdd{
        color:var(--benbenFontColor3);font-size:22rpx;font-weight:400;line-height:30rpx;
    }}    .address_fd1_0_c0_c0_c1_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);max-width:290rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .address_fd1_0_c0_c0_c5_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);margin:0rpx 0rpx 0rpx 24rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }}    .address_fd1_0_c0_c2_babdd{
        padding:26rpx 0rpx 0rpx 0rpx;margin:24rpx 0rpx 0rpx 0rpx;border-top:1px solid var(--benbenbdColor0);
        .address_fd1_0_c0_c2_c0_c0_babdd{
        color:var(--benbeniconColor0);margin:0rpx 8rpx 0rpx 0rpx;
    }    .address_fd1_0_c0_c2_c0_c0_1_babdd{
        color:var(--benbenFontColor1);margin:0rpx 8rpx 0rpx 0rpx;
    }    .address_fd1_0_c0_c2_c0_c1_babdd{
        line-height:32rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);
    }    .address_fd1_0_c0_c2_c1_c1_babdd{
        margin:0rpx 0rpx 0rpx 67rpx;
    }}}    .address_fd1_1_babdd{
        width:750rpx;position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));
        .address_fd1_1_c0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:686rpx;height:88rpx;line-height:88rpx;font-weight:400;
    }}}
    .address_fd1_0_c0_c0_c2_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .address_fd1_0_c0_c1_c0_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);
    }
    .address_fd1_0_c0_c2_c1_c0_c0_babdd{
        color:var(--benbeniconColor2);font-size:30rpx;margin:0rpx 12rpx 0rpx 0rpx;
    }
    .address_fd1_0_c0_c2_c1_c0_c1_babdd{
        line-height:28rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);
    }
    .address_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .address_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .address_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .address_fd0_0_c0_babdd{
        width:180rpx;
        .address_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>