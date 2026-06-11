import {
  bindNativePaySuccess,
  unbindNativePaySuccess,
  bindNativePayCancel,
  unbindNativePayCancel,
  navigateToResultPayment,
  navigateToOrderList,
  openNativePay,
  goHostAppPay,
  resolveShopToken,
} from '@/common/utils/hostAppPay.js'

/**
 * App web-view 原生支付 mixin
 * - setupHostAppPaySuccess(onSuccess, onCancel) 在 onLoad 调用
 * - teardownHostAppPaySuccess() 在 onUnload 调用
 * - proceedHostAppPay(...) 统一去付款流程
 */
export default {
  methods: {
    setupHostAppPaySuccess(onSuccess, onCancel) {
      bindNativePaySuccess((passedOrderSn) => {
        const orderSn = passedOrderSn || this.currentOrderSn
        if (!orderSn) return
        if (typeof onSuccess === 'function') {
          onSuccess.call(this, orderSn)
          return
        }
        navigateToResultPayment(orderSn)
      })
  bindNativePayCancel(() => {
    if (typeof onCancel === 'function') {
      onCancel.call(this)
      return
    }
    navigateToOrderList()
  })
    },
    teardownHostAppPaySuccess() {
      unbindNativePaySuccess()
      unbindNativePayCancel()
    },
    callHostAppPay(orderSn, amount, options = {}) {
      const orderType = options.orderType !== undefined ? options.orderType : 3
      const source = options.source || ''
      const payAmount = amount !== undefined && amount !== null ? amount : options.amount
      return openNativePay({
        orderSn,
        amount: payAmount,
        orderType,
        token: resolveShopToken(this),
        source,
        vm: this,
      })
    },
    /**
     * @param {Object} params
     * @param {string} params.orderSn
     * @param {string|number} params.amount
     * @param {string|number} [params.orderType=3]
     * @param {string} [params.source]
     * @param {string} [params.offerPayExtra] offerPay 额外 query，如 &order_type=3&payPath=1
     * @param {Function} [params.onZeroAmount] 零元回调，默认跳 resultPayment
     * @param {Function} [params.onFallback] 非 App 环境回调，默认跳 offerPay
     */
    async proceedHostAppPay({ orderSn, amount, orderType = 3, source = '', offerPayExtra = '', onZeroAmount, onFallback }) {
      if (!orderSn) return false
      this.currentOrderSn = orderSn

      const result = await goHostAppPay({
        orderSn,
        amount,
        orderType,
        token: resolveShopToken(this),
        source,
        vm: this,
      })

      if (result === 'zero') {
        if (typeof onZeroAmount === 'function') {
          onZeroAmount.call(this, orderSn)
        } else {
          this.$urouter.redirectTo(`/pages/sy/resultPayment/resultPayment?order_sn=${orderSn}`)
        }
        return true
      }

      if (result === 'native') {
        return true
      }

      if (typeof onFallback === 'function') {
        onFallback.call(this, orderSn)
        return false
      }

      const extra = offerPayExtra ? (offerPayExtra.startsWith('&') ? offerPayExtra : `&${offerPayExtra}`) : `&order_type=${orderType}`
      this.$urouter.redirectTo(`/pages/sy/offerPay/offerPay?order_sn=${orderSn}${extra}`)
      return false
    },
  },
}
