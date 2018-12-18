/** * 审核工作台 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>订单审核</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="toAauditRecord">
          <Icon type="plus-round"></Icon>审核记录</li>
      </ul>
    </div>
    <div class="container-body">
      <Table stripe :columns="columns" :data="data"></Table>
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
            title: '审核类型',
            key: 'type',
            render: (h, params) => {
              let text
              switch (params.row.type.toLowerCase()) {
                case 'order':
                  text = '项目单'
                  break
                case 'rebatedeposit':
                  text = '退预收款单'
                  break
                case 'back':
                  text = '退项目单'
                  break
                case 'backsales':
                  text = '退药物品单'
                  break
                case 'exploitchange':
                  text = '开发人变更'
                  break
                case 'managerchange':
                  text = '咨询人员变更'
                  break
                case 'member':
                  text = '会员'
                  break
                case 'addequity':
                  text = '增加权益'
                  break
                case 'deleteequity':
                  text = '删除权益'
                  break
                case 'addcoupon':
                  text = '赠送券'
                  break
                case 'rebatecoupon':
                  text = '退券'
                  break
                case 'addpoint':
                  text = '赠送积分'
                  break
                case 'rebatepoint':
                  text = '扣减积分'
                  break
                case 'pointcoupon':
                  text = '积分兑换券'
                  break
                case 'orderdetailmanager':
                  text = '更换医生'
                  break
                case 'blacklist':
                  text = '黑名单'
                  break
                case 'deposittransfer':
                  text = '转账'
                  break
                case 'debtoperation':
                  text = '欠款划扣'
                  break
              }
              return h('span', text)
            }
          },
          {
            title: '客户',
            key: 'customerName',
            render: (h, params) => {
              return h('span', {
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
            title: '提交医院',
            key: 'hospitalName'
          },
          {
            title: '提交用户',
            key: 'createUserName'
          },
          {
            title: '提交时间',
            key: 'createTime'
          },
          {
            title: '备注',
            key: 'content'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'ios-checkmark-outline'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toAudit(params.row)
                    }
                  }
                }, '审核')
              ])
            }
          }
        ],
        data: [],

      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        var _this = this
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/auditOrderDesk/list.jhtml',
          data: {},
          success: function (res) {
						_this.data = res.data.content
						_this.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res, data, desc)
          }
        })
      },
      toAudit(data) {
        var _url = '/auditOrderDetails'
        var _text = '订单审核'
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/auditOrderDesk',
            text: '审核工作台'
          },
          {
            url: _url,
            text: _text
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url,
          query: {
            id: data.id,
            type: data.type
          }
        })
      },
      toAauditRecord() {
        var _url = '/auditRecord'
        var _text = '审核记录'
        var breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/auditOrderDesk',
            text: '审核工作台'
          },
          {
            url: _url,
            text: _text
          }
        ]
        this.$store.dispatch('setBreadData', breadData);
        this.$router.push({
          path: _url
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
