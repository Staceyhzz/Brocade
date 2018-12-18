/**
 * 顾客还款记录
 *【原表】由：集团还款明细、医院还款明细、集团还款日合计、医院还款日合计、集团还款各医院统计合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>{{$t('reportSetting.cusRepaymentRecord')}}</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('reportPublic.title1')}}</h3>
        <reportSearch :list='searchList' @on-change='changeSearch'></reportSearch>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.hkrq')" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='formSearch.auth === 1'>
            <Form-item :label="$t('labelPublic.yy')" prop='hospitalId'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('cusRepaymentRecord.label1')" prop='no'>
              <Input v-model.trim="formSearch.no" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('cusRepaymentRecord.label2')" prop='orderId'>
              <Input v-model.trim="formSearch.orderId" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='customerNameKey'>
            <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='customerIdKey'>
            <Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
              <Input v-model.trim="formSearch.customerId" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='createUserKey'>
            <Form-item :label="$t('labelPublic.kdry')" prop='createUserId'>
              <cmptInputOpen :value='createUserName' :placeholder="$t('placeholderPublic.kdry')" @on-open='showUser(true)' @on-clear='clearUser(true)' :disabled='formSearch.auth === 3'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='userKey'>
            <Form-item :label="$t('labelPublic.syry')" prop='userId'>
              <cmptInputOpen :value='userName' :placeholder="$t('placeholderPublic.syry')" @on-open='showUser(false)' @on-clear='clearUser(false)' :disabled='formSearch.auth === 3'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>{{$t('publicSet.search')}}</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>{{$t('publicSet.reset')}}</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <cmptChooseUserSinger :placeHolder="placeHolder" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="false">
        <input name="type" :value="formSearch.type">
        <input name="auth" :value="formSearch.auth">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="no" :value="formSearch.no">
        <input name="orderId" :value="formSearch.orderId">
        <input name="customerName" :value="formSearch.customerName">
        <input name="customerId" :value="formSearch.customerId">
        <input name="createUserId" :value="formSearch.createUserId">
        <input name="userId" :value="formSearch.userId">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>{{$t('cusRepaymentRecord.title')}}</h3>
        <div class="export" v-if="exportKey === '1'" @click="exportTable"></div>
        <div class="info">
          <Icon type="information"></Icon>
          <div class="info-msg">
            <p>{{$t('reportPublic.title3')}}</p>
            <p class="msg">{{$t('reportSetting.cusRepaymentRecordMsg1')}}</p>
            <p>{{$t('reportPublic.title4')}}</p>
            <p class="msg">{{$t('reportSetting.cusRepaymentRecordMsg2')}}</p>
          </div>
        </div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record_0">{{$t('cusRepaymentRecord.menuTit1')}}</Menu-item>
        <Menu-item name="customer_1">{{$t('cusRepaymentRecord.menuTit2')}}</Menu-item>
        <Menu-item name="user_2">{{$t('cusRepaymentRecord.menuTit3')}}</Menu-item>
        <Menu-item name="hosp_3">{{$t('cusRepaymentRecord.menuTit4')}}</Menu-item>
      </Menu>
      <!-- 表格 -->
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import reportSearch from 'components/reportPowerSearch.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime, reportSearch},
    data () {
      return {
        searchList: [
          {
            type: 'u',
            name: this.$t('labelPublic.kdry'),
            prop: 'createUserId',
            prop1: 'createUserName',
            key: true,
          },
          {
            type: 'u',
            name: this.$t('labelPublic.syry'),
            prop: 'userId',
            prop1: 'userName',
            key: false,
          },
          {
            type: 'c',
            name: this.$t('labelPublic.gkxm'),
            prop: 'customerName',
            key: true,
          },
          {
            type: 'c',
            name: this.$t('labelPublic.gkbh'),
            prop: 'customerId',
            key: false,
          }
        ],
        formSearch: {
          type: 0,
          auth: 3,
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          no: '',
          orderId: '',
          customerName: '',
          customerId: '',
          createUserId: '',
          userId: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        userName: '',
        createUserName: '',
        userType: true,
        openKey: false,
        chartType: 'record_0',
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',

        pageNumber: 1,
        totalPages: 1,
        total: 0,
        data: [],
        colBox: [
          {
            type: 'record_0',
            url: 'guard-webManager/newReport/repaymentRecord.jhtml',
            col: [
              {
                title: this.$t('labelPublic.xh'),
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: this.$t('labelPublic.hkrq'),
                width: 80,
                render: (h, params) => {
                  if(params.row.createTime) {
                    return h(resizeTime, {
                      props: {
                        time: params.row.createTime
                      }
                    })
                  }
                }
              },
              {
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('cusRepaymentRecord.label1'),
                width: 60,
                key: 'no'
              },
              {
                title: this.$t('labelPublic.gkbh'),
                width: 60,
                key: 'customerID'
              },
              {
                title: this.$t('labelPublic.gkxm'),
                width: 60,
                key: 'customerName'
              },
              {
                title: this.$t('labelPublic.kdry'),
                width: 60,
                key: 'createUserName'
              },
              {
                title: this.$t('labelPublic.syry'),
                width: 60,
                key: 'userName'
              },
              {
                title: this.$t('cusRepaymentRecord.label2'),
                width: 60,
                key: 'orderID'
              },
              {
                title: this.$t('cusRepaymentRecord.colTit1'),
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit2'),
                align: 'right',
                width: 60,
                key: 'repayment',
                render: (h, params) => {
                  if(params.row.repayment || params.row.repayment === 0) {
                    return h('span', params.row.repayment.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit3'),
                align: 'right',
                width: 60,
                key: 'restDebt',
                render: (h, params) => {
                  if(params.row.restDebt || params.row.restDebt === 0) {
                    return h('span', params.row.restDebt.toFixed(2))
                  }
                }
              },
            ]
          },
          {
            type: 'customer_1',
            url: 'guard-webManager/newReport/repaymentRecordStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.xh'),
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.gkbh'),
                width: 60,
                key: 'customerID'
              },
              {
                title: this.$t('labelPublic.gkxm'),
                width: 60,
                key: 'customerName'
              },
              {
                title: this.$t('cusRepaymentRecord.colTit4'),
                width: 60,
                key: 'orderNum'
              },
              {
                title: this.$t('cusRepaymentRecord.colTit5'),
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit6'),
                align: 'right',
                width: 60,
                key: 'repayment',
                render: (h, params) => {
                  if(params.row.repayment || params.row.repayment === 0) {
                    return h('span', params.row.repayment.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit7'),
                align: 'right',
                width: 60,
                key: 'restDebt',
                render: (h, params) => {
                  if(params.row.restDebt || params.row.restDebt === 0) {
                    return h('span', params.row.restDebt.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'user_2',
            url: 'guard-webManager/newReport/repaymentRecordStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.xh'),
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.kdry'),
                width: 60,
                key: 'userName'
              },
              {
                title: this.$t('cusRepaymentRecord.colTit8'),
                width: 60,
                key: 'customerNum'
              },
              {
                title: this.$t('cusRepaymentRecord.colTit5'),
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit6'),
                align: 'right',
                width: 60,
                key: 'repayment',
                render: (h, params) => {
                  if(params.row.repayment || params.row.repayment === 0) {
                    return h('span', params.row.repayment.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit7'),
                align: 'right',
                width: 60,
                key: 'restDebt',
                render: (h, params) => {
                  if(params.row.restDebt || params.row.restDebt === 0) {
                    return h('span', params.row.restDebt.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'hosp_3',
            url: 'guard-webManager/newReport/repaymentRecordStat.jhtml',
            col: [
              {
                title: this.$t('labelPublic.xh'),
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('cusRepaymentRecord.colTit8'),
                width: 60,
                key: 'customerNum'
              },
              {
                title: this.$t('cusRepaymentRecord.colTit5'),
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit6'),
                align: 'right',
                width: 60,
                key: 'repayment',
                render: (h, params) => {
                  if(params.row.repayment || params.row.repayment === 0) {
                    return h('span', params.row.repayment.toFixed(2))
                  }
                }
              },
              {
                title: this.$t('cusRepaymentRecord.colTit7'),
                align: 'right',
                width: 60,
                key: 'restDebt',
                render: (h, params) => {
                  if(params.row.restDebt || params.row.restDebt === 0) {
                    return h('span', params.row.restDebt.toFixed(2))
                  }
                }
              }
            ]
          }
        ],

      }
    },
    computed: {
      userKey () {
        const index = this.searchList.findIndex(item => item.prop === 'userId');
        return this.searchList[index].key;
      },
      createUserKey () {
        const index = this.searchList.findIndex(item => item.prop === 'createUserId');
        return this.searchList[index].key;
      },
      customerNameKey () {
        const index = this.searchList.findIndex(item => item.prop === 'customerName');
        return this.searchList[index].key;
      },
      customerIdKey () {
        const index = this.searchList.findIndex(item => item.prop === 'customerId');
        return this.searchList[index].key;
      },
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      placeHolder () {
        if(this.userType) {
          return this.$t('placeholderPublic.kdry');
        } else {
          return this.$t('placeholderPublic.syry');
        }
      },
      columns () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].col;
      },
      pageSize () {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/repaymentRecord.jhtml'
      },
      url () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].url;
      },
      dimension () {
        if(this.formSearch.auth === 1) {
          return true;
        } else {
          return false;
        }
      },
    },
    created () {
      this.formSearch.auth = this.getReporterPower('cusRepaymentRecord');
      this.initPower(this.searchList);
      this.getList(1, this.formSearch);
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      changeSearch (data, change) {
        this.searchList = data;
        this.initPower([change]);
      },
      initPower (data) {
        const uData = data.filter(item => item.type === 'u');
        const cData = data.filter(item => item.type === 'c');
        uData.map(item => {
          if(item.key) {
            if(this.formSearch.auth === 3) {
              this.formSearch[item.prop] = localStorage.getItem('userId');
              this[item.prop1] = localStorage.getItem('userAccount');
            } else {
              this.formSearch[item.prop] = '';
              this[item.prop1] = '';
            }
          } else {
            this.formSearch[item.prop] = '';
            this[item.prop1] = '';
          }
        });
        cData.map(item => {
          this.formSearch[item.prop] = '';
        });
        if(this.formSearch.auth === 1) {
          this.formSearch.hospitalId = '';
        } else {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
        }
      },
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form.pageNumber = pageNumber;
        form.pageSize = _vm.pageSize;
        _vm.$http.getPage({
          url: _vm.url,
          data: _vm.formSearch,
          success: function(res){
            console.log(res)
            let _col = [];
            const data = res.data.content.page.content || [];
            _col = _vm.tableCount(data, ['restDebt', 'repayment', 'debt']);
            const index = _vm.colBox.findIndex(item => item.type === _vm.chartType);
            _col.map(item => {
              const index1 = _vm.colBox[index].col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index1 >= 0) {
                _vm.colBox[index].col[index1].width = item.width;
              }
            });
            _vm.data = data;
            _vm.total = res.data.content.page.total || 0;
            _vm.pageNumber = res.data.content.page.pageNumber || 1;
            _vm.totalPages = res.data.content.page.totalPages || 1;
            _vm.$store.dispatch('setPageLoading', 1);
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeChartType (val) {
        if(val !== this.chartType) {
          this.chartType = val;
          this.formSearch.type = val.split('_')[1];
          this.getList(1, this.formSearch);
        }
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      showUser (type) {
        this.userType = type;
        this.openKey = !this.openKey;
      },
      setUser (data) {
        if(this.userType) {
          this.formSearch.createUserId = data.id;
          this.createUserName = data.name;
        } else {
          this.formSearch.userId = data.id;
          this.userName = data.name;
        }
      },
      clearUser (type) {
        if(type) {
          this.formSearch.createUserId = '';
          this.createUserName = '';
        } else {
          this.formSearch.userId = '';
          this.userName = '';
        }
      },
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.initPower(this.searchList);
        this.getList(1, this.formSearch);
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>