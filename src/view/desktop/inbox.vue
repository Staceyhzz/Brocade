/** * 消息记录 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>消息记录</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="checkmark"></Icon>全部标记为已读</li>
      </ul>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
        <Form-item label="消息日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" @on-change='setTime' ref='clearTime'></Date-picker>
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
    <Modal title="查看信息" v-model="modal" :closable="false" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item label="发送用户：">
          <span>{{formValidate.messageFromUserName}}</span>
        </Form-item>
        <Form-item label="发送时间：">
          <span>{{formValidate.messageCreateTime}}</span>
        </Form-item>
        <Form-item label="标题：">
          <span>{{formValidate.messageTitle}}</span>
        </Form-item>
        <Form-item label="内容：">
          <span>{{formValidate.messageContent}}</span>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modal: false,
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          startTime: '',
          endTime: '',
        },
        formValidate: {},
        col: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '状态',
            render: (h, params) => {
              const _text = params.row.status === 1 ? '已读' : '未读'
              const _color = params.row.status === 1 ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '主题',
            key: 'messageTitle'
          },
          {
            title: '发送用户',
            key: 'messageFromUserName'
          },
          {
            title: '发送时间',
            key: 'messageCreateTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 80,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-eye'
                  },
                  on: {
                    click: () => {
                      this.view(params.row)
                      if (params.row.status === 0) {
                        params.row.status = 1
                        this.read(params.row.id)
                      }
                    }
                  }
                }, '查看'),
              ])
            }
          }
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
        _vm.$store.dispatch('setUnReadMessageNum')
        _vm.$http.getPage({
          url: 'guard-webManager/inbox/list.jhtml',
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
      setTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.$refs['clearTime'].handleClear()
        this.getList('1', '10', this.formSearch)
      },
      view(data) {
        this.formValidate = data
        this.modal = true
      },
      add() {
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/inbox/readAll.jhtml',
          success: function (res) {
            if (res.data.code == 0) {
              _vm.getList('1', '10', _vm.formSearch)
              _vm.$Notice.success({
                title: '系统提示！',
                desc: '操作成功！'
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
      read(id) {
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/inbox/updateStatus.jhtml',
          data: {
            id: id
          },
          success: function (res) {
            if (res.data.code === 0) {
              _vm.$store.dispatch('setUnReadMessageNum')
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
    }
  }

</script>
