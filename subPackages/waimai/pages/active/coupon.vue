<template>
	<div class="container">
		<view class="title">时间</view>
		<div class="list-c">
			<div class="item">
				<div class="item-l"><span class="sub-title">开始时间</span></div>
				<span>
					<picker mode="date" :value="start_time_text" :start="startDate" :end="endDate" @change="bindStartDateChange">
						<view class="text">{{ start_time_text }}</view>
					</picker>
				</span>
				<i class="icon mt-arrow-right-o"></i>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">结束时间</span></div>
				<span>
					<picker mode="date" :value="end_time_text" :start="startDate" :end="endDate" @change="bindEndDateChange">
						<view class="text">{{ end_time_text }}</view>
					</picker>
				</span>
				<i class="icon mt-arrow-right-o"></i>
			</div>
		</div>
		<view class="title">规则</view>
		<div class="list-c">
			<div class="item">
				<div class="item-l"><span class="sub-title">红包金额</span></div>
				<span><input type="text" v-model="coupon.discount" placeholder="请填写金额" /></span>
				<i>元</i>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">使用门槛</span></div>
				<span><input type="text" v-model="coupon.money" placeholder="请填写金额" /></span>
				<i>元</i>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">有效期</span></div>
				<span>
					<picker mode="selector" class="selector" range-key="value" :range="valid_day" @change="bindValdDayChange">
						<view class="text">{{ valid_day_text }}</view>
					</picker>
				</span>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">每日发放</span></div>
				<span><input type="text" v-model="coupon.day_amount" placeholder="请填写数量" /></span>
				<i>份</i>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">与其他活动同享</span></div>
				<i class="icon mt-arrow-right-o"><switch color="#288bf5" :checked="shareChecked" @change="shareChange" /></i>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">状态</span></div>
				<i class="icon mt-arrow-right-o"><switch color="#288bf5" :checked="statusChecked" @change="statusChange" /></i>
			</div>
		</div>
		<div class="btn" @click="confirm">立即创建</div>
	</div>
</template>

<script>
import { getStoreCoupon, saveStoreCoupon } from '@/src/utils/api.js';

export default {
	data() {
		return {
			coupon:{},
			start_time_text: '请选择',
			end_time_text: '请选择',
			valid_day: [
				{
					key: '5',
					value: '5天'
				},
				{
					key: '10',
					value: '10天'
				},
				{
					key: '15',
					value: '15天'
				}
			],
			valid_day_text: '请选择有效期'
		};
	},
	computed: {
		statusChecked() {
			return this.coupon.status==1 ? true :false;
		},
		shareChecked() {
			return this.coupon.share==1 ? true : false;
		},
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		}
	},
	async mounted() {
		let res = await getStoreCoupon();
		this.coupon = res.data;
		if (this.coupon.valid_day) {
			this.valid_day.map(item => {
				if (item.key == this.coupon.valid_day) {
					this.valid_day_text = item.value;
				}
			});
		}
		if (!this.coupon.start_time_text){
			this.start_time_text= this.startDate;
			var date = this.start_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.coupon.start_time = timestamp.toString().substr(0, 10);
		}else{
			this.start_time_text =  this.coupon.start_time_text
		}
		if (!this.coupon.end_time_text){
			this.end_time_text = this.startDate;
			var date = this.start_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.coupon.end_time = parseInt(timestamp.toString().substr(0, 10))+86399;
		}else{
			this.end_time_text = this.coupon.end_time_text
		}
		
	},
	methods: {
		bindValdDayChange(e) {
			console.log(e);
			this.valid_day_text = this.valid_day[e.detail.value].value;

			this.coupon.valid_day = this.valid_day[e.detail.value].key;
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year;
			} else if (type === 'end') {
				year = year +2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindStartDateChange(e) {
			this.start_time_text = e.detail.value;
			console.log('start_time_text',this.start_time_text)
			var date = this.start_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.coupon.start_time = parseInt(timestamp.toString().substr(0, 10));
		},
		bindEndDateChange(e) {
			this.end_time_text = e.detail.value;
			console.log('end_time_text',this.end_time_text)
			
			var date = this.end_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.coupon.end_time = parseInt(timestamp.toString().substr(0, 10))+86399;
		},
		shareChange(e) {
			this.coupon.share = e.detail.value == true ? 1 : 0;
		},
		statusChange(e) {
			this.coupon.status = e.detail.value == true ? 1 : 0;
		},
		async confirm() {
			let res = await saveStoreCoupon(this.coupon);
			this.$api.msg(res.message);
			if (res.errno == 0) {
				setTimeout(() => {
					uni.navigateBack();
				}, 800);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
@import '@/common/css/global.scss';
@import '@/static/style/mixin.scss';
page {
	background: #f0f0f0;
}
.container {
	.title {
		font-size: 32upx;
	    color: $font-color-dark;
		margin: 20upx 30upx;
	}
	.list-c {
		display: flex;
		flex-direction: column;
		margin-top: 20upx;
		background-color: white;
		.item {
			display: flex;
			align-items: center;
			height: 88upx;
			border-bottom: 2upx solid $spLine-color;
			padding: 0 30upx;
			.item-l {
				display: flex;
				flex: 1;
				i {
					font-size:26upx;
					color: $font-color-base;
				}
				.sub-title {
					font-size: 28upx;
					color: $font-color-dark;
					margin-top: 6upx;
				}
			}
			input {
				font-size: $font-base;
				margin-left: 40upx;
				width: 150upx;
				color:$font-color-base;
				text-align: right;
			}
			.text ,span {
				font-size: $font-base;
				color: $font-color-base;
			}
			i {
				font-size: $font-medium;
				color: $font-color-light;
				padding-left: 10upx;
				
			}
			switch{
				transform:scale(0.8)
			}
		}
		.item:last-child {
			border-bottom: 0upx solid $spLine-color;
		}
	}
	.btn {
		@include btn();
	}
}
</style>
