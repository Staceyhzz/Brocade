/**
 * 代金券抵用报表
 *【原表】由：集团券变动明细、集团券变动日统计合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>代金券抵用报表</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="操作日期" prop='startTime'>
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
            <Form-item label="顾客编号" prop='customerID'>
              <Input v-model.trim="formSearch.customerID" placeholder="请输入顾客编号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客姓名" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" placeholder="请输入顾客姓名" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="优惠券编号" prop='orderID'>
              <Input v-model.trim="formSearch.orderID" placeholder="请输入优惠券编号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="优惠券" prop='couponID'>
              <Select v-model="formSearch.couponID" clearable>
                <Option v-for="item in couponList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="方式" prop='ways'>
              <Select v-model="formSearch.couponID" clearable>
                <Option v-for="item in waysList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="类型" prop='type'>
              <Select v-model="formSearch.type" clearable>
                <Option :value="1">存入</Option>
                <Option :value="2">支出</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item :label-width="90" label="金额" prop='compare' style='display:inline-block'>
              <Select v-model="formSearch.compare" clearable style='width:50px'>
                <Option v-for="item in compareList" :label="item" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </Form-item>
            <Form-item :label-width='1' prop='amount' style="display:inline-block">
                <cmptInputNumber :max="1000000" :min="0" v-model="formSearch.amount"></cmptInputNumber>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="操作人员" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择操作人员" @on-focus="showUser"></Input>
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
      <cmptChooseUserSinger placeHolder="选择操作人员" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>券分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" class='jyw-report-chart-menu' @on-select='changeChartType'>
        <Menu-item name="record">抵用记录</Menu-item>
        <Menu-item name="count">近日期统计</Menu-item>
      </Menu>
      <!-- 表格 -->
      <div class="jyw-reporter-tit">
        <h3>报表数据</h3>
      </div>
      <Table stripe :columns="columns" :data="data" v-if="chartType === 'record'"></Table>
      <div class="jyw-complex-table" v-else>
        <table>
          <thead>
            <tr>
              <th rowspan='2'>序号</th>
              <th rowspan='2'>操作日期</th>
              <th rowspan='2'>医院</th>
              <th rowspan='2'>优惠券编号</th>
              <th rowspan='2'>优惠券</th>
              <th colspan='4'>存入</th>
              <th colspan='2'>支出</th>
            </tr>
            <tr>
              <th>充值配送</th>
              <th>人工增加</th>
              <th>积分兑换</th>
              <th>渠道兑换</th>
              <th>消费</th>
              <th>退单</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item, index) in data' :key='index' :class="[index % 2 === 0 ? 'bg' : '']">
              <td class="text">{{index + 1 + (pageNumber - 1) * 10}}</td>
              <td class="time">{{item.createTime}}</td>
              <td class="text">{{item.hospitalName}}</td>
              <td class="text">{{item.couponID}}</td>
              <td class="text">{{item.couponName}}</td>
              <td class="num">{{item.inAmount1}}</td>
              <td class="num">{{item.inAmount2}}</td>
              <td class="num">{{item.inAmount3}}</td>
              <td class="num">{{item.inAmount4}}</td>
              <td class="num">{{item.outAmount1}}</td>
              <td class="num">{{item.outAmount2}}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
          customerName: '',
          customerID: '',
          orderID: '',
          couponID: '',
          ways: '',
          type: '',
          compare: '',
          amount: null,
          userId: ''
        },
        openKey: false,
        userName: '',
        compareList: ['>=', '>', '=', '<=', '<'],
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,

        columns: [
          {
            title: '序号',
            width: 50,
            render: (h, params) => {
              const _index = (this.pageNumber - 1) * 10;
              return h('span', params.index + 1 + _index);
            }
          },
          {
            title: '操作日期',
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
            title: '优惠券编号',
            width: 60,
            key: 'couponID'
          },
          {
            title: '优惠券',
            width: 60,
            key: 'couponName'
          },
          {
            title: '方式',
            width: 60,
            render: (h, params) => {
              const index = this.waysList.findIndex(item => item.id === params.row.ways);
              if(index >= 0) {
                return h('span', this.waysList[index].name);
              }
            }
          },
          {
            title: '类型',
            width: 50,
            render: (h, params) => {
              const _text = params.row.type === 1
                ? '存入'
                : '支出';
              return h('span', _text);
            }
          },
          {
            title: '金额',
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if(params.row.amount || params.row.amount === 0) {
                const _text = params.row.amount.toFixed(2);
                return h('span', _text);
              }
            }
          },
          {
            title: '操作人',
            width: 60,
            key: 'userName'
          }
        ],
        data: [],

        chartType: 'record',
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      couponList () {
        return this.$store.getters.getSelectCouponCateList;
      },
      waysList () {
        return this.$store.getters.getCouponChangeTypeList;
      },
      pageSize () {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/failtureDetail.jhtml'
      },
      url () {
        if(this.chartType === 'record') {
          return 'http://aaanew11-record';
        } else {
          return 'http://aaanew11-count';
        }
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
      this.$store.dispatch('setSelectCouponCateList');
    },
    methods: {
      initPower () {
        if(this.power === 1) {
          this.formSearch.hospitalId = '';
        } else if(this.power === 2) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
        } else if(this.power === 3) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
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
              const data = res.data.content.page.content || [];
              if(_vm.chartType === 'record') {
                const _col = _vm.tableCount(data, ['amount']);
                _col.map(item => {
                  const index = _vm.columns.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index >= 0) {
                    _vm.columns[index].width = item.width;
                  }
                });
                _vm.data = data;
              } else {
                _vm.data = data.map(item => {
                  item.createTime = item.createTime
                  ? item.createTime.split(' ')[0]
                  : '';
                  return item;
                });
              }
              // });
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
        this.chartType = val;
        this.getList();
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      showUser () {
        this.openKey = !this.openKey;
      },
      setUser (data) {
        this.formSearch.userId = data.id;
        this.userName = data.name;
      },
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
      },
    }
  }
</script>