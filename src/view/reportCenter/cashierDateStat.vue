<!-- 集团营收明细 -->
/**
*集团营收明细
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>集团营收明细</h2>
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
        <input name="adminToken" :value="adminToken">
      </form>
      <Form :label-width="80" inline :model="formSearch" ref='formSearch'>
        <Form-item label="划扣日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false"
            style="width: 190px" @on-change='setDate_1' :value='dateBox_1'></Date-picker>
        </Form-item>
        <Form-item label="医院" prop='hospitalId'>
          <Select v-model="formSearch.hospitalId" clearable style="width:200px">
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
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
      <Table stripe :columns="col" :data="data"></Table>

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
        managerUserName: '',
        chargeName: '',
        formSearch: {
          startTime: moment().format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: ''
        },
        dateBox_1: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        col: [{
            title: '营业日期',
            key: 'createDate'
          },
          {
            title: '业务类型',
            key: 'type'
          },
          {
            title: '人次',
            key: 'num'
          },
          {
            title: '营业收入',
            key: 'cashCardAmount'
          },
          {
            title: '现金收款',
            key: 'cashInAmount'
          },
          {
            title: '虚拟币',
            key: 'virtualCurrencyBalance'
          },
          {
            title: '刷卡收款',
            key: 'cardInAmount'
          },
          {
            title: '收款总额 ',
            key: 'cashCardInAmount'
          },
          {
            title: '预收款使用',
            key: 'depositAmount'
          },
          {
            title: '劵使用',
            key: 'couponAmount'
          },
          {
            title: '欠款总额',
            key: 'debtAmount'
          },
          {
            title: '退款总额',
            key: 'cashCardOutAmount'
          }
        ],
        data: [],
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList
      },
      exportPrefixURL() {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/cashierDateStat.jhtml'
      }
    },
    created() {
      this.getList(1, this.formSearch)
    },
    mounted() {
      this.$store.dispatch('setSelectAllHospList', {})
    },
    methods: {
      getList(pageNumber, form) {
        let _vm = this
        _vm.$store.dispatch('setPageLoading', -1)
        _vm.$http.get({
          url: 'guard-webManager/report/cashierDateStat.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code == 0) {
              _vm.data = res.data.content.List
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
      setDate_1(date) {
        this.formSearch.startTime = date[0]
        this.formSearch.endTime = date[1]
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        if (name == 'formSearch') {
          this.formSearch.startTime = moment().format('YYYY-MM-DD')
          this.formSearch.endTime = moment().format('YYYY-MM-DD')
          this.dateBox_1 = [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
          this.getList(1, this.formSearch)
        }
      },
      exportTable() {
        this.$refs.formSubmit.submit()
      }
    }
  }

</script>
