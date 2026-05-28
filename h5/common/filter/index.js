import Vue from 'vue';
import Dayjs from '@/libs/day.js';
import store from '@/store/index.js';
import richText from '@/common/utils/richText.js';
// 格式化富文本内容
Vue.filter('richTextFormat', richText.format);
// 识别图片路径是否为全路径 若不是则进行拼接
Vue.filter('assembleImgSrc', src => {
  src = src || ''
  if (src.indexOf('http://') != -1 || src.indexOf('https://') != -1) {
    return src
  }
  if (src.indexOf('/uploads/') != -1 || src.indexOf('/uploads/') != -1) {
    return BASE_URL + src
  } else {
    return IMG_BASE_URL + src
  }
});

// 日期格式转换
Vue.filter('formatDate', (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  return Dayjs(date).format(format)
});

// 格式化数字
Vue.filter('formatNumber', (number, tag = 'w') => {
  number = Number(number);
  if (number >= 10000) {
    return (Math.floor(number / 1000) / 10).toFixed(1) + tag;
  } else {
    return number;
  }
});

// 格式化角标数字
Vue.filter('formatTagNumber', number => {
  if (number >= 100) {
    return "99+";
  } else {
    return number;
  }
});
// 手机号脱敏
Vue.filter('filterMobile', function (val) {
  if (!val) return "";
  return val.substr(0, 3) + "****" + val.substr(-4);
})
/**
 * @description 输出数字价格/小数点
 * @param {String} name 要过滤的字符
 * @param {Number} type 取值类型，1=价格，2=小数点
 * @param {Number} textCount 小数点位数
 * */
Vue.filter('formatPrice', function (name, type, textCount) {
  let num, smore;
  let data = name
  textCount = textCount || 2
  if (!data || isNaN(data)) {
    num = data
    smore = ''
  } else {
    let arr = Number(data).toFixed(textCount).split('.')
    num = arr[0]
    smore = arr[1]
  }
  if (type == 1) { //输出数字
    return num
  } else { //输出小数点
    return smore
  }
})
Vue.filter('frontPrice', function (val, unit) {
  let e = +val
  if (isNaN(e)) return '0'
  if (unit && +e >= 10000) {
    return (+e / 10000).toFixed(2).split('.')[0]
  }
  return e.toFixed(2).split('.')[0]
})
Vue.filter('laterPrice', function (val, unit) {
  let e = +val
  if (isNaN(e)) return '.00'
  if (unit && +e >= 10000) {
    return '.' + (+e / 10000).toFixed(2).split('.')[1] + unit
  }
  return '.' + e.toFixed(2).split('.')[1]
})
