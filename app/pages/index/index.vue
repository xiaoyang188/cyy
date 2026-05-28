<template>
	<!-- 添加一个根视图，避免白屏 -->
	<view class="index-container">
		<!-- 网络状态提示 -->
		<view v-if="showNetworkError" class="network-error">
			<view class="error-content">
				<image src="/static/network-error.png" mode="widthFix" class="error-icon"></image>
				<text class="error-text">网络连接失败</text>
				<text class="error-desc">请检查您的网络设置</text>
				<button class="retry-btn" @tap="retryConnect">重试连接</button>
			</view>
		</view>


		<!-- 加载状态 -->
		<view v-else="isLoading" class="loading-container">
			<image src="/static/imgs/login/index_background.png" mode="aspectFill" class="loading-bg"></image>
			<view class="loading-content">
				<view class="loading-spinner"></view>
				<text class="loading-text">{{ loadingText }}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		univerifyLogin
	} from "@/api/api/login.js"
	import util from '../../common/util';
	import {
		getPetList
	} from '@/api/api/pet.js'
	export default {
		data() {
			return {
				univerifyManager: null,
				isLoading: true,
				showNetworkError: false,
				loadingText: '检查网络中...',
				retryCount: 0,
				maxRetryCount: 3,
				info: null
			};
		},

		onLoad() {
			// 页面加载时开始检查
			this.initApp();
		},
		onShow() {
			// 监听网络变化
			this.setupNetworkListener();
		},

		onHide() {
			// 移除监听，避免内存泄漏
			this.removeNetworkListener();
		},
		methods: {
			/**
			 * 初始化应用
			 */
			async initApp() {
				this.isLoading = true;
				this.loadingText = '应用启动中...';
				// 先检查全局数据
				if (!this.checkGlobalData()) {
					return;
				}

				// 检查网络状态
				await this.checkNetwork();
			},

			/**
			 * 检查全局数据
			 */
			checkGlobalData() {
				if (!getApp().globalData || !getApp().globalData.internet) {
					console.log('全局数据未初始化');
					this.loadingText = '初始化失败';
					return false;
				}
				return true;
			},
			/**
			 * 检查网络状态
			 */
			async checkNetwork() {
				try {
					this.loadingText = '检查网络连接...';
					const networkType = await this.getNetworkType();

					if (networkType === 'none') {
						this.showNetworkError = true;
						this.isLoading = false;
						return false;
					}

					// 有网络，继续执行登录流程
					await this.executeLoginFlow();
					return true;

				} catch (error) {
					console.error('检查网络失败:', error);
					this.showNetworkError = true;
					this.isLoading = false;
					return false;
				}
			},
			/**
			 * 获取网络类型
			 */
			getNetworkType() {
				return new Promise((resolve, reject) => {
					uni.getNetworkType({
						success: (res) => resolve(res.networkType),
						fail: (err) => reject(err)
					});
				});
			},

			/**
			 * 设置网络监听
			 */
			setupNetworkListener() {
				this.networkListener = (res) => {
					if (!res.isConnected && !this.showNetworkError) {
						// 网络断开且当前不是错误状态
						uni.showToast({
							title: '网络已断开',
							icon: 'none',
							duration: 2000
						});
					}
				};

				uni.onNetworkStatusChange(this.networkListener);
			},

			/**
			 * 移除网络监听
			 */
			removeNetworkListener() {
				if (this.networkListener) {
					uni.offNetworkStatusChange(this.networkListener);
				}
			},

			/**
			 * 执行登录流程
			 */
			async executeLoginFlow() {
				try {
					// 1. 测试服务器连接
					this.loadingText = '连接服务器...';
					const connectResult = await this.testServerConnection();

					if (!connectResult) {
						return;
					}

					const phone = uni.getStorageSync('phoneNumber');
					console.log('当前手机号:', phone);
					if (!phone) {
						this.redirectToLogin();
						return
					}

					// 3. 获取宠物列表数据
					this.getPetListWithCache(phone)

				} catch (error) {
					console.error('登录流程异常:', error);
					this.handleLoginError(error);
				}
			},

			/**
			 * 测试服务器连接
			 */
			async testServerConnection() {
				try {
					const url = getApp().globalData.internet + getApp().globalData.connect_url;
					const result = await util.requestDataJson(url, {});

					if (result && result.data && result.data.code === 200) {
						return true;
					} else {
						this.showConnectionError();
						return false;
					}
				} catch (error) {
					console.error('服务器连接失败:', error);
					this.showConnectionError();
					return false;
				}
			},
			getPetListWithCache(phone) {
				return new Promise((resolve, reject) => {
					// 1. 先尝试从缓存读取
					// const cachedData = uni.getStorageSync('allPets');
					// if (cachedData && cachedData.length > 0) {
					//   console.log('使用缓存的宠物列表',cachedData);
					//   getApp().globalData.allPets = cachedData;
					//   this.redirectToHome();
					//   resolve(cachedData);
					//   return;
					// }
					// 2. 缓存为空，请求网络
					getPetList().then(recivedata => {
						console.log('网络获取宠物列表', recivedata);

						if (recivedata && recivedata.data) {
							// 设置全局数据
							getApp().globalData.allPets = recivedata.data;

							// 存储到缓存
							// try {
							//   uni.setStorageSync('allPets', recivedata.data);
							//   console.log('宠物列表已缓存');
							// } catch (storageErr) {
							//   console.warn('缓存存储失败:', storageErr);
							// }

							this.redirectToHome();
							resolve(recivedata.data);
						} else {
							this.redirectToHome();
							reject(new Error('数据格式错误'));
						}
					}).catch(err => {
						console.error('获取宠物列表失败:', err);
						this.redirectToHome();

						// 后台重试（静默）
						setTimeout(() => {
							util.requestPetList();
						}, 3000);

						reject(err);
					});
				});
			},
			/**
			 * 检查登录状态
			 */
			async checkLoginStatus() {
				const phone = uni.getStorageSync('phoneNumber');
				console.log('当前手机号:', phone);

				if (!phone) {
					return {
						needLogin: true
					};
				}

				try {
					const url = getApp().globalData.internet_cyy + getApp().globalData.getLoginUser_cyy;
					const result = await util.requestDataJson(url, {});

					if (result.data.code === '200') {
						return {
							needLogin: false,
							phone
						};
					} else {
						uni.removeStorageSync('phoneNumber');
						return {
							needLogin: true
						};
					}
				} catch (error) {
					console.log('登录验证失败:', error);
					return {
						needLogin: true
					};
				}
			},

			/**
			 * 获取用户数据
			 */
			async getUserData(phone) {


				try {
					// 1. 先尝试从缓存读取
					const cacheKey = phone.toString() + 'data';
					const cachedDataStr = uni.getStorageSync(cacheKey);

					if (cachedDataStr) {
						try {
							// 解析缓存的字符串数据
							const cachedData = JSON.parse(cachedDataStr);
							console.log('使用缓存的用户数据，key:', cacheKey);

							// 使用缓存数据更新全局变量
							getApp().globalData.uidAndAlldata = cachedData;
							getApp().globalData.allData = cachedData.user_pets;
							getApp().globalData.uid = cachedData.uid;

							return {
								success: true,
								fromCache: true,
								data: cachedData
							};
						} catch (parseError) {
							console.error('解析缓存数据失败:', parseError);
							// 解析失败则清除无效缓存
							uni.removeStorageSync(cacheKey);
						}
					}
					const url = getApp().globalData.internet + getApp().globalData.dataRequire;
					const result = await util.requestDataJson(url, {
						phone: phone,
						device_id: getApp().globalData.systemId,
						push_clientid: getApp().globalData.pushId,
						app_version: getApp().globalData.appVersion
					});

					if (result.data.code === 200) {
						// 保存用户数据
						getApp().globalData.uidAndAlldata = result.data.data;
						getApp().globalData.allData = result.data.data.user_pets;
						getApp().globalData.uid = result.data.data.uid;
						return {
							success: true
						};
					} else {
						uni.removeStorageSync('phoneNumber');
						return {
							success: false
						};
					}
				} catch (error) {
					console.log('获取用户数据失败:', error);
					return {
						success: false
					};
				}
			},

			/**
			 * 跳转到首页
			 */
			redirectToHome() {
				console.log('跳转到首页');
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/home/home',
						success: () => {
							console.log('跳转首页成功');
						},
						fail: (err) => {
							console.error('跳转首页失败:', err);
							this.showRedirectError('首页');
						}
					});
				}, 300);
			},
			phoneLogin() {
				this.univerifyManager.login({
					univerifyStyle: {
						fullScreen: true,
						privacyTerms: {
							defaultCheckBoxState: false
						},
						backgroundImage: "/static/new/univerifyImg.png",
						phoneNum: {
							fontSize: '25px'
						},
						slogan: {
							fontSize: '13px'
						},
						authButton: {
							normalColor: '#FA5300',
							highlightColor: '#fd4200',
							disabledColor: 'rgba(250, 83, 0, 0.6)',
							title: '一键登录',
							width: `${this.info.screenWidth*0.8}px`,
							height: '50px'
						},
						otherLoginButton: {
							normalColor: '#EFF0F0',
							highlightColor: '#dbdbdb',
							width: `${this.info.screenWidth*0.8}px`,
							height: '50px'
						},
						icon: {
							path: "/static/new/login_logo.png"
						}
					},
					success: (res) => {
						console.log('univerifyManager', res)
						uni.showLoading({
							title: '加载中'
						})
						uni.getPushClientId({
							success: (resPushId) => {
								console.log('我拿到了pushid' + JSON.stringify(resPushId.cid));
								getApp().globalData.pushId = resPushId.cid;
								//#ifdef APP-HARMONY
								let param = {
									accessToken: res.accessToken,
									pushClientId: getApp().globalData.pushId,
									openid: res.openId
								}
								//#endif
								//#ifdef APP-PLUS
								let param = {
									accessToken: res.authResult.access_token,
									pushClientId: getApp().globalData.pushId,
									openid: res.authResult.openid
								}
								//#endif
								univerifyLogin(param).then((res) => {
									console.log(res)
									uni.hideLoading()
									if (res.code == '200') {
										console.log(res)
										this.univerifyManager.close()
										this.mobile = res.data.user.phone
										uni.setStorageSync('phoneNumber', this.mobile);
										console.log('res', res)
										var token = 'Alpha ' + res.data.tokenInfo.token
										util.setToken(token)
										// this.dataRequire()
										getPetList().then(recivedata => {
											console.log('拿到了宠物列表', recivedata)
											getApp().globalData.allPets =
												recivedata.data
											uni.switchTab({
												url: '/pages/home/home'
											});
										}).catch(err => {
											uni.switchTab({
												url: '/pages/home/home'
											});
											util.requestPetList()
										})
									} else {
										uni.showToast({
											title: res.msg
										})
									}
								}).catch((err) => {
									uni.showToast({
										icon: 'none',
										title: err.toString()
									})
								})

							},
							fail(err) {
								console.log("err", err)
								uni.hideLoading()
								uni.showToast({
									title: '推送ID不见了，请重新提交',
									icon: 'none'
								})
							}
						})

						// this.univerifyManager.close()
					},
					fail: (err) => {
						console.log('univerifyManager', err)
						uni.redirectTo({
							url: '/pages/login/login',
							success: () => {
								console.log('跳转登录页成功');
							},
							fail: (err) => {
								console.error('跳转登录页失败:', err);
								this.showRedirectError('登录页');
							}
						});
					}
				})
			},
			/**
			 * 跳转到登录页
			 */
			redirectToLogin() {
				console.log('跳转到登录页');
				setTimeout(() => {
					this.info = uni.getSystemInfoSync()
					this.univerifyManager = uni.getUniverifyManager()
					this.univerifyManager.preLogin({
						success: () => {
							this.phoneLogin()
						},
						fail() {
							uni.redirectTo({
								url: '/pages/login/login',
								success: () => {
									console.log('跳转登录页成功');
								},
								fail: (err) => {
									console.error('跳转登录页失败:', err);
									this.showRedirectError('登录页');
								}
							});
						}
					})
				}, 300);
			},

			/**
			 * 显示连接错误
			 */
			showConnectionError() {
				this.isLoading = false;
				this.showNetworkError = true;
			},

			/**
			 * 处理登录错误
			 */
			handleLoginError(error) {
				this.isLoading = false;

				if (error.message && error.message.includes('无法访问服务器')) {
					this.showNetworkError = true;
				} else {
					uni.showToast({
						title: '登录异常，请重试',
						icon: 'none',
						duration: 2000
					});
					// setTimeout(() => {
					// 	this.redirectToLogin();
					// }, 1500);
				}
			},

			/**
			 * 显示跳转错误
			 */
			showRedirectError(pageName) {
				uni.showModal({
					title: '提示',
					content: `跳转${pageName}失败，请重启应用`,
					showCancel: false,
					confirmText: '确定',
					success: () => {
						// 可以尝试重启或返回首页
						uni.reLaunch({
							url: '/pages/home/home'
						});
					}
				});
			},

			/**
			 * 重试连接
			 */
			retryConnect() {
				if (this.retryCount >= this.maxRetryCount) {
					uni.showModal({
						title: '提示',
						content: '多次连接失败，请检查网络后重启应用',
						showCancel: false,
						confirmText: '确定'
					});
					return;
				}

				this.retryCount++;
				this.showNetworkError = false;
				this.isLoading = true;
				this.loadingText = '重新连接中...';

				setTimeout(() => {
					this.initApp();
				}, 500);
			}
		}
	};
</script>

<style scoped>
	.index-container {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	/* 网络错误样式 */
	.network-error {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to right, rgba(255, 88, 88, 1), rgba(240, 152, 25, 1));
	}

	.error-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 60rpx;
		background-color: rgba(255, 255, 255, 0.95);
		border-radius: 80rpx;
		width: 80%;
		max-width: 600rpx;
	}

	.error-icon {
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 40rpx;
	}

	.error-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 20rpx;
	}

	.error-desc {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 60rpx;
	}

	.retry-btn {
		background-image: linear-gradient(to right, rgba(255, 88, 88, 1), rgba(240, 152, 25, 1));
		color: white;
		border: none;
		border-radius: 50rpx;
		padding: 20rpx 60rpx;
		font-size: 32rpx;
		box-shadow: 0 10rpx 30rpx rgba(255, 94, 98, 0.3);
	}

	.retry-btn:active {
		transform: scale(0.98);
	}

	/* 加载样式 */
	.loading-container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading-bg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.loading-content {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.loading-spinner {
		width: 100rpx;
		height: 100rpx;
		border: 8rpx solid rgba(255, 255, 255, 0.3);
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
		margin-bottom: 40rpx;
	}

	.loading-text {
		font-size: 32rpx;
		color: white;
		font-weight: bold;
		text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
	}


	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* 启动背景 */
	.launch-bg {
		width: 100%;
		height: 100%;
	}
</style>