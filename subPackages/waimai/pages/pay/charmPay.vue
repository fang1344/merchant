<template>
	<view>
		<view class="block">
			<view class="title">
				充值金额
			</view>
			<view class="content">
				<view class="amount">
					<view class="list">
						<view class="box" v-for="(amount,index) in amountList" :key="index" @tap="select(amount)" :class="{'on':amount == inputAmount}">
							{{amount}}元
						</view>
					</view>
					<view class="num">
						<view class="text">
							自定义充值金额
						</view>
						<view class="input">
							<input type="number" v-model="inputAmount" />
						</view>
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
					<view class="row" @tap="paytype='alipay'">
							<view class="left">
								<image src="http://img.moyaomiao.cn/static/images/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="paytype=='alipay'" color="#288bf5" />
							</view>
					</view>
					<view class="row" @tap="paytype='wxpay'">
							<view class="left">
								<image src="http://img.moyaomiao.cn/static/images/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="paytype=='wxpay'" color="#288bf5" />
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
			<view class="btn" @tap="doDeposit">立即充值</view>
			<view class="tis">
				点击立即充值，即代表您同意<view class="terms">
					《条款协议》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getUserInfo} from '@/src/utils/api.js'
	export default {
		data() {
			return {
				type: 1,
				userInfo:{},
				remaining: 0,
				inputAmount:'',//金额
				amountList:[200,400,600],//预设3个可选快捷金额
				paytype:'alipay'//支付类型
			};
		},
		onLoad(e){
			this.type=e.type
		},
		async mounted(){
			let res = await getUserInfo();
			this.userInfo = res.data;
			if(this.type==1){
				this.remaining = res.data.money;
			}else if(this.type==2){
				this.remaining = res.data.coin;
			}else if(this.type == 3){
				this.remaining = res.data.food_stamp;
			}
			
			
		},
		methods:{
			select(amount){
				this.inputAmount = amount;
			},
			async doDeposit(){
				if (parseFloat(this.inputAmount).toString() == "NaN") {
					uni.showToast({title:'请输入正确金额',icon:'none'});
					return ;
				}
				if(this.inputAmount<=200){
					uni.showToast({title:'请输入大于200的金额',icon:'none'});
					return ;
				}
				if(parseFloat(this.inputAmount).toFixed(2)!=parseFloat(this.inputAmount)){
					uni.showToast({title:'最多只能输入两位小数哦~',icon:'none'});
					return ;
				}
				if (this.paytype=='coin') {
					uni.showLoading({
						title:'吃点币支付中...'
					});
					let res = await saveStoreProductOrder({
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
					//模板模拟支付，实际应用请调起微信/支付宝
					uni.showLoading({
						title:'支付中...'
					});
					setTimeout(()=>{
						uni.hideLoading();
						uni.showToast({
							title:'支付成功'
						});
						setTimeout(()=>{
							uni.redirectTo({
								url:'../../pay/success/success?amount='+this.inputAmount
							});
						},300);
					},700)
				}
			}
		},
	}
</script>

<style lang="scss">
	.block{
		width: 94%;
		padding: 20upx 3%;
		.title{
			width: 100%;
			font-size: 34upx;
		}
		.content{
			.my{
				width: 100%;
				height: 120upx;
				display: flex;
				align-items: center;
				font-size: 30upx;
				border-bottom: solid 1upx #eee;
			}
			.amount{
				width: 100%;
				
				.list{
					display: flex;
					justify-content: space-between;
					padding: 20upx 0;
					.box{
						width: 30%;
						height: 120upx;
						display: flex;
						justify-content: center;
						align-items: center;
						border-radius: 10upx;
						box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.05);
						font-size: 36upx;
						background-color: #f1f1f1;
						color: 333;
						&.on{
							background-color: $theme-color;
							color: #fff;
						}
					}
				}
				.num{
					margin-top: 10upx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.text{
						padding-right: 10upx;
						font-size: 30upx;
					}
					.input{
						width: 28.2vw;
						border-bottom: solid 2upx #999;
						
						justify-content: flex-end;
						align-items: center;
						input{
							margin: 0 20upx;
							height: 60upx;
							font-size: 30upx;
							color: $theme-color;
							justify-content: flex-end;
							align-items: center;
						}
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
			background-color: $theme-color;
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
				color: $theme-color;
			}
		}
	}
</style>
