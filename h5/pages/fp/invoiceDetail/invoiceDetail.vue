<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex invoiceDetail_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center justify-between flex-sub invoiceDetail_fd0_0_babdd">
          <view class="flex align-center invoiceDetail_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 invoiceDetail_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex align-center"></view>
          <view class="flex align-center invoiceDetail_fd0_0_c0_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>

      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="flex flex-direction align-center invoiceDetail_fd1_0_babdd">
          <text class="invoiceDetail_fd1_0_c0_babdd" v-if="dataMessage.invoice_status == '1'">{{ $t('开票中') }}</text>
          <text class="invoiceDetail_fd1_0_c0_1_babdd" v-if="dataMessage.invoice_status == '2'">{{ $t('已开票') }}</text>
          <text class="invoiceDetail_fd1_0_c0_1_babdd" v-if="dataMessage.invoice_status == '3'">{{ $t('发票作废') }}</text>
          <view class="flex flex-wrap align-center">
            <text class="invoiceDetail_fd1_0_c1_c0_babdd">{{ $t('预计发票金额：￥') }}</text>
            <text class="flex-wrap align-center invoiceDetail_fd1_0_c1_c1_babdd">
              <text>{{ dataMessage.invoice_price | frontPrice }}</text>
              <text>{{ dataMessage.invoice_price | laterPrice }}</text>
            </text>
            <image
              class="invoiceDetail_fd1_0_c1_c2_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '104.png'"
              @tap.stop="popupShow1661508889761 = true"
            ></image>
          </view>
        </view>
        <view class="flex flex-direction align-center invoiceDetail_fd1_1_babdd">
          <text class="invoiceDetail_fd1_1_c0_babdd">{{ $t('增值税电子普通发票') }}</text>
          <view class="flex flex-wrap align-start invoiceDetail_fd1_1_c1_babdd">
            <view class="flex flex-direction flex-wrap align-center invoiceDetail_fd1_1_c1_c0_babdd">
              <image class="invoiceDetail_fd1_1_c1_c0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '448.png'"></image>
              <view class="flex align-center invoiceDetail_fd1_1_c1_c0_c1_babdd">
                <!-- <text class="invoiceDetail_fd1_1_c1_c0_c1_c0_babdd">{{ $t('订单') }}</text> -->
                <text class="invoiceDetail_fd1_1_c1_c0_c1_c1_babdd">{{ dataMessage.order_status }}</text>
              </view>
            </view>
            <view class="flex flex-wrap align-center invoiceDetail_fd1_1_c1_c1_babdd"></view>
            <view class="flex flex-direction flex-wrap align-center invoiceDetail_fd1_1_c1_c2_babdd">
              <image
                class="invoiceDetail_fd1_1_c1_c0_c0_babdd"
                mode="aspectFit"
                :src="STATIC_URL + '186.png'"
                v-if="dataMessage.invoice_status == '1'"
              ></image>
              <image
                class="invoiceDetail_fd1_1_c1_c0_c0_babdd"
                mode="aspectFit"
                :src="STATIC_URL + '448.png'"
                v-if="dataMessage.invoice_status == '2'"
              ></image>
              <text class="invoiceDetail_fd1_1_c1_c2_c1_babdd">{{ $t('开票完成') }}</text>
            </view>
          </view>
        </view>
        <view class="flex flex-wrap align-center invoiceDetail_fd1_2_babdd"></view>
        <view class="flex flex-direction align-stretch invoiceDetail_fd1_3_babdd">
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('发票类型') }}</text>
            <text class="invoiceDetail_fd1_1_c0_babdd">{{ $t('电子普通发票') }}</text>
          </view>
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('发票内容') }}</text>
            <text class="flex-sub invoiceDetail_fd1_3_c1_c1_babdd">{{ $t('商品明细') }}</text>
          </view>
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('抬头类型') }}</text>
            <text class="flex-sub invoiceDetail_fd1_3_c1_c1_babdd" v-if="dataMessage.invoice_type == '1'">{{ $t('个人') }}</text>
            <text class="flex-sub invoiceDetail_fd1_3_c2_c1_1_babdd" v-if="dataMessage.invoice_type != '1'">{{ $t('企业') }}</text>
          </view>
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('发票抬头') }}</text>
            <text class="flex-sub invoiceDetail_fd1_3_c1_c1_babdd">{{ dataMessage.invoice_title }}</text>
          </view>
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd" v-if="dataMessage.invoice_type == '2'">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('公司税号') }}</text>
            <text class="flex-sub invoiceDetail_fd1_3_c1_c1_babdd">{{ dataMessage.invoice_company_duty_paragraph }}</text>
          </view>
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('开票金额') }}</text>
            <text class="invoiceDetail_fd1_3_c1_c1_babdd">￥</text>
            <text class="invoiceDetail_fd1_3_c5_c2_babdd">
              <text>{{ dataMessage.invoice_price | frontPrice }}</text>
              <text>{{ dataMessage.invoice_price | laterPrice }}</text>
            </text>
          </view>
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('申请时间') }}</text>
            <text class="flex-sub invoiceDetail_fd1_3_c1_c1_babdd">{{ dataMessage.create_time }}</text>
          </view>
          <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c0_babdd" v-if="dataMessage.invoice_status == '2'">
            <text class="invoiceDetail_fd1_3_c0_c0_babdd">{{ $t('开票时间') }}</text>
            <text class="flex-sub invoiceDetail_fd1_3_c1_c1_babdd">{{ dataMessage.update_time }}</text>
          </view>
          <!-- <view class="flex flex-wrap align-center invoiceDetail_fd1_3_c8_babdd" v-if="dataMessage.invoice_status == '2'">
            <view class="flex align-center" style="margin-right:20rpx;">
              <text class="fu-iconfont2 invoiceDetail_fd1_3_c8_c0_babdd" @tap.stop="previewInvoiceFunc()">&#xe79a;</text>
              <text class="invoiceDetail_fd1_3_c8_c1_babdd" @tap.stop="previewInvoiceFunc()">{{ $t('预览发票') }}</text>
            </view>
            <view class="flex align-center" style="margin-right:20rpx;">
              <text class="fu-iconfont2 invoiceDetail_fd1_3_c8_c0_babdd" @tap.stop="SavePictureFunc()">&#xe79c;</text>
              <text class="invoiceDetail_fd1_3_c8_c1_babdd" @tap.stop="SavePictureFunc()">{{ $t('下载发票') }}</text>
            </view>
            <view v-if="dataMessage.invoice_img" class="flex">
              <image class="invoiceDetail_fd1_3_c9_c0_babdd" mode="aspectFill" :src="dataMessage.invoice_img[0] && dataMessage.invoice_img[0].path ? dataMessage.invoice_img[0].path : dataMessage.invoice_img"></image>
            </view>
          </view> -->
        </view>
      </view>

      <!---flex布局flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout invoiceDetail_flex_2_babdd">
        <view class="flex flex-wrap align-center invoiceDetail_fd2_0_babdd" v-if="dataMessage.invoice_status == '2'"></view>
      </view>

      <!---flex布局flex布局结束-->
      <benben-popup v-model="popupShow1661508889761" :mask="true" :mask-close-able="true" mode="bottom">
        <!---发票说明flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout invoiceDetail_flex_3_babdd">
          <view class="flex flex-wrap align-center invoiceDetail_fd3_0_babdd">
            <view class="flex flex-wrap align-center invoiceDetail_fd3_0_c0_babdd"></view>
            <image class="invoiceDetail_fd3_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '61.png'"></image>
            <text class="invoiceDetail_fd3_0_c2_babdd">{{ $t('发票说明') }}</text>
            <image class="invoiceDetail_fd3_0_c3_babdd" mode="aspectFit" :src="STATIC_URL + '62.png'"></image>
            <image
              class="invoiceDetail_fd3_0_c4_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '322.png'"
              @tap.stop="popupShow1661508889761 = false"
            ></image>
          </view>

          <scroll-view class="invoiceDetail_fd3_1_babdd" :scroll-x="false" :scroll-y="true" :show-scrollbar="false" :enhanced="true">
            <view class="flex flex-direction align-stretch benben-scroll flex">
              <jyf-parser class="invoiceDetail_fd3_1_c0_babdd" :html="dataEssay.content | richTextFormat"></jyf-parser>
            </view>
          </scroll-view>
        </view>

        <!---发票说明flex布局结束-->
      </benben-popup>
      <!-- 底部固定按钮 -->
      <view class="invoice-bottom">
        <!-- <view class="btn-contact" @tap.stop="previewInvoiceFunc()">{{ $t('预览发票') }}</view> -->
        <view class="btn-delete" @tap.stop="SavePictureFunc()">{{ $t('复制发票下载链接') }}</view>
        <text class="invoice-bottom-tip">{{ $t('复制发票链接到浏览器中打开下载发票') }}</text>
      </view>
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},

  data() {
    return {
      popupShow1661508889761: false,
      cut: '1',
      /** invoice_img【发票图片】
       *   invoice_email【邮箱】
       *   invoice_mobile【手机号】
       *   invoice_price【发票金额】
       *   invoice_status【发票状态（1 申请开票中 2已开票 3发票作废）】
       *   invoice_company_duty_paragraph【纳税人识别号】
       *   invoice_title【发票抬头】
       *   invoice_type【发票类型】
       *   update_time【开票时间】
       *   create_time【提交时间】 **/
      dataMessage: {
        create_time: '',
        update_time: '',
        user_id: '',
        order_id: '',
        invoice_type: '',
        invoice_title: '',
        invoice_company_duty_paragraph: '',
        invoice_status: '',
        invoice_price: '',
        invoice_mobile: '',
        invoice_email: '',
        invoice_img: '',
        invoice_name: '',
        order_status: '',
      },
      /** introduce【简介】
       *   content【内容】
       *   thumb_img【内容图片】
       *   name【页面标题】 **/
      dataEssay: {
        aid: '',
        name: '',
        thumb_img: '',
        content: '',
        introduce: '',
      },
      /** tempFilePath【文件临时路径路径】 **/
      dataImage: {
        tempFilePath: '',
      },
      order_id: '1026',
    }
  },
  computed: {
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
    },
  },
  watch: {},
  onLoad(options) {
    let { order_id } = options
    if (order_id !== undefined) this.order_id = order_id
    this.getDetailFunc()
    this.getMessageFunc()
  },
  onUnload() {},
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //订单-发票详情
    async getDetailFunc() {
      //请求方法
      //数据验证

      let datadataMessage = await this.$api.post(global.apiUrls.post641ed3dd595d0, {
        order_id: this.order_id,
      })

      if (datadataMessage.data.code != 1) {
        this.$message.info(datadataMessage.data.msg)
        return
      }
      let infodataMessage = datadataMessage.data
      this.dataMessage = infodataMessage.data
    },
    //系统文章--获取系统单页内容
    async getMessageFunc() {
      //请求方法
      //数据验证

      let datadataEssay = await this.$api.get(global.apiUrls.post641568f1b6f87, {
        column_id: '8',
      })

      if (datadataEssay.data.code != 1) {
        this.$message.info(datadataEssay.data.msg)
        return
      }
      let infodataEssay = datadataEssay.data
      this.dataEssay = infodataEssay.data
    },
    isImageFile(url) {
      return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(url)
    },
    isDocumentFile(url) {
      return /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/.test(url)
    },
    //预览文件
    previewFileFunc(url) {
      uni.openDocument({
        filePath: url,
        success: function () {
          console.log('打开文档成功')
        },
      })
      return

      uni.openDocument({
        filePath: url,
      })
      return

      if (this.isImageFile(url)) {
        uni.previewImage({
          urls: [url],
        })
      } else if (this.isDocumentFile(url)) {
        uni.openDocument({
          filePath: url,
        })
      } else {
        this.$message.info(this.$t('不支持预览该文件类型'))
      }
    },
    //预览发票（从 dataMessage.invoice_img 中取地址）
    previewInvoiceFunc() {
      if (!validate(this.dataMessage.invoice_img, 'require')) {
        this.$message.info(this.$t('暂无可预览发票'))
        return false
      }
      let url = ''
      if (Array.isArray(this.dataMessage.invoice_img)) {
        url = this.dataMessage.invoice_img[0] && (this.dataMessage.invoice_img[0].path || this.dataMessage.invoice_img[0])
      } else {
        url = this.dataMessage.invoice_img
      }
      if (!url) {
        this.$message.info(this.$t('暂无可预览发票'))
        return false
      }
      this.previewFileFunc(url)
    },
    //下载发票
    async SavePictureFunc() {
      if (!validate(this.dataMessage.invoice_img[0].path, 'require')) {
        this.$message.info(this.$t('暂无可下载发票'))
        return false
      }
      this.copyText(this.dataMessage.invoice_img[0]?.path)
      // this.$message.success(this.$t('发票链接已复制，请在浏览器中打开下载'))

      return

      this.dataImage = await this.syncUniApi('downloadFile', {
        url: this.dataMessage.invoice_img[0].path,
      })
      // await this.syncUniApi('saveImageToPhotosAlbum', {
      //   filePath: this.dataImage.tempFilePath,
      // })
    },
  },
}
</script>
<style scoped>
.invoice-bottom {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18rpx 32rpx 70rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  z-index: 1;
}

.invoice-bottom .btn-contact {
  border: 2rpx solid #ff4d4f;
  color: #ff4d4f;
  background: #fff;
  padding: 18rpx 56rpx;
  border-radius: 60rpx;
  font-size: 28rpx;
  line-height: 28rpx;
  margin-right: 24rpx;
}

.invoice-bottom .btn-delete {
  background: var(--benbenbgColor3);
  color: #fff;
  width: 686rpx;
  height: 88rpx;
  text-align: center;
  line-height: 88rpx;
  border-radius: 60rpx;
  font-size: 28rpx;
}

.invoice-bottom-tip {
  margin-top: 16rpx;
  font-size: 22rpx;
  line-height: 32rpx;
  color: #999;
  text-align: center;
}
</style>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: url(#{image-path('177.png')
  }) no-repeat;
  background-size: 100% auto;

  .invoiceDetail_flex_3_babdd {
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 24rpx 24rpx 0rpx 0rpx;
    padding: 0rpx 32rpx 64rpx 32rpx;

    .invoiceDetail_fd3_0_babdd {
      line-height: 129rpx;

      .invoiceDetail_fd3_0_c0_babdd {
        width: 26rpx;
      }

      .invoiceDetail_fd3_0_c1_babdd {
        width: 32rpx;
        height: 10rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx 0rpx 0rpx auto;
      }

      .invoiceDetail_fd3_0_c2_babdd {
        margin: 0rpx 20rpx 0rpx 20rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
      }

      .invoiceDetail_fd3_0_c3_babdd {
        width: 32rpx;
        height: 10rpx;
        border-radius: 0rpx 0rpx 0rpx 0rpx;
        margin: 0rpx auto 0rpx 0rpx;
      }

      .invoiceDetail_fd3_0_c4_babdd {
        width: 40rpx;
        height: 40rpx;
      }
    }

    .invoiceDetail_fd3_1_babdd {
      touch-action: none;
      height: 40vh;
      width: 686rpx;
    }
  }

  .invoiceDetail_flex_2_babdd {
    background: #fff;
    background-size: 100% auto !important;
    padding: 16rpx 24rpx 16rpx 24rpx;

    .invoiceDetail_fd2_0_babdd {
      margin: 24rpx 0rpx 0rpx 0rpx;
    }
  }

  .invoiceDetail_fd1_0_babdd {
    padding: 32rpx 0rpx 56rpx 0rpx;

    .invoiceDetail_fd1_0_c0_babdd {
      line-height: 43rpx;
      font-size: 32rpx;
      font-weight: 700;
      color: var(--benbenFontColor3);
      margin: 0rpx 0rpx 32rpx 0rpx;
    }

    .invoiceDetail_fd1_0_c1_c0_babdd {
      line-height: 42rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: var(--benbenFontColor3);
    }

    .invoiceDetail_fd1_0_c1_c1_babdd {
      line-height: 40rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: var(--benbenFontColor3);
    }

    .invoiceDetail_fd1_0_c1_c2_babdd {
      width: 32rpx;
      height: 32rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 0rpx 0rpx 24rpx;
    }
  }

  .invoiceDetail_fd1_0_c0_1_babdd {
    line-height: 43rpx;
    font-size: 32rpx;
    font-weight: 700;
    color: #ffffff;
    margin: 0rpx 0rpx 32rpx 0rpx;
  }

  .invoiceDetail_fd1_1_babdd {
    border-radius: 16rpx 16rpx 0rpx 0rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    padding: 40rpx 0rpx 32rpx 0rpx;

    .invoiceDetail_fd1_1_c1_babdd {
      margin: 42rpx 0rpx 0rpx 0rpx;

      .invoiceDetail_fd1_1_c1_c0_babdd {
        margin: 0rpx -32rpx 0rpx 0rpx;

        .invoiceDetail_fd1_1_c1_c0_c1_babdd {
          margin: 16rpx 0rpx 0rpx 0rpx;

          .invoiceDetail_fd1_1_c1_c0_c1_c0_babdd {
            line-height: 42rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: var(--benbenFontColor0);
          }

          .invoiceDetail_fd1_1_c1_c0_c1_c1_babdd {
            line-height: 42rpx;
            font-size: 28rpx;
            font-weight: 400;
            color: #666666;
          }
        }
      }

      .invoiceDetail_fd1_1_c1_c1_babdd {
        height: 1rpx;
        background: rgba(238, 238, 238, 1);
        background-size: 100% auto !important;
        width: 232rpx;
        margin: 31rpx 0rpx 0rpx 0rpx;
      }

      .invoiceDetail_fd1_1_c1_c2_babdd {
        margin: 0rpx 0rpx 0rpx -32rpx;

        .invoiceDetail_fd1_1_c1_c2_c1_babdd {
          line-height: 42rpx;
          font-size: 28rpx;
          font-weight: 400;
          color: var(--benbenFontColor1);
          margin: 16rpx 0rpx 0rpx 0rpx;
        }
      }
    }
  }

  .invoiceDetail_fd1_1_c0_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .invoiceDetail_fd1_1_c1_c0_c0_babdd {
    width: 48rpx;
    height: 48rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .invoiceDetail_fd1_2_babdd {
    background: var(--benbenbgColor5);
    background-size: 100% auto !important;
    height: 20rpx;
  }

  .invoiceDetail_fd1_3_babdd {
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    padding: 16rpx 24rpx 016rpx 024rpx;
  }

  .invoiceDetail_fd1_3_c0_babdd {
    padding: 16rpx 0rpx 16rpx 0rpx;
  }

  .invoiceDetail_fd1_3_c0_c0_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    width: 136rpx;
  }

  .invoiceDetail_fd1_3_c1_c1_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .invoiceDetail_fd1_3_c2_c1_1_babdd {
    line-height: 40rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }

  .invoiceDetail_fd1_3_c5_c2_babdd {
    color: var(--benbenFontColor0);
    font-weight: 400;
    line-height: 42rpx;
    font-size: 28rpx;
  }

  .invoiceDetail_fd1_3_c8_babdd {
    margin: 24rpx 0rpx 0rpx 0rpx;

    .invoiceDetail_fd1_3_c8_c0_babdd {
      font-size: 28rpx;
      font-weight: 400;
      color: var(--benbenFontColor4);
      margin: 0rpx 24rpx 0rpx 0rpx;
    }

    .invoiceDetail_fd1_3_c8_c1_babdd {
      color: var(--benbenFontColor4);
      font-size: 28rpx;
      font-weight: 400;
      line-height: 28rpx;
    }
  }

  .invoiceDetail_fd1_3_c9_c0_babdd {
    width: 702rpx;
    height: 454rpx;
    border-radius: 0rpx 0rpx 0rpx 0rpx;
  }

  .invoiceDetail_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: url(#{image-path('177.png')
  }) no-repeat;
    background-size: 100% auto !important;

    .invoiceDetail_fd0_0_babdd {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;
    }
  }

  .invoiceDetail_fd0_0_c0_babdd {
    width: 180rpx;

    .invoiceDetail_fd0_0_c0_c0_babdd {
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbeniconColor4);
    }
  }
}

::v-deep .invoiceDetail_fd3_1_c0_babdd {
  width: 100%;
}
</style>
