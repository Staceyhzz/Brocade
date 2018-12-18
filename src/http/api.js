/**
 * Created on 2017/5/2.
 * 该文件主要用于请求数据的公用方法
 */

//包引入
import axios from 'axios';
import qs from 'qs';
import cache from 'utils/cache'

axios.defaults.timeout = 30000;

process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = '/');
// process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = 'http://192.168.1.36:8080');
// process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = 'https://www.easyhrp.com');


export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios({
                method: 'get',
                url: url,
                params: params || {},
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'adminToken' : cache.readToken('adminToken') || ''
                }
            })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default {
    /**
     * 医院下拉列表(包括总院)
     */
    SelectAllHospList () {
        return fetch('guard-webManager/select/hospitalInfo.jhtml')
    },

    /**
     * 医院下拉列表(无总院)
     */
    SelectRealHospList () {
        return fetch('guard-webManager/select/realHospitalInfo.jhtml')
    },

    /**
     * 部门下拉列表{hospitalId}
     */
    SelectDeptList (id) {
        return fetch('guard-webManager/select/hospitalDeptInfo.jhtml', {hospitalId: id})
    },

    /**
     * 日常办公排班类型
     */
    SelectShiftCategoryList () {
        return fetch('guard-webManager/select/shiftCategoryInfo.jhtml')
    },

    /**
     *  劵类型下拉列表
     */
    SelectCouponCateList () {
        return fetch('guard-webManager/select/couponCategoryList.jhtml')
    },

    /**
     * 未成交类型下拉列表
     */
    SelectAllFailtureCategoryList () {
        return fetch('guard-webManager/select/failtureCategoryInfo.jhtml')
    },

    /**
     * 岗位分工下拉列表
     */
    SelectAllPositionList () {
        return fetch('guard-webManager/select/allPositionInfoState.jhtml')
    },

    /**
     * 报表项目下拉列表
     */
    SelectAllItemList () {
        return fetch('guard-webManager/select/itemInfoState.jhtml')
    },

    /**
     * 报表项目组下拉列表
     */
    SelectAllItemGroupList () {
        return fetch('guard-webManager/select/itemGroupInfoState.jhtml')
    },

    /**
     * 所有咨询项目下拉列表
     */
    SelectAllSymptomInfoList () {
        return fetch('guard-webManager/select/symptomInfo.jhtml')
    },
    /**
     * 部分咨询项目(不含禁用)下拉列表
     */
    SelectSymptomInfoList () {
        return fetch('guard-webManager/select/symptomAvailableInfo.jhtml')
    },

    /**
     * 联系方式(工具、沟通)下拉列表
     */
    SelectToolList () {
        return fetch('guard-webManager/select/toolInfo.jhtml')
    },

    /**
     * 会员类型下拉列表
     */
    SelectMemberList () {
        return fetch('guard-webManager/select/memberCategoryInfo.jhtml')
    },

    /**
     * 医院仓库下拉列表
     */
    SelectHospitalWarehouseList (id) {
        return fetch('guard-webManager/select/hospitalWarehouseInfo.jhtml', {hospitalId: id})
    },

    /**
     * 全部仓库下拉列表
     */
    SelectAllWarehouseList () {
        return fetch('guard-webManager/select/warehouseInfo.jhtml')
    },

    /**
     * 操作人员仓库下拉列表
     */
    SelectUserWarehouseList (id) {
        return fetch('guard-webManager/select/userWarehouseInfo.jhtml', {userID: id})
    },

    /**
     * 物品分类下拉列表（一级）
     */
    SelectProductCategoryFirstList () {
        return fetch('guard-webManager/select/productCategoryInfo.jhtml')
    },

    /**
     *投诉类型下拉列表 
     */
    SelectAllComplainCategoryList () {
        return fetch('guard-webManager/select/allComplainCategoryInfo.jhtml')
    },

    /**
     *回访类型下拉列表(只列出未禁用)
     */
    SelectCallbackCategoryInfoList () {
        return fetch('guard-webManager/select/callbackCategoryInfo.jhtml')
    },

    /**
     * 客户来源归类下拉列表
     */
    SelectChannelGroupList () {
        return fetch('guard-webManager/select/channelGroupInfo.jhtml')
    },

    /**
     *来源（含禁用）下拉列表
     */
    SelectAllChannelList () {
        return fetch('guard-webManager/select/channelInfo.jhtml')
    },
    
    /**
     * 预收款项目（含禁用）下拉列表
     */
    SelectAllDepositChargeList () {
        return fetch('guard-webManager/select/allDepositChargeInfo.jhtml')
    },

    /**
     * 系统日志类型下拉列表
     */
    SelectLogTypeInfoList () {
        return fetch('guard-webManager/select/logTypeInfo.jhtml')
    },

    /**
     * 单位下拉列表
     */
    SelectUnitInfoList () {
        return fetch('guard-webManager/select/unitInfo.jhtml')
    },

    /**
     * 获取未读消息
     */
    UnReadMessageNum () {
        return fetch('guard-webManager/select/unReadMessageNum.jhtml')
    },
}
