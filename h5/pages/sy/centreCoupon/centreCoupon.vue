<template>
  <page-body>
    <view class="page" :style="{ background: `url(${bgcImg}) no-repeat, #FFF` }">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex centreCoupon_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx', background: `url(${bgcImg}) no-repeat, transparent` }"
      >
        <view class="flex flex-wrap align-center centreCoupon_fd0_0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <image class="centreCoupon_fd0_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '166.png'"></image>
        </view>
        <view class="flex flex-wrap align-center centreCoupon_fd0_0_babdd"></view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout centreCoupon_flex_1_babdd">
        <template v-for="(item, key0) in moneyList">
          <view class="flex flex-direction flex-wrap align-stretch centreCoupon_fd1_0_babdd" :key="key0">
            <view class="flex flex-wrap align-center centreCoupon_fd1_0_c0_babdd">
              <image class="centreCoupon_fd1_0_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '421.png'"></image>
              <view class="flex flex-direction flex-wrap align-stretch flex-sub centreCoupon_fd1_0_c0_c1_babdd">
                <view class="flex flex-wrap align-center">
                  <text class="centreCoupon_fd1_0_c0_c1_c0_c0_babdd">{{ item.name }}</text>
                </view>
                <view class="flex flex-wrap align-center centreCoupon_fd1_0_c0_c1_c1_babdd">
                  <text class="centreCoupon_fd1_0_c0_c1_c1_c0_babdd">{{ $t('有效期至：') }}</text>
                  <text class="centreCoupon_fd1_0_c0_c1_c1_c1_babdd">{{ item.end_time }}</text>
                </view>
              </view>
              <view class="flex flex-wrap align-center">
                <text class="centreCoupon_fd1_0_c0_c2_c0_babdd">{{ $t('￥') }}</text>
                <text class="centreCoupon_fd1_0_c0_c2_c1_babdd">
                  <text class="centreCoupon_price1_fd1_0_c0_c2_c1_babdd">{{ item.money | frontPrice }}</text>
                  <text class="centreCoupon_price2_fd1_0_c0_c2_c1_babdd">{{ item.money | laterPrice }}</text>
                </text>
              </view>
            </view>
            <view class="flex flex-wrap align-center justify-between centreCoupon_fd1_0_c1_babdd">
              <view class="flex flex-direction">
                <text class="flex-sub centreCoupon_fd1_0_c1_c0_babdd">{{ item.content }}</text>
                <text v-if="item.receive_toplimit !== undefined && item.receive_toplimit !== null" class="centreCoupon_fd1_0_c1_limit_babdd">
                  {{ $t('已领取') }} {{ Number(item.receive_num || 0) }} / {{ Number(item.receive_toplimit) }}
                </text>
              </view>
              <template v-if="isCouponClaimed(item)">
                <view
                  class="centreCoupon_fd1_0_c1_c1_babdd centreCoupon_fd1_0_c1_c1_claimed_babdd"
                  @tap.stop="handleJumpDiy"
                  data-type="navigateTo"
                  :data-url="`/pages/fl/commodityList/commodityList`"
                >
                  {{ $t('去使用') }}
                </view>
              </template>
              <template v-else>
                <button class="centreCoupon_fd1_0_c1_c1_babdd" :disabled="item._claiming" @tap.stop="ClaimcouponsFunc(item)">
                  {{ item._claiming ? $t('领取中') : $t('立即领取') }}
                </button>
              </template>
            </view>
          </view>
        </template>

        <benben-empty :list-data="moneyList">
          <view>
            <view class="flex flex-direction flex-wrap align-center centreCoupon_fd1_1_babdd">
              <image class="centreCoupon_fd1_1_c0_babdd" mode="widthFix" :src="STATIC_URL + '422.png'"></image>
            </view>
          </view>
        </benben-empty>
      </view>

      <!---flex布局flex布局结束-->
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},

  data() {
    return {
      moneyList: [],
      bgcImg: '',
    }
  },
  computed: {
    userInfo: {
      get() {
        return this.$store.state.userInfo
      },
      set(value) {
        this.$store.commit('updateUserInfo', value)
      },
    },
  },
  watch: {},
  onLoad(options) {
    this.couponListFunc()
    this.getBgcImgFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {
    this.couponListFunc()
  },
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    // 是否已达领取上限
    isCouponClaimed(item) {
      const topLimit = Number(item.receive_toplimit)
      const receiveNum = Number(item.receive_num)
      if (!topLimit) return false
      return receiveNum >= topLimit
    },
    //领券列表
    async couponListFunc() {
      try {
        let datamoneyList = await this.$api.post(global.apiUrls.post641960f31d0f4, {
          method: '2',
          user_id: this.userInfo.id,
        })

        if (!datamoneyList || !datamoneyList.data) {
          this.$message.info(this.$t('网络异常，请重试'))
          return
        }

        if (datamoneyList.data.code != 1) {
          this.$message.info(datamoneyList.data.msg)
          return
        }

        let infomoneyList = datamoneyList.data
        this.moneyList = infomoneyList.data || []
      } catch (err) {
        console.error('couponListFunc error', err)
        this.$message.info(this.$t('获取优惠券列表失败'))
      }
    },
    //领取优惠券
    async ClaimcouponsFunc(item) {
      if (this.isCouponClaimed(item)) return

      // 防止重复点击
      this.$set(item, '_claiming', true)
      try {
        let data64196d6a86d0d = await this.$api.dbPost(global.apiUrls.post64196d6a86d0d, {
          id: item.id,
        })
        if (!data64196d6a86d0d || !data64196d6a86d0d.data) {
          this.$message.info(this.$t('网络异常，请重试'))
          this.$set(item, '_claiming', false)
          return
        }
        if (data64196d6a86d0d.data.code != 1) {
          this.$message.info(data64196d6a86d0d.data.msg)
          this.$set(item, '_claiming', false)
          return
        }

        // 乐观更新已领取数量
        const prev = Number(item.receive_num || 0)
        this.$set(item, 'receive_num', prev + 1)

        uni.showToast({
          title: this.$t('领取成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })

        // 刷新列表以保证数据一致性（可选）
        this.couponListFunc()
      } catch (err) {
        console.error('ClaimcouponsFunc error', err)
        this.$message.info(this.$t('领取失败，请重试'))
      } finally {
        this.$set(item, '_claiming', false)
      }
    },
    //获取背景图
    async getBgcImgFunc() {
      let databgcImg = await this.$api.get(global.apiUrls.post641e624160dd0, {
        type: '22',
      })

      if (databgcImg.data.code != 1) {
        this.$message.info(databgcImg.data.msg)
        return
      }
      let infobgcImg = databgcImg.data
      this.bgcImg = infobgcImg.data[0].thumb
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background-size: 100% auto !important;

  .centreCoupon_flex_1_babdd {
    padding: 360rpx 32rpx 42rpx 32rpx;

    .centreCoupon_fd1_0_babdd {
      background:
        url(#{image-path('420.png')
      }) no-repeat,
        transparent;
      background-size: 100% 100% !important;
      padding: 30rpx 31rpx 30rpx 34rpx;
      margin: 24rpx 0rpx 0rpx 0rpx;

      .centreCoupon_fd1_0_c0_babdd {
        padding: 0rpx 0rpx 14rpx 0rpx;
        border-bottom: 1px dashed rgba(221, 221, 221, 1);

        .centreCoupon_fd1_0_c0_c0_babdd {
          width: 122rpx;
          height: 100rpx;
          border-radius: 0rpx 0rpx 0rpx 0rpx;
        }

        .centreCoupon_fd1_0_c0_c1_babdd {
          margin: 0rpx 0rpx 0rpx 16rpx;

          .centreCoupon_fd1_0_c0_c1_c0_c0_babdd {
            color: var(--benbenFontColor0);
            font-size: 32rpx;
            font-weight: 500;
            line-height: 45rpx;
            -webkit-line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            max-width: 258rpx;
          }

          .centreCoupon_fd1_0_c0_c1_c1_babdd {
            margin: 8rpx 0rpx 0rpx 0rpx;

            .centreCoupon_fd1_0_c0_c1_c1_c0_babdd {
              color: var(--benbenFontColor2);
              font-size: 24rpx;
              font-weight: 400;
              line-height: 33rpx;
            }

            .centreCoupon_fd1_0_c0_c1_c1_c1_babdd {
              color: var(--benbenFontColor2);
              font-size: 24rpx;
              font-weight: 400;
              line-height: 33rpx;
              -webkit-line-clamp: 1;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              max-width: 196rpx;
            }
          }
        }

        .centreCoupon_fd1_0_c0_c2_c0_babdd {
          color: var(--benbenFontColor0);
          font-size: 32rpx;
          font-weight: 700;
          line-height: 32rpx;
        }

        .centreCoupon_fd1_0_c0_c2_c1_babdd {
          color: var(--benbenFontColor0);
          font-weight: 600;

          .centreCoupon_price1_fd1_0_c0_c2_c1_babdd {
            font-size: 38rpx;
          }

          .centreCoupon_price2_fd1_0_c0_c2_c1_babdd {
            font-size: 28rpx;
          }
        }
      }

      .centreCoupon_fd1_0_c1_babdd {
        margin: 20rpx 0rpx 0rpx 0rpx;

        .centreCoupon_fd1_0_c1_c0_babdd {
          color: var(--benbenFontColor0);
          font-size: 24rpx;
          font-weight: 400;
          line-height: 33rpx;
          margin: 0rpx 12rpx 0rpx 0rpx;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        .centreCoupon_fd1_0_c1_c1_babdd {
          border-radius: 24rpx 24rpx 24rpx 24rpx;
          font-size: 24rpx;
          background: var(--benbenbtnColor0);
          color: var(--benbenFontColor3);
          width: 120rpx;
          height: 48rpx;
          line-height: 48rpx;
        }

        .centreCoupon_fd1_0_c1_limit_babdd {
          color: var(--benbenFontColor2);
          font-size: 22rpx;
          margin-top: 8rpx;
        }

        .centreCoupon_fd1_0_c1_c1_claimed_babdd {
          background: var(--benbenbgColor3);
          // color: var(--benbenColor1);
          color: #fff;
          text-align: center;
        }
      }
    }

    .centreCoupon_fd1_1_babdd {
      width: 100%;
      padding: 50rpx 0rpx 50rpx 0rpx;

      .centreCoupon_fd1_1_c0_babdd {
        width: 400rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
      }
    }
  }

  .centreCoupon_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background-size: 100% auto !important;
  }

  .centreCoupon_fd0_0_babdd {
    width: 100rpx;
    height: 88rpx;

    .centreCoupon_fd0_0_c0_babdd {
      width: 20rpx;
      height: 36rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 0rpx 0rpx 32rpx;
    }
  }
}
</style>
