/* 
* 新报表
*/

export default [
  // {
  //   path: '/reportRecord',
  //   meta: {power: ''},
  //   component(resolve) {
  //     require.ensure(['view/reportRecord/reportRecord'], () => {
  //       resolve(require('view/reportRecord/reportRecord'));
  //     });
  //   }
  // },
  {
    path: '/lostTreatmentRecord',
    meta: {power: 'lostTreatmentRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/lostTreatmentRecord'], () => {
        resolve(require('view/reportRecord/lostTreatmentRecord'));
      });
    }
  },
  {
    path: '/lostTreatmentCount',
    meta: {power: 'lostTreatmentCount'},
    component(resolve) {
      require.ensure(['view/reportRecord/lostTreatmentCount'], () => {
        resolve(require('view/reportRecord/lostTreatmentCount'));
      });
    }
  },
  {
    path: '/cusRepaymentRecord',
    meta: {power: 'cusRepaymentRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/cusRepaymentRecord'], () => {
        resolve(require('view/reportRecord/cusRepaymentRecord'));
      });
    }
  },
  {
    path: '/treatPostServiceRecord',
    meta: {power: 'treatPostServiceRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/treatPostServiceRecord'], () => {
        resolve(require('view/reportRecord/treatPostServiceRecord'));
      });
    }
  },
  {
    path: '/appointmentRecord',
    meta: {power: 'appointmentRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/appointmentRecord'], () => {
        resolve(require('view/reportRecord/appointmentRecord'));
      });
    }
  },
  {
    path: '/cusAgeRecord',
    meta: {power: 'cusAgeRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/cusAgeRecord'], () => {
        resolve(require('view/reportRecord/cusAgeRecord'));
      });
    }
  },
  {
    path: '/registerRecord',
    meta: {power: 'registerRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/registerRecord'], () => {
        resolve(require('view/reportRecord/registerRecord'));
      });
    }
  },
  {
    path: '/cusDebtRecord',
    meta: {power: 'cusDebtRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/cusDebtRecord'], () => {
        resolve(require('view/reportRecord/cusDebtRecord'));
      });
    }
  },
  {
    path: '/pointChangeRecord',
    meta: {power: 'pointChangeRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/pointChangeRecord'], () => {
        resolve(require('view/reportRecord/pointChangeRecord'));
      });
    }
  },
  {
    path: '/accountRechargeRecord',
    meta: {power: 'accountRechargeRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/accountRechargeRecord'], () => {
        resolve(require('view/reportRecord/accountRechargeRecord'));
      });
    }
  },
  {
    path: '/accountBalanceCount',
    meta: {power: 'accountBalanceCount'},
    component(resolve) {
      require.ensure(['view/reportRecord/accountBalanceCount'], () => {
        resolve(require('view/reportRecord/accountBalanceCount'));
      });
    }
  },
  {
    path: '/accountBalanceRecord',
    meta: {power: 'accountBalanceRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/accountBalanceRecord'], () => {
        resolve(require('view/reportRecord/accountBalanceRecord'));
      });
    }
  },
  {
    path: '/couponChangeRecord',
    meta: {power: 'couponChangeRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/couponChangeRecord'], () => {
        resolve(require('view/reportRecord/couponChangeRecord'));
      });
    }
  },
  {
    path: '/addNewCusRecord',
    meta: {power: 'addNewCusRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/addNewCusRecord'], () => {
        resolve(require('view/reportRecord/addNewCusRecord'));
      });
    }
  },
  {
    path: '/orderRecord',
    meta: {power: 'orderRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/orderRecord'], () => {
        resolve(require('view/reportRecord/orderRecord'));
      });
    }
  },
  {
    path: '/backOrderRecord',
    meta: {power: 'backOrderRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/backOrderRecord'], () => {
        resolve(require('view/reportRecord/backOrderRecord'));
      });
    }
  },
  {
    path: '/callBackRecord',
    meta: {power: 'callBackRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/callBackRecord'], () => {
        resolve(require('view/reportRecord/callBackRecord'));
      });
    }
  },
  {
    path: '/questionnaireRecord',
    meta: {power: 'questionnaireRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/questionnaireRecord'], () => {
        resolve(require('view/reportRecord/questionnaireRecord'));
      });
    }
  },
  {
    path: '/consultRecord',
    meta: {power: 'consultRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/consultRecord'], () => {
        resolve(require('view/reportRecord/consultRecord'));
      });
    }
  },
  {
    path: '/cusAddressRecord',
    meta: {power: 'cusAddressRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/cusAddressRecord'], () => {
        resolve(require('view/reportRecord/cusAddressRecord'));
      });
    }
  },
  {
    path: '/consultVisitedRecord',
    meta: {power: 'consultVisitedRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/consultVisitedRecord'], () => {
        resolve(require('view/reportRecord/consultVisitedRecord'));
      });
    }
  },
  {
    path: '/developmentPerformanceRecord',
    meta: {power: 'developmentPerformanceRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/developmentPerformanceRecord'], () => {
        resolve(require('view/reportRecord/developmentPerformanceRecord'));
      });
    }
  },
  {
    path: '/visitedRecord',
    meta: {power: 'visitedRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/visitedRecord'], () => {
        resolve(require('view/reportRecord/visitedRecord'));
      });
    }
  },
  {
    path: '/visitedCount',
    meta: {power: 'visitedCount'},
    component(resolve) {
      require.ensure(['view/reportRecord/visitedCount'], () => {
        resolve(require('view/reportRecord/visitedCount'));
      });
    }
  },
  {
    path: '/consumerRecord',
    meta: {power: 'consumerRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/consumerRecord'], () => {
        resolve(require('view/reportRecord/consumerRecord'));
      });
    }
  },
  {
    path: '/cusConsultationRecord',
    meta: {power: 'cusConsultationRecord'},
    component(resolve) {
      require.ensure(['view/reportRecord/cusConsultationRecord'], () => {
        resolve(require('view/reportRecord/cusConsultationRecord'));
      });
    }
  },
  {
    path: '/outpatientReceptionCount',
    meta: {power: 'outpatientReceptionCount'},
    component(resolve) {
      require.ensure(['view/reportRecord/outpatientReceptionCount'], () => {
        resolve(require('view/reportRecord/outpatientReceptionCount'));
      });
    }
  },
]