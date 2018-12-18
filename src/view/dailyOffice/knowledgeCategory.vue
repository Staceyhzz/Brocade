/** * 知识分类管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>知识分类管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal :title="modalTitle" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
          <Form-item label="名称" prop="name">
            <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength="20"></Input>
          </Form-item>
          <Form-item label="描述" prop="remark">
            <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
          </Form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        columns: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '描述',
            key: 'remark'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
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
        seen: false,
        modalEdit: false,
        modalTitle: '',
        loading: true,
        formValidate: {
          id: '',
          name: '',
          remark: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        var _this = this
        this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/knowledgeCategory/list.jhtml',
          data: {},
          success: function (res) {
						_this.data = res.data.content
						_this.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      add: function () {
        let _this = this
        //此时为添加时模态框
        _this.seen = false
        _this.modalTitle = '添加知识分类'
        _this.$refs['formValidate'].resetFields()
        _this.modalEdit = true
      },
      edit: function (data) {
        let _this = this
        _this.modalTitle = '修改知识分类'
        _this.$refs['formValidate'].resetFields()
        _this.formValidate.id = data.id
        _this.formValidate.name = data.name
        _this.formValidate.remark = data.remark
        _this.seen = true
        _this.modalEdit = true
      },
      remove: function (data) {
        let _this = this
        _this.$Modal.confirm({
          title: '系统提示',
          content: '确定删除' + data.name + '?',
          onOk: () => {
            _this.$http.post({
              url: 'guard-webManager/knowledgeCategory/delete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _this.getList()
                  _this.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  });
                } else {
                  _this.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            })
          },
          onCancel: () => {

          }
        })
      },
      ok() {
        let _this = this
        _this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            var url = ''
            var data = {}
            if (_this.seen) {
              url = 'guard-webManager/knowledgeCategory/update.jhtml'
              data = _this.formValidate
            } else {
              url = 'guard-webManager/knowledgeCategory/add.jhtml'
              data = {
                name: _this.formValidate.name,
                remark: _this.formValidate.remark
              }
            }
            _this.$http.post({
              url: url,
              data: data,
              success: function (res) {
                if (res.data.code == 0) {
                  _this.getList()
                  _this.$refs['formValidate'].resetFields();
                  _this.modalEdit = false;
                  _this.$Notice.success({
                    title: '系统提示！',
                    desc: '保存成功！'
                  });
                } else {
                  _this.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
                  _this.loading = false;
                  _this.$nextTick(() => {
                    _this.loading = true;
                  });
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          } else {
            _this.loading = false;
            _this.$nextTick(() => {
              _this.loading = true
            })
          }
        })
      }
    }
  }

</script>
