/* 
 * @Author: Moriarty
 * 客户管理路由
 */

export default [{
    path: '/customer',
    meta: {
      power: 'customer',
      keepAlive: true
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customer'], () => {
        resolve(require('view/customerManagement/customer'));
      });
    }
  },
  //客户个人资料
  {
    path: '/customerIndex',
    meta: {
      power: 'customerIndex',
      title: 'cus'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/customerIndex'], () => {
        resolve(require('view/customerManagement/customerInfo/customerIndex'));
      });
    },
    children: [{
        path: '',
        meta: {
          title: 'cus',
          power: 'customerIndex'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/customerMsg'], () => {
            resolve(require('view/customerManagement/customerInfo/customerMsg'));
          });
        }
      },
      {
        path: '/customerMsg',
        meta: {
          title: 'cus',
          power: 'customerIndex'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/customerMsg'], () => {
            resolve(require('view/customerManagement/customerInfo/customerMsg'));
          });
        }
      },
      {
        path: '/indexOrderDetail',
        meta: {
          title: 'cus',
          power: 'indexOrderDetail'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexOrderDetail'], () => {
            resolve(require('view/customerManagement/customerInfo/indexOrderDetail'));
          });
        }
      },
      {
        path: '/indexConsult',
        meta: {
          title: 'cus',
          power: 'indexConsult'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexConsult'], () => {
            resolve(require('view/customerManagement/customerInfo/indexConsult'));
          });
        }
      },
      {
        path: '/indexSms',
        meta: {
          title: 'cus',
          power: 'indexSms'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexSms'], () => {
            resolve(require('view/customerManagement/customerInfo/indexSms'));
          });
        }
      },
      {
        path: '/indexAppointment',
        meta: {
          title: 'cus',
          power: 'indexAppointment'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexAppointment'], () => {
            resolve(require('view/customerManagement/customerInfo/indexAppointment'));
          });
        }
      },
      {
        path: '/indexVisit',
        meta: {
          title: 'cus',
          power: 'indexVisit'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexVisit'], () => {
            resolve(require('view/customerManagement/customerInfo/indexVisit'));
          });
        }
      },
      {
        path: '/indexFailture',
        meta: {
          title: 'cus',
          power: 'indexFailture'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexFailture'], () => {
            resolve(require('view/customerManagement/customerInfo/indexFailture'));
          });
        }
      },
      {
        path: '/indexOrder',
        meta: {
          title: 'cus',
          power: 'indexOrder'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexOrder'], () => {
            resolve(require('view/customerManagement/customerInfo/indexOrder'));
          });
        }
			},
			// {
      //   path: '/indexEffectrRackingtext',
      //   meta: {
      //     title: 'cus',
      //     power: 'indexEffectrRackingtext'
      //   },
      //   component(resolve) {
      //     require.ensure(['view/customerManagement/customerInfo/indexEffectrRackingtext'], () => {
      //       resolve(require('view/customerManagement/customerInfo/indexEffectrRackingtext'));
      //     });
      //   }
      // },
      {
        path: '/indexPhoto',
        meta: {
          title: 'cus',
          power: 'indexPhoto'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexPhoto'], () => {
            resolve(require('view/customerManagement/customerInfo/indexPhoto'));
          });
        }
      },
      {
        path: '/indexOperation',
        meta: {
          title: 'cus',
          power: 'indexOperation'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexOperation'], () => {
            resolve(require('view/customerManagement/customerInfo/indexOperation'));
          });
        }
      },
      {
        path: '/indexCallback',
        meta: {
          title: 'cus',
          power: 'indexCallback'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexCallback'], () => {
            resolve(require('view/customerManagement/customerInfo/indexCallback'));
          });
        }
      },
      {
        path: '/indexSurvey',
        meta: {
          title: 'cus',
          power: 'indexSurvey'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexSurvey'], () => {
            resolve(require('view/customerManagement/customerInfo/indexSurvey'));
          });
        }
      },
      {
        path: '/indexMedicalRecord',
        meta: {
          title: 'cus',
          power: 'indexMedicalRecord'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexMedicalRecord'], () => {
            resolve(require('view/customerManagement/customerInfo/indexMedicalRecord'));
          });
        }
      },
      {
        path: '/indexCaseRecord',
        meta: {
          title: 'cus',
          power: 'indexCaseRecord'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexCaseRecord'], () => {
            resolve(require('view/customerManagement/customerInfo/indexCaseRecord'));
          });
        }
      },
      {
        path: '/indexAccount',
        meta: {
          title: 'cus',
          power: 'indexAccount'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexAccount'], () => {
            resolve(require('view/customerManagement/customerInfo/indexAccount'));
          });
        }
      },
      {
        path: '/indexMember',
        meta: {
          title: 'cus',
          power: 'indexMember'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexMember'], () => {
            resolve(require('view/customerManagement/customerInfo/indexMember'));
          });
        }
      },
      {
        path: '/indexManager',
        meta: {
          title: 'cus',
          power: 'indexManager'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexManager'], () => {
            resolve(require('view/customerManagement/customerInfo/indexManager'));
          });
        }
      },
      {
        path: '/indexRelation',
        meta: {
          title: 'cus',
          power: 'indexRelation'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexRelation'], () => {
            resolve(require('view/customerManagement/customerInfo/indexRelation'));
          });
        }
      },
      {
        path: '/indexComplain',
        meta: {
          title: 'cus',
          power: 'indexComplain'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexComplain'], () => {
            resolve(require('view/customerManagement/customerInfo/indexComplain'));
          });
        }
      },
      {
        path: '/indexCost',
        meta: {
          title: 'cus',
          power: 'indexCost'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexCost'], () => {
            resolve(require('view/customerManagement/customerInfo/indexCost'));
          });
        }
      },
      {
        path: '/indexAudit',
        meta: {
          title: 'cus',
          power: 'indexAudit'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexAudit'], () => {
            resolve(require('view/customerManagement/customerInfo/indexAudit'));
          });
        }
      },
      {
        path: '/indexStore',
        meta: {
          title: 'cus',
          power: 'indexStore'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexStore'], () => {
            resolve(require('view/customerManagement/customerInfo/indexStore'));
          });
        }
      },
      {
        path: '/indexPromoter',
        meta: {
          title: 'cus',
          power: 'indexPromoter'
        },
        component(resolve) {
          require.ensure(['view/customerManagement/customerInfo/indexPromoter'], () => {
            resolve(require('view/customerManagement/customerInfo/indexPromoter'));
          });
        }
      }
    ]
  },
  //客户添加资料
  {
    path: '/consultAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/consultAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/consultAdd'));
      });
    }
  },
  {
    path: '/consultUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/consultUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/consultUpdate'));
      });
    }
  },
  {
    path: '/depositOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/depositOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/depositOrderAdd'));
      });
    }
  },
  {
    path: '/depositOrderView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/depositOrderView'], () => {
        resolve(require('view/customerManagement/customerInfo/depositOrderView'));
      });
    }
  },
  {
    path: '/repaymentOrderView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/repaymentOrderView'], () => {
        resolve(require('view/customerManagement/customerInfo/repaymentOrderView'));
      });
    }
  },
  {
    path: '/orderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/orderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/orderAdd'));
      });
    }
  },
  {
    path: '/orderView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/orderView'], () => {
        resolve(require('view/customerManagement/customerInfo/orderView'));
      });
    }
  },
  {
    path: '/orderUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/orderUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/orderUpdate'));
      });
    }
  },
  {
    path: '/appointmentAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/appointmentAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/appointmentAdd'));
      });
    }
  },
  {
    path: '/appointmentUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/appointmentUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/appointmentUpdate'));
      });
    }
  },
  {
    path: '/treatAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/treatAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/treatAdd'));
      });
    }
  },
  {
    path: '/treatUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/treatUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/treatUpdate'));
      });
    }
  },
  {
    path: '/surgeryAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/surgeryAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/surgeryAdd'));
      });
    }
  },
  {
    path: '/surgeryUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/surgeryUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/surgeryUpdate'));
      });
    }
  },
  {
    path: '/callbackAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/callbackAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/callbackAdd'));
      });
    }
  },
  {
    path: '/callbackUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/callbackUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/callbackUpdate'));
      });
    }
  },
  {
    path: '/callbackTaskAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/callbackTaskAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/callbackTaskAdd'));
      });
    }
  },
  {
    path: '/callbackTaskUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/callbackTaskUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/callbackTaskUpdate'));
      });
    }
  },
  {
    path: '/callbackSetAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/callbackSetAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/callbackSetAdd'));
      });
    }
  },
  {
    path: '/photoAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/photoAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/photoAdd'));
      });
    }
  },
  {
    path: '/photoUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/photoUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/photoUpdate'));
      });
    }
	},
	// {
  //   path: '/customerEffectrRackingtextAdd',
  //   meta: {
  //     title: 'cus',
  //     power: 'cutomerOperation'
  //   },
  //   component(resolve) {
  //     require.ensure(['view/customerManagement/customerInfo/customerEffectrRackingtextAdd'], () => {
  //       resolve(require('view/customerManagement/customerInfo/customerEffectrRackingtextAdd'));
  //     });
  //   }
  // },
  // {
  //   path: '/effectTrackingAdd',
  //   meta: {
  //     title: 'cus',
  //     power: 'cutomerOperation'
  //   },
  //   component(resolve) {
  //     require.ensure(['view/customerManagement/customerInfo/effectTrackingAdd'], () => {
  //       resolve(require('view/customerManagement/customerInfo/effectTrackingAdd'));
  //     });
  //   }
  // },
  // {
  //   path: '/effectTrackingUpdate',
  //   meta: {
  //     title: 'cus',
  //     power: 'cutomerOperation'
  //   },
  //   component(resolve) {
  //     require.ensure(['view/customerManagement/customerInfo/effectTrackingUpdate'], () => {
  //       resolve(require('view/customerManagement/customerInfo/effectTrackingUpdate'));
  //     });
  //   }
  // },
  {
    path: '/backOperationOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/backOperationOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/backOperationOrderAdd'));
      });
    }
  },
  {
    path: '/backOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/backOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/backOrderAdd'));
      });
    }
  },
  {
    path: '/backOrderView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/backOrderView'], () => {
        resolve(require('view/customerManagement/customerInfo/backOrderView'));
      });
    }
  },
  {
    path: '/depositRebateOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/depositRebateOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/depositRebateOrderAdd'));
      });
    }
  },
  {
    path: '/depositRebateOrderView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/depositRebateOrderView'], () => {
        resolve(require('view/customerManagement/customerInfo/depositRebateOrderView'));
      });
    }
  },
  {
    path: '/failtureAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/failtureAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/failtureAdd'));
      });
    }
  },
  {
    path: '/failtureUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/failtureUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/failtureUpdate'));
      });
    }
  },
  {
    path: '/groupAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/groupAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/groupAdd'));
      });
    }
  },
  {
    path: '/tagAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/tagAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/tagAdd'));
      });
    }
  },
  {
    path: '/tagInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/tagInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/tagInfo'));
      });
    }
  },
  {
    path: '/groupInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/groupInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/groupInfo'));
      });
    }
  },
  {
    path: '/selectSurvey',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/selectSurvey'], () => {
        resolve(require('view/customerManagement/customerInfo/selectSurvey'));
      });
    }
  },
  {
    path: '/surveyAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/surveyAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/surveyAdd'));
      });
    }
  },
  {
    path: '/surveyUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/surveyUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/surveyUpdate'));
      });
    }
  },
  {
    path: '/surveyView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/surveyView'], () => {
        resolve(require('view/customerManagement/customerInfo/surveyView'));
      });
    }
  },
  {
    path: '/selectMedicalRecord',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/selectMedicalRecord'], () => {
        resolve(require('view/customerManagement/customerInfo/selectMedicalRecord'));
      });
    }
  },
  {
    path: '/medicalRecordAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/medicalRecordAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/medicalRecordAdd'));
      });
    }
  },
  {
    path: '/medicalRecordCusEdit',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/medicalRecordCusEdit'], () => {
        resolve(require('view/customerManagement/customerInfo/medicalRecordCusEdit'));
      });
    }
  },
  {
    path: '/medicalRecordView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/medicalRecordView'], () => {
        resolve(require('view/customerManagement/customerInfo/medicalRecordView'));
      });
    }
  },
  {
    path: '/caseManagementAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/caseManagementAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/caseManagementAdd'));
      });
    }
  },
  {
    path: '/caseManagementCusAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/caseManagementCusAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/caseManagementCusAdd'));
      });
    }
  },
  {
    path: '/caseManagementCusUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/caseManagementCusUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/caseManagementCusUpdate'));
      });
    }
  },
  {
    path: '/caseManagementCusView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/caseManagementCusView'], () => {
        resolve(require('view/customerManagement/customerInfo/caseManagementCusView'));
      });
    }
  },
  //添加其他
  {
    path: '/groupComplainAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/groupComplainAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/groupComplainAdd'));
      });
    }
  },
  {
    path: '/avatarInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/avatarInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/avatarInfo'));
      });
    }
  },
  {
    path: '/blacklistOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/blacklistOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/blacklistOrderAdd'));
      });
    }
  },
  {
    path: '/exploitChangeInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/exploitChangeInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/exploitChangeInfo'));
      });
    }
  },
  {
    path: '/managerChangeInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/managerChangeInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/managerChangeInfo'));
      });
    }
  },
  {
    path: '/orderDetailManagerAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/orderDetailManagerAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/orderDetailManagerAdd'));
      });
    }
  },
  {
    path: '/pointAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/pointAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/pointAdd'));
      });
    }
  },
  {
    path: '/pointRebate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/pointRebate'], () => {
        resolve(require('view/customerManagement/customerInfo/pointRebate'));
      });
    }
  },
  {
    path: '/pointCoupon',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/pointCoupon'], () => {
        resolve(require('view/customerManagement/customerInfo/pointCoupon'));
      });
    }
  },
  {
    path: '/memberAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/memberAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/memberAdd'));
      });
    }
  },
  {
    path: '/equityAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/equityAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/equityAdd'));
      });
    }
  },
  {
    path: '/equityDelete',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/equityDelete'], () => {
        resolve(require('view/customerManagement/customerInfo/equityDelete'));
      });
    }
  },
  {
    path: '/couponOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/couponOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/couponOrderAdd'));
      });
    }
  },
  {
    path: '/couponRebateOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/couponRebateOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/couponRebateOrderAdd'));
      });
    }
  },
  {
    path: '/relationAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/relationAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/relationAdd'));
      });
    }
  },
  {
    path: '/operationAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/operationAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/operationAdd'));
      });
    }
  },
  {
    path: '/operationUpdate',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/operationUpdate'], () => {
        resolve(require('view/customerManagement/customerInfo/operationUpdate'));
      });
    }
  },
  {
    path: '/depositTransferOrderAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/depositTransferOrderAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/depositTransferOrderAdd'));
      });
    }
  },
  {
    path: '/activeCoupon',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/activeCoupon'], () => {
        resolve(require('view/customerManagement/customerInfo/activeCoupon'));
      });
    }
  },
  {
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    path: '/commissionAdd',
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/commissionAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/commissionAdd'));
      });
    }
  },
  {
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    path: '/qartCode',
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/qartCode'], () => {
        resolve(require('view/customerManagement/customerInfo/qartCode'));
      });
    }
  },
  {
    path: '/debtOperationAdd',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/debtOperationAdd'], () => {
        resolve(require('view/customerManagement/customerInfo/debtOperationAdd'));
      });
    }
  },
  {
    path: '/exploitUserInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/exploitUserInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/exploitUserInfo'));
      });
    }
  },
  {
    path: '/managerUserInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/managerUserInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/managerUserInfo'));
      });
    }
  },
  {
    path: '/operatorInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/operatorInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/operatorInfo'));
      });
    }
  },
  {
    path: '/operatorUserInfo',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/operatorUserInfo'], () => {
        resolve(require('view/customerManagement/customerInfo/operatorUserInfo'));
      });
    }
  },
  {
    path: '/auditInfoView',
    meta: {
      title: 'cus',
      power: 'cutomerOperation'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/customerInfo/auditInfoView'], () => {
        resolve(require('view/customerManagement/customerInfo/auditInfoView'));
      });
    }
  },
  {
    path: '/complain',
    meta: {
      power: 'complain'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/complain'], () => {
        resolve(require('view/customerManagement/complain'));
      });
    }
  },
  {
    path: '/ownership',
    meta: {
      power: 'ownership'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/ownership'], () => {
        resolve(require('view/customerManagement/ownership'));
      });
    }
  },
  {
    path: '/birthday',
    meta: {
      power: 'birthday'
    },
    component(resolve) {
      require.ensure(['view/customerManagement/birthday'], () => {
        resolve(require('view/customerManagement/birthday'));
      });
    }
  },
]
