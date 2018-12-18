/* 
 * 打印设置
 */

const state = {
  fontFamilyList: [
    {
      name: '宋体',
      val: '宋体,SimSun',
    },
    {
      name: '楷体',
      val: '楷体,楷体_GB2312, SimKai',
    },
    {
      name: '微软雅黑',
      val: '微软雅黑,Microsoft YaHei',
    },
    {
      name: '黑体',
      val: '黑体, SimHei',
    },
    {
      name: '隶书',
      val: '隶书, SimLi',
    },
    {
      name: 'andale mono',
      val: 'andale mono',
    },
    {
      name: 'arial',
      val: 'arial, helvetica,sans-serif',
    },
    {
      name: 'arial black',
      val: 'arial black,avant garde',
    },
    {
      name: 'comic sans ms',
      val: 'comic sans ms',
    },
    {
      name: 'impact',
      val: 'impact,chicago',
    },
    {
      name: 'times new roman',
      val: 'times new roman',
    },
  ],
  printTypeSet: [
    {
      id: 'order',
      name: '项目单',
      nameLang: 'orderName',
      remark: 'orderRemark'
    },
    {
      id: 'repayment',
      name: '还款',
      nameLang: 'repaymentName',
      remark: 'repaymentRemark'
    },
    {
      id: 'deposit',
      name: '预收款',
      nameLang: 'depositName',
      remark: 'depositRemark'
    },
    {
      id: 'channelRecharge',
      name: '渠道商充值',
      nameLang: 'channelRechargeName',
      remark: 'channelRechargeRemark'
    },
    {
      id: 'rebate',
      name: '退预收款',
      nameLang: 'rebateName',
      remark: 'rebateRemark'
    },
    {
      id: 'back',
      name: '退项目',
      nameLang: 'backName',
      remark: 'backRemark'
    },
    {
      id: 'settlement',
      name: '结算',
      nameLang: 'settlementName',
      remark: 'settlementRemark'
    },
    {
      id: 'operation',
      name: '划扣',
      nameLang: 'operationName',
      remark: 'operationRemark'
    },
    {
      id: 'surgery',
      name: '手术通知',
      nameLang: 'surgeryName',
      remark: 'surgeryRemark'
    },
    {
      id: 'purchase',
      name: '进货入库',
      nameLang: 'purchaseName',
      remark: 'purchaseRemark'
    },
    {
      id: 'return',
      name: '厂家退货',
      nameLang: 'returnName',
      remark: 'returnRemark'
    },
    {
      id: 'allocate',
      name: '调拨',
      nameLang: 'allocateName',
      remark: 'allocateRemark'
    },
    {
      id: 'check',
      name: '盘点',
      nameLang: 'checkName',
      remark: 'checkRemark'
    },
    {
      id: 'use',
      name: '领用',
      nameLang: 'useName',
      remark: 'useRemark'
    },
    {
      id: 'prescription',
      name: '处方',
      nameLang: 'prescriptionName',
      remark: 'prescriptionRemark'
    },
    {
      id: 'borrow',
      name: '借用申请',
      nameLang: 'borrowName',
      remark: 'borrowRemark'
    },
    {
      id: 'returnBorrowed',
      name: '归还入库',
      nameLang: 'returnBorrowedName',
      remark: 'returnBorrowedRemark'
    },
    {
      id: 'returnSales',
      name: '退药入库',
      nameLang: 'returnSalesName',
      remark: 'returnSalesRemark'
    },
    {
      id: 'stockOutDesk',
      name: '治疗出库',
      nameLang: 'stockOutDeskName',
      remark: 'stockOutDeskRemark'
    }
  ]
};

const getters = {
  getFontFamilyList: state => state.fontFamilyList,
  getPrintTypeSet: state => state.printTypeSet
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
}
