/** 
 * 订单情况页面 
 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexOrder.tit1')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexOrder.tit2')}}</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexOrder.tit3')}}</h3>
      </div>
      <Table stripe :columns="col2" :data="data2"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexOrder.tit4')}}</h3>
      </div>
      <Table stripe :columns="col3" :data="data3"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexOrder.tit5')}}</h3>
      </div>
      <Table stripe :columns="col4" :data="data4"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexOrder.tit6')}}</h3>
      </div>
      <Table stripe :columns="col5" :data="data5"></Table>
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {
			resizeTime,
			resizeRemark
    },
    data() {
      return {
        data: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: [],
        typeList: [{
            id: 1,
            name: '待支付'
          },
          {
            id: 2,
            name: '已取消'
          },
          {
            id: 3,
            name: '已关闭'
          },
          {
            id: 4,
            name: '可使用'
          },
          {
            id: 5,
            name: '治疗完成'
          },
          {
            id: 6,
            name: '未评价'
          },
          {
            id: 7,
            name: '已评价'
          },
          {
            id: 8,
            name: '退款中'
          },
          {
            id: 9,
            name: '退款成功'
          }
        ],
        paidType: [
          {
            id: 1,
            name: '未付款',
            color: '#FF6F76'
          },
          {
            id: 2,
            name: '已付款',
            color: '#4172F6'
          },
          {
            id: 3,
            name: '欠款',
            color: 'orange'
          }
        ],
        auditType: [
          {
            id: 1,
            name: '待审核',
            color: '#FF6F76'
          },
          {
            id: 2,
            name: '审核通过',
            color: '#4172F6'
          },
          {
            id: 3,
            name: '审核不通过',
            color: 'orange'
          }
        ],
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexOrder.colTit1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexOrder.colTit2'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexOrder.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexOrder.colTit4'),
            width: 80,
            render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit5'),
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit6'),
            width: 60,
            render: (h, params) => {
              const index = this.paidType.findIndex(item => item.id === params.row.paidstatus);
              const color = index >= 0
                ? this.paidType[index].color
                : '#2a2a2a';
              const text = index >= 0
                ? this.$t('indexOrder.paid' + params.row.paidstatus)
                : '';
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('indexOrder.colTit7'),
            width: 80,
            render: (h, params) => {
              if (params.row.paidtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.paidtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              const _display = params.row.paidstatus === 2 
                ? 'none' 
                : 'inline-block';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, '1')
                    }
                  }
                }, this.$t('publicSet.check')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, '1')
                    }
                  }
                }, this.$t('publicSet.cancel'))
              ])
            }
          }
        ],
        col1: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60,
          },
          {
            title: this.$t('indexOrder.colTit1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexOrder.colTit2'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexOrder.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexOrder.colTit4'),
            width: 80,
            render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit9'),
            width: 60,
            align: 'right',
            key: 'totalprice',
            render: (h, params) => {
              if(Number.isFinite(params.row.totalprice)) {
                return h('span', params.row.totalprice.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit10'),
            width: 80,
            render: (h, params) => {
              if(params.row.totalprice === 0) {
                return h('span', '0.00%');
              } else {
                if(Number.isFinite(params.row.finalprice) && Number.isFinite(params.row.totalprice)) {
                  if (params.row.finalprice < params.row.totalprice) {
                    const _real = (params.row.finalprice / params.row.totalprice * 100).toFixed(2);
                    return h('span', _real + '%');
                  } else {
                    return h('span', this.$t('indexOrder.colTit11'));
                  }
                }
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit12'),
            width: 60,
            align: 'right',
            key: 'finalprice',
            render: (h, params) => {
              if(Number.isFinite(params.row.finalprice)) {
                return h('span', params.row.finalprice.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit6'),
            width: 60,
            render: (h, params) => {
              const index = this.paidType.findIndex(item => item.id === params.row.paidstatus);
              const color = index >= 0
                ? this.paidType[index].color
                : '#2a2a2a';
              const text = index >= 0
                ? this.$t('indexOrder.paid' + params.row.paidstatus)
                : '';
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('indexOrder.colTit7'),
            width: 80,
            render: (h, params) => {
              if (params.row.paidtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.paidtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit8'),
            width: 60,
            render: (h, params) => {
              const color = params.row.auditstatus === 1
                ? '#FF6F76'
                : params.row.auditstatus === 3
                ? 'orange'
                : '#4172F6';
              const text = params.row.auditstatus === 1
                ? this.$t('indexOrder.audit1')
                : params.row.auditstatus === 3
                ? this.$t('indexOrder.audit3')
                : this.$t('indexOrder.audit2');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 200,
            render: (h, params) => {
              const _display = params.row.paidstatus === 1 
                ? 'inline-block' 
                : 'none';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, '2');
                    }
                  }
                }, this.$t('publicSet.check')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    display: _display,
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row)
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, '2');
                    }
                  }
                }, this.$t('publicSet.cancel'))
              ])
            }
          }
        ],
        col2: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexOrder.colTit13'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexOrder.colTit14'),
            width: 60,
            key: 'orderid'
          },
          {
            title: this.$t('indexOrder.colTit18'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexOrder.colTit19'),
            width: 80,
            render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit15'),
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit16'),
            width: 60,
            align: 'right',
            key: 'return',
            render: (h, params) => {
              if(Number.isFinite(params.row.return)) {
                return h('span', params.row.return.toFixed(2));
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit15'),
            width: 60,
            align: 'right',
            key: 'debt',
            render: (h, params) => {
              if(Number.isFinite(params.row.debt)) {
                return h('span', params.row.debt.toFixed(2));
              }
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, '3')
                    }
                  }
                }, this.$t('publicSet.check'))
              ])
            }
          }
        ],
        col3: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexOrder.colTit1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexOrder.colTit2'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexOrder.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexOrder.colTit4'),
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit5'),
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                const text = '-' + params.row.amount.toFixed(2);
                return h('span', text);
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit6'),
            width: 60,
            render: (h, params) => {
              const index = this.paidType.findIndex(item => item.id === params.row.paidStatus);
              const color = index >= 0
                ? this.paidType[index].color
                : '#2a2a2a';
              const text = index >= 0
                ? this.$t('indexOrder.paid' + params.row.paidStatus)
                : '';
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('indexOrder.colTit7'),
            width: 80,
            render: (h, params) => {
              if (params.row.paidTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.paidTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit8'),
            width: 60,
            render: (h, params) => {
              const color = params.row.auditStatus === 1
                ? '#FF6F76'
                : params.row.auditStatus === 3
                ? 'orange'
                : '#4172F6';
              const text = params.row.auditStatus === 1
                ? this.$t('indexOrder.audit1')
                : params.row.auditStatus === 3
                ? this.$t('indexOrder.audit3')
                : this.$t('indexOrder.audit2');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 150,
            render: (h, params) => {
              const _display = params.row.paidStatus === 2 
                ? 'none' 
                : 'inline-block';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, '4')
                    }
                  }
                }, this.$t('publicSet.check')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, '4')
                    }
                  }
                }, this.$t('publicSet.cancel'))
              ])
            }
          }
        ],
        col4: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexOrder.colTit1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexOrder.colTit2'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('indexOrder.colTit3'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('indexOrder.colTit4'),
            width: 80,
            render: (h, params) => {
              if (params.row.createtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit5'),
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if(Number.isFinite(params.row.amount)) {
                const text = '-' + params.row.amount.toFixed(2);
                return h('span', text);
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit6'),
            width: 60,
            render: (h, params) => {
              const index = this.paidType.findIndex(item => item.id === params.row.paidstatus);
              const color = index >= 0
                ? this.paidType[index].color
                : '#2a2a2a';
              const text = index >= 0
                ? this.$t('indexOrder.paid' + params.row.paidstatus)
                : '';
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('indexOrder.colTit7'),
            width: 80,
            render: (h, params) => {
              if (params.row.paidtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.paidtime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit8'),
            width: 60,
            render: (h, params) => {
              const color = params.row.auditstatus === 1
                ? '#FF6F76'
                : params.row.auditstatus === 3
                ? 'orange'
                : '#4172F6';
              const text = params.row.auditstatus === 1
                ? this.$t('indexOrder.audit1')
                : params.row.auditstatus === 3
                ? this.$t('indexOrder.audit3')
                : this.$t('indexOrder.audit2');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.remark) {
								return h(resizeRemark, {
									props: {
										remark: params.row.remark
									}
								})
							}
						}
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
              const _display = params.row.paidstatus === 2 
                ? 'none' 
                : 'inline-block';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row, '5')
                    }
                  }
                }, this.$t('publicSet.check')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, '5')
                    }
                  }
                }, this.$t('publicSet.cancel'))
              ])
            }
          }
        ],
        col5: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('indexOrder.colTit2'),
            width: 60,
            key: 'sn'
          },
          {
            title: this.$t('indexOrder.colTit4'),
            width: 80,
            render: (h, params) => {
              if (params.row.createDate) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createDate
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexOrder.colTit20'),
            width: 60,
            key: 'productName'
          },
          {
            title: this.$t('indexOrder.colTit21'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('indexOrder.colTit22'),
            width: 60,
            key: 'restNum'
          },
          {
            title: this.$t('indexOrder.colTit23'),
            width: 60,
            key: 'entireAmount',
            align: 'right',
            render: (h, params) => {
              if(Number.isFinite(params.row.entireAmount)) {
                return h('span', params.row.entireAmount.toFixed(2));
              }
            }
          },
          // {
          //     title: '支付方式',
          //     render: (h, params) => {
          //         return h('span', '支付宝')
          //     }
          // },
          {
            title: this.$t('indexOrder.colTit6'),
            width: 80,
            render: (h, params) => {
              const _index = this.typeList.findIndex(item => item.id === params.row.orderStatus);
              if (_index >= 0) {
                return h('span', this.$t('indexOrder.type' + params.row.orderStatus));
              }
            }
          }
        ],
        cusId: '',
        cusName: '',
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexOrder') {
          this.getId(this.cusId);
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getId(this.cusId);
    },
    methods: {
      // 获取资料
      getId(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getOrder.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _data = res.data.content.depositOrderList || [];
            const _data1 = res.data.content.orderList.map(item => {
              item.amount = item.finalprice;
              return item;
            }) || [];
            const _data2 = res.data.content.cashierList.map(item => {
              item.return = 0;
              if(Number.isFinite(item.amount) && Number.isFinite(item.debt)) {
                item.return = item.amount - item.debt;
              }
              return item;
            }) || [];
            const _data3 = res.data.content.backOrderList || [];
            const _data4 = res.data.content.depositRebateOrderList || [];
            const _col = _vm.tableCount(_data, ['amount']);
            _col.map(item => {
              const index = _vm.col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col[index].width = item.width;
              }
            });
            const _col1 = _vm.tableCount(_data1, ['totalprice', 'finalprice']);
            _col1.map(item => {
              const index = _vm.col1.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col1[index].width = item.width;
              }
            });
            const _col2 = _vm.tableCount(_data2, ['amount', 'return', 'debt']);
            _col2.map(item => {
              const index = _vm.col2.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col2[index].width = item.width;
              }
            });
            const _col3 = _vm.tableCount(_data3, ['amount']);
            _col3.map(item => {
              const index = _vm.col3.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col3[index].width = item.width;
              }
            });
            const _col4 = _vm.tableCount(_data4, ['amount']);
            _col4.map(item => {
              const index = _vm.col4.findIndex(col => col.key === item.key);
              console.log(item)
              if(index >= 0) {
                _vm.col4[index].width = item.width;
              }
            });
            if(_vm.langRouterKey !== 'indexOrder') {
              _vm.data = _data;
              _vm.data1 = _data1;
              _vm.data2 = _data2;
              _vm.data3 = _data3;
              _vm.data4 = _data4;
            } else {
              _vm.requestList(_data, ['remark']).then(res => _vm.data = res);
              _vm.requestList(_data1, ['remark']).then(res => _vm.data1 = res);
              _vm.requestList(_data2, ['remark']).then(res => _vm.data2 = res);
              _vm.requestList(_data3, ['remark']).then(res => _vm.data3 = res);
              _vm.requestList(_data4, ['remark']).then(res => _vm.data4 = res);
            }
						if (res.data.content.isBetterCustomer === 1) {
							_vm.getOnlineOrder();
						}
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      getOnlineOrder() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerRecord/getBetterOrder.jhtml',
          data: {
            customerId: _vm.cusId
          },
          success: function (res) {
            if (res.data.code === 0) {
              let _data = JSON.parse(res.data.content.content) || [];
              _data = _data.sort((x, y) => new Date(y.createDate) - new Date(x.createDate));
              const _col = _vm.tableCount(_data, ['entireAmount']);
              _col.map(item => {
                const index = _vm.col5.findIndex(col => col.key === item.key);
                console.log(item)
                if(index >= 0) {
                  _vm.col5[index].width = item.width;
                }
              });
              if(_vm.langRouterKey !== 'indexOrder') {
                _vm.data5 = _data;
              } else {
                _vm.requestList(_data, ['productName']).then(res => _vm.data5 = res);
              }
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      //取消订单
      remove(data, type) {
        let _vm = this;
        let _url = '';
        switch (type) {
          case '1':
            _url = 'guard-webManager/customerRecord/deleteDepositOrder.jhtml';
            break;
          case '2':
            _url = 'guard-webManager/customerRecord/orderDelete.jhtml';
            break;
          case '4':
            _url = 'guard-webManager/customerRecord/deleteBackOrder.jhtml';
            break;
          case '5':
            _url = 'guard-webManager/customerRecord/deleteDepositRebateOrder.jhtml';
            break;
        }
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `
            <p>${_vm.$t('indexOrder.msg1')}</p>
            <p>${_vm.$t('indexOrder.msg2')}</p>
            <p>${_vm.$t('labelPublic.gkbh')}：${this.cusId}</p>
            <p>${_vm.$t('labelPublic.gkxm')}：${this.cusName}</p>
            <p>${_vm.$t('indexOrder.msg3')}${data.amount}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: _url,
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getId(_vm.cusId);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexOrder') {
                    _vm.$Notice.error({
                      title: _vm.$t('publicSet.noticeTit'),
                      desc: res.data.desc
                    });
                  } else {
                    _vm.getLang.word(res.data.desc, (data) => {
                      _vm.$Notice.error({
                        title: _vm.$t('publicSet.noticeTit'),
                        desc: data[0].dst
                      });
                    });
                  }
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          },
        });
      },
      //查看订单
      toView(data, type) {
        let _text = '';
        let _url = '';
        switch (type) {
          case '1':
            _url = '/depositOrderView';
            _text = 'indexOrder.check1';
            break;
          case '2':
            _url = '/orderView';
            _text = 'indexOrder.check2';
            break;
          case '3':
            _url = '/repaymentOrderView';
            _text = 'indexOrder.check3';
            break;
          case '4':
            _url = '/backOrderView';
            _text = 'indexOrder.check4';
            break;
          case '5':
            _url = '/depositRebateOrderView';
            _text = 'indexOrder.check5';
            break;
        }
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: _url,
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url,
          query: {
            id: data.id
          }
        });
      },
      //修改项目订单
      toEdit(data) {
        const breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customerMsg',
            text: this.cusName
          },
          {
            url: '/orderUpdate',
            text: 'indexOrder.tit7'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/orderUpdate',
          query: {
            id: data.id
          }
        });
      }
    }
  }

</script>
