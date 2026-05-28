<template>
	<view class="main-container">
		<div class="nav_row">
			<view class="nav_icon_view" @click="returnParent">
				<uni-icons type="left" style="" size="20" width="100rpx" color="rgb(18, 18, 18)"></uni-icons>
			</view>
			<view style="display: flex;justify-content: center;width: 100%;">
				<text style="font-size: 50rpx;">种类选择</text>
			</view>
			<view style="width: 150rpx;"></view>
		</div>
		
		<!-- 整体内容区域使用flex布局 -->
		<view class="content-container">
			<!-- 搜索框 -->
			<view class="search-box">
				<uni-search-bar placeholder="搜索品种" v-model="searchText" 
					class="custom-search-bar" @confirm="handleSearch" cancelButton="none"></uni-search-bar>
			</view>
			
			<!-- 列表容器 -->
			<view class="list-container">
				<uni-indexed-list :options="listData" :show-select="true" @click="handleSelect" />
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getFirstLetter
	} from '/common/pinyin.js';
	export default {
		data() {
			return {
				searchText: '',
				allBreeds: [], // 全部品种原始数据
				listData: [], // 转换后的列表数据
				selectedId: null, // 当前选中的ID
				type: null ,// 保存宠物类型(1:狗, 其他:猫)
				listTop:0,
				searchHeight:0
			}
		},
		onLoad(opt) {
			// 获取服务器数据
			this.type = opt.category
			console.log('opt', opt)
			if (opt.category === "1") {
				this.allBreeds = getApp().globalData.dogBreedData;
			} else {
				this.allBreeds = getApp().globalData.catBreedData;
			}

			// 转换数据格式
			this.listData = this.transformData(this.allBreeds);
			console.log(' this.listData', this.listData)
			// 获取上一页已选ID
			const pages = getCurrentPages();
			const prevPage = pages[pages.length - 2];
			if (prevPage && prevPage.$vm.pet) {
				this.selectedId = prevPage.$vm.pet.breedId;
			}
			let screenHeight = uni.getSystemInfoSync().screenHeight
			this.searchHeight=screenHeight*0.03
			this.listTop=screenHeight*0.15
		},
		methods: {
			// 数据格式转换
			returnParent() {
				getApp().backParents();
			},
			transformData(data) {
				// 1. 按首字母分组
				const letterMap = {};

				data.forEach(item => {
					if (!item.description) return;

					const letter = this.getFirstLetter(item.description) || '#';
					if (!letterMap[letter]) {
						letterMap[letter] = [];
					}
					// 只保留description字符串
					letterMap[letter].push(item.description);
				});

				// 2. 转换为目标格式并排序
				const result = [];
				const sortedLetters = Object.keys(letterMap).sort();

				sortedLetters.forEach(letter => {
					result.push({
						letter: letter,
						data: letterMap[letter]
					});
				});

				return result;
			},

			// 获取首字母
			getFirstLetter(str) {
				return getFirstLetter(str);
			},

			// 处理选择
			handleSelect(e) {
				const selectedText = e.item.name; // 这里获取的是description字符串
				console.log('selectedText', e)
				// 需要找到对应的原始数据项
				const allData = this.allBreeds;
				const selectedItem = allData.find(item => item.description === selectedText);

				if (selectedItem) {
					// 返回上一页并传回选择的ID
					const pages = getCurrentPages();
					if (pages.length > 1) {
						const prevPage = pages[pages.length - 2];
						const idValue = this.type === "1" ?
							selectedItem.dbid :
							selectedItem.cbid;
						prevPage.$vm.pet.breedId = idValue;
						prevPage.$vm.pet.breed_name = selectedItem.description;
						uni.navigateBack();
					}
				}
			},

			// 搜索处理
			handleSearch() {
				if (!this.searchText) {
					this.listData = this.transformData(this.allBreeds);
					return;
				}

				const filtered = this.allBreeds.filter(item =>
					item.description.includes(this.searchText)
				);
				this.listData = this.transformData(filtered);
			}
		}
	}
</script>

<style>
	@import"/assets/css/seetings-row.css";
	
	.main-container {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}
	
	.content-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	
	/* 搜索框样式 */
	.search-box {
		padding: 10px;
		flex-shrink: 0; /* 防止搜索框被压缩 */
	}
	
	/* 列表容器 */
	.list-container {
		flex: 1;
		overflow: hidden;
		position: relative;
	}
	
	/* 确保列表填满容器 */
	.uni-indexed-list {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
	}
	
	.custom-search-bar {
		height: 3vh !important;
		min-height: 30px;
		
		/deep/ .uni-searchbar {
			height: 100%;
			padding: 0;
		}
		
		/deep/ .uni-searchbar__box {
			height: 100%;
			padding: 0 10px;
		}
		
		/deep/ .uni-searchbar__box-icon-search {
			height: 100%;
			display: flex;
			align-items: center;
		}
		
		/deep/ .uni-searchbar__box-search-input {
			height: 100%;
			line-height: normal;
			padding: 0;
		}
	}
</style>