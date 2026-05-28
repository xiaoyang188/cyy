<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch benben-position-layout flex chooseLogisticsCompany_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between chooseLogisticsCompany_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center chooseLogisticsCompany_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  chooseLogisticsCompany_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='chooseLogisticsCompany_fd0_0_c1_c0_babdd'  >{{$t('选择物流公司')}}</text>
</view>
    <view   class='flex align-center justify-end chooseLogisticsCompany_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout chooseLogisticsCompany_flex_1_babdd"    >
            <benben-select-diy ref="showSelectPopup1657262172219" class-text='flex-direction align-stretch flex'   :items.sync="dataList" v-model="logistics.logistics_id" :label.sync="logistics.logistics_name" @change="throwLogisticsFunc()" default-type="aid" default-label="name" :allow-cancel='true' type="radio" :disabled='false'  >
    <benben-select-item v-for = '(item,key0) in dataList' :hand-value='item.aid' :key='key0'>
        <template #selected>    <view   class='flex align-center justify-between flex chooseLogisticsCompany_fd1_0_c0_babdd'      >
        <text class='chooseLogisticsCompany_fd1_0_c0_c0_babdd'  >{{item.name}}</text>
<image class='chooseLogisticsCompany_fd1_0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"448.png"'></image>
</view>
</template><template #no-selected>    <view   class='flex align-center justify-between flex chooseLogisticsCompany_fd1_0_c0_babdd'      >
        <text class='chooseLogisticsCompany_fd1_0_c0_c0_babdd'  >{{item.name}}</text>
<image class='chooseLogisticsCompany_fd1_0_c0_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"128.png"'></image>
</view>
</template></benben-select-item></benben-select-diy>
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
			return {"logistics":{"logistics_id":"","logistics_name":""},"logistics_type":[{"name":"协作快递韵达","value":"1","image":""},{"name":"协作快递韵达","value":"2","image":""}],"logistics_id":"","dataList":[]};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {logistics_id}=options
if (logistics_id !== undefined) this.logistics_id = logistics_id
this.getLogisticsFunc()
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
            this.getLogisticsFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //抛出
                 throwLogisticsFunc(){
                                    uni.$emit('logistics',this.logistics)
            this.$urouter.navigateBack(1);
                },
                //获取物流公司
                async getLogisticsFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.post(global.apiUrls.post6427e3a822643, {
    
  });
  
  if (datadataList.data.code != 1) {
    this.$message.info(datadataList.data.msg);
    return
  } 
  let infodataList = datadataList.data;
  this.dataList = infodataList.data
  
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
            .chooseLogisticsCompany_flex_1_babdd{
        padding:0rpx 24rpx 0rpx 24rpx;
    }
    .chooseLogisticsCompany_fd1_0_c0_babdd{
        padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid #eee;
    }
    .chooseLogisticsCompany_fd1_0_c0_c0_babdd{
        font-size:32rpx;font-weight:400;color:var(--benbenFontColor0);
    }
    .chooseLogisticsCompany_fd1_0_c0_c1_babdd{
        width:32rpx;height:32rpx;
    }
    .chooseLogisticsCompany_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor0);background-size:100% auto !important;
        .chooseLogisticsCompany_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .chooseLogisticsCompany_fd0_0_c0_babdd{
        width:200rpx;
        .chooseLogisticsCompany_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:var(--benbeniconColor1);font-weight:500;
    }}    .chooseLogisticsCompany_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);
    }    .chooseLogisticsCompany_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:200rpx;
    }}}}
</style>