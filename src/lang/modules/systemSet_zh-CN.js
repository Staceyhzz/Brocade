export default {
  /**
   * 医院管理
   */  
  hospital: {
    colTit1: '全称',
    colTit2: '城市',
    colTit3: '地址',
    modalTit: '修改医院',
    valid1: '请输入全称',
    valid2: '请选择城市',
  },


  /**
   * 部门管理
   */
  dept: {
    label: '开放状态',
    open: '开放',
    noOpen: '不开放',
    modalTit1: '添加部门',
    modalTit2: '修改部门',
    msg1: '确定删除部门？',
    msg2: '部门信息：',
  }, 


  /**
   * 用户管理
   */
  user: {
    btn1: '批量设置角色',
    btn2: '查看权限',
    btn3: '设置客户权限',
    btn4: '设置回访权限',
    label1: '姓名',
    label2: '密码',
    label4: '电话',
    label5: '手机',
    valid1: '请选择信息',
    valid2: '请填写信息',
    colTit: '编号',
    modalTit1: '添加用户',
    modalTit2: '修改用户',
    msg1: '确定删除用户？',
    msg2: '用户信息：',
  },
  /**
   * 批量设置角色
   */
  userSetting: {
    label: '用户列表',
    valid1: '请选择角色',
    valid2: '请选择用户',
  },
  /**
   * 设置用户权限
   */
  userPower: {
    msg1: '选择医院',
    msg2: '选择部门',
    msg3: '选择用户',
  },
  /**
   * 查看用户权限
   */
  userCheck: {
    menuTit1: '系统菜单',
    menuTit2: '客户档案',
    menuTit3: '操作权限',
    menuTit4: '报表权限',
    menuTit5: '进价查看',
    colTit1: '菜单名称',
    colTit2: '菜单模块',
    colTit3: '报表类别',
    colTit4: '权限设置',
    power1: '无权限',
    power2: '集团',
    power3: '医院',
    power4: '个人',
    msg1: '进货价格查看权限：',
    msg2: '价格隐藏的物品：',
    price1: '部分隐藏',
    price2: '全部隐藏',
    price3: '全部可见',
  },


  /**
   * 用户权限自定义
   */
  userAuthCustom: {
    modalTit: '重置用户密码',
    label1: '新密码',
    label2: '确认密码',
    valid1: '请输入密码',
    valid2: '密码长度不小于8位',
    valid3: '请再次输入密码',
    valid4: '两次输入密码不一致',
    colTit1: '电话',
    colTit2: '手机',
    btn: '重置密码',
  },
  /**
   * 用户权限自定义设置
   */
  userAuthCustomSet: {
    menuTit: '绑定角色',
    btn: '解除角色绑定',
    valid: '请选择角色',
    msg1: '已绑定角色：',
    msg2: '确定解除角色绑定？',
    msg3: '设置系统菜单',
    msg4: '设置操作权限',
    msg5: '设置客户档案',
    msg6: '设置进价查看',
  },
  /**
   * 设置进价查看
   */
  userUpdatePriceMenu: {
    tit1: '进货价格查看',
    tit2: '价格隐藏的物品',
    msg: '隐藏价格的物品，物品的进货价格显示为0元',
    btn: '物品',
    modalTit: '选择物品',
    label: 'ID/名称/拼音码',
    placeholder: '请选择类型',
  },


  /**
   * 角色管理
   */
  role: {
    modalTit1: '添加角色',
    modalTit2: '修改角色',
    msg1: '确定删除角色？',
    msg2: '角色信息：',
  },


  /**
   * 系统设置
   */
  option: {
    open: '开启',
    close: '关闭',
    valid1: '时间范围错误',
    valid2: '请选择收费项目',
    modalTit1: '修改设置',
    tit1: '客户自定义字段',
    label1: '自定义{0}',
    tit2: '默认咨询模板',
    tit3: '治疗预约设置',
    label3_1: '预约时间：',
    label3_2: '时间间隔(分钟)：',
    label3_3: '最大预约时长(分钟)：',
    label3_4: '最小预约时长(分钟)：',
    tit4: '手术预约设置',
    tit5: '咨询预约设置',
    tit6: '允许欠款',
    label6_1: '是',
    label6_2: '否',
    tit7: '积分比例',
    label7: '消费1元获取积分数量',
    tit8: '隐私保护',
    label8_1: '号码隐藏',
    label8_2: '全部隐藏',
    label8_3: '部分隐藏',
    tit9: '挂号',
    label9_1: '挂号状态：',
    label9_2: '挂号收费项目',
    tit10: '推荐人注册',
    label10_1: '注册推荐人：',
    label10_2: '非登记客户注册：',
    tit11: '被推荐用户送券',
    label11_1: '被推荐用户送券：',
    label11_2: '券：',
    label11_3: '券金额：',
    placeholder11: '请选择券',
    colTit11: '可使用医院',
    tit12: '推荐时限',
    label12: '天数',
    tit13: '不提点折扣小于',
    label13: '折扣',
    tit14: '提成佣金设置',
    label14_1: '提成佣金设置：',
    label14_2: '等级：',
    label14_3: '提成：',
    tit15: '级别提点',
    label15_1: '级别',
    label15_2: '提点(%)',
    modalTit15: '添加级别提点',
    tit16: '超出最大级别统一提点',
    label16: '佣金比例',
    tit17: '短信服务',
    label17_1: '服务器：',
    label17_2: '账号：',
    label17_3: '密码：',
  },


  /**
   * 系统日志
   */
  log: {
    label1: '操作日期',
    label2: '操作类型',
    label3: '所属医院',
    colTit1: '操作IP',
    colTit2: '操作客户',
  },


  /**
   * 账套管理
   */
  setBooks: {
    msg: '为了您的数据安全 ，您需要先设置访问密码！',
    label1: '访问密码',
    label2: '确认密码',
    valid1: '请输入密码',
    valid2: '请输入6位密码',
    valid3: '请再次输入密码',
    valid4: '两次输入密码不一致',
  },
  /**
   * 账套列表
   */
  setBooksIndex: {
    modalTit: '查看帐套信息',
    use: '使用中',
    unUse: '未使用',
    success: '连接正常',
    error: '连接异常',
    btn: '启用',
    label1: '数据库',
    label2: '数据库类型',
    label3: '数据库连接地址',
    label4: '使用状态',
    label5: '网络状态',
    label6: '用户名',
    label7: '密码',
    label8: '创建时间',
    msg1: '添加帐套',
    msg2: '确定删除此帐套',
    msg3: '帐套信息：',
    msg4: '警告：切换账套过程中会导致所有使用者强制退出锦医卫系统，成功后需要重新登录。请先确保无关键性业务正在使用！',
    msg5: '是否切换使用？',
    msg6: '操作成功！将于2秒后返回登陆页面！',
  },
  /**
   * 添加帐套
   */
  setBooksIndexAdd: {
    label1: '帐套名称',
    label2: '主机名/IP地址',
    label3: '数据库端口号',
    label4: '数据库名称',
    valid: '请输入信息',
    msg1: '添加成功',
    msg2: '测试成功',
    msg3: '请检查网络连接',
    btn: '测试',
  },


  /**
   * 预收款项目
   */
  depositCharge: {
    modalTit1: '添加预收款项目',
    modalTit2: '修改预收款项目',
    msg1: '确定删除预收款项目？',
    msg2: '预收款项目信息：',
    colTit1: '可使用医院',
    colTit2: '使用范围',
    tit1: '指定项目分类：',
    tit2: '指定项目：',
    tit3: '无限制',
  },
  /**
   * 编辑预收款项目
   */
  depositChargeEdit: {
    msg1: '请选择可使用医院，可多选',
    label1: '赠送代金券',
    label2: '开启',
    label3: '券类型',
    label4: '券金额',
    placeHolder1: '请选择券类型',
    placeHolder2: '选择项目类型',
    valid1: '请输入姓名',
    valid2: '请输入价格',
    valid3: '请选择医院',
  },


  /**
   * 代金券类型
   */
  couponCategory: {
    modalTit1: '添加代金券类型',
    modalTit2: '修改代金券类型',
    msg1: '确定删除代金券类型？',
    msg2: '代金券类型信息：',
    valid1: '请输入时间',
    label1: '使用时间限制',
    label2: '指定日期之前',
    label3: '领取后N天过期',
  },


  /**
   * 收费项目类型
   */
  chargeCategory: {
    modalTit1: '添加收费项目类型',
    modalTit2: '修改收费项目类型',
    msg1: '确定删除收费项目类型？',
    msg2: '收费项目类型信息：',
    label: '上级',
    modalTit: '选择项目类型',
    placeHolder: '请选择上级',
  },


  /**
   * 收费项目
   */
  charge: {
    btn: '耗材设置',
    modalTit1: '添加收费项目',
    modalTit2: '修改收费项目',
    modalTit3: '请选择收费项目类型',
    modalTit4: '修改耗材设置',
    msg1: '确定删除收费项目？',
    msg2: '收费项目信息：',
    msg3: '此项目为零售项目，请前往药物品编辑',
    colTit1: '打印名称',
    colTit2: '代码',
    label1: '可售',
    label2: '停售',
  },
  /**
   * 编辑收费项目
   */
  chargeEdit: {
    tit1: '基础信息',
    tit2: '价格设置',
    label1: '主诊医生',
    label2: '需要',
    label3: '不需要',
    label4: '销售模式',
    label5: '销售价格',
    label6: '可售',
    label7: '停售',
    label8: '机构名称',
    label9: '销售状态',
    label10: '价格详情',
    btn1: '统一定价',
    btn2: '区域定价',
    valid1: '请输入,创建后,不可修改！',
    valid2: '请输入拼音码',
    valid3: '请输入小写字母、数字',
    valid4: '请选择单位',
  },
  /**
   * 修改项目耗材
   */
  chargeMedicinalSet: {
    tit: '添加物品药品',
    btn: '选择',
    label1: '默认数量',
    label2: '最大数量',
    label3: '添加额外耗材',
    label4: '允许',
    label5: '不允许',
    placeHolder: '选择药物品类型',
    msg: '最大数量不限制则填0',
  },


  /**
   * 套餐管理
   */
  chargeSet: {
    modalTit1: '添加套餐',
    modalTit2: '修改套餐',
    modalTit3: '选择套餐类型',
    msg1: '确定删除套餐？',
    msg2: '套餐信息：',
    label: '套餐类型',
  },
  /**
   * 套餐编辑
   */
  chargeSetEdit: {
    label1: '时间限制',
    label2: '天数',
    label3: '起始时间',
    label4: '从购买时算',
    label5: '从第一次消费时算',
    label6: '详细',
    label7: '项目',
    label8: '数量',
    modalTit: '请选择套餐项目',
    valid1: '该收费项目已添加',
    valid2: '请选择套餐项目',
  },


  /**
   * 药物品类型
   */
  productCategory: {
    modalTit1: '添加药物品类型',
    modalTit2: '修改药物品类型',
    modalTit3: '选择药物品类型',
    msg1: '确定删除药物品类型？',
    msg2: '药物品类型信息：',
  },
  /**
   * 药物品属性
   */
  productQuality: {
    tit1: '商品 | 默认属性配置',
    tit2: '商品 | 自定义属性配置',
    modalTit: '修改自定义属性',
    label1: '别名',
  },
  /**
   * 药物品
   */
  product: {
    label1: 'ID/名称/拼音码',
    label2: '可售',
    label3: '停售',
    colTit1: '别名',
    colTit2: '英文名',
    colTit3: '通用名',
    colTit4: '品牌',
    colTit5: '国药准字',
    colTit6: '进价',
    colTit7: '代码',
    modalTit1: '添加药物品',
    modalTit2: '修改药物品',
    modalTit3: '请选择类型',
    msg1: '确定删除药物品？',
    msg2: '药物品信息：',
  },
  /**
   * 药物品编辑
   */
  productEdit: {
    tit1: '基础信息',
    tit2: '价格设置',
    tit3: '单位设置',
    msg1: '注：分院一经保存，无法修改',
    msg2: '注：分院无法修改，请前往集团修改',
    label1: '成本单价',
    label2: '处方打印',
    label3: 'RX(是)',
    label4: 'OTC(否)',
    label5: '销售类型',
    label6: '零售',
    label7: '非零售',
    label8: '零售模式',
    label9: '统一定价',
    label10: '区域定价',
    label11: '零售单价',
    label12: '建议零售单价',
    label13: '零售类型',
    label14: '价格详情',
    colTit1: '机构名称',
    colTit2: '零售状态',
    colTit3: '零售仓库',
    colTit4: '单位关系',
    colTit5: '换算关系',
    unit1: '基本单位',
    unit2: '辅助单位',
    valid1: '请输入,创建后,不可修改！',
    valid2: '请选择零售类型',
    valid3: '请选择基本单位',
    valid4: '请选择零售仓库',
  },


  /**
   * 权益管理
   */
  equity: {
    tit1: '折扣类权益',
    tit2: '自定义权益',
    colTit1: '折扣(%)',
    colTit2: '内容',
    label: '折扣(0-100)',
    modalTit1: '添加折扣类权益',
    modalTit2: '修改折扣类权益',
    modalTit3: '添加自定义权益',
    modalTit4: '修改自定义权益',
    msg1: '确定删除权益？',
    msg2: '权益信息：',
  },


  /**
   * 会员类型管理
   */
  memberCategory: {
    btn1: '重置会员',
    btn2: '修改图标',
    btn3: '默认图标',
    btn4: '修改金额',
    btn5: '配置权益',
    colTit1: '等级',
    colTit2: '图标',
    colTit3: '金额限制',
    colTit4: '权益列表',
    msg1: '是否恢复默认图标？',
    msg2: '是否重置会员信息？',
    modalTit: '修改会员信息',
    valid: '请输入金额',
  },
  /**
   * 修改会员图标
   */
  updateImage: {
    label: '选择图标',
    modalTit: '查看图片',
    valid: '请选择图片',
    msg1: '头像大小不能超过10M！',
    msg2: '请选择gif、jpg、jpeg、bmp、png图片！',
  },
  /**
   * 修改会员权益
   */
  memberCategoryQuitys: {
    label: '权益列表',
    modalTit: '请选择权益',
    colTit: '内容',
  },


  /**
   * 项目折扣
   */
  chargeDiscount: {
    label1: '收费项目',
    label2: '折扣(%)',
    modalTit1: '添加项目折扣',
    modalTit2: '修改项目折扣',
    msg1: '确定删除项目折扣？',
    msg2: '项目折扣信息：',
  },


  /**
   * 用户折扣
   */
  userDiscount: {
    label: '用户',
    modalTit1: '添加用户折扣',
    modalTit2: '修改用户折扣',
    msg1: '确定删除用户折扣？',
    msg2: '用户折扣信息：',
    valid: '请选择用户',
  },


  /**
   * 打印设置
   */
  print: {
    orderName: '项目单',
    orderRemark: '参数说明：表格明细：$Table  表格明细(不显示折扣)：$SimpleTable  客户编号：$CustomerID  客户名称：$CustomerName  收银单号：$No  收银日期：$CreateDate  收银时间：$CreateTime  收银员名称：$CreateUserName  订单编号：$OrderID  应收金额：$Amount  折扣总额：$DiscountAmount  实收金额：$Total  现金支付：$Cash  虚拟币金额：$VirtualCurrency 刷卡总额：$Card  各种卡详细支付：$CardCategory  存款支付：$Deposit  券支付：$Coupon  欠款：$Debt  当前余额：$DepositAmount  当前券额：$CouponAmount  当前积分：$PointAmount',
    repaymentName: '还款',
    repaymentRemark: '参数说明：表格明细：$Table  客户编号：$CustomerID  客户名称：$CustomerName  收银单号：$No  收银日期：$CreateDate  收银时间：$CreateTime  收银员名称：$CreateUserName  订单编号：$OrderID  应收金额：$Amount  实收金额：$CashCard  现金支付：$Cash  刷卡总额：$Card  各种卡详细支付：$CardCategory  剩余欠款：$Debt',
    depositName: '预收款',
    depositRemark: '参数说明：客户编号：$CustomerID  客户名称：$CustomerName  收银单号：$No  收银日期：$CreateDate  收银时间：$CreateTime  收银员名称：$CreateUserName  订单编号：$OrderID  应收金额：$Amount  现金支付：$Cash  刷卡总额：$Card  各种卡详细支付：$CardCategory',
    channelRechargeName: '渠道商充值',
    channelRechargeRemark: '参数说明：渠道商编号：$CustomerID  渠道商名称：$CustomerName  收银单号：$No  收银日期：$CreateDate  收银时间：$CreateTime  收银员名称：$CreateUserName  订单编号：$OrderID  应收金额：$Amount  现金支付：$Cash  刷卡总额：$Card  各种卡详细支付：$CardCategory',
    rebateName: '退预收款',
    rebateRemark: '参数说明：客户编号：$CustomerID  客户名称：$CustomerName  收银单号：$No  收银日期：$CreateDate  收银时间：$CreateTime  收银员名称：$CreateUserName  订单编号：$OrderID  应收金额：$Amount  现金支付：$Cash  刷卡总额：$Card  各种卡详细支付：$CardCategory',
    backName: '退项目',
    backRemark: '参数说明：表格明细：$Table  客户编号：$CustomerID  客户名称：$CustomerName  收银单号：$No  收银日期：$CreateDate  收银时间：$CreateTime  收银员名称：$CreateUserName  订单编号：$OrderID  应收金额：$Amount  现金支付：$Cash  刷卡总额：$Card  各种卡详细支付：$CardCategory',
    settlementName: '结算',
    settlementRemark: '参数说明：表格明细：$Table  结算日期：$CreateDate   结算时间：$CreateTime  开始时间：$StartTime  结束时间：$EndTime  操作人员名称：$CreateUserName  总金额：$Amount  现金金额：$Cash  虚拟币金额：$VirtualCurrency 刷卡金额：$Card  收银数量：$Num',
    operationName: '划扣',
    operationRemark: '参数说明：表格明细：$Table  客户编号： $CustomerID   客户名称：$CustomerName  划扣日期：$CreateDate  划扣时间：$CreateTime  操作员名称：$CreateUserName  消费总数量：$TotalNum  消费总额：$TotalAmount',
    surgeryName: '手术通知',
    surgeryRemark: '参数说明：表格明细：$Table  客户编号：$CustomerID  客户名称：$CustomerName  性别：$Gender  年龄：$Age  手术日期：$Date  开始时间：$StartTime  结束时间：$EndTime  预约医生：$UserName  操作员名称：$CreateUserName  麻醉方式：$AnesthesiaType  咨询人员：$ManagerUserName',
    purchaseName: '进货入库',
    purchaseRemark: '参数说明：表格明细：$Table  仓库名称：$WarehouseName  供应商：$SupplierName  单号：$No  入库日期：$CreateDate  入库时间：$CreateTime  操作用户名称：$CreateUserName  总数量：$Num  总金额：$Amount',
    returnName: '厂家退货',
    returnRemark: '参数说明： 表格明细：$Table  仓库名称： $WarehouseName 供应商：$SupplierName  单号：$No  出库日期：$CreateDate  出库时间：$CreateTime  操作用户名称：$CreateUserName  总数量：$Num  总金额：$Amount',
    allocateName: '调拨',
    allocateRemark: '参数说明： 表格明细：$Table 调出仓库： $FromWarehouseName 调入仓库：$ToWarehouseName 单号：$No 调拨日期：$CreateDate 调拨时间：$CreateTime 操作用户名称：$CreateUserName 总数量：$Num 总金额：$Amount 申请人：$UserName',
    checkName: '盘点',
    checkRemark: '参数说明： 表格明细：$Table  仓库名称： $WarehouseName 单号：$No  盘点日期：$CreateDate  盘点时间：$CreateTime  操作用户名称：$CreateUserName  总数量：$Num',
    useName: '领用',
    useRemark: '参数说明： 表格明细：$Table  仓库名称： $WarehouseName  领用部门：$DeptName  领用人: $UserName  单号：$No  领用日期：$CreateDate  领用时间：$CreateTime  操作用户名称：$CreateUserName  总数量：$Num  总金额：$Amount',
    prescriptionName: '处方',
    prescriptionRemark: '参数说明： 表格明细：$Table  客户名称：$CustomerName  性别：$CustomerGender  年龄：$Age  支付日期：$PaidTime  药品金额：$Amount',
    borrowName: '借用申请',
    borrowRemark: '参数说明： 表格明细：$Table  收银单号：$No  借用部门：$DeptName  借用日期：$CreateDate  借用人员：$DoUserName  出库仓库：$WarehouseName  借用原因：$Remark ',
    returnBorrowedName: '归还入库',
    returnBorrowedRemark: '参数说明： 表格明细：$Table 收银单号：$No 借用部门：$DeptName 借用日期：$CreateDate 借用人员：$DoUserName 入库仓库：$WarehouseName 借用原因：$remark ',
    returnSalesName: '退药入库',
    returnSalesRemark: '参数说明：表格明细：$Table  客户名称：$CustomerName  入库单号：$No  科室：$DeptName  入库仓库：$WarehouseName  原因：$Remark  提交人员：$CreateUserName  提交时间：$CreateTime  审核人员：$AuditUserName  审核时间：$AuditTime',
    stockOutDeskName: '治疗出库',
    stockOutDeskRemark: '参数说明：表格明细：$Table  客户名称：$CustomerName  客户编号：$CustomerID 出库单号：$No   划扣仓库：$WarehouseName   划扣：$CreateTime',
    label1: '宽度',
    label2: '字体',
    label3: '模板',
    label4: '大小',
    label5: '内容',
    modalTit1: '编辑字体',
    modalTit2: '编辑宽度',
    modalTit3: '编辑模板',
    valid: '请输入内容',
  },


  /**
   * 审核规则
   */
  auditRule: {
    order: '项目折扣',
    back: '退项目',
    backSales: '退药物品',
    rebateDeposit: '退预收款',
    depositTransfer: '预收款转账',
    exploitChange: '开发人员变更',
    managerChange: '咨询人员变更',
    member: '会员变更',
    addEquity: '增加权益',
    deleteEquity: '删除权益',
    addCoupon: '送券',
    rebateCoupon: '退券',
    addPoint: '送积分',
    rebatePoint: '扣减积分',
    pointCoupon: '积分兑换券',
    orderDetailManager: '更换医生',
    blacklist: '黑名单',
    debtOperation: '欠费划扣',
    msg1: '所有审核规则类型：',
    msg2: '确定删除此审核规则?',
    colTit1: '规则类型',
    colTit2: '级数',
    colTit3: '低于折扣(%)',
    colTit4: '高于金额',
    colTit5: '审核用户',
    btn: '添加规则',
    other: '其他',
    add1: '添加订单折扣审核规则',
    add2: '添加退项目审核规则',
    add3: '添加退药物品审核规则',
    add4: '添加退预收款审核规则',
    add5: '添加审核规则',
    label1: '一级',
    label2: '二级',
    label3: '三级',
    label4: '四级',
    label5: '一级审核员',
    label6: '二级审核员',
    label7: '三级审核员',
    label8: '四级审核员',
    label9: '五级审核员',
    label10: '折扣<',
    label11: '金额<=',
    label12: '五级',
    placeholder: '请选择审核人员',
    valid: '请选择审核类型',
  },


  /**
   * 编辑权限
   */
  manager: {
    updateChannel: '修改来源',
    updateSymptom: '修改咨询项目',
    updateStore: '修改渠道',
    updateMobile: '修改联系方式',
    consultUpdate: '修改咨询',
    consultDelete: '删除咨询',
    failtureUpdate: '修改未成交',
    failtureDelete: '删除未成交',
    tagDelete: '删除标签',
    relationDelete: '删除关系',
    surveyUpdate: '修改问卷',
    surveyDelete: '删除问卷',
    medicalRecordUpdate: '修改病历',
    medicalRecordDelete: '删除病历',
    photoUpdate: '修改照片',
    photoDelete: '删除照片',
    appointmentUpdate: '修改咨询预约',
    appointmentDelete: '删除咨询预约',
    treatUpdate: '修改治疗预约',
    treatDelete: '删除治疗预约',
    surgeryUpdate: '修改手术预约',
    surgeryDelete: '删除手术预约',
    callbackTaskUpdate: '修改回访提醒',
    callbackTaskDelete: '删除回访提醒',
    callbackUpdate: '修改回访',
    callbackDelete: '删除回访',
    operationUpdate: '修改划扣',
    operationDelete: '删除划扣',
    operationStockOutDelete: '删除划扣发货',
    commissionDelete: '删除渠道佣金',
    blacklistDelete: '删除黑名单',
    stockDelete: '删除进出库单',
    updateEffectrRacking: '修改效果追踪',
    deleteEffectrRacking: '删除效果追踪',
    label1: '所有权限类型',
    label2: '权限类型',
    label3: '权限用户',
    valid1: '请选择权限类型',
    valid2: '请选择权限用户',
    msg: '确定删除此用户的{0}权限？',
    msg1: '所有权限类型：',
    modalTit: '添加权限用户',
  },


  /**
   * 医生预约
   */
  treatDoctor: {
    label1: '医生',
    label2: '预约时间',
    label3: '可预约人数',
    valid1: '请选择预约时间',
    valid2: '请选择医生',
    modalTit1: '添加预约设置',
    modalTit2: '修改预约设置',
    btn: '批量添加',
    tit: '批量添加设置',
    msg1: '确定删除此预约设置？',
    msg2: '确定删除此医生的所有预约设置？',
  },


  /**
   * 医生咨询
   */
  consultDoctor: {
    label1: '允许分诊',
    label2: '允许预约',
    label3: '关联排班',
    label4: '别名',
    label5: '是',
    label6: '否',
    modalTit1: '添加咨询医生设置',
    modalTit2: '修改咨询医生设置',
    msg1: '确定删除咨询医生设置？',
    msg2: '咨询医生信息：',
  },


  /**
   * 仪器管理页面
   */
  instrument: {
    label: '数量',
    modalTit1: '添加仪器管理',
    modalTit2: '修改仪器管理',
    msg1: '确定删除仪器管理？',
    msg2: '仪器管理信息：',
  },


  /**
   * 预约项目
   */
  appointmentCharge: {
    label1: '预约项目',
    label2: '默认时间(分钟)',
    label3: '仪器设备',
    label4: '项目名称',
    colTit: '项目编号',
    modalTit1: '添加预约项目',
    modalTit2: '修改预约项目',
    msg1: '确定删除预约项目？',
    msg2: '预约项目信息：',
    valid: '请选择预约项目',
  },
};