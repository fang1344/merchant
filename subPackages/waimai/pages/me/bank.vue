<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">持卡人</text>
			<input class="input" type="text" v-model="bankcard.username" placeholder="请填写持卡人姓名" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">银行卡号</text>
			<input class="input" type="text" v-model="bankcard.card_num" placeholder="请填写卡号" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">所属银行</text>
			<picker class="picker" mode="selector" :range="bankList" :range-key="bankKey" @change="bankChange">
				<view>
					<span class="row-picker">{{ bankName }}</span>
				</view>
			</picker>
		</view>
		<view class="row b-b">
			<text class="tit">开户地</text>
			<input class="input" type="text" v-model="bankcard.city" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">开户支行</text>
			<input class="input" type="text" v-model="bankcard.subbranch_name" placeholder="请填写" placeholder-class="placeholder" />
		</view>
		<button class="add-btn" @click="confirm">提交</button>
	</view>
</template>

<script>
import { getUserBankcard, getBankList, saveUserBankcard } from '@/src/utils/api.js';
export default {
	data() {
		return {
			bankcard: {},
			bankList: [],
			bankKey: 'name',
			bankName: '请选择'
		};
	},
	async onLoad(option) {
		let res = await getUserBankcard();
		this.bankcard = res.data;
		// console.log(res);
		let bank = await getBankList();
		this.bankList = bank.data;
		this.bankList.map(item => {
			if(item.id==this.bankcard.bank_id){
				this.bankName = item.name;
			}
		})
	},
	components: {},
	methods: {
		deleteImage(e) {},
		addImage(e) {
			console.log(e);
		},
		bankChange(item) {
			this.bankcard.bank_id = this.bankList[item.detail.value].id;
			this.bankcard.bank_name = this.bankList[item.detail.value].name;
			this.bankName = this.bankList[item.detail.value].name;
		},
		//提交
		async confirm() {
			if (!this.bankcard.username) {
				this.$api.msg('请填写持卡人姓名');
				return;
			}
			if (!this.bankcard.card_num) {
				this.$api.msg('请填写卡号');
				return;
			}
			if (!this.bankcard.bank_id) {
				this.$api.msg('请选择银行');
				return;
			}

			//this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
			console.log(this.bankcard);
			let res = await saveUserBankcard(this.bankcard);
			this.$api.msg(res.message);
			if (res.errno == 0) {
				setTimeout(() => {
					uni.navigateBack();
				}, 800);
			} else {
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background: $page-color-base;
	padding-top: 16upx;
}

.row {
	display: flex;
	align-items: center;
	position: relative;
	padding: 0 30upx;
	height: 110upx;
	background: #fff;

	.tit {
		flex-shrink: 0;
		width: 160upx;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.input {
		flex: 1;
		font-size: 30upx;
		color: $font-color-dark;
	}
	.icon-shouhuodizhi {
		font-size: 36upx;
		color: $font-color-light;
	}

	.row-picker {
		flex: 1;
		font-size: 30upx;
		color: $font-color-dark;
	}
}
.row-image {
	height: 200upx;
}
.default-row {
	margin-top: 16upx;
	.tit {
		flex: 1;
	}
	switch {
		transform: translateX(16upx) scale(0.9);
	}
}
.add-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 690upx;
	height: 80upx;
	margin: 60upx auto;
	font-size: $font-lg;
	color: #fff;
	background-color: $theme-color;
	border-radius: 10upx;
	box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
}
</style>
