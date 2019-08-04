<template>
	  <view>
        <web-view :src="url"></web-view>
    </view>
</template>
<script>
export default {
	data() {
		return {
			url: 'http://172.20.10.6:1024/subPackages/waimai/pages/store/coverArea'
		};
	},
	async onLoad(e) {
		this.url += '?token='+e.token
	}
};
</script>

</script>