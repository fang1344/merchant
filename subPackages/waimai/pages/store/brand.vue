<template>
	<view class="container">
		<view class="image">
			<text>品牌头像：</text>
			<avatar
				class="my-avatar"
				selWidth="300upx"
				selHeight="300upx"
				:avatarSrc="brand.app_list_pic_url_display"
				@upload="listUpload"
				quality="0.9"
				avatarStyle="width: 100upx; height: 100upx; border-radius: 0%;"
			></avatar>
		</view>
		<view class="image">
			<text>宣传图片：</text>
			<avatar
				class="my-avatar"
				selWidth="720upx"
				selHeight="400upx"
				:avatarSrc="brand.pic_url_display"
				@upload="descUpload"
				quality="0.9"
				avatarStyle="width: 200upx; height: 100upx; border-radius: 0%;"
			></avatar>
		</view>
		<view class="description">
			<text>品牌介绍：</text>
			<textarea class="desc-text" v-model="brand.simple_desc" placeholder="请填写品牌介绍相关信息"/>
		</view>
		<view class="submit" @click="submit"><text>保存</text></view>
	</view>
</template>

<script>
import avatar from '@/components/yq-avatar/yq-avatar.vue';
import { uploadUrl } from '@/config/env.js';
import {getSelfBrandDetail, saveBrand } from '@/src/utils/api.js';

import util from '@/src/utils/util';
export default {
	data() {
		return {
			id: '',
			brand: {
				app_list_pic_url_display: 'http://img.moyaomiao.cn/static/images/image_upload_default.png',
				list_pic: '',
				pic_url_display: 'http://img.moyaomiao.cn/static/images/image_upload_default.png',
				pic_url: '',
				simple_desc:''
			}
		};
	},
	components: {
		avatar
	},
	async mounted(){
		let res = await getSelfBrandDetail();
		console.log(Object.keys(res.data));
		if(res.errno==0&&Object.keys(res.data).length>0){
			console.log('121212');
			this.brand = res.data;
		}
	},
	methods: {
		listUpload(path) {
			var formData = {
				attach: 'list'
			}
			this.upload(path,formData)
		},
		descUpload(path){
			var formData = {
				attach: 'desc'
			}
			this.upload(path,formData)
		},
		upload(path,formData){
			uni.uploadFile({
				url: uploadUrl, 
				filePath: path,
				name: 'file',
				formData: formData,
				success: uploadFileRes => {
					let res = JSON.parse(uploadFileRes.data);
					if (res.errno == 0) {
						console.log(res);
						if(res.data.attach=='list'){
							this.brand.app_list_pic_url = res.data.hash;
							this.brand.app_list_pic_url_display = res.data.url;
						}else if(res.data.attach=='desc'){
							this.brand.pic_url = res.data.hash;
							this.brand.pic_url_display = res.data.url;
						}
					} else{
						this.$api.msg(res.message)
					}
				}
			});
		},
		
		async submit() {
			if (this.brand.app_list_pic_url == '') {
				util.showErrorToast('请上传品牌头像');
				return false;
			}
			if (this.brand.pic_url == '') {
				util.showErrorToast('请上传宣传图片');
				return false;
			}
			if (this.brand.simple_desc == '') {
				util.showErrorToast('请先写品牌介绍');
				return false;
			}
			
			const res = await saveBrand({
				pic_url:this.brand.pic_url,
				app_list_pic_url: this.brand.app_list_pic_url,
				simple_desc: this.brand.simple_desc,
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
	.description{
		margin-left: 30upx;
		font-size: 28upx;
		color: $textBlack-color;
		border-bottom: 2upx solid $spLine-color;
		.desc-text{
			font-size: 28upx;
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
			color: #ffffff;
		}
	}
}
</style>
