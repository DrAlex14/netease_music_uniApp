import vue from 'vue'
import Vuex from 'vuex'

vue.use(Vuex)

export default new Vuex.Store({
	state: {
		topListIds: [],
		nextId: ''
	},
	mutations: {
		INIT_TOPLISTIDS(state, payload) {
			state.topListIds = payload;
		},
		NEXT_ID(state, payload) {
			var len = state.topListIds.length
			for(var i = 0; i < len; i++) {
				if(state.topListIds[i].id == payload) {
					state.nextId = state.topListIds[(i + 1) % len].id
					break;
				}
			}
		}
	}
})