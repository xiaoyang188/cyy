<template>
  <view class="benben-image-upload" @click="clickEvent">
    <slot />
    <view v-if="isShowProgress" class="progress-wrapper">
      <view class="progress-wrapper-inner">
        <progress :percent="progress" :active-color="activeColor" stroke-width="5" border-radius="3" class="upload-progress" />
        <view class="upload-text">{{ progress }}%</view>
      </view>
    </view>
  </view>
</template>
<script>
import UploadImage from '@/common/utils/upload-image.js'
import { syncUniApi } from '@/common/utils/utils.js'
/*  @property  {String} imgiId            图片id    选填填项
      @property  {String} path            图片路径    必填项
      @property  {Boolean} isCropping     是否开启裁剪模式   false
      @property  {Boolean} isShowClean     是否显示删除图标   false
      @property  {function} update-success  上传成功回调
      */
// isShowClean 为true 时  slot 中必须有一个data-type="clean"的 text 标签
// <text  data-type="clean" class='fu-iconfont2 position-absolute'>&#xE8E7;</text>
import { themeColorConfig } from '@/common/config.js'
export default {
  name: 'benben-image-upload',
  // #ifdef MP-ALIPAY
  options: {
    virtualHost: false,
    styleIsolation: 'apply-shared',
  },
  // #endif
  props: {
    isShowClean: {
      type: [Boolean],
      default: false,
    },
    isCropping: {
      type: [Boolean],
      default: false,
    },
    uploadLoading: {
      type: [Boolean],
      default: false,
    },
    path: {
      type: String,
      default: '',
    },
    imgiId: {
      type: [String, Number],
      default: '',
    },
    imgFrom: {
      type: String,
      default: 'album',
    },
    // croppingTypes裁切模式   auto（不设尺寸）、settled（固定尺寸）
    croppingTypes: {
      type: [String],
      default: 'settled',
    },
    croppingWidth: {
      type: [Number, String],
      default: 200,
    },
    croppingHeight: {
      type: [Number, String],
      default: 200,
    },
    atype: {
      type: [String],
      default: 'upload',
    },
  },
  data: () => ({
    uploading: false,
    progress: 0,
    isShowProgress: false,
  }),
  computed: {
    activeColor() {
      const btnColor = themeColorConfig[0]?.btnColorConfig?.[0]
      return btnColor || '#2f98fe'
    },
  },
  //监听imgIds
  watch: {},
  methods: {
    // —————————————————————— 签名组件 start ——————————————————————
    onSign() {
      uni.navigateTo({
        url: '/pages/benben-built-in/image-sign/image-sign',
        success: this.imageCroppingCuccess,
      })
    },
    // —————————————————————— 签名组件 start ——————————————————————
    delImage() {
      this.$emit('update:img-id', '')
      this.$emit('update:path', '')
    },
    clickEvent(e) {
      if (this.isShowClean && this.path) {
        uni.previewImage({
          current: this.path,
          urls: [this.path],
        })
        return
      }
      if (this.atype == 'sign') {
        this.onSign()
        return
      }
      if (!this.isCropping) this.soloChooseImage()
      else this.croppingUploadImage()
    },
    UploadImage(tempFiles) {
      this.$emit('update:upload-loading', true)
      // 开始上传
      this.uploading = true
      new UploadImage(tempFiles, {
        complete: (res) => {
          this.uploading = false
          this.$emit('update:img-id', res[0].id)
          this.$emit('update:path', res[0].path)
          this.$emit('update:upload-loading', false)
          this.$emit('update-success', res[0])
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
          this.$emit('update:upload-loading', false)
          this.$emit('update:path', '')
          setTimeout(() => {
            this.isShowProgress = false
            this.progress = 0
          }, 300)
        },
      })
    },
    async soloChooseImage() {
      if (this.isShowProgress) return
      if (this.uploading) return
      // 从相册中选择图片
      let sArr = ['album']
      if (this.imgFrom == 'all') sArr = ['album', 'camera']
      if (this.imgFrom == 'camera') sArr = ['camera']
      let res = await syncUniApi('chooseImage', {
        count: 1,
        sourceType: sArr,
        sizeType: ['original', 'compressed'],
      })
      // 先将本地图片路径显示到页面上，待上传成功后在赋值给imgList
      this.$emit('update:path', res.tempFiles[0].path)
      this.progress = 0
      this.isShowProgress = true
      this.UploadImage(res.tempFiles)
    },
    imageCroppingCuccess() {
      uni.$once('image-cropping-success', (file) => {
        if (!file) return
        this.UploadImage([file])
      })
    },
    getImgFrom() {
      let arr = []
      if (this.path) {
        if (this.imgFrom == 'all') {
          arr = [global.i18n.t('修改头像'), global.i18n.t('拍照'), global.i18n.t('从手机相册选择')]
        } else if (this.imgFrom == 'camera') {
          arr = [global.i18n.t('修改头像'), global.i18n.t('拍照')]
        } else if (this.imgFrom == 'album') {
          arr = [global.i18n.t('修改头像'), global.i18n.t('从手机相册选择')]
        }
      } else {
        if (this.imgFrom == 'all') {
          arr = [global.i18n.t('拍照'), global.i18n.t('从手机相册选择')]
        } else if (this.imgFrom == 'camera') {
          arr = [global.i18n.t('拍照')]
        } else if (this.imgFrom == 'album') {
          arr = [global.i18n.t('从手机相册选择')]
        }
      }
      return arr
    },
    getSourceType(res) {
      let sourceTypeArr = []
      // [修改头像，拍照，从手机相册选择]
      if (this.path) {
        if (res.tapIndex == 0) {
          uni.navigateTo({
            url: `/pages/benben-built-in/image-cropping/image-cropping?croppingTypes=${this.croppingTypes}&rectWidth=${this.croppingWidth}&rectHeight=${this.croppingHeight}&myImgUrl=${this.path}`,
            animationDuration: 0,
            success: this.imageCroppingCuccess,
          })
          return
        } else if (res.tapIndex == 1) {
          if (this.imgFrom == 'all') {
            sourceTypeArr = ['camera']
          } else {
            sourceTypeArr = [this.imgFrom]
          }
        } else if (res.tapIndex == 2) {
          sourceTypeArr = ['album']
        }
      } else {
        if (this.imgFrom == 'all') {
          if (res.tapIndex == 0) {
            sourceTypeArr = ['camera']
          } else if (res.tapIndex == 1) {
            sourceTypeArr = ['album']
          }
        } else {
          sourceTypeArr = [this.imgFrom]
        }
      }
      return sourceTypeArr
    },
    // 裁剪图片上传
    croppingUploadImage() {
      let itemList = this.getImgFrom()
      uni.showActionSheet({
        itemList: itemList,
        success: async (res) => {
          let sourceTypeArr = this.getSourceType(res)
          console.log('sourceTypeArr:', sourceTypeArr)
          if (!sourceTypeArr) return
          let FilesRes = await syncUniApi('chooseImage', {
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: sourceTypeArr, // 可以指定来源是相册还是相机，默认二者都有
          })
          // 跳转到图片裁切页面
          uni.navigateTo({
            url: `/pages/benben-built-in/image-cropping/image-cropping?croppingTypes=${this.croppingTypes}&rectWidth=${this.croppingWidth}&rectHeight=${this.croppingHeight}&fileType=${FilesRes.tempFiles[0].type}&myImgUrl=${FilesRes.tempFilePaths[0]}`,
            animationDuration: 0,
            success: this.imageCroppingCuccess,
          })
        },
        fail: function (res) {
          console.log(res.errMsg)
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
<style lang="scss">
.benben-image-upload {
  line-height: initial;
}
.progress-wrapper {
  // 加一个显示隐藏的过渡动画
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  .progress-wrapper-inner {
    position: absolute;
    top: 42%;
    width: 100%;
    .upload-progress {
      width: 92%;
      border-radius: 10rpx;
      margin: 0 auto;
    }
    .upload-text {
      margin-top: 16rpx;
      text-align: center;
      color: #fff;
      position: relative;
      top: 60%;
    }
  }
}
</style>
