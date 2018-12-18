/* 
* @Author: Moriarty
* 日常办公路由
*/

export default [
    //日常办公
    {
        path: '/addressBook',
        meta: {power: 'addressBook'},
        component(resolve) {
            require.ensure(['view/dailyOffice/addressBook'], () => {
                resolve(require('view/dailyOffice/addressBook'));
            });
        }
    },
    {
        path: '/shiftCategory',
        meta: {power: 'shiftCategory'},
        component(resolve) {
            require.ensure(['view/dailyOffice/shiftCategory'], () => {
                resolve(require('view/dailyOffice/shiftCategory'));
            });
        }
    },
    {
        path: '/myShift',
        meta: {power: 'myShift'},
        component(resolve) {
            require.ensure(['view/dailyOffice/myShift'], () => {
                resolve(require('view/dailyOffice/myShift'));
            });
        }
    },
    {
        path: '/shiftAddBulk',
        meta: {power: 'myShift'},
        component(resolve) {
            require.ensure(['view/dailyOffice/shiftAddBulk'], () => {
                resolve(require('view/dailyOffice/shiftAddBulk'));
            });
        }
    },
    {
        path: '/shift',
        meta: {power: 'shift'},
        component(resolve) {
            require.ensure(['view/dailyOffice/shift'], () => {
                resolve(require('view/dailyOffice/shift'));
            });
        }
    },
    {
        path: '/notice',
        meta: {power: 'notice'},
        component(resolve) {
            require.ensure(['view/dailyOffice/notice'], () => {
                resolve(require('view/dailyOffice/notice'));
            });
        }
    },
    {
        path: '/noticeEdit',
        meta: {power: 'notice'},
        component(resolve) {
            require.ensure(['view/dailyOffice/noticeEdit'], () => {
                resolve(require('view/dailyOffice/noticeEdit'));
            });
        }
    },
    {
        path: '/noticePreview',
        meta: {power: 'notice'},
        component(resolve) {
            require.ensure(['view/dailyOffice/noticePreview'], () => {
                resolve(require('view/dailyOffice/noticePreview'));
            });
        }
    },
    {
        path: '/knowledgeCategory',
        meta: {power: 'knowledgeCategory'},
        component(resolve) {
            require.ensure(['view/dailyOffice/knowledgeCategory'], () => {
                resolve(require('view/dailyOffice/knowledgeCategory'));
            });
        }
    },
    {
        path: '/knowledge',
        meta: {power: 'knowledge'},
        component(resolve) {
            require.ensure(['view/dailyOffice/knowledge'], () => {
                resolve(require('view/dailyOffice/knowledge'));
            });
        }
    },
    {
        path: '/knowledgeEdit',
        meta: {power: 'knowledge'},
        component(resolve) {
            require.ensure(['view/dailyOffice/knowledgeEdit'], () => {
                resolve(require('view/dailyOffice/knowledgeEdit'));
            });
        }
    },
    {
        path: '/knowledgePreview',
        meta: {power: 'knowledge'},
        component(resolve) {
            require.ensure(['view/dailyOffice/knowledgePreview'], () => {
                resolve(require('view/dailyOffice/knowledgePreview'));
            });
        }
    },
    {
        path: '/knowledgeCenter',
        meta: {power: 'knowledgeCenter'},
        component(resolve) {
            require.ensure(['view/dailyOffice/knowledgeCenter'], () => {
                resolve(require('view/dailyOffice/knowledgeCenter'));
            });
        }
    },
    {
        path: '/auditOrder',
        meta: {power: 'auditOrder'},
        component(resolve) {
            require.ensure(['view/dailyOffice/auditOrder'], () => {
                resolve(require('view/dailyOffice/auditOrder'));
            });
        }
    },
    {
        path: '/auditOrderDesk',
        meta: {power: 'auditOrderDesk'},
        component(resolve) {
            require.ensure(['view/dailyOffice/auditOrderDesk'], () => {
                resolve(require('view/dailyOffice/auditOrderDesk'));
            });
        }
    },
    {
        path: '/auditOrderDetails',
        meta: {power: 'auditOrderDesk'},
        component(resolve) {
            require.ensure(['view/dailyOffice/auditOrderDetails'], () => {
                resolve(require('view/dailyOffice/auditOrderDetails'));
            });
        }
    },
    {
        path: '/auditRecord',
        meta: {power: 'auditOrderDesk'},
        component(resolve) {
            require.ensure(['view/dailyOffice/auditRecord'], () => {
                resolve(require('view/dailyOffice/auditRecord'));
            });
        }
    },
]
