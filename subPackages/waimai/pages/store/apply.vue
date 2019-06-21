<template>
	<view class="container">
		<view class="image">
			<text>店铺头像：</text>
			<avatar
				class="my-avatar"
				selWidth="300upx"
				selHeight="300upx"
				:avatarSrc="image"
				@upload="myUpload"
				quality="0.9"
				avatarStyle="width: 100upx; height: 100upx; border-radius: 0%;"
			></avatar>
		</view>
		<view class="name">
			<text>联系人：</text>
			<input placeholder="请填写店长姓名" v-model="linkman" placeholder-style="font-size: 24upx" auto-focus />
		</view>
		<view class="phone">
			<text>店铺名称：</text>
			<input placeholder="请填写店铺名称" v-model="name" placeholder-style="font-size: 24upx;" auto-focus />
		</view>
		<view class="address" @click="choiceAddress">
			<text class="l">店铺地址：</text>
			<view class="m">
				<i class="icon mt-location-o"></i>
				<text>{{ address }}</text>
			</view>
			<view class="r"><i class="icon mt-arrow-right-o"></i></view>
		</view>

		<view class="submit" @click="submit"><text>保存</text></view>
	</view>
</template>

<script>
import { applyStore } from '@/src/utils/api';
import avatar from '@/components/yq-avatar/yq-avatar.vue';
import { uploadUrl } from '@/config/env.js';
import { updateRestaurantStoreData } from '@/src/utils/api.js';

import util from '@/src/utils/util';
export default {
	data() {
		return {
			id: '',
			image: 'http://img.moyaomiao.cn/static/images/store_default_image.png',
			gander_1: 'icon mt-selected-o',
			gander_2: 'icon mt-unselected-o',
			gander: 1,
			name: '',
			image_hash:'',
			linkman: '',
			address: '点击选择',
			latitude: '',
			longitude: '',
			
		};
	},
	async onLoad(e) {
		let storage = uni.getStorageInfoSync();
		console.log('storage');
		console.log(uni.getStorageSync('token'));
	},
	components: {
		avatar
	},
	methods: {
		myUpload(path) {
			this.image = path;
			console.log(path);
			uni.uploadFile({
				url: uploadUrl, 
				filePath: path,
				name: 'file',
				formData: {},
				success: uploadFileRes => {
					let res = JSON.parse(uploadFileRes.data);
					if (res.errno == 0) {
						this.image_hash = res.data.hash
						console.log(this.image_hash);
					} else{
						this.$api.msg(res.message)
					}
				}
			});
		},
		changeGander(g) {
			this.gander = g;
			if (g == 1) {
				this.gander_1 = 'icon mt-selected-o';
				this.gander_2 = 'icon mt-unselected-o';
			} else {
				this.gander_1 = 'icon mt-unselected-o';
				this.gander_2 = 'icon mt-selected-o';
			}
		},
		choiceAddress() {
			var that = this;
			uni.chooseLocation({
				type: 'gcj02',
				success: function(res) {
					console.log(res);
					that.address = res.address;
					that.latitude = res.latitude;
					that.longitude = res.longitude;
				}
			});
		},
		async submit() {
			if (this.name == '') {
				util.showErrorToast('请输入姓名');
				return false;
			}
			if (this.phone == '') {
				util.showErrorToast('请输入手机号');
				return false;
			}
			if (this.address == '') {
				util.showErrorToast('请选择地址');
				return false;
			}
			if (this.image_hash ==''){
				util.showErrorToast('请设置店铺图片');
				return false;
			}
			
			const res = await applyStore({
				image:this.image_hash,
				name: this.name,
				gander: this.gander,
				linkman: this.linkman,
				address: this.address,
				latitude: this.latitude,
				longitude: this.longitude
			});
			if (res.errno === 0) {
				uni.switchTab({
					url:'/pages/store/index'
				})
			}else{
				util.showErrorToast(res.message);
				return false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/css/global.scss';
.container {
	background-color: white;
	.image {
		display: flex;
		align-items: center;
		margin-left: 30upx;
		padding-right: 30upx;
		height: 166upx;
		border-bottom: 2upx solid $spLine-color;
		text {
			font-size: 28upx;
			color: $textBlack-color;
			width: 160upx;
		}
		input {
			flex: 1;
		}
	}
	.name {
		display: flex;
		align-items: center;
		margin-left: 30upx;
		padding-right: 30upx;
		height: 88upx;
		border-bottom: 2upx solid $spLine-color;
		text {
			font-size: 28upx;
			color: $textBlack-color;
			width: 160upx;
		}
		input {
			flex: 1;
		}
	}
	.sex {
		display: flex;
		align-items: center;
		margin-left: 30upx;
		padding-right: 30upx;
		height: 88upx;
		border-bottom: 2upx solid $spLine-color;
		.l {
			width: 160upx;
		}
		.m {
			display: flex;
			i {
				font-size: 32upx;
				color: $theme-color;
			}
			text {
				font-size: 28upx;
				color: $textBlack-color;
				margin-left: 20upx;
			}
		}
		.r {
			display: flex;
			margin-left: 60upx;
			i {
				font-size: 38upx;
				color: $theme-color;
			}
			text {
				font-size: 28upx;
				color: $textBlack-color;
				margin-left: 20upx;
			}
		}
	}
	.phone {
		display: flex;
		align-items: center;
		margin-left: 30upx;
		padding-right: 30upx;
		height: 88upx;
		border-bottom: 2upx solid $spLine-color;
		text {
			font-size: 28upx;
			color: $textBlack-color;
			width: 160upx;
		}
		input {
			flex: 1;
		}
	}
	.address {
		display: flex;
		align-items: center;
		margin-left: 30upx;
		padding-right: 30upx;
		height: 88upx;
		border-bottom: 2upx solid $spLine-color;
		.l {
			font-size: 28upx;
			color: $textBlack-color;
			width: 160upx;
		}
		.m {
			display: flex;
			flex: 1;
			i {
				font-size: 38upx;
				color: $textGray-color;
			}
			text {
				font-size: 24upx;
				color: $textDarkGray-color;
				margin-left: 10upx;
				margin-top: 10upx;
			}
		}
		.r {
			i {
				font-size: 28upx;
				color: $textGray-color;
			}
		}
	}
	.house-num {
		display: flex;
		align-items: center;
		margin-left: 30upx;
		padding-right: 30upx;
		height: 88upx;
		border-bottom: 2upx solid $spLine-color;
		text {
			font-size: 28upx;
			color: $textBlack-color;
			width: 160upx;
		}
		input {
			flex: 1;
		}
	}
	.submit {
		margin: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 76upx;
		background-color: $theme-color;
		border-radius: 8upx;
		text {
			font-size: 28upx;
			color: $textBlack-color;
		}
	}
}
</style>
