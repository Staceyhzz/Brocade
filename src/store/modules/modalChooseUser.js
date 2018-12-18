/* 
* @Author: Moriarty
* 弹窗选择仓库
* 医院下拉弹窗选择 —— hospList —— hospUserList
* 部门下拉弹窗选择 —— deptList —— deptUserList
* 物品药物品弹窗选择 —— productCategoryList
* 收费项目类型弹窗选择 —— chargeCategoryList
* 供应商弹窗选择 —— supplierList
* 渠道 弹窗选择 —— storeList
* 收费项目 弹窗选择 —— chargeList
* 医院部门 弹窗选择 —— hospDeptList
*/
const state = {
    hospList: [1],
    hospUserList: [1],
    deptList: [1],
    deptUserList: [1],
    productCategoryList: [1],
    chargeCategoryList: [1],
    supplierList: [1],
    storeList: {
        user: [1],
        hosp: [1],
        all: [1],
    },
    chargeList: [],
    hospDeptList: [1],
};

const getters = {
    getHospList: state => state.hospList,
    getHospUserList: state => state.hospUserList,
    getDeptList: state => state.deptList,
    getDeptUserList: state => state.deptUserList,
    getProductCategoryList: state => state.productCategoryList,
    getChargeCategoryList: state => state.chargeCategoryList,
    getSupplierList: state => state.supplierList,
    getStoreList: state  => state.storeList,
    getChargeList: state  => state.chargeList,
    getHospDeptList: state => state.hospDeptList
};

const actions = {
    setHospList: ({ commit }, data) => {
        commit('hospList', data)
    },
    setHospUserList: ({ commit }, data) => {
        commit('hospUserList', data)
    },
    setDeptList: ({ commit }, data) => {
        commit('deptList', data)
    },
    setDeptUserList: ({ commit }, data) => {
        commit('deptUserList', data)
    },
    setProductCategoryList: ({ commit }, data) => {
        commit('productCategoryList', data)
    },
    setChargeCategoryList: ({ commit }, data) => {
        commit('chargeCategoryList', data)
    },
    setSupplierList: ({ commit }, data) => {
        commit('supplierList', data)
    },
    setStoreList: ({ commit }, data) => {
    	commit('storeList', data)
    },
    setChargeList: ({ commit }, data) => {
        commit('chargeList', data)
    },
    setHospDeptList: ({ commit }, data) => {
        commit('hospDeptList', data)
    },

    setCleanModalStore: ({ commit }, data) => {
        for(let key of Object.keys(state)) {
            if(key !== 'storeList' && key !== 'chargeList') {
                commit(key, [1])
            } else if (key === 'storeList') {
                commit(key, {type: 1, data: [1]})
                commit(key, {type: 2, data: [1]})
                commit(key, {type: 3, data: [1]})
            }
        }
    },
};

const mutations = {
    hospList (state, data) {
        state.hospList = data
    },
    hospUserList (state, data) {
        state.hospUserList = data
    },
    deptList (state, data) {
        state.deptList = data
    },
    deptUserList (state, data) {
        state.deptUserList = data
    },
    productCategoryList (state, data) {
        state.productCategoryList = data
    },
    chargeCategoryList (state, data) {
        state.chargeCategoryList = data
    },
    supplierList (state, data) {
        state.supplierList = data
    },
    storeList (state, data) {
        if(data.type == 1) {
            state.storeList.hosp = data.data
        } else if(data.type == 2) {
            state.storeList.user = data.data
        } else if(data.type == 3) {
            state.storeList.all = data.data
        }
    },
    chargeList (state, data) {
        state.chargeList = data
    },
    hospDeptList (state, data) {
        state.hospDeptList = data
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}