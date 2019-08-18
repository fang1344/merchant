<template>
	<view class="container">
		<view class="user-section">
			<image class="logo" src="http://img.moyaomiao.cn/static/images/logo.png"></image>
			<view>
				<text>七点校园商家版</text>
			</view>
			<view class="version">
				<text>v1.0.0</text>
			</view>
		</view>

		<view class="cover-container">
			<view class="history-section icon">
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/info')" icon="icon-businesscard" iconColor="" title="特别申明" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/cooperate')" icon="icon-cooperate" iconColor="" title="使用帮助" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/active/index')" icon="icon-huodong2" iconColor="" title="给我评分" tips=""></list-cell>
				<list-cell @eventClick="navTo('/subPackages/waimai/pages/store/coverAreaLink')" icon="icon-businesscard" iconColor="" title="隐私政策" tips=""></list-cell>
			</view>
		</view>
		
		<view class="copyright">
			<text >
				Copyright [2019] by [合肥七点电子商务有限责任公司] .All rights reserved.
			</text>
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
	border-radius: 10upx;
}

.user-section {
	padding: 100upx 30upx 0;
	text-align: center;
	color: #999;
	.logo{
		width: 200upx;
		height: 200upx;
	}
	.version{
		margin: 0 auto;
		border: 1px solid #999;
		border-radius: 20upx;
		font-size: 24upx;
		width: 200upx;
	}
	
}
.copyright{
	color:#999;
	padding: 30upx 20upx;
	text-align: center;
	font-size: 28upx;
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

.history-section {
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

</style>
