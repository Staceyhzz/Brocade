export default {
  /**
   * 报表模块名
   */
  reportSetting: {
    // 报表分类
    cybb: 'common reports',
    sybb: 'all reports',
    jyfx: 'business analysis',
    cwbb: 'financial statements',
    jxbb: 'performance report',
    ywbb: 'business Report',
    mzbb: 'Outpatient Report',
    //报表名称及说明
    lostTreatmentRecord: 'analysis of loss of consultation',
    lostTreatmentRecordRemark: 'The reasons for the loss of customers are analyzed in a variety of dimensions.',
    lostTreatmentMsg1: 'The reasons for the loss of customers are analyzed in a variety of dimensions.',
    lostTreatmentMsg2: "If the customer calculates any order on the day, the customer's overall state of the day will be the customer who will not be shown in the report. If the reasons for many unsold transactions are not completed on the same day, the last reason for not closing the transaction shall prevail.",
    lostTreatmentCount: 'analysis of loss rate',
    lostTreatmentCountRemark: 'The rate of loss of different customer needs is counted by a number of categories of personnel, loss types and sources. If a customer has multiple outpatient status in the statistical interval, the number of patients will be calculated according to the order of outpatient status (first visit, re visit and re consumption).',
    cusRepaymentRecord: 'customer repayment record',
    cusRepaymentRecordRemark: "It is convenient to collect the customer's repayment record for the arrears.",
    cusRepaymentRecordMsg1: "It is convenient to collect the customer's repayment record for the arrears.",
    cusRepaymentRecordMsg2: 'Assume that customer number 3 has an order arrears of 7000, 4, 2000, still less than 5000, 5 is 2000, less than 3000, 6 is 3000. The total amount of arrears: 0; Cha 3, the total amount of new arrears: 7000 the total amount of new repayment: 0 check 4 -5, add the total amount of arrears: 0 new total Repayment: 4000.',
    treatPostServiceRecord: 'treatment post business',
    treatPostServiceRecordRemark: "According to the doctors who register at the time of treatment, the information data of each doctor's participation in treatment is counted. If a project is completed by multiple doctors, each doctor will show a treatment data. According to the times of execution, the total amount of purchase is divided, and the performance of the treatment is calculated according to the amount of the item at the time of purchase. Treatment performance = amount of treatment / amount of purchase * project amount",
    treatPostServiceRecordMsg1: 'The table is temporarily not recorded on the statistical line.',
    treatPostServiceRecordMsg2: "According to the doctor registered at the time of the treatment, the information data of each doctor's participation in the treatment are counted. If a project has multiple doctors, each doctor displays a therapeutic data. According to the number of execution times divided by total purchase quantity, the treatment performance of this implementation is calculated according to the amount of purchase according to the purchase amount.",
    appointmentRecord: 'treatment reservation',
    appointmentRecordRemark: 'The treatment group appointment details, hospital appointment details, user registration, reservation details of treatment group treatment, hospital treatment, reservation details of registration reservation details, user booking statistics, daily treatment group consulting hospital consultation appointment reservation details details, user consultation appointment details',
    appointmentRecordMsg1: "This report only provides statistics of hospital employees' appointment data, and does not include self-help appointment records by user self-help through APP and WeChat.",
    appointmentRecordMsg2: 'The appointment rate is the percentage of customers who arrive on the same day on the appointed date. If a customer does not arrive on the day of appointment, he will not calculate the appointment rate whether he is in advance or postponed.',
    cusConsultationRecord: 'customer consultation',
    cusConsultationRecordRemark: 'Clinch statistics of hospital consultants',
    cusConsultationRecordMsg1: 'Clinch statistics of hospital consultants',
    cusConsultationRecordMsg2: "Average price: the total amount of the total items and the receipts is divided by the average transaction rate of the total payment number: the consultant receives the number of transactions per day / the total number of visits, and the arrears of the non - referral consultants' own operation will not be counted.",
    outpatientReceptionCount: 'Outpatient consultation statistics',
    outpatientReceptionCountRemark: "The current information on the conversion rate of visiting customers is used to assess the consultant's ability to receive.",
  },


  /**
   * 报表公共
   */
  reportPublic: {
    title1: 'retrieval',
    title2: 'report data',
    title3: 'Explain：',
    title4: 'Indicators:',

    tableChannelStore: 'channle/store',
  },


  /**
   * 报表中心
   */
  reportRecord: {
    tit: 'customer information report',
  },


  /**
   * 接诊流失分析
   */
  lostTreatmentRecord: {
    title: 'loss analysis',
    label_lslx: 'loss type',
    label_lsyy: 'cause of loss',
    label_rs: 'the number of',
    label_bfb: 'percentage',
    label_none: 'none',
    placeholder_lsyy: 'Please enter the cause of the loss',
    menuTit1: 'detail statistics',
    menuTit2: 'loss type statistics',
    menuTit3: 'statisticians',
    menuTit4: 'source / channel statistics',
    menuTit5: 'developer statistics',
  },


  /**
   * 顾客还款记录
   */
  cusRepaymentRecord: {
    title: 'repayment analysis',
    label1: 'repayment single number',
    label2: 'single number of arrears',
    menuTit1: 'payment history',
    menuTit2: 'customer summary',
    menuTit3: 'single person summary',
    menuTit4: 'hospital summary',
    colTit1: 'total amount of arrears',
    colTit2: 'amount of repayment',
    colTit3: 'current arrears',
    colTit4: 'number of arrears',
    colTit5: 'total amount of new arrears',
    colTit6: 'new repayments',
    colTit7: 'remaining arrears',
    colTit8: 'number of customers',
  },


  /**
   * 治疗岗位业务
   */
  treatPostServiceRecord: {
    title: 'analysis of treatment post',
    label1: 'date of treatment',
    label2: 'treatment hospital',
    label3: 'treatment project',
    label4: 'treatment staff',
    label5: 'division of labor',
    menuTit1: 'therapeutic records',
    menuTit2: 'Treatment sales statement',
    menuTit3: 'Staff treatment performance statistics',
    colTit1: 'Treatment unit',
    colTit2: 'Times of treatment',
    colTit3: 'Treatment performance',
    colTit4: 'Date of purchase',
    colTit5: 'Buy a hospital',
    colTit6: 'Purchase quantity',
    colTit7: 'Total sales price',
    colTit8: 'Treatment number',
    placeholder1: 'Choice of treatment projects',
    placeholder2: 'Choice of therapists',
    positionNull: 'null',
  },


  /**
   * 预约报表
   */
  appointmentRecord: {
    title: 'Reservation analysis',
    label1: 'Reservation type',
    label2: 'Reservation mode',
    label3: 'State of diagnosis',
    label4: 'make an appointment',
    label5: 'Reservations',
    menuTit1: 'Reservation record',
    menuTit2: 'Statistics on the number of hospital appointments',
    menuTit3: 'Analysis of staff appointment rate',
    menuTit4: "Doctor's reservation statistics",
    colTit1: 'Total number',
    colTit2: 'Appointment rate',
    colTit3: 'Appointment time',
    placeholder1: 'Select an appointment project',
    placeholder2: 'Choose an appointment for a doctor',
    consult: 'Counselling number of appointments',
    treat: 'Number of appointments for treatment',
    surgery: 'Number of surgical appointments',
  },


  /**
   * 顾客接诊
   */
  cusConsultationRecord: {
    title: 'Diagnosis and treatment',
    label1: 'Date of consultation',
    label2: 'Consulting Project',
    label3: 'Transaction project',
    label4: 'Transaction amount',
    label5: 'Average turnover rate',
    label6: 'Total number of visits',
    label7: 'Average guest unit price',
    label8: 'Turnover rate',
    label9: 'Unit price',
    label10: 'Total price',
    menuTit1: 'Detailed list',
    menuTit2: 'Different types of turnover of consultants',
    menuTit3: 'Turnover rate of different customers',
    menuTit4: "Consultant's unit price",
    placeholder: 'Please choose a transaction',
  },
};