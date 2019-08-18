<template>
	<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" >
	<view class="container">
		<empty v-if="recordList.length === 0"></empty>
		<view class="list" v-for="item in recordList" :key="item.id">
			<view class="list-l" >
				<text>{{item.title}}</text>
				<text>{{item.created_at}}</text>
				<!-- <text></text> -->
			</view>
			<view class="list-r">
				<text>{{item.change_type==1 ? '+' : '-'}}{{item.change_money}}</text> 
				<text>余额：{{item.remaining}}</text>
				<!-- <text>{{item.start_time_text}}~{{item.end_time_text}}</text> -->
			</view>
		</view>
	</view>
	</mescroll-uni>
</template>

<script>
import { getUserFundRecordList,getUserCoinFixedRecordList,getUserStampRecordList } from '@/src/utils/api.js';
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
import Empty from '@/components/empty.vue';
export default {
	data() {
		return {
			accountType: '1',
			change_type: 1,
			type: 1,
			state: 1,
			today: 0,
			upOption:{
				use: true, // 是否启用上拉加载; 默认true
				auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
				page: {
					num: 1, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					size: 10 // 每页数据的数量,默认10
				},
				noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
				empty: {
					tip: '暂无相关数据'
				}
			},
			downOption: { 
				use: true, // 是否启用下拉刷新; 默认true
				auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
			},
			recordList:[]
		};
	},
	
	onLoad(e) {
		if(e.type){
			this.type=e.type
		}
		if(e.today){
			this.today = e.today
		}
	},
	components: {
		MescrollUni,
		Empty
	},
	
	async mounted(){
		
	},
	methods: {
		async downCallback(mescroll){
			let res = await this.getData(1);
			this.recordList = res.data.data;
			mescroll.endByPage(res.data.per_page,res.data.last_page)
		},
		async upCallback(mescroll){
			let res = await this.getData(mescroll.num)
			this.recordList = this.recordList.concat(res.data.data);
			mescroll.endByPage(res.data.per_page,res.data.last_page)
		},
		async getData(page){
			let params = {
				change_type:this.change_type,
				type:this.type,
				state:this.state,
				today:this.today,
				page: page
			};
			switch(this.accountType){
				case '1':
				default:
					var res = await getUserFundRecordList(params)
						break;
				case '2':
					var res = await getUserCoinFixedRecordList(params);
					break;
				case '3' :
					var res = await getUserStampFixedRecordList(params);
					break;
				
			}
			return res;
		}
	}
};
</script>

<style lang="scss">
	.container{
		.list{
			display: flex;
			justify-content:space-between;
			border-bottom:1px solid #ccc;
			font-size: 28upx;
			padding: 20upx 20upx;
			.list-l{
				display: flex;
				flex-direction: column
			}
			.list-r{
				display: flex;
				flex-direction: column;
				align-items:flex-end
			}
		}
	}
</style>
