/** * 知识管理 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>知识管理</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toEdit('add')">
          <Icon type="plus-round"></Icon>增加</li>
      </ul>
    </div>
    <div class="container-body">
      <Form inline :label-width="80" ref='formSearch' :model='formSearch'>
        <Form-item label="知识分类" prop="categoryId">
          <Select v-model="formSearch.categoryId" placeholder="请选择知识分类" clearable>
            <Option v-for="item in knowCategoryData" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </Form-item>
        <Form-item label="标题" prop="title">
          <Input type="text" placeholder="请输入标题" v-model.trim="formSearch.title" @on-enter="getList('1', '10', formSearch.categoryId, formSearch.title)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.categoryId, formSearch.title)">
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
  export default {
    data() {
      return {
        columns: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '分类',
            key: 'categoryName'
          },
          {
            title: '标题',
            key: 'title'
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
        knowCategoryData: [],
        data: [],
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          categoryId: null,
          title: ''
        }
      }
    },
    created() {
      this.getKnowCategoryList()
      this.getList('1', '10', this.formSearch.categoryId, this.formSearch.title)
    },
    methods: {
      getKnowCategoryList() {
        let _this = this
        _this.$http.get({
          url: 'guard-webManager/select/knowledgeCategoryInfo.jhtml',
          data: {},
          success: function (res) {
            if (res.data.code == 0) {
              _this.knowCategoryData = res.data.content
              console.log(res)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      getList(pageNumber, pageSize, categoryId, title) {
        let _this = this;
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/knowledge/list.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            categoryId: categoryId,
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
        this.getList(num, '10', this.formSearch.deptId, this.formSearch.name)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.getList(1, '10', this.formSearch.deptId, this.formSearch.name)
      },
      toPreview(data) {
        var breadText = data.title
        var id = data.id
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/knowledge',
            text: '知识管理 '
          },
          {
            url: '/knowledgePreview',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/knowledgePreview',
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
          breadText = '修改知识 '
          id = data.id
          type = '1'
        } else {
          breadText = '添加知识'
          id = data
          type = '2'
        }
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/knowledge',
            text: '知识管理 '
          },
          {
            url: '/knowledgeEdit',
            text: breadText
          }
        ];
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/knowledgeEdit',
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
              url: 'guard-webManager/knowledge/delete.jhtml',
              data: {
                id: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList('1', '10', _vm.formSearch.categoryId, _vm.formSearch.title)
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
