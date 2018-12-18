/** * 班次管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>班次管理 </h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
      <Modal :title="modalTit" v-model="modalEdit" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" label-position="right">
          <Form-item label="名称" prop="name">
            <Input v-model.trim="formValidate.name" placeholder="请输入名称" :maxlength='20'></Input>
          </Form-item>
          <Form-item label="状态" prop="status" v-show="seen">
            <Radio-group v-model="formValidate.status">
              <Radio label="1">启用</Radio>
              <Radio label="0">禁用</Radio>
            </Radio-group>
          </Form-item>
          <form-item label="类型" prop="type">
            <Radio-group v-model="formValidate.type">
              <Radio label="1">工作</Radio>
              <Radio label="0">非工作</Radio>
            </Radio-group>
          </form-item>
        </Form>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      const validateStatus = (rule, value, callback) => {
        if (this.seen && value === '') {
          callback(new Error('请选择状态'))
        } else {
          callback()
        }
      }
      const validatetype = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请选择工作类型'))
        } else {
          callback()
        }
      }
      return {
        columns: [{
            title: '序号',
            type: 'index',
            width: 70
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '类型',
            key: 'type',
            render: (h, params) => {
              const color = params.row.type === 1 ? 'blue' : 'red'
              const text = params.row.type === 1 ? '工作' : '非工作'
              return h('span', {
                style: {
                  color: color
                }
              }, text)
            }
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const color = params.row.status === 1 ? 'blue' : 'red';
              const text = params.row.status === 1 ? '启用' : '禁用';
              return h('span', {
                style: {
                  color: color
                }
              }, text)
            }
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
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
        // 判断为添加状态模态框还是编辑状态模态框
        seen: false,
        modalEdit: false,
        modalTit: '',
        loading: true,
        formValidate: {
          id: '',
          name: '',
          status: '',
          type: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            validator: validateStatus,
            trigger: 'change'
          }],
          type: [{
            required: true,
            validator: validatetype,
            trigger: 'change'
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
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/shiftCategory/list.jhtml',
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
      add() {
        let _this = this
        //此时为添加时模态框
        _this.seen = false
        _this.modalTit = '添加班次'
        _this.$refs['formValidate'].resetFields()
        _this.modalEdit = true
      },
      edit(data) {
        let _this = this
        _this.modalTit = '修改班次'
        _this.$refs['formValidate'].resetFields()
        _this.formValidate.id = data.id
        _this.formValidate.name = data.name
        _this.formValidate.type = data.type
        _this.formValidate.status = data.status
        _this.seen = true
        _this.modalEdit = true
      },
      remove(data) {
        let _this = this
        _this.$Modal.confirm({
          title: '系统提示',
          content: '确定删除' + data.name + '?',
          onOk: () => {
            _this.$http.post({
              url: 'guard-webManager/shiftCategory/delete.jhtml',
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
        });
      },
      ok() {
        let _this = this
        _this.$refs['formValidate'].validate((valid) => {
          if (valid) {
            var url = ''
            var data = {}
            if (_this.seen) {
              url = 'guard-webManager/shiftCategory/update.jhtml'
              data = _this.formValidate
            } else {
              url = 'guard-webManager/shiftCategory/add.jhtml'
              data = {
                name: _this.formValidate.name,
                type: _this.formValidate.type
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
