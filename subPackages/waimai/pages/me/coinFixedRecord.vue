<template>
	<view class="container">
		<view class="list" v-for="item in recordList" :key="item.id">
			<view class="list-l" >
				<text>{{item.title}}</text>
				<text>{{item.created_at}}</text>
				<text></text>
			</view>
			<view class="list-r">
				<text>{{item.change_type==1 ? '+' : '-'}}{{item.change_money}}</text> 
				<text>余额：{{item.remaining}}</text>
				<text>{{item.start_time_text}}~{{item.end_time_text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserFundRecordList,getUserCoinFixedRecordList,getUserStampRecordList } from '@/src/utils/api.js';
export default {
	data() {
		return {
			type:'2',
			recordList:[]
		};
	},
	onLoad(e) {
		if(e.type){
			this.type=e.type
		}
	},
	async mounted(){
		switch(this.type){
			case '2':
			default:
				var res = await getUserCoinFixedRecordList({'change_type':1,'state':1});
				break;
			case '3' :
				var res = await getUserStampFixedRecordList();
				break;
			
		}
		this.recordList = res.data.data;
		console.log(this.recordList);	
	},
	components: {},
	methods: {
		
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
