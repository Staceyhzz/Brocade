/* 
 * @Author: Moriarty
 * 基础信息路由
 */
export default [{
    path: '/channel',
    meta: {
      power: 'channel'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/channel'], () => {
        resolve(require('view/basicInfo/channel'));
      });
    }
  },
  {
    path: '/symptom',
    meta: {
      power: 'symptom'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/symptom'], () => {
        resolve(require('view/basicInfo/symptom'));
      });
    }
  },
  {
    path: '/callbackCategory',
    meta: {
      power: 'callbackCategory'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/callbackCategory'], () => {
        resolve(require('view/basicInfo/callbackCategory'));
      });
    }
  },
  {
    path: '/callbackSet',
    meta: {
      power: 'callbackSet'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/callbackSet'], () => {
        resolve(require('view/basicInfo/callbackSet'));
      });
    }
  },
  {
    path: '/callbackSetEdit',
    meta: {
      power: 'callbackSet'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/callbackSetEdit'], () => {
        resolve(require('view/basicInfo/callbackSetEdit'));
      });
    }
  },
  {
    path: '/failtureCategory',
    meta: {
      power: 'failtureCategory'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/failtureCategory'], () => {
        resolve(require('view/basicInfo/failtureCategory'));
      });
    }
  },
  {
    path: '/complainCategory',
    meta: {
      power: 'complainCategory'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/complainCategory'], () => {
        resolve(require('view/basicInfo/complainCategory'));
      });
    }
  },
  {
    path: '/tag',
    meta: {
      power: 'tag'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/tag'], () => {
        resolve(require('view/basicInfo/tag'));
      });
    }
  },
  {
    path: '/tagGroup',
    meta: {
      power: 'tagGroup'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/tagGroup'], () => {
        resolve(require('view/basicInfo/tagGroup'));
      });
    }
  },
  {
    path: '/tagGroupEdit',
    meta: {
      power: 'tagGroup'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/tagGroupEdit'], () => {
        resolve(require('view/basicInfo/tagGroupEdit'));
      });
    }
  },
  {
    path: '/unit',
    meta: {
      power: 'unit'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/unit'], () => {
        resolve(require('view/basicInfo/unit'));
      });
    }
  },
  {
    path: '/cardCategory',
    meta: {
      power: 'cardCategory'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/cardCategory'], () => {
        resolve(require('view/basicInfo/cardCategory'));
      });
    }
  },
  {
    path: '/tool',
    meta: {
      power: 'tool'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/tool'], () => {
        resolve(require('view/basicInfo/tool'));
      });
    }
  },
  {
    path: '/relation',
    meta: {
      power: 'relation'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/relation'], () => {
        resolve(require('view/basicInfo/relation'));
      });
    }
  },
  {
    path: '/survey',
    meta: {
      power: 'survey'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/survey'], () => {
        resolve(require('view/basicInfo/survey'));
      });
    }
  },
  {
    path: '/surveyEdit',
    meta: {
      power: 'survey'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/surveyEdit'], () => {
        resolve(require('view/basicInfo/surveyEdit'));
      });
    }
  },
  {
    path: '/surveyRtfFill',
    meta: {
      power: 'survey'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/surveyRtfFill'], () => {
        resolve(require('view/basicInfo/surveyRtfFill'));
      });
    }
  },
  {
    path: '/surveyRtfChoice',
    meta: {
      power: 'survey'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/surveyRtfChoice'], () => {
        resolve(require('view/basicInfo/surveyRtfChoice'));
      });
    }
  },
  {
    path: '/medicalRecord',
    meta: {
      power: 'medicalRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/medicalRecord'], () => {
        resolve(require('view/basicInfo/medicalRecord'));
      });
    }
  },
  {
    path: '/medicalRecordEdit',
    meta: {
      power: 'medicalRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/medicalRecordEdit'], () => {
        resolve(require('view/basicInfo/medicalRecordEdit'));
      });
    }
  },
  {
    path: '/medicalRecordRtf',
    meta: {
      power: 'medicalRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/medicalRecordRtf'], () => {
        resolve(require('view/basicInfo/medicalRecordRtf'));
      });
    }
  },
  {
    path: '/medicalRecordPrint',
    meta: {
      power: 'medicalRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/medicalRecordPrint'], () => {
        resolve(require('view/basicInfo/medicalRecordPrint'));
      });
    }
  },
  {
    path: '/medicalRecordUpdate',
    meta: {
      power: 'medicalRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/medicalRecordUpdate'], () => {
        resolve(require('view/basicInfo/medicalRecordUpdate'));
      });
    }
	},
	// {
  //   path: '/positionTemplate',
  //   meta: {
  //     power: 'positionTemplate'
  //   },
  //   component(resolve) {
  //     require.ensure(['view/basicInfo/positionTemplate'], () => {
  //       resolve(require('view/basicInfo/positionTemplate'));
  //     });
  //   }
	// },
	// {
  //   path: '/positionTemplateEdit',
  //   meta: {
  //     power: 'positionTemplate'
  //   },
  //   component(resolve) {
  //     require.ensure(['view/basicInfo/positionTemplateEdit'], () => {
  //       resolve(require('view/basicInfo/positionTemplateEdit'));
  //     });
  //   }
  // },
  {
    path: '/caseManagement',
    meta: {
      power: 'caseManagement'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagement'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagement'));
      });
    }
  },
  {
    path: '/caseManagementEdit',
    meta: {
      power: 'caseManagement'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagementEdit'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagementEdit'));
      });
    }
  },
  {
    path: '/caseManagementPower',
    meta: {
      power: 'caseManagement'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagementPower'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagementPower'));
      });
    }
  },
  {
    path: '/caseManagementGroup',
    meta: {
      power: 'caseManagementGroup'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagementGroup'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagementGroup'));
      });
    }
  },
  {
    path: '/caseManagementGroupEdit',
    meta: {
      power: 'caseManagementGroup'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagementGroupEdit'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagementGroupEdit'));
      });
    }
  },
  {
    path: '/caseManagementRecord',
    meta: {
      power: 'caseManagementRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagementRecord'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagementRecord'));
      });
    }
  },
  {
    path: '/caseManagementRecordEdit',
    meta: {
      power: 'caseManagementRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagementRecordEdit'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagementRecordEdit'));
      });
    }
  },
  {
    path: '/caseManagementRecordView',
    meta: {
      power: 'caseManagementRecord'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/caseFile/caseManagementRecordView'], () => {
        resolve(require('view/basicInfo/caseFile/caseManagementRecordView'));
      });
    }
  },
  {
    path: '/position',
    meta: {
      power: 'position'
    },
    component(resolve) {
      require.ensure(['view/basicInfo/position'], () => {
        resolve(require('view/basicInfo/position'));
      });
    }
  }
]
