/**
 * 顾客账户结余表
 *【原表】预收款变动日统计
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>顾客账户结余表</h2>
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
            <ul class="header-btn-group">
              <li class="header-item" @click="getList()"><Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="show">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>账户结余分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" active-name="record" class='jyw-report-chart-menu'>
        <Menu-item name="record">账户结余</Menu-item>
      </Menu>
      <!-- 表格 -->
      <div class="jyw-reporter-tit">
        <h3>报表数据</h3>
      </div>
      <div class="jyw-complex-table">
        <table>
          <thead>
            <tr>
              <th rowspan='2'>序号</th>
              <th rowspan='2'>操作日期</th>
              <th rowspan='2'>医院</th>
              <th rowspan='2'>预收类型</th>
              <th rowspan='2'>期初总额</th>
              <th rowspan='2'>期末总额</th>
              <th rowspan='2'>变动总额</th>
              <th colspan='3'>充值</th>
              <th colspan='3'>支出</th>
            </tr>
            <tr>
              <th>现金充值</th>
              <th>退单兑换</th>
              <th>合计</th>
              <th>消费</th>
              <th>提现</th>
              <th>合计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item, index) in data' :key='index' :class="[index % 2 === 0 ? 'bg' : '']">
              <td class="text">{{index + 1 + (pageNumber - 1) * 10}}</td>
              <td class="time">{{item.createTime}}</td>
              <td class="text">{{item.hospitalName}}</td>
              <td class="text">{{item.chargeName}}</td>
              <td class="num">{{item.startAmount}}</td>
              <td class="num">{{item.endAmount}}</td>
              <td class="num">{{item.changeAmount}}</td>
              <td class="num">{{item.inAmount1}}</td>
              <td class="num">{{item.inAmount2}}</td>
              <td class="num">{{item.inCount}}</td>
              <td class="num">{{item.outAmount1}}</td>
              <td class="num">{{item.outAmount2}}</td>
              <td class="num">{{item.outCount}}</td>
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
  export default {
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: ''
        },
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,

        data: [],
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      pageSize () {
        return this.$store.getters.getPageSize
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/excelExport/failtureDetail.jhtml'
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
          url: 'http://aaanew9',
          // data: _vm.formSearch,
          success: function(res){
            console.log(res)
            if(res.data.code === 0) {
              const data = res.data.content.page.content || [];
              _vm.data = data.map(item => {
                item.changeAmount = (item.endAmount - item.startAmount).toFixed(2);
                item.inCount = (item.inAmount1 + item.inAmount2).toFixed(2);
                item.outCount = (item.outAmount1 + item.outAmount2).toFixed(2);
                item.createTime = item.createTime
                  ? item.createTime.split(' ')[0]
                  : '';
                return item;
              });
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
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
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