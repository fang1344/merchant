/** Created by guangqiang on 2018-09-27 17:32:35 */
const state = {
	active: {
		start_time: '',
		start_time_text: '',
		end_time: '',
		end_time_text: '',
		type: '',
		discount: '',
		all_amount: '',
		day_amount: ''
	}
}

const mutations = {
	setDataMut(state, info) {
		state.active = info
	},

}

const actions = {
	setDataAction({
		state,
		commit
	}, item) {
		commit('setDataMut', item)
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
