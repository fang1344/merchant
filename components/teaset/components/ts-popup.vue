<template>
	<view class="ts-popup-wraper">
		<view class="ts-mask" v-show="!bannerHidden" @click="close"></view>
		<view class="ts-popup" :class="computedClassStr" v-show="!bannerHidden">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ts-popup',
		data() {
			return {
				bannerHidden: false,
			}
		},
		model: {
			prop: 'hiddenWindow',
			event: 'close'
		},
		props: {
			position: {
				type: String,
				default: 'bottom',
			},
			hiddenWindow: {
				type: Boolean,
				default: false
			},
		},
		computed: {
			computedClassStr() {
				//支持：bottom,top
				let style = 'ts-popup-bottom';
				if (this.position === "top") {
					style = 'ts-popup-top';
				}
				return style;
			}
		},
		watch: {
			bannerHidden(val) {
				this.$emit('close', val);
			},
			hiddenWindow(val) {
				console.log(val)
				this.updateValue(val);
			}
		},
		mounted() {
			this.bannerHidden = this.hiddenWindow;
			this.updateValue(this.hiddenWindow);
		},
		methods: {
			updateValue(val) {
				this.bannerHidden = val;
			},
			close: function() {
				this.bannerHidden = true;
			}
		}
	}
</script>

<style>
	.ts-popup-wraper {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-content: flex-start;
	}

	/* 遮罩层 */
	.ts-mask {
		background: rgba(0, 0, 0, 0.6);
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		z-index: 1000;
	}

	/* 弹出层形式的广告 */
	.ts-popup {
		position: fixed;
		display: flex;
		flex-direction: column;
		flex: 1;
		z-index: 1001;
		background-color: #ffffff;
		-webkit-box-shadow: 0 0 30px rgba(0, 0, 0, .1);
		box-shadow: 0 0 30px rgba(0, 0, 0, .1);
	}

	.ts-popup-bottom {
		bottom: 0;
		width: 100%;
	}

	.ts-popup-top {
		top: 0;
		width: 100%;
	}
</style>
