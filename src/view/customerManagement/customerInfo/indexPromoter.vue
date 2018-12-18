/** * 微信分销页面 */

<template>
  <div class="customer-box">
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>推荐人信息</h3>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>推荐客户列表</h3>
      </div>
      <Table stripe :columns="col1" :data="data1"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>获取佣金记录</h3>
      </div>
      <Table stripe :columns="col2" :data="data2"></Table>
    </div>
    <div class="customer-item">
      <div class="customer-item-title">
        <h3>
          <Icon type="pricetag"></Icon>佣金结算记录</h3>
      </div>
      <Table stripe :columns="col3" :data="data3"></Table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cusId: '',
        cusName: '',
        data: [],
        data1: [],
        data2: [],
        data3: [],
        col: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '姓名',
            key: 'name',
          },
          {
            title: '手机',
            key: 'mobile'
          },
          {
            title: '注册时间',
            key: 'createtime'
          },
          {
            title: '客户编号',
            key: 'customerid'
          },
        ],
        col1: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '顾客姓名',
            render: (h, params) => {
              return h('p', {
                on: {
                  click: () => {
                    this.toLook(params.row)
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
                h('span', params.row.name)
              ])
            }
          },
          {
            title: '性别',
            key: 'gender',
            render: (h, params) => {
              const _text = params.row.gender == 1 ? '男' : '女'
              return h('span', _text)
            }
          },
          {
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '提交时间',
            key: 'createtime'
          },
          {
            title: '状态',
            key: 'status',
            render: (h, params) => {
              const _text = params.row.status == 0 ? '待审核' : params.row.status == 1 ? '审核通过' : '审核不通过'
              const _color = params.row.status == 0 ? 'orange' : params.row.status == 1 ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
        ],
        col2: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '生成时间',
            key: 'createtime'
          },
          {
            title: '推荐人',
            key: 'promoterName',
          },
          {
            title: '消费客户',
            key: 'customerName',
          },
          {
            title: '收银单号',
            key: 'cashierNo'
          },
          {
            title: '类型',
            key: 'type',
            render: (h, params) => {
              const _text = params.row.type == 1 ? '消费提成' : '佣金提成'
              const _color = params.row.type == 1 ? 'blue' : 'red'
              return h('span', {
                style: {
                  color: _color
                }
              }, _text)
            }
          },
          {
            title: '提成金额',
            key: 'amount',
            render: (h, params) => {
              const _text = params.row.amount.toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '提成等级',
            key: 'level'
          },
          {
            title: '提成比例(%)',
            key: 'rate',
            render: (h, params) => {
              const _text = (params.row.rate * 100).toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '提成收益',
            key: 'commission',
            render: (h, params) => {
              const _text = params.row.commission.toFixed(2)
              return h('span', _text)
            }
          },
        ],
        col3: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '推荐人',
            key: 'promoterName',
          },
          {
            title: '操作时间',
            key: 'createtime'
          },
          {
            title: '操作用户',
            key: 'createUserName'
          },
          {
            title: '金额',
            key: 'amount',
            render: (h, params) => {
              const _text = params.row.amount.toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '备注',
            key: 'remark'
          },
        ],
      }
    },
    computed: {
      otherTabUrl() {
        return this.$store.getters.getOpenOtherTabUrl
      }
    },
    created() {
      this.cusId = sessionStorage.getItem('cusId')
      this.cusName = sessionStorage.getItem('cusName')
      this.getId(this.cusId)
    },
    methods: {
      getId(id) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/customerRecord/getPromoter.jhtml',
          data: {
            id: id
          },
          success: function (res) {
						_vm.data1 = res.data.content.customerList || []
						let _obj = res.data.content.promoter || {}
						if (_obj.id) {
							_vm.data.splice(0, 1, _obj)
						}
						_vm.data2 = res.data.content.recordList || []
						_vm.data3 = res.data.content.rebateList || []
						_vm.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      //查看关系客户
      toLook(data) {
        sessionStorage.setItem("cusNameBlank", data.name)
        sessionStorage.setItem("cusIdBlank", data.customerid)
        window.open(this.otherTabUrl)
      },
    }
  }

</script>
