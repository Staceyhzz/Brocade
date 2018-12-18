/* 
* @Author: Moriarty
* loading —— powerLoading
*/

const state = {
    powerLoading: {
        pageLoading: -1,
        powerErrorMsg: '',
    },
    deptBorrowStatus: true,
    baseImgURL: '',
    openOtherTabUrl: '/#/customerIndex?type=blank',
    customerDataName: '',
    exportPrefixURL: '',
    viewResize: false,
    keepAliveView: ['view_charge', 'view_callSwitchboard', 'view_callPattern', 'view_callCenterLog', 'view_customer', 'view_customerRFM', 'view_intentionDistinguish', 'view_callbackDesk', 'view_cashierList', 'view_store', 'view_product'],
    landRouterKey: '',
    langContentKey: 0,
};

const getters = {
    getCustomerDataName: state => state.customerDataName,
    getOpenOtherTabUrl: state => state.openOtherTabUrl,
    getPageLoading: state => state.powerLoading.pageLoading,
    getPowerErrorMsg: state => state.powerLoading.powerErrorMsg,
    getBaseImgURL: state => state.baseImgURL,
    getExportPrefixURL: state => state.exportPrefixURL,
    getDeptBorrowStatus: state => state.deptBorrowStatus,
    getViewResize: state => state.viewResize,
    getKeepAliveView: state => state.keepAliveView,
    getLandRouterKey: state => state.landRouterKey,
    getLangContentKey: state => state.langContentKey,
};

const actions = {
    setCustomerDataName: ({ commit }, data) => {
        commit('customerDataName', data);
    },
    setPowerLoading: ({ commit }, data) => {
        commit('powerLoading', data);
    },
    setPageLoading: ({ commit }, data) => {
        commit('pageLoading', data);
    },
    setDeptBorrowStatus: ({ commit }, data) => {
        commit('deptBorrowStatus', data);
    },
    setViewResize: ({ commit }, data) => {
        const bool = !state.viewResize;
        commit('viewResize', bool);
    },
    cleanKeepAliveView: ({ commit }, data) => {
        commit('cleanKeepAliveView', data);
    },
    setKeepAliveView: ({ commit }, data) => {
        commit('setKeepAliveView', data);
    },
    setLandRouterKey: ({ commit }, data) => {
        commit('landRouterKey', data);
    },
    setLangContentKey: ({ commit }, data) => {
        commit('langContentKey', data);
    },
    setLangContentKeyFirst: ({ commit }, data) => {
        const val = localStorage.getItem('langKey') * 1;
        commit('langContentKey', val);
    },
};

const mutations = {
    customerDataName (state, data) {
        state.customerDataName = data;
    },
    powerLoading (state, data) {
        state.powerLoading = data;
    },
    pageLoading (state, data) {
        state.powerLoading.pageLoading = data;
    },
    deptBorrowStatus (state, data) {
        state.deptBorrowStatus = data
    },
    viewResize (state, data) {
        state.viewResize = data
    },
    cleanKeepAliveView (state, data) {
        state.keepAliveView = [];
    },
    setKeepAliveView (state, data) {
        state.keepAliveView = ['view_charge', 'view_callSwitchboard', 'view_callPattern', 'view_callCenterLog', 'view_customer', 'view_customerRFM', 'view_intentionDistinguish', 'view_callbackDesk', 'view_cashierList', 'view_store', 'view_product'];
    },
    landRouterKey (state, data) {
        state.landRouterKey = data
    },
    langContentKey (state, data) {
        state.langContentKey = data
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}