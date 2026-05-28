<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex invoicesManagement_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub invoicesManagement_fd0_0_babdd'      >
            <view   class='flex align-center invoicesManagement_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  invoicesManagement_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='invoicesManagement_fd0_0_c1_c0_babdd'  >{{$t('发票管理')}}</text>
</view>
    <view   class='flex align-center invoicesManagement_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex benben-flex-layout flex-wrap align-center"    >
        <view>
        <benben-flex-tabs class-text='invoicesManagement_benbenTabsfd1_0_babdd'  v-model="tabs" ref="benben_tabsfd1_0" select-mark="benben_tabsfd1_0" key="benben_tabsfd1_0" :open-title-type='false' :open-sticky='true' :top='88' :is-show-content='false' :scrollspy='false'  :tabs-info.sync="tabsInfofd1_0" @change="getTabDataListFunc()" >
            
                    <scroll-view :throttle='false'
          @scroll="tabsInfofd1_0.scrollX = $event.detail.scrollLeft"
          id="benben_tabsfd1_0"
          class="benben-tabs"
          style="width:750rpx"
          :scroll-x="true"
          :scroll-left="tabsInfofd1_0.moveX"
          scroll-with-animation="all .3s ease"
          :show-scrollbar='false'
          :enhanced="true"
        >
          <view class="benben-tabs-content" id="benben_tabsfd1_0-content">
            <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex flex align-center justify-around">
                        <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '1', 'flex flex-wrap align-center': true }"
                @tap="tabs = '1'"
                :id="`benben_tabsfd1_0-title-item-${'1'}`"
                
                
              >
                
<text   >{{$t('抬头管理')}}</text>

              </view>            <view 
                :class="{ 'checkTitlefd1_0_babdd': tabs == '2', 'flex flex-wrap align-center': true }"
                @tap="tabs = '2'"
                :id="`benben_tabsfd1_0-title-item-${'2'}`"
                
                
              >
                
<text   >{{$t('已开发票')}}</text>

              </view>
            </view>
            <view :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth ,}" id="benben_tabsfd1_0-line" class="benben-tabs-line flex benben-flex-tabs-line invoicesManagement_linefd1_0_babdd" :class="{'benben-tabs-line-active':tabsInfofd1_0.isInit}"></view>
          </view>
        </scroll-view>
            
        </benben-flex-tabs>
        
</view>
</view>
        
<!---flex布局flex布局结束-->

 <view class="flex flex-direction align-stretch benben-flex-layout invoicesManagement_flex_2_babdd"   v-if= " tabs=='1'" >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction align-stretch invoicesManagement_fd2_0_babdd'   @tap.stop="handleClickFunc(item.aid)"    :key='key0'>
            <view   class='flex flex-direction align-stretch'      >
            <view   class='flex flex-wrap align-center invoicesManagement_fd2_0_c0_c0_babdd'      >
        <text class='invoicesManagement_fd2_0_c0_c0_c0_babdd'  >{{item.username}}</text>
    <view   class='flex flex-wrap align-center invoicesManagement_fd2_0_c0_c0_c1_babdd'      >
        <text class='invoicesManagement_fd2_0_c0_c0_c1_c0_babdd'    v-if= " item.type=='1'"  >{{$t('个人')}}</text><text class='invoicesManagement_fd2_0_c0_c0_c1_c0_babdd'    v-if= " item.type=='2'"  >{{$t('公司')}}</text>
</view>
</view>
    <view   class='flex flex-wrap align-center invoicesManagement_fd2_0_c0_c1_babdd'      >
        <text class='invoicesManagement_fd2_0_c0_c1_c0_babdd'  >{{$t('联系邮箱')}}</text>
<text class='flex-sub invoicesManagement_fd2_0_c0_c1_c1_babdd'  >{{item.email}}</text>
</view>
    <view   class='flex flex-wrap align-center invoicesManagement_fd2_0_c0_c1_babdd'      >
        <text class='invoicesManagement_fd2_0_c0_c1_c0_babdd'  >{{$t('联系电话')}}</text>
<text class='flex-sub invoicesManagement_fd2_0_c0_c1_c1_babdd'  >{{item.mobile}}</text>
</view>
    <view   class='flex flex-wrap align-center'    v-if= " item.type=='2'"  >
        <text class='invoicesManagement_fd2_0_c0_c1_c0_babdd'  >{{$t('公司税号')}}</text>
<text class='flex-sub invoicesManagement_fd2_0_c0_c1_c1_babdd'  >{{item.tax_number}}</text>
</view>
    <view   class='flex align-center justify-between invoicesManagement_fd2_0_c0_c4_babdd'      >
            <view   class='flex flex-wrap align-center'   @tap.stop="SelectDefaultFunc(item.aid,item.is_default)"   >
        <image class='invoicesManagement_fd2_0_c0_c4_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"448.png"'  v-if= "item.is_default=='1'"></image><image class='invoicesManagement_fd2_0_c0_c4_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"128.png"'  v-if= "item.is_default!='1'"></image>
<text class='invoicesManagement_fd2_0_c0_c4_c0_c1_babdd'  >{{$t('默认发票')}}</text>
</view>
    <view   class='flex flex-wrap align-center'      >
            <view   class='flex flex-wrap align-center'   @tap.stop="getAddressIdFunc(item.aid)"   >
        <image class='invoicesManagement_fd2_0_c0_c4_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"384.png"'  ></image>
<text class='invoicesManagement_fd2_0_c0_c4_c1_c0_c1_babdd'      >{{$t('删除')}}</text>
</view>
    <view   class='flex flex-wrap align-center invoicesManagement_fd2_0_c0_c4_c1_c1_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fp/applyInvoic/applyInvoic?id=${item.aid}&is_edit=1`"   >
        <image class='invoicesManagement_fd2_0_c0_c4_c1_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"385.png"'  ></image>
<text class='invoicesManagement_fd2_0_c0_c4_c1_c0_c1_babdd'      >{{$t('编辑')}}</text>
</view>
</view>
</view>
</view>
</view>
    </template>
    
<benben-empty :list-data="dataList">
<view>
<view class='flex flex-direction flex-wrap align-center invoicesManagement_fd2_1_babdd' >
<image class='invoicesManagement_fd2_1_c0_babdd'  mode="widthFix"  :src='STATIC_URL+"423.png"'></image>

</view>
</view>
</benben-empty>
    <view   class='flex flex-wrap align-center justify-center invoicesManagement_fd2_2_babdd'      >
        <button class='invoicesManagement_fd2_2_c0_babdd'  @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fp/applyInvoic/applyInvoic`"  >{{$t('添加新的抬头')}}</button>
</view>
</view>
        

<benben-popup v-model="popupShow1661425659576" :mask="true" :mask-close-able="true"  mode='center'  >
    <!---删除地址弹窗flex布局开始-->
 <view class="flex flex-direction flex-wrap align-center invoicesManagement_flex_3_babdd"    >
        <text class='invoicesManagement_fd3_0_babdd'  >{{$t('提示')}}</text>
<text class='invoicesManagement_fd3_1_babdd'  >{{$t('确定删除该发票？')}}</text>
    <view   class='flex align-center invoicesManagement_fd3_2_babdd'      >
        <button class='invoicesManagement_fd3_2_c0_babdd'  @tap.stop="popupShow1661425659576=false"  >{{$t('取消')}}</button>
<button class='invoicesManagement_fd3_2_c1_babdd'  @tap.stop="deleteAddressFunc()"  >{{$t('确定')}}</button>
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
			return {"popupShow1661425659576":false,"tabsInfofd1_0":{ lineleft: '', lineWidth: '', moveX: 0, scrollX: 0, PageScrollX: 0, isInit: false },"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,"dataList":[],"address_ids":"",/** switch_id【抛出id】 **/ "switch_id":"","invoiceList":"","tabs":"1",/** RecordList【开票记录】 **/ "RecordList":[],"is_change":""};
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
            this.getTabDataListFunc()
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
                async getListFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.post(global.apiUrls.post641848d371e2f, {
    
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
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
    
    
  let data641ec9d300c00 = await this.$api.post(global.apiUrls.post641ec9d300c00, {
    aid:this.address_ids
  });
  
  if (data641ec9d300c00.data.code != 1) {
    this.$message.info(data641ec9d300c00.data.msg);
    return
  } 
  let info641ec9d300c00 = data641ec9d300c00.data;
  
  
    this.popupShow1661425659576 = false;
                    this.getListFunc()
                    uni.showToast({
                        title:this.$t('删除成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                },
                //选择默认
                async SelectDefaultFunc(defaulitID,defaulitid){
                        if( defaulitid!='1'){
            //请求方法
    //数据验证
    
    
  let data647efc94037dd = await this.$api.post(global.apiUrls.post647efc94037dd, {
    aid:defaulitID
  });
  
  if (data647efc94037dd.data.code != 1) {
    this.$message.info(data647efc94037dd.data.msg);
    return
  } 
  let info647efc94037dd = data647efc94037dd.data;
  
  
                    uni.showToast({
                        title:this.$t('设置成功'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                    this.getListFunc()
    }
                },
                //获取开票记录
                 getRecordListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post66f22e1c95f85;
                this.pageingListApiMethod = 'post';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {}
                this.listData = [];
                this.RecordList = this.listData;
                this.pagingListToggle();
                
                },
                //获取tabs数据
                 getTabDataListFunc(){
                        if( this.tabs=='1'){
                            this.getListFunc()
    }
    else{
                            this.getRecordListFunc()
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
            background:#F8F8F8;background-size: 100% auto;
            .invoicesManagement_flex_3_babdd{
        margin:0rpx 105rpx 0rpx 105rpx;background:#fff;background-size:#eee;border-radius:25rpx 25rpx 25rpx 25rpx;padding:40rpx 0rpx 0rpx 0rpx;
        .invoicesManagement_fd3_0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:500;line-height:45rpx;
    }    .invoicesManagement_fd3_1_babdd{
        font-size:32rpx;font-weight:400;line-height:52rpx;color:var(--benbenFontColor0);margin:40rpx 40rpx 39rpx 40rpx;text-align:center;
    }    .invoicesManagement_fd3_2_babdd{
        border-top:1px solid #eee;
        .invoicesManagement_fd3_2_c0_babdd{
        border-radius:0rpx 0rpx 0rpx 16rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor1);border-right:1px solid var(--benbenbdColor0);height:110rpx;line-height:110rpx;width:270rpx;
    }    .invoicesManagement_fd3_2_c1_babdd{
        line-height:110rpx;border-radius:0rpx 0rpx 16rpx 0rpx;font-size:32rpx;background:var(--benbenbtnColor1);color:var(--benbenFontColor0);width:270rpx;height:110rpx;
    }}}
    .invoicesManagement_flex_2_babdd{
        margin:0rpx 0rpx 20rpx 0rpx;border-top:1px solid #F6F7F9;padding:0rpx 0rpx 150rpx 0rpx;
        .invoicesManagement_fd2_0_babdd{
        padding:30rpx 32rpx 20rpx 32rpx;background:var(--benbenbgColor1);background-size:100% auto !important;border-bottom:1px solid #eee;margin:0rpx 0rpx 20rpx 0rpx;
        .invoicesManagement_fd2_0_c0_c0_babdd{
        margin:0rpx 0rpx 24rpx 0rpx;
        .invoicesManagement_fd2_0_c0_c0_c0_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:600;color:var(--benbenFontColor0);max-width:290rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .invoicesManagement_fd2_0_c0_c0_c1_babdd{
        border-radius:4rpx 4rpx 4rpx 4rpx;background:var(--benbenbtnColor2);padding:4rpx 10rpx 2rpx 10rpx;margin:0rpx 0rpx 0rpx auto;
    }}    .invoicesManagement_fd2_0_c0_c4_babdd{
        padding:26rpx 0rpx 0rpx 0rpx;margin:28rpx 0rpx 0rpx 0rpx;border-top:1px solid #eee;
        .invoicesManagement_fd2_0_c0_c4_c0_c1_babdd{
        line-height:32rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);
    }    .invoicesManagement_fd2_0_c0_c4_c1_c1_babdd{
        margin:0rpx 0rpx 0rpx 67rpx;
    }}}    .invoicesManagement_fd2_1_babdd{
        width:100%;padding:50rpx 0rpx 50rpx 0rpx;
        .invoicesManagement_fd2_1_c0_babdd{
        width:400rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}    .invoicesManagement_fd2_2_babdd{
        width:750rpx;position:fixed;left:0rpx;bottom:calc(40rpx + var(--benben-window-bottom,0px));
        .invoicesManagement_fd2_2_c0_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:32rpx;background:var(--benbenbtnColor0);color:rgba(255, 255, 255, 1);width:686rpx;height:88rpx;line-height:88rpx;font-weight:400;
    }}}
    .invoicesManagement_fd2_0_c0_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:22rpx;font-weight:400;line-height:30rpx;
    }
    .invoicesManagement_fd2_0_c0_c1_babdd{
        margin:0rpx 0rpx 16rpx 0rpx;
    }
    .invoicesManagement_fd2_0_c0_c1_c0_babdd{
        color:var(--benbenFontColor1);font-size:28rpx;font-weight:400;line-height:40rpx;margin:0rpx 24rpx 0rpx 0rpx;
    }
    .invoicesManagement_fd2_0_c0_c1_c1_babdd{
        color:var(--benbenFontColor1);font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .invoicesManagement_fd2_0_c0_c4_c0_c0_babdd{
        width:36rpx;height:36rpx;margin:0rpx 14rpx 0rpx 0rpx;
    }
    .invoicesManagement_fd2_0_c0_c4_c1_c0_c0_babdd{
        width:30rpx;height:30rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 12rpx 0rpx 0rpx;
    }
    .invoicesManagement_fd2_0_c0_c4_c1_c0_c1_babdd{
        line-height:28rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);
    }
    .checkTitlefd1_0_babdd{
        font-weight:700 !important;font-size:28rpx !important;color:var(--benbenFontColor0) !important;background-color:rgba(255, 255, 255, 1) !important;
    }
    .invoicesManagement_linefd1_0_babdd{
        width:40rpx;height:6rpx;top:80rpx;background:var(--benbenbgColor7);background-size:100% auto !important;border-radius:16rpx;
    }
    .invoicesManagement_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .invoicesManagement_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .invoicesManagement_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .invoicesManagement_fd0_0_c0_babdd{
        width:180rpx;
        .invoicesManagement_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
    ::v-deep .invoicesManagement_benbenTabsfd1_0_babdd{
        height:90rpx;white-space:nowrap;background:var(--benbenbgColor1);text-align:center;
    }
</style>