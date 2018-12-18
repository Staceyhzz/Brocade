/** * 验证码管理 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>验证码管理</h2>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
        <Form-item label="手机号" prop='mobile'>
          <Input @on-enter="getList('1', '10', formSearch)" :maxlength='15' v-model.trim="formSearch.mobile" placeholder="请输入手机号"></Input>
          <Input v-show='fixSub'></Input>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fixSub: false,
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          mobile: '',
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
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '发送时间',
            key: 'createtime',
          },
          {
            title: '验证码',
            key: 'code'
          },
          {
            title: '结果',
            render: (h, params) => {
              const _text = params.row.result.ResultType == 0 ? '成功' : '失败'
              const _color = params.row.result.ResultType == 0 ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '原因',
            render: (h, params) => {
              if (params.row.result.ResultType == 1) {
                const _text = params.row.result.Message.split(':')[1]
                return h('span', _text)
              }
            }
          },
        ],
        data: [],
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
          url: 'guard-webManager/verifyMessage/list.jhtml',
          data: form,
          success: function (res) {
						let _data = res.data.content.content || []
						_vm.data = _data.map(item => {
							item.result = JSON.parse(item.result)
							return item
						})
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
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.getList('1', '10', this.formSearch)
      },
    }
  }

</script>
