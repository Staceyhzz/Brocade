<!-- 集团渠道佣金明细 -->

/** * 渠道佣金明细 */

<template>
  <div class="container-box">
    <div class="container-body">
      <Menu mode="horizontal" :active-name="menuRouteUrl" @on-select='toMenu'>
        <Menu-item name="/commissionDetail">明细表</Menu-item>
        <Menu-item name="/commissionDetailTime">按时间分析</Menu-item>
        <Menu-item name="/commissionDetailCharge">按项目分析</Menu-item>
        <Menu-item name="/commissionDetailStore">按渠道商分析</Menu-item>
        <Menu-item name="/commissionDetailHosp">按医院分析</Menu-item>
      </Menu>
      <div style="overflow:hidden;paddingTop:5px;">
        <ul class="header-btn-group">
          <li class="header-item" @click="exportTable" v-if="exportKey === '1'">
            <Icon type="ios-download-outline"></Icon>导出</li>
        </ul>
      </div>
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalID" :value="formSearch.hospitalID">
        <input name="categoryID" :value="formSearch.categoryID">
        <input name="orderType" :value="formSearch.orderType">
        <input name="storeID" :value="formSearch.storeID">
        <input name="customerName" :value="formSearch.customerName">
        <input name="orderID" :value="formSearch.orderID">
        <input name="status" :value="formSearch.status">
        <input name="userName" :value="formSearch.userName">
        <input name="adminToken" :value="adminToken">
      </form>
      <Form :label-width="60" inline :model="formSearch" ref='formSearch' :rules="ruleForm">
        <Form-item label="收银日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" style="width: 190px"
            @on-change='setDate' :value='dateBox'></Date-picker>
        </Form-item>
        <Form-item label="医院" prop='hospitalID' v-if='hospKey'>
          <Select v-model="formSearch.hospitalID" style="width:200px" :clearable='true'>
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="品牌" prop="categoryID">
          <cmptStoreCategoryChoose v-on:setStoreCategory="setStoreCategory" ref='remoteStoreCategory'></cmptStoreCategoryChoose>
        </Form-item>
        <Form-item label="渠道" prop='storeID' v-if='hospKey'>
          <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStoreName" ref='remoteStore' :_type='3'></cmptRemoteFilterStore>
        </Form-item>
        <Form-item label="渠道" prop='storeID' v-else>
          <cmptRemoteFilterStore _placeHolder="选择渠道" @setStoreName="setStoreName" ref='remoteStore'></cmptRemoteFilterStore>
        </Form-item>
        <Form-item label="订单类型" prop='orderType'>
          <Select v-model="formSearch.orderType" style="width:168px">
            <Option :value="1">项目单</Option>
            <Option :value="4">退项目单</Option>
            <Option :value="10">还款单</Option>
          </Select>
        </Form-item>
        <Form-item label="订单编号" prop='orderID'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.orderID" placeholder="请输入订单编号" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <Form-item label="客户名称" prop='customerName'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.customerName" placeholder="请输入客户名称" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <Form-item label="确认状态" prop='status'>
          <Select v-model="formSearch.status" style="width:168px">
            <Option :value="1">已确认</Option>
            <Option :value="0">待确认</Option>
          </Select>
        </Form-item>
        <Form-item label="确认人" prop='userName'>
          <Input type="text" :maxlength='15' v-model.trim="formSearch.userName" placeholder="请输入确认人" @on-enter="getList(1, formSearch)"></Input>
        </Form-item>
        <ul class="header-btn-group not-float">
          <li class="header-item" @click="getList(1, formSearch)">
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
  import cmptStoreCategoryChoose from 'components/storeCategoryChoose.vue'
  export default {
    components: {
      cmptStoreCategoryChoose
    },
    data() {
      const validateId = (rule, value, callback) => {
        if ((/[^\d]/g).test(value)) {
          callback(new Error('请输入数字'))
        } else {
          callback()
        }
      }
      return {
        menuRouteUrl: '/commissionDetail',
        hospKey: true,
        show: false,
        adminToken: this.$token.readToken('adminToken') || '',
        exportKey: localStorage.getItem('exportKey'),
        total: 0,
        totalPages: 1,
        pageNumber: 1,
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalID: '',
          categoryID: '',
          orderType: '',
          storeID: '',
          customerName: '',
          orderID: '',
          status: '',
          userName: '',
        },
        dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        col: [{
            title: '序号',
            width: 60,
            render: (h, params) => {
              if (params.row.countKey) {
                return h('span', params.row.name)
              } else {
                const _index = (this.pageNumber - 1) * 10
                return h('span', params.index + 1 + _index)
              }
            }
          },
          {
            title: '收银日期',
            width: 80,
            render: (h, params) => {
              if (params.row.createTime) {
                const _text = params.row.createTime.split(' ')[0]
                return h('span', _text)
              }
            }
          },
          {
            title: '下单医院',
            width: 60,
            key: 'hospitalName'
          },
          {
            title: '渠道品牌',
            width: 60,
            key: 'storeCategoryName'
          },
          {
            title: '渠道商',
            width: 60,
            key: 'storeName'
          },
          {
            title: '顾客名称',
            width: 60,
            key: 'customerName'
          },
          {
            title: '订单类型',
            width: 60,
            key: 'orderType',
            render: (h, params) => {
              let _text = ''
              switch (params.row.orderType) {
                case 1:
                  _text = '项目订单'
                  break
                case 4:
                  _text = '退项目单'
                  break
                case 10:
                  _text = '还款单'
                  break
              }
              return h('span', _text)
            }
          },
          {
            title: '订单编号',
            width: 60,
            key: 'orderID'
          },
          {
            title: '订单项目',
            width: 80,
            key: 'chargeName'
          },
          {
            title: '应收总额',
            width: 80,
            render: (h, params) => {
              const _text = (params.row.amount).toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '实收总额',
            width: 80,
            render: (h, params) => {
              const _text = (params.row.cardAmount + params.row.cashAmount).toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '余额支付',
            width: 80,
            render: (h, params) => {
              const _text = (params.row.depositAmount).toFixed(2)
              return h('span', _text)
            }
          },
          {
            title: '咨询人员',
            width: 60,
            key: 'managerUserName'
          },
          {
            title: '开发人员',
            width: 60,
            key: 'exploitUserName'
          },
          {
            title: '佣金比例',
            width: 60,
            render: (h, params) => {
              if (Number.isFinite(params.row.rate)) {
                return h('span', params.row.rate + '%');
              } else {
								return h('span', '0%');
							}
            }
          },
          {
            title: '佣金总额',
            width: 80,
            render: (h, params) => {
              if (params.row.confirmAmount || params.row.confirmAmount == 0) {
                const _text = (params.row.confirmAmount).toFixed(2)
                return h('span', _text)
              }
            }
          },
          {
            title: '结算日期',
            width: 80,
            render: (h, params) => {
              if (params.row.confirmDate) {
                const _text = params.row.confirmDate.split(' ')[0]
                return h('span', _text)
              }
            }
          },
          {
            title: '结算状态',
            width: 60,
            key: 'confirmStatus'
          },
          {
            title: '结算人',
            width: 60,
            key: 'confirmUserName'
          },
          {
            title: '支付备注',
            width: 80,
            key: 'remark'
          },
        ],
        data: [],
        ruleForm: {
          orderID: [{
            validator: validateId,
            trigger: 'blur'
          }],
        }
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList
      },
      pageSize() {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL() {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/storeCommissionDetail.jhtml'
      }
    },
    created() {
      if (localStorage.getItem('hospId') == 1) {
        this.hospKey = true
        this.$store.dispatch('setSelectAllHospList')
      } else {
        this.hospKey = false
        this.formSearch.hospitalID = localStorage.getItem('hospId')
      }
    },
    mounted() {
      this.getList(1, this.formSearch)
    },
    methods: {
      toMenu(url) {
        let breadData = [{
            url: '/desktop',
            text: '桌面'
          },
          {
            url: '/reportCenter',
            text: '报表中心'
          },
          {
            url: url,
            text: '渠道佣金明细'
          }
        ]
        this.$store.dispatch('setBreadData', breadData)
        this.$router.push(url)
      },
      getList(pageNumber, form) {
        let _vm = this
        _vm.$refs['formSearch'].validate((valid) => {
          if (valid) {
            _vm.$store.dispatch('setPageLoading', -1)
            form['pageNumber'] = pageNumber
            form['pageSize'] = _vm.pageSize
            _vm.$http.get({
              url: 'guard-webManager/report/storeCommissionDetail.jhtml',
              data: form,
              success: function (res) {
                if (res.data.code == 0) {
                  _vm.data = res.data.content.page.content || []
                  _vm.total = res.data.content.page.total || 0
                  _vm.pageNumber = res.data.content.page.pageNumber || 1
                  _vm.totalPages = res.data.content.page.totalPages || 1
                  let _obj = {}
                  _obj.countKey = true
                  _obj.name = '合计'
                  _obj.amount = res.data.content.totalAmount || 0
                  _obj.cardAmount = res.data.content.totalCardAmount || 0
                  _obj.cashAmount = res.data.content.totalCashAmount || 0
                  _obj.couponAmount = res.data.content.totalCouponAmount || 0
                  _obj.depositAmount = res.data.content.totalDepositAmount || 0
                  _obj.confirmAmount = res.data.content.totalConfirmAmount || 0
                  _vm.data.push(_obj)
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
          }
        })
      },
      setStoreCategory(data) {
        this.formSearch.categoryID = data.id
      },
      setStoreName(data) {
        this.formSearch.storeID = data.id
      },
      setDate(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields()
        this.formSearch.startTime = moment().format('YYYY-MM-DD')
        this.formSearch.endTime = moment().format('YYYY-MM-DD')
        this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        this.$refs.remoteStore.clean()
        this.$refs.remoteStoreCategory.clean()
        this.getList(1, this.formSearch)
      },
      exportTable() {
        this.$refs.formSubmit.submit()
      }
    }
  }

</script>
