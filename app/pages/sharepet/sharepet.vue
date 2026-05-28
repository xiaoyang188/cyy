<template>
	<div
		style="width: 100%;height: 100%;background: linear-gradient(180deg, rgba(253, 251, 251, 1) 0%, rgba(235, 237, 238, 1) 100%);">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">共享设备</text>
			</view>
			<view style="width: 150rpx;">
			</view>
		</div>
		<div class="col_center" style="height: 400rpx;width: 100%;">
			<view><cach-image :url="shareform.pet.smallAvatarUrl" :fileMd5="shareform.pet.smallAvatarUrl"
					width="200rpx" height="200rpx" radius="50%"></cach-image></view>
			<!-- <image :src="shareform.pet.small_avatar_url" style="width: 100rpx;height: 100rpx;border-radius: 50%;"></image> -->
			<view><text>{{shareform.pet.nickname}}</text></view>
			<view v-if="tamp_did_list.length>0"><text>设备编号：{{tamp_did_list[0].serialCode}}</text></view>
		</div>
		<uni-forms ref="form" :modelValue="shareform" :rules="rules" label-align="left" label-width="150px">
			<view class="row-share">
				<view class="row_center" style="width: 90%;height:100rpx; border-radius: 30px;
		background: rgba(255, 255, 255, 1.0);">
					<uni-forms-item label="受邀手机号" name="phone_number" style="border-radius: 20px;width: 90%;">
						<uni-easyinput :inputBorder="false" type="text" :clearable="false"
							v-model="shareform.phone_number" placeholder="请输入手机号" />
					</uni-forms-item>
				</view>
			</view>
			<button class="submit-button" @click="submit"
				style="font-size: 36rpx;text-align: center;display: flex;align-items: center;justify-content: center;">共享</button>
		</uni-forms>
		<div class="col_start" style="width: 100%;height: 500rpx;margin-top: 60rpx;">
			<view style="width: 81%;" v-if="showTitle"><text style="font-size: 36rpx;">已共享信息</text></view>
			<view style="width: 90%;margin-top: 30rpx;">
				<!-- style=" height: 480rpx;border-radius: 30px;background: rgba(255, 255, 255, 1);" -->
				<scroll-view scroll-y="true">
					<view v-for="(item, index) in shareList">
						<div v-if="item.state===1&&item.toUserInfo" class="col_center" style="width: 100%;height: 140rpx;border-radius: 30px;
		background: rgba(255, 255, 255, 1.0);margin-bottom: 15rpx;">
							<view class="row_between"
								style="width: 90%;height: 80rpx; border-bottom: 0.5px solid rgba(229, 229, 229, 1);">
								<div class="row_start">
									<uni-icons type="person" style="" size="20" color="rgb(128, 128, 128)"></uni-icons>
									<text>{{item.toUserInfo.phone}}</text>
								</div>
								<!-- 	<div class="row_center" style="border-radius: 20rpx;padding: 5rpx 10rpx;background-color: rgb(255, 127, 84);"><text style="font-size: 32rpx;color: #ffffff;">
								{{item.share_state.feedback === 0 ? '未处理' :
								item.share_state.feedback === 1 ? '已接受' : '已拒绝' }}</text>
									</div> -->
								<div class="row_end">
									<view @click="cancleShare(index)" class="myButton"
										style="width: 200rpx;border-radius: 40rpx;height: 50rpx;"><text
											style="color: #ffffff;font-size: 32rpx;">解除共享</text></view>
								</div>
							</view>
							<view class="row_center" style="width: 90%; height: 60rpx;">
								<text :style="{ color: item.feedback === 1 ? '#2a82e4' : '#ff5733' }">
									*受邀方{{
							      item.feedback === 0 ? '未接受' :
							      item.feedback === 1 ? '已接受' : '已拒绝'
							    }}宠物
								</text>
							</view>
						</div>
					</view>
				</scroll-view>
			</view>
		</div>
	</div>
</template>

<script>
	import util from '/common/util';
	import {
		cancelShare,
		ackShare,
		sharePet,
		shareList
	} from '@/api/api/pet.js'
	export default {
		data() {
			return {
				showTitle: false,
				shareList: new Array(),
				imgUrlPre: '',
				deviceSelected: new Array(),
				tamp_did_list: new Array(),
				shareform: {
					did_list: new Array(),
					pet: '',
					pid: '',
					phoneumber: '',
				},
				deviceMessageList: [{
						img_path: '',
						category_name: '智能定位项圈'
					}, {
						img_path: '',
						category_name: '智能喂食器'
					},
					{
						img_path: '',
						category_name: '智能遛狗器'
					}, {}, {}, {}, {}, {}, {}
				],
				rules: {
					phone_number: {
						rules: [{
								required: true,
								errorMessage: '电话号码',
							},
							{
								pattern: /^1(?:3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
								errorMessage: '电话号码格式错误'
							}
						]
					},
				}
			}
		},
		onLoad(options) {
			console.log('into share onlocad', options)
			this.tamp_did_list = getApp().globalData.showDeviceList;
			this.shareform.pet = JSON.parse(options.pet);
			this.imgUrlPre = getApp().globalData.internet + '/';
			this.requestShareListNew();
			console.log('pet=', this.shareform.pet);
			console.log('shareform.devicelist=', this.tamp_did_list);
			console.log('shareform.pet[0].pid', this.shareform.pet.pid);
			this.shareform.pid = this.shareform.pet.pid;
			for (var i = 0; i < this.tamp_did_list.length; i++) {
				this.deviceSelected.push(false);
			}
		},
		methods: {
			cancleShare(index) {
				//申请取消，然后重新获取一遍sharelist，刷新本页面
				let item = this.shareList[index]
				
				cancelShare(item.id).then(recivedata => {
					this.shareList[index].state = 2
					uni.showToast({
						icon: 'loading',
						title: '取消共享成功'
					})
					setTimeout(() => {
						this.requestShareListNew();
					}, 1000)
				})
				// let result = util.requestService(getApp().globalData.cancleShare, para)
				// if (result) {
				// 	this.shareList[index].share_state.state = 2
				// 	uni.showToast({
				// 		icon: 'loading',
				// 		title: '取消共享成功'
				// 	})
				// 	setTimeout(()=>{
				// 		this.requestShareList();
				// 	},1000)

				// } else {
				// 	uni.showToast({
				// 		icon: 'loading',
				// 		title: '取消共享失败'
				// 	})
				// }
			},
			async requestShareListNew() {
				shareList().then(rebackData => {
					console.log('成功打印data', rebackData);
					this.shareList = rebackData.data.filter(item => item.pid === this.shareform.pet.pid)
					console.log('this.shareList', this.shareList)
					if (this.shareList.length > 0)
						this.showTitle = true
				})
			},
			async requestShareList() {
				let requesturl = getApp().globalData.internet + getApp().globalData.getShareList;
				let para = {}
				try {
					util.requestDataJson(requesturl, para).then((rebackData) => {
						console.log('成功打印data', rebackData);
						if (rebackData.data.code === 200) {
							this.shareList = rebackData.data.data.filter(item => item.pet.pid === this
								.shareform.pet.pid)
							console.log('this.shareList', this.shareList)
						}
						this.showTitle = false
						for (var index = 0; index < this.shareList.length; index++) {
							var element = this.shareList[index];
							if (element.state != 2)
								this.showTitle = true
						}
						console.log('this.shareList2', this.shareList)
					})
				} catch (err) {
					console.error(err); // 打印错误信息
				}
			},
			submit() {
				// console.log(this.device);
				uni.showLoading({
					title: '请求中'
				})
				let that = this
				this.$refs.form.validate().then(res => {
					// res.did_list=JSON.stringify(res.did_list);
					console.log('表单数据信息：', res);
					let data = {
						pid: that.shareform.pid,
						phone: res.phone_number
					}
					sharePet(data).then(recivedata => {
						uni.showModal({
							title: '分享设备成功',
							content: '快去让您的好友接受吧',
							success: function(res) {
								uni.hideLoading();
								getApp().backParents();
							}
						})
					}).catch((err)=>{
						uni.hideLoading();
					})
				}).catch(err => {
					uni.hideLoading();
					console.log('表单错误信息：', err);
				})
			},
			returnParent() {
				getApp().backParents();
			},
			returnSrc(id) {
				// console.log('id=', id);
				var obj = this.deviceMessageList[id - 1];
				// console.log('obj', obj);
				//return obj.img_path;
				return '../../static/xixin/bell.png';
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.row-share {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin: 0%;
		padding: 0%;
	}

	.row-share::v-deep .uni-input-input {
		font-size: 36rpx;
	}

	.row-share::v-deep .uni-easyinput__placeholder-class {
		font-size: 36rpx;
	}

	.row-share::v-deep .uni-forms-item__label {
		font-size: 36rpx;
		color: rgba(56, 56, 56, 1);
	}

	.row-share::v-deep .uni-forms-item {
		margin-bottom: 0;
		margin-left: 20rpx;
	}

	.row-share::v-deep .uni-easyinput {
		text-align: right;
		color: rgba(105, 105, 105, 1);
	}

	/* .row-share::v-deep .uni-forms-item__content{
		width: 200rpx;
	} */
	.row-share::v-deep .uni-input-input {
		font-size: 36rpx;
		color: rgba(105, 105, 105, 1);
	}

	.front {
		font-size: 15px;
		color: rgba(47, 166, 160, 1);
	}

	.row-device {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-size: contain;
		background-repeat: no-repeat;
		width: 100%;
		height: 210rpx;
		border-bottom: 2px solid rgba(195, 195, 200, 1.0);
		margin-bottom: 10rpx;
	}

	.submit-button {
		width: 55%;
		background-image: linear-gradient(to right, rgba(255, 88, 88, 1), rgba(240, 152, 25, 1));
		border-radius: 40rpx;
		height: 80rpx;
		margin-top: 60rpx;
		color: aliceblue;
	}

	.row-share::v-deep .uni-forms-item__error {
		padding-left: 20%;
		padding-top: 20rpx;
	}
</style>