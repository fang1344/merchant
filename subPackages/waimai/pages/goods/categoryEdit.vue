<template>
	<view class="content">
		<view class="row b-b row-image">
			<text class="tit">商品图片</text>
			<robby-image-upload
				:server-url="uploadUrl"
				:form-data="imageName"
				:fileKeyName="uploadName"
				v-model="goods.images"
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
			<switch :checked="putaway" color="#fa436a" @change="switchChange" />
		</view>
		<view class="row default-row">
			<text class="tit">是否可预订</text>
			<switch :checked="reserve_enabled" color="#fa436a" @change="reserveChange" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue';
// import { uploadUrl } from '@/config/env.js';
import {getRestaurantGoodsDetail,getRestaurantCategoryList} from '@/src/utils/api.js';
export default {
	data() {
		return {
			uploadUrl: 'http://serv.moyaomiao.cn/common/upload',
			imageName:  {
                    userId: 2
                },
			uploadName: 'file',
			enableDrag: true,
			enableDel: true,
			enableAdd: true,
			limitNumber: 5,
			categoryName: '请选择',
			categoryList: [{ id: 1, name: '分类1' }, { id: 2, name: '分类2' }],
			categoryKey: 'name',
			addressData: {
				name: '',
				mobile: '',
				addressName: '在地图选择',
				address: '',
				area: '',
				default: false
			},
			goods: { images: [] }
		};
	},
	async onLoad(option) {
		let title = '新增商品';
		if (option.type === 'edit') {
			title = '编辑商品';
			if(option.id){
				let res = await getRestaurantGoodsDetail({id:option.id});
				this.goods = res.data;
				console.log(this.goods);
				let category = await getRestaurantCategoryList({store_id:this.goods.store_id})
				this.categoryList = category.data;
				this.categoryList.map(item=>{
					if(item.id=this.goods.category_id){
						this.categoryName = item.name;
					}
				})
			}
		}
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
		deleteImage(e) {},
		add(e) {
			this.goods.images = e;
		},
		
		catagoryChange(item) {
			this.categoryName = this.categoryList[item.detail.value].name;
		},
		//提交
		confirm() {
			let data = this.addressData;
			if (!data.name) {
				this.$api.msg('请填写收货人姓名');
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
