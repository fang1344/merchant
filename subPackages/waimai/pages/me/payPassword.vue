<template>
	<view class="tab-swiper-full" :style="{ height: tabHeight + 'px' }">
		<view class="content">
			<uni-password ref="secrity" @input="onInput" @confirm="onConfirm">{{passwordTips}}</uni-password>
		</view>
		<view class="forget">忘记支付密码</view>
	</view>
	
</template>

<script>
import uniPassword from '@/components/uni-password/uni-password.vue';
import uniIcon from '@/components/i-icon/i-icon.vue';
import uniKeyboard from '@/components/uni-keyboard.vue';
import {updateUserInfo} from '@/src/utils/api.js'
export default {
	components: {
		uniPassword,
		uniIcon,
		uniKeyboard
	},
	data() {
		return {
			tabCurrentIndex: 0,
			swiperCurrentIndex: 0,
			titleShowId: 'tabTag-0',
			tabHeight: 300,
			showKeyboard: false,
			passwordTips: '请输入支付密码'
		};
	},
	onLoad(option) {
		
	},
	methods: {
		done(password) {
			console.log(password);
			console.log(this.$refs);
		},
		confirmPwd() {
			this.$refs.keyboard.show();
		},
		onInput(e) {
			//e.cancel = true;
		},
		async onConfirm(e) {
			let password = e.value;
			console.log(password);
			if (password.length!=6) {
				this.$api.msg('请输入密码');
				return;
			}
			let res = await updateUserInfo({pay_password:password});
			if (res.errno == 0) {
				setTimeout(() => {
					uni.navigateBack();
				}, 800);
			} else {
			}
		}
	},
	onReady() {
		//获取屏幕高度及比例
		var winInfo = uni.getSystemInfo({
			success: res => {
				this.tabHeight = res.windowHeight;
			}
		});
	}
};
</script>

<style>
page {
	background: #f2f2f2;
}
.keyboard-container {
	position: absolute;
	top: 0;
	height: 100%;
	width: 100%;
}
uni-button[type='primary'] {
	background: #00c456 !important;
}
/* 选项卡 */
.tab {
	padding: 0;
}
.tab-title {
	white-space: nowrap;
	text-align: center;
	background: #ffffff;
}
.tab-title view {
	width: auto;
	padding: 0 12px;
	margin: 0 8px;
	line-height: 42px;
	display: inline-block;
	text-align: center;
	border-bottom: 2px solid #ffffff;
	font-size: 30upx;
}
.tab-title view:first-child {
	margin-left: 0;
}
.tab-title view:last-child {
	margin-right: 0;
}
.tab-current {
	border-bottom: 4upx solid #00c777 !important;
	color: #00c777;
}
.tab-swiper {
	width: 100%;
	height: 350upx;
	padding: 0;
}
.tab-swiper swiper-item {
	width: 100%;
}
.tab-swiper swiper-item navigator {
	line-height: 70upx;
	width: 100%;
	display: block;
}
.tab-swiper-full {
	width: 100%;
	height: auto;
}
.tab-swiper-full swiper-item {
	width: 100%;
}
.tab-swiper-full scroll-view {
	width: 100%;
	height: 100%;
}

.center {
	text-align: center;
}
.mt-10 {
	margin-top: 10px;
}
.pt-10 {
	paddint-top: 10px;
}

.content {
	text-align: center;
	height: 400upx;
}

.payment-container {
	border-top: 1px solid #e2e2e2;
	height: calc(100%-44px);
	overflow: hidden;
}
.payment-container .payment {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 10px;
	background: #fff;
}
.payment-container .payment view:nth-child(2) {
	flex: 1;
}
.payment-container .payment-active {
	background: #e2e2e2;
}
.payment-container .payment image {
	width: 30px;
	height: 30px;
	margin-right: 10px;
}

.money-container {
	background: #fff;
	padding: 10px;
}
.money-container .money-box {
	padding: 10px 0;
	border-bottom: 1px solid #efefef;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.money-container .money-box .button {
	font-size: 12px;
	color: #cf9f41;
}
.money-container .money-box view:nth-child(1) {
	font-size: 25px;
}
.money-container .money-box view:nth-child(2) {
	flex: 1;
	font-size: 30px;
	padding: 0 5px;
}

.money-container .tips {
	color: #222;
	padding-top: 10px;
	font-size: 12px;
}

.button-box {
	padding: 0 10px;
}
.forget{
	font-size: 28upx;
	padding: 0 30upx;
	color: #1890fb;
}
</style>
