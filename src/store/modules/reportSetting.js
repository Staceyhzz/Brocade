/* 
* 报表静态数据设置
*/

const state = {
  // 表格页大小
  reportPageSize: 10,
  // 门诊类型
  clinicTypeList: [
    {
      id: 1, 
      name: '初诊',
      lang: 'clinicTypeList1'
    },
    {
      id: 2, 
      name: '复诊',
      lang: 'clinicTypeList2'
    },
    {
      id: 3, 
      name: '复查',
      lang: 'clinicTypeList3'
    },
    {
      id: 4, 
      name: '再消费',
      lang: 'clinicTypeList4'
    }
  ],
  //项目订单类型
  orderTypeList: [
    {
      id: 1,
      name: '项目订单',
      lang: 'cashierOrder',
      url: '/cashierOrder'
    },
    {
      id: 3,
      name: '预收款订单',
      lang: 'cashierDepositOrder',
      url: '/cashierDepositOrder'
    },
    {
      id: 4,
      name: '退项目订单',
      lang: 'cashierBackOrder',
      url: '/cashierBackOrder'
    },
    {
      id: 5,
      name: '退预收款订单',
      lang: 'cashierDepositRebateOrder',
      url: '/cashierDepositRebateOrder'
    },
    {
      id: 7,
      name: '渠道商充值单',
      lang: 'channelRecharge',
      url: '/channelRecharge'
    },
    {
      id: 10,
      name: '还款订单',
      lang: 'cashierRepayment',
      url: '/cashierRepayment'
    }
  ],
  //积分变动类型
  pointChangeTypeList: [
    {
      id: 11,
      name: '手工赠送'
    },
    {
      id: 12,
      name: '消费赠送'
    },
    {
      id: 21,
      name: '手工扣减'
    },
    {
      id: 22,
      name: '兑换券'
    },
    // {
    //   id: 23,
    //   name: '兑换产品'
    // },
    {
      id: 24,
      name: '退款扣减'
    },
    // {
    //   id: 25,
    //   name: '退单扣减'
    // }
  ],
  // 券变动类型
  couponChangeTypeList: [
    {
      id: 1,
      name: '预收款'
    },
    {
      id: 2,
      name: '手工赠送'
    },
    {
      id: 3,
      name: '积分兑换'
    },
    {
      id: 4,
      name: '激活获取'
    },
    {
      id: 5,
      name: '订单划扣'
    },
    {
      id: 6,
      name: '退劵'
    }
  ],
  // 项目订单审核状态
  orderAuditTypeList: [
    {
      id: 0,
      name: '待审核'
    },
    // {
    //   id: 1,
    //   name: '审核中'
    // },
    {
      id: 2,
      name: '审核成功'
    },
    {
      id: 3,
      name: '审核失败'
    },
    // {
    //   id: 4,
    //   name: '未审核'
    // }
  ],
  // 项目订单支付状态
  orderPaidTypeList: [
    {
      id: 1,
      name: '未付款'
    },
    {
      id: 2,
      name: '已付款'
    },
    {
      id: 3,
      name: '欠款'
    }
  ],
  //借用单状态 语言key: borrowOrderStatus + id
  borrowOrderStatus: [
    {
      id: 0,
      name: '未出库'
    },
    {
      id: 1,
      name: '已出未还'
    },
    {
      id: 2,
      name: '归还待入库'
    },
    {
      id: 3,
      name: '归还已入库'
    },
    {
      id: 4,
      name: '已用完'
    }
  ],
  //库存出库类型 语言key: stockOutTypeList + id
  stockOutTypeList: [
    {
      id: 1,
      name: '治疗出库',
    },
    {
      id: 2,
      name: '退货出库',
    },
    {
      id: 3,
      name: '调拨出库',
    },
    {
      id: 4,
      name: '销售出库',
    },
    {
      id: 5,
      name: '盘点出库',
    },
    {
      id: 6,
      name: '领用出库',
    },
    {
      id: 7,
      name: '借用出库',
    },
    {
      id: 8,
      name: '借用归还出库',
    }
  ],
  //库存入库类型 语言key: stockInTypeList + id
  stockInTypeList: [
    {
      id: 1,
      name: '进货入库',
    },
    {
      id: 2,
      name: '调拨入库',
    },
    {
      id: 3,
      name: '盘点入库',
    },
    {
      id: 4,
      name: '退零售项目入库',
    },
    {
      id: 5,
      name: '借用入库',
    },
    {
      id: 6,
      name: '借用归还入库',
    }
  ],
};

const getters = {
  getPageSize: state => state.reportPageSize,
  getClinicTypeList: state => state.clinicTypeList,
  getOrderTypeList: state => state.orderTypeList,
  getPointChangeTypeList: state => state.pointChangeTypeList,
  getCouponChangeTypeList: state => state.couponChangeTypeList,
  getOrderAuditTypeList: state => state.orderAuditTypeList,
  getOrderPaidTypeList: state => state.orderPaidTypeList,
  getBorrowOrderStatus: state => state.borrowOrderStatus,
  getStockOutTypeList: state => state.stockOutTypeList,
  getStockInTypeList: state => state.stockInTypeList,
};

const actions = {
  // setCustomerDataName: ({ commit }, data) => {
  //     commit('customerDataName', data);
  // },
  // setPowerLoading: ({ commit }, data) => {
  //     commit('powerLoading', data);
  // },
  // setPageLoading: ({ commit }, data) => {
  //     commit('pageLoading', data);
  // },
  // setDeptBorrowStatus: ({ commit }, data) => {
  //     commit('deptBorrowStatus', data);
  // },
};

const mutations = {
  // customerDataName (state, data) {
  //     state.customerDataName = data;
  // },
  // powerLoading (state, data) {
  //     state.powerLoading = data;
  // },
  // pageLoading (state, data) {
  //     state.powerLoading.pageLoading = data;
  // },
  // deptBorrowStatus (state, data) {
  //     state.deptBorrowStatus = data
  // },
};

export default {
  state,
  getters,
  actions,
  mutations
}