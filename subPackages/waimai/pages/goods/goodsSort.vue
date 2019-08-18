<template>
	<div class="container">
		<div class="list-c" v-if="pageIndex === 0">
			<scroll-view class="list-l" :scroll-y="true">
				<div class="l-item" :class="{ active: index === tagIndex }" v-for="(item, index) in foods" :key="index" @click="categoryClick(item, index)">
					<span v-if="item.required == 1" class="required-category">必选</span>
					<img :src="item.icon" v-if="item.icon.length > 0" />
					<span>{{ item.name }}</span>
				</div>
			</scroll-view>
			<scroll-view class="list-r" :scroll-y="true">
				<div class="section">
					<span class="title">{{ spus.title }}</span>
				</div>
				<view class="sort-list"><dragSort :list="list" :props="props" @change="onDragSortChange"></dragSort></view>
			</scroll-view>
		</div>
		<div class="footer-c" @click="submit">保存</div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';
import dragSort from '@/components/drag-sort/index.vue';
import { sortRestaurantGoods } from '@/src/utils/api.js';

export default {
	data() {
		return {
			tagIndex: 0,
			pageIndex: 0,
			left: '40upx',
			stars: [1, 2, 3, 4],
			changeList: [],
			props: {
				label: 'name'
			},
			foodsList:[],
			list: []
		};
	},
	components: {
		dragSort
	},
	computed: {
		...mapState('shoppingCart', ['foods', 'spus'])
	},
	onShow() {
		this.foodsList = this.foods.slice(0);
		this.changeList = this.spus.list.slice(0);
		this.list = this.spus.list.slice(0);
		console.log(this.changeList);
		console.log(this.list)
	},
	methods: {
		...mapActions('shoppingCart', ['getMenuDataAction', 'setSpusAction', 'getCategoryMenuDataAction']),
		async categoryClick(item, index) {
			console.log('changeList',this.changeList)
			if (this.list != this.changeList) {
				let res = await sortRestaurantGoods({ data: this.changeList });
				this.$api.msg('商品排序成功');
				this.foodsList[this.tagIndex].spus = this.changeList;
				console.log('foodsList1',this.foodsList[this.tagIndex]);
			}
			this.tagIndex = index;
			console.log(this.foodsList);
			this.list = this.foodsList[index].spus.slice(0);
			this.changeList = this.foodsList[index].spus.slice(0);
			console.log(this.changeList);
		},

		onDragSortChange(e) {
			// frontData 插到谁后面
			// data 操作的数据
			if (e.frontData == undefined) {
				addIndex = 0;
			}
			var deleteIndex=0, addIndex=0;
			this.list.map((item, index) => {
				if (item.id == e.data.id) {
					deleteIndex = index;
				}
				if (e.frontData != undefined && item.id == e.frontData.id) {
					addIndex = index+1;
				}
			});
			console.log(deleteIndex,addIndex);
			this.changeList.splice(deleteIndex, 1);
			this.changeList.splice(addIndex, 0, e.data);
			this.changeList.map(item=>{
				console.log(item.name);
			})
		},
		async submit() {
			// console.log(this.changeList);return false;
			let res = await sortRestaurantGoods({ data: this.changeList });
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

<style lang="scss">
@import '@/static/style/mixin.scss';
.container {
	display: flex;
	flex-direction: column;
	background-color: $page-bgcolor;
	position: relative;
	.header-c {
		width: 100%;
		display: flex;
		flex-direction: column;
		position: fixed;
		.header {
			width: 100%;
			display: flex;
			align-items: center;
			background-color: #333;
			height: 150upx;
			.h-l {
				display: flex;
				margin-left: 16upx;
				.shop-logo {
					height: 120upx;
					width: 120upx;
					border-radius: 8upx;
				}
			}
			.h-r {
				display: flex;
				flex-direction: column;
				margin: 0 20upx;
				.r-t {
					display: flex;
					align-items: center;
					.t-l {
						font-size: 20upx;
						color: white;
					}
					.s-l {
						margin: 0 20upx;
						width: 2upx;
						height: 30upx;
						background-color: white;
					}
					.t-m {
						font-size: 20upx;
						color: white;
					}
					.s-r {
						margin: 0 20upx;
						width: 2upx;
						height: 30upx;
						background-color: white;
					}
					.t-r {
						font-size: 20upx;
						color: white;
					}
				}
				.r-m {
					font-size: 20upx;
					color: white;
					line-height: 30upx;
					height: 30upx;
					overflow: hidden;
					margin: 10upx 0;
				}
				.r-b {
					display: flex;
					align-items: center;
					.b-l {
						width: 30upx;
						height: 30upx;
						background-color: #ff616d;
						align-items: center;
						justify-content: center;
						text-align: center;
						color: white;
						font-size: 20upx;
					}
					.b-r {
						font-size: 20upx;
						color: white;
						flex: 1;
						margin-left: 20upx;
					}
					i {
						font-size: 20upx;
						color: white;
					}
				}
			}
		}
		.cate-c {
			display: flex;
			height: 70upx;
			align-items: center;
			border-bottom: 2upx solid $spLine-color;
			position: relative;
			transition: all 0.2s;
			.c-l {
				font-size: 32upx;
				color: $textBlack-color;
				margin-left: 40upx;
			}
			.c-m {
				font-size: 32upx;
				color: $textBlack-color;
				margin-left: 80upx;
			}
			.c-r {
				font-size: 32upx;
				color: $textBlack-color;
				margin-left: 80upx;
			}
			.line {
				position: absolute;
				width: 60upx;
				height: 4upx;
				background-color: $theme-color;
				left: 40upx;
				bottom: 2upx;
				transition: left 0.2s;
			}
		}
	}
	.list-c {
		width: 100%;
		display: flex;
		bottom: 90upx;
		.list-l {
			display: flex;
			flex-direction: column;
			width: 160upx;
			background-color: $page-bgcolor;
			.add-category {
				font-size: 24upx;
				text-align: center;
				height: 80upx;
				line-height: 80upx;
				background-color: #0095d8;
				color: #ffffff;
			}
			.l-item {
				display: flex;
				width: 160upx;
				position: relative;
				align-items: center;
				justify-content: center;
				padding:24upx 20upx;
				box-sizing: border-box;
				position: relative;
				.required-category {
					position: absolute;
					top: 0upx;
					left: 0upx;
					font-size: 14upx;
					color: #ff616d;
				}
				img {
					width: 30upx;
					height: 30upx;
					background-size: cover;
					border-radius: 15upx;
				}
				span {
					font-size: 24upx;
					color: $textDarkGray-color;
					margin-left: 10upx;
				}
				.count {
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: $mtRed-color;
					width: 30upx;
					height: 30upx;
					border-radius: 15upx;
					right: 0;
					top: 6upx;
					position: absolute;
					font-size: 20upx;
					color: white;
				}
			}
			.active {
				background-color: white;
				span {
					color: #000;
					font-weight: bold;
				}
			}
		}
		.list-r {
			display: flex;
			flex-direction: column;
			flex: 1;
			background-color: white;
			.section {
				display: flex;
				height: 70upx;
				justify-content: space-between;
				align-items: center;
				margin-left: 20upx;
				span {
					font-size: 28upx;
					color: $textBlack-color;
				}
				.edit-category {
					margin-right: 16upx;
					padding: 4upx 20upx;
					border-radius: 4upx;
					color: #0095d8;
					font-size: 22upx;
					border: 1upx solid #0095d8;
				}
			}
			.item-list {
				display: flex;
				margin: 0 20upx;
				flex-direction: column;
				.item {
					display: flex;
					margin-bottom: 30upx;
					.item-l {
						img {
							width: 160upx;
							height: 160upx;
							background-size: cover;
						}
					}
					.item-r {
						display: flex;
						flex-direction: column;
						margin-left: 20upx;
						justify-content: space-between;
						flex: 1;
						.title {
							font-size: 28upx;
							color: $textBlack-color;
							font-weight: bold;
							overflow: hidden;
							line-height: 30upx;
							height: 30upx;
						}
						.sub-title {
							font-size: 20upx;
							color: $textDarkGray-color;
							line-height: 30upx;
							overflow: hidden;
							height: 30upx;
							margin-top: 10upx;
						}
						.sale-num {
							font-size: 20upx;
							color: $textDarkGray-color;
							margin-top: 10upx;
						}
						.r-t {
							display: flex;
							align-items: flex-end;
							justify-content: space-between;
							.price {
								font-size: 32upx;
								color: $mtRed-color;
								font-weight: bold;
							}
							.sku {
								display: flex;
								align-items: center;
								justify-content: center;
								background-color: $theme-color;
								padding: 8upx 12upx;
								border-radius: 25upx;
								position: relative;
								span {
									font-size: 20upx;
									color: $textBlack-color;
								}
								.count {
									width: 30upx;
									height: 30upx;
									background-color: $mtRed-color;
									display: flex;
									align-items: center;
									justify-content: center;
									position: absolute;
									color: white;
									font-size: 20upx;
									right: 0;
									top: -14upx;
									border-radius: 15upx;
								}
							}
							.add-item {
								display: flex;
								align-items: center;
								font-size: 20upx;
								color: #0095d8;
								.add-l {
									margin-right: 16upx;
									padding: 4upx 20upx;
									border-radius: 4upx;
									border: 1upx solid #0095d8;
								}
								.add-r {
									padding: 4upx 20upx;
									border-radius: 4upx;
									border: 1upx solid #0095d8;
								}
							}
						}
						.tags-c {
							display: flex;
							align-items: center;
							margin-top: 10upx;
							flex-wrap: wrap;
							img {
								width: 60upx;
								height: 30upx;
								background-size: cover;
							}
						}
					}
				}
			}
		}
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			color: transparent;
		}
	}
	.comment-c {
		.comment-sc {
			display: flex;
			position: fixed;
			top: 310upx;
			flex-direction: column;
			height: 100%;
			.comment-header {
				margin-top: 20upx;
				display: flex;
				align-items: center;
				height: 140upx;
				background-color: white;
				width: 100%;
				justify-content: space-around;
				.h-l {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.score {
						font-size: 50upx;
						color: $theme-color;
					}
					.title {
						font-size: 20upx;
						color: $textBlack-color;
					}
				}
				.h-m {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-around;
					.m-t {
						display: flex;
						align-items: center;
						.title {
							font-size: 20upx;
							color: $textBlack-color;
						}
						.star-c {
							display: flex;
							align-items: center;
							margin: 0 30upx;
							i {
								color: $theme-color;
								font-size: 24upx;
							}
						}
						.score {
							font-size: 24upx;
							color: $theme-color;
						}
					}
					.m-b {
						@extend .m-t;
					}
				}
				.line {
					width: 2upx;
					height: 80upx;
					background-color: $spLine-color;
					margin-left: 30upx;
				}
				.h-r {
					@extend .h-l;
					.score {
						color: $textDarkGray-color;
					}
				}
			}
			.comment-tags {
				margin-top: 20upx;
				display: flex;
				background-color: white;
				padding: 30upx;
				width: auto;
				flex-wrap: wrap;
				padding-top: 12upx;
				.tag-item {
					background-color: white;
					border: 2upx solid $spLine-color;
					padding: 0 16upx;
					margin-right: 20upx;
					margin-top: 18upx;
					align-items: center;
					justify-content: center;
					line-height: 50upx;
					span {
						font-size: 24upx;
						color: $textDarkGray-color;
					}
				}
				.tag-item:first-child {
					background-color: #fff7e2;
					border: 2upx solid#F0EDBA;
					span {
						color: #e7ac40;
					}
				}
			}
			.comment-list {
				margin-top: 20upx;
				display: flex;
				flex-direction: column;
				.item-c {
					display: flex;
					overflow: hidden;
					background-color: white;
					border-bottom: 2upx solid $spLine-color;
					.item-l {
						margin-left: 30upx;
						margin-top: 20upx;
						img {
							width: 70upx;
							height: 70upx;
							border-radius: 35upx;
						}
					}
					.item-r {
						display: flex;
						flex-direction: column;
						background-color: white;
						margin-left: 20upx;
						margin-top: 20upx;
						margin-right: 30upx;
						flex: 1;
						.h-r {
							display: flex;
							flex-direction: column;
							flex: 1;
							.r-t {
								display: flex;
								justify-content: space-between;
								.name {
									font-size: 32upx;
									color: $textBlack-color;
								}
								.date {
									font-size: 20upx;
									color: $textGray-color;
								}
							}
							.r-b {
								display: flex;
								align-items: center;
								.b-l {
									display: flex;
									align-items: center;
									i {
										font-size: 20upx;
										color: $theme-color;
									}
								}
								.b-r {
									font-size: 20upx;
									color: $textGray-color;
									margin-left: 20upx;
								}
							}
						}
						.r-comtent {
							display: flex;
							margin-top: 10upx;
							span {
								font-size: 24upx;
								color: $textBlack-color;
							}
						}
						.r-imgs {
							display: flex;
							flex-direction: row;
							margin-top: 10upx;
							.single {
								margin-top: 10upx;
								img {
									width: 300upx;
									height: 300upx;
								}
							}
							.double {
								img {
									width: 160upx;
									height: 160upx;
									margin-right: 16upx;
								}
							}
							.four {
								display: flex;
								width: 300upx;
								flex-wrap: wrap;
								justify-content: space-between;
								img {
									width: 140upx;
									height: 140upx;
									margin: 10upx 0;
								}
							}
						}
						.food-name {
							display: flex;
							flex-direction: column;
							margin-top: 10upx;
							.name-t {
								display: flex;
								i {
									font-size: 24upx;
									color: $textGray-color;
								}
								span {
									font-size: 24upx;
									color: #777d8a;
									margin-left: 20upx;
								}
							}
							.name-b {
								@extend .name-t;
								margin-top: 8upx;
								span {
									color: $textBlack-color;
								}
							}
						}
						.reply-c {
							display: flex;
							background-color: #f4f4f4;
							padding: 20upx 14upx;
							margin-top: 20upx;
							margin-bottom: 30upx;
							span {
								color: $textGray-color;
								font-size: 24upx;
							}
						}
					}
				}
				.item-c:last-child {
					margin-bottom: 220upx;
				}
			}
		}
	}
	.shop-info {
		display: flex;
		position: fixed;
		top: 310upx;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.address {
			display: flex;
			align-items: center;
			height: 70upx;
			margin-top: 20upx;
			background-color: white;
			padding: 0 20upx;
			.call-phone {
				text-decoration: none;
			}
			i {
				font-size: 38upx;
				color: $textGray-color;
			}
			i:last-child {
				color: $textBlack-color;
			}
			span {
				flex: 1;
				margin: 0 20upx;
				font-size: 24upx;
				color: $textBlack-color;
			}
		}
		.archive {
			@extend .address;
			i:last-child {
				font-size: 24upx;
				color: $textGray-color;
			}
		}
		.delivery {
			display: flex;
			flex-direction: column;
			margin-top: 20upx;
			background-color: white;
			padding: 0 16upx;
			.top {
				display: flex;
				align-items: center;
				height: 80upx;
				padding-left: 10upx;
				border-bottom: 2upx solid $spLine-color;
				i {
					font-size: 32upx;
					color: $textGray-color;
				}
				span {
					font-size: 24upx;
					color: $textBlack-color;
					margin: 0 20upx;
				}
			}
			.btm {
				@extend .top;
				border-bottom: 0 solid $spLine-color;
			}
		}
		.service {
			display: flex;
			flex-direction: column;
			margin-top: 20upx;
			background-color: white;
			padding: 0 16upx;
			.top {
				display: flex;
				align-items: center;
				height: 80upx;
				padding-left: 14upx;
				border-bottom: 2upx solid $spLine-color;
				i {
					font-size: 28upx;
					color: $textGray-color;
				}
				.l {
					font-size: 24upx;
					color: $textBlack-color;
					margin-left: 20upx;
				}
				.k {
					width: 30upx;
					height: 30upx;
					align-items: center;
					justify-content: center;
					display: flex;
					text-align: center;
					border: 2upx solid #0095d8;
					color: #0095d8;
					font-size: 20upx;
					margin-left: 10upx;
				}
				.v {
					font-size: 24upx;
					color: $textBlack-color;
					margin-left: 10upx;
				}
			}
			.discounts {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding: 0 16upx;
				padding-bottom: 20upx;
				.item {
					display: flex;
					align-items: center;
					height: 60upx;
					margin-top: 10upx;
					img {
						width: 30upx;
						height: 30upx;
					}
					span {
						font-size: 24upx;
						color: $textBlack-color;
						margin-left: 20upx;
					}
				}
			}
		}
	}
	.footer-c {
		@include btn(6upx);
		@include cl();
		position: fixed;
		bottom:0;
	}
	.sku-modal {
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.3);
		z-index: 996;
		flex-direction: column;
		display: flex;
		justify-content: center;
		align-items: center;
		.modal-c {
			display: flex;
			flex-direction: column;
			background-color: white;
			width: 90%;
			margin-right: 40upx;
			margin-left: 40upx;
			border-radius: 10upx;
			.header {
				display: flex;
				flex-direction: column;
				.title {
					font-size: 32upx;
					color: $textDarkGray-color;
					align-self: center;
					margin-top: 20upx;
				}
				.attrs {
					display: flex;
					flex-direction: column;
					margin: 0 20upx;
					margin-top: 20upx;
					.name {
						font-size: 28upx;
						color: $textBlack-color;
					}
					.sku {
						display: flex;
						flex-direction: row;
						width: 100%;
						flex-wrap: wrap;
						margin-bottom: 20upx;
						.item {
							display: flex;
							align-items: center;
							justify-content: center;
							width: 140upx;
							height: 50upx;
							border: 2upx solid $spLine-color;
							border-radius: 4upx;
							margin-top: 20upx;
							margin-right: 20upx;
							span {
								font-size: 24upx;
								color: $textBlack-color;
							}
						}
						.selected {
							background-color: #fff9f4;
							border: 2upx solid $theme-color;
							span {
								color: $theme-color;
							}
						}
					}
				}
			}
			.footer {
				display: flex;
				align-items: center;
				background-color: $page-bgcolor;
				height: 100upx;
				border-bottom-right-radius: 10upx;
				border-bottom-left-radius: 10upx;
				padding: 0 20upx;
				.f-l {
					display: flex;
					align-items: center;
					flex: 1;
					.price {
						font-size: 36upx;
						color: $mtRed-color;
						font-weight: bold;
					}
					.sku {
						font-size: 20upx;
						color: $textBlack-color;
						margin-left: 20upx;
					}
				}
				.f-r {
					display: flex;
					align-items: center;
					.shopping-c {
						display: flex;
						align-items: center;
						height: 60upx;
						border-radius: 30upx;
						padding: 0 20upx;
						background-color: $theme-color;
						i {
							font-size: 28upx;
							color: $textBlack-color;
						}
						span {
							font-size: 24upx;
							color: $textBlack-color;
							margin-left: 10upx;
						}
					}
					.add {
						display: flex;
						flex-direction: row;
						align-items: center;
						span {
							font-size: 24upx;
							color: $textDarkGray-color;
							margin: 0 20upx;
						}
					}
				}
			}
		}
		.cancle {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 40upx;
			width: 70upx;
			height: 70upx;
			border-radius: 35upx;
			background: rgba($color: #000000, $alpha: 0.5);
			border: 2upx solid $textGray-color;
			i {
				font-size: 32upx;
				color: white;
			}
		}
	}
	.previewModal {
		@extend .sku-modal;
		.modal-c {
			.header-p {
				display: flex;
				flex-direction: column;
				.item-img {
					width: 100%;
					height: 400upx;
					background-color: #e7ac40;
					border-top-left-radius: 10upx;
					border-top-right-radius: 10upx;
				}
				.title {
					font-size: 28upx;
					color: $textBlack-color;
					font-weight: bold;
					margin-left: 16upx;
					margin-top: 16upx;
				}
				.saled {
					display: flex;
					align-items: center;
					flex-direction: row;
					margin: 0 16upx;
					margin-top: 10upx;
					.l {
						font-size: 20upx;
						color: $textDarkGray-color;
					}
					.r {
						@extend .l;
						margin-left: 30upx;
					}
				}
				.tags-c {
					display: flex;
					align-items: center;
					margin: 0 16upx;
					margin-top: 10upx;
					flex-wrap: wrap;
					img {
						width: 60upx;
						height: 30upx;
						background-size: cover;
					}
				}
				.desc {
					font-size: 20upx;
					color: $textDarkGray-color;
					margin-left: 16upx;
					margin-top: 30upx;
					margin-bottom: 20upx;
				}
			}
			.footer-p {
				display: flex;
				align-items: center;
				height: 80upx;
				background-color: $page-bgcolor;
				padding: 0 20upx;
				border-bottom-left-radius: 10upx;
				border-bottom-right-radius: 10upx;
				.l {
					font-size: 36upx;
					color: $mtRed-color;
					flex: 1;
					font-weight: bold;
				}
				.r {
					display: flex;
					align-items: center;
					.add-c {
						display: flex;
						align-items: center;
						.c-l {
							display: flex;
							align-items: center;
						}
						span {
							font-size: 20upx;
							color: $textBlack-color;
							margin: 0 20upx;
						}
					}
					.attr {
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: $theme-color;
						padding: 8upx 12upx;
						border-radius: 25upx;
						position: relative;
						span {
							font-size: 20upx;
							color: $textBlack-color;
						}
						.count {
							width: 30upx;
							height: 30upx;
							background-color: $mtRed-color;
							display: flex;
							align-items: center;
							justify-content: center;
							position: absolute;
							color: white;
							font-size: 20upx;
							right: 0;
							top: -14upx;
							border-radius: 15upx;
						}
					}
				}
			}
		}
	}
}
</style>
