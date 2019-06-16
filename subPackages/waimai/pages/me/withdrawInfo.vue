<template>
	<view class="container">
		<view class="tj-sction">
			<view>现金账户(元)</view>
			<view>20.00</view>
			<button type="primary" class="recharge" @click="navTo('/subPackages/waimai/pages/me/deposit')">充值</button>
			<button class="withdraw" @click="navTo('/subPackages/waimai/pages/me/withdraw')">提现</button>
		</view>

		<!-- 账户 -->
		<list-cell @eventClick="navTo('/subPackages/waimai/pages/me/bank')" iconColor="#e07472" title="账户明细" tips=""></list-cell>
		<list-cell @eventClick="navTo('/subPackages/waimai/pages/me/bankPassword')" iconColor="#5fcda2" title="常见问题" tips=""></list-cell>
	</view>
</template>
<script>
import listCell from '@/components/mix-list-cell';
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
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false
		};
	},
	onLoad() {},
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
		...mapState(['hasLogin', 'userInfo'])
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
		}
	}
};
</script>
<style lang="scss">
.tj-sction {
	display: -webkit-flex; /* Safari */
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.recharge{
		width: 80%;
		border-radius: 40upx;
		margin: 20upx 0;
	}
	.withdraw{
		width: 80%;
		border-radius: 40upx;
		margin: 20upx 0;
		border: 1upx solid #d0d0d0;
	}
}
</style>
