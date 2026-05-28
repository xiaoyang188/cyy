<template>
	<div class="main-container">
		<!-- <view v-if="isShowGuild===2&&fromHome===true" class="mask" style="z-index: 900;">
			<view @click="skipGuild" class="col_start" style="position:absolute;top: 120rpx;left:100rpx">
				<image src="/static/imgs/home/skip.svg" style="width: 70rpx;height: 70rpx;"></image>
				<text style="margin-top: 3rpx;color: #ffffff;font-size: 20rpx;">跳过引导</text>
			</view>
		</view> -->
		<div class="nav_row">
			<view class="row_center" style="width: 150rpx;height: 150rpx;" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;" v-if="fromHome===true">新建宠物</text>
				<text
					style="font-size: 50rpx;display: block;max-width: 400rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
					v-if="fromHome===false">{{pet.nickname}}</text>
			</view>
			<view style="width: 150rpx;">
				<uni-icons @click="deletePetNew" v-if="fromHome===false" type="trash" style="" size="24" width="100rpx"
					color="rgb(18, 18, 18)"></uni-icons>
			</view>
		</div>
		<!-- <ksp-cropper mode="fixed" :width="320" :height="300" :maxWidth="1024" :maxHeight="1024" :url="url"
			@cancel="oncancel" @ok="onok"></ksp-cropper> -->
		<view class="form-contant">
			<qf-image-cropper v-if="showCropper" :zIndex='1000' ref="QfImageCropper" :width="500" :height="500"
				:radius="250" @crop="handleCrop"></qf-image-cropper>
			<cach-image :style="{ zIndex: avatarIndex }" @click="choseavatar(1)" :url="pet.avatarUrl"
				:fileMd5="pet.avatarUrl" width="160rpx" height="160rpx" radius="50%"></cach-image>
			<text style="margin-top: 30rpx;margin-bottom: 30rpx;">头像</text>
			<div style="width: 80%;background-color:rgb(255,255,255);border-radius:40rpx;"
				:style="{ zIndex: avatarIndex }">
				<uni-forms ref="form" :modelValue="pet" :rules="rules" label-align="left" label-width="200rpx"
					:border="true">
					<uni-forms-item label="类型" name="category" style="padding-left: 8.5%;">
						<view class="input_view"
							style="margin-left: 25%;display: flex;align-items: center;margin-right: 8.5%;">
							<uni-data-select class="gender-select" :clear="false" placeholder="" v-model="pet.category"
								:localdata="petCategory"></uni-data-select>
						</view>
					</uni-forms-item>
					<uni-forms-item label="名字" name="nickname" style="padding-left: 8.5%;">
						<view class="input_view" style="margin-left: 25%;margin-right: 8.5%;"><uni-easyinput
								:inputBorder="false" :clearable="false" type="text" v-model="pet.nickname" maxlength="6"
								placeholder="请输入名字" /></view>

					</uni-forms-item>
					<uni-forms-item label="体重" name="weight" style="padding-left: 8.5%;">
						<view class="input_view" style="margin-left: 25%;margin-right: 8.5%;">
							<uni-easyinput :clearable="false" :inputBorder="false" type="digit" maxlength="3"
								v-model="pet.weight" placeholder="请输入体重KG">
							</uni-easyinput>

						</view>

					</uni-forms-item>
					<uni-forms-item label="肩高" name="height" style="padding-left: 8.5%;">
						<view class="input_view" style="margin-left: 25%;margin-right: 8.5%;"><uni-easyinput
								:inputBorder="false" :clearable="false" maxlength="3" type="digit" v-model="pet.height"
								placeholder="请输入肩高CM" /></view>
					</uni-forms-item>
					<uni-forms-item label="性别" name="gender" style="padding-left: 8.5%;">
						<view class="input_view"
							style="margin-left: 25%;display: flex;align-items: center;margin-right: 8.5%;">
							<uni-data-select class="gender-select" placeholder="" v-model="pet.gender"
								:localdata="petSex" :clear="false"></uni-data-select>
						</view>
					</uni-forms-item>
					<!-- 	<uni-forms-item label="品种" name="breed_id" style="padding-left: 8.5%;">
						<view class="input_view"
							style="margin-left: 25%;display: flex;align-items: center;margin-right: 8.5%;">
							<uni-data-select class="gender-select" placeholder="" v-model="pet.breed_id"
								:localdata="petBreed" :clear="false"></uni-data-select>
						</view>
					</uni-forms-item> -->
					<uni-forms-item label="品种" name="breedId" style="padding-left: 8.5%;">
						<view class="input_view"
							style="margin-left: 25%;display: flex;align-items: center;margin-right: 8.5%;">
							<view class="select-box" @tap="toBreedSelect">
								<text v-if="pet.breedId">{{getBreedName(pet.breedId)}}</text>
								<text v-else class="placeholder"></text>
								<uni-icons type="bottom" size="20" color="#999"></uni-icons>
							</view>
						</view>
					</uni-forms-item>
					<uni-forms-item label="出生日期" name="birthDate" style="padding-left:8.5%; width: 90%;">
						<view class="input_view"
							style="margin-left: 25%;margin-right: 8.5%;display: flex;align-items: center;justify-content: flex-end;min-height: 40rpx;width: 66.5%;"
							@click="showCalendar">
							<!-- <uni-datetime-picker
								type="date" :clear-icon="false" v-model="" /> -->
							{{pet.birthDate || '请选择'}}
						</view>
					</uni-forms-item>
				</uni-forms>
			</div>
			<div style="width: 80%;border-radius:40rpx;margin-top: 25rpx;margin-bottom: 25rpx;"
				:style="{ zIndex: avatarIndex}">
				<text style="color: rgba(255, 87, 51, 1);font-size: 24rpx;">*体重与肩高的数据对宠物日常健康数据有参考作用请务必准确填写</text>
			</div>
			<button style="width: 300rpx;border-radius: 40rpx;" :style="{ zIndex:  avatarIndex }"
				class="myButton"  @click="changefromNew(!fromHome)"><text
					style="color: rgb(255,255,255);">保存</text>
			</button>
			<!-- <button v-else class="myButton" style="width: 30%;width: 300rpx;" @click="changefromNew(true)"><text
					style="color: rgb(255,255,255);">保存</text> </button> -->
		</view>
		<custom-modal ref="modal" />
		<uni-calendar ref="calendar" :insert="false" :lunar="false" :range="false" :start-date="startDate"
			:end-date="endDate" @confirm="confirm" />
	</div>

</template>

<script>
	import util from '/common/util';
	import permissionUtil from '/common/permissionUtil.js';
	import {
		upload
	} from '/api/api/system.js'
	import {
		savePetInfo,
		removePet
	} from '/api/api/pet.js'
	export default {
		data() {
			return {
				avatarIndex:991,
				isSubmitting: false,
				submitTimer: null,
				startDate: "",
				endDate: "",
				showCropper: false,
				isShowGuild: 2,
				checkAvaOr3d: -1,
				url: '',
				noClick: true,
				fromHome: true,
				catIsSelected: false,
				dogIsSelected: false,
				imgUrlPre: '',
				videoSrc: '',
				initAvatar: [
					"../../static/xixin/cat.png",
					"../../static/xixin/dog.png"
				],
				fileArray: new Array(),
				petSex: [{
						value: 0,
						text: '公'
					},
					{
						value: 1,
						text: '母'
					}
				],
				petCategory: [{
						value: 0,
						text: '猫'
					},
					{
						value: 1,
						text: '狗'
					}
				],
				locateDogBreed: [{
						dbid: 1,
						description: "金毛犬",
						model2d_url: null,
						profile_url: null
					},
					{
						dbid: 2,
						description: "阿拉斯加犬",
						model2d_url: null,
						profile_url: null
					}
				],
				locateCatBreed: [{
						cbid: 1,
						description: "美国短毛猫",
						model2d_url: null,
						profile_url: null
					},
					{
						cbid: 2,
						description: "英国短毛猫",
						model2d_url: null,
						profile_url: null
					}
				],
				petBreed: [],
				onselect3dImage: null,
				onselect3dImageShow: null,
				pet: {
					category: '',
					breedId: '',
					nickname: '',
					birthDate: '',
					weight: '',
					gender: '',
					avatarUrl: '',
					height: '',
					profileUrl: '',
					pid: '',
					model3dImg: '',
				},
				rules: {
					// 对name字段进行必填验证
					nickname: {
						rules: [{
							required: true,
							errorMessage: '请输入姓名',
						}, ],
					},
					breedId: {
						rules: [{
								required: true,
								errorMessage: '请选择品种',
							},

						]
					},
					category: {
						rules: [{
								required: true,
								errorMessage: '请选择猫狗',
							},

						]
					},
					weight: {
						rules: [{
								required: true,
								errorMessage: '请填写体重',
							},

						]
					},
					height: {
						rules: [{
								required: true,
								errorMessage: '请填写肩高',
							},

						]
					},
					birthDate: {
						rules: [{
								required: true,
								errorMessage: '请选择生日',
							},

						]
					},
					gender: {
						rules: [{
								required: true,
								errorMessage: '请选择性别',
							},

						]
					},

				}
			}
		},
		watch: {
			// 监听 pet.category 的变化
			'pet.category'(newVal, oldVal) {
				this.onCategoryChange(newVal, oldVal);
			}
		},
		onShow() {
			if (this.pet.category === 1) {
				if (getApp().globalData.dogBreedData.length <= 0)
					getApp().globalData.dogBreedData = this.locateDogBreed
				this.petBreed = getApp().globalData.dogBreedData.map((item) => {
					return {
						value: item.dbid,
						text: item.description
					}
				});
			} else {
				if (getApp().globalData.catBreedData.length <= 0)
					getApp().globalData.catBreedData = this.locateCatBreed
				this.petBreed = getApp().globalData.catBreedData.map((item) => {
					return {
						value: item.cbid,
						text: item.description
					}
				});
			}
			console.log('this.isShowGuild',this.isShowGuild)
		},
		onLoad(options) {
			console.log('options', options)
			let date = new Date(Date.now())
			this.startDate = `1900-01-01`
			this.endDate =
				`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

			if (options.item != "") {
				var data = JSON.parse(options.item);
				//初始赋值breed-id狗
				console.log('item', data);
				// 第二步：解析内层字符串
				this.fromHome = false;
				this.pet = data;
				// this.pet.profile_url = ' ';
				// this.pet.avatar_url=getApp().globalData.internet + '/' +this.pet.avatar_url
				// this.pet.small_avatar_url=getApp().globalData.internet + '/' +this.pet.small_avatar_url
				// this.fileArray=new Array();
				// this.pet.model3d_url = ' ';
				if (this.pet.category === 0) {
					this.catIsSelected = true;
					this.dogIsSelected = false;
					// this.pet.breed_id=0;
				} else {
					this.dogIsSelected = true;
					this.catIsSelected = false;
					// this.pet.breed_id=1;
				}
				this.onselect3dImageShow = getApp().globalData.internet + '/' + this.pet.model3d_img
				this.onselect3dImage = this.pet.model3d_img
				console.log('this pet ', this.pet);
			}
			this.requestCatCategory()
			this.requestDogCategory()
			this.isShowGuild = uni.getStorageSync("isGuild")
			console.log('uni.getStorageSync("isGuild")',this.isShowGuild)
			if (this.isShowGuild === 1)
				this.isShowGuild = 2
			uni.setStorageSync('isGuild', this.isShowGuild)
		},
		methods: {
			showCalendar() {
				this.avatarIndex=2
				this.$refs.calendar.open();
			},
			confirm(event) {
				console.log(event)
				this.pet.birthDate = event.fulldate
			},
			// 跳转到品种选择页
			toBreedSelect() {
				if (this.pet.category === '') {
					this.$refs.modal.show({
						title: '温馨提示',
						content: '请先选择类型',
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
					return
				}
				uni.navigateTo({
					url: '/pages/add-pet/breedSelect/breedSelect?category=' + this.pet.category
				})
			},

			// 根据ID获取品种名称
			getBreedName(id) {
				console.log('this.petBreed', this.petBreed)
				const breed = this.petBreed.find(item => item.value === id);
				return breed ? breed.text : '';
			},
			skipGuild() {
				this.isShowGuild = 0
				uni.setStorageSync("isGuild", 0)
			},
			requestDogCategory() {
				var require_data = getApp().globalData.internet + getApp().globalData.dogBreed2;
				util.requestDataJsonGET(require_data, {}).then((res) => {
					console.log('res', res)
					if (res.code === 200) {
						getApp().globalData.dogBreedData = res.data.dog_breeds;
						this.locateDogBreed = res.data.dog_breeds
						var dogBreeds = JSON.stringify(res.data.dog_breeds);
						if (this.pet.category === 1) {
							this.petBreed = getApp().globalData.dogBreedData.map((item) => {
								return {
									value: item.dbid,
									text: item.description
								}
							});
						}
						uni.setStorage({
							key: 'dogBreed',
							data: dogBreeds,
							success: function() {
								console.log('dogBreeds数据缓存成功');
							}
						});
					}
				})
			},
			requestCatCategory() {
				var require_data = getApp().globalData.internet + getApp().globalData
					.catBreed2;
				util.requestDataJsonGET(require_data, {}).then((res) => {
					console.log('cat res', res)
					if (res.code === 200) {
						getApp().globalData.catBreedData = res.data.cat_breeds;
						this.locateCatBreed = res.data.cat_breeds
						var catBreeds = JSON.stringify(res.data.cat_breeds);
						if (this.pet.category !== 1) {
							this.petBreed = getApp().globalData.catBreedData.map((item) => {
								return {
									value: item.cbid,
									text: item.description
								}
							});
						}
						console.log('this.petBreedthis.petBreed', this.petBreed)
						uni.setStorage({
							key: 'catBreed',
							data: catBreeds,
							success: function() {
								console.log('catBreeds数据缓存成功');
							}
						});
					}
				})
			},
			onCategoryChange(newVal, oldVal) {
				this.catClick(newVal)
			},
			onok(ev) {
				this.url = "";
				if (this.checkAvaOr3d === 1) {
					var obj = {};
					obj.name = "avatarUrl";
					obj.uri = ev.path;
					this.pet.avatarUrl = ev.path;
					console.log('获取图片路径', this.pet.avatarUrl)
					this.fileArray.push(obj);
				} else {
					this.onselect3dImage = ev.path
				}
			},
			oncancel() {
				// url设置为空，隐藏控件
				this.url = "";
			},
			locateMotifyPet(motifyPet) {
				// 使用 Array.prototype.findIndex 找到要替换的宠物的索引
				const petIndex = getApp().globalData.allData.findIndex(pet => pet.pet_account.pid ===
					motifyPet.pid);
				const petindex2 = getApp().globalData.allPets.findIndex(pet => pet.pid ===
					motifyPet.pid);
				// 如果找到了匹配的索引，则替换 "pet_account" 对象
				if (petIndex !== -1) {
					getApp().globalData.allData[petIndex].pet_account = motifyPet;
					console.log('修改allData成功', getApp().globalData.allData[petIndex]);
				}
				if (petindex2 !== -1) {
					getApp().globalData.allPets[petIndex] = motifyPet;
					console.log('修改allPets成功', getApp().globalData.allData[petIndex]);
				}
			},
			localAddPet(newPet) {
				//getApp().globalData.showDeviceList
				//getApp().globalData.allData
				console.log('into add pet', newPet);
				var obj = newPet;
				var item = {
					pid: obj.pid,
					did_list: [],
					pet_account: obj
				}
				getApp().globalData.allData.push(item);
				getApp().globalData.allPets.push(obj);
				//更新缓存
				console.log('out add pet', getApp().globalData.allData)
			},
			locateRemovePet(pid) {
				getApp().globalData.allData.forEach((item, index) => {
					if (item.pet_account.pid === pid) {
						let devicelist = item.did_list;
						if (devicelist && devicelist.length > 0)
							uni.removeStorage({
								key: devicelist[0].serial_code + "页面缓存"
							})
					}
				})
				getApp().globalData.allData = getApp().globalData.allData.filter(((v) => v
					.pet_account.pid !== pid));
				getApp().globalData.allPets = getApp().globalData.allPets.filter(((v) => v
					.pid !== pid));
				getApp().globalData.presentPet = getApp().globalData.presentPet.filter(((v) => v
					.pid !== pid))
				if (getApp().globalData.presentPet.length <= 0)
					getApp().globalData.presentPet = getApp().globalData.allPets.slice(0, 1);
				//宠物有绑定设备缓存也去掉
			},
			modifyPet(para, opt) {
				savePetInfo(para).then(recivedata => {
					if (opt)
						uni.showToast({
							title: '修改成功',
						})
					else
						uni.showToast({
							title: '添加成功',
						})
					//请求宠物列表更新本地宠物列表
					util.requestPetList()
					setTimeout(function() {
						this.isSubmitting = false;
						if (this.submitTimer) {
							clearTimeout(this.submitTimer);
							this.submitTimer = null;
						}
						getApp().backParents();
					}, 1000);
				}).catch(err=>{
					this.isSubmitting = false;
					if (this.submitTimer) {
						clearTimeout(this.submitTimer);
						this.submitTimer = null;
					}
				})
			},

			changefromNew(opt) {
				// 防抖检查
				if (this.isSubmitting) {
					uni.showToast({
						title: '正在提交，请稍候',
						icon: 'none'
					});
					return;
				}
				this.isSubmitting = true;
				// 清除之前的定时器
				if (this.submitTimer) {
					clearTimeout(this.submitTimer);
				}
				// 设置防抖定时器
				this.submitTimer = setTimeout(() => {
					// 统一的状态重置函数
					const resetState = () => {
						this.isSubmitting = false;
						if (this.submitTimer) {
							clearTimeout(this.submitTimer);
							this.submitTimer = null;
						}
					};
					
					// 统一错误处理
					const handleError = (err) => {
						console.error('解绑失败', err);
						resetState();
					};
					this.$refs.form.validate().then(res => {
						uni.showLoading({
							title: '正在提交信息，请耐心等待',
							mask: true,
						})
						let para = {
							birthDate: this.pet.birthDate,
							breedId: this.pet.breedId,
							category: this.pet.category,
							gender: this.pet.gender,
							height: this.pet.height,
							nickname: this.pet.nickname,
							weight: this.pet.weight
						}
						if (opt)
							para.pid = this.pet.pid
						if (this.fileArray.length != 0) {
							let uploadpara = {
								filePath: this.pet.avatarUrl,
								pathPrefix: 'static/pet/avatar/'
							}
							upload(uploadpara).then(recive => {
								const fileData = util.handleUploadResponse(recive);
								console.log('最终得到的文件数据:', fileData);
								// const fileUrl = parsedData.data.fileKey;
								para.avatarUrl = fileData.fileKey
								this.modifyPet(para, opt)
							}).catch(err => {
								resetState();
								console.log('upload err', err)
							})
							//把头像缓存清掉
						} else {
							this.modifyPet(para, opt)
						}
						let key1=this.pet.pid+'peticon'
						let key2=this.pet.pid+'bell'
						let key3=this.pet.pid+'light'
						let key4=this.pet.pid+'belllight'
						uni.removeStorageSync(key1)
						uni.removeStorageSync(key2)
						uni.removeStorageSync(key3)
						uni.removeStorageSync(key4)
						uni.hideLoading()
					}).catch(err=>{
						uni.hideLoading()
						resetState();
					})
				}, 500);
			},
			deletePetNew() {
				let that = this
				uni.showModal({
					title: '删除宠物',
					content: '确认删除当前宠物',
					success: function(res) {
						if(res.confirm){
							removePet(that.pet.pid).then(recivedata => {
								uni.showToast({
									title: '删除成功'
								})
								//请求宠物列表更新本地宠物列表
								util.requestPetList()
								getApp().globalData.presentPet = getApp().globalData.presentPet.filter(((
										v) => v
									.pid !== that.pet.pid))
								setTimeout(function() {
									that.returnParent();
								}, 2000);
							})
						}
					}
				});
			},
			
			returnParent() {
				getApp().backParents();
			},
			handleCrop(e) {
				
				var obj = {};
				obj.name = "avatarUrl";
				obj.uri = e.tempFilePath;
				this.pet.avatarUrl = e.tempFilePath;
				console.log('获取图片路径', this.pet.avatarUrl)
				this.fileArray.push(obj);
				this.showCropper = false
			},
			choseavatar(opt) {
				this.showCropper = true
			},
			submit3D(pid) {
				let that = this
				if (this.onselect3dImage != null && this.onselect3dImage != this.pet.model3d_img) {
					let url = getApp().globalData.internet + '/pet/gen_model'
					uni.uploadFile({
						url: url, //仅为示例，非真实的接口地址
						filePath: this.onselect3dImage,
						name: 'img',
						formData: {
							pid: pid
						},
						header: {
							'Content-Type': 'multipart/form-data'
						},
						success: (uploadFileRes) => {
							console.log('提交3d模型制做图片成功', uploadFileRes
								.data);
						},
						fail: (err) => {
							console.log('提交3d模型制做图片失败', err)
						}
					});
				} else {
					console.log('3d生成的图片路径为空')
				}
			},
			catClick(input) {
				if (input === 0) { //猫
					this.catIsSelected = true;
					this.dogIsSelected = false;
					this.pet.category = 0;
					this.petBreed = getApp().globalData.catBreedData.map((item) => {
						return {
							value: item.cbid,
							text: item.description
						}
					});

				} else { //狗
					this.dogIsSelected = true;
					this.catIsSelected = false;
					this.pet.category = 1;
					this.petBreed = getApp().globalData.dogBreedData.map((item) => {
						return {
							value: item.dbid,
							text: item.description
						}
					});
				}

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

	.select-box {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: end;
		padding: 10px 0;
	}

	.placeholder {
		color: #999;
	}

	.gender-select ::v-deep .uni-select__input-text {
		text-align: right;
	}

	.uni-forms-item {
		margin-bottom: 10rpx;
	}
	
</style>