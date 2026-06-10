<template>
    <page-body   >
        <view class="page" >
    <view class="flex benben-position-layout flex flex-wrap align-center suitInfo_flex_0_babdd"    :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
            <view   class='flex flex-wrap align-center justify-between flex-sub suitInfo_fd0_0_babdd'      >
            <view   class='flex flex-wrap align-center suitInfo_fd0_0_c0_babdd'   @tap="handleJumpDiy" data-type="back" data-url="1"   >
        <text class='fu-iconfont2  suitInfo_fd0_0_c0_c0_babdd'  >&#xE794;</text>
</view>
    <view   class='flex flex-wrap align-stretch justify-center'      >
        <text class='suitInfo_fd0_0_c1_c0_babdd'  >{{$t('套餐详情')}}</text>
</view>
    <view   class='flex flex-wrap align-center justify-end suitInfo_fd0_0_c0_babdd'      >
        </view>
</view>

        </view>
<view :style="{height: (88+StatusBarRpx)+'rpx'}"  ></view>
<!---flex布局flex布局开始-->
 <view class="flex flex-direction align-stretch benben-flex-layout"    >
        <image class='suitInfo_fd1_0_babdd'  mode="aspectFill"  :src='STATIC_URL+"718.png"'></image>
    <view   class='flex flex-wrap align-center suitInfo_fd1_1_babdd'      >
            
    <scroll-view  class='suitInfo_fd1_1_c0_babdd'  :scroll-x='true' :scroll-y='false' :show-scrollbar='false'      :enhanced="true">
        <view class='flex benben-scroll flex align-center' >
                <benben-select-diy ref="showSelectPopup1715584158795" class-text='flex'      default-type="package_id" default-label="package_name" :allow-cancel='false' type="radio" :disabled='false'  >
    <benben-select-item>
        <template #selected>    <view   class='flex flex suitInfo_fd1_1_c0_c0_c0_babdd'      >
        <image class='suitInfo_fd1_1_c0_c0_c0_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+""'></image>
</view>
</template><template #no-selected>    <view   class='flex flex suitInfo_fd1_1_c0_c0_c0_babdd'      >
        <image class='suitInfo_fd1_1_c0_c0_c1_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+"718.png"'></image>
</view>
</template></benben-select-item></benben-select-diy>
</view>
    </scroll-view>
    
</view>
    <view   class='flex flex-direction align-stretch suitInfo_fd1_2_babdd'      >
        <text class='suitInfo_fd1_2_c0_babdd'  >{{$t('固定套餐')}}</text>
<text class='suitInfo_fd1_2_c1_babdd'  >{{$t('这是文字')}}</text>
</view>
    <view   class='flex flex-direction align-stretch suitInfo_fd1_3_babdd'      >
        <text class='suitInfo_fd1_3_c0_babdd'  >{{$t('套餐商品')}}</text>
    <view   class='flex flex-direction align-stretch'      >
            <view   class='flex align-center suitInfo_fd1_3_c1_c0_babdd'      >
        <image class='suitInfo_fd1_3_c1_c0_c0_babdd'  mode="aspectFill"  :src='STATIC_URL+""'></image>
    <view   class='flex flex-direction align-stretch self-center justify-between flex-sub suitInfo_fd1_3_c1_c0_c1_babdd'      >
        <text class='suitInfo_fd1_3_c1_c0_c1_c0_babdd'  >{{$t('这是文字')}}</text>
<text class='suitInfo_fd1_3_c1_c0_c1_c1_babdd'  >{{$t('这是文字')}}</text>
    <view   class='flex flex-wrap align-center suitInfo_fd1_3_c1_c0_c1_c2_babdd'      >
        <text class='suitInfo_fd1_3_c1_c0_c1_c2_c0_babdd'  >￥</text>
<text class=' suitInfo_fd1_3_c1_c0_c1_c2_c1_babdd'   >
    <text class=' suitInfo_price1_fd1_3_c1_c0_c1_c2_c1_babdd' >{{ 100 | frontPrice }}</text><text class=' suitInfo_price2_fd1_3_c1_c0_c1_c2_c1_babdd' >{{ 100 | laterPrice }}</text>
</text>
    <view   class='flex flex-wrap align-center suitInfo_fd1_3_c1_c0_c1_c2_c2_babdd'      >
        <text   >￥</text>
<text   >100</text>
</view>
    <view   class='flex flex-wrap align-center suitInfo_fd1_3_c1_c0_c1_c2_c3_babdd'      >
        <text class='suitInfo_fd1_3_c1_c0_c1_c2_c3_c0_babdd'  >x</text>
<text   >1</text>
</view>
</view>
</view>
</view>
</view>
</view>
</view>
        
<!---flex布局flex布局结束-->
        <benben-specs-popup ref="specsPopup1715596036469" class='suitInfo_flex_specs_2_babdd' price-name='shop_price' >
        </benben-specs-popup>
    <view class="flex flex-direction align-stretch benben-position-layout flex suitInfo_flex_3_babdd"    >
            <view   class='flex align-center justify-between suitInfo_fd3_0_babdd'      >
            <view   class='flex flex-wrap align-center'      >
        <text class='suitInfo_fd3_0_c0_c0_babdd'  >{{$t('套餐价:')}}</text>
<text class='suitInfo_fd3_0_c0_c1_babdd'  >￥</text>
<text class=' suitInfo_fd3_0_c0_c2_babdd'   >
    <text class=' suitInfo_price1_fd3_0_c0_c2_babdd' >{{ 100 | frontPrice }}</text><text class=' suitInfo_price2_fd3_0_c0_c2_babdd' >{{ 100 | laterPrice }}</text>
</text>
</view>
    <view   class='flex flex-wrap align-center'      >
        <button class='suitInfo_fd3_0_c1_c0_babdd'  @tap="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/sy/offerPay/offerPay`"  >{{$t('立即购买')}}</button>
</view>
</view>
        <benben-safe-area></benben-safe-area>
        </view>
    
    
        </view>
    </page-body>
</template>
<script>
    import {validate} from '@/common/utils/validate.js'
    
    export default {
        components:{},
        
        
        data(){
			return {/** package_goods【套餐中已包含商品信息】
*   group_config【自由购商品列表】
*   add_cart【是否可加入购物车】
*   intro【简介】
*   image【主图】
*   type【套餐类型】
*   package_id【套餐ID】
*   package_name【套餐名称】
*   price【套餐默认价格】 **/ "dataList":{"price":"","package_name":"","package_id":"","type":"","image":"","intro":"","add_cart":"","group_config":[],"package_goods":[]},"itemId":"","itemName":"","items":{"price":0,"package_name":"","package_id":0,"type":"","image":"","intro":"","add_cart":0,"package_goods":[],"group_config":[]},/** discount_str【会员折扣说明】
*   payable_money【应付金额】
*   all_discount_money【总计会员折扣金额】
*   express_price【运费】
*   coupon_money【优惠券金额】
*   coupon_usable_num【优惠券数量】
*   order_money【订单金额】
*   shop_express【	商家运费】
*   list【商家列表】
*   has_address【是否有收货地址】
*   address【地址】
*   is_default【是否默认】
*   label_name【标签】
*   sex【性别】
*   district【区】
*   city【市】
*   province【省】
*   detail【详细地址】
*   mobile【手机号】
*   real_name【联系人】
*   aid【地址主键】 **/ "dataMessage":{"address":{"aid":"","member_id":"","uid":"","sort":"","is_del":"","status":"","user_id":"","real_name":"","mobile":"","detail":"","province":"","province_id":"","city":"","city_id":"","district":"","district_id":"","sex":"","label_name":"","is_default":"","lng":"","lat":"","address_code":"","address_code_province":"","address_code_city":"","address_code_district":""},"has_address":"","list":[],"shop_express":"","order_money":"","coupon_usable_num":"","coupon_money":"","express_price":"","order_type":"","all_discount_money":"","payable_money":"","discount_str":"","list_fail":"","coupon_search":{"moeny":"","category":[],"goods":[]}},"skuData":{"goods_id":0,"goods_name":"","goods_thumb":"","market_price":"","shop_price":"","is_check":0,"sku_key":"","sku_id":0,"sku_key_name":"","spec_list":[],"sku_list":{"714_716":{"sku_id":0,"key":"","key_name":"","member_price":"","shop_price":"","market_price":"","stock":0},"714_717":{"sku_id":0,"key":"","key_name":"","member_price":"","shop_price":"","market_price":"","stock":0},"715_716":{"sku_id":0,"key":"","key_name":"","member_price":"","shop_price":"","market_price":"","stock":0}},"limit_num":"","stock":"","num":""},"skuId":"","skuName":"","num":0,"ids":[],"countPrice":0,"name":"服装搭配","goods_id":"","package_id":"55"};
		},
		computed:{
            
		},
		watch:{},
		onLoad(options){
            let {name,goods_id,package_id}=options
if (name !== undefined) this.name = name
if (goods_id !== undefined) this.goods_id = goods_id
if (package_id !== undefined) this.package_id = package_id
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
            
            
                            //获取套餐列表
                async getDataListFunc(){
                        if (this.goods_id) {
          let datadataList = await this.$api.get(global.apiUrls.post663ede1389efe, {
            goods_id: this.goods_id
          });

          if (datadataList.data.code != 1) {
            this.$message.info(datadataList.data.msg);
            return
          }
          let infodataList = datadataList.data;
          this.dataList = infodataList.data
          //给数据列表里添加一项num用于进步起绑定
          this.dataList.forEach(item => {
            if (item.package_goods.length > 0) {
              item.package_goods.forEach(it => {
                it.num = 0
              })
            }
            if (item.group_config.length > 0) {
              item.group_config.forEach(it => {
                it.goods.forEach(i => {
                  i.num = 0
                  i.is_check = true
                })
              })
            }
          })
          //防止套餐id缺失
          if (this.package_id != '') {
            this.dataList.forEach(it => {
              if (it.package_id == this.package_id) {
                this.items = it
                this.itemId = this.package_id
              }
            })
          } else {
            this.items = this.dataList[0]
            this.itemId = this.dataList[0].package_id
          }
          if (this.items.package_goods.length > 0) {
            this.items.package_goods.forEach(item => {
              this.ids.push(item.goods_id)
            })
          }
        } else {
          let datadataList = await this.$api.get(global.apiUrls.post667faa8bae7a0, {
            package_id: this.package_id
          });

          if (datadataList.data.code != 1) {
            this.$message.info(datadataList.data.msg);
            return
          }
          let infodataList = datadataList.data;
          this.dataList = infodataList.data
          //给数据列表里添加一项num用于进步起绑定
          if (this.dataList.package_goods.length > 0) {
            this.dataList.package_goods.forEach(it => {
              it.num = 0
            })
          }
          if (this.dataList.group_config.length > 0) {
            this.dataList.group_config.forEach(it => {
              it.goods.forEach(i => {
                i.num = i.limit_num
                i.is_check = true
              })
            })
          }

          this.items = this.dataList
          this.itemId = this.dataList.package_id
          if (this.items.package_goods.length > 0) {
            this.items.package_goods.forEach(item => {
              this.ids.push(item.goods_id)
              item.num=item.limit_num
            })
          }
        }
                },
                //切换套餐
                 changeSuitFunc(e){
                        this.countPrice = 0;
this.ids = []
this.dataList.forEach(item => {
  if (item.package_id == e.label) {
    this.items = item
  }
})
if(this.items.package_goods.length>0){
  this.items.package_goods.forEach(item=>{
    this.ids.push(item.goods_id)
  })
}
                },
                //套餐加入购物车
                 addCartFunc(){
                        var orderInfo = []
if (this.items.type == '1') {
  this.items.package_goods.forEach(item => {
    this.$api.post(global.apiUrls.post6412f82acb5ba, {
      goods_id: item.goods_id,
      num: item.num,
      sku_id: item.sku_id,
      package_id: this.itemId
    });
  })
  uni.showToast({
    title: '添加成功',
    mask: true,
    icon: 'none',
    duration: 1500
  });
} else {
  if (this.ids.length <= 0) {
    uni.showToast({
      title: '请选择套餐商品',
      mask: true,
      icon: 'none',
      duration: 1500
    });
    return;
  }
  if (this.items.package_goods.length > 0) {
    this.items.package_goods.forEach(item => {
      this.ids.forEach(it => {
        if (item.goods_id == it) {
          orderInfo.push(item)
        }
      })
    })
  }
  if (this.items.group_config.length > 0) {
    this.items.group_config.forEach(item => {
      item.goods.forEach(i => {
        this.ids.forEach(it => {
          if (i.goods_id == it) {
            orderInfo.push(i)
          }
        })
      })
    })
  }
  var exceed = true;
  var required = true;
  //限购数量校验
  this.items.group_config.forEach(item => {
    var goodsNum = 0;
    item.goods.forEach(i => {
      this.ids.forEach(it => {
        if (i.goods_id == it) {
          goodsNum += (i.num - 0)
          if (goodsNum > item.num) {
            uni.showToast({
              title: `${item.group_name}限购${item.num}件`,
              mask: true,
              icon: 'none',
              duration: 1500
            });
            exceed = false
            return;
          }
        }
      })
    })
    //必选校验
    if (item.choose == '1' && goodsNum == 0) {
      uni.showToast({
        title: `${item.group_name}套餐必选`,
        mask: true,
        icon: 'none',
        duration: 1500
      });
      required = false
      return;
    }
  })
  //限购数量，必选校验通过
  if (exceed && required) {
    var newItemsInfo = orderInfo
    newItemsInfo.forEach(item => {
      this.$api.post(global.apiUrls.post6412f82acb5ba, {
        goods_id: item.goods_id,
        num: item.num,
        sku_id: item.sku_id,
        package_id: this.itemId
      });

    })
    uni.showToast({
      title: '添加成功',
      mask: true,
      icon: 'none',
      duration: 1500
    });
  }
}
                },
                //预下单
                 submitOrderFunc(){
                        var orderInfo = []
if (this.items.type == '1') {
  uni.setStorageSync('suitOrderInfo', this.items.package_goods);
  this.$urouter.navigateTo(`/pages/ddgl/directOrder/directOrder?package_id=${this.itemId}`);
} else {
  if (this.ids.length <= 0) {
    uni.showToast({
      title: '请选择套餐商品',
      mask: true,
      icon: 'none',
      duration: 1500
    });
    return;
  }
  this.items.package_goods.forEach(item => {
    this.ids.forEach(it => {
      if (item.goods_id == it) {
        orderInfo.push(item)
      }
    })
  })
  this.items.group_config.forEach(item => {
    item.goods.forEach(i => {
      this.ids.forEach(it => {
        if (i.goods_id == it) {
          orderInfo.push(i)
        }
      })
    })
  })
  var newItemsInfo = orderInfo
  var exceed = true;
  var required = true;
  //限购数量校验
  this.items.group_config.forEach(item => {
    var goodsNum = 0;
    item.goods.forEach(i => {
      this.ids.forEach(it => {
        if (i.goods_id == it) {
          goodsNum += (i.num - 0)
          if (goodsNum > item.num) {
            uni.showToast({
              title: `${item.group_name}限购${item.num}件`,
              mask: true,
              icon: 'none',
              duration: 1500
            });
            exceed = false
            return;
          }
        }
      })
    })
    //必选校验
    if (item.choose == '1' && goodsNum == 0) {
      uni.showToast({
        title: `${item.group_name}套餐必选`,
        mask: true,
        icon: 'none',
        duration: 1500
      });
      required = false
      return;
    }
  })
  //必选校验通过，限购数量检验通过
  if (exceed && required) {

    uni.setStorageSync('suitOrderInfo', newItemsInfo);
    // console.log('数据正常');
    this.$urouter.navigateTo(`/pages/ddgl/directOrder/directOrder?package_id=${this.itemId}`);
  }
}
                },
                //多规格选择规格
                 selecetSkuFunc(item){
                        this.skuData = item;
this.$nextTick(() => {
  this.$refs.specsPopup1715596036469.open('confirm');
})
                },
                //选中/取消选中
                 changeSuitIdFunc(id,item,is_check){
                        if(is_check==false) return;
var slctNum =0;
//如果ids为空直接添加
if (this.ids.length == 0) {
  this.ids.push(id)
  //单商品重置显示价格
  if (this.items.package_goods.length > 0) {
    this.items.package_goods.forEach((it, idx) => {
      if (this.ids.includes(it.goods_id)) {
        this.countPrice = (it.shop_price - 0) * it.num
      }
    })
  }
  if (this.items.group_config.length > 0) {
    this.items.group_config.forEach((it, idx) => {
      it.goods.forEach(i => {
        if (this.ids.includes(i.goods_id)) {
          this.countPrice = (i.shop_price - 0) * i.num
        }
      })

    })
  }
} else {
  //如果ids里存在id进行截取，并计算价格
  if (this.ids.includes(id)) {
    this.ids.forEach((itemid, index) => {
      if (itemid == id) {
        if (this.items.package_goods.length > 0) {
          this.items.package_goods.forEach((it, idx) => {
            if (it.goods_id == id) {
              uni.showToast({
                title: '包含商品不能取消',
                mask: true,
                icon: 'none',
                duration: 1500
              });
            }
          })
        }
        if (this.items.group_config.length > 0) {
          this.items.group_config.forEach((it, idx) => {
            it.goods.forEach(i => {
              if (i.goods_id == id) {
                this.countPrice -= (i.shop_price - 0) * i.num
                this.ids.splice(index, 1)
                slctNum-=(i.num-0)

                if(slctNum>=item.num){
                  item.goods.forEach(it=>{
                    if(!this.ids.includes(it.goods_id)){
                      it.is_check=false;
                    }
                  })
                }else {
                  item.goods.forEach(it=>{
                    it.is_check=true;
                  })
                }
              }
            })
          })

        }
      }
    })
    return;
  } else {
    //如果ids不存在id进行添加，并计算价格
    this.countPrice = 0
    //如果限购数量等于1，进行反选
    if(item.num==1){
      item.goods.forEach((item,index)=>{
        this.ids.forEach((it,idx)=>{
          if(it==item.goods_id){
            this.ids.splice(idx,1,id)
          }
        })
      })
    }
    //判断如果id不在ids里再进行添加防止重复
    if(!this.ids.includes(id)){
      this.ids.push(id)
    }
    //限购数量大于1，需要判断选择数量是否等于限购数量，
    //等于 需要把其他商品禁选
    if(item.num>1){
      item.goods.forEach((d,index)=>{
        this.ids.forEach((it,idx)=>{
          if(it==d.goods_id){
            slctNum+=(d.num-0)
          }
        })

      })
      if(slctNum>=item.num){
        item.goods.forEach(it=>{
          if(!this.ids.includes(it.goods_id)){
            it.is_check=false;
          }
        })
      }else {
        item.goods.forEach(it=>{
          it.is_check=true;
        })
      }

    }
    if (this.items.package_goods.length > 0) {
      this.items.package_goods.forEach((it, idx) => {
        if (this.ids.includes(it.goods_id)) {
          this.countPrice += (it.shop_price - 0) * it.num
        }
      })
    }
    if (this.items.group_config.length > 0) {
      this.items.group_config.forEach((it, idx) => {
        it.goods.forEach(i => {
          if (this.ids.includes(i.goods_id)) {
            this.countPrice += (i.shop_price - 0) * i.num
          }
        })

      })
    }

  }
}
                },
                //购物车确定
                 cartConfirmFunc(){
                        this.countPrice = 0;
//用页面显示数据，替换列表数据 ，达到数据统一
this.dataList.forEach((item, index) => {
  if (item.package_id == this.items.package_id) {
    if (item.package_goods.length > 0) {
      item.package_goods.forEach((it, idx) => {
        if (it.goods_id == this.skuData.goods_id) {
          it = this.skuData
        }
      })
    }
    if (item.group_config.length > 0) {
      item.group_config.forEach((it, idx) => {
        it.goods.forEach(i => {
          if (i.goods_id == this.skuData.goods_id) {
            i = this.skuData
          }
        })

      })
    }

  }
})
//选择规格后重新计算价格
if (this.items.package_goods.length > 0) {
  this.items.package_goods.forEach(it => {
    this.countPrice += (it.shop_price - 0) * it.num
  })
}
if (this.items.group_config.length > 0) {
  this.items.group_config.forEach(it => {
    it.goods.forEach(i => {
      if(this.ids.includes(i.goods_id)){
        this.countPrice += (i.shop_price - 0) * i.num
      }
    })
  })
}
                this.$refs.specsPopup1715596036469.close();
                },
                //改变数量重新计算价格
                 changeNumFunc(id,child,item){
                        if(!child.is_check) return;
//商品未选中，给它选中
if (!this.ids.includes(id)) {
  this.ids.push(id)
}
this.countPrice = 0
//选中商品计算价格
if (this.items.package_goods.length > 0) {
  this.items.package_goods.forEach(it => {
    if (this.ids.includes(it.goods_id)) {
      this.countPrice += (it.shop_price - 0) * it.num
    }
  })
}
var goodsNum=0;
if (this.items.group_config.length > 0) {
  //如果商品的数量等于分类限购数禁用选择其他商品
  item.goods.forEach(it => {
    if(this.ids.includes(it.goods_id)){
      goodsNum+=(it.num-0)
    }

    // if (child.num == item.num && it.goods_id != id) {
    // 	it.is_check = false;
    // 	//删除选择的其他商品
    // 	this.ids.forEach((d, x) => {
    // 		if (d == it.goods_id) {
    // 			this.ids.splice(x, 1)
    // 		}
    // 	})
    // }
  })
  if (goodsNum >= item.num) {
    item.goods.forEach(it => {
      if (!this.ids.includes(it.goods_id)) {
        it.is_check = false;
      }
    })
  } else {
    item.goods.forEach(it => {
      it.is_check = true;
    })
  }
  this.items.group_config.forEach(it => {
    it.goods.forEach(i => {
      if (this.ids.includes(i.goods_id)) {
        this.countPrice += (i.shop_price - 0) * i.num
      }
    })
  })
}
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
            .suitInfo_flex_3_babdd{
        width:750rpx;z-index:10;bottom:calc(0rpx + var(--benben-window-bottom,0px));background:var(--benbenbgColor1);background-size:100% auto;
        .suitInfo_fd3_0_babdd{
        background:var(--benbenbgColor1);background-size:100% auto;padding:20rpx 24rpx 50rpx 24rpx;
        .suitInfo_fd3_0_c0_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:600;
    }    .suitInfo_fd3_0_c0_c1_babdd{
        color:var(--benbenFontColor5);font-size:24rpx;
    }    .suitInfo_fd3_0_c0_c2_babdd{
        color:var(--benbenFontColor5);font-weight:600;
        .suitInfo_price1_fd3_0_c0_c2_babdd{
        font-size:32rpx;
    }    .suitInfo_price2_fd3_0_c0_c2_babdd{
        font-size:28rpx;
    }}    .suitInfo_fd3_0_c1_c0_babdd{
        border-radius:40rpx;width:180rpx;line-height:70rpx;font-size:24rpx;background:var(--benbenbtnColor0);color:#fff;margin:0rpx 0rpx 0rpx 20rpx;
    }}}
    .suitInfo_flex_specs_2_babdd{
        --active-sku-tag-color:var(--benbenFontColor4);--sku-tag-color:var(--benbenFontColor0);--sku-tag-bg:var(--benbenbgColor2);--cart-btn-bg:var(--benbenbgColor3);--buy-btn-bg:var(--benbenbtnColor4);--confirm-btn-bg:var(--benbenbgColor3);
    }
    .suitInfo_fd1_0_babdd{
        width:750rpx;height:750rpx;border-radius:0rpx 0rpx 0rpx 0rpx;
    }
    .suitInfo_fd1_1_babdd{
        background:var(--benbenbgColor1);background-size:100% auto;padding:24rpx 24rpx 0rpx 24rpx;
        .suitInfo_fd1_1_c0_babdd{
        touch-action:none;width:100%;
    }}
    .suitInfo_fd1_1_c0_c0_c0_babdd{
        margin:0rpx 10rpx 0rpx 0rpx;
        .suitInfo_fd1_1_c0_c0_c0_c0_babdd{
        width:150rpx;height:150rpx;border-radius:16rpx;border:2px solid var(--benbenbdColor2);
    }}
    .suitInfo_fd1_1_c0_c0_c1_c0_babdd{
        width:150rpx;height:150rpx;border-radius:16rpx;
    }
    .suitInfo_fd1_2_babdd{
        background:var(--benbenbgColor1);background-size:100% auto;padding:24rpx 24rpx 24rpx 24rpx;
        .suitInfo_fd1_2_c0_babdd{
        color:var(--benbenFontColor0);font-size:32rpx;font-weight:700;
    }    .suitInfo_fd1_2_c1_babdd{
        color:var(--benbenFontColor6);font-size:28rpx;margin:20rpx 0rpx 0rpx 0rpx;
    }}
    .suitInfo_fd1_3_babdd{
        margin:10rpx 0rpx 200rpx 0rpx;padding:24rpx 24rpx 24rpx 24rpx;background:var(--benbenbgColor1);background-size:100% auto;
        .suitInfo_fd1_3_c0_babdd{
        color:var(--benbenFontColor0);font-size:30rpx;font-weight:600;margin:0rpx 0rpx 24rpx 0rpx;
    }    .suitInfo_fd1_3_c1_c0_babdd{
        margin:0rpx 0rpx 24rpx 0rpx;height:200rpx;
        .suitInfo_fd1_3_c1_c0_c0_babdd{
        width:170rpx;height:170rpx;border-radius:16rpx;margin:0rpx 20rpx 0rpx 0rpx;
    }    .suitInfo_fd1_3_c1_c0_c1_babdd{
        height:170rpx;
        .suitInfo_fd1_3_c1_c0_c1_c0_babdd{
        color:var(--benbenFontColor0);font-size:28rpx;font-weight:600;-webkit-line-clamp:2;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;
    }    .suitInfo_fd1_3_c1_c0_c1_c1_babdd{
        color:var(--benbenFontColor6);font-size:24rpx;
    }    .suitInfo_fd1_3_c1_c0_c1_c2_babdd{
        margin:0rpx 0rpx 0rpx 0rpx;
        .suitInfo_fd1_3_c1_c0_c1_c2_c0_babdd{
        color:var(--benbenFontColor5);
    }    .suitInfo_fd1_3_c1_c0_c1_c2_c1_babdd{
        color:var(--benbenFontColor5);font-weight:600;
        .suitInfo_price1_fd1_3_c1_c0_c1_c2_c1_babdd{
        font-size:32rpx;
    }    .suitInfo_price2_fd1_3_c1_c0_c1_c2_c1_babdd{
        font-size:28rpx;
    }}    .suitInfo_fd1_3_c1_c0_c1_c2_c2_babdd{
        text-decoration:line-through;color:var(--benbenFontColor2);font-size:24rpx;margin:0rpx 0rpx 0rpx 12rpx;line-height:28rpx;
    }    .suitInfo_fd1_3_c1_c0_c1_c2_c3_babdd{
        margin:0rpx 0rpx 0rpx auto;padding:7rpx;border-radius:5rpx;background:rgba(248, 248, 248, 1);background-size:100% auto;color:var(--benbenFontColor2);
        .suitInfo_fd1_3_c1_c0_c1_c2_c3_c0_babdd{
        margin:0rpx 0rpx 0rpx auto;
    }}}}}}
    .suitInfo_flex_0_babdd{
        width:750rpx;height:88rpx;overflow:hidden;z-index:10;top:0rpx;background:#fff;background-size:100% auto !important;
        .suitInfo_fd0_0_babdd{
        padding:0rpx 32rpx 0rpx 32rpx;
        .suitInfo_fd0_0_c1_c0_babdd{
        font-size:36rpx;font-weight:700;color:var(--benbenFontColor0);line-height:50rpx;
    }}}
    .suitInfo_fd0_0_c0_babdd{
        width:120rpx;
        .suitInfo_fd0_0_c0_c0_babdd{
        font-size:36rpx;color:#333;
    }}}
</style>