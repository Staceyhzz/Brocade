//power 1 集团 2机构 3用户
const Mock = require('mockjs');




Mock.mock('http://scroll-more', {
  'code': 0,
  'content|200': [{
    'id|10000-99999': 10000,
    'name': Mock.Random.csentence(5, 15),
    'type': Mock.Random.csentence(2, 10),
    'price|0-1000000.2': 1,
    'num|+1': 1,
  }]
});
Mock.mock('http://scroll-more1', {
  'code': 0,
  'content|200': [{
    'id|10000-99999': 10000,
    'name': Mock.Random.csentence(5, 15),
    'type': Mock.Random.csentence(2, 10),
    'price|0-1000000.2': 1,
    'num|+1': 1,
  }]
});



Mock.mock('http://aaanew1-all', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'userName': Mock.Random.cname(),
        'clinicType|1-3': 1,
        'customerName': Mock.Random.csentence(2, 5),
        'categoryName': Mock.Random.csentence(2, 10),
        'content': Mock.Random.csentence(20, 100),
        'itemName': Mock.Random.csentence(2, 5),
        'itemGrounpName': Mock.Random.csentence(2, 5),
        'channelName': Mock.Random.csentence(2, 5),
        'storeName': Mock.Random.csentence(2, 5),
        'exploitUserName': Mock.Random.cname(),
        'managerUserName': Mock.Random.cname()
      }]
    }
  }
});
Mock.mock('http://aaanew1-chart', {
  'code': 0,
  'content|5-10': [{
    'hospitalName': Mock.Random.csentence(5, 9),
    'categoryName|1-10': Mock.Random.cword(),
    'userName|1-10': Mock.Random.cword(),
    'channelName|1-10': Mock.Random.cword(),
    'storeName|1-10': Mock.Random.cword(),
    'exploitUserName|1-10': Mock.Random.cword(),
    'num|0-100': 1,
    'percent|0-100.2': 3
  }]
});



Mock.mock('http://aaanew3-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'orderID|1000000-9999999': Mock.Random.natural(),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'createUserName': Mock.Random.cname(),
        'userName': Mock.Random.cname(),
        'id|1000000-9999999': Mock.Random.natural(),
        'amount|1-1000000': 1,
        'return|1-10000': 1,
        'debt|1-100000': 1
      }]
    }
  }
});
Mock.mock('http://aaanew3-other', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'createUserName': Mock.Random.cname(),
        'customerNum|1-10000': 1,
        'orderNum|1-100000': 1,
        'amount|1-1000000': 1,
        'return|1-10000': 1,
        'debt|1-100000': 1
      }]
    }
  }
});


Mock.mock('http://aaanew4', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'paidTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'paidHospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'createUserName': Mock.Random.cname(),
        'userName': Mock.Random.cname(),
        'chargeName': Mock.Random.csentence(5, 9),
        'itemGrounpName': Mock.Random.csentence(5, 9),
        'itemName': Mock.Random.csentence(5, 9),
        'positionName': Mock.Random.csentence(5, 9),
        'unitName': Mock.Random.csentence(1, 2),
        'operationNum|1-1000': 1,
        'operationCusNum|1-10000': 1,
        'num|1-1000': 1,
        'count|1-100': 1,
        'amount|1-1000000': 1
      }]
    }
  }
});

Mock.mock('http://aaanew5-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'type|1-3': 1,
        'ways|1-2': 1,
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'appointmentStartTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'appointmentEndTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'status|0-1': 0,
        'userName': Mock.Random.cname(),
        'chargeName': Mock.Random.csentence(5, 9),
        'createHospitalName': Mock.Random.csentence(5, 9),
        'createUserName': Mock.Random.csentence(5, 9),
        'remark': Mock.Random.csentence(20, 100)
      }]
    }
  }
});
Mock.mock('http://aaanew5-user', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'createUserName': Mock.Random.csentence(5, 9),
        'num|1-1000': 1,
        'percent|0-100.2': 1
      }]
    }
  }
});
Mock.mock('http://aaanew5-doctor', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'userName': Mock.Random.csentence(5, 9),
        'consult|1-1000': 1,
        'treat|1-1000': 1,
        'surgery|1-1000': 1
      }]
    }
  }
});


Mock.mock('http://aaanew6', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'channelName': Mock.Random.csentence(2, 5),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'itemName': Mock.Random.csentence(2, 5),
        'itemGrounpName': Mock.Random.csentence(2, 5),
        'status|0-1': 1,
        'age|1-1000': 1
      }]
    }
  }
});


Mock.mock('http://aaanew7', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'type': 22,
        'point|0-1000000': 1,
        'amount|0-1000000.2': 1,
        'userName': Mock.Random.cname(),
        'remark': Mock.Random.csentence(20, 50)
      }]
    }
  }
});


Mock.mock('http://aaanew8', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'type|1-4': 1,
        'chargeName': Mock.Random.csentence(5, 9),
        'amount|0-1000000.2': 1,
        'orderID|0-1000000': 1,
        'userName': Mock.Random.cname(),
        'remark': Mock.Random.csentence(20, 50)
      }]
    }
  }
});


Mock.mock('http://aaanew9', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'startAmount|1-1000000.2': 1,
        'endAmount|1-1000000.2': 1,
        'inAmount1|1-100000.2': 1,
        'inAmount2|1-22222.2': 1,
        'outAmount1|1-100000.2': 1,
        'outAmount2|1-22222.2': 1
      }]
    }
  }
});


Mock.mock('http://aaanew10', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'amount|1-1000000.2': 1,
        'restAmount|1-100000.2': 1
      }]
    }
  }
});


Mock.mock('http://aaanew11-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'couponID|100000-900000': 1,
        'couponName': Mock.Random.csentence(5, 9),
        'ways|1-6': 1,
        'type|1-2': 1,
        'amount|1-1000000.2': 1,
        'userName': Mock.Random.cname()
      }]
    }
  }
});
Mock.mock('http://aaanew11-count', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'couponID|100000-900000': 1,
        'couponName': Mock.Random.csentence(5, 9),
        'inAmount1|1-100000.2': 1,
        'inAmount2|1-100000.2': 1,
        'inAmount3|1-100000.2': 1,
        'inAmount4|1-100000.2': 1,
        'outAmount1|1-100000.2': 1,
        'outAmount2|1-100000.2': 1
      }]
    }
  }
});



Mock.mock('http://aaanew12-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'channelGroupName': Mock.Random.csentence(5, 9),
        'channelName': Mock.Random.csentence(5, 9),
        'storeName': Mock.Random.csentence(5, 9),
        'itemName': Mock.Random.csentence(5, 9),
        'itemGrounpName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'deptName': Mock.Random.csentence(5, 9),
        'userName': Mock.Random.cname(),
        'visitStatus|0-1': 1,
        'dealStatus|0-1': 1
      }]
    }
  }
});
Mock.mock('http://aaanew12-chart', {
  'code': 0,
  'content|1-5': [{
    'hospitalName': Mock.Random.csentence(5, 9),
    'deptName': Mock.Random.csentence(5, 9),
    'channelGroupName': Mock.Random.csentence(5, 9),
    'itemGrounpName': Mock.Random.csentence(5, 9),
    'itemName': Mock.Random.csentence(5, 9),
    'userName|1-10': Mock.Random.cword(),
    'channelName|1-10': Mock.Random.cword(),
    'storeName|1-10': Mock.Random.cword(),
    'chargeName|1-10': Mock.Random.cword(),
    'num|0-10000': 1
  }]
});



Mock.mock('http://aaanew13', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'orderID|100000-999999': 1,
        'customerID|100000-999999': 1,
        'customerName': Mock.Random.cname(),
        'userName': Mock.Random.cname(),
        'amount|0-1000000.2': 1,
        'remark': Mock.Random.csentence(20, 50),
        'auditStatus|0-3': 1,
        'paidStatus|1-3': 1,
        'paidTime': Mock.Random.date() + ' ' + Mock.Random.time()
      }]
    }
  }
});



Mock.mock('http://aaanew14', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'orderID|100000-999999': 1,
        'orderType|1-2': 1,
        'customerID|100000-999999': 1,
        'customerName': Mock.Random.cname(),
        'userName': Mock.Random.cname(),
        'amount|0-1000000.2': 1,
        'point|0-1000000': 1,
        'backAmount|0-1000000.2': 1,
        'backAmount1|0-1000000.2': 1,
        'remark': Mock.Random.csentence(20, 50),
        'auditStatus|0-3': 1,
        'paidStatus|1-3': 1,
        'paidTime': Mock.Random.date() + ' ' + Mock.Random.time()
      }]
    }
  }
});



Mock.mock('http://aaanew15-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'categoryName': Mock.Random.csentence(5, 9),
        'orderID|100000-999999': 1,
        'orderType|1-2': 1,
        'customerID|100000-999999': 1,
        'customerName': Mock.Random.cname(),
        'createUserName': Mock.Random.cname(),
        'status|1-2': 1,
        'toolName': Mock.Random.csentence(5, 9),
        'content': Mock.Random.csentence(20, 50),
        'userName': Mock.Random.cname(),
        'finishTime': Mock.Random.date() + ' ' + Mock.Random.time()
      }]
    }
  }
});
Mock.mock('http://aaanew15-chart', {
  'code': 0,
  'content|1-5': [{
    'hospitalName': Mock.Random.csentence(5, 9),
    'createUserName|1-10': Mock.Random.cword(),
    'categoryName': Mock.Random.csentence(5, 9),
    'workNum|0-1000': 1,
    'doNum|0-100': 1,
    'percent|0-100.2': 1
  }]
});


Mock.mock('http://aaanew16', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'surveyName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': 1,
        'customerName': Mock.Random.cname(),
        'userName': Mock.Random.cname(),
        'remark': Mock.Random.csentence(20, 50)
      }]
    }
  }
});


Mock.mock('http://aaanew17-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': 1,
        'customerName': Mock.Random.cname(),
        'itemName': Mock.Random.csentence(5, 9),
        'itemGrounpName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'content': Mock.Random.csentence(20, 50),
        'userName': Mock.Random.cname()
      }]
    }
  }
});
Mock.mock('http://aaanew17-chart', {
  'code': 0,
  'content|1-5': [{
    'hospitalName': Mock.Random.csentence(5, 9),
    'customerID|100000-999999': 1,
    'customerName|1-10': Mock.Random.cword(),
    'itemName': Mock.Random.csentence(5, 9),
    'itemGrounpName': Mock.Random.csentence(5, 9),
    'chargeName': Mock.Random.csentence(5, 9),
    'num|0-10000': 1,
  }]
});



Mock.mock('http://aaanew18', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'provinceName': Mock.Random.province(),
        'cityName': Mock.Random.city(),
        'districtName': Mock.Random.county(),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'itemGrounpName': Mock.Random.csentence(5, 9),
        'itemName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'channelGroupName': Mock.Random.csentence(5, 9),
        'channelName': Mock.Random.csentence(5, 9),
        'storeName': Mock.Random.csentence(5, 9),
        'memberCategoryName': Mock.Random.csentence(5, 9),
        'visitStatus|0-1': 1,
        'newOldType|0-1': 1
      }]
    }
  }
});



Mock.mock('http://aaanew19-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'itemGrounpName': Mock.Random.csentence(5, 9),
        'itemName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'channelGroupName': Mock.Random.csentence(5, 9),
        'channelName': Mock.Random.csentence(5, 9),
        'storeName': Mock.Random.csentence(5, 9),
        'userName': Mock.Random.cname(),
        'visitStatus|0-1': 1,
        'newOldType|0-1': 1
      }]
    }
  }
});
Mock.mock('http://aaanew19-chart', {
  'code': 0,
  'content|1-5': [{
    'hospitalName': Mock.Random.csentence(5, 9),
    'userName|1-10': Mock.Random.cword(),
    'deptName|1-10': Mock.Random.cword(),
    'channelName|1-10': Mock.Random.cword(),
    'storeName|1-10': Mock.Random.cword(),
    'totalNum|1-1000': 1,
    'triageNum|1-500': 1,
    'percent|0-100.2': 1
  }]
});



Mock.mock('http://aaanew20-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'exploitUserName': Mock.Random.cname(),
        'managerUserName': Mock.Random.cname(),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'itemGrounpName': Mock.Random.csentence(5, 9),
        'itemName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'channelGroupName': Mock.Random.csentence(5, 9),
        'channelName': Mock.Random.csentence(5, 9),
        'storeName': Mock.Random.csentence(5, 9),
        'firstVisitTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'visitStatus|0-1': 1,
        'vistTime|0-365': 1,
        'firstDealTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'dealStatus|0-1': 1,
        'dealTime|0-365': 1,
        'amount|0-1000000': 1,
        'realAmount|0-1000000': 1
      }]
    }
  }
});
Mock.mock('http://aaanew20-chart', {
  'code': 0,
  'content|1-5': [{
    'hospitalName': Mock.Random.csentence(5, 9),
    'deptName|1-10': Mock.Random.cword(),
    'itemName|1-10': Mock.Random.cword(),
    'channelName|1-10': Mock.Random.cword(),
    'storeName|1-10': Mock.Random.cword(),
    'itemGrounpName': Mock.Random.csentence(5, 9),
    'channelGroupName': Mock.Random.csentence(5, 9),
    'num|1-1000': 1,
    'amount|1-500000.2': 1,
    'realAmount|0-10000.2': 1
  }]
});



Mock.mock('http://aaanew21', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'customerID|100000-999999': Mock.Random.natural(),
        'customerName': Mock.Random.cname(),
        'mobile|10000000-99999999': 1,
        'symptomName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'channelGroupName': Mock.Random.csentence(5, 9),
        'channelName': Mock.Random.csentence(5, 9),
        'storeName': Mock.Random.csentence(5, 9),
        'type|0-2': 1,
        'clinicType|1-4': 1,
        'newOldType|0-1': 1
      }]
    }
  }
});



Mock.mock('http://aaanew22', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'userName': Mock.Random.cname(),
        'clinicType|1-4': 1,
        'newOldType|0-1': 1,
        'triageNum|0-100': 1,
        'dealNum|0-100': 1,
        'percent|0-100.2': 1,
        'amount|0-1000000.2': 1,
        'price|0-1111111.2': 1
      }]
    }
  }
});



Mock.mock('http://aaanew23-record', {
  'code': 0,
  'content': {
    'page': {
      'pageNumber': 1,
      'totalPages': 1,
      'total': 10,
      'content|10': [{
        'createTime': Mock.Random.date() + ' ' + Mock.Random.time(),
        'hospitalName': Mock.Random.csentence(5, 9),
        'orderType|1-3': 1,
        'orderID|100000-999999': 1,
        'customerID|100000-999999': 1,
        'customerName': Mock.Random.cname(),
        'birthday|1-1000': 1,
        'itemGrounpName': Mock.Random.csentence(5, 9),
        'itemName': Mock.Random.csentence(5, 9),
        'chargeName': Mock.Random.csentence(5, 9),
        'channelGroupName': Mock.Random.csentence(5, 9),
        'channelName': Mock.Random.csentence(5, 9),
        'storeName': Mock.Random.csentence(5, 9),
        'newOldType|0-1': 1,
        'visitStatus|0-1': 1,
        'dealStatus|0-1': 1,
        'dealTime|0-365': 1,
        'price|0-1000000': 1,
        'amount|0-1000000': 1
      }]
    }
  }
});