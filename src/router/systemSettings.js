/* 
* @Author: Moriarty
* 系统设置路由
*/
export default [
    {
        path: '/hospital',
        meta: {power: 'hospital'},
        component(resolve) {
            require.ensure(['view/systemSet/hospital'], () => {
                resolve(require('view/systemSet/hospital'));
            });
        }
    },
    {
        path: '/dept',
        meta: {power: 'dept'},
        component(resolve) {
            require.ensure(['view/systemSet/dept'], () => {
                resolve(require('view/systemSet/dept'));
            });
        }
    },
    {
        path: '/user',
        meta: {power: 'user'},
        component(resolve) {
            require.ensure(['view/systemSet/userSetFile/user'], () => {
                resolve(require('view/systemSet/userSetFile/user'));
            });
        }
    },
    {
        path: '/userSetting',
        meta: {power: 'user'},
        component(resolve) {
            require.ensure(['view/systemSet/userSetFile/userSetting'], () => {
                resolve(require('view/systemSet/userSetFile/userSetting'));
            });
        }
    },
    {
        path: '/userCheck',
        meta: {power: 'user'},
        component(resolve) {
            require.ensure(['view/systemSet/userSetFile/userCheck'], () => {
                resolve(require('view/systemSet/userSetFile/userCheck'));
            });
        }
    },
    {
        path: '/userPower',
        meta: {power: 'user'},
        component(resolve) {
            require.ensure(['view/systemSet/userSetFile/userPower'], () => {
                resolve(require('view/systemSet/userSetFile/userPower'));
            });
        }
    },
    {
        path: '/userAuthCustom',
        meta: {power: 'userAuthCustom'},
        component(resolve) {
            require.ensure(['view/systemSet/userAuthFile/userAuthCustom'], () => {
                resolve(require('view/systemSet/userAuthFile/userAuthCustom'));
            });
        }
    },
    {
        path: '/userAuthCustomSet',
        meta: {power: 'userAuthCustom'},
        component(resolve) {
            require.ensure(['view/systemSet/userAuthFile/userAuthCustomSet'], () => {
                resolve(require('view/systemSet/userAuthFile/userAuthCustomSet'));
            });
        }
    },
    {
        path: '/userUpdateMenu',
        meta: {power: 'userAuthCustom'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateMenu'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateMenu'));
            });
        }
    },
    {
        path: '/userUpdateReport',
        meta: {power: 'userAuthCustom'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateReport'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateReport'));
            });
        }
    },
    {
        path: '/userUpdateAuthCode',
        meta: {power: 'userAuthCustom'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateAuthCode'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateAuthCode'));
            });
        }
    },
    {
        path: '/userUpdateCusMenu',
        meta: {power: 'userAuthCustom'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateCusMenu'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateCusMenu'));
            });
        }
    },
    {
        path: '/userUpdatePriceMenu',
        meta: {power: 'userAuthCustom'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updatePriceMenu'], () => {
                resolve(require('view/systemSet/updatePowerFile/updatePriceMenu'));
            });
        }
    },
    {
        path: '/role',
        meta: {power: 'role'},
        component(resolve) {
            require.ensure(['view/systemSet/roleSetFile/role'], () => {
                resolve(require('view/systemSet/roleSetFile/role'));
            });
        }
    },
    {
        path: '/roleSet',
        meta: {power: 'role'},
        component(resolve) {
            require.ensure(['view/systemSet/roleSetFile/roleSet'], () => {
                resolve(require('view/systemSet/roleSetFile/roleSet'));
            });
        }
    },
    {
        path: '/updateMenu',
        meta: {power: 'role'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateMenu'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateMenu'));
            });
        }
    },
    {
        path: '/updateReport',
        meta: {power: 'role'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateReport'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateReport'));
            });
        }
    },
    {
        path: '/updateAuthCode',
        meta: {power: 'role'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateAuthCode'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateAuthCode'));
            });
        }
    },
    {
        path: '/updateCusMenu',
        meta: {power: 'role'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updateCusMenu'], () => {
                resolve(require('view/systemSet/updatePowerFile/updateCusMenu'));
            });
        }
    },
    {
        path: '/updatePriceMenu',
        meta: {power: 'role'},
        component(resolve) {
            require.ensure(['view/systemSet/updatePowerFile/updatePriceMenu'], () => {
                resolve(require('view/systemSet/updatePowerFile/updatePriceMenu'));
            });
        }
    },
    {
        path: '/option',
        meta: {power: 'option'},
        component(resolve) {
            require.ensure(['view/systemSet/option'], () => {
                resolve(require('view/systemSet/option'));
            });
        }
    },
    {
        path: '/log',
        meta: {power: 'log'},
        component(resolve) {
            require.ensure(['view/systemSet/log'], () => {
                resolve(require('view/systemSet/log'));
            });
        }
    },
    {
        path: '/setBooks',
        meta: {power: 'setBooks'},
        component(resolve) {
            require.ensure(['view/systemSet/setBooksFile/setBooks'], () => {
                resolve(require('view/systemSet/setBooksFile/setBooks'));
            });
        }
    },
    {
        path: '/setBooksIndex',
        meta: {power: 'setBooks'},
        component(resolve) {
            require.ensure(['view/systemSet/setBooksFile/setBooksIndex'], () => {
                resolve(require('view/systemSet/setBooksFile/setBooksIndex'));
            });
        }
    },
    {
        path: '/setBooksIndexAdd',
        meta: {power: 'setBooks'},
        component(resolve) {
            require.ensure(['view/systemSet/setBooksFile/setBooksIndexAdd'], () => {
                resolve(require('view/systemSet/setBooksFile/setBooksIndexAdd'));
            });
        }
    },
    {
        path: '/depositCharge',
        meta: {power: 'depositCharge'},
        component(resolve) {
            require.ensure(['view/systemSet/depositCharge'], () => {
                resolve(require('view/systemSet/depositCharge'));
            });
        }
    },
    {
        path: '/depositChargeEdit',
        meta: {power: 'depositCharge'},
        component(resolve) {
            require.ensure(['view/systemSet/depositChargeEdit'], () => {
                resolve(require('view/systemSet/depositChargeEdit'));
            });
        }
    },
    {
        path: '/couponCategory',
        meta: {power: 'couponCategory'},
        component(resolve) {
            require.ensure(['view/systemSet/couponCategory'], () => {
                resolve(require('view/systemSet/couponCategory'));
            });
        }
    },
    {
        path: '/couponCategoryEdit',
        meta: {power: 'couponCategory'},
        component(resolve) {
            require.ensure(['view/systemSet/couponCategoryEdit'], () => {
                resolve(require('view/systemSet/couponCategoryEdit'));
            });
        }
    },
    {
        path: '/chargeCategory',
        meta: {power: 'chargeCategory'},
        component(resolve) {
            require.ensure(['view/systemSet/chargeFile/chargeCategory'], () => {
                resolve(require('view/systemSet/chargeFile/chargeCategory'));
            });
        }
    },
    {
        path: '/charge',
        meta: {power: 'charge', keepAlive: true},
        component(resolve) {
            require.ensure(['view/systemSet/chargeFile/charge'], () => {
                resolve(require('view/systemSet/chargeFile/charge'));
            });
        }
    },
    {
        path: '/chargeEdit',
        meta: {power: 'charge'},
        component(resolve) {
            require.ensure(['view/systemSet/chargeFile/chargeEdit'], () => {
                resolve(require('view/systemSet/chargeFile/chargeEdit'));
            });
        }
    },
    {
        path: '/chargeMedicinalSet',
        meta: {power: 'charge'},
        component(resolve) {
            require.ensure(['view/systemSet/chargeFile/chargeMedicinalSet'], () => {
                resolve(require('view/systemSet/chargeFile/chargeMedicinalSet'));
            });
        }
    },
    {
        path: '/chargeSet',
        meta: {power: 'chargeSet'},
        component(resolve) {
            require.ensure(['view/systemSet/chargeFile/chargeSet'], () => {
                resolve(require('view/systemSet/chargeFile/chargeSet'));
            });
        }
    },
    {
        path: '/chargeSetEdit',
        meta: {power: 'chargeSet'},
        component(resolve) {
            require.ensure(['view/systemSet/chargeFile/chargeSetEdit'], () => {
                resolve(require('view/systemSet/chargeFile/chargeSetEdit'));
            });
        }
    },
    {
        path: '/productQuality',
        meta: {power: 'productQuality'},
        component(resolve) {
            require.ensure(['view/systemSet/productFile/productQuality'], () => {
                resolve(require('view/systemSet/productFile/productQuality'));
            });
        }
    },
    {
        path: '/productCategory',
        meta: {power: 'productCategory'},
        component(resolve) {
            require.ensure(['view/systemSet/productFile/productCategory'], () => {
                resolve(require('view/systemSet/productFile/productCategory'));
            });
        }
    },
    {
        path: '/product',
        meta: {power: 'product', keepAlive: true},
        component(resolve) {
            require.ensure(['view/systemSet/productFile/product'], () => {
                resolve(require('view/systemSet/productFile/product'));
            });
        }
    },
    {
        path: '/productEdit',
        meta: {power: 'product'},
        component(resolve) {
            require.ensure(['view/systemSet/productFile/productEdit'], () => {
                resolve(require('view/systemSet/productFile/productEdit'));
            });
        }
    },
    {
        path: '/equity',
        meta: {power: 'equity'},
        component(resolve) {
            require.ensure(['view/systemSet/equity'], () => {
                resolve(require('view/systemSet/equity'));
            });
        }
    },
    {
        path: '/memberCategory',
        meta: {power: 'memberCategory'},
        component(resolve) {
            require.ensure(['view/systemSet/memberFile/memberCategory'], () => {
                resolve(require('view/systemSet/memberFile/memberCategory'));
            });
        }
    },
    {
        path: '/memberCategoryQuitys',
        meta: {power: 'memberCategory'},
        component(resolve) {
            require.ensure(['view/systemSet/memberFile/memberCategoryQuitys'], () => {
                resolve(require('view/systemSet/memberFile/memberCategoryQuitys'));
            });
        }
    },
    {
        path: '/updateImage',
        meta: {power: 'memberCategory'},
        component(resolve) {
            require.ensure(['view/systemSet/memberFile/updateImage'], () => {
                resolve(require('view/systemSet/memberFile/updateImage'));
            });
        }
    },
    {
        path: '/chargeDiscount',
        meta: {power: 'chargeDiscount'},
        component(resolve) {
            require.ensure(['view/systemSet/chargeFile/chargeDiscount'], () => {
                resolve(require('view/systemSet/chargeFile/chargeDiscount'));
            });
        }
    },
    {
        path: '/userDiscount',
        meta: {power: 'userDiscount'},
        component(resolve) {
            require.ensure(['view/systemSet/userSetFile/userDiscount'], () => {
                resolve(require('view/systemSet/userSetFile/userDiscount'));
            });
        }
    },
    {
        path: '/print',
        meta: {power: 'print'},
        component(resolve) {
            require.ensure(['view/systemSet/printFile/print'], () => {
                resolve(require('view/systemSet/printFile/print'));
            });
        }
    },
    {
        path: '/printHospital',
        meta: {power: 'print'},
        component(resolve) {
            require.ensure(['view/systemSet/printFile/printHospital'], () => {
                resolve(require('view/systemSet/printFile/printHospital'));
            });
        }
    },
    {
        path: '/printHospitalUpdate',
        meta: {power: 'print'},
        component(resolve) {
            require.ensure(['view/systemSet/printFile/printHospitalUpdate'], () => {
                resolve(require('view/systemSet/printFile/printHospitalUpdate'));
            });
        }
    },
    {
        path: '/auditRule',
        meta: {power: 'auditRule'},
        component(resolve) {
            require.ensure(['view/systemSet/auditFile/auditRule'], () => {
                resolve(require('view/systemSet/auditFile/auditRule'));
            });
        }
    },
    {
        path: '/auditRuleHospital',
        meta: {power: 'auditRule'},
        component(resolve) {
            require.ensure(['view/systemSet/auditFile/auditRuleHospital'], () => {
                resolve(require('view/systemSet/auditFile/auditRuleHospital'));
            });
        }
    },
    {
        path: '/orderRuleAdd',
        meta: {power: 'auditRule'},
        component(resolve) {
            require.ensure(['view/systemSet/auditFile/orderRuleAdd'], () => {
                resolve(require('view/systemSet/auditFile/orderRuleAdd'));
            });
        }
    },
    {
        path: '/backRuleAdd',
        meta: {power: 'auditRule'},
        component(resolve) {
            require.ensure(['view/systemSet/auditFile/backRuleAdd'], () => {
                resolve(require('view/systemSet/auditFile/backRuleAdd'));
            });
        }
    },
    {
        path: '/backSalesRuleAdd',
        meta: {power: 'auditRule'},
        component(resolve) {
            require.ensure(['view/systemSet/auditFile/backSalesRuleAdd'], () => {
                resolve(require('view/systemSet/auditFile/backSalesRuleAdd'));
            });
        }
    },
    {
        path: '/rebateDepositRuleAdd',
        meta: {power: 'auditRule'},
        component(resolve) {
            require.ensure(['view/systemSet/auditFile/rebateDepositRuleAdd'], () => {
                resolve(require('view/systemSet/auditFile/rebateDepositRuleAdd'));
            });
        }
    },
    {
        path: '/baseRuleAdd',
        meta: {power: 'auditRule'},
        component(resolve) {
            require.ensure(['view/systemSet/auditFile/baseRuleAdd'], () => {
                resolve(require('view/systemSet/auditFile/baseRuleAdd'));
            });
        }
    },
    {
        path: '/manager',
        meta: {power: 'manager'},
        component(resolve) {
            require.ensure(['view/systemSet/managerFile/manager'], () => {
                resolve(require('view/systemSet/managerFile/manager'));
            });
        }
    },
    {
        path: '/managerHospital',
        meta: {power: 'manager'},
        component(resolve) {
            require.ensure(['view/systemSet/managerFile/managerHospital'], () => {
                resolve(require('view/systemSet/managerFile/managerHospital'));
            });
        }
    },
    {
        path: '/treatDoctor',
        meta: {power: 'treatDoctor'},
        component(resolve) {
            require.ensure(['view/systemSet/treatDoctor'], () => {
                resolve(require('view/systemSet/treatDoctor'));
            });
        }
    },
    {
        path: '/treatDoctorEdit',
        meta: {power: 'treatDoctor'},
        component(resolve) {
            require.ensure(['view/systemSet/treatDoctorEdit'], () => {
                resolve(require('view/systemSet/treatDoctorEdit'));
            });
        }
    },
    {
        path: '/consultDoctor',
        meta: {power: 'consultDoctor'},
        component(resolve) {
            require.ensure(['view/systemSet/consultDoctor'], () => {
                resolve(require('view/systemSet/consultDoctor'));
            });
        }
    },
    {
        path: '/instrument',
        meta: {power: 'instrument'},
        component(resolve) {
            require.ensure(['view/systemSet/instrument'], () => {
                resolve(require('view/systemSet/instrument'));
            });
        }
    },
    {
        path: '/appointmentCharge',
        meta: {power: 'appointmentCharge'},
        component(resolve) {
            require.ensure(['view/systemSet/appointmentCharge'], () => {
                resolve(require('view/systemSet/appointmentCharge'));
            });
        }
    },
]
