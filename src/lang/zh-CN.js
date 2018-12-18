import reportRecord from './modules/reportRecord_zh-CN';
import basicInfo from './modules/basicInfo_zh-CN';
import systemSet from './modules/systemSet_zh-CN';
import customerFile from './modules/customer_zh-CN';
import customerRFMFile from './modules/customerRFM_zh-CN';
import hospitalCN from './modules/hospital_zh-CN';
import publicStatic from './modules/public_static_zh-CN';
export default {
  /**
   * 公共字段
   */
  publicSet: {
    add: '添加',
    edit: '编辑',
    del: '删除',
    clean: '清空',
    save: '保存',
    cancel: '取消',
    back: '返回',
    search: '查询',
    reset: '重置',
    print: '打印',
    set: '配置',
    check: '查看',
    exportData: '导出',
    tableAction: '操作',
    //弹窗提示
    noticeTit: '系统提示',
    noticeSuccess: '操作成功！',
    noticeError: '操作失败！',
    //状态字段
    newCus: '新客',
    oldCus: '老客',
    enable: '启用',
    disable: '禁用',
    ydz: '已到诊',
    wdz: '未到诊',
    ycj: '已成交',
    wcj: '未成交',
    line: '线下预约',
    onLine: '线上预约',
    man: '男',
    woman: '女',
    //表格分页
    pageMsg: '当前第{0}页，共{1}页，总共{2}条记录',

    consult: '咨询预约',
    treat: '治疗预约',
    surgery: '手术预约',
  },


  /**
   * 公共仓库静态资源
   */
  ...publicStatic,


  /**
   * 公共label
   */
  labelPublic: {
    xh: '序号',
    pxh: '排序号',
    zt: '状态',
    zh: '账号',
    mc: '名称',
    bh: '编号',
    lx: '类型',
    pym: '拼音码',
    gg: '规格',
    price: '价格',
    dw: '单位',
    xm: '姓名',
    xb: '性别',
    gkxm: '顾客姓名',
    gkbh: '顾客编号',
    sjh: '手机号',
    hy: '会员',
    nl: '年龄',
    ms: '描述',
    rq: '日期',
    hkrq: '还款日期',
    tjrq: '提交日期',
    yyrq: '预约日期',
    yy: '医院',
    tjyy: '提交医院',
    yyyy: '预约医院',
    bm: '部门',
    js: '角色',
    yh: '用户',
    jzry: '接诊人员',
    kfry: '开发人员',
    zxry: '咨询人员',
    syry: '收银人员',
    kdry: '开单人员',
    tjry: '提交人员',
    mzlx: '门诊类型',
    gklx: '顾客类型',
    cjzt: '成交状态',
    dzzt: '到诊状态',
    yxfl: '意向分类',
    xfyx: '消费意向',
    jtly: '具体来源',
    jtqd: '具体渠道',
  },


  /**
   * 公共placeholder
   */
  placeholderPublic: {
    kfry: '请选择开发人员',
    jzry: '请选择接诊人员',
    kdry: '请选择开单人员',
    syry: '请选择收银人员',
    tjry: '请选择提交人员',
    zxry: '请选择咨询人员',
    sfxm: '请选择收费项目',
    filter: '快捷搜索',
    input: '请输入',
  },


  /**
   * 公共表单验证
   */
  validPublic: {
    name: '请输入名称',
    remark: '请输入描述',
    number: '请输入数字',
    pinyin1: '请输入拼音码',
    pinyin2: '请输入小写字母、数字',
  },


  /**
   * 主结构左侧导航栏
   */
  layoutNav: {
    //桌面
    desk: '桌面',
    //报表中心
    report: '报表中心',
    reportManage: '报表数据',
    reportRecord: '新报表数据',
    channelGroupManage: '客户来源归类',
    //基础信息
    info: '基础信息',
    channelManage: '来源管理',
    symptomManage: '症状管理',
    callbackCategoryManage: '回访类型管理',
    callbackSetManage: '回访组管理',
    failtureCategoryManage: '未成交类型管理',
    complainCategoryManage: '投诉类型管理',
    tagManage: '标签管理',
    tagGroupManage: '标签组管理',
    unitManage: '单位管理',
    cardCategoryManage: '支付方式管理',
    toolManage: '工具管理',
    relationManage: '关系管理',
    surveyManage: '问卷模板管理',
    medicalRecordManage: '病历模板管理',
    positionTemplate: '追踪模板管理',
    caseManagement: '病例表单管理',
    caseManagementGroup: '病例类型管理',
    caseManagementRecord: '病例记录管理',
    positionManage: '岗位分工管理',
    //系统设置
    setting : '系统设置',
    hospitalManage : '医院管理',
    deptManage : '部门管理',
    userManage : '用户管理',
    userAuthCustomManage : '用户权限自定义',
    roleManage : '角色管理',
    optionManage : '系统设置',
    logManage : '系统日志',
    setBooksManage : '账套管理',
    depositChargeManage : '预收款项目',
    couponCategoryManage : '代金券类型',
    chargeCategoryManage : '收费项目类型',
    chargeManage : '收费项目',
    chargeSetManage : '套餐',
    productCategoryManage : '药物品类型',
    productQualityManage : '药物品属性',
    productManage : '药物品',
    equityManage : '权益管理',
    memberCategoryManage : '会员类型管理',
    chargeDiscountManage : '项目折扣',
    userDiscountManage : '用户折扣',
    printManage : '打印设置',
    auditRuleManage : '审核规则设置',
    managerManage : '编辑权限',
    treatDoctorManage : '医生预约设置',
    consultDoctorManage : '咨询医生设置',
    InstrumentManage : '仪器设备管理',
    appointmentChargeManage : '预约项目设置',
    //客户管理
    customer: '客户管理',
    customerManage: '客户管理',
    complainManage: '投诉记录',
    ownershipManage: '客户归属权更换',
    birthdayRemind: '生日提醒', 
    //顾客运营
    customerSetting: '顾客运营',
    customerRFM: '顾客运营', 
    sliderRFM: 'RFM指标设置',
    dealBusiness: '经营指标设置',
    customerGroupManage: '客户组管理',
    customerFilterManage: '客户选择器',
    //医院设置
    hospital: '医院业务',
    onlineDesk: '网电工作台',
    callbackDesk: '回访工作台',
    receptionFront: '接待工作台',
    liveDesk: '接诊工作台',
    customerDirection: '今日顾客动态',
    chargePriceList: '价格手册',
    cashierDesk: '收银台',
    deptDesk: '科室中心',
    deptBorrow: '借用工作台',
    bedManage: '床位管理',
    InpatientDesk: '住院工作台',
    smsTemplate: '短信模板',
    smsGroup: '短信群发',
    surgeryDeskManage: '手术工作台',
    appointmentToday: '预约工作台',
    activityManage: '活动设置',
    //市场渠道
    market: '市场渠道',
    storeCategoryManage: '品牌管理',
    storeManage: '渠道商管理',
    storeManagerManage: '渠道商负责人',
    commissionDesk: '佣金确认',
    commissionCashier: '佣金付款',
    marketDesk: '市场工作台',
    couponActivity: '券活动',
    //库存管理
    stock: '库存管理',
    warehouseManage: '仓库管理',
    supplierManage: '供应商',
    purchaseManage: '入库管理',
    stockOutManage: '出库管理',
    invoiceManage: '采购发票',
    returnManage: '退货出库',
    allocateManage: '仓库调拨',
    checkManage: '库存盘点',
    useManage: '科室领用',
    stockManage: '库存查询',
    deptStockOutDesk: '科室发料',
    expirationManage: '库存有效期预警',
    //日程办工
    office: '日常办公',
    addressBook: '通讯录',
    shiftCategoryManage: '班次管理',
    myShift: '排班录入',
    shiftManage: '全院排班表',
    noticeManage: '发布公告',
    knowledgeCategoryManage: '知识分类管理',
    knowledgeManage: '知识管理',
    knowledgeQuery: '知识库',
    auditOrder: '我的审核申请',
    auditOrderDesk: '审核工作台',
    //微信
    wechat: '微信',
    opentheguideManage: '开启分销',
    putforwardManage: '提现申请',
    promoterManage: '推荐人管理',
    promoteCustomerManage: '推荐顾客列表',
    promoteRecord: '推荐佣金记录',
    promoteRebate: '佣金结算记录',
    verifyMessageManage: '验证码',
    //呼叫中心
    callCenter: '呼叫中心',
    callSettingManage: '总机管理',
    callRecordManage: '通话记录',
    //渠道分销
    canalsDistribution: '渠道分销',
    distributionBasic: '渠道分销设置',
    distributor: '渠道分销管理',
    distributorRegister: '渠道注册审核管理',
    distributorRecord: '渠道报单记录',
    distributorLevelRecord: '渠道等级记录',
    distributorCashRecord: '渠道提现申请',
    distributorHelp: '微信引导',
  },


  /**
   * 客户档案tabs
   */
  cusMenuTabs: {
    customerMsg: '客户概况',
    indexOrderDetail: '消费项目',
    indexConsult: '咨询情况',
    indexAppointment: '预约情况',
    indexVisit: '上门情况',
    indexFailture: '未成交情况',
    indexOrder: '订单情况',
    indexEffectrRackingtext: '效果追踪',
    indexPhoto: '照片管理',
    indexOperation: '划扣记录',
    indexCallback: '回访情况',
    indexSurvey: '问卷情况',
    indexMedicalRecord: '病历记录',
    indexCaseRecord: '病历管理',
    indexAccount: '账户情况',
    indexMember: '会员权益',
    indexManager: '负责用户',
    indexRelation: '客户间关系',
    indexComplain: '投诉反馈',
    indexCost: '耗材成本',
    indexSms: '短信记录',
    indexAudit: '审核申请',
    indexStore: '渠道',
    indexPromoter: '微信分销',
  },


  /**
   * 客户档案操作导航
   */
  cusNavList: {
    other: '其他',
    channel: '渠道',
    member: '会员',
    admin: '管理',
    medical: '医疗',
    service: '服务',
    finance: '财务',
    common: '常用功能',
    barCode: '二维码',
    customerCommission: '添加渠道商佣金',
    customerMember: '添加会员',
    customerAddEquity: '添加权益',
    customerDeleteEquity: '删除权益',
    customerAddPoint: '赠送积分',
    customerRebatePoint: '扣减积分',
    customerPointCoupon: '积分兑换券',
    customerAddCoupon: '赠送券',
    customerAvatar: '添加头像',
    customerGroup: '客户组管理',
    customerTag: '标签管理',
    customerRelation: '关系管理',
    customerOrderDetailManager: '更换医生',
    customerExploitChange: '开发人员变更',
    customerManagerChange: '咨询人员变更',
    customerBlacklist: '添加黑名单',
    customerConsult: '添加咨询',
    customerCallback: '添加回访',
    customerCallbackTask: '添加回访提醒',
    callbackSet: '添加回访计划',
    customerSurvey: '添加问卷',
    customerMedicalRecord: '添加病历',
    caseManagementCase: '添加病历(新)',
    customerOperation: '补划扣',
    customerDebtOperation: '欠款划扣',
    customerEffectrRackingtext: '添加效果追踪',
    customerPhoto: '添加照片',
    customerAppointment: '添加咨询预约',
    customerTreat: '添加治疗预约',
    customerSurgery: '添加手术预约',
    customerRebateCoupon: '退券',
    customerBack: '添加退项目订单',
    customerDepositRebate: '提现',
    customerReparations: '添加赔款单',
    customerComplain: '添加投诉',
    customerDeposit: '添加预收款订单',
    customerOrder: '添加项目订单',
    customerFailture: '添加未成交',
    customerActiveCoupon: '激活券',
    customerTransfer: '转账',
  },
  

  /**
   * 用户操作权限
   */
  userPermissions: {
    acceptAppointment: '可被预约',
    acceptAppointmentRemark: '手术预约时参与预约的医生',
    acceptShift: '参与排班',
    acceptShiftRemark: '参与排班',
    isDoctor: '是医生',
    isDoctorRemark: '添加订单时，项目可选择的医生',
    isMedical: '是医护人员',
    isMedicalRemark: '划扣时可选',
    viewContact: '可以查看联系方式',
    viewContactRemark: '可以查看客户的联系方式',
    allowExport: '可以导出数据',
    allowExportRemark: '具有导出数据的权限',
    barCode: '添加二维码',
    barCodeRemark: '可以在客户档案添加二维码',
    customerConsult: '添加咨询',
    customerConsultRemark: '可以在客户档案添加咨询',
    customerCallback: '添加回访',
    customerCallbackRemark: '可以在客户档案添加回访',
    customerCallbackTask: '添加回访提醒',
    customerCallbackTaskRemark: '可以在客户档案添加回访提醒',
    callbackSet: '添加回访计划',
    callbackSetRemark: '可以在客户档案添加回访计划',
    customerAppointment: '添加咨询预约',
    customerAppointmentRemark: '可以添加咨询预约',
    customerTreat: '添加治疗预约',
    customerTreatRemark: '可以添加治疗预约',
    customerSurgery: '添加手术预约',
    customerSurgeryRemark: '可以添加手术预约',
    customerDeposit: '添加预收款订单',
    customerDepositRemark: '可以在客户档案添加预收款订单',
    customerOrder: '添加项目订单',
    customerOrderRemark: '可以在客户档案添加项目订单',
    customerBack: '添加退项目订单  ',
    customerBackRemark: '可以在客户档案添加退项目订单',
    customerDepositRebate: '添加提现',
    customerDepositRebateRemark: '可以在客户档案添加提现',
    customerReparations: '添加赔款单',
    customerReparationsRemark: '可以在客户档案添加赔款单',
    customerSurvey: '添加问卷',
    customerSurveyRemark: '可以在客户档案添加问卷',
    customerMedicalRecord: '添加病历',
    customerMedicalRecordRemark: '可以在客户档案添加病历',
    caseManagementCase: '添加病历(新)',
    caseManagementCaseRemark: '可以在客户档案添加病历',
    customerGroup: '客户组管理',
    customerGroupRemark: '可以在客户档案管理客户组',
    customerTag: '标签管理',
    customerTagRemark: '可以在客户档案管理标签',
    customerRelation: '关系管理',
    customerRelationRemark: '可以在客户档案管理关系',
    customerFailture: '添加未成交',
    customerFailtureRemark: '可以在客户档案添加未成交',
    customerAvatar: '添加头像',
    customerAvatarRemark: '可以在客户档案设置头像',
    customerEffectrRackingtext: '添加效果追踪',
    customerEffectrRackingtextRemark: '可以在客户档案效果追踪',
    customerPhoto: '添加照片',
    customerPhotoRemark: '可以在客户档案添加照片',
    customerComplain: '添加投诉',
    customerComplainRemark: '可以在客户档案添加投诉',
    customerBlacklist: '添加黑名单',
    customerBlacklistRemark: '可以在客户档案添加黑名单',
    customerExploitChange: '添加开发人员变更',
    customerExploitChangeRemark: '可以在客户档案添加开发人员变更',
    customerManagerChange: '添加咨询人员变更',
    customerManagerChangeRemark: '可以在客户档案添加咨询人员变更',
    customerAddPoint: '赠送积分',
    customerAddPointRemark: '赠送积分',
    customerRebatePoint: '扣减积分',
    customerRebatePointRemark: '扣减积分',
    customerPointCoupon: '积分兑换券',
    customerPointCouponRemark: '积分兑换券',
    customerMember: '添加会员',
    customerMemberRemark: '添加会员',
    customerAddEquity: '添加权益',
    customerAddEquityRemark: '添加权益',
    customerDeleteEquity: '删除权益',
    customerDeleteEquityRemark: '删除权益',
    customerAddCoupon: '赠送券',
    customerAddCouponRemark: '赠送券',
    customerRebateCoupon: '退券',
    customerRebateCouponRemark: '退券',
    customerOrderDetailManager: '更换医生 ',
    customerOrderDetailManagerRemark: '更换医生 ',
    customerCommission: '添加渠道商佣金',
    customerCommissionRemark: '添加渠道商佣金',
    customerOperation: '补划扣',
    customerOperationRemark: '补划扣',
    customerTransfer: '转账',
    customerTransferRemark: '转账',
    customerActiveCoupon: '激活券',
    customerActiveCouponRemark: '激活券',
    customerDebtOperation: '欠款划扣',
    customerDebtOperationRemark: '欠款划扣',
    customerSms: '允许发送短信',
    customerSmsRemark: '允许发送短信',
  },


  /**
   * 非导航其他页面路由
   */
  otherRouter: {
    about: '关于我们',
    modifyPassword: '个人设置',
    inbox: '消息中心',
  },


  /**
   * 常用菜单选择组件
   * 引用组件： 桌面首页
   */
  menuTagChoose: {
    tit: '选择菜单功能',
  },


  /**
   * 报表权限搜索组件
   */
  reportPowerSearch: {
    kh: '客户',
    title: '自定搜索项',
  },
  

  /**
   * 标签选择组件
   */
  customerTagChoose: {
    tit: '选择标签',
    label: '已选择标签：',
    placeholder: '请输入标签名称',
  },
  

  /**
   * 登录页面
   */
  login: {
    msg: '专注于创建一套统一高效、互联互通、信息共享的系统化数字医院管理平台',
    login: '登录',
    label1: '输入公司编号',
    label2: '输入账号',
    label3: '输入密码',
    valid1: '公司编号不能为空！',
    valid2: '账号不能为空！',
    valid3: '密码不能为空！',
  },


  /**
   * 桌面首页
   */
  desktop: {
    mainTit: '用户首页',
    itemTit1: '常用功能',
    itemTit2: '接诊概况',
    itemTit3: '今日预约',
    itemTit4: '回访任务',
    week: '周',
    month: '月',
    //接诊概况
    mesTit1: '成交金额',
    mesTit2: '成交人次',
    mesTit3: '接诊人次',
    mesTit4: '成交率',
    menuOther1: '环比',
    //今日预约
    colTit1: '顾客(编号)',
    colTit2: '时间',
    colTit3: '预约类型',
    colTit4: '项目',
    colTit5: '预约说明',
    colTit6: '预约人',
    //回访任务
    mesTit5: '任务数',
    mesTit6: '已完成',
    mesTit7: '完成率',
    menuTit1: '任务燃尽图',
    msg1: "燃尽图：是以图表展示随着时间的减少工作量的剩余情况，该图表是一个向下的曲线，随着剩余工作的完成，“烧尽”至零。",
    msg2: "数据定义：",
    msg3: "计划曲线（该曲线实际上是一条直线）：以随访任务",
    msg4: "提醒时间",
    msg5: "为准，统计本周剩余的提醒的任务总数。",
    msg6: "实际曲线（在计划曲线上下浮动）：以完成回访任务的",
    msg7: "提交日期",
    msg8: "为准，数值=计划任务总数-完成任务总数。",
    msg9: "完成率：以曲线表示员工的随访计划完成情况。",
    msg10: "完成率曲线：以随访任务的",
    msg11: "为准，数值=完成任务总数/计划任务总数。",
    msg12: "注：如果员工提前完成次日、或推迟完成昨日计划，则完成率和燃尽图的数值将不一致。例如：",
    msg13: "某员工，每日10条任务，员工于1号完成15条（其中5条是2号任务），2号完成2条。则燃尽图的完成数：1号：15条，2号：2条。完成率，1号：100%，2号：70%[(5+2)/10]。",
  },


  /**
   * 个人设置首页
   */ 
  modifyPassword: {
    tit1: '系统语言设置',
    tit2: '修改密码',
    tit3: '业务数据同步翻译功能',
    msg1: '请选择系统语言',
    msg2: '修改个人登录密码',
    msg3: '基于百度AI技术，需付费订阅后可用。',
    label1: '旧密码',
    label2: '新密码',
    label3: '确认密码',
    valid1: '请输入密码',
    valid2: '请再次输入密码',
    valid3: '两次输入密码不一致',
    valid4: '请输入旧密码',
  },


  /**
   * 打印预览
   */
  printView: {
    tit: '打印预览',
    btn: '打印',
  },


  /**
   * 报表模块
   */ 
  ...reportRecord,


  /**
   * 基础信息模块
   */   
  ...basicInfo,


  /**
   * 系统设置模块
   */   
  ...systemSet,


  /**
   * 客户管理模块
   */   
  ...customerFile,


  /**
   * 客户运营模块
   */   
  ...customerRFMFile,


  /**
   * 医院业务模块
   */   
  ...hospitalCN,
};