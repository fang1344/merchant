<!-- 商品列表组件 <pd-list :list="xx"></pd-list> -->
<template>
	<view class="pd-list">
		<view 
			v-for="(item,index) in list" :key="index"
			class="order-item" 
		>
			<view class="i-top b-b">
				<text class="time">{{item.created_at}}</text>
				<text class="state" :style="{color: item.stateTipColor}">{{item.state_text}}</text>
			</view>
			
			<scroll-view v-if="item.goods.length > 1" class="goods-box" scroll-x  @click="toDetail(item)">
				<view
					v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex"
					class="goods-item"
				>
					<image class="goods-img" :src="goodsItem.images[0]" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<view  
				v-if="item.goods.length === 1" 
				class="goods-box-single"
				v-for="(goodsItem, goodsIndex) in item.goods" :key="goodsIndex"
			>
				<image class="goods-img" :src="goodsItem.images[0]" mode="aspectFill"></image>
				<view class="right">
					<text class="title clamp">{{goodsItem.name}}</text>
					<text class="attr-box">{{goodsItem.attrs}}  x {{goodsItem.num}}</text>
					<text class="price">{{goodsItem.unit_price}}</text>
				</view>
			</view>
			
			<view class="price-box">
				共
				<text class="num">{{item.goods.length}}</text>
				件商品 实付款
				<text class="price">{{item.pay_money}}</text>
			</view>
			<view class="action-box b-t">
				<button class="action-btn recom" @click="print(item)">打印订单</button>
				<button class="action-btn recom" @click="toDetail(item)">查看订单</button>
			</view>
		</view>	
	</view>
</template>

<script>
	// #ifdef APP-PLUS
		const gp= uni.requireNativePlugin('Html5App-Gprinter'); 
	// #endif
	export default {
		props:{
			list: { // 数据列表
				type: Array,
				default(){
					return []
				}
			},
			storeData: { 
				type: Object
			}
		},
		methods:{
			toDetail(item){
				uni.navigateTo({
					url:'/subPackages/waimai/pages/order/detail?order_code='+item.order_code
				})
			},
			print(item){
				//打印小票
				// #ifdef APP-PLUS
				const _this=this;
				
				//制作小票格式， 
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				line={};
				line.text="七点校园";
				line.center="center";
				line.font="max";
				line.bottom="3";
				data.push(line); //每添加一个，代表一行字
				
				line={};  //每添加一个一行字之前,清空一下
				line.text="七点校园外卖单";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="店铺名称:"+this.storeData.name;
				line.center="left";
				line.font="bold";
				line.bottom="1";
				data.push(line);
				
				line={};  
				line.text="单号:"+item.order_code;
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				
				line={};  
				line.text="订单日期："+item.created_at;
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				
				//商品列表
				item.goods.map(goods =>{
								   
					line={};
					line.text=goods.name;
					line.center="left";
					line.font="normal";
					line.bottom="1";
					data.push(line);
					
					line={};
					line.title=["数量："+goods.num,"单价："+goods.unit_price,"金额："+goods.unit_price];
					line.left=[0,30,60];
					line.center="left";
					line.font="normal";
					line.bottom="2";
					data.push(line);
				})
				
				
									
				
				
				line={}; //清空一下
							
				line.text="------------------------------";
				line.center="left";
				line.font="normal";
				line.bottom="2";
				data.push(line);
				
				line={};
				line.text="数量：4 ,金额：￥"+item.pay_money;
				line.center="left";
				line.font="bold";
				line.bottom="1";
				data.push(line);
				
				line={};
				line.text="实收金额：￥"+item.pay_money;
				line.center="left";
				line.font="bold";
				line.bottom="2";
				data.push(line);
				
				
							
				//加入条型码
				line={};
				line.barcode=item.order_code.substr(8,13);
				line.type="CODE128";
				line.height="100";
				line.position="BELOW";
				line.width="2";
				line.center="center";
				line.bottom="2";
				data.push(line);
				
				//打印小票
				gp.Print({"printdata":data},result=>{
					_this.$api.msg(result.msg)
					if (result.state==1) {
						setTimeout(function() {
							uni.navigateTo({
								url:'../../subPackages/waimai/pages/store/printer'
							})
						}, 700);
					}
					
				});
				// #endif
				// #ifndef APP-PLUS
					this.$api.msg('请使用APP打印订单')
				// #endif	
				
			}
		}
	}
</script>

<style lang="scss">
	.order-item{
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-top: 16upx;
		.i-top{
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right:30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;
			.time{
				flex: 1;
			}
			.state{
				color: $theme-color;
			}
			.del-btn{
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;
				&:after{
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		/* 多条商品 */
		.goods-box{
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;
			.goods-item{
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}
			.goods-img{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		/* 单条商品 */
		.goods-box-single{
			display: flex;
			padding: 20upx 0;
			.goods-img{
				display: block;
				width: 120upx;
				height: 120upx;
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;
				.title{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}
				.attr-box{
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 12upx;
				}
				.price{
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					&:before{
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}
		
		.price-box{
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.num{
				margin: 0 8upx;
				color: $font-color-dark;
			}
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
				&:before{
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
		.action-box{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}
		.action-btn{
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;
			&:after{
				border-radius: 100px;
			}
			&.recom{
				background: #fff9f9;
				color: $theme-color;
				&:after{
					border-color: #f7bcc8;
				}
			}
		}
	}
</style>
