<template>
	
  <view class="goods-reserve-wrapper">
	 <view class="content">
        <mSearch :show="false" @search="search($event)" radius="5" placeholder="请输入关键字" backgroundColor="#288bf5" border='1px #999 solid'></mSearch>
    </view>
    <view class="goods-image-list">
       <view class="image-wrap"  v-for="(item, index) in images" :key="index">
          <image :src="item.image_url" mode="aspectFill" @click="selectImage(index)"></image>
		  <i class="selected" v-if="item.selected==true"></i>
        </view>
    </view>
    <button class="btn" @click="goback">确认选择</button>
  </view> 
</template>
<script>
import Vue from "vue"
import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
import {systemGoodsImages} from '@/src/utils/api.js'
 export default {
    data(){
      return{ 
		  images:[],
		}
    },
	components: {
        mSearch
    },
	onShow() {
		uni.setStorageSync('goodsSelectedImages',[]);
	},
    methods:{
		async search(e) {
			let res =  await systemGoodsImages({search_keywords:e});
			this.images = res.data.data;
			let that = this;
			this.images.map(item => {
				item.selected = false;
			})
		},
		selectImage(index){
			console.log(this.images[index]);
			if(this.images[index].selected==true){
				this.images[index].selected=false;
			}else{
				this.images[index].selected=true;
			}
			Vue.set(this.images,index,this.images[index])
		},
		goback(){
			var images = []
			this.images.map(item=>{
				console.log(item);
				if(item.selected==true){
					// console.log(item);
					images.push({image_url:item.image_url,hash:item.hash})
				}
			})
			uni.setStorageSync('goodsSelectedImages',images);	 
			uni.navigateBack();
		}
    }
}
</script>
<style lang="scss" scoped>
@import '@/static/style/mixin.scss';
.goods-reserve-wrapper{
   padding: 0 0 130upx;
  .shop-image{
    text-align: center;
    margin:0 auto;
    .detail{
      display: inline-block;
      width: 100%;
    }
  }
  .goods-image-list{
    padding: 12upx 20upx 0;
    .image-wrap{
      font-size: 0;
      display: inline-block;
      text-align: center;
      width: 25%;
	  position: relative;
    }
    image {
	  display: inline-block;
      width: 160upx;
      height: 160upx;
      border-radius: 10upx;
    }
	.selected{
		display: inline-block;
		background-image: url('http://img.moyaomiao.cn/static/images/applySuccess.png');
		background-size: 29upx 29upx;
		background-repeat: no-repeat;
		height: 30upx;
		width: 30upx;
		position: absolute;
		right: 8upx;
		top:4upx;
		z-index: 99
		
	}
  }
  .btn{
    @include btn(40upx,96%,$theme-color);
    @include cl();
    position: fixed;
    bottom: 1px;
  }
}
      
</style>


