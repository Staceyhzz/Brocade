/* 
* @Author: Moriarty
* 下拉过滤仓库
* 渠道品牌 —— storeCategoryList
* 渠道商 —— storeRemoteList
*/
const state = {
    storeCategoryList: [1],
    storeRemoteList: {
        user: [1],
        hosp: [1],
        all: [1],
    },
    channelAllRemoteList: [1],
};

const getters = {
    getStoreCategoryList: state => state.storeCategoryList,
    getStoreRemoteList: state  => state.storeRemoteList,
    getChannelAllRemoteList: state  => state.channelAllRemoteList,
    getChannelUsableRemoteList: state  => {
        if(state.channelAllRemoteList[0] === 1) {
            return state.channelAllRemoteList
        } else {
            return state.channelAllRemoteList.filter(item => item.status === 1)
        }
    },
};

const actions = {
    setStoreCategoryList: ({ commit }, data) => {
        commit('storeCategoryList', data)
    },
    setStoreRemoteList: ({ commit }, data) => {
        commit('storeRemoteList', data)
    },
    setChannelAllRemoteList: ({ commit }, data) => {
        commit('channelAllRemoteList', data)
    },

    setCleanRemoteFilterStore: ({ commit }, data) => {
        for(let key of Object.keys(state)) {
            if (key === 'storeRemoteList') {
                commit(key, {type: 1, data: [1]})
                commit(key, {type: 2, data: [1]})
                commit(key, {type: 3, data: [1]})
            } else {
                commit(key, [1])
            }
        }
    },
};

const mutations = {
    channelAllRemoteList (state, data) {
        state.channelAllRemoteList = data
    },
    storeCategoryList (state, data) {
        state.storeCategoryList = data
    },
    storeRemoteList (state, data) {
        if(data.type == 1) {
            state.storeRemoteList.hosp = data.data
        } else if(data.type == 2) {
            state.storeRemoteList.user = data.data
        } else if(data.type == 3) {
            state.storeRemoteList.all = data.data
        }
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}