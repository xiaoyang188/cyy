<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-wrap align-center justify-between benben-position-layout flex detailsComment_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center detailsComment_fd0_0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <image class='detailsComment_fd0_0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"278.png"'></image>
</view>
<text class='detailsComment_fd0_1_babdd'  >{{$t('评论详情')}}</text>
    <view   class='flex flex-wrap align-center detailsComment_fd0_0_babdd'      >
        </view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout detailsComment_flex_1_babdd"    >
            <view   class='flex flex-direction flex-wrap align-stretch detailsComment_fd1_0_babdd'      >
            <view   class='flex flex-wrap align-center detailsComment_fd1_0_c0_babdd'      >
        <image class='detailsComment_fd1_0_c0_c0_babdd'  mode="aspectFill"  :src='dataDetails.goods_comment_detail.avatar'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub detailsComment_fd1_0_c0_c1_babdd'      >
            <view   class='flex flex-wrap align-center justify-between'      >
        <text class='detailsComment_fd1_0_c0_c1_c0_c0_babdd'  >{{dataDetails.goods_comment_detail.nickname}}</text>
<text class='detailsComment_fd1_0_c0_c1_c0_c1_babdd'  >{{dataDetails.goods_comment_detail.create_time}}</text>
</view>
<view class='flex flex-wrap align-center'  >
    <template v-for="starNum in [1,2,3,4,5]">
        <image v-if="dataDetails.goods_comment_detail.star >= starNum" :key="starNum"  class='detailsComment_star1fd1_0_c0_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"428.png"'></image>
        <image v-else :key="starNum"  class='detailsComment_star1fd1_0_c0_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"294.png"'></image>
    </template>
</view>
</view>
</view>
<text class='detailsComment_fd1_0_c1_babdd'  >{{dataDetails.goods_comment_detail.content}}</text>
    <view   class='flex flex-wrap align-center detailsComment_fd1_0_c2_babdd'      >
            <template v-for = '(item,key0) in dataDetails.goods_comment_detail.thumb'>
    <view   class='flex flex-wrap align-center'       :key='key0'>
        <image class='detailsComment_fd1_0_c2_c0_c0_babdd'  mode="aspectFill"  :src='item' @tap="multiImagePreview(item,dataDetails.goods_comment_detail.thumb,'')" ></image>
</view>
    </template>
    
</view>
    <view   class='flex flex-wrap align-center justify-between detailsComment_fd1_0_c3_babdd'      >
        <text class='detailsComment_fd1_0_c0_c1_c0_c1_babdd'    v-if= " dataDetails.goods_comment_detail.key_name!='null'"  >{{dataDetails.goods_comment_detail.key_name}}</text>
    <view   class='flex flex-wrap align-center detailsComment_fd1_0_c3_c1_babdd'   @tap.stop="conmentLikeFunc(gc_id)"   >
        <text class='detailsComment_fd1_0_c3_c1_c0_babdd'    v-if= " dataDetails.goods_comment_detail.is_likes=='1' && dataDetails.goods_comment_detail.likes_num>0"  >{{dataDetails.goods_comment_detail.likes_num}}</text><text class='detailsComment_fd1_0_c3_c1_c0_1_babdd'    v-if= " dataDetails.goods_comment_detail.likes_num==0"  >{{$t('点赞')}}</text><text class='detailsComment_fd1_0_c3_c1_c0_1_babdd'    v-if= " dataDetails.goods_comment_detail.likes_num>0 && dataDetails.goods_comment_detail.is_likes==0"  >{{dataDetails.goods_comment_detail.likes_num}}</text>
<image class='detailsComment_fd1_0_c3_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"493.png"'  v-if= "dataDetails.goods_comment_detail.is_likes=='1'"></image><image class='detailsComment_fd1_0_c3_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"94.png"'  v-if= "dataDetails.goods_comment_detail.is_likes=='0'"></image>
</view>
</view>
</view>
    <view   class='flex flex-wrap align-center detailsComment_fd1_1_babdd'      >
        </view>
    <view   class='flex flex-wrap align-center detailsComment_fd1_2_babdd'    v-if= " dataDetails.goods_comment_reply_list.data.length>0"  >
        <image class='detailsComment_fd1_2_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"494.png"'></image>
<text class='detailsComment_fd1_2_c1_babdd'  >{{dataDetails.goods_comment_reply_list.total}}</text>
<text class='detailsComment_fd1_2_c2_babdd'  >{{$t('条回复')}}</text>
</view>
    <template v-for = '(item,key0) in dataDetails.goods_comment_reply_list.data'>
    <view   class='flex flex-wrap align-start detailsComment_fd1_3_babdd'       :key='key0'>
        <image class='detailsComment_fd1_0_c0_c0_babdd'  mode="aspectFill"  :src='item.avatar'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub detailsComment_fd1_0_c0_c1_babdd'      >
        <text class='detailsComment_fd1_0_c0_c1_c0_c0_babdd'  >{{item.nickname}}</text>
<text class='detailsComment_fd1_3_c1_c1_babdd'  >{{item.create_time}}</text>
<text class='detailsComment_fd1_3_c1_c2_babdd'  >{{item.content}}</text>
</view>
</view>
    </template>
    
<benben-empty :list-data="dataDetails.goods_comment_reply_list.data">
<view>
<view class='flex flex-direction flex-wrap align-center detailsComment_fd1_4_babdd' >
<image class='detailsComment_fd1_4_c0_babdd'  mode="widthFix"  :src='STATIC_URL+"423.png"'></image>

</view>
</view>
</benben-empty>
    <view   class='flex flex-wrap align-center detailsComment_fd1_5_babdd'      >
            <view   class='flex flex-wrap align-center flex-sub detailsComment_fd1_5_c0_babdd'      >
        <image class='detailsComment_fd1_5_c0_c0_babdd'  mode="aspectFit"  :src='STATIC_URL+"101.png"'></image>
<benben-input class='flex-sub detailsComment_fd1_0_c0_c1_c0_c0_babdd'   type="text" :placeholder="$t('请输入')" confirm-type="done" :maxlength="-1" placeholder-style="color:var(--benbenFontColor1);font-size:28rpx"   v-model="content"  />
</view>
<button class='detailsComment_fd1_5_c1_babdd'  @tap.stop="queryMessageFunc()"  >{{$t('发布')}}</button>
        <benben-safe-area     >
        </benben-safe-area>
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
			return {/** goods_comment_reply_list【回复列表】
*   goods_comment_detail【评论详情】
*   likes_num【点赞数量】
*   is_likes【当前用户是否点赞该条评论】
*   key_name【购买商品规格内容】
*   nickname【评论人昵称】
*   avatar【评论人头像】
*   star【评分】
*   content【评论内容】
*   create_time【评论时间】
*   thumb【评论图片】
*   type【是否匿名 0 否1 是】
*   aid【评论ID】 **/ "dataDetails":{"goods_comment_detail":{"aid":"","type":"","thumb":[],"create_time":"","content":"","star":"","avatar":"","nickname":"","key_name":"","is_likes":"","likes_num":""},"goods_comment_reply_list":{"total":"","per_page":"","current_page":"","last_page":"","data":[]}},"content":"",/** is_collection【是否点赞 0 否 1 是】 **/ "dataBack":{"is_collection":""},"keyHeight":"","gc_id":"62"};
		},
		computed:{
                         isLogin() {
      return this.$store.state.token == '' ? false : true;
    }
		},
		watch:{},
		onLoad(options){
            let {gc_id}=options
if (gc_id !== undefined) this.gc_id = gc_id
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
            this.queryDetailsFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //点赞
                async conmentLikeFunc(id){
                        if( this.isLogin===true){
            //请求方法
    //数据验证
    
    
  let datadataBack = await this.$api.dbPost(global.apiUrls.post641ae9cf8abed, {
    gc_id:id
  });
  if(!datadataBack) return
  if (datadataBack.data.code != 1) {
    this.$message.info(datadataBack.data.msg);
    return
  } 
  let infodataBack = datadataBack.data;
  this.dataBack = infodataBack.data
  
                    this.queryDetailsFunc()
    }
    else{
                            uni.showToast({
                        title:this.$t('请先登录'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                this.toLoginDiy();
    }
                },
                //商品评论-回复评论
                async queryMessageFunc(){
                        if( this.isLogin===true){
                    if(!validate(this.content,'require')){
                 this.$message.info(this.$t('请输入评论'));
                 return false;
            }
    if(this.content.trim()==''){
						this.$message.info('请输入评论');
						return false;
					}
    //请求方法
    //数据验证
    
    
  let data641ae6a3510c7 = await this.$api.get(global.apiUrls.post641ae6a3510c7, {
    gc_id:this.gc_id,content:this.content
  });
  
  if (data641ae6a3510c7.data.code != 1) {
    this.$message.info(data641ae6a3510c7.data.msg);
    return
  } 
  let info641ae6a3510c7 = data641ae6a3510c7.data;
  
  
    this.$message.info(data641ae6a3510c7.data.msg);

   this.content = '';
                    this.queryDetailsFunc()
    }
    else{
                            uni.showToast({
                        title:this.$t('请先登录'),
                        mask:true,
                        icon:'none',
                        duration: 1500
                    });
                this.toLoginDiy();
    }
                },
                //商品评论-获取单条评论详情
                async queryDetailsFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataDetails = await this.$api.get(global.apiUrls.post641ae646bde4a, {
    gc_id:this.gc_id
  });
  
  if (datadataDetails.data.code != 1) {
    this.$message.info(datadataDetails.data.msg);
    return
  } 
  let infodataDetails = datadataDetails.data;
  this.dataDetails = infodataDetails.data
  
                uni.$emit('detailsComment',this.dataDetails)
                },
                //获取焦点，拿到键盘高度
                 handleKeyboardChangeFunc(){
                        this.keyHeight=e.detail.height
        if(this.keyHeight>0){
          this.keyHeightStyle=`position:fixed;bottom:${this.keyHeight}px;`
        }
                },
                //失去焦点清除键盘高度
                 cancelKeyBoadrFunc(){
                        this.keyHeight=0
         this.keyHeightStyle=`position:fixed;bottom:${this.keyHeight}px;`
                }
		}
    };
</script> 
<style lang="scss" scoped>
           .page{
            width: 100vw;
            overflow-x: hidden;
            min-height: calc(100vh - var(--benben-window-bottom,0px));
            background:var(--benbenbgColor1);background-size: 100% auto;
            .detailsComment_flex_1_babdd{
        margin:0rpx 0rpx 130rpx 0rpx;
        .detailsComment_fd1_0_babdd{
        padding:0rpx 32rpx 0rpx 28rpx;
        .detailsComment_fd1_0_c0_babdd{
        margin:0rpx 0rpx 0rpx 4rpx;padding:32rpx 0rpx 24rpx 0rpx;
    }    .detailsComment_fd1_0_c1_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:400;line-height:40rpx;margin:0rpx 0rpx 0rpx 4rpx;
    }    .detailsComment_fd1_0_c2_babdd{
        margin:32rpx 0rpx 12rpx 0rpx;
        .detailsComment_fd1_0_c2_c0_c0_babdd{
        width:226rpx;height:226rpx;border-radius:8rpx 8rpx 8rpx 8rpx;margin:0rpx 0rpx 20rpx 4rpx;
    }}    .detailsComment_fd1_0_c3_babdd{
        margin:0rpx 0rpx 0rpx 4rpx;padding:20rpx 0rpx 29rpx 0rpx;
        .detailsComment_fd1_0_c3_c1_babdd{
        margin:0rpx 0rpx 0rpx auto;
        .detailsComment_fd1_0_c3_c1_c0_babdd{
        color:var(--benbenFontColor5);font-size:22rpx;font-weight:400;line-height:33rpx;
    }}}}    .detailsComment_fd1_1_babdd{
        background:var(--benbenbgColor5);background-size:100% auto !important;height:20rpx;
    }    .detailsComment_fd1_2_babdd{
        padding:32rpx 0rpx 24rpx 0rpx;border-bottom:1px solid rgba(238, 238, 238, 1);margin:0rpx 32rpx 0rpx 32rpx;
        .detailsComment_fd1_2_c0_babdd{
        width:32rpx;height:30rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }    .detailsComment_fd1_2_c1_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:500;line-height:45rpx;margin:0rpx 0rpx 0rpx 16rpx;
    }    .detailsComment_fd1_2_c2_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:600;line-height:45rpx;
    }}    .detailsComment_fd1_3_babdd{
        margin:32rpx 0rpx 40rpx 0rpx;padding:0rpx 32rpx 0rpx 32rpx;
    }    .detailsComment_fd1_4_babdd{
        width:100%;padding:50rpx 0rpx 50rpx 0rpx;
        .detailsComment_fd1_4_c0_babdd{
        width:400rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }}    .detailsComment_fd1_5_babdd{
        position:fixed;bottom:calc(0rpx + var(--benben-window-bottom,0px));left:0rpx;width:750rpx;padding:10rpx 0rpx 40rpx 0rpx;background:var(--benbenbgColor1);background-size:100% auto;
        .detailsComment_fd1_5_c0_babdd{
        border-radius:36rpx 36rpx 36rpx 36rpx;background:var(--benbenbgColor0);padding:16rpx 32rpx 16rpx 32rpx;margin:0rpx 32rpx 0rpx 32rpx;
        .detailsComment_fd1_5_c0_c0_babdd{
        width:26rpx;height:24rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 8rpx 0rpx 0rpx;
    }}    .detailsComment_fd1_5_c1_babdd{
        border-radius:44rpx 44rpx 44rpx 44rpx;font-size:24rpx;background:var(--benbenbtnColor0);color:var(--benbenFontColor3);width:104rpx;height:48rpx;line-height:48rpx;margin:0rpx 32rpx 0rpx 0rpx;
    }}}
    .detailsComment_fd1_0_c0_c0_babdd{
        width:56rpx;height:56rpx;border-radius:28rpx 28rpx 28rpx 28rpx;
    }
    .detailsComment_fd1_0_c0_c1_babdd{
        margin:0rpx 0rpx 0rpx 16rpx;
        .detailsComment_star1fd1_0_c0_c1_c1_babdd{
        height:18rpx;margin:0rpx 5rpx 0rpx 5rpx;width:18rpx;
    }}
    .detailsComment_fd1_0_c0_c1_c0_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .detailsComment_fd1_0_c0_c1_c0_c1_babdd{
        color:var(--benbenFontColor2);font-size:24rpx;font-weight:400;line-height:33rpx;
    }
    .detailsComment_fd1_0_c3_c1_c0_1_babdd{
        color:var(--benbenFontColor0);font-size:22rpx;font-weight:400;line-height:33rpx;
    }
    .detailsComment_fd1_0_c3_c1_c1_babdd{
        width:24rpx;height:26rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 21rpx;
    }
    .detailsComment_fd1_3_c1_c1_babdd{
        color:var(--benbenFontColor1);font-size:22rpx;font-weight:400;line-height:30rpx;margin:0rpx 0rpx 16rpx 0rpx;
    }
    .detailsComment_fd1_3_c1_c2_babdd{
        color:var(--benbenFontColor1);font-size:28rpx;font-weight:400;line-height:40rpx;
    }
    .detailsComment_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .detailsComment_fd0_1_babdd{
        color:var(--benbenFontColor0);font-size:36rpx;font-weight:600;line-height:50rpx;
    }}
    .detailsComment_fd0_0_babdd{
        width:100rpx;height:88rpx;
        .detailsComment_fd0_0_c0_babdd{
        width:20rpx;height:36rpx;border-radius:0rpx 0rpx 0rpx 0rpx;margin:0rpx 0rpx 0rpx 32rpx;
    }}}
</style>