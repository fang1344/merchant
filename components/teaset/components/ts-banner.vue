<template>
	<view v-show="seen" class="banner" @tap="handleTap" :style="{'height': heightPx+'px' }">
		<image :src="image" :style="{'height': heightPx+'px' }"></image>
	</view>
</template>

<script>
	export default {
		name: 'ts-banner',
		props: {
			image: {
				type: String,
				// default: 'http://via.placeholder.com/300x150'
				default: '',
			},
			height: {
				type: [Number,String],
				default: 250,
			}
		},
		computed: {
			seen() {
				// return (this.image.length > 0);
				return true;
			},
			heightPx() {
				// 				let height = uni.getSystemInfoSync().windowWidth / 750 * this.height;
				// 				return height;
				return uni.upx2px(this.height);
			}
		},
		methods: {
			handleTap() {
				this.$emit('tap');
			},
		}
	}
</script>


<style>
	.banner {
		display: flex;
		flex-direction: row;
	}

	.banner image {
		display: flex;
		flex-direction: row;
		flex: 1;
		/* width: 100%; */
		/* height: 100%; */
	}
</style>
