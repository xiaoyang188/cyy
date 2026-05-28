<template>
	<view class="loading-container" v-if="isLoad">
		<view class="loading-spinner"></view>
	</view>
	<view class="container" v-if="!isLoad">
		<view class="bar-bg top">
			<image class="bar-img" src="/static/new/img-loginBg.png" mode="aspectFill"></image>
			<view class="title-box">
				<text class="title-text">短信验证码登录</text>
				<text class="title-sub">未注册的手机号码验证后自动注册</text>
			</view>
		</view>

		<view class="login-area">
			<view class="login-box" v-if="!onePhone">
				<input class="phone-input" type="number" placeholder="请输入手机号码"
					placeholder-class="phone-input-placeholder" maxlength="11" v-model="mobile" />
				<view class="valiCode-box">
					<input class="valiCode-input" type="number" placeholder="请输入验证码"
						placeholder-class="phone-input-placeholder" maxlength="6" v-model="code" />
					<text class="valiCode-send" @click="getCodeNew">{{buttonText}}</text>
				</view>
				<view class="select-agreement">
					<radio class="select-radio" color="#FA5300" @click="Agree" :checked="userAgree" />
					<text class="agree-text">我已阅读并同意</text>
					<text class="agree-text agreement" @click="toService">《服务协议》</text>
					<text class="agree-text">和</text>
					<text class="agree-text agreement" @click="toPrivate">《隐私政策》</text>
				</view>
				<button class="login-button"
					:style="{backgroundColor:mobile=='' || code==''?'rgba(250, 83, 0, 0.6)':'#FA5300'}"
					@click="submitFormNew">登录</button>
				<button class="login-phone" v-if="supportUniverify" style="margin-top: 30rpx;"
					@click="phoneLogin">手机号一键登录</button>
			</view>
			<view class="phone-box" v-if="onePhone">
				<button class="login-phone" @click="phoneLogin">登录</button>
				<text class="scm-login" @click="toScm">短信验证码登录>></text>
			</view>

		</view>

		<view class="bar-bg bottom" style="z-index: -1;">
			<image class="bar-img bottom-img" src="/static/new/login-bottom-bg.png" mode=""></image>
		</view>
		<custom-modal ref="modal" />
	</view>
</template>

<script>
	import util from '../../common/util';
	import {
		getOsTheme
	} from '@/uni_modules/jiannor-oh-tools';
	import {
		univerifyLogin,
		getValidCode,
		login
	} from "@/api/api/login.js"
	import {
		getPetList
	} from '@/api/api/pet.js'
	export default {

		data() {

			return {
				isLoad: true,
				onePhone: false,
				supportUniverify: false,
				userAgree: false,
				mobile: '',
				code: '',
				buttonText: '获取验证码',
				countdown: 60,
				disableGetCode: true,
				isShowInputCode: false,
				disableLoginCode: true,
				univerifyManager: null,
				info: null
				// sendCode: false,
			}

		},
		onShow() {
			// #ifdef APP-PLUS
			// 获取平台信息
			const systemInfo = uni.getSystemInfoSync()
			const platform = systemInfo.platform.toLowerCase()
			if (platform === 'android') {
				// Android 平台：使用 plus.runtime 方法
				if (plus.runtime.isAgreePrivacy()) {
					this.initSDKs()
				} else {
					plus.runtime.agreePrivacy(() => {
						this.initSDKs()
					})
					// plus.runtime.quit();
				}
			} else if (platform === 'ios') {
				// iOS 平台：直接初始化或使用自己的逻辑
				this.initSDKs()
				// 注意：iOS 的隐私弹窗通常在原生代码中处理
				// 这里需要确保用户已经同意隐私协议
			}
			// #endif
			//#ifdef APP-HARMONY
			this.initSDKs()
			//#endif
		},
		onLoad(Options) {
			if (Options.phoneNumber)
				this.mobile = Options.phoneNumber;
			this.univerifyManager = uni.getUniverifyManager()
			this.info = uni.getSystemInfoSync()
			// 预登录，检查是否支持一键登录（需要移动数据网络）
			// uni.showLoading({
			// 	title: '加载中'
			// })
		},
		watch: {
			mobile(newVal) {
				if (newVal && newVal.length === 11 && this.countdown === 60) {
					this.onMobileComplete(); // 触发完成事件
				}
			},
			code(newVal) {
				if (newVal && newVal.length === 6) {
					this.disableLoginCode = false
				}
			}
		},
		methods: {
			initSDKs() {
				console.log('login darkMode', getOsTheme())
				uni.getStorage({
					key: 'dogBreed',
					success: function(res) {
						getApp().globalData.dogBreedData = JSON.parse(res.data)
						console.log('dogBreedData', getApp().globalData.dogBreedData);
					},
					fail: function(err) {
						// console.log('获取缓存的dogbreed 失败', err);
						return new Promise((resolve, reject) => {
							//请求
							var require_data = getApp().globalData.internet + getApp().globalData
								.dogBreed;
							logger.info('dog require_data' + JSON.stringify(require_data));
							uni.request({
								url: require_data,
								method: 'POST',
								data: {},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' //重点
								},
								success: (res) => {
									resolve(res);
								},
								fail: (err) => {
									console.log('dog breed err', err);
									reject(err);
								}
							})
						}).then(res => {
							//给storage赋值
							logger.info('dogbreed alldata' + JSON.stringify(res));
							if (res.data.code === 200) {
								getApp().globalData.dogBreedData = res.data.data.dog_breeds;
								var dogBreeds = JSON.stringify(res.data.data.dog_breeds);
								logger.info("storage data=" + JSON.stringify(dogBreeds));
								uni.setStorage({
									key: 'dogBreed',
									data: dogBreeds,
									success: function() {
										console.log('dogBreeds数据缓存成功');
									}
								});
							}


						}, err => {
							logger.info('查询dogbreed数据失败' + JSON.stringify(err));
						})
					}
				})
				uni.getStorage({
					key: 'catBreed',
					success: function(res) {
						getApp().globalData.catBreedData = JSON.parse(res.data)
						console.log('catBreedData', getApp().globalData.catBreedData);
					},
					fail: function(err) {
						console.log('获取缓存的catbreed 失败', err);
						return new Promise((resolve, reject) => {
							//请求
							var require_data = getApp().globalData.internet + getApp().globalData
								.catBreed;
							// console.log('cat require_data', require_data);
							uni.request({
								url: require_data,
								method: 'POST',
								data: {},
								header: {
									'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' //重点
								},
								success: (res) => {
									resolve(res);
								},
								fail: (err) => {
									console.log('cat breed err', err);
									reject(err);
								}
							})
						}).then(res => {
							//给storage赋值
							console.log('catbreed alldata', res);
							if (res.data.code === 200) {
								getApp().globalData.catBreedData = res.data.data.cat_breeds;
								var catBreeds = JSON.stringify(res.data.data.cat_breeds);
								console.log("storage data=", catBreeds);
								uni.setStorage({
									key: 'catBreed',
									data: catBreeds,
									success: function() {
										console.log('catBreeds数据缓存成功');
									}
								});
							}
						}, err => {
							logger.info('查询catbreed数据失败' + JSON.stringify(err));
						})
					}
				})

				this.univerifyManager.preLogin({
					success: (res) => {
						console.log('preLogin success', res)
						this.onePhone = false
						this.supportUniverify = true
						this.isLoad = false

						// uni.hideLoading()
					},
					fail: (err) => {
						console.log('preLogin fail, fallback to normal login', err)
						this.onePhone = false
						this.supportUniverify = false
						this.isLoad = false
						// uni.hideLoading()
					}
				})
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
					}
				})
			},
			toScm() {
				this.onePhone = false
			},
			toService() {
				uni.navigateTo({
					url: '/pages/setting/ourAbout/serviceAbove/serviceAbove'
				})
			},
			toPrivate() {
				uni.navigateTo({
					url: '/pages/setting/ourAbout/privateAbove/privateAbove'
				})
			},
			onMobileComplete() {
				this.disableGetCode = false
			},
			sendCode() {
				this.$refs.modal.show({
					title: '温馨提示',
					content: '验证码已发送',
					showCancel: true,
					confirmText: '确认',
					cancelText: '取消',
					showFooter: false,
					duration: 1000,
					// success: () => {
					//   console.log('用户点击了确认')
					// },
					// fail: () => {
					//   console.log('用户点击了取消')
					// }
				})
			},
			Agree() {
				this.userAgree = !this.userAgree
			},
			dataRequire() {
				var require_data = getApp().globalData.internet + getApp().globalData
					.dataRequire;
				console.log('getApp().globalData.loginAuthorization', getApp().globalData.loginAuthorization)
				util.requestDataFrom(require_data, {
					phone: this.mobile,
					verify_code: this.code
				}).then((res) => {
					uni.hideLoading()
					console.log('res.data', res.data)
					if (res.data.code === 200) {
						getApp().globalData.uidAndAlldata = res.data.data;
						getApp().globalData.allData = res.data.data.user_pets;
						getApp().globalData.uid = res.data.data.uid;
						var user_pets = JSON.stringify(res.data.data);
						uni.switchTab({
							url: '/pages/home/home'
						});
					} else {
						console.log('res.data.code != 200', res)
						this.$refs.modal.show({
							title: '温馨提示',
							content: res.data.msg,
							showCancel: true,
							showFooter: false,
							duration: 2000,
						})
					}
				}).catch((err) => {
					console.log('查询数据失败', err);
				})

			},
			getCodeNew() {
				// 如果手机号为空或手机号格式不正确
				if (!this.mobile || !/^1\d{10}$/.test(this.mobile) || this.mobile.length != 11) {
					uni.showModal({
						content: '请输入正确的手机号',
					})
					return false
				}
				// 如果短信验证码已发送，不再重复发送
				if (this.buttonText !== '获取验证码') {
					return false
				}
				getValidCode(this.mobile).then(recivedata => {
					this.disableGetCode = true;
					this.disableLoginCode = true
					this.isShowInputCode = true
					this.sendCode()
					let timer = setInterval(() => {
						if (this.countdown > 1) {
							this.countdown--
							this.buttonText = this.countdown //秒后重新获取
						} else {
							clearInterval(timer)
							this.buttonText = '获取验证码'
							this.countdown = 60
							this.disableGetCode = false
							// this.isShowInputCode=false
							// this.sendCode = false
						}
					}, 1000)
				})
			},
			getCode() {
				// 如果手机号为空或手机号格式不正确
				if (!this.mobile || !/^1\d{10}$/.test(this.mobile) || this.mobile.length != 11) {
					uni.showModal({
						content: '请输入正确的手机号',
					})
					return false
				}
				// 如果短信验证码已发送，不再重复发送
				if (this.buttonText !== '获取验证码') {
					return false
				}
				// 请求发送短信验证
				// this.sendCode = true;
				var send_verification_url = getApp().globalData.internet_cyy + getApp().globalData
					.send_verification_code_cyy
				util.requestDataJson(send_verification_url, {
					mobile: this.mobile
				}).then((res) => {
					console.log(res)
					if (res.data.code === '200') {
						this.disableGetCode = true;
						this.disableLoginCode = true
						this.isShowInputCode = true
						this.sendCode()
						let timer = setInterval(() => {
							if (this.countdown > 1) {
								this.countdown--
								this.buttonText = this.countdown //秒后重新获取
							} else {
								clearInterval(timer)
								this.buttonText = '获取验证码'
								this.countdown = 60
								this.disableGetCode = false
								// this.isShowInputCode=false
								// this.sendCode = false
							}
						}, 1000)
					} else {
						// this.$refs.modal.show({
						// 	title: '温馨提示',
						// 	content: res.data.msg,
						// 	showCancel: true,
						// 	confirmText: '确认',
						// 	cancelText: '取消',
						// 	showFooter: false,
						// 	duration: 2000,
						// })
					}

				}).catch((err) => {
					console.log('url', send_verification_url)
					console.log('err', err)
				})
			},
			a(recivedata) {
				return new Promise((resolve, reject) => {
					let arr2 = []
					var urldata = new Array();
					recivedata.forEach((item, index) => {
						var pet = item;
						var url = item.pet_account.avatar_url;
						var localImage = '';
						console.log('url', url);
						url =
							'https://1t5904973l.yicp.fun//static/avatar/pet/37ada63e-901a-4d27-9fae-13b2951c6519.jpg'
						// if(url!=null)
						// {
						const p = new Promise((res, rej) => {
							// api.get(v.id).then(api_res=>{  //调用接口
							//   console.log("接口获取数据成功"，api_res)
							//   res()  //单个接口执行完毕
							// })
							uni.getImageInfo({
								src: url,
								success: res => {
									//图片加载成功后，缓存请求地址和本地地址
									console.log("接口获取数据成功", res.path);
									pet.locaImage = res.path;
									resolve(pet);

								},
								fail: err => {
									reject(err);
								}
							});
						})
						arr2.push(p)
						// }

					})
					Promise.all(arr2).then((result) => {
						console.log("???", result)
						console.log('urldata', urldata)
						// resolve() //所有接口都执行完毕
					})
				})
			},
			submitFormNew() {
				if (!this.userAgree) {
					this.$refs.modal.show({
						title: '温馨提示',
						content: "请先阅读并同意用户协议与隐私政策",
						showCancel: true,
						confirmText: '确认',
						cancelText: '取消',
						showFooter: false,
						duration: 2000,
					})
					return
				}
				uni.showLoading({
					title: '正在登录，请耐心等待',
					mask: true,
				})
				uni.getPushClientId({
					success: (res) => {
						console.log('我拿到了pushid' + JSON.stringify(res.cid));
						getApp().globalData.pushId = res.cid;
						const systemInfo = uni.getSystemInfoSync();
						let para = {
							phone: this.mobile,
							validCode: this.code,
							pushClientId: getApp().globalData.pushId,
							deviceId: getApp().globalData.systemId,
							appVersion: systemInfo.appVersion,
						}
						login(para).then(recivedata => {
							uni.setStorageSync('phoneNumber', this.mobile);
							console.log('recivedata', recivedata)
							var token = 'Alpha ' + recivedata.data.tokenInfo.token
							util.setToken(token)

							getPetList().then(recivedata => {
								uni.hideLoading()
								console.log('拿到了宠物列表', recivedata)
								getApp().globalData.allPets = recivedata.data
								uni.switchTab({
									url: '/pages/home/home'
								});
							}).catch(err => {
								uni.switchTab({
									url: '/pages/home/home'
								});
								util.requestPetList()
							})
						}).catch((err) => {
							uni.hideLoading()
							console.log('err', err)
							uni.showToast({
								title: err.toString(),
								icon: 'none'
							})
						})
					},
					fail(err) {
						console.log("err", err)
						uni.showToast({
							title: '推送ID不见了，请重新提交',
							icon: 'none'
						})
					}
				})

			},
			submitForm() {
				if (!this.userAgree) {
					this.$refs.modal.show({
						title: '温馨提示',
						content: "请先阅读并同意用户协议与隐私政策",
						showCancel: true,
						confirmText: '确认',
						cancelText: '取消',
						showFooter: false,
						duration: 2000,
					})
					return
				}
				uni.showLoading({
					title: '正在登录，请耐心等待',
					mask: true,
				})
				var login_with_code_url = getApp().globalData.internet_cyy + getApp().globalData.login_with_code_cyy;
				console.log('login_with_code_url', getApp().globalData.pushId)
				util.requestDataJson(login_with_code_url, {
					mobile: this.mobile,
					validCode: this.code,
					unipushInfo: {
						push_clientid: getApp().globalData.pushId
					}
				}).then((res) => {
					if (res.data.code == '200') {
						uni.setStorageSync('phoneNumber', this.mobile);
						console.log('res', res)
						var token = 'Alpha ' + res.data.data.tokenInfo.token
						util.setToken(token)
						// uni.setStorageSync('loginAuthorization', getApp().globalData.loginAuthorization)
						// this.dataRequire()
						getPetList().then(recivedata => {
							console.log('拿到了宠物列表', recivedata)
							getApp().globalData.allPets = recivedata.data
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
						uni.hideLoading()
						this.$refs.modal.show({
							title: '温馨提示',
							content: res.data.msg,
							showCancel: true,
							showFooter: false,
							duration: 2000,
						})
						console.log('login fail', res)
					}
				}).catch((err) => {
					uni.hideLoading();
					console.log('err', err)
					this.$refs.modal.show({
						title: '温馨提示',
						content: err?.message || String(err) || '登录失败',
						showCancel: true,
						showFooter: false,
						duration: 2000,
					})
				})
			}


		}

	}
</script>

<style>
	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.loading-container {
		width: 100vw;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.loading-spinner {
		width: 80rpx;
		height: 80rpx;
		border: 8rpx solid #f3f3f3;
		border-top: 8rpx solid #FA5300;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.container {
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.bar-bg {
		width: 100%;
		position: absolute;
		left: 0;
	}

	.bar-bg.top {
		top: 0rpx;
		height: 450rpx;
		align-items: center;
	}

	.title-box {
		position: absolute;
		bottom: 140rpx;
		align-items: center;
	}

	.title-text {
		font-size: 40rpx;
		font-weight: bold;
	}

	.title-sub {
		font-size: 20rpx;
		color: darkgray;
	}

	.login-area {
		width: 100%;
		height: 600rpx;
		position: absolute;
		top: 400rpx;
	}

	.login-box {
		width: 100%;
		height: 100%;
		align-items: center;
		padding: 0 40rpx;
	}

	.phone-box {
		width: 100%;
		height: 100%;
		align-items: center;
		padding: 0 40rpx;
		margin-top: 300rpx;
	}

	.phone-input {
		box-sizing: border-box;
		width: 100%;
		height: 90rpx;
		border-radius: 8rpx;
		background-color: #F4F4F4;
		padding: 0 20rpx;
	}

	.phone-input-placeholder {
		color: #777777;
		opacity: 0.5;
	}

	.valiCode-box {
		margin-top: 40rpx;
		box-sizing: border-box;
		width: 100%;
		height: 90rpx;
		border-radius: 8rpx;
		background-color: #F4F4F4;
		flex-direction: row;
	}

	.valiCode-input {
		flex: 3;
		height: 100%;
		align-content: center;
		padding: 0 20rpx;
	}

	.valiCode-send {
		flex: 1.2;
		height: 100%;
		text-align: center;
		align-content: center;
		font-size: 28rpx;
		color: #FA5300;
	}

	.select-agreement {
		flex-direction: row;
		width: 100%;
		height: 50rpx;
		margin-top: 65rpx;
	}

	.select-radio {
		transform: scale(0.8);
	}

	.agree-text {
		font-size: 25rpx;
		height: 100%;
		align-content: center;
	}

	.agree-text.agreement {
		color: #FA5300;
	}

	.login-button {
		width: 100%;
		/* background-color: #FA5300; */
		background-color: rgba(250, 83, 0, 0.6);
		;
		color: white;
		border-radius: 50rpx;
		margin-top: 60rpx;
		height: 95rpx;
		align-content: center;
	}

	.login-phone {
		width: 100%;
		/* background-color: #FA5300; */
		color: white;
		border-radius: 50rpx;
		height: 95rpx;
		align-content: center;
		background-color: #FA5300;
	}

	.scm-login {
		font-size: 20rpx;
		color: darkgray;
		margin-top: 40rpx;
	}

	.bar-bg.bottom {
		bottom: 0rpx;
		height: 500rpx;
	}

	.bar-img {
		width: 100%;
	}

	.bar-img.bottom-img {
		height: 500rpx;
	}
</style>