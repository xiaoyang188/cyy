<template>
  <page-body>
    <view class="page">
      <view
        class="flex align-stretch benben-position-layout flex editAddress_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex align-center justify-between flex-sub editAddress_fd0_0_babdd">
          <view class="flex align-center editAddress_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 editAddress_fd0_0_c0_c0_babdd">&#xE794;</text>
          </view>
          <view class="flex align-center">
            <text class="editAddress_fd0_0_c1_c0_babdd" v-if="id == ''">{{ $t('添加地址') }}</text>
            <text class="editAddress_fd0_0_c1_c0_1_babdd" v-if="id != ''">{{ $t('编辑地址') }}</text>
          </view>
          <view class="flex align-center justify-end editAddress_fd0_0_c0_babdd">
            <text class="editAddress_fd0_0_c2_c0_babdd" v-if="id != ''" @tap.stop="popupShow1686733151756 = true">{{ $t('删除') }}</text>
          </view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---添加地址flex布局开始-->
      <view class="flex flex-direction align-stretch benben-flex-layout">
        <view class="editAddress_smart_card" v-if="id == ''">
          <view class="flex align-center justify-between editAddress_smart_header">
            <text class="editAddress_smart_title">{{ $t('智能识别地址') }}</text>
            <view class="editAddress_smart_btn" :class="{ editAddress_smart_btn_disabled: addressRecognizing }" @tap.stop="recognizeAddressFunc()">
              <text>{{ $t('识别') }}</text>
            </view>
          </view>
          <view class="editAddress_field_box">
            <textarea
              class="editAddress_smart_textarea"
              v-model="smartAddressText"
              :placeholder="$t('粘贴整段文字如：张三1xxxxxxxxxXX省XX市XX区xxxx')"
              placeholder-style="color:var(--benbenFontColor2);font-size:28rpx;line-height:44rpx"
              maxlength="500"
              :disabled="addressRecognizing"
            />
          </view>
        </view>
        <view class="flex flex-direction align-stretch editAddress_fd1_0_babdd" :class="{ editAddress_fd1_0_babdd_first: id != '' }">
          <view class="flex flex-wrap align-center editAddress_fd1_0_c0_babdd">
            <text class="editAddress_fd1_0_c0_c0_babdd">{{ $t('标签') }}</text>
            <benben-address-label class="editAddress_fd1_0_c0_c1_babdd" v-model="dataMessage.label_name"></benben-address-label>
          </view>
          <view class="flex align-center editAddress_fd1_0_c0_babdd">
            <text class="editAddress_fd1_0_c0_c0_babdd">{{ $t('收货人') }}</text>
            <benben-input
              class="flex-sub editAddress_fd1_0_c1_c1_babdd"
              type="text"
              :placeholder="$t('收货人')"
              confirm-type="done"
              :maxlength="15"
              placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"
              v-model="dataMessage.real_name"
            />
            <view class="flex flex-wrap align-center">
              <benben-select-diy
                ref="showSelectPopup1750835209373"
                class-text="flex"
                :items.sync="sex_type"
                v-model="dataMessage.sex"
                :label.sync="sex_id"
                default-type="value"
                default-label="name"
                :allow-cancel="false"
                type="radio"
                :disabled="false"
              >
                <benben-select-item v-for="(item, key0) in sex_type" :hand-value="item.value" :key="key0">
                  <template #selected>
                    <view class="flex align-center flex editAddress_fd1_0_c1_c2_c0_c0_babdd">
                      <text class="fu-iconfont2 editAddress_fd1_0_c1_c2_c0_c0_c0_babdd">&#xE847;</text>
                      <text class="editAddress_fd1_0_c1_c2_c0_c0_c1_babdd">{{ item.name }}</text>
                    </view>
                  </template>
                  <template #no-selected>
                    <view class="flex align-center flex editAddress_fd1_0_c1_c2_c0_c0_babdd">
                      <text class="fu-iconfont2 editAddress_fd1_0_c1_c2_c0_c1_c0_babdd">&#xE755;</text>
                      <text class="editAddress_fd1_0_c1_c2_c0_c1_c1_babdd">{{ item.name }}</text>
                    </view>
                  </template>
                </benben-select-item>
              </benben-select-diy>
            </view>
          </view>
          <view class="flex flex-wrap align-center editAddress_fd1_0_c0_babdd">
            <text class="editAddress_fd1_0_c0_c0_babdd">{{ $t('联系电话') }}</text>
            <benben-input
              class="flex-sub editAddress_fd1_0_c2_c1_babdd"
              type="number"
              :placeholder="$t('联系电话')"
              confirm-type="done"
              :maxlength="11"
              placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"
              v-model="dataMessage.mobile"
            />
          </view>
          <view class="flex flex-direction flex-wrap align-stretch">
            <view class="flex flex-wrap align-center editAddress_fd1_0_c3_c0_babdd" @tap.stop="pickerDiy1750835034667 = true">
              <text class="editAddress_fd1_0_c3_c0_c0_babdd">{{ $t('所在地区') }}</text>
              <benben-input
                class="flex-sub editAddress_fd1_0_c3_c0_c1_babdd"
                type="text"
                :placeholder="$t('请选择省市区县、乡镇')"
                confirm-type="done"
                :maxlength="-1"
                :disabled="true"
                placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"
                v-model="dataMessage.address_code_area_str"
              />
              <text class="fu-iconfont2 editAddress_fd1_0_c3_c0_c2_babdd" @tap.stop="mapSelectFunc()">&#xe65a;</text>
            </view>
            <view class="editAddress_field_box editAddress_field_box_detail">
              <benben-textarea
                class="flex editAddress_input_fd1_0_c3_c1_babdd"
                confirm-type="done"
                :placeholder="$t('请填写详细地址：如道路、门牌号、小区、楼栋号等')"
                :maxlength="240"
                placeholder-style="color:var(--benbenFontColor2);font-size:28rpx;line-height:44rpx"
                v-model="dataMessage.detail"
              />
            </view>
          </view>
        </view>
        <view class="flex flex-wrap align-center justify-between editAddress_fd1_1_babdd">
          <text class="editAddress_fd1_1_c0_babdd">{{ $t('设为默认地址') }}</text>
          <benben-switch
            class="editAddress_fd1_1_c1_babdd"
            v-model="is_default"
            default-color="var(--benbenFontColor2)"
            color="var(--benbenFontColor4)"
            :disabled="false"
            :auto="true"
            size="72"
          ></benben-switch>
        </view>
        <view class="aa" style="height: 80rpx"></view>
        <view class="flex flex-wrap align-center justify-center editAddress_fd1_2_babdd">
          <button class="editAddress_fd1_2_c0_babdd" @tap.stop="addAddressFunc()" v-if="id == ''">{{ $t('保存') }}</button>
          <button class="editAddress_fd1_2_c0_1_babdd" @tap.stop="editAddressFunc()" v-if="id != ''">{{ $t('保存') }}</button>
        </view>
      </view>

      <!---添加地址flex布局结束-->
      <benben-popup v-model="popupShow1686733151756" :mask="true" :mask-close-able="true" mode="center">
        <!---基础弹窗flex布局开始-->
        <view class="flex flex-direction flex-wrap align-center editAddress_flex_2_babdd">
          <text class="editAddress_fd2_0_babdd">{{ $t('提示') }}</text>
          <text class="editAddress_fd2_1_babdd">{{ $t('确定删除该地址?') }}</text>
          <view class="flex align-center">
            <button class="editAddress_fd2_2_c0_babdd" @tap.stop="popupShow1686733151756 = false">{{ $t('取消') }}</button>
            <button class="editAddress_fd2_2_c1_babdd" @tap.stop="deleteAddressFunc()">{{ $t('确定') }}</button>
          </view>
        </view>

        <!---基础弹窗flex布局结束-->
      </benben-popup>
      <!--选择器开始 -->
      <benben-picker
        class=""
        ref="benbenWritePickerCodepicker3"
        :visible.sync="pickerDiy1750835034667"
        :label.sync="dataMessage.address_code_area_str"
        :province.sync="dataMessage.address_code_province"
        :city.sync="dataMessage.address_code_city"
        :area.sync="dataMessage.address_code_district"
        mode="region"
        :mask-show="true"
        :picker-height="88"
        :hide-area="false"
      >
        <template #picker-header>
          <view class="flex flex-wrap align-center justify-between editAddress_picker3_0_babdd">
            <text class="editAddress_picker3_0_c0_babdd" @tap="$refs.benbenWritePickerCodepicker3.cancel()">{{ $t('取消') }}</text>
            <text class="editAddress_picker3_0_c1_babdd">{{ $t('请选择所在地址') }}</text>
            <text class="editAddress_picker3_0_c2_babdd" @tap="$refs.benbenWritePickerCodepicker3.pickerConfirm()">{{ $t('确定') }}</text>
          </view>
        </template>
      </benben-picker>
      <!--选择器结束 -->
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},

  data() {
    return {
      pickerDiy1750835034667: false,
      popupShow1686733151756: false,
      is_default: false,
      address: '',
      sex_type: [
        {
          name: '先生',
          value: '1',
          image: '',
        },
        {
          name: '女士',
          value: '2',
          image: '',
        },
      ],
      sex_id: '1',
      address_type: [
        {
          name: '公司',
          value: '1',
          image: '',
        },
        {
          name: '家',
          value: '2',
          image: '',
        },
      ],
      address_id: '1',
      /** address_code_area_str【省市区中文】
       *   address_code_area【省市区】
       *   lat【纬度】
       *   lng【经度】
       *   address_code_district【address_code区】
       *   address_code_city【address_code市】
       *   address_code_province【address_code省】
       *   detail【详细地址】
       *   address_code【省市区code】
       *   real_name【姓名】
       *   create_time【创建时间】
       *   district_id【所在区id】
       *   district【区】
       *   city_id【所在城市id】
       *   city【市】
       *   province【省】
       *   is_default【是否默认】
       *   province_id【所在省份id】
       *   sex【性别】
       *   label_name【标签】
       *   mobile【电话】
       *   aid【ID】 **/
      dataMessage: {
        aid: '',
        mobile: '',
        label_name: '',
        sex: '',
        province_id: '',
        is_default: '',
        province: '',
        city: '',
        city_id: '',
        district: '',
        district_id: '',
        create_time: '',
        real_name: '',
        address_code: '',
        detail: '',
        address_code_province: '',
        address_code_city: '',
        address_code_district: '',
        lng: '',
        lat: '',
        address_code_area: '',
        address_code_area_str: '',
      },
      real_name: '',
      dataEssay: [],
      dataType: [],
      dataDetails: [],
      /** longitude【经度(lon)】
       *   latitude【纬度(lat)】
       *   address【详细地址】
       *   name【位置名称】 **/
      mapMessage: {
        name: '',
        address: '',
        latitude: '',
        longitude: '',
      },
      /** district【区】
       *   city【市】
       *   province【省】
       *   area【城市】
       *   lat【纬度】
       *   lng【经度】 **/
      datamap: {
        lng: '',
        lat: '',
        area: '',
        province: '',
        city: '',
        district: '',
      },
      id: '',
      smartAddressText: '',
      addressRecognizing: false,
    }
  },
  computed: {},
  watch: {},
  onLoad(options) {
    let { id } = options
    if (id !== undefined) this.id = id
    this.getaddressMessageFunc()
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
    //添加地址
    async addAddressFunc() {
      // if (!validate(this.dataMessage.label_name, 'require')) {
      //   this.$message.info(this.$t('请选择地址标签'))
      //   return false
      // }
      if (!validate(this.dataMessage.real_name, 'require')) {
        this.$message.info(this.$t('请输入收货人名称'))
        return false
      }
      if (!validate(this.dataMessage.mobile, 'require')) {
        this.$message.info(this.$t('请输入联系电话'))
        return false
      }
      if (!validate(this.dataMessage.mobile, 'phone')) {
        this.$message.info(this.$t('请输入正确的手机号'))
        return false
      }
      if (!validate(this.dataMessage.address_code_province, 'require')) {
        this.$message.info(this.$t('请选择省市区'))
        return false
      }
      if (!validate(this.dataMessage.detail, 'require')) {
        this.$message.info(this.$t('请输入详细地址'))
        return false
      }
      if (this.is_default === true) {
        this.dataMessage.is_default = '1'
      } else {
        this.dataMessage.is_default = '0'
      }
      //请求方法
      //数据验证

      let datadataEssay = await this.$api.dbPost(global.apiUrls.post637defdbd53ef, {
        real_name: this.dataMessage.real_name,
        mobile: this.dataMessage.mobile,
        detail: this.dataMessage.detail,
        sex: this.dataMessage.sex,
        label_name: this.dataMessage.label_name,
        is_default: this.dataMessage.is_default,
        lng: this.datamap.lng,
        lat: this.datamap.lat,
        province: this.dataMessage.address_code_province,
        city: this.dataMessage.address_code_city,
        district: this.dataMessage.address_code_district,
      })
      if (!datadataEssay) return
      if (datadataEssay.data.code != 1) {
        this.$message.info(datadataEssay.data.msg)
        return
      }
      let infodataEssay = datadataEssay.data
      this.dataEssay = infodataEssay.data

      this.$message.info('添加成功')
      setTimeout(() => {
        this.$urouter.navigateBack(1)
      }, 500)
    },
    //获取单个地址
    async getaddressMessageFunc() {
      this.dataMessage.sex = '1'
      if (this.id != '') {
        //请求方法
        //数据验证

        let datadataMessage = await this.$api.get(global.apiUrls.post636fd7826b3ee, {
          address_id: this.id,
        })

        if (datadataMessage.data.code != 1) {
          this.$message.info(datadataMessage.data.msg)
          return
        }
        let infodataMessage = datadataMessage.data
        this.dataMessage = infodataMessage.data
      }
      if (this.dataMessage.is_default == '1') {
        this.is_default = true
      } else {
        this.is_default = false
      }
    },
    //编辑地址
    async editAddressFunc() {
      // if (!validate(this.dataMessage.label_name, 'require')) {
      //   this.$message.info(this.$t('请选择地址标签'))
      //   return false
      // }
      if (!validate(this.dataMessage.real_name, 'require')) {
        this.$message.info(this.$t('请输入收货人名称'))
        return false
      }
      if (!validate(this.dataMessage.mobile, 'require')) {
        this.$message.info(this.$t('请输入联系电话'))
        return false
      }
      if (!validate(this.dataMessage.mobile, 'phone')) {
        this.$message.info(this.$t('请输入正确的联系电话'))
        return false
      }
      if (!validate(this.dataMessage.address_code_province, 'require')) {
        this.$message.info(this.$t('请选择省市区'))
        return false
      }
      if (!validate(this.dataMessage.detail, 'require')) {
        this.$message.info(this.$t('请输入详细地址'))
        return false
      }
      if (this.is_default === true) {
        this.dataMessage.is_default = '1'
      } else {
        this.dataMessage.is_default = '0'
      }
      //请求方法
      //数据验证

      let datadataDetails = await this.$api.dbPost(global.apiUrls.post637df1ea39d16, {
        address_id: this.id,
        real_name: this.dataMessage.real_name,
        mobile: this.dataMessage.mobile,
        detail: this.dataMessage.detail,
        sex: this.dataMessage.sex,
        label_name: this.dataMessage.label_name,
        is_default: this.dataMessage.is_default,
        lng: this.dataMessage.lng,
        lat: this.dataMessage.lat,
        province: this.dataMessage.address_code_province,
        city: this.dataMessage.address_code_city,
        district: this.dataMessage.address_code_district,
      })
      if (!datadataDetails) return
      if (datadataDetails.data.code != 1) {
        this.$message.info(datadataDetails.data.msg)
        return
      }
      let infodataDetails = datadataDetails.data
      this.dataDetails = infodataDetails.data

      this.$message.info('编辑成功')
      setTimeout(() => {
        this.$urouter.navigateBack(1)
      }, 500)
    },
    //地图选点
    async mapSelectFunc() {
      this.mapMessage = await this.syncUniApi('chooseLocation')
      //请求方法
      //数据验证

      let datadatamap = await this.$api.dbGet(global.apiUrls.post649e954010762, {
        lng: this.mapMessage.longitude,
        lat: this.mapMessage.latitude,
      })
      if (!datadatamap) return
      if (datadatamap.data.code != 1) {
        this.$message.info(datadatamap.data.msg)
        return
      }
      let infodatamap = datadatamap.data
      this.datamap = infodatamap.data

      let str = this.mapMessage.address.replace(/.+?(省|市|自治区|自治州|县|区)/g, '')
      this.dataMessage.detail = str
      this.dataMessage.address_code_area_str = this.datamap.area
      this.dataMessage.address_code_province = this.datamap.province
      this.dataMessage.address_code_city = this.datamap.city
      this.dataMessage.address_code_district = this.datamap.district
    },
    //删除地址
    async deleteAddressFunc() {
      //请求方法
      //数据验证

      let data636f773e8d763 = await this.$api.dbPost(global.apiUrls.post636f773e8d763, {
        address_id: this.id,
      })
      if (!data636f773e8d763) return
      if (data636f773e8d763.data.code != 1) {
        this.$message.info(data636f773e8d763.data.msg)
        return
      }
      let info636f773e8d763 = data636f773e8d763.data

      this.popupShow1686733151756 = false
      setTimeout(() => {
        this.$urouter.navigateBack(1)
      }, 500)
    },
    // 粘贴后触发智能识别
    handleSmartAddressPaste() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.recognizeAddressFunc()
        }, 100)
      })
    },
    // 将智能识别接口数据写入表单（兼容 name/address/area 与 real_name/detail 等字段）
    applyRecognizedAddress(data = {}) {
      const pick = (...vals) => {
        for (const v of vals) {
          if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim()
        }
        return ''
      }

      const realName = pick(data.name, data.real_name)
      if (realName) this.dataMessage.real_name = realName

      const mobile = pick(data.mobile)
      if (mobile) this.dataMessage.mobile = mobile

      const province = pick(data.province, data.address_code_province)
      const city = pick(data.city, data.address_code_city)
      const district = pick(data.district, data.address_code_district)
      if (province) this.dataMessage.address_code_province = province
      if (city) this.dataMessage.address_code_city = city
      if (district) this.dataMessage.address_code_district = district

      const detail = pick(data.address, data.detail)
      if (detail) this.dataMessage.detail = detail

      let areaStr = pick(data.area, data.address_code_area_str)
      if (!areaStr && (data.province_name || data.city_name || data.district_name)) {
        areaStr = `${data.province_name || ''}${data.city_name || ''}${data.district_name || ''}`
      }
      if (areaStr) this.dataMessage.address_code_area_str = areaStr

      const sex = pick(data.sex)
      if (sex) this.dataMessage.sex = sex
      const lng = pick(data.lng)
      if (lng) this.dataMessage.lng = lng
      const lat = pick(data.lat)
      if (lat) this.dataMessage.lat = lat
    },
    // 智能识别地址
    async recognizeAddressFunc() {
      const text = (this.smartAddressText || '').trim()
      if (!text) {
        this.$message.info(this.$t('请粘贴或输入地址信息'))
        return
      }
      if (this.addressRecognizing) return

      this.addressRecognizing = true
      uni.showLoading({ title: this.$t('识别中'), mask: true })
      try {
        let res = await this.$api.post(global.apiUrls.post672daa999d5c3, {
          address: text,
        })
        if (!res) return
        if (res.data.code != 1) {
          this.$message.info(res.data.msg)
          return
        }
        this.applyRecognizedAddress(res.data.data || {})
      } catch (e) {
        console.error('智能识别地址失败', e)
      } finally {
        this.addressRecognizing = false
        uni.hideLoading()
      }
    },
    //输入监听事件
    valueInspectFunc(e) {
      var str = e
      var newZz = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/gi
      if (newZz.test(str)) {
        this.$nextTick(() => {
          this.dataMessage.real_name = str.replace(newZz, '')
        })
        this.$message.info(global.i18n.t('昵称不能包含特殊字符'))
        return
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.page {
  width: 100vw;
  overflow-x: hidden;
  min-height: calc(100vh - var(--benben-window-bottom, 0px));
  background: var(--benbenbgColor0);
  background-size: 100% auto;

  .editAddress_picker3_0_babdd {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 100rpx;
    border-radius: 25rpx 25rpx 0rpx 0rpx;
    border-bottom: 1px solid #eee;
    background: #fff;
    background-size: 100% auto !important;
    font-size: 32rpx;

    .editAddress_picker3_0_c0_babdd {
      color: var(--benbenFontColor2);
    }

    .editAddress_picker3_0_c1_babdd {
      color: var(--benbenFontColor0);
    }

    .editAddress_picker3_0_c2_babdd {
      color: var(--benbenFontColor4);
    }
  }

  .editAddress_flex_2_babdd {
    background: var(--benbenbgColor1);
    width: 540rpx;
    border-radius: 16rpx 16rpx 16rpx 16rpx;

    .editAddress_fd2_0_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      margin: 48rpx 0rpx 0rpx 0rpx;
    }

    .editAddress_fd2_1_babdd {
      line-height: 44rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
      margin: 40rpx 0rpx 48rpx 0rpx;
    }

    .editAddress_fd2_2_c0_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 0rpx 16rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor2);
      padding: 0rpx 102rpx 0rpx 103rpx;
      border-top: 1px solid var(--benbenbdColor0);
      font-weight: 400;
    }

    .editAddress_fd2_2_c1_babdd {
      line-height: 94rpx;
      border-radius: 0rpx 0rpx 16rpx 0rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor1);
      color: var(--benbenFontColor4);
      border-top: 1px solid var(--benbenbdColor0);
      border-left: 1px solid var(--benbenbdColor0);
      padding: 0rpx 102rpx 0rpx 101rpx;
      font-weight: 500;
    }
  }

  .editAddress_smart_card {
    padding: 32rpx;
    margin: 24rpx 24rpx 0rpx 24rpx;
    background: var(--benbenbgColor1);
    border-radius: 16rpx;

    .editAddress_smart_header {
      margin-bottom: 24rpx;
    }

    .editAddress_smart_title {
      line-height: 45rpx;
      font-size: 32rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
    }

    .editAddress_smart_btn {
      flex-shrink: 0;
      min-width: 120rpx;
      padding: 0 28rpx;
      height: 56rpx;
      line-height: 56rpx;
      text-align: center;
      border-radius: 28rpx;
      background: var(--benbenbtnColor0);
      font-size: 28rpx;
      color: var(--benbenFontColor3);

      &.editAddress_smart_btn_disabled {
        opacity: 0.6;
      }
    }

    .editAddress_smart_textarea {
      width: 100%;
      min-height: 160rpx;
      font-size: 28rpx;
      line-height: 44rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
      background: transparent;
      border: none;
      box-sizing: border-box;
    }
  }

  .editAddress_field_box {
    border-radius: 10rpx;
    background: var(--benbenbgColor2);
    padding: 24rpx;
    box-sizing: border-box;
    margin-top: 20rpx;
  }

  .editAddress_field_box_detail {
    margin: 0rpx 32rpx 0rpx 0rpx;
  }

  .editAddress_fd1_0_babdd {
    padding: 0rpx 24rpx 32rpx 24rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;
    margin: 20rpx 24rpx 20rpx 24rpx;
    border-radius: 16rpx;

    &.editAddress_fd1_0_babdd_first {
      margin-top: 24rpx;
    }

    .editAddress_fd1_0_c3_c0_babdd {
      padding: 32rpx 32rpx 32rpx 0rpx;
      border-bottom: 1px solid var(--benbenbdColor0);
      margin: 0rpx 0rpx 32rpx 0rpx;

      .editAddress_fd1_0_c3_c0_c0_babdd {
        line-height: 45rpx;
        font-size: 32rpx;
        font-weight: 400;
        color: var(--benbenFontColor0);
        margin: 0rpx 16rpx 0rpx 0rpx;
      }

      .editAddress_fd1_0_c3_c0_c1_babdd {
        height: 45rpx;
        line-height: 45rpx;
        margin: 0rpx 20rpx 0rpx 0rpx;
        color: var(--benbenFontColor0);
      }

      .editAddress_fd1_0_c3_c0_c2_babdd {
        color: var(--benbeniconColor3);
        font-size: 34rpx;
      }
    }

    .editAddress_input_fd1_0_c3_c1_babdd {
      width: 100%;
      min-height: 88rpx;
      font-size: 28rpx;
      line-height: 44rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
    }
  }

  .editAddress_fd1_0_c0_babdd {
    padding: 32rpx 32rpx 32rpx 0rpx;
    border-bottom: 1px solid var(--benbenbdColor0);

    .editAddress_fd1_0_c0_c1_babdd {
      --label-avtive-bg: var(--benbenbgColor3);
      --label-avtive-color: var(--benbenFontColor3);
    }
  }

  .editAddress_fd1_0_c0_c0_babdd {
    line-height: 45rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    width: 168rpx;
  }

  .editAddress_fd1_0_c1_c1_babdd {
    line-height: 32rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
    width: 200rpx;
  }

  .editAddress_fd1_0_c1_c2_c0_c0_babdd {
    margin: 0rpx 0rpx 0rpx 40rpx;

    .editAddress_fd1_0_c1_c2_c0_c0_c0_babdd {
      font-size: 36rpx;
      margin: 0rpx 12rpx 0rpx 0rpx;
      color: var(--benbeniconColor0);
    }

    .editAddress_fd1_0_c1_c2_c0_c0_c1_babdd {
      line-height: 45rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor0);
    }
  }

  .editAddress_fd1_0_c1_c2_c0_c1_c0_babdd {
    font-size: 36rpx;
    margin: 0rpx 12rpx 0rpx 0rpx;
    color: var(--benbeniconColor3);
  }

  .editAddress_fd1_0_c1_c2_c0_c1_c1_babdd {
    line-height: 45rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: var(--benbenFontColor2);
  }

  .editAddress_fd1_0_c2_c1_babdd {
    font-size: 32rpx;
    font-weight: 400;
    color: var(--benbenFontColor0);
  }

  .editAddress_fd1_1_babdd {
    padding: 32rpx 32rpx 32rpx 0rpx;
    margin: 0rpx 24rpx 120rpx 24rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto;
    border-radius: 16rpx;

    .editAddress_fd1_1_c0_babdd {
      line-height: 45rpx;
      font-size: 32rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
      margin: 0rpx 0rpx 0rpx 32rpx;
    }
  }

  .editAddress_fd1_2_babdd {
    width: 750rpx;
    position: fixed;
    left: 0rpx;
    bottom: calc(40rpx + var(--benben-window-bottom, 0px));

    .editAddress_fd1_2_c0_babdd {
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 702rpx;
      height: 88rpx;
      line-height: 88rpx;
      font-weight: 500;
    }

    .editAddress_fd1_2_c0_1_babdd {
      border-radius: 44rpx 44rpx 44rpx 44rpx;
      font-size: 32rpx;
      background: var(--benbenbtnColor0);
      color: var(--benbenFontColor3);
      width: 686rpx;
      height: 88rpx;
      line-height: 88rpx;
      font-weight: 500;
    }
  }

  .editAddress_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;

    .editAddress_fd0_0_babdd {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .editAddress_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
      }

      .editAddress_fd0_0_c1_c0_1_babdd {
        font-size: 36rpx;
        font-weight: 500;
        color: #333;
      }
    }
  }

  .editAddress_fd0_0_c0_babdd {
    width: 180rpx;

    .editAddress_fd0_0_c0_c0_babdd {
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbeniconColor1);
    }
  }

  .editAddress_fd0_0_c2_c0_babdd {
    color: var(--benbenFontColor0);
    font-size: 32rpx;
    font-weight: 500;
    line-height: 45rpx;
  }
}

::v-deep .editAddress_fd1_1_c1_babdd {
  margin: 0rpx 32rpx 0rpx 0rpx;
}
</style>
