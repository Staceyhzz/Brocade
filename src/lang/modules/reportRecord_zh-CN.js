export default {
  /**
   * 报表模块名
   */
  reportSetting: {
    // 报表分类
    cybb: '常用报表',
    sybb: '所有报表',
    jyfx: '经营分析',
    cwbb: '财务报表',
    jxbb: '绩效报表',
    ywbb: '业务报表',
    mzbb: '门诊报表',
    //报表名称及说明
    lostTreatmentRecord: '接诊流失分析',
    lostTreatmentRecordRemark: '由：集团未成交明细、医院未成交明细、用户未成交明细三张报表合并。根据多种维度分析顾客的流失原因。',
    lostTreatmentMsg1: '根据多种维度分析顾客的流失原因。',
    lostTreatmentMsg2: '如果顾客当天有任意订单计算为成交，则顾客当天的整体状态为成交顾客，不显示在接诊流失的报表里。如果未成交当天填写了多次未成交原因，则以最后一条未成交原因为准。',
    lostTreatmentCount: '接诊流失率分析',
    lostTreatmentCountRemark: '由：集团未成交类型统计、医院类型统计、用户未成交类型统计合并。对人员、流失类型、来源多个类别对不同客户需求的流失率进行统计。如果一个顾客在统计区间内有多种门诊状态，人数统计值则按门诊状态的次序（初诊-复诊-再消费），优先计算到前置的状态。',
    cusRepaymentRecord: '顾客还款记录',
    cusRepaymentRecordRemark: '由：集团还款明细、医院还款明细、集团还款日合计、医院还款日合计、集团还款各医院统计合并。【说明】方便地调取欠费过顾客的还款记录。',
    cusRepaymentRecordMsg1: '方便地调取欠费过顾客的还款记录。',
    cusRepaymentRecordMsg2: '假设顾客3号有一笔订单欠款7000，4号还2000，还欠5000，5号还2000，欠3000，6号还3000。则欠款总额：0;  查3号，新增欠款总额：7000 新增还款总额：0 查4号-5号，新增欠款总额：0 新增还款总额：4000。',
    treatPostServiceRecord: '治疗岗位业务',
    treatPostServiceRecordRemark: '根据治疗执行时登记的医生，统计出各医生所参与治疗的信息数据，如果一个项目有多个医生共同完成，则每个医生各显示一条治疗数据。按照执行时的次数除以总购买数量，再根据根据购买时的项目金额，计算出本次执行的治疗绩效。治疗绩效=治疗数量/购买数量*项目金额',
    treatPostServiceRecordMsg1: '该表暂时不统计线上的治疗记录',
    treatPostServiceRecordMsg2: '根据治疗执行时登记的医生，统计出各医生所参与治疗的信息数据，如果一个项目有多个医生共同完成，则每个医生各显示一条治疗数据。按照执行时的次数除以总购买数量，再根据根据购买时的项目金额，计算出本次执行的治疗绩效。',
    appointmentRecord: '预约报表',
    appointmentRecordRemark: '集团治疗预约明细、医院治疗预约明细、用户治疗预约明细、集团登记治疗预约明细、医院、登记治疗预约明细、用户治疗预约每日统计、集团咨询预约明细医院咨询预约明细、用户咨询预约明细',
    appointmentRecordMsg1: '此报表仅统计医院员工提交预约数据，不包括用户自助通过APP、微信等方式进行自助预约的记录。',
    appointmentRecordMsg2: '预约上门率=在预约日期同一天上门的顾客比例。如果一个客户不在预约当天上门，不论是提前还是推迟，均不计算预约上门率。',
    cusConsultationRecord: '顾客接诊',
    cusConsultationRecordRemark: '医院咨询师成交统计',
    cusConsultationRecordMsg1: '医院咨询师成交统计',
    cusConsultationRecordMsg2: '平均客单价：总项目和预收单的实收金额 除以总付款人数 平均成交率：咨询师 当天接诊成交人数/总接诊人数；非分诊咨询师本人操作的还欠款不会统计。',
    outpatientReceptionCount: '门诊接诊统计',
    outpatientReceptionCountRemark: '统计当前上门顾客接诊的转化率等信息，用于评估咨询师接诊能力。',
  },


  /**
   * 报表公共
   */
  reportPublic: {
    title1: '检索',
    title2: '报表数据',
    title3: '说明：',
    title4: '指标：',

    tableChannelStore: '来源/渠道',
  },


  /**
   * 报表中心
   */
  reportRecord: {
    tit: '客户信息报表',
  },


  /**
   * 接诊流失分析
   */
  lostTreatmentRecord: {
    title: '流失分析',
    label_lslx: '流失类型',
    label_lsyy: '流失原因',
    label_rs: '人数',
    label_bfb: '百分比',
    label_none: '无',
    placeholder_lsyy: '请输入流失原因',
    menuTit1: '明细统计',
    menuTit2: '流失类型统计',
    menuTit3: '接诊人员统计',
    menuTit4: '来源/渠道统计',
    menuTit5: '开发人员统计',
  },


  /**
   * 顾客还款记录
   */
  cusRepaymentRecord: {
    title: '还款分析',
    label1: '还款单号',
    label2: '欠款单号',
    menuTit1: '还款记录',
    menuTit2: '顾客汇总',
    menuTit3: '开单人汇总',
    menuTit4: '医院汇总',
    colTit1: '欠款总额',
    colTit2: '还款金额',
    colTit3: '当前欠款',
    colTit4: '欠款订单数',
    colTit5: '新增欠款总额',
    colTit6: '新增还款额',
    colTit7: '剩余欠款',
    colTit8: '顾客数',
  },


  /**
   * 治疗岗位业务
   */
  treatPostServiceRecord: {
    title: '治疗岗位分析',
    label1: '治疗日期',
    label2: '治疗医院',
    label3: '治疗项目',
    label4: '治疗人员',
    label5: '治疗分工',
    menuTit1: '治疗记录',
    menuTit2: '治疗销售对账表',
    menuTit3: '员工治疗绩效统计',
    colTit1: '治疗单位',
    colTit2: '治疗次数',
    colTit3: '治疗绩效',
    colTit4: '购买日期',
    colTit5: '购买医院',
    colTit6: '购买数量',
    colTit7: '销售总价',
    colTit8: '治疗人数',
    placeholder1: '选择治疗项目',
    placeholder2: '选择治疗人员',
    positionNull: '空',
  },


  /**
   * 预约报表
   */
  appointmentRecord: {
    title: '预约分析',
    label1: '预约类型',
    label2: '预约方式',
    label3: '到诊状态',
    label4: '预约医生',
    label5: '预约项目',
    menuTit1: '预约记录',
    menuTit2: '医院预约项目人数统计',
    menuTit3: '员工预约上门率分析',
    menuTit4: '医生预约量统计',
    colTit1: '总人数',
    colTit2: '预约上门率',
    colTit3: '预约时间',
    placeholder1: '选择预约项目',
    placeholder2: '选择预约医生',
    consult: '咨询预约次数',
    treat: '治疗预约次数',
    surgery: '手术预约次数',
  },


  /**
   * 顾客接诊
   */
  cusConsultationRecord: {
    title: '接诊分析',
    label1: '接诊日期',
    label2: '咨询项目',
    label3: '成交项目',
    label4: '成交金额',
    label5: '平均成交率',
    label6: '接诊总人数',
    label7: '平均需求客单价',
    label8: '成交率',
    label9: '需求客单价',
    label10: '需求客总价',
    menuTit1: '明细表',
    menuTit2: '咨询师不同类型成交率',
    menuTit3: '咨询师不同顾客成交率',
    menuTit4: '咨询师接诊客单价',
    placeholder: '请选择成交项目',
  },
};