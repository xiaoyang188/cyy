<template>
	<view class="main-container">
		<!-- <view class="title-container">
			<image class="icon-back" src="/static/icons/public/icon-back.png" mode="widthFix" @click="returnParent"/>
			系统设置
		</view>
		<view class="version-txt">
			版本号{{version}}
		</view> -->
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">系统设置</text>
			</view>
			<view style="width: 150rpx;">

			</view>
		</div>
		<div class="row_center"><text class="version-txt">版本号{{version}}</text></div>
		<view class="settings-container">
			<view class="settings-row" @click="toNorm">
				<view class="settings-row-left">
					<view class="setting-txt">
						行为规范
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="toServeice">
				<view class="settings-row-left">
					<view class="setting-txt">
						服务协议
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<view class="settings-row" @click="toPrivate">
				<view class="settings-row-left">
					<view class="setting-txt">
						隐私政策
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<!-- #ifdef APP-HARMONY -->
			<view class="settings-row" @click="deleteCache">
				<view class="settings-row-left">
					<view class="setting-txt">
						清除缓存
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<!-- #endif -->
			<!-- #ifndef APP-HARMONY -->
			<view class="settings-row" @click="deleteAllFilesWithAlert">
				<view class="settings-row-left">
					<view class="setting-txt">
						清除缓存
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
			<!-- #endif -->

			<view class="settings-row" @click="logon" style="border-bottom: none;">
				<view class="settings-row-left">
					<view class="setting-txt">
						注销账号
					</view>
				</view>
				<image class="settings-img" src="/static/icons/my/arrow-drop-right.png" mode="widthFix" />
			</view>
		</view>

		<!-- 独立的退出登录按钮 -->
		<view class="logout-container">
			<view class="logout-btn" @click="logout">
				<text class="logout-txt">退出登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		loginOut
	} from '@/api/api/login.js'
	import {
		cnacellation
	} from '@/api/api/user.js'
	//#ifdef APP-HARMONY
	import {
		cleanCache
	} from "@/uni_modules/jiannor-oh-tools"
	//#endif
	export default {
		data() {
			return {
				haveUpdata: false,
				version: '1.0.0',
			}
		},
		onLoad() {

		},
		onShow() {
			this.haveUpdata = getApp().globalData.redCircleShow;
			this.version = getApp().globalData.appVersion;
		},
		methods: {
			returnParent() {
				getApp().backParents();
			},
			toNorm() {
				uni.navigateTo({
					url: '/pages/setting/ourAbout/normAbove/normAbove'
				})
			},
			toPrivate() {
				uni.navigateTo({
					url: '/pages/setting/ourAbout/privateAbove/privateAbove'
				})
			},
			deleteAllFilesWithAlert() {
				// 获取当前宠物的pid
				const pet = getApp().globalData.presentPet;
				// 要排除的4个文件标识
				let excludeKeys = [];
				if (pet && pet[0] && pet[0].pid) {
					const pid = pet[0].pid;
					excludeKeys = [
						`${pid}peticon`, // 宠物图标
						`${pid}bell`, // 画布铃铛
						`${pid}light`, // 灯光
						`${pid}belllight` // 铃铛灯光
					];
				}
				console.log('需要排除的Storage Key：', excludeKeys);

				// 从Storage中获取要保留的实际文件路径
				const filesToKeepPaths = excludeKeys
					.map(key => uni.getStorageSync(key))
					.filter(filePath => filePath && filePath.trim() !== ''); // 过滤掉空值

				console.log('需要保留的实际文件路径：', filesToKeepPaths);

				uni.getSavedFileList({
					success: async (res) => {
						const fileList = res.fileList || [];

						if (fileList.length === 0) {
							uni.showToast({
								title: '暂无缓存文件',
								icon: 'none'
							});
							return;
						}
						let guide = uni.getStorageSync("isGuild");
						const phone = uni.getStorageSync('phoneNumber');
						let token = uni.getStorageSync('loginAuthorization');
						uni.clearStorageSync();
						uni.setStorageSync("isGuild", String(guide ||0));
						uni.setStorageSync('phoneNumber', phone);
						uni.setStorageSync('loginAuthorization',token)
						console.log("guide", guide);
						// 分离需要删除和需要保留的文件
						const filesToDelete = []; // 需要删除的文件
						const filesToKeep = []; // 需要保留的文件

						fileList.forEach(fileInfo => {
							const filePath = fileInfo.filePath || '';
							let shouldKeep = false;

							// 检查当前文件路径是否在要保留的文件路径列表中
							for (const keepPath of filesToKeepPaths) {
								if (filePath === keepPath) {
									shouldKeep = true;
									break;
								}
							}

							if (shouldKeep) {
								filesToKeep.push(fileInfo);
								console.log('保留文件：', filePath);
							} else {
								filesToDelete.push(fileInfo);
							}
						});

						console.log(
							`总共 ${fileList.length} 个文件，保留 ${filesToKeep.length} 个，删除 ${filesToDelete.length} 个`
						);

						// 如果没有需要删除的文件
						if (filesToDelete.length === 0) {
							uni.showToast({
								title: filesToKeep.length > 0 ?
									`没有需要清理的文件（已保留 ${filesToKeep.length} 个文件）` :
									'暂无缓存文件',
								icon: 'none'
							});
							return;
						}

						// 显示确认对话框
						uni.showModal({
							title: '确认清理',
							content: `将清理 ${filesToDelete.length} 个缓存文件${filesToKeep.length > 0 ? `\n保留 ${filesToKeep.length} 个重要文件` : ''}`,
							success: async (modalRes) => {
								if (modalRes.confirm) {
									// 执行批量删除
									const deleteResults = [];

									// 使用for循环保证顺序执行，避免并发问题
									for (const fileInfo of filesToDelete) {
										try {
											await this.removeFile(fileInfo.filePath);
											deleteResults.push({
												success: true,
												filePath: fileInfo.filePath
											});
										} catch (error) {
											deleteResults.push({
												success: false,
												filePath: fileInfo.filePath,
												error: error.errMsg || error
											});
										}
									}

									// 统计结果
									const successCount = deleteResults.filter(r => r.success)
										.length;
									const failCount = filesToDelete.length - successCount;

									// 显示清理结果
									if (failCount === 0) {
										uni.showToast({
											title: `成功清理 ${successCount} 个文件`,
											icon: 'none',
											duration: 2000
										});
									} else {
										uni.showModal({
											title: '清理结果',
											content: `成功清理 ${successCount} 个文件\n${failCount} 个文件清理失败`,
											showCancel: false,
											confirmText: '知道了'
										});
									}

									// 可以记录哪些文件清理失败，以便后续处理
									if (failCount > 0) {
										const failedFiles = deleteResults
											.filter(r => !r.success)
											.map(r => r.filePath);
										console.log('清理失败的文件：', failedFiles);
									}
								} else {
									uni.showToast({
										title: '已取消清理',
										icon: 'none'
									});
								}
							}
						});
					},
					fail: (err) => {
						console.error('获取文件列表失败：', err);
						uni.showToast({
							title: '获取文件列表失败',
							icon: 'none'
						});
					}
				});
			},

			// 封装删除单个文件的Promise
			async removeFile(filePath) {
				return new Promise((resolve, reject) => {
					uni.removeSavedFile({
						filePath,
						success: () => {
							console.log('✅ 已删除：', filePath);
							resolve();
						},
						fail: (err) => {
							console.error('❌ 删除失败：', filePath, err);
							reject(err);
						}
					});
				});
			},
			deleteCache() {
				uni.showModal({
					title: '提示',
					content: '确定要清除缓存数据吗？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: '清除中'
							})
							cleanCache({
								success: (res) => {
									console.log(res)
								},
								fail: (err) => {
									console.log(err)
								},
								complete: (res) => {
									console.log(res)
									uni.hideLoading()
									uni.showToast({
										title: '清除完成'
									})
								}
							})
						}
					}
				})
			},
			logon() {
				uni.showModal({
					title: '注销当前用户',
					content: '确认退出当前登录，注销后将消除您的所有数据',
					success: function(res) {
						if (res.confirm) {
							cnacellation().then(recivedata => {
								uni.showToast({
									title: '注销成功',
								})
								let guide = uni.getStorageSync("isGuild")
								uni.clearStorage();
								uni.clearStorageSync();
								uni.clearStorage({
									success: () => {
										console.log('清理完成');
										uni.setStorageSync("isGuild", String(
											guide || 0));
									},
									fail: (err) => {
										console.error('清理失败:', err);
										// 即使清理失败，也尝试设置
										try {
											uni.setStorageSync("isGuild", String(
												guide ||
												0));
										} catch (e) {
											console.error('设置存储失败:', e);
										}
									}
								});
								console.log("guide", guide)
								getApp().initGlobalData()
								setTimeout(() => {
									console.log('into settime');
									uni.reLaunch({
										url: '/pages/login/login'
									})
								}, 200);
							})

						} else if (res.cancel) {
							//console.log('用户点击取消');
						}
					}
				});
			},
			ourAbout() {
				uni.navigateTo({
					url: '/pages/setting/ourAbout/ourAbout'
				})
			},
			showSetting() {
				uni.navigateTo({
					url: '/pages/setting/appSetting/appSetting'
				})
			},
			toFirmware() {
				uni.navigateTo({
					url: "/pages/setting/firmware/firmware?rute=0"
				})
			},
			service() {
				uni.navigateTo({
					url: '/pages/setting/service/service'
				})
			},
			toServeice() {
				uni.navigateTo({
					url: '/pages/setting/ourAbout/serviceAbove/serviceAbove'
				})
			},
			logout() {
				uni.showModal({
					title: '退出登录',
					content: '确认退出当前登录',
					success: (res) => { // 改为箭头函数
						if (res.confirm) {
							// 1. 先清理所有异步操作和监听器
							// uni.$emit('app-logout-cleanup');
							setTimeout(() => {
								try {
									let guide = uni.getStorageSync("isGuild");
									uni.clearStorageSync();
									console.log("guide", guide);
									uni.clearStorage({
										success: () => {
											console.log('清理完成');
											uni.setStorageSync("isGuild", String(
												guide ||
												0));
										},
										fail: (err) => {
											console.error('清理失败:', err);
											// 即使清理失败，也尝试设置
											try {
												uni.setStorageSync("isGuild",
													String(
														guide || 0));
											} catch (e) {
												console.error('设置存储失败:', e);
											}
										}
									});
									getApp().initGlobalData();
									loginOut().then(recive => {
										uni.reLaunch({
											url: '/pages/login/login'
										});
									})
								} catch (error) {
									console.log('登出API调用失败，直接跳转:', error);
									uni.reLaunch({
										url: '/pages/login/login'
									});
								}
							}, 500);
						}
					}
				});
			},
			toSecurity() {
				uni.navigateTo({
					url: '/pages/setting/security/security'
				})
			},

		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.myicon {
		width: 35rpx;
		height: 35rpx;
		border-radius: 50%;
		background-color: red;
		margin-right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* 	.title-container{
		width: 100%;
		text-align: center;
		font-weight: bold;
		position: relative;
	}
	.icon-back{
		position: absolute;
		left: 30rpx;
		width: 50rpx;
		margin: auto 0;
	} */
	.version-txt {
		margin-top: 30rpx;
		width: 100%;
		text-align: center;
		color: #808080;
		font-size: 25rpx;
	}

	/* 独立退出登录按钮样式 */
	.logout-container {
		margin: 30rpx auto;
		width: 585rpx;
		background-color: white;
		border-radius: 50rpx;
		padding: 20rpx;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.20);
	}

	.logout-btn {
		display: flex;
		align-items: center;
		margin: 10rpx;
		justify-content: center;
	}

	.logout-txt {
		line-height: 70rpx;
		height: 70rpx;
		color: #ff4757;
		font-size: 28rpx;
		font-weight: 500;
	}
</style>