/** * 客户列表页面 */

<template>
  <div style="paddingTop:24px">
    <Form :label-width="60" inline ref='formSearch' :model='formSearch' :rules="ruleForm">
      <Form-item label="客户姓名" prop="name">
        <Input :maxlength='15' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.name" type="text" placeholder="请输入客户姓名"></Input>
      </Form-item>
      <Form-item label="客户编号" prop="id">
        <Input :maxlength='15' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.id" type="text" placeholder="请输入客户编号"></Input>
      </Form-item>
      <Form-item label="登记时间" prop='startTime'>
        <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate'
          ref='cleanDate'></Date-picker>
      </Form-item>
      <Form-item label="上门状态" prop='visitStatus'>
        <Select v-model="formSearch.visitStatus" style='width:168px'>
          <Option :value="0">未上门</Option>
          <Option :value="1">已上门</Option>
        </Select>
      </Form-item>
      <Form-item label="成交状态" prop='dealStatus'>
        <Select v-model="formSearch.dealStatus" style='width:168px'>
          <Option :value="0">未成交</Option>
          <Option :value="1">已成交</Option>
        </Select>
      </Form-item>
      <ul class="header-btn-group not-float">
        <li class="header-item" @click="getList(1, 10, formSearch)">
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
</template>

<script>
  export default {
    data() {
      const validateId = (rule, value, callback) => {
        if ((/[^\d]/g).test(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          storeID: sessionStorage.getItem('storeId'),
          id: '',
          name: '',
          startTime: '',
          endTime: '',
          visitStatus: '',
          dealStatus: '',
        },
        col: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            title: '客户编号',
            key: 'id'
          },
          {
            title: '客户姓名',
            key: 'name',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: 'orange',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toCus(params.row.name, params.row.id)
                  }
                }
              }, params.row.name)
            }
          },
          {
            title: '客户性别',
            render: (h, params) => {
              const _text = params.row.gender == 1 ? '男' : '女'
              return h('span', _text)
            }
          },
          {
            title: '登记时间',
            key: 'createTime'
          },
          {
            title: '咨询项目',
            key: 'symptomName'
          },
          {
            title: '上门状态',
            render: (h, params) => {
              const _text = params.row.firstVisitTime ? '已上门' : '未上门'
              const _color = params.row.firstVisitTime ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '成交状态',
            render: (h, params) => {
              const _text = params.row.firstDealTime ? '已成交' : '未成交'
              const _color = params.row.firstDealTime ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          // {
          //     title: '操作',
          //     key: 'action',
          //     width: 80,
          //     align: 'center',
          //     render: (h, params) => {
          //         return h('div', [
          //                 h('Button', {
          //                     props: {
          //                         type: 'error',
          //                         size: 'small',
          //                         icon: 'ios-trash-outline'
          //                     },
          //                     on: {
          //                         click: () => {
          //                             this.remove(params.row)
          //                         }
          //                     }
          //                 }, '删除'),
          //             ])
          //     }
          // }
        ],
        data: [],
        ruleForm: {
          id: [{
            validator: validateId,
            trigger: 'blur'
          }],
        }
      }
    },
    mounted() {
      this.getList(1, 10, this.formSearch)
    },
    methods: {
      getList(pageNumber, pageSize, form) {
        let _vm = this
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            form.pageNumber = pageNumber
            form.pageSize = pageSize
            _vm.$store.dispatch('setPageLoading', -1)
            _vm.$http.getPage({
              url: 'guard-webManager/store/customerRecord.jhtml',
              data: form,
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
          }
        })
      },
      changePage(num) {
        this.getList(num, 10, this.formSearch)
      },
      setDate(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.$refs.cleanDate.handleClear()
        this.getList(1, 10, this.formSearch)
      },
      toCus(name, id) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/customer',
            text: '客户管理'
          },
          {
            url: '/customerIndex',
            text: name
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
        sessionStorage.setItem('cusId', id)
        sessionStorage.setItem('cusName', name)
      },
      remove(data) {
        let _vm = this
        _vm.$Modal.confirm({
          title: '系统提示',
          content: `<p>删除客户？</p>
                            <p>客户名称：${data.name}</p>
                            <p>删除后，该顾客后续来院消费渠道商不分佣金。确定要删除该客户？</p>`,
          onOk: () => {
            _vm.$http.post({
              url: 'guard-webManager/store/delCustomerStore.jhtml',
              data: {
                customerID: data.id
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.getList(1, 10, _vm.formSearch)
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
