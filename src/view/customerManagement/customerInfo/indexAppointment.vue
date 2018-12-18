/** * 预约情况页面 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAppointment.tit1')}}</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAppointment.tit2')}}</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>{{$t('indexAppointment.tit3')}}</h3>
      </div>
      <Table stripe :columns="col2" :data="data2"></Table>
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
        cusName: '',
        cusId: '',
        col: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 50
          },
          {
            title: this.$t('appointmentAdd.label1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('appointmentAdd.label2'),
            width: 80,
            render: (h, params) => {
              if(params.row.appointmentdate) {
                const text = params.row.appointmentdate.split(' ')[0];
                return h('span', text);
              }
            }
          },
          {
            title: this.$t('appointmentAdd.label3'),
            width: 115,
            render: (h, params) => {
              const text = `${params.row.appointmentstarttime}-${params.row.appointmentendtime}`;
              return h('span', text);
            }
          },
          {
            title: this.$t('appointmentAdd.label4'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('indexAppointment.colTit1'),
            width: 60,
            key: 'code'
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('indexAppointment.colTit2') 
                : this.$t('indexAppointment.colTit3');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('indexAppointment.colTit4'), 
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
            title: this.$t('indexAppointment.colTit5'), 
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserHospitalName}】【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
						render: (h, params) => {
							if(params.row.content) {
								return h(resizeRemark, {
									props: {
										remark: params.row.content
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
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row, '1')
                    }
                  }
                }, this.$t('publicSet.edit')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, '1')
                    }
                  }
                }, this.$t('publicSet.del'))
              ])
            }
          }
        ],
        data: [],
        data1: [],
        data2: [],
        col1: [
          {
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 50
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            render: (h, params) => {
              const color = params.row.key
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.key
                ? this.$t('indexAppointment.colTit6') 
                : this.$t('indexAppointment.colTit7');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('appointmentAdd.label2'),
            width: 80,
            render: (h, params) => {
              if(params.row.appointmentDate) {
                const text = params.row.appointmentDate.split(' ')[0];
                return h('span', text);
              }
            }
          },
          {
            title: this.$t('appointmentAdd.label3'),
            width: 115,
            render: (h, params) => {
              const text = `${params.row.appointmentStartTime}-${params.row.appointmentEndTime}`;
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              const text = params.row.status === -1 
                ? this.$t('indexAppointment.colTit8') 
                : params.row.status === 1 
                ? this.$t('indexAppointment.colTit2') 
                : this.$t('indexAppointment.colTit3');
              return h('span', text);
            }
          },
          {
            title: this.$t('appointmentAdd.label1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('indexAppointment.colTit9'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('treatAdd.label'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('indexAppointment.colTit4'),
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
            title: this.$t('indexAppointment.colTit5'),
            width: 80,
            render: (h, params) => {
              if (params.row.key) {
                const text = `【${params.row.createUserHospitalName}】【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
                return h('span', text);
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
              if (params.row.key) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'edit'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.toEdit(params.row, '2')
                      }
                    }
                  }, this.$t('publicSet.edit')),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'ios-trash-outline'
                    },
                    on: {
                      click: () => {
                        this.remove(params.row, '2')
                      }
                    }
                  }, this.$t('publicSet.del'))
                ])
              }
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
            title: this.$t('appointmentAdd.label1'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('appointmentAdd.label2'),
            width: 80,
            render: (h, params) => {
              if(params.row.appointmentdate) {
                const text = params.row.appointmentdate.split(' ')[0];
                return h('span', text);
              }
            }
          },
          {
            title: this.$t('appointmentAdd.label3'),
            width: 115,
            render: (h, params) => {
              if(params.row.appointmenttimestart && params.row.appointmenttimeend) {
                const start = params.row.appointmenttimestart.split(' ')[1];
                const end = params.row.appointmenttimeend.split(' ')[1];
                return h('span', start + '-' + end);
              }
            }
          },
          {
            title: this.$t('indexAppointment.colTit9'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('surgeryAdd.label1'),
            width: 60,
            render: (h, params) => {
              const color = params.row.anesthesiatype === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.anesthesiatype === 1 
                ? this.$t('surgeryAdd.label2') 
                : this.$t('surgeryAdd.label3');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('treatAdd.label'),
            width: 80,
            render: (h, params) => {
              const list = params.row.chargeListName.split(',');
              return h('ul', list.map(item => {
                return h('li', item);
              }));
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
            title: this.$t('indexAppointment.colTit4'),
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
            title: this.$t('indexAppointment.colTit5'),
            width: 80,
            render: (h, params) => {
              const text = `【${params.row.createUserHospitalName}】【${params.row.createUserDeptName}】【${params.row.createUserName}】`;
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            render: (h, params) => {
              const text = params.row.status === 0 
                ? this.$t('indexAppointment.colTit12') 
                : params.row.status === 1 
                ? this.$t('indexAppointment.colTit13') 
                : this.$t('indexAppointment.colTit14');
              return h('span', text);
            }
          },
          {
            title: this.$t('indexAppointment.colTit10'),
            width: 80,
            render: (h, params) => {
              if (params.row.starttime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.starttime
                  }
                })
              }
            }
          },
          {
            title: this.$t('indexAppointment.colTit11'),
            width: 80,
            render: (h, params) => {
              if (params.row.endtime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.endtime
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
              const display = params.row.status === 0
                ? 'inline-block'
                : 'none';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    display: display,
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row, '3')
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
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.remove(params.row, '3')
                    }
                  }
                }, this.$t('publicSet.del')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'printer'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toPrint(params.row)
                    }
                  }
                }, this.$t('publicSet.print'))
              ])
            }
          }
        ]
      }
    },
    computed: {
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'indexAppointment') {
          this.getList(this.cusId);
        }
      },
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId');
      this.cusName = sessionStorage.getItem('cusName');
      this.getList(this.cusId);
    },
    methods: {
      getList(id) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getAppointments.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            const _data = res.data.content.appointmentList || [];
            const offline = res.data.content.treatList.map(item => {
              return {
                ...item,
                key: true,
                time: new Date(item.appointmentDate + ' 00:00:00')
              };
            }) || [];
            const onLine = res.data.content.betterTreatList.map(item => {
              return {
                ...item,
                key: false,
                appointmentDate: item.appointStartTime,
                appointmentEndTime: item.appointEndTime,
                hospitalName: item.guardHospitalName,
                userName: item.guardDoctorName,
                chargeName: item.guardChargeName,
                createTime: item.createDate,
                time: new Date(item.appointmentDate + ' 00:00:00')
              };
            }) || [];
            const _data2 = res.data.content.surgeryList.map(item => {
              const list = item.detailList.map(s => s.chargeName.replace(/,/g, ''));
              return {
                ...item,
                chargeListName: list.join(',')
              };
            }) || [];
            if(_vm.langRouterKey !== 'indexAppointment') {
              _vm.data = _data;
              _vm.data1 = [...offline, ...onLine].sort((x, y) => y.time - x.time);
              _vm.data2 = _data2;
            } else {
              _vm.requestList(_data, ['content']).then(res => _vm.data = res);
              _vm.requestList([...offline, ...onLine], ['chargeName', 'remark']).then(res => _vm.data1 = res.sort((x, y) => y.time - x.time));
              _vm.requestList(_data2, ['remark', 'chargeListName']).then(res => _vm.data2 = res);
            }
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //修改预约信息
      toEdit(data, type) {
        let _url = '';
        let _text = '';
        switch (type) {
          case '1':
            _url = '/appointmentUpdate';
            _text = 'indexAppointment.tit4';
            break;
          case '2':
            _url = '/treatUpdate';
            _text = 'indexAppointment.tit5';
            break;
          case '3':
            _url = '/surgeryUpdate';
            _text = 'indexAppointment.tit6';
            break;
        }
        let breadData = [
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
      //取消订单
      remove(data, type) {
        let _vm = this;
        let _url = '';
        switch (type) {
          case '1':
            _url = 'guard-webManager/customerRecord/appointmentDelete.jhtml'
            break;
          case '2':
            _url = 'guard-webManager/customerRecord/treatDelete.jhtml'
            break;
          case '3':
            _url = 'guard-webManager/customerRecord/surgeryDelete.jhtml'
            break;
        }
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('indexAppointment.msg'),
          onOk: () => {
            _vm.$http.post({
              url: _url,
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList(_vm.cusId);
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'indexAppointment') {
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
          }
        });
      },
      //打印
      toPrint(data) {
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
            url: '/printView',
            text: 'printView.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/printView',
          query: {
            id: data.id,
            type: 'surgery',
          }
        });
      },
    }
  }

</script>
