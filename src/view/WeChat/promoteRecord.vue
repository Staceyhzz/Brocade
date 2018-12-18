/** * 推荐佣金记录 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>推荐佣金记录</h2>
    </div>
    <div class="container-body">
      <Form :label-width="80" inline ref='formSearch' :model='formSearch'>
        <Form-item label="收银日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" style="width: 180px" @on-change='setTime' ref='clearTime'></Date-picker>
        </Form-item>
        <Form-item label="推荐人编号" prop='promoterId'>
          <Input @on-enter="getList('1', '10', formSearch)" :maxlength='15' v-model.trim="formSearch.promoterId" placeholder="请输入推荐人编号"></Input>
        </Form-item>
        <Form-item label="客户编号" prop='customerId'>
          <Input @on-enter="getList('1', '10', formSearch)" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号"></Input>
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
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          startTime: '',
          endTime: '',
          customerId: '',
          promoterId: '',
        },
        col: [
          {
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
            width: 157,
            title: '生成时间',
            key: 'createTime'
          },
          {
            width: 157,
            title: '推荐人',
            key: 'promoterName',
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCus(params.row.promoterID, params.row.promoterName)
                  }
                },
                style: {
                  cursor: 'pointer',
                  color: 'orange'
                }
              }, [
                h('Icon', {
                  props: {
                    type: "person"
                  }
                }),
                h('span', params.row.promoterName)
              ])
            }
          },
          {
            width: 157,
            title: '消费客户',
            key: 'customerName',
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toCusIndex(params.row.customerID, params.row.customerName)
                  }
                },
                style: {
                  cursor: 'pointer',
                  color: 'orange'
                }
              }, [
                h('Icon', {
                  props: {
                    type: "person"
                  }
                }),
                h('span', params.row.customerName + '(' + params.row.customerID + ')')
              ])
            }
          },
          {
            width: 157,
            title: '收银单号',
            key: 'cashierNo'
          },
          {
            width: 157,
            title: '类型',
            key: 'type',
            render: (h, params) => {
            const _text = params.row.type == 3 ? '会费提成' : params.row.type == 1 ? '消费提成' : '佣金提成'
            const _color = params.row.type == 3 ? 'orange' : params.row.type == 1 ? 'blue' : 'red'
              return h('span', {
                style: {
                color: _color
                }
              }, _text)
            }
          },
          {
            width: 190,
            title: '消费/奖金',
            key: 'amount',
            render: (h, params) => {
              const _text = params.row.amount.toFixed(2)
              return h('span', _text)
            }
          },
          {
            width: 157,
            title: '提成等级',
            key: 'level'
          },
          {
            width: 190,
            title: '提成比例(%)',
            key: 'rate',
            render: (h, params) => {
              const _text = (params.row.rate * 100).toFixed(2)
              return h('span', _text)
            }
          },
          {
            width: 190,
            title: '提成收益',
            key: 'commission',
            render: (h, params) => {
              const _text = params.row.commission.toFixed(2)
              return h('span', _text)
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
        console.log(form)
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/promoteRecord/list.jhtml',
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
      //跳转详情
      toCus(id, name) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/promoteRecord',
            text: '推荐佣金记录'
          },
          {
            url: '/recordPromoterRecord',
            text: name
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push({
          path: '/recordPromoterRecord',
          query: {
            id: id
          }
        })
      },
      //跳转客户详情
      toCusIndex(id, name) {
        var breadData = [{
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
        sessionStorage.setItem("cusName", name)
        sessionStorage.setItem("cusId", id)
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: '/customerIndex',
          query: {
            id: id
          }
        })
      },
    }
  }

</script>
