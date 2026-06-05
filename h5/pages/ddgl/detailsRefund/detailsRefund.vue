<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-wrap align-center justify-between benben-position-layout flex detailsRefund_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-center detailsRefund_fd0_0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
          <image class="detailsRefund_fd0_0_c0_babdd" mode="aspectFit" :src="STATIC_URL + '278.png'"></image>
        </view>
        <text class="detailsRefund_fd0_1_babdd">{{ $t('订单详情') }}</text>
        <view class="flex flex-wrap align-center detailsRefund_fd0_0_babdd"></view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <benben-popup v-model="popupShow1698807377319" :mask="true" :mask-close-able="true" mode="center">
        <!---退出登录flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center detailsRefund_flex_1_babdd" @tap.stop="popupShow1650940432200 = true">
          <text class="detailsRefund_fd1_0_babdd">{{ $t('提示') }}</text>
          <text class="detailsRefund_fd1_1_babdd">{{ $t('确定删除订单？') }}</text>
          <view class="flex align-center detailsRefund_fd1_2_babdd">
            <button class="detailsRefund_fd1_2_c0_babdd" @tap.stop="popupShow1698807377319 = false">{{ $t('取消') }}</button>
            <button class="detailsRefund_fd1_2_c1_babdd" @tap.stop="deleteAfterpjFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---退出登录flex布局结束-->
      </benben-popup>
      <!---退款-进度flex布局开始-->
      <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout detailsRefund_flex_2_babdd">
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_babdd"
          v-if="dataDetails.status == '0' && dataDetails.refund_type == '2'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('寄回商品') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c3_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('请等待商家处理') }}</text>
            <text class="detailsRefund_fd2_0_c2_c1_babdd">{{ $t('您已成功发起退款申请，请耐心等待商家处理。') }}</text>
            <text class="detailsRefund_fd2_0_c2_c2_babdd">{{ $t('商家同意后，请按照给出的退货地址退货，并请填写退货运单号进行提交。') }}</text>
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('如商家拒绝，您可以修改申请后再次发起，商家会重新处理。') }}</text>
          </view>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_babdd"
          v-if="dataDetails.status == '1' && dataDetails.refund_type == '2'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('寄回商品') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c3_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('请寄回商品') }}</text>
            <text class="detailsRefund_fd2_1_c2_c1_babdd">{{ $t('商家已同意退货申请，请寄回商品并提交物流信息。') }}</text>
            <text class="detailsRefund_fd2_0_c2_c2_babdd">{{ $t('未与商家协商一致，请勿使用到到付或平邮，以免商家拒收。') }}</text>
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('请填写真实的退货物流信息，逾期未填写，退货申请将自动关闭。') }}</text>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_c3_babdd">
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c0_babdd">
              <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c0_c0_babdd"></view>
              <text class="detailsRefund_fd2_1_c3_c0_c1_babdd">{{ $t('寄回地址') }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('收货人') }}</text>
              <text class="detailsRefund_fd2_1_c3_c1_c1_babdd">{{ dataDetails.receiver_name }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('联系电话') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.receiver_mobile }}</text>
            </view>
            <view class="flex align-start detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_1_c3_c3_c0_babdd">{{ $t('退货地址') }}</text>
              <text class="detailsRefund_fd2_1_c3_c3_c1_babdd">{{ dataDetails.receiver_address }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c4_babdd">
              <text class="detailsRefund_fd2_1_c3_c4_c0_babdd" @tap.stop="copyText(dataDetails.receiver_address)">{{ $t('复制') }}</text>
            </view>
          </view>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_babdd"
          v-if="dataDetails.status == '2' && dataDetails.refund_type == '2'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('寄回商品') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c3_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('请等待商家退款') }}</text>
            <text class="detailsRefund_fd2_1_c2_c1_babdd">{{ $t('商品已寄回，请等待商家收货并退款') }}</text>
            <text class="detailsRefund_fd2_0_c2_c2_babdd">
              {{ $t('如果商家收到货并验货无误，将操作退款给您。钱款原路返回至您支付时选择的账户。') }}
            </text>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_c3_babdd">
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c0_babdd">
              <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c0_c0_babdd"></view>
              <text class="detailsRefund_fd2_1_c3_c0_c1_babdd">{{ $t('寄回地址') }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('收货人') }}</text>
              <text class="detailsRefund_fd2_1_c3_c1_c1_babdd">{{ dataDetails.receiver_name }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('联系电话') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.receiver_mobile }}</text>
            </view>
            <view class="flex align-start detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_1_c3_c3_c0_babdd">{{ $t('退货地址') }}</text>
              <text class="detailsRefund_fd2_1_c3_c3_c1_babdd">{{ dataDetails.receiver_address }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c4_babdd">
              <text class="detailsRefund_fd2_1_c3_c4_c0_babdd" @tap.stop="copyText(dataDetails.receiver_address)">{{ $t('复制') }}</text>
            </view>
          </view>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_babdd"
          v-if="dataDetails.status == '4' && dataDetails.refund_type == '2'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('寄回商品') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c3_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_3_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('售后已完成') }}</text>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_3_c3_babdd">
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c0_babdd">
              <text class="detailsRefund_fd2_3_c3_c0_c0_babdd">{{ $t('商家已退款') }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款金额') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ $t('￥') }}</text>
              <text class="detailsRefund_fd2_3_c3_c1_c2_babdd">
                <text class="detailsRefund_price1_fd2_3_c3_c1_c2_babdd">{{ dataDetails.refund_money | frontPrice }}</text>
                <text class="detailsRefund_price1_fd2_3_c3_c1_c2_babdd">{{ dataDetails.refund_money | laterPrice }}</text>
              </text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款账户') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.refund_pay_type_title }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款时间') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.refund_time }}</text>
            </view>
          </view>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_babdd"
          v-if="dataDetails.status == '0' && dataDetails.refund_type == '1'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('请等待商家处理') }}</text>
            <text class="detailsRefund_fd2_1_c2_c1_babdd">{{ $t('您已成功发起退款申请，请耐心等待商家处理。') }}</text>
            <text class="detailsRefund_fd2_0_c2_c2_babdd">
              {{ $t('商家同意，系统将退款给您如商家拒绝，您可以修改申请后再次发起，商家会重新处理。') }}
            </text>
          </view>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_babdd"
          v-if="dataDetails.refund_type == '1' && dataDetails.status == '4'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_3_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('售后已完成') }}</text>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_3_c3_babdd">
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c0_babdd">
              <text class="detailsRefund_fd2_3_c3_c0_c0_babdd">{{ $t('商家已退款') }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款金额') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ $t('￥') }}</text>
              <text class="detailsRefund_fd2_3_c3_c1_c2_babdd">
                <text class="detailsRefund_price1_fd2_3_c3_c1_c2_babdd">{{ dataDetails.refund_money | frontPrice }}</text>
                <text class="detailsRefund_price1_fd2_3_c3_c1_c2_babdd">{{ dataDetails.refund_money | laterPrice }}</text>
              </text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款账户') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.refund_pay_type_title }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款时间') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.refund_time }}</text>
            </view>
          </view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd" v-if="dataDetails.status == '-2'">
          <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('售后关闭') }}</text>
          <view class="flex flex-wrap align-center detailsRefund_fd2_6_c1_babdd">
            <text class="detailsRefund_fd2_6_c1_c0_babdd">{{ $t('撤销时间') }}</text>
            <text class="detailsRefund_fd2_6_c1_c1_babdd">{{ dataDetails.cancel_time }}</text>
          </view>
          <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('您已撤销本次退款申请，如有问题未解决，您可重新发起申请') }}</text>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd" v-if="dataDetails.status == '-1'">
          <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('售后拒绝') }}</text>
          <view class="flex flex-wrap align-center detailsRefund_fd2_6_c1_babdd">
            <text class="detailsRefund_fd2_6_c1_c0_babdd">{{ $t('拒绝原因:') }}</text>
            <text class="detailsRefund_fd2_6_c1_c1_babdd">{{ dataDetails.refund_reject }}</text>
          </view>
          <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('商家已拒绝您的申请') }}</text>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_babdd"
          v-if="dataDetails.status == '3' && dataDetails.refund_type == '2'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('寄回商品') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c3_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('请等待商家退款') }}</text>
            <text class="detailsRefund_fd2_1_c2_c1_babdd">{{ $t('商品已寄回，请等待商家收货并退款') }}</text>
            <text class="detailsRefund_fd2_0_c2_c2_babdd">
              {{ $t('如果商家收到货并验货无误，将操作退款给您。钱款原路返回至您支付时选择的账户。') }}
            </text>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_c3_babdd">
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c0_babdd">
              <view class="flex flex-wrap align-center detailsRefund_fd2_8_c3_c0_c0_babdd"></view>
              <text class="detailsRefund_fd2_1_c3_c0_c1_babdd">{{ $t('寄回地址') }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('收货人') }}</text>
              <text class="detailsRefund_fd2_1_c3_c1_c1_babdd">{{ dataDetails.receiver_name }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('联系电话') }}</text>
              <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.receiver_mobile }}</text>
            </view>
            <view class="flex align-start detailsRefund_fd2_1_c3_c1_babdd">
              <text class="detailsRefund_fd2_1_c3_c3_c0_babdd">{{ $t('退货地址') }}</text>
              <text class="detailsRefund_fd2_1_c3_c3_c1_babdd">{{ dataDetails.receiver_address }}</text>
            </view>
            <view class="flex flex-wrap align-center detailsRefund_fd2_1_c3_c4_babdd">
              <text class="detailsRefund_fd2_1_c3_c4_c0_babdd" @tap.stop="copyText(dataDetails.receiver_address)">{{ $t('复制') }}</text>
            </view>
          </view>
        </view>
        <view
          class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_1_babdd"
          v-if="dataDetails.status == '1' && dataDetails.refund_type == '1'"
        >
          <view class="flex flex-wrap align-center justify-between detailsRefund_fd2_0_c0_babdd">
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('提交申请') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('商家审核') }}</text>
            <text class="detailsRefund_fd2_0_c0_c0_babdd">{{ $t('退款完成') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_0_c1_babdd">
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c0_babdd" mode="aspectFit" :src="STATIC_URL + '345.png'"></image>
            <view class="flex flex-wrap align-center flex-sub detailsRefund_fd2_0_c1_c1_babdd"></view>
            <image class="detailsRefund_fd2_0_c1_c2_babdd" mode="aspectFit" :src="STATIC_URL + '342.jpg'"></image>
          </view>
          <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_0_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c0_babdd">{{ $t('请等待商家处理') }}</text>
            <text class="detailsRefund_fd2_1_c2_c1_babdd">{{ $t('您已成功发起退款申请，请耐心等待商家处理。') }}</text>
            <text class="detailsRefund_fd2_0_c2_c2_babdd">
              {{ $t('商家同意，系统将退款给您如商家拒绝，您可以修改申请后再次发起，商家会重新处理。') }}
            </text>
          </view>
        </view>
        <view class="flex flex-direction flex-wrap align-stretch detailsRefund_fd2_10_babdd">
          <view class="flex flex-wrap align-center detailsRefund_fd2_10_c0_babdd">
            <view class="flex flex-wrap align-center detailsRefund_fd2_8_c3_c0_c0_babdd"></view>
            <text class="detailsRefund_fd2_1_c3_c0_c1_babdd">{{ $t('退款信息') }}</text>
          </view>
          <view
            class="flex flex-wrap align-center detailsRefund_fd2_10_c1_babdd"
            @tap.stop="handleJumpDiy"
            data-type="navigateTo"
            :data-url="`/pages/fl/shopDetail/shopDetail?id=${dataDetails.goods_id}`"
          >
            <image class="detailsRefund_fd2_10_c1_c0_babdd" mode="aspectFill" :src="dataDetails.goods_thumb"></image>
            <view class="flex flex-direction flex-wrap align-stretch flex-sub detailsRefund_fd2_10_c1_c1_babdd">
              <text class="detailsRefund_fd2_10_c1_c1_c0_babdd">{{ dataDetails.goods_name }}</text>
              <text class="detailsRefund_fd2_10_c1_c1_c1_babdd">{{ dataDetails.sku_name }}</text>
              <view class="flex flex-wrap align-center">
                <text class="detailsRefund_fd2_10_c1_c1_c2_c0_babdd">{{ $t('￥') }}</text>
                <text class="detailsRefund_fd2_10_c1_c1_c2_c1_babdd">
                  <text>{{ dataDetails.shop_price | frontPrice }}</text>
                  <text class="detailsRefund_price2_fd2_10_c1_c1_c2_c1_babdd">{{ dataDetails.shop_price | laterPrice }}</text>
                </text>
                <view class="flex flex-wrap align-center detailsRefund_fd2_10_c1_c1_c2_c2_babdd">
                  <text class="detailsRefund_fd2_0_c2_c3_babdd">x</text>
                  <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ dataDetails.num }}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_10_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('服务类型') }}</text>
            <text class="detailsRefund_fd2_1_c3_c2_c1_babdd" v-if="dataDetails.refund_type == '1'">{{ $t('退款') }}</text>
            <text class="detailsRefund_fd2_10_c2_c1_1_babdd" v-if="dataDetails.refund_type != '1'">{{ $t('退款退货') }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_10_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款原因') }}</text>
            <text class="flex-sub detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.refund_reason }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_10_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('申请时间') }}</text>
            <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.create_time }}</text>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_10_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款编号') }}</text>
            <text class="detailsRefund_fd2_10_c5_c1_babdd">{{ dataDetails.server_no }}</text>
            <text class="detailsRefund_fd2_10_c5_c2_babdd" @tap.stop="copyText(dataDetails.server_no)">{{ $t('复制') }}</text>
          </view>
          <view class="flex align-start detailsRefund_fd2_10_c2_babdd">
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('退款备注') }}</text>
            <text class="flex-sub detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.refund_content }}</text>
          </view>
          <view class="flex flex-wrap align-start detailsRefund_fd2_1_c3_c1_babdd">
            <text class="detailsRefund_fd2_10_c7_c0_babdd">{{ $t('退款凭证') }}</text>
            <view class="flex flex-wrap align-center flex-sub">
              <template v-for="(item, key0) in dataDetails.refund_picture">
                <view class="flex flex-wrap align-center detailsRefund_fd2_10_c7_c1_c0_babdd" :key="key0">
                  <image
                    class="detailsRefund_fd2_10_c7_c1_c0_c0_babdd"
                    mode="aspectFill"
                    :src="item"
                    @tap.stop="multiImagePreview(item, dataDetails.refund_picture, '')"
                  ></image>
                </view>
              </template>

              <text class="detailsRefund_fd2_10_c7_c1_c1_babdd" v-if="dataDetails.refund_picture.length == 0">{{ $t('无') }}</text>
            </view>
          </view>
          <view class="flex flex-wrap align-center detailsRefund_fd2_10_c2_babdd" v-if="dataDetails.status >= '2' && dataDetails.refund_type == '2'">
            <text class="detailsRefund_fd2_0_c2_c3_babdd">{{ $t('物流单号') }}</text>
            <text class="detailsRefund_fd2_1_c3_c2_c1_babdd">{{ dataDetails.express_no || '无' }}</text>
          </view>
        </view>
        <view class="flex flex-direction align-stretch detailsRefund_fd2_11_babdd">
          <view class="flex flex-wrap align-center detailsRefund_fd2_11_c0_babdd" >
            <!-- <image
              class="detailsRefund_fd2_11_c0_c0_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '347.png'"
              @tap.stop="callMobile(systemsInfo)"
            ></image> -->
            <button class="detailsRefund_fd2_11_c0_c1_babdd" @tap.stop="callMobile(systemsInfo)">{{ $t('联系商家') }}</button>
            <button
              class="detailsRefund_fd2_11_c0_c2_babdd"
              @tap.stop="popupShow1707286980394 = true"
              v-if="dataDetails.status == '0' && dataDetails.express_no == ''"
            >
              {{ $t('撤销申请') }}
            </button>
            <button
              class="detailsRefund_fd2_11_c0_c2_1_babdd"
              @tap.stop="popupShow1707286980394 = true"
              v-if="dataDetails.status == '1' && dataDetails.express_no == ''"
            >
              {{ $t('撤销申请') }}
            </button>
            <button
              class="detailsRefund_fd2_11_c0_c3_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/returnInformation/returnInformation?aid=${dataDetails.aid}&thumb=${dataDetails.goods_thumb}&name=${dataDetails.goods_name}&sku_name=${dataDetails.sku_name}&price=${dataDetails.shop_price}&num=${dataDetails.num}`"
              v-if="dataDetails.refund_type == '2' && dataDetails.status == '1'"
            >
              {{ $t('寄回信息') }}
            </button>
            <button
              class="detailsRefund_fd2_11_c0_c3_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/refundLogisticsCheck/refundLogisticsCheck?order_id=${dataDetails.aid}`"
              v-if="dataDetails.refund_type == '2' && dataDetails.status == '2'"
            >
              {{ $t('查看物流') }}
            </button>
            <button
              class="detailsRefund_fd2_11_c0_c3_babdd"
              @tap.stop="popupShow1698807377319 = true"
              v-if="dataDetails.status < '0' || dataDetails.status >= '4'"
            >
              {{ $t('删除订单') }}
            </button>
            <button
              class="detailsRefund_fd2_11_c0_c3_babdd"
              @tap.stop="handleJumpDiy"
              data-type="navigateTo"
              :data-url="`/pages/ddgl/serviceApply/serviceApply?aid=${dataDetails.order_goods_id}`"
              v-if="dataDetails.allow_reapply == '1'"
            >
              {{ $t('重新发起') }}
            </button>
          </view>
          <!-- <benben-safe-area></benben-safe-area> -->
        </view>
      </view>

      <!---退款-进度flex布局结束-->
      <benben-popup v-model="popupShow1707286980394" :mask="true" :mask-close-able="true" mode="center" :z-index="999">
        <!---清除本地缓存flex布局开始-->
        <view class="flex benben-flex-layout flex-wrap align-center">
          <view class="flex flex-direction flex-wrap align-center detailsRefund_fd3_0_babdd">
            <text class="detailsRefund_fd3_0_c0_babdd">{{ $t('提示') }}</text>
            <text class="detailsRefund_fd3_0_c1_babdd">{{ $t('是否撤销售后？') }}</text>
            <view class="flex align-center detailsRefund_fd3_0_c2_babdd">
              <button class="detailsRefund_fd3_0_c2_c0_babdd" @tap.stop="popupShow1707286980394 = false">{{ $t('取消') }}</button>
              <button class="detailsRefund_fd3_0_c2_c1_babdd" @tap.stop="applicationmmFunc()">{{ $t('确认') }}</button>
            </view>
          </view>
        </view>

        <!---清除本地缓存flex布局结束-->
      </benben-popup>
      <benben-popup v-model="popupShow1679910159767" :mask="true" :mask-close-able="true" mode="center">
        <!---退款-撤销成功flex布局开始-->
        <view class="flex flex-direction flex-wrap align-stretch benben-flex-layout detailsRefund_flex_4_babdd">
          <view class="flex flex-direction flex-wrap align-center detailsRefund_fd4_0_babdd">
            <text class="detailsRefund_fd4_0_c0_babdd">{{ $t('系统提示') }}</text>
            <image class="detailsRefund_fd4_0_c1_babdd" mode="aspectFit" :src="STATIC_URL + '348.png'"></image>
            <text class="detailsRefund_fd4_0_c2_babdd">{{ $t('撤销申请成功') }}</text>
          </view>
          <view class="flex flex-wrap align-center justify-center detailsRefund_fd4_1_babdd">
            <image
              class="detailsRefund_fd4_1_c0_babdd"
              mode="aspectFit"
              :src="STATIC_URL + '349.png'"
              @tap.stop="popupShow1679910159767 = false"
            ></image>
          </view>
        </view>

        <!---退款-撤销成功flex布局结束-->
      </benben-popup>
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},

  data() {
    return {
      popupShow1679910159767: false,
      popupShow1707286980394: false,
      popupShow1698807377319: false,
      cut: '1',
      /** allow_reapply【是否允许重新申请 0否 1是】
       *   aid【店铺id】
       *   store_logo【店铺logo】
       *   store_name【店铺名称】
       *   refund_picture【退款凭证】
       *   order_type_title【订单类型】
       *   refund_pay_type_title【退款方式说明】
       *   refund_type_title【售后类型说明】
       *   status_title【状态说明】
       *   goods_thumb【商品图片】
       *   sku_name【规格名称】
       *   goods_name【商品名称】
       *   goods_num【购买数量】
       *   shop_price【价格】
       *   mobile【手机号】
       *   head_img【头像】
       *   user_nickname【昵称】
       *   order_status【订单状态】
       *   total_refund_money【订单中已退款】
       *   payable_money【应付金额】
       *   pay_status【支付状态】
       *   pay_type【支付类型】
       *   order_type【订单类型】
       *   goods_money【商品金额】
       *   order_sn【订单号】
       *   num【退款数量】
       *   receiver_remarks【退货寄回说明】
       *   receiver_imgs【退货寄回图片id】
       *   receive_time【收货时间】
       *   shipping_time【发货时间】
       *   cancel_time【取消时间】
       *   receiver_name【收货人】
       *   receiver_address【收货笛子】
       *   receiver_mobile【售后电话】
       *   receiver_remark【备注】
       *   refund_reject【拒绝原因】
       *   refund_pay_type【退款账户】
       *   refund_id【第三方退款号】
       *   server_no【售后服务号】
       *   express_company_id【发货公司ID】
       *   express_no【运单号】
       *   refund_time【退款时间】
       *   refund_money【退款金额】
       *   refund_content【售后说明】
       *   refund_reason【售后原因】
       *   refund_type【售后类型  1仅退款  2退货退款】
       *   status【0:申请中;-2:用户取消;-1:驳回;1:同意/买家待寄回;2:同意/买家已寄回;3:确认收货;4:确认打款】
       *   create_time【申请时间】 **/
      dataDetails: {
        aid: '',
        member_id: '',
        uid: '',
        create_time: '',
        update_time: '',
        sort: '',
        is_del: '',
        status: '',
        create_id: '',
        row_lock: '',
        refund_type: '',
        refund_reason: '',
        refund_content: '',
        refund_money: '',
        refund_time: '',
        express_no: '',
        express_company_id: '',
        server_no: '',
        refund_id: '',
        refund_pay_type: '',
        refund_reject: '',
        receiver_remark: '',
        receiver_mobile: '',
        receiver_address: '',
        receiver_name: '',
        cancel_time: '',
        is_defective: '',
        is_delete: '',
        shipping_time: '',
        receive_time: '',
        receiver_imgs: '',
        receiver_remarks: '',
        inviter_id: '',
        order_id: '',
        order_goods_id: '',
        goods_id: '',
        sku_id: '',
        num: '',
        usermerchant_id: '',
        user_id: '',
        order_sn: '',
        surplus_refund_money: '',
        goods_money: '',
        order_type: '',
        pay_type: '',
        pay_status: '',
        payable_money: '',
        total_refund_money: '',
        order_status: '',
        user_nickname: '',
        head_img: '',
        mobile: '',
        shop_price: '',
        goods_num: '',
        goods_name: '',
        sku_name: '',
        goods_thumb: '',
        status_title: '',
        refund_type_title: '',
        refund_pay_type_title: '',
        order_type_title: '',
        refund_picture: [],
        shop_info: {
          store_name: '',
          store_logo: '',
          aid: '',
        },
        allow_reapply: 0,
      },
      text: '2',
      isShowLoading: false,
      systemsInfo: '',
      id: '218',
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { id } = options
    if (id !== undefined) this.id = id
  },
  onUnload() {},
  onReady() {},
  onShow() {
    this.getDetailFunc()
    this.getmobileFunc()
  },
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //售后-取消申请
    async applicationmmFunc() {
      //请求方法
      //数据验证

      let data6427d9581deed = await this.$api.post(global.apiUrls.post6427d9581deed, {
        id: this.dataDetails.aid,
      })

      if (data6427d9581deed.data.code != 1) {
        this.$message.info(data6427d9581deed.data.msg)
        return
      }
      let info6427d9581deed = data6427d9581deed.data

      this.popupShow1707286980394 = false
      this.popupShow1679910159767 = true
      uni.$emit('shenqingchengg', this.text)
      this.getDetailFunc()
    },
    //售后-售后删除
    async deleteAfterpjFunc() {
      //请求方法
      //数据验证

      let data6427dbbacba58 = await this.$api.post(global.apiUrls.post6427dbbacba58, {
        id: this.dataDetails.aid,
      })

      if (data6427dbbacba58.data.code != 1) {
        this.$message.info(data6427dbbacba58.data.msg)
        return
      }
      let info6427dbbacba58 = data6427dbbacba58.data

      this.popupShow1698807377319 = false
      setTimeout(() => {
        uni.showToast({
          title: this.$t('删除成功'),
          mask: true,
          icon: 'none',
          duration: 1500,
        })
      }, 200)
      uni.$emit('shenqingchengg', this.text)
      setTimeout(() => {
        this.$urouter.navigateBack(1)
      }, 800)
    },
    //获取售后详情
    async getDetailFunc() {
      //请求方法
      //数据验证

      let datadataDetails = await this.$api.post(global.apiUrls.post6427d6b5d3599, {
        id: this.id,
      })

      if (datadataDetails.data.code != 1) {
        this.$message.info(datadataDetails.data.msg)
        return
      }
      let infodataDetails = datadataDetails.data
      this.dataDetails = infodataDetails.data
    },
    //获取手机号
    getmobileFunc() {
      this.isShowLoading = true
      this.$api
        .post(global.apiUrls.post64534cbb2c352, {
          code: 'tel',
        })
        .then((res) => {
          this.isShowLoading = false
          if (res.data.code == 1) {
            this.systemsInfo = res.data.data
          }
        })
        .catch((err) => {
          this.isShowLoading = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: rgba(248, 248, 248, 1);
  background-size: 100% auto;

  .detailsRefund_flex_4_babdd {
    width: 540rpx;

    .detailsRefund_fd4_0_babdd {
      background: #fff;
      background-size: 100% auto !important;
      border-radius: 16rpx 16rpx 16rpx 16rpx;

      .detailsRefund_fd4_0_c0_babdd {
        line-height: 45rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
        margin: 40rpx 0rpx 0rpx 0rpx;
      }

      .detailsRefund_fd4_0_c1_babdd {
        width: 138rpx;
        height: 98rpx;
        margin: 32rpx 0rpx 32rpx 0rpx;
      }

      .detailsRefund_fd4_0_c2_babdd {
        line-height: 50rpx;
        font-size: 36rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
        margin: 0rpx 0rpx 45rpx 0rpx;
      }
    }

    .detailsRefund_fd4_1_babdd {
      margin: 48rpx 0rpx 0rpx 0rpx;

      .detailsRefund_fd4_1_c0_babdd {
        width: 62rpx;
        height: 62rpx;
        border-radius: 31rpx 31rpx 31rpx 31rpx;
      }
    }
  }

  .detailsRefund_fd3_0_babdd {
    width: 540rpx;
    background: #fff;
    background-size: 100% auto !important;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .detailsRefund_fd3_0_c0_babdd {
      line-height: 44rpx;
      font-size: 36rpx;
      font-weight: 700;
      color: #333333;
      margin: 40rpx 0rpx 0rpx 0rpx;
    }

    .detailsRefund_fd3_0_c1_babdd {
      line-height: 44rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #333333;
      text-align: center;
      margin: 32rpx 40rpx 0rpx 40rpx;
    }

    .detailsRefund_fd3_0_c2_babdd {
      border-top: 1px solid #eee;
      margin: 51rpx 0rpx 0rpx 0rpx;

      .detailsRefund_fd3_0_c2_c0_babdd {
        font-size: 32rpx;
        background: #fff;
        color: rgba(153, 153, 153, 1);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 400;
        border-right: 1px solid #eee;
      }

      .detailsRefund_fd3_0_c2_c1_babdd {
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        width: 270rpx;
        height: 101rpx;
        line-height: 101rpx;
        font-weight: 500;
      }
    }
  }

  .detailsRefund_flex_2_babdd {
    background:
      url(#{image-path('454.png')
    }) no-repeat,
      transparent;
    background-size: 100% 240rpx !important;
    padding: 14rpx 32rpx 0rpx 32rpx;

    .detailsRefund_fd2_0_babdd {
      margin: 48rpx 0rpx 0rpx 0rpx;
    }

    .detailsRefund_fd2_10_babdd {
      border-radius: 16rpx 16rpx 16rpx 16rpx;
      background: #ffffff;
      padding: 32rpx 11rpx 32rpx 24rpx;
      margin: 24rpx 0rpx 200rpx 0rpx;

      .detailsRefund_fd2_10_c0_babdd {
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        padding: 0rpx 0rpx 24rpx 0rpx;
        margin: 0rpx 13rpx 0rpx 0rpx;
      }

      .detailsRefund_fd2_10_c1_babdd {
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        padding: 24rpx 0rpx 24rpx 0rpx;
        margin: 0rpx 13rpx 0rpx 0rpx;

        .detailsRefund_fd2_10_c1_c0_babdd {
          width: 200rpx;
          height: 200rpx;
          border-radius: 16rpx 16rpx 16rpx 16rpx;
        }

        .detailsRefund_fd2_10_c1_c1_babdd {
          margin: 0rpx 0rpx 0rpx 16rpx;

          .detailsRefund_fd2_10_c1_c1_c0_babdd {
            font-size: 28rpx;
            font-weight: 500;
            color: var(--benbenFontColor0);
            line-height: 42rpx;
          }

          .detailsRefund_fd2_10_c1_c1_c1_babdd {
            font-size: 24rpx;
            font-weight: 400;
            color: var(--benbenFontColor1);
            line-height: 33rpx;
            margin: 8rpx 0rpx 36rpx 0rpx;
          }

          .detailsRefund_fd2_10_c1_c1_c2_c0_babdd {
            line-height: 40rpx;
            font-size: 32rpx;
            font-weight: 700;
            color: var(--benbenFontColor0);
          }

          .detailsRefund_fd2_10_c1_c1_c2_c1_babdd {
            color: var(--benbenFontColor0);
            font-weight: 700;
            line-height: 40rpx;
            font-size: 32rpx;

            .detailsRefund_price2_fd2_10_c1_c1_c2_c1_babdd {
              font-size: 32rpx;
            }
          }

          .detailsRefund_fd2_10_c1_c1_c2_c2_babdd {
            margin: 0rpx 0rpx 0rpx auto;
          }
        }
      }
    }

    .detailsRefund_fd2_11_babdd {
      position: fixed;
      bottom: calc(0rpx + var(--benben-window-bottom, 0px));
      left: 0rpx;
      width: 750rpx;
      background: var(--benbenbgColor1);
      background-size: 100% auto !important;

      .detailsRefund_fd2_11_c0_babdd {
        margin: 12rpx 0rpx 12rpx 0rpx;
        height: 80rpx;

        .detailsRefund_fd2_11_c0_c0_babdd {
          width: 32rpx;
          height: 32rpx;
          margin: 0rpx 0rpx 0rpx 32rpx;
        }

        .detailsRefund_fd2_11_c0_c1_babdd {
          flex-shrink: 0;
          border-radius: 40rpx;
          font-size: 24rpx;
          background: #ffffff;
          color: var(--benbenbtnColor0);
          border: 2rpx solid var(--benbenbtnColor0);
          min-width: 160rpx;
          height: 60rpx;
          line-height: 56rpx;
          font-weight: 500;
          margin: 0;
          padding: 0 24rpx;
          margin: 0 auto 0 32rpx;
        }

        .detailsRefund_fd2_11_c0_c2_babdd {
          border-radius: 50rpx 50rpx 50rpx 50rpx;
          font-size: 24rpx;
          background: var(--benbenbtnColor3);
          color: var(--benbenFontColor0);
          height: 60rpx;
          line-height: 60rpx;
          margin: 0rpx 24rpx 0rpx 0rpx;
          padding: 0rpx 30rpx 0rpx 30rpx;
        }

        .detailsRefund_fd2_11_c0_c2_1_babdd {
          border-radius: 50rpx 50rpx 50rpx 50rpx;
          font-size: 24rpx;
          background: var(--benbenbgColor5);
          color: #333;
          width: 170rpx;
          height: 60rpx;
          line-height: 60rpx;
          margin: 0rpx 24rpx 0rpx 0rpx;
        }
      }
    }
  }

  .detailsRefund_fd2_0_c0_babdd {
    font-size: 28rpx;
    font-weight: 700;
    color: #fff;
    margin: 0rpx 0rpx 16rpx 0rpx;
    text-align: center;
  }

  .detailsRefund_fd2_0_c0_c0_babdd {
    font-size: 28rpx;
    font-weight: 700;
    color: var(--benbenFontColor3);
  }

  .detailsRefund_fd2_0_c1_babdd {
    padding: 0rpx 29rpx 0rpx 29rpx;
  }

  .detailsRefund_fd2_0_c1_c0_babdd {
    width: 48rpx;
    height: 48rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
  }

  .detailsRefund_fd2_0_c1_c1_babdd {
    height: 1rpx;
    background: var(--benbenbtnColor1);
    background-size: 100% auto !important;
  }

  .detailsRefund_fd2_0_c1_c2_babdd {
    width: 16rpx;
    height: 16rpx;
    border-radius: 24rpx 24rpx 24rpx 24rpx;
  }

  .detailsRefund_fd2_0_c1_c3_babdd {
    background: var(--benbenbtnColor1);
    background-size: 100% auto !important;
    height: 1rpx;
  }

  .detailsRefund_fd2_0_c2_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #ffffff;
    padding: 32rpx 0rpx 32rpx 24rpx;
    margin: 40rpx 0rpx 0rpx 0rpx;

    .detailsRefund_fd2_0_c2_c1_babdd {
      font-size: 24rpx;
      font-weight: 500;
      color: var(--benbenFontColor4);
      margin: 10rpx 0rpx 16rpx 0rpx;
      line-height: 33rpx;
    }
  }

  .detailsRefund_fd2_0_c2_c0_babdd {
    font-size: 32rpx;
    font-weight: 600;
    color: var(--benbenFontColor0);
  }

  .detailsRefund_fd2_0_c2_c2_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    margin: 8rpx 0rpx 20rpx 0rpx;
  }

  .detailsRefund_fd2_0_c2_c3_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
  }

  .detailsRefund_fd2_1_babdd {
    margin: 34rpx 0rpx 0rpx 0rpx;
  }

  .detailsRefund_fd2_1_c2_c1_babdd {
    font-size: 24rpx;
    font-weight: 500;
    color: var(--benbenFontColor4);
    margin: 10rpx 0rpx 16rpx 0rpx;
  }

  .detailsRefund_fd2_1_c3_babdd {
    width: 686rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #ffffff;
    padding: 32rpx 24rpx 32rpx 24rpx;
    margin: 24rpx 0rpx 0rpx 0rpx;
  }

  .detailsRefund_fd2_1_c3_c0_babdd {
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    padding: 0rpx 0rpx 24rpx 0rpx;
  }

  .detailsRefund_fd2_1_c3_c0_c0_babdd {
    width: 6rpx;
    height: 30rpx;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    background: var(--benbenbgColor0);
  }

  .detailsRefund_fd2_1_c3_c0_c1_babdd {
    font-size: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
    margin: 0rpx 0rpx 0rpx 16rpx;
  }

  .detailsRefund_fd2_1_c3_c1_babdd {
    margin: 24rpx 0rpx 0rpx 0rpx;
  }

  .detailsRefund_fd2_1_c3_c1_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 0rpx 0rpx 64rpx;
  }

  .detailsRefund_fd2_1_c3_c2_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 0rpx 0rpx 40rpx;
  }

  .detailsRefund_fd2_1_c3_c3_c0_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    width: 96rpx;
  }

  .detailsRefund_fd2_1_c3_c3_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 0rpx 0rpx 40rpx;
    width: 499rpx;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }

  .detailsRefund_fd2_1_c3_c4_babdd {
    margin: 9rpx 0rpx 0rpx 0rpx;
  }

  .detailsRefund_fd2_1_c3_c4_c0_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor4);
    margin: 0rpx 0rpx 0rpx 136rpx;
  }

  .detailsRefund_fd2_3_c2_babdd {
    width: 686rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #ffffff;
    padding: 32rpx 0rpx 32rpx 16rpx;
    margin: 40rpx 0rpx 0rpx 0rpx;
  }

  .detailsRefund_fd2_3_c3_babdd {
    border-radius: 16rpx 16rpx 16rpx 16rpx;
    background: #ffffff;
    padding: 32rpx 24rpx 32rpx 24rpx;
    margin: 24rpx 0rpx 0rpx 0rpx;
  }

  .detailsRefund_fd2_3_c3_c0_c0_babdd {
    font-size: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor0);
  }

  .detailsRefund_fd2_3_c3_c1_c2_babdd {
    color: var(--benbenFontColor0);
    font-weight: 600;
  }

  .detailsRefund_price1_fd2_3_c3_c1_c2_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: #333;
  }

  .detailsRefund_fd2_6_c1_babdd {
    margin: 10rpx 0rpx 16rpx 0rpx;
  }

  .detailsRefund_fd2_6_c1_c0_babdd {
    font-size: 24rpx;
    font-weight: 500;
    color: var(--benbenFontColor4);
  }

  .detailsRefund_fd2_6_c1_c1_babdd {
    font-size: 24rpx;
    font-weight: 500;
    color: var(--benbenFontColor4);
    margin: 0rpx 0rpx 0rpx 16rpx;
  }

  .detailsRefund_fd2_8_c3_c0_c0_babdd {
    width: 6rpx;
    height: 30rpx;
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    background: var(--benbenbgColor7);
  }

  .detailsRefund_fd2_10_c2_babdd {
    margin: 24rpx 13rpx 0rpx 0rpx;

    .detailsRefund_fd2_10_c2_c1_1_babdd {
      font-size: 24rpx;
      font-weight: 400;
      color: #333333;
      margin: 0rpx 0rpx 0rpx 40rpx;
    }
  }

  .detailsRefund_fd2_10_c5_c1_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    margin: 0rpx 0rpx 0rpx 40rpx;
    line-height: 33rpx;
  }

  .detailsRefund_fd2_10_c5_c2_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor4);
    margin: 0rpx 0rpx 0rpx 24rpx;
    line-height: 33rpx;
  }

  .detailsRefund_fd2_10_c7_c0_babdd {
    font-size: 24rpx;
    font-weight: 400;
    color: var(--benbenFontColor1);
    margin: 0rpx 40rpx 0rpx 0rpx;
  }

  .detailsRefund_fd2_10_c7_c1_c0_babdd {
    margin: 0rpx 10rpx 20rpx 0rpx;

    .detailsRefund_fd2_10_c7_c1_c0_c0_babdd {
      width: 160rpx;
      height: 160rpx;
      border-radius: 16rpx 16rpx 16rpx 16rpx;
    }
  }

  .detailsRefund_fd2_10_c7_c1_c1_babdd {
    font-size: 24rpx;
    color: var(--benbenFontColor1);
  }

  .detailsRefund_fd2_11_c0_c3_babdd {
    border-radius: 50rpx 50rpx 50rpx 50rpx;
    font-size: 24rpx;
    background: var(--benbenbtnColor3);
    color: var(--benbenFontColor0);
    width: 170rpx;
    height: 60rpx;
    line-height: 60rpx;
    margin: 0rpx 24rpx 0rpx 0rpx;
  }

  .detailsRefund_flex_1_babdd {
    background: #fff;
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .detailsRefund_fd1_0_babdd {
      font-size: 36rpx;
      font-weight: 800;
      line-height: 44rpx;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 40rpx 0rpx;
    }

    .detailsRefund_fd1_1_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      text-align: center;
      margin: 0rpx 40rpx 0rpx 40rpx;
    }

    .detailsRefund_fd1_2_babdd {
      margin: 37rpx 0rpx 0rpx 0rpx;

      .detailsRefund_fd1_2_c0_babdd {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 0rpx 16rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor1);
        border-top: 1px solid var(--benbenbdColor0);
        width: 269rpx;
      }

      .detailsRefund_fd1_2_c1_babdd {
        line-height: 110rpx;
        border-radius: 0rpx 0rpx 16rpx 0rpx;
        font-size: 32rpx;
        background: var(--benbenbtnColor1);
        color: var(--benbenFontColor0);
        border-top: 1px solid var(--benbenbdColor0);
        border-left: 1px solid var(--benbenbdColor0);
        width: 269rpx;
      }
    }
  }

  .detailsRefund_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: #fff;
    background-size: 100% auto !important;

    .detailsRefund_fd0_1_babdd {
      color: var(--benbenFontColor0);
      font-size: 36rpx;
      font-weight: 600;
      line-height: 50rpx;
    }
  }

  .detailsRefund_fd0_0_babdd {
    width: 100rpx;
    height: 88rpx;

    .detailsRefund_fd0_0_c0_babdd {
      width: 20rpx;
      height: 36rpx;
      border-radius: 0rpx 0rpx 0rpx 0rpx;
      margin: 0rpx 0rpx 0rpx 32rpx;
    }
  }
}
</style>
