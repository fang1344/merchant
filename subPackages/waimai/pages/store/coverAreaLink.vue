<template>
	  <view>
        <web-view :src="url"></web-view>
    </view>
</template>
<script>
export default {
	data() {
		return {
			url: 'http://192.168.0.103:1026/subPackages/waimai/pages/store/coverArea'
		};
	},
	async onLoad(e) {
		this.url += '?token='+e.token
	}
};
</script>

</script>