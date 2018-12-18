/**
 * 收银流水表
 *【原表】由：集团现金流明细、医院现金流明细、操作用户现金流明细、集团各科目收款方式统计、医院各科目收款方式统计、集团项目收银明细合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>收银流水表</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="收银日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="收银医院" prop='hospitalId' v-if='power === 1'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="订单编号" prop='orderID'>
              <Input v-model.trim="formSearch.orderID" placeholder="请输入订单编号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="订单类型" prop='orderType'>
              <Select v-model="formSearch.orderType" clearable>
                <Option v-for="item in orderTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="收费项目" prop='chargeId'>
              <Input v-model="chargeName" readonly icon="ios-search" placeholder="选择收费项目" @on-focus="showCharge"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="收银人员" prop='userId' v-if='power !== 3'>
              <Input v-model="userName" readonly icon="ios-search" placeholder="选择收银人员" @on-focus="showUser"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客编号" prop='customerID'>
              <Input v-model.trim="formSearch.customerID" placeholder="请输入顾客编号" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客名称" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" placeholder="请输入顾客名称" :maxlength='15'></Input>
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
      <cmptChooseUserSinger placeHolder="选择收银人员" @setUserData="setUser" :dimension='dimension' :openKey='userOpenKey'></cmptChooseUserSinger>
      <cmptChargeChoose placeHolder="选择收费项目" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>收银分析</h3>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record">收银流水表</Menu-item>
        <Menu-item name="user">收银员统计</Menu-item>
      </Menu>
      <div class="jyw-complex-table">
        <table>
          <thead>
            <tr>
              <th rowspan='2'>时间</th>
              <th rowspan='2'>医院</th>
              <th rowspan='2'>用户</th>
              <th colspan='2'>内容</th>
            </tr>
            <tr>
              <th>内容</th>
              <th>内容1</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='item in rrr' :key='item.time'>
              <td style='minWidth:100px' :rowspan='item.timeMerge.rowSpanNum' :class="{hidden: item.timeMerge.display}">{{item.time}}</td>
              <td style='minWidth:100px' :rowspan='item.hospMerge.rowSpanNum' :class="{hidden: item.hospMerge.display}">{{item.hosp}}</td>
              <td style='minWidth:100px' :rowspan='item.nameMerge.rowSpanNum' :class="{hidden: item.nameMerge.display}">{{item.name}}</td>
              <td style='minWidth:100px' class="text"><p>{{item.content}}</p></td>
              <td style='minWidth:100px'>{{item.content1}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import cmptChargeChoose from 'components/chargeChoose.vue';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime, cmptChargeChoose},
    data () {
      return {
        power: 1,
        formSearch: {
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          orderID: '',
          orderType: '',
          chargeId: '',
          userId: '',
          customerID: '',
          customerName: ''
        },
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        userName: '',
        chargeName: '',
        chargeOpenKey: false,
        userOpenKey: false,



        chartType: 'record',
        chartOption: {
          tooltip : {
            trigger: 'axis'
          },
          legend: {
            type: 'scroll',
            top: 10,
            data: []
          },
          grid: {
            left: '10px',
            right: '30px',
            bottom: '3%',
            containLabel: true
          },
          color: ['rgba(255, 0, 0, 0.5)','rgba(0, 255, 0, 0.5)','rgba(0, 0, 255, 0.5)'],
          yAxis: {
            type: 'value',
            name: '单位：%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
          },
          series: []
        },
        chartTypeBox: [],
        tableData: [
          {
            time: '2018-01-06',
            hosp: 1,
            name: 1,
            content1: '12312312312313131231231',
            content: '21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd21zsd'
          },
          {
            time: '2018-01-06',
            hosp: 1,
            name: 2,
            content1: 'tt',
            content: 'qweqwe'
          },
          {
            time: '2018-01-07',
            hosp: 1,
            name: 2,
            content1: 'tt',
            content: 'rrrrr'
          },
          {
            time: '2018-01-08',
            hosp: 1,
            name: 1,
            content1: 'tt',
            content: 'rreee'
          },
          {
            time: '2018-01-08',
            hosp: 1,
            name: 2,
            content1: 'tt',
            content: 'rrwwwwww'
          },
          {
            time: '2018-01-08',
            hosp: 1,
            name: 4,
            content1: 'tt',
            content: '555555'
          },
          {
            time: '2018-01-08',
            hosp: 1,
            name: 5,
            content1: 'tt',
            content: '444444'
          },
          {
            time: '2018-01-08',
            hosp: 1,
            name: 5,
            content1: 'tt',
            content: 'ddd4444'
          },
          {
            time: '2018-01-08',
            hosp: 1,
            name: 5,
            content1: 'tt',
            content: 'ddsaaa444'
          }
        ],
        rrr: [],
      }
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList
      },
      orderTypeList () {
        return this.$store.getters.getOrderTypeList
      },
      categoryList () {
        return this.$store.getters.getSelectAllFailtureCategoryList
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
      const data = this.combineCell(this.tableData, 'time')
      const data1 = this.combineCell(data, 'hosp', ['time'])
      this.rrr = this.combineCell(data1, 'name', ['hosp', 'time'])
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectAllFailtureCategoryList');
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
        this.$store.dispatch('setPageLoading', 1);
      },
      

      getList() {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        _vm.$http.get({
          url: 'guard-webManager/report/failtureDetail.jhtml',
          data: _vm.formSearch,
          success: function(res){
            if(res.data.code === 0) {
              _vm.$store.dispatch('setPageLoading', 1);
              console.log(res)
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
        }
      },
      setDate (date) {
        this.formSearch.startTime = date[0];
        this.formSearch.endTime = date[1];
      },
      showUser () {
        this.userOpenKey = !this.userOpenKey;
      },
      setUser (data) {
        this.formSearch.userId = data.id;
        this.userName = data.name;
      },
      showCharge () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      setCharge (data) {
        this.formSearch.chargeId = data.id;
        this.formSearch.chargeName = data.name;
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.userName = '';
        this.chargeName = '';
        this.getList();
      },
    }
  }
</script>

