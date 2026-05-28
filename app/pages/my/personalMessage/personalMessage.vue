<template>
	<div class="main-container">
		<div class="nav_row">
			<view class="row_center" style="width: 150rpx;height: 150rpx;" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">个人资料</text>
			</view>
			<view style="width: 150rpx;">
			</view>
		</div>
		<view class="form-contant">
			<qf-image-cropper v-if="showCropper" :zIndex='1000' ref="QfImageCropper" :width="500" :height="500"
				:radius="250" @crop="handleCrop"></qf-image-cropper>
			<cach-image @click="choseavatar" :url="personal.profile_url" :fileMd5="personal.profile_url" width="160rpx"
				height="160rpx" radius="50%"></cach-image>
			<text style="margin-top: 30rpx;margin-bottom: 30rpx;">头像</text>
			<div style="width: 80%;background-color:rgb(255,255,255);border-radius:40rpx;">
				<uni-forms ref="form" :modelValue="personal" :rules="rules" label-align="left" label-width="200rpx"
					:border="true">
					<uni-forms-item label="名字" name="nickname" style="padding-left: 8.5%;">
						<view class="input_view hidden-over-text" style="margin-right: 8.5%;">
							<uni-easyinput :inputBorder="false" :clearable="false" maxlength="13" type="text"
								v-model="personal.nickname" placeholder="请输入名字" />
						</view>
					</uni-forms-item>
				<!-- 	<uni-forms-item label="手机号" name="phone" style="padding-left: 8.5%;">
						<view class="input_view" style="margin-left: 25%;margin-right: 8.5%;">
							<uni-easyinput :clearable="false" :inputBorder="false" type="digit" :readonly="true" v-model="personal.phone"
								placeholder="请输入手机号">
							</uni-easyinput>
						</view>
					</uni-forms-item> -->
					<uni-forms-item label="性别" name="gender" style="padding-left: 8.5%;">
						<view class="input_view"
							style="margin-left: 25%;display: flex;align-items: center;margin-right: 8.5%;">
							<uni-data-select class="gender-select" placeholder="" v-model="personal.gender"
								:localdata="Sex" :clear="false"></uni-data-select>
						</view>
					</uni-forms-item>
					<uni-forms-item label="出生日期" name="birth_date" style="padding-left: 8.5%;">
						<view class="input_view" style="margin-left: 25%;margin-right: 8.5%;display: flex;align-items: center;justify-content: flex-end;height: 100%;padding-left: 20rpx;min-height: 40rpx;width: 66.5%;" @click="showCalendar">
								{{personal.birth_date || '请选择'}}
						</view>
					</uni-forms-item>
				</uni-forms>
			</div>
			<button style="width: 300rpx;border-radius: 40rpx;margin-top: 100rpx;" class="myButton"
				@click="submit"><text style="color: rgb(255,255,255);">保存</text> </button>
		</view>
		<custom-modal ref="modal" />
		<uni-calendar ref="calendar" :insert="false" :lunar="false" :range="false"
			:start-date="startDate" :end-date="endDate"  @confirm="confirm"/>
	</div>
</template>

<script>
	import util from '../../../common/util'
	import {upload} from '@/api/api/system.js'
	import {updateUserInfo} from '@/api/api/user.js'
	export default {
		data() {
			return {
				startDate:"",
				endDate:"",
				showCropper: false,
				fileArray: new Array(),
				Sex: [{
						value: 0,
						text: '女'
					},
					{
						value: 1,
						text: '男'
					}
				],
				personal: {
					nickname: '',
					birth_date: '2023-10-01',
					gender: 0,
					phone: '',
					profile_url: ''
				},
				url: '',
				rules: {
					nickname: {
						rules: [{
								required: true,
								errorMessage: '请输入姓名',
							},
							{
								validateFunction: (rule, value, data, callback) => {
									if (!value) {
										callback('请输入姓名');
										return;
									}

									const trimmedValue = value;
									if (trimmedValue.length === 0) {
										callback('请输入姓名');
										return;
									}

									if (trimmedValue.length < 1 || trimmedValue.length > 13) {
										callback('姓名长度在1-13个字符之间');
										return;
									}

									// 检查是否包含特殊字符
									const reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
									if (reg.test(trimmedValue)) {
										callback('姓名不能包含特殊字符');
										return;
									}

									return true;
								}
							}
						]
					},
					phone: {
						rules: [{
								required: true,
								errorMessage: '请输入手机号码',
							},
							{
								pattern: /^1[3456789]\d{9}$/,
								errorMessage: '手机号格式不正确',
							}
						]
					},
					gender: {
					    rules: [{
					        required: true,
					        errorMessage: '请选择性别',
					    }, {
					        validateFunction: function(rule, value, data, callback) {
					            // 检查值是否为 0 或 1
					            if (value !== 0 && value !== 1) {
					                callback('性别值无效，请选择男或女');
					            } else {
					                callback();
					            }
					        }
					    }]
					},
					birth_date: {
						rules: [{
								required: true,
								errorMessage: '请选择出生日期',
							},
							{
								validateFunction: (rule, value, data, callback) => {
									if (!value) {
										callback('请选择出生日期');
										return;
									}

									// 验证日期格式
									const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
									if (!dateRegex.test(value)) {
										callback('日期格式不正确');
										return;
									}

									// 验证日期是否合理（不能是未来日期）
									const selectedDate = new Date(value);
									const today = new Date();
									today.setHours(0, 0, 0, 0);

									if (selectedDate > today) {
										callback('出生日期不能是未来日期');
										return;
									}

									return true;
								}
							}
						]
					}
				}
			}
		},
		onLoad(opt) {
			console.log("opt", opt)
			let date=new Date(Date.now())
			this.startDate = `1900-01-01`
			this.endDate=`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
			if (opt.para) {
				const personalData = JSON.parse(opt.para);
				// if (this.personal.nickname) {
				// 	this.personal.nickname = this.personal.nickname.substring(0, 10);
				// }
				this.personal.phone = personalData.phone
				this.personal.nickname = personalData.nickName
				this.personal.profile_url = personalData.profileUrl
				this.personal.gender=personalData.gender
				if(this.personal.gender!=1&&this.personal.gender!=0)
				{
					this.personal.gender=1
				}
				this.personal.birth_date=personalData.birthDate
				let storageKey = 'IMAGE_CACHE_INFO_' + personalData.profileUrl
				this.url=uni.getStorageSync(storageKey)
				setTimeout(()=>{
					console.log('this.url', this.url);
				},1000)
				
			}
		},
		methods: {
			showCalendar(){
				this.$refs.calendar.open();
			},
			confirm(event){
				console.log(event)
				this.personal.birth_date=event.fulldate
			},
			handleCrop(e) {

				this.url = e.tempFilePath;
				this.personal.profile_url = e.tempFilePath;
				this.showCropper = false
				this.fileArray.push(e.tempFilePath);
			},
			choseavatar() {
				this.showCropper = true
				// uni.chooseImage({
				// 	count: 1, // 只允许选择一张图片
				// 	sizeType: ['compressed'], // 可以选择压缩的图片
				// 	sourceType: ['album'], // 从相册选择
				// 	crop: {
				// 		quality: 100, //图片质量,不填为80
				// 		width: 1024, //裁剪宽度
				// 		height: 1024, //裁剪高度
				// 		resize: true
				// 	}, //从相册选择或者拍照
				// 	success: (res) => {
				// 		const tempFilePaths = res.tempFilePaths;
				// 		console.log("tempFilePaths", tempFilePaths);
				// 		this.url = tempFilePaths[0];
				// 		this.personal.profile_url = tempFilePaths[0];
				// 	},
				// 	fail: (err) => {
				// 		console.error('选择图片失败:', err);
				// 		uni.showToast({
				// 			title: '选择图片失败',
				// 			icon: 'none'
				// 		});
				// 	}
				// });
			},
			onok(ev) {
				this.url = "";
				var obj = {};
				obj.name = "profile_url";
				obj.uri = ev.path;
				this.personal.avatar_url = ev.path;
				console.log('获取图片路径', this.pet.avatar_url);
				this.fileArray.push(obj);
			},
			returnParent() {
				getApp().backParents();
			},
			async submit() {
				try {
					// 在验证前先处理数据
					// console.log('this.personal.nickname',this.personal.nickname)
					// this.personal.nickname = this.personal.nickname ? this.personal.nickname : '';
					// 执行表单验证
					const validateResult = await this.$refs.form.validate();
					console.log('表单验证通过', validateResult);
					console.log('this.url', this.url)
					// 验证通过后提交数据
					this.submitFormDataNew();

				} catch (error) {
					console.log('表单验证失败:', error);
					// 显示第一个错误信息
					if (error && error.length > 0) {
						uni.showToast({
							title: error[0].errorMessage,
							icon: 'none',
							duration: 3000
						});
					}
				}
			},
			modifyUser(para) {
				updateUserInfo(para).then(recivedata=>{
					this.personal.birth_date=recivedata.data.user.birthDate
					this.$refs.modal.show({
						title: '温馨提示',
						content: "保存成功",
						showCancel: true,
						confirmText: '确认',
						cancelText: '取消',
						showFooter: true,
						success: () => {
							console.log('用户点击了确认')
							this.returnParent()
						},
						fail: () => {
							console.log('用户点击了取消')
						}
					})
				})
			},
			submitFormDataNew(){
				if (this.url === '')
					this.url = '/static/xixin/default.png'
				uni.showLoading({
					title: '正在提交信息，请耐心等待',
					mask: true,
				});
				console.log('personal data:', this.personal);
				if (this.personal.gender === null) {
					this.personal.gender = 0;
				}
				let formdata = {
					nickname: this.personal.nickname,
					birthDate: this.personal.birth_date,
					gender: this.personal.gender,
				};
				console.log('this.fileArray',this.fileArray)
				if(this.fileArray.length>0)
				{
					console.log('into uploadpara')
					let uploadpara = {
						filePath: this.url,
						pathPrefix: 'static/user/avatar/'
					}
					upload(uploadpara).then(recive => {
						const fileData =util.handleUploadResponse(recive);
						console.log('最终得到的文件数据:', fileData);
						formdata.profileUrl = fileData.fileKey
						uni.hideLoading()
						this.modifyUser(formdata)
					}).catch(err => {
						uni.hideLoading()
						console.log('upload err', err)
					})
				}else
				{
					uni.hideLoading()
					this.modifyUser(formdata)
				}
			},
			submitFormData() {
				var petAdd = getApp().globalData.internet + getApp().globalData.userUpdata;
				console.log('url', petAdd);
				if (this.url === '')
					this.url = '/static/xixin/default.png'
				uni.showLoading({
					title: '正在提交信息，请耐心等待',
					mask: true,
				});
				console.log('personal data:', this.personal);
				if (this.personal.gender === null) {
					this.personal.gender = 0;
				}
				// 确保提交前数据已经处理
				let formdata = {
					nickname: this.personal.nickname,
					birth_date: this.personal.birth_date,
					gender: this.personal.gender,
					phone: this.personal.phone
				};
				console.log('formdata', formdata);
				let that = this
				console.log(' this.url', this.url)
				util.updataFile(petAdd, formdata, this.url, 'profile_url').then((uploadFileRes) => {
					console.log('uploadFileRes', uploadFileRes.data);
					uni.hideLoading();
					let data = JSON.parse(uploadFileRes.data);
					if (data.code === 200) {
						this.personal.birth_date=data.data.birth_date
						this.$refs.modal.show({
							title: '温馨提示',
							content: "保存成功",
							showCancel: true,
							confirmText: '确认',
							cancelText: '取消',
							showFooter: true,
							success: () => {
								console.log('用户点击了确认')
								that.returnParent()
							},
							fail: () => {
								console.log('用户点击了取消')
							}
						})

					} else {
						// 处理服务器返回的错误
						uni.showToast({
							title: data.message || '保存失败',
							icon: 'none',
							duration: 3000
						});
					}
				}).catch((err) => {
					uni.hideLoading();
					console.error('上传失败:', err);
					uni.showModal({
						title: '失败',
						content: err.toString(),
						showCancel: false,
					});
				});
			},

			// 添加实时验证方法，在输入时自动去除空格
			onNicknameInput(e) {
				this.personal.nickname = e.detail.value ? e.detail.value : '';
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";

	.form-contant::v-deep .uni-forms-item {
		margin-bottom: 0%;
	}

	.form-contant::v-deep .uni-forms-item--border {
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.input_view {}

	.input_view::v-deep .uni-date__x-input {
		text-align: end;
		width: 80px;
		font-size: 28rpx;
		color: rgb(153, 153, 153);
	}

	.input_view::v-deep .uni-date-x {
		flex-direction: row-reverse;
	}

	.input_view::v-deep .uni-date-x--border {
		border: none;
	}

	.input_view::v-deep .uni-easyinput {
		text-align: right;
	}

	.input_view::v-deep .uni-select {
		margin-left: 140rpx;
		width: 60%;
		border: none;
	}

	.gender-select ::v-deep .uni-icons {
		width: 50rpx;
		/* 原来的是行内样式权重比这个高 */
		font-size: 20px !important;

	}

	::v-deep .uni-forms-item {
		align-items: center;
	}

	.gender-select ::v-deep .uni-select {
		/* width: 200rpx;
		margin-left: 193rpx; */
		margin: 0%;
		padding: 0%;
		border: none;
		width: 100%;
		/* width: 200rpx; */
	}

	.gender-select ::v-deep .uni-select__input-text {
		text-align: right;
	}

	.uni-forms-item {
		margin-bottom: 10rpx;
	}

	/* 添加错误提示样式 */
	::v-deep .uni-forms-item__error {
		color: #e74c3c;
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	::v-deep .uni-error-message {
		color: #e74c3c;
		font-size: 24rpx;
	}
</style>