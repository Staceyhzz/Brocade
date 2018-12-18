import reportRecord from './modules/reportRecord_en-US';
import basicInfo from './modules/basicInfo_en-US';
import systemSet from './modules/systemSet_en-US';
import customerFile from './modules/customer_en-US';
import customerRFMFile from './modules/customerRFM_en-US';
import hospitalUS from './modules/hospital_en-US';
import publicStatic from './modules/public_static_en-US';
export default {
  /**
   * 公共字段
   */
  publicSet: {
    add: 'add',
    edit: 'edit',
    del: 'delete',
    clean: 'clean',
    save: 'save',
    cancel: 'cancel',
    back: 'back',
    search: 'search',
    reset: 'reset',
    print: 'print',
    set: 'setting',
    check: 'check',
    exportData: 'export',
    tableAction: 'action',
    //弹窗提示
    noticeTit: 'System hints',
    noticeSuccess: 'The operation is successful!',
    noticeError: 'The operation failed!',
    //状态字段
    newCus: 'new customer',
    oldCus: 'old customer',
    enable: 'enable',
    disable: 'disable',
    ydz: 'visit',
    wdz: 'no visit',
    ycj: 'deal',
    wcj: 'No deal',
    line: 'line',
    onLine: 'onLine',
    man: 'man',
    woman: 'woman',
    //表格分页
    pageMsg: 'pageNumber: {0}，totalPages: {1}，total: {2}',

    consult: 'consult',
    treat: 'treat',
    surgery: 'surgery',
  },


  /**
   * 公共仓库静态资源
   */
  ...publicStatic,


  /**
   * 公共label
   */
  labelPublic: {
    xh: 'serial',
    pxh: 'sort number',
    zt: 'state',
    zh: 'account',
    mc: 'name',
    xm: 'name',
    bh: 'number',
    lx: 'type',
    pym: 'pinyin',
    gg: 'specifications',
    price: 'price',
    dw: 'unit',
    xb: 'gender',
    gkxm: 'customer name',
    gkbh: 'customer number',
    sjh: 'Cell-phone number',
    hy: 'Member',
    nl: 'Age',
    ms: 'remark',
    rq: 'date',
    hkrq: 'repayment date',
    tjrq: 'date of sub',
    yyrq: 'date of reservation',
    yy: 'hospital',
    tjyy: 'submit hospital',
    yyyy: 'appointment hospital',
    bm: 'department',
    js: 'role',
    yh: 'user',
    jzry: 'doctor',
    kfry: 'developer',
    zxry: 'consultants',
    syry: 'cashier',
    kdry: 'billing personnel',
    tjry: 'submitting personnel',
    mzlx: 'outpatient type',
    gklx: 'Customer type',
    cjzt: 'Transaction status',
    dzzt: 'State of diagnosis',
    yxfl: 'intentional classification',
    xfyx: 'consumption intention',
    jtly: 'channel',
    jtqd: 'store',
  },


  /**
   * 公共placeholder
   */
  placeholderPublic: {
    kfry: 'Please select the developer',
    jzry: 'Please choose a doctor',
    kdry: 'Please select the billing staff',
    syry: 'Please choose the cashier',
    tjry: 'Please select the submission',
    zxry: 'Please choose a consultant',
    sfxm: 'Please choose a fee project',
    filter: 'Quick search',
    input: 'Please enter',
  },


  /**
   * 公共表单验证
   */
  validPublic: {
    name: 'Please enter the name',
    remark: 'Please enter the description',
    number: 'please enter a number',
    pinyin1: 'Please enter the pinyin code',
    pinyin2: 'Please enter the lowercase letters and numbers',
  },


  /**
   * 主结构左侧导航栏
   */
  layoutNav: {
    //桌面
    desk: 'desktop',
    //报表中心
    report: 'report center',
    reportManage: 'report record',
    reportRecord: 'new report record',
    channelGroupManage: 'channle group',
    //基础信息
    info: 'basic information',
    channelManage: 'channle',
    symptomManage: 'symptom',
    callbackCategoryManage: 'return visit type',
    callbackSetManage: 'return visit type group',
    failtureCategoryManage: 'fail deal type',
    complainCategoryManage: 'complaint type',
    tagManage: 'tags',
    tagGroupManage: 'tags group',
    unitManage: 'unit',
    cardCategoryManage: 'payment',
    toolManage: 'tool',
    relationManage: 'relation',
    surveyManage: 'questionnaire template',
    medicalRecordManage: 'medical record template',
    positionTemplate: 'Tracking template management',
    caseManagement: 'Case form management',
    caseManagementGroup: 'Case type management',
    caseManagementRecord: 'Case record management',
    positionManage: 'post division',
    //系统设置
    setting : 'system setup',
    hospitalManage : 'hospital',
    deptManage : 'department',
    userManage : 'user management',
    userAuthCustomManage : 'user privileges custom',
    roleManage : 'role management',
    optionManage : 'system setup',
    logManage : 'system log',
    setBooksManage : 'account management',
    depositChargeManage : 'pre payment project',
    couponCategoryManage : 'voucher type',
    chargeCategoryManage : 'type of charge project',
    chargeManage : 'pay Service',
    chargeSetManage : 'package',
    productCategoryManage : 'drug type',
    productQualityManage : 'drug property',
    productManage : 'drug goods',
    equityManage : 'rights and interests',
    memberCategoryManage : 'member type',
    chargeDiscountManage : 'project discount',
    userDiscountManage : 'user discount',
    printManage : 'print settings',
    auditRuleManage : 'audit rules',
    managerManage : 'edit permissions',
    treatDoctorManage : "doctor's appointment",
    consultDoctorManage : 'counselling doctor',
    InstrumentManage : 'instrument and equipment',
    appointmentChargeManage : 'reservation project',
    //客户管理
    customer: 'customer',
    customerManage: 'customer',
    complainManage: 'record of complaints',
    ownershipManage: 'change right of belonging',
    birthdayRemind: 'birthday reminding', 
    //顾客运营
    customerSetting: 'customer operation',
    customerRFM: 'customer operation', 
    sliderRFM: 'RFM indicators',
    dealBusiness: 'operating indicators',
    customerGroupManage: 'customer group',
    customerFilterManage: 'customer selector',
    //医院设置
    hospital: 'hospital',
    onlineDesk: 'network power desk',
    callbackDesk: 'return visit desk',
    receptionFront: 'reception desk',
    liveDesk: 'treatment desk',
    customerDirection: "today's customer dynamics",
    chargePriceList: 'price manual',
    cashierDesk: 'cashier',
    deptDesk: 'department Center',
    deptBorrow: 'borrowing workbench',
    bedManage: 'bed management',
    InpatientDesk: 'inpatient desk',
    smsTemplate: 'SMS template',
    smsGroup: 'short message group',
    surgeryDeskManage: 'operating table',
    appointmentToday: 'reservation desk',
    activityManage: 'activity setting',
    //市场渠道
    market: 'market channel',
    storeCategoryManage: 'brand management',
    storeManage: 'channel business',
    storeManagerManage: 'person in charge',
    commissionDesk: 'commission confirmation',
    commissionCashier: 'commission payment',
    marketDesk: 'market table',
    couponActivity: 'voucher activity',
    //库存管理
    stock: 'inventory',
    warehouseManage: 'warehouse',
    supplierManage: 'supplier',
    purchaseManage: 'warehousing management',
    stockOutManage: 'outgoing management',
    invoiceManage: 'purchase invoice',
    returnManage: 'return out of the Treasury',
    allocateManage: 'warehouse allocation',
    checkManage: 'inventory inventory',
    useManage: 'department collar',
    stockManage: 'inventory query',
    deptStockOutDesk: 'department of materials',
    expirationManage: 'early warning of stock validity',
    //日程办工
    office: 'day-to-day office',
    addressBook: 'mail list',
    shiftCategoryManage: 'class management',
    myShift: 'class entry',
    shiftManage: 'whole hospital schedule',
    noticeManage: 'announcements',
    knowledgeCategoryManage: 'knowledge classification',
    knowledgeManage: 'knowledge',
    knowledgeQuery: 'knowledge base',
    auditOrder: 'application for audit',
    auditOrderDesk: 'audit workbench',
    //微信
    wechat: 'WeChat',
    opentheguideManage: 'Open distribution',
    putforwardManage: 'Application for cash',
    promoterManage: 'referee management',
    promoteCustomerManage: 'recommended customer',
    promoteRecord: 'recommended commission',
    promoteRebate: 'commission settlement',
    verifyMessageManage: 'verification Code',
    //呼叫中心
    callCenter: 'call center',
    callSettingManage: 'switchboard management',
    callRecordManage: 'call record',
    //渠道分销
    canalsDistribution: 'Place',
    distributionBasic: 'Channel distribution setup',
    distributor: 'Channel distribution management',
    distributorRegister: 'Channel registration audit management',
    distributorRecord: 'Channel declaration record',
    distributorLevelRecord: 'Channel level record',
    distributorCashRecord: 'Application for channel withdrawals',
    distributorHelp: 'WeChat guidance',
  },
  

  /**
   * 客户档案tabs
   */
  cusMenuTabs: {
    customerMsg: 'Customer profile',
    indexOrderDetail: 'consumer projects',
    indexConsult: 'counselling',
    indexAppointment: 'reservations',
    indexVisit: 'door-to-door situation',
    indexFailture: 'non transaction',
    indexOrder: 'order situation',
    indexEffectrRackingtext: 'Effect tracking',
    indexPhoto: 'photo management',
    indexOperation: 'buckle record',
    indexCallback: 'return visit',
    indexSurvey: 'questionnaire',
    indexMedicalRecord: 'medical record',
    indexCaseRecord: 'Medical Records Administration',
    indexAccount: 'account situation',
    indexMember: 'membership rights',
    indexManager: 'responsible for the user',
    indexRelation: 'inter customer relationship',
    indexComplain: 'complaint feedback',
    indexCost: 'cost of consumables',
    indexSms: 'short message recording',
    indexAudit: 'application for audit',
    indexStore: 'channel',
    indexPromoter: 'WeChat distribution',
  },


  /**
   * 客户档案操作导航
   */
  cusNavList: {
    other: 'other',
    channel: 'channel',
    member: 'member',
    admin: 'admin',
    medical: 'medical',
    service: 'service',
    finance: 'finance',
    common: 'common',
    barCode: 'QR code',
    customerCommission: 'Add channel Commission',
    customerMember: 'Add members',
    customerAddEquity: 'Add equity',
    customerDeleteEquity: 'Delete equity',
    customerAddPoint: 'Gift integral',
    customerRebatePoint: 'Deduction integral',
    customerPointCoupon: 'Exchange voucher',
    customerAddCoupon: 'Gift voucher',
    customerAvatar: 'Add a head image',
    customerGroup: 'Customer group management',
    customerTag: 'Label management',
    customerRelation: 'Relationship management',
    customerOrderDetailManager: 'Replace a doctor',
    customerExploitChange: 'Developer change',
    customerManagerChange: 'Consultant change',
    customerBlacklist: 'Add a blacklist',
    customerConsult: 'Add advice',
    customerCallback: 'Add a return visit',
    customerCallbackTask: 'Add revisit reminding',
    callbackSet: 'Add a return visit plan',
    customerSurvey: 'Adding a questionnaire',
    customerMedicalRecord: 'Add a medical record',
    caseManagementCase: 'Add medical records (New)',
    customerOperation: 'Tonic buckle',
    customerDebtOperation: 'Arrears',
    customerEffectrRackingtext: 'Add effect tracking',
    customerPhoto: 'Add a photo',
    customerAppointment: 'Add a consultancy reservation',
    customerTreat: 'Add treatment appointment',
    customerSurgery: 'Surgical appointment',
    customerRebateCoupon: 'Return ticket',
    customerBack: 'Add a back project order',
    customerDepositRebate: 'Withdrawals',
    customerReparations: 'Add an indemnity list',
    customerComplain: 'Add complaints',
    customerDeposit: 'Add a pre - receivable order',
    customerOrder: 'Add project orders',
    customerFailture: 'Add no deal',
    customerActiveCoupon: 'Activator voucher',
    customerTransfer: 'Transfer accounts',
  },


  /**
   * 用户操作权限
   */
  userPermissions: {
    acceptAppointment: 'can be reserved',
    acceptAppointmentRemark: 'A doctor who takes part in an appointment.',
    acceptShift: 'participation in scheduling',
    acceptShiftRemark: 'Participation in scheduling',
    isDoctor: "it's a doctor",
    isDoctorRemark: 'An optional doctor when adding an order',
    isMedical: "it's a medical staff",
    isMedicalRemark: 'Selectable when delimit',
    viewContact: 'you can see the way of contact',
    viewContactRemark: 'You can look at the way the customers contact',
    allowExport: 'data can be exported',
    allowExportRemark: 'Permission to export data',
    barCode: 'Adding two dimensional code',
    barCodeRemark: "A two-dimensional code can be added to the customer's file",
    customerConsult: 'add advice',
    customerConsultRemark: 'You can add advice to the customer file',
    customerCallback: 'add a return visit',
    customerCallbackRemark: "You can add a return visit to the customer's file",
    customerCallbackTask: 'Add revisit reminding',
    customerCallbackTaskRemark: 'Add revisit reminding to customer files',
    callbackSet: 'Add a return visit plan',
    callbackSetRemark: "You can add a return visit plan to the customer's file",
    customerAppointment: 'add a consultancy reservation',
    customerAppointmentRemark: 'You can add a consultancy reservation',
    customerTreat: 'add treatment appointment',
    customerTreatRemark: 'Treatment appointments can be added',
    customerSurgery: 'surgical appointment',
    customerSurgeryRemark: 'Surgical appointments can be added',
    customerDeposit: 'add a pre - receivable order',
    customerDepositRemark: "You can add a pre - receivable order in the customer's file",
    customerOrder: 'add project orders',
    customerOrderRemark: 'You can add project orders to the customer file',
    customerBack: 'add a back project order',
    customerBackRemark: "You can add a back project order in the customer's file",
    customerDepositRebate: 'add a refund',
    customerDepositRebateRemark: "You can add a refund in the customer's file",
    customerReparations: 'add an indemnity list',
    customerReparationsRemark: "Reparations can be added to the customer's file",
    customerSurvey: 'adding a questionnaire',
    customerSurveyRemark: "You can add a questionnaire to the customer's file",
    customerMedicalRecord: 'add a medical record',
    customerMedicalRecordRemark: "You can add a medical record in the customer's file",
    caseManagementCase: 'Add medical records (New)',
    caseManagementCaseRemark: "You can add a medical record in the customer's file",
    customerGroup: 'customer group management',
    customerGroupRemark: 'The customer file can be managed in the customer group',
    customerTag: 'label management',
    customerTagRemark: 'Can be managed in the customer file management label',
    customerRelation: 'relationship management',
    customerRelationRemark: 'Customer file management relationships',
    customerFailture: 'add no deal',
    customerFailtureRemark: "No transaction can be added to the customer's file",
    customerAvatar: 'add a head image',
    customerAvatarRemark: "You can set up a head portrait in the customer's file",
    customerEffectrRackingtext: 'Add effect tracking',
    customerEffectrRackingtextRemark: 'Can be tracked in customer file effect',
    customerPhoto: 'add a photo',
    customerPhotoRemark: "You can add photos to the customer's file",
    customerComplain: 'Add complaints',
    customerComplainRemark: "A complaint can be added to the customer's file",
    customerBlacklist: 'Add a blacklist',
    customerBlacklistRemark: "You can add a blacklist to the customer's file",
    customerExploitChange: 'Add developer change',
    customerExploitChangeRemark: 'You can add developer changes to the customer file',
    customerManagerChange: 'Adding a consultant to change',
    customerManagerChangeRemark: "You can add consultants to change in the customer's file",
    customerAddPoint: 'Gift integral',
    customerAddPointRemark: 'Gift integral',
    customerRebatePoint: 'Deduction integral',
    customerRebatePointRemark: 'Deduction integral',
    customerPointCoupon: 'Exchange voucher',
    customerPointCouponRemark: 'Exchange voucher',
    customerMember: 'Add members',
    customerMemberRemark: 'Add members',
    customerAddEquity: 'Add equity',
    customerAddEquityRemark: 'Add equity',
    customerDeleteEquity: 'Delete rights and interests',
    customerDeleteEquityRemark: 'Delete rights and interests',
    customerAddCoupon: 'Gift voucher',
    customerAddCouponRemark: 'Gift voucher',
    customerRebateCoupon: 'Return ticket',
    customerRebateCouponRemark: 'Return ticket',
    customerOrderDetailManager: 'Replace a doctor ',
    customerOrderDetailManagerRemark: 'Replace a doctor ',
    customerCommission: 'Add channel Commission',
    customerCommissionRemark: 'Add channel Commission',
    customerOperation: 'Tonic buckle',
    customerOperationRemark: 'Tonic buckle',
    customerTransfer: 'Transfer accounts',
    customerTransferRemark: 'Transfer accounts',
    customerActiveCoupon: 'Activator voucher',
    customerActiveCouponRemark: 'Activator voucher',
    customerDebtOperation: 'Arrears',
    customerDebtOperationRemark: 'Arrears',
    customerSms: 'Allow messages to be sent',
    customerSmsRemark: 'Allow messages to be sent',
  },


  /**
   * 非导航其他页面路由
   */
  otherRouter: {
    about: 'about us',
    modifyPassword: 'personal settings',
    inbox: 'message center',
  },
  

  /**
   * 常用菜单选择组件
   * 引用组件： 桌面首页
   */
  menuTagChoose: {
    tit: 'Menu function selection',
  },


  /**
   * 报表权限搜索组件
   */
  reportPowerSearch: {
    kh: 'customer',
    title: 'Self determined search',
  },


  /**
   * 标签选择组件
   */
  customerTagChoose: {
    tit: 'Choose a label',
    label: 'Selected tab:',
    placeholder: 'Please enter the tag name',
  },


  /**
   * 登录页面
   */
  login: {
    msg: 'Focus on the creation of a unified and efficient digital hospital management platform with high efficiency, interconnection and information sharing',
    login: 'Login',
    label1: 'Enter the company number',
    label2: 'Enter account number',
    label3: 'Enter password',
    valid1: 'The company number is not empty!',
    valid2: 'The account number is not empty!',
    valid3: 'The password is not empty!',
  },


  /**
   * 桌面首页
   */
  desktop: {
    mainTit: "User's home page",
    itemTit1: 'Common function',
    itemTit2: 'General consultation',
    itemTit3: "Today's reservation",
    itemTit4: 'Return mission',
    week: 'week',
    month: 'month',
    //接诊概况
    mesTit1: 'transaction amount',
    mesTit2: 'transaction number',
    mesTit3: 'visiting person',
    mesTit4: 'transaction rate',
    menuOther1: ' compare',
    //今日预约
    colTit1: 'customer (id)',
    colTit2: 'time',
    colTit3: 'reservation type',
    colTit4: 'project',
    colTit5: 'remark',
    colTit6: 'reservations',
    //回访任务
    mesTit5: 'number of tasks',
    mesTit6: 'completed',
    mesTit7: 'completion rate',
    menuTit1: 'task burnout diagram',
    msg1: "Figure: is the chart out over time reduce the remaining workload, the chart is a downward curve, with the remaining work, 'burn out' to zero.",
    msg2: "Data definition:",
    msg3: "The planned curve (the curve is actually a straight line): a follow-up task",
    msg4: " reminding time ",
    msg5: "be sure to count the total number of reminding tasks this week.",
    msg6: "actual curve (floating on the planned curve): to complete the return visit task",
    msg7: " date of submission ",
    msg8: "numerical value = total number of tasks - complete the total number of tasks.",
    msg9: "Completion rate: a curve representing the completion of the staff's follow-up plan.",
    msg10: "Completion rate curve: follow up tasks",
    msg11: "value = complete the total number of tasks / planned tasks.",
    msg12: "Note: if the employee completes the day of the next day, or postpones the completion of the plan, the completion rate will not be consistent with the value of the burnout chart. For example:",
    msg13: "One employee, 10 tasks per day, employees completed 15 items on number 1 (5 of them 2), and 2 completed 2. The number of completion of the burnout map: No. 1: 15, 2: 2. Completion rate, No. 1: 100%, 2: 70%[(5+2) /10].",
  },


  /**
   * 个人设置首页
   */ 
  modifyPassword: {
    tit1: 'System language settings',
    tit2: 'Modify the password',
    tit3: 'Business data synchronization translation function',
    msg1: 'Please select the system language',
    msg2: 'Modify personal login password',
    msg3: 'Based on Baidu AI technology, pay subscriptions are available.',
    label1: 'Old password',
    label2: 'New password',
    label3: 'Confirm the password',
    valid1: 'Please enter a password',
    valid2: 'Please enter the password again',
    valid3: 'Two enter password inconsistencies',
    valid4: 'Please enter the old password',
  },


  /**
   * 打印预览
   */
  printView: {
    tit: 'Print preview',
    btn: 'Print',
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
  ...hospitalUS,
};