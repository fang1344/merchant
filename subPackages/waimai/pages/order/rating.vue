<template>
  <view class="order-rating-wrapper">
    <view class="rating-type-wrap">
      <text class="type" 
        :class="{'select': index===isSelectType}"
        v-for='(item,index) in ratingType' :key="index"
         @click="onRatingType(index, item.type)"
      >
        {{item.name}}
      </text>
    </view>  
    <view class="rating-num-wrap">
      <text class="num">共{{ratingResult.length}}条评价</text>
    </view>  
    <view class="rating-detail-wrap" v-show="ratingResult.length">
      <view class="content"
        v-for="(result,index) in ratingResult"
        :key="index"
      >
        <image  class="avatar"
          :src="result.avatar"
        ></image>
        <view class="rating-detail">
        <view class="info-detail">
          <text class="name">{{result.nickname}}</text>
          <view class="start-wrap" >
            <text class="start iconfont icon-xingxing" v-for="(item ,index1 ) in startsGray" :key="index"></text>
          </view>
          <view class="start-wrap" v-show="result.stars>0">
            <text class="start start-light iconfont icon-xingxing" v-for="(item ,index2 ) in result.stars" :key="index"></text>
          </view>
        </view>
        <view class="rating-type">
          <text class="type">味道：3星</text>
           <text class="type">包装：3星</text>
        </view>
        <view class="rating-describe">
          {{result.content}}
        </view>
        <view class="buy-goods">
          <text class="goods">购买了脆皮鸡米饭/鸡米饭/土耳其烤肉饭/辣椒炒蛋饭</text>
        </view>
        <view class="rating-goods">
          <text class="goods">
             <text class="iconfont" 
             :class="{'icon-chaping': result.stars<3, 'icon-haoping':result.stars>=3}"></text>
          脆皮鸡米饭</text>
        </view>
        <view class="rating-image" v-show="contentSelect<2">
          <view class="rating-image-list">
            <ul v-for="(item, index3) in result.images_url" :key="index">
            <li>
            <image :src=item></image>
            </li>
            
          </ul>
          </view>
          
        </view>
        <view class="rating-time">
          <text class="time">评价于{{result.created_at}}</text>
        </view>
        <view class="rating-handler">
          <text class="appeal"> <text class="iconfont icon-jinggao"></text>申诉</text>
          <view class="handler">
            <text class="send light">送券</text>
            <text class="reply" v-show='replySelect>=2'>回复</text>
          </view>
        </view>
        <view class="rating-reply" v-show='replySelect!==2'>
            <text class="reply" v-for="(item,index4) in result.reply" :key="index">
              {{item.content}}</text>  
        </view>
      </view>
      </view>
    </view>  
    <!-- 蒙层 -->
    <view class="rating-type-modal" v-show="replyShow">
       <text class="status" 
        v-for="(item, index) in ratingTypeDetail"
        :class="{'check': replySelect === index}"
        :key="index"
         @click="handlerRatingType(index)"
       >{{item}}</text>
    </view>
     <view class="rating-type-modal" v-show="starShow">
       <text class="status" 
        v-for="(item, index5) in ratingTypeDetail"
        :class="{'check': starSelect === index}"
        :key="index"
         @click="handlerRatingType(index)"
       >{{item}}</text>
    </view>
     <view class="rating-type-modal" v-show="contentShow">
       <text class="status" 
        v-for="(item, index6) in ratingTypeDetail"
        :class="{'check': contentSelect === index}"
        :key="index"
         @click="handlerRatingType(index)"
       >{{item}}</text>
    </view>
    <view class="modal-background" 
      v-show="replyShow || starShow || contentShow" 
      @click="onHideRatingModal"></view>
  </view>    
</template>
<script>
import { getRatingDetail } from '@/src/utils/api.js';
const ratingTypeData = {
  'reply':['全部','已回复','未回复'],
  'star':['全部','好评（4-5星）','中评（3星）','差评（1-2星）'],
  'content':['全部','有内容','有图片'],
}
export default {
    data(){
      return{
        startsGray: [0,1,2,3,4,5],
        ratingType: [
          {name:'回复情况',type:'reply'},
          {name:'类型',type:'star'},
          {name:'内容',type:'content'}],
        ratingTypeDetail:[],
        isSelectType:0, //选中大类
        currentType:'reply',//选中类型

        replyShow:false,
        starShow:false,
        contentShow:false,
        replySelect:0,
        starSelect:'',
        contentSelect:'',

        ratingResult:[],
      }
    },

    mounted() {
      this.getRatingTotalDetail('reply',0)
    },
    methods:{
      onRatingType(index, type) {
        this.isSelectType = index //title高亮
        this.currentType = type //选中的类型
        this.ratingTypeDetail = ratingTypeData[type]
        
        this.onHideRatingModal()
        this[type + 'Show'] = true
      },

      handlerRatingType(index) {
        this.onResetSelect()
        let type = this.currentType
        this[type + 'Select'] = index
        this.getRatingTotalDetail(type,index)
        this[type + 'Show']=false

      },

      async getRatingTotalDetail(type, index) {
        console.log('sqsqsq',type,index)
        let res = await getRatingDetail({[type]:index})
        console.log('res',res)
        this.ratingResult = res.data.data
      },

      // 清空选中的子类
      onResetSelect() {
        this.replySelect = ''
        this.starSelect = ''
        this.contentSelect = ''
      },

      // 隐藏弹窗
      onHideRatingModal() {
        this.replyShow =false
        this.starShow =false
        this.contentShow =false
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
      .content{
        display: flex;
        padding: 30upx 40upx;
      }
      .avatar{
        width: 80upx;
        height: 80upx;
        display: inline-block;
        border-radius: 100%;
        margin-right:20upx;
      }
      .rating-detail{
        flex: 1;
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
              font-size:$font-base;
              color:$font-color-base;
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
        .rating-image{
          .rating-image-list{
            ul{
                list-style: none;
                padding: 0;
                max-width: 100%;
              li{
                width: 30%;
                display: inline-block;
              }
            }
            padding: 30upx 0 0;
            image {
              display: inline-block;
              width: 160upx;
              height: 160upx;
              margin-right: 20upx;
              border-radius: 10upx;
            }
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
        .rating-reply{
          border-top:1px solid $spLine-color;
          margin-top: 20upx;
          .reply{
            font-size:$font-medium;
            color:$font-color-light;
          }
        }
      }
    }
    .rating-type-modal{
      background: #fff;
      line-height: 80upx;
      position: absolute;
      top: 80upx;
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

