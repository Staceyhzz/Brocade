/* 
* @Author: Moriarty
* 系统设置路由
*/

export default [
    //医院业务
    {
        path: '/onlineDesk',
        meta: {power: 'onlineDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/onlineDesk'], () => {
                resolve(require('view/hospitalBusiness/onlineDesk'));
            });
        }
    },
    {
        path: '/onlineAddNew',
        meta: {power: 'onlineDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/addNew'], () => {
                resolve(require('view/hospitalBusiness/addNew'));
            });
        }
    },
    {
        path: '/callbackDesk',
        meta: {power: 'callbackDesk', keepAlive: true},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/callBackFile/callbackDesk'], () => {
                resolve(require('view/hospitalBusiness/callBackFile/callbackDesk'));
            });
        }
    },
    {
        path: '/callbackTaskBulk',
        meta: {power: 'callbackDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/callBackFile/callbackTaskBulk'], () => {
                resolve(require('view/hospitalBusiness/callBackFile/callbackTaskBulk'));
            });
        }
    },
    {
        path: '/callbackDeskInfo',
        meta: {power: 'callbackDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/callBackFile/callbackDeskInfo'], () => {
                resolve(require('view/hospitalBusiness/callBackFile/callbackDeskInfo'));
            });
        }
    },
    {
        path: '/frontDesk',
        meta: {power: 'frontDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/frontDesk'], () => {
                resolve(require('view/hospitalBusiness/frontDesk'));
            });
        }
    },
    {
        path: '/addNew',
        meta: {power: 'frontDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/addNew'], () => {
                resolve(require('view/hospitalBusiness/addNew'));
            });
        }
    },
    {
        path: '/triage',
        meta: {power: 'frontDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/triage'], () => {
                resolve(require('view/hospitalBusiness/triage'));
            });
        }
    },
    {
        path: '/deskTriage',
        meta: {power: 'triageDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/triage'], () => {
                resolve(require('view/hospitalBusiness/triage'));
            });
        }
    },
    {
        path: '/liveDesk',
        meta: {power: 'liveDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/liveDeskFile/liveDesk'], () => {
                resolve(require('view/hospitalBusiness/liveDeskFile/liveDesk'));
            });
        },
        children: [
            {
                path: '',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskBasicInfo'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskBasicInfo'));
                    });
                }
            },
            {
                path: '/liveDeskBasicInfo',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskBasicInfo'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskBasicInfo'));
                    });
                }
            },
            {
                path: '/liveDeskConsult',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskConsult'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskConsult'));
                    });
                }
            },
            {
                path: '/liveDeskFailture',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskFailture'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskFailture'));
                    });
                }
            },
            {
                path: '/liveDeskOrderDetail',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskOrderDetail'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskOrderDetail'));
                    });
                }
            },
            {
                path: '/liveDeskOperation',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskOperation'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskOperation'));
                    });
                }
            },
            {
                path: '/liveDeskCallback',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskCallback'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskCallback'));
                    });
                }
            },
            {
                path: '/liveDeskAccount',
                component(resolve) {
                    require.ensure(['view/hospitalBusiness/liveDeskFile/liveDeskAccount'], () => {
                        resolve(require('view/hospitalBusiness/liveDeskFile/liveDeskAccount'));
                    });
                }
            },
        ],
    },
    {
        path: '/appointmentToday',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentToday'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentToday'));
            });
        }
    },
    {
        path: '/appointmentTreat',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentTreat'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentTreat'));
            });
        }
    },
    {
        path: '/appointmentTreatUser',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentTreatUser'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentTreatUser'));
            });
        }
    },
    {
        path: '/treatSchedulerAdd',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/treatSchedulerAdd'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/treatSchedulerAdd'));
            });
        }
    }, 
    {
        path: '/treatSchedulerUpdate',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/treatSchedulerUpdate'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/treatSchedulerUpdate'));
            });
        }
    },   
    {
        path: '/appointmentSurgery',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentSurgery'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentSurgery'));
            });
        }
    },
    {
        path: '/appointmentSurgeryUser',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentSurgeryUser'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentSurgeryUser'));
            });
        }
    },
    {
        path: '/appointmentSurgeryAdd',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentSurgeryAdd'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentSurgeryAdd'));
            });
        }
    },
    {
        path: '/appointmentSurgeryUpdate',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentSurgeryUpdate'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentSurgeryUpdate'));
            });
        }
    },
    {
        path: '/appointmentConsult',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentConsult'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentConsult'));
            });
        }
    },
    {
        path: '/appointmentConsultUser',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentConsultUser'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentConsultUser'));
            });
        }
    },
    {
        path: '/appointmentConsultAdd',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentConsultAdd'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentConsultAdd'));
            });
        }
    },
    {
        path: '/appointmentConsultUpdate',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentConsultUpdate'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentConsultUpdate'));
            });
        }
    },
    {
        path: '/appointmentCancel',
        meta: {power: 'appointmentToday'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/appointmentFile/appointmentCancel'], () => {
                resolve(require('view/hospitalBusiness/appointmentFile/appointmentCancel'));
            });
        }
    },
    {
        path: '/chargePriceList',
        meta: {power: 'chargePriceList'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/chargePriceList'], () => {
                resolve(require('view/hospitalBusiness/chargePriceList'));
            });
        }
    },
    {
        path: '/customerDirection',
        meta: {power: 'customerDirection'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/customerDirection'], () => {
                resolve(require('view/hospitalBusiness/customerDirection'));
            });
        }
    },
    {
        path: '/cashierDesk',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/cashierDesk'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/cashierDesk'));
            });
        }
    },
    {
        path: '/cashierDepositOrder',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/cashierDepositOrder'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/cashierDepositOrder'));
            });
        }
    },
    {
        path: '/channelRecharge',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/channelRecharge'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/channelRecharge'));
            });
        }
    },
    {
        path: '/cashierOrder',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/cashierOrder'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/cashierOrder'));
            });
        }
    },
    {
        path: '/cashierBackOrder',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/cashierBackOrder'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/cashierBackOrder'));
            });
        }
    },
    {
        path: '/cashierDepositRebateOrder',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/cashierDepositRebateOrder'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/cashierDepositRebateOrder'));
            });
        }
    },
    {
        path: '/billAdd',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/billAdd'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/billAdd'));
            });
        }
    },
    {
        path: '/settlementList',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/settlementList'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/settlementList'));
            });
        }
    },
    {
        path: '/cashierList',
        meta: {power: 'cashierDesk', keepAlive: true},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/cashierList'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/cashierList'));
            });
        }
    },
    {
        path: '/debtOrder',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/debtOrder'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/debtOrder'));
            });
        }
    },
    {
        path: '/repayment',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/repayment'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/repayment'));
            });
        }
    },
    {
        path: '/cashierRepayment',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/cashierRepayment'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/cashierRepayment'));
            });
        }
    },
    {
        path: '/addSettlement',
        meta: {power: 'cashierDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/cashierDeskFile/addSettlement'], () => {
                resolve(require('view/hospitalBusiness/cashierDeskFile/addSettlement'));
            });
        }
    },
    {
        path: '/deptDesk',
        meta: {power: 'deptDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptDeskFile/deptDesk'], () => {
                resolve(require('view/hospitalBusiness/deptDeskFile/deptDesk'));
            });
        }
    },
    {
        path: '/deptDeskOperationAdd',
        meta: {power: 'deptDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptDeskFile/deptDeskOperationAdd'], () => {
                resolve(require('view/hospitalBusiness/deptDeskFile/deptDeskOperationAdd'));
            });
        }
    },
    {
        path: '/deptDeskTriage',
        meta: {power: 'deptDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptDeskFile/deptDeskTriage'], () => {
                resolve(require('view/hospitalBusiness/deptDeskFile/deptDeskTriage'));
            });
        }
    },
    {
        path: '/deptDeskOperationUpdate',
        meta: {power: 'deptDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptDeskFile/deptDeskOperationUpdate'], () => {
                resolve(require('view/hospitalBusiness/deptDeskFile/deptDeskOperationUpdate'));
            });
        }
    },
    {
        path: '/operationProduct',
        meta: {power: 'deptDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptDeskFile/operationProduct'], () => {
                resolve(require('view/hospitalBusiness/deptDeskFile/operationProduct'));
            });
        }
    },
    {
        path: '/deptBorrow',
        meta: {power: 'deptBorrow'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptBorrowFile/deptBorrow'], () => {
                resolve(require('view/hospitalBusiness/deptBorrowFile/deptBorrow'));
            });
        }
    },
    {
        path: '/deptBorrowAdd',
        meta: {power: 'deptBorrow'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptBorrowFile/deptBorrowAdd'], () => {
                resolve(require('view/hospitalBusiness/deptBorrowFile/deptBorrowAdd'));
            });
        }
    },
    {
        path: '/deptBorrowView',
        meta: {power: 'deptBorrow'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptBorrowFile/deptBorrowView'], () => {
                resolve(require('view/hospitalBusiness/deptBorrowFile/deptBorrowView'));
            });
        }
    },
    {
        path: '/deptBorrowChange',
        meta: {power: 'deptBorrow'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/deptBorrowFile/deptBorrowChange'], () => {
                resolve(require('view/hospitalBusiness/deptBorrowFile/deptBorrowChange'));
            });
        }
    },
    {
        path: '/bed',
        meta: {power: 'bed'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/bed'], () => {
                resolve(require('view/hospitalBusiness/bed'));
            });
        }
    },
    {
        path: '/inpatientDesk',
        meta: {power: 'inpatientDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/inpatientDesk'], () => {
                resolve(require('view/hospitalBusiness/inpatientDesk'));
            });
        }
    },
    {
        path: '/surgeryDesk',
        meta: {power: 'surgeryDesk'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/surgeryDesk'], () => {
                resolve(require('view/hospitalBusiness/surgeryDesk'));
            });
        }
    },      
    {
        path: '/activity',
        meta: {power: 'activity'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/activityFile/activity'], () => {
                resolve(require('view/hospitalBusiness/activityFile/activity'));
            });
        }
    },
    {
        path: '/activityEdit',
        meta: {power: 'activity'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/activityFile/activityEdit'], () => {
                resolve(require('view/hospitalBusiness/activityFile/activityEdit'));
            });
        }
    },
    {
        path: '/activityRecord',
        meta: {power: 'activity'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/activityFile/activityRecord'], () => {
                resolve(require('view/hospitalBusiness/activityFile/activityRecord'));
            });
        }
    },
    {
        path: '/smsTemplate',
        meta: {power: 'smsTemplate'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/smsFile/smsTemplate'], () => {
                resolve(require('view/hospitalBusiness/smsFile/smsTemplate'));
            });
        }
    },
    {
        path: '/smsGroup',
        meta: {power: 'smsGroup'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/smsFile/smsGroup'], () => {
                resolve(require('view/hospitalBusiness/smsFile/smsGroup'));
            });
        }
    },
    {
        path: '/smsGroupAdd',
        meta: {power: 'smsGroup'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/smsFile/smsGroupAdd'], () => {
                resolve(require('view/hospitalBusiness/smsFile/smsGroupAdd'));
            });
        }
    },
    {
        path: '/smsGroupRecord',
        meta: {power: 'smsGroup'},
        component(resolve) {
            require.ensure(['view/hospitalBusiness/smsFile/smsGroupRecord'], () => {
                resolve(require('view/hospitalBusiness/smsFile/smsGroupRecord'));
            });
        }
    },

]
