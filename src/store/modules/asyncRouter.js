/* 
* 异步路由权限
*/

import basicInformation from '@/router/basicInformation.js';
import systemSettings from '@/router/systemSettings.js';
import customerManagement from '@/router/customerManagement';
import customerRFM from '@/router/customerRFM';
import hospitalBusiness from '@/router/hospitalBusiness';
import marketChannel from '@/router/marketChannel';
import inventoryManagement from '@/router/inventoryManagement';
import dailyOffice from '@/router/dailyOffice';
import weChat from '@/router/weChat';
import callCenter from '@/router/callCenter';
import reportRecord from '@/router/reportRecord';
import canalsDistribution from '@/router/canalsDistribution';

const getPowerList = (data, key, nav) => {
  let result = [];
  const routerList = nav.find(item => item.id === key).child || [];
  const metaList = routerList.map(item => item.url.split('/')[1]) || [];
  data.forEach(item => {
    if(metaList.includes(item.meta.power)) {
      result.push(item);
    }
  });
  return result;
};

const state = {
  asyncRouterMap: [
    {
      path: '/desktop',
      component(resolve){
        require.ensure(['view/index.vue'], () => {
          resolve(require('view/index.vue'));
        });
      },
      children: []
    },
    { path: '*', redirect: '/error404' }
  ],
};

const getters = {
  getAsyncRouter: state => state.asyncRouterMap,
};

const actions = {
  setAsyncRouter: ({commit}, data) => {
    console.log('我在处理路由');
    const navList = JSON.parse(localStorage.getItem('navLink')) || [];
    const cusMenu = JSON.parse(localStorage.getItem('cusMenu')) || [];
    let resultRouter = [];

    //基础信息
    resultRouter.push(...getPowerList(basicInformation, 'info', navList));

    //系统设置
    resultRouter.push(...getPowerList(systemSettings, 'setting', navList));

    // 客户档案 特殊处理 客户档案tab  其中客户档案操作页需要后台验证，不做路由配置，直接赋予
    const cusRouter= navList.find(item => item.id === 'customer').child || [];
    let cusMeta = cusRouter.map(item => item.url.split('/')[1]) || [];
    cusMeta.push('cutomerOperation');
    customerManagement.forEach(item => {
      if(cusMeta.includes(item.meta.power)) {
        resultRouter.push(item);
      }
    });
    // if(cusMeta.includes('customer')) {
      let cusMenuMeta = cusMenu.map(item => item.id) || [];
      cusMenuMeta.push('customerIndex');
      const cusMenuRouter = customerManagement.find(item => item.path === '/customerIndex').children || [];
      let cusIndexRouter = {
        path: '/customerIndex',
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/customerIndex'], () => {
            resolve(require('view/customerManagement/customerInfo/customerIndex'));
          });
        },
        children: []
      };
      cusMenuRouter.forEach(item => {
        if(cusMenuMeta.includes(item.meta.power)) {
          cusIndexRouter.children.push(item);
        }
      });
      resultRouter.push(cusIndexRouter);
    // }

    //顾客运营
    resultRouter.push(...getPowerList(customerRFM, 'customerSetting', navList));

    //医院业务
    resultRouter.push(...getPowerList(hospitalBusiness, 'hospital', navList));

    //市场渠道
    resultRouter.push(...getPowerList(marketChannel, 'market', navList));

    //库存管理
    resultRouter.push(...getPowerList(inventoryManagement, 'stock', navList));

    //日常办公
    resultRouter.push(...getPowerList(dailyOffice, 'office', navList));

    //微信
    resultRouter.push(...getPowerList(weChat, 'wechat', navList));

    //呼叫中心
    resultRouter.push(...getPowerList(callCenter, 'callCenter', navList));

    //渠道分销
    resultRouter.push(...getPowerList(canalsDistribution, 'canalsDistribution', navList));

    //报表特殊处理
    //客户来源归类路由
    const channelGroup = [
      {
        path: '/channelGroup',
        component(resolve) {
          require.ensure(['view/systemSet/channelGroup'], () => {
            resolve(require('view/systemSet/channelGroup'));
          });
        }
      },
      {
        path: '/channelGroupCheck',
        component(resolve) {
          require.ensure(['view/systemSet/channelGroupCheck'], () => {
            resolve(require('view/systemSet/channelGroupCheck'));
          });
        }
      },
      {
        path: '/channelGroupEdit',
        component(resolve) {
          require.ensure(['view/systemSet/channelGroupEdit'], () => {
            resolve(require('view/systemSet/channelGroupEdit'));
          });
        }
      }
    ];
    //报表菜单
    const reportNav = navList.find(item => item.id === 'report').child || [];
    if(reportNav.filter(item => item.id === 'channelGroupManage').length) {
      resultRouter.push(...channelGroup);
    }
    if(reportNav.filter(item => item.id === 'reportManage').length) {
      resultRouter.push({
        path: '/reportCenter',
        component(resolve) {
          require.ensure(['view/reportCenter'], () => {
            resolve(require('view/reportCenter'));
          });
        }
      });
      //老版报表
    }
    if(reportNav.filter(item => item.id === 'reportRecord').length) {
      resultRouter.push({
        path: '/reportRecord',
        component(resolve) {
          require.ensure(['view/reportRecord/reportRecord'], () => {
            resolve(require('view/reportRecord/reportRecord'));
          });
        }
      });
      //新版报表
      const newReportRouter = JSON.parse(localStorage.getItem('reportPower')) || [];
      const newReportMeta = newReportRouter.map(item => item.url.split('/')[1]) || [];
      reportRecord.forEach(item => {
        if(newReportMeta.includes(item.meta.power)) {
          resultRouter.push(item);
        }
      });
    }

    commit('asyncRouter', resultRouter);
  },
};

const mutations = {
  asyncRouter (state, data) {
    state.asyncRouterMap[0].children = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
}