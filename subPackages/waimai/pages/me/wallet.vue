<template>
	<div class="container">
		<div class="header-c">
			<div class="info-c">
				<view class="title">可提现余额（元）</view>
				<span class="name">{{wallet.money}}</span>
			</div>
			<navigator class="withdraw" url="/subPackages/waimai/pages/me/withdraw">提现</navigator>
		</div>
		<div class="header-d">
			<navigator url='/subPackages/waimai/pages/me/account'>
				<i class="icon mt-red-packet-o"></i>
				<span class="title">查看账户</span>
			</navigator>
			<span class="amount">银行卡、推广、违约金</span>
		</div>
		<div class="list-c">
			<div class="item">
				<div class="item-l"><span class="title wait">待结算账户</span></div>
				<div class="r">
					<navigator class="amount" url="./orderBill">查看全部账单</navigator>
					<i class="icon mt-arrow-right-o"></i>
				</div>
			</div>
			<div class="item" v-for="(item,index) in wallet.wait" :key="index">
				<div class="item-l"><span class="title">{{item.date}}</span></div>
				<span class="amount">￥{{item.profit}}</span>
				<div class="r">
					<span class="r-l">预计{{item.settleDate}}结算</span>
					<i class="icon mt-arrow-right-o"></i>
				</div>
			</div>
			
		</div>
		<div class="list-c">
			<div class="item">
				<div class="item-l"><span class="title already">已结算账户</span></div>
				<div class="r">
					<navigator class="amount" url="./orderBill">查看全部账单</navigator>
					<i class="icon mt-arrow-right-o"></i>
				</div>
			</div>
			<div class="item">
				<div class="item-l"><span class="title">{{wallet.already.date}}</span></div>
				<span class="amount">￥{{wallet.already.profit}}</span>
				<div class="r">
					<span class="r-l">预计{{wallet.already.settleDate}}结算</span>
					<i class="icon mt-arrow-right-o"></i>
				</div>
			</div>
		</div>
		<!-- <div class="btn" @click="logoutClick">退出账号</div> -->
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import {getRestaurantWallet} from '@/src/utils/api.js'

export default {
	data() {
		return {
			wallet: {
				already:{
					date:'',
					profit:'',
					settleDate:''
				}
			}
		};
	},
	computed: {
		...mapState('user', ['userInfo'])
	},
	async mounted() {
		// if(Object.keys(this.userInfo).length==0){
		let res = await getRestaurantWallet();
		this.wallet = res.data;
		console.log('wallet',this.wallet);
		let that = this;
		// 			this.itemList.forEach(function(val,index){
		// 				console.log(index,val);
		// 				if(val.key=='coupon'){
		// 					that.itemList[index].amount = that.userInfo.coupon_count;
		// 				}else if (val.key='redPacket'){
		// 					that.itemList[index].amount = that.userInfo.red_packet_count;
		// 				}
		// 			})
		// }
		console.log('itemList', this.itemList);
	},
	methods: {
		...mapActions('user', ['setUserInfoAction', 'bindGetUserInfoAction']),

		itemClick(e) {
			console.log(this.userInfo);
			wx.navigateTo({ url: e.path });
		},
		
		logoutClick() {
			wx.showModal({
				title: '确认退出？',
				content: '退出登录后将无法查看订单，重新登录即可查看',
				confirmColor: '#FFC24A',
				success: function(res) {
					if (res.confirm) {
						resolve('ok');
					} else if (res.cancel) {
						resolve('cancle');
					}
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/css/global.scss';
page{
	background: #f0f0f0;
}
.container {
	.header-c {
		display: flex;
		align-items: center;
		height: 280upx;
		justify-content: space-between;
		background-color: #278bdd;
		.withdraw {
			margin-top: 40upx;
			margin-right: 20upx;
			border: 1upx solid #ffffff;
			color: #ffffff;
			font-size: 28upx;
			padding: 10upx 20upx;
			border-radius: 40upx;
		}
		.info-c {
			display: flex;
			flex-direction: column;
			margin-left: 30upx;
			.title {
				font-size: 20upx;
				color: #ffffff;
			}
			.name {
				font-size: 50upx;
				color: #ffffff;
				font-weight: bold;
				margin-top: 20upx;
			}
			.phone {
				font-size: 28upx;
				color: $textBlack-color;
			}
		}
	}
	.header-d {
		background: #46a0fc;
		font-size: 28upx;
		line-height: 90upx;
		height: 90upx;
		color: #ffffff;
		display: flex;
		justify-content: space-between;
		padding: 0upx 30upx;
		.title {
			margin-left: 20upx;
		}
	}
	.list-c {
		display: flex;
		flex-direction: column;

		margin-top: 20upx;
		background-color: white;
		
		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 88upx;
			border-bottom: 2upx solid $spLine-color;
			padding: 0 20upx;
			font-size: 28upx;
			.wait{
				color: $theme-color-ornament;
			}
			.already{
				color: $theme-color-collocation;
			}
			.title{
				
			}
			.item-l {
				width: 170upx;
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
