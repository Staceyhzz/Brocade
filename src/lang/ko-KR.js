import reportRecord from './modules/reportRecord_ko-KR';
import basicInfo from './modules/basicInfo_ko-KR';
import systemSet from './modules/systemSet_ko-KR';
import customerFile from './modules/customer_ko-KR';
import hospitalCN from './modules/hospital_ko-KR';
import publicStatic from './modules/public_static_ko-KR';
export default {
  /**
   * 公共字段
   */
  publicSet: {
    add: '추가',
    edit: '편집',
    del: '삭제',
    clean: '비어 있음',
    save: '저장',
    cancel: '취소',
    back: '돌아 가기',
    search: 'Query',
    reset: '재설정',
    print: '인쇄',
    set: '구성',
    check: '보기',
    exportData: '내보내기',
    tableAction: '작업',
    //弹窗提示
    noticeTit: '시스템 프롬프트',
    noticeSuccess: '작업이 성공적으로 완료되었습니다! ',
    noticeError: '작업이 실패했습니다! ',
    //状态字段
    newCus: '새로운 손님',
    oldCus: '오래된 승객',
    enable: '사용',
    disable: '사용 안함',
    ydz: '상담 받았다',
    wdz: '방문하지 않았습니다',
    ycj: '거래되었습니다',
    wcj: '끝나지 않았다',
    line: '오프라인 예약',
    onLine: '온라인 예약',
    man: '남자',
    woman: '여자',
    //表格分页
    pageMsg: '현재 페이지 {0}, 총 {1} 페이지, 총 {2} 개의 레코드',

    consult: '컨설팅 약속',
    treat: '치료 약속',
    surgery: '수술 약속',
  },


  /**
   * 公共仓库静态资源
   */
  ...publicStatic,


  /**
   * 公共label
   */
  labelPublic: {
    xh: '일련 번호',
    pxh: '주문 번호',
    zt: '상태',
    zh: '계정',
    mc: '이름',
    bh: '번호',
    lx: '유형',
    pym: '병음',
    gg: '사양',
    price: '가격',
    dw: '단위',
    xm: '이름',
    xb: '성별',
    gkxm: '고객의 이름',
    gkbh: '고객 번호',
    sjh: '휴대 전화 번호',
    hy: '회원',
    nl: '나이',
    ms: '설명',
    rq: '날짜',
    hkrq: '환금 날짜',
    tjrq: '제출 날짜',
    yyrq: '예약 날짜',
    yy: '병원',
    tjyy: '병원에 제출',
    yyyy: '임명 병원',
    bm: '부서',
    js: '역할',
    yh: '사용자',
    jzry: '직원 수락',
    kfry: '개발자',
    zxry: '카운슬러',
    syry: '계산원',
    kdry: '청구 담당관',
    tjry: '직원을 제출하십시오',
    mzlx: '외래 환자 유형',
    gklx: '고객 유형',
    cjzt: '폐쇄 상태',
    dzzt: '의사의 상태로',
    yxfl: '의도적 분류',
    xfyx: '소비자 의도',
    jtly: '특정 출처',
    jtqd: '특정 채널',
  },


  /**
   * 公共placeholder
   */
  placeholderPublic: {
    kfry: '개발자를 선택하십시오',
    jzry: '입학 직원을 선택하십시오.',
    kdry: '청구 담당자 선택',
    syry: '계산원을 선택하십시오.',
    tjry: '직원을 제출하도록 선택하십시오.',
    zxry: '컨설턴트를 선택하십시오',
    sfxm: '수수료 항목을 선택하십시오',
    filter: '빠른 검색',
    input: '입력하십시오',
  },


  /**
   * 公共表单验证
   */
  validPublic: {
    name: '이름을 입력하십시오.',
    remark: '설명을 입력하십시오',
    number: '번호를 입력하십시오.',
    pinyin1: '병음 입력',
    pinyin2: '소문자, 숫자를 입력하십시오.',
  },


  /**
   * 主结构左侧导航栏
   */
  layoutNav: {
    //桌面
    desk: '데스크톱',
    //报表中心
    report: '보고서 센터',
    reportManage: '보고서 데이터',
    reportRecord: '새 보고서 데이터',
    channelGroupManage: '고객 소스 분류',
    //基础信息
    info: '기본 정보',
    channelManage: '소스 관리',
    symptomManage: '증상 관리',
    callbackCategoryManage: '반환 유형 관리',
    callbackSetManage: '그룹 관리 호출',
    failtureCategoryManage: '열지 않은 유형 관리',
    complainCategoryManage: '불만 유형 관리',
    tagManage: '태그 관리',
    tagGroupManage: '태그 그룹 관리',
    unitManage: '단위 관리',
    cardCategoryManage: '결제 수단 관리',
    toolManage: '공구 관리',
    relationManage: '관계 관리',
    surveyManage: '설문지 템플릿 관리',
    medicalRecordManage: '병력 템플릿 관리',
    positionTemplate: '템플릿 관리 추적',
    caseManagement: '병례 관리',
    caseManagementGroup: '병례 유형 관리',
    caseManagementRecord: '병례 기록 관리',
    positionManage: '부서 관리 후 관리',
    //系统设置
    setting : '시스템 설정',
    hospitalManage : '병원 관리',
    deptManage : '부서 관리',
    userManage : '사용자 관리',
    userAuthCustomManage : '사용자 권한 맞춤 설정',
    roleManage : '역할 관리',
    optionManage : '시스템 설정',
    logManage : '시스템 로그',
    setBooksManage : '계정 관리자',
    depositChargeManage : '선결제 항목',
    couponCategoryManage : '바우처 유형',
    chargeCategoryManage : '청구 항목 유형',
    chargeManage : '청구 항목',
    chargeSetManage : '패키지',
    productCategoryManage : '의약품 유형',
    productQualityManage : '약물 속성',
    productManage : '마약',
    equityManage : '지분 관리',
    memberCategoryManage : '회원 유형 관리',
    chargeDiscountManage : '품목 할인',
    userDiscountManage : '사용자 할인',
    printManage : '인쇄 설정',
    auditRuleManage : '감사 규칙 설정',
    managerManage : '권한 수정',
    treatDoctorManage : '의사 약속',
    consultDoctorManage : '의사의 상담 설정',
    InstrumentManage : '장비 장비 관리',
    appointmentChargeManage : '약속 항목 설정',
    //客户管理
    customer: '고객 관리',
    customerManage: '고객 관리',
    complainManage: '불만 기록',
    ownershipManage: '고객 소유권 교체',
    birthdayRemind: '생일 알림', 
    //顾客运营
    customerSetting: '고객 작업',
    customerRFM: '고객 운영', 
    sliderRFM: 'RFM 표시기 설정',
    dealBusiness: '비즈니스 지표 설정',
    customerGroupManage: '고객 그룹 관리',
    customerFilterManage: '고객 선택자',
    //医院设置
    hospital: '병원 사업',
    onlineDesk: '네트워크 작업대',
    callbackDesk: '워크 벤치로 돌아 가기',
    receptionFront: '리셉션 데스크',
    liveDesk: '리셉션 워크 벤치',
    customerDirection: '오늘의 고객 역학',
    chargePriceList: '가격 설명서',
    cashierDesk: '현금 등록기',
    deptDesk: '부서 센터',
    deptBorrow: '작업대 빌려줬',
    bedManage: '침대 관리',
    InpatientDesk: '입원 환자 작업대',
    smsTemplate: 'SMS 템플릿',
    smsGroup: 'SMS 그룹',
    surgeryDeskManage: '수술 워크 벤치',
    appointmentToday: '약속 워크 벤치',
    activityManage: '활동 설정',
    //市场渠道
    market: '시장 채널',
    storeCategoryManage: '브랜드 관리',
    storeManage: '채널 관리자 관리',
    storeManagerManage: '채널 비즈니스 책임자',
    commissionDesk: '커미션 확인',
    commissionCashier: '커미션 지불',
    marketDesk: '시장 작업대',
    couponActivity: '바우처 활동',
    //库存管理
    stock: '재고 관리',
    warehouseManage: '창고 관리',
    supplierManage: '공급 업체',
    purchaseManage: '입장 관리',
    stockOutManage: '아웃 바운드 관리',
    invoiceManage: '구매 청구서',
    returnManage: '반품',
    allocateManage: '창고 이전',
    checkManage: '재고 계산',
    useManage: '부서 사용',
    stockManage: '주가 질의',
    deptStockOutDesk: '부서 파견',
    expirationManage: '인벤토리 유효성 경고',
    //日程办工
    office: '사무실',
    addressBook: '주소록',
    shiftCategoryManage: '시프트 관리',
    myShift: 'Shift 항목',
    shiftManage: '집 전체 일정',
    noticeManage: '공지 사항 게시',
    knowledgeCategoryManage: '지식 분류 관리',
    knowledgeManage: '지식 관리',
    knowledgeQuery: '지식베이스',
    auditOrder: '내 감사 요청',
    auditOrderDesk: '감사 워크 벤치',
    //微信
    wechat: 'WeChat',
    opentheguideManage: '개시 분별 판매',
    putforwardManage: '현금으로 신청하다.',
    promoterManage: '추천 사람 관리',
    promoteCustomerManage: '추천 고객 목록',
    promoteRecord: '권장 수수료 기록',
    promoteRebate: '위원회 결제 기록',
    verifyMessageManage: '인증 코드',
    //呼叫中心
    callCenter: '콜센터',
    callSettingManage: '관리자 관리',
    callRecordManage: '통화 기록',
    //渠道分销
    canalsDistribution: '채널 분류',
    distributionBasic: '채널 설치 설정',
    distributor: '경로 판매 관리',
    distributorRegister: '심사 관리 심사 관리.',
    distributorRecord: '기록 목록',
    distributorLevelRecord: '루트 레코드',
    distributorCashRecord: '현금 인출 신청',
    distributorHelp: '마이크로 신뢰',
  },


  /**
   * 客户档案tabs
   */
  cusMenuTabs: {
    customerMsg: '고객 프로필',
    indexOrderDetail: '소비자 항목',
    indexConsult: '상담',
    indexAppointment: '약속',
    indexVisit: '가정 상황',
    indexFailture: '거래 없음',
    indexOrder: '주문 상태',
    indexEffectrRackingtext: '효과 추적',
    indexPhoto: '사진 관리',
    indexOperation: '등록 레코드',
    indexCallback: '반환 상황',
    indexSurvey: '설문지 상황',
    indexMedicalRecord: '의료 기록',
    indexCaseRecord: '병력 관리',
    indexAccount: '계정 상태',
    indexMember: '회원',
    indexManager: '담당 사용자',
    indexRelation: '클라이언트 간 관계',
    indexComplain: '이의 제기 피드백',
    indexCost: '소모품 비용',
    indexSms: 'SMS 레코드',
    indexAudit: '리뷰 신청서',
    indexStore: '채널',
    indexPromoter: 'WeChat Distribution',
  },


  /**
   * 客户档案操作导航
   */
  cusNavList: {
    other: '기타',
    channel: '채널',
    member: '회원',
    admin: '관리',
    medical: '의료',
    service: '서비스',
    finance: '금융',
    common: '공통 기능',
    barCode: '2 차원 코드',
    customerCommission: '채널 커미션 추가',
    customerMember: '회원 추가',
    customerAddEquity: '주식 추가',
    customerDeleteEquity: '지분 삭제',
    customerAddPoint: '선물 포인트',
    customerRebatePoint: '공제 포인트',
    customerPointCoupon: '포인트 바우처',
    customerAddCoupon: '선물 쿠폰',
    customerAvatar: '아바타 추가',
    customerGroup: '고객 그룹 관리',
    customerTag: '태그 관리',
    customerRelation: '관계 관리',
    customerOrderDetailManager: '의사 변경',
    customerExploitChange: '개발자 변경',
    customerManagerChange: '컨설턴트 변경',
    customerBlacklist: '블랙리스트 추가',
    customerConsult: '조언 추가',
    customerCallback: '돌아 오는 방문 추가',
    customerCallbackTask: '돌아 오는 알림 추가',
    callbackSet: '돌아 오는 방문 계획 추가',
    customerSurvey: '설문지 추가',
    customerMedicalRecord: '의료 기록 추가',
    caseManagementCase: '병력 추가 (새)',
    customerOperation: '청소',
    customerDebtOperation: '차변 기입',
    customerEffectrRackingtext: '효과 추가 추적',
    customerPhoto: '사진 추가',
    customerAppointment: '상담 약속 추가',
    customerTreat: '치료 약속 추가',
    customerSurgery: '수술 약속 추가',
    customerRebateCoupon: '환불',
    customerBack: '인출 주문 추가',
    customerDepositRebate: '현금을 제출하다',
    customerReparations: '환급 목록 추가',
    customerComplain: '불만 사항 추가',
    customerDeposit: '선결제 주문 추가',
    customerOrder: '프로젝트 주문 추가',
    customerFailture: '거래 추가',
    customerActiveCoupon: '활성화 티켓',
    customerTransfer: '전송',
  },
  

  /**
   * 用户操作权限
   */
  userPermissions: {
    acceptAppointment: '예약 가능',
    acceptAppointmentRemark: '수술 중에 약속에 참여한 의사',
    acceptShift: '가입 이동',
    acceptShiftRemark: '참여 전환',
    isDoctor: '의사 야.',
    isDoctorRemark: '주문을 추가 할 때 프로젝트가 선택한 의사',
    isMedical: '의료진',
    isMedicalRemark: '공제시 선택 사항',
    viewContact: '연락처 세부 정보를 볼 수 있습니다',
    viewContactRemark: '고객의 연락처를 볼 수 있습니다',
    allowExport: '데이터를 내보낼 수 있습니다',
    allowExportRemark: '데이터 내보내기 권한',
    barCode: '2 차원 코드 추가',
    barCodeRemark: '고객 프로필에 QR 코드를 추가 할 수 있습니다.',
    customerConsult: '조언 추가',
    customerConsultRemark: '고객 프로필에 상담을 추가 할 수 있습니다.',
    customerCallback: '돌아 오는 방문 추가',
    customerCallbackRemark: '고객 프로필에 다시 방문 할 수 있습니다.',
    customerCallbackTask: '돌아 오는 알림 추가',
    customerCallbackTaskRemark: '고객 프로필에 미리 알림을 추가 할 수 있습니다.',
    callbackSet: '돌아 오는 방문 계획 추가',
    callbackSetRemark: '고객 프로필에 방문 계획을 추가 할 수 있습니다.',
    customerAppointment: '상담 약속 추가',
    customerAppointmentRemark: '상담 약속을 추가 할 수 있습니다',
    customerTreat: '치료 약속 추가',
    customerTreatRemark: '치료 약속을 추가 할 수 있습니다',
    customerSurgery: '수술 약속 추가',
    customerSurgeryRemark: '수술 약속을 추가 할 수 있습니다.',
    customerDeposit: '선결제 주문 추가',
    customerDepositRemark: '선불 주문을 고객 프로필에 추가 할 수 있습니다.',
    customerOrder: '프로젝트 주문 추가',
    customerOrderRemark: '고객 프로파일에 프로젝트 주문을 추가 할 수 있습니다',
    customerBack: '인출 주문 추가  ',
    customerBackRemark: '고객 프로필에 철수 주문을 추가 할 수 있습니다',
    customerDepositRebate: '환불 양식 추가',
    customerDepositRebateRemark: '고객 프로필에 환불 양식을 추가 할 수 있습니다.',
    customerReparations: '환급 목록 추가',
    customerReparationsRemark: '고객 프로필에 환급 전표를 추가 할 수 있습니다.',
    customerSurvey: '설문지 추가',
    customerSurveyRemark: '고객 프로필에 설문지를 추가 할 수 있습니다.',
    customerMedicalRecord: '의료 기록 추가',
    customerMedicalRecordRemark: '귀하의 고객 프로필에 의료 기록을 추가 할 수 있습니다',
    caseManagementCase: '병력 추가 (새)',
    caseManagementCaseRemark: '귀하의 고객 프로필에 의료 기록을 추가 할 수 있습니다',
    customerGroup: '고객 그룹 관리',
    customerGroupRemark: '고객 프로필에서 고객 그룹을 관리 할 수 ​​있습니다',
    customerTag: '태그 관리',
    customerTagRemark: '고객 프로필 관리 탭에있을 수 있음',
    customerRelation: '관계 관리',
    customerRelationRemark: '고객 파일의 관계를 관리 할 수 ​​있습니다',
    customerFailture: '거래 추가',
    customerFailtureRemark: '당신은 제외되지 않은 고객의 프로필을 추가 ​​할 수 있습니다',
    customerAvatar: '아바타 추가',
    customerAvatarRemark: '고객 프로필에 아바타를 설정할 수 있습니다.',
    customerEffectrRackingtext: '효과 추가 추적',
    customerEffectrRackingtextRemark: '고객의 파일에서 효과적으로 추적할 수 있다.',
    customerPhoto: '사진 추가',
    customerPhotoRemark: '고객 프로필에 사진을 추가 할 수 있습니다',
    customerComplain: '불만 사항 추가',
    customerComplainRemark: '고객 프로필에 불만 사항을 추가 할 수 있습니다.',
    customerBlacklist: '블랙리스트 추가',
    customerBlacklistRemark: '고객 프로필에 블랙리스트를 추가 할 수 있습니다.',
    customerExploitChange: '개발자 변경 사항 추가',
    customerExploitChangeRemark: '고객 프로필에 개발자 변경 사항을 추가 할 수 있습니다.',
    customerManagerChange: '컨설턴트에게 변경 사항 추가',
    customerManagerChangeRemark: '고객 프로필에 변경 사항을 추가 할 수 있습니다.',
    customerAddPoint: '선물 포인트',
    customerAddPointRemark: '선물 포인트',
    customerRebatePoint: '공제 포인트',
    customerRebatePointRemark: '포인트 공제',
    customerPointCoupon: '포인트 바우처',
    customerPointCouponRemark: '인보이스 바우처',
    customerMember: '회원 추가',
    customerMemberRemark: '회원 추가',
    customerAddEquity: '주식 추가',
    customerAddEquityRemark: '주식 추가',
    customerDeleteEquity: '지분 삭제',
    customerDeleteEquityRemark: '지분 삭제',
    customerAddCoupon: '선물 쿠폰',
    customerAddCouponRemark: '선물 쿠폰',
    customerRebateCoupon: '환불',
    customerRebateCouponRemark: '환불',
    customerOrderDetailManager: '의사 변경 ',
    customerOrderDetailManagerRemark: '의사 변경 ',
    customerCommission: '채널 커미션 추가',
    customerCommissionRemark: '채널 커미션 추가',
    customerOperation: '청소',
    customerOperationRemark: '스윕 버튼',
    customerTransfer: '전송',
    customerTransferRemark: '전송',
    customerActiveCoupon: '활성화 티켓',
    customerActiveCouponRemark: '활성화 티켓',
    customerDebtOperation: '차변 기입',
    customerDebtOperationRemark: '직불 결제',
    customerSms: 'SMS 전송 허용',
    customerSmsRemark: 'SMS 전송 허용',
  },


  /**
   * 非导航其他页面路由
   */
  otherRouter: {
    about: '회사 소개',
    modifyPassword: '개인 설정',
    inbox: '메시지 센터',
  },


  /**
   * 常用菜单选择组件
   * 引用组件： 桌面首页
   */
  menuTagChoose: {
    tit: '메뉴 선택 기능',
  },


  /**
   * 报表权限搜索组件
   */
  reportPowerSearch: {
    kh: '고객',
    title: '맞춤 검색 용어',
  },


  /**
   * 标签选择组件
   */
  customerTagChoose: {
    tit: '라벨 선택',
    label: '선택된 탭 :',
    placeholder: '태그 이름을 입력하십시오.',
  },


  /**
   * 登录页面
   */
  login: {
    msg: '통합되고 효율적이며 상호 연결되고 정보를 공유하는 체계적인 디지털 병원 관리 플랫폼을 만드는 데 주력했습니다.',
    login: '로그인',
    label1: '회사 번호 입력',
    label2: '계정 입력',
    label3: '비밀번호 입력',
    valid1: '회사 번호는 비워 둘 수 없습니다!',
    valid2: '계정은 비워 둘 수 없습니다!',
    valid3: '비밀번호는 비워 둘 수 없습니다! ',
  },


  /**
   * 桌面首页
   */
  desktop: {
    mainTit: '사용자 홈페이지',
    itemTit1: '공통 함수',
    itemTit2: '일반 정보',
    itemTit3: '오늘의 약속',
    itemTit4: '반환 임무',
    week: '주',
    month: '월',
    //接诊概况
    mesTit1: '거래 금액',
    mesTit2: '성교 가 다른 사람 이다',
    mesTit3: '주소록',
    mesTit4: '거래율',
    menuOther1: '환비',
    //今日预约
    colTit1: '고객 (번호)',
    colTit2: '시간',
    colTit3: '약속 유형',
    colTit4: '프로젝트',
    colTit5: '약속 설명',
    colTit6: '예약 인',
    //回访任务
    mesTit5: '작업 수',
    mesTit6: '완료',
    mesTit7: '완료율',
    menuTit1: '작업 굽기 맵',
    msg1: "번 아웃 맵 : 시간 경과에 따른 워크로드 감소의 나머지를 보여주는 그래프이며, 그래프는 잔여 작업 완료와 함께 하향 곡선입니다.'제로로 굽습니다'.",
    msg2: "데이터 정의 :",
    msg3: "계획 곡선 (곡선은 실제로 직선 임) : 후속 작업 포함",
    msg4: "시간 알림",
    msg5: "이번 주에 상기 된 총 작업 수를 계산할 준비를하십시오.",
    msg6: "실제 커브 (계획 커브를 위아래로 플로팅) : 다시 방문 작업을 완료하는 중",
    msg7: "제출 날짜",
    msg8: "정확함, 숫자 = 예약 된 작업의 총 수 - 완료된 작업의 총 수",
    msg9: "완료율 : 직원의 후속 계획 완료를 나타내는 커브",
    msg10: "완료율 곡선 : 후속 작업",
    msg11: "정밀, 숫자 = 완료된 작업의 총 수 / 예약 된 작업의 총 수입니다.",
    msg12: "참고 : 직원이 일정보다 빨리 다음 날을 끝내거나 어제의 계획 완료를 연기하면 완료율과 번쩍 거리기 숫자가 일치하지 않습니다. 예 :",
    msg13: "직원, 매일 작업 (10)는, 직원에 완료,이 완전한 제 2도 완전 연소의 수 (5 태스크 2) 1 ~ 15 : 1 : 15, 2 번호 : 2 : 완료율, 1 : 100 %, 2 : 70 % [(5 + 2) / 10]. ",
  },


  /**
   * 个人设置首页
   */ 
  modifyPassword: {
    tit1: '시스템 언어 설정',
    tit2: '비밀번호 변경',
    tit3: '비즈니스 데이터 동기화 기능',
    msg1: '시스템 언어를 선택하십시오.',
    msg2: '개인 로그인 암호 수정',
    msg3: '백도 AI 기반을 기반으로, 지불할 수 있습니다.',
    label1: '이전 암호',
    label2: '새 비밀번호',
    label3: '비밀번호 확인',
    valid1: '비밀번호를 입력하십시오',
    valid2: '비밀번호를 다시 입력하십시오.',
    valid3: '암호를 두 번 입력하지 않았습니다.',
    valid4: '이전 암호를 입력하십시오',
  },


  /**
   * 打印预览
   */
  printView: {
    tit: '인쇄 미리보기',
    btn: '인쇄',
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
   * 医院业务模块
   */   
  ...hospitalCN,
};