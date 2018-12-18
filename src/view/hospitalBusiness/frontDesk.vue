/** 
 * 接待工作台 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.receptionFront')}}</h2>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('frontDesk.menu1')">
          <Form inline ref='formSearch' :model='formSearch' @submit.native.prevent>
            <Form-item prop='query'>
              <Input v-model.trim="formSearch.query" :placeholder="$t('onlineDesk.placeholder')" style="width: 350px" @on-enter="getSearch(formSearch)"
                :maxlength='15'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch(formSearch)">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Alert v-if='key'>
            {{$t('onlineDesk.searchTit')}}
            <div slot="desc" v-if='data.length === 0'>
              <p>{{$t('onlineDesk.searchMsgNo')}}</p>
              <Button type="primary" @click='toNew'>{{$t('onlineDesk.searchBtn')}}</Button>
            </div>
            <div slot="desc" v-else>
              <p>{{$t('onlineDesk.searchMsg',[data.length])}}</p>
            </div>
          </Alert>
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('frontDesk.menu2')">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('frontDesk.menu3')">
          <Table stripe :columns="col2" :data="data2"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('frontDesk.menu4')">
          <Table stripe :columns="col3" :data="data3"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('frontDesk.menu5')">
          <Table stripe :columns="col4" :data="data4"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('frontDesk.menu6')">
          <Table stripe :columns="col5" :data="data5"></Table>
        </Tab-pane>
      </Tabs>
      <Modal :title="$t('frontDesk.modalTit1')" width='700' v-model="modalDetail" :closable="false" class-name="vertical-center-modal">
        <Tabs>
          <Tab-pane :label="$t('frontDesk.menu7')">
            <Table stripe :columns="colDetail" :data="dataDetail" :height='350'></Table>
          </Tab-pane>
          <Tab-pane :label="$t('frontDesk.menu8')">
            <Table stripe :columns="colDetail1" :data="dataDetail1" :height='350'></Table>
          </Tab-pane>
        </Tabs>
      </Modal>
      <Modal :title="$t('frontDesk.btn4')" v-model="modalRes" :closable="false" @on-ok="okRes" :loading="loadingRes" class-name="vertical-center-modal">
        <Form :label-width="100" label-position="right">
          <Form-item :label="$t('frontDesk.colTit1')">
            <span>{{resName}}({{resId}})</span>
          </Form-item>
          <Form-item :label="$t('frontDesk.colTit20')">
            <span>{{resAmount}}</span>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
	import resizeTime from 'components/tableResizeTime.vue';
	import resizeCus from 'components/tableResizeCus.vue';
	import resizeRemark from 'components/tableResizeRemark.vue';
  export default {
    components: {
			resizeTime,
			resizeCus,
			resizeRemark
    },
    data() {
      return {
        key: false,
        RegisterEnable: '',
        resLoad: false,
        resAmount: '',
        resName: '',
        resId: '',
        formSearch: {
          query: ''
        },
        modalDetail: false,
        modalRes: false,
        loadingRes: true,
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 40
          },
          {
            title: this.$t('frontDesk.colTit1'),
						width: 60,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.id, params.row.name);
                  }
                }
              });
            }
          },
          {
            title: this.$t('labelPublic.sjh'),
            width: 80,
            key: 'mobile'
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 30,
            key: 'gender'
          },
          {
            title: this.$t('labelPublic.hy'),
            width: 60,
            key: 'memberCategoryName'
          },
          {
            title: this.$t('labelPublic.jtly'),
            width: 60,
            key: 'channelName'
          },
          {
            title: this.$t('labelPublic.nl'),
            width: 40,
            key: 'age'
          },
          {
            title: this.$t('frontDesk.colTit2'),
						width: 60,
						render: (h, params) => {
              const color = params.row.visit === '1' 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.visit === '1' 
                ? this.$t('frontDesk.label1') 
                : this.$t('frontDesk.label2');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('frontDesk.colTit3'),
						width: 60,
						render: (h, params) => {
              const color = params.row.deal === '1' 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.deal === '1' 
                ? this.$t('frontDesk.label3') 
                : this.$t('frontDesk.label4');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 60,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'document-text'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.detail(params.row)
                    }
                  }
                }, this.$t('frontDesk.btn1')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'merge'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.id)
                    }
                  }
                }, this.$t('frontDesk.btn2'))
              ])
            }
          }
        ],
        col1: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.xm'),
            key: 'userName'
          },
          {
            title: this.$t('frontDesk.colTit9'),
            key: 'categoryid',
            render: (h, params) => {
              if (params.row.categoryid == 0) {
                return h('span', {
                  style: {
                    color: 'red'
                  }
                }, this.$t('frontDesk.colTit10'))
              } else if (params.row.categoryid != 0) {
                const _color = params.row.categoryType == 1 ? 'blue' : 'orange'
                return h('span', {
                  style: {
                    color: _color
                  }
                }, params.row.categoryName)
              }
            }
          }
        ],
        col2: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 40
          },
          {
            title: this.$t('frontDesk.colTit11'),
            width: 80,
            render: (h, params) => {
              let _src = ''
              if (params.row.customerImageUrl) {
                _src = this.baseImgURL + params.row.customerImageUrl
              } else {
                _src = require('assets/img/default-avatar.png')
              }
              return h('div', {
                style: {
                  width: '60px',
                  height: '60px',
                  margin: '10px 0'
                }
              }, [
                h('img', {
                  attrs: {
                    src: _src
                  },
                  style: {
                    display: 'block',
                    width: '100%',
                    height: '100'
                  }
                })
              ])
            }
          },
          {
            title: this.$t('frontDesk.colTit1'),
            width: 60,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerID
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('frontDesk.colTit12'),
            width: 80,
            key: 'mobile'
          },
          {
            title: this.$t('frontDesk.colTit6'),
            width: 90,
            key: 'time'
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'type'
          },
          {
            title: this.$t('frontDesk.colTit13'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('frontDesk.colTit14'),
            width: 100,
            key: 'content',
            render: (h, params) => {
              return h('div', {
                domProps: {
                  innerHTML: params.row.content
                }
              })
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
                    icon: 'merge'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.customerID)
                    }
                  }
                }, this.$t('frontDesk.btn3'))
              ])
            }
          }
        ],
        col3: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 40
          },
          {
            title: this.$t('frontDesk.colTit1'),
            width: 60,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerID
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('frontDesk.colTit15'),
						width: 60,
						render: (h, params) => {
              const color = params.row.dept === 0 
                ? '#4172F6' 
                : '#FF6F76';
              return h('span', {
                style: {
                  color: color
                }
              }, params.row.assignUser);
            }
          },
          {
            title: this.$t('frontDesk.colTit16'),
            width: 60,
            key: 'managerUserName'
          },
          {
            title: this.$t('frontDesk.colTit17'),
            width: 50,
            render: (h, params) => {
              const color = params.row.newOldType === 2 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.newOldType === 2 
                ? this.$t('publicSet.oldCus') 
                : this.$t('publicSet.newCus');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.lx'),
            width: 60,
            key: 'clinicType',
            render: (h, params) => {
							const index = this.clinicTypeList.findIndex(item => item.id === params.row.clinicType);
							if(index >= 0) {
								return h('span', this.$t(this.clinicTypeList[index].lang));
							}
            }
          },
          {
            title: this.$t('frontDesk.colTit18'),
            width: 80,
            key: 'createTime',
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
            title: this.$t('frontDesk.colTit19'),
            width: 60,
            key: 'createUser'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
							const _display = this.RegisterEnable === '1' 
								? 'inline-block' 
								: 'none';
							const _display1 = params.row.status === 0 
								? 'inline-block' 
								: 'none';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'document-text',
                    loading: this.resLoad,
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
                    display: _display,
                  },
                  on: {
                    click: () => {
                      this.register(params.row.customerID)
                    }
                  }
                }, this.$t('frontDesk.btn4')),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-redo'
                  },
                  style: {
                    display: _display1,
                    verticalAlign: 'middle',
                    margin: '5px 3px 5px 0',
                  },
                  on: {
                    click: () => {
                      this.leave(params.row)
                    }
                  }
                }, this.$t('frontDesk.btn5'))
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
						title: this.$t('frontDesk.colTit21'),
						width: 80,
            key: 'assignUserName'
          },
          {
            title: this.$t('frontDesk.colTit1'),
						width: 80,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerID
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName);
                  }
                }
              });
            }
          },
          {
            title: this.$t('frontDesk.colTit22'),
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
            title: this.$t('frontDesk.colTit23'),
						width: 80,
            key: 'createUserName'
          },
          {
            title: this.$t('triage.label4'),
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
        ],
        col5: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 40
          },
          {
            title: this.$t('frontDesk.colTit1'),
						width: 60,
						render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.name,
                  id: params.row.id
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.id, params.row.name);
                  }
                }
              });
            }
          },
          {
            title: this.$t('frontDesk.colTit24'),
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
            title: this.$t('frontDesk.colTit25'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 40,
            key: 'gender',
            render: (h, params) => {
							const _text = params.row.gender === 1 
								? this.$t('publicSet.man') 
								: this.$t('publicSet.woman');
              return h('span', _text)
            }
          },
          {
            title: this.$t('labelPublic.nl'),
            width: 40,
            key: 'age',
            render: (h, params) => {
              if (params.row.birthYear != 0) {
                const _time = new Date()
                const _real = _time.getFullYear() - params.row.birthYear
                return h('span', _real)
              }
            }
          },
          {
            title: this.$t('labelPublic.jtly'),
            width: 60,
            key: 'channelName'
          },
          {
            title: this.$t('triage.label1'),
            width: 60,
            key: 'symptomName'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 70,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'merge'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.id)
                    }
                  }
                }, this.$t('frontDesk.btn2'))
              ])
            }
          }
        ],
        colDetail: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('frontDesk.colTit4'),
						width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('frontDesk.colTit5'),
						width: 80,
            key: 'date'
          },
          {
            title: this.$t('frontDesk.colTit6'),
						width: 90,
            key: 'time'
          },
          {
						title: this.$t('labelPublic.lx'),
						width: 60,
            key: 'type'
          },
          {
            title: this.$t('labelPublic.ms'),
						width: 100,
            render: (h, params) => {
              return h('div', {
                domProps: {
                  innerHTML: params.row.content
                }
              })
            }
          },
        ],
        colDetail1: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('frontDesk.colTit7'),
						width: 80,
            key: 'date'
          },
          {
						title: this.$t('frontDesk.colTit8'),
						width: 120,
            key: 'chargeName'
          }
        ],
        dataDetail: [],
        dataDetail1: [],
        data: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
        data5: [],
      }
    },
    computed: {
      baseImgURL() {
        return this.$store.getters.getBaseImgURL
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
			},
			clinicTypeList () {
				return this.$store.getters.getClinicTypeList;
			},
		},
    watch: {
      langRouterKey (val) {
        if(val === 'frontDesk') {
					this.getList();
					this.getSearch(this.formSearch);
        }
      },
    },
    created() {
			this.getList();
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/frontDesk/list.jhtml',
          success: function (res) {
            const _data1 = res.data.content.ReceptionistList || [];
            const _data2 = res.data.content.AppointmentList || [];
            const _data4 = res.data.content.TriageList || [];
            const _data5 = res.data.content.NewCustomerList || [];
            if(_vm.langRouterKey !== 'frontDesk') {
              _vm.data1 = _data1;
              _vm.data2 = _data2;
              _vm.data4 = _data4;
              _vm.data5 = _data5;
            } else {
              _vm.requestList(_data1, ['categoryName']).then(res => _vm.data1 = res);
              _vm.requestList(_data2, ['type', 'content']).then(res => _vm.data2 = res);
              _vm.requestList(_data4, ['remark']).then(res => _vm.data4 = res);
              _vm.requestList(_data5, ['symptomName', 'channelName']).then(res => _vm.data5 = res);
            }
            _vm.data3 = res.data.content.VisitList || [];
            _vm.RegisterEnable = res.data.content.RegisterEnable
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //查询客户
      getSearch(form) {
        var _vm = this
        if (form.query.length === 0) {
          _vm.key = false
          _vm.data = []
        } else {
          _vm.$http.get({
            url: 'guard-webManager/frontDesk/query.jhtml',
            data: form,
            success: function (res) {
              if (res.data.code === 0) {
								const _data = res.data.content || [];
                if(_vm.langRouterKey !== 'frontDesk') {
									_vm.data = _data;
								} else {
									_vm.requestList(_data, ['memberCategoryName', 'channelName', 'gender']).then(res => _vm.data = res);
								}
                _vm.key = true;
              } else {
                console.log(res.data.desc)
              }
            },
            error: function (res) {
              console.log(res);
            }
          });
        }
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.key = false
        this.data = []
      },
      //查看详细
      detail(data) {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/frontDesk/detail.jhtml',
          data: {
            customerId: data.id
          },
          success: function (res) {
            if (res.data.code === 0) {
							const _data = res.data.content.Appointment || [];
							const _data1 = res.data.content.OrderDetail || [];
							if(_vm.langRouterKey !== 'frontDesk') {
								_vm.dataDetail = _data;
								_vm.dataDetail1 = _data1;
							} else {
								_vm.requestList(_data, ['type', 'content']).then(res => _vm.dataDetail = res);
								_vm.requestList(_data1, ['chargeName']).then(res => _vm.dataDetail1 = res);
							}
							_vm.modalDetail = true
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //查看挂号详情
      register(id) {
        let _vm = this
        _vm.resLoad = true
        _vm.$http.get({
          url: 'guard-webManager/frontDesk/registered.jhtml',
          data: {
            customerId: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              console.log(res)
              _vm.resAmount = res.data.content.Amount
              _vm.resName = res.data.content.Customer.name
              _vm.resId = res.data.content.Customer.id
              _vm.modalRes = true
              _vm.resLoad = false
            } else {
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              })
              _vm.resLoad = false
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //保存挂号订单
      okRes() {
        let _vm = this;
        _vm.$http.post({
          url: 'guard-webManager/frontDesk/addRegister.jhtml',
          data: {
            customerId: _vm.resId
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.getList();
              _vm.$Notice.success({
								title: _vm.$t('publicSet.noticeTit'),
								desc: _vm.$t('publicSet.noticeSuccess')
							});
              _vm.modalRes = false
            } else {
              if(_vm.langRouterKey !== 'frontDesk') {
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
              _vm.loadingRes = false
              _vm.$nextTick(() => {
                _vm.loadingRes = true
              })
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //跳转客户详情
      toCusIndex(id, name) {
        var breadData = [
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
      //添加客户
      toNew() {
        var breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/frontDesk',
            text: 'layoutNav.receptionFront'
          },
          {
            url: '/addNew',
            text: 'onlineDesk.tit'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/addNew',
          query: {
            type: 'front',
            mobile: this.formSearch.query
          }
        })
      },
      //跳转操作页面
      toView(id) {
        let breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/frontDesk',
            text: 'layoutNav.receptionFront'
          },
          {
            url: '/triage',
            text: 'frontDesk.btn2'
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/triage',
          query: {
            id: id
          }
        })
      },
      leave(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('frontDesk.msg1')}</p>
										<p>${_vm.$t('frontDesk.msg2')}</p>
										<p>${_vm.$t('labelPublic.mc')}：${data.customerName}</p>
										<p>${_vm.$t('labelPublic.bh')}：${data.customerID}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/frontDesk/addLeave.jhtml',
              data: {
                customerId: data.customerID
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'frontDesk') {
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
          onCancel: () => {

          }
        });
      },
    }
  }

</script>
