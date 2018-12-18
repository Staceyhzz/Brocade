<!-- operatorPerformanceDetail -->
<!-- 集团医生业绩明细 -->
/**
* 集团医生业绩明细
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>集团医生业绩明细</h2>
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
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="userId" :value="formSearch.userId">
        <input name="chargeId" :value="formSearch.chargeId">
        <input name="itemId" :value="formSearch.itemId">
        <input name="itemGroupId" :value="formSearch.itemGroupId">
        <input name="positionId" :value="formSearch.positionId">
        <input name="managerUserId" :value="formSearch.managerUserId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="customerName" :value="formSearch.customerName">
        <input name="adminToken" :value="adminToken">
      </form>
      <Form :label-width="85" inline :model="formSearch" ref='formSearch'>
        <Form-item label="提交日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false"
            style="width: 190px" @on-change='setDate' :value='dateBox'></Date-picker>
        </Form-item>
        <Form-item label="购买医院" prop='hospitalId'>
          <Select v-model="formSearch.hospitalId" clearable style="width:200px">
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="咨询人员" prop='managerUserId'>
          <cmptHospChooseUser _placeHolder="请选择用户" :_style="{width:'162px'}" :_userName="managerUserName"
            v-on:setUserName="setManagerUser"></cmptHospChooseUser>
        </Form-item>
        <Form-item label="用户" prop='userId'>
          <cmptHospChooseUser _placeHolder="请选择用户" :_style="{width:'162px'}" :_userName="userName" v-on:setUserName="setUser"></cmptHospChooseUser>
        </Form-item>
        <Form-item label="岗位分工" prop='positionId'>
          <Select v-model="formSearch.positionId" clearable style="width:200px">
            <Option v-for="item in positionList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="项目" prop='chargeId'>
          <Input v-model="chargeName" readonly icon="ios-search" placeholder="选择项目" @on-focus="showCharge" style='width:162px;'></Input>
        </Form-item>
        <Form-item label="消费意向" prop='itemId'>
          <Select v-model="formSearch.itemId" clearable style="width:200px">
            <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="意向分类" prop='itemGroupId'>
          <Select v-model="formSearch.itemGroupId" clearable style="width:200px">
            <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
        <div v-html="TotalText">{{TotalText}}</div>
      </Alert>
      <Table stripe :columns="col" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber'></Page>
      </div>
    </div>
    <cmptChargeChoose placeHolder="选择指定项目" @on-change="setCharge" :openKey='openKey'></cmptChargeChoose>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue'
  export default {
    data() {
      return {
        openKey: false,
        show: false,
        adminToken: this.$token.readToken('adminToken') || '',
        exportKey: localStorage.getItem('exportKey'),
        total: 0,
        message: '',
        totalPages: 1,
        pageNumber: 1,
        TotalText: '',
        managerUserName: '',
        chargeName: '',
        userName: '',
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          customerId: '',
          customerName: '',
          chargeId: '',
          itemId: '',
          itemGroupId: '',
          managerUserId: '',
          positionId: '',
          userId: '',
          hospitalId: ''
        },
        dateBox: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        col: [{
            title: '序号',
            width: 70,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10
              return h('span', params.index + 1 + _index)
            }
          },
          {
						title: '划扣日期',
						width: 80,
            render: (h, params) => {
              const _text = moment(params.row.operationDate).format('YYYY-MM-DD')
              return h('span', _text)
            }
          },
          {
						title: '划扣时间',
						width: 80,
            key: 'operationTime'
          },
          {
						title: '客户编号',
						width: 60,
            key: 'customerID'
          },
          {
						title: '客户姓名',
						width: 60,
            key: 'customerName'
          },
          {
						title: '咨询人员',
						width: 60,
            key: 'managerUserName'
          },
          {
						title: '执行医院',
						width: 60,
            key: 'hospitalName'
          },
          {
						title: '执行用户',
						width: 60,
            key: 'userName'
          },
          {
						title: '分工',
						width: 60,
            key: 'positionName'
          },
          {
						title: '意向分类 ',
						width: 60,
            key: 'itemGroupName'
          },
          {
						title: '消费意向',
						width: 60,
            key: 'itemName'
          },
          {
						title: '项目编号',
						width: 60,
            key: 'chargeID'
          },
          {
						title: '项目名称',
						width: 60,
            key: 'chargeName'
          },
          {
						title: '单位',
						width: 60,
            key: 'chargeUnitName'
          },
          {
						title: '购买日期',
						width: 80,
            key: 'orderPaidTime'
          },
          {
						title: '购买数量',
						width: 60,
            key: 'orderDetailNum'
          },
          {
						title: '成交金额',
						width: 60,
            key: 'totalAmount'
          },
          {
						title: '划扣数量 ',
						width: 60,
            key: 'num'
          },
          {
						title: '划扣金额 ',
						width: 60,
            key: 'unitTotalAmount'
          },
          {
						title: '现收金额',
						width: 60,
            key: 'unitCashCardAmount'
					},
					{
						title: '虚拟币',
						width: 60,
            key: 'virtualCurrencyBalance'
          },
          {
						title: '预收金额',
						width: 60,
            key: 'unitDepositAmount'
          },
          {
						title: '劵金额',
						width: 60,
            key: 'unitCouponAmount'
          },
          {
						title: '欠款金额',
						width: 60,
            key: 'unitDebtAmount'
          },
          {
						title: '备注',
						width: 60,
            key: 'repaymentRemark'
          }
        ],
        data: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList
      },
      positionList() {
        return this.$store.getters.getSelectAllPositionList
      },
      itemList() {
        return this.$store.getters.getSelectAllItemList
      },
      itemGroupList() {
        return this.$store.getters.getSelectAllItemGroupList
      },
      pageSize() {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL() {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/operatorPerformanceDetail.jhtml'
      }
    },
    components: {
      cmptChargeChoose
    },
    created() {
      this.getList(1, this.formSearch)
    },
    mounted() {
      this.$store.dispatch('setSelectAllHospList', {})
      this.$store.dispatch('setSelectAllItemList', {});
      this.$store.dispatch('setSelectAllItemGroupList', {})
      this.$store.dispatch('setSelectAllPositionList', {})
    },
    methods: {
      getList(pageNumber, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageNumber'] = pageNumber
        form['pageSize'] = _vm.pageSize
        _vm.pageLodading = true
        _vm.$http.get({
          url: 'guard-webManager/report/operatorPerformanceDetail.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.data = res.data.content.Page.content
              _vm.total = res.data.content.Page.total
              _vm.pageNumber = res.data.content.Page.pageNumber
              _vm.totalPages = res.data.content.Page.totalPages
							_vm.TotalText = res.data.content.TotalText
							_vm.col.find(i => i.key === 'virtualCurrencyBalance').title = res.data.content.VirtualCurrencyName || '虚拟币';
              _vm.$store.dispatch('setPageLoading', 1);
              console.log(res)
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      //获取弹窗用户
      setManagerUser(data) {
        this.managerUserName = data.name
        this.formSearch.managerUserId = data.id
      },
      setUser(data) {
        this.userName = data.name
        this.formSearch.userId = data.id
      },
      showCharge() {
        this.openKey = !this.openKey;
      },
      setCharge(data) {
        this.chargeName = data.name
        this.formSearch.chargeId = data.id
      },
      setDate(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      changePage(num) {
        this.getList(num, this.formSearch)
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        if (name == 'formSearch') {
          this.formSearch.startTime = moment().format('YYYY-MM-DD')
          this.formSearch.endTime = moment().format('YYYY-MM-DD')
          this.dateBox = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
          this.getList(1, this.formSearch)
          this.managerUserName = ''
          this.chargeName = ''
          this.userName = ''
        }
      },
      exportTable() {
        this.$refs.formSubmit.submit()
      }
    }
  }

</script>
