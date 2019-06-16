<template>
	<view class="ts-segmented-control" :class="styleType" :style="wrapStyle">
		<view v-for="(item, index) in values" class="ts-segmented-control-item" :class="styleType" :key="index" :style="index === currentTab ? activeStyle : itemStyle"
		 @click="onClick(index)">
			{{item}}
		</view>
	</view>
</template>

<script>
	//   <ts-segmented-control :values="tabs" v-model="currentTab" @clickItem="onClickItem" style-type="text" active-color="#d81e06" borderColor="#d81e06"></ts-segmented-control>
	export default {
		name: 'ts-segmented-control',
		model: {
			prop: 'current',
			event: 'clickItem'
		},
		data() {
			return {
				currentTab: 0,
			}
		},
		watch: {
			currentTab(val) {
				this.onClick(val);
			},
			current(val) {
				this.updateValue(val);
			}
		},
		onLoad: function(e) {
			self = this;
			this.updateValue(this.current);
		},
		props: {
			current: {
				type: Number,
				default: 0
			},
			values: {
				type: Array,
				default () {
					return [];
				}
			},
			activeColor: {
				type: String,
				default: '#d81e06'
			},
			borderColor: {
				type: String,
				default: '#d81e06'
			},
			styleType: {
				//支持：button,text
				type: String,
				default: 'button'
			}
		},
		computed: {
			wrapStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `border:0;`;
						break;
					default:
						styleString = `border-color: ${this.borderColor}`;
						break;
				}
				return styleString;
			},
			itemStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:#000;border-left:0; border-bottom: #F0F0F0 solid 1px;`;
						break;
					default:
						styleString = `color:${this.activeColor};border-color:${this.borderColor};`;
						break;
				}
				return styleString;
			},
			activeStyle() {
				let styleString = '';
				switch (this.styleType) {
					case 'text':
						styleString = `color:${this.activeColor};border-left:0;border-bottom-style:solid;`;
						break;
					default:
						styleString = `color:#fff;border-color:${this.borderColor};background-color:${this.activeColor}`;
						break;
				}
				return styleString;
			}
		},
		methods: {
			onClick(index) {
				if (this.currentTab !== index) {
					// console.log('onClick(index)')
					this.currentTab = index;
					// 					const _self = this;
					// 					setTimeout(function() {
					// 						_self.$emit('clickItem', index);
					// 					}, 10)

					//或者写成以下语法
					setTimeout(() => {
						this.$emit('clickItem', index);
					}, 10)
				}
			},
			updateValue(val) {
				this.currentTab = val;
			},
		},
	}
</script>

<style scoped>
	.ts-segmented-control {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
		font-size: 30upx;
		border-radius: 12upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
	}

	.ts-segmented-control.button {
		border: 1upx solid #CCCCCC;
	}

	.ts-segmented-control.text {
		border: 0;
		border-radius: 0upx;
	}

	.ts-segmented-control-item {
		flex: 1;
		text-align: center;
		line-height: 80upx;
		box-sizing: border-box;

		align-items: center;
		justify-content: center;
	}

	.ts-segmented-control-item.button {
		border-left: 1upx solid;
	}

	.ts-segmented-control-item.text {
		border-left: 0;
	}

	.ts-segmented-control-item:first-child {
		border-left-width: 0;
	}
</style>
