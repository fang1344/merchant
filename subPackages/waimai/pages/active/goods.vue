<template>
	<div class="container">
		<view class="title">时间</view>
		<div class="list-c">
			<div class="item">
				<div class="item-l"><span class="sub-title">开始时间</span></div>
				<span>
					<picker mode="date" v-model="active.start_time_text" :start="startDate" :end="endDate" @change="bindStartDateChange">
						<view class="text">{{ active.start_time_text }}</view>
					</picker>
				</span>
				<i class="icon mt-arrow-right-o"></i>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">结束时间</span></div>
				<span>
					<picker mode="date" v-model="active.end_time_text" :start="startDate" :end="endDate" @change="bindEndDateChange">
						<view class="text">{{ active.end_time_text }}</view>
					</picker>
				</span>
				<i class="icon mt-arrow-right-o"></i>
			</div>
		</div>
		<view class="title">优惠</view>
		<div class="list-c">
			<div class="item">
				<div class="item-l"><span class="sub-title">活动类型</span></div>
				<div>
					<span class="active-type" :class="activeSelectClass(item)" @click="selectActive(item)" v-for="item in activeType" :key="item.id">{{ item.name }}</span>
				</div>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">每份</span></div>
				<div><input type="text" v-model="active.discount" placeholder="请填写规则" /></div>
				<i>{{discountUnit}}</i>
			</div>
			<div class="item">
				<div class="item-l"><span class="sub-title">活动总库存</span></div>
				<div><input type="text" v-model="active.all_amount" placeholder="请填写数量" /></div>
				<i>份</i>
			</div>

			<div class="item">
				<div class="item-l"><span class="sub-title">每日最多发放</span></div>
				<div><input type="text" v-model="active.day_amount" placeholder="请填写数量" /></div>
				<i>份</i>
			</div>
		</div>
		<div class="btn" v-if="id!=''" @click="activitySave">保存</div>
		<div class="btn" v-else @click="goodsSelect">下一步</div>
	</div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import {getActivityDetail,saveStoreGoodsActivity} from '@/src/utils/api.js'
export default {
	data() {
		return {
			id : '',
			goods_ids:'',
			activity:{},
			discountUnit:'元',
			activeType:[
				{
					'id':'1',
					'name':'特价',
				},
				{
					'id':'2',
					'name':'折扣'
				},
				{
					'id':'3',
					'name':'立减'
				},
			]
		};
	},
	computed: {
		...mapState('goodsActive', ['active']),
		startDate() {
			return this.getDate('start');
		},
		endDate() {
			return this.getDate('end');
		},
		
	},
	async onLoad(option) {
		if(option.id){
			this.id=option.id;
			
		}
	},
	async mounted() {
		if(this.id){
			let res = await getActivityDetail({id:this.id})
			if(res.errno==0){
				this.goods_ids = [res.data.store_goods_id]
				this.setDataAction(res.data);
				this.end_time_text = res.data.end_time_text;
			}
		}else{
			this.active.start_time_text = this.startDate;
			var date = this.active.start_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.active.start_time = parseInt(timestamp.toString().substr(0, 10));
			this.active.end_time_text = this.startDate;
			var date = this.active.end_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.active.end_time = parseInt(timestamp.toString().substr(0, 10)) + 86399;
		}
		if(this.active.type==2){
			this.discountUnit = '折';
		}
	},
	methods: {
		...mapActions('goodsActive', ['setDataAction']),
		selectActive(item){
			this.active.type=item.id;
			if(item.id==2){
				this.discountUnit = '折';
			}else{
				this.discountUnit = '元';
			}
		},
		activeSelectClass(item){
			return item.id==this.active.type ? 'active-select':'';
		},
		goodsSelect() {
			console.log(this.active);
			this.setDataAction(this.active);
			uni.navigateTo({
				url: '/subPackages/waimai/pages/active/goodsSelect'
			});
		},
		async activitySave() {
			var data = this.active;
			data.goods_ids = this.goods_ids;
			let res = await saveStoreGoodsActivity(data);
			this.$api.msg(res.message);
			if(res.errno==0){
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 800);
				
			}
		},
		getDate(type) {
			const date = new Date();
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();

			if (type === 'start') {
				year = year;
			} else if (type === 'end') {
				year = year + 2;
			}
			month = month > 9 ? month : '0' + month;
			day = day > 9 ? day : '0' + day;
			return `${year}-${month}-${day}`;
		},
		bindStartDateChange(e) {
			this.active.start_time_text = e.detail.value;
			var date = this.active.start_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.active.start_time = parseInt(timestamp.toString().substr(0, 10));
		},
		bindEndDateChange(e) {
			this.active.end_time_text = e.detail.value;
			var date = this.active.end_time_text.replace(/-/g, '/');
			var timestamp = new Date(date).getTime();
			this.active.end_time = parseInt(timestamp.toString().substr(0, 10)) + 86399;
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
		font-size: $font-lg;
		margin: 20upx 30upx;
		color: $font-color-dark;
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
			.active-type{
				border: 1px solid $font-color-dark;
				border-radius: 10upx;
				font-size: $font-medium;
				color:$font-color-base;
				margin-left: 20upx;
				padding: 0 10upx;
				
			}
			.active-select{
				background-color: $theme-color;
				color:#ffffff;
				border: 1px solid $theme-color
			}
			input {
				font-size: $font-base;
				color:$font-color-base;
				margin-left: 40upx;
				width: 150upx;
				text-align: right;
			}
			.item-l {
				display: flex;
				flex: 1;
				i {
					font-size: $font-sm;
					color: $font-color-light;
				}
				.sub-title {
					font-size: $font-base;
					color: $font-color-dark;
					margin-top: 6upx;
				}
			}
			.text{
				font-size: $font-base;
				color: $font-color-base;
			}
			i {
				font-size: $font-medium;
				color: $font-color-light;
				padding-left: 10upx;
				
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
