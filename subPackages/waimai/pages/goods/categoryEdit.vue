<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">分类名称</text>
			<input class="input" type="text" v-model="category.name" placeholder="5字以内" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
// import { uploadUrl } from '@/config/env.js';
import {getRestaurantCategoryDetail,saveRestaurantCategory} from '@/src/utils/api.js';
export default {
	data() {
		return {
			category:{
				id:'',
				name:''
			}
		};
	},
	async onLoad(option) {
		let title = '新增分类';
		if (option.id) {
			title = '编辑分类';
			let res = await getRestaurantCategoryDetail({id:option.id});
			if(res.errno==0){
				this.category = res.data
			}
				
		}
		uni.setNavigationBarTitle({
			title
		});
	},
	computed:{
	},
	components: {
		robbyImageUpload
	},
	methods: {
		//提交
		async confirm() {
			if (!this.category.name) {
				this.$api.msg('请填写分类名称');
				return;
			}
			let res = await saveRestaurantCategory(this.category);
			this.$api.msg(res.message);
			if(res.errno==0){
				setTimeout(() => {
					uni.navigateBack();
				}, 800);
			}
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
	height: auto;
	padding-right: 0;
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
.desc-row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	background: #fff;
	height: 200upx; 
	.tit {
		flex: 1;
	}
	textarea{
		height: 120upx;
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
