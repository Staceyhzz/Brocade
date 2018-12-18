/** 
 * 今日顾客动态 
 */

<template>
  <div class="container-box cusDirection">
    <div class="container-header">
      <h2>{{$t('layoutNav.customerDirection')}}</h2>
      <ul class="header-btn-group">
        <li class="float-left">
          <Select v-model="formSearch.hospitalID" style="width:200px" v-if='hospKey' @on-change='change'>
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <TabPane :label="$t('customerDirection.tit1')" name="name1">
          <Table :columns="col1" :data="data1" border></Table>
        </TabPane>
        <TabPane :label="$t('customerDirection.tit2')" name="name2">
          <Table :columns="col" :data="data" border></Table>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hospKey: true,
        formSearch: {
          hospitalID: localStorage.getItem('hospId') * 1
        },
        col: [
					{
            title: this.$t('customerDirection.colTit1'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list1.map(item => {
                const _text = item.time.split(' ')[1] + '-' + item.appointmentEndTime.split(' ')[1]
                const _text1 = item.status === 11 ? this.$t('publicSet.consult') : item.status === 12 ? this.$t('publicSet.treat') : this.$t('publicSet.surgery')
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text),
                  h('p', _text1)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit2'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list2.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit3'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list3.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    style: {
                      position: 'relative',
                      height: '40px'
                    }
                  }, [
                    h('Spin', {
                      props: {
                        size: 'large',
                        fix: true,
                      }
                    })
                  ]),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit4'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list4.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit5'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list5.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit6'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list6.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit7'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list7.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    style: {
                      position: 'relative',
                      height: '40px'
                    }
                  }, [
                    h('Spin', {
                      props: {
                        size: 'large',
                        fix: true,
                      }
                    })
                  ]),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit8'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list8.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
        ],
        col1: [
					{
            title: this.$t('customerDirection.colTit1'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list1.map(item => {
                const _text = item.time.split(' ')[1] + '-' + item.appointmentEndTime.split(' ')[1]
                const _text1 = item.status === 11 ? this.$t('publicSet.consult') : item.status === 12 ? this.$t('publicSet.treat') : this.$t('publicSet.surgery')
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text),
                  h('p', _text1)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit2'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list2.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit3'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list3.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    style: {
                      position: 'relative',
                      height: '40px'
                    }
                  }, [
                    h('Spin', {
                      props: {
                        size: 'large',
                        fix: true,
                      }
                    })
                  ]),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit4'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list4.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit5'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list5.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit6'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list6.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit7'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list7.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    style: {
                      position: 'relative',
                      height: '40px'
                    }
                  }, [
                    h('Spin', {
                      props: {
                        size: 'large',
                        fix: true,
                      }
                    })
                  ]),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
          {
            title: this.$t('customerDirection.colTit8'),
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', params.row.list8.map(item => {
                const _text = item.time.split(' ')[1] || ''
                return h('div', {
                  style: {
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: '30px'
                  },
                  on: {
                    'click': () => {
                      this.toCusIndex(item.customerID, item.customerName)
                    }
                  }
                }, [
                  h('div', {
                    class: 'circle'
                  }),
                  h('p', item.customerName),
                  h('p', _text)
                ])
              }))
            }
          },
        ],
        data: [],
        data1: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList
      },
    },
    created() {
			this.hospKey = this.getHeadquarters();
      if (this.hospKey) {
        this.$store.dispatch('setSelectAllHospList')
      }
      this.getList2()
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/customerDirection/list.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            if (res.data.code === 0) {
              let _data = res.data.content || [],
                _obj = {
                  list1: _data.filter(item => item.status === 11 || item.status === 12 || item.status === 13).sort(
                    (x, y) => new Date(x.time.replace(/-/, "/")).getTime() - new Date(y.time.replace(/-/, "/"))
                    .getTime()),
                  list2: _data.filter(item => item.status === 2).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                    .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                  list3: _data.filter(item => item.status === 3).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                    .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                  list4: _data.filter(item => item.status === 4).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                    .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                  list5: _data.filter(item => item.status === 5).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                    .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                  list6: _data.filter(item => item.status === 6).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                    .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                  list7: _data.filter(item => item.status === 7).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                    .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                  list8: _data.filter(item => item.status === 8).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                    .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                }
              console.log(_obj)
              _vm.data.splice(0, 1, _obj)
              console.log(res)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList2() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerDirection/dynamic.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            let _data = res.data.content || [],
              _obj = {
                list1: _data.filter(item => item.status === 11 || item.status === 12 || item.status === 13).sort(
                  (x, y) => new Date(x.time.replace(/-/, "/")).getTime() - new Date(y.time.replace(/-/, "/"))
                  .getTime()),
                list2: _data.filter(item => item.status === 2).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                  .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                list3: _data.filter(item => item.status === 3).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                  .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                list4: _data.filter(item => item.status === 4).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                  .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                list5: _data.filter(item => item.status === 5).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                  .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                list6: _data.filter(item => item.status === 6).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                  .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                list7: _data.filter(item => item.status === 7).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                  .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
                list8: _data.filter(item => item.status === 8).sort((x, y) => new Date(x.time.replace(/-/, "/"))
                  .getTime() - new Date(y.time.replace(/-/, "/")).getTime()),
              }
            console.log(_obj)
            _vm.data1.splice(0, 1, _obj)
            console.log(res)
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      change() {
				this.getList()
				this.getList2()
      },
      //跳转客户详情
      toCusIndex(id, name) {
        let breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/customer',
            text: 'layoutNav.customerManage'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ]
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
    }
  }

</script>

<style>
  .cusDirection .circle {
    width: 30px;
    height: 30px;
    margin: 5px auto;
    border-radius: 50%;
    background-color: #3399ff;

  }

</style>
