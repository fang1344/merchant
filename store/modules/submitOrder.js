/** Created by guangqiang on 2018-09-27 17:32:35 */
import {formatYMD} from '@/src/utils/formatTime'
import {_array} from '@/src/utils/arrayExtension'
import {deepClone} from '@/src/utils/deepClone'
import {getAddressList,getUserDefaultAddress,AddressDelete} from '@/src/utils/api';

const state = {
  defaultAddress: {},
  addressList: [],
	redPacketFee: {},
  remarkData: {remark:'',tags:[]}
}

const mutations = {
  setDefaultAddressDataMut(state, info) {
    state.defaultAddress = info
  },
  setRemarkDataMut(state, info) {
	  state.remarkData = info
  },
	setRedPacketMut(state, info) {
	  state.redPacketFee = info
  },
}

const actions = {
  setDefaultAddressAction({state, commit}, item) {
	 commit('setDefaultAddressDataMut', item)
  },
  setRemarkDataAction({state, commit}, remark){
	  commit('setRemarkDataMut',remark)
  },
	setRedPacketAction({state, commit}, redPacket){
	  commit('setRedPacketMut',redPacket)
  }
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
