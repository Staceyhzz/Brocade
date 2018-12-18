/** 
 * 回访工作台 
 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.callbackDesk')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toView('add')">
          <Icon type="plus-round"></Icon>{{$t('callbackDesk.btn2')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
        <Form-item :label="$t('callbackDesk.label1')" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" :value='nowDate' style="width: 180px" @on-change='setTime' :clearable='false'></Date-picker>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label2')" prop='categoryId'>
          <Select v-model="formSearch.categoryId" clearable style="width:162px">
            <Option v-for="item in categoryList" :value="item.id" :key="item.id" :disabled="item.status == 0">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label3')" prop='status'>
          <Select v-model="formSearch.status" style="width:162px">
            <Option value="1">{{$t('callbackDesk.label4')}}</Option>
            <Option value="0">{{$t('callbackDesk.label5')}}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label6')" prop='userName'>
					<cmptInputOpen :value='formSearch.userName' :placeholder="$t('callbackDesk.placeholder')" @on-open='addUser' @on-clear='clearUser'></cmptInputOpen>
        </Form-item>
        <Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
          <Input :maxlength='15' v-model.trim="formSearch.customerId" :placeholder="$t('placeholderPublic.input')" @on-enter="getList('1', '10', formSearch)"></Input>
        </Form-item>
        <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
          <Input :maxlength='15' v-model.trim="formSearch.customerName" :placeholder="$t('placeholderPublic.input')" @on-enter="getList('1', '10', formSearch)"></Input>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label7')" prop='name'>
          <Input :maxlength='15' v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getList('1', '10', formSearch)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch)">
            <Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
        </ul>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
      </div>
    </div>
    <Modal :title="$t('callbackDesk.modalTit')" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('callbackDesk.label2')">
          <span>{{formValidate.categoryName}}</span>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label8')" prop="tool" required>
          <Select v-model="formValidate.tool">
            <Option v-for="item in toolList" :value="item.code" :key="item.code">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('callbackDesk.label9')" prop="content" required>
          <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')"></Input>
        </Form-item>
      </Form>
    </Modal>
		<cmptChooseUserSinger :placeHolder="$t('callbackDesk.placeholder')" @setUserData="chooseUser" :openKey='userOpenKey' :activate='activate'></cmptChooseUserSinger>
  </div>
</template>

<script>
	import cmptChooseUserSinger from 'components/chooseUserSinger.vue';
	import resizeTime from 'components/tableResizeTime.vue';
	import resizeCus from 'components/tableResizeCus.vue';
  export default {
    name: 'view_callbackDesk',
    components: {
      resizeTime, resizeCus, cmptChooseUserSinger
    },
    data() {
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('callbackDesk.valid')));
        } else {
          callback();
        }
      };
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        modal: false,
        loading: true,
        formValidate: {
          categoryName: '',
          id: '',
          tool: '',
          content: '',
        },
				nowDate: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
				userOpenKey: false,
				activate: false,
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          status: '',
          categoryId: '',
          name: '',
          userId: '',
          userName: '',
          customerId: '',
          customerName: '',
        },
        col: [
					{
            title: this.$t('labelPublic.xh'),
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 50,
            key: 'status',
            render: (h, params) => {
              const color = params.row.status == 1 ? 'blue' : 'red'
              const text = params.row.status == 1 ? this.$t('callbackDesk.label4') : this.$t('callbackDesk.label5')
              return h('span', {
                style: {
                  color: color
                }
              }, text)
            }
          },
          {
            title: this.$t('callbackDesk.label1'),
            width: 80,
            key: 'tasktime',
            render: (h, params) => {
              const _text = params.row.tasktime.split(' ')[0]
              return h('span', _text)
            }
          },
          {
            title: this.$t('callbackDesk.colTit1'),
            width: 60,
						key: 'customerName',
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
            title: this.$t('callbackDesk.label2'),
            width: 60,
            key: 'categoryNameLang'
          },
          {
            title: this.$t('callbackDesk.label6'),
            width: 60,
            key: 'userName'
          },
          {
            title: this.$t('callbackDesk.label7'),
            width: 60,
            key: 'nameLang'
          },
          {
            title: this.$t('callbackDesk.label8'),
            width: 60,
            key: 'toolNameLang'
          },
          {
            title: this.$t('callbackDesk.colTit2'),
            width: 60,
            key: 'createUserName'
          },
          {
            title: this.$t('callbackDesk.colTit3'),
            width: 80,
            key: 'createtime',
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
            title: this.$t('callbackDesk.label9'),
            width: 100,
            key: 'contentLang'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 70,
            render: (h, params) => {
              if (params.row.status == 0) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small',
                      icon: 'edit'
                    },
                    on: {
                      click: () => {
                        this.toView(params.row)
                      }
                    }
                  }, this.$t('callbackDesk.btn1'))
                ])
              } else if (params.row.status == 1) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small',
                      icon: 'edit'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row)
                      }
                    }
                  }, this.$t('publicSet.edit'))
                ])
              }
            }
          }
        ],
        data: [],
        ruleForm: {
          content: [{
            validator: validateText,
            trigger: 'blur'
          }],
        }
      }
    },
    computed: {
      categoryList() {
        return this.$store.getters.getSelectCallbackCategoryInfoList
      },
      toolList() {
        return this.$store.getters.getSelectToolList
			},
			langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
		},
		watch: {
      langRouterKey (val) {
        if(val === 'callbackDesk') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    activated() {
      console.log(111111111)
      this.getList(this.pageNumber, 10, this.formSearch)
      this.$store.dispatch('setSelectCallbackCategoryInfoList')
      this.$store.dispatch('setSelectToolList')
		},
		deactivated () {
      this.activate = !this.activate;
    },
    methods: {
      //获取分页
      getList(pageNumber, pageSize, form) {
        var _vm = this;
        _vm.$store.dispatch('setPageLoading', -1)
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.getPage({
          url: 'guard-webManager/callbackDesk/callbackPageList.jhtml',
          data: form,
          success: function (res) {
            console.log(res)
            const props = ['categoryName', 'name', 'toolName', 'content'];
            const _data = res.data.content.Page.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'callbackDesk') {
              console.log(_data)
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.Page.total
            _vm.pageNumber = res.data.content.Page.pageNumber
            _vm.totalPages = res.data.content.Page.totalPages
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取回访类型
      getCategory() {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/callbackCategoryInfo.jhtml',
          success: function (res) {
            if (res.data.code == 0) {
              try {
                _vm.categoryList = res.data.content
              } catch (error) {
                _vm.categoryList = []
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
			addUser() {
				this.userOpenKey = !this.userOpenKey;
			},
      chooseUser(data) {
        this.formSearch.userId = data.id;
        this.formSearch.userName = data.name;
			},
			clearUser() {
				this.formSearch.userId = '';
        this.formSearch.userName = '';
			},
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.formSearch.startTime = moment().format('YYYY-MM-DD')
        this.formSearch.endTime = moment().format('YYYY-MM-DD')
        this.nowDate = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        this.getList(1, '10', this.formSearch)
      },
      //分页
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      //跳转客户详情
      toCusIndex(id, name) {
        var breadData = [{
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
      //跳转页面
      toView(data) {
        var _url = ''
        var _text = ''
        var _id = ''
        if (typeof data == 'string') {
          _url = '/callbackTaskBulk'
          _text = 'callbackDesk.btn2'
          _id = 'add'
        } else {
          _url = '/callbackDeskInfo'
          _text = 'callbackDesk.btn1'
          _id = data.id
        }
        var breadData = [{
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/callbackDesk',
            text: 'layoutNav.callbackDesk'
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
            id: _id
          }
        })
      },
      edit(data) {
        this.$refs['formValidate'].resetFields()
        this.formValidate.id = data.id
        this.formValidate.categoryName = data.categoryName
        this.formValidate.tool = data.tool
        this.formValidate.content = data.content
        this.modal = true
      },
      ok() {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/callbackDesk/update.jhtml',
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList(_vm.pageNumber, '10', _vm.formSearch)
                  _vm.$refs['formValidate'].resetFields()
                  _vm.modal = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'callbackDesk') {
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
                  _vm.loading = false
                  _vm.$nextTick(() => {
                    _vm.loading = true;
                  })
                }
              },
              error: function (res) {
                console.log(res);
              }
            })
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            })
          }
        })
      }

    }
  }

</script>
