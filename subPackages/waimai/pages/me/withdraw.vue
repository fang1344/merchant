<template>
	<view class="tab-swiper-full" :style="{ height: tabHeight + 'px' }">
		<view data-scindex="1">
			<view class="keyboard-container"><uni-keyboard @completed="done" ref="keyboard"></uni-keyboard></view>
			<view class="payment-container">
				<view class="payment mt-10" hover-class="payment-active">
					<view><text class="iconfont icon-yinhangqia"></text></view>
					<view>{{ bank_name }}(尾号{{ card_num_show }})</view>
					<view><text class="iconfont icon-icon-jinru"></text></view>
				</view>
			</view>
			<view class="money-container mt-10">
				<view class="money-box" >
					<view>￥</view>
					<view><input type="number" v-model="withdrawMoney" :placeholder="withdrawTip" placeholder-style="font-size:12px;color#f2f2f2;" /></view>
					<view class="button"  @click="withdrawAll()"><text>全部提现</text></view>
				</view>
				<view class="tips">
					<text>可提现：{{ remaining }}元</text>
					<text>{{ remark }}</text>
				</view>
				<view class="tips">
					<text>最小提现：{{ withdraw.min_draw }}元</text>
					<text>最大提现：{{ withdraw.max_draw }}元</text>
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
			type: 1,
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
	onLoad(option) {
		this.type = option.type;
	},
	methods: {
		async done(password) {
			let res = await saveUserWithdraw({
				card_id:this.userInfo.bankcard.id,
				money: this.withdrawMoney,
				password: password,
				type: this.type
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
		withdrawAll(){
			this.withdrawMoney = this.remaining;
		},
		confirmPwd() {
			if(this.withdrawMoney>this.remaining){
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
		let res2 = await getWithdrawInfo();
		this.withdraw = res2.data;
		this.withdrawTip = '最低提现'+res2.data.min_draw+'元,单次最高提现'+res2.data.max_draw+'元';
	},
	async onShow(){
		let user = await getUserInfo();
		this.userInfo = user.data;
		
		this.bank_name = this.userInfo.bankcard.bank_name;
		this.card_num_show = this.userInfo.bankcard.card_num.substr(-4);
		if(Object.keys(this.userInfo.bankcard).length==0){
			uni.showModal({
				content:'您还未绑定银行卡，马上去绑定',
				showCancel: false,
				confirmColor:"#F8C219",
				success: res => {
					if (res.confirm) {
					  // //设置按钮可以点击
					  uni.navigateTo({
						url: '/subPackages/waimai/pages/me/bank',
						success: res => {},
						fail: () => {},
						complete: () => {}
					  });
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	computed: {
		remaining() {
			var res = 0;
			switch(this.type){
				case '1':
					res = this.userInfo.money;
					break;
				case '2' :
					res = this.userInfo.coin;
					break;
				case '3' :
					res = this.userInfo.food_stamp;
				default:
					break;
			}
			return res;
		},
		remark(){
			var res = 0;
			switch(this.type){
				case '1':
					res = this.withdraw.remark;
					break;
				case '2' :
					res = this.withdraw.icon_remark;
					break;
				case '3' :
					res = this.withdraw.food_stamp_remark;
				default:
					break;
			}
			return res;
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
	position: relative;
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
