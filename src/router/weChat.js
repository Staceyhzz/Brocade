/* 
 * @Author: Moriarty
 * 微信路由
 */

export default [
  //微信
  {
    path: '/promoter',
    meta: {
      power: 'promoter'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoter'], () => {
        resolve(require('view/WeChat/promoter'));
      });
    }
  },
  {
    path: '/promoterRecord',
    meta: {
      power: 'promoter'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoterRecord'], () => {
        resolve(require('view/WeChat/promoterRecord'));
      });
    }
  },
  {
    path: '/promoteCustomer',
    meta: {
      power: 'promoteCustomer'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoteCustomer'], () => {
        resolve(require('view/WeChat/promoteCustomer'));
      });
    }
  },
  {
    path: '/promoteCustomerNew',
    meta: {
      power: 'promoteCustomer'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoteCustomerNew'], () => {
        resolve(require('view/WeChat/promoteCustomerNew'));
      });
    }
  },
  {
    path: '/cusPromoterRecord',
    meta: {
      power: 'promoteCustomer'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoterRecord'], () => {
        resolve(require('view/WeChat/promoterRecord'));
      });
    }
  },
  {
    path: '/promoteRecord',
    meta: {
      power: 'promoteRecord'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoteRecord'], () => {
        resolve(require('view/WeChat/promoteRecord'));
      });
    }
  },
  {
    path: '/recordPromoterRecord',
    meta: {
      power: 'promoteRecord'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoterRecord'], () => {
        resolve(require('view/WeChat/promoterRecord'));
      });
    }
  },
  {
    path: '/promoteRebate',
    meta: {
      power: 'promoteRebate'
    },
    component(resolve) {
      require.ensure(['view/WeChat/promoteRebate'], () => {
        resolve(require('view/WeChat/promoteRebate'));
      });
    }
  },
  {
    path: '/verifyMessage',
    meta: {
      power: 'verifyMessage'
    },
    component(resolve) {
      require.ensure(['view/WeChat/VerifyMessage'], () => {
        resolve(require('view/WeChat/VerifyMessage'));
      });
    }
  },
  {
    path: '/opentheguide',
    meta: {
      power: 'opentheguide'
    },
    component(resolve) {
      require.ensure(['view/WeChat/opentheguide'], () => {
        resolve(require('view/WeChat/opentheguide'));
      });
    }
  },
  {
    path: '/wechatpublicnumber',
    meta: {power: 'opentheguide'},
    component(resolve) {
        require.ensure(['view/WeChat/wechatpublicnumber'], () => {
            resolve(require('view/WeChat/wechatpublicnumber'));
        });
    }
  },
  {
    path: '/materialmanagement',
    meta: {power: 'opentheguide'},
    component(resolve) {
        require.ensure(['view/WeChat/materialmanagement'], () => {
            resolve(require('view/WeChat/materialmanagement'));
        });
    }
  },
  {
    path: '/wechatmenu',
    meta: {power: 'opentheguide'},
    component(resolve) {
        require.ensure(['view/WeChat/wechatmenu'], () => {
            resolve(require('view/WeChat/wechatmenu'));
        });
    }
  },
  {
    path: '/wxstep',
    meta: {power: 'opentheguide'},
    component(resolve) {
        require.ensure(['view/WeChat/wxstep'], () => {
            resolve(require('view/WeChat/wxstep'));
        });
    }
  },
  {
    path: '/automaticreply',
    meta: {power: 'opentheguide'},
    component(resolve) {
        require.ensure(['view/WeChat/automaticreply'], () => {
            resolve(require('view/WeChat/automaticreply'));
        });
    }
  },
  {
    path: '/putforward',
    meta: {power: 'putforward'},
    component(resolve) {
        require.ensure(['view/WeChat/putforward'], () => {
            resolve(require('view/WeChat/putforward'));
        });
    }
  },
  {
    path: '/handle',
    meta: {power: 'putforward'},
    component(resolve) {
        require.ensure(['view/WeChat/handle'], () => {
            resolve(require('view/WeChat/handle'));
        });
    }
  },
  {
    path: '/relationship',
    meta: {power: 'promoteCustomer'},
    component(resolve) {
        require.ensure(['view/WeChat/relationship'], () => {
            resolve(require('view/WeChat/relationship'));
        });
    }
  },
]
