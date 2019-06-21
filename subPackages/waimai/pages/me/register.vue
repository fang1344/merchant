<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view>
		<view class="wrapper">
			<view class="left-top-sign">JOIN</view>
			<view class="welcome">欢迎加入！</view>
			 <view class="input-content">
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
         <view class="input-item">
          <input
            type="password"
            :value="password"
            placeholder="8-18位的数字、字母组合"
            placeholder-class="input-empty"
            maxlength="18"
            data-key="password"
            @input="inputChange"
          >
        </view>
      </view>
			<button class="btn" @click="doReg" :disabled="register">注册并登录</button>
			<view class="res" @click="toLogin">已有账号<text>立即登录</text></view>
		</view>
	
	</view>
</template>

<script>
import { getVerifyCode, userRegister } from '@/src/utils/api.js';
export default {
	data() {
		return {
			mobile: '',
			password: '',
			auth_code: '',
			register: false,
			time: 60, // 倒数记时
			sendMsgDisabled: false,
		};
	},
	methods: {
    inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},
	 		// 发送验证码
		sendCode() {
			if (this.mobileVerify('mobile')) {
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
					me.register = false;
					clearInterval(interval);
				}
			}, 1000);
		},

		// 获取验证码
		async getCode() {
			console.log('获取验证码');
			let res = await getVerifyCode({ mobile: this.mobile });
			if (res.errno == 0) {
				this.$api.msg('发送成功');
			} else {
				this.$api.msg(res.message);
			}
		},
    doReg() {
      if (this.totalVerify()) {
        this.sendInfo();
      }
    },
    async sendInfo() {
			this.register = true;

			let sendData = {
				phone: this.mobile,
        auth_code: this.auth_code,
        password: this.password
			};
			console.log('sendData', sendData);
			const res = await userRegister(sendData);
			let success = res.success
			if(success){
				let token = res.data.token
				uni.setStorageSync('token',token)
				setTimeout(()=>{
					uni.navigateTo({ url: '/subPackages/waimai/pages/store/apply' });
				},1000)
			}else{
				let msg = res.message
				this.$api.msg(msg);
				this.register = false;
			}
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
    totalVerify() {
			if (!this.mobileVerify('mobile')) {
				return;
			}
			let codereg = /^\d{6}$/;
			let pwdreg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
			if (this.auth_code === '') {
				this.$api.msg('请填写验证码');
				return false;
			} else if (!codereg.test(this.auth_code)) {
				this.$api.msg('验证码填写有误');
				return false;
			}else if (this.password === '') {
				this.$api.msg('请填写密码');
				return false;
			}else if (this.password.length < 8) {
				this.$api.msg('密码至少8位数');
				return false;
			}else if (this.password.length > 18) {
				this.$api.msg('密码不要超过18位数');
				return false;
			}else if (!pwdreg.test(this.password)) {
				this.$api.msg('密码需要包含字母和数字');
				return false;
			}else{return true}

		},
		toLogin() {
			uni.hideKeyboard();
			uni.redirectTo({ url: 'login' });
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss">
@import '@/static/style/mixin.scss';
page {
	background: $font-color-white;
}

.container {
  padding-top: 55px;
  position: relative;
  width: 100vw;
  overflow: hidden;
  background: $font-color-white;

}
.wrapper {
  position: relative;
  z-index: 90;
  background: $font-color-white;
  padding-bottom: 40upx;
  .left-top-sign {
	font-size: 120upx;
	color: $page-color-base;
	position: relative;
	left: -8upx;
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
.btn{
  	@include btn(40upx,630upx,#fc783d);
}
  .res {
		width: 100%;
    font-size: $font-sm + 2upx;
    color: $font-color-base;
    text-align: center;
    text {
      color: $uni-color-success;
      margin-left: 10upx;
    }
	}
</style>
