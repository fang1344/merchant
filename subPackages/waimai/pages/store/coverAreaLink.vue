<template>
	  <view>
        <web-view :src="url"></web-view>
    </view>
</template>
<script>
export default {
	data() {
		return {
			url: 'http://merchant.qidianschool.club/#/pages/store/coverArea'
		};
	},
	async onLoad(e) {
		this.url += '?token='+e.token
	}
};
</script>

</script>