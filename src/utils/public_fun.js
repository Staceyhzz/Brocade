/**
 * @method          count   表格数字、金额遍历返回最大值宽度
 * @param {Array}   data    需要计算的数据
 * @param {Array}   keys    需要计算的数据字段
 */
const count = (data, keys) => {
  let propsBoxs = keys.map(prop => {
    return {
      length: 0,
      key: prop,
      val: 0,
      width: 0
    };
  });

  data.map(item => {
    propsBoxs.map(list => {
      if(!item[list.key]) {
        item[list.key] = 0;
      }
      if((item[list.key] + '').length > list.length) {
        list.length = (item[list.key] + '').length;
        list.val = item[list.key];
      }
    });
  });

  propsBoxs.map(item => {
    item.width = item.length * 8 + 27 > 50
      ? item.length * 8 + 27
      : 50;
  });
  return propsBoxs;
};

/**
 * @method           judgeMerageKeys   判断单元格向下合并辅助条件
 * @param {Object}   data              需要对比的对象之一
 * @param {Object}   nextData          需要对比的对象之一
 * @param {Array}    keys              需要对比的字段集合
 */
const judgeMerageKeys = (data, nextData, keys) => {
  if(keys.length === 0) {
    return true
  }
  let bool = true;
  keys.map(item => {
    if(data[item] !== nextData[item]) {
      bool = false;
    }
  })
  return bool;
};

/**
 * @method           combineCell   单元格行合并
 * @param {Array}    data          需要合并的数据
 * @param {String}   key           需要合并的字段，目前只支持1个
 * @param {Array}    pre           合并的前提条件，以['a', 'b']形式传入，表示在字段a和b一致下合并
 */
const combineCell = (data, key, pre = []) => {
  let k = 0;
  let i = null;
  let realIndex = 1;
  console.log(pre)
  while (k < data.length) {
    data[k][key + 'Merge'] = {
      rowSpanNum: 1,
      display: false,
      indexNum: realIndex
    };
    for (i = k + 1; i <= data.length - 1; i++) {
      if(data[k][key] === data[i][key] && judgeMerageKeys(data[k], data[i], pre)) {
        data[k][key + 'Merge']['rowSpanNum']++;
        data[i][key + 'Merge'] = {
          rowSpanNum: 1,
          display: true,
          indexNum: realIndex
        };
      } else {
          realIndex++;
          break;
      }
    }
    k = i;
  }
  console.log(data)
  return data;
};

/**
 * @method            getReporterPower   获取报表权限
 *                                       0  无权限
 *                                       1  集团
 *                                       2   机构
 *                                       3   个人
 * @param {string}    data               报表的id
 */
const getReporterPower = (id) => {
  const data = JSON.parse(localStorage.getItem('reportPower')) || [];
  const index = data.findIndex(item => item.id === id);
  if(index >= 0) {
    console.log(data[index].scope + 'repower')
    return data[index].scope;
  } else {
    console.log('error-repower')
    return 3
  }
  // const num = Math.floor(Math.random() * 3 + 1);
  // return num;
};

/**
 * @method            getHeadquarters    判断是否是集团总部
 *                    目前id为1默认为集团总部，可修改
 */
const getHeadquarters = () => {
  const id = localStorage.getItem('hospId');
  if(id === '1') {
    return true;
  } else {
    return false;
  }
};

/**
 * @method           getTypeTree   类型列表转树型结构
 * @param {Array}    data          需要转换成树型的数据列表
 * @param {Array}    props         转换成树型结构时数据对象结构
 * @param {Boolean}  expand        是否默认展开，默认为 true
 * @param {Number}   key           当前等级
 */
const getTypeTree = (data, props, expand=true, level=0) => {
  let _data = [];
  for(let i = 0; i < data.length; i++) {
    let _list = {};
    props.map(item => {
      _list[item] = data[i][item];
    });
    if(expand) {
      _list.expand = true;
    }
    //如果父级下一个存在并且级别与当前级别相等
    if((i + 1) < data.length && data[i + 1].level === level) {
      _list.children = [];
    } else {
      let box = [];
      for(let a = i + 1; a < data.length; a++) {
        //子级下一个级别与当前级别相等，跳出循环
        if(data[a].level === level) {
          i = a - 1;
          break;
        }
        box.push(data[a]);
        //如果是最后一个
        if(a === data.length - 1) {
          i = a;
          break;
        }
      }
      _list.children = getTypeTree(box, props, expand, level + 1);
    }
    _data.push(_list);
  };
  return _data;
};


exports.install = (Vue, ops) => {
  Vue.prototype.tableCount = count;
  Vue.prototype.combineCell = combineCell;
  Vue.prototype.getReporterPower = getReporterPower;
  Vue.prototype.getHeadquarters = getHeadquarters;
  Vue.prototype.getTypeTree = getTypeTree;
};