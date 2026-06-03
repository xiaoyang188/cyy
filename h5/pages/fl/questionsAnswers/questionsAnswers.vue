<template>
    <page-body>
        <view class="page">
            <view class="flex flex-wrap align-center justify-between benben-position-layout flex questionsAnswers_flex_0_dija" :style="{height:(88+StatusBarRpx)+'rpx',paddingTop:StatusBarRpx+'rpx', }">
                <view class='flex flex-wrap align-center questionsAnswers_fd0_0_dija' @tap.stop="handleJumpDiy" data-type="back" data-url="1">
                    <image class='questionsAnswers_fd0_0_c0_dija' mode="aspectFit" :src='STATIC_URL+"278.png"'></image>
                </view>
                <text class='questionsAnswers_fd0_1_dija'>{{$t('我的问答')}}</text>
                <view class='flex flex-wrap align-center questionsAnswers_fd0_0_dija'>
                </view>
            </view>
            <view :style="{height: (88+StatusBarRpx)+'rpx'}"></view>
            <!---flex布局flex布局开始-->
            <view class="flex flex-direction align-stretch benben-flex-layout">
                <view>
                    <benben-flex-tabs class-text='questionsAnswers_benbenTabsfd1_0_dija' v-model="tabs" ref="benben_tabsfd1_0" select-mark="benben_tabsfd1_0" key="benben_tabsfd1_0" :open-title-type='false' :open-sticky='true' :top='0' :is-show-content='false' :scrollspy='false' :tabs-info.sync="tabsInfofd1_0" @change="getListFunc()">
                        <scroll-view :throttle='false' @scroll="tabsInfofd1_0.scrollX = $event.detail.scrollLeft" id="benben_tabsfd1_0" class="benben-tabs" style="width:750rpx" :scroll-x="true" :scroll-left="tabsInfofd1_0.moveX" scroll-with-animation="all .3s ease" :show-scrollbar='false' :enhanced="true">
                            <view class="benben-tabs-content" id="benben_tabsfd1_0-content">
                                <view id="benben_tabsfd1_0-title" class="benben-tabs-title flex flex align-center justify-around">
                                    <view :class="{ 'checkTitlefd1_0_dija': tabs == 'question', 'flex flex-wrap align-center': true }" @tap="tabs = 'question'" :id="`benben_tabsfd1_0-title-item-${'question'}`">
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija'>{{$t('提问')}}</text>
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija' v-if=" dataNum.question_num>0">{{dataNum.question_num}}</text>
                                    </view>
                                    <view :class="{ 'checkTitlefd1_0_dija': tabs == 'answer', 'flex flex-wrap align-center': true }" @tap="tabs = 'answer'" :id="`benben_tabsfd1_0-title-item-${'answer'}`">
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija'>{{$t('回答')}}</text>
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija' v-if=" dataNum.answer_num>0">{{dataNum.answer_num}}</text>
                                    </view>
                                    <view :class="{ 'checkTitlefd1_0_dija': tabs == 'follow', 'flex flex-wrap align-center': true }" @tap="tabs = 'follow'" :id="`benben_tabsfd1_0-title-item-${'follow'}`">
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija'>{{$t('关注')}}</text>
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija' v-if=" dataNum.follow_num>0">{{dataNum.follow_num}}</text>
                                    </view>
                                    <view :class="{ 'checkTitlefd1_0_dija': tabs == 'likes', 'flex flex-wrap align-center': true }" @tap="tabs = 'likes'" :id="`benben_tabsfd1_0-title-item-${'likes'}`">
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija'>{{$t('点赞')}}</text>
                                        <text class='questionsAnswers_titleItemfd1_0_c3_c0_dija' v-if=" dataNum.likes_num>0">{{dataNum.likes_num}}</text>
                                    </view>
                                </view>
                                <view :style="{ left: tabsInfofd1_0.lineleft, maxWidth: tabsInfofd1_0.lineWidth ,}" id="benben_tabsfd1_0-line" class="benben-tabs-line flex benben-flex-tabs-line questionsAnswers_linefd1_0_dija" :class="{'benben-tabs-line-active':tabsInfofd1_0.isInit}"></view>
                            </view>
                        </scroll-view>
                    </benben-flex-tabs>
                </view>
                <template v-for='(item,key0) in dataList'>
                    <view class='flex flex-direction flex-wrap align-stretch questionsAnswers_fd1_1_dija' @tap.stop="goAnwerFunc(item.question_id,item.goodsquestion_id)" :key='key0'>
                        <view class='flex flex-wrap align-center'>
                            <image class='questionsAnswers_fd1_1_c0_c0_dija' mode="aspectFill" :src='item.goods_thumb'></image>
                            <text class='flex-sub questionsAnswers_fd1_1_c0_c1_dija'>{{item.goods_name}}</text>
                            <view class='flex flex-wrap align-center questionsAnswers_fd1_1_c0_c2_dija' @tap.stop="clickDltFunc(item.question_id,item.goodsquestion_id,item.answer_id)">
                                <image class='questionsAnswers_fd1_1_c0_c2_c0_dija' mode="aspectFit" src='https://zhongtai.zhongbenruanjian.com/imgTheme/1/2/3890/51767'></image>
                                <text class='questionsAnswers_fd1_1_c0_c2_c1_dija'>{{$t('删除')}}</text>
                            </view>
                        </view>
                        <text class='questionsAnswers_fd1_1_c1_dija'>{{item.question_content}}</text>
                        <view class='flex flex-wrap align-center'>
                            <text class='questionsAnswers_fd1_1_c2_c0_dija'>{{item.create_time}}</text>
                            <text class='questionsAnswers_fd1_1_c2_c1_dija' v-if=" item.answer_number>0">{{item.answer_number}}</text>
                            <text class='questionsAnswers_fd1_1_c2_c2_dija' v-if=" item.answer_number>0">{{$t('人回答')}}</text>
                        </view>
                    </view>
                </template>
                <fu-empty :pagingListLoadedAll="pagingListLoadedAll" :pagingListNoListData="pagingListNoListData" :listDataLength="listDataLength" :isLoadInit="isLoadInit"></fu-empty>
            </view>
            <!---flex布局flex布局结束-->
            <benben-popup v-model="popupShow1711005831489" :mask="true" :mask-close-able="true" mode='center' :z-index='999'>
                <!---清除本地缓存flex布局开始-->
                <view class="flex benben-flex-layout flex-wrap align-center">
                    <view class='flex flex-direction flex-wrap align-center questionsAnswers_fd2_0_dija'>
                        <text class='questionsAnswers_fd2_0_c0_dija'>{{$t('提示')}}</text>
                        <text class='questionsAnswers_fd2_0_c1_dija'>{{$t('是否确认删除？')}}</text>
                        <view class='flex align-center questionsAnswers_fd2_0_c2_dija'>
                            <button class='questionsAnswers_fd2_0_c2_c0_dija' @tap.stop="popupShow1711005831489=false">{{$t('取消')}}</button>
                            <button class='questionsAnswers_fd2_0_c2_c1_dija' @tap.stop="deleteanswerFunc()">{{$t('确认')}}</button>
                        </view>
                    </view>
                </view>
                <!---清除本地缓存flex布局结束-->
            </benben-popup>
        </view>
    </page-body>
</template>
<script>
    import pagingList from '@/common/mixin/paging_list.js';
    import {
        validate
    } from '@/common/utils/validate.js'
    export default {
        components: {},
        mixins: [pagingList],
        data() {
            return {
                "popupShow1711005831489": false,
                "tabsInfofd1_0": {
                    lineleft: '',
                    lineWidth: '',
                    moveX: 0,
                    scrollX: 0,
                    PageScrollX: 0,
                    isInit: false
                },
                "minixPagingListsApi": "",
                "pageingListApiMethod": "",
                "allowOnloadGetList": false,
                "tabs": "question",
                "dataList": [],
                /** likes_num【点赞】
                 *   follow_num【关注】
                 *   answer_num【回答】
                 *   question_num【提问】 **/
                "dataNum": {
                    "question_num": "",
                    "answer_num": "",
                    "follow_num": "",
                    "likes_num": ""
                },
                "type": "1",
                /** is_collection【是否关注或点赞 0 否 1 是】 **/ "dataBack": {
                    "is_collection": 0
                },
                "question_id": "",
                "goodsquestion_id": "",
                "answer_id": "",
                "goods_id": "125"
            };
        },
        computed: {},
        watch: {},
        onLoad(options) {
            let {
                goods_id
            } = options
            if (goods_id !== undefined) this.goods_id = goods_id
            this.getListFunc()
            this.getNumFunc()
        },
        onUnload() {},
        onReady() {},
        onShow() {},
        onHide() {},
        onResize() {},
        onPullDownRefresh() {
            this.getNumFunc()
            this.getListFunc()
        },
        onReachBottom(e) {},
        onPageScroll(e) {},
        methods: {
            //获取数量
            async getNumFunc() {
                //请求方法
                //数据验证
                let datadataNum = await this.$api.get(global.apiUrls.post649aa87f7b4fc, {});
                if (datadataNum.data.code != 1) {
                    this.$message.info(datadataNum.data.msg);
                    return
                }
                let infodataNum = datadataNum.data;
                this.dataNum = infodataNum.data
            },
            //删除问答
            async deleteanswerFunc() {
                if (this.tabs == 'question') {
                    this.type = '1';
                    //请求方法
                    //数据验证
                    let data6419b4ef279bf = await this.$api.get(global.apiUrls.post6419b4ef279bf, {
                        type: this.type,
                        delete_id: this.question_id
                    });
                    if (data6419b4ef279bf.data.code != 1) {
                        this.$message.info(data6419b4ef279bf.data.msg);
                        return
                    }
                    let info6419b4ef279bf = data6419b4ef279bf.data;
                } else if (this.tabs == 'answer') {
                    this.type = '2';
                    //请求方法
                    //数据验证
                    let data6419b4ef279bf = await this.$api.get(global.apiUrls.post6419b4ef279bf, {
                        type: this.type,
                        delete_id: this.goodsquestion_id
                    });
                    if (data6419b4ef279bf.data.code != 1) {
                        this.$message.info(data6419b4ef279bf.data.msg);
                        return
                    }
                    let info6419b4ef279bf = data6419b4ef279bf.data;
                } else if (this.tabs == 'follow') {
                    this.type = '1';
                    //请求方法
                    //数据验证
                    let datadataBack = await this.$api.post(global.apiUrls.post6419b341ce8e1, {
                        type: this.type,
                        collect_id: this.question_id,
                        question_id: this.question_id
                    });
                    if (datadataBack.data.code != 1) {
                        this.$message.info(datadataBack.data.msg);
                        return
                    }
                    let infodataBack = datadataBack.data;
                    this.dataBack = infodataBack.data
                } else if (this.tabs == 'likes') {
                    this.type = '2';
                    //请求方法
                    //数据验证
                    let datadataBack = await this.$api.post(global.apiUrls.post6419b341ce8e1, {
                        type: this.type,
                        collect_id: this.answer_id,
                        question_id: this.question_id
                    });
                    if (datadataBack.data.code != 1) {
                        this.$message.info(datadataBack.data.msg);
                        return
                    }
                    let infodataBack = datadataBack.data;
                    this.dataBack = infodataBack.data
                }
                uni.showToast({
                    title: this.$t('删除成功'),
                    mask: true,
                    icon: 'none',
                    duration: 1500
                });
                this.getListFunc()
                this.getNumFunc()
                this.popupShow1711005831489 = false;
            },
            //商品问答-获取商品提问列表
            getListFunc() {
                this.minixPagingListsApi = global.apiUrls.post649aaab29ce9b;
                this.pageingListApiMethod = 'get';
                this.allowOnloadGetList = false;
                this.pagingListPostDataContent = {
                    type: this.tabs
                }
                this.listData = [];
                this.dataList = this.listData;
                this.pagingListToggle();
            },
            //跳转问答详情
            goAnwerFunc(question_id, answer_id) {
                if (this.tabs == 'answer') {
                    this.$urouter.navigateTo(`/pages/fl/detailsQuestion/detailsQuestion?question_id=${answer_id}`);
                } else {
                    this.$urouter.navigateTo(`/pages/fl/detailsQuestion/detailsQuestion?question_id=${question_id}`);
                }
            },
            //确认删除问答
            clickDltFunc(question_id, goodsquestion_id, answer_id) {
                this.question_id = question_id;
                this.goodsquestion_id = goodsquestion_id;
                this.answer_id = answer_id;
                this.popupShow1711005831489 = true;
            },
            pagingListPostData() {
                return this.pagingListPostDataContent
            }
        }
    };
</script>
<style lang="scss" scoped>
    .page {
        width: 100vw;
        overflow-x: hidden;
        min-height: calc(100vh - var(--benben-window-bottom, 0px));
        background: #F8F8F8;
        background-size: 100% auto;

        .questionsAnswers_fd2_0_dija {
            width: 540rpx;
            background: #fff;
            background-size: 100% auto !important;
            border-radius: 16rpx 16rpx 16rpx 16rpx;

            .questionsAnswers_fd2_0_c0_dija {
                line-height: 44rpx;
                font-size: 36rpx;
                font-weight: 700;
                color: #333333;
                margin: 40rpx 0rpx 0rpx 0rpx;
            }

            .questionsAnswers_fd2_0_c1_dija {
                line-height: 44rpx;
                font-size: 28rpx;
                font-weight: 500;
                color: #333333;
                text-align: center;
                margin: 32rpx 40rpx 0rpx 40rpx;
            }

            .questionsAnswers_fd2_0_c2_dija {
                border-top: 1px solid #eee;
                margin: 51rpx 0rpx 0rpx 0rpx;

                .questionsAnswers_fd2_0_c2_c0_dija {
                    font-size: 32rpx;
                    background: #fff;
                    color: rgba(153, 153, 153, 1);
                    width: 270rpx;
                    height: 101rpx;
                    line-height: 101rpx;
                    font-weight: 400;
                    border-right: 1px solid #eee;
                    border-radius: 0rpx 0rpx 0rpx 16rpx;
                }

                .questionsAnswers_fd2_0_c2_c1_dija {
                    font-size: 32rpx;
                    background: var(--benbenbgColor1);
                    color: var(--benbenFontColor5);
                    width: 270rpx;
                    height: 101rpx;
                    line-height: 101rpx;
                    font-weight: 500;
                    border-radius: 0rpx 0rpx 16rpx 0rpx;
                }
            }
        }

        .checkTitlefd1_0_dija {
            font-weight: 700 !important;
            font-size: 28rpx !important;
            color: rgba(253, 81, 61, 1) !important;
            background-color: rgba(255, 255, 255, 1) !important;
        }

        .questionsAnswers_linefd1_0_dija {
            width: 30rpx;
            height: 6rpx;
            top: 80rpx;
            background: var(--benbenbtnColor0);
            background-size: 100% auto !important;
        }

        .questionsAnswers_titleItemfd1_0_c3_c0_dija {
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
        }

        .questionsAnswers_fd1_1_dija {
            border-radius: 16rpx 16rpx 16rpx 16rpx;
            background: #FFFFFF;
            padding: 24rpx 24rpx 24rpx 24rpx;
            margin: 24rpx 24rpx 0rpx 24rpx;

            .questionsAnswers_fd1_1_c0_c0_dija {
                width: 72rpx;
                height: 72rpx;
                border-radius: 8rpx;
            }

            .questionsAnswers_fd1_1_c0_c1_dija {
                color: #333333;
                font-size: 28rpx;
                font-weight: 400;
                line-height: 40rpx;
                margin: 0rpx 24rpx 0rpx 24rpx;
                -webkit-line-clamp: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
            }

            .questionsAnswers_fd1_1_c0_c2_dija {
                margin: 0rpx 0rpx 0rpx auto;

                .questionsAnswers_fd1_1_c0_c2_c0_dija {
                    width: 22rpx;
                    height: 26rpx;
                    border-radius: 0rpx 0rpx 0rpx 0rpx;
                }

                .questionsAnswers_fd1_1_c0_c2_c1_dija {
                    color: #999999;
                    font-size: 22rpx;
                    font-weight: 400;
                    margin: 0rpx 0rpx 0rpx 8rpx;
                }
            }

            .questionsAnswers_fd1_1_c1_dija {
                color: #333333;
                font-size: 28rpx;
                font-weight: 700;
                line-height: 40rpx;
                margin: 32rpx 0rpx 24rpx 0rpx;
            }

            .questionsAnswers_fd1_1_c2_c0_dija {
                color: #999999;
                font-size: 24rpx;
                font-weight: 400;
                line-height: 33rpx;
            }

            .questionsAnswers_fd1_1_c2_c1_dija {
                color: var(--benbenFontColor4);
                font-size: 24rpx;
                font-weight: 400;
                line-height: 33rpx;
                margin: 0rpx 0rpx 0rpx 24rpx;
            }

            .questionsAnswers_fd1_1_c2_c2_dija {
                color: var(--benbenFontColor4);
                font-size: 24rpx;
                font-weight: 400;
                line-height: 33rpx;
            }
        }

        .questionsAnswers_flex_0_dija {
            width: 750rpx;
            height: 88rpx;
            overflow: hidden;
            z-index: 10;
            top: 0rpx;
            background: #fff;
            background-size: 100% auto !important;
            border-bottom: 1px solid rgba(230, 230, 230, 1);

            .questionsAnswers_fd0_1_dija {
                color: #333333;
                font-size: 36rpx;
                font-weight: 600;
                line-height: 50rpx;
            }
        }

        .questionsAnswers_fd0_0_dija {
            width: 100rpx;
            height: 88rpx;

            .questionsAnswers_fd0_0_c0_dija {
                width: 20rpx;
                height: 36rpx;
                border-radius: 0rpx 0rpx 0rpx 0rpx;
                margin: 0rpx 0rpx 0rpx 32rpx;
            }
        }
    }

    ::v-deep .questionsAnswers_benbenTabsfd1_0_dija {
        width: 750rpx;
        height: 90rpx;
        white-space: nowrap;
        background: #fff;
        text-align: center;
    }
</style>
