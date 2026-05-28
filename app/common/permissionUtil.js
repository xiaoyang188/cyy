/**
 * 权限管理工具库
 * 提供权限请求、权限说明弹窗和跳转应用设置等功能
 */

const permissionUtil = {
	// 权限状态
	state: {
		WRITE_EXTERNAL_STORAGE: false,
		READ_EXTERNAL_STORAGE: false,
		CALL_PHONE: false,
		READ_MEDIA_IMAGES: false,
		isIos: uni.getSystemInfoSync().platform === 'ios',
		mapping: {
			'WRITE_EXTERNAL_STORAGE': {
				title: "存储空间/照片权限说明",
				content: "便于您使用该功能上传您的照片/图片/视频及用于更换头像、发布评论/分享、下载、与客服沟通等场景中读取和写入相册和文件内容。",
				methods: 'SET_WRITE_EXTERNAL_STORAGE'
			},
			'READ_EXTERNAL_STORAGE': {
				title: "存储空间/照片权限说明",
				content: "便于您使用该功能上传您的照片/图片/视频及用于更换头像、发布评论/分享、下载、与客服沟通等场景中读取和写入相册和文件内容。",
				methods: 'SET_READ_EXTERNAL_STORAGE'
			},
			'CALL_PHONE': {
				title: "拨打/管理电话权限说明",
				content: "便于您使用该功能联系商家或者商家与您联系等场景",
				methods: 'SET_CALL_PHONE'
			},
			'READ_MEDIA_IMAGES': {
				title: "图片访问权限说明",
				content: "便于您使用该功能上传您的照片/图片/视频及用于更换头像等场景中读取相册内容。",
				methods: 'SET_MEDIA_IMAGES'
			}
		}
	},

	/**
	 * 请求权限
	 * @param {string} permissionID 权限ID (如 'WRITE_EXTERNAL_STORAGE')
	 * @returns {Promise<number>} 返回Promise，1表示已授权，0表示未授权，-1表示永久拒绝
	 */
	async requestPermission(permissionID) {
		try {
			// 苹果不需要权限请求
			if (this.state.isIos) {
				return Promise.resolve(1);
			}

			// Android权限查询
			const result = await this._requestAndroidPermission(permissionID);
			if (result === 1) {
				//'已获得授权'
				this._setPermissionState(permissionID, true);
			} else {
				this._setPermissionState(permissionID, false);
			}
			console.log('android.permission.' + permissionID, '当前手机权限',this.state[permissionID]);
			if (!this.state[permissionID] && !this.state.isIos) {
				const viewObj = this._createPermissionModal(permissionID);
				viewObj.show();
				uni.showModal({
					title: '提示',
					content: '操作权限已被拒绝，请手动前往设置',
					confirmText: "立即设置",
					success: (res) => {
						if (res.confirm) {
							this.gotoAppPermissionSetting();
						}
						viewObj.close();
					}
					
				});
			}
			
			// if (result === 1) {
			// 	// '已获得授权'
			// 	this._setPermissionState(permissionID, true);
			// } else if (result === 0) {
			// 	// '未获得授权'
			// 	this._setPermissionState(permissionID, false);
			// } else {
			// 	this._setPermissionState(permissionID, true);
			// 	uni.showModal({
			// 		title: '提示',
			// 		content: '操作权限已被拒绝，请手动前往设置',
			// 		confirmText: "立即设置",
			// 		success: (res) => {
			// 			if (res.confirm) {
			// 				this.gotoAppPermissionSetting();
			// 			}
			// 		}
			// 	});
			// }

			return result;
		} catch (error) {
			console.error('请求权限出错:', error);
			return Promise.reject(error);
		}
	},

	/**
	 * 跳转到应用权限设置页面
	 */
	gotoAppPermissionSetting() {
		if (this.state.isIos) {
			this._gotoIOSPermissionSetting();
		} else {
			this._gotoAndroidPermissionSetting();
		}
	},

	// 私有方法：设置权限状态
	_setPermissionState(permissionID, val) {
		if (this.state.mapping[permissionID] && this.state.mapping[permissionID].methods) {
			const method = this.state.mapping[permissionID].methods;
			console.log('method',method)
			switch (method) {
				case 'SET_WRITE_EXTERNAL_STORAGE':
					this.state.WRITE_EXTERNAL_STORAGE = val;
					break;
				case 'SET_READ_EXTERNAL_STORAGE':
					this.state.READ_EXTERNAL_STORAGE = val;
					break;
				case 'SET_CALL_PHONE':
					this.state.CALL_PHONE = val;
					break;
				case 'SET_MEDIA_IMAGES':
					this.state.READ_MEDIA_IMAGES = val
					break;
			}
		}
	},

	// 私有方法：请求Android权限
	_requestAndroidPermission(permissionID) {
		return new Promise((resolve) => {
			plus.android.requestPermissions(
				['android.permission.' + permissionID],
				(resultObj) => {
					let result = 0;

					if (resultObj.granted && resultObj.granted.length > 0) {
						console.log('已获取的权限：' + resultObj.granted[0]);
						result = 1;
					}

					if (resultObj.deniedPresent && resultObj.deniedPresent.length > 0) {
						console.log('拒绝本次申请的权限：' + resultObj.deniedPresent[0]);
						result = 0;
					}

					if (resultObj.deniedAlways && resultObj.deniedAlways.length > 0) {
						console.log('永久拒绝申请的权限：' + resultObj.deniedAlways[0]);
						result = -1;
					}

					resolve(result);
				},
				(error) => {
					console.log('申请权限错误：' + error.code + " = " + error.message);
					resolve({
						code: error.code,
						message: error.message
					});
				}
			);
		});
	},

	// 私有方法：创建权限说明弹窗
	_createPermissionModal(permissionID) {
		const systemInfo = uni.getSystemInfoSync();
		const statusBarHeight = systemInfo.statusBarHeight;
		const navigationBarHeight = systemInfo.platform === 'android' ? 48 : 44;
		const totalHeight = statusBarHeight + navigationBarHeight;

		let view = new plus.nativeObj.View('per-modal', {
			top: '0px',
			left: '0px',
			width: '100%',
			backgroundColor: '#444',
		});

		view.drawRect({
			color: '#fff',
			radius: '5px'
		}, {
			top: totalHeight + 'px',
			left: '5%',
			width: '90%',
			height: "100px",
		});

		view.drawText(this.state.mapping[permissionID].title, {
			top: totalHeight + 5 + 'px',
			left: "8%",
			height: "30px"
		}, {
			align: "left",
			color: "#000",
		});

		view.drawText(this.state.mapping[permissionID].content, {
			top: totalHeight + 35 + 'px',
			height: "60px",
			left: "8%",
			width: "84%"
		}, {
			whiteSpace: 'normal',
			size: "14px",
			align: "left",
			color: "#656563"
		});

		return {
			show: () => {
				const view = plus.nativeObj.View.getViewById('per-modal');
				view.show();
			},
			close: () => {
				const view = plus.nativeObj.View.getViewById('per-modal');
				view.close();
			}
		};
	},

	// 私有方法：跳转iOS权限设置
	_gotoIOSPermissionSetting() {
		const UIApplication = plus.ios.import("UIApplication");
		const application = UIApplication.sharedApplication();
		const NSURL = plus.ios.import("NSURL");
		const setting = NSURL.URLWithString("app-settings:");

		application.openURL(setting);

		plus.ios.deleteObject(setting);
		plus.ios.deleteObject(NSURL);
		plus.ios.deleteObject(application);
	},

	// 私有方法：跳转Android权限设置
	_gotoAndroidPermissionSetting() {
		const Intent = plus.android.importClass("android.content.Intent");
		const Settings = plus.android.importClass("android.provider.Settings");
		const Uri = plus.android.importClass("android.net.Uri");
		const mainActivity = plus.android.runtimeMainActivity();

		const intent = new Intent();
		intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
		const uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
		intent.setData(uri);
		mainActivity.startActivity(intent);
	}
};

export default permissionUtil;