/**
* 部门管理页面
*/

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('layoutNav.deptManage')}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click='add'><Icon type="plus-round"></Icon>{{$t('publicSet.add')}}</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal
        :title="modalTit"
        v-model="modalEdit"
        :closable="false"
        @on-ok="ok"
        :loading="loading"
        class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
          <Form-item :label="$t('labelPublic.yy')" prop="hospitalId" required>
            <Select v-model="formValidate.hospitalId" :disabled='seen || !key'>
              <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('labelPublic.mc')" prop="name" required>
            <Input v-model.trim="formValidate.name" :placeholder="$t('placeholderPublic.input')" :maxlength='20'></Input>
          </Form-item>
          <Form-item :label="$t('dept.label')" prop="openStatus">
            <Radio-group v-model="formValidate.openStatus">
              <Radio :label="1">{{$t('dept.open')}}</Radio>
              <Radio :label="0">{{$t('dept.noOpen')}}</Radio>
            </Radio-group>
          </Form-item>
          <Form-item :label="$t('labelPublic.pxh')" prop="sortNo" required>
            <cmptInputNumber :max="10000" :min="1" v-model="formValidate.sortNo"></cmptInputNumber>
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
  export default {
    data () {
      const validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('validPublic.name')));
        } else {
          callback();
        }
      };
      return {
        seen: true,
        key: true,
        columns: [
          {   
            title: this.$t('labelPublic.xh'),
            type: 'index',
            width: 60
          },
          {
            title: this.$t('labelPublic.yy'),
            width: 60,
            key: 'hospitalName'
          },
          {
            title: this.$t('labelPublic.mc'),
            width: 60,
            key: 'nameLang'
          },
          {
            title: this.$t('dept.label'),
            width: 70,
            key: 'openstatus',
            render: (h, params) => {
              const color = params.row.openstatus === 1 
                ? '#4172F6' 
                : '#FF6F76';
              const text = params.row.openstatus === 1 
                ? this.$t('dept.open') 
                : this.$t('dept.noOpen');
              return h('span', {
                style: {
                  color: color
                }
              },text)
            }
          },
          {
            title: this.$t('labelPublic.pxh'),
            width: 60,
            key: 'sortno'
          },
          {
            title: this.$t('labelPublic.ms'),
            width: 100,
            key: 'remarkLang'
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
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, this.$t('publicSet.del')),
                ])
            }
          }
        ],
        data: [],
        modalTit: '',
        modalEdit: false,
        loading: true,
        formValidate: {
          id: '',
          hospitalId: '',
          name: '',
          openStatus: '',
          sortNo: 1,
          remark: ''
        },
        ruleForm: {
          name: [
            { validator: validateName, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
    },
    watch: {
      langRouterKey (val) {
        if(val === 'dept') {
          this.getList();
        }
      },
    },
    created () {
      this.formValidate.hospitalId = localStorage.getItem('hospId') * 1;
      this.key = this.getHeadquarters();
      this.getList()
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      //获取列表
      getList () {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/dept/list.jhtml',
          success: function(res){
            const props = ['name', 'remark'];
            const _data = res.data.content.map(item => {
              let obj = {
                ...item
              };
              props.map(p => {
                obj[p + 'Lang'] = obj[p];
              });
              return obj;
            }) || [];
            if(_vm.langRouterKey !== 'dept') {
              _vm.data = _data;
            } else {
              const list = props.map(item => item + 'Lang');
              _vm.requestList(_data, list).then(res => _vm.data = res);
            }
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      //添加
      add () {
        this.modalTit = this.$t('dept.modalTit1');
        this.$refs['formValidate'].resetFields();
        this.formValidate.openStatus = 1
        this.seen = false
        this.modalEdit = true
      },
      //编辑
      edit (data) {
        this.modalTit = this.$t('dept.modalTit2');
        this.$refs['formValidate'].resetFields();
        this.formValidate.hospitalId = data.hospitalid
        this.formValidate.id = data.id
        this.formValidate.name = data.name
        this.formValidate.openStatus = data.openstatus
        this.formValidate.sortNo = data.sortno
        this.formValidate.remark = data.remark
        this.modalEdit = true
        this.seen = true
      },
      //删除
      remove (data) {
        let _vm = this;
        _vm.$Modal.confirm({
          title: _vm.$t('publicSet.noticeTit'),
          content: `<p>${_vm.$t('dept.msg1')}</p>
          <p>${_vm.$t('dept.msg2')}</p>
          <p>${_vm.$t('labelPublic.mc')}：${data.nameLang}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/dept/del.jhtml',
              data: {id: data.id},
              success: function(res){
                if(res.data.code === 0 ){
                  _vm.getList()
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'dept') {
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
      //提交
      ok () {
        let _vm = this
        let url = ''
        let data = {}
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if(_vm.seen) {
              url = 'guard-webManager/dept/edit.jhtml'
              data = {
                id: _vm.formValidate.id,
                name: _vm.formValidate.name,
                sortNo: _vm.formValidate.sortNo,
                openStatus: _vm.formValidate.openStatus,
                remark: _vm.formValidate.remark
              }
            } else {
              url = 'guard-webManager/dept/add.jhtml'
              data = {
                hospitalId: _vm.formValidate.hospitalId,
                name: _vm.formValidate.name,
                sortNo: _vm.formValidate.sortNo,
                openStatus: _vm.formValidate.openStatus,
                remark: _vm.formValidate.remark
              }
            }
            _vm.$http.post({
              url: url,
              data: data,
              success: function(res){
                if(res.data.code == 0 ){
                  _vm.getList()
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modalEdit = false;
                  _vm.$Notice.success({
                    title: _vm.$t('publicSet.noticeTit'),
                    desc: _vm.$t('publicSet.noticeSuccess')
                  });
                } else {
                  if(_vm.langRouterKey !== 'dept') {
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
      }
    }
  }
</script>