/** * 渠道负责人设置 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>渠道负责人设置</h2>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated='false'>
        <Tab-pane label="人员视图" name="name1">
          <div style="width:100; overflow:hidden; marginBottom:15px;">
            <ul class="header-btn-group">
              <li class="header-item" @click="toEdit('add')">
                <Icon type="plus-round"></Icon>增加</li>
            </ul>
          </div>
          <Table stripe :columns="columns" :data="data"></Table>
          <div class="table-page">
            <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
            <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
          </div>
        </Tab-pane>
        <Tab-pane label="渠道视图" name="name2">
          <Table stripe :columns="col" :data="data1"></Table>
          <div class="table-page">
            <div class="table-info">当前第{{pageNumber1}}页，共{{totalPages1}}页，总共{{total1}}条记录</div>
            <Page class="table-paginate" :total="total1" @on-change='changePage1' :current='pageNumber1'></Page>
          </div>
        </Tab-pane>
      </Tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        total1: 0,
        totalPages1: 1,
        pageNumber1: 1,
        columns: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '用户',
            key: 'userName'
          },
          {
            title: '渠道数',
            key: 'num'
          },
          {
            title: '渠道列表',
            render: (h, params) => {
              let _box = params.row.storeList.map(item => item.name),
                _text = _box.join('、')
              return h('p', _text)
            }
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
                    icon: 'ios-list-outline'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toEdit(params.row)
                    }
                  }
                }, '列表'),
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
        col: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber1 - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '渠道',
            key: 'name'
          },
          {
            title: '负责人列表',
            render: (h, params) => {
              let _box = params.row.managerList.map(item => item.userName),
                _text = _box.join('、')
              return h('p', _text)
            }
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
                      this.clean(params.row)
                    }
                  }
                }, '清空'),
              ])
            }
          }
        ],
        data: [],
        data1: [],
      }
    },
    created() {
      this.getList(1)
    },
    mounted() {
      this.getList1(1)
    },
    methods: {
      getList(pageNumber) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/storeManager/list.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: 10,
          },
          success: function (res) {
						_vm.data = res.data.content.content || []
						_vm.total = res.data.content.total || 0
						_vm.totalPages = res.data.content.totalPages || 1
						_vm.pageNumber = res.data.content.pageNumber || 1
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList1(pageNumber) {
        let _vm = this
        _vm.$http.get({
          url: 'guard-webManager/storeManager/storeList.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: 10,
          },
          success: function (res) {
            if (res.data.code == 0) {
              console.log(res)
              _vm.data1 = res.data.content.content || []
              _vm.total1 = res.data.content.total || 0
              _vm.totalPages1 = res.data.content.totalPages || 1
              _vm.pageNumber1 = res.data.content.pageNumber || 1
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      changePage(num) {
        this.getList(num)
      },
      changePage1(num) {
        this.getList1(num)
      },
      edit(data) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/storeManager',
            text: '渠道负责人管理'
          },
          {
            url: '/storeManagerAdd',
            text: '修改渠道负责人'
          },
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/storeManagerAdd',
          query: {
            id: data.id
          }
        })
      },
      toEdit(data) {
        let breadText,
          url
        if (data == 'add') {
          breadText = '添加负责人'
          url = '/storeManagerEdit'
        } else {
          breadText = data.userName
          url = '/storeManagerList'
        }
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/storeManager',
            text: '渠道负责人管理'
          },
          {
            url: url,
            text: breadText
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        if (data == 'add') {
          this.$router.push({
            path: url
          })
        } else {
          this.$router.push({
            path: url,
            query: {
              id: data.userid
            }
          })
          var _query = {
            id: data.userid
          }
          window.sessionStorage.setItem('query34', JSON.stringify(_query))
        }
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: `<p>确定删除渠道负责人？</p>
                            <p>渠道负责人信息：</p>
                            <p>名称：${data.userName}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/storeManager/userDelete.jhtml',
              data: {
                userId: data.userid
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList(1)
                  _vm.getList1(1)
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  })
                } else {
                  _vm.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  })
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          },
          onCancel: () => {

          }
        })
      },
      clean(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: `<p>确定清空渠道负责人？</p>
                            <p>渠道信息：</p>
                            <p>名称：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/storeManager/deleteStoreUser.jhtml',
              data: {
                storeID: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList(1)
                  _vm.getList1(1)
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  })
                } else {
                  _vm.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  })
                }
              },
              error: function (res) {
                console.log(res)
              }
            })
          },
          onCancel: () => {

          }
        })
      },
    }
  }

</script>
