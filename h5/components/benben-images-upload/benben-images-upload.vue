<template>
  <view>
    <slot />
  </view>
</template>
<script>
import UploadImage from '@/common/utils/upload-image.js'
import { SERVER_TYPE } from '@/common/config.js'
import { syncUniApi } from '@/common/utils/utils.js'
export default {
  name: 'benben-images-upload',
  props: {
    maxlength: {
      type: [String, Number],
      default: '9',
    },
    imgList: {
      type: Array,
      default: () => [],
    },
    isShowTips: {
      type: Boolean,
      default: false,
    },
    imgIds: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    uploading: false,
    imgIdArr: [],
    progress: 0,
    isShowProgress: false,
  }),
  watch: {
    imgIds: {
      handler(val) {
        if (SERVER_TYPE !== 0) {
          this.imgIdArr = val ? (val + '').split(',') : []
        }
      },
      immediate: true,
    },
    imgList: {
      handler(val) {
        if (SERVER_TYPE === 0) {
          this.$emit('update:img-ids', val.length ? JSON.stringify(val) : '')
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    //点击删除
    delImage(index) {
      let imgList = JSON.parse(JSON.stringify(this.imgList))
      imgList.splice(index, 1)
      this.$emit('update:img-list', imgList)
      if (SERVER_TYPE !== 0) {
        let imgIdArr = JSON.parse(JSON.stringify(this.imgIdArr))
        imgIdArr.splice(index, 1)
        this.$emit('update:img-ids', imgIdArr.join(','))
      }
    },
    //点击预览
    previewImage(index) {
      uni.previewImage({
        current: this.imgList[index],
        urls: this.imgList,
      })
    },
    async manyChooseImage() {
      let imgIdArr = JSON.parse(JSON.stringify(this.imgIdArr))
      let imgList = JSON.parse(JSON.stringify(this.imgList))
      if (this.uploading) return
      if (this.maxlength - this.imgList.length < 1) return
      let res = await syncUniApi('chooseImage', {
        count: this.maxlength - this.imgList.length, // 默认3
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      })
      this.progress = 0
      this.isShowProgress = true
      this.uploading = true
      // 开始上传
      new UploadImage(res.tempFiles, {
        complete: (res) => {
          this.uploading = false
          res.map((item) => {
            imgIdArr.push(item.id)
            imgList.push(item.path)
          })
          if (SERVER_TYPE !== 0) {
            this.$emit('update:img-ids', imgIdArr.join(','))
          }
          setTimeout(() => {
            this.$emit('update:img-list', imgList)
          }, 300)
        },
        progressChange: (res) => {
          this.progress = res
          if (res === 100) {
            setTimeout(() => {
              this.isShowProgress = false
              this.progress = 0
            }, 300)
          }
        },
        fail: (err) => {
          console.error(err)
          this.uploading = false
          setTimeout(() => {
            this.isShowProgress = false
            this.progress = 0
          }, 300)
        },
      })
    },
  },
  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>
