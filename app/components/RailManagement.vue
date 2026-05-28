<template>
	<cover-view v-if="visible" class="rail-management-container row_center" :style="containerStyle">
		<!-- 围栏列表 -->
		<cover-view v-if="!showNewRail" class="rail-list-container col_start">
			<cover-view class="rail-list-header">
				<view style="width: 30rpx; height: 50rpx;"></view>
				<text class="rail-list-title">电子围栏</text>
				<view class="close-button" @click="handleClose">
					<image src="/static/imgs/global/close.png" class="close-icon" />
				</view>
			</cover-view>

			<cover-view class="rail-list-content col_between">
				<view v-for="(rail, index) in polygons" :key="index" class="rail-item "
					:class="{ 'empty-rail': rail.points.length <= 0 }">
					<view v-if="rail.points.length > 0" class="rail-item-content row_start">
						<view class="rail-info" @click="handleRailClick(rail, index)">
							<image src="/static/imgs/locate/rail_home.png" class="rail-icon" />
							<text class="rail-name">{{ rail.name || `围栏${index + 1}` }}</text>
						</view>

						<view class="rail-actions">
							<image :src="rail.switch ? '/static/imgs/locate/on.png' : '/static/imgs/locate/off.png'"
								class="switch-icon" @click="handleSwitchRail(index)" />
							<image src="/static/imgs/locate/delete.png" class="delete-icon"
								@click="handleDeleteRail(index)" />
						</view>
					</view>

					<view v-else class="empty-rail-content row_start" @click="handleNewRailClick(index)">
						<image src="/static/imgs/locate/add.png" class="add-icon" />
						<text class="empty-rail-text">新建围栏</text>
					</view>
				</view>
			</cover-view>
		</cover-view>

		<!-- 新建围栏界面 -->
		<cover-view v-if="showNewRail" class="new-rail-container">
			<cover-view class="new-rail-header">
				<view style="width: 30rpx; height: 50rpx;"></view>
				<text class="new-rail-title">按顺序点击地图上位置形成围栏</text>
				<view class="close-button" @click="handleCancelRail">
					<image src="/static/imgs/global/close.png" class="close-icon" />
				</view>
			</cover-view>

			<cover-view class="new-rail-content">
				<!-- 引导图 -->
				<image src="/static/imgs/locate/railGuild.png" class="rail-guide-image" />

				<!-- 围栏名称输入 -->
				<view class="rail-name-input">
					<text class="input-label">围栏名称</text>
					<input type="text" v-model="currentRailName" maxlength="4" placeholder="请输入"
						placeholder-class="placeholder-text" class="name-input" @input="handleNameInput" />
				</view>

				<!-- 操作按钮 -->
				<view class="rail-action-buttons">
					<view class="action-button redraw-button" @click="handleRedrawRail">
						<text class="button-text">重绘</text>
					</view>
					<view class="action-button save-button" @click="handleSaveRail" :class="{ 'disabled': !canSave }">
						<text class="button-text">保存</text>
					</view>
				</view>
			</cover-view>
		</cover-view>
	</cover-view>
</template>

<script>
	export default {
		name: 'RailManagement',
		props: {
			// 是否显示
			visible: {
				type: Boolean,
				default: false
			},
			// 是否显示新建围栏界面
			showNewRail: {
				type: Boolean,
				default: false
			},
			// 围栏数据
			polygons: {
				type: Array,
				default: () => [],
				validator: (polygons) => {
					return polygons.every(polygon =>
						typeof polygon === 'object' &&
						Array.isArray(polygon.points) &&
						typeof polygon.name === 'string' &&
						typeof polygon.switch === 'boolean'
					);
				}
			},
			// 选中的围栏索引
			selectedIndex: {
				type: Number,
				default: 0
			},
			// 容器样式
			containerStyle: {
				type: Object,
				default: () => ({})
			},
			// 围栏名称（双向绑定）
			railName: {
				type: String,
				default: ''
			}
		},
		emits: [
			'close',
			'switch',
			'delete',
			'new-rail',
			'cancel',
			'redraw',
			'save',
			'update:railName'
		],
		data() {
			return {
				currentRailName: '',
				isSaving: false
			};
		},
		computed: {
			// 是否可以保存
			canSave() {
				return this.currentRailName.trim().length > 0 && !this.isSaving;
			},

			// 当前选中的围栏
			currentRail() {
				return this.polygons[this.selectedIndex] || {
					points: [],
					name: '',
					switch: false
				};
			}
		},
		watch: {
			railName: {
				immediate: true,
				handler(newVal) {
					this.currentRailName = newVal;
				}
			},

			showNewRail: {
				immediate: true,
				handler(newVal) {
					if (newVal) {
						// 进入新建模式时，初始化名称
						this.currentRailName = this.currentRail.name || '';
					}
				}
			}
		},
		methods: {
			// 关闭围栏管理
			handleClose() {
				this.$emit('close');
			},

			// 切换围栏开关
			handleSwitchRail(index) {
				this.$emit('switch', index);
			},

			// 删除围栏
			handleDeleteRail(index) {
				this.$emit('delete', index);
			},

			// 点击围栏
			handleRailClick(rail, index) {
				this.$emit('new-rail', {
					rail,
					index
				});
			},

			// 点击新建围栏
			handleNewRailClick(index) {
				this.$emit('new-rail', {
					rail: this.polygons[index],
					index
				});
			},

			// 取消新建围栏
			handleCancelRail() {
				this.$emit('cancel');
			},

			// 重绘围栏
			handleRedrawRail() {
				this.$emit('redraw');
			},

			// 保存围栏
			async handleSaveRail() {
				if (!this.canSave) {
					return;
				}

				this.isSaving = true;

				try {
					// 更新名称
					this.$emit('update:railName', this.currentRailName);

					// 触发保存事件
					await this.$emitAsync('save');

				} catch (error) {
					console.error('保存围栏失败:', error);
				} finally {
					this.isSaving = false;
				}
			},

			// 处理名称输入
			handleNameInput(event) {
				const value = event.detail.value;
				this.currentRailName = value;
				this.$emit('update:railName', value);
			},

			// 重置围栏名称
			resetRailName() {
				this.currentRailName = this.currentRail.name || '';
			},

			// 聚焦输入框
			focusInput() {
				// 在小程序中可能需要特殊处理
				// 这里可以添加聚焦逻辑
			}
		},

		// 暴露给父组件的方法
		expose: ['resetRailName', 'focusInput']
	};
</script>

<style scoped>
	.rail-management-container {
		position: absolute;
		z-index: 1000;
		width: 750rpx;
		position: relative;
	}

	/* 围栏列表样式 */
	.rail-list-container {
		z-index: 1;
		width: 400rpx;
		background-color: #FFFFFF;
		height: 350rpx;
		border-radius: 40rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
	}

	.rail-list-header {
		width: 360rpx;
		margin-top: 10rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-left: auto;
		margin-right: auto;
	}

	.rail-list-title {
		font-size: 28rpx;
		color: #333333;
		font-weight: 500;
	}

	.close-button {
		width: 50rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-icon {
		width: 20rpx;
		height: 20rpx;
	}

	.rail-list-content {
		width: 360rpx;
		height: 240rpx;
		padding-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		overflow-y: auto;
	}

	.rail-item {
		height: 52rpx;
		width: 360rpx;
		border: 1rpx solid rgba(222, 222, 222, 0.5);
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10rpx;
		transition: all 0.3s ease;
	}

	.rail-item:hover {
		border-color: #ff5733;
		box-shadow: 0 2rpx 8rpx rgba(255, 87, 51, 0.1);
	}

	.rail-item-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.rail-info {
		display: flex;
		align-items: center;
		width: 220rpx;
		cursor: pointer;
	}

	.rail-icon {
		width: 25rpx;
		height: 25rpx;
		margin-left: 20rpx;
	}

	.rail-name {
		margin-left: 25rpx;
		font-size: 25rpx;
		color: rgba(255, 87, 51, 1);
		max-width: 150rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.rail-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 140rpx;
		gap: 15rpx;
	}

	.switch-icon {
		width: 65rpx;
		height: 65rpx;
		margin-right: 25rpx;
		cursor: pointer;
	}

	.delete-icon {
		width: 35rpx;
		height: 35rpx;
		margin-right: 20rpx;
		cursor: pointer;
	}

	/* 空围栏样式 */
	.empty-rail {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start !;
		/* 使用 !important 确保生效 */
		padding: 0 20rpx;
		/* 统一内边距 */
	}

	.empty-rail-content {
		display: flex;
		justify-content: center;
		width: 220rpx;
	}

	.add-icon {
		width: 25rpx;
		height: 25rpx;
		margin-left: 20rpx;
	}

	.empty-rail-text {
		margin-left: 25rpx;
		font-size: 25rpx;
		color: rgba(166, 166, 166, 1);
	}

	/* 新建围栏样式 */
	.new-rail-container {
		z-index: 2;
		width: 400rpx;
		background-color: #FFFFFF;
		height: 450rpx;
		border-radius: 40rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
	}

	.new-rail-header {
		width: 360rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-left: auto;
		margin-right: auto;
	}

	.new-rail-title {
		font-size: 28rpx;
		color: rgba(255, 87, 51, 1);
		width: 200rpx;
		text-align: center;
		line-height: 1.4;
	}

	.new-rail-content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.rail-guide-image {
		width: 238rpx;
		height: 180rpx;
		margin-top: 10rpx;
	}

	.rail-name-input {
		margin-top: 20rpx;
		width: 300rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.5rpx solid rgba(229, 229, 229, 1);
		padding-bottom: 10rpx;
	}

	.input-label {
		color: rgba(56, 56, 56, 1);
		font-size: 28rpx;
		width: 180rpx;
	}

	.name-input {
		margin-left: 5rpx;
		font-size: 28rpx;
		height: 50rpx;
		text-align: right;
		width: 180rpx;
		color: #333333;
	}

	.placeholder-text {
		color: #cccccc;
	}

	.rail-action-buttons {
		width: 360rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		gap: 20rpx;
	}

	.action-button {
		width: 120rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.redraw-button {
		background-color: #ff5733;
		border: 1rpx solid #ff5733;
	}

	.save-button {
		background-color: #ff5733;
		border: 1rpx solid #ff5733;
	}

	.save-button.disabled {
		background-color: #cccccc;
		border-color: #cccccc;
		cursor: not-allowed;
		opacity: 0.6;
	}

	.button-text {
		color: #FFFFFF;
		font-size: 30rpx;
		font-weight: 500;
	}

	.save-button.disabled .button-text {
		color: #999999;
	}

	/* 动画效果 */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20rpx);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.rail-list-container,
	.new-rail-container {
		animation: fadeIn 0.3s ease-out;
	}

	/* 响应式适配 */
	@media (max-width: 375px) {
		.rail-list-container {
			width: 350rpx;
			height: 320rpx;
		}

		.new-rail-container {
			width: 350rpx;
			height: 420rpx;
		}

		.rail-list-header,
		.rail-list-content,
		.new-rail-header {
			width: 320rpx;
		}

		.rail-item {
			width: 320rpx;
		}

		.rail-name-input {
			width: 280rpx;
		}

		.rail-action-buttons {
			width: 320rpx;
		}
	}

	/* 滚动条样式 */
	.rail-list-content::-webkit-scrollbar {
		width: 4rpx;
	}

	.rail-list-content::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 2rpx;
	}

	.rail-list-content::-webkit-scrollbar-thumb {
		background: #cccccc;
		border-radius: 2rpx;
	}

	.rail-list-content::-webkit-scrollbar-thumb:hover {
		background: #aaaaaa;
	}
</style>