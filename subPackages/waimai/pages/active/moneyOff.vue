<template>
	<view class="container">
		<view class="title"><text>优惠</text></view>
		<view class="money-off" v-show= moneyOffList.length>
			<view class="money-off-list" v-for="(item, index) in moneyOffList" :key="index">
				<text>满</text>
				<input type="text" v-model="item.money" placeholder="门槛金额" />
				<text>元&nbsp;&nbsp;减</text>
				<input type="text" v-model="item.discount" placeholder="力度金额" />
				<text>元</text>
				<i class="delete" @click="deleteMoneyOff(index)"></i>
			</view>
		</view>
		<view class="add-money-off" @click="addMoneyOff">+添加满减</view>
		<view class="title"><text>同享</text></view>
		<view class="s-b">
			<text>与商品活动同享</text>
			<switch color="#288bf5" :checked="shareChecked" @change="shareChange" />
		</view>

		<view class="title"><text>状态</text></view>
		<view class="s-b">
			<text>是否开启</text>
			<switch color="#288bf5" :checked="statusChecked" @change="statusChange" />
		</view>

		<button class="submit" @click="comfirm">提交</button>
	</view>
</template>
<script>
import { mapState } from 'vuex';
import { saveStoreMoneyOff, storeMoneyOffList } from '@/src/utils/api.js';
export default {
	data() {
		return {
			status: 0,
			share: 0,
			moneyOffList: [
				{
					money: 100,
					discount: 20
				},
				{
					money: 50,
					discount: 10
				}
			]
		};
	},
	onLoad() {},
	async mounted() {
		let res = await storeMoneyOffList();
		this.share = res.data.share;
		this.status = res.data.status;
		this.moneyOffList = res.data.list;
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
		addMoneyOff() {
			this.moneyOffList.push({
				money: '',
				discount: ''
			});
		},
		deleteMoneyOff(index) {
			this.moneyOffList.splice(index, 1);
		},
		async comfirm() {
			let res = await saveStoreMoneyOff({
				data: this.moneyOffList,
				share: this.share,
				status: this.status
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
.money-off {
	padding: 20upx;
	background: $font-color-white;
}
.money-off-list {
	display: flex;
	flex-direction: row;
	font-size: $font-me-lg;
	border-bottom: 1upx solid #f0f0f0;
	align-items: center;
	padding: 20upx 0;
	input {
		width: 200upx;
		margin: 0 20upx;
		background: #f0f0f0;
	}
	.delete {
		width: 32upx;
		height: 32upx;
		background-image: url('http://img.moyaomiao.cn/static/images/delete.png');
		background-size: 32upx 32upx;
		background-repeat: no-repeat;
		margin-left: 20upx;
	}
}
.add-money-off {
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
