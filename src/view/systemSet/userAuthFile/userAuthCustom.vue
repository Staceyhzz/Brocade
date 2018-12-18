/**
* 用户权限自定义
*/

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.userAuthCustomManage')}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.zh')" prop='account'>
              <Input v-model.trim="formSearch.account" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.xm')" prop='name'>
              <Input v-model.trim="formSearch.name" :placeholder="$t('placeholderPublic.input')" @on-enter="getList(1, 10, formSearch)" :maxlength='20'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='key'>
            <Form-item :label="$t('labelPublic.yy')" prop="hospitalId">
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='!key'>
            <Form-item :label="$t('labelPublic.bm')" prop='deptId'>
              <Select v-model="formSearch.deptId" clearable>
                <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.js')" prop='roleId'>
              <Select v-model="formSearch.roleId" clearable>
                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.zt')" prop='status'>
              <Select v-model="formSearch.status" clearable>
                <Option :value="1">{{$t('publicSet.enable')}}</Option>
                <Option :value="0">{{$t('publicSet.disable')}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item"  @click="getList(1, 10, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
    <Modal
      :title="$t('userAuthCustom.modalTit')"
      v-model="modal"
      :closable="false"
      @on-ok="ok"
      :loading="loading"
      class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item :label="$t('labelPublic.zh')">
          <span>{{formValidate.account}}</span>
        </Form-item>
        <Form-item :label="$t('labelPublic.xm')">
          <span>{{formValidate.name}}</span>
        </Form-item>
        <Form-item :label="$t('userAuthCustom.label1')" prop="password" required>
          <Input type="password" v-model.trim="formValidate.password" :maxlength='20'></Input>
        </Form-item>
        <Form-item :label="$t('userAuthCustom.label2')" prop="password2" required>
          <Input type="password" v-model.trim="formValidate.password2" :maxlength='20'></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      const validatePass = (rule, value, callback) => {
        if(value === '') {
          callback(new Error(this.$t('userAuthCustom.valid1')))
        } else if(value.length < 8) {
          callback(new Error(this.$t('userAuthCustom.valid2')))
        } else {
          if(this.formValidate.password2 !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('password2')
          }
            callback()
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if(value === '') {
          callback(new Error(this.$t('userAuthCustom.valid3')))
        } else if(value !== this.formValidate.password) {
          callback(new Error(this.$t('userAuthCustom.valid4')))
        } else {
          callback()
        }
      };
      return {
        key: true,
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: this.$t('labelPublic.yy'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('labelPublic.bh'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.zh'),
            width: 60,
            key: 'account'
          },
          {
            title: this.$t('labelPublic.xm'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 50,
            key: 'gender',
            render: (h, params) => {
              const text = params.row.gender === 1 
                ? this.$t('publicSet.man') 
                : this.$t('publicSet.woman');
              return h('span',text);
            }
          },
          {
            title: this.$t('labelPublic.bm'),
            width: 60,
            key: 'deptName'
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 60,
            key: 'status',
            render: (h, params) => {
              const color = params.row.status === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.status === 1 
                ? this.$t('publicSet.enable') 
                : this.$t('publicSet.disable');
              return h('span', {
                style: {
                  color: color
                }
              }, text);
            }
          },
          {
            title: this.$t('labelPublic.js'),
            width: 60,
            key: 'roleName'
          },
          {
            title: this.$t('userAuthCustom.colTit1'),
            width: 60,
            key: 'phone'
          },
          {
            title: this.$t('userAuthCustom.colTit2'),
            width: 60,
            key: 'mobile'
          },
          {
            title: this.$t('publicSet.tableAction'),
            key: 'action',
            width: 160,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'wrench'
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toPower(params.row)
                    }
                  }
                }, this.$t('publicSet.set')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'refresh'
                  },
                  on: {
                    click: () => {
                      this.refreshPassword(params.row)
                    }
                  }
                }, this.$t('userAuthCustom.btn')),
              ])
            }
          }
        ],
        data: [],
        formSearch: {
          account: '',
          name: '',
          hospitalId: '',
          deptId: '',
          roleId: '',
          status: ''
        },
        total: 0,
        totalPages: 0,
        pageNumber: 1,
        roleList: [],
        modal: false,
        loading: true,
        formValidate: {
          id: '',
          password: '',
          password2: '',
          account: '',
          name: '',
        },
        ruleForm: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password2: [
            { validator: validatePassCheck, trigger: 'blur' }
          ],
        }
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList
      },
      deptList () {
        return this.$store.getters.getSelectDeptList
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'userAuthCustom') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    created () {
      this.key = this.getHeadquarters();
      this.getList(1, 10, this.formSearch);
    },
    mounted () {
      this.getRole()
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectDeptList', localStorage.getItem('hospId'));
    },
    methods: {
      // 获取分页
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$http.getPage({
          url: 'guard-webManager/userAuthCustom/list.jhtml',
          data: form,
          success: function(res){
            let _data = res.data.content.content || [];
            if(_vm.langRouterKey !== 'userAuthCustom') {
              _vm.data = _data;
            } else {
              const props = ['roleName', 'deptName'];
              _vm.requestList(_data, props).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.total
            _vm.pageNumber = res.data.content.pageNumber
            _vm.totalPages = res.data.content.totalPages
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeDept (id) {
        this.$store.dispatch('setSelectDeptChange', id);
      },
      //获取角色下拉
      getRole () {
        let _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/roleInfo.jhtml',
          success: function(res){
            if(res.data.code === 0) {
              _vm.roleList = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      toPower (data) {
        let _vm = this
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/userAuthCustom',
            text: 'layoutNav.userAuthCustomManage'
          }
        ]
        breadData.push({
          url: '/userAuthCustomSet',
          text: data.name
        })
        _vm.$store.dispatch('setBreadData', breadData)
        _vm.$router.push({
          path: '/userAuthCustomSet',
          query: {
            id: data.id,
            name: data.name,
          }
        })
        let _query = {
          id: data.id,
          name: data.name
        }
        sessionStorage.setItem('query34', JSON.stringify(_query))
      },
      //重置
      handleReset (name) {
        this.$refs[name].resetFields()
        this.getList('1', '10', this.formSearch)
      },
      //分页
      changePage (num) {
        this.getList(num, '10', this.formSearch)
      },
      //重置密码
      refreshPassword (data) {
        this.$refs['formValidate'].resetFields()
        this.formValidate.id = data.id
        this.formValidate.name = data.name
        this.formValidate.account = data.account
        this.modal = true
      },
      ok () {
        let _vm = this
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.$http.post({
              url: 'guard-webManager/userAuthCustom/restPassword.jhtml',
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.modal = false
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'userAuthCustom') {
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
                  })
                }
              },
              error: function(res){
                console.log(res)
              }
            })
          } else {
            _vm.loading = false
            _vm.$nextTick(() => {
              _vm.loading = true
            })
          }
        })
      },
    }
  }
</script>
