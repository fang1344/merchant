<template>
	<view class="content">
		<view class="row b-b row-image">
			<text class="tit">商品图片</text>
			<robby-image-upload
				:server-url="uploadUrl"
				:form-data="imageAttach"
				:fileKeyName="uploadName"
				v-model="goods.images_url"
				@delete="deleteImage"
				@add="add"
				:enable-drag="enableDrag"
				:enable-del="enableDel"
				:enable-add="enableAdd"
				:limit="limitNumber"
			></robby-image-upload>
		</view>
		<view class="row b-b">
			<text class="tit">商品名称</text>
			<input class="input" type="text" v-model="goods.name" placeholder="20字以内" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所属分类</text>
			<picker class="picker" mode="selector" :range="categoryList" :range-key="categoryKey" @change="catagoryChange">
				<view>
					<span class="row-picker">{{ categoryName }}</span>
				</view>
			</picker>
		</view>
		<view class="row b-b">
			<text class="tit">价格</text>
			<input class="input" type="text" v-model="goods.sale_price" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		<view class="row b-b" v-if="this.goods.reserve_enabled==1">
			<text class="tit">预订价格</text>
			<input class="input" type="text" v-model="goods.reserve_price" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">餐盒费</text>
			<input class="input" type="text" v-model="goods.meal_box_fee" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">库存</text>
			<input class="input" type="text" v-model="goods.stock" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		
		<view class="row desc-row">
			<text class="tit">商品描述</text>
			<textarea v-model="goods.description" placeholder="选填,300字以内" placeholder-class="placeholder" />
		</view>
		
		<view class="row default-row">
			<text class="tit">上下架</text>
			<switch :checked="putaway" color="#288bf5" @change="switchChange" />
		</view>
		<view class="row default-row">
			<text class="tit">是否可预订</text>
			<switch :checked="reserve_enabled" color="#288bf5" @change="reserveChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<button class="delete-btn" v-if="type=='edit'" @click="deleteGoods">删除</button>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
// import { uploadUrl } from '@/config/env.js';
import {getRestaurantGoodsDetail,getRestaurantCategoryList,saveRestaurantGoods,deleteRestaurantGoods} from '@/src/utils/api.js';
export default {
	data() {
		return {
			uploadUrl: 'http://serv.moyaomiao.cn/common/upload',
			imageAttach:  {},
			uploadName: 'file',
			enableDrag: true,
			enableDel: true,
			enableAdd: true,
			limitNumber: 5,
			categoryName: '请选择',
			categoryList: [],
			categoryKey: 'name',
			type:'add',
			goods: { 
				images: [],
				images_url: [],
				category_id: '',
				name: '',
				reserve_enabled: 0,
				description:''
			},
		};
	},
	async onLoad(option) {
		if(option.category_id){
			this.goods.category_id = option.category_id;
		}
		var title = '新增商品';
		if (option.type === 'edit') {
			title = '编辑商品';
			this.type = option.type;
			if(option.id){
				let res = await getRestaurantGoodsDetail({id:option.id});
				this.goods = res.data;
			}
		}
		let category = await getRestaurantCategoryList()
		this.categoryList = category.data;
		this.categoryList.map(item=>{
			if(item.id=this.goods.category_id){
				this.categoryName = item.name;
			}
		})
		this.manageType = option.type;
		uni.setNavigationBarTitle({
			title
		});
	},
	computed:{
		putaway:{
			get(){
				return this.goods.state==1 ? true : false;
			},
			set(){
				
			}
		},
		reserve_enabled:{
			get(){
				return this.goods.reserve_enabled==1 ? true : false;
			},
			set(){
				
			}
		}
		
		
	},
	components: {
		robbyImageUpload
	},
	methods: {
		switchChange(e) {
			if(e.detail.value==false){
				this.goods.state = 2
			}else{
				this.goods.state = 1; 
			}
		},
		reserveChange(e){
			if(e.detail.value==false){
				this.goods.reserve_enabled = 0
			}else{
				this.goods.reserve_enabled = 1; 
			}
		},
		deleteImage(e) {
			this.goods.images.splice(e.index,1);
			console.log(this.goods);
		},
		add(e) {
			console.log('add',e);
			this.goods.images.push(e.result[0].data.hash)
			console.log(this.goods.images);
		},
		
		catagoryChange(item) {
			this.categoryName = this.categoryList[item.detail.value].name;
			this.goods.category_id = this.categoryList[item.detail.value].id;
		},
		//提交
		async confirm() {
			let res = await saveRestaurantGoods(this.goods);
			this.$api.msg(res.message);
			if(res.errno==0){
				setTimeout(() => {
					uni.navigateBack();
				}, 800);
			}		
		},
		async deleteGoods(){
			let res = await deleteRestaurantGoods({id:this.goods.id});
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
@import '@/static/style/mixin.scss';
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
		font-size: 28upx;
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
		font-size: 28upx;
		color: $font-color-base;
	}
	textarea{
		font-size: 28upx;
		color: $font-color-base;
	}
	
	switch{
		transform:scale(0.8)
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
	switch{
		transform:scale(0.8)
	}
}
.desc-row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	background: #fff;
	height: 200upx; 
	textarea{
		height: 120upx;
	}
}
.add-btn {
	@include btn();
}
.delete-btn {
	@include btn();
	background-color: $mtRed-color;
}
</style>
