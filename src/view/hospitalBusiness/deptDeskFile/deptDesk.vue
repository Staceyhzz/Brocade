/** 
 * 科室中心 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.deptDesk')}}</h2>
    </div>
    <div class="container-body">
      <Tabs :animated='false' @on-click='changeMenu'>
        <Tab-pane :label="$t('deptDesk.menu1')">
          <Form inline ref='formSearch1' :model='formSearch1' :label-width="90" label-position="right" @submit.native.prevent>
            <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
              <Input v-model.trim="formSearch1.customerName" :placeholder="$t('placeholderPublic.input')" style="width: 350px" @on-enter="getSearch1" :maxlength='20'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch1">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch1')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('deptDesk.menu2')">
          <Form inline ref='formSearch2' :model='formSearch2' :label-width="90" label-position="right" @submit.native.prevent>
            <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
              <Input v-model.trim="formSearch2.customerName" :placeholder="$t('placeholderPublic.input')" style="width: 350px" @on-enter="getSearch2" :maxlength='20'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch2">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch2')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Table stripe :columns="col2" :data="data2"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('deptDesk.menu3')">
          <Form inline ref='formSearch3' :model='formSearch3' :label-width="90" label-position="right" @submit.native.prevent>
            <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
              <Input v-model.trim="formSearch3.customerName" :placeholder="$t('placeholderPublic.input')" style="width: 350px" @on-enter="getSearch3" :maxlength='20'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch3">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch3')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Table stripe :columns="col3" :data="data3"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('deptDesk.menu4')">
          <Form inline ref='formSearch4' :model='formSearch4' @submit.native.prevent>
            <Form-item prop='query'>
              <Input v-model.trim="formSearch4.query" :placeholder="$t('onlineDesk.placeholder')" style="width: 350px" @on-enter="getSearch4(formSearch4)"
                :maxlength='15'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch4(formSearch4)">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch4')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Alert v-if='key'>
            {{$t('onlineDesk.searchTit')}}
            <div slot="desc" v-if='data4.length === 0'>
              <p>{{$t('onlineDesk.searchMsgNo')}}</p>
            </div>
            <div slot="desc" v-else>
              <p>{{$t('onlineDesk.searchMsg',[data4.length])}}</p>
            </div>
          </Alert>
          <Table stripe :columns="col4" :data="data4"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('deptDesk.menu5')">
          <Table stripe :columns="col5" :data="data5"></Table>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  import resizeCus from 'components/tableResizeCus.vue';
  export default {
    components: {
			resizeTime,
			resizeCus
    },
    data() {
      return {
				menuKey: 0,
        key: false,
        formSearch1: {
          customerName: '',
        },
        formSearch2: {
          customerName: '',
        },
        formSearch3: {
          customerName: '',
        },
        formSearch4: {
          query: ''
        },
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('deptDesk.colTit1'),
						width: 80,
            render: (h, params) => {
							const _src = params.row.customerImageUrl
								? this.baseImgURL + params.row.customerImageUrl
								: require('assets/img/default-avatar.png');
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
                    height: '100%'
                  }
                })
              ])
            }
          },
          {
            title: this.$t('deptDesk.colTit2'),
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
						title: this.$t('deptDesk.colTit3'),
						width: 80,
            render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('deptDesk.colTit4'),
						width: 80,
						render: (h, params) => {
              const color = params.row.hasOperation === 0 
                ? '#FF6F76' 
                : '#4172F6';
              const text = params.row.hasOperation === 0 
                ? this.$t('deptDesk.colTit5') 
                : this.$t('deptDesk.colTit6');
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
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.customerID, '1')
                    }
                  }
                }, this.$t('deptDesk.btn1'))
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
						title: this.$t('deptDesk.colTit1'),
						width: 80,
            render: (h, params) => {
							const _src = params.row.customerImageUrl
								? this.baseImgURL + params.row.customerImageUrl
								: require('assets/img/default-avatar.png');
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
                    height: '100%'
                  }
                })
              ])
            }
          },
          {
            title: this.$t('deptDesk.colTit2'),
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
						title: this.$t('deptDesk.colTit3'),
						width: 80,
            render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('deptDesk.colTit4'),
						width: 80,
						render: (h, params) => {
              const color = params.row.hasOperation === 0 
                ? '#FF6F76' 
                : '#4172F6';
              const text = params.row.hasOperation === 0 
                ? this.$t('deptDesk.colTit5') 
                : this.$t('deptDesk.colTit6');
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
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.customerID, '1')
                    }
                  }
                }, this.$t('deptDesk.btn1'))
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
						title: this.$t('deptDesk.colTit1'),
						width: 80,
            render: (h, params) => {
							const _src = params.row.customerImageUrl
								? this.baseImgURL + params.row.customerImageUrl
								: require('assets/img/default-avatar.png');
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
                    height: '100%'
                  }
                })
              ])
            }
          },
          {
            title: this.$t('deptDesk.colTit2'),
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
						title: this.$t('deptDesk.colTit3'),
						width: 80,
            render: (h, params) => {
              if(params.row.createTime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.createTime
                  }
                })
              }
            }
          },
          {
            title: this.$t('deptDesk.colTit4'),
						width: 80,
						render: (h, params) => {
              const color = params.row.hasOperation === 0 
                ? '#FF6F76' 
                : '#4172F6';
              const text = params.row.hasOperation === 0 
                ? this.$t('deptDesk.colTit5') 
                : this.$t('deptDesk.colTit6');
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
            width: 80,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.customerID, '1')
                    }
                  }
                }, this.$t('deptDesk.btn1'))
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
            title: this.$t('deptDesk.colTit2'),
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
						width: 60,
            key: 'mobile'
          },
          {
            title: this.$t('labelPublic.jtly'),
						width: 60,
            key: 'channelName'
          },
          {
            title: this.$t('labelPublic.hy'),
						width: 60,
            key: 'memberCategoryName'
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
                      this.toView(params.row.id, '2')
                    }
                  }
                }, this.$t('deptDesk.btn2'))
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
            title: this.$t('deptDesk.colTit2'),
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
            title: this.$t('deptDesk.colTit7'),
            width: 60,
            key: 'chargeName'
          },
          {
            title: this.$t('labelPublic.dw'),
            width: 60,
            key: 'chargeUnitName'
          },
          {
            title: this.$t('deptDesk.colTit8'),
            width: 60,
            key: 'num'
          },
          {
            title: this.$t('deptDesk.colTit9'),
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
            title: this.$t('deptDesk.colTit10'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('deptDesk.colTit11'),
            width: 80,
            key: 'operatorList',
            render: (h, params) => {
              return h('ul', params.row.operatorList.map(item => {
                const _text = typeof item.positionName == 'string' ? ('【' + item.userDeptName + '】【' + item.userName +
                  '】：' + item.positionName) : ('【' + item.userDeptName + '】【' + item.userName + '】')
                return h('li', {
                  style: {
                    padding: '5px 0'
                  }
                }, _text)
              }))
            }
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 140,
            render: (h, params) => {
							const _display = this.cusIdBox[params.row.customerID] > 1 
								? 'inline-block' 
								: 'none';
							const _online = params.row.betterOrderDetailID 
								? 'none' 
								: 'inline-block';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
                    display: _online
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.id, '3')
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
                    verticalAlign: 'middle',
                    display: _online
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('deptDesk.btn3')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
                  },
                  on: {
                    click: () => {
                      this.toView(params.row.id, '4')
                    }
                  }
                }, this.$t('deptDesk.btn4')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'printer'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle',
                  },
                  on: {
                    click: () => {
                      this.toPrint(params.row, '1')
                    }
                  }
                }, this.$t('printView.btn')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'printer'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle',
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.toPrint(params.row, '2')
                    }
                  }
                }, this.$t('deptDesk.btn5'))
              ])
            }
          }
        ],
        data: [],
        data2: [],
        data3: [],
        data4: [],
        data5: [],
        cusIdBox: {},
      }
    },
    computed: {
      baseImgURL() {
        return this.$store.getters.getBaseImgURL
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
    watch: {
      langRouterKey (val) {
        if(val === 'deptDesk') {
					this.getSearch4(this.formSearch4);
					this.getList();
        }
      },
    },
    mounted() {
      this.$store.dispatch('setPageLoading', 1);
			this.getSearch1();
    },
    methods: {
			// 今日到院所有客户
			getSearch1() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/deptDesk/customerList.jhtml',
          data: _vm.formSearch1,
          success: function (res) {
            if (res.data.code === 0) {
              _vm.data = res.data.content || [];
            } else {
              console.log(res);
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
			},
			// 今日部门到院所有客户
			getSearch2() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/deptDesk/deptCustomerList.jhtml',
          data: _vm.formSearch2,
          success: function (res) {
            if (res.data.code === 0) {
              _vm.data2 = res.data.content || [];
              console.log(res)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
			},
			// 今日本人客户
			getSearch3() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/deptDesk/userCustomerList.jhtml',
          data: _vm.formSearch3,
          success: function (res) {
            if (res.data.code === 0) {
              _vm.data3 = res.data.content || [];
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
			},
			//客户识别
			getSearch4(form) {
				let _vm = this;
				if(form.query === '') {
          return;
        }
        _vm.$http.get({
					url: 'guard-webManager/frontDesk/query.jhtml',
					data: form,
					success: function (res) {
						if (res.data.code === 0) {
							let _data = res.data.content || [];
							_vm.key = true;
							if(_vm.langRouterKey !== 'deptDesk') {
								_vm.data4 = _data;
							} else {
								_vm.requestList(_data, ['memberCategoryName', 'channelName']).then(res => _vm.data4 = res);
							}
						} else {
							console.log(res.data.desc)
						}
					},
					error: function (res) {
						console.log(res);
					}
				});
			},
			//获取今日执行记录
      getList() {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/deptDesk/pageList.jhtml',
          success: function (res) {
            if (res.data.code === 0) {
							let _data = res.data.content || [];
							_vm.cusIdBox = _data.reduce(function (prev, next) {
                prev[next.customerID] = (prev[next.customerID] + 1) || 1;
                return prev;
							}, {});
              if(_vm.langRouterKey !== 'deptDesk') {
								_vm.data5 = _data;
							} else {
								_vm.requestList(_data, ['chargeName', 'chargeUnitName']).then(res => _vm.data5 = res);
							}
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
			changeMenu(val) {
				if(this.menuKey !== val) {
					switch (val) {
						case 0:
							this.getSearch1();
							break;
						case 1:
							this.getSearch2();
							break;
						case 2:
							this.getSearch3();
							break;
						case 4:
							this.getList();
							break;
					}
				}
				this.menuKey = val;
			},
      handleReset(name) {
        this.$refs[name].resetFields();
        if (name == 'formSearch1') {
          this.getSearch1();
        } else if (name == 'formSearch2') {
          this.getSearch2();
        } else if (name == 'formSearch3') {
          this.getSearch3();
        } else {
          this.key = false;
          this.data4 = [];
        }
      },
      //删除划扣
      remove(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('deptDesk.msg'),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/deptDesk/operationDelete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                  _vm.getList();
                } else {
                  if(_vm.langRouterKey !== 'deptDesk') {
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
      //跳转客户详情
      toCusIndex(id, name) {
        const breadData = [{
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
        sessionStorage.setItem("cusName", name);
        sessionStorage.setItem("cusId", id);
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
      //跳转操作页面
      toView(id, type) {
        let _url = '';
        let _text = '';
        switch (type) {
          case '1':
            _url = '/deptDeskOperationAdd'
            _text = 'deptDeskOperationAdd.tit'
            break;
          case '2':
            _url = '/deptDeskTriage'
            _text = 'deptDesk.btn2'
            break;
          case '3':
            _url = '/deptDeskOperationUpdate'
            _text = 'deptDeskOperationUpdate.tit'
            break;
          case '4':
            _url = '/operationProduct'
            _text = 'operationProduct.tit'
            break;
        }
        const breadData = [
					{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/deptDesk',
            text: 'layoutNav.deptDesk'
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
            id: id
          }
        })
      },
      //打印
      toPrint(data, type) {
        let _type = '',
          _id = ''
        if (type === '1') {
          _type = 'operation'
          _id = data.id
        } else {
          _type = 'customerOperation'
          _id = data.customerID
        }
        let breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/deptDesk',
            text: 'layoutNav.deptDesk'
          },
          {
            url: '/printView',
            text: 'printView.tit'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/printView',
          query: {
            id: _id,
            type: _type,
          }
        })
      },
    }
  }

</script>
