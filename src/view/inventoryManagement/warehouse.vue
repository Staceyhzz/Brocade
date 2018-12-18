/** * 仓库管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>仓库管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit('add')">
          <Icon type="plus-round"></Icon>添加普通仓库</li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated='false'>
        <Tab-pane label="普通仓库" name="name1">
          <Table stripe :columns="col" :data="data"></Table>
        </Tab-pane>
        <Tab-pane label="借用仓库" name="name2">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        col: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '仓库管理员',
            key: 'managerList',
            render: (h, params) => {
              const _box = []
              params.row.managerList.map(item => {
                _box.push(item.userName)
              })
              const _text = _box.join('、')
              return h('p', _text)
            }
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
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row)
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
        col1: [{
            title: '部门',
            key: 'name'
          },
          {
            title: '借用库',
            key: 'name'
          },
          {
            title: '状态',
            render: (h, params) => {
              const _color = params.row.warehouseStatus === 1 ? 'blue' : 'red'
              const _text = params.row.warehouseStatus === 1 ? '启用' : '禁用'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
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
                    icon: 'checkmark-round',
                    loading: this.saveLoad
                  },
                  style: {
                    marginRight: '2px'
                  },
                  on: {
                    click: () => {
                      this.toChange(params.row, 1)
                    }
                  }
                }, '启用'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'close-round',
                    loading: this.saveLoad
                  },
                  on: {
                    click: () => {
                      this.toChange(params.row, 0)
                    }
                  }
                }, '禁用'),
              ])
            }
          }
        ],
        data: [],
        data1: [],
        saveLoad: false,
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      this.getBorrowList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.getPage({
          url: 'guard-webManager/warehouse/list.jhtml',
          success: function (res) {
						_vm.data = res.data.content || []
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      getBorrowList() {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/deptBorrow/list.jhtml',
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              _vm.data1 = res.data.content || []
            } else {
              console.log(res)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      toEdit(data) {
        var _text = ''
        var _id = ''
        if (typeof data == 'object') {
          _text = '修改仓库'
          _id = data.id
        } else {
          _text = '添加仓库'
          _id = data
        }
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/warehouse',
            text: '仓库管理'
          },
          {
            url: '/warehouseAdd',
            text: _text
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/warehouseAdd',
          query: {
            id: _id
          }
        })
      },
      remove(data) {
        var _vm = this;
        _vm.$Modal.confirm({
          title: '系统提示',
          content: '确定删除' + data.name + '?',
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/warehouse/del.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList()
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
      toChange(data, status) {
        let _vm = this
        _vm.saveLoad = true
        _vm.$http.post({
          url: 'guard-webManager/deptBorrow/updateStatus.jhtml',
          data: {
            id: data.id,
            name: data.name,
            status: status
          },
          success: function (res) {
            if (res.data.code == 0) {
              _vm.getBorrowList()
              _vm.$Notice.success({
                title: '系统提示！',
                desc: '操作成功！'
              })
            } else {
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              });
            }
            _vm.saveLoad = false
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
    }
  }

</script>
