<template>
	<view v-if="type" class="ts-icon" :class="['ts-icon-'+type]" :style="{color:color,'font-size':fontSize}" @click="onClick()"></view>
</template>

<script>
	export default {
		name: 'ts-icon',
		props: {
			/**
			 * 图标类型
			 */
			type: String,
			/**
			 * 图标颜色
			 */
			color: {
				type: String,
				default: '#FFFFFF'
			},
			/**
			 * 图标大小
			 */
			size: {
				type: [Number,String],
				default: 50,
			}
		},
		computed: {
			fontSize() {
				//单位换算为px
				let size = uni.getSystemInfoSync().windowWidth / 750 * this.size;
				return `${size}px`
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style>
	@import "../common/ts-icon.css";
</style>
