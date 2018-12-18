/**
* 微信盈利分析
*/

<template>
  <div class="container-box" ref="containerBox">
    <div class="container-header">
      <h2>微信盈利分析</h2>
    </div>
    <div class="container-body">
      <Form :label-width="90" :model="formSearch" ref='formSearch' label-position="right" inline>
        <Form-item label="医院" prop='hospitalId'>
          <Select v-model="formSearch.hospitalId" clearable style="width:200px">
            <Option v-for="item in hospList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="日期" prop='startTime'>
          <Date-picker :transfer='true' type="daterange" placement="bottom-start" @on-change='setDate' :value='showTime'
            style='width:200px'></Date-picker>
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
      <div class='report-chart-container'>
        <div class="report-chart" ref='echarts'></div>
      </div>
      <Table stripe :columns="col" :data="data"></Table>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  import walden from 'utils/walden.js';
  export default {
    data() {
      return {
        showTime: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],

        formSearch: {
          startTime: moment().startOf('month').format('YYYY-MM-DD'),
          endTime: moment().endOf('month').format('YYYY-MM-DD'),
          hospitalId: localStorage.getItem('hospId') * 1,
        },

        col: [
          {
            title: '月份',
            width: 60,
            key: 'years'
          },
          {
            title: '消费佣金收入',
            width: 60,
            align: 'right',
            key: 'consumptionSum',
            render: (h, params) => {
              if (Number.isFinite(params.row.consumptionSum)) {
                return h('span', params.row.consumptionSum.toFixed(2));
              }
            }
          },
          {
            title: '佣金收入',
            width: 60,
            align: 'right',
            key: 'commissionSum',
            render: (h, params) => {
              if (Number.isFinite(params.row.commissionSum)) {
                return h('span', params.row.commissionSum.toFixed(2));
              }
            }
          },
          {
            title: '盈利',
            width: 60,
            align: 'right',
            key: 'amount',
            render: (h, params) => {
              if (Number.isFinite(params.row.amount)) {
                return h('span', params.row.amount.toFixed(2));
              }
            }
          },
          {
            title: '会费收入',
            width: 60,
            align: 'right',
            key: 'duesSum',
            render: (h, params) => {
              if (Number.isFinite(params.row.duesSum)) {
                return h('span', params.row.duesSum.toFixed(2));
              }
            }
          },
          {
            title: '佣金支出',
            width: 60,
            align: 'right',
            key: 'amountSum',
            render: (h, params) => {
              if (Number.isFinite(params.row.amountSum)) {
                return h('span', params.row.amountSum.toFixed(2));
              }
            }
          },
        ],
        data: [],

        timer: null,
        chart: null,
        chartOption: {
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['消费佣金收入', '佣金收入', '盈利', '会费收入', '佣金支出']
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
            }
          ],
          series: []
        }
      }
    },
    computed: {
      hospList() {
        return this.$store.getters.getSelectAllHospList;
      },
      viewResize () {
        return this.$store.getters.getViewResize;
      },
    },
    watch: {
      viewResize (val) {
        console.log('menuTodo');
        this.resizeChart();
      },
    },
    created() {
      this.getList(1, this.formSearch);
    },
    mounted() {
      let _vm = this;
      _vm.initChart();
      _vm.$store.dispatch('setSelectAllHospList');
      window.addEventListener('resize', _vm.resizeChart)
    },
    beforeDestroy () {
      let _vm = this;
      _vm.chart.dispose();
      _vm.chart = null;
      window.removeEventListener('resize', _vm.resizeChart);
      _vm.timer = null;
		},
    methods: {
      getList(pageNumber, form) {
        let _vm = this;
        _vm.$store.dispatch('setPageLoading', -1);
        form['pageNumber'] = pageNumber
        form['pageSize'] = _vm.pageSize
        _vm.$http.get({
          url: 'guard-webManager/promoteRecord/profitanalysis.jhtml',
          data: form,
          success: function (res) {
            if (res.data.code === 0) {
              let list = res.data.content.month1 || [];
              let total = {
                years: '合计',
                consumptionSum: 0,
                commissionSum: 0,
                amount: 0,
                duesSum: 0,
                amountSum: 0
              };
              list.map(item => {
                total.consumptionSum = parseFloat((item.consumptionSum + total.consumptionSum).toFixed(2));
                total.commissionSum = parseFloat((item.commissionSum + total.commissionSum).toFixed(2));
                total.amount = parseFloat((item.amount + total.amount).toFixed(2));
                total.duesSum = parseFloat((item.duesSum + total.duesSum).toFixed(2));
                total.amountSum = parseFloat((item.amountSum + total.amountSum).toFixed(2));
              });
              let data = [...list, total];
              let _col = _vm.tableCount(data, ['consumptionSum', 'commissionSum', 'amount', 'duesSum', 'amountSum']);
              _col.map(item => {
                const index1 = _vm.col.findIndex(col => col.key === item.key);
                console.log(item)
                if(index1 >= 0) {
                  _vm.col[index1].width = item.width;
                }
              });
              _vm.data = data;
              _vm.setChart(list);
              _vm.$store.dispatch('setPageLoading', 1);
            } else {
              console.log(res.data.desc)
            }
          },
          error: function (res) {
            console.log(res);
          }
        });
      },
      setDate(val) {
        this.formSearch.startTime = val[0];
        this.formSearch.endTime = val[1];
      },
      handleReset(name) {
        this.$refs[name].resetFields();
        this.formSearch.startTime = moment().startOf('month').format('YYYY-MM-DD');
        this.formSearch.endTime = moment().endOf('month').format('YYYY-MM-DD');
        this.showTime = [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')]
        this.getList(1, this.formSearch);
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
      setChart (list) {
        const xList = list.map(item => item.years);
        this.chart.setOption({
          xAxis: {
            data: xList
          },
          series : [
            {
              name: '消费佣金收入',
              yAxisIndex: 0,
              type:'bar',
              data: list.map(item => item.consumptionSum)
            },
            {
              name: '佣金收入',
              yAxisIndex: 0,
              type:'bar',
              data: list.map(item => item.commissionSum)
            },
            {
              name: '盈利',
              yAxisIndex: 0,
              type:'bar',
              data: list.map(item => item.amount)
            },
            {
              name: '会费收入',
              yAxisIndex: 0,
              type:'bar',
              data: list.map(item => item.duesSum)
            },
            {
              name: '佣金支出',
              yAxisIndex: 0,
              type:'bar',
              data: list.map(item => item.amountSum)
            },
          ]
        })
      },
    }
  }

</script>
