/* 
* @Author: Moriarty
* 下拉仓库
* 
* 所有医院下拉 —— selectAllHospList
* 无总院医院下拉 —— selectRealHospList
* 部门下拉 —— selectDeptList
* 日常办公排班类型 —— selectShiftCategoryList
* 劵类型下拉 —— seleCouponCateList
* 未成交类型下拉列表 —— selectAllFailtureCategoryList
* 岗位分工下拉列表 —— selectAllPositionList
* 报表项目下拉列表 —— selectAllItemList
* 报表项目组下拉列表 —— selectAllItemGroupList
* 所有咨询项目下拉列表 —— selectAllSymptomInfoList
* 部分咨询项目下拉列表 —— selectSymptomInfoList
* 联系方式(工具、沟通)下拉列表 —— selectToolList
* 会员类型下拉列表 —— selectMemberList
* 医院仓库下拉列表 —— selectHospitalWarehouseList
* 全部仓库下拉列表 —— selectAllWarehouseList
* 操作人员仓库下拉列表 —— selectUserWarehouseList
* 物品分类下拉列表（一级） —— selectProductCategoryFirstList
* 投诉类型下拉列表 —— selectAllComplainCategoryList
* 回访类型下拉列表(只列出未禁用) —— selectCallbackCategoryInfoList
* 客户来源归类下拉列表 —— selectChannelGroupList
* 来源（含禁用）下拉列表 ——  selectAllChannelList
* 预收款（含禁用）下拉列表 —— selectAllDepositChargeList
* 系统日志类型下拉列表 —— selectLogTypeInfoList
* 单位下拉列表 —— selectUnitInfoList
*
* *****
* 客户未读消息 —— unReadMessageNum
* *****
*/
import api from '../../http/api.js'
const state = {
    selectRealHospList: [1],
    selectUserWarehouseList: [1],
    selectUnitInfoList: [1],
    selectAllHospList: [1],
    selectDeptList: [1],
    selectShiftCategoryList: [1],
    selectCouponCateList:[1],
    selectAllFailtureCategoryList: [1],
    selectAllPositionList: [1],
    selectAllItemList: [1],
    selectAllItemGroupList: [1],
    selectAllSymptomInfoList: [1],
    selectSymptomInfoList: [1],
    selectToolList: [1],
    selectMemberList: [1],
    selectHospitalWarehouseList: [1],
    selectProductCategoryFirstList: [1],
    selectAllComplainCategoryList: [1],
    selectCallbackCategoryInfoList: [1],
    selectAllWarehouseList: [1],
    selectChannelGroupList: [1],
    selectAllChannelList: [1],
    selectAllDepositChargeList: [1],
    selectLogTypeInfoList: [1],
    unReadMessageNum: 0,
};

const getters = {
    getSelectRealHospList: state => {
        if(state.selectRealHospList[0] === 1) {
            return []
        } else {
            return state.selectRealHospList
        }
    },
    getUnReadMessageNum: state => state.unReadMessageNum,
    getSelectUserWarehouseList: state => {
        if(state.selectUserWarehouseList[0] === 1) {
            return []
        } else {
            return state.selectUserWarehouseList
        }
    },
    getSelectUnitInfoList: state => {
        if(state.selectUnitInfoList[0] === 1) {
            return []
        } else {
            return state.selectUnitInfoList
        }
    },
    getSelectAllHospList: state => {
        if(state.selectAllHospList[0] === 1) {
            return []
        } else {
            return state.selectAllHospList
        }
    },
    getSelectDeptList: state => {
        if(state.selectDeptList[0] === 1) {
            return []
        } else {
            return state.selectDeptList
        }
    },
    getSelectShiftCategoryList: state => {
        if(state.selectShiftCategoryList[0] === 1) {
            return []
        } else {
            return state.selectShiftCategoryList
        }
    },
    getSelectCouponCateList: state => {
        if(state.selectCouponCateList[0] === 1) {
            return []
        } else {
            return state.selectCouponCateList
        }
    },
    getSelectAllFailtureCategoryList: state => {
        if(state.selectAllFailtureCategoryList[0] === 1) {
            return []
        } else {
            return state.selectAllFailtureCategoryList
        }
    },
    getSelectAllPositionList: state => {
        if(state.selectAllPositionList[0] === 1) {
            return []
        } else {
            return state.selectAllPositionList
        }
    },
    getSelectAllItemList: state => {
        if(state.selectAllItemList[0] === 1) {
            return []
        } else {
            return state.selectAllItemList
        }
    },
    getSelectAllItemGroupList: state => {
        if(state.selectAllItemGroupList[0] === 1) {
            return []
        } else {
            return state.selectAllItemGroupList
        }
    },
    getSelectAllSymptomInfoList: state => {
        if(state.selectAllSymptomInfoList[0] === 1) {
            return []
        } else {
            return state.selectAllSymptomInfoList
        }
    },
    getSelectSymptomInfoList: state => {
        if(state.selectSymptomInfoList[0] === 1) {
            return []
        } else {
            return state.selectSymptomInfoList
        }
    },
    getSelectToolList: state => {
        if(state.selectToolList[0] === 1) {
            return []
        } else {
            return state.selectToolList
        }
    },
    getSelectMemberList: state => {
        if(state.selectMemberList[0] === 1) {
            return []
        } else {
            return state.selectMemberList
        }
    },
    getSelectHospitalWarehouseList: state => {
        if(state.selectHospitalWarehouseList[0] === 1) {
            return []
        } else {
            return state.selectHospitalWarehouseList
        }
    },
    getSelectProductCategoryFirstList: state => {
        if(state.selectProductCategoryFirstList[0] === 1) {
            return []
        } else {
            return state.selectProductCategoryFirstList
        }
    },
    getSelectAllComplainCategoryList: state => {
        if(state.selectAllComplainCategoryList[0] === 1) {
            return []
        } else {
            return state.selectAllComplainCategoryList
        }
    },
    getSelectCallbackCategoryInfoList: state => {
        if(state.selectCallbackCategoryInfoList[0] === 1) {
            return []
        } else {
            return state.selectCallbackCategoryInfoList
        }
    },
    getSelectAllWarehouseList: state => {
        if(state.selectAllWarehouseList[0] === 1) {
            return []
        } else {
            return state.selectAllWarehouseList
        }
    },
    getSelectChannelGroupList: state => {
        if(state.selectChannelGroupList[0] === 1) {
            return []
        } else {
            return state.selectChannelGroupList
        }
    },
    getSelectAllChannelList: state => {
        if(state.selectAllChannelList[0] === 1) {
            return []
        } else {
            return state.selectAllChannelList
        }
    },
    getSelectAllDepositChargeList: state => {
        if(state.selectAllDepositChargeList[0] === 1) {
            return []
        } else {
            return state.selectAllDepositChargeList
        }
    },
    getSelectLogTypeInfoList: state => {
        if(state.selectLogTypeInfoList[0] === 1) {
            return []
        } else {
            return state.selectLogTypeInfoList
        }
    }
};

const actions = {
    setSelectRealHospList: ({ commit }, data) => {
        if(state.selectRealHospList[0] === 1) {
            api.SelectRealHospList()
                .then(res => {
                    commit('selectRealHospList', res.content)
                })
        }
    },

    setUnReadMessageNum: ({ commit }, data) => {
        api.UnReadMessageNum()
            .then(res => {
                let num = res.content || 0
                commit('unReadMessageNum', num)
            })
    },

    setSelectUserWarehouseList: ({ commit }, data) => {
        if(state.selectUserWarehouseList[0] === 1) {
            api.SelectUserWarehouseList(data)
                .then(res => {
                    commit('selectUserWarehouseList', res.content)
                })
        }
    },

    setSelectUnitInfoList: ({ commit }, data) => {
        if(state.selectUnitInfoList[0] === 1) {
            api.SelectUnitInfoList()
                .then(res => {
                    commit('selectUnitInfoList', res.content)
                })
        }
    },

    setSelectAllHospList: ({ commit }, data) => {
        if(state.selectAllHospList[0] === 1) {
            api.SelectAllHospList()
                .then(res => {
                    commit('selectAllHospList', res.content)
                })
        }
    },

    setSelectDeptList: ({ commit }, data) => {
        if(state.selectDeptList[0] === 1) {
            api.SelectDeptList(data)
                .then(res => {
                    commit('selectDeptList', res.content)
                })
        }
    },
    setSelectDeptChange: ({ commit }, data) => {
        api.SelectDeptList(data)
            .then(res => {
                commit('selectDeptList', res.content)
            })
    },

    setSelectShiftCategoryList: ({ commit }, data) => {
        if(state.selectShiftCategoryList[0] === 1) {
            api.SelectShiftCategoryList()
                .then(res => {
                    commit('selectShiftCategoryList', res.content)
                })
        }
    },

    setSelectCouponCateList: ({ commit },data) =>{
        if(state.selectCouponCateList[0] === 1) {
            api.SelectCouponCateList()
                .then(res => {
                    commit('selectCouponCateList', res.content)
                })
        }
    },

    setSelectAllFailtureCategoryList: ({ commit }, data) => {
      if(state.selectAllFailtureCategoryList[0] === 1) {
            api.SelectAllFailtureCategoryList()
                .then(res => {
                    commit('selectAllFailtureCategoryList', res.content)
                })
        }
    },

    setSelectAllPositionList: ({ commit }, data) => {
      if(state.selectAllPositionList[0] === 1) {
            api.SelectAllPositionList()
                .then(res => {
                    commit('selectAllPositionList', res.content)
                })
        }
    },

    setSelectAllItemList: ({ commit }, data) => {
      if(state.selectAllItemList[0] === 1) {
            api.SelectAllItemList()
                .then(res => {
                    commit('selectAllItemList', res.content)
                })
        }
    },

    setSelectAllItemGroupList: ({ commit }, data) => {
      if(state.selectAllItemGroupList[0] === 1) {
            api.SelectAllItemGroupList()
                .then(res => {
                    commit('selectAllItemGroupList', res.content)
                })
        }
    },

    setSelectAllSymptomInfoList: ({ commit }, data) => {
      if(state.selectAllSymptomInfoList[0] === 1) {
            api.SelectAllSymptomInfoList()
                .then(res => {
                    commit('selectAllSymptomInfoList', res.content)
                })
        }
    },

    setSelectSymptomInfoList: ({ commit }, data) => {
      if(state.selectSymptomInfoList[0] === 1) {
            api.SelectSymptomInfoList()
                .then(res => {
                    commit('selectSymptomInfoList', res.content)
                })
        }
    },

    setSelectToolList: ({ commit }, data) => {
      if(state.selectToolList[0] === 1) {
            api.SelectToolList()
                .then(res => {
                    commit('selectToolList', res.content)
                })
        }
    },

    setSelectMemberList: ({ commit }, data) => {
      if(state.selectMemberList[0] === 1) {
            api.SelectMemberList()
                .then(res => {
                    commit('selectMemberList', res.content)
                })
        }
    },

    setSelectHospitalWarehouseList: ({ commit }, data) => {
      if(state.selectHospitalWarehouseList[0] === 1) {
            api.SelectHospitalWarehouseList(data)
                .then(res => {
                    commit('selectHospitalWarehouseList', res.content)
                })
        }
    },
    
    setSelectProductCategoryFirstList: ({ commit }, data) => {
      if(state.selectProductCategoryFirstList[0] === 1) {
            api.SelectProductCategoryFirstList()
                .then(res => {
                    commit('selectProductCategoryFirstList', res.content)
                })
        }
    },
    
    setSelectAllComplainCategoryList: ({ commit }, data) => {
      if(state.selectAllComplainCategoryList[0] === 1) {
            api.SelectAllComplainCategoryList()
                .then(res => {
                    commit('selectAllComplainCategoryList', res.content)
                })
        }
    },

    setSelectCallbackCategoryInfoList: ({ commit }, data) => {
      if(state.selectCallbackCategoryInfoList[0] === 1) {
            api.SelectCallbackCategoryInfoList()
                .then(res => {
                    commit('selectCallbackCategoryInfoList', res.content)
                })
        }
    },
    
    setSelectAllWarehouseList: ({ commit }, data) => {
      if(state.selectAllWarehouseList[0] === 1) {
            api.SelectAllWarehouseList()
                .then(res => {
                    commit('selectAllWarehouseList', res.content)
                })
        }
    },
    
    setSelectChannelGroupList: ({ commit }, data) => {
      if(state.selectChannelGroupList[0] === 1) {
            api.SelectChannelGroupList()
                .then(res => {
                    commit('selectChannelGroupList', res.content)
                })
        }
    },
    
    setSelectAllChannelList: ({ commit }, data) => {
      if(state.selectAllChannelList[0] === 1) {
            api.SelectAllChannelList()
                .then(res => {
                    commit('selectAllChannelList', res.content)
                })
        }
    },

    setSelectAllDepositChargeList: ({ commit }, data) => {
        if(state.selectAllDepositChargeList[0] === 1) {
            api.SelectAllDepositChargeList()
                .then(res => {
                    commit('selectAllDepositChargeList', res.content)
                })
        }
    },

    setSelectLogTypeInfoList: ({ commit }, data) => {
        if(state.selectLogTypeInfoList[0] === 1) {
            api.SelectLogTypeInfoList()
                .then(res => {
                    commit('selectLogTypeInfoList', res.content)
                })
        }
    },

    setCleanSelectStore: ({ commit }, data) => {
        for(let key of Object.keys(state)) {
            if(key !== 'unReadMessageNum') {
                commit(key, [1])
            }
        }
    },
};

const mutations = {
    selectRealHospList (state, data) {
        state.selectRealHospList = data
    },
    unReadMessageNum (state, data) {
        state.unReadMessageNum = data
    },
    selectUserWarehouseList (state, data) {
        state.selectUserWarehouseList = data
    },
    selectUnitInfoList (state, data) {
        state.selectUnitInfoList = data
    },
    selectAllHospList (state, data) {
        state.selectAllHospList = data
    },
    selectDeptList (state, data) {
        state.selectDeptList = data
    },
    selectShiftCategoryList (state, data) {
        state.selectShiftCategoryList = data
    },
    selectCouponCateList (state, data) {
        state.selectCouponCateList = data
    },
    selectAllFailtureCategoryList (state, data) {
        state.selectAllFailtureCategoryList = data
    },
    selectAllPositionList (state, data) {
        state.selectAllPositionList = data
    },
    selectAllItemList (state, data) {
        state.selectAllItemList = data
    },
    selectAllItemGroupList (state, data) {
        state.selectAllItemGroupList = data
    },
    selectAllSymptomInfoList (state, data) {
        state.selectAllSymptomInfoList = data
    },
    selectSymptomInfoList (state, data) {
        state.selectSymptomInfoList = data
    },
    selectToolList (state, data) {
        state.selectToolList = data
    },
    selectMemberList (state, data) {
        state.selectMemberList = data
    },
    selectHospitalWarehouseList (state, data) {
        state.selectHospitalWarehouseList = data
    },
    selectProductCategoryFirstList (state, data) {
        state.selectProductCategoryFirstList = data
    },
    selectAllComplainCategoryList (state, data) {
        state.selectAllComplainCategoryList = data
    },
    selectCallbackCategoryInfoList (state, data) {
        state.selectCallbackCategoryInfoList = data
    },
    selectAllWarehouseList (state, data) {
        state.selectAllWarehouseList = data
    },
    selectChannelGroupList (state, data) {
        state.selectChannelGroupList = data
    },
    selectAllChannelList (state, data) {
        state.selectAllChannelList = data
    },
    selectAllDepositChargeList (state, data) {
        state.selectAllDepositChargeList = data
    },
    selectLogTypeInfoList (state, data) {
        state.selectLogTypeInfoList = data
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}