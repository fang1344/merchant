<template>
	<view class="content">
		<view class="row b-b row-image">
			<text class="tit">门店头像</text>
			<avatar
				class="my-avatar"
				selWidth="300upx"
				selHeight="300upx"
				:avatarSrc="form.pic_url"
				@upload="myUpload"
				quality="0.9"
				avatarStyle="width: 100upx; height: 100upx; border-radius: 0%;"
			></avatar>
			<!-- <robby-image-upload
				:server-url="uploadUrl"
				:form-data="imageName"
				:uploadName="uploadName"
				v-model="storeData.image"
				@delete="deleteImage"
				@add="addImage"
				:enable-drag="enableDrag"
				:enable-del="false"
				:enable-add="false"
				:limit="limitNumber"
			></robby-image-upload> -->
		</view>
		<view class="row b-b">
			<text class="tit">门店名称</text>
			<input class="input" type="text" v-model="form.name" placeholder="20字以内" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">门店ID</text>
			<input class="input" type="text" v-model="form.id" disabled="disabled" placeholder-class="placeholder" />
		</view>

		<view class="row b-b">
			<text class="tit">订单电话</text>
			<input class="input" type="text" v-model="form.phone" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">门店公告</text>
			<input class="input" type="text" v-model="form.notice" placeholder="20字以内" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">门店地址</text>
			<input class="input" type="text" v-model="form.address" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		<view class="row-kind b-b">
			<text class="tit">经营种类</text>
			<checkbox-group @change="checkboxChange">
				<block v-for="(item, index) in kindList" :key="item.id">
					<label :class="item.checked ? 'checkbox selectBox' : 'checkbox '" @click="labelBtn(item.id, index)">
						<checkbox :value="item.id" :checked="item.checked" v-show="false" />
						{{ item.name }}
					</label>
					<br v-if="(index + 1) % 4 == 0" />
				</block>
			</checkbox-group>
		</view>
		<view class="row-kind b-b">
			<text class="tit">门店简介</text>
			<textarea v-model="form.description" placeholder="300字以内" maxlength="300"></textarea>
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
import avatar from '@/components/yq-avatar/yq-avatar.vue';

import { uploadUrl } from '@/config/env.js';
import { getRestaurantStoreDetail, updateRestaurantStoreData, getRestaurantKind } from '@/src/utils/api.js';
export default {
	data() {
		return {
			storeData: {},
			uploadUrl: uploadUrl,
			imageName: {
				userId: 2
			},
			uploadName: 'file',
			enableDrag: true,
			enableDel: true,
			enableAdd: true,
			limitNumber: 5,
			categoryName: '请选择',
			labalDataList: '',
			kindList: [],
			categoryKey: 'name',
			form: {
				id: '',
				image: '',
				name: '',
				phone: '',
				kind_ids: '',
				address: '',
				notice:'',
				description:'',
				pic_url:''
			}
		};
	},
	async onLoad(option) {
		let res = await getRestaurantStoreDetail();
		this.form = {
			id: res.data.id,
			image: res.data.image,
			pic_url: res.data.pic_url,
			name: res.data.name,
			phone: res.data.phone,
			kind_ids: res.data.kind_ids,
			address: res.data.address,
			notice: res.data.notice,
			description: res.data.description
		};
		let kind = await getRestaurantKind();
		console.log('kind_ids',res.data.kind_ids);
		
		kind.data.map(item => {
			if (res.data.kind_ids!=null&&res.data.kind_ids.indexOf(item.id) > -1) {
				item.checked = true;
			}else{
				item.checked = false;
			}
			item.id = item.id.toString();
		});
	
		this.kindList = kind.data;
	},
	components: {
		robbyImageUpload,
		avatar
	},
	methods: {
		labelBtn(name, index) {
			console.log(name, index, 'nameindex');
			this.labelName = name;
			if (this.form.kind_ids.join(',').indexOf(name) > -1) {
				this.kindList[index].checked = true;
			} else {
				this.kindList[index].checked = false;
			}
		},
		checkboxChange: function(e) {
			this.form.kind_ids = e.detail.value;
			console.log(e);
			console.log('checkbox发生change事件，携带value值为：' + e.detail.value);
			console.log(this.form.kind_ids, 'labelDataList');
		},
		myUpload(path) {
			
			uni.uploadFile({
				url: uploadUrl, 
				filePath: path,
				name: 'file',
				formData: {
				},
				success: uploadFileRes => {
					let res = JSON.parse(uploadFileRes.data);
					this.form.pic_url = res.data.url,
					this.form.image = res.data.hash
				}
			});
		},

		switchChange(e) {
			this.addressData.default = e.detail;
		},
		deleteImage(e) {},
		addImage(e) {
			console.log(e);
		},
		//提交
		async confirm() {
			if (!this.form.name) {
				this.$api.msg('请填写名称');
				return;
			}
			if (!/(^1[3|4|5|6|7|8][0-9]{9}$)/.test(this.form.phone)) {
				this.$api.msg('请输入正确的手机号码');
				return;
			}
			if (!this.form.address) {
				this.$api.msg('请填写地址');
				return;
			}
			let res = await updateRestaurantStoreData(this.form);
			if (res.errno == 0) {
				//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				this.$api.msg(res.message);
				setTimeout(() => {
					uni.navigateBack();
				}, 800);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../../../static/style/mixin';
page {
	background: $page-color-base;
}
.row-kind {
	display: flex;
	align-items: center;
	position: relative;
	padding: 14px 4px 14px 14px;
	background: $font-color-white;

	.tit {
		flex-shrink: 0;
		width: 160upx;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.selectBox {
		background: $theme-color !important;
		color: #fff !important;
	}
	.checkbox {
		padding: 0 10upx;
		border: 1px solid $theme-color;
		margin: 10upx;
		border-radius: 7upx;
		color:$font-color-base;
		font-size: 24upx;
		word-wrap: break-word; //只对英文起作用，以单词作为换行依据。
		word-break: keep-all;
	}
	textarea{
		margin: 20upx 0upx;
		height: 200upx;
		color: $font-color-base;
	}
}
.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	height: 110upx;
	background: $font-color-white;

	.tit {
		flex-shrink: 0;
		width: 160upx;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.input {
		flex: 1;
		font-size: 28upx;
		color: $font-color-base;
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
	@include btn();
}
</style>
