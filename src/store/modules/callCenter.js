/* 
* @Author: Moriarty
* 呼叫中心
*/

const state = {
    callFlowSteps: 0,
    callCenterAdd: {

    }
}

const getters = {
    getCallFlowSteps: state => state.callFlowSteps,
};

const actions = {
    setCallFlowSteps: ({ commit }, data) => { 
        commit('callFlowSteps', data);
    },
};

const mutations = {
    callFlowSteps (state, data) {
        state.callFlowSteps = data;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}