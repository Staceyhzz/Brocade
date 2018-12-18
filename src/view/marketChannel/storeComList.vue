/** * 佣金记录页面 */

<template>
  <div class="store-record-com">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>佣金分析</h3>
      </div>
      <Row>
        <Col :lg="{ span: 9, offset: 2 }">
        <Card :padding='8' style='marginBottom:10px;'>
          <Row class='record-tit'>
            <Col span="6">类型</Col>
            <Col span="6">数量</Col>
            <Col span="12">合计</Col>
          </Row>
          <Row class='record-com'>
            <Col span="6">项目单</Col>
            <Col span="6">{{formShow.orderNum}}</Col>
            <Col span="12">{{formShow.orderAmount}}</Col>
          </Row>
          <Row class='record-com'>
            <Col span="6">退款单</Col>
            <Col span="6">{{formShow.backNum}}</Col>
            <Col span="12">{{formShow.backAmount}}</Col>
          </Row>
          <Row class='record-com'>
            <Col span="6">还款单</Col>
            <Col span="6">{{formShow.repaymentNum}}</Col>
            <Col span="12">{{formShow.repaymentAmount}}</Col>
          </Row>
          <Row class='record-bottom'>
            <Col span="6">佣金总额</Col>
            <Col span="12" offset="6">{{formShow.totalAmount}}</Col>
          </Row>
        </Card>
        </Col>
        <Col :lg="{ span: 7, offset: 1 }">
        <Card :padding='8'>
          <Row>
            <Row class='record-tit'>
              <Col span="12">类型</Col>
              <Col span="12">合计</Col>
            </Row>
            <Row class='record-com'>
              <Col span="12">待确认金额</Col>
              <Col span="12">{{formShow.unConfirmAmount}}</Col>
            </Row>
            <Row class='record-com'>
              <Col span="12">待支付金额</Col>
              <Col span="12">{{formShow.price}}</Col>
            </Row>
            <Row class='record-com'>
              <Col span="12">已支付金额</Col>
              <Col span="12">{{formShow.payAmount}}</Col>
            </Row>
          </Row>
        </Card>
        </Col>
      </Row>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>佣金明细</h3>
      </div>
      <Form :label-width="60" inline ref='formSearch' :model='formSearch' :rules="ruleForm">
        <Form-item label="客户姓名" prop="customerName">
          <Input :maxlength='15' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.customerName" type="text" placeholder="请输入客户姓名"></Input>
        </Form-item>
        <Form-item label="项目单号" prop="orderID">
          <Input :maxlength='15' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.orderID" type="text" placeholder="请输入项目单号"></Input>
        </Form-item>
        <Form-item label="收银日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 180px" @on-change='setDate'
            ref='cleanDate'></Date-picker>
        </Form-item>
        <Form-item label="确认人" prop="userName">
          <Input :maxlength='15' @on-enter='getList(1, 10, formSearch)' v-model.trim="formSearch.userName" type="text" placeholder="请输入确认人"></Input>
        </Form-item>
        <Form-item label="确认状态" prop='status'>
          <Select v-model="formSearch.status" style='width:168px'>
            <Option :value="0">未确认</Option>
            <Option :value="1">已确认</Option>
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
        formShow: {},
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          storeID: sessionStorage.getItem('storeId'),
          orderID: '',
          customerName: '',
          startTime: '',
          endTime: '',
          status: '',
          userName: '',
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
            title: '客户',
            render: (h, params) => {
              return h('p', {
                style: {
                  color: 'orange',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.toCus(params.row.customerName, params.row.customerID)
                  }
                }
              }, params.row.customerName)
            }
          },
          {
            title: '类型',
            render: (h, params) => {
              let _type = this.orderType.filter(item => item.id == params.row.orderType),
                _text = _type[0].name
              return h('span', _text)
            }
          },
          {
            title: '项目单号',
            key: 'orderID'
          },
          {
            title: '咨询项目',
            key: 'chargeName'
          },
          {
            title: '收银日期',
            key: 'createTime'
          },
          {
            title: '金额',
            render: (h, params) => {
              const _text = (params.row.cardAmount + params.row.cashAmount + params.row.couponAmount + params.row.depositAmount)
                .toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '渠道抽成',
            key: 'confirmAmount'
          },
          {
            title: '确认状态',
            key: 'confirmStatus'
          },
          {
            title: '确认日期',
            key: 'confirmDate'
          },
          {
            title: '确认人',
            key: 'confirmUserName'
          },
          {
            title: '备注',
            key: 'remark'
          },
        ],
        data: [],
        orderType: [{
            id: 1,
            name: '项目单'
          },
          {
            id: 4,
            name: '退项目单'
          },
          {
            id: 10,
            name: '还款单'
          },
        ],
        ruleForm: {
          orderID: [{
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
              url: 'guard-webManager/store/commissionRecord.jhtml',
              data: form,
              success: function (res) {
								_vm.formShow = res.data.content || {}
								_vm.formShow.orderAmount = res.data.content.orderAmount.toFixed(2)
								_vm.formShow.backAmount = res.data.content.backAmount.toFixed(2)
								_vm.formShow.repaymentAmount = res.data.content.repaymentAmount.toFixed(2)
								_vm.formShow.totalAmount = res.data.content.totalAmount.toFixed(2)
								_vm.formShow.unConfirmAmount = res.data.content.unConfirmAmount.toFixed(2)
								_vm.formShow.payAmount = res.data.content.payAmount.toFixed(2)
								_vm.formShow.price = (res.data.content.totalAmount - res.data.content.payAmount).toFixed(2)
								_vm.data = res.data.content.page.content || []
								_vm.total = res.data.content.page.total || 0
								_vm.totalPages = res.data.content.page.totalPages || 1
								_vm.pageNumber = res.data.content.page.pageNumber || 1
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
    }
  }

</script>

<style>
  .store-record-com .record-tit {
    margin-bottom: 5px;
    line-height: 25px;
    text-align: center;
    box-shadow: inset 0 -1px 0 0 rgba(65, 65, 65, 0.1);
  }

  .store-record-com .record-com {
    line-height: 24px;
    text-align: center;
  }

  .store-record-com .record-bottom {
    margin-top: 5px;
    line-height: 25px;
    text-align: center;
    box-shadow: inset 0 1px 0 0 rgba(65, 65, 65, 0.1);
  }

</style>
