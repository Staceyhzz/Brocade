import Vue from 'vue';
import Router from 'vue-router';
import Store from '../store';
import cache from 'utils/cache';


import reportCenter from './reportCenter'


Vue.use(Router);
//前面最好把路由相关信息抽出来 避免new Router 过于庞大

let router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
		},
		{
      path: '/login',
      component(resolve) {
        require.ensure(['view/login.vue'], () => {
          resolve(require('view/login.vue'));
        });
      }
    },
    {
      path: '/desktop',
      component(resolve) {
        require.ensure(['view/index.vue'], () => {
          resolve(require('view/index.vue'));
        });
      },
      children: [{
          path: '',
          component(resolve) {
            require.ensure(['view/desktop'], () => {
              resolve(require('view/desktop'));
            });
          }
        },
        {
          path: '/inbox',
          component(resolve) {
            require.ensure(['view/desktop/inbox'], () => {
              resolve(require('view/desktop/inbox'));
            });
          }
        },
        {
          path: '/modifyPassword',
          component(resolve) {
            require.ensure(['view/desktop/modifyPassword'], () => {
              resolve(require('view/desktop/modifyPassword'));
            });
          }
        },
        {
          path: '/about',
          component(resolve) {
            require.ensure(['view/desktop/about'], () => {
              resolve(require('view/desktop/about'));
            });
          }
        },
        {
          path: '/aaa',
          component(resolve) {
            require.ensure(['view/aaa'], () => {
              resolve(require('view/aaa'));
            });
          }
        },
        //打印
        {
          path: '/printView',
          component(resolve) {
            require.ensure(['view/printView'], () => {
              resolve(require('view/printView'));
            });
          }
        },
        {
          path: '/errorMsg',
          component(resolve) {
            require.ensure(['view/errorMsg'], () => {
              resolve(require('view/errorMsg'));
            });
          }
        },
        {
          path: '/error404',
          component(resolve) {
            require.ensure(['view/error404'], () => {
              resolve(require('view/error404'));
            });
          }
        },
        //报表中心
        ...reportCenter,
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
    if (savedPosition) {
      return savedPosition;
    }
    // 滚动到锚点
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    // 让页面滚动到顶部
    return {
      x: 0,
      y: 0
    }
  }

});

//防止重复加载路由
let bool = true;

//路由进入前后事件
router.beforeEach((to, from, next) => {
  //防止没有登录直接登录主页面
  // const user = window.sessionStorage.getItem('userAccount');
  const loginKey = cache.readToken('adminToken') || '';

  if (!loginKey) {
    if (to.path !== '/login') {
      return next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
		// 判断是否调整登录页面
		if (to.path === '/login') {
			// console.log('要去登录页面')
      // // window.sessionStorage.removeItem('userAccount');
      next();
      // console.log('我要重载路由');
      // location.reload();
      // console.log('重载路由成功');
      // return new Promise(res => res(next())).then(location.reload())
		} else {
			//放在重复加载路由
			if(bool) {
        bool = false;
				console.log('路由正在加载ing.......');
				Store.dispatch('setAsyncRouter').then(() => {
					router.addRoutes(Store.getters.getAsyncRouter);
					next({ ...to,
						replace: true
					});
          console.log('路由加载成功');
				}).catch(() => {
					window.sessionStorage.removeItem('userAccount');
					return next({
						path: '/login'
					});
				});
			} else {
				console.log('非登录页面不载路由')
        next();
			}
		}
  }
});

router.afterEach((to, from, next) => {
	
});

export default router;
