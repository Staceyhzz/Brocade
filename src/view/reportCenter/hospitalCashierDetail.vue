<!-- hospitalCashierDetail -->
<!-- 医院收银明细 -->

/**
* 医院收银明细
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>医院收银明细</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="exportTable" v-if="exportKey === '1'">
          <Icon type="ios-download-outline"></Icon>导出
        </li>
      </ul>
    </div>
    <div class="container-body">
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="createUserId" :value="formSearch.createUserId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="type" :value="formSearch.type">
        <input name="customerName" :value="formSearch.customerName">
        <input name="status" :value="formSearch.status">
        <input name="settlementID" :value="formSearch.settlementID">
        <input name="settlementStartTime" :value="formSearch.settlementStartTime">
        <input name="settlementEndTime" :value="formSearch.settlementEndTime">
        <input name="adminToken" :value="adminToken">
      </form>
      <Form :label-width="60" inline :model="formSearch" ref='formSearch'>
        <Form-item label="收银日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false"
            style="width: 180px" @on-change='setDate' :value='dateBox'></Date-picker>
        </Form-item>
        <Form-item label="收银员" prop='createUserId'>
          <cmptHospChooseUser _placeHolder="选择收银员" :_style="{width:'162px'}" :_userName="showChildUser"
            v-on:setUserName="setCreateUser"></cmptHospChooseUser>
        </Form-item>
        <Form-item label="结算日期" prop='settlementStartTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false"
            style="width: 180px" @on-change='setDate2' ref='cleanDate'></Date-picker>
        </Form-item>
        <Form-item label="结算编号" prop='settlementID'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.settlementID" placeholder="请输入结算编号" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <Form-item label="结算状态" prop='status'>
          <Select v-model="formSearch.status" style="width:162px">
            <Option :value="1">已结算</Option>
            <Option :value="0">未结算</Option>
          </Select>
        </Form-item>
        <Form-item label="类型" prop='type'>
          <Select v-model="formSearch.type" style="width:162px">
            <Option :value="item.id" v-for='item in orderType' :key='item.id'>{{item.name}}</Option>
          </Select>
        </Form-item>
        <Form-item label="客户编号" prop='customerId'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <Form-item label="客户名称" prop='customerName'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.customerName" placeholder="请输入名称" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList(1, formSearch)">
            <Icon type="search"></Icon>查询
          </li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置
          </li>
        </ul>
      </Form>
      <Alert>
        <div v-html='message'>{{message}}</div>
      </Alert>
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
        show: false,
        adminToken: this.$token.readToken('adminToken') || '',
        exportKey: localStorage.getItem('exportKey'),
        total: 0,
        message: '',
        totalPages: 1,
        pageNumber: 1,
        showChildUser: '',
        formSearch: {
          status: '',
          settlementID: '',
          settlementStartTime: '',
          settlementEndTime: '',
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          createUserId: '',
          customerId: '',
          type: '',
          customerName: '',
        },
        dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        orderType: [{
            id: 1,
            name: '项目订单'
          },
          {
            id: 3,
            name: '预收款订单'
          },
          {
            id: 4,
            name: '退单'
          },
          {
            id: 5,
            name: '退预收款'
					},
					{
            id: 7,
            name: '渠道充值'
          },
          {
            id: 10,
            name: '还款单'
          }
        ],
        col: [{
            title: '序号',
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
						title: '收银时间',
						width: 80,
            key: 'createTime'
          },
          {
						title: '结算时间',
						width: 80,
            key: 'settlementTime'
          },
          {
						title: '结算编号',
						width: 80,
            key: 'settlementID'
          },
          {
						title: '状态',
						width: 60,
            render: (h, params) => {
              const _color = params.row.status == 1 ? 'blue' : 'red'
              const _text = params.row.status == 1 ? '已结算' : '未结算'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
						title: '单号',
						width: 80,
            key: 'no'
          },
          {
						title: '客户编号',
						width: 60,
            render: (h, params) => {
							const text = params.row.orderType === 7 ? params.row.distributionUserID : params.row.customerID;
							return h('span', text);
						}
          },
          {
						title: '客户姓名',
						width: 60,
            render: (h, params) => {
							const text = params.row.orderType === 7 ? params.row.distributionUserName : params.row.customerName;
							return h('span', text);
						}
          },
          {
						title: '收银员',
						width: 60,
            key: 'createUserName'
          },
          {
						title: '类型',
						width: 60,
            key: 'orderType',
            render: (h, params) => {
              const _index = this.orderType.findIndex(item => item.id === params.row.orderType)
              if (_index >= 0) {
                return h('span', this.orderType[_index].name)
              }
            }
          },
          {
						title: '应收金额',
						width: 60,
            key: 'amount'
          },
          {
						title: '实收金额',
						width: 60,
            key: 'cashCard'
          },
          {
						title: '现金支付',
						width: 60,
            key: 'cash'
					},
					{
						title: '虚拟币',
						width: 60,
            key: 'virtualCurrencyBalance'
          },
          {
						title: '刷卡总额',
						width: 60,
            key: 'card'
          },
        ],
        data: [],
      }
    },
    computed: {
      pageSize() {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL() {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/hospitalCashierDetail.jhtml'
      }
    },
    created() {
      this.getList(1, this.formSearch)
    },
    methods: {
      getList(pageNumber, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageNumber'] = pageNumber
        form['pageSize'] = _vm.pageSize
        _vm.$http.get({
          url: 'guard-webManager/report/hospitalCashierDetail.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code === 0) {
              _vm.col.splice(15)
							_vm.message = res.data.content.TotalText || ''
							_vm.col.find(i => i.key === 'virtualCurrencyBalance').title = res.data.content.VirtualCurrencyName || '虚拟币';
              const _cardList = res.data.content.CardCategoryList || []
              _cardList.map(item => {
                _vm.col.push({
									title: item.name,
									width: 60,
                  render: (h, params) => {
                    if (params.row.cardCategory1ID === item.id) {
                      return h('span', params.row.card1)
                    } else if (params.row.cardCategory2ID === item.id) {
                      return h('span', params.row.card2)
                    } else if (params.row.cardCategory3ID === item.id) {
                      return h('span', params.row.card3)
                    } else if (params.row.cardCategory4ID === item.id) {
                      return h('span', params.row.card4)
                    } else if (params.row.cardCategory5ID === item.id) {
                      return h('span', params.row.card5)
                    } else {
                      return h('span', 0)
                    }
                  }
                })
              })
              const _box = [{
									title: '预收支付',
									width: 60,
                  key: 'deposit'
                },
                {
									title: '券支付',
									width: 60,
                  key: 'coupon'
                },
                {
									title: '欠款',
									width: 60,
                  key: 'debt'
                },
                {
									title: '备注',
									width: 60,
                  key: 'remark'
                }
              ]
              _vm.col.push(..._box)
              _vm.data = res.data.content.Page.content
              _vm.total = res.data.content.Page.total
              _vm.pageNumber = res.data.content.Page.pageNumber
              _vm.totalPages = res.data.content.Page.totalPages
              _vm.$store.dispatch('setPageLoading', 1)
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
      //获取弹窗用户
      setCreateUser(data) {
        this.showChildUser = data.name
        this.formSearch.createUserId = data.id
      },
      setDate(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      setDate2(date) {
        this.formSearch.settlementStartTime = date[0]
        this.formSearch.settlementEndTime = date[1]
      },
      changePage(num) {
        this.getList(num, this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.$refs.cleanDate.handleClear()
        this.formSearch.startTime = moment().format('YYYY-MM-DD')
        this.formSearch.endTime = moment().format('YYYY-MM-DD')
        this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        this.showChildUser = ''
        this.getList(1, this.formSearch)
      },
      exportTable() {
        this.$refs.formSubmit.submit()
      }
    }
  }

</script>
