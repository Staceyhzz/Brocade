export default {
  /**
   * 报表模块名
   */
  reportSetting: {
    // 报表分类
    cybb: '공통 보고서',
    sybb: '모든 보고서',
    jyfx: '비즈니스 분석',
    cwbb: '재무 제표',
    jxbb: '실적 보고서',
    ywbb: '사업 보고서',
    mzbb: '외래 환자 보고서',
    //报表名称及说明
    lostTreatmentRecord: '출석 손실 분석',
    lostTreatmentRecordRemark: '로 구성 : 그룹의 거래 세부 정보, 병원의 거래 세부 정보 및 사용자의 거래 세부 정보. 다양한 차원을 바탕으로 고객 손실의 원인을 분석하십시오.',
    lostTreatmentMsg1: '다양한 유도에 따라 고객의 유실 원인을 분석하다.',
    lostTreatmentMsg2: '만약 고객이 이날 임의 주문서를 성교로 계산한다면, 이날 전체 상태는 성교 고객으로 유실된 보고서에 표시되지 않는 것으로 나타났다.만약 미성교 당일로 미성교 원인을 여러 차례 작성하였다면, 최종 성교 원인을 기준으로 삼을 것이다.',
    lostTreatmentCount: '출석률 손실 분석',
    lostTreatmentCountRemark: '기준 : 단체 무 경쟁 유형 통계, 병원 유형 통계, 사용자 비 해석 유형 통계 결합 여러 범주의 인력, 손실 유형 및 출처에 대한 고객 요구 사항의 변동률에 대한 통계. 고객이 통계적 범위 외래 상태 다양한있는 경우, 외래 통계 프레스 상태 차수 (새로 진단 - 참조 - 재 소비) 상태의 우선 순위를 미리 계산한다. ',
    cusRepaymentRecord: '고객 상환 기록',
    cusRepaymentRecordRemark: '보낸 사람 : 그룹의 상환 정보, 병원 지불, 전체 그룹의 상환 날짜, 총 병원 상환 날짜의 자세한 내용은 그룹 통계 상환 병원을 통합. 【설명】 돈이있는 고객의 상환 내역을 편리하게 검색 할 수 있습니다. ',
    cusRepaymentRecordMsg1: '고객의 상환 기록에 편리하게 빚진 적이 있다.',
    cusRepaymentRecordMsg2: '만약 고객 3 호의 주문금 7,000, 4 번, 5 천, 5 일 2000 도 빚진 채 3,000, 6 일 3,000.부금 총액: 0; 조사 3 호, 신증 총액 77000 새 증환금 총액: 0 찰 4 호 - 5 호, 신부금 총액: 0 새 증환금 총액 4,000 이다.',
    treatPostServiceRecord: '치료 서비스',
    treatPostServiceRecordRemark: '의사 완료 함께 복수의 항목이있는 경우 치료의 치료에 관련된 각 의사의 정보 데이터의 통계를 수행하는 의사에 등록 의사는 각각 각각의 처리 데이터를 표시. 처형 건수를 총 구매 건수로 나눈 다음, 구입 당시의 품목 금액을 토대로 이번에 수행 한 처치의 성과를 계산하십시오. 치료 실적 = 치료 횟수 / 구매 횟수 * 항목 금액 ',
    treatPostServiceRecordMsg1: '이 시계 는 일시적 으로 선상의 치료 기록 을 통계 하지 않는다',
    treatPostServiceRecordMsg2: '치료 시행 시 등록된 의사에게 각 의사들이 참여하는 정보의 데이터를 집계하고, 한 종목에서 여러 의사가 공동으로 완성하면, 각 의사마다 각각 치료 데이터를 표시한다.집행 시 횟수 에 따라 총 구매 수량을 제외하고, 구매 시 금액에 근거하여 이번 집행에 대한 치료효과를 계산해 냈다.',
    appointmentRecord: '예약 보고서',
    appointmentRecordRemark: '그룹 치료 약속 세부 정보, 병원 예약 정보, 사용자 치료 약속 세부 사항, 그룹 치료 약속의 등록 정보, 병원, 치료 약속의 등록 정보, 사용자 통계 매일 치료 약속, 병원 컨설팅 그룹 상담 약속을 예약 세부 사항, 사용자의 상담 약속 세부 정보 ',
    appointmentRecordMsg1: '이 시선은 통계병원 직원만 예약 데이터를 제출하며 사용자가 애플리케이션을 통해 애플리케이션을 통해 예약 예약 기록을 실시하지 않습니다.',
    appointmentRecordMsg2: '예약 예약 율 = 예약 날짜 같은 날 찾아오는 고객 비율.만약 한 고객이 예약 당일 문을 닫지 않으면, 미리 미루거나 미루거나, 모두 예약을 하지 않고, 모두 예약율을 예약하지 않는다.',
    cusConsultationRecord: '고객 승인',
    cusConsultationRecordRemark: '병원 컨설턴트 회전율 통계',
    cusConsultationRecordMsg1: '병원 안내사 성교 통계',
    cusConsultationRecordMsg2: '평균 객 단가: 총 항목 과 예수 목록 의 실수 금액 을 제외하고 총 지불률 을 평균 성교율 = 상담사 당일 진료 / 총접 진료 는 비분진 상담사 본인이 조작된 돈 도 통계 다.',
    outpatientReceptionCount: '외래 진찰 통계',
    outpatientReceptionCountRemark: '현재 고객 방문의 전환율 통계는 컨설턴트가 상담을받을 수있는 능력을 평가하는 데 사용됩니다.',
  },


  /**
   * 报表公共
   */
  reportPublic: {
    title1: '검색',
    title2: '보고서 데이터',
    title3: '설명: ',
    title4: '지표: ',

    tableChannelStore: '소스 / 채널',
  },


  /**
   * 报表中心
   */
  reportRecord: {
    tit: '고객 정보 보고서',
  },


  /**
   * 接诊流失分析
   */
  lostTreatmentRecord: {
    title: '누설 분석',
    label_lslx: '손실 유형',
    label_lsyy: '이유는',
    label_rs: '숫자',
    label_bfb: '백분율',
    label_none: '아니요',
    placeholder_lsyy: '손실 원인을 입력하십시오.',
    menuTit1: '상세 통계',
    menuTit2: '손실 유형 통계',
    menuTit3: '영수증 통계',
    menuTit4: '소스 / 채널 통계',
    menuTit5: '개발자 통계',
  },


  /**
   * 顾客还款记录
   */
  cusRepaymentRecord: {
    title: '상환 분석',
    label1: '상환 수',
    label2: '부채 번호',
    menuTit1: '상환 기록',
    menuTit2: '고객 요약',
    menuTit3: '청구자 요약',
    menuTit4: '병원 요약',
    colTit1: '총 미납금',
    colTit2: '상환 금액',
    colTit3: '현재 부채',
    colTit4: '미결 주문 수',
    colTit5: '새로운 부채 총액',
    colTit6: '상환 금액 추가',
    colTit7: '나머지 체납',
    colTit8: '고객 수',
  },


  /**
   * 治疗岗位业务
   */
  treatPostServiceRecord: {
    title: '치료 후 분석',
    label1: '치료 날짜',
    label2: '치료 병원',
    label3: '치료 항목',
    label4: '치료사',
    label5: '치료 부서',
    menuTit1: '치료 기록',
    menuTit2: '치료 판매 조정 명세서',
    menuTit3: '직원 치료 실적 통계',
    colTit1: '치료 단위',
    colTit2: '치료 횟수',
    colTit3: '치료 실적',
    colTit4: '구매 날짜',
    colTit5: '병원 구입',
    colTit6: '구매 수량',
    colTit7: '총 판매액',
    colTit8: '치료 번호',
    placeholder1: '치료 항목 선택',
    placeholder2: '치료 직원 선택',
    positionNull: 'null',
  },


  /**
   * 预约报表
   */
  appointmentRecord: {
    title: '약속 분석',
    label1: '약속 유형',
    label2: '예약 방법',
    label3: '의사의 상태로',
    label4: '예약 의사',
    label5: '약속 항목',
    menuTit1: '예약 레코드',
    menuTit2: '병원 예약 통계',
    menuTit3: '직원 약속 약속 시간',
    menuTit4: '의사 예약 통계',
    colTit1: '총 숫자',
    colTit2: '약속 비율',
    colTit3: '약속 시간',
    placeholder1: '약속 항목 선택',
    placeholder2: '약속 의사 선택',
    consult: '상담 약속 수',
    treat: '치료 약속 수',
    surgery: '수술 약속 시간',
  },


  /**
   * 顾客接诊
   */
  cusConsultationRecord: {
    title: '상담 분석',
    label1: '입학 날짜',
    label2: '상담 프로젝트',
    label3: '계약 프로젝트',
    label4: '거래 금액',
    label5: '평균 이직률',
    label6: '합격 한 총 인원수',
    label7: '평균 수요 고객 단가',
    label8: '거래율',
    label9: '수요 고객 단가',
    label10: '필수 총 고객 가격',
    menuTit1: '세부 목록',
    menuTit2: '상담원의 다양한 거래 유형',
    menuTit3: '컨설턴트의 다른 고객 이탈률',
    menuTit4: '컨설턴트 입학 단가',
    placeholder: '거래 항목을 선택하십시오.',
  },
};