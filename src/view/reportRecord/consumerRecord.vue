/**
 * 顾客消费明细表
 *【原表】由：集团成交明细表、医院成交明细表、集团项目消费情况统计、项目项目消费情况统计合并。
 */

<template>
  <div class="container-box">
    <div class="container-header">
      <h2>顾客消费明细表</h2>
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
            <Form-item label="医院" prop='hospitalId' v-if='power === 1'>
              <Select v-model="formSearch.hospitalId" clearable>
                <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
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
            <Form-item label="订单编号" prop='orderID'>
              <Input v-model.trim="formSearch.orderID" placeholder="请输入订单编号" :maxlength='15'></Input>
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
            <Form-item label="年龄" prop='birthday'>
              <Input v-model.trim="formSearch.birthday" placeholder="请输入年龄" :maxlength='15'></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="意向分类" prop='itemGroupId'>
              <Select v-model="formSearch.itemGroupId" clearable>
                <Option v-for="item in itemGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="消费意向" prop='itemId'>
              <Select v-model="formSearch.itemId" clearable>
                <Option v-for="item in itemList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="消费项目" prop='chargeID'>
              <Input v-model="chargeName" readonly icon="ios-search" placeholder="选择消费项目" @on-focus="showCharge"></Input>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="来源分类" prop='channelGroupID'>
              <Select v-model="formSearch.channelGroupID" clearable>
                <Option v-for="item in channelGroupList" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="具体来源" prop='channelId'>
              <cmptRemoteFilterChannel _placeHolder='输入拼音汉字快捷搜索' @setChannelName='setChannel' ref='remoteChannel'></cmptRemoteFilterChannel>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="渠道分类" prop='storeId'>
              <cmptRemoteFilterStore _placeHolder="输入拼音汉字快捷搜索" @setStoreName="setStore" ref='remoteStore' :_type='storeType'></cmptRemoteFilterStore>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="顾客状态" prop='newOldType'>
              <Select v-model="formSearch.newOldType" clearable>
                <Option :value="0">新客</Option>
                <Option :value="1">老客</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="到诊状态" prop='visitStatus'>
              <Select v-model="formSearch.visitStatus" clearable>
                <Option :value="0">已到诊</Option>
                <Option :value="1">未到诊</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item label="成交状态" prop='dealStatus'>
              <Select v-model="formSearch.dealStatus" clearable>
                <Option :value="0">已成交</Option>
                <Option :value="1">未成交</Option>
              </Select>
            </Form-item>
          </Col>
          <Col :sm='12' :md="8" :lg="6">
            <Form-item :label-width="90" label="成交金额" prop='compare' style='display:inline-block'>
              <Select v-model="formSearch.compare" clearable style='width:50px'>
                <Option v-for="item in compareList" :label="item" :value="item" :key="item">{{ item }}</Option>
              </Select>
            </Form-item>
            <Form-item :label-width='1' prop='amount' style="display:inline-block">
                <cmptInputNumber :max="1000000" :min="0" v-model="formSearch.amount"></cmptInputNumber>
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
      <cmptChargeChoose placeHolder="选择消费项目" @on-change="setCharge" :openKey='chargeOpenKey'></cmptChargeChoose>
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
        <h3>消费分析</h3>
        <div class="export" v-if="exportKey === '1'"></div>
      </div>
      <Menu mode="horizontal" :active-name="chartType" @on-select='changeChartType' class='jyw-report-chart-menu'>
        <Menu-item name="record">顾客消费明细表</Menu-item>
        <Menu-item name="itemGroup">意向分类占比</Menu-item>
        <Menu-item name="item">消费意向趋势</Menu-item>
      </Menu>
      <div class='report-chart-container' v-if="chartType !== 'record'">
        <div class="report-chart" ref='echarts'></div>
      </div>
      <!-- 表格 -->
      <div class="jyw-reporter-tit">
        <h3>报表数据</h3>
      </div>
      <Table stripe :columns="columns" :data="data"></Table>
      <div class="table-page" v-if="chartType === 'record'">
        <div class="table-info">当前第{{pageNumber}}页，共{{totalPages}}页，总共{{total}}条记录</div>
        <Page class="table-paginate" :total="total" @on-change='changePage' :current='pageNumber' show-elevator></Page>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
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
          orderType: '',
          orderID: '',
          customerID: '',
          customerName: '',
          birthday: '',
          itemGroupId: '',
          itemId: '',
          chargeID: '',
          channelGroupID: '',
          channelId: '',
          storeId: '',
          newOldType: '',
          visitStatus: '',
          dealStatus: '',
          compare: '',
          amount: null
        },
        compareList: ['>=', '>', '=', '<=', '<'],
        dateBox: [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
        chartType: 'record',
        exportKey: localStorage.getItem('exportKey'),
        adminToken: this.$token.readToken('adminToken') || '',
        show: false,
        chargeName: '',
        chargeOpenKey: false,

        pageNumber: 1,
        totalPages: 1,
        total: 0,
        data: [],
        colBox: [
          {
            type: 'record',
            url: 'http://aaanew23-record',
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
                title: '收银日期',
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
                title: '订单类型',
                width: 60,
                render: (h, params) => {
                  const index = this.orderTypeList.findIndex(item => item.id === params.row.orderType);
                  if(index >= 0) {
                    return h('span', this.orderTypeList[index].name);
                  }
                }
              },
              {
                title: '订单编号',
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
                title: '年龄',
                width: 50,
                key: 'birthday'
              },
              {
                title: '意向分类',
                width: 60,
                key: 'itemGrounpName'
              },
              {
                title: '消费意向',
                width: 60,
                key: 'itemName'
              },
              {
                title: '消费项目',
                width: 60,
                key: 'chargeName'
              },
              {
                title: '来源分类',
                width: 60,
                key: 'channelGroupName'
              },
              {
                title: '具体来源',
                width: 60,
                key: 'channelName'
              },
              {
                title: '具体渠道',
                width: 60,
                key: 'storeName'
              },
              {
                title: '顾客状态',
                width: 50,
                render: (h, params) => {
                  const text = params.row.newOldType === 1
                    ? '新客'
                    : '老客';
                  const color = params.row.newOldType === 1
                    ? '#4172F6'
                    : '#FF6F76';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: '到诊状态',
                width: 50,
                render: (h, params) => {
                  const text = params.row.visitStatus === 1
                    ? '已到诊'
                    : '未到诊';
                  const color = params.row.visitStatus === 1
                    ? '#4172F6'
                    : '#FF6F76';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: '成交状态',
                width: 50,
                render: (h, params) => {
                  const text = params.row.dealStatus === 1
                    ? '已成交'
                    : '未成交';
                  const color = params.row.dealStatus === 1
                    ? '#4172F6'
                    : '#FF6F76';
                  return h('span', {
                    style: {
                      color: color
                    }
                  }, text);
                }
              },
              {
                title: '应收金额',
                width: 60,
                align: 'right',
                key: 'price',
                render: (h, params) => {
                  if(params.row.price || params.row.price === 0) {
                    return h('span', params.row.price.toFixed(2));
                  }
                }
              },
              {
                title: '成交金额',
                width: 60,
                align: 'right',
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2));
                  }
                }
              }
            ]
          },
          {
            type: 'dept',
            key: 'deptName',
            url: 'http://aaanew20-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '部门',
                width: 80,
                key: 'deptName'
              },
              {
                title: '顾客人数',
                width: 80,
                align: 'right',
                key: 'num'
              },
              {
                title: '成交金额',
                width: 60,
                align: 'right',
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2));
                  }
                }
              },
              {
                title: '有效业绩',
                width: 60,
                align: 'right',
                key: 'realAmount',
                render: (h, params) => {
                  if(params.row.realAmount || params.row.realAmount === 0) {
                    return h('span', params.row.realAmount.toFixed(2));
                  }
                }
              }
            ]
          },
          {
            type: 'item',
            key: 'itemName',
            url: 'http://aaanew20-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '意向分类',
                width: 80,
                key: 'itemGrounpName'
              },
              {
                title: '消费意向',
                width: 80,
                key: 'itemName'
              },
              {
                title: '顾客人数',
                width: 80,
                align: 'right',
                key: 'num'
              },
              {
                title: '成交金额',
                width: 60,
                align: 'right',
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2));
                  }
                }
              },
              {
                title: '有效业绩',
                width: 60,
                align: 'right',
                key: 'realAmount',
                render: (h, params) => {
                  if(params.row.realAmount || params.row.realAmount === 0) {
                    return h('span', params.row.realAmount.toFixed(2));
                  }
                }
              }
            ]
          },
          {
            type: 'channel',
            key: 'channelName',
            url: 'http://aaanew20-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '来源分类',
                width: 80,
                key: 'channelGroupName'
              },
              {
                title: '来源',
                width: 80,
                key: 'channelName'
              },
              {
                title: '顾客人数',
                width: 80,
                align: 'right',
                key: 'num'
              },
              {
                title: '成交金额',
                width: 60,
                align: 'right',
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2));
                  }
                }
              },
              {
                title: '有效业绩',
                width: 60,
                align: 'right',
                key: 'realAmount',
                render: (h, params) => {
                  if(params.row.realAmount || params.row.realAmount === 0) {
                    return h('span', params.row.realAmount.toFixed(2));
                  }
                }
              }
            ]
          },
          {
            type: 'store',
            key: 'storeName',
            url: 'http://aaanew20-chart',
            col: [
              {
                title: '医院',
                width: 80,
                key: 'hospitalName'
              },
              {
                title: '渠道',
                width: 80,
                key: 'storeName'
              },
              {
                title: '顾客人数',
                width: 80,
                align: 'right',
                key: 'num'
              },
              {
                title: '成交金额',
                width: 60,
                align: 'right',
                key: 'amount',
                render: (h, params) => {
                  if(params.row.amount || params.row.amount === 0) {
                    return h('span', params.row.amount.toFixed(2));
                  }
                }
              },
              {
                title: '有效业绩',
                width: 60,
                align: 'right',
                key: 'realAmount',
                render: (h, params) => {
                  if(params.row.realAmount || params.row.realAmount === 0) {
                    return h('span', params.row.realAmount.toFixed(2));
                  }
                }
              }
            ]
          }
        ],

        chart: null,
        timer: null,
        chartOption: {
          tooltip : {
            trigger: 'axis'
          },
          color: ['#3366cc', '#5733cc', '#ab33cc', '#d73681', '#f0463c', '#f0893c', '#f0ad3c', '#f0d13c', '#e9ee3d', '#a0dc37', '#33cc4c', '#339fcc'],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              axisLabel: {
                formatter: '{value} 元'
              }
            },
            {
              type: 'value',
              name: '人数',
              axisLabel: {
                formatter: '{value} 人'
              }
            }
          ],
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: []
          },
          grid: {
            left: '10px',
            right: '20px',
            bottom: '3%',
            containLabel: true
          },
          legend: {
            data: ['成交金额', '有效业绩', '顾客人数']
          },
          series: [
            {
              name: '成交金额',
              type: 'bar',
              label: {
                emphasis: {
                  show: true,
                  position: 'top'
                }
              },
              data: [],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
            },
            {
              name: '有效业绩',
              type: 'bar',
              label: {
                emphasis: {
                  show: true,
                  position: 'top'
                }
              },
              data: [],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
            },
            {
              name: '顾客人数',
              type: 'line',
              yAxisIndex: 1,
              label: {
                emphasis: {
                  show: true,
                  position: 'top'
                }
              },
              data: []
            }
          ]
        }
      }
    },
    watch: {
      viewResize (val) {
        console.log('menuTodo');
        this.resizeChart();
      },
    },
    computed: {
      viewResize () {
        return this.$store.getters.getViewResize;
      },
      hospList () {
        return this.$store.getters.getSelectAllHospList;
      },
      orderTypeList () {
        return this.$store.getters.getOrderTypeList;
      },
      itemGroupList () {
        return this.$store.getters.getSelectAllItemGroupList;
      },
      itemList () {
        return this.$store.getters.getSelectAllItemList;
      },
      channelGroupList () {
        return this.$store.getters.getSelectChannelGroupList;
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
      storeType () {
        if(this.power === 1) {
          return 3;
        } else if(this.power === 2) {
          return 1;
        } else {
          return 2;
        }
      },
    },
    created () {
      this.power = this.getReporterPower();
      this.initPower();
    },
    mounted () {
      this.$store.dispatch('setSelectAllHospList');
      this.$store.dispatch('setSelectAllItemGroupList');
      this.$store.dispatch('setSelectAllItemList');
      this.$store.dispatch('setSelectChannelGroupList');
    },
    beforeDestroy () {
      let _vm = this;
      if(_vm.chart) {
        _vm.chart.dispose();
        _vm.chart = null;
        window.removeEventListener('resize', _vm.resizeChart);
      }
      _vm.timer = null;
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
              if(_vm.chartType === 'record') {
                const data = res.data.content.page.content || [];
                const _col = _vm.tableCount(data, ['amount', 'price']);
                _col.map(item => {
                  const index = _vm.colBox[0].col.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index >= 0) {
                    _vm.colBox[0].col[index].width = item.width;
                  }
                });
                _vm.data = data;
                _vm.total = res.data.content.page.total || 0;
                _vm.pageNumber = res.data.content.page.pageNumber || 1;
                _vm.totalPages = res.data.content.page.totalPages || 1;
                _vm.$store.dispatch('setPageLoading', 1);
                if(_vm.chart) {
                  _vm.chart.dispose();
                  _vm.chart = null;
                  window.removeEventListener('resize', _vm.resizeChart);
                }
              } else {
                const list = res.data.content || [];
                const index = _vm.colBox.findIndex(item => item.type === _vm.chartType);
                const _col = _vm.tableCount(list, ['amount', 'realAmount', 'num']);
                _col.map(item => {
                  const index1 = _vm.colBox[index].col.findIndex(col => col.key === item.key);
                  console.log(item)
                  if(index1 >= 0) {
                    _vm.colBox[index].col[index1].width = item.width;
                  }
                });
                _vm.data = list;
                _vm.$store.dispatch('setPageLoading', 1);
                _vm.$nextTick(() => {
                  _vm.initChart();
                  window.addEventListener('resize', _vm.resizeChart);
                  _vm.setChart(list);
                })
              }
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
      setChannel (data) {
        this.formSearch.channelId = data.id;
      },
      setStore (data) {
        this.formSearch.storeId = data.id;
      },
      showCharge () {
        this.chargeOpenKey = !this.chargeOpenKey;
      },
      setCharge (data) {
        this.formSearch.chargeID = data.id;
        this.formSearch.chargeName = data.name;
      },
      changePage (num) {
        this.getList(num, this.formSearch);
      },
      handleReset (name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('isoWeek').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().format('YYYY-MM-DD');
        this.dateBox = [moment().startOf('isoWeek').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')];
        this.$refs.remoteChannel.clean();
        this.$refs.remoteStore.clean();
        this.exploitUserName = '';
        this.managerUserName = '';
        this.initPower();
      },
      exportTable () {
        this.$refs.formSubmit.submit();
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
        this.chart = echarts.init(this.$refs.echarts);
        this.chart.setOption(this.chartOption);
      },
      setChart (data) {
        const amoumtList = data.map(item => item.amount);
        const numList = data.map(item => item.num);
        const realList = data.map(item => item.realAmount);
        const key = this.colBox.filter(item => item.type === this.chartType)[0].key;
        const xData = data.map(item => item[key]);
        this.chart.setOption({
          series : [
            {
              name: '成交金额',
              data: amoumtList
            },
            {
              name: '有效业绩',
              data: realList
            },
            {
              name: '顾客人数',
              data: numList
            }
          ],
          xAxis: {
            data: xData
          }
        });
      },
    }
  }
</script>