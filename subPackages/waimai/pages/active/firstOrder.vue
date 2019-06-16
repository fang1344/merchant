<template>
	<view class="container">
		<view class="title"><text>优惠</text></view>
		<view class="money-off">
			<view class="money-off-list">
				<text>满</text>
				<input type="text" value="" placeholder="门槛金额" />
				<text>元&nbsp;&nbsp;减</text>
				<input type="text" value="" placeholder="力度金额" />
				<text>元</text>
				<i class="delete"></i>
			</view>
		</view>
		<view class="add-money-off">+添加满减</view>
		<view class="title"><text>同享</text></view>
		<view class="s-b"><text>与商品活动同享</text><switch checked @change="switch1Change" /></view>
		
		<view class="title"><text>状态</text></view>
		<view class="s-b"><text>是否开启</text><switch checked @change="switch1Change" /></view>
		
		<button type="primary" class="submit">提交</button>
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
page {
	background: #f0f0f0;
}
.title {
	font-size: 30upx;
	margin: 20upx;
}
.money-off {
	padding: 20upx;
	background: #ffffff;
}
.money-off-list {
	display: flex;
	flex-direction: row;
	font-size: 30upx;
	border-bottom: 1upx solid #f0f0f0;
	align-items: center;
	padding: 20upx 0;
	input {
		width: 200upx;
		margin: 0 20upx;
		background: #f0f0f0;
	}
	.delete {
		width: 32upx;
		height: 32upx;
		background-image: url('http://img.moyaomiao.cn/static/images/delete.png');
		background-size: 32upx 32upx;
		background-repeat: no-repeat;
		margin-left: 20upx;
	}
}
.add-money-off{
	padding: 20upx 0;
	background-color: #ffffff;
	font-size: 36upx;
	text-align: center
}
.s-b{
	display: flex;
	justify-content:space-between;
	align-items:center;
	padding: 20upx;
	background: #ffffff
}
.submit{
	margin: 50upx 20upx;
}
</style>
