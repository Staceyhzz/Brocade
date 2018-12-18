/** * 审核记录 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>审核记录</h2>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
        <Form-item label="审核状态" prop="type">
          <Select v-model="formSearch.type" placeholder="请选择审核状态" clearable>
            <Option v-for="item in typeList" :value="item.value" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="提交日期" prop="updateTime">
          <Date-picker :transfer='true' type="daterange" placeholder="请选择日期" :value="formSearch.time" @on-change='updateTime' ref="updateTime"></Date-picker>
        </Form-item>
        <Form-item label="客户编号" prop="customerId">
          <Input type="text" placeholder="请输入客户端编号" :maxlength='15' v-model.trim="formSearch.customerId" @on-enter="getList('1', '10', formSearch.type, formSearch.startTime, formSearch.endTime, formSearch.customerId)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.type, formSearch.startTime, formSearch.endTime, formSearch.customerId)">
            <Icon type="search"></Icon>查询</li>
          <li class="header-item" @click="handleReset('formSearch')">
            <Icon type="refresh"></Icon>重置</li>
        </ul>
      </Form>


      <Table stripe :columns="columns" :data="data"></Table>

      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="totalNum" @on-change='changePage' :current='pageNum'></Page>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        typeList: [{
            name: '项目单',
            value: 'order'
          },
          {
            name: '退预收款单',
            value: 'rebateDeposit'
          },
          {
            name: '退项目单',
            value: 'back'
          },
          {
            name: '开发人变更',
            value: 'exploitChange'
          },
          {
            name: '咨询人员变更',
            value: 'managerChange'
          },
          {
            name: '会员',
            value: 'member'
          },
          {
            name: '增加权益',
            value: 'addEquity'
          },
          {
            name: '删除权益',
            value: 'deleteEquity'
          },
          {
            name: '赠送券',
            value: 'addCoupon'
          },
          {
            name: '退券',
            value: 'rebateCoupon'
          },
          {
            name: '赠送积分',
            value: 'addPoint'
          },
          {
            name: '扣减积分',
            value: 'rebatePoint'
          },
          {
            name: '积分兑换券',
            value: 'pointCoupon'
          },
          {
            name: '更换医生',
            value: 'orderDetailManager'
          },
          {
            name: '黑名单',
            value: 'blacklist'
          },
          {
            name: '转账',
            value: 'depositTransfer'
          },
          {
            name: '欠款划扣',
            value: 'debtOperation'
          },
        ],
        columns: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
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
            title: '类型',
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
            title: '备注',
            key: 'remark'
          },
          {
            title: '等级',
            key: 'level'
          },
          {
            title: '审核状态',
            key: 'status',
            render: (h, params) => {
              let color
              let text
              switch (params.row.status) {
                case 1:
                  text = '待审核'
                  break
                case 3:
                  text = '审核不通过'
                  break
                case 4:
                  text = '审核通过'
                  break
              }
              switch (params.row.auditStatus) {
                case 1:
                  color = 'gray'
                  break
                case 3:
                  color = 'red'
                  break
                case 4:
                  color = 'blue'
                  break
              }
              return h('span', {
                style: {
                  color: color
                }
              }, text)
            }
          },
          {
            title: '审核时间',
            key: 'audittime'
          },
          {
            title: '审核意见',
            key: 'content'
          }

        ],
        data: [],
        details: [],
        total: '',
        totalPages: '',
        pageNumber: '1',
        modalEdit: false,
        loading: true,
        formSearch: {
          type: '',
          startTime: '',
          endTime: '',
          customerId: ''
        },
        auditStatus: ''
      }
    },
    computed: {
      totalNum: function () {
        return this.total * 1
      },
      pageNum: function () {
        return this.pageNumber * 1
      }
    },
    created() {
      this.getList('1', '10', this.formSearch.type, this.formSearch.startTime, this.formSearch.endTime, this.formSearch
        .customerId)
    },
    methods: {
      getList(pageNumber, pageSize, type, startTime, endTime, customerId) {
        var _this = this
        _this.$store.dispatch('setPageLoading', -1)
        _this.$http.getPage({
          url: 'guard-webManager/auditOrderDesk/auditList.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            type: type,
            startTime: startTime,
            endTime: endTime,
            customerId: customerId
          },
          success: function (res) {
						_this.data = res.data.content.content
						_this.total = res.data.content.total
						_this.pageNumber = res.data.content.pageNumber
						_this.totalPages = res.data.content.totalPages
						console.log(res)
						_this.$store.dispatch('setPageLoading', 1);
          },
          error: function (res) {
            console.log(res);
          }
        })
      },
      //时间获取
      updateTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch.type, this.formSearch.startTime, this.formSearch.endTime, this.formSearch
          .customerId)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        if (name == 'formSearch') {
          this.getList('1', '10', this.formSearch.type, this.formSearch.startTime, this.formSearch.endTime, this.formSearch
            .customerId)
        }
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
