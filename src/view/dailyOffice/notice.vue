/** * 公告管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>公告管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit('add')">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Form inline :label-width="60" ref='formSearch' :model='formSearch'>
        <Form-item label="标题" prop="title">
          <Input type="text" placeholder="请输入标题" v-model.trim="formSearch.title" @on-enter="getList('1', '10', formSearch.title)"></Input>
          <Input v-show='fixSub'></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.title)">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="totalNum" @on-change='changePage' :current='pageNum'></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fixSub: false,
        columns: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '标题',
            key: 'title'
          },
          {
            title: '发布时间',
            key: 'createtime',
            render: (h, params) => {
              const _text = params.row.createtime.split(' ')[0]
              return h('span', _text)
            }
          },
          {
            title: '发布人',
            key: 'creator'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    icon: 'eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toPreview(params.row)
                    }
                  }
                }, '预览'),
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
        data: [],
        total: '',
        totalPages: '',
        pageNumber: '1',
        modalEdit: false,
        modalTit: '',
        loading: true,
        formSearch: {
          title: ''
        }
      }
    },
    computed: {
      totalNum: function () {
        return this.total * 1
      },
      pageNum: function () {
        return this.pageNumber * 1
      }
    },
    created() {
      this.getList('1', '10', this.formSearch.title)
    },
    methods: {
      getList(pageNumber, pageSize, title) {
        let _this = this;
        if (title.length == 0) {
          title = null
        }
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/notice/list.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            title: title
          },
          success: function (res) {
						_this.data = res.data.content.content
						_this.total = res.data.content.total
						_this.pageNumber = res.data.content.pageNumber
						_this.totalPages = res.data.content.totalPages
						_this.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch.title)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        if (name == 'formSearch') {
          this.getList('1', '10', this.formSearch.title)
        }
      },
      toPreview(data) {
        var breadText = data.title
        var id = data.id
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/notice',
            text: '公告管理'
          },
          {
            url: '/noticePreview',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/noticePreview',
          query: {
            id: id
          }
        })
      },
      toEdit(data) {
        var breadText = ''
        var id = ''
        var type = ''
        if (typeof data == 'object') {
          breadText = '修改公告'
          id = data.id
          type = '1'
        } else {
          breadText = '添加公告'
          id = data
          type = '2'
        }
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/notice',
            text: '公告管理 '
          },
          {
            url: '/noticeEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/noticeEdit',
          query: {
            id: id,
            type: type
          }
        })
      },
      remove(data) {
        var _vm = this;
        _vm.$Modal.confirm({
          title: '系统提示',
          content: '确定删除' + data.title + '?',
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/notice/delete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList('1', '10', _vm.formSearch.title)
                  _vm.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  });
                } else {
                  console.log(res.data.desc)
                }
              },
              error: function (res) {
                _vm.$Notice.error({
                  title: '系统提示！',
                  desc: res.data.desc
                });
              }
            });
          },
          onCancel: () => {

          }
        });
      },
    }
  }

</script>
