<template>
	<div class="container">
		<div class="header-c">
			<div class="info-c"><image class="info-image" :src="cooperateType.icon"></image></div>
			<div class="info-r">
				<view class="title">{{ cooperateType.value }}</view>
				<view class="valid-time">定期时间： {{pattern.regular_days}}天</view>
				<!-- <view class="valid-time">至 2019-12-12 00:00:00</view> -->
				<view class="dredge-fee">费用: ￥{{pattern.cost}}</view>
				<view class="dredge" @click="cooperation">开通</view>
			</div>
		</div>
		<div class="header-d">
			<view>
				<text class="title">方案简介</text>
				<text class="tip">{{pattern.description}}</text>
			</view>
		</div>

		<div class="header-d">
			<view>
				<text class="title">收费规则</text>
				<text class="tip">{{pattern.rule}}</text>
			</view>
		</div>
		<div class="header-d">
			<view>
				<text class="title">服务内容</text>
				<text class="tip">{{pattern.content}}</text>
			</view>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import {getRestaurantCooperationPattern} from '@/src/utils/api.js'

export default {
	data() {
		return {
			id: '',
			pattern: {},
			cooperate: [
				{
					key: "1",
					value: '联盟商家',
					icon: 'http://img.moyaomiao.cn/static/images/svip.png'
				},
				{
					key: "2",
					value: '魅力商家',
					icon: 'http://img.moyaomiao.cn/static/images/vip.png'
				},
				{
					key: "3",
					value: '竞价排名',
					icon: 'http://img.moyaomiao.cn/static/images/store_compete.png'
				},
				{
					key: "4",
					value: '商品排名',
					icon: 'http://img.moyaomiao.cn/static/images/goods_compete.png'
				}
			]
		};
	},
	onLoad(option) {
		this.id = option.id;
	},
	
	computed: {
		cooperateType() {
			var res; 
			this.cooperate.map(item => {
				console.log(item.key, this.id);
				if (item.key == this.id) {
					res = item;
					console.log(res);
				}
			});
			return res;
		}
	},
	async mounted() {
		// if(Object.keys(this.userInfo).length==0){
		let res = await getRestaurantCooperationPattern({id:this.id});
		this.pattern = res.data;
		console.log(this.pattern);
	},
	methods: {
		cooperation() {
			switch (this.id) {
				case '1':
				case '2':
					uni.navigateTo({
						url: '/subPackages/waimai/pages/pay/payment?name='+this.pattern.name+'&money='+this.pattern.cost
					});
					break;
				case 3:
				case 4:
				default:
					uni.navigateTo({
						url: '/subPackages/waimai/pages/me/deposit'
					});
					break;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/css/global.scss';
.container {
	.header-c {
		display: flex;
		align-items: center;
		height: 300upx;
		.info-c {
			display: flex;
			flex-direction: column;
			margin-left: 30upx;
			.info-image {
				width: 160upx;
				height: 160upx;
				margin-right: 40upx;
			}
		}
		.info-r {
			margin-left: 20upx;
			color: black;
			font-size: 32upx;
			.title {
				font-size: 36upx;
				color: $font-color-dark;
			}
			.valid-time {
				font-size: 20upx;
				color: $textBlack-color;
			}
			.dredge-fee {
				color:$mtRed-color;
				font-size: 24upx;
			}
			.dredge {
				background: $theme-color;
				width: 100upx;
				height: 50upx;
				color: $font-color-white;
				text-align: center;
				font-size: 28upx;
				line-height: 50upx;
				border-radius: 10upx;
				margin-top: 20upx;
			}
		}
	}
	.header-d {
		padding: 15upx 30upx;
		border-top: 1upx solid #e4e4e4;
		.title {
			font-size: 30upx;
			color:$font-color-dark;
			display: block;
		}
		.tip{
			font-size: 28upx;
			color:$font-color-base;
		}
	}
	.list-c {
		display: flex;
		flex-direction: column;

		margin-top: 20upx;
		background-color: $font-color-white;
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88upx;
			border-bottom: 2upx solid $spLine-color;
			padding: 0 20upx;
			.item-l {
			}
			.r-l {
				font-size: 28upx;
			}
			i {
				font-size: 24upx;
				color: $textGray-color;
			}
		}
		.item:last-child {
			border-bottom: 0upx solid $spLine-color;
		}
	}
	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 88upx;
		background-color: white;
		margin-top: 20upx;
		color: $textBlack-color;
		font-size: 28upx;
	}
}
</style>
