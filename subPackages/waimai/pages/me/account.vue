<template>
	<view class="container">
		<view class="tj-sction">
			<navigator class="tj-item" url="/subPackages/waimai/pages/me/withdraw">
				<text class="num">{{info.coin}}</text>
				<text>七点币</text>
			</navigator>
			<view class="tj-item">
				<text class="num">{{info.food_stamp}}</text>
				<text>粮票</text>
			</view>
			<navigator class="tj-item" url="/subPackages/waimai/pages/me/withdrawInfo">
				<text class="num">{{info.money}}</text>
				<text>现金</text>
			</navigator>
		</view>
		
		<!-- 账户 -->
		<view class="title">账户设置</view>
		<list-cell @eventClick="navTo('/subPackages/waimai/pages/me/bank')" icon="icon-iconfontweixin" iconColor="#e07472" title="银行卡" :tips="bankcardTips"></list-cell>
		<list-cell @eventClick="setPayPassword" icon="icon-dizhi" iconColor="#5fcda2" title="支付密码" tips="去修改"></list-cell>
		
		<view class="title">结算说明</view>
		<list-cell @click="navTo('/subPackages/waimai/pages/product/product')" icon="icon-pinglun-copy" iconColor="#ee883b" title="结算周期" tips="T+3"></list-cell>
	</view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
import { mapState } from 'vuex';
import {getUserInfo} from '@/src/utils/api.js'

let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: {
		listCell
	},
	data() {
		return {
			info:{
				bankcard:{}
			},
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			
		};
	},
	onLoad() {},
	
	async mounted() {
		let res = await getUserInfo();
		this.info = res.data;
		console.log(this.info);
	},
	// #ifndef MP
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/subPackages/waimai/pages/set/set');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			uni.navigateTo({
				url: '/subPackages/waimai/pages/notice/notice'
			});
		}
	},
	// #endif
	computed: {
		...mapState(['hasLogin', 'userInfo']),
		bankcardTips(){
			if(Object.keys(this.info.bankcard).length==0){
				return '请填写银行卡信息'
			}else{
				return this.info.bankcard.bank_name+'(尾号 '+this.info.bankcard.card_num.substr(-4)+')'
			}
		},
	},
	methods: {
		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navTo(url) {
			// if(!this.hasLogin){
			// 	url = '/subPackages/waimai/pages/me/login';
			// }
			console.log('navTo');
			uni.navigateTo({
				url
			});
		},

		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) {
				moveDistance = 80;
			}

			if (moveDistance > 0 && moveDistance <= 80) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},
		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		},
		setPayPassword(){
			console.log('pay_password',this.info.pay_password);
			if(!this.info.pay_password){
				uni.navigateTo({
					url:'/subPackages/waimai/pages/me/payPassword'
				})
			}else{
				uni.navigateTo({
					url:'/subPackages/waimai/pages/me/payPasswordCheck'
				})
			}
		}
	}
};
</script>
<style lang="scss">
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}

.user-section {
	/* height: 520upx; */
	/* padding: 100upx 30upx 0;
		position:relative; */
}
.user-info-box {
	height: 180upx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}
	.username {
		font-size: $font-lg + 6upx;
		color: $font-color-dark;
		margin-left: 20upx;
	}
}

.vip-card-box {
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 240upx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 16upx 16upx 0 0;
	overflow: hidden;
	position: relative;
	padding: 20upx 24upx;
	.card-bg {
		position: absolute;
		top: 20upx;
		right: 0;
		width: 380upx;
		height: 260upx;
	}
	.b-btn {
		position: absolute;
		right: 20upx;
		top: 16upx;
		width: 132upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 22upx;
		color: #36343c;
		border-radius: 20px;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}
	.tit {
		font-size: $font-base + 2upx;
		color: #f7d680;
		margin-bottom: 28upx;
		.yticon {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}
	.e-b {
		font-size: $font-sm;
		color: #d8cba9;
		margin-top: 10upx;
	}
}
.cover-container {
	background: $page-color-base;
	padding: 0 30upx;
	position: relative;
	background: #f5f5f5;
	padding-bottom: 20upx;
	.arc {
		position: absolute;
		left: 0;
		top: -34upx;
		width: 100%;
		height: 36upx;
	}
}
.tj-sction {
	@extend %section;
	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 140upx;
		font-size: $font-sm;
		color: #75787d;
	}
	.num {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 8upx;
	}
}
.order-section {
	@extend %section;
	padding: 28upx 0;
	margin-top: 20upx;
	.order-item {
		@extend %flex-center;
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		font-size: $font-sm;
		color: $font-color-dark;
	}
	.yticon {
		font-size: 48upx;
		margin-bottom: 18upx;
		color: #fa436a;
	}
	.icon-shouhoutuikuan {
		font-size: 44upx;
	}
}
.history-section {
	padding: 30upx 0 0;
	margin-top: 20upx;
	background: #fff;
	border-radius: 10upx;
	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40upx;
		margin-left: 30upx;
		.yticon {
			font-size: 44upx;
			color: #5eba8f;
			margin-right: 16upx;
			line-height: 40upx;
		}
	}
	.h-list {
		white-space: nowrap;
		padding: 30upx 30upx 0;
		image {
			display: inline-block;
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
			border-radius: 10upx;
		}
	}
}
.title{
	color: $font-color-base;
	font-size: 30upx;
	padding: 30upx 30upx 0;
}
</style>
