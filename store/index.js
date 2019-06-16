import Vue from 'vue'
import Vuex from 'vuex'
import shoppingCart from './modules/shoppingCart'
import submitOrder from './modules/submitOrder'
import reserve from './modules/reserve'
import user from './modules/user'
import goodsActive from './modules/goodsActive'

import {
	getIndexData,
	getHomeData
} from '@/src/utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		shoppingCart: {
			namespaced: true,
			...shoppingCart
		},
		submitOrder: {
			namespaced: true,
			...submitOrder
		},
		reserve: {
			namespaced: true,
			...reserve
		},
		user: {
			namespaced: true,
			...user
		},
		goodsActive: {
			namespaced: true,
			...goodsActive
		}
	},
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userInfo: {},
		userName: "",
		avatar: "",
		/**
		 * 首页数据
		 */
		newGoods: [],
		hotGoods: [],
		specialGoods: [],
		discountGoods: [],
		topics: [],
		brands: [],
		floorGoods: [],
		banner: [],
		channel: [],
		latitude: '',
		longitude: '',
		address: {},
		choiceAddress: {

		}
	},
	mutations: {
		getIndexData(state, res) {
			state.newGoods = res.data.newGoodsList;
			state.hotGoods = res.data.hotGoodsList;
			state.specialGoods = res.data.specialGoodsList;
			state.discountGoods = res.data.discountGoodsList;
			state.topics = res.data.topicList;
			state.brands = res.data.brandList;
			state.floorGoods = res.data.categoryList;
			state.banner = res.data.banner;
			state.channel = res.data.channel;
		},

		login(state, userInfo) {
			state.userName = userInfo.nickname || '新用户';
			state.avatar = userInfo.image;
			state.hasLogin = true;
			state.token = userInfo.token;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		location(state, address) {
			state.address = address;

			console.log(state.address);
		},
		choiceAddressDataMut(state, item) {
			console.log(item)
			state.choiceAddress = item
		}
	},
	actions: {
		async getIndexData({
			commit
		}) {
			const res = await getHomeData()
			// console.log('vuex取首页的数据getIndexData', res)
			if (res.errno !== 0) return
			commit('getIndexData', res)
		},
		choiceAddressAction({
			state,
			commit
		}, item) {
			console.log('choiceAddressAction')
			commit('choiceAddressDataMut', item)
		}
	}
})

export default store

