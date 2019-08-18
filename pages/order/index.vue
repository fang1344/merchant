<template>
	<view class="page-warp">
		<view class="navbar">
			<view class="nav-item" v-for="(tab, i) in navList" :key="i" :class="{'current':curIndex===i}" @click="changeTab(i)">{{tab.text}}</view>
		</view>
		
		<swiper class="swiper" :current="curIndex" @change="swiperChange">
			<!--全部 -->
			<swiper-item v-for="(nav,i) in navList" :key="i">
				<mescroll-item :i="i" :nav="nav" :storeData="storeData" :index="curIndex"></mescroll-item>
			</swiper-item>
			
			
		</swiper>
	</view>
</template>

<script>
	import MescrollItem from "./mescroll-swiper-item.vue";
	import { getRestaurantStoreDetail } from '@/src/utils/api.js';
	export default {
		components: {
			MescrollItem
		},
		data() {
			return {
				storeData:{},
				navList:  [{
						state: 1,
						text: '待处理',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '已接单',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '配送中',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 4,
						text: '已完成',
						loadingType: 'more',
						orderList: []
					},
					{
						state: -1,
						text: '已取消',
						loadingType: 'more',
						orderList: []
					}
				],
				curIndex: 0 // 当前tab的下标
			}
		},
		async onLoad() {
			let res = await getRestaurantStoreDetail({hasProduct:false});
			if(res.errno==-5){
				this.$api.msg(res.message);
				setTimeout(function(){
					uni.navigateTo({
						url:'../../subPackages/waimai/pages/me/login'
					})
				},700);
			}else if(res.errno==-15){
				this.$api.msg(res.message);
				setTimeout(function(){
					uni.navigateTo({
						url:'../../subPackages/waimai/pages/store/apply'
					})
				},700);
			}else if(res.errno==0){
				this.token=uni.getStorageSync('token');
				this.storeData = res.data;
			}else{
				this.$api.msg(res.message);
			}
		},
		methods: {
			// 轮播菜单
			swiperChange(e){
				this.changeTab(e.detail.current)
			},
			// 切换菜单
			changeTab(i){
				this.curIndex = i
			}
		}
	}
</script>

<style>
	/* 需固定高度 */
	page,
	.page-warp,
	.swiper{
		background-color: $page-color-base;;
		height: 100%;
	}
	
	.top-warp{
		z-index: 9990;
		position: fixed;
		top: --window-top; /* css变量 */
		left: 0;
		width: 100%;
		height: 60upx;
		background-color: white;
		text-align: center;
		border-bottom: 1upx solid #ddd;
	}
	.top-warp view{
		display: inline-block;
		width: 22%;
		line-height: 60upx;
		font-size: 28upx;
	}
	.top-warp .active{
		border-bottom: 2upx solid #FF6990;
		color: #FF6990;
	}
</style>
<style lang="scss">
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 14px;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $theme-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $theme-color;
				}
			}
		}
	}
</style>
