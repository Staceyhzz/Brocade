export default {
  /**
   * 医院管理
   */  
  hospital: {
    colTit1: '성명',
    colTit2: '도시',
    colTit3: '주소',
    modalTit: '병원 수정',
    valid1: '성명을 입력하십시오',
    valid2: '도시를 선택하십시오',
  },


  /**
   * 部门管理
   */
  dept: {
    label: '개방 상태',
    open: '열기',
    noOpen: '열지 않음',
    modalTit1: '부서 추가',
    modalTit2: '부서 수정',
    msg1: '부서를 삭제 하시겠습니까?',
    msg2: '부서 정보',
  }, 


  /**
   * 用户管理
   */
  user: {
    btn1: '사용자 유형을 일괄 적으로 설정',
    btn2: '권한보기',
    btn3: '클라이언트 권한 설정',
    btn4: '방문 권한 설정',
    label1: '이름',
    label2: '비밀번호',
    label4: '전화 번호',
    label5: '모바일',
    valid1: '정보를 선택하십시오',
    valid2: '정보를 입력하십시오.',
    colTit: '숫자',
    modalTit1: '사용자 추가',
    modalTit2: '사용자 수정',
    msg1: '사용자를 삭제 하시겠습니까?',
    msg2: '사용자 정보 :',
  },
  /**
   * 批量设置角色
   */
  userSetting: {
    label: '사용자 목록',
    valid1: '문자를 선택하십시오',
    valid2: '사용자를 선택하십시오.',
  },
  /**
   * 设置用户权限
   */
  userPower: {
    msg1: '병원 선택',
    msg2: '부서 선택',
    msg3: '사용자 선택',
  },
  /**
   * 查看用户权限
   */
  userCheck: {
    menuTit1: '시스템 메뉴',
    menuTit2: '고객 프로필',
    menuTit3: '운영 권한',
    menuTit4: '보고서 권한',
    menuTit5: '리뷰 가격',
    colTit1: '메뉴 이름',
    colTit2: '메뉴 모듈',
    colTit3: '보고서 카테고리',
    colTit4: '권한 설정',
    power1: '허가 없음',
    power2: '그룹',
    power3: '병원',
    power4: '개인',
    msg1: '수신 가격보기 권한 :',
    msg2: '가격 숨겨진 항목 :',
    price1: '부분적으로 숨김',
    price2: '모두 숨김',
    price3: '모두 표시',
  },


  /**
   * 用户权限自定义
   */
  userAuthCustom: {
    modalTit: '사용자 비밀번호 재설정',
    label1: '새 비밀번호',
    label2: '비밀번호 확인',
    valid1: '비밀번호를 입력하십시오',
    valid2: '암호 길이가 8보다 작지 않습니다',
    valid3: '암호를 다시 입력하십시오.',
    valid4: '암호가 두 번 입력되지 않았습니다.',
    colTit1: '전화 번호',
    colTit2: '모바일',
    btn: '비밀번호 재설정',
  },
  /**
   * 用户权限自定义设置
   */
  userAuthCustomSet: {
    menuTit: '바인딩 역할',
    btn: '역할 바인딩 제거',
    valid: '문자를 선택하십시오',
    msg1: '바운드 역할 :',
    msg2: '역할 바인딩을 제거 하시겠습니까?',
    msg3: '시스템 메뉴 설정',
    msg4: '작업 사용 권한 설정',
    msg5: '고객 프로필 설정',
    msg6: '구매보기 설정',
  },
  /**
   * 设置进价查看
   */
  userUpdatePriceMenu: {
    tit1: '리뷰 가격',
    tit2: '가격 숨겨진 항목',
    msg: '숨겨진 가격 항목, 항목의 구매 가격이 0 원으로 표시됩니다',
    btn: '상품',
    modalTit: '항목 선택',
    label: 'ID / 이름 / 병음 코드',
    placeholder: '유형을 선택하십시오.',
  },


  /**
   * 角色管理
   */
  role: {
    modalTit1: '역할 추가',
    modalTit2: '역할 수정',
    msg1: '역할을 삭제 하시겠습니까?',
    msg2: '역할 정보',
  },


  /**
   * 系统设置
   */
  option: {
    open: '열기',
    close: '닫기',
    valid1: '시간 범위 오류',
    valid2: '수수료 항목을 선택하십시오',
    modalTit1: '설정 수정',
    tit1: '고객 맞춤 입력란',
    label1: '사용자 정의 {0}',
    tit2: '기본 컨설팅 템플릿',
    tit3: '치료 약속 설정',
    label3_1: '예약 시간 :',
    label3_2: '간격 (분) :',
    label3_3: '최대 예약 시간 (분) :',
    label3_4: '최소 약속 시간 (분) :',
    tit4: '수술 약속 설정',
    tit5: '약속 설정 문의',
    tit6: '미납금 허용',
    label6_1: '예',
    label6_2: '아니요',
    tit7: '적분 비율',
    label7: '포인트를 얻기 위해 1 위안 소비',
    tit8: '개인 정보 보호',
    label8_1: '번호 숨기기',
    label8_2: '모두 숨김',
    label8_3: '부분적으로 숨김',
    tit9: '등록',
    label9_1: '등록 상태 :',
    label9_2: '등록 된 청구 항목',
    tit10: '추천인 등록',
    label10_1: '추천서 등록 :',
    label10_2: '비 등록 고객 등록 :',
    tit11: '추천 사용자가 쿠폰을 보냅니다.',
    label11_1: '추천 사용자의 쿠폰 :',
    label11_2: '바우처 :',
    label11_3: '바우처 금액 :',
    placeholder11: '바우처를 선택하십시오',
    colTit11: '병원 이용 가능',
    tit12: '권장 시간 제한',
    label12: '일',
    tit13: '포인트 할인은 적지 않습니다',
    label13: '할인',
    tit14: '커미션 설정 충족',
    label14_1: '평가 수수료 설정 :',
    label14_2: '수준',
    label14_3: '요금',
    tit15: '포인트 레이즈',
    label15_1: '수준',
    label15_2: '선택 (%)',
    modalTit15: '레벨 레이즈 추가',
    tit16: '최대 레벨 극복하기',
    label16: '수수료 비율',
    tit17: 'SMS 서비스',
    label17_1: '서버 :',
    label17_2: '계정 :',
    label17_3: '비밀번호 :',
  },


  /**
   * 系统日志
   */
  log: {
    label1: '작업 날짜',
    label2: '작업 유형',
    label3: '소유 병원',
    colTit1: '운영 IP',
    colTit2: '작업 클라이언트',
  },


  /**
   * 账套管理
   */
  setBooks: {
    msg: '데이터 보안을 위해서는 먼저 액세스 암호를 설정해야합니다. ',
    label1: '비밀번호 액세스',
    label2: '비밀번호 확인',
    valid1: '비밀번호를 입력하십시오',
    valid2: '6 자리 암호를 입력하십시오.',
    valid3: '암호를 다시 입력하십시오.',
    valid4: '일치하지 않는 암호 입력 두 번',
  },
  /**
   * 账套列表
   */
  setBooksIndex: {
    modalTit : '계정 정보보기',
    use: '사용 중',
    unUse: '사용하지 않음',
    success: '연결 정상입니다',
    error: '연결 오류',
    btn: '사용',
    label1: '데이터베이스',
    label2: '데이터베이스 유형',
    label3: '데이터베이스 연결 주소',
    label4: '사용 현황',
    label5: '네트워크 상태',
    label6: '사용자 이름',
    label7: '비밀번호',
    label8: '시간 생성',
    msg1: '책 세트 추가',
    msg2: '이 책 세트를 삭제하십시오.',
    msg3: '계정 설정 정보 :', 
    msg4: '경고 : A / C 세트를 전환하면 모든 사용자가 Kam Healthcare 시스템에서 강제로 퇴직하고 성공 후 다시 로그인해야합니다. 중요한 비즈니스가 사용되지 않도록하십시오! ',
    msg5: '사용량을 전환합니까? ',
    msg6: '작업이 성공적으로 완료되었습니다! 2 초 후에 방문 페이지로 돌아갑니다! ',
  },
  /**
   * 添加帐套
   */
  setBooksIndexAdd: {
    label1: '계정 이름',
    label2: '호스트 이름 / IP 주소',
    label3: '데이터베이스 포트 번호',
    label4: '데이터베이스 이름',
    valid: '정보를 입력하십시오',
    msg1: '성공 추가',
    msg2: '테스트가 성공했습니다.',
    msg3: '네트워크 연결을 확인하십시오.',
    btn: '테스트',
  },


  /**
   * 预收款项目
   */
  depositCharge: {
    modalTit1: '선결제 항목 추가',
    modalTit2: '사전 수령 품목 수정',
    msg1: '선불 상품을 반드시 지우시겠습니까?',
    msg2: '선주문 정보 :',
    colTit1: '병원 이용 가능',
    colTit2: '사용 범위',
    tit1: '항목 카테고리 지정 :',
    tit2: '항목 지정 :',
    tit3: '무제한',
  },
  /**
   * 编辑预收款项目
   */
  depositChargeEdit: {
    msg1: '병원 선택, 다중 선택',
    label1: '상품권',
    label2: '설정',
    label3: '바우처 유형',
    label4: '바우처 금액',
    placeHolder1: '쿠폰 유형을 선택하십시오.',
    placeHolder2: '항목 유형 선택',
    valid1: '이름을 입력하십시오',
    valid2: '가격을 입력하십시오',
    valid3: '병원을 선택하십시오',
  },


  /**
   * 代金券类型
   */
  couponCategory: {
    modalTit1: '바우처 유형 추가',
    modalTit2: '바우처 유형 수정',
    msg1: '바우처 유형을 삭제 하시겠습니까? ',
    msg2: '바우처 유형 정보 :',
    valid1: '시간을 입력하십시오',
    label1: '사용 제한 시간',
    label2: '지정된 날짜 이전',
    label3: '발효 후 N 일',
  },


  /**
   * 收费项目类型
   */
  chargeCategory: {
    modalTit1: '청구 항목 유형 추가',
    modalTit2: '요금 항목 유형 수정',
    msg1: '청구 항목 유형을 삭제 하시겠습니까?',
    msg2: '청구 항목 유형 정보 :',
    label: '우수',
    modalTit: '항목 유형 선택',
    placeHolder: '우수를 선택하십시오',
  },


  /**
   * 收费项目
   */
  charge: {
    btn: '소모품 설정',
    modalTit1: '청구 항목 추가',
    modalTit2: '청구액 수정',
    modalTit3: '청구 항목 유형을 선택하십시오',
    modalTit4: '소모품 설정 수정',
    msg1: '요금 항목을 삭제 하시겠습니까?',
    msg2: '유료 프로젝트 정보 :',
    msg3: '이 품목은 소매 품목이고, 마약 제품 편집자에게 간다',
    colTit1: '인쇄 이름',
    colTit2: '코드',
    label1: '판매 됨',
    label2: '판매 중지',
  },
  /**
   * 编辑收费项目
   */
  chargeEdit: {
    tit1: '기본 정보',
    tit2: '가격 설정',
    label1: '담당 의사',
    label2: '필요',
    label3: '필요 없음',
    label4: '판매 모델',
    label5: '판매 가격',
    label6: '판매 됨',
    label7: '판매 중지',
    label8: '조직 이름',
    label9: '판매 상태',
    label10: '가격 세부 정보',
    btn1: '통합 가격 책정',
    btn2: '지역 가격 책정',
    valid1: '작성한 후에는 수정할 수 없습니다. ',
    valid2: '병음 입력',
    valid3: '소문자, 숫자를 입력하십시오',
    valid4: '장치를 선택하십시오',
  },
  /**
   * 修改项目耗材
   */
  chargeMedicinalSet: {
    tit: '의약품 추가',
    btn: '선택',
    label1: '기본 번호',
    label2: '최대 수량',
    label3: '추가 소모품 추가',
    label4: '허용',
    label5: '허용되지 않음',
    placeHolder: '약물 유형 선택',
    msg: '최대 수가 제한되지 않으면 0을 채우십시오.',
  },


  /**
   * 套餐管理
   */
  chargeSet: {
    modalTit1: '패키지 추가',
    modalTit2: '패키지 수정',
    modalTit3: '패키지 유형 선택',
    msg1: '패키지를 삭제 하시겠습니까? ',
    msg2: '패키지 정보 :',
    label: '패키지 유형',
  },
  /**
   * 套餐编辑
   */
  chargeSetEdit: {
    label1: '시간 제한',
    label2: '일',
    label3: '시작 시간',
    label4: '구매에서 계산',
    label5: '처음부터 계산',
    label6: '상세',
    label7: '프로젝트',
    label8: '수량',
    modalTit: '패키지 항목을 선택하십시오',
    valid1: '이 청구 항목이 추가되었습니다',
    valid2: '패키지 항목을 선택하십시오.',
  },


  /**
   * 药物品类型
   */
  productCategory: {
    modalTit1: '의약품 제품 유형 추가',
    modalTit2: '약물 유형 수정',
    modalTit3: '약물 유형 선택',
    msg1: '마약 종류를 삭제 하시겠습니까?',
    msg2: '의약품 제품 유형 정보 :',
  },
  /**
   * 药物品属性
   */
  productQuality: {
    tit1: '상품 | 기본 속성 구성',
    tit2: '상품 | 맞춤 속성 구성',
    modalTit: '사용자 정의 속성 수정',
    label1: '별칭',
  },
  /**
   * 药物品
   */
  product: {
    label1: 'ID/이름/병음 코드',
    label2: '판매 됨',
    label3: '판매 중지',
    colTit1: '별칭',
    colTit2: '영어 이름',
    colTit3: '공통 이름',
    colTit4: '브랜드',
    colTit5: '한약 정확한 단어',
    colTit6: '가격',
    colTit7: '코드',
    modalTit1: '의약품 추가',
    modalTit2: '의약품 수정',
    modalTit3: '유형을 선택하십시오',
    msg1: '의약품을 삭제 하시겠습니까? ',
    msg2: '의약품 정보 :',
  },
  /**
   * 药物品编辑
   */
  productEdit: {
    tit1: '기본 정보',
    tit2: '가격 설정',
    tit3: '단위 설정',
    msg1: '참고 : 분기가 저장되면 수정할 수 없습니다.',
    msg2: '참고 : 지점을 수정할 수 없습니다. 수정하려면 그룹으로 이동하십시오.',
    label1: '비용 가격',
    label2: '처방전 인쇄',
    label3: 'RX (예)',
    label4: 'OTC (아니오)',
    label5: '영업 유형',
    label6: '소매점',
    label7: '비 소매상',
    label8: '소매 모델',
    label9: '통합 가격',
    label10: '지역 가격 책정',
    label11: '소매가',
    label12: '권장 소매 가격',
    label13: '소매 유형',
    label14: '가격 세부 정보',
    colTit1 : '조직 이름',
    colTit2 : '소매 상태',
    colTit3 : '소매 창고',
    colTit4 : '단위 관계',
    colTit5 : '전환 관계',
    unit1: '기본 단위',
    unit2: '보조 장치',
    valid1: '작성한 후에는 수정할 수 없습니다. ',
    valid2: '소매점 유형을 선택하십시오.',
    valid3: '기본 단위를 선택하십시오',
    valid4: '소매 창고를 선택하십시오',
  },


  /**
   * 权益管理
   */
  equity: {
    tit1: '할인 카테고리',
    tit2: '사용자 지정 권한',
    colTit1: '할인 (%)',
    colTit2: '내용',
    label: '할인 (0-100)',
    modalTit1 : '할인 클래스 자산 추가',
    modalTit2 : '할인 클래스 자산 수정',
    modalTit3 : '사용자 정의 혜택 추가',
    modalTit4 : '맞춤 수익 수정',
    msg1: '자본을 삭제해야합니까?',
    msg2: '주식 정보 :',
  },


  /**
   * 会员类型管理
   */
  memberCategory: {
    btn1: '회원 재설정',
    btn2: '아이콘 수정',
    btn3: '기본 아이콘',
    btn4: '금액 수정',
    btn5: '구성 공평',
    colTit1: '수준',
    colTit2: '아이콘',
    colTit3: '금액 한도',
    colTit4: '혜택 목록',
    msg1: '기본 아이콘을 복원 하시겠습니까?',
    msg2: '회원 정보를 재설정 하시겠습니까?',
    modalTit: '회원 정보 수정',
    valid: '금액을 입력하십시오.',
  },
  /**
   * 修改会员图标
   */
  updateImage: {
    label: '아이콘 선택',
    modalTit: '그림보기',
    valid: '사진을 선택하십시오',
    msg1: '아바타 크기는 10M를 초과 할 수 없습니다!',
    msg2: 'gif, jpg, jpeg, bmp, png 이미지를 선택하십시오! ',
  },
  /**
   * 修改会员权益
   */
  memberCategoryQuitys: {
    label: '혜택 목록',
    modalTit: '권리를 선택하십시오',
    colTit: '내용',
  },


  /**
   * 项目折扣
   */
  chargeDiscount: {
    label1: '청구 항목',
    label2: '할인 (%)',
    modalTit1: '품목 할인 추가',
    modalTit2: '상품 할인 수정',
    msg1: '항목 할인을 삭제 하시겠습니까?',
    msg2: '상품 할인 정보 :',
  },


  /**
   * 用户折扣
   */
  userDiscount: {
    label: '사용자',
    modalTit1: '사용자 할인 추가',
    modalTit2: '사용자 할인 수정',
    msg1: '사용자 할인을 삭제 하시겠습니까? ',
    msg2: '사용자 할인 정보 :',
    valid: '사용자를 선택하십시오.',
  },


  /**
   * 打印设置
   */
  print: {
    orderName: '프로젝트 주문',
    orderRemark: '매개 변수 표 세부 사항 :$Table  테이블 세부 사항 (할인 표시되지 않습니다) : $ SimpleTable 고객 번호 : $ CustomerID를 고객 이름 : $ CUSTOMERNAME 단일 현금 등록 번호 : $ 없음 현금 등록 날짜 : $의 CreateDate 현금 등록 시간 : $ CreateTime 더 점원 이름없는 : $의 CreateUserName 주문 번호는 : $ OrderID를 금액으로 인해 : $ 금액 볼륨 할인 : $의 discountAmount 금액 지불 : $ 총 현금 : $ 현금 총 신용 카드 : $ 카드 다양한 카드 정보는 지불 : $ CardCategory 보증금 납부 : $ 보증금 지불 상품권 : $ 쿠폰 체납 : $ 채무 현재 잔액 : $ DepositAmount 현재 쿠폰 : $ 쿠폰 금액 현재 포인트 : $ PointAmount ',
    repaymentName: '상환',
    repaymentRemark: '매개 변수 표 세부 사항 : $Table  고객 번호 : $ CustomerID를 고객 이름 : $ CUSTOMERNAME 단일 현금 등록 번호 : $ 없음 현금 등록 날짜 : $의 CreateDate 현금 등록 시간 : $ CreateTime 더 점원 이름 : $ CreateUserName 주문 번호 : $ OrderID를 계정 없습니다 금액 : $ 금액 납입 금액 : $의 현금 카드 현금 : $ 현금 카드 총 : $ 카드 다양한 카드 정보 지불 : $ CardCategory가 체납 남은 : $ 부채 ',
    depositName: '선불',
    depositRemark: '매개 변수 설명 : 고객 ID : $ CustomerID를 고객 이름 : $ CUSTOMERNAME 단일 현금 등록 번호 : $ 없음 현금 등록 날짜 : $의 CreateDate 현금 등록 시간 : $ CreateTime 더 점원 이름 : $ CreateUserName 주문 번호 : $ OrderID를 금액으로 인해 : $ 금액 현금 없다 지불 : $ 현금 신용 카드 합계 : 다양한 카드에 대한 $ 카드 지불 : $ CardCategory ',
    channelRechargeName: '채널 충전',
    channelRechargeRemark: '인자 설명: 채널 상호: CustomerID 네트워크 이름: Customers: 달러 번호: 달러: C리얼리티: C리얼리티: C리얼타임 수은원 이름: C리얼리티 &amp; cserName: 주문서: Oron ID 받는 금액: 미국 달러: KMant 현금 지불: Cash 카드: 카드 총액: CC 의 각종 카드지불: CardCateg림',
    rebateName: '환급 선불',
    rebateRemark: '매개 변수 설명 : 고객 ID : $ CustomerID를 고객 이름 : $ CUSTOMERNAME 단일 현금 등록 번호 : $ 없음 현금 등록 날짜 : $의 CreateDate 현금 등록 시간 : $ CreateTime 더 점원 이름 : $ CreateUserName 주문 번호 : $ OrderID를 금액으로 인해 : $ 금액 현금 없다 지불 : $ 현금 신용 카드 합계 : 다양한 카드에 대한 $ 카드 지불 : $ CardCategory ',
    backName: '백 프로젝트',
    backRemark: '매개 변수 표 세부 사항 : $ 표 고객 번호 : $ CustomerID를 고객 이름 : $ CUSTOMERNAME 단일 현금 등록 번호 : $ 없음 현금 등록 날짜 : $의 CreateDate 현금 등록 시간 : $ CreateTime 더 점원 이름 : $ CreateUserName 주문 번호 : $ OrderID를 계정 없습니다 금액 : $ 금액 현금 지불 : $ 현금 신용 카드 합계 : $ 카드 다양한 카드에 대한 자세한 지불 : $ CardCategory ',
    settlementName: '결제',
    settlementRemark: '매개 변수 표 세부 사항 : $ 표 결산일 : $ CreateDate 결제 시간 : $는 시작 시간 CreateTime 더 : $ 상영 종료 시간 : $ ENDTIME 운영자 이름 : $ CreateUserName 총 금액 : $ 양의 현금 금액 : $ 현금 신용 카드 거래 : $ 카드 금전 등록기 수량 : $ Num ',
    operationName: '스크래치',
    operationRemark: '매개 변수 표 세부 사항 : $ 표 고객 번호 : $ CustomerID를 고객 이름 : $ CUSTOMERNAME는 단순히 날짜를 공제 : $ CreateTime 더 운영자 이름 : $ 총 수 CreateUserName 소비 : $ TotalNum 총 지출 : $ TotalAmount $ CreateDate 단순히 시간을 공제 ',
    surgeryName: '수술 공지',
    surgeryRemark: '매개 변수 표 세부 사항 : $ 표 고객 번호 : $ CustomerID를 고객 이름 : $ CUSTOMERNAME 성별 : $ 성별 나이 : $ 시대 수술 날짜 : $ 날짜 시작 시간 : $ 상영 종료 시간 : $의 ENDTIME 의사의 약속 : $의 사용자 이름 작업 이름 : $ CreateUserName 마 취 : $ AnesthesiaType 컨설턴트 : $ ManagerUserName ',
    purchaseName: '수신 저장소',
    purchaseRemark: '매개 변수 표 세부 사항 : $ 테이블웨어 하우스 이름 : $의 WarehouseName 공급 업체 : $ SupplierName 단일 번호 : $ 없음 저장 날짜 : $의 CreateDate의 시간 범위 : $의 CreateTime 더 작업을 사용자 이름 : $ CreateUserName의 총계 : $ 민 총 금액 : $ 금액',
    returnName: '제조업체에서 반환 함',
    returnRemark: '매개 변수 표 세부 사항 : $ 테이블웨어 하우스 이름 : $의 WarehouseName 공급 업체 : $ SupplierName 단일 번호 : $ 없음 아웃 바운드 날짜 : $ CreateDate 떠나는 시간 : $의 CreateTime 더 작업을 사용자 이름 : $ CreateUserName의 총계 : $ 민 총 금액 : $ 금액 ',
    allocateName: '전송',
    allocateRemark: '매개 변수 표 세부 사항 : $ 곡웨어 하우스 테이블 : $ FromWarehouseName 조정 창고 : $ ToWarehouseName 단일 번호 : $ 날짜 없음 할당 : $ A CreateDate 할당 시간 : 사용자 이름 $ CreateTime 더 작업 : $ CreateUserName의 총수 : $ 민 총 금액 : $ 신청자 : $ UserName ',
    checkName: '검사 점',
    checkRemark: '매개 변수 표 세부 사항 : $ 테이블웨어 하우스 이름 : $ WarehouseName 단일 번호 : $ 없음 카운트 날짜 : $ CreateDate 재고 시간 : $ CreateTime 더 작업 사용자 이름 : $ CreateUserName의 총계 : $ 민',
    useName: '요청',
    useRemark: '매개 변수 표 세부 사항 : $ 테이블웨어 하우스 이름 : $ WarehouseName받는 부서 : $ DEPTNAME받는 사람 : $의 사용자 이름 단일 번호 : $ 없음받는 사람이 데이트를하지 : $의 CreateDate받는 시간 : $의 CreateTime 더 작업을 사용자 이름 : $ CreateUserName 총 수량 : $ Num 총 금액 : $ Amount ',
    prescriptionName: '처방전',
    prescriptionRemark: '매개 변수 표 세부 사항 : $ 테이블 고객 이름 : $ CUSTOMERNAME 성별 : $ CustomerGender 나이 : $ 시대 지불 날짜 : $ PaidTime 약물 금액 : $ 양',
    borrowName: '응용 프로그램 빌리기',
    borrowRemark: '매개 변수 표 상세 사항 : $ 없음 차입 부문 : CreateDate 인사를 빌려 $ : $ DoUserName 도서관 창고 : $ WarehouseName는 이유 빌려 : $ DEPTNAME 날짜 빌릴 $ 테이블 현금 단일 번호 등록 $두기',
    returnBorrowedName: '저장 용량으로 돌아 가기',
    returnBorrowedRemark: '매개 변수 표 상세 사항 : $ 없음 차입 부문 : CreateDate 인사를 빌려 $ : $ DoUserName 저장 창고 : $ WarehouseName는 이유 빌려 : $ DEPTNAME 날짜 빌릴 $ 테이블 현금 단일 번호 등록 $ 발언을',
    returnSalesName: '퇴각 마약',
    returnSalesRemark: '매개 변수 표 세부 사항 : $ 테이블 고객 이름 : $ CUSTOMERNAME 영수증 번호 : $ 없음 부서 : $ DEPTNAME 저장 창고 : $ WarehouseName 이유 : $ 비고 인사를 제출한다 : $ CreateUserName 제출 : $ CreateTime 더 감사 자 : $ AuditUserName 감사 시간 : $ AuditTime ',
    stockOutDeskName: '공고 출고.',
    stockOutDeskRemark: '참수 설명: 표격 명세서:$Table  클라이언트 이름: $CustomerName  클라이언트 번호: $CustomerID 출고단표: $No   스냅 창고: $WarehouseName   스냅 단추: $CreateTime',
    label1: '너비',
    label2: '글꼴',
    label3: '템플릿',
    label4: '크기',
    label5: '내용',
    modalTit1: '글꼴 수정',
    modalTit2: '너비 편집',
    modalTit3: '템플릿 수정',
    valid: '내용을 입력하십시오.',
  },


  /**
   * 审核规则
   */
  auditRule: {
    order: '품목 할인',
    back: '백 프로젝트',
    backSales: '은퇴 의약품',
    rebateDeposit: '선급금 인출',
    depositTransfer: '사전 지불 전송',
    exploitChange: '개발자 변경',
    managerChange: '컨설턴트 변경',
    member: '회원 변경',
    addEquity: '관심 증가',
    deleteEquity: '지분 삭제',
    addCoupon: '배송 티켓',
    rebateCoupon: '환불',
    addPoint: '보내기 지점',
    rebatePoint: '포인트 공제',
    pointCoupon: '포인트 바우처',
    orderDetailManager: '의사 변경',
    blacklist: '블랙리스트',
    debtOperation: '그림 체납',
    msg1: '모든 감사 규칙 유형 :',
    msg2: '이 감사 규칙을 삭제 하시겠습니까??',
    colTit1: '규칙 유형',
    colTit2: '레벨 수',
    colTit3: '할인 (%) 미만',
    colTit4: '보다 높음',
    colTit5: '사용자 감사',
    btn: '규칙 추가',
    other: '기타',
    add1: '주문 할인 감사 규칙 추가',
    add2: '철수 프로젝트 감사 규칙 추가',
    add3: '마약 철수 검토 규칙 추가',
    add4: '철회 검토 규칙 추가',
    add5: '감사 규칙 추가',
    label1: '수준 1',
    label2: '레벨 2',
    label3: '3 단계',
    label4: '4 단계',
    label5: '레벨 1 감사인',
    label6: '2 차 심사원',
    label7: '레벨 3 감사인',
    label8: '레벨 4 감사인',
    label9: '다섯 명의 감사원',
    label10: '할인 <',
    label11: '금액 <=',
    label12: '5',
    placeholder: '리뷰어를 선택하십시오',
    valid: '감사 유형을 선택하십시오',
  },


  /**
   * 编辑权限
   */
  manager: {
    updateChannel: '소스 수정',
    updateSymptom: '컨설팅 프로젝트 수정',
    updateStore: '채널 수정',
    updateMobile: '연락처 수정',
    consultUpdate: '상담 수정',
    consultDelete: '상담 삭제',
    failtureUpdate: '비공식 수정',
    failtureDelete: '삭제되지 않은 항목 삭제',
    tagDelete: '태그 삭제',
    relationDelete: '관계 삭제',
    surveyUpdate: '설문지 수정',
    surveyDelete: '설문지 삭제',
    medicalRecordUpdate: '의료 기록 수정',
    medicalRecordDelete: '의료 기록 삭제',
    photoUpdate: '사진 수정',
    photoDelete: '사진 삭제',
    appointmentUpdate: '상담 약속 변경',
    appointmentDelete: '상담 약속 삭제',
    treatUpdate: '치료 약속 수정',
    treatDelete: '치료 약속 삭제',
    surgeryUpdate: '수술 약속 수정',
    surgeryDelete: '수술 예약 삭제',
    callbackTaskUpdate: '방문 방문 알림 수정',
    callbackTaskDelete: '미리 알림 삭제',
    callbackUpdate: '방문 재 방문 수정',
    callbackDelete: '방문 삭제',
    operationUpdate: '공제액 수정',
    operationDelete: '그리기 삭제',
    operationStockOutDelete: '버튼 배송 삭제',
    commissionDelete: '채널 커미션 제거',
    blacklistDelete: '블랙리스트 삭제',
    stockDelete: '항목 및 출구 목록 삭제',
    updateEffectrRacking: '개정 효과 추적',
    deleteEffectrRacking: '삭제 효과 추적',
    label1: '모든 권한 유형',
    label2: '사용 권한 유형',
    label3: '사용 권한 사용자',
    valid1: '권한 유형을 선택하십시오',
    valid2: '권한 사용자를 선택하십시오',
    msg: '이 사용자의 {0} 권한을 삭제 하시겠습니까? ',
    msg1: '모든 권한 설정',
    modalTit: '권한 사용자 추가',
  },


  /**
   * 医生预约
   */
  treatDoctor: {
    label1: '의사',
    label2: '약속 시간',
    label3: '예약 가능',
    valid1: '약속 시간을 선택하십시오',
    valid2: '의사를 선택하십시오',
    modalTit1: '약속 설정 추가',
    modalTit2: '약속 설정 수정',
    btn: '일괄 추가',
    tit: '대량 추가 설정',
    msg1: '이 약속 설정을 삭제 하시겠습니까?',
    msg2: '이 의사의 모든 약속 설정을 삭제해야합니까? ',
  },


  /**
   * 医生咨询
   */
  consultDoctor: {
    label1: '선별 허용',
    label2: '약속 허용',
    label3: '제휴 스케줄링',
    label4: '별칭',
    label5: '예',
    label6: '아니요',
    modalTit1: '상담 의사 설정 추가',
    modalTit2: '상담 의사 설정 수정',
    msg1: '상담 의사의 설정을 삭제 하시겠습니까? ',
    msg2: '의사에게 물어보십시오.',
  },


  /**
   * 仪器管理页面
   */
  instrument: {
    label: '수량',
    modalTit1: '장비 관리 추가',
    modalTit2: '장비 관리 추가',
    msg1: '장비 관리 추가',
    msg2: '장비 관리 추가',
  },


  /**
   * 预约项目
   */
  appointmentCharge: {
    label1: '약속 항목',
    label2: '기본 시간 (분)',
    label3: '악기 장비',
    label4: '프로젝트 이름',
    colTit: '품목 번호',
    modalTit1: '약속 항목 추가',
    modalTit2: '약속 항목 수정',
    msg1: '예약 항목을 삭제 하시겠습니까?',
    msg2: '예약 프로젝트 정보 :',
    valid: '약속 항목을 선택하십시오',
  },
};