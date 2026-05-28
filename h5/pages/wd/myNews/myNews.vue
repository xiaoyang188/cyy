<template>
    <page-body   >
        <view class="page" >
    <view class="flex align-stretch benben-position-layout flex myNews_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex align-center justify-between flex-sub myNews_fd0_0_babdd'      >
            <view   class='flex align-center myNews_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  myNews_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex align-center'      >
        <text class='myNews_fd0_0_c1_c0_babdd'  >{{$t('我的消息')}}</text>
</view>
    <view   class='flex align-center myNews_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>

 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout"    >
            <view   class='flex flex-direction align-stretch myNews_fd1_0_babdd'      >
            <template v-for = '(item,key0) in dataList'>
    <view   class='flex align-center myNews_fd1_0_c0_babdd'   @tap.stop="goListFunc(item.msg_type)" v-if= " item.msg_type!='1'"   :key='key0'>
            <view   class='flex flex-wrap align-center myNews_fd1_0_c0_c0_babdd'      >
        <image class='myNews_fd1_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"327.png"'  v-if= " item.msg_type=='3'"></image><image class='myNews_fd1_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"328.png"'  v-if= " item.msg_type=='2'"></image>
        <benben-message-num class='myNews_fd1_0_c0_c0_c1_babdd'  :message-num="item.num" size='20' color='#fff' background-color='red'  >
        </benben-message-num>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub myNews_fd1_0_c0_c1_babdd'      >
            <view   class='flex flex-wrap align-center myNews_fd1_0_c0_c1_c0_babdd'      >
        <text class='flex-sub myNews_fd1_0_c0_c1_c0_c0_babdd'  >{{item.name}}</text>
<text class='myNews_fd1_0_c0_c1_c0_c1_babdd'  >{{item.create_time}}</text>
</view>
<text class='myNews_fd1_0_c0_c1_c1_babdd'  >{{item.content}}</text>
</view>
</view>
    </template>
    
</view>
<!--     <view   class='flex flex-wrap align-center myNews_fd1_1_babdd'      >
        </view>
 --><!--     <view   class='flex flex-direction align-stretch myNews_fd1_0_babdd'      >
            <template v-for = '(item,key0) in chatList'>
    <view   class='flex align-center myNews_fd1_2_c0_babdd'   @tap.stop="getChatMessageFunc(item.store_id)"    :key='key0'>
            <view   class='flex flex-wrap align-center myNews_fd1_0_c0_c0_babdd'      >
        <image class='myNews_fd1_0_c0_c0_c0_babdd'  mode="aspectFit"  :src='item.head_img'></image>
        <benben-message-num class='myNews_fd1_0_c0_c0_c1_babdd'  :message-num="item.user_noread" size='20' color='#fff' background-color='red'  >
        </benben-message-num>
</view>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub myNews_fd1_0_c0_c1_babdd'      >
            <view   class='flex flex-wrap align-center myNews_fd1_0_c0_c1_c0_babdd'      >
        <text class='flex-sub myNews_fd1_0_c0_c1_c0_c0_babdd'  >{{item.nickname}}</text>
<text class='myNews_fd1_0_c0_c1_c0_c1_babdd'  >{{item.create_time}}</text>
</view>
<text class='myNews_fd1_0_c0_c1_c1_babdd'  >{{item.content}}</text>
</view>
</view>
    </template>
    
</view>
 --></view>
        

    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {"dataList":[],"chatList":[],/** chat_url【客服链接】 **/ "chatMessage":{"chat_url":""}};
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
            this.getMessageListFunc()
this.getChatFunc()
		},
		onHide(){
            
            
		},
		onResize(){
            
		},
		onPullDownRefresh(){
            this.getMessageListFunc()
this.getChatFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //跳转页面
                 goListFunc(type){
                        if( type=='2'){
            this.$urouter.navigateTo(`/pages/wd/orderMessages/orderMessages?id=2`);
    }
    else if( type=='3'){
            this.$urouter.navigateTo(`/pages/wd/platformAnnouncement/platformAnnouncement`);
    }
                },
                //获取聊天列表
                async getChatFunc(){
                        //请求方法
    //数据验证
    
    
  let datachatList = await this.$api.post(global.apiUrls.post649aa4a3eba00, {
    
  });
  
  if (datachatList.data.code != 1) {
    this.$message.info(datachatList.data.msg);
    return
  } 
  let infochatList = datachatList.data;
  this.chatList = infochatList.data
  
                },
                //获取客服链接
                async getChatMessageFunc(store_id){
                        //请求方法
    //数据验证
    
    
  let datachatMessage = await this.$api.get(global.apiUrls.post64897f6fd5486, {
    store_id:store_id
  });
  
  if (datachatMessage.data.code != 1) {
    this.$message.info(datachatMessage.data.msg);
    return
  } 
  let infochatMessage = datachatMessage.data;
  this.chatMessage = infochatMessage.data
  
    this.dynamicJump(this.chatMessage.chat_url);
                },
                //系统消息-获取消息类型+最新消息
                async getMessageListFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataList = await this.$api.get(global.apiUrls.post649a96d7625ae, {
    
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
            .myNews_fd1_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto;
        .myNews_fd1_0_c0_babdd{
        margin:0rpx 32rpx 0rpx 32rpx;
    }}
    .myNews_fd1_0_c0_c0_babdd{
        position:relative;
    }
    .myNews_fd1_0_c0_c0_c0_babdd{
        width:90rpx;height:90rpx;border-radius:45rpx 45rpx 45rpx 45rpx;
    }
    .myNews_fd1_0_c0_c0_c1_babdd{
        position:absolute;top:0rpx;right:0rpx;
    }
    .myNews_fd1_0_c0_c1_babdd{
        margin:0rpx 0rpx 0rpx 24rpx;padding:32rpx 0rpx 32rpx 0rpx;border-bottom:1px solid var(--benbenbdColor0);
    }
    .myNews_fd1_0_c0_c1_c0_babdd{
        margin:0rpx 0rpx 17rpx 0rpx;
    }
    .myNews_fd1_0_c0_c1_c0_c0_babdd{
        line-height:40rpx;font-size:28rpx;font-weight:500;color:var(--benbenFontColor0);-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }
    .myNews_fd1_0_c0_c1_c0_c1_babdd{
        line-height:28rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor2);margin:0rpx 0rpx 0rpx 24rpx;
    }
    .myNews_fd1_0_c0_c1_c1_babdd{
        line-height:33rpx;font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }
    .myNews_fd1_1_babdd{
        border-radius:0rpx 0rpx 0rpx 0rpx;background:var(--benbenbgColor0);width:750rpx;height:20rpx;
    }
    .myNews_fd1_2_c0_babdd{
        margin:0rpx 032rpx 0rpx 32rpx;
    }
    .myNews_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .myNews_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .myNews_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:500;color:var(--benbenFontColor0);
    }}}
    .myNews_fd0_0_c0_babdd{
        width:180rpx;
        .myNews_fd0_0_c0_c0_babdd{
        font-size:32rpx;font-weight:500;color:var(--benbeniconColor1);
    }}}
</style>