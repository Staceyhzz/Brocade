/** 
 * 住院工作台 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.InpatientDesk')}}</h2>
    </div>
    <div class="container-body">
      <Tabs :animated='false'>
        <Tab-pane :label="$t('inpatientDesk.menu1')">
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('inpatientDesk.menu2')">
          <Form inline ref='formSearch' :model='formSearch' @submit.native.prevent>
            <Form-item prop='query'>
              <Input v-model.trim="formSearch.query" :placeholder="$t('onlineDesk.placeholder')" style="width: 350px" @on-enter="getSearch"
                :maxlength='15'></Input>
            </Form-item>
            <ul class="header-btn-group not-float">
              <li class="header-item" @click="getSearch">
                <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')">
                <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Form>
          <Alert v-if='key'>
            {{$t('onlineDesk.searchTit')}}
            <div slot="desc" v-if='data1.length === 0'>
              <p>{{$t('onlineDesk.searchMsgNo')}}</p>
            </div>
            <div slot="desc" v-else>
              <p>{{$t('onlineDesk.searchMsg',[data1.length])}}</p>
            </div>
          </Alert>
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
        <Tab-pane :label="$t('inpatientDesk.menu3')">
          <Table stripe :columns="col2" :data="data2"></Table>
        </Tab-pane>
      </Tabs>
      <Modal :title="$t('inpatientDesk.btn2')" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('inpatientDesk.colTit2')">
            <span>{{formValidate.name}} —— {{formValidate.customerId}}</span>
          </Form-item>
          <Form-item :label="$t('inpatientDesk.colTit4')" prop="bedId" required>
            <Select v-model="formValidate.bedId">
              <Option v-for="item in bedList" :value="item.id" :key="item.id" :disabled='item.usage === 1'>{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark">
            <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
          </Form-item>
        </Form>
      </Modal>
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
      const validateBed = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('inpatientDesk.valid')));
        } else {
          callback();
        }
      };
      return {
        key: false,
        modal: false,
        loading: true,
        formSearch: {
          query: '',
        },
        formValidate: {
          name: '',
          customerId: '',
          bedId: '',
          remark: '',
        },
        col: [
					{
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
						title: this.$t('inpatientDesk.colTit1'),
						width: 100,
            render: (h, params) => {
              let _src = ''
              if (params.row.customerImage) {
                _src = this.baseImgURL + params.row.customerImage
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
                    height: '100%'
                  }
                })
              ])
            }
          },
          {
            title: this.$t('inpatientDesk.colTit2'),
						width: 80,
            render: (h, params) => {
              return h(resizeCus, {
                props: {
                  name: params.row.customerName,
                  id: params.row.customerid
                },
                on: {
                  'click': () => {
                    this.toCusIndex(params.row.customerid, params.row.customerName);
                  }
                }
              });
            }
          },
          {
						title: this.$t('inpatientDesk.colTit3'),
						width: 80,
						render: (h, params) => {
              if(params.row.intime) {
                return h(resizeTime, {
                  props: {
                    time: params.row.intime
                  }
                })
              }
            }
          },
          {
            title: this.$t('inpatientDesk.colTit4'),
						width: 60,
            key: 'bedName'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
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
                      this.out(params.row)
                    }
                  }
                }, this.$t('inpatientDesk.btn1'))
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
            title: this.$t('inpatientDesk.colTit2'),
						width: 80,
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
            title: this.$t('labelPublic.nl'),
						width: 60,
            key: 'age'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 100,
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
                      this.live(params.row)
                    }
                  }
                }, this.$t('inpatientDesk.btn2'))
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
						title: this.$t('labelPublic.mc'),
						width: 60,
            key: 'name'
          },
          {
            title: this.$t('bed.colTit1'),
            width: 80,
            render: (h, params) => {
              const color = params.row.usage === 0 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.usage === 0 
                ? this.$t('bed.colTit2') 
                : this.$t('bed.colTit3');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.ms'),
            key: 'remark',
            width: 100
          }
        ],
        data: [],
        data1: [],
        data2: [],
        bedList: [],
        ruleForm: {
          bedId: [{
            validator: validateBed,
            trigger: 'change'
          }],
        }
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
        if(val === 'inpatientDesk') {
					this.getList();
					this.getSearch();
        }
      },
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/inpatientDesk/page.jhtml',
          success: function (res) {
            const _data = res.data.content.InpatientList || [];
            const _data1 = res.data.content.BedList || [];
            if(_vm.langRouterKey !== 'inpatientDesk') {
              _vm.data = _data;
              _vm.data2 = _data1;
            } else {
              _vm.requestList(_data, ['bedName']).then(res => _vm.data = res);
              _vm.requestList(_data1, ['name', 'remark']).then(res => _vm.data2 = res);
            }
            _vm.bedList = res.data.content.BedList || [];
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      getSearch() {
				let _vm = this;
				if(_vm.formSearch.query === '') {
          return;
        }
        _vm.$http.get({
          url: 'guard-webManager/frontDesk/query.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            if (res.data.code === 0) {
              let _data = res.data.content || [];
							_vm.key = true;
							if(_vm.langRouterKey !== 'inpatientDesk') {
								_vm.data1 = _data;
							} else {
								_vm.requestList(_data, ['memberCategoryName', 'channelName']).then(res => _vm.data1 = res);
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
      handleReset(name) {
        this.$refs[name].resetFields()
        this.key = false
        this.data1 = []
      },
      //办理出院
      out(data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: _vm.$t('inpatientDesk.msg', [data.customerName]),
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/inpatientDesk/out.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'inpatientDesk') {
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
      //办理住院
      live(data) {
        this.$refs['formValidate'].resetFields();
        this.formValidate.customerId = data.id;
        this.formValidate.name = data.name;
        this.modal = true;
      },
      ok() {
        let _vm = this;
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/inpatientDesk/add.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code === 0) {
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modal = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'inpatientDesk') {
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
                  _vm.loading = false;
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          } else {
            _vm.loading = false;
            _vm.$nextTick(() => {
              _vm.loading = true;
            });
          }
        })
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
