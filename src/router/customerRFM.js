/* 
* @Author: Moriarty
* 顾客运营路由
*/

export default [
    {
        path: '/customerRFM',
        meta: {keepAlive: true, power: 'customerRFM'},
        component(resolve) {
            require.ensure(['view/customerRFM/customerRFM'], () => {
                resolve(require('view/customerRFM/customerRFM'));
            });
        }
    },
    {
        path: '/sliderRFM',
        meta: {power: 'sliderRFM'},
        component(resolve) {
            require.ensure(['view/customerRFM/sliderRFM'], () => {
                resolve(require('view/customerRFM/sliderRFM'));
            });
        }
    },
    {
        path: '/dealBusiness',
        meta: {power: 'dealBusiness'},
        component(resolve) {
            require.ensure(['view/customerRFM/dealSettingFile/dealBusiness'], () => {
                resolve(require('view/customerRFM/dealSettingFile/dealBusiness'));
            });
        }
    },
    {
        path: '/outpatientBusiness',
        meta: {power: 'dealBusiness'},
        component(resolve) {
            require.ensure(['view/customerRFM/dealSettingFile/outpatientBusiness'], () => {
                resolve(require('view/customerRFM/dealSettingFile/outpatientBusiness'));
            });
        }
    },
    {
        path: '/performanceSet',
        meta: {power: 'dealBusiness'},
        component(resolve) {
            require.ensure(['view/customerRFM/dealSettingFile/performanceSet'], () => {
                resolve(require('view/customerRFM/dealSettingFile/performanceSet'));
            });
        }
    },
    {
        path: '/intentionSet',
        meta: {power: 'dealBusiness'},
        component(resolve) {
            require.ensure(['view/customerRFM/dealSettingFile/intentionSet'], () => {
                resolve(require('view/customerRFM/dealSettingFile/intentionSet'));
            });
        }
    },
    {
        path: '/intentionDistinguish',
        meta: {keepAlive: true, power: 'dealBusiness'},
        component(resolve) {
            require.ensure(['view/customerRFM/dealSettingFile/intentionDistinguish'], () => {
                resolve(require('view/customerRFM/dealSettingFile/intentionDistinguish'));
            });
        }
    },
    {
        path: '/itemCheckSymptom',
        meta: {power: 'dealBusiness'},
        component(resolve) {
            require.ensure(['view/customerRFM/dealSettingFile/itemCheckSymptom'], () => {
                resolve(require('view/customerRFM/dealSettingFile/itemCheckSymptom'));
            });
        }
    },
    {
        path: '/itemCheckCharge',
        meta: {power: 'dealBusiness'},
        component(resolve) {
            require.ensure(['view/customerRFM/dealSettingFile/itemCheckCharge'], () => {
                resolve(require('view/customerRFM/dealSettingFile/itemCheckCharge'));
            });
        }
    },
    {
        path: '/customerFilter',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilter'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilter'));
            });
        }
    },
    {
        path: '/combineInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/combineInfo'], () => {
                resolve(require('view/customerRFM/filterFile/combineInfo'));
            });
        }
    },
    {
        path: '/customerFilterRecord',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterRecord'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterRecord'));
            });
        }
    },
    {
        path: '/customerFilterPower',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterPower'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterPower'));
            });
        }
    },
    {
        path: '/customerFilterBasicInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterBasicInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterBasicInfo'));
            });
        }
    },
    {
        path: '/customerFilterAccountInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterAccountInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterAccountInfo'));
            });
        }
    },
    {
        path: '/customerFilterVisitInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterVisitInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterVisitInfo'));
            });
        }
    },
    {
        path: '/customerFilterOrderInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterOrderInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterOrderInfo'));
            });
        }
    },
    {
        path: '/customerFilterConsultInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterConsultInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterConsultInfo'));
            });
        }
    },
    {
        path: '/customerFilterOperationInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterOperationInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterOperationInfo'));
            });
        }
    },
    {
        path: '/customerFilterMemberInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterMemberInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterMemberInfo'));
            });
        }
    },
    {
        path: '/customerFilterFailtureInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterFailtureInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterFailtureInfo'));
            });
        }
    },
    {
        path: '/customerFilterTagInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterTagInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterTagInfo'));
            });
        }
    },
    {
        path: '/customerFilterCallbackInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterCallbackInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterCallbackInfo'));
            });
        }
    },
    {
        path: '/customerFilterNoCallbackInfo',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterNoCallbackInfo'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterNoCallbackInfo'));
            });
        }
    },
    {
        path: '/customerFilterLastDeal',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/customerFilterLastDeal'], () => {
                resolve(require('view/customerRFM/filterFile/customerFilterLastDeal'));
            });
        }
    },
    {
        path: '/basicEdit',
        meta: {power: 'customerFilter'},
        component(resolve) {
            require.ensure(['view/customerRFM/filterFile/basicEdit'], () => {
                resolve(require('view/customerRFM/filterFile/basicEdit'));
            });
        }
    },
    {
        path: '/customerGroup',
        meta: {power: 'customerGroup'},
        component(resolve) {
            require.ensure(['view/customerRFM/customerGroup'], () => {
                resolve(require('view/customerRFM/customerGroup'));
            });
        }
    },
    {
        path: '/customerGroupManagement',
        meta: {power: 'customerGroup'},
        component(resolve) {
            require.ensure(['view/customerRFM/customerGroupManagement'], () => {
                resolve(require('view/customerRFM/customerGroupManagement'));
            });
        }
    },
]