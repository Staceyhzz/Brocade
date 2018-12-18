/** * 供应商管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>供应商管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="50" inline ref='formSearch' :model='formSearch'>
        <Form-item label="名称" prop='name'>
          <Input :maxlength='15' v-model.trim="formSearch.name" placeholder="请输入名称" @on-enter='getList(1, 10, formSearch)'></Input>
        </Form-item>
        <Form-item label="拼音码" prop='pinyin'>
          <Input :maxlength='15' v-model.trim="formSearch.pinyin" placeholder="请输入拼音码" @on-enter='getList(1, 10, formSearch)'></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch)">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
      </div>
    </div>
    <Modal :title="modalTit" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleForm" :label-width="100" label-position="right">
        <Form-item label="名称" prop="name" required>
          <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength='20' @on-blur='setPinYin'></Input>
        </Form-item>
        <Form-item label="拼音码" prop="pinyin" required>
          <Input v-model.trim="formValidate.pinyin" placeholder="请输入拼音码" :maxlength='20'></Input>
        </Form-item>
        <Form-item label="联系人" prop="linkman">
          <Input v-model.trim="formValidate.linkman" placeholder="请输入联系人" :maxlength='20'></Input>
        </Form-item>
        <Form-item label="联系方式" prop="contact">
          <Input v-model.trim="formValidate.contact" placeholder="请输入联系方式" :maxlength='20'></Input>
        </Form-item>
        <Form-item label="备注" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注" :maxlength='100'></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      const validateText = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入信息'));
        } else {
          callback();
        }
      };
      const validatePy = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入拼音码'))
        } else {
          if (/^[a-z0-9]*$/g.test(value)) {
            callback()
          } else {
            callback(new Error('请输入小写字母、数字'))
          }
        }
      };
      return {
        key: true,
        modalTit: '',
        modal: false,
        loading: true,
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          name: '',
          pinyin: '',
        },
        formValidate: {
          id: '',
          name: '',
          pinyin: '',
          linkman: '',
          contact: '',
          remark: '',
        },
        col: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '拼音码	',
            key: 'pinyin'
          },
          {
            title: '联系人',
            key: 'linkman'
          },
          {
            title: '联系方式',
            key: 'contact'
          },
          {
            title: '描述',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 140,
            align: 'center',
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
                }, '编辑'),
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
                }, '删除'),
              ])
            }
          }
        ],
        data: [],
        ruleForm: {
          name: [{
            validator: validateText,
            trigger: 'blur'
          }],
          pinyin: [{
            validator: validatePy,
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getList('1', '10', this.formSearch)
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this
        form['pageNumber'] = pageNumber
        form['pageSize'] = pageSize
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/supplier/page.jhtml',
          data: form,
          success: function (res) {
						_vm.data = res.data.content.content
						_vm.total = res.data.content.total
						_vm.pageNumber = res.data.content.pageNumber
						_vm.totalPages = res.data.content.totalPages
						console.log(res)
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        var _vm = this;
        _vm.modalTit = '添加供应商'
        _vm.$refs['formValidate'].resetFields();
        _vm.modal = true
        _vm.key = false
      },
      edit(data) {
        var _vm = this;
        _vm.modalTit = '修改供应商'
        _vm.$refs['formValidate'].resetFields();
        for (let item in _vm.formValidate) {
          _vm.formValidate[item] = data[item]
        }
        _vm.modal = true
        _vm.key = true
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.getList(1, 10, this.formSearch)
      },
      remove(data) {
        var _vm = this;
        _vm.$Modal.confirm({
          title: '系统提示',
          content: '确定删除' + data.name + '?',
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/supplier/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  });
                } else {
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
          },
          onCancel: () => {

          }
        });
      },
      ok() {
        var _vm = this;
        var _url = '';
        _vm.$refs['formValidate'].validate((valid) => {
          if (valid) {
            if (_vm.key) {
              _url = 'guard-webManager/supplier/edit.jhtml'
            } else {
              _url = 'guard-webManager/supplier/add.jhtml'
            }
            _vm.$http.post({
              url: _url,
              data: _vm.formValidate,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList('1', '10', _vm.formSearch)
                  _vm.$refs['formValidate'].resetFields();
                  _vm.modal = false;
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '保存成功！'
                  });
                } else {
                  _vm.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
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
      setPinYin() {
        let _vm = this
        if (_vm.formValidate.name != '') {
          _vm.$http.get({
            url: 'guard-webManager/select/getPinYin.jhtml',
            data: {
              name: _vm.formValidate.name
            },
            success: function (res) {
              if (res.data.code == 0) {
                console.log(res)
                _vm.formValidate.pinyin = res.data.content || null
                _vm.$refs.formValidate.validateField('pinyin')
              } else {
                console.log(res.data.desc)
              }
            },
            error: function (res) {
              console.log(res)
            }
          })
        }
      },
    }
  }

</script>
