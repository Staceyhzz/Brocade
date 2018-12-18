/** * 添加/修改仓库 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{titMsg}}</h2>
    </div>
    <div class="container-body">
      <Form :label-width="100" ref="formValidate" :model="formValidate" label-position="right" :rules="ruleForm">
        <Form-item label="名称" prop="name" required>
          <Input v-model="formValidate.name" placeholder="请输入名称" style='width:300px;' :maxlength='20'></Input>
        </Form-item>
        <Form-item label="备注" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述" :maxlength='100'></Input>
        </Form-item>
        <Form-item label="仓库管理员" prop="userList" required>
          <Row>
            <Col span="20">
            <Table stripe :columns="col" :data="formValidate.userList"></Table>
            </Col>
            <Col span="3" offset="1" class='table-left-btn'>
            <Button type="primary" icon="plus-round" @click='add'>增加</Button>
            <Button type="primary" icon="refresh" @click='clean'>清空</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div class="footer-btnGroup">
        <Button type="primary" icon="checkmark" @click='save' :loading='saveLoad'>保存</Button>
        <Button type="primary" icon="android-arrow-back" @click='back'>返回</Button>
      </div>
    </div>
    <Modal title="选择用户" v-model="modal" width='700' :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form :label-width="50" inline ref='formSearch' :model='formSearch'>
        <Form-item label="部门" prop='deptId'>
          <Select v-model="formSearch.deptId" clearable style="width:220px">
            <Option v-for="item in deptList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="账号" prop='account'>
          <Input v-model="formSearch.account" placeholder="请输入账号"></Input>
        </Form-item>
        <Form-item label="姓名" prop='name'>
          <Input v-model="formSearch.name" placeholder="请输入姓名"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getSearch">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table height="350" stripe :columns="col1" :data="data1" @on-selection-change='change'></Table>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入名称'));
        } else {
          callback();
        }
      };
      const validateList = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('请选择人员'));
        } else {
          callback();
        }
      };
      return {
        titMsg: '',
        key: true,
        modal: false,
        loading: true,
        saveLoad: false,
        formValidate: {
          id: '',
          name: '',
          remark: '',
          userList: [],
        },
        formSearch: {
          hospitalId: '',
          account: '',
          name: '',
          deptId: '',
        },
        col: [{
            title: '用户账号',
            key: 'userAccount'
          },
          {
            title: '用户姓名',
            key: 'userName',
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除'),
              ])
            }
          }
        ],
        col1: [{
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '账号',
            key: 'account'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '部门',
            key: 'deptName'
          },
          {
            title: '性别',
            key: 'gender'
          },
        ],
        deptList: [],
        data1: [],
        selectBox: [],
        ruleForm: {
          name: [{
            validator: validateName,
            trigger: 'blur'
          }],
          userList: [{
            validator: validateList,
            trigger: 'change'
          }]
        },
      }
    },
    created() {
      if (window.localStorage) {
        var lg = window.localStorage;
        this.formSearch.hospitalId = lg.hospId
      }
      if (this.$route.query.id != 'add') {
        this.formValidate.id = this.$route.query.id
        this.titMsg = '修改仓库'
        this.key = true
        this.getId()
      } else {
        this.titMsg = '添加仓库'
        this.key = false
        this.$store.dispatch('setPageLoading', 1);
      }
    },
    mounted() {
      this.getDeptList()
      this.getSearch()
    },
    methods: {
      getId() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/warehouse/get.jhtml',
          data: {
            id: _vm.formValidate.id
          },
          success: function (res) {
						_vm.formValidate.userList = res.data.content.managerList
						_vm.formValidate.name = res.data.content.name
						_vm.formValidate.remark = res.data.content.remark
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取部门下拉
      getDeptList() {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/hospitalDeptInfo.jhtml',
          data: {
            hospitalId: _vm.formSearch.hospitalId
          },
          success: function (res) {
            if (res.data.code == 0) {
              _vm.deptList = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取弹窗用户选择
      getSearch() {
        var _vm = this;
        _vm.$http.get({
          url: 'guard-webManager/select/hospitalUserList.jhtml',
          data: _vm.formSearch,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.data1 = res.data.content
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.modal = true
      },
      clean() {
        this.formValidate.userList.splice(0)
      },
      remove(index) {
        this.formValidate.userList.splice(index, 1)
      },
      change(data) {
        this.selectBox = data
      },
      ok() {
        var _vm = this
        var _bool = true
        _vm.selectBox.map(item => {
          _vm.formValidate.userList.map(item1 => {
            if (item.id == item1.userid) {
              _bool = false
            }
          })
          if (_bool) {
            item['userName'] = item.name
            item['userid'] = item.id
            item['userAccount'] = item.account
            _vm.formValidate.userList.push(item)
          } else {
            _bool = true
          }
        })
        _vm.modal = false
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      save() {
        var _vm = this
        var _url = ''
        var _data = {}
        var _box = []
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            _vm.saveLoad = true
            _vm.formValidate.userList.map(item => {
              _box.push(item.userid)
            })
            if (_vm.key) {
              _url = 'guard-webManager/warehouse/edit.jhtml'
              _data = {
                id: _vm.formValidate.id,
                name: _vm.formValidate.name,
                remark: _vm.formValidate.remark,
                userList: _box.join(',')
              }
            } else {
              _url = 'guard-webManager/warehouse/add.jhtml'
              _data = {
                name: _vm.formValidate.name,
                remark: _vm.formValidate.remark,
                userList: _box.join(',')
              }
            }
            _vm.$http.post({
              url: _url,
              data: _data,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.$router.push('/warehouse')
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '操作成功'
                  });
                } else {
                  _vm.saveLoad = false
                  _vm.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            });
          }
        })
      },
      back() {
        this.$router.back(-1)
      }
    }
  }

</script>
