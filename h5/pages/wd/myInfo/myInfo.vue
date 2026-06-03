<template>
  <page-body>
    <view class="page">
      <view
        class="flex flex-direction flex-wrap align-stretch justify-center benben-position-layout flex myInfo_flex_0_babdd"
        :style="{ height: 88 + StatusBarRpx + 'rpx', paddingTop: StatusBarRpx + 'rpx' }"
      >
        <view class="flex flex-wrap align-stretch justify-between myInfo_fd0_0_babdd">
          <view class="flex flex-wrap align-center myInfo_fd0_0_c0_babdd" @tap.stop="handleJumpDiy" data-type="back" data-url="1">
            <text class="fu-iconfont2 myInfo_fd0_0_c0_c0_babdd">&#xe794;</text>
          </view>
          <view class="flex flex-wrap align-center">
            <text class="myInfo_fd0_0_c1_c0_babdd">{{ $t('我的资料') }}</text>
          </view>
          <view class="flex align-center justify-end myInfo_fd0_0_c2_babdd"></view>
        </view>
      </view>
      <view :style="{ height: 88 + StatusBarRpx + 'rpx' }"></view>
      <!---我的资料flex布局开始-->
      <view class="myInfo_body_babdd">
        <view class="myInfo_card_babdd">
          <view class="myInfo_cell_babdd myInfo_cell_avatar_babdd">
            <text class="myInfo_cell_label_babdd">{{ $t('头像') }}</text>
            <view class="myInfo_cell_body_babdd">
              <benben-image-upload
                :path.sync="dataDetails.avatar"
                :img-id.sync="dataDetails.avatar"
                :is-cropping="true"
                :is-show-clean="false"
                class="upload position-relative myInfo_avatar_upload_babdd"
              >
                <image
                  class="myInfo_avatar_img_babdd"
                  mode="aspectFill"
                  :src="dataDetails.avatar ? dataDetails.avatar : STATIC_URL + '331.png'"
                ></image>
              </benben-image-upload>
            </view>
            <text class="fu-iconfont2 myInfo_cell_arrow_babdd">&#xe792;</text>
          </view>
          <!--     <view   class='flex flex-wrap align-center justify-between myInfo_fd1_0_c1_babdd'      >
        <text class='myInfo_fd1_0_c0_c0_babdd'  >ID</text>
<benben-input class='flex-sub myInfo_fd1_0_c1_c1_babdd'   type="text" :placeholder="$t('请输入')" confirm-type="done" :maxlength="-1" :disabled='true' placeholder-style="color:var(--benbenFontColor2);font-size:32rpx"  v-model="dataDetails.id" />
<text class='fu-iconfont2  myInfo_fd1_0_c0_c2_babdd'  >&#xe792;</text>
</view>
 -->
          <view class="myInfo_cell_babdd" @tap="handleJumpDiy" data-type="navigateTo" :data-url="`/pages/wd/editNameX/editNameX`">
            <text class="myInfo_cell_label_babdd">{{ $t('昵称') }}</text>
            <view class="myInfo_cell_body_babdd">
              <text class="myInfo_cell_value_babdd" :class="{ myInfo_cell_value_placeholder_babdd: !dataDetails.nickname }">
                {{ dataDetails.nickname || $t('请输入昵称') }}
              </text>
            </view>
            <text class="fu-iconfont2 myInfo_cell_arrow_babdd">&#xe792;</text>
          </view>
          <view class="myInfo_cell_babdd">
            <text class="myInfo_cell_label_babdd">{{ $t('手机号') }}</text>
            <view class="myInfo_cell_body_babdd">
              <text class="myInfo_cell_value_babdd" :class="{ myInfo_cell_value_placeholder_babdd: !dataDetails._mobile }">
                {{ dataDetails._mobile || $t('请输入手机号') }}
              </text>
            </view>
            <text class="fu-iconfont2 myInfo_cell_arrow_babdd">&#xe792;</text>
          </view>
          <view class="myInfo_cell_babdd" @tap.stop="pickerDiy1656985489961 = true">
            <text class="myInfo_cell_label_babdd">{{ $t('性别') }}</text>
            <view class="myInfo_cell_body_babdd">
              <text class="myInfo_cell_value_babdd" :class="{ myInfo_cell_value_placeholder_babdd: !sex }">{{ sex || $t('请选择性别') }}</text>
            </view>
            <text class="fu-iconfont2 myInfo_cell_arrow_babdd">&#xe792;</text>
          </view>

          <view class="myInfo_cell_babdd myInfo_cell_last_babdd" @tap.stop="pickerDiy1656986153485 = true">
            <text class="myInfo_cell_label_babdd">{{ $t('生日') }}</text>
            <view class="myInfo_cell_body_babdd">
              <text class="myInfo_cell_value_babdd" :class="{ myInfo_cell_value_placeholder_babdd: !dataDetails.birthday }">
                {{ dataDetails.birthday || $t('请选择生日') }}
              </text>
            </view>
            <text class="fu-iconfont2 myInfo_cell_arrow_babdd">&#xe792;</text>
          </view>
        </view>

        <view class="myInfo_footer_babdd">
          <button class="myInfo_save_btn_babdd" @tap.stop="editUserFunc()">{{ $t('保存') }}</button>
        </view>
      </view>

      <!---我的资料flex布局结束-->
      <!--选择生日开始 -->
      <benben-picker
        class=""
        ref="benbenWritePickerCodepicker2"
        :visible.sync="pickerDiy1656986153485"
        :value.sync="dataDetails.birthday"
        mode="date"
        :picker-height="88"
        :current="true"
        :mask-show="true"
        fields="day"
        :timeout="true"
        start-year="1990-01-01"
        end-year="现在"
      >
        <template #picker-header>
          <view class="flex flex-wrap align-center justify-between myInfo_picker2_0_babdd">
            <text class="myInfo_picker2_0_c0_babdd" @tap="$refs.benbenWritePickerCodepicker2.cancel()">{{ $t('取消') }}</text>
            <text class="myInfo_picker2_0_c1_babdd">{{ $t('选择日期') }}</text>
            <text class="myInfo_picker2_0_c2_babdd" @tap="$refs.benbenWritePickerCodepicker2.pickerConfirm()">{{ $t('确定') }}</text>
          </view>
        </template>
      </benben-picker>
      <!--选择生日结束 -->
      <!--选择性别开始 -->
      <benben-picker
        class=""
        ref="benbenWritePickerCodepicker3"
        :visible.sync="pickerDiy1656985489961"
        :label.sync="sex"
        :value.sync="dataDetails.gender"
        :options="sexType"
        mode="selector"
        :mask-show="true"
        :timeout="true"
        :picker-height="88"
        default-type="value"
        :default-props="{ label: 'name', value: 'value' }"
      >
        <template #picker-header>
          <view class="flex flex-wrap align-center justify-between myInfo_picker3_0_babdd">
            <text class="myInfo_picker3_0_c0_babdd" @tap="$refs.benbenWritePickerCodepicker3.cancel()">{{ $t('取消') }}</text>
            <text class="myInfo_picker3_0_c1_babdd">{{ $t('选择性别') }}</text>
            <text class="myInfo_picker3_0_c2_babdd" @tap="$refs.benbenWritePickerCodepicker3.pickerConfirm()">{{ $t('确定') }}</text>
          </view>
        </template>
      </benben-picker>
      <!--选择性别结束 -->
    </view>
  </page-body>
</template>
<script>
import { validate } from '@/common/utils/validate.js'

export default {
  components: {},

  data() {
    return {
      pickerDiy1656985489961: false,
      pickerDiy1656986153485: false,
      sexType: [
        {
          name: '保密',
          value: '0',
          image: '',
        },
        {
          name: '男',
          value: '1',
          image: '',
        },
        {
          name: '女',
          value: '2',
          image: '',
        },
      ],
      editUser: {},
      /** follow_count【关注的店铺数量】
       *   is_pay_password【是否设置支付密码 1 已设置 0 未设置】
       *   nickname【昵称】
       *   certified【实名认证状态 -1 未进行认证 1 待审核 2 审核通过 3 已拒绝】
       *   total_money【会员总金额】
       *   browse_count【足迹数量】
       *   collection_count【收藏数量】
       *   _mobile【手机号不带*号】
       *   score【积分余额】
       *   total_consumption_money【总消费金额】
       *   freeze_money【会员冻结金额】
       *   user_money【会员余额】
       *   gender【性别 1 男 2 女】
       *   birthday【生日】
       *   email【邮箱】
       *   account【登录账号】
       *   avatar【头像】
       *   real_name【真实姓名】
       *   mobile【手机号带*号】
       *   userlevel_id【会员级别】
       *   id【会员ID】
       *   tags【标签】
       *   hobby【爱好】
       *   address_code【地址编码】
       *   address【地址】
       *   invite_code【邀请码】 **/
      dataDetails: {
        invite_code: '',
        address: '',
        address_code: '',
        hobby: '',
        tags: '',
        id: 0,
        userlevel_id: 0,
        mobile: '',
        real_name: '',
        avatar: '',
        account: '',
        email: '',
        birthday: '',
        gender: '',
        create_time: '',
        user_money: '',
        freeze_money: '',
        total_consumption_money: '',
        score: '',
        _mobile: '',
        coupon: 0,
        collection_count: 0,
        browse_count: 0,
        total_money: 0,
        certified: 0,
        nickname: '',
        is_pay_password: 0,
        follow_count: 0,
      },
      sex: '',
      isCheck: false,
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
    this.getUserinfoFunc()
    this.diyPageListen()
  },
  onUnload() {
    this.diyOffPageListen()
  },
  onReady() {},
  onShow() {},
  onHide() {},
  onResize() {},
  onPullDownRefresh() {},
  onReachBottom(e) {},
  onPageScroll(e) {},
  methods: {
    //修改个人信息
    async editUserFunc() {
      if (this.isCheck === true) {
        return
      } else {
        if (!validate(this.dataDetails.avatar, 'require')) {
          this.$message.info(this.$t('请选择头像'))
          return false
        }
        if (!validate(this.dataDetails.nickname, 'require')) {
          this.$message.info(this.$t('请填写昵称'))
          return false
        }
        if (!validate(this.dataDetails.gender, 'require')) {
          this.$message.info(this.$t('请选择性别'))
          return false
        }
        if (!validate(this.dataDetails.birthday, 'require')) {
          this.$message.info(this.$t('请选择生日'))
          return false
        }
        this.isCheck = true
        //请求方法
        //数据验证

        let data5cb54af125f1c = await this.$api.post(global.apiUrls.post5cb54af125f1c, {
          avatar: this.dataDetails.avatar,
          nickname: this.dataDetails.nickname,
          gender: this.dataDetails.gender,
          birthday: this.dataDetails.birthday,
        })

        if (data5cb54af125f1c.data.code != 1) {
          this.$message.info(data5cb54af125f1c.data.msg)
          return
        }
        let info5cb54af125f1c = data5cb54af125f1c.data

        setTimeout(() => {
          this.isCheck = false
        }, 500)
        this.$message.info('保存成功')
        setTimeout(() => {
          this.$urouter.navigateBack(1)
        }, 800)
      }
    },
    //获取个人信息
    async getUserinfoFunc(data) {
      let datadataDetails = await this.$api.get(global.apiUrls.post5c78c4772da97, {})

      if (datadataDetails.data.code != 1) {
        this.$message.info(datadataDetails.data.msg)
        return
      }
      let infodataDetails = datadataDetails.data
      if (data) {
        this.dataDetails.nickname = infodataDetails.data.nickname
      } else {
        this.dataDetails = infodataDetails.data
        if (this.dataDetails.gender == '1') {
          this.sex = '男'
        } else if (this.dataDetails.gender == '2') {
          this.sex = '女'
        } else {
          this.sex = '保密'
        }
      }
    },
    //页面监听
    diyPageListen() {
      uni.$on('chengeName', (data) => {
        this.getUserinfoFunc(data)
      })
    },
    //注销页面监听
    diyOffPageListen() {
      uni.$off('chengeName')
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

  .myInfo_picker3_0_babdd {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
    border-radius: 25rpx 25rpx 0rpx 0rpx;
    border-bottom: 1px solid var(--benbenbdColor0);
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;

    .myInfo_picker3_0_c0_babdd {
      line-height: 40rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor2);
    }

    .myInfo_picker3_0_c1_babdd {
      font-size: 32rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
    }

    .myInfo_picker3_0_c2_babdd {
      color: var(--benbenFontColor4);
      line-height: 40rpx;
      font-size: 32rpx;
      font-weight: 500;
    }
  }

  .myInfo_picker2_0_babdd {
    padding: 0rpx 32rpx 0rpx 32rpx;
    line-height: 88rpx;
    border-radius: 25rpx 25rpx 0rpx 0rpx;
    border-bottom: 1px solid var(--benbenbdColor0);
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;

    .myInfo_picker2_0_c0_babdd {
      line-height: 40rpx;
      font-size: 32rpx;
      font-weight: 500;
      color: var(--benbenFontColor2);
    }

    .myInfo_picker2_0_c1_babdd {
      font-size: 32rpx;
      font-weight: 400;
      color: var(--benbenFontColor0);
    }

    .myInfo_picker2_0_c2_babdd {
      color: var(--benbenFontColor4);
      line-height: 40rpx;
      font-size: 32rpx;
      font-weight: 500;
    }
  }

  .myInfo_body_babdd {
    padding: 24rpx 32rpx 0;
    padding-bottom: calc(160rpx + var(--benben-window-bottom, 0px));
  }

  .myInfo_card_babdd {
    background: var(--benbenbgColor1);
    border-radius: 24rpx;
    overflow: hidden;
    padding: 0 32rpx;
  }

  .myInfo_cell_babdd {
    display: flex;
    align-items: center;
    min-height: 108rpx;
    padding: 28rpx 0;
    border-bottom: 1px solid var(--benbenbdColor0);
  }

  .myInfo_cell_last_babdd {
    border-bottom: none;
  }

  .myInfo_cell_avatar_babdd {
    min-height: 132rpx;
    padding: 24rpx 0;
  }

  .myInfo_cell_label_babdd {
    flex-shrink: 0;
    width: 140rpx;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 44rpx;
    color: var(--benbenFontColor0);
  }

  .myInfo_cell_body_babdd {
    flex: 1;
    min-width: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-left: 24rpx;
  }

  .myInfo_cell_value_babdd {
    width: 100%;
    font-size: 32rpx;
    font-weight: 400;
    line-height: 44rpx;
    text-align: right;
    color: var(--benbenFontColor0);
    word-break: break-all;
  }

  .myInfo_cell_value_placeholder_babdd {
    color: var(--benbenFontColor2);
  }

  .myInfo_cell_arrow_babdd {
    flex-shrink: 0;
    margin-left: 12rpx;
    font-size: 20rpx;
    color: var(--benbeniconColor1);
  }

  .myInfo_avatar_upload_babdd {
    width: 96rpx;
    height: 96rpx;
  }

  .myInfo_avatar_img_babdd {
    width: 96rpx;
    height: 96rpx;
    border-radius: 48rpx;
  }

  .myInfo_footer_babdd {
    position: fixed;
    left: 0;
    right: 0;
    bottom: calc(40rpx + var(--benben-window-bottom, 0px));
    display: flex;
    justify-content: center;
    padding: 0 32rpx;
    z-index: 10;
  }

  .myInfo_save_btn_babdd {
    width: 100%;
    max-width: 686rpx;
    height: 88rpx;
    line-height: 88rpx;
    border-radius: 44rpx;
    font-size: 32rpx;
    background: var(--benbenbtnColor0);
    color: var(--benbenFontColor3);
  }

  .myInfo_flex_0_babdd {
    width: 750rpx;
    height: 88rpx;
    overflow: hidden;
    z-index: 10;
    top: 0rpx;
    background: var(--benbenbgColor1);
    background-size: 100% auto !important;

    .myInfo_fd0_0_babdd {
      padding: 0rpx 32rpx 0rpx 32rpx;
      line-height: 88rpx;

      .myInfo_fd0_0_c0_babdd {
        width: 100rpx;

        .myInfo_fd0_0_c0_c0_babdd {
          color: var(--benbeniconColor1);
          font-size: 32rpx;
        }
      }

      .myInfo_fd0_0_c1_c0_babdd {
        font-size: 36rpx;
        font-weight: 500;
        color: var(--benbenFontColor0);
        line-height: 50rpx;
      }

      .myInfo_fd0_0_c2_babdd {
        padding: 0rpx 0rpx 0rpx 0rpx;
        width: 100rpx;
      }
    }
  }
}
</style>
