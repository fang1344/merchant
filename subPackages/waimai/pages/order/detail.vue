<template>
  <view class="container">
    <view class="header-c">
      <view class="delivery">
        <view class="address-c" >
          <i class="icon mt-location-s"></i>
          <view class="address" >
            <span class="address-info">{{orderData.address}} </span>
            <span class="user-info">{{orderData.nickname}} {{orderData.gender}}  {{orderData.phone}}</span>
          </view>
        </view>
        <view class="line-sp"></view>
        <view class="delivery-time">
          <i class="icon mt-clock-s"></i>
          <view class="content">
            <span class="c-l">{{orderData.distribution_text}}</span>
            <span class="c-r">{{orderData.distribution_time}}</span>
          </view>
          <i class="icon mt-arrow-right-o" :style="{fontSize: 28 + 'upx', color: '#999'}"></i>
        </view>
      </view>
      
    </view>
    <view class="item-list">
      <view class="section">
        <img :src="orderData.store_image_url" >
        <span>{{orderData.store_name}}</span>
        <!-- <text class="tag">商家自配</text> -->
      </view>
      <view class="list">
        <view class="item" v-for="(item, index) in orderData.goods" :key="index">
          <img :src="item.images[0]">
          <view class="item-r">
            <view class="r-t">
              <span>{{item.name}}</span>
              <span>￥{{item.price}}</span>
            </view>
            <span>x{{item.num}}</span>
          </view>
        </view>
      </view>
      <view class="footer">
        <!-- <view class="fold">
          <span>展开更多</span>
          <i class="icon mt-arrow-down-o"></i>
        </view> -->
        <view class="package-cast">
          <span>餐盒费</span>
          <span>￥{{orderData.meal_box_fee}}</span>
        </view>
        <view class="delivery-cast">
          <span>配送费</span>
          <span>￥{{orderData.distribution_fee}}</span>
        </view>
        <sep-line></sep-line> 
        <view class="discount" v-if="orderData.reduce_money>0">
          <view class="item" >
            <img src="http://p0.meituan.net/xianfu/f8bc8dffdbc805878aa3801a33f563cd1001.png">
            <span class="name">满减活动</span>
            <span class="info">-￥{{orderData.reduce_money}}</span>
          </view>
				<view class="item" v-if="orderData.red_packet_price>0">
            <img src="http://p0.meituan.net/xianfu/f8bc8dffdbc805878aa3801a33f563cd1001.png">
            <span class="name">红包优惠</span>
            <span class="info">-￥{{orderData.red_packet_price}}</span>
          </view>
        </view>
        <!-- <view class="red-packet" @click="redPacketClick">
          <span class="l">红包</span>
          <view class="r">
            <span>4张可用</span>
            <i class="icon mt-arrow-right-o"></i>
          </view>
        </view>
        <view class="coupon" @click="couponClick">
          <span class="l">代金券</span>
          <view class="r">
            <span>10张可用</span>
            <i class="icon mt-arrow-right-o"></i>
          </view>
        </view> -->
        <sep-line></sep-line> 
        <view class="totle-price">
          <span class="l" v-if="orderData.reduce_money">已优惠￥{{orderData.reduce_money}}</span>
          <span class="m">小计</span>
          <span class="r">￥{{orderData.pay_money}}</span>
        </view>
      </view>
    </view>
    <!-- <view class="privacy-c">
      <view class="top">
        <view class="t-l">
          <i class="icon mt-lock-o" :style="{color: '#434343', 'font-size': 32 + 'upx'}"></i>
          <span>{{privacy_service.privacy_title}}</span>
          <i class="icon mt-help-o" :style="{color: '#999', 'font-size': 24 + 'upx'}"></i>
        </view>
        <switch bindchange="switch2Change"/>
      </view>
      <span>{{privacy_service.privacy_close_desc}}</span>
    </view> -->
		
    <view class="bottom-c">
      <view class="b-top">
        <span>支付方式</span>
        <span>在线支付</span>
      </view>
			<view class="b-top">
			  <span>支付状态</span>
			  <span>{{orderData.pay_state==1 ? '已支付' : '未支付'}}</span>
			</view>
			<view class="b-top">
			  <span>订单时间</span>
			  <span>{{orderData.created_at}}</span>
			</view>
      <view class="b-mid" >
        <span class="mid-l">备注</span>
        <view class="mid-r">
          <span>{{remarkText}}</span>
          <!-- <i class="icon mt-arrow-right-o"></i> -->
        </view>
      </view>
      <view class="b-btm">
        <span class="b-l">餐具数量</span>
        <view class="b-r">
          <i class="icon mt-leaf-o" :style="{color: '#00CB91', 'font-size': 38 + 'upx'}"></i>
          <span class="s-l">一起为环保助力</span>
					<span class="s-r">{{orderData.tableware_text}}</span>
          <!-- <picker class="picker" mode="selector" :range="tablewareArr" @change="tablewareChange">
            <view>
              <span class="s-r">{{tablewareText}}</span>
              <i class="icon mt-arrow-right-o" :style="{color: '#999', 'font-size': 28 + 'upx'}"></i>
            </view>
          </picker> -->
        </view>
      </view>
			
    </view>
		<view class="pay-btn" @click="disposeOrder">
		  <view class="top">
		    <span class="s-l">{{disposeText}}</span>
		    <!-- <span class="s-m">￥{{orderData.pay_money}}</span>
		    <span class="s-r">已优惠￥{{orderData.reduce_money}}</span> -->
		  </view>
		</view>
  </view>
</template>

<script>
import sepLine from "@/components/sep-line";
import {appName} from "@/config/env.js";
import {getUserOrderData} from '@/src/utils/api.js'
import util from '@/src/utils/util'
import {openLocation} from '@/src/utils/wxapi'
import {getUserOrderDetail,restaurantOrderPicking} from '@/src/utils/api'
import {mapState, mapMutations, mapActions, mapGetters} from "vuex"

export default {
  data() {
    return {
      orderData: {},
      addressInfo: {},
      arrivalInfo: {},
      foodList: [],
      privacy_service: {},
      remark_field: {},
      tabIndex: 0,
      pickData: {},
      tablewareArr: [],
			tablewareText:'未选择',
			tableware:0,
			gateway: 'mp',
			prepay:{},
    }
  },
  computed: {
  	disposeText(){
			if(this.orderData.order_state==1){
				return '确认接单';
			}else if(this.orderData.order_state==2){
				return '开始配送';
			}else if(this.orderData.order_state==3){
				return '确认送达';
			}
		},
		remarkText(){
			let remarkT = JSON.parse(this.orderData.remark);
			var remark = remarkT.remark;
			if (remarkT.tags.length>0) {
				this.orderData.remark.tags.map(res=>{
					remark += res.value;
				})
			} 
			return remark;
		},
  },
  components: {
    sepLine
  },
	async onLoad(e) {
		var userOrderData = await getUserOrderDetail({order_code:e.order_code});
		this.orderData = userOrderData.data;
	},
  methods: {
		callPayOrder() {
			let that = this;
			uni.getProvider({
				service: 'oauth',
				success: async function (res) {
						console.log(res)
						if (~res.provider.indexOf('weixin')) {
							if(Object.keys(that.userInfo).length==0){
								that.setUserInfoAction('weixin')	
							}
							this.gateway='mini'
						}
						that.payOrder()
				},
			})
		},
		async disposeOrder(){
			if(this.orderData.order_state==1){
				let res = await restaurantOrderPicking({order_code:this.orderData.order_code});
			}else if(this.orderData.order_state==2){
				let res = await restaurantOrderDistribution({order_code:this.orderData.order_code});		
			}
			if(res.errno==0){
				uni.navigateTo({
					url:'/subPackages/waimai/pages/order/index'
				})
			}else{
				this.$api.msg(res.message);
				uni.navigateTo({
					url:'/subPackages/waimai/pages/order/index'
				})
			}
		}
  },
  async mounted() {
// 		var arrivalInfo = await getRestaurantArrivalInfo();
// 		// this.addressInfo = address.data;
// 		this.setDefaultAddressAction(address.data)
// 		this.arrivalInfo = arrivalInfo.data;
//     this.pickData = orderData.pick.data.address_info
//     this.tablewareArr = this.itemData.diners_option.map(item => item.description)
//     this.foodList = this.shopInfo.selectedArr
  },
}
</script>

<style lang="scss" scoped>
@import '@/common/css/global.scss';
.container {
  display: flex;
  flex-direction: column;
  background-color: #F9F9F9;
  .header-c {
    display: flex;
    flex-direction: column;
    margin: 20upx;
    background-color: white;
    .tab-c {
      display: flex;
      height: 88upx;
      align-items: center;
      background-color: white;
      .left {
        align-items: center;
        justify-content: center;
        display: flex;
        flex: 1;
        font-size: 32upx;
        color: $textBlack-color;
        height: 88upx;
      }
      .right {
        @extend .left;
        background-color: $page-bgcolor;
      }
    }
    .delivery {
      display: flex;
      background-color: white;
      flex-direction: column;
      .address-c {
        display: flex;
        background-color: white;
        padding: 20upx 0;
        i {
          font-size: 36upx;
          margin: 20upx;
          color: #434343;
        }
        .address {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          flex: 1;
          .address-info {
            font-size: 32upx;
            color: $textBlack-color;
          }
          .user-info {
            font-size: 24upx;
            color: $textDarkGray-color;
          }
        }
      }
      .line-sp {
        height: 2upx;
        background-color: $spLine-color;
        flex: 1;
        margin: 0 20upx;
      }
      .delivery-time {
        display: flex;
        align-items: center;
        background-color: white;
        padding: 0 20upx;
        i {
          font-size: 28upx;
          color: $textBlack-color;
        }
        .content {
          display: flex;
          align-items: center;
          flex: 1;
          margin: 20upx;
          .c-l {
            font-size: 32upx;
            color: $textBlack-color;
          }
          .c-r {
            font-size: 24upx;
            color: #5584E2;
            margin-left: 20upx;
          }
        }
      }
    }
    .pick {
      display: flex;
      flex-direction: column;
      background-color: white;
      padding: 30upx;
      .title {
        font-size: 28upx;
        color: $textBlack-color;
      }
      .address {
        font-size: 36upx;
        color: $textBlack-color;
        font-weight: bold;
        margin-top: 10upx;
      }
      .map {
        display: flex;
        align-items: center;
        margin-top: 20upx;
        .distance {
          font-size: 28upx;
          color: #000;
        }
        .line {
          width: 2upx;
          height: 20upx;
          background-color: $textGray-color;
          margin: 0 16upx;
        }
        .btn {
          font-size: 28upx;
          color: #2F84E9;
        }
      }
      .time {
        display: flex;
        align-items: center;
        border-top: 2upx solid $spLine-color;
        border-bottom: 2upx solid $spLine-color;
        margin: 30upx 0;
        height: 140upx;
        .l {
          display: flex;
          flex-direction: column;
          flex: 1;
          .l-t {
            font-size: 24upx;
            color: $textDarkGray-color;
          }
          .l-b {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10upx;
            span {
              font-size: 24upx;
              color: #000;
            }
            i {
              font-size: 28upx;
              color: $textGray-color;
              margin-left: 10upx;
            }
          }
        }
        .line {
          width: 2upx;
          height: 100upx;
          background-color: $spLine-color;
        }
        .r {
          display: flex;
          flex-direction: column;
          flex: 1;
          margin-left: 30upx;
          .r-t {
            font-size: 24upx;
            color: $textDarkGray-color;
          }
          .r-b {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-top: 10upx;
            span {
              font-size: 24upx;
              color: #000;
            }
            i {
              font-size: 28upx;
              color: $textGray-color;
              margin-left: 10upx;
            }
          }
        }
      }
      .protocol {
        display: flex;
        align-items: center;
        i {
          font-size: 36upx;
          color: $theme-color;
        }
        span {
          font-size: 28upx;
          color: $textBlack-color;
          margin-left: 30upx;
        }
        text {
          font-size: 28upx;
          color: #626381;
        }
      }
    }
  }
  .item-list {
    display: flex;
    flex-direction: column;
    margin: 0 20upx;
    background-color: white;
    .section {
      display: flex;
      align-items: center;
      align-items: center;
      height: 88upx;
      padding: 0 20upx;
      img {
        width: 40upx;
        height: 40upx;
        border-radius: 20upx;
      }
      span {
        font-size: 28upx;
        color: $textDarkGray-color;
        flex: 1;
        margin-left: 20upx;
      }
      text {
        color: $textBlack-color;
        font-size: 20upx;
        padding: 3upx 6upx;
        border: 2upx solid $textBlack-color;
      }
    }
    .list {
      display: flex;
      flex-direction: column;
      background-color: white;
      .item {
        display: flex;
        height: 120upx;
        flex: 1;
        background-color: $page-bgcolor;
        margin-bottom: 10upx;
        padding-top: 20upx;
        img {
          width: 100upx;
          height: 100upx;
          margin-left: 20upx;
        }
        .item-r {
          display: flex;
          flex: 1;
          flex-direction: column;
          margin: 0 20upx;
          .r-t {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 28upx;
              color: $textBlack-color;
            }
          }
          span {
            font-size: 20upx;
              color: $textDarkGray-color;
          }
        }
      }
    }
    .footer {
      display: flex;
      flex-direction: column;
      background-color: white;
      .fold {
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        padding: 6upx;
        margin-top: 30upx;
        border: 2upx solid $spLine-color;
        i {
          font-size: 24upx;
          color: $textDarkGray-color;
        }
        span {
          font-size: 20upx;
          color: $textDarkGray-color;
          margin-right: 6upx;
        }
      }
      .package-cast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20upx;
        span {
          font-size: 28upx;
          color: $textBlack-color;
        }
      }
      .delivery-cast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20upx;
        span {
          font-size: 28upx;
          color: $textBlack-color;
        }
      }
      .discount {
        display: flex;
        margin: 20upx;
        flex-direction: column;
        .item {
          display: flex;
          align-items: center;
          margin-top: 10upx;
          img {
            width: 30upx;
            height: 30upx;
          }
          .name {
            font-size: 28upx;
            color: $textDarkGray-color;
            flex: 1;
            margin-left: 10upx;
          }
          .info {
            font-size: 28upx;
            color: $mtRed-color;
          }
        }
      }
      .red-packet {
        display: flex;
        align-content: center;
        margin: 20upx;
        justify-content: space-between;
        .l {
          font-size: 28upx;
          color: $textBlack-color;
        }
        .r {
          display: flex;
          align-items: center;
          span {
            font-size: 24upx;
            color: $mtRed-color;
          }
          i {
            font-size: 28upx;
            margin-left: 10upx;
            color: $textGray-color;
          }
        }
      }
      .coupon {
        display: flex;
        align-content: center;
        margin: 20upx;
        justify-content: space-between;
        .l {
          font-size: 28upx;
          color: $textBlack-color;
        }
        .r {
          display: flex;
          align-items: center;
          span {
            font-size: 24upx;
            color: $mtRed-color;
          }
          i {
            font-size: 28upx;
            margin-left: 10upx;
            color: $textGray-color;
          }
        }
      }
      .totle-price {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin: 20upx;
        .l {
          font-size: 24upx;
          color: $textDarkGray-color;
        }
        .m {
          font-size: 28upx;
          color: $textBlack-color;
          margin: 0 20upx;
        }
        .r {
          font-size: 28upx;
          color: $mtRed-color;
        }
      }
    }
  }
  .privacy-c {
    display: flex;
    flex-direction: column;
    height: 160upx;
    background-color: white;
    margin: 20upx;
    justify-content: center;
    .top {
      display: flex;
      align-items: center;
      margin: 0 20upx;
      .t-l {
        display: flex;
        align-items: center;
        flex: 1;
        span {
          font-size: 28upx;
          color: $textBlack-color;
          margin: 0 10upx;
        }
      }
    }
    span {
      font-size: 20upx;
      color: $textDarkGray-color;
      margin: 0 20upx;
    }
  }
  .bottom-c {
    display: flex;
    background-color: white;
    margin: 20upx;
    margin-top: 0;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 186upx;
    .b-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 88upx;
      margin: 0 20upx;
      border-bottom: 2upx solid $spLine-color;
      span {
        font-size: 28upx;
        color: $textBlack-color;
      }
    }
    .b-mid {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 88upx;
      margin: 0 20upx;
      border-bottom: 2upx solid $spLine-color;
      .mid-l {
        font-size: 28upx;
        color: $textBlack-color;
      }
      .mid-r {
        display: flex;
        align-items: center;
        span {
          font-size: 28upx;
          color: $textDarkGray-color;
        }
        i {
          font-size: 28upx;
          color: $textGray-color;
          margin-left: 10upx;
        }
      }
    }
    .b-btm {
      display: flex;
      background-color: white;
      margin: 20upx;
      align-items: center;
      .b-l {
        font-size: 28upx;
        color: $textBlack-color;
        flex: 1;
      }
      .b-r {
        display: flex;
        align-items: center;
        margin: 0 20upx;
        margin-right: 0;
        .s-l {
          font-size: 24upx;
          color: #00CB91;
          margin: 0 10upx;
        }
				.s-r {
					font-size: 24upx;
				}
        .picker {
          view {
            display: flex;
            align-items: center;
            .s-r {
              font-size: 28upx;
              color: $textDarkGray-color;
              margin-right: 10upx;
              flex: 1;
            }
          }
        }
      }
    }
  }
  .pay-btn {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100upx;
    background-color: #4EAA31;
    justify-content: center;
    .top {
      display: flex;
      height: 50upx;
      align-items: center;
      margin-top: 25upx;
      .s-l {
        font-size: 32upx;
        color: white;
      }
      .s-m {
        font-size: 36upx;
        color: white;
        font-weight: bold;
        margin: 0 20upx;
      }
      .s-r {
        font-size: 24upx;
        color: white;
      }
    }
  }
}
</style>
