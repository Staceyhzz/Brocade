import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import mutations from './mutations';
import actions from './actions';
//import getters from './getters';

//模块
import navLink from './modules/navLink';
import breadData from './modules/breadData';
import cusPower from './modules/cusPower';
import modalChooseUser from './modules/modalChooseUser';
import selectList from './modules/selectList';
import liveDeskStore from './modules/liveDeskStore';
import callCenter from './modules/callCenter';
import remoteFilterSelect from './modules/remoteFilterSelect';
import reportSetting from './modules/reportSetting';
import publicSettings from './modules/publicSettings';
import asyncRouter from './modules/asyncRouter';

export default new Vuex.Store({
    modules: {
        mutations,
        navLink,
        breadData,
        cusPower,
        modalChooseUser,
        selectList,
        liveDeskStore,
        callCenter,
        remoteFilterSelect,
        reportSetting,
        publicSettings,
        asyncRouter
    },
    // 把actions导出去
    actions
});
