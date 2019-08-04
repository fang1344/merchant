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
				<view class="tj-item">
					<text class="num">0</text>
					<text>今日预计收入</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>有效订单</text>
				</view>
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
				<!-- <view class="sec-header">
					<text class="yticon icon-lishijilu"></text>
					<text>最近售卖商品</text>
				</view>
				<scroll-view scroll-x class="h-list">
					<image
						@click="navTo('/subPackages/waimai/pages/store/league')"
						src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
						mode="aspectFill"
					></image>
					<image
						@click="navTo('/subPackages/waimai/pages/store/league')"
						src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105231218&di=09534b9833b5243296630e6d5b728eff&imgtype=0&src=http%3A%2F%2Fimg002.hc360.cn%2Fm1%2FM05%2FD1%2FAC%2FwKhQcFQ3iN2EQTo8AAAAAHQU6_8355.jpg"
						mode="aspectFill"
					></image>
					<image
						@click="navTo('/subPackages/waimai/pages/me/deposit')"
						src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2691146630,2165926318&fm=26&gp=0.jpg"
						mode="aspectFill"
					></image>
					<image
						@click="navTo('/subPackages/waimai/pages/store/league')"
						src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105320890&di=c743386be51f2c4c0fd4b75754d14f3c&imgtype=0&src=http%3A%2F%2Fimg007.hc360.cn%2Fhb%2FMTQ1OTg4ODY0MDA3Ny05OTQ4ODY1NDQ%3D.jpg"
						mode="aspectFill"
					></image>
					<image
						@click="navTo('/subPackages/waimai/pages/product/product')"
						src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105443324&di=8141bf13f3f208c61524d67f9bb83942&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ac9a5548d29b0000019ae98e6d98.jpg"
						mode="aspectFill"
					></image>
					<image
						@click="navTo('/subPackages/waimai/pages/product/product')"
						src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=191678693,2701202375&fm=26&gp=0.jpg"
						mode="aspectFill"
					></image>
				</scroll-view>  onclick="window.android.startPrinter()"-->
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/info')" icon="icon-businesscard" iconColor="" title="基本信息" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/cooperate')" icon="icon-cooperate" iconColor="" title="合作方案" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/active/index')" icon="icon-huodong2" iconColor="" title="活动设置" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/coverAreaLink')" icon="icon-businesscard" iconColor="" title="区域管理" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/brand')" icon="icon-businesscard" iconColor="" title="品牌介绍" tips=""></list-cell>
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
			storeData: {},
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			infoIcon:'&#xe6e6;'
		};
	},
	async onShow() {
		let res = await getRestaurantStoreDetail({hasProduct:true});
		this.storeData = res.data;
		console.log(this.storeData);
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
