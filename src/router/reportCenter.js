/* 
 * @Author: Moriarty
 * 报表路由
 */

export default [
  // {
  //     path: '/treatment',
  //     component(resolve) {
  //         require.ensure(['view/reportCenter/aaanew1'], () => {
  //             resolve(require('view/reportCenter/aaanew1'));
  //         });
  //     }
  // },
  // {
  //     path: '/aaanew2',
  //     component(resolve) {
  //         require.ensure(['view/reportCenter/aaanew2'], () => {
  //             resolve(require('view/reportCenter/aaanew2'));
  //         });
  //     }
  // },
  // {
  //     path: '/aaanew3',
  //     component(resolve) {
  //         require.ensure(['view/reportCenter/aaanew3'], () => {
  //             resolve(require('view/reportCenter/aaanew3'));
  //         });
  //     }
  // },
  // {
  //     path: '/aaanew4',
  //     component(resolve) {
  //         require.ensure(['view/reportCenter/aaanew4'], () => {
  //             resolve(require('view/reportCenter/aaanew4'));
  //         });
  //     }
  // },



  // {
  //     path: '/channelGroup',
  //     meta: {power: 'channelGroup'},
  //     component(resolve) {
  //         require.ensure(['view/systemSet/channelGroup'], () => {
  //             resolve(require('view/systemSet/channelGroup'));
  //         });
  //     }
  // },
  // {
  //     path: '/channelGroupCheck',
  //     meta: {power: 'channelGroup'},
  //     component(resolve) {
  //         require.ensure(['view/systemSet/channelGroupCheck'], () => {
  //             resolve(require('view/systemSet/channelGroupCheck'));
  //         });
  //     }
  // },
  // {
  //     path: '/channelGroupEdit',
  //     meta: {power: 'channelGroup'},
  //     component(resolve) {
  //         require.ensure(['view/systemSet/channelGroupEdit'], () => {
  //             resolve(require('view/systemSet/channelGroupEdit'));
  //         });
  //     }
  // },
  //报表中心
  // {
  //     path: '/reportCenter',
  //     component(resolve) {
  //         require.ensure(['view/reportCenter'], () => {
  //             resolve(require('view/reportCenter'));
  //         });
  //     }
  // },
  {
    path: '/failtureDetail',
    meta: {
      power: 'failtureDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/failtureDetail'], () => {
        resolve(require('view/reportCenter/failtureDetail'));
      });
    }
  },
  {
    path: '/hospitalFailtureDetail',
    meta: {
      power: 'hospitalFailtureDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalFailtureDetail'], () => {
        resolve(require('view/reportCenter/hospitalFailtureDetail'));
      });
    }
  },
  {
    path: '/userFailtureDetail',
    meta: {
      power: 'userFailtureDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userFailtureDetail'], () => {
        resolve(require('view/reportCenter/userFailtureDetail'));
      });
    }
  },
  {
    path: '/failtureCategoryStat',
    meta: {
      power: 'failtureCategoryStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/failtureCategoryStat'], () => {
        resolve(require('view/reportCenter/failtureCategoryStat'));
      });
    }
  },
  {
    path: '/hospitalFailtureCategoryStat',
    meta: {
      power: 'hospitalFailtureCategoryStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalFailtureCategoryStat'], () => {
        resolve(require('view/reportCenter/hospitalFailtureCategoryStat'));
      });
    }
  },
  {
    path: '/userFailtureCategoryStat',
    meta: {
      power: 'userFailtureCategoryStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userFailtureCategoryStat'], () => {
        resolve(require('view/reportCenter/userFailtureCategoryStat'));
      });
    }
  },
  {
    path: '/repaymentDetail',
    meta: {
      power: 'repaymentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/repaymentDetail'], () => {
        resolve(require('view/reportCenter/repaymentDetail'));
      });
    }
  },
  {
    path: '/hospitalRepaymentDetail',
    meta: {
      power: 'hospitalRepaymentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalRepaymentDetail'], () => {
        resolve(require('view/reportCenter/hospitalRepaymentDetail'));
      });
    }
  },
  {
    path: '/repaymentDateStat',
    meta: {
      power: 'repaymentDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/repaymentDateStat'], () => {
        resolve(require('view/reportCenter/repaymentDateStat'));
      });
    }
  },
  {
    path: '/hospitalRepaymentDateStat',
    meta: {
      power: 'hospitalRepaymentDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalRepaymentDateStat'], () => {
        resolve(require('view/reportCenter/hospitalRepaymentDateStat'));
      });
    }
  },
  {
    path: '/repaymentHospitalStat',
    meta: {
      power: 'repaymentHospitalStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/repaymentHospitalStat'], () => {
        resolve(require('view/reportCenter/repaymentHospitalStat'));
      });
    }
  },
  {
    path: '/operatorDetail',
    meta: {
      power: 'operatorDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/operatorDetail'], () => {
        resolve(require('view/reportCenter/operatorDetail'));
      });
    }
  },
  {
    path: '/hospitalOperatorDetail',
    meta: {
      power: 'hospitalOperatorDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalOperatorDetail'], () => {
        resolve(require('view/reportCenter/hospitalOperatorDetail'));
      });
    }
  },
  {
    path: '/userOperatorDetail',
    meta: {
      power: 'userOperatorDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userOperatorDetail'], () => {
        resolve(require('view/reportCenter/userOperatorDetail'));
      });
    }
  },
  {
    path: '/treatDetail',
    meta: {
      power: 'treatDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/treatDetail'], () => {
        resolve(require('view/reportCenter/treatDetail'));
      });
    }
  },
  {
    path: '/hospitalTreatDetail',
    meta: {
      power: 'hospitalTreatDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalTreatDetail'], () => {
        resolve(require('view/reportCenter/hospitalTreatDetail'));
      });
    }
  },
  {
    path: '/userTreatDetail',
    meta: {
      power: 'userTreatDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userTreatDetail'], () => {
        resolve(require('view/reportCenter/userTreatDetail'));
      });
    }
  },
  {
    path: '/createTreatDetail',
    meta: {
      power: 'createTreatDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/createTreatDetail'], () => {
        resolve(require('view/reportCenter/createTreatDetail'));
      });
    }
  },
  {
    path: '/hospitalCreateTreatDetail',
    meta: {
      power: 'hospitalCreateTreatDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCreateTreatDetail'], () => {
        resolve(require('view/reportCenter/hospitalCreateTreatDetail'));
      });
    }
  },
  {
    path: '/userCreateTreatDetail',
    meta: {
      power: 'userCreateTreatDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCreateTreatDetail'], () => {
        resolve(require('view/reportCenter/userCreateTreatDetail'));
      });
    }
  },
  {
    path: '/userTreatDateStat',
    meta: {
      power: 'userTreatDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userTreatDateStat'], () => {
        resolve(require('view/reportCenter/userTreatDateStat'));
      });
    }
  },
  {
    path: '/appointmentDetail',
    meta: {
      power: 'appointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/appointmentDetail'], () => {
        resolve(require('view/reportCenter/appointmentDetail'));
      });
    }
  },
  {
    path: '/hospitalAppointmentDetail',
    meta: {
      power: 'hospitalAppointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalAppointmentDetail'], () => {
        resolve(require('view/reportCenter/hospitalAppointmentDetail'));
      });
    }
  },
  {
    path: '/createAppointmentDetail',
    meta: {
      power: 'createAppointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/createAppointmentDetail'], () => {
        resolve(require('view/reportCenter/createAppointmentDetail'));
      });
    }
  },
  {
    path: '/hospitalCreateAppointmentDetail',
    meta: {
      power: 'hospitalCreateAppointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCreateAppointmentDetail'], () => {
        resolve(require('view/reportCenter/hospitalCreateAppointmentDetail'));
      });
    }
  },
  {
    path: '/userCreateAppointmentDetail',
    meta: {
      power: 'userCreateAppointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCreateAppointmentDetail'], () => {
        resolve(require('view/reportCenter/userCreateAppointmentDetail'));
      });
    }
  },
  {
    path: '/customerAgeDetail',
    meta: {
      power: 'customerAgeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/customerAgeDetail'], () => {
        resolve(require('view/reportCenter/customerAgeDetail'));
      });
    }
  },
  {
    path: '/cashCardDetail',
    meta: {
      power: 'cashCardDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/cashCardDetail'], () => {
        resolve(require('view/reportCenter/cashCardDetail'));
      });
    }
  },
  {
    path: '/hospitalCashCardDetail',
    meta: {
      power: 'hospitalCashCardDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCashCardDetail'], () => {
        resolve(require('view/reportCenter/hospitalCashCardDetail'));
      });
    }
  },
  {
    path: '/userCashCardDetail',
    meta: {
      power: 'userCashCardDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCashCardDetail'], () => {
        resolve(require('view/reportCenter/userCashCardDetail'));
      });
    }
  },
  {
    path: '/cashCardDateStat',
    meta: {
      power: 'cashCardDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/cashCardDateStat'], () => {
        resolve(require('view/reportCenter/cashCardDateStat'));
      });
    }
  },
  {
    path: '/hospitalCashCardDateStat',
    meta: {
      power: 'hospitalCashCardDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCashCardDateStat'], () => {
        resolve(require('view/reportCenter/hospitalCashCardDateStat'));
      });
    }
  },
  {
    path: '/userCashCardDateStat',
    meta: {
      power: 'userCashCardDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCashCardDateStat'], () => {
        resolve(require('view/reportCenter/userCashCardDateStat'));
      });
    }
  },
  {
    path: '/cashCardItemGroupStat',
    meta: {
      power: 'cashCardItemGroupStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/cashCardItemGroupStat'], () => {
        resolve(require('view/reportCenter/cashCardItemGroupStat'));
      });
    }
  },
  {
    path: '/hospitalCashCardItemGroupStat',
    meta: {
      power: 'hospitalCashCardItemGroupStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCashCardItemGroupStat'], () => {
        resolve(require('view/reportCenter/hospitalCashCardItemGroupStat'));
      });
    }
  },
  {
    path: '/debtOrderDetail',
    meta: {
      power: 'debtOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/debtOrderDetail'], () => {
        resolve(require('view/reportCenter/debtOrderDetail'));
      });
    }
  },
  {
    path: '/hospitalDebtOrderDetail',
    meta: {
      power: 'hospitalDebtOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDebtOrderDetail'], () => {
        resolve(require('view/reportCenter/hospitalDebtOrderDetail'));
      });
    }
  },
  {
    path: '/userDebtOrderDetail',
    meta: {
      power: 'userDebtOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userDebtOrderDetail'], () => {
        resolve(require('view/reportCenter/userDebtOrderDetail'));
      });
    }
  },
  {
    path: '/settlementDetail',
    meta: {
      power: 'settlementDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/settlementDetail'], () => {
        resolve(require('view/reportCenter/settlementDetail'));
      });
    }
  },
  {
    path: '/hospitalSettlementDetail',
    meta: {
      power: 'hospitalSettlementDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalSettlementDetail'], () => {
        resolve(require('view/reportCenter/hospitalSettlementDetail'));
      });
    }
  },
  {
    path: '/userSettlementDetail',
    meta: {
      power: 'userSettlementDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userSettlementDetail'], () => {
        resolve(require('view/reportCenter/userSettlementDetail'));
      });
    }
  },
  {
    path: '/operationDetail',
    meta: {
      power: 'operationDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/operationDetail'], () => {
        resolve(require('view/reportCenter/operationDetail'));
      });
    }
  },
  {
    path: '/hospitalOperationDetail',
    meta: {
      power: 'hospitalOperationDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalOperationDetail'], () => {
        resolve(require('view/reportCenter/hospitalOperationDetail'));
      });
    }
  },
  {
    path: '/userOperationDetail',
    meta: {
      power: 'userOperationDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userOperationDetail'], () => {
        resolve(require('view/reportCenter/userOperationDetail'));
      });
    }
  },
  {
    path: '/pointChangeDetail',
    meta: {
      power: 'pointChangeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/pointChangeDetail'], () => {
        resolve(require('view/reportCenter/pointChangeDetail'));
      });
    }
  },
  {
    path: '/hospitalPointChangeDetail',
    meta: {
      power: 'hospitalPointChangeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalPointChangeDetail'], () => {
        resolve(require('view/reportCenter/hospitalPointChangeDetail'));
      });
    }
  },
  {
    path: '/depositOrderDetail',
    meta: {
      power: 'depositOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositOrderDetail'], () => {
        resolve(require('view/reportCenter/depositOrderDetail'));
      });
    }
  },
  {
    path: '/hospitalDepositOrderDetail',
    meta: {
      power: 'hospitalDepositOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDepositOrderDetail'], () => {
        resolve(require('view/reportCenter/hospitalDepositOrderDetail'));
      });
    }
  },
  {
    path: '/userDepositOrderDetail',
    meta: {
      power: 'userDepositOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userDepositOrderDetail'], () => {
        resolve(require('view/reportCenter/userDepositOrderDetail'));
      });
    }
  },
  {
    path: '/depositOrderDetailDateStat',
    meta: {
      power: 'depositOrderDetailDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositOrderDetailDateStat'], () => {
        resolve(require('view/reportCenter/depositOrderDetailDateStat'));
      });
    }
  },
  {
    path: '/depositOrderDetailHospitalStat',
    meta: {
      power: 'depositOrderDetailHospitalStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositOrderDetailHospitalStat'], () => {
        resolve(require('view/reportCenter/depositOrderDetailHospitalStat'));
      });
    }
  },
  {
    path: '/depositOrderDetailHospitalDateStat',
    meta: {
      power: 'depositOrderDetailHospitalDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositOrderDetailHospitalDateStat'], () => {
        resolve(require('view/reportCenter/depositOrderDetailHospitalDateStat'));
      });
    }
  },
  {
    path: '/hospitalDepositOrderDetailDateStat',
    meta: {
      power: 'hospitalDepositOrderDetailDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDepositOrderDetailDateStat'], () => {
        resolve(require('view/reportCenter/hospitalDepositOrderDetailDateStat'));
      });
    }
  },
  {
    path: '/depositOrderDetailChargeStat',
    meta: {
      power: 'depositOrderDetailChargeStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositOrderDetailChargeStat'], () => {
        resolve(require('view/reportCenter/depositOrderDetailChargeStat'));
      });
    }
  },
  {
    path: '/hospitalDepositOrderDetailChargeStat',
    meta: {
      power: 'hospitalDepositOrderDetailChargeStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDepositOrderDetailChargeStat'], () => {
        resolve(require('view/reportCenter/hospitalDepositOrderDetailChargeStat'));
      });
    }
  },
  {
    path: '/depositOrderDetailDetail',
    meta: {
      power: 'depositOrderDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositOrderDetailDetail'], () => {
        resolve(require('view/reportCenter/depositOrderDetailDetail'));
      });
    }
  },
  {
    path: '/hospitalDepositOrderDetailDetail',
    meta: {
      power: 'hospitalDepositOrderDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDepositOrderDetailDetail'], () => {
        resolve(require('view/reportCenter/hospitalDepositOrderDetailDetail'));
      });
    }
  },
  {
    path: '/depositDetail',
    meta: {
      power: 'depositDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositDetail'], () => {
        resolve(require('view/reportCenter/depositDetail'));
      });
    }
  },
  {
    path: '/hospitalDepositDetail',
    meta: {
      power: 'hospitalDepositDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDepositDetail'], () => {
        resolve(require('view/reportCenter/hospitalDepositDetail'));
      });
    }
  },
  {
    path: '/customerDepositDetail',
    meta: {
      power: 'customerDepositDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/customerDepositDetail'], () => {
        resolve(require('view/reportCenter/customerDepositDetail'));
      });
    }
  },
  {
    path: '/hospitalCustomerDepositDetail',
    meta: {
      power: 'hospitalCustomerDepositDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCustomerDepositDetail'], () => {
        resolve(require('view/reportCenter/hospitalCustomerDepositDetail'));
      });
    }
  },
  {
    path: '/depositChangeDetail',
    meta: {
      power: 'depositChangeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositChangeDetail'], () => {
        resolve(require('view/reportCenter/depositChangeDetail'));
      });
    }
  },
  {
    path: '/hospitalDepositChangeDetail',
    meta: {
      power: 'hospitalDepositChangeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDepositChangeDetail'], () => {
        resolve(require('view/reportCenter/hospitalDepositChangeDetail'));
      });
    }
  },
  {
    path: '/depositChangeDateStat',
    meta: {
      power: 'depositChangeDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositChangeDateStat'], () => {
        resolve(require('view/reportCenter/depositChangeDateStat'));
      });
    }
  },
  {
    path: '/couponChangeDetail',
    meta: {
      power: 'couponChangeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/couponChangeDetail'], () => {
        resolve(require('view/reportCenter/couponChangeDetail'));
      });
    }
  },
  {
    path: '/hospitalCouponChangeDetail',
    meta: {
      power: 'hospitalCouponChangeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCouponChangeDetail'], () => {
        resolve(require('view/reportCenter/hospitalCouponChangeDetail'));
      });
    }
  },
  {
    path: '/couponChangeDateStat',
    meta: {
      power: 'couponChangeDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/couponChangeDateStat'], () => {
        resolve(require('view/reportCenter/couponChangeDateStat'));
      });
    }
  },
  {
    path: '/hospitalCouponChangeDateStat',
    meta: {
      power: 'hospitalCouponChangeDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCouponChangeDateStat'], () => {
        resolve(require('view/reportCenter/hospitalCouponChangeDateStat'));
      });
    }
  },
  {
    path: '/newCustomerDetail',
    meta: {
      power: 'newCustomerDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/newCustomerDetail'], () => {
        resolve(require('view/reportCenter/newCustomerDetail'));
      });
    }
  },
  {
    path: '/hospitalNewCustomerDetail',
    meta: {
      power: 'hospitalNewCustomerDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalNewCustomerDetail'], () => {
        resolve(require('view/reportCenter/hospitalNewCustomerDetail'));
      });
    }
  },
  {
    path: '/userNewCustomerDetail',
    meta: {
      power: 'userNewCustomerDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userNewCustomerDetail'], () => {
        resolve(require('view/reportCenter/userNewCustomerDetail'));
      });
    }
  },
  {
    path: '/storeNewCustomerDetail',
    meta: {
      power: 'storeNewCustomerDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/storeNewCustomerDetail'], () => {
        resolve(require('view/reportCenter/storeNewCustomerDetail'));
      });
    }
  },
  {
    path: '/hospitalStoreNewCustomerDetail',
    meta: {
      power: 'hospitalStoreNewCustomerDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStoreNewCustomerDetail'], () => {
        resolve(require('view/reportCenter/hospitalStoreNewCustomerDetail'));
      });
    }
  },
  {
    path: '/userStoreNewCustomerDetail',
    meta: {
      power: 'userStoreNewCustomerDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userStoreNewCustomerDetail'], () => {
        resolve(require('view/reportCenter/userStoreNewCustomerDetail'));
      });
    }
  },
  {
    path: '/orderDetail',
    meta: {
      power: 'orderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/orderDetail'], () => {
        resolve(require('view/reportCenter/orderDetail'));
      });
    }
  },
  {
    path: '/hospitalOrderDetail',
    meta: {
      power: 'hospitalOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalOrderDetail'], () => {
        resolve(require('view/reportCenter/hospitalOrderDetail'));
      });
    }
  },
  {
    path: '/userOrderDetail',
    meta: {
      power: 'userOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userOrderDetail'], () => {
        resolve(require('view/reportCenter/userOrderDetail'));
      });
    }
  },
  {
    path: '/backOrderDetail',
    meta: {
      power: 'backOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/backOrderDetail'], () => {
        resolve(require('view/reportCenter/backOrderDetail'));
      });
    }
  },
  {
    path: '/hospitalBackOrderDetail',
    meta: {
      power: 'hospitalBackOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalBackOrderDetail'], () => {
        resolve(require('view/reportCenter/hospitalBackOrderDetail'));
      });
    }
  },
  {
    path: '/userBackOrderDetail',
    meta: {
      power: 'userBackOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userBackOrderDetail'], () => {
        resolve(require('view/reportCenter/userBackOrderDetail'));
      });
    }
  },
  {
    path: '/depositRebateOrderDetail',
    meta: {
      power: 'depositRebateOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/depositRebateOrderDetail'], () => {
        resolve(require('view/reportCenter/depositRebateOrderDetail'));
      });
    }
  },
  {
    path: '/hospitalDepositRebateOrderDetail',
    meta: {
      power: 'hospitalDepositRebateOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDepositRebateOrderDetail'], () => {
        resolve(require('view/reportCenter/hospitalDepositRebateOrderDetail'));
      });
    }
  },
  {
    path: '/userDepositRebateOrderDetail',
    meta: {
      power: 'userDepositRebateOrderDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userDepositRebateOrderDetail'], () => {
        resolve(require('view/reportCenter/userDepositRebateOrderDetail'));
      });
    }
  },
  {
    path: '/cashierDetail',
    meta: {
      power: 'cashierDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/cashierDetail'], () => {
        resolve(require('view/reportCenter/cashierDetail'));
      });
    }
  },
  {
    path: '/hospitalCashierDetail',
    meta: {
      power: 'hospitalCashierDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCashierDetail'], () => {
        resolve(require('view/reportCenter/hospitalCashierDetail'));
      });
    }
  },
  {
    path: '/userCashierDetail',
    meta: {
      power: 'userCashierDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCashierDetail'], () => {
        resolve(require('view/reportCenter/userCashierDetail'));
      });
    }
  },
  {
    path: '/callbackDetail',
    meta: {
      power: 'callbackDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/callbackDetail'], () => {
        resolve(require('view/reportCenter/callbackDetail'));
      });
    }
  },
  {
    path: '/hospitalCallbackDetail',
    meta: {
      power: 'hospitalCallbackDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCallbackDetail'], () => {
        resolve(require('view/reportCenter/hospitalCallbackDetail'));
      });
    }
  },
  {
    path: '/userCallbackDetail',
    meta: {
      power: 'userCallbackDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCallbackDetail'], () => {
        resolve(require('view/reportCenter/userCallbackDetail'));
      });
    }
  },
  {
    path: '/hospitalCallbackCategoryStat',
    meta: {
      power: 'hospitalCallbackCategoryStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCallbackCategoryStat'], () => {
        resolve(require('view/reportCenter/hospitalCallbackCategoryStat'));
      });
    }
  },
  {
    path: '/userCallbackCategoryStat',
    meta: {
      power: 'userCallbackCategoryStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCallbackCategoryStat'], () => {
        resolve(require('view/reportCenter/userCallbackCategoryStat'));
      });
    }
  },
  {
    path: '/hospitalCallbackUserStat',
    meta: {
      power: 'hospitalCallbackUserStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCallbackUserStat'], () => {
        resolve(require('view/reportCenter/hospitalCallbackUserStat'));
      });
    }
  },
  {
    path: '/customerSurveyDetail',
    meta: {
      power: 'customerSurveyDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/customerSurveyDetail'], () => {
        resolve(require('view/reportCenter/customerSurveyDetail'));
      });
    }
  },
  {
    path: '/hospitalCustomerSurveyDetail',
    meta: {
      power: 'hospitalCustomerSurveyDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCustomerSurveyDetail'], () => {
        resolve(require('view/reportCenter/hospitalCustomerSurveyDetail'));
      });
    }
  },
  {
    path: '/userCustomerSurveyDetail',
    meta: {
      power: 'userCustomerSurveyDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userCustomerSurveyDetail'], () => {
        resolve(require('view/reportCenter/userCustomerSurveyDetail'));
      });
    }
  },
  {
    path: '/consultDetail',
    meta: {
      power: 'consultDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/consultDetail'], () => {
        resolve(require('view/reportCenter/consultDetail'));
      });
    }
  },
  {
    path: '/hospitalConsultDetail',
    meta: {
      power: 'hospitalConsultDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalConsultDetail'], () => {
        resolve(require('view/reportCenter/hospitalConsultDetail'));
      });
    }
  },
  {
    path: '/userConsultDetail',
    meta: {
      power: 'userConsultDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userConsultDetail'], () => {
        resolve(require('view/reportCenter/userConsultDetail'));
      });
    }
  },
  {
    path: '/customerDistrictDetail',
    meta: {
      power: 'customerDistrictDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/customerDistrictDetail'], () => {
        resolve(require('view/reportCenter/customerDistrictDetail'));
      });
    }
  },
  {
    path: '/unVisitAppointmentDetail',
    meta: {
      power: 'unVisitAppointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/unVisitAppointmentDetail'], () => {
        resolve(require('view/reportCenter/unVisitAppointmentDetail'));
      });
    }
  },
  {
    path: '/hospitalUnVisitAppointmentDetail',
    meta: {
      power: 'hospitalUnVisitAppointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalUnVisitAppointmentDetail'], () => {
        resolve(require('view/reportCenter/hospitalUnVisitAppointmentDetail'));
      });
    }
  },
  {
    path: '/userUnVisitAppointmentDetail',
    meta: {
      power: 'userUnVisitAppointmentDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userUnVisitAppointmentDetail'], () => {
        resolve(require('view/reportCenter/userUnVisitAppointmentDetail'));
      });
    }
  },
  {
    path: '/cashierDetailDetail',
    meta: {
      power: 'cashierDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/cashierDetailDetail'], () => {
        resolve(require('view/reportCenter/cashierDetailDetail'));
      });
    }

  },
  {
    path: '/visitDetail',
    meta: {
      power: 'visitDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/visitDetail'], () => {
        resolve(require('view/reportCenter/visitDetail'));
      });
    }
  },
  {
    path: '/hospitalVisitDetail',
    meta: {
      power: 'hospitalVisitDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalVisitDetail'], () => {
        resolve(require('view/reportCenter/hospitalVisitDetail'));
      });
    }
  },
  {
    path: '/visitClinicDateStat',
    meta: {
      power: 'visitClinicDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/visitClinicDateStat'], () => {
        resolve(require('view/reportCenter/visitClinicDateStat'));
      });
    }
  },
  {
    path: '/hospitalVisitClinicDateStat',
    meta: {
      power: 'hospitalVisitClinicDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalVisitClinicDateStat'], () => {
        resolve(require('view/reportCenter/hospitalVisitClinicDateStat'));
      });
    }
  },
  {
    path: '/hospitalVisitClinicManagerStat',
    meta: {
      power: 'hospitalVisitClinicManagerStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalVisitClinicManagerStat'], () => {
        resolve(require('view/reportCenter/hospitalVisitClinicManagerStat'));
      });
    }
  },
  {
    path: '/hospitalVisitDetailCustom1',
    meta: {
      power: 'hospitalVisitDetailCustom1'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalVisitDetailCustom1'], () => {
        resolve(require('view/reportCenter/hospitalVisitDetailCustom1'));
      });
    }
  },
  {
    path: '/dealDetail',
    meta: {
      power: 'dealDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/dealDetail'], () => {
        resolve(require('view/reportCenter/dealDetail'));
      });
    }
  },
  {
    path: '/hospitalDealDetail',
    meta: {
      power: 'hospitalDealDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDealDetail'], () => {
        resolve(require('view/reportCenter/hospitalDealDetail'));
      });
    }
  },
  {
    path: '/exploitUserDealDetail',
    meta: {
      power: 'exploitUserDealDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/exploitUserDealDetail'], () => {
        resolve(require('view/reportCenter/exploitUserDealDetail'));
      });
    }
  },
  {
    path: '/managerUserDealDetail',
    meta: {
      power: 'managerUserDealDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/managerUserDealDetail'], () => {
        resolve(require('view/reportCenter/managerUserDealDetail'));
      });
    }
  },
  {
    path: '/exploitUsersDealDetail',
    meta: {
      power: 'exploitUsersDealDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/exploitUsersDealDetail'], () => {
        resolve(require('view/reportCenter/exploitUsersDealDetail'));
      });
    }
  },
  {
    path: '/managerUsersDealDetail',
    meta: {
      power: 'managerUsersDealDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/managerUsersDealDetail'], () => {
        resolve(require('view/reportCenter/managerUsersDealDetail'));
      });
    }
  },
  {
    path: '/hospitalManagerItemDealAmountStat',
    meta: {
      power: 'hospitalManagerItemDealAmountStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalManagerItemDealAmountStat'], () => {
        resolve(require('view/reportCenter/hospitalManagerItemDealAmountStat'));
      });
    }
  },
  {
    path: '/operatorPerformanceDetail',
    meta: {
      power: 'operatorPerformanceDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/operatorPerformanceDetail'], () => {
        resolve(require('view/reportCenter/operatorPerformanceDetail'));
      });
    }
  },
  {
    path: '/hospitalOperatorPerformanceDetail',
    meta: {
      power: 'hospitalOperatorPerformanceDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalOperatorPerformanceDetail'], () => {
        resolve(require('view/reportCenter/hospitalOperatorPerformanceDetail'));
      });
    }
  },
  {
    path: '/userOperatorPerformanceDetail',
    meta: {
      power: 'userOperatorPerformanceDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userOperatorPerformanceDetail'], () => {
        resolve(require('view/reportCenter/userOperatorPerformanceDetail'));
      });
    }
  },
  {
    path: '/doctorOrderDetailDetail',
    meta: {
      power: 'doctorOrderDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/doctorOrderDetailDetail'], () => {
        resolve(require('view/reportCenter/doctorOrderDetailDetail'));
      });
    }
  },
  {
    path: '/hospitalDoctorOrderDetailDetail',
    meta: {
      power: 'hospitalDoctorOrderDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalDoctorOrderDetailDetail'], () => {
        resolve(require('view/reportCenter/hospitalDoctorOrderDetailDetail'));
      });
    }
  },
  {
    path: '/userDoctorOrderDetailDetail',
    meta: {
      power: 'userDoctorOrderDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userDoctorOrderDetailDetail'], () => {
        resolve(require('view/reportCenter/userDoctorOrderDetailDetail'));
      });
    }
  },
  {
    path: '/commissionDetail',
    meta: {
      power: 'commissionDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/commissionDetail'], () => {
        resolve(require('view/reportCenter/commissionDetail'));
      });
    }
  },
  {
    path: '/commissionDetailTime',
    meta: {
      power: 'commissionDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/commissionDetailTime'], () => {
        resolve(require('view/reportCenter/commissionDetailTime'));
      });
    }
  },
  {
    path: '/commissionDetailCharge',
    meta: {
      power: 'commissionDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/commissionDetailCharge'], () => {
        resolve(require('view/reportCenter/commissionDetailCharge'));
      });
    }
  },
  {
    path: '/commissionCashierDetail',
    meta: {
      power: 'commissionCashierDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/commissionCashierDetail'], () => {
        resolve(require('view/reportCenter/commissionCashierDetail'));
      });
    }
  },
  {
    path: '/commissionDetailStore',
    meta: {
      power: 'commissionDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/commissionDetailStore'], () => {
        resolve(require('view/reportCenter/commissionDetailStore'));
      });
    }
  },
  {
    path: '/commissionDetailHosp',
    meta: {
      power: 'commissionDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/commissionDetailHosp'], () => {
        resolve(require('view/reportCenter/commissionDetailHosp'));
      });
    }
  },
  {
    path: '/complainDetail',
    meta: {
      power: 'complainDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/complainDetail'], () => {
        resolve(require('view/reportCenter/complainDetail'));
      });
    }
  },
  {
    path: '/hospitalComplainDetail',
    meta: {
      power: 'hospitalComplainDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalComplainDetail'], () => {
        resolve(require('view/reportCenter/hospitalComplainDetail'));
      });
    }
  },
  {
    path: '/userComplainDetail',
    meta: {
      power: 'userComplainDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/userComplainDetail'], () => {
        resolve(require('view/reportCenter/userComplainDetail'));
      });
    }
  },
  {
    path: '/cashierDateStat',
    meta: {
      power: 'cashierDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/cashierDateStat'], () => {
        resolve(require('view/reportCenter/cashierDateStat'));
      });
    }
  },
  {
    path: '/hospitalCashierDateStat',
    meta: {
      power: 'hospitalCashierDateStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalCashierDateStat'], () => {
        resolve(require('view/reportCenter/hospitalCashierDateStat'));
      });
    }
  },
  {
    path: '/hospitalItemOrderAmountStat',
    meta: {
      power: 'hospitalItemOrderAmountStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalItemOrderAmountStat'], () => {
        resolve(require('view/reportCenter/hospitalItemOrderAmountStat'));
      });
    }
  },
  {
    path: '/itemOrderAmountStat',
    meta: {
      power: 'itemOrderAmountStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/itemOrderAmountStat'], () => {
        resolve(require('view/reportCenter/itemOrderAmountStat'));
      });
    }
  },
  {
    path: '/itemCashierStat',
    meta: {
      power: 'itemCashierStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/itemCashierStat'], () => {
        resolve(require('view/reportCenter/itemCashierStat'));
      });
    }
  },
  {
    path: '/hospitalItemCashierStat',
    meta: {
      power: 'hospitalItemCashierStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalItemCashierStat'], () => {
        resolve(require('view/reportCenter/hospitalItemCashierStat'));
      });
    }
  },
  {
    path: '/restOrderDetailDetail',
    meta: {
      power: 'restOrderDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/restOrderDetailDetail'], () => {
        resolve(require('view/reportCenter/restOrderDetailDetail'));
      });
    }
  },
  {
    path: '/hospitalRestOrderDetailDetail',
    meta: {
      power: 'hospitalRestOrderDetailDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalRestOrderDetailDetail'], () => {
        resolve(require('view/reportCenter/hospitalRestOrderDetailDetail'));
      });
    }
  },
  {
    path: '/hospitalUseDetail',
    meta: {
      power: 'hospitalUseDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalUseDetail'], () => {
        resolve(require('view/reportCenter/hospitalUseDetail'));
      });
    }
  },
  {
    path: '/hospitalPurchaseDetail',
    meta: {
      power: 'hospitalPurchaseDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalPurchaseDetail'], () => {
        resolve(require('view/reportCenter/hospitalPurchaseDetail'));
      });
    }
  },
  {
    path: '/hospitalOperationStockOutDetail',
    meta: {
      power: 'hospitalOperationStockOutDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalOperationStockOutDetail'], () => {
        resolve(require('view/reportCenter/hospitalOperationStockOutDetail'));
      });
    }
  },
  {
    path: '/hospitalStockInDetail',
    meta: {
      power: 'hospitalStockInDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStockInDetail'], () => {
        resolve(require('view/reportCenter/hospitalStockInDetail'));
      });
    }
  },
  {
    path: '/hospitalStockOutDetail',
    meta: {
      power: 'hospitalStockOutDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStockOutDetail'], () => {
        resolve(require('view/reportCenter/hospitalStockOutDetail'));
      });
    }
  },
  {
    path: '/hospitalStockChangeDetail',
    meta: {
      power: 'hospitalStockChangeDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStockChangeDetail'], () => {
        resolve(require('view/reportCenter/hospitalStockChangeDetail'));
      });
    }
  },
  {
    path: '/hospitalStockChangeStat',
    meta: {
      power: 'hospitalStockChangeStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStockChangeStat'], () => {
        resolve(require('view/reportCenter/hospitalStockChangeStat'));
      });
    }
  },
  {
    path: '/hospitalStockChangeTypeStat',
    meta: {
      power: 'hospitalStockChangeTypeStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStockChangeTypeStat'], () => {
        resolve(require('view/reportCenter/hospitalStockChangeTypeStat'));
      });
    }
  },
  {
    path: '/hospitalStockChangeCategoryTypeStat',
    meta: {
      power: 'hospitalStockChangeCategoryTypeStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStockChangeCategoryTypeStat'], () => {
        resolve(require('view/reportCenter/hospitalStockChangeCategoryTypeStat'));
      });
    }
  },
  {
    path: '/stockDetail',
    meta: {
      power: 'stockDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/stockDetail'], () => {
        resolve(require('view/reportCenter/stockDetail'));
      });
    }
  },
  {
    path: '/hospitalStockDetail',
    meta: {
      power: 'hospitalStockDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalStockDetail'], () => {
        resolve(require('view/reportCenter/hospitalStockDetail'));
      });
    }
  },
  {
    path: '/managerOperationPerformanceDetail',
    meta: {
      power: 'managerOperationPerformanceDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/managerOperationPerformanceDetail'], () => {
        resolve(require('view/reportCenter/managerOperationPerformanceDetail'));
      })
    }
  },
  {
    path: '/hospitalManagerOperationPerformanceDetail',
    meta: {
      power: 'hospitalManagerOperationPerformanceDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/hospitalManagerOperationPerformanceDetail'], () => {
        resolve(require('view/reportCenter/hospitalManagerOperationPerformanceDetail'));
      })
    }
  },
  {
    path: '/deptBorrowDetail',
    meta: {
      power: 'deptBorrowDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/deptBorrowDetail'], () => {
        resolve(require('view/reportCenter/deptBorrowDetail'));
      })
    }
  },
  {
    path: '/deptReturnBorrowDetail',
    meta: {
      power: 'deptReturnBorrowDetail'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/deptReturnBorrowDetail'], () => {
        resolve(require('view/reportCenter/deptReturnBorrowDetail'));
      })
    }
  },
  {
    path: '/deptStockChangeStat',
    meta: {
      power: 'deptStockChangeStat'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/deptStockChangeStat'], () => {
        resolve(require('view/reportCenter/deptStockChangeStat'));
      })
    }
  },
  {
    path: '/weChatCommision',
    meta: {
      power: 'weChatCommision'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/weChatCommision'], () => {
        resolve(require('view/reportCenter/weChatCommision'));
      })
    }
  },
  {
    path: '/weChatCustomerCount',
    meta: {
      power: 'weChatCustomerCount'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/weChatCustomerCount'], () => {
        resolve(require('view/reportCenter/weChatCustomerCount'));
      })
    }
  },
  {
    path: '/weChatPayoff',
    meta: {
      power: 'weChatPayoff'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/weChatPayoff'], () => {
        resolve(require('view/reportCenter/weChatPayoff'));
      })
    }
  },
  {
    path: '/distributorIncomeExpenditure',
    meta: {
      power: 'distributorIncomeExpenditure'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/distributorIncomeExpenditure'], () => {
        resolve(require('view/reportCenter/distributorIncomeExpenditure'));
      })
    }
  },
  {
    path: '/distributorRechargeRecord',
    meta: {
      power: 'distributorRechargeRecord'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/distributorRechargeRecord'], () => {
        resolve(require('view/reportCenter/distributorRechargeRecord'));
      })
    }
  },
  {
    path: '/distributorCusRebateRecord',
    meta: {
      power: 'distributorCusRebateRecord'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/distributorCusRebateRecord'], () => {
        resolve(require('view/reportCenter/distributorCusRebateRecord'));
      })
    }
  },
  {
    path: '/distributorRechargeRebateRecord',
    meta: {
      power: 'distributorRechargeRebateRecord'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/distributorRechargeRebateRecord'], () => {
        resolve(require('view/reportCenter/distributorRechargeRebateRecord'));
      })
    }
  },
  {
    path: '/distributorPutForwardRecord',
    meta: {
      power: 'distributorPutForwardRecord'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/distributorPutForwardRecord'], () => {
        resolve(require('view/reportCenter/distributorPutForwardRecord'));
      })
    }
  },
  {
    path: '/distributorBalanceRecord',
    meta: {
      power: 'distributorBalanceRecord'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/distributorBalanceRecord'], () => {
        resolve(require('view/reportCenter/distributorBalanceRecord'));
      })
    }
  },
  {
    path: '/distributorInfoRecord',
    meta: {
      power: 'distributorInfoRecord'
    },
    component(resolve) {
      require.ensure(['view/reportCenter/distributorInfoRecord'], () => {
        resolve(require('view/reportCenter/distributorInfoRecord'));
      })
    }
  },
]
