<template>
	<view class="container">
		<view class="title"><text>商品属性</text></view>
		<view class="attr" v-for="(item, index) in AttrList" :key="index" v-show= "AttrList.length">
			<view class="attr-name" >
				<view class="content">
					<text>属性名</text>
					<input type="text" v-model="item.name" placeholder="填写属性名,如:辣度" />						
				</view>
				<view class="operation">
					<i class="add-second" @click="addSecondAttr(index)"></i>						
					<i class="delete" @click="deleteAttr(index)"></i>
				</view>
			</view>
			<view class="attr-name" style="margin-left: 30upx;" v-for="(item2,index2) in item.values" :key="index2">
				<view class="content" >
					<text>属性值</text>
					<input type="text" v-model="item2.value" placeholder="填写属性值,如:微辣" />	
				</view>
				<view class="operation">
					<i class="delete" @click="deleteSecondAttr(index,index2)"></i>
				</view>
			</view>
		</view>
		<view class="add-attr" @click="addAttr">+添加属性</view>
		

		<button class="submit" @click="comfirm">提交</button>
	</view>
</template>
<script>
import { mapState } from 'vuex';
import { updateRestaurantGoodsAttrs, getRestaurantGoodsDetail } from '@/src/utils/api.js';
export default {
	data() {
		return {
			id: '',
			AttrList: [
				
			]
		};
	},
	onLoad(option) {
		this.id = option.id
	},
	async mounted() {
		let res = await getRestaurantGoodsDetail({id:this.id});
		this.AttrList = res.data.attrs_arr;
	},
	computed: {
		shareChecked:{
			get(){
				return this.share==1 ? true : false;
			},
			set(e){
				return e;
			}
		},
		statusChecked:{
			get(){
				return this.status==1 ? true : false;
			},
			set(e){
				return e;
			}
		},
	},
	methods: {
		shareChange(e){
			this.shareChecked = e.detail.value;
			if(e.detail.value==true){
				this.share = 1
			}else{
				this.share = 0;
			}
		},
		statusChange(e){
			this.statusChecked = e.detail.value;
			if(e.detail.value==true){
				this.status = 1
			}else{
				this.status = 0;
			}
		},
		addAttr() {
			this.AttrList.push({
				name: '',
				values: [
					{
						value: ''
					},
					{
						value: ''
					},
					{
						value: ''
					}
				]
			});
		},
		addSecondAttr(index) {
			console.log(this.AttrList[index])
			this.AttrList[index].values.push({value:''})
		},
		deleteAttr(index) {
			this.AttrList.splice(index, 1);
		},
		deleteSecondAttr(index,index2){
			this.AttrList[index].values.splice(index2,1)
		},
		async comfirm() {
			let res = await updateRestaurantGoodsAttrs({
				attrs: JSON.stringify(this.AttrList),
				id: this.id
			})
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
@import '../../../../static/style/mixin';
page {
	background: #f0f0f0;
}
.title {
	font-size: $font-lg;
	color: $font-color-dark;
	margin: 20upx 30upx;
}
.attr {
	padding: 20upx;
	background: $font-color-white;
	margin-bottom: 20upx;
}
.attr-name {
	display: flex;
	flex-direction: row;
	font-size: $font-me-lg;
	border-bottom: 1upx solid #f0f0f0;
	align-items: center;
	justify-content: space-between;
	padding: 20upx 0;
	.content{
		display: flex;
		flex-direction: row;
		font-size: $font-me-lg;
		border-bottom: 1upx solid #f0f0f0;
		align-items: center;
		input {
			width: 300upx;
			margin: 0 20upx;
			background: #f0f0f0;
		}	
	}
	.operation{
		display: flex;
		flex-direction: row;
		font-size: $font-me-lg;
		border-bottom: 1upx solid #f0f0f0;
		align-items: center;
		width: 100upx;
		height: 50upx;
		.delete {
			width: 32upx;
			height: 32upx;
			background-image: url('http://img.moyaomiao.cn/static/images/delete.png');
			background-size: 32upx 32upx;
			background-repeat: no-repeat;
			
		}
		.add-second {
			width: 32upx;
			height: 32upx;
			background-image: url('http://img.moyaomiao.cn/static/images/add_address.png');
			background-size: 32upx 32upx;
			background-repeat: no-repeat;
			margin-right: 20upx
		}
	}
}
.add-attr {
	padding: 9px 0;
	background-color: $font-color-white;
	color: $font-color-dark;
	font-size: $font-me-lg;
	text-align: center;
}
.s-b {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20upx;
	background: $font-color-white;
	color: $font-color-base;
	font-size: $font-base;
	switch{
		transform:scale(0.8);
		
	}
}
.submit {
	@include btn();
}
</style>
