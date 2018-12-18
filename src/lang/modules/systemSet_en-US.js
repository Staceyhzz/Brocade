export default {
  /**
   * 医院管理
   */  
  hospital: {
    colTit1: 'full name',
    colTit2: 'city',
    colTit3: 'address',
    modalTit: 'Amend the hospital',
    valid1: 'Please enter the full name',
    valid2: 'Please choose the city',
  },


  /**
   * 部门管理
   */
  dept: {
    label: 'open state',
    open: 'opne',
    noOpen: 'no open',
    modalTit1: 'Adding Department',
    modalTit2: 'Revision Department',
    msg1: 'Determine the deleting department?',
    msg2: 'Department information:',
  }, 


  /**
   * 用户管理
   */
  user: {
    btn1: 'batch setup roles',
    btn2: 'view permissions',
    btn3: 'customer rights',
    btn4: 'back access rights',
    label1: 'name',
    label2: 'password',
    label4: 'telephone',
    label5: 'mobile phone',
    valid1: 'Please select information',
    valid2: 'Please fill in the information',
    colTit: 'number',
    modalTit1: 'Add users',
    modalTit2: 'Modify the user',
    msg1: 'Do you decide to delete users?',
    msg2: 'User information:',
  },
  /**
   * 批量设置角色
   */
  userSetting: {
    label: 'user list',
    valid1: 'Please choose the role',
    valid2: 'Please select the user',
  },
  /**
   * 设置用户权限
   */
  userPower: {
    msg1: 'Choose a hospital',
    msg2: 'Selection department',
    msg3: 'Select users',
  },
  /**
   * 查看用户权限
   */
  userCheck: {
    menuTit1: 'system menu',
    menuTit2: 'customer file',
    menuTit3: 'operation permissions',
    menuTit4: 'report permissions',
    menuTit5: 'check the purchase price',
    colTit1: 'menu name',
    colTit2: 'menu module',
    colTit3: 'report category',
    colTit4: 'permissions settings',
    power1: 'no authority',
    power2: 'group',
    power3: 'hospital',
    power4: 'personal',
    msg1: 'Purchase price view permissions:',
    msg2: 'Price hidden items:',
    price1: 'partial concealment',
    price2: 'hide all',
    price3: 'all visible',
  },


  /**
   * 用户权限自定义
   */
  userAuthCustom: {
    modalTit: 'Reset the user password',
    label1: 'new password',
    label2: 'confirm the password',
    valid1: 'Please input a password',
    valid2: 'The password length is not less than 8 bits',
    valid3: 'Please enter the password again',
    valid4: 'Two input password inconsistencies',
    colTit1: 'telephone',
    colTit2: 'mobile',
    btn: 'reset password',
  },
  /**
   * 用户权限自定义设置
   */
  userAuthCustomSet: {
    menuTit: 'binding roles',
    btn: 'release role binding',
    valid: 'Please choose the role',
    msg1: 'Binding roles: ',
    msg2: 'Determine the release of role binding?',
    msg3: 'setting up the system menu',
    msg4: 'setting operation permissions',
    msg5: 'setting up customer files',
    msg6: 'check the purchase price set',
  },
  /**
   * 设置进价查看
   */
  userUpdatePriceMenu: {
    tit1: 'Purchase price view',
    tit2: 'Goods hidden in price',
    msg: 'The price of an item that is hidden at a price of 0 ￥',
    btn: 'goods',
    modalTit: 'Selection of items',
    label: 'ID/name/pinyin',
    placeholder: 'Please select the type',
  },


  /**
   * 角色管理
   */
  role: {
    modalTit1: 'Add roles',
    modalTit2: 'Modifying the role',
    msg1: 'Determine the deletion of the role?',
    msg2: 'Role information:',
  },


  /**
   * 系统设置
   */
  option: {
    open: 'open',
    close: 'close',
    valid1: 'Time range error',
    valid2: 'Please choose a fee project',
    modalTit1: 'Modify settings',
    tit1: 'Customer-defined field',
    label1: 'custom{0}',
    tit2: 'Default consulting template',
    tit3: 'Treatment reservation setting',
    label3_1: 'Time of appointment：',
    label3_2: 'Time interval (minutes):',
    label3_3: 'Maximum appointment length (minutes):',
    label3_4: 'Minimum reservation length (minute):',
    tit4: 'Operation reservation',
    tit5: 'Consultation appointment setting',
    tit6: 'Allowable arrears',
    label6_1: 'true',
    label6_2: 'false',
    tit7: 'Integral proportion',
    label7: 'Consumption of 1 yuan to get the number of points',
    tit8: 'Privacy protection',
    label8_1: 'Number hiding',
    label8_2: 'hide all',
    label8_3: 'Partial concealment',
    tit9: 'Register',
    label9_1: 'Registered state:',
    label9_2: 'Registered toll collection',
    tit10: 'Referee registration',
    label10_1: 'Registered referee:',
    label10_2: 'Non registered customer registration:',
    tit11: 'Recommended users to send vouchers',
    label11_1: 'Recommended users to send vouchers:',
    label11_2: 'Voucher:',
    label11_3: 'Voucher amount:',
    placeholder11: 'Please choose coupons',
    colTit11: 'Use of hospital',
    tit12: 'Recommended time limit',
    label12: 'Number of days',
    tit13: 'Not less than some discount',
    label13: 'discount',
    tit14: 'Commission setting',
    label14_1: 'Commission setting:',
    label14_2: 'Grade:',
    label14_3: 'percentage:',
    tit15: 'Some level',
    label15_1: 'level',
    label15_2: 'remind(%)',
    modalTit15: 'Add some level',
    tit16: 'Beyond the maximum level unified point',
    label16: 'commission rate',
    tit17: 'SMS service',
    label17_1: 'The server：',
    label17_2: 'Account number：',
    label17_3: 'Password：',
  },


  /**
   * 系统日志
   */
  log: {
    label1: 'Operation date',
    label2: 'Operation type',
    label3: 'Affiliated Hospital',
    colTit1: 'Operation IP',
    colTit2: 'Operating customer',
  },


  /**
   * 账套管理
   */
  setBooks: {
    msg: 'For your data security, you need to set up the access password first!',
    label1: 'Access password',
    label2: 'Confirm the password',
    valid1: 'Please input a password',
    valid2: 'Please enter 6 bit passwords',
    valid3: 'Please enter the password again',
    valid4: 'Two input password inconsistencies',
  },
  /**
   * 账套列表
   */
  setBooksIndex: {
    modalTit: 'Check the account information',
    use: 'in use',
    unUse: 'not used',
    success: 'success',
    error: 'error',
    btn: 'Enable',
    label1: 'data base',
    label2: 'Database type',
    label3: 'Database connection address',
    label4: 'Use state',
    label5: 'Network state',
    label6: 'User name',
    label7: 'Password',
    label8: 'Creation time',
    msg1: 'Add books',
    msg2: 'Delete this account',
    msg3: 'Accounting information:',
    msg4: 'Warning: switching account process will lead to all users forced to withdraw from the Jin medical system, after the need to re login. Please make sure that no key business is in use first!',
    msg5: 'Do you switch to use?',
    msg6: 'The operation is successful! It will return to the landing page after 2 seconds!',
  },
  /**
   * 添加帐套
   */
  setBooksIndexAdd: {
    label1: 'Account name',
    label2: 'Host name /IP address',
    label3: 'Database port number',
    label4: 'Database name',
    valid: 'Please enter information',
    msg1: 'Add success',
    msg2: 'Test success',
    msg3: 'Please check the network connection',
    btn: 'test',
  },


  /**
   * 预收款项目
   */
  depositCharge: {
    modalTit1: 'Add a pre - receivable project',
    modalTit2: 'Revising the pre - receivable project',
    msg1: 'Is it sure to delete the pre - receivable project?',
    msg2: 'Pre receivable project information:',
    colTit1: 'Use of hospital',
    colTit2: 'Scope of use',
    tit1: 'Designated project classification:',
    tit2: 'Designated items:',
    tit3: 'Unlimited',
  },
  /**
   * 编辑预收款项目
   */
  depositChargeEdit: {
    msg1: 'Please choose the hospital, can be selected',
    label1: 'Gift vouchers',
    label2: 'open',
    label3: 'Voucher type',
    label4: 'Voucher amount',
    placeHolder1: 'Please select the type of voucher',
    placeHolder2: 'Select project type',
    valid1: 'Please enter the name',
    valid2: 'Please enter the price',
    valid3: 'Please choose a hospital',
  },


  /**
   * 代金券类型
   */
  couponCategory: {
    modalTit1: 'Add a voucher type',
    modalTit2: 'Modify the voucher type',
    msg1: 'Delete vouchers?',
    msg2: 'Voucher type information:',
    valid1: 'Please enter the time',
    label1: 'Use time limit',
    label2: 'Before the specified date',
    label3: 'N days after the entry into force',
  },


  /**
   * 收费项目类型
   */
  chargeCategory: {
    modalTit1: 'Add the type of charge project',
    modalTit2: 'Modifying the type of charge project',
    msg1: ' Determine the type of deleting a charge item?',
    msg2: 'Information on the type of charge items:',
    label: 'Superior',
    modalTit: 'Select project type',
    placeHolder: 'Please choose the superior',
  },


  /**
   * 收费项目
   */
  charge: {
    btn: 'Consumable material',
    modalTit1: 'Add a charge project',
    modalTit2: 'Revise the charge item',
    modalTit3: 'Please choose the type of charge project',
    modalTit4: 'Modify the consumables setting',
    msg1: 'Deleting the charge items?',
    msg2: 'Charge item information:',
    msg3: 'This is a retail project. Please go to the editors of the drug.',
    colTit1: 'Print name',
    colTit2: 'Code',
    label1: 'Available for sale',
    label2: 'halt the sales',
  },
  /**
   * 编辑收费项目
   */
  chargeEdit: {
    tit1: 'Basic information',
    tit2: 'Price setting',
    label1: 'attending',
    label2: 'Need',
    label3: 'Unwanted',
    label4: 'Sales model',
    label5: 'Selling price',
    label6: 'Available for sale',
    label7: 'halt the sales',
    label8: 'Organization name',
    label9: 'Sales status',
    label10: 'Price details',
    btn1: 'Unified pricing',
    btn2: 'Regional pricing',
    valid1: 'Please input, after the creation, can not be modified!',
    valid2: 'Please enter the pinyin code',
    valid3: 'Please enter the lowercase letters and numbers',
    valid4: 'Please select the unit',
  },
  /**
   * 修改项目耗材
   */
  chargeMedicinalSet: {
    tit: 'Addition of goods and drugs',
    btn: 'Choice',
    label1: 'Default number',
    label2: 'Maximum quantity',
    label3: 'Add extra consumables',
    label4: 'allow',
    label5: 'Not allow',
    placeHolder: 'Selection of drug types',
    msg: 'The maximum quantity unrestricted is 0',
  },


  /**
   * 套餐管理
   */
  chargeSet: {
    modalTit1: 'Add a set meal',
    modalTit2: 'Revise the set meal',
    modalTit3: 'Choose the type of set meal',
    msg1: 'Determine the deleting package?',
    msg2: 'Package information:',
    label: 'Type of set meal',
  },
  /**
   * 套餐编辑
   */
  chargeSetEdit: {
    label1: 'Time limit',
    label2: 'Number of days',
    label3: 'Start time',
    label4: 'From the time of purchase',
    label5: 'From the first time of consumption',
    label6: 'Remarks',
    label7: 'project',
    label8: 'Number',
    modalTit: 'Please choose the package project',
    valid1: 'The charge item has been added',
    valid2: 'Please choose the package project',
  },


  /**
   * 药物品类型
   */
  productCategory: {
    modalTit1: 'Addition of drug type',
    modalTit2: 'Modification of drug types',
    modalTit3: 'Selection of drug types',
    msg1: 'Determine the type of deleting drugs?',
    msg2: 'Information on the type of drug goods:',
  },
  /**
   * 药物品属性
   */
  productQuality: {
    tit1: 'The goods | default configuration',
    tit2: 'Commodity | custom attribute configuration',
    modalTit: 'Modify custom properties',
    label1: 'alias',
  },
  /**
   * 药物品
   */
  product: {
    label1: 'ID/ name / pinyin code',
    label2: 'Available for sale',
    label3: 'halt the sales',
    colTit1: 'alias',
    colTit2: 'English name',
    colTit3: 'General-purpose name',
    colTit4: 'brand',
    colTit5: 'Chinese Medicine',
    colTit6: 'The purchase price',
    colTit7: 'code',
    modalTit1: 'Add drugs',
    modalTit2: 'Amend the drug',
    modalTit3: 'Please select the type',
    msg1: 'Make sure that the drug is deleted?',
    msg2: 'Drug information:',
  },
  /**
   * 药物品编辑
   */
  productEdit: {
    tit1: 'Basic information',
    tit2: 'Price setting',
    tit3: 'Unit setting',
    msg1: 'Note: the branch can not be modified as soon as it is saved.',
    msg2: 'Note: the branch can not be modified. Please go to the group to amend it',
    label1: 'Cost univalent',
    label2: 'Prescription printing',
    label3: 'RX (yes)',
    label4: 'OTC (no)',
    label5: 'Sales type',
    label6: 'retail',
    label7: 'Non retail',
    label8: 'Retail model',
    label9: 'Unified pricing',
    label10: 'Regional pricing',
    label11: 'Retail price',
    label12: 'Recommended retail price',
    label13: 'Retail type',
    label14: 'Price details',
    colTit1: 'Organization name',
    colTit2: 'Retail State',
    colTit3: 'Retail warehouse',
    colTit4: 'Unit relationship',
    colTit5: 'Conversion relationship',
    unit1: 'Basic unit',
    unit2: 'Auxiliary unit',
    valid1: 'Please input, after the creation, can not be modified!',
    valid2: 'Please choose the retail type',
    valid3: 'Please choose the basic unit',
    valid4: 'Please choose the retail warehouse',
  },


  /**
   * 权益管理
   */
  equity: {
    tit1: 'Discounted rights and interests',
    tit2: 'Custom rights',
    colTit1: 'Discount (%)',
    colTit2: 'content',
    label: 'Discount (0-100)',
    modalTit1: 'Add discounted equity',
    modalTit2: 'Amend the discounted rights and interests',
    modalTit3: 'Adding custom rights',
    modalTit4: 'Modify custom rights',
    msg1: 'Determine the deletion of the rights and interests?',
    msg2: 'Rights and interests information:',
  },


  /**
   * 会员类型管理
   */
  memberCategory: {
    btn1: 'Resetting the members',
    btn2: 'Modify icons',
    btn3: 'Default icon',
    btn4: 'Amend the amount',
    btn5: 'Allocation of rights and interests',
    colTit1: 'Grade',
    colTit2: 'Icon',
    colTit3: 'Amount limitation',
    colTit4: 'List of rights and interests',
    msg1: 'Do you restore the default icon?',
    msg2: 'Do you reset the membership information?',
    modalTit: 'Modifying Member Information',
    valid: 'Please enter the amount of money',
  },
  /**
   * 修改会员图标
   */
  updateImage: {
    label: 'Select icons',
    modalTit: 'view picture',
    valid: 'Please select the picture',
    msg1: "The size of the head can't exceed 10M!",
    msg2: 'Please choose GIF, JPG, JPEG, BMP, PNG pictures!',
  },
  /**
   * 修改会员权益
   */
  memberCategoryQuitys: {
    label: 'List of rights and interests',
    modalTit: 'Choice of rights and interests',
    colTit: 'content',
  },


  /**
   * 项目折扣
   */
  chargeDiscount: {
    label1: 'Pay Service',
    label2: 'Discount (%)',
    modalTit1: 'Add project discounts',
    modalTit2: 'Modify project discounts',
    msg1: 'Deleting item discounts?',
    msg2: 'Project discount information:',
  },


  /**
   * 用户折扣
   */
  userDiscount: {
    label: 'user',
    modalTit1: 'Add user discounts',
    modalTit2: 'Modifying user discounts',
    msg1: 'Do you want to delete user discounts?',
    msg2: 'User discount information:',
    valid: 'Please select the user',
  },


  /**
   * 打印设置
   */
  print: {
    orderName: 'Project list',
    orderRemark: 'Parameter Description: table details: $Table table list (not shown discount):$SimpleTable customer number: $CustomerID Customer Name: $CustomerName cashier number: $No checkout date: $CreateDate cashier cashier: $CreateTime Name: $CreateUserName order number: $OrderID: $Amount total amount receivable discount paid amount: $DiscountAmount: $Total: $Cash cash payment total credit card: $Card card with a variety of payment: $CardCategory deposit payment: $Deposit: $Coupon: $Debt coupon payment arrears current balance: $DepositAmount current coupon amount: $CouponAmount current: $PointAmount integral',
    repaymentName: 'repayment',
    repaymentRemark: 'Parameter Description: table details: $Table customer number: $CustomerID Customer Name: $CustomerName cashier number: $No checkout date: $CreateDate cashier cashier: $CreateTime Name: $CreateUserName order number: $OrderID receivable amount: $Amount paid amount: $CashCard cash card total: $Cash: $Card: $CardCategory with a variety of card payment arrears remaining: $Debt',
    depositName: 'Pre payment',
    depositRemark: 'Parameter Description: customer number: $CustomerID Customer Name: $CustomerName cashier number: $No checkout date: $CreateDate cashier cashier: $CreateTime Name: $CreateUserName order number: $OrderID receivable amount: $Amount cash card: $Cash total: $Card card with payment: $CardCategory',
    channelRechargeName: 'Channel providers recharge',
    channelRechargeRemark: 'Channel Business Number: $CustomerID Channel Business Name: $CustomerName Cashier Number: $No Cashier Date: $CreateDate Cashier Time: $CreateTime Cashier Name: $CreateUserName Order Number: $OrderID Receivable: $Amount Cash Payment: $Cash Card Details Payment: $CardCategory',
    rebateName: 'Refunds',
    rebateRemark: 'Parameter Description: customer number: $CustomerID Customer Name: $CustomerName cashier number: $No checkout date: $CreateDate cashier cashier: $CreateTime Name: $CreateUserName order number: $OrderID receivable amount: $Amount cash card: $Cash total: $Card card with payment: $CardCategory',
    backName: 'Retreat project',
    backRemark: 'Parameter Description: table details: $Table customer number: $CustomerID Customer Name: $CustomerName cashier number: $No checkout date: $CreateDate cashier cashier: $CreateTime Name: $CreateUserName order number: $OrderID receivable amount: $Amount cash: $Cash total credit card: $Card card with a variety of payment: $CardCategory',
    settlementName: 'Settlement',
    settlementRemark: 'Parameter Description: table details: $Table settlement date: $CreateDate settlement time: $CreateTime $StartTime: start time end time: $EndTime operator name: $CreateUserName $Amount: the total amount of cash amount: the amount of credit card: $Cash $Card cashier number: $Num',
    operationName: 'Huakou',
    operationRemark: 'Parameter Description: form details: $Table customer number: $CustomerID Customer Name: $CustomerName date: $CreateDate time: $CreateTime operator name: $CreateUserName total consumption: total consumption of $TotalNum: $TotalAmount.',
    surgeryName: 'Surgical notice',
    surgeryRemark: 'Parameter Description: table details: $Table customer number: $CustomerID Customer Name: $CustomerName sex: $Gender age: $Age operation date: $Date $StartTime: start time end time: $EndTime doctor appointment: $UserName operator name: $CreateUserName type: $AnesthesiaType anesthesia consultants: $ManagerUserName',
    purchaseName: 'Enter the warehouse',
    purchaseRemark: 'Parameter Description: form details: $Table warehouse Name: $WarehouseName supplier: $SupplierName single number: $No storage date: $CreateDate storage time: $CreateTime operation user name: $CreateUserName total quantity: $Num total amount: $Amount.',
    returnName: "Manufacturer's return",
    returnRemark: 'Parameter Description: form details: $Table warehouse Name: $WarehouseName supplier: $SupplierName single number: $No date out: $CreateDate outbound time: $CreateTime operation user name: $CreateUserName total quantity: $Num total amount: $Amount.',
    allocateName: 'allocation',
    allocateRemark: 'Parameter Description: table details: $Table V: $FromWarehouseName warehouse transferred warehouse: $ToWarehouseName number: $No transfer date: $CreateDate user name: $CreateTime operating time allocation: the total number of $CreateUserName: $Num: $Amount: the total amount of $UserName',
    checkName: 'Inventory',
    checkRemark: 'Parameter Description: table details: $Table warehouse Name: $WarehouseName single number: $No inventory date: $CreateDate inventory time: $CreateTime operation user name: $CreateUserName total number: $Num.',
    useName: 'use',
    useRemark: 'Parameter Description: table details: $Table Name: $WarehouseName led by warehouse department: $DeptName recipients: $UserName number: $No receive date: $CreateDate. Time: $CreateTime user name: the total number of $CreateUserName $Num: total amount: $Amount',
    prescriptionName: 'prescription',
    prescriptionRemark: 'Parameter Description: form details: $Table Customer Name: $CustomerName gender: $CustomerGender age: $Age payment date: $PaidTime drug amount: $Amount.',
    borrowName: 'Apply for application',
    borrowRemark: 'Parameter Description: form details: $Table invoice number: $No borrow Department: $DeptName borrow date: $CreateDate borrower: $DoUserName warehouse Repository: $WarehouseName borrow reason: $Remark.',
    returnBorrowedName: 'Return to the Treasury',
    returnBorrowedRemark: 'Parameter Description: form details: $Table invoice number: $No borrow Department: $DeptName borrow date: $CreateDate borrower: $DoUserName warehouse Repository: $WarehouseName borrow reason: $remark.',
    returnSalesName: 'Drug withdrawal',
    returnSalesRemark: 'Parameter Description: table details: $Table Customer Name: $CustomerName warehousing department number: $No: $DeptName: $WarehouseName: $Remark storage warehouse personnel submit: $CreateUserName submission: $CreateTime audit personnel: $AuditUserName audit time: $AuditTime',
    stockOutDeskName: 'buckle out of the library',
    stockOutDeskRemark: 'Parameter Description: table detail: $Table Customer Name: $CustomerName customer number: $CustomerID out of Library single number: $No storehouse: $WarehouseName kickoff: $CreateTime',
    label1: 'width',
    label2: 'Typeface',
    label3: 'Template',
    label4: 'size',
    label5: 'content',
    modalTit1: 'Edit font',
    modalTit2: 'Edit width',
    modalTit3: 'Edit template',
    valid: 'Please enter the content',
  },


  /**
   * 审核规则
   */
  auditRule: {
    order: 'Project discount',
    back: 'Retreat project',
    backSales: 'Drug withdrawal',
    rebateDeposit: 'Refunds',
    depositTransfer: 'Pre payment transfer',
    exploitChange: 'Developer change',
    managerChange: 'Consultant change',
    member: 'Membership change',
    addEquity: 'Increase the rights and interests',
    deleteEquity: 'Delete rights and interests',
    addCoupon: 'Send coupons',
    rebateCoupon: 'Return ticket',
    addPoint: 'Send integral',
    rebatePoint: 'Deduction integral',
    pointCoupon: 'Exchange voucher',
    orderDetailManager: 'Replace a doctor',
    blacklist: 'Blacklist',
    debtOperation: 'Arrears',
    msg1: 'All audit rule types:',
    msg2: 'Determine to delete this audit rule?',
    colTit1: 'Rule type',
    colTit2: 'series',
    colTit3: 'Lower than discounts (%)',
    colTit4: 'Higher than the amount',
    colTit5: 'Audit user',
    btn: 'Add rules',
    other: 'Other',
    add1: 'Adding order discount audit rules',
    add2: 'Add back project audit rules',
    add3: 'Audit rules for adding drugs',
    add4: 'Add a refund review rule',
    add5: 'Add audit rules',
    label1: 'One',
    label2: 'Second',
    label3: 'Three',
    label4: 'Four',
    label5: 'First level auditor',
    label6: 'Two level auditor',
    label7: 'Three level auditor',
    label8: 'Four level auditor',
    label9: 'Five level auditor',
    label10: 'discount<',
    label11: 'price<=',
    label12: 'Five',
    placeholder: 'Please choose the auditor',
    valid: 'Please select the audit type',
  },


  /**
   * 编辑权限
   */
  manager: {
    updateChannel: 'Modifying the source',
    updateSymptom: 'Modifying the consulting project',
    updateStore: 'Modify channel',
    updateMobile: 'Modification of contact',
    consultUpdate: 'Modification of consultation',
    consultDelete: 'Delete consultation',
    failtureUpdate: 'Amend the unfinished business',
    failtureDelete: 'Delete unfinished business',
    tagDelete: 'delete a tap',
    relationDelete: 'Delete relation',
    surveyUpdate: 'Revising the questionnaire',
    surveyDelete: 'Delete the questionnaire',
    medicalRecordUpdate: 'Revision of the medical record',
    medicalRecordDelete: 'Delete the medical record',
    photoUpdate: '  Amend the picture',
    photoDelete: 'Delete a photo',
    appointmentUpdate: 'Revision of consultancy reservation',
    appointmentDelete: 'Deleting an Appointment Reservation',
    treatUpdate: 'Revision of the treatment reservation',
    treatDelete: 'Deleting treatment appointments',
    surgeryUpdate: 'Revision of the operation reservation',
    surgeryDelete: 'Deleting an operation reservation',
    callbackTaskUpdate: 'Revise revisit reminding',
    callbackTaskDelete: 'Delete revisit reminding',
    callbackUpdate: 'Amend the return visit',
    callbackDelete: 'Delete return visit',
    operationUpdate: 'Amend the buckle',
    operationDelete: 'Deleting clasp',
    operationStockOutDelete: 'Deleting deducted shipment',
    commissionDelete: 'Delete channel Commission',
    blacklistDelete: 'Delete the blacklist',
    stockDelete: 'Delete the import and export list',
    updateEffectrRacking: 'Modification effect tracing',
    deleteEffectrRacking: 'Deleting effect tracking',
    label1: 'All permissions type',
    label2: 'Permissions type',
    label3: 'Privileged users',
    valid1: 'Please select the permissions type',
    valid2: 'Please select the privileged user',
    msg: 'Determine the deletion of {0} permissions for this user?',
    msg1: 'All permissions settings',
    modalTit: 'Add permissions users',
  },


  /**
   * 医生预约
   */
  treatDoctor: {
    label1: 'Doctor',
    label2: 'Time of appointment',
    label3: 'Reservable number',
    valid1: 'Please choose the appointment time',
    valid2: 'Please choose a doctor',
    modalTit1: 'Add a reservation set',
    modalTit2: 'Modify the reservation setting',
    btn: 'Batch addition',
    tit: 'Batch add settings',
    msg1: 'Is it sure to delete this reservation setting?',
    msg2: 'Do you decide to delete all the appointment settings for this doctor?',
  },


  /**
   * 医生咨询
   */
  consultDoctor: {
    label1: 'Allowed diagnosis',
    label2: 'Permission to make an appointment',
    label3: 'Association relation',
    label4: 'alias',
    label5: 'yes',
    label6: 'no',
    modalTit1: 'Add the consultant setup',
    modalTit2: 'Modify the consultant setup',
    msg1: 'Is it sure to delete the consultant setup?',
    msg2: 'Consult the doctor information:',
  },


  /**
   * 仪器管理页面
   */
  instrument: {
    label: 'Number',
    modalTit1: 'Add instrument management',
    modalTit2: 'Amend the management of instruments',
    msg1: 'Deleting the management of the instrument?',
    msg2: 'Instrument management information:',
  },


  /**
   * 预约项目
   */
  appointmentCharge: {
    label1: 'Reservations',
    label2: 'Default time (minutes)',
    label3: 'Instrument and equipment',
    label4: 'entry name',
    colTit: 'Project number',
    modalTit1: 'Add an appointment project',
    modalTit2: 'Modifying an appointment project',
    msg1: 'Deleting the reservation item?',
    msg2: 'Reservation item information:',
    valid: 'Please choose an appointment project',
  },
};