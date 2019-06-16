<template>
	<view class="ts-badge-wraper" :style="'padding-left:' + paddingLeftPx + 'px;'" @click="onClick()">
		<view class="ts-badge" v-if="text" :class="[!!inverted? 'ts-badge-inverted' : '','ts-badge-'+type]">
			{{text}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'ts-badge',
		props: {
      text:{
        type: String,
        default: ''
      },
			paddingLeft: {
				type: Number,
				default: 0
			},
			type: {
				type: String,
				default: 'default'
			},
			inverted: {
				type: [Boolean,String],
				default: false
			},
		},
		computed: {
			paddingLeftPx() {
// 				let paddingLeft = uni.getSystemInfoSync().windowWidth / 750 * this.paddingLeft;
// 				return paddingLeft
				return uni.upx2px(this.paddingLeft);
			}
		},
		methods: {
			onClick() {
				this.$emit('click', this.text)
			}
		}
	}
</script>

<style scoped>
	.ts-badge-wraper {
		display: flex;
		flex-direction: row;
		/* justify-content: center; */
		align-items: center;
	}

	.ts-badge,
	.ts-badge-default {
		font-family: 'Helvetica Neue', Helvetica, sans-serif;
		box-sizing: border-box;
		font-size: 20upx;
		line-height: 20upx;
		padding: 8upx 8upx;
		color: #333;
		border-radius: 8upx;
    
	}

	.ts-badge.ts-badge-inverted {
		padding: 0 8upx 0 0;
		color: #929292;
		background-color: transparent
	}

	.ts-badge-primary {
		color: #fff;
		background-color: #007aff
	}

	.ts-badge-blue.ts-badge-inverted,
	.ts-badge-primary.ts-badge-inverted {
		color: #007aff;
		background-color: transparent
	}

	.ts-badge-green,
	.ts-badge-success {
		color: #fff;
		background-color: #4cd964;
	}

	.ts-badge-green.ts-badge-inverted,
	.ts-badge-success.ts-badge-inverted {
		color: #4cd964;
		background-color: transparent
	}

	.ts-badge-warning,
	.ts-badge-yellow {
		color: #fff;
		background-color: #f0ad4e
	}

	.ts-badge-warning.ts-badge-inverted,
	.ts-badge-yellow.ts-badge-inverted {
		color: #f0ad4e;
		background-color: transparent
	}

	.ts-badge-danger,
	.ts-badge-red {
		color: #fff;
		background-color: #dd524d
	}

	.ts-badge-danger.ts-badge-inverted,
	.ts-badge-red.ts-badge-inverted {
		color: #dd524d;
		background-color: transparent
	}

	.ts-badge-purple,
	.ts-badge-royal {
		color: #fff;
		background-color: #8a6de9
	}

	.ts-badge-purple.ts-badge-inverted,
	.ts-badge-royal.ts-badge-inverted {
		color: #8a6de9;
		background-color: transparent;
	}
</style>
