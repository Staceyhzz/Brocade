/* 
* @Author: Moriarty
* 呼叫中心路由
*/

export default [
    {
        path: '/callHospChoose',
        meta: {power: 'callHospChoose'},
        component(resolve) {
            require.ensure(['view/callCenter/callHospChoose'], () => {
                resolve(require('view/callCenter/callHospChoose'));
            });
        }
    },
    {
        path: '/callCenter',
        meta: {power: 'callHospChoose'},
        component(resolve) {
            require.ensure(['view/callCenter/callCenter'], () => {
                resolve(require('view/callCenter/callCenter'));
            });
        }
    },
    {
        path: '/callCenterEdit',
        meta: {power: 'callHospChoose'},
        component(resolve) {
            require.ensure(['view/callCenter/callCenterEdit'], () => {
                resolve(require('view/callCenter/callCenterEdit'));
            });
        }
    },
    {
        path: '/callSwitchboard',
        meta: {keepAlive: true, power: 'callHospChoose'},
        component(resolve) {
            require.ensure(['view/callCenter/callSwitchboard'], () => {
                resolve(require('view/callCenter/callSwitchboard'));
            });
        }
    },
    // {
    //     path: '/callExtension',
    //     component(resolve) {
    //         require.ensure(['view/callCenter/callExtension'], () => {
    //             resolve(require('view/callCenter/callExtension'));
    //         });
    //     }
    // },
    {
        path: '/callPattern',
        meta: {keepAlive: true, power: 'callHospChoose'},
        component(resolve) {
            require.ensure(['view/callCenter/callPattern'], () => {
                resolve(require('view/callCenter/callPattern'));
            });
        }
    },
    {
        path: '/callSetSuccess',
        meta: {power: 'callHospChoose'},
        component(resolve) {
            require.ensure(['view/callCenter/callSetSuccess'], () => {
                resolve(require('view/callCenter/callSetSuccess'));
            });
        }
    },
    {
        path: '/callCenterLog',
        meta: {keepAlive: true, power: 'callCenterLog'},
        component(resolve) {
            require.ensure(['view/callCenter/callCenterLog'], () => {
                resolve(require('view/callCenter/callCenterLog'));
            });
        }
    },
    {
        path: '/callCenterRecord',
        meta: {power: 'callCenterLog'},
        component(resolve) {
            require.ensure(['view/callCenter/callCenterRecord'], () => {
                resolve(require('view/callCenter/callCenterRecord'));
            });
        }
    },
]