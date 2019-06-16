/** Created by guangqiang on 2018-09-27 17:32:35 */
import {formatYMD} from '@/src/utils/formatTime'
import {_array} from '@/src/utils/arrayExtension'
import {deepClone} from '@/src/utils/deepClone'
import {WechatMiniLogin,getUserInfo} from '@/src/utils/api';
import {appName} from '@/config/env'

const state = {
  userInfo: {},
}

const mutations = {
  setUserInfoMut(state, info) {
    state.userInfo = info
  }
}

const actions = {
  async setUserInfoAction({state, commit}) {
	  uni.getProvider({
	  	service: 'oauth',
	  	success: async function (res) {
	  			console.log('oauth',);
				if (res.provider.length == 0) {
					let userInfo = await getUserInfo();
					console.log('userInfo',userInfo);
					commit('setUserInfoMut', {
						nickName: userInfo.data.nickname,
						avatarUrl: userInfo.data.image,
						coupon_amount: userInfo.data.coupon_amount,
						red_packet_amount: userInfo.data.red_packet_amount,
						money:userInfo.data.money,
						point:userInfo.data.point
					})
				} else{
					uni.login({
	  					provider:res.provider,
	  					success(loginRes) {
	  						console.log('loginRes',loginRes);
	  						// 获取用户信息
	  						uni.getUserInfo({
	  							provider: provider,
	  							success: async function (infoRes) {
	  								console.log('infoRes',infoRes);
	  								let userInfo = await WechatMiniLogin({
	  									appName: appName,
	  									code: loginRes.code,
	  									iv: infoRes.iv,
	  									encryptedData: infoRes.encryptedData
	  								});
	  								if(userInfo.errno==0){
	  									uni.setStorageSync('token',userInfo.data.token)
	  									commit('setUserInfoMut', Object.assign(JSON.parse(infoRes.rawData),userInfo.data))
	  								}
	  							}
	  						});
	  					},
	  					fail(loginRes) {
	  						console.log('loginRes',loginRes);
	  					},
	  					complete(loginRes) {
	  						console.log('loginRes',loginRes);
	  					}
	  				})
	  			}
	  	},
	  })
		
  },
  bindGetUserInfoAction({state, commit},e){
  	console.log(e);
	uni.login({
		provider:'weixin',
		async success(loginRes) {
			let userInfo = await WechatMiniLogin({
				appName: appName,
				code: loginRes.code,
				iv: e.mp.detail.iv,
				encryptedData: e.mp.detail.encryptedData
			});
			if(userInfo.errno==0){
				uni.setStorageSync('token',userInfo.data.token)
				commit('setUserInfoMut', Object.assign(JSON.parse(e.mp.detail.rawData),userInfo.data))
			}
		}
	})
	
  },
}

const getters = {

}
const setters = {

}
export default {
  state,
  mutations,
  actions,
  getters
}
