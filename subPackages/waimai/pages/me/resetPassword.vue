<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view>
		<view class="wrapper">
			 <view class="input-content">
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
                 <view class="input-item">
                <input
                    type="password"
                    :value="newPassword"
                    placeholder="请重新输入新密码"
                    placeholder-class="input-empty"
                    maxlength="18"
                    data-key="newPassword"
                    @input="inputChange"
                >
                </view>
      </view>
			<button class="btn" @tap="doReset" :disabled="reset">重置密码</button>
		</view>
	
	</view>
</template>

<script>
import { resetPassword } from '@/src/utils/api.js';
export default {
	data() {
		return {
      password: '',
      newPassword:'',
      reset: false,
      authToken:'',
		};
  },
  mounted(){
    let query = this.$route.query
    this.authToken = query.auth_token
    
  },
	methods: {
    inputChange(e) {
			const key = e.currentTarget.dataset.key;
			this[key] = e.detail.value;
		},

    doReset() {
      if (this.passwordVerify()) {
        this.sendInfo();
      }
    },
    async sendInfo() {
			this.reset = true;
			let sendData = {
        auth_token: this.authToken,
        password: this.password
			};
			console.log('sendData', sendData);
      const result = await resetPassword(sendData);
      let success = res.success
			if(success){
				let token = res.data.token
				localStorage.setItem('token',token)
				setTimeout(()=>{
					uni.navigateTo({ url: '/subPackages/waimai/pages/store/apply' });
				},1000)
			}else{
				let msg = res.message
				this.$api.msg(msg);
				this.reset = false;
			}
		},

    passwordVerify() {
      let pwdreg = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}');
			if (this.password === '') {
				this.$api.msg('请填写密码');
				return false;
			}else if (this.newPassword === '') {
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
			}else if (this.password !==  this.newPassword) {
				this.$api.msg('密码不一致，请重新输入');
				return false;
			}
			return true;
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
  margin-top: 220upx;
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
