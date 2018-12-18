/** * 审核请求 */
<template>
  <div class="container-box">
    <div class="container-header">
      <h2>审核请求</h2>
    </div>
    <div class="container-body">
      <Form :label-width="60" inline ref='formSearch' :model='formSearch'>
        <Form-item label="审核状态" prop="status">
          <Select v-model="formSearch.status" placeholder="请选择审核状态" clearable>
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item label="提交日期" prop="updateTime">
          <Date-picker :transfer='true' type="daterange" placeholder="请选择日期" :options="options" @on-change='updateTime' ref="updateTime"></Date-picker>
        </Form-item>
        <Form-item label="客户编号" prop='customerId'>
          <Input type="text" v-model.trim="formSearch.customerId" placeholder="请输入客户编号" @on-enter="getList('1', '10', formSearch.status, formSearch.startTime, formSearch.endTime, formSearch.customerId)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList('1', '10', formSearch.status, formSearch.startTime, formSearch.endTime, formSearch.customerId)">
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

      <Modal title="申请审核信息" width='700' v-model="modalEdit" :closable="false" id="audit-apply" class-name="vertical-center-modal">
        <div class="audit-details">
          <b class="mini-title">状态:</b>
          <b>{{ auditStatus }}</b>
        </div>
        <div class="audit-details">
          <b class="mini-title">详细信息:</b>
          <Table stripe border :columns="columns_modal_table" :data="auditTableData"></Table>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        statusList: [{
            value: 1,
            label: '待审核'
          },
          {
            value: 4,
            label: '审核通过'
          },
          {
            value: 3,
            label: '审核不通过'
          }
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
            title: '客户姓名',
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
            title: '提交时间',
            key: 'createTime'
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
                case 'backsales':
                  text = '退药物品单'
                  break
                case 'back':
                  text = '退项目单'
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
            title: '申请原因',
            key: 'content'
          },
          {
            title: '审核状态',
            key: 'auditStatus',
            render: (h, params) => {
              let color
              let text
              switch (params.row.auditStatus) {
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
            title: '操作',
            key: 'action',
            width: 150,
            align: 'left',
            render: (h, params) => {
              const _display = params.row.auditStatus == 1 ? 'inlineBlock' : 'none'
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openDetails(params.row)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'ios-trash-outline'
                  },
                  style: {
                    display: _display
                  },
                  on: {
                    click: () => {
                      this.remove(params.row)
                    }
                  }
                }, '删除'),
              ])

            }
          }
        ],
        columns_modal_table: [{
            title: '等级',
            type: 'index',
            width: 60
          },
          {
            title: '审核用户',
            key: 'detailList',
            width: 220,
            render: (h, params) => {
              if (params.row.detailList) {
                return h('div', {
                  style: {
                    padding: '4px 0'
                  }
                }, params.row.detailList.map(item => {
                  return h('p', {
                    style: {
                      padding: '2px 0'
                    }
                  }, '【' + item.userHospitalName + '】' + '【' + item.userName + '】')
                }))
              }
            }
          },
          {
            title: '审核状态',
            key: 'status',
            width: 100,
            render: (h, params) => {
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
              return h('span', text)
            }
          },
          {
            title: '审核时间',
            key: 'auditTime',
            width: 160
          },
          {
            title: '意见',
            key: 'content'
          }
        ],
        auditTableData: [],
        options: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        data: [],
        auditRule: [],
        auditedInfo: [],
        noAuditInfo: [],
        total: '',
        totalPages: '',
        pageNumber: '1',
        modalEdit: false,
        loading: true,
        formSearch: {
          status: '',
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
      this.getList('1', '10', this.formSearch.status, this.formSearch.startTime, this.formSearch.endTime, this.formSearch
        .customerId)
    },
    methods: {
      //时间获取
      updateTime(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      getList(pageNumber, pageSize, status, startTime, endTime, customerId) {
        var _this = this
        _this.$store.dispatch('setPageLoading', -1)
        if (status == null) {
          status = null
        }
        _this.$http.getPage({
          url: 'guard-webManager/auditOrder/list.jhtml',
          data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            status: status,
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
      //查看
      openDetails(data) {
        var _this = this
        _this.auditTableData = []
        _this.$http.get({
          url: 'guard-webManager/auditOrder/view.jhtml',
          data: {
            id: data.id,
            type: data.type
          },
          success: function (res) {
            _this.modalEdit = true
            if (res.data.code == 0) {
              console.log(res)
              let result = res.data.content
              let level = result.Rule.level
              let obj = {}
              obj.detailList = []
              let objInit = {
                detailList: result.Rule.detailList,
                status: 1,
                auditTime: '',
                content: '',
              }
              let miniObj = {}
              _this.auditStatus = result.Audit.auditstatus
              console.log(_this.auditStatus)
              switch (_this.auditStatus) {
                case 1:
                  _this.auditStatus = '待审核'
                  break
                case 3:
                  _this.auditStatus = '审核不通过'
                  break
                case 4:
                  _this.auditStatus = '审核通过'
                  break
              }
              // 存放审核信息的数组 _this.auditTableData
              if (level >= 1) {
                if (result.Audit.audittime != null) {
                  miniObj.userHospitalName = result.Audit.userHospitalName
                  miniObj.userName = result.Audit.userName
                  obj.detailList.push(miniObj)
                  obj.status = result.Audit.status
                  obj.auditTime = result.Audit.audittime
                  obj.content = result.Audit.content
                  _this.auditTableData.push(obj)
                } else {
                  _this.auditTableData.push(objInit)
                }
                console.log(_this.auditTableData)
              }
              if (level >= 2) {
                if (result.Audit.audittime2 != null) {
                  miniObj.userHospitalName = result.Audit.userHospitalName2
                  miniObj.userName = result.Audit.userName2
                  obj.detailList.push(miniObj)
                  obj.status = result.Audit.status2
                  obj.auditTime = result.Audit.audittime2
                  obj.content = result.Audit.content2
                  _this.auditTableData.push(obj)
                } else {
                  _this.auditTableData.push(objInit)
                }
              }
              if (level >= 3) {
                if (result.Audit.audittime3 != null) {
                  miniObj.userHospitalName = result.Audit.userHospitalName3
                  miniObj.userName = result.Audit.userName3
                  obj.detailList.push(miniObj)
                  obj.status = result.Audit.status3
                  obj.auditTime = result.Audit.audittime3
                  obj.content = result.Audit.content3
                  _this.auditTableData.push(obj)
                } else {
                  _this.auditTableData.push(objInit)
                }
              }
              if (level >= 4) {
                if (result.Audit.audittime4 != null) {
                  miniObj.userHospitalName = result.Audit.userHospitalName4
                  miniObj.userName = result.Audit.userName4
                  obj.detailList.push(miniObj)
                  obj.status = result.Audit.status4
                  obj.auditTime = result.Audit.audittime4
                  obj.content = result.Audit.content4
                  _this.auditTableData.push(obj)
                } else {
                  _this.auditTableData.push(objInit)
                }
              }
              if (level >= 5) {
                if (result.Audit.audittime5 != null) {
                  miniObj.userHospitalName = result.Audit.userHospitalName5
                  miniObj.userName = result.Audit.userName5
                  obj.detailList.push(miniObj)
                  obj.status = result.Audit.status5
                  obj.auditTime = result.Audit.audittime5
                  obj.content = result.Audit.content5
                  _this.auditTableData.push(obj)
                } else {
                  _this.auditTableData.push(objInit)
                }
              }
            } else {
              _this.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              });
            }
          },
          error: function (res) {
            console.log(res)
          }
        })
      },
      //取消
      remove(data) {
        var _this = this
        _this.$Modal.confirm({
          title: '系统提示',
          content: '确定取消该审核请求吗？',
          onOk: () => {
            _this.$http.post({
              url: 'guard-webManager/auditOrder/delete.jhtml',
              data: {
                id: data.id,
                type: data.type
              },
              success: function (res) {
                if (res.data.code == 0) {
                  _this.getList('1', '10', _this.formSearch.status, _this.formSearch.startTime, _this.formSearch
                    .endTime, _this.formSearch.customerId)
                  _this.$Notice.success({
                    title: '系统提示！',
                    desc: '删除成功！'
                  });
                } else {
                  _this.$Notice.error({
                    title: '系统提示！',
                    desc: res.data.desc
                  });
                }
              },
              error: function (res) {
                console.log(res);
              }
            })
          },
          onCancel: () => {

          }
        })
      },
      changePage(num) {
        this.getList(num, '10', this.formSearch.status, this.formSearch.startTime, this.formSearch.endTime, this.formSearch
          .customerId)
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        if (name == 'formSearch') {
          this.getList('1', '10', this.formSearch.status, this.formSearch.startTime, this.formSearch.endTime, this.formSearch
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
      }
    }
  }

</script>
<style lang="less">
  #audit-apply .ivu-modal .ivu-table-body {
    overflow: visible;
  }

  #audit-apply .ivu-modal .ivu-modal-body .audit-details {
    padding: 10px 20px;
  }

  #audit-apply .ivu-modal .ivu-modal-body .audit-details .mini-title {
    display: inline-block;
    padding-right: 10px;
  }

</style>
