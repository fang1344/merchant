<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" :src="storeData.pic_url"></image>
			<view class="user-info-box">
				<view class="portrait-box"><image class="portrait" :src="storeData.pic_url || 'http://img.moyaomiao.cn/static/images/missing-face.png'"></image></view>
				<view class="info-box">
					<text class="username">{{ storeData.name || '游客' }}</text>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="http://img.moyaomiao.cn/static/images/vip-card-bg.png" mode=""></image>
				
				<navigator v-if="isLeague" class="b-btn" url="/subPackages/waimai/pages/store/cooperateIntro?id=1">立即开通</navigator>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					联盟商家
				</view>
				<text class="e-m">Merchant Union</text>
				<text class="e-b"></text>
			</view>
		</view>

		<view
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="http://img.moyaomiao.cn/static/images/arc.png"></image>

			<view class="tj-sction">
				<navigator class="tj-item" url="/subPackages/waimai/pages/money/record?today=1">
					<text class="num">0</text>
					<text>今日预计收入</text>
				</navigator>
				<navigator class="tj-item" url="/subPackages/waimai/pages/order/record?today=1">
					<text class="num">0</text>
					<text>今日有效订单</text>
				</navigator>
				<!-- <view class="tj-item">
					<text class="num">20</text>
					<text>积分</text>
				</view> -->
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/subPackages/waimai/pages/goods/index')" hover-class="common-hover" :hover-stay-time="50">
					<!-- <i class="iconfont">&#xe89e;</i> -->
					<i class="iconfont icon-B-shangpin xl-icon"></i>
					<text>商品</text>
				</view>
				<view class="order-item" @click="navTo('/subPackages/waimai/pages/me/wallet')" hover-class="common-hover" :hover-stay-time="50">
					<i class="iconfont icon-qianbao xl-icon"></i>
					<text>钱包</text>
				</view>
				<view class="order-item" @click="navTo('/subPackages/waimai/pages/order/rating')" hover-class="common-hover" :hover-stay-time="50">
					<i class="iconfont icon-cy3 xl-icon"></i>
					<text>评价</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section icon">
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/info')" icon="icon-businesscard" iconColor="" title="基本信息" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/cooperate')" icon="icon-cooperate" iconColor="" title="合作方案" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/active/index')" icon="icon-huodong2" iconColor="" title="活动设置" tips=""></list-cell>
				<!-- #ifdef H5 -->
					<list-cell @eventClick="navTo('/pages/store/coverArea')" icon="icon-ditu" iconColor="" title="区域管理" tips=""></list-cell>
				<!-- #endif -->
				<!-- #ifndef H5 -->
					<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/coverAreaLink')" icon="icon-ditu" iconColor="" title="区域管理" tips=""></list-cell>
				<!-- #endif -->
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/brand')" icon="icon-pinpai" iconColor="" title="品牌介绍" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/printer')" icon="icon-print" iconColor=""  title="打印机管理"></list-cell>
				<list-cell @eventClick="navTo('/pages/about/about')" icon="icon-businesscard" iconColor=""  title="关于我们"></list-cell>
			</view>
			<button class="logout" @click="logout">退出登录</button>
		</view>
	</view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
import { getRestaurantStoreDetail } from '@/src/utils/api.js';
import { mapState } from 'vuex';
let startY = 0,
	moveY = 0,
	pageAtTop = true;
export default {
	components: {
		listCell
	},
	data() {
		return {
			token: '',
			storeData: {product:[]},
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			infoIcon:'&#xe6e6;'
		};
	},
	async onShow() {
		let res = await getRestaurantStoreDetail({hasProduct:true});
		if(res.errno==-5){
			this.$api.msg(res.message);
			setTimeout(function(){
				uni.navigateTo({
					url:'../../subPackages/waimai/pages/me/login'
				})
			},700);
		}else if(res.errno==-15){
			this.$api.msg(res.message);
			setTimeout(function(){
				uni.navigateTo({
					url:'../../subPackages/waimai/pages/store/apply'
				})
			},700);
		}else if(res.errno==0){
			this.token=uni.getStorageSync('token');
			this.storeData = res.data;
		}else{
			this.$api.msg(res.message);
		}
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
		isLeague(){
			this.storeData.product.map(item=>{
				if(item.product_id==1){
					return true
				}
			})
			return false;
		}
		
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
			if(url == '/subPackages/waimai/pages/store/coverAreaLink'){
				url += '?token='+uni.getStorageSync('token');
			}
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
		logout() {
			uni.setStorageSync('token','')
			uni.navigateTo({
				url: '/subPackages/waimai/pages/me/login'
			});
		}
	}
};
</script>
<style lang="scss">
	.container{
		overflow-y: auto;
	}
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
	height: 520upx;
	padding: 100upx 30upx 0;
	position: relative;
	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(7upx);
		opacity: 0.7;
	}
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
		border: 5upx solid $font-color-white;
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
		color: $font-color-base;
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
	margin-top: -150upx;
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
		color: $font-color-base;
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
		.xl-icon {
			font-size: 60upx;
			color: $theme-color;
		}
	}
	.yticon {
		font-size: 48upx;
		margin-bottom: 18upx;
		color: $mtRed-color;
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
.logout {
	margin-top: 40upx;
	color: $font-color-dark;
}
</style>
