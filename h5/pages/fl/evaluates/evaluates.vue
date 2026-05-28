<template>
    <page-body   >
        <view class="page" >
    <view class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex evaluates_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-stretch justify-between evaluates_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center evaluates_fd0_0_c0_babdd'   @tap.stop="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  evaluates_fd0_0_c0_c0_babdd'  >&#xe794;</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <text class='evaluates_fd0_0_c1_c0_babdd'  >{{$t('全部评价')}}</text>
</view>
    <view   class='flex align-center justify-end evaluates_fd0_0_c2_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---全部评论flex布局开始-->
 <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout evaluates_flex_1_babdd"    >
            <view   class='flex flex-direction flex-wrap align-stretch evaluates_fd1_0_babdd'      >
            <benben-select-diy ref="showSelectPopup1667036742877" class-text='flex-wrap align-center flex'   :items.sync="dataTbas" v-model="evaluateID" :label.sync="evaluateLable" @change="getListFunc()" default-type="type_name" default-label="type_title" :allow-cancel='false' type="radio" :disabled='false'  v-if= "dataTbas.length!='0'">
    <benben-select-item v-for = '(item,key0) in dataTbas' :hand-value='item.type_name' :key='key0'>
        <template #selected>    <view   class='flex align-center justify-center flex evaluates_fd1_0_c0_c0_babdd'      >
        <text class='evaluates_fd1_0_c0_c0_c0_babdd'  >{{item.type_title}}</text>
<text class='evaluates_fd1_0_c0_c0_c1_babdd'  >{{item.type_count}}</text>
</view>
</template><template #no-selected>    <view   class='flex align-center justify-center flex evaluates_fd1_0_c0_c1_babdd'      >
        <text class='evaluates_fd1_0_c0_c1_c0_babdd'  >{{item.type_title}}</text>
<text class='evaluates_fd1_0_c0_c1_c1_babdd'  >{{item.type_count}}</text>
</view>
</template></benben-select-item></benben-select-diy>
</view>
    <view   class='flex flex-wrap align-center evaluates_fd1_1_babdd'      >
        </view>
    <template v-for = '(item,key0) in dataList'>
    <view   class='flex flex-direction flex-wrap align-stretch evaluates_fd1_2_babdd'   @tap.stop="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/fl/detailsComment/detailsComment?gc_id=${item.aid}`"    :key='key0'>
            <view   class='flex flex-wrap align-start flex-sub evaluates_fd1_2_c0_babdd'      >
        <image class='evaluates_fd1_2_c0_c0_babdd'  mode="aspectFill"  :src='item.avatar'></image>
    <view   class='flex flex-direction flex-wrap align-stretch flex-sub'      >
            <view   class='flex flex-wrap align-center justify-between evaluates_fd1_2_c0_c1_c0_babdd'      >
        <text class='evaluates_fd1_2_c0_c1_c0_c0_babdd'  >{{item.nickname}}</text>
<text class='evaluates_fd1_2_c0_c1_c0_c1_babdd'  >{{item.create_time}}</text>
</view>
<view class='flex flex-wrap align-center'  >
    <template v-for="starNum in [1,2,3,4,5]">
        <image v-if="item.star >= starNum" :key="starNum"  class='evaluates_star1fd1_2_c0_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"428.png"'></image>
        <image v-else :key="starNum"  class='evaluates_star1fd1_2_c0_c1_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"294.png"'></image>
    </template>
</view>
</view>
</view>
<text class='evaluates_fd1_2_c1_babdd'  >{{item.content}}</text>
    <view   class='flex flex-wrap align-center evaluates_fd1_2_c2_babdd'      >
            <template v-for = '(child,key1) in item.thumb'>
    <view   class='flex flex-wrap align-center evaluates_fd1_2_c2_c0_babdd'       :key='key1'>
        <image class='evaluates_fd1_2_c2_c0_c0_babdd'  mode="aspectFill"  :src='child' @tap.stop="multiImagePreview(child,item.thumb,'')" ></image>
</view>
    </template>
    
</view>
    <view   class='flex flex-wrap align-center evaluates_fd1_2_c3_babdd'      >
        <text class='evaluates_fd1_2_c3_c0_babdd'  >{{item.key_name}}</text>
<text class='evaluates_fd1_2_c3_c1_babdd'    v-if= " item.reply_num==0"  >{{$t('评论')}}</text><text class='evaluates_fd1_2_c3_c1_1_babdd'    v-if= " item.reply_num>0"  >{{item.reply_num}}</text>
<image class='evaluates_fd1_2_c3_c2_babdd'  mode="aspectFit"  :src='STATIC_URL+"76.png"'></image>
    <view   class='flex align-end justify-end evaluates_fd1_2_c3_c3_babdd'   @tap.stop="dianzanFunc(item)"   >
        <text class='evaluates_fd1_2_c3_c3_c0_babdd'    v-if= " item.likes_num==0"  >{{$t('点赞')}}</text><text class='evaluates_fd1_2_c3_c3_c0_1_babdd'    v-if= " item.likes_num>0 && item.is_likes==0"  >{{item.likes_num}}</text><text class='evaluates_fd1_2_c3_c3_c0_2_babdd'    v-if= " item.likes_num>0 && item.is_likes=='1'"  >{{item.likes_num}}</text>
<image class='evaluates_fd1_2_c3_c3_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"94.png"'  v-if= "item.is_likes=='0'"></image><image class='evaluates_fd1_2_c3_c3_c1_babdd'  mode="aspectFit"  :src='STATIC_URL+"493.png"'  v-if= "item.is_likes=='1'"></image>
</view>
</view>
</view>
    </template>
    <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
</view>
        
<!---全部评论flex布局结束-->
    
    
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
			return {"minixPagingListsApi":"","pageingListApiMethod":"","allowOnloadGetList":false,/** evaluateID【评价】 **/ "evaluateID":"all","evaluateLable":"","evaluate":[],"dataList":[],"dataTbas":[],"id":"346"};
		},
		computed:{
                         isLogin() {
      return this.$store.state.token == '' ? false : true;
    },
              userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set(value) {
        this.$store.commit('updateUserInfo', value)
      },
    }
		},
		watch:{},
		onLoad(options){
            let {id}=options
if (id !== undefined) this.id = id
this.diyPageListen()
		},
        onUnload() {
            this.diyOffPageListen()    
        },
		onReady(){
            
		},
		onShow(){
            this.getTypeFunc()
		},
		onHide(){
            
            
		},
		onResize(){
            
		},
		onPullDownRefresh(){
            this.getListFunc()
		},
		onReachBottom(e){
            
		},
		onPageScroll(e){
            
		},
		methods:{
            
            
                            //点赞
                async dianzanFunc(item){
                    if (this.isLogin == true) {
          let data641ae9cf8abed = await this.$api.post(global.apiUrls.post641ae9cf8abed, {
            gc_id: item.aid,
          })
          if (data641ae9cf8abed.data.code != 1) {
            this.$message.info(data641ae9cf8abed.data.msg)
            return
          }
          //手动更新
          if (item.is_likes) {
            this.$set(item, 'likes_num', --item.likes_num)
            this.getTypesssFunc()
          } else {
            this.$set(item, 'likes_num', ++item.likes_num)
            this.getTypesssFunc()
          }
          this.$set(item, 'is_likes', !item.is_likes)
        } else {
          this.$message.info(global.i18n.t('请先登录'))
          this.toLoginDiy();
        }
                },
                //商品评论-获取评论列表头部tab
                async getTypeFunc(){
                        //请求方法
    //数据验证
    
    
  let datadataTbas = await this.$api.get(global.apiUrls.post641ae5b3d5bba, {
    goods_id:this.id
  });
  
  if (datadataTbas.data.code != 1) {
    this.$message.info(datadataTbas.data.msg);
    return
  } 
  let infodataTbas = datadataTbas.data;
  this.dataTbas = infodataTbas.data
  
                    this.getListFunc()
                },
                //获取评价列表
                 getListFunc(){
                                    this.minixPagingListsApi = global.apiUrls.post641ad7c486389;
                this.pageingListApiMethod = 'aGet';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {goods_id:this.id,user_id:this.userInfo.id,star_type:this.evaluateID}
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
                
                },
                //监听点赞/评论
                 ListenlikeCommentsFunc(data){
                        var obj = this.dataList.find(e => e.aid == data.goods_comment_detail.aid)
                if (obj) {
                    obj.likes_num = data.goods_comment_detail.likes_num
                    obj.is_likes = data.goods_comment_detail.is_likes
                    if(data.goods_comment_reply_list.data.length>0){
            obj.reply_num = data.goods_comment_reply_list.total
          }
                }
                },
                //点赞更新顶部数据
                async getTypesssFunc(){
                        let datadataTbas = await this.$api.get(global.apiUrls.post641ae5b3d5bba, {
	      goods_id: this.id
	    });
	  
	    if (datadataTbas.data.code != 1) {
	      this.$message.info(datadataTbas.data.msg);
	      return
	    }
	    let infodataTbas = datadataTbas.data;
	    this.dataTbas[5].type_count = infodataTbas.data[5].type_count
                },
                pagingListPostData(){
                    return this.pagingListPostDataContent
                },
    //页面监听
    diyPageListen() {
                  uni.$on('detailsComment',(data) => {
                                   this.ListenlikeCommentsFunc(data)
          });
    }                     ,
    //注销页面监听
    diyOffPageListen() {
                     uni.$off('detailsComment');
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
            .evaluates_flex_1_babdd{
        padding:24rpx 0rpx 0rpx 0rpx;
        .evaluates_fd1_0_babdd{
        padding:0rpx 16rpx 16rpx 16rpx;
        .evaluates_fd1_0_c0_c0_babdd{
        margin:12rpx 8rpx 12rpx 8rpx;height:56rpx;border-radius:28rpx 28rpx 28rpx 28rpx;border:1px solid var(--benbenbdColor2);background:var(--benbenbgColor1);padding:0rpx 25rpx 0rpx 25rpx;
        .evaluates_fd1_0_c0_c0_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor4);line-height:40rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;text-align:center;
    }    .evaluates_fd1_0_c0_c0_c1_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor4);line-height:40rpx;-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;text-align:center;margin:0rpx 0rpx 0rpx 10rpx;
    }}    .evaluates_fd1_0_c0_c1_babdd{
        margin:12rpx 8rpx 12rpx 8rpx;height:56rpx;border-radius:28rpx 28rpx 28rpx 28rpx;background:var(--benbenbgColor0);padding:0rpx 25rpx 0rpx 25rpx;border:1px solid rgba(248, 248, 248, 1);
        .evaluates_fd1_0_c0_c1_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;text-align:center;line-height:40rpx;
    }    .evaluates_fd1_0_c0_c1_c1_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);-webkit-line-clamp:1;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;text-align:center;line-height:40rpx;margin:0rpx 0rpx 0rpx 10rpx;
    }}}    .evaluates_fd1_1_babdd{
        background:var(--benbenbgColor0);background-size:100% auto !important;height:20rpx;
    }    .evaluates_fd1_2_babdd{
        padding:32rpx 0rpx 0rpx 0rpx;
        .evaluates_fd1_2_c0_babdd{
        margin:0rpx 32rpx 24rpx 32rpx;
        .evaluates_fd1_2_c0_c0_babdd{
        width:56rpx;height:56rpx;border-radius:28rpx 28rpx 28rpx 28rpx;margin:0rpx 16rpx 0rpx 0rpx;
    }    .evaluates_fd1_2_c0_c1_c0_babdd{
        margin:0rpx 0rpx 8rpx 0rpx;
        .evaluates_fd1_2_c0_c1_c0_c0_babdd{
        font-size:28rpx;font-weight:400;color:var(--benbenFontColor0);
    }    .evaluates_fd1_2_c0_c1_c0_c1_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor1);
    }}    .evaluates_star1fd1_2_c0_c1_c1_babdd{
        height:18rpx;margin:0rpx 5rpx 0rpx 5rpx;width:18rpx;
    }}    .evaluates_fd1_2_c1_babdd{
        margin:0rpx 32rpx 16rpx 32rpx;font-size:28rpx;font-weight:400;color:var(--benbenFontColor1);
    }    .evaluates_fd1_2_c2_babdd{
        margin:0rpx 0rpx 0rpx 32rpx;
        .evaluates_fd1_2_c2_c0_babdd{
        margin:0rpx 4rpx 24rpx 0rpx;
        .evaluates_fd1_2_c2_c0_c0_babdd{
        width:226rpx;height:226rpx;border-radius:8rpx 8rpx 8rpx 8rpx;
    }}}    .evaluates_fd1_2_c3_babdd{
        margin:8rpx 32rpx 0rpx 32rpx;border-bottom:1px solid var(--benbenbdColor1);padding:0rpx 0rpx 32rpx 0rpx;
        .evaluates_fd1_2_c3_c0_babdd{
        font-size:24rpx;font-weight:400;color:var(--benbenFontColor2);line-height:33rpx;
    }    .evaluates_fd1_2_c3_c1_babdd{
        font-size:22rpx;font-weight:400;color:var(--benbenFontColor1);line-height:30rpx;vertical-align:baseline;margin:0rpx 0rpx 0rpx auto;
    }    .evaluates_fd1_2_c3_c1_1_babdd{
        font-size:22rpx;font-weight:400;color:#000000;line-height:30rpx;vertical-align:baseline;margin:0rpx 0rpx 0rpx auto;
    }    .evaluates_fd1_2_c3_c2_babdd{
        width:26rpx;height:24rpx;margin:0rpx 36rpx 0rpx 8rpx;
    }    .evaluates_fd1_2_c3_c3_babdd{
        margin:0rpx 0rpx 4rpx 0rpx;
        .evaluates_fd1_2_c3_c3_c0_babdd{
        font-size:22rpx;font-weight:400;color:var(--benbenFontColor1);line-height:24rpx;margin:0rpx 8rpx 0rpx 0rpx;
    }    .evaluates_fd1_2_c3_c3_c0_1_babdd{
        font-size:22rpx;font-weight:400;color:#333;line-height:24rpx;margin:0rpx 8rpx 0rpx 0rpx;
    }    .evaluates_fd1_2_c3_c3_c0_2_babdd{
        font-size:22rpx;font-weight:400;color:var(--benbenFontColor5);line-height:24rpx;margin:0rpx 8rpx 0rpx 0rpx;
    }}}}}
    .evaluates_fd1_2_c3_c3_c1_babdd{
        width:24rpx;height:26rpx;
    }
    .evaluates_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:var(--benbenbgColor1);background-size:100% auto !important;
        .evaluates_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;line-height:88rpx;
        .evaluates_fd0_0_c0_babdd{
        width:150rpx;
        .evaluates_fd0_0_c0_c0_babdd{
        font-size:32rpx;color:#333;
    }}    .evaluates_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:600;color:var(--benbenFontColor0);line-height:50rpx;
    }    .evaluates_fd0_0_c2_babdd{
        padding:0rpx 0rpx 0rpx 0rpx;width:150rpx;
    }}}}
</style>