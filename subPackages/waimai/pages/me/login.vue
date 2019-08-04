<template>
  <view class="container">
    <view class="left-bottom-sign"></view>
    <view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
    <view class="right-top-sign"></view>
    <!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
    <view class="wrapper">
      <view class="left-top-sign">LOGIN</view>
      <span class="icon-yanying"></span>
      <view class="welcome">欢迎回来！</view>
      <view class="login-title">
        <text class="title" :class="{ active: isActive === 0 }" @click="loginType(0)">账号登陆</text>
        <text class="title" :class="{ active: isActive === 1 }" @click="loginType(1)">动态验证码登陆</text>
      </view>
      <view class="input-content" v-show="isActive === 0">
		  
        <view class="input-item">
          <input
            type="number"
            :value="mobile"
            placeholder="请输入手机号码"
            maxlength="11"
            data-key="mobile"
            @input="inputChange"
          >
        </view>
        <view class="input-item">
          <input
            type="mobile"
            :value="password"
            placeholder="8-18位不含特殊字符的数字、字母组合"
            placeholder-class="input-empty"
            maxlength="20"
            data-key="password"
            @input="inputChange"
          
          >
        </view>
      </view>

      <view class="input-content" v-show="isActive === 1">
        <view class="input-item">
          <input
            type="number"
            :value="sms_mobile"
            placeholder="请输入手机号码"
            maxlength="11"
            data-key="sms_mobile"
            @input="inputChange"
          >
        </view>
        <view class="input-item">
          <input
            type="number"
            :value="auth_code"
            placeholder="请输入短信验证码"
            maxlength="6"
            data-key="auth_code"
            @input="inputChange"
          >
          <text class="code" @click="sendCode" v-if="!sendMsgDisabled">发送验证码</text>
          <text class="disable-code" v-if="sendMsgDisabled">{{ time + 's重新发送' }}</text>
        </view>
      </view>
      <view class="forget-section" v-show="isActive === 0" @click="forgetPassword">忘记密码?</view>

      <button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
    </view>
    <view class="register-section">
      还没有账号?
      <text @click="toRegist">马上注册</text>
    </view>
  </view>
</template>

<script>
import { getVerifyCode, userLogin } from '@/src/utils/api.js';
import { mapMutations } from 'vuex';
export default {
	data() {
		return {
			mobile: '',
			password: '',
			sms_mobile: '',
			auth_code: '',
			logining: false,
			isActive: 0,
			time: 60, // 倒数记时
			sendMsgDisabled: false,
		};
	},
	onLoad() {},
	methods: {
		...mapMutations(['login']),
		inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},
		// 登陆类型
		loginType(index) {
			if (this.logining) return;
			this.isActive = index;
		},
		// 发送验证码
		sendCode() {
			if (this.mobileVerify('sms_mobile')) {
				this.setTime();
				this.getCode();
			}
		},

		// 60s倒计时
		setTime() {
			let me = this;
			me.sendMsgDisabled = true;
			let interval = setInterval(function() {
				if (me.time-- <= 0) {
					me.time = 60;
					me.sendMsgDisabled = false;
					me.logining = false;
					clearInterval(interval);
				}
			}, 1000);
		},

		// 获取验证码
		async getCode() {
			console.log('获取验证码');
			let res = await getVerifyCode({ mobile: this.sms_mobile });
			if (res.errno == 0) {
				this.$api.msg('发送成功');
			} else {
				this.$api.msg(res.message);
			}
		},
		toLogin() {
			if (this.isActive === 1) {
				if (this.smsTypeVerify()) {
					// this.sendInfo('sms_mobile', 'auth_code', 2);
				}
			} else {
				if (this.passwordTypeVerify()) {
					this.sendInfo('mobile', 'password', 1);
				}
			}
		},

		async sendInfo(mobile, modal, type) {
			this.logining = true;

			let sendData = {
				mobile: this[mobile],
				[modal]: this[modal],
				type: type
			};
			const result = await userLogin(sendData);
			if(result.errno==0){
				uni.setStorageSync('token',result.data.token)
				if(uni.getStorageSync('token')==''){
					this.$api.msg('token设置失败');
					return false;
				}
				if(result.data.store_id){
					uni.switchTab({
						url:'/pages/store/index'
					})
				}else{
					uni.navigateTo({
						url:'../store/apply'
					})
				}
			}else{
				this.$api.msg(result.message);
				this.logining = false;
			}
		},

		navBack() {
			uni.navigateBack();
		},
		toRegist() {
			uni.navigateTo({
				url:'/subPackages/waimai/pages/me/register'
			})
		},

		forgetPassword() {
			uni.navigateTo({ url: '/subPackages/waimai/pages/me/forgetPassword' });
		},

		mobileVerify(val) {
			let phonereg = /^1\d{9}|1\d{10}$/;
			if (this[val] === '') {
				this.$api.msg('请填写手机号');
				return false;
			} else if (this[val].length < 10) {
				this.$api.msg('手机号长度至少是10位');
				return false;
			} else if (!phonereg.test(this[val])) {
				this.$api.msg('您的手机号输入有误');
				return false;
			} else {
				return true;
			}
		},

		smsTypeVerify() {
			if (!this.mobileVerify('sms_mobile')) {
				return;
			}
			let codereg = /^\d{6}$/;
			if (this.auth_code === '') {
				this.$api.msg('请填写验证码');
				return false;
			} else if (!codereg.test(this.auth_code)) {
				this.$api.msg('验证码填写有误');
				return false;
			}
			return true;
		},

		passwordTypeVerify() {
			if (!this.mobileVerify('mobile')) {
				return;
			}
			if (this.password === '') {
				this.$api.msg('请填写密码');
				return false;
			}
			return true;
		}
	}
};
</script>

<style lang="scss">
page {
  background: #fff;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
}
.container {
  padding-top: 55px;
  position: relative;
  width: 100vw;
  overflow: hidden;
  background: #fff;
}
.wrapper {
  position: relative;
  z-index: 90;
  background: #fff;
  padding-bottom: 40upx;
}
.back-btn {
  position: absolute;
  left: 40upx;
  z-index: 9999;
  padding-top: var(--status-bar-height);
  top: 40upx;
  font-size: 40upx;
  color: $font-color-dark;
}
.left-top-sign {
  font-size: 120upx;
  color: $page-color-base;
  position: relative;
  left: -8upx;
}
.login-title {
  text-align: center;
  margin: 0 auto 40px;
  .title {
    margin: 0px 25px;
    color: $font-color-light;
    font-size: 30upx;
  }
  .active {
    color: $font-color-dark;
    border-bottom: 1px solid $theme-color;
  }
}
.right-top-sign {
  position: absolute;
  top: 80upx;
  right: -30upx;
  z-index: 95;
  &:before,
  &:after {
    display: block;
    content: "";
    width: 400upx;
    height: 80upx;
    background: #b4f3e2;
  }
  &:before {
    transform: rotate(50deg);
    border-radius: 0 50px 0 0;
  }
  &:after {
    position: absolute;
    right: -198upx;
    top: 0;
    transform: rotate(-50deg);
    border-radius: 50px 0 0 0;
    /* background: pink; */
  }
}
.left-bottom-sign {
  position: fixed;
  left: -240upx;
  bottom: -320upx;
  border: 100upx solid $border-color-base;
  border-radius: 50%;
  padding: 180upx;
}
.welcome {
  position: relative;
  left: 50upx;
  top: -90upx;
  font-size: 46upx;
  color: #555;
  text-shadow: 1px 0px 1px rgba(0, 0, 0, 0.3);
}
.input-content {
  padding: 0 60upx;
}
.input-item {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 30upx;
  border-bottom: 2upx solid $border-color-light;
  margin-bottom: 50upx;
  &:last-child {
    margin-bottom: 0;
  }
  .code,
  .disable-code {
    height: 50upx;
    line-height: 56upx;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
    width: 30%;
  }
  input {
    height: 60upx;
    font-size: 28upx;
    color: $font-color-dark;
    flex: 1;
  }
}

.confirm-btn {
  width: 630upx;
  height: 76upx;
  line-height: 76upx;
  margin-top: 70upx;
  background: $theme-color;
  color: $font-color-white;
  font-size: $font-lg;
}
.forget-section {
  font-size: $font-sm + 2upx;
  color: $mtRed-color;
  margin-top: 40upx;
  text-align: right;
  margin-top: 20upx;
  padding-right: 60upx;
}
.register-section {
  position: fixed;
  left: 0;
  bottom: 76px;
  width: 100%;
  font-size: $font-sm + 2upx;
  color: $font-color-base;
  text-align: center;
  text {
    color: $theme-color;
    margin-left: 10upx;
  }
}
</style>
