

<template>
	<view>
		<view class="icon">
			<image src="/static/img/success.png"></image>
		</view>
		<view class="tis">
			订单支付成功
		</view>
		<view class="pay-amount">
			支付金额:{{amount}}元
		</view>
		<view class="back">
			<view class="btn" @tap="toStore">个人中心</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				amount:0
			};
		},
		onLoad(e) {
			if(e.amount){
				console.log(e.amount);
				this.amount = parseFloat(e.amount).toFixed(2);	
			}
		},
		methods: {
			toStore() {
				uni.switchTab({
					url: '/pages/store/index'
				});
			}
		},
	}
</script>

<style lang="scss">
	view{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
.icon{
	width: 100%;
	margin-top: 10vw;
	image{
		width: 25vw;
		height: 25vw;
	}
}
.tis{
	width: 100%;
	margin-top: 20upx;
	font-size: 48upx;
}
.pay-amount{
	width: 100%;
	margin-top: 10upx;
	font-size: 32upx;
}
.back{
	position: absolute;
	width: 100%;
	bottom: 80upx;
	.btn{
		padding: 0 50upx;
		height: 70upx;
		border: solid 2upx $theme-color;
		color: $theme-color;
		align-items: center;
		border-radius: 10upx;
		font-size: 34upx;
	}
}
</style>