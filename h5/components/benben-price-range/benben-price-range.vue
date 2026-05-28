<template>
  <view :style="styleInfo" class="benben-price-range">
    <view class="price-list">
      <view class="price_item_box" @click="handlePrice(item)" v-for="(item, i) in list" :key="i">
        <view :class="{ price_item: true, active: minPrice == item[minkey] && maxPrice == item[maxKey] }">
          {{ item[nameKey] }}
        </view>
      </view>
    </view>
    <view class="price_input_box">
      <input
        type="number"
        :value="minPrice"
        placeholder-style="font-size:20rpx"
        :placeholder="$t('最小金额')"
        @input="inputRrice('min-price', $event)"
      />
      <text style="color: #999">ㅡ</text>
      <input
        type="number"
        :value="maxPrice"
        placeholder-style="font-size:20rpx"
        :placeholder="$t('最大金额')"
        @input="inputRrice('max-price', $event)"
      />
    </view>
  </view>
</template>
<script>
export default {
  name: 'benben-price-range',
  props: {
    list: {
      type: Array,
      default: () => [
        { name: `0-99${global.i18n.t('元')}`, min: '0', max: '99' },
        { name: `100-199${global.i18n.t('元')}`, min: '100', max: '199' },
        { name: `200-299${global.i18n.t('元')}`, min: '200', max: '299' },
        { name: `300-599${global.i18n.t('元')}`, min: '300', max: '599' },
        { name: `600${global.i18n.t('元')}+`, min: '600', max: '' },
      ],
    },
    minPrice: { type: [Number, String], default: '' },
    maxPrice: { type: [Number, String], default: '' },
    activeColor: { type: String, default: '#FD513D' },
    priceColor: { type: String, default: '#f8f8f8' },
    nameKey: { type: [Number, String], default: 'name' },
    maxKey: { type: [Number, String], default: 'max' },
    minkey: { type: [Number, String], default: 'min' },
  },

  watch: {},
  components: {},
  computed: {
    styleInfo() {
      return `--active-color:${this.activeColor};--price-color:${this.priceColor}`
    },
  },
  data() {
    return {}
  },
  methods: {
    handlePrice(item) {
      this.$emit('update:min-price', item[this.minkey])
      this.$emit('update:max-price', item[this.maxKey])
    },
    inputRrice(type, e) {
      this.$emit(`update:${type}`, e.detail.value)
    },
  },
  created() {},
}
</script>
<style lang="scss" scoped>
.price-list {
  display: flex;
  flex-wrap: wrap;
  .price_item_box {
    width: 33.33%;
    padding: 5rpx;
    .price_item {
      padding: 0 12rpx;
      line-height: 66rpx;
      background-color: var(--price-color);
      text-align: center;
      border-radius: 8rpx;
      border: 1px solid var(--price-color);
      &.active {
        border: 1px solid var(--active-color);
        background-color: #fff;
        color: var(--active-color);
      }
    }
  }
}
.price_input_box {
  display: flex;
  justify-content: space-between;
  padding-top: 15rpx;
  line-height: 66rpx;
  input {
    width: 40%;
    height: 66rpx;
    line-height: 66rpx;
    border-radius: 33rpx;
    background-color: var(--price-color);
    text-align: center;
    font-size: inherit;
  }
}
</style>
