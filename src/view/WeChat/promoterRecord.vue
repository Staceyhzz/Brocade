/** * 推荐人档案 */
<template>
  <div class="container-box promoter">
    <div class="container-header">
      <h2>推荐人档案————{{formMsg.name}}</h2>
      <ul class="header-btn-group">
        <li class="header-item" @click="add">
          <Icon type="plus-round"></Icon>佣金提现
        </li>
      </ul>
    </div>
    <div class="container-body">
      <Tabs value="name1" :animated='false'>
        <Tab-pane label="基础信息" name="name1">
          <table class="tableEdit">
            <tbody>
              <tr class="table-item">
                <td>编号：</td>
                <td>{{formMsg.id}}</td>
              </tr>
              <tr class="table-item">
                <td>姓名：</td>
                <td>{{formMsg.name}}</td>
              </tr>
              <tr class="table-item">
                <td>手机号：</td>
                <td>{{formMsg.mobile}}</td>
              </tr>
              <tr class="table-item">
                <td>加入时间：</td>
                <td>{{formMsg.createTime}}</td>
              </tr>
              <tr class="table-item">
                <td>佣金余额：</td>
                <td>{{formMsg.total}}</td>
              </tr>
            </tbody>
          </table>
          <!-- 暂时无数据 -->
          <div style="margin-top:50px;">
            入会信息
            <Table stripe :columns="col10" :data="data10"></Table>
          </div>
        </Tab-pane>
        <Tab-pane label="推荐顾客列表" name="name3">
          <Table stripe :columns="col1" :data="data1"></Table>
        </Tab-pane>
        <Tab-pane label="推荐关系" name="name6">
          <div style="margin:0 0 50px 0;">
            上级
            <Table stripe :columns="col20" :data="data20"></Table>
          </div>
          <div>
            直接下级
            <Table stripe :columns="col21" :data="data21"></Table>
          </div>
        </Tab-pane>
        <Tab-pane label="推荐提成记录" name="name4">
          <Table stripe :columns="col2" :data="data2"></Table>
          <p class="sumCount">合计：
            <span>提成收益：{{formMsg.recordTotal}}</span>
          </p>
        </Tab-pane>
        <Tab-pane label="佣金支出记录" name="name5">
          <Table stripe :columns="col3" :data="data3"></Table>
          <p class="sumCount">合计：
            <span>金额：{{formMsg.rebateTotal}}</span>
          </p>
        </Tab-pane>
      </Tabs>
    </div>
    <Modal title="添加结算" v-model="modal" :closable="false" @on-ok="ok" :loading="loading" class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :label-width="100" label-position="right">
        <Form-item label="推荐人">
          <span>{{formMsg.name}}</span>
        </Form-item>
        <Form-item label="金额" prop="amount" required>
          <cmptInputNumber :min="0" :max='formMsg.total' v-model="formValidate.amount" style="width:388px"></cmptInputNumber>
        </Form-item>
        <Form-item label="备注" prop="remark">
          <Input v-model="formValidate.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chargeID: [],
        chargeid: [],
        pageNumber: 1,
        modal: false,
        loading: true,
        formValidate: {
          promoterId: '',
          amount: 0,
          remark: '',
        },
        formMsg: {
          id: '',
          name: '',
          mobile: '',
          createTime: '',
          total: 0,
          rebateTotal: '',
          recordTotal: '',
        },
        data1: [],
        data2: [],
        data3: [],
        col1: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '顾客姓名',
            key: 'name'
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
            key: 'createTime'
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
            title: '医院',
            key: 'hospitalName'
          },
          {
            title: '生成时间',
            key: 'createTime'
          },
          {
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
            title: '操作医院',
            key: 'hospitalName'
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
        col10: [{
            title: '购买日期',
            key: 'index',
          },
          {
            title: '医院',
            key: '',
          },
          {
            title: '单号',
            key: ''
          },
          {
            title: '订单类型',
            key: ''
          },
          {
            title: '项目类型',
            key: ''
          },
          {
            title: '项目名称',
            key: ''
          }
        ],
        data10: [],
        col20: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '编号',
            key: 'id',
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '注册时间',
            key: 'createTime'
          },
          {
            title: '客户编号',
            key: 'customerID'
          },
          {
            title: '入会状态',
            key: 'chargeID',
            render: (h, params) => {
              const text = params.row.duesMark === 1 ? '已入会' : '未入会';
              return h('span', text);
            }
          }
        ],
        data20: [],
        col21: [{
            title: '序号',
            type: 'index',
            width: 60
          },
          {
            title: '编号',
            key: 'id',
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'mobile'
          },
          {
            title: '注册时间',
            key: 'createTime'
          },
          {
            title: '客户编号',
            key: 'customerID'
          },
          {
            title: '入会状态',
            render: (h, params) => {
              const text = params.row.duesMark === 1 ? '已入会' : '未入会';
              return h('span', text);
            }
          }
        ],
        data21: []
      }
    },
    computed: {

    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.getPage({
          url: 'guard-webManager/promoter/record.jhtml',
          data: {
            id: _vm.$route.query.id
          },
          success: function (res) {
            console.log('档案')
            console.log(res)
            _vm.formMsg.id = res.data.content.Promoter.id
            _vm.formMsg.name = res.data.content.Promoter.name
            _vm.formMsg.createTime = res.data.content.Promoter.createTime
            _vm.formMsg.mobile = res.data.content.Promoter.mobile
            _vm.formMsg.total = parseFloat(res.data.content.Total.toFixed(2))
            _vm.$store.dispatch('setPageLoading', 1)
            _vm.formMsg.rebateTotal = res.data.content.RebateTotal.toFixed(2)
            _vm.formMsg.recordTotal = res.data.content.RecordTotal.toFixed(2)
            // 推荐顾客列表
            _vm.data1 = res.data.content.Record.promoteCustomerList
            _vm.data2 = res.data.content.Record.recordList
            _vm.data3 = res.data.content.Record.rebateList;
            // 推荐关系上级
            _vm.data20 = res.data.content.ParentList
            // 推荐关系上级状态
            _vm.chargeID = res.data.content.ParentList.map(item => item.chargeID)
            // 推荐关系下级
            _vm.data21 = res.data.content.Record.promoteCustomerList
            // 推荐关系下级状态
            _vm.chargeid = res.data.content.Record.promoteCustomerList.map(item => item.chargeID)
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      add() {
        this.formValidate.promoterId = this.formMsg.id
        this.modal = true
      },
      ok() {
        let _vm = this
        _vm.$http.post({
          url: 'guard-webManager/promoter/promoteRebateAddEdit.jhtml',
          data: _vm.formValidate,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.getList()
              _vm.modal = false
              _vm.$Notice.success({
                title: '系统提示！',
                desc: '保存成功！'
              })
            } else {
              _vm.$Notice.error({
                title: '系统提示！',
                desc: res.data.desc
              })
              _vm.loading = false
              _vm.$nextTick(() => {
                _vm.loading = true;
              })
            }
          },
          error: function (res) {
            console.log(res)
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

<style scoped>
  .promoter .table-item td:first-child {
    background: rgba(73, 133, 243, 0.05);
    width: 200px;
  }

  .promoter .tableEdit th {
    border-right: 1px solid rgba(65, 65, 65, 0.3);
    border-bottom: 1px solid rgba(65, 65, 65, 0.3);
  }

  .sumCount {
    padding: 15px 0;
  }

  .sumCount span {
    margin: 0px 15px;
  }

</style>
