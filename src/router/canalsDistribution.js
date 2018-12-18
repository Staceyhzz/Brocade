/* 
 * @Author: Moriarty
 * 渠道分销路由
 */
export default [
  {
    path: '/distributionBasic',
    meta: {
      power: 'distributionBasic'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributionBasic'], () => {
        resolve(require('view/canalsDistribution/distributionBasic'));
      });
    }
  },
  {
    path: '/distributor',
    meta: {
      power: 'distributor'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributor'], () => {
        resolve(require('view/canalsDistribution/distributor'));
      });
    }
  },
  {
    path: '/distributorTree',
    meta: {
      power: 'distributor'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributorTree'], () => {
        resolve(require('view/canalsDistribution/distributorTree'));
      });
    }
  },
  {
    path: '/distributorAddCus',
    meta: {
      power: 'distributor'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributorAddCus'], () => {
        resolve(require('view/canalsDistribution/distributorAddCus'));
      });
    }
  },
  {
    path: '/distributorRegister',
    meta: {
      power: 'distributorRegister'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributorRegister'], () => {
        resolve(require('view/canalsDistribution/distributorRegister'));
      });
    }
  },
  {
    path: '/distributorRecord',
    meta: {
      power: 'distributorRecord'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributorRecord'], () => {
        resolve(require('view/canalsDistribution/distributorRecord'));
      });
    }
  },
  {
    path: '/distributorLevelRecord',
    meta: {
      power: 'distributorLevelRecord'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributorLevelRecord'], () => {
        resolve(require('view/canalsDistribution/distributorLevelRecord'));
      });
    }
  },
  {
    path: '/distributorCashRecord',
    meta: {
      power: 'distributorCashRecord'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributorCashRecord'], () => {
        resolve(require('view/canalsDistribution/distributorCashRecord'));
      });
    }
  },
  {
    path: '/distributorHelp',
    meta: {
      power: 'distributorHelp'
    },
    component(resolve) {
      require.ensure(['view/canalsDistribution/distributorHelp'], () => {
        resolve(require('view/canalsDistribution/distributorHelp'));
      });
    }
  },
];
