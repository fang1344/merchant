<template>
	<view>
		<view class="block">
			<view class="content">
				<view class="orderinfo">
					<view class="row">
						<view class="nominal">订单名称:</view><view class="text">{{orderName}}</view>
					</view>
					<view class="row">
						<view class="nominal">订单金额:</view><view class="text">{{amount}}元</view>
					</view>
				</view>
			</view>
		</view>
		<view class="block">
			<view class="title">
				选择支付方式
			</view>
			<view class="content">
				<view class="pay-list">
				<!-- 	<view class="row" @tap="paytype='alipay'">
							<view class="left">
								<image src="http://img.moyaomiao.cn/static/images/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="paytype=='alipay'" color="#f06c7a" />
							</view>
					</view> -->
					<view class="row" @tap="paytype='wxpay'">
							<view class="left">
								<image src="http://img.moyaomiao.cn/static/images/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="paytype=='wxpay'" color="#f06c7a" />
							</view>
					</view>
					<view class="row" @tap="paytype='coin'">
							<view class="left" >
								<image style="width: 60upx;height: 60upx; margin-left: 14upx;" src="http://img.moyaomiao.cn/static/images/coin.png"></image>
							</view>
							<view class="center">
								吃点币支付(剩余：{{userInfo.coin}})
							</view>
							<view class="right">
								<radio :checked="paytype=='coin'" color="#f06c7a" />
							</view>
					</view>
				</view>
			</view>
		</view>
		<view class="pay">
			<view class="btn" @tap="doDeposit">立即支付</view>
			<view class="tis">
				点击立即支付，即代表您同意<view class="terms">
					《条款协议》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserInfo,saveStoreProductOrder,getPrepay} from '@/src/utils/api.js';
	export default {
		data() {
			return {
				userInfo:{},
				product_id: 0,
				amount:0,
				orderName:'',
				paytype:'coin'//支付类型
			};
		},
		onLoad(e) {
			console.log(e);
			this.product_id = e.product_id;
			this.amount = e.money;
			this.orderName = e.name;
		},
		async mounted(){
			let res = await getUserInfo();
			this.userInfo = res.data;
		},
		methods:{
			async doDeposit(){
				
				if (this.paytype=='coin') {
					uni.showLoading({
						title:'吃点币支付中...'
					});
					let res = await storeCooperationSave({
						pay_type:3,
						product_id: this.product_id
					})
					
					
					if(res.errno==1){
						this.$api.msg(res.message);
					}else{
						setTimeout(()=>{
							uni.redirectTo({
								url:'/subPackages/waimai/pages/pay/success?amount='+this.amount
							});
						},300);
					}
				}else{
					uni.showLoading({
						title:'支付中...'
					});
					let res = await storeCooperationSave({
						pay_type:3,
						product_id: this.product_id
					})
					var prepayInfo = await getPrepay({
						order_code: res.order_code,
						driver: 'wechat',
						gateway: 'app',
						order_type: 2
					});
					if(prepayInfo.errno==0){
						uni.hideLoading();
						uni.showToast({
							title:prepayInfo.message
						});
					}
					uni.requestPayment({
						provider: 'wxpay',
						orderInfo: prepayInfo, //微信、支付宝订单数据
						success: function (res) {
							console.log('success:' + JSON.stringify(res));
							uni.hideLoading();
							uni.showToast({
								title:'支付成功'
							});
							setTimeout(()=>{
								uni.switchTab({
									url:'/pages/store/index'
								});
							},700);
						},
						fail: function (err) {
							uni.hideLoading();
							console.log('fail:' + JSON.stringify(err));
						}
					});		
				}
				
			}
		}
	}
</script>

<style lang="scss">
.block{
		width: 94%;
		padding: 0 3% 40upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.orderinfo{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 90upx;
					display: flex;
					align-items: center;
					.nominal{
						flex-shrink: 0;
						font-size: 32upx;
						color: #7d7d7d;
					}
					.text{
						width: 70%;
						margin-left: 10upx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 32upx;
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1upx #eee;
				.row{
					width: 100%;
					height: 120upx;
					display: flex;
					align-items: center;
					.left{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80upx;
							height: 80upx;
						}
					}
					.center{
						width: 100%;
						font-size: 30upx;
					}
					.right{
						width: 100upx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20upx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #f06c7a;
			box-shadow: 0upx 5upx 10upx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10upx;
			width: 100%;
			font-size: 24upx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
</style>
