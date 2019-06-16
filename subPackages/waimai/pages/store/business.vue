<template>
	<view class="content">
		
		<view class="row b-b">
			<text class="tit">门店公告</text>
			<input class="input" type="text" v-model="goods.name" placeholder="20字以内" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">门店简介</text>
			<input class="input" type="text" v-model="goods.description" placeholder="选填,300字以内" placeholder-class="placeholder" />
		</view>
		
		
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
// import { uploadUrl } from '@/config/env.js';
import {getRestaurantGoodsDetail} from '@/src/utils/api.js';
export default {
	data() {
		return {
			store:{}
		};
	},
	async onLoad(option) {
		
	},
	components: {
		robbyImageUpload
	},
	methods: {
		
		//提交
		confirm() {
			let data = this.addressData;
			if (!data.name) {
				this.$api.msg('请填写收货人姓名');
				return;
			}
			if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
				this.$api.msg('请输入正确的手机号码');
				return;
			}
			if (!data.address) {
				this.$api.msg('请在地图选择所在位置');
				return;
			}
			if (!data.area) {
				this.$api.msg('请填写门牌号信息');
				return;
			}

			//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
			this.$api.prePage().refreshList(data, this.manageType);
			this.$api.msg(`地址${this.manageType == 'edit' ? '修改' : '添加'}成功`);
			setTimeout(() => {
				uni.navigateBack();
			}, 800);
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-top: 16upx;
}

.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	height: 110upx;
	background: #fff;

	.tit {
		flex-shrink: 0;
		width: 160upx;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.input {
		flex: 1;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.icon-shouhuodizhi {
		font-size: 36upx;
		color: $font-color-light;
	}

	.row-picker {
		flex: 1;
		font-size: 30upx;
		color: $font-color-dark;
	}
}
.row-image {
	height: 200upx;
}
.default-row {
	margin-top: 16upx;
	.tit {
		flex: 1;
	}
	switch {
		transform: translateX(16upx) scale(0.9);
	}
}
.add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 80upx;
	margin: 60upx auto;
	font-size: $font-lg;
	color: #fff;
	background-color: $theme-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
