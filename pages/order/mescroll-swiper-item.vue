<template>
	<!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
	<mescroll-uni :fixed="false" top="0" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
		<!-- 数据列表 -->
		<pd-list :list="pdList" :storeData="storeData"></pd-list>
	</mescroll-uni>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import PdList from "@/components/other/pd-list.vue";
	import {getRestaurantOrderList} from '@/src/utils/api.js'
	
	export default {
		components: {
			MescrollUni,
			PdList
		},
		data() {
			return {
				mescroll: null, //mescroll实例对象
				downOption:{
					auto:false, // 不自动加载
				},
				upOption:{
					auto:false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty:{
						tip: '~ 空空如也 ~', // 提示
					}
				},
				pdList: [], //列表数据
				isInit: false, // 列表是否已经初始化
				scrollY: 0
			}
		},
		props:{
			i: Number, // 每个tab页的专属下标
			nav: {
				type: Object
			},
			storeData: {
				typr: Object
			},
			index: { // 当前tab的下标
				type: Number,
				default(){
					return 0
				}
			}
		},
		watch:{
			// 监听下标的变化
			index(val){
				if (this.i === val && !this.isInit) {
					this.isInit = true; // 标记为true
					this.mescroll.triggerDownScroll();
				}
			}
		},
		mounted() {
			// 第一个tab,自动加载数据
			if(this.i === 0){
				this.isInit = true; // 标记为true
				this.mescroll.triggerDownScroll();
			}
		},
		methods: {
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				// 这里加载你想下拉刷新的数据, 比如刷新轮播数据
				// loadSwiper();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {
				//联网加载数据
				try{
					let res = await getRestaurantOrderList({
						page:mescroll.num,
						pageSize:mescroll.size,
						order_state: this.nav.state,
					});
					// 回调
					if(mescroll.num == 1) this.pdList = []; //如果是第一页需手动制空列表
					this.pdList=this.pdList.concat(res.data.data); //追加新数据
					mescroll.endSuccess(res.data.data.length);
				} catch (e) {
					//联网失败的回调
					// errorCallback && errorCallback();
					mescroll.endErr();
				}
			},
			//点击空布局按钮的回调
			emptyClick(){
				uni.showToast({
					title:'点击了按钮,具体逻辑自行实现'
				})
			},
		}
	}
</script>
