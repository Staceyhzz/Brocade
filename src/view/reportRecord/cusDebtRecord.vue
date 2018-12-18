/**
 * 顾客欠款记录
 *【原表】由：集团欠款订单、医院欠款订单、集团还款日合计、医院还款日合计、集团还款各医院统计合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>顾客欠款记录</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="欠款日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="医院" prop='hospitalId' v-if='power === 1'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="欠款单号" prop='orderID'>
              <Input v-model.trim="formSearch.orderID" placeholder="请输入欠款单号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客姓名" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" placeholder="请输入顾客姓名" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客编号" prop='customerID'>
              <Input v-model.trim="formSearch.customerID" placeholder="请输入顾客编号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="开单人员" prop='createUserId' v-if='power !== 3'>
              <Input v-model="createUserName" readonly icon="ios-search" placeholder="选择开单人员" @on-focus="showUser(1)"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="收银人员" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择收银人员" @on-focus="showUser(2)"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList()"><Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <cmptChooseUserSinger :placeHolder="placeHolder" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="customerId" :value="formSearch.customerId">
        <input name="createUserId" :value="formSearch.createUserId">
        <input name="categoryId" :value="formSearch.categoryId">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>欠款分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record">欠还款记录</Menu-item>
        <Menu-item name="customer">顾客汇总</Menu-item>
        <Menu-item name="user">开单人汇总</Menu-item>
        <Menu-item name="hosp">医院汇总</Menu-item>
      </Menu>
      <!-- 表格 -->
      <div class="jyw-reporter-tit">
        <h3>报表数据</h3>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime},
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          userId: '',
          createUserId: '',
          customerName: '',
          customerID: '',
          orderID: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        userName: '',
        createUserName: '',
        userType: 1,
        openKey: false,
        chartType: 'record',
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,

        pageNumber: 1,
        totalPages: 1,
        total: 0,
        data: [],
        colBox: [
          {
            type: 'record',
            url: 'http://aaanew3-record',
            col: [
              {
                title: '序号',
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: '欠款日期',
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
                title: '医院',
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '欠款单号',
                width: 60,
                key: 'orderID'
              },
              {
                title: '顾客编号',
                width: 60,
                key: 'customerID'
              },
              {
                title: '顾客姓名',
                width: 60,
                key: 'customerName'
              },
              {
                title: '开单人',
                width: 60,
                key: 'createUserName'
              },
              {
                title: '收银员',
                width: 60,
                key: 'userName'
              },
              {
                title: '欠款总额',
                align: 'right',
                width: 60,
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2))
                  }
                }
              },
              {
                title: '当前欠款',
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'customer',
            url: 'http://aaanew3-other',
            col: [
              {
                title: '序号',
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: '医院',
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '顾客编号',
                width: 60,
                key: 'customerID'
              },
              {
                title: '顾客姓名',
                width: 60,
                key: 'customerName'
              },
              {
                title: '欠款订单数',
                width: 60,
                key: 'orderNum'
              },
              {
                title: '新增欠款总额',
                align: 'right',
                width: 60,
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2))
                  }
                }
              },
              {
                title: '剩余欠款',
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'user',
            url: 'http://aaanew3-other',
            col: [
              {
                title: '序号',
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: '医院',
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '开单人',
                width: 60,
                key: 'createUserName'
              },
              {
                title: '顾客数',
                width: 60,
                key: 'customerNum'
              },
              {
                title: '新增欠款总额',
                align: 'right',
                width: 60,
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2))
                  }
                }
              },
              {
                title: '剩余欠款',
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'hosp',
            url: 'http://aaanew3-other',
            col: [
              {
                title: '序号',
                width: 50,
                render: (h, params) => {
                  const _index = (this.pageNumber - 1) * 10;
                  return h('span', params.index + 1 + _index);
                }
              },
              {
                title: '医院',
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '顾客数',
                width: 60,
                key: 'customerNum'
              },
              {
                title: '新增欠款总额',
                align: 'right',
                width: 60,
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2))
                  }
                }
              },
              {
                title: '剩余欠款',
                align: 'right',
                width: 60,
                key: 'debt',
                render: (h, params) => {
                  if(params.row.debt || params.row.debt === 0) {
                    return h('span', params.row.debt.toFixed(2))
                  }
                }
              }
            ]
          }
        ],

      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      placeHolder () {
        if(this.userType === 1) {
          return '选择开单人员';
        } else {
          return '选择收银人员';
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
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/failtureDetail.jhtml'
      },
      url () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].url;
      },
      dimension () {
        if(this.power === 1) {
          return true;
        } else {
          return false;
        }
      },
    },
    created () {
      this.power = this.getReporterPower();
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      initPower () {
        if(this.power === 1) {
          this.formSearch.hospitalId = '';
          this.formSearch.userId = '';
        } else if(this.power === 2) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.userId = '';
        } else if(this.power === 3) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.userId = localStorage.getItem('userId');
        }
        this.getList(1, this.formSearch);
      },
      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.get({
          url: _vm.url,
          // data: _vm.formSearch,
          success: function(res){
            console.log(res)
            if(res.data.code === 0) {
              let _col = [];
              const data = res.data.content.page.content || [];
              if(_vm.chartType === 'record') {
                _col = _vm.tableCount(data, ['amount', 'debt']);
              } else {
                _col = _vm.tableCount(data, ['amount', 'debt', 'customerNum', 'orderNum']);
              }
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
            } else {
              console.log(res.data.desc)
            }
          },
          error: function(res){
            console.log(res);
          }
        });
      },
      changeChartType (val) {
        if(val !== this.chartType) {
          this.chartType = val;
          this.getList()
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
        if(this.userType === 1) {
          this.formSearch.userId = data.id;
          this.userName = data.name;
        } else {
          this.formSearch.userIds = data.id;
          this.userNames = data.name;
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
        this.userName = '';
        this.userNames = '';
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>