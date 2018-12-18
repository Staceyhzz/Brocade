const state = {
    liveDeskMsg: '',
    liveDeskUserList: [],
};

const getters = {
    getLiveDeskMsg: state => {
        if(state.liveDeskMsg) {
            return state.liveDeskUserList.filter(item => item.customerID === state.liveDeskMsg)[0]
        } else {
            return state.liveDeskUserList.filter(item => item.customerID === sessionStorage.getItem('liveId') * 1)[0] || {}
        }
    },
    getLiveDeskUserList: state => state.liveDeskUserList,
};

const actions = {
    setLiveDeskMsg: ({ commit }, data) => {
        commit('liveDeskMsg', data);
    },
    setLiveDeskUserList: ({ commit }, data) => {
        commit('liveDeskUserList', data);
    },
    setLiveFilterStatus: ({ commit }, data) => {
        let _targetArr = [],
            _spareArr = [],
            _type = data.type,
            _key = data.key,
            _data = data.data
        _data.map(item => {
            if(item[_key] === _type) {
                _targetArr.push(item)
            } else {
                _spareArr.push(item)
            }
        })
        commit('liveDeskUserList', [..._targetArr, ..._spareArr])
    },
    setLiveFilterPinyin: ({ commit }, data) => {
        let _data = data.data,
            _key = data.key,
            _status = data.status
        if(_status) {
            _data = _data.sort((x, y) => x[_key].localeCompare(y[_key]))
        } else {
            _data = _data.sort((x, y) => y[_key].localeCompare(x[_key]))
        }
        commit('liveDeskUserList', _data)
    },
    setLiveFilterNum: ({ commit }, data) => {
        let _data = data.data,
            _key = data.key,
            _status = data.status
        if(_status) {
            _data = _data.sort((x, y) => x[_key] - y[_key])
        } else {
            _data = _data.sort((x, y) => y[_key] - x[_key])
        }
        commit('liveDeskUserList', _data)
    },
    setLiveConsultChange: ({ commit }, data) => {
        let _list = state.liveDeskUserList
        _list.map(item => {
            if(item.customerID === data.customerID) {
                item.symptomName = data.symptomName
                item.symptom2Name = data.symptom2Name
                item.symptom3Name = data.symptom3Name
                item.symptom4Name = data.symptom4Name
                item.symptom5Name = data.symptom5Name
            }
        })
        commit('liveDeskUserList', _list)
    },
};

const mutations = {
    liveDeskMsg (state, data) {
        state.liveDeskMsg = data
    },
    liveDeskUserList (state, data) {
        state.liveDeskUserList = data
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}