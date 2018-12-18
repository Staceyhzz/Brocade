/* 
* @Author: Moriarty
* 市场渠道路由
*/

export default [
    //市场渠道
    {
        path: '/store',
        meta: {power: 'store', keepAlive: true},
        component(resolve) {
            require.ensure(['view/marketChannel/store'], () => {
                resolve(require('view/marketChannel/store'));
            });
        }
    },
    {
        path: '/storeRecord',
        meta: {power: 'store'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeRecord'], () => {
                resolve(require('view/marketChannel/storeRecord'));
            });
        },
        children: [
            {
                path: '',
                meta: {power: 'store'},
                component(resolve) {
                    require.ensure(['view/marketChannel/storeBasicInfo'], () => {
                        resolve(require('view/marketChannel/storeBasicInfo'));
                    });
                }
            },
            {
                path: '/storeBasicInfo',
                meta: {power: 'store'},
                component(resolve) {
                    require.ensure(['view/marketChannel/storeBasicInfo'], () => {
                        resolve(require('view/marketChannel/storeBasicInfo'));
                    });
                }
            },
            {
                path: '/storeCusList',
                meta: {power: 'store'},
                component(resolve) {
                    require.ensure(['view/marketChannel/storeCusList'], () => {
                        resolve(require('view/marketChannel/storeCusList'));
                    });
                }
            },
            {
                path: '/storeComList',
                meta: {power: 'store'},
                component(resolve) {
                    require.ensure(['view/marketChannel/storeComList'], () => {
                        resolve(require('view/marketChannel/storeComList'));
                    });
                }
            },
        ],
    },
    {
        path: '/storePhoto',
        meta: {power: 'store'},
        component(resolve) {
            require.ensure(['view/marketChannel/storePhoto'], () => {
                resolve(require('view/marketChannel/storePhoto'));
            });
        }
    },
    {
        path: '/storeAmount',
        meta: {power: 'store'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeAmount'], () => {
                resolve(require('view/marketChannel/storeAmount'));
            });
        }
    },
    {
        path: '/storeTree',
        meta: {power: 'store'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeTree'], () => {
                resolve(require('view/marketChannel/storeTree'));
            });
        }
    },
    {
        path: '/storeEdit',
        meta: {power: 'store'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeEdit'], () => {
                resolve(require('view/marketChannel/storeEdit'));
            });
        }
    },
    {
        path: '/storeCategory',
        meta: {power: 'storeCategory'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeCategory'], () => {
                resolve(require('view/marketChannel/storeCategory'));
            });
        }
    },
    {
        path: '/storeManager',
        meta: {power: 'storeManager'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeManager'], () => {
                resolve(require('view/marketChannel/storeManager'));
            });
        }
    },
    {
        path: '/storeManagerAdd',
        meta: {power: 'storeManager'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeManagerAdd'], () => {
                resolve(require('view/marketChannel/storeManagerAdd'));
            });
        }
    },
    {
        path: '/addStoreManager',
        meta: {power: 'storeManager'},
        component(resolve) {
            require.ensure(['view/marketChannel/addStoreManager'], () => {
                resolve(require('view/marketChannel/addStoreManager'));
            });
        }
    },
    {
        path: '/storeManagerEdit',
        meta: {power: 'storeManager'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeManagerEdit'], () => {
                resolve(require('view/marketChannel/storeManagerEdit'));
            });
        }
    },
    {
        path: '/storeManagerList',
        meta: {power: 'storeManager'},
        component(resolve) {
            require.ensure(['view/marketChannel/storeManagerList'], () => {
                resolve(require('view/marketChannel/storeManagerList'));
            });
        }
    },
    {
        path: '/commissionDesk',
        meta: {power: 'commissionDesk'},
        component(resolve) {
            require.ensure(['view/marketChannel/commissionDesk'], () => {
                resolve(require('view/marketChannel/commissionDesk'));
            });
        }
    },
    {
        path: '/commissionCashier',
        meta: {power: 'commissionCashier'},
        component(resolve) {
            require.ensure(['view/marketChannel/commissionCashier'], () => {
                resolve(require('view/marketChannel/commissionCashier'));
            });
        }
    },
    {
        path: '/marketDesk',
        meta: {power: 'marketDesk'},
        component(resolve) {
            require.ensure(['view/marketChannel/marketDesk'], () => {
                resolve(require('view/marketChannel/marketDesk'));
            });
        }
    },
    {
        path: '/marketAddNew',
        meta: {power: 'marketDesk'},
        component(resolve) {
            require.ensure(['view/marketChannel/marketAddNew'], () => {
                resolve(require('view/marketChannel/marketAddNew'));
            });
        }
    },
    {
        path: '/couponActivity',
        meta: {power: 'couponActivity'},
        component(resolve) {
            require.ensure(['view/marketChannel/couponActivity'], () => {
                resolve(require('view/marketChannel/couponActivity'));
            });
        }
    },
    {
        path: '/couponActivityRecord',
        meta: {power: 'couponActivity'},
        component(resolve) {
            require.ensure(['view/marketChannel/couponActivityRecord'], () => {
                resolve(require('view/marketChannel/couponActivityRecord'));
            });
        }
    },
    // {
    //     path: '/saleBack',
    //     meta: {power: 'saleBack'},
    //     component(resolve) {
    //         require.ensure(['view/marketChannel/saleBack'], () => {
    //             resolve(require('view/marketChannel/saleBack'));
    //         });
    //     }
    // },
    // {
    //     path: '/addSaleBack',
    //     meta: {power: 'saleBack'},
    //     component(resolve) {
    //         require.ensure(['view/marketChannel/addSaleBack'], () => {
    //             resolve(require('view/marketChannel/addSaleBack'));
    //         });
    //     }
    // },
]
