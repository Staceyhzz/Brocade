/* 
* @Author: Moriarty
* 库存管理路由
*/

var inventoryManagement = [
    //库存管理
    {
        path: '/warehouse',
        meta: {power: 'warehouse'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/warehouse'], () => {
                resolve(require('view/inventoryManagement/warehouse'));
            });
        }
    },
    {
        path: '/warehouseAdd',
        meta: {power: 'warehouse'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/warehouseAdd'], () => {
                resolve(require('view/inventoryManagement/warehouseAdd'));
            });
        }
    },
    {
        path: '/supplier',
        meta: {power: 'supplier'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/supplier'], () => {
                resolve(require('view/inventoryManagement/supplier'));
            });
        }
    },
    {
        path: '/purchase',
        meta: {power: 'purchase', keepAlive: true},
        component(resolve) {
            require.ensure(['view/inventoryManagement/purchase'], () => {
                resolve(require('view/inventoryManagement/purchase'));
            });
        }
    },
    {
        path: '/purchaseView',
        meta: {power: 'purchase'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/purchaseView'], () => {
                resolve(require('view/inventoryManagement/purchaseView'));
            });
        }
    },
    {
        path: '/purchaseAdd',
        meta: {power: 'purchase'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/purchaseAdd'], () => {
                resolve(require('view/inventoryManagement/purchaseAdd'));
            });
        }
    },
    {
        path: '/purchaseSaleReturn',
        meta: {power: 'purchase'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/purchaseSaleReturn'], () => {
                resolve(require('view/inventoryManagement/purchaseSaleReturn'));
            });
        }
    },
    {
        path: '/purchaseSaleReturnView',
        meta: {power: 'purchase'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/purchaseSaleReturnView'], () => {
                resolve(require('view/inventoryManagement/purchaseSaleReturnView'));
            });
        }
    },
    {
        path: '/purchaseBorrow',
        meta: {power: 'purchase'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/purchaseBorrow'], () => {
                resolve(require('view/inventoryManagement/purchaseBorrow'));
            });
        }
    },
    {
        path: '/purchaseBorrowView',
        meta: {power: 'purchase'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/purchaseBorrowView'], () => {
                resolve(require('view/inventoryManagement/purchaseBorrowView'));
            });
        }
    },
    {
        path: '/stockOut',
        meta: {power: 'stockOut'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/stockOut'], () => {
                resolve(require('view/inventoryManagement/stockOut'));
            });
        }
    },
    {
        path: '/stockOutSaleAdd',
        meta: {power: 'stockOut'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/stockOutSaleAdd'], () => {
                resolve(require('view/inventoryManagement/stockOutSaleAdd'));
            });
        }
    },
    {
        path: '/stockOutBorrow',
        meta: {power: 'stockOut'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/stockOutBorrow'], () => {
                resolve(require('view/inventoryManagement/stockOutBorrow'));
            });
        }
    },
    {
        path: '/deptStockOutDeskView',
        meta: {power: 'stockOut'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/deptStockOutDeskView'], () => {
                resolve(require('view/inventoryManagement/deptStockOutDeskView'));
            });
        }
    },
    {
        path: '/stockOutSaleView',
        meta: {power: 'stockOut'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/stockOutSaleView'], () => {
                resolve(require('view/inventoryManagement/stockOutSaleView'));
            });
        }
    },
    {
        path: '/invoice',
        meta: {power: 'invoice'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/invoice'], () => {
                resolve(require('view/inventoryManagement/invoice'));
            });
        }
    },
    {
        path: '/invoiceAdd',
        meta: {power: 'invoice'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/invoiceAdd'], () => {
                resolve(require('view/inventoryManagement/invoiceAdd'));
            });
        }
    },
    {
        path: '/invoiceView',
        meta: {power: 'invoice'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/invoiceView'], () => {
                resolve(require('view/inventoryManagement/invoiceView'));
            });
        }
    },
    {
        path: '/return',
        meta: {power: 'return'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/return'], () => {
                resolve(require('view/inventoryManagement/return'));
            });
        }
    },
    {
        path: '/returnAdd',
        meta: {power: 'return'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/returnAdd'], () => {
                resolve(require('view/inventoryManagement/returnAdd'));
            });
        }
    },
    {
        path: '/returnView',
        meta: {power: 'return'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/returnView'], () => {
                resolve(require('view/inventoryManagement/returnView'));
            });
        }
    },
    {
        path: '/allocate',
        meta: {power: 'allocate'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/allocate'], () => {
                resolve(require('view/inventoryManagement/allocate'));
            });
        }
    },
    {
        path: '/allocateAdd',
        meta: {power: 'allocate'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/allocateAdd'], () => {
                resolve(require('view/inventoryManagement/allocateAdd'));
            });
        }
    },
    {
        path: '/allocateView',
        meta: {power: 'allocate'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/allocateView'], () => {
                resolve(require('view/inventoryManagement/allocateView'));
            });
        }
    },
    {
        path: '/check',
        meta: {power: 'check'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/check'], () => {
                resolve(require('view/inventoryManagement/check'));
            });
        }
    },
    {
        path: '/checkAdd',
        meta: {power: 'check'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/checkAdd'], () => {
                resolve(require('view/inventoryManagement/checkAdd'));
            });
        }
    },
    {
        path: '/checkView',
        meta: {power: 'check'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/checkView'], () => {
                resolve(require('view/inventoryManagement/checkView'));
            });
        }
    },
    {
        path: '/use',
        meta: {power: 'use'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/use'], () => {
                resolve(require('view/inventoryManagement/use'));
            });
        }
    },
    {
        path: '/useAdd',
        meta: {power: 'use'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/useAdd'], () => {
                resolve(require('view/inventoryManagement/useAdd'));
            });
        }
    },
    {
        path: '/useView',
        meta: {power: 'use'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/useView'], () => {
                resolve(require('view/inventoryManagement/useView'));
            });
        }
    },
    {
        path: '/stock',
        meta: {power: 'stock'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/stock'], () => {
                resolve(require('view/inventoryManagement/stock'));
            });
        }
    },
    {
        path: '/deptStockOutDesk',
        meta: {power: 'deptStockOutDesk'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/deptStockOutDesk'], () => {
                resolve(require('view/inventoryManagement/deptStockOutDesk'));
            });
        }
    },
    {
        path: '/expiration',
        meta: {power: 'expiration'},
        component(resolve) {
            require.ensure(['view/inventoryManagement/expiration'], () => {
                resolve(require('view/inventoryManagement/expiration'));
            });
        }
    },
]

export default inventoryManagement;