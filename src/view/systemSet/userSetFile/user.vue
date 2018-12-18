/**
* 用户管理
*/

<template>
  <div class="container-box user" ref="containerBox">
    <div class="container-header">
      <h2>{{$t('layoutNav.userManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="addSet"><Icon type="gear-b"></Icon>{{$t('user.btn1')}}</li>
        <li class="header-item" @click="add"><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="90" ref="formSearch" :model="formSearch">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.zh')" prop='account'>
              <Input v-model.trim="formSearch.account" @on-enter="getList(1, 10, formSearch)" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('user.label1')" prop='name'>
              <Input v-model.trim="formSearch.name" @on-enter="getList(1, 10, formSearch)" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
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
      <Modal
        :title="modalTit"
        width='600'
        v-model="modalEdit"
        :closable="false"
        @on-ok="ok"
        :loading="loading"
        class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('labelPublic.yy')" prop="hospitalId">
            <Select v-model="formValidate.hospitalId" :disabled='seen || !key' style="width:400px" @on-change='changeDept'>
              <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('labelPublic.zh')" prop="account" required>
            <Input v-model.trim="formValidate.account" :placeholder="$t('placeholderPublic.input')" style="width:400px" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('user.label2')" prop="password" required v-if='!seen'>
            <Input v-model.trim="formValidate.password" :placeholder="$t('placeholderPublic.input')" style="width:400px" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('user.label1')" prop="name" required>
            <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" style="width:400px" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('labelPublic.zt')" prop="status" v-if="seen">
            <Radio-group v-model="formValidate.status">
              <Radio :label="1">{{$t('publicSet.enable')}}</Radio>
              <Radio :label="0">{{$t('publicSet.disable')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item :label="$t('labelPublic.xb')" prop="gender" required>
            <Select v-model="formValidate.gender" style="width:400px">
              <Option :value="1">{{$t('publicSet.man')}}</Option>
              <Option :value="2">{{$t('publicSet.woman')}}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('labelPublic.bm')" prop='deptId' required>
            <Select v-model="formValidate.deptId" style="width:400px">
              <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('user.label4')" prop="phone">
            <Input v-model.trim="formValidate.phone" :placeholder="$t('placeholderPublic.input')" style="width:400px" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('user.label5')" prop="mobile">
            <Input v-model.trim="formValidate.mobile" :placeholder="$t('placeholderPublic.input')" style="width:400px" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('labelPublic.js')" prop='roleId'>
            <Select v-model="formValidate.roleId" style="width:400px">
              <Option v-for="item in roleList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('labelPublic.ms')" prop="remark" style="width:500px">
            <Input v-model.trim="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :placeholder="$t('placeholderPublic.input')" :maxlength='200'></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      const validateList = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.valid1')));
        } else {
          callback();
        }
      };
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('user.valid2')));
        } else {
          callback();
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
            title: this.$t('user.colTit'),
            width: 60,
            key: 'id'
          },
          {
            title: this.$t('labelPublic.zh'),
            width: 60,
            key: 'account',
          },
          {
            title: this.$t('user.label1'),
            width: 60,
            key: 'name'
          },
          {
            title: this.$t('labelPublic.xb'),
            width: 60,
            key: 'gender',
            render: (h, params) => {
              const text = params.row.gender === 1 ? this.$t('publicSet.man')  : this.$t('publicSet.woman');
              return h('span', text);
            }
          },
          {
            title: this.$t('labelPublic.bm'),
            width: 60,
            key: 'deptName'
          },
          {
            title: this.$t('labelPublic.zt'),
            width: 70,
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
              },text)
            }
          },
          {
            title: this.$t('labelPublic.js'),
            width: 60,
            key: 'roleName'
          },
          {
            title: this.$t('user.label4'),
            width: 60,
            key: 'phone'
          },
          {
            title: this.$t('user.label5'),
            width: 60,
            key: 'mobile'
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
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.edit(params.row)
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
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                    icon: 'document-text'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.check(params.row)
                    }
                  }
                }, this.$t('user.btn2')),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'wrench'
                  },
                  style: {
                    margin: '5px 3px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toPower(params.row.id, 1)
                    }
                  }
                }, this.$t('user.btn3')),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    icon: 'person'
                  },
                  style: {
                    margin: '5px 0px 5px 0',
                    verticalAlign: 'middle'
                  },
                  on: {
                    click: () => {
                      this.toPower(params.row.id, 2)
                    }
                  }
                }, this.$t('user.btn4'))
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
        totalPages: 1,
        pageNumber: 1,
        roleList: [],
        modalTit: '',
        modalEdit: false,
        loading: true,
        formValidate: {
          id: '',
          hospitalId: '',
          account: '',
          password: '',
          name: '',
          status: '',
          gender: '',
          deptId: '',
          phone: '',
          mobile: '',
          roleId: '',
          remark: ''
        },
        seen: true,
        ruleForm: {
          account: [
            { validator: validateText, trigger: 'blur' }
          ],
          password: [
            { validator: validateText, trigger: 'blur' }
          ],
          name: [
            { validator: validateText, trigger: 'blur' }
          ],
          status: [
            { validator: validateList, trigger: 'change' }
          ],
          deptId: [
            { validator: validateList, trigger: 'change' }
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
        if(val === 'user') {
          this.getList(this.pageNumber, 10, this.formSearch);
        }
      },
    },
    created () {
      this.formValidate.hospitalId = localStorage.getItem('hospId') * 1;
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
          url: 'guard-webManager/user/page.jhtml',
          data: form,
          success: function(res){
            let _data = res.data.content.content || [];
            if(_vm.langRouterKey !== 'user') {
              _vm.data = _data;
            } else {
              const props = ['deptName', 'roleName'];
              _vm.requestList(_data, props).then(res => _vm.data = res);
            }
            _vm.total = res.data.content.total;
            _vm.pageNumber = res.data.content.pageNumber;
            _vm.totalPages = res.data.content.totalPages;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeDept (id) {
        if(!this.seen) {
          this.formValidate.deptId = '';
          this.$store.dispatch('setSelectDeptChange', id);
        }
      },
      //获取角色下拉
      getRole () {
        var _vm = this;
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
      add () {
        this.modalTit = this.$t('user.modalTit1');
        this.$refs['formValidate'].resetFields()
        this.seen = false
        this.modalEdit = true
      },
      edit (data) {
        this.modalTit = this.$t('user.modalTit2');
        this.$refs['formValidate'].resetFields();
        this.formValidate.hospitalId = data.hospitalid
        this.formValidate.id = data.id
        this.formValidate.account = data.account
        this.formValidate.name = data.name
        this.formValidate.status = data.status
        this.formValidate.gender = data.gender
        this.formValidate.deptId = data.deptid
        this.formValidate.mobile = data.mobile
        this.formValidate.phone = data.phone
        this.formValidate.roleId = data.roleid
        this.formValidate.remark = data.remark
        this.$store.dispatch('setSelectDeptChange', data.hospitalid);
        this.seen = true
        this.modalEdit = true
      },
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('user.msg1')}</p>
          <p>${_vm.$t('user.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/user/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0) {
                  _vm.getList(1, 10, _vm.formSearch)
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'user') {
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
              error: function(res){
                console.log(res);
              }
            });
          },
          onCancel: () => {

          }
        });
      },
      addSet () {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/user',
            text: 'layoutNav.userManage'
          },
          {
            url: '/userSetting',
            text: 'user.btn1'
          },
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push('/userSetting') 
      },
      check (data) {
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/user',
            text: 'layoutNav.userManage'
          },
        ];
        breadData.push({
          url: '/userCheck',
          text: data.name
        });
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/userCheck',
          query: {
            id: data.id
          }
        })
      },
      toPower(id, type) {
        let _text = ''
        if(type === 1) {
          _text = 'user.btn3'
        } else {
          _text = 'user.btn4'
        }
        let breadData = [
          {
            url: '/desktop',
            text: 'layoutNav.desk'
          },
          {
            url: '/user',
            text: 'layoutNav.userManage'
          },
          {
            url: '/userPower',
            text: _text
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/userPower',
          query: {
            id: id,
            type: type,
          }
        })
      },
      ok () {
        let _vm = this
        let url = ''
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if(_vm.seen) {
              url = 'guard-webManager/user/update.jhtml'
            } else {
              url = 'guard-webManager/user/add.jhtml'
            }
            _vm.$http.post({
              url: url,
              data: _vm.formValidate,
              success: function(res){
                if(res.data.code === 0) {
                  _vm.getList(1, 10, _vm.formSearch)
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'user') {
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
              error: function(res){
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
      //重置
      handleReset (name) {
        this.$refs[name].resetFields()
        this.getList('1', '10', this.formSearch)
      },
      //分页
      changePage (num) {
        this.getList(num, '10', this.formSearch)
      },
    }
  }
</script>
