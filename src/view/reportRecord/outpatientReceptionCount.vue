/**
 * 门诊接诊统计
 */

<template>
  <div class="container-box outpatient-reception-count">
    <div class="container-header">
      <h2>门诊接诊统计</h2>
    </div>
    <div class="container-body">
      <!-- 查询 -->
      <div class="jyw-reporter-tit">
        <h3>检索</h3>
      </div>
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right">
        <Row type="flex" justify="start">
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="收银日期" prop='startTime'>
              <Date-picker :transfer='true' type="daterange" placement="bottom-start" placeholder="选择日期" :clearable="false" @on-change='setDate' :value='dateBox' style='width:100%'></Date-picker>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='formSearch.auth === 1'>
            <Form-item label="医院" prop='hospitalId'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6" v-if='formSearch.auth !== 3'>
            <Form-item label="咨询师" prop='userId'>
              <cmptInputOpen :value='userName' placeholder="选择咨询师" @on-open='showUser' @on-clear='clearUser'></cmptInputOpen>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item label="门诊类型" prop='clinicType'>
              <Select v-model="formSearch.clinicType" clearable>
                <Option v-for="item in clinicTypeList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.gkxm')" prop='customerName'>
              <Input v-model.trim="formSearch.customerName" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <Form-item :label="$t('labelPublic.gkbh')" prop='customerId'>
              <Input v-model.trim="formSearch.customerId" :placeholder="$t('placeholderPublic.input')" :maxlength='15' @on-enter='getList(1, formSearch)'></Input>
            </Form-item>
          </Col>
          <Col :xs='24' :sm='12' :md="8" :lg="6">
            <ul class="header-btn-group">
              <li class="header-item" @click="getList(1, formSearch)"><Icon type="search"></Icon>查询</li>
              <li class="header-item" @click="handleReset('formSearch')"><Icon type="refresh"></Icon>重置</li>
            </ul>
          </Col>
        </Row>
      </Form>
      <cmptChooseUserSinger placeHolder="选择咨询师" @setUserData="setUser" :dimension='dimension' :openKey='openKey'></cmptChooseUserSinger>
      <!-- 导出 -->
      <form :action="exportPrefixURL" method="get" ref="formSubmit" v-show="false">
        <input name="auth" :value="formSearch.auth">
        <input name="type" :value="formSearch.type">
        <input name="startTime" :value="formSearch.startTime">
        <input name="endTime" :value="formSearch.endTime">
        <input name="hospitalId" :value="formSearch.hospitalId">
        <input name="userId" :value="formSearch.userId">
        <input name="clinicType" :value="formSearch.clinicType">
        <input name="customerId" :value="formSearch.customerId">
        <input name="customerName" :value="formSearch.customerName">
        <input name="adminToken" :value="adminToken">
      </form>
      <!-- 图表 -->
      <div class="jyw-reporter-tit">
        <h3>接诊分析</h3>
        <div class="export" v-if="exportKey === '1'" @click="exportTable"></div>
        <div class="info">
          <Icon type="information"></Icon>
          <div class="info-msg">
            <p>{{$t('reportPublic.title3')}}</p>
            <p class="msg">统计门诊顾客的接诊转化率数据，用于评估咨询师接诊能力。</p>
            <p>{{$t('reportPublic.title4')}}</p>
            <p class="msg">1、 多次分诊，分诊类型不同的情况。如一个老客当天多次分诊，即有咨询（再消费）、又有治疗（复查），则当天此顾客的门诊类型为：再消费</p>
            <p class="msg">2、 多次分诊但接诊员工不同的情况。如顾客一天内产生多次接诊，或多次付款，且每次的咨询师发生更改，则在咨询师统计表里，接诊的咨询师均计一个接诊人数（即咨询接诊合计数量会大于当天门诊总数量），根据当时的咨询师计算营业额（咨询师接诊日报、咨询师接诊统计表）。</p>
            <p class="msg">3、 退款的情况。顾客上门仅办理退款时，提交退款单不扣减成交人数，但扣减成交金额。</p>
            <p class="msg">4、 无分诊直接进行还款的情况。如果查询时间内客户有进行还款的记录，但无门诊分诊，则报表的门诊人数会相应体现（即比分诊记录多出一个人数）,不显示接诊咨询师;当天未分诊时有还款，然后该顾客上门，则该笔还款算到接诊咨询师名下</p>
            <p class="msg">5、 成交指例外项目，即不计算成交人数，也不计算成交金额。</p>
          </div>
        </div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record_1">门诊接诊记录</Menu-item>
        <Menu-item name="user_2">咨询师接诊日报</Menu-item>
        <Menu-item name="user_3">咨询师接诊统计</Menu-item>
        <Menu-item name="hosp_4">医院门诊接诊统计</Menu-item>
      </Menu>
      <div class='report-chart-container' v-if="chartType !== 'record_1'">
        <div class="report-chart" ref='echarts'></div>
        <div class="select-chart" v-if="chartType === 'user_2'">
          <Select v-model="userChartType" size="small" @on-change='changeUserType'>
            <Option value="turnover">营业额</Option>
            <Option value="deal">成交额</Option>
            <Option value="totalNumber">接诊总人数</Option>
            <Option value="dealTotalNumber">成交总人数</Option>
          </Select>
        </div>
      </div>
      <!-- 表格 -->
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page">
        <div class="table-info">{{$t('publicSet.pageMsg', [pageNumber, totalPages, total])}}</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator :page-size="chartType === 'user_2' ? 50 : 10"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import walden from 'utils/walden.js';
  import resizeTime from 'components/tableResizeTime.vue';
  export default {
    components: {resizeTime},
    data () {
      return {
        formSearch: {
          auth: 3,
          type: 1,
          startTime: moment().startOf('isoWeek').format('YYYY-MM-DD'),
          endTime: moment().format('YYYY-MM-DD'),
          hospitalId: '',
          userId: '',
          clinicType: '',
          customerName: '',
          customerId: ''
        },
        pageNumber: 1,
        totalPages: 1,
        total: 0,
        adminToken: this.$token.readToken('adminToken') || '',
        exportKey: localStorage.getItem('exportKey'),
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        userName: '',
        openKey: false,
        data: [],
        colBox: [
          {
            type: 'record_1',
            url: 'guard-webManager/newReport/outpatientConsultationStatistics.jhtml',
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
                title: '收银日期',
                width: 80,
                key: 'createTime'
              },
              {
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: this.$t('labelPublic.gkbh'),
                width: 60,
                key: 'customerId'
              },
              {
                title: this.$t('labelPublic.gkxm'),
                width: 60,
                key: 'customerName'
              },
              {
                title: this.$t('labelPublic.kfry'),
                width: 60,
                key: 'developer'
              },
              {
                title: '接诊咨询师',
                width: 60,
                key: 'consultant'
              },
              {
                title: this.$t('labelPublic.gklx'),
                width: 60,
                render: (h, params) => {
                  const text = params.row.netOldTypeOInt === '1'
                    ? this.$t('publicSet.newCus')
                    : this.$t('publicSet.oldCus');
                  const color = params.row.netOldTypeOInt === '1' 
                    ? '#FF6F76' 
                    : '#4172F6';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: '门诊类型',
                width: 60,
                key: 'clientType'
              },
              {
                title: '成交状态',
                width: 60,
                render: (h, params) => {
                  const text = params.row.isDeal === 0
                    ? this.$t('publicSet.wcj')
                    : this.$t('publicSet.ycj');
                  const color = params.row.isDeal === 0 
                    ? '#FF6F76' 
                    : '#4172F6';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: '营业额',
                width: 60,
                key: 'turnover',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.turnover)) {
                    return h('span', params.row.turnover.toFixed(2))
                  }
                }
              },
              {
                title: '成交额',
                width: 60,
                key: 'deal',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.deal)) {
                    return h('span', params.row.deal.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'user_2',
            url: 'guard-webManager/newReport/outpatientConsultationStatistics.jhtml',
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
                title: '收银日期',
                width: 80,
                key: 'createTime'
              },
              {
                title: this.$t('labelPublic.yy'),
                width: 60,
                key: 'hospitalName'
              },
              {
                title: '接诊咨询师',
                width: 60,
                key: 'consultant'
              },
              {
                title: '接诊总人数',
                width: 60,
                key: 'totalNumber'
              },
              {
                title: '成交总人数',
                width: 60,
                key: 'dealTotalNumber'
              },
              {
                title: '平均成交率',
                width: 60,
                render: (h, params) => {
                  if(Number.isFinite(params.row.avgTurnoverTate)) {
                    return h('span', params.row.avgTurnoverTate.toFixed(2) + '%');
                  }
                }
              },
              {
                title: '营业额',
                width: 60,
                key: 'turnover',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.turnover)) {
                    return h('span', params.row.turnover.toFixed(2))
                  }
                }
              },
              {
                title: '成交额',
                width: 60,
                key: 'deal',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.deal)) {
                    return h('span', params.row.deal.toFixed(2))
                  }
                }
              },
              {
                title: '客均成交额',
                width: 60,
                key: 'avgDeal',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.avgDeal)) {
                    return h('span', params.row.avgDeal.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'user_3',
            key: 'consultant',
            url: 'guard-webManager/newReport/outpatientConsultationStatistics.jhtml',
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
                title: '接诊咨询师',
                width: 60,
                key: 'consultant'
              },
              {
                title: '接诊总人数',
                width: 60,
                key: 'totalNumber'
              },
              {
                title: '成交总人数',
                width: 60,
                key: 'dealTotalNumber'
              },
              {
                title: '平均成交率',
                width: 60,
                render: (h, params) => {
                  if(Number.isFinite(params.row.avgTurnoverTate)) {
                    return h('span', params.row.avgTurnoverTate.toFixed(2) + '%');
                  }
                }
              },
              {
                title: '营业额',
                width: 60,
                key: 'turnover',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.turnover)) {
                    return h('span', params.row.turnover.toFixed(2))
                  }
                }
              },
              {
                title: '成交额',
                width: 60,
                key: 'deal',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.deal)) {
                    return h('span', params.row.deal.toFixed(2))
                  }
                }
              },
              {
                title: '客均成交额',
                width: 60,
                key: 'avgDeal',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.avgDeal)) {
                    return h('span', params.row.avgDeal.toFixed(2))
                  }
                }
              }
            ]
          },
          {
            type: 'hosp_4',
            key: 'hospitalName',
            url: 'guard-webManager/newReport/outpatientConsultationStatistics.jhtml',
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
                title: this.$t('labelPublic.gklx'),
                width: 60,
                render: (h, params) => {
                  const text = params.row.netOldTypeOInt === '1'
                    ? this.$t('publicSet.newCus')
                    : this.$t('publicSet.oldCus');
                  const color = params.row.netOldTypeOInt === '1' 
                    ? '#FF6F76' 
                    : '#4172F6';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: '门诊类型',
                width: 60,
                key: 'clientType'
              },
              {
                title: '接诊总人数',
                width: 60,
                key: 'totalNumber'
              },
              {
                title: '成交总人数',
                width: 60,
                key: 'dealTotalNumber'
              },
              {
                title: '平均成交率',
                width: 60,
                render: (h, params) => {
                  if(Number.isFinite(params.row.avgTurnoverTate)) {
                    return h('span', params.row.avgTurnoverTate.toFixed(2) + '%');
                  }
                }
              },
              {
                title: '营业额',
                width: 60,
                key: 'turnover',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.turnover)) {
                    return h('span', params.row.turnover.toFixed(2))
                  }
                }
              },
              {
                title: '成交额',
                width: 60,
                key: 'deal',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.deal)) {
                    return h('span', params.row.deal.toFixed(2))
                  }
                }
              },
              {
                title: '客均成交额',
                width: 60,
                key: 'avgDeal',
                align: 'right',
                render: (h, params) => {
                  if(Number.isFinite(params.row.avgDeal)) {
                    return h('span', params.row.avgDeal.toFixed(2))
                  }
                }
              }
            ]
          }
        ],

        chart: null,
        timer: null,
        chartType: 'record_1',
        userChartType: 'totalNumber',
        chartOption: {
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['营业额', '成交额', '接诊总人数', '成交总人数']
          },
          grid: {
						left: '10px',
						right: '20px',
						bottom: '3%',
						containLabel: true
          },
          xAxis: {
						type: 'category',
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true
            },
						data: []
					},
					yAxis: [
            {
              name: '金额',
              type: 'value'
            },
            {
              name: '人数',
              type: 'value'
            }
          ],
          series: []
        }
      }
    },
    watch: {
      viewResize (val) {
        console.log('menuTodo');
        this.resizeChart();
      },
      langRouterKey (val) {
        if(val === 'outpatientReceptionCount') {
          this.getList(this.pageNumber, this.formSearch);;
        }
      },
    },
    computed: {
      hospList () {
        return this.$store.getters.getSelectAllHospList
      },
      pageSize () {
        return this.$store.getters.getPageSize;
      },
      clinicTypeList () {
        return this.$store.getters.getClinicTypeList.filter(item => item.id !== 3);
      },
      dimension () {
        if(this.formSearch.auth === 1) {
          return true;
        } else {
          return false;
        }
      },
      columns () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].col;
      },
      url () {
        const index = this.colBox.findIndex(item => item.type === this.chartType);
        return this.colBox[index].url;
      },
      exportPrefixURL () {
        return this.$store.getters.getExportPrefixURL + '/guard-webManager/newExcelExport/exportOutpatientConsultationStatistics.jhtml'
      },
      langRouterKey () {
        return this.$store.getters.getLandRouterKey;
      },
      viewResize () {
        return this.$store.getters.getViewResize;
      },
    },
    created () {
      this.formSearch.auth = this.getReporterPower('outpatientReceptionCount');
      this.initPower();
    },
    mounted () {
      let _vm = this;
      _vm.$store.dispatch('setSelectAllHospList');
    },
    methods: {
      initPower () {
        if(this.formSearch.auth === 1) {
          this.formSearch.hospitalId = '';
          this.formSearch.userId = '';
        } else if(this.formSearch.auth === 2) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.userId = '';
        } else if(this.formSearch.auth === 3) {
          this.formSearch.hospitalId = localStorage.getItem('hospId');
          this.formSearch.userId = localStorage.getItem('userId');
        }
        this.getList(1, this.formSearch);
      },
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form.pageNumber = pageNumber;
        form.pageSize = _vm.chartType === 'user_2'
          ? 50
          : _vm.pageSize;
        _vm.$http.getPage({
          url: _vm.url,
          data: _vm.formSearch,
          success: function(res){
            const _data = res.data.content.content || [];
            const index = _vm.colBox.findIndex(item => item.type === _vm.chartType);
            const _col = _vm.tableCount(_data, ['turnover', 'deal', 'avgDeal']);
            _col.map(item => {
              const index1 = _vm.colBox[index].col.findIndex(col => col.key === item.key);
              console.log(item)
              if(index1 >= 0) {
                _vm.colBox[index].col[index1].width = item.width;
              }
            });
            _vm.data = _data;
            _vm.total = res.data.content.total || 0;
            _vm.pageNumber = res.data.content.pageNumber || 1;
            _vm.totalPages = res.data.content.totalPages || 1;
            if(_vm.chartType === 'record_1') {
              if(_vm.chart) {
                _vm.chart.dispose();
                _vm.chart = null;
                window.removeEventListener('resize', _vm.resizeChart);
              }
              _vm.$store.dispatch('setPageLoading', 1);
            } else if(_vm.chartType === 'user_2') {
              if(_vm.chart) {
                _vm.chart.dispose();
                _vm.chart = null;
              }
              _vm.$store.dispatch('setPageLoading', 1);
              _vm.$nextTick(() => {
                _vm.initChart2();
                window.addEventListener('resize', _vm.resizeChart);
              });
            } else {
              if(_vm.chart) {
                _vm.chart.dispose();
                _vm.chart = null;
              }
              _vm.$store.dispatch('setPageLoading', 1);
              _vm.$nextTick(() => {
                _vm.initChart();
                window.addEventListener('resize', _vm.resizeChart);
                _vm.setChart();
              })
            }
            console.log(_vm.pageNumber)
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
      resizeChart () {
        console.log('---')
        if(this.chart) {  
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.chart.resize();
          }, 200);
        }
      },
      initChart () {
        this.chart = echarts.init(this.$refs.echarts, walden.theme);
        this.chart.setOption(this.chartOption);
      },
      setChart () {
        const prop = this.colBox.filter(item => item.type === this.chartType)[0].key;
        this.chart.setOption({
          xAxis: {
              data: this.data.map(item => item[prop])
          },
          series : [
            {
              name: '营业额',
              yAxisIndex: 0,
              type:'bar',
              data: this.data.map(item => item.turnover)
            },
            {
              name: '成交额',
              yAxisIndex: 0,
              type:'bar',
              data: this.data.map(item => item.deal)
            },
            {
              name: '接诊总人数',
              yAxisIndex: 1,
              type:'line',
              data: this.data.map(item => item.totalNumber)
            },
            {
              name: '成交总人数',
              yAxisIndex: 1,
              type:'line',
              data: this.data.map(item => item.dealTotalNumber)
            }
          ]
        })
      },
      setChart2 () {
        const legendList = [...new Set(this.data.map(item => item.consultant))];
        const xAxisList = [...new Set(this.data.map(item => item.createTime))];
        let yName = '';
        if(this.userChartType === 'turnover' || this.userChartType === 'deal') {
          yName = '金额';
        } else {
          yName = '人数';
        }
        const seriesList = legendList.map(l => {
          const _data = xAxisList.map(x => {
            const index = this.data.findIndex(item => item.createTime === x && item.consultant === l);
            if(index >= 0) {
              return this.data[index][this.userChartType];
            } else {
              return 0;
            }
          });
          return {
            name: l,
            type: 'line',
            data: _data
          }
        });
        this.chart.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            type: 'scroll',
            left: 80,
            right: 120,
            top: 0,
            data: legendList
          },
          grid: {
						left: '10px',
						right: '20px',
						bottom: '3%',
						containLabel: true
          },
          xAxis: {
						type: 'category',
            boundaryGap: true,
            axisTick: {
              alignWithLabel: true
            },
						data: xAxisList
					},
					yAxis: [
            {
              name: yName,
              type: 'value'
            }
          ],
          series: seriesList
        });
      },
      initChart2 () {
        this.chart = echarts.init(this.$refs.echarts, walden.theme);
        this.setChart2();
      },
      changeUserType () {
        this.setChart2();
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
      clearUser() {
        this.formSearch.userId = '';
        this.userName = '';
      },
      exportTable () {
        this.$refs.formSubmit.submit();
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
        this.initPower();
      },
    }
  }
</script>

<style lang='less' scoped>
  .outpatient-reception-count {
    .report-chart-container {
      position: relative;
      overflow: visible;
    }
    .select-chart {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
      width: 100px;
    }
  }
</style>
