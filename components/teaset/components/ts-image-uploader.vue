<template>
	<view class="ts-uploader-wraper">
		<view class="ts-uploader">
			<view class="ts-uploader-head">
				<view class="ts-uploader-title">
					<slot>
						<text class="ts-h5">点击预览图片</text>
					</slot>
				</view>
				<view class="ts-uploader-info ts-h5">{{imageList.length}}/{{count}}</view>
			</view>
			<view class="ts-uploader-body">
				<view class="ts-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="ts-uploader__file">
							<image class="ts-uploader__img" :src="image" @tap="previewImage" @longpress="removeImage(image)"></image>
						</view>
					</block>
					<view class="ts-uploader__input-box">
						<view class="ts-uploader__input" @tap="chooseImg"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var self;
	export default {
		props: {
			count: {
				type: Number,
				default: 9
			}
		},
		data() {
			return {
				imageList: []
			};
		},
		methods: {
			chooseImg() {
				//选择图片
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: 'compressed',
					count: this.count - this.imageList.length,
					success: (res) => {
						// self.imageList = self.imageList.concat(res.tempFilePaths);
						//只添加不重复的文件
						if (this.imageList.length > 0) {
							for (let img of res.tempFilePaths) {
								let index = this.imageList.findIndex(item => item === img);
								if (index === -1) {
									this.imageList.push(img);
								}
							}
						} else {
							this.imageList = res.tempFilePaths;
						}

						// console.log(JSON.stringify(self.imageList))
						//触发所选择文件更改事件，参数为文件列表
						this.$emit('change', this.imageList);
					}
				});
			},
			removeImage(img) {
				uni.showModal({
					content: '确认删除选中的图片？',
					success: () => {
						const index = this.imageList.findIndex(item => item === img);
						this.imageList.splice(index, 1);
					}
				});
			},
			previewImage() {
				//预览图片
				uni.previewImage({
					urls: this.imageList
				});
			}
		}
	};
</script>

<style>
	.ts-uploader-wraper {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding: 22upx 20upx;
	}

	.ts-uploader {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.ts-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.ts-uploader-info {
		color: #b2b2b2;
	}

	.ts-uploader-body {
		margin-top: 16upx;
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.ts-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.ts-uploader__file {
		display: flex;
		flex-direction: row;
		margin-right: 18upx;
		margin-bottom: 18upx;
	}

	.ts-uploader__img {
		display: flex;
		flex-direction: row;
		width: 158upx;
		height: 158upx;
	}

	.ts-uploader__input-box {
		float: left;
		position: relative;
		margin-right: 18upx;
		margin-bottom: 18upx;
		width: 154upx;
		height: 154upx;
		border: 2upx solid #d9d9d9;
	}

	.ts-uploader__input-box:before,
	.ts-uploader__input-box:after {
		content: ' ';
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #d9d9d9;
	}

	.ts-uploader__input-box:before {
		width: 4upx;
		height: 79upx;
	}

	.ts-uploader__input-box:after {
		width: 79upx;
		height: 4upx;
	}

	.ts-uploader__input-box:active {
		border-color: #999999;
	}

	.ts-uploader__input-box:active:before,
	.ts-uploader__input-box:active:after {
		background-color: #999999;
	}

	.ts-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
