<template>
	<view class="tab-swiper-full" :style="{ height: tabHeight + 'px' }">
		<view data-scindex="1">
			<view class="keyboard-container"><uni-keyboard @completed="done" ref="keyboard"></uni-keyboard></view>
			<view class="payment-container">
				<view class="payment mt-10" hover-class="payment-active">
					<view><image src="../../static/ICBC.png"></image></view>
					<view>{{ bank_name }}(尾号{{ card_num_show }})</view>
					<view><uni-icon type="jinrujiantou"></uni-icon></view>
				</view>
			</view>
			<view class="money-container mt-10">
				<view class="money-box">
					<view>￥</view>
					<view><input type="number" v-model="withdrawMoney" :placeholder="withdrawTip" placeholder-style="font-size:12px;color#f2f2f2;" /></view>
					<view class="button">全部提现</view>
				</view>
				<view class="tips">
					<text>可提现：{{ userInfo.money }}元</text>
					<text>{{ withdraw.remark }}</text>
				</view>
			</view>
			<view class="button-box mt-10"><button @tap="confirmPwd" type="primary">确认提现</button></view>
		</view>
	</view>
</template>

<script>
import uniPassword from '@/components/uni-password/uni-password.vue';
import uniIcon from '@/components/i-icon/i-icon.vue';
import uniKeyboard from '@/components/uni-keyboard.vue';
import { getUserBankcard, getWithdrawInfo, getUserInfo, saveUserWithdraw} from '@/src/utils/api.js';

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
			card_num_show: '',
			withdrawTip:'',
			withdraw:{},
			userInfo:{},
			bank_name:'',
			withdrawMoney:'',
			props:{
				money:'100'
			}
		};
	},
	onLoad() {},
	methods: {
		async done(password) {
			console.log(password);
			console.log(this.$refs);
			let res = await saveUserWithdraw({
				card_id:this.userInfo.bankcard.id,
				money: this.withdrawMoney,
				password: password
			})
			if(res.errno==0){
				uni.navigateTo({
					url: '/subPackages/waimai/pages/me/withdrawSuccess?amount='+this.withdrawMoney,
				});
			}else{
				this.$refs.keyboard.hide();
				this.$api.msg(res.message);
				return false;
			}
		},
		confirmPwd() {
			if(this.withdrawMoney>this.userInfo.money){
				this.$api.msg('余额不足');
				return false;
			}
			if(this.withdrawMoney<this.withdraw.min_draw){
				this.$api.msg('提现金额小于最小提现金额');
				return false;
			}
			if(this.withdrawMoney<this.withdraw.max_draw){
				this.$api.msg('提现金额大于最大提现金额');
				return false;
			}
			
			this.$refs.keyboard.show();
		},
		onInput(e) {
			//e.cancel = true;
		},
		onConfirm(e) {
			let password = e.value;
			
		}
	},
	async mounted() {

		console.log(this.bankcard);
		let res2 = await getWithdrawInfo();
		this.withdraw = res2.data;
		this.withdrawTip = '最低提现'+res2.data.min_draw+'元,单次最高提现'+res2.data.max_draw+'元';
		let user = await getUserInfo();
		this.userInfo = user.data;
		this.bank_name = this.userInfo.bankcard.bank_name;
		this.card_num_show = this.userInfo.bankcard.card_num.substr(-4);
		console.log('user',user);
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
	display: flex;
	justify-content: space-between;
}

.button-box {
	padding: 0 10px;
}
.forget {
	font-size: 28upx;
	padding: 0 30upx;
	color: #1890fb;
}
</style>
