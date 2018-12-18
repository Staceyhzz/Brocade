/** * 渠道管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>渠道管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toView()">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
        <Form-item label="名称" prop="name">
          <Input :maxlength='20' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.name" type="text" placeholder="请输入名称"></Input>
        </Form-item>
        <Form-item label="渠道品牌" prop="categoryID">
          <cmptStoreCategoryChoose v-on:setStoreCategory="setStoreCategory" ref='remoteFilter'></cmptStoreCategoryChoose>
        </Form-item>
        <Form-item label="联系人" prop="linkman">
          <Input :maxlength='20' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.linkman" type="text" placeholder="请输入联系人"></Input>
        </Form-item>
        <Form-item label="手机" prop="mobile">
          <Input :maxlength='20' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.mobile" type="text" placeholder="请输入手机"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList(1, 10, formSearch)">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import cmptStoreCategoryChoose from 'components/storeCategoryChoose.vue'
  export default {
    name: 'view_store',
    components: {
      cmptStoreCategoryChoose
    },
    data() {
      return {
        columns: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '品牌',
            render: (h, params) => {
              if (params.row.categoryID) {
                return h('p', {
                  style: {
                    color: 'orange',
                    cursor: 'pointer'
                  },
                  on: {
                    click: () => {
                      this.toTree(params.row)
                    }
                  },
                }, [
                  h('Icon', {
                    props: {
                      type: 'android-share-alt'
                    },
                    style: {
                      marginRight: '5px'
                    }
                  }),
                  h('span', params.row.categoryName)
                ])
              }
            }
          },
          {
            title: '渠道名称',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: 'orange',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toRecord(params.row)
                  }
                },
              }, [
                h('Icon', {
                  props: {
                    type: 'podium',
                    size: 16,
                  },
                  style: {
                    marginRight: '5px'
                  }
                }),
                h('span', params.row.name)
              ])
            }
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '联系人',
            key: 'linkman'
          },
          {
            title: '联系方式',
            key: 'mobile'
          },
          {
            title: '添加日期',
            key: 'createTime'
          },
          {
            title: '备注',
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
                      this.toView(params.row)
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
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        storeCategoryName: '',
        formSearch: {
          categoryID: '',
          name: '',
          linkman: '',
          mobile: '',
          ownerName: '',
        }
      }
    },
    activated() {
      console.log(111111111)
      this.getList(this.pageNumber, 10, this.formSearch)
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this
        form.pageNumber = pageNumber
        form.pageSize = pageSize
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/store/page.jhtml',
          data: form,
          success: function (res) {
						_vm.data = res.data.content.content || []
						_vm.total = res.data.content.total || 0
						_vm.pageNumber = res.data.content.pageNumber || 1
						_vm.totalPages = res.data.content.totalPages || 1
						console.log(res)
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      setStoreCategory(data) {
        this.formSearch.categoryID = data.id
      },
      toView(data) {
        let _text = '',
          _id = ''
        if (typeof data === 'object') {
          _text = '编辑渠道'
          _id = data.id
        } else {
          _text = '添加渠道'
        }
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/store',
            text: '渠道管理'
          },
          {
            url: '/storeEdit',
            text: _text
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/storeEdit',
          query: {
            id: _id,
          }
        })
      },
      toTree(data) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/store',
            text: '渠道管理'
          },
          {
            url: '/storeTree',
            text: '渠道组织结构'
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/storeTree',
          query: {
            id: data.categoryID,
          }
        })
      },
      toRecord(data) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/store',
            text: '渠道管理'
          },
          {
            url: '/storeRecord',
            text: '渠道档案'
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        sessionStorage.setItem('storeId', data.id)
        this.$router.push('/storeRecord')
      },
      remove(data) {
        var _vm = this;
        _vm.$Modal.confirm({
          title: '系统提示',
          content: `<p>确定删除渠道？</p>
                            <p>渠道信息：</p>
                            <p>名称：${data.name}</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/store/delete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList(1, 10, _vm.formSearch)
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
      changePage(num) {
        this.getList(num, 10, this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.$refs.remoteFilter.clean()
        this.getList(1, 10, this.formSearch)
      }
    }
  }

</script>
