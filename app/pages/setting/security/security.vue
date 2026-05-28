<template>
	<div style="width: 100%;height: 100%;">

		<div class="nav_row">
			<view style="width: 150rpx;height: 50rpx;display: flex;align-items: center;justify-content: center;"
				@click="returnParent">
				<image src="/static/xixin/left.png" style="width: 25rpx;height: 40rpx; "></image>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">安全中心</text>
			</view>
			<view style="width: 150rpx;"></view>
		</div>

		<div class="setting_row"  @click="logon">
			<text class="setting_text">注销</text>
			<uni-icons type="right" style="margin-right: 40rpx;" size="18" width="100rpx"
				color="rgb(153,153,153)"></uni-icons>
		</div>
		<div class="setting_row"  @click="restart">
			<text class="setting_text">重启项圈</text>
			<uni-icons type="right" style="margin-right: 40rpx;" size="18" width="100rpx"
				color="rgb(153,153,153)"></uni-icons>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			returnParent() {
				getApp().backParents();
			},
			logon() {
				uni.showModal({
					title: '注销当前用户',
					content: '确认退出当前登录，注销后将消除您的所有数据',
					success: function(res) {
						if (res.confirm) {
							//uni.removeStorage();
							uni.clearStorage();
							uni.clearStorageSync();

							var logon_url = getApp().globalData.internet + getApp().globalData.logOn;
							console.log('logonurl=', logon_url);
							return new Promise((resolve, reject) => {
								uni.request({
									url: logon_url,
									success: (res) => {
										//反应很慢造成白屏
										resolve(res);
									},
									fail: (err) => {
										reject(err)
										uni.showModal({
											content: '退出失败，请检查网络',
										})
									}
								})
							}).then(res => {
								console.log('logon sucess', res);
								if (res.data.code === 200) {
									uni.showToast({
										title: '注销成功',
									})
									setTimeout(() => {
										console.log('into settime');
										uni.reLaunch({
											url: '/pages/login/login'
										})
									}, 200);
								}
							}, err => {
								console.log('logon err', err);
								uni.showToast({
									title: '注销失败',
								})
							});
						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					}
				});
			},
			restart() {
				uni.showModal({
					title: '设备重启',
					content: '确认重启设备，重启后请摇晃设备并等待五分钟再次使用',
					success: function(res) {
						if (res.confirm) {
							var restart = getApp().globalData.internet + getApp().globalData.devReboot;
							let serialcode = getApp().globalData.showDeviceList[0].serial_code
							console.log('serialcode', serialcode)
							return new Promise((resolve, reject) => {
								uni.request({
									url: restart,
									method: 'POST',
									data: {
										serial_code: serialcode,
										reboot_control: 1
									},
									header: {
										'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
									},
									success: (res) => {
										resolve(res);
									},
									fail: (err) => {
										uni.showModal({
											content: '重启失败，请检查网络',
										})
										reject(err)
									}
								})
							}).then(res => {
								console.log('logon sucess', res);
								if (res.data.code === 200) {
									uni.showToast({
										title: '重启成功',
									})

								}
							}, err => {
								console.log('logon err', err);
								uni.showToast({
									title: '注销失败',
								})
							});
						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					}
				});

			}
		}
	}
</script>

<style>

</style>