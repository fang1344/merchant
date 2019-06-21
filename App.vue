<script>
export default {
	onLaunch: function() {
		// console.log(e);
		// console.log('App Launch');
		// // play();
		// // #ifdef APP-PLUS
		// const _self = this;
		// const _handlePush = function(message) {
		// 	/**
		// 	 * 通过 vuex 来同步页面的数据，仅做演示。
		// 	 * 实际开发中，这里可能是跳转到某个页面等操作，请根据自身业务需求编写。
		// 	 */
		// 	_self.updatePushMessage(message);
		// };
		// plus.push.addEventListener('click', function(message) {
		// 	plus.nativeUI.toast(JSON.parse(message));
		// 	uni.navigateTo({
		// 		url: '/subPackages/waimai/pages/order/detail?order_code=DD1559486528349931552',
		// 		success: res => {},
		// 		fail: () => {},
		// 		complete: () => {}
		// 	});
		// 	_handlePush(message);
		// });
		// plus.push.addEventListener('receive', function(message) {
		// 	plus.nativeUI.toast('push receive');
		// 	_handlePush(message);
		// });
		// // #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};

/**
 * 根据变量名获取匹配值
 */
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}
function play() {
	const innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
	innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3';
	innerAudioContext.onPlay(() => {
		console.log('开始播放');
	});
	innerAudioContext.onError(res => {
		console.log(res.errMsg);
		console.log(res.errCode);
	});
	setTimeout(function() {
		play();
	}, 25000);
}
</script>
<style lang="less">
// @import './common/css/iconfont.less';
@import './common/css/iconfont/iconfont.css';
</style>
<style>
/* @import url("http://at.alicdn.com/t/font_858196_x9iqiwlpqh.css"); */
/* @import './static/style/font_858196_x9iqiwlpqh.css'; */
uni-rich-text img {
	display: block;
	width: 100%;
}
</style>
<style lang="scss">
view,
scroll-view,
swiper,
swiper-item,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox,
form,
input,
label,
radio,
slider,
switch,
textarea,
navigator,
audio,
camera,
image,
video {
	box-sizing: border-box;
}
/* 骨架屏替代方案 */
.Skeleton {
	background: #f3f3f3;
	padding: 20upx 0;
	border-radius: 8upx;
}

/* 图片载入替代方案 */
.image-wrapper {
	font-size: 0;
	background: #f3f3f3;
	border-radius: 4px;

	image {
		width: 100%;
		height: 100%;
		transition: 0.6s;
		opacity: 0;

		&.loaded {
			opacity: 1;
		}
	}
}

.clamp {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: block;
}

.common-hover {
	background: #f5f5f5;
}

/*边框*/
.b-b:after,
.b-t:after {
	position: absolute;
	z-index: 3;
	left: 0;
	right: 0;
	height: 0;
	content: '';
	transform: scaleY(0.5);
	border-bottom: 1px solid $border-color-base;
}

.b-b:after {
	bottom: 0;
}

.b-t:after {
	top: 0;
}

/* button样式改写 */
uni-button,
button {
	height: 80upx;
	line-height: 80upx;
	font-size: $font-lg + 2upx;
	font-weight: normal;

	&.no-border:before,
	&.no-border:after {
		border: 0;
	}
}

uni-button[type='default'],
button[type='default'] {
	color: $font-color-dark;
}

/* input 样式 */
.input-placeholder {
	color: #999999;
}

.placeholder {
	color: #999999;
}
</style>
<!-- <style>
	
	/*每个页面公共css */
	.container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		box-sizing: border-box;
	}
	uni-rich-text img{
		display:block;
		width: 100%;
	}
	body,
	page {
	    min-height: 100%;
	    display: flex;
	}
	
	/* #ifdef MP-BAIDU */
	page {
	    width: 100%;
	    height: 100%;
	    display: block;
	}
	
	swan-template {
	    width: 100%;
	    min-height: 100%;
	    display: flex;
	}
	
	/* #endif */
	
	.content {
	    display: flex;
	    flex: 1;
	    flex-direction: column;
	    background-color: #efeff4;
	    padding: 20upx;
	}
	
	.input-group {
	    background-color: #ffffff;
	    margin-top: 40upx;
	    position: relative;
	}
	
	.input-group::before {
	    position: absolute;
	    right: 0;
	    top: 0;
	    left: 0;
	    height: 1upx;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
	}
	
	.input-group::after {
	    position: absolute;
	    right: 0;
	    bottom: 0;
	    left: 0;
	    height: 1upx;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
	}
	
	.input-row {
	    display: flex;
	    flex-direction: row;
	    position: relative;
	}
	
	.input-row .title {
	    width: 20%;
	    height: 50upx;
	    min-height: 50upx;
	    padding: 15upx 0;
	    padding-left: 30upx;
	    line-height: 50upx;
	}
	
	.input-row.border::after {
	    position: absolute;
	    right: 0;
	    bottom: 0;
	    left: 15upx;
	    height: 1upx;
	    content: '';
	    -webkit-transform: scaleY(.5);
	    transform: scaleY(.5);
	    background-color: #c8c7cc;
	}
	
	.btn-row {
	    margin-top: 50upx;
	    padding: 20upx;
	}
	
	button.primary {
	    background-color: #0faeff;
	}
</style> -->
<!-- <style>
    @import './common/css/common.css';

    page,
    view {
        display: flex;
    }

    page {
        display: flex;
        min-height: 100%;
        background-color: #EFEFEF;
    }

    template {
        display: flex;
        flex: 1;
    }
</style> -->
