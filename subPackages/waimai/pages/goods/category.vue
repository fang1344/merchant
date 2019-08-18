<template>
	<view class="container">
		<view class="sort-list"><dragSort :list="list" :props="props" @change="onDragSortChange"></dragSort></view>
		<view class="submit" @click="submit">提交</view>
	</view>
</template>

<script>
import dragSort from '@/components/drag-sort/index.vue';
import { getRestaurantCategoryList, sortRestaurantCategory } from '@/src/utils/api.js';

export default {
	data() {
		return {
			// 对应需要显示的标题
			props: {
				label: 'name'
			},
			list: [],
			changeList: []
		};
	},

	async mounted() {
		let res = await getRestaurantCategoryList();
		this.changeList = res.data;
		this.list = res.data;
	},

	components: {
		dragSort
	},

	props: [],

	computed: {},

	methods: {
		onDragSortChange(e) {
			// frontData 插到谁后面
			// data 操作的数据
			if (e.frontData == undefined) {
				addIndex = 0;
			}
			var deleteIndex, addIndex;
			this.list.map((item, index) => {
				if (item.id == e.data.id) {
					deleteIndex = index;
				}
				if (e.frontData != undefined && item.id == e.frontData.id) {
					addIndex = index+1;
				}
			});
			this.changeList.splice(deleteIndex, 1);
			this.changeList.splice(addIndex, 0, e.data);
		},
		async submit() {
			// console.log(this.changeList);return false;
			let res = await sortRestaurantCategory({ data: this.changeList });
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

.sort-list {
	margin-bottom: 120upx;
}
.submit {

	@include btn(20upx);

}
</style>
