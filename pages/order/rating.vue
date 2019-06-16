<template>
  <view class="order-rating-wrapper">
    <view class="rating-type-wrap">
      <text class="type" 
        :class="{'select': index===isSelectType}"
        v-for='(item,index) in ratingType' :key="index"
         @click="onRatingType(index)"
      >
        {{item}}
      </text>
    </view>  
    <view class="rating-num-wrap">
      <text class="num">共34条评价</text>
    </view>  
    <view class="rating-detail-wrap">
      <image  class="avatar"
				src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553105186633&di=c121a29beece4e14269948d990f9e720&imgtype=0&src=http%3A%2F%2Fimg004.hc360.cn%2Fm8%2FM04%2FDE%2FDE%2FwKhQplZ-QteEBvsbAAAAADUkobU751.jpg"
			></image>
      <view class="rating-detail">
        <view class="info-detail">
          <text class="name">共34条评价</text>
          <view class="start-wrap" >
            <text class="start iconfont icon-star" v-for="(item ,index ) in startsGray" :key="index"></text>
          </view>
          <view class="start-wrap" >
            <text class="start start-light iconfont icon-star" v-for="(item ,index ) in startsLight" :key="index"></text>
          </view>
        </view>
        <view class="rating-type">
          <text class="type">味道：3星</text>
           <text class="type">包装：3星</text>
        </view>
        <view class="rating-describe">
          deeeeeeeededeeeeeeeedeeeeeeedeeeeeeeedeeeeeeedeeeeeeeedeeeeeeedeeeeeeeedeeeeeeeeeeeee
        </view>
        <view class="buy-goods">
          <text class="goods">deeeddeeeeeeeedeeeeeeedeeeeeeeedeeeeeeedeeeeeeeedeeeeeeeeeeeeeedeeeeeee</text>
        </view>
        <view class="rating-goods">
          <text class="goods"> <text class="iconfont icon-chaping"></text>招牌烤肉饭，招牌烤肉饭，招牌烤肉饭，招牌烤肉饭，招牌烤肉饭，招牌烤肉饭，招牌烤肉饭，招牌烤肉饭，招牌烤肉饭</text>
        </view>
        <view class="rating-time">
          <text class="time">评价于2019-05-12 08:00</text>
        </view>
        <view class="rating-handler">
          <text class="appeal"> <text class="iconfont icon-jinggao"></text>申诉</text>
          <view class="handler">
            <text class="send light">送券</text>
            <text class="reply">回复</text>
          </view>
        </view>
      </view>
    </view>  
    <!-- 蒙层 -->
    <view class="rating-type-modal">
      <view class="rating-type-modal">
       <text class="status">全部</text>
       <text class="status">全部</text>
       <text class="status">未恢复</text>
      </view>
    </view>
    <view class="modal-background"></view>
  </view>    
</template>
<script>
const startsGray = [0,1,2,3,4,5]
const ratingType = ['回复情况','类型','内容'],
const ratingTypeDetail = {
  'reply':['全部','已经回复','未回复'],
  'kind':['全部','好评（4-5星）','中评（3星）','差评（1-2星）'],
  'reply':['全部','已经回复','未回复'],
},
export default {
    data(){
      return{
        startsLight:[0,1,2],
        isSelectType:0
        
      }
    },
    methods:{
      onRatingType(index) {
        console.log(index)
        this.isSelectType = index
      }
    }
}
</script>
<style lang='scss' scoped>
@import '@/static/style/mixin.scss';
.order-rating-wrapper{
    .rating-type-wrap{
      display: flex;
      background: $page-bgcolor;
      height: 80upx;
      align-items: center;
      justify-content: space-around;
      .type{
        font-size:$font-base;
        color:$font-color-dark;
        flex: 1;
        text-align: center;
        border-right: 2upx solid $border-color-dark;
      }
      .select{
        color:$theme-color;
      }
    }
    .rating-num-wrap{
      line-height: 80upx;
      border-bottom: 2upx solid $border-color-dark;
      .num{
        font-size:$font-medium;
        color:$font-color-base;
        padding-left: 20upx;
      }
    }
    .rating-detail-wrap{
      display: flex;
      padding: 30upx 40upx;
      .avatar{
        width: 80upx;
        height: 80upx;
        display: inline-block;
        border-radius: 100%;
        margin-right:20upx;
      }
      .rating-detail{
        .info-detail{
          display: flex;
          line-height: 44upx;
          align-items: center;
          justify-content: space-between;
          .name{
            font-size:$font-medium;
            color:$font-color-dark;
          }
          .start-wrap{
              position: absolute;
              left:470upx;
            .start{
              font-size:$font-medium;
              color:$font-color-dark;
            }
            .start-light{
              color:$start-clolr;
            }
          }
          
        }
        .rating-type{
          font-size:$font-medium;
          color:$font-color-light;
        }
        .rating-describe{
          font-size:$font-medium;
          color:$font-color-base;
          word-break: break-word;
          max-width: 550upx;
        }
        .buy-goods{
          font-size:$font-medium;
          color:$font-color-light;
          @include hidden();
        }
        .rating-goods{
          font-size:$font-medium;
          color:$font-color-base;
          word-break: break-word;
          max-width: 550upx;
          margin-top:10upx;
          .iconfont{
            font-size:$font-medium;
            margin-right: 5upx;
          }
          .icon-haoping{
            color:$theme-color;
          }
        }
        .rating-time{
          font-size:$font-medium;
          color:$font-color-light;
          word-break: break-word;
          max-width: 550upx;
          margin-top:10upx;
        }
        .rating-handler{
          display: flex;
          justify-content: space-between;
          margin-top:25upx;
          .appeal{
            font-size:$font-sm;
            color:$theme-color;
            .iconfont{
              color:$theme-color;
            }
          }
          .handler{
            font-size:$font-medium;
            color:$font-color-light;
            .send,.reply{
              border: 2upx solid $border-color-light;
              border-radius: 40upx;
              padding: 4upx 30upx;
            }
            .reply{
              margin-left: 20upx;
            }
            .light{
              border: 2upx solid $theme-color-auxiliary;
              color:$theme-color;
            }
          }
        }
      }
    }
    .rating-type-modal{
      background: #fff;
      line-height: 80upx;
      position: absolute;
      top: 40upx;
      width: 100%;
      z-index: 1001;
      .status{
        display: block;
        font-size:$font-base;
        color:$font-color-base;
        padding-left: 20upx;
      }
      .check{
        color:$theme-color;
        
      }
    }
    .modal-background{
      top: 80upx;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1000;
    }
}

</style>

