/** * 知识库中心 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>知识库</h2>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref="formSearch" :model="formSearch">
        <Form-item label="知识分类" prop="knowledgeCategory">
          <Select v-model="formSearch.knowledgeCategory" placeholder="请选择知识分类" clearable style='width:168px'>
            <Option v-for="item in knowCategoryData" :value="item.id" :key="item.id">{{item.name}}</Option>
          </Select>
        </Form-item>
        <Form-item label="标题" prop="knowTit">
          <Input type="text" placeholder="请输入标题" v-model.trim="formSearch.knowTit" @on-enter="getList('1', '10', formSearch.knowledgeCategory, formSearch.knowTit)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.knowledgeCategory, formSearch.knowTit)">
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
            title: '标题',
            key: 'title',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: 'blue',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toView(params.row)
                  }
                }
              }, params.row.title)
            }
          },
          {
            title: '知识分类',
            key: 'categoryName'
          }
        ],
        data: [],
        knowCategoryData: [],
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          knowledgeCategory: null,
          knowTit: ''
        }
      }
    },
    created() {
      this.getKnowCategoryList()
      this.getList('1', '10', this.formSearch.knowledgeCategory, this.formSearch.knowTit)
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
        if (title.length == 0) {
          title = null
        }
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/knowledgeCenter/list.jhtml',
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
        this.getList(num, '10', this.formSearch.knowledgeCategory, this.formSearch.knowTit)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.getList(1, '10', this.formSearch.knowledgeCategory, this.formSearch.knowTit)
      },
      toView(data) {
        var breadText = data.title
        var id = data.id
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/knowledgeCenter',
            text: '知识库 '
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
    }
  }

</script>
